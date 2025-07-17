<?php

namespace App\Jobs;

use BounceMailHandler\BounceMailHandler;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BounceHandle implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $smtp = [];

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($smtp)
    {
        $this->smtp = $smtp;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        ob_start();
        $this->runDebugBounce($this->smtp);
        ob_end_clean();
    }

    private function runDebugBounce($request)
    {
        set_time_limit(0);

        $bounceHandler = new BounceMailHandler();
        $bounceHandler->actionFunction = array($this, 'imap_callback');
        $bounceHandler->verbose = BounceMailHandler::VERBOSE_SIMPLE;
        $bounceHandler->disableDelete = true;

        $bounceHandler->mailhost = $request->imap_host; // your mail server
        $bounceHandler->mailboxUserName = $request->imap_username; // your mailbox username
        $bounceHandler->mailboxPassword = $request->imap_password; // your mailbox password
        $bounceHandler->port = $request->imap_port; // the port to access your mailbox, default is 143
        $bounceHandler->service = 'imap'; // the service to use (imap or pop3), default is 'imap'
        $bounceHandler->serviceOption = strtolower($request->imap_encryption); // the service options (none, tls, notls, ssl, etc.), default is 'notls'
        $bounceHandler->boxname = $request->imap_folder_check ?? "INBOX"; // the mailbox to access, default is 'INBOX'

        $GLOBALS['delete_bounce_from_list'] = get_option("bounce_type_for_list");
        $GLOBALS['delete_bounce_from_inbox'] = get_option("bouce_type_for_mailbox");

        $GLOBALS['site_url'] = get_option('install_url');
        $GLOBALS['site_url'] = str_replace("://", "", $GLOBALS['site_url']);
        $GLOBALS['site_url'] = str_replace("/", "", $GLOBALS['site_url']);

        $GLOBALS['bounce_type'] = array('hard', 'soft', 'temporary', 'generic', 'blocked');

        try {
            $bounceHandler->openMailbox();
            $bounceHandler->processMailbox();
        } catch (Exception $exception) {
            Log::info($exception);
            return;
        }
    }

    public function imap_callback($msgnum, $bounceType, $email, $subject, $xheader, $remove, $ruleNo = false, $ruleCat = false, $totalFetched = 0, $body = '', $headerFull = '', $bodyFull = ''): bool
    {
        $displayData = $this->prepData($email, $bounceType, $remove);
        $bounceType = $displayData['bounce_type'];
        $remove = $displayData['remove'];

        preg_match('/X-sendster-id:(.*?)\r\n/', $bodyFull, $xSendsterIdMatch);
        preg_match('/X-sendster-url:(.*?)\r\n/', $bodyFull, $xSendsterUrlMatch);

        if (isset($xSendsterIdMatch[1])) {
            $xSendsterIdValue = trim($xSendsterIdMatch[1]);
            if (isset($xSendsterUrlMatch[1]) && trim($xSendsterUrlMatch[1]) == $GLOBALS['site_url']) {
                if (in_array($bounceType, $GLOBALS['bounce_type'])) {
                    $errorMessage = "Type: " . $bounceType . " | Category: " . $ruleCat . " | Subject:" . $subject;
                    DB::table('mail_sending_reports')->where([
                        ['attempt', '=', $xSendsterIdValue],
                        ['email', '=', $email]
                    ])->update([
                        'status' => 5,
                        'error' => $errorMessage
                    ]);
                }
                if ((($bounceType == $GLOBALS['delete_bounce_from_list']) || ($GLOBALS['delete_bounce_from_list'] == "all")) && ($bounceType != "none")) {
                    DB::table('leads')->where('email', '=', $email)->delete();
                }
            }
        }

        return true;
    }

    private function prepData($email, $bounceType, $remove)
    {
        $data['bounce_type'] = \trim($bounceType);
        $data['email'] = '';
        $data['emailName'] = '';
        $data['emailAddy'] = '';
        $data['remove'] = '';
        if (\strpos($email, '<') !== false) {
            $pos_start = \strpos($email, '<');
            $data['emailName'] = \trim(\substr($email, 0, $pos_start));
            $data['emailAddy'] = \substr($email, $pos_start + 1);
            $pos_end = \strpos($data['emailAddy'], '>');
            if ($pos_end) {
                $data['emailAddy'] = \substr($data['emailAddy'], 0, $pos_end);
            }
        }
        // replace the < and > able so they display on screen
        $email = \str_replace(['<', '>'], ['&lt;', '&gt;'], $email);
        // replace the "TO:<" with nothing
        $email = \str_ireplace('TO:<', '', $email);
        $data['email'] = $email;
        // account for legitimate emails that have no bounce type
        if (\trim($bounceType) == '') {
            $data['bounce_type'] = 'none';
        }
        // change the remove flag from true or 1 to textual representation
        if (\stripos($remove, 'moved') !== false && \stripos($remove, 'hard') !== false) {
            $data['removestat'] = 'moved (hard)';
            $data['remove'] = '<span style="color:red;">' . 'moved (hard)' . '</span>';
        } elseif (\stripos($remove, 'moved') !== false && \stripos($remove, 'soft') !== false) {
            $data['removestat'] = 'moved (soft)';
            $data['remove'] = '<span style="color:gray;">' . 'moved (soft)' . '</span>';
        } elseif ($remove == true || $remove == '1') {
            $data['removestat'] = 'deleted';
            $data['remove'] = '<span style="color:red;">' . 'deleted' . '</span>';
        } else {
            $data['removestat'] = 'not deleted';
            $data['remove'] = '<span style="color:gray;">' . 'not deleted' . '</span>';
        }
        return $data;
    }
}
