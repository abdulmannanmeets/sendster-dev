<?php

namespace App\Jobs;

use App\Models\Smtp;
use Aws\Exception\AwsException;
use Aws\SesV2\SesV2Client;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendMail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $emails;
    protected $subject;
    protected $body;
    protected $plain_body;
    protected $unsubscribe;
    protected $attachmentData;
    protected $attempt;
    protected $fullInstallUrl;
    protected $smtpIds;
    protected $other;
    protected $currentSmtpIndexNo = 0;

    public $tries = 5;
    public $retryAfter = 600;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($emails, $subject, $body, $unsubscribe, $attachmentData, $other, $attempt, $smtpIds)
    {
        $this->emails = $emails;
        $this->subject = $subject;
        $this->body = $body;
        $this->plain_body = isset($other['plain_body']) ? $other['plain_body'] : null;
        $this->unsubscribe = $unsubscribe;
        $this->attachmentData = $attachmentData;
        $this->attempt = $attempt;
        $this->smtpIds = $smtpIds;
        $this->other = $other;
        $this->fullInstallUrl = get_option("install_url");
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Get SMTP configuration
        $smtpId = $this->getSmtpId();
        $smtpConfig = $this->getSmtpConfiguration($smtpId);

        $basic = json_decode($smtpConfig->basic, true);
        $credentials = json_decode($smtpConfig->credentials);
        $imapCredentials = json_decode($smtpConfig->imap_setup);
        $suppressedLists = [];

        if (isset($credentials->ses_key) && isset($credentials->ses_secret) && isset($credentials->ses_region)) {
            $suppressedLists = $this->amazonSupressedList($credentials);
        }

        try {
            foreach ($this->emails as $email) {
                // Check if it is a supressed list
                if (count($suppressedLists) > 0) {
                    $key = array_search($email['email'], array_column($suppressedLists, 'EmailAddress'));
                    
                    if ($key !== false) {
                        $reason = $suppressedLists[$key]['Reason'];
                        $this->logEmailStatus($email, 0, 'Email is suppressed by Amazon SES: ' . $reason);
                        continue;
                    }
                }

                // Check if email is already attempted
                if ($this->isAlreadyAttempted($email['email']) && !$smtpConfig) {
                    continue;
                }

                // Prepare email content
                $preparedEmail = $this->prepareEmailContent($email);

                // Send mail
                $this->sendEmail($preparedEmail, $basic, $credentials, $imapCredentials);
            }
        } catch (Exception $exception) {
            $this->handleException($email, $exception);
        }
    }

    protected function isAlreadyAttempted($email)
    {
        return DB::table('mail_sending_reports')
            ->where('attempt', $this->attempt)
            ->where('email', $email)
            ->exists();
    }

    protected function prepareEmailContent($email)
    {
        // Modify body with tracking image
        $body = $this->body;
        $detect = $this->fullInstallUrl . "/api/img.php?imgvisit=" . base64_encode($this->attempt) . "&email=" . base64_encode($email['email']);
        if (strpos($body, "</body>") !== false) {
            $body = substr_replace($body, '<img src="' . $detect . '&img=img.jpg" style="display:none;">', strpos($body, "</body>"), 0);
        } else {
            $body .= '<img src="' . $detect . '&img=img.jpg" style="display:none;">';
        }

        // Replace email shortcodes
        $replacedData = replaceEmailShortcode($email['name'], $email['email'], $email['extra_fields'], $this->subject, $body, $this->unsubscribe);
        $body = $replacedData[1];
        $subject = $replacedData[0];
        $innerUnsubscribe = $replacedData[2];

        // Additional modifications
        $body = replaceLinkShortcode($body, $email['email'], $this->attempt);
        $body = replaceConfirmedEmail($body, $email['email'], $email['list_id'], $this->attempt);
        $body = replaceResubscribeEmail($body, $email['email'], $email['list_id'], $this->attempt);

        // Add unsubscribe link
        $body = unsubscribeLinkInsideUnsubsLink($body);
        $unslinkinloop = add_query_arg(array('qmlrunsubotp' => $this->attempt, 'card' => base64_encode($email['email'])), $this->fullInstallUrl . "/unsubscribe");
        $body = str_replace("@unsboxlinkadd@", $unslinkinloop, $body);
        $body = str_replace("[unsubscribe]", $unslinkinloop, $body);

        if (strlen($this->unsubscribe) > 0) {
            $innerUnsubscribe = unsubscribeLinkInsideUnsubsLink($innerUnsubscribe);
            $innerUnsubscribe = str_replace("@unsboxlinkadd@", $unslinkinloop, $innerUnsubscribe);
            $innerUnsubscribe = str_replace("[unsubscribe]", $unslinkinloop, $innerUnsubscribe);
            $body .= $innerUnsubscribe;
        }

        return compact('subject', 'body', 'email');
    }

    protected function getSmtpId()
    {
        static $currentSmtpIndex = 0;
        $smtpCount = count($this->smtpIds);
        $smtpId = $this->smtpIds[$currentSmtpIndex % $smtpCount];
        $currentSmtpIndex++;
        $this->currentSmtpIndexNo = $smtpId;
        return $smtpId;
    }

    protected function getSmtpConfiguration($smtpId)
    {
        return Smtp::where(DB::raw('md5(id)'), $smtpId)->first();
    }

    protected function sendEmail($preparedEmail, $basic, $smtpCredentials, $imapCredentials)
    {
        try {
            $smtpHost = $smtpCredentials->host;
            $smtpPort = trim($smtpCredentials->port, "'");
            $smtpEncryption = $smtpCredentials->encryption;
            $smtpUsername = $smtpCredentials->username;
            $smtpPassword = $smtpCredentials->password;

            config()->set('mail.mailers.smtp', [
                'transport' => 'smtp',
                'host' => $smtpHost,
                'port' => (int) $smtpPort,
                'username' => $smtpUsername,
                'password' => $smtpPassword,
                'encryption' => $smtpEncryption,
            ]);

            if ($imapCredentials->imap_username !== null) {
                config()->set('mail.from.address', $imapCredentials->imap_username);
            }

            if ($this->plain_body) {
                Mail::send(new \App\Mail\Mail($preparedEmail['subject'], $this->plain_body, $preparedEmail['email']['name'], $preparedEmail['email']['email'], $basic, $this->attachmentData, $this->attempt, $this->fullInstallUrl, $this->plain_body));
            } else {
                Mail::send(new \App\Mail\Mail($preparedEmail['subject'], $preparedEmail['body'], $preparedEmail['email']['name'], $preparedEmail['email']['email'], $basic, $this->attachmentData, $this->attempt, $this->fullInstallUrl, $this->plain_body));
            }

            $this->logEmailStatus($preparedEmail['email'], 1, 'Email sent successfully');
        } catch (Exception $e) {
            $this->logEmailStatus($preparedEmail['email'], 0, $e->getMessage());
        }
    }

    protected function logEmailStatus($email, $status, $error)
    {
        DB::table('mail_sending_reports')->updateOrInsert([
            'attempt' => $this->attempt,
            'email' => $email['email']
        ], [
            "attempt" => $this->attempt,
            "list_id" => json_encode($email['list_id']),
            "smtp_id" => $this->currentSmtpIndexNo,
            "email" => $email['email'],
            "status" => $status,
            "error" => $error,
            "subject" => $this->subject,
            "body" => $this->body,
            "unsubscribe" => $this->unsubscribe,
            "extra_emails" => $email['list_id'] == "" ? "" : $email['email'],
            "created_at" => now(),
            "updated_at" => now(),
        ]);
    }

    protected function handleException($email, $exception)
    {
        $this->logEmailStatus($email, 0, $exception->getMessage());
    }

    protected function amazonSupressedList(Object $smtpDetails)
    {
        $region = $smtpDetails->ses_region;
        $key = $smtpDetails->ses_key;
        $secret = $smtpDetails->ses_secret;
        $sesClient = new SesV2Client([
            'version' => 'latest',
            'region' => $region,
            'credentials' => [
                'key' => $key,
                'secret' => $secret,
            ],
        ]);

        try {
            $result = $sesClient->listSuppressedDestinations([]);
            $suppressedEmails = $result['SuppressedDestinationSummaries'];
            return $suppressedEmails;
        } catch (AwsException $e) {
            return [];
        }
    }
}
