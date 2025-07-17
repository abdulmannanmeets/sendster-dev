<?php

namespace App\Http\Controllers\Schedule;

use App\Http\Controllers\Controller;
use App\Models\ApiSchedularTable;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\DB;

class ScheduleApi extends Controller
{
    public $timezone;
    public $value;
    function __construct()
    {
        $this->timezone = 'UTC';
        date_default_timezone_set($this->timezone);
        return self::reqControl();
    }

    function reqControl()
    {
        if (isset($_POST['rburl']) && filter_var($_POST['rburl'], FILTER_VALIDATE_URL) && get_option('schedule_api_token') == $_POST['auth']) {
            return self::addScheduledMails();
        } elseif (isset($_POST['remschedule'])  && isset($_POST['remurl'])) {
            self::removeScheduledMail($_POST['remschedule'], $_POST['remurl']);
        } elseif (isset($_POST['runserver'])) {
            self::runScheduledMails();
        } else {
            if (get_option('cron_type') == 'script') {
                self::runScheduledMails();
            } else {
                abort(404);
            }
        }
    }

    function addScheduledMails()
    {
        $table = table('api_schedular_tables');
        $cburl = $_POST['rburl'];
        $token = $_POST['rtoken'];
        $stimezone = $_POST['rtimezone'];
        $sdate = $_POST['rdate'];
        $stime = $_POST['rtime'];
        $sip = $_POST['rpip'];
        $status = $_POST['rstatus'];
        $getdate = self::convertDateTime($sdate, $stime, $stimezone);
        $date = date('d-m-Y');
        $time = date('h:ia');
        $time_sec = $getdate['time_sec'];

        $sel = DB::select("SELECT `id` FROM {$table} WHERE `cburl` = '{$cburl}' AND `stoken` = '{$token}'");
        if ($sel) {
            $done = DB::table('api_schedular_tables')->where('id', $sel[0]->id)->update(['cburl' => $cburl], ['stoken' => $time_sec], ['status' => $status], ['ip' => $sip], ['date' => $date], ['time' => $time]);
            $sel[0]->id;
            $updateed = 1;
        } else {
            $done = DB::table('api_schedular_tables')->insertGetId([
                'cburl' => $cburl,
                'stoken' => $token,
                'stime' => $token,
                'status' => $status,
                'ip' => $sip,
                'date' => $date,
                'time' => $time
            ]);
        }

        if ($done || isset($updateed)) {
            $this->value = array("created" => true);
        } else {
            $this->value = array('created' => false);
        }
    }

    function convertDateTime($date, $time, $zone)
    {
        $currentdateob = new DateTime($date . ' ' . $time, new DateTimeZone($zone));
        $converted = $currentdateob->setTimezone(new DateTimeZone($this->timezone));
        $convertedtime = $converted->format('Y-m-d H:i');
        $date = date('Y-m-d', strtotime($convertedtime));
        $time = date('H:i', strtotime($convertedtime));
        return array('date' => $date, 'time' => $time, 'time_sec' => strtotime($date . " " . $time));
    }

    // Remove the schedule 
    function removeScheduledMail($token, $url)
    {
        ApiSchedularTable::where([['cburl', '=', $url], ['stoken', '=', $token]])->delete();
    }

    function runScheduledMails()
    {
        $cron_type = "url";
        $send_all = false;
        if (get_option('cron_type')) {
            $cron_type = get_option('cron_type');
        }
        if ($cron_type === "script") {
            global $argv;
            $send_all = true;
        }

        $date = date('Y-m-d');
        $time = date('H:i');
        $status = 1;
        $tab_status = "1";
        if (get_option('async_cron_mailer')) {
            $async_cron_mailer = (int) get_option('async_cron_mailer');
            if ($async_cron_mailer === 1) {
                $send_all = false;
                $tab_status = "1,2";
            }
        }

        $id_order = ((mt_rand() % 2) === 0) ? 'DESC' : '';
        $compose_token = "";

        if (isset($_POST['compose_token'])) {
            $compose_token = $_POST['compose_token'];
            $compose_token = "AND stoken='{$compose_token}'";
            $send_all = false;
        }

        if (isset($argv[1]) && (strpos($argv[1], '--compose_token--') !== false)) {
            $compose_token = str_replace('--compose_token--', '', $argv[1]);
            $compose_token = "AND stoken='{$compose_token}'";
        }

        $table = table('api_schedular_tables');
        $time = time();
        $select = DB::select("SELECT id, cburl, stoken FROM {$table} WHERE `status` IN ({$tab_status}) AND (stime < {$time} OR stime = {$time}) {$compose_token} ORDER BY `id` {$id_order}, `status`");
        if ($select) {
            foreach ($select as $r) {
                $hhtt_host = (isset($_SERVER['HTTP_HOST'])) ? $_SERVER['HTTP_HOST'] : "";
                $data = array(
                    'rwqmlr' => 1,
                    'rtoken' => $r->stoken,
                    'rurl' => $r->cburl,
                    'requrl' => $hhtt_host,
                    'api_url' => get_option('schedule_api_url')
                );

                if (strpos($r->cburl, 'index_email_settings' > 0)) {
                    DB::table('api_schedular_tables')->where('id', $r->id)->update([
                        'status' => 2
                    ]);
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $r->cburl);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    curl_setopt($ch, CURLOPT_POST, true);
                    curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);
                    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
                    // echo "-Sequence-" . PHP_EOL;
                    $output = curl_exec($ch);
                    echo $output;
                } else {
                    DB::table('api_schedular_tables')->where('id', $r->id)->update([
                        'status' => 2
                    ]);
                    // echo "-Schedule-\n";
                    $schedule = new ScheduleController();
                    $sending_stat = $schedule->mlrDoRunSchedular($data, $this, $send_all);
                    if ($sending_stat === 3) {
                        continue;
                    }
                    if ($sending_stat === 2) {
                        DB::table('api_schedular_tables')->where('id', $r->id)->update([
                            'status' => 1
                        ]);
                    }
                }
            }
        }
    }
}