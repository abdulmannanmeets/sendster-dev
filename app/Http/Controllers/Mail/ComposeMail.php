<?php

namespace App\Http\Controllers\Mail;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ListCController;
use App\Http\Controllers\SmtpController;
use App\Models\CampaignUnsubscribe;
use App\Models\ListC;
use App\Models\MailSendingReport;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PHPMailer\PHPMailer\PHPMailer;

class ComposeMail extends Controller
{
    var $current_attempt = false;

    function index($request)
    {
    }

    function sequenceMailDescbreak($attempt, $lists, $extra_emails, $covered = 0, $existing_extra_mails = array(), $get_all = false)
    {
        $backup_list = $lists;
        $backup_extra_email = $extra_emails;
        $get_list_id = array();
        $list_ob = new ListCController();
        foreach (json_decode($lists) as $list) {
            $value = $list->value ?? $list;
            $int_value = ListC::where(DB::raw("md5(id)"), "=", $value)->select("id")->first()->toArray();
            array_push($get_list_id, $int_value['id']);
        }
        $lists = array_map(function ($l) {
            return "'" . $l . "'";
        }, $get_list_id);

        $lists = trim(implode(',', $lists));

        $extra_emails = array_filter(explode("\n", $extra_emails), function ($e) {
            return (filter_var($e, FILTER_VALIDATE_EMAIL)) ? true : false;
        });
        $extra_emails = array_unique($extra_emails);

        $extra_emails_quot = array_map(function ($ex) {
            return "'" . $ex . "'";
        }, $extra_emails);
        $extra_emails_quot_str = implode(',', $extra_emails_quot);

        $leads_table = table('leads');
        $lists_table = table('list_c_s');
        $sendings_table = table('mail_sending_reports');

        $list_emails = [];
        $chunk_number = ($get_all) ? 2147483647 : ((int) get_option('send_noof_mail_schedule_min'));
        if (strlen($lists) > 0) {
            $extra_email_qry = "";
            if (count($extra_emails_quot) > 0) {
                $extra_email_qry = " AND `email` NOT IN (" . $extra_emails_quot_str . ")";
            }

            chk_lbl:
            $list_emails_qry = DB::select("SELECT DISTINCT(`email`) FROM `{$leads_table}` AS `a` INNER JOIN `{$lists_table}` AS `b` ON `b`.id = `a`.list_id  WHERE `b`.id IN({$lists}) AND `a`.email NOT IN (SELECT `email` FROM `{$sendings_table}` WHERE `attempt` = {$attempt}) {$extra_email_qry} ORDER BY `b`.priority DESC LIMIT {$covered} , {$chunk_number}");
            foreach ($list_emails_qry as $list_emails_data) {
                array_push($list_emails, $list_emails_data->email);
            }
        }

        $extra_emails = array_diff($extra_emails, $existing_extra_mails);

        if (count($list_emails) < 1 && count($extra_emails) > 0) {
            $ex_emails_qry = DB::select("SELECT DISTINCT(`email`) FROM `{$sendings_table}` WHERE `email` IN ({$extra_emails_quot_str}) AND `attempt` = {$attempt}");
            foreach ($ex_emails_qry as $ex_emails_data) {
                $exists = array_search($ex_emails_data->email, $extra_emails);
                if ($exists !== false) {
                    array_splice($extra_emails, $exists, 1);
                }
            }
            $list_emails = array_merge($list_emails, $extra_emails);
        }
        $list_emails = array_unique($list_emails);

        if (count($list_emails) > $chunk_number) {
            $list_emails = array_splice($list_emails, 0, $chunk_number);
        }
        return $list_emails;
    }

