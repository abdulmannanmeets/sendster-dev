<?php

namespace App\Http\Controllers\Schedule;

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ListCController;
use App\Http\Controllers\Mail\ComposeMail;
use App\Models\Campaign;
use App\Models\EmailSchedule;
use DateTime;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{
    function scheduleMail($compose, $request)
    {
        $id = $request['id'];
        $title = $request['campaign_title'];
        $description = $request['description'];
        $email_body = $request['email_body'];
        $email_details = $request['email_details'];
        $attachments = json_encode($request['attachments']);
        $unsubscribe = $request['unsubscribe'];

        $list_id = $email_details['list_ids'];
        $smtp_id = $email_details['smtp_ids'];
        $subject = $email_details['subject'];
        $body = $email_body['body'];
        $extra_emails = $email_details['manual_emails'] ?? "";

        $other = $request['other'];
        $time_zone = $other['schedule_option']['timezone'] != "" ? $other['schedule_option']['timezone'] : 'UTC';
        $date_time_date = date('Y-m-d', strtotime($other['schedule_option']['datetime']));
        $date_time_time = date('h:i A', strtotime($other['schedule_option']['datetime']));

        $date = date("d-m-Y");
        $time = date("h:ia");
        $otp = substr(str_shuffle('abcdefghijklmnopqrstuvwxyz01234567890'), 0, 5);
        $otp .= $date . $time;

        if ($compose) {
            $date_time_date = date('Y-m-d');
            $date_time_time = date('h:i A');
            $time_zone = date_default_timezone_get();
        }

        $done = 0;

        if ($request['campaign_type'] === 'update' && $id) {
            $current_id = $id;
            $updated_data = DB::table('email_schedules')->where(DB::raw('md5(id)'), '=', $current_id)->first()->toArray();
            $otp = $updated_data['stoken'];
        }

        $ip = getUserIPqmlr();
        $url = get_option('install_url') . "api/index_email_settings";
        $data = array(
            'auth' => get_option('schedule_api_token'),
            'rburl' => $url,
            'rtoken' => $otp,
            'rtimezone' => $time_zone,
            'rdate' => $date_time_date,
            'rtime' => $date_time_time,
            'rpip' => $ip,
            'rstatus' => 1,
        );

        $created = json_decode(sendApi($url, $data))->created;

        $campaign_ob = new CampaignController();

        // Create
        $done = 0;
        if ($created) {
            if ($request['campaign_type'] === 'create') {
                $done++;
                $cmp_id = DB::table('campaigns')->insert([
                    'title' => $title,
                    'description' => $description,
                    'email_details' => json_encode($email_details),
                    'email_body' => json_encode($email_body),
                    'attachments' => $attachments,
                    'other' => json_encode($request['other']),
                    'list_ids' => $list_id,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
                $get_scheduled_id = DB::table('email_schedules')->insertGetId([
                    'list_id' => $list_id,
                    'smtp_id' => $smtp_id,
                    'campaign_id' => $cmp_id,
                    'status' => 1,
                    'subject' => $subject,
                    'body' => $body,
                    'attachment' => $attachments,
                    'unsubscribe' => $unsubscribe ?? "",
                    'extra_emails' => $extra_emails ?? "",
                    'sdate' => $date_time_date,
                    'stime' => $date_time_time,
                    'stimezone' => $time_zone,
                    'stoken' => $otp,
                    'mailsent' => 0,
                    'used_custom_emails' => '',
                    'attempt' => 0,
                    'date' => $date,
                    'time' => $time
                ]);
                $params_arr = array('qmlr_type' => 'schedule', 'qmlr_id' => $get_scheduled_id);
                if ($compose) {
                    $params_arr['compose_token'] = $otp;
                }

                $url = $params_arr;
                return array(
                    'status' => 1,
                    'message' => [
                        'id' => $get_scheduled_id,
                        'url' => $url
                    ]
                );
            } else {
                $done++;
                $get_all = $campaign_ob->get_all(false)['message'];
                $get_all = array();
                foreach ($get_all as $value) {
                    if ($request['id'] === md5($value['id'])) {
                        $id2 = $value['id'];
                        $campaign_id = $campaign_ob->getValidId($id);
                        DB::table('campaigns')->where('id', $campaign_id)->update([
                            'title' => $title,
                            'description' => $description,
                            'email_details' => json_encode($email_details),
                            'email_body' => $email_body,
                            'attachments' => $attachments,
                            'other' => json_encode($request['other']),
                            'list_ids' => $list_id,
                            'updated_at' => now()
                        ]);
                        DB::table('email_schedules')->where('id', $id2)->update([
                            'list_id' => $list_id,
                            'smtp_id' => $smtp_id,
                            'campaign_id' => $id,
                            'status' => 1,
                            'subject' => $subject,
                            'body' => $body,
                            'attachment' => $attachments,
                            'unsubscribe' => $unsubscribe ?? "",
                            'extra_emails' => $extra_emails ?? "",
                            'sdate' => $date_time_date,
                            'stime' => $date_time_time,
                            'stimezone' => $time_zone,
                            'stoken' => $otp,
                            'date' => $date,
                            'time' => $time
                        ]);
                        break;
                    }
                }
            }
        }

        if ($done > 0) {
            $url = array(
                "wqmlrscheduleid" => $id,
                "qmlrgetbyattempt" => 1,
                "wqemailscheduled" => 1
            );
            $return_data = array(
                "status" => 2,
                "message" => [
                    "id" => $id,
                    "url" => $url
                ]
            );
        } else {
            $url = "";
            $return_data = array(
                "status" => 2,
                "message" => [
                    "id" => $id,
                    "url" => $url
                ]
            );
        }

        return $return_data;
    }

    function mlrDoRunSchedular($schedule_data, $reference = false, $send_all = false)
    {
        set_time_limit(0);
        if (isset($schedule_data['rwqmlr'])) {
            $double_checked = 0;
            $composeMailOb = new ComposeMail();

            init_exec:
            $getdata = EmailSchedule::where('stoken', $schedule_data['rtoken'])->first();
            if ($getdata) {
                $smtp_id = [];
                $list_id = [];
                foreach (json_decode($getdata->list_id) as $key => $value) {
                    array_push($list_id, $value->value);
                }
                $list_id = json_encode($list_id);
                foreach (json_decode($getdata->smtp_id) as $key => $value) {
                    array_push($smtp_id, $value->value);
                }
                $smtp_id = json_encode($smtp_id);
                $campaign_id = $getdata->campaign_id;
                $new_added = $getdata->extra_emails;
                $existing_new_added = array();

                if (isset($getdata->used_custom_emails) && !is_null($getdata->used_custom_emails) && strlen(trim($getdata->used_custom_emails)) > 0) {
                    $existing_new_added = explode(',', trim($getdata->used_custom_emails));
                }

                $subject = $getdata->subject;
                $body = $getdata->body;
                $unsubscribe = $getdata->unsubscribe;
                $attachment = $getdata->attachment;

                $count_mails_covered = (int) $getdata->mailsent;
                $count_mails_covered = (is_numeric($count_mails_covered) && $count_mails_covered > 0) ? $count_mails_covered : 0;

                $this_attempt = $getdata->attempt;

                if ($this_attempt === 0) {
                    $currentattmpt = get_option('mail_attempt');
                    $currentattmpt = $currentattmpt + 1;
                    update_option('mail_attempt', $currentattmpt);
                    $this_attempt = $currentattmpt;
                }

                $desc = $composeMailOb->sequenceMailDescbreak($this_attempt, $list_id, $new_added, $count_mails_covered, $existing_new_added);

                $used_cust_mails = array();
                if (is_array($desc) && count($desc) > 0) {
                    $temp_new_added = explode(',', trim($new_added));
                    $temp_new_added = array_map(function ($item) {
                        return trim($item);
                    }, $temp_new_added);
                    $used_cust_mails = array_intersect($desc, $temp_new_added);
                }

                $emailstosent = "";
                $email_count_to_send = 0;
                if (is_array($desc) && count($desc) > 0) {
                    $emailstosent = implode(',', $desc);
                    $email_count_to_send = count($desc);
                }

                if (count($used_cust_mails) > 0) {
                    $email_count_to_send = $email_count_to_send - count($used_cust_mails);
                    $used_cust_mails_to_update = array_unique(array_merge($existing_new_added, $used_cust_mails));
                    $used_cust_mails_to_update = implode(',', $used_cust_mails_to_update);
                    DB::table('email_schedules')->where('id', $getdata->id)->update([
                        'used_custom_emails' => $used_cust_mails
                    ]);
                }

                if (strlen($emailstosent) < 1) {
                    DB::table('email_schedules')->where('id', $getdata->id)->update([
                        'status' => 2,
                        'mailsent' => DB::raw("mailsent + {$email_count_to_send}")
                    ]);

                    if ($double_checked === 0) {
                        $pendings = $composeMailOb->sequenceMailDescbreak($this_attempt, $list_id, $new_added, 0, array());
                        sleep(mt_rand(15, 30));
                        $pendings_s = $composeMailOb->sequenceMailDescbreak($this_attempt, $list_id, $new_added, 0, array());

                        if ($pendings > $pendings_s) {
                            $double_checked = 2;
                            return 3;
                        } else if ($pendings === $pendings_s) {
                            $double_checked = 1;
                            goto init_exec;
                        } else {
                            $double_checked = 2;
                        }
                    }

                    // Check if only 1 times check, update to the default data
                    if ($double_checked === 1) {
                        $double_checked = 2;
                        DB::table('email_schedules')->where('id', $getdata->id)->update([
                            'status' => 1,
                            'mailsent' => 0,
                            'used_custom_emails' => ''
                        ]);
                        goto init_exec;
                    }

                    if (is_object($reference)) {
                        $reference->removeScheduledMail($schedule_data['rtoken'], $schedule_data['rurl']);
                    } else {
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_URL, $schedule_data['api_url']);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                        curl_setopt($ch, CURLOPT_POST, true);

                        $deldata = array(
                            'remschedule' => $schedule_data['rtoken'],
                            'remurl' => $schedule_data['rurl']
                        );
                        curl_setopt($ch, CURLOPT_POSTFIELDS, $deldata);
                        curl_exec($ch);
                        $info = curl_getinfo($ch);
                        curl_close($ch);
                    }
                    return;
                } else {
                    $double_checked = 0;
                    DB::table('email_schedules')->where('id', $getdata->id)->update([
                        'attempt' => $this_attempt,
                        'mailsent' => DB::raw("mailsent + {$email_count_to_send}"),
                    ]);

                    // Prepare to send the data to compose the mail.
                    $data = array(
                        'mlrsubmit' => 1,
                        'smailvalidtoken' => $schedule_data['rtoken'],
                        'smtp_ids' => $smtp_id,
                        'list_id' => $list_id,
                        'campaign_id' => $campaign_id,
                        'desctionemails' => $emailstosent,
                        'manual_emails' => $new_added,
                        'subject' => $subject,
                        'body' => $body,
                        'attachment' => $attachment,
                        'unsubscribe' => $unsubscribe,
                        'attempt' => $this_attempt,
                    );
                    $composeMailOb->composeMail($data);

                    if ($send_all) {
                        $cron_delay = get_option('cron_delay_sec');

                        if (get_option('async_cron_mailer')) {
                            $async_cron_mailer = (int) get_option('async_cron_mailer');
                            if ($async_cron_mailer === 1) {
                                return 2;
                            }
                        }

                        if ($cron_delay) {
                            $cron_delay = (int) $cron_delay;
                            sleep($cron_delay);
                        }
                        goto init_exec;
                    } else {
                        return 2;
                    }
                }
            }
        }
    }

    function getValidId($id)
    {
        $current_id = 0;
        $all_data = EmailSchedule::get()->toArray();
        foreach ($all_data as $key => $value) {
            if (md5($value['id']) === $id) {
                $current_id = $value['id'];
                break;
            }
        }
        return $current_id;
    }
}
