<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Mail\ComposeMail;
use App\Models\EmailSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmailSetting extends Controller
{
    function __construct()
    {
        if (isset($_POST['rwqmlr'])) {
            self::emailSequencer();
        }
    }

    function emailSequencer()
    {
        $composeMailOb = new ComposeMail();
        $lead_table = table('leads');
        $getdata = EmailSchedule::where('stoken', $_POST['rtoken'])->first();
        if ($getdata) {
            $req_url = isset($_SERVER['HTTPS']) ? 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] : 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            $smtp_id = $getdata->smtp_id;
            $list_id = $getdata->list_id;
            $campaign_id = $getdata->campaign_id;
            $new_added = $getdata->extra_emails;
            $subject = $getdata->subject;
            $body = $getdata->body;
            $unsubscribe = $getdata->unsubscribe;
            $attachment = $getdata->attachment;

            $listid_arr = explode('@', trim($list_id, '@'));
            for ($j = 0; $j < count($listid_arr); $j++) {
                $listid_arr[$j] = "'" . $listid_arr[$j] . "'";
            }

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $req_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, true);

            $get_name = DB::select("SELECT name FROM {$lead_table} WHERE email = {$new_added} AND list_id IN (" . trim(implode(',', $listid_arr), ',') . ")");
            $does_exist_in_email = DB::select("SELECT COUNT(`id`) FROM {$lead_table} WHERE email = {$new_added} AND list_id IN (" . trim(implode(',', $listid_arr), ',') . ")");

            if ($does_exist_in_email < 1) {
                goto delschedulelbl;
            }

            $subject = str_replace("{name}", $get_name, $subject);
            $unsubscribe = str_replace("{name}", $get_name, $unsubscribe);
            $body = str_replace("{name}", $get_name, $body);

            $data = array(
                'mlrsubmit' => 1,
                'smailvalidtoken' => $_POST['rtoken'],
                'smtp_ids' => $smtp_id,
                'list_id' => $list_id,
                'campaign_id' => $campaign_id,
                'manual_emails' => $new_added,
                'subject' => $subject,
                'body' => $body,
                'unsubscribe' => $unsubscribe,
                'attachment' => $attachment,
                'sequence' => 1,
            );

            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            $output = curl_exec($ch);
            $info = curl_getinfo($ch);
            curl_close($ch);

            delschedulelbl:
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $_POST['api_url']);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, true);
            $deldata = array(
                'remschedule' => $_POST['rtoken'],
                'remurl' => $_POST['rurl']
            );
            curl_setopt($ch, CURLOPT_POSTFIELDS, $deldata);
            $output = curl_exec($ch);
            //echo $output;
            $info = curl_getinfo($ch);
            curl_close($ch);
        }
    }
}