    function composeMailDescbreak($list_ids, $extras, $schedule = "")
    {
        if (!empty($list_ids)) {
            $list_ob = new ListCController();
            $list_arr = $list_ob->arrangeListsBasedOnPriority($list_ids);
            $list_emails = array();

            if (isset($_POST['fromattempt']) && isset($_POST['statcondition'])) {
                $conditional_email_array = MailSendingReport::select('email')->where([['attempt', '=', $_POST['fromattempt'], ['status', '=', base64_decode($_POST['statcondition'])]]])->whereNotIn('extra_emails', array(1))->toArray();
                foreach ($conditional_email_array as $arr_email) {
                    array_push($list_emails, $arr_email->email);
                }
            } else {
                foreach ($list_arr as $list_id) {
                    if ($list_id > 0) {
                        $list_ob_email = $list_ob->getEmailWithListId($list_id);
                        array_push($list_emails, $list_ob_email);
                    }
                }
            }
        } else {
            $list_ids = $list_emails = array();
        }

        $emails = array_merge($list_emails, $extras);
        for ($i = 0; $i < count($emails); $i++) {
            if (!filter_var($emails[$i], FILTER_VALIDATE_EMAIL)) {
                unset($emails[$i]);
            }
        }

        $emails = array_unique($emails);

        // Schedule already sent
        if ($schedule !== 0) {
            $schedule_emails = str_replace(' ', '', $schedule);
            $schedule_emails = explode(',', trim($schedule_emails, ','));

            for ($v = 0; $v < count($schedule_emails); $v++) {
                if (!filter_var($schedule_emails[$v], FILTER_VALIDATE_EMAIL)) {
                    unset($schedule_emails[$v]);
                }
            }
            $schedule_emails = implode(',', $schedule_emails);
            $schedule_emails = array_unique(explode(',', $schedule_emails));

            $emails = array_diff($emails, $schedule_emails);
        }

        $chunk_number = $schedule === 0 ? (int) get_option('send_noof_mail_at_chunk') : (int) get_option('send_noof_mail_schedule_min');
        $arr = array();
        if (count($emails) <= $chunk_number) {
            $arr[0] = $emails;
        } else {
            $max_len = ceil((count($emails)) / $chunk_number);
            $temp = 0;
            for ($i = 0; $i < $max_len; $i++) {
                $arr[$i] = array_slice($emails, $temp, $chunk_number);
                $temp = $temp + $chunk_number;
            }
        }

        $current_attempt = get_option('mail_attempt');
        $current_attempt = $current_attempt + 1;
        update_option('mail_attempt', $current_attempt);

        if (count($arr) > 0) {
            return array(
                'attempt' => $current_attempt,
                'emails' => $arr
            );
        }
        return 0;
    }

    function checkAndSendBeforeCompose()
    {
        if (Auth::check() && Auth::user()->role == 'admin') {
            set_time_limit(0);
            self::composeMail();
        } else {
            set_time_limit(0);
            self::composeMail();
        }
    }

    function composeMail($is_send = false)
    {
        $post_data = ($is_send !== false && is_array($is_send)) ? $is_send : $_POST;
        if (isset($post_data['mlrsubmit'])) {
            $list_id = json_decode($post_data['list_id'], true);
            $smtp_ids = json_decode($post_data['smtp_ids'], true);
            $attempt = $post_data['attempt'] ?? false;
            $attachment = trim($post_data['attachment']);

            $new_added = preg_split('/\n/', $post_data['manual_emails']);
            $body = stripslashes($post_data['body']);
            $subject = stripslashes($post_data['subject']);
            $unsubscribe = stripslashes($post_data['unsubscribe']) ?? '';
            $email = array();
            if (isset($post_data['desctionemails'])) {
                $email = explode(',', $post_data['desctionemails']);
            }

            if (isset($post_data['sequence'])) {
                $email = $new_added;
            }

            if (gettype($email) === "string") {
                $email = explode(PHP_EOL, $email);
            }

            $campaign_id = $post_data['campaign_id'] ?? 0;

            if (isset($_POST['attempt']) && is_numeric($_POST['attempt'])) {
                $this->current_attempt = $_POST['attempt'];
            }

            self::sendMail($smtp_ids, $list_id, $email, $new_added, $subject, $body, $unsubscribe, $campaign_id, $attempt, $attachment);
        }
    }

    function sendMail($smtp_ids, $list_id, $email, $new_added, $subject, $body, $unsubscribe, $campaign_id, $attempt, $attachment = "")
    {
        $to_email = array_merge($email, $new_added);
        $to_email = array_unique($to_email);
        $smtp_arr = array();
        foreach ($smtp_ids as $smtp_data) {
            if ($smtp_data !== '') {
                $smtp_arr = array_merge($smtp_arr, array($smtp_data));
            }
        }

        $switch_smtp_after = ceil(count($to_email) / count($smtp_arr));
        $current_smtp_count = 0;
        $new_added_comma_email = "";
        foreach ($new_added as $new_email) {
            if (filter_var($new_email, FILTER_VALIDATE_EMAIL)) {
                $new_added_comma_email .= "'" . $new_email . "',";
            }
        }
        $new_added_comma_email = rtrim($new_added_comma_email, ',');

        try {
            $i = $j = $k = $make_smtp_change = $smtp_add_init = 0;
            $arr = array();
            $p_attempt = $current_attempt ?? $attempt;
            if (!$p_attempt) {
                $current_attempt = get_option('mail_attempt');
                $current_attempt = $current_attempt + 1;
                update_option('mail_attempt', $current_attempt);
            } else {
                $current_attempt = $p_attempt;
            }

            $mail_length = sizeof($to_email);
            $unsubscribe_link = get_option("install_url") . 'unsubscribe';
            $unsubscribe_otp = substr(str_shuffle('0123456abcdefGhijklmnQprstuv8790'), 0, 5);
            $unsubscribe_otp = $unsubscribe_otp . $current_attempt;
            $unsubscribe_campaign_otp = substr(str_shuffle('1234567890sdfghjkwertyuioxcvb'), 0, 5) . $campaign_id;

            $actual_subject = $loop_subject = nl2br($subject);
            $actual_body = $loop_body = nl2br($body);

            $unsubscribe_original = nl2br($unsubscribe);
            $unsubscribe = self::unsubscribeLinkInsideUnsubsLink($unsubscribe_original);

            $count_unsubs_camp = $count_already_attempted = 0;

            foreach ($to_email as $t_email) {
                $i++;
                if (filter_var($t_email, FILTER_VALIDATE_EMAIL)) {
                    if (!$campaign_id != 0) {
                        if (self::isUnsubscribedFromCampaign($campaign_id, $t_email)) {
                            ++$count_unsubs_camp;
                            continue;
                        }
                    }

                    if (self::alreadyAttempted($current_attempt, $t_email)) {
                        ++$count_already_attempted;
                        continue;
                    }
                    $make_smtp_change++;

                    if ($smtp_add_init == 0 || $make_smtp_change > $switch_smtp_after) {
                        $smtpid = $smtp_arr[$current_smtp_count];
                        $current_smtp_count++;
                        $smtp_controller = new SmtpController();
                        $getSmtp = $smtp_controller->getSmtpSetup(array('smtp_id' => $smtpid))['message'];
                        $basic = json_decode($getSmtp['basic'], true);
                        $credentials = json_decode($getSmtp['credentials'], true);

                        require base_path('vendor/autoload.php');
                        $mail = new PHPMailer();
                        $mail->isSMTP();
                        // $mail->SMTPDebug = true;
                        $mail->Host = $credentials['host'];
                        $mail->SMTPAuth = true;

                        if (json_decode($attachment, true)['name'] !== "") {
                            $mail->addAttachment(storage_path() . '/app/campaigns/' . str_replace("uploads/", "", json_decode($attachment, true)['url']));
                        }

                        $mail->Username = $credentials['username'];
                        $mail->Password = $credentials['password'];
                        $mail->SMTPSecure = $credentials['encryption'];
                        $mail->Port = trim($credentials['port'], "'");
                        $mail->CharSet = "UTF-8";
                        $mail->setFrom($basic['from_email'], $basic['from_name']);
                        $mail->addReplyTo($basic['reply_email'], $basic['reply_name']);
                        if ($smtp_add_init == 0) {
                            $smtp_add_init++;
                        } else {
                            if ($make_smtp_change > $switch_smtp_after) {
                                $make_smtp_change = 1;
                            }
                        }
                    }
                    $temp_url_bounce_trace = site_url();
                    $temp_url_bounce_trace = str_replace("://", "", $temp_url_bounce_trace);
                    $temp_url_bounce_trace = str_replace("/", "", $temp_url_bounce_trace);
                    $temp_url_bounce_trace = str_replace(" ", "", $temp_url_bounce_trace);

                    $detect = get_option("install_url") . "/api/img.php?imgvisit=" . base64_encode($current_attempt) . "&email=" . base64_encode($t_email);
                    $body = $body . "<img src='" . $detect . "&img=img.jpg' style='display:none;'>";
                    $body = spinText($body);
                    $body = spinURL($body);
                    $subject = spinText($subject);
                    $replaced_data = replaceEmailShortcode("", $t_email, array(), $subject, $unsubscribe, $body, $list_id);
                    $subject = $replaced_data[0];
                    $unsubscribe = $replaced_data[1];
                    $body = $replaced_data[2];

                    $unsubadd = "";
                    if (strlen($unsubscribe) > 0) {
                        $unslinkinloop = add_query_arg(array('qmlrunsubotp' => $unsubscribe_otp, 'card' => base64_encode($t_email)), $unsubscribe_link);
                        $unsubadd = str_replace("@unsboxlinkadd@", $unslinkinloop, $unsubscribe);
                    }

                    $body = $body . $unsubadd;

                    $mail->clearAllRecipients();
                    $mail->Subject = $subject;
                    $mail->msgHTML($body);
                    $mail->AltBody = $body;
                    $mail->addAddress($t_email);

                    if (!$mail->send()) {
                        $send_status = 0;
                        $mail_err = $mail->ErrorInfo;
                    } else {
                        $j++;
                        $send_status = 1;
                        $mail_err = 'No error';
                    }
                    $subject = $loop_subject;
                    $body = $loop_body;
                    $mailSendingReport = new MailSendingReport();
                    $mailSendingReport->attempt = $current_attempt;
                    $mailSendingReport->campaign_id = $campaign_id;
                    $mailSendingReport->list_id = json_encode($list_id);
                    $mailSendingReport->smtp_id = $smtpid;
                    $mailSendingReport->email = $t_email;
                    $mailSendingReport->status = $send_status;
                    $mailSendingReport->error = $mail_err;
                    $mailSendingReport->subject = $actual_subject;
                    $mailSendingReport->body = $actual_body;
                    $mailSendingReport->unsubscribe = $unsubscribe_original;
                    $mailSendingReport->extra_emails = '';
                    $mailSendingReport->created_at = time();
                    $mailSendingReport->updated_at = time();
                    $mailSendingReport->save();
                } else {
                    if ($t_email != '' && $t_email != ' ' && $t_email != null) {
                        $k++;
                        $asso = array('email' => $t_email, 'status' => '0', 'error' => 'Invalid Email Format');
                    } else {
                        $i--;
                        $mail_length--;
                    }
                }
                if (isset($asso)) {
                    $arr[$i] = $asso;
                }
            }

            if ($i > 0) {
                $un = $mail_length - $j;
                $arrrr = json_encode(array('stat' => 1, 'total' => ($mail_length - $count_unsubs_camp - $count_already_attempted), 'campaign_uns' => $count_unsubs_camp, 'sentno' => $j, 'unable' => $un, 'invalidformat' => $k));
                if (strlen($new_added_comma_email) > 0) {
                    MailSendingReport::whereIn('email', explode(',', $new_added_comma_email))->update(['extra_emails' => 1], ['attempt' => $current_attempt], ['updated_at' => time()]);
                }
                echo $arrrr;
            } else {
                $arrrr = json_encode(array('teststat' => 1, 'unable' => $un));
                echo $arrrr;
            }
        } catch (Exception $ex) {
            echo json_encode(array('status' => 0, 'cause' => $ex->getMessage()));
        }
    }

    function unsubscribeLinkInsideUnsubsLink($content)
    {
        $reg = "/\[unsubscribe(\s.*?)?\](?:([^\[]+)?\[\/unsubscribe\])?/";
        $data = preg_replace_callback($reg, function ($reg) {
            $data = $reg[0];
            $data = str_replace("[unsubscribe]", "", $data);
            $data = str_replace("[/unsubscribe]", "", $data);
            $link = "<a href='@unsboxlinkadd@'>" . $data . "</a>";
            return $link;
        }, $content);
        if ($data == $content) {
            $data = "<a href='@unsboxlinkadd@'>" . $data . "</a>";
        }
        $data = "<center><p style='color:gray;'>" . $data . "</p></center>";
        return $data;
    }

    function isUnsubscribedFromCampaign($campaign_id, $to_email)
    {
        return CampaignUnsubscribe::select('id')->where([['email', '=', $to_email], ['campaign_id', '=', $campaign_id]])->first();
    }

    function alreadyAttempted($current_attempt, $to_email)
    {
        return MailSendingReport::select('id')->where([['attempt', '=', $current_attempt], ['email', '=', $to_email]])->first();
    }
}
