<?php

namespace App\Http\Controllers;

use App\Jobs\SendMail;
use App\Models\Campaign;
use App\Models\EmailSchedule;
use App\Models\Lead;
use App\Models\ListC;
use App\Models\MailSendingReport;
use App\Models\UnsubscibeUsers;
use DateTime;
use DateTimeZone;
use DOMDocument;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class CampaignController extends Controller
{
    protected $status = 0;
    protected $message = "";

    function index(Request $request)
    {
        if ($request['campaign_type'] == 'get') return self::get_all($request);
        if ($request['campaign_type'] == 'get_list_campaign') return self::get_list_smtp();
        if ($request['campaign_type'] == 'get_campaign_setup') return self::get_campaign_setup($request);
        if ($request['campaign_type'] == 'create' || $request['campaign_type'] == 'update') return self::create_and_update_campaign($request);
        if ($request['campaign_type'] == 'attachment') return self::upload_file($request);
        if ($request['campaign_type'] == 'delete') return self::deleteCampaign($request);
        if ($request['campaign_type'] == 'show_templates') return self::showTemplates($request);
        if ($request['campaign_type'] == 'get_html') return self::getHtml($request);
    }

    function get_all($request, $is_md5 = true)
    {
        $data = getTableData($request, 'campaigns');
        $encode = $data['data'];

        foreach ($encode as $id => $value) {
            $email_schedule = DB::table('email_schedules')->select('attempt', 'mailsent')->where("attempt", "=", $value['token'])->get();
            $token = ($email_schedule->count() > 0) ? $email_schedule->first()->attempt : 0;
            $encode[$id]['details'] = array(
                'composed' => $email_schedule->pluck('mailsent'),
                'delivered' => MailSendingReport::where(['attempt' => $token], ['status' => 1], ['status' => 2])->count(),
                'bounces' => MailSendingReport::where([['attempt', '=', $token], ['status', '=', 5]])->count(),
                'attempt' => $token
            );
            $encode[$id]['id'] = $is_md5 ? md5($value['id']) : $value['id'];
            $encode[$id]['created_at'] = changeDateTime($value['created_at'], 'd-m-Y H:i:s');
        }

        return [
            'recordsTotal' => $data['recordsTotal'],
            'recordsFiltered' => $data['recordsFiltered'],
            'data' => $encode
        ];
    }

    public function upload_file($request)
    {
        if ($request->hasFile('files') && $request->file('files')->isValid()) {
            $files = $request->file('files');
            $name = $files->getClientOriginalName();
            $extension = $files->getClientOriginalExtension();

            $temp_name = str_replace("." . $extension, "", $name);
            $name = $temp_name . "_" . time() . "." . $extension;
            $files->storeAs('campaigns', $name, 'public');
            $status = 1;
            $url = 'uploads/' . $name;
        }
        return array(
            'status' => $status ?? 0,
            'name' => $name ?? '',
            'url' => $url ?? ''
        );
    }

    function create_and_update_campaign($request)
    {
        $request->validate([
            'campaign_title' => ['required', 'string'],
            'email_body' => ['required', 'array'],
            'email_details' => ['required', 'array'],
            'other' => ['required', 'array'],
        ]);
        // Custom validation: at least one of 'body' or 'plain_body' must be non-empty
        $email_body = $request['email_body'];
        $body = isset($email_body['body']) ? trim($email_body['body']) : '';
        $plain_body = isset($email_body['plain_body']) ? trim($email_body['plain_body']) : '';
        if ($body === '' && $plain_body === '') {
            return response()->json([
                'errors' => [
                    'email_body' => ["Please enter the email body (HTML or plain text)."],
                ]
            ], 422);
        }
        $id = $request['id'];
        $other = $request['other'];
        $email_details = $request['email_details'];
        $list_id = $email_details['list_ids'];
        $is_schedule = $other['is_schedule'];
        if (!$is_schedule) {
            $other["schedule_option"]["datetime"] = date('d-m-Y h:ia');
        }
        $request['unsubscribe'] = isset($other['unsubscribe_message']) ? $other['unsubscribe_message'] : "";

        if ($request['campaign_type'] == "create") {
            $token = get_option("mail_attempt") + 1;
            if ($token === 0 || $token === '0') {
                $token = $token + 1;
            }
            update_option('mail_attempt', $token);
            $id = Campaign::insertGetId([
                'title' => $request['campaign_title'],
                'description' => $request['description'],
                'email_details' => json_encode($request['email_details']),
                'email_body' => json_encode($request['email_body']),
                'attachments' => json_encode($request['attachments']),
                'other' => json_encode(array_merge($request['other'], ['campaign' => 1])),
                'list_ids' => $list_id,
                'token' => $token,
                'created_at' => now(),
                'updated_at' => now()
            ]);
            $request['other'] = array_merge($request['other'], ['campaign' => 1]);
            $request['id'] = $id;
            $request['campaign'] = 1;
            $request['token'] = $token;

            self::composeOrSchedule($request);
        } else {
            Campaign::where(DB::raw('md5(id)'), $id)->update([
                'title' => $request['campaign_title'],
                'description' => $request['description'],
                'email_details' => json_encode($request['email_details']),
                'email_body' => json_encode($request['email_body']),
                'attachments' => json_encode($request['attachments']),
                'other' => json_encode(array_merge($request['other'], ['campaign' => 1])),
                'list_ids' => $list_id,
                'updated_at' => now()
            ]);
        }

        return [
            'id' => $id,
            'token' => isset($token) ? $token : 0
        ];
    }

    function get_campaign_setup($request)
    {
        $get_all = Campaign::where(DB::raw("MD5(id)"), $request['campaign_id']);

        return array(
            'status' => $get_all->count(),
            'message' => $get_all->get()->first()
        );
    }

    function deleteCampaign($request)
    {
        $request->validate([
            'id' => 'required'
        ]);
        $tokens = Campaign::whereIn(DB::raw('md5(id)'), $request['id'])->pluck('token')->toArray();
        $status = Campaign::whereIn("token", $tokens)->delete();

        return array(
            'status' => $status,
        );
    }

    function get_list_smtp()
    {
        $list_ob = new ListCController();
        $smtp_ob = new SmtpController();
        $list = $list_ob->get_all()['message'];
        $smtp = $smtp_ob->get_all()['message'];
        $list_arr = [];
        $smtp_arr = [];
        foreach ($list as $key => $value) {
            if (isset($list[$key]['id']) || isset($list[$key]['title']) || isset($list[$key]['leads'])) {
                $list_arr[$key]['value'] = $list[$key]['id'];
                $list_arr[$key]['name'] = $list_arr[$key]['title'] = $list[$key]['title'];
                $list_arr[$key]['leads'] = $list[$key]['leads'];
            } else {
                continue;
            }
        }
        foreach ($smtp as $key => $value) {
            if (isset($value['id']) || isset($value['title']) || isset($value['credentials'])) {
                $smtp_arr[$key]['value'] = $value['id'];
                $smtp_arr[$key]['title'] = $value['title'];
                $smtp_arr[$key]['name'] = $value['title'];
                $smtp_arr[$key]['host'] = json_decode($value['credentials'], true)['host'];
            } else {
                continue;
            }
        }
        return [
            'list' => $list_arr,
            'smtp' => $smtp_arr,
        ];
    }

    function queryUnsubscribe(Request $request)
    {
        $queries = $request->query();
        if (isset($queries['qmlrunsubotp'])) {
            $attempt = $request['qmlrunsubotp'];
            $email = $request['card'];
            $orgemail = base64_decode($email);

            $orglistid = MailSendingReport::select("list_id")->where([["attempt", "=", $attempt], ["email", "=", $orgemail]])->first();
            if ($orglistid) {
                $orglistid = json_decode($orglistid->list_id);

                $selres = UnsubscibeUsers::select("id")->where([["attempt", "=", $attempt], ["email", "=", $orgemail]])->first();

                if (!$selres) {
                    if (gettype($orglistid) === "string") {
                        $lists = ListC::select("title")->where("id", $orglistid)->get();
                    } else {
                        $lists = ListC::select("title")->whereIn("id", $orglistid)->get();
                    }
                    $arr = [];
                    foreach ($lists as $list) {
                        $arr = array_merge($arr, array($list->title));
                    }
                    return view("unsubscribe", ["email" => $orgemail, "attempt" => $attempt]);
                } else {
                    return abort(404);
                }
            } else {
                abort(404);
            }
        }
    }

    function unsubscribe(Request $request)
    {
        if ($request['unsubscribe']) {
            $ip = $request->ip();
            $currentUserInfo = self::getIp($ip);
            $attempt = $request['qmlrunsubotp'];
            $email = $request['card'];
            $orgattmpt = $attempt;
            try {
                $orgemail = base64_decode($email);
            } catch (Exception $ex) {
                return ['message' => "Unable to get the email"];
            }
            // $orglistid = UnsubscibeUsers::select("list_id")->where([["attempt", "=", $orgattmpt], ["email", "=", $orgemail]])->first();
            $orglistid_data = DB::table('mail_sending_reports')->select("list_id", "status")->where(["attempt" => $orgattmpt, "email" => $email])->first();
            if (isset($orglistid_data->status) && $orglistid_data->status == 2) {
                return ['message' => "You're already unsubscribed"];
            }

            $orglistid = json_decode($orglistid_data->list_id);
            if (gettype($orglistid) === "string") {
                $orglistid = [trim($orglistid, '"')];
            }
            $insertId = UnsubscibeUsers::insertGetId([
                "attempt" => $orgattmpt,
                "list_id" => json_encode($orglistid),
                "email" => $orgemail,
                "status" => 1,
                "ip" => $ip . " (" . $currentUserInfo . ")"
            ]);
            MailSendingReport::where([["attempt", "=", $orgattmpt], ["email", "=", $orgemail]])->update([
                'status' => 2
            ]);
            $lists = ListC::whereIn(DB::raw("md5(id)"), $orglistid)->get();
            $is_all = false;
            $smtp_id = get_option('global_smtp_id');
            if ($smtp_id == "") {
                return ['message' => "Unscribed successfully"];
            }
            foreach ($lists as $list) {
                $unsubscribed = json_decode($list->unsubscribed);
                $goodbye_email = json_decode($list->goodbye_email);
                if ($unsubscribed->user !== "off") {
                    $is_all = true;
                } else {
                    if ($goodbye_email->is !== "false") {
                        $attempt = get_option("mail_attempt") + 1;
                        if ($attempt === 0 || $attempt === '0') {
                            $attempt = $attempt + 1;
                        }
                        update_option("mail_attempt", $attempt);
                        $data = [
                            'id' => 0,
                            "email_details" => array("subject" => $goodbye_email->subject, 'list_ids' => [["value" => md5($list->id)]], 'smtp_ids' => [["value" => $smtp_id]], 'manual_emails' => $email),
                            'email_body' => ["body" => $goodbye_email->message],
                            'attachments' => array("name" => "", "url" => ""),
                            'other' => array("unsubscribe_message" => "", "is_schedule" => 0, "schedule_option" => ["datetime" => date('d-m-Y h:ia'), "timezone" => ""], 'unsubscribed' => 1),
                            'token' => $attempt,
                            'list_ids' => array("value" => [["value" => md5($list->id)]]),
                        ];
                        self::composeOrSchedule($data);
                    }
                    DB::table('leads')->where("list_id", "=", $list->id)->update([
                        'confirmed' => 0,
                        'updated_at' => now()
                    ]);
                }
            }

            if ($is_all) {
                DB::table("leads")->where("email", "=", $email)->update([
                    'confirmed' => 0,
                    'updated_at' => now()
                ]);
            }

            return ['message' => "Unscribed successfully"];
        }
    }

    function getIP($ipadr)
    {
        if (isset($ipadr)) {
            $details = file_get_contents('http://www.geoplugin.net/json.gp?ip=' . $ipadr);
            $json = json_decode($details);
            if ($json->geoplugin_status == '200')
                return $json->geoplugin_countryName;
            else
                return "NA";
        } else {
            return "NA";
        }
    }

    function checkSpamScore(Request $request)
    {
        $request->validate([
            "email" => ["required"]
        ]);

        $header = array(
            "Content-Type: application/json",
            "apikey: 41qHI4CYeCTzFg4Mi4QH7JRGtSUP1liu"
        );

        return sendApi("https://api.apilayer.com/spamchecker?threshold=5.0", $request['email'], $header);
    }

    function composeOrSchedule($campaign_data)
    {
        $email_body = $campaign_data['email_body'];
        $email_details = $campaign_data['email_details'];
        $attachments = $campaign_data['attachments'];
        $attempt = $campaign_data['token'];
        $other = $campaign_data['other'];

        // Extract data from email_details and other arrays
        $subject = $email_details['subject'];
        $body = $email_body['body'];

        $extra_emails = (!isset($email_details['manual_emails']) || $email_details['manual_emails'] == "") ? [] : array_filter(preg_split("/\r\n|\n|\r/", $email_details['manual_emails']));

        $for_list_id = (gettype($email_details["list_ids"]) == "string") ? json_decode($email_details['list_ids'], true) : $email_details["list_ids"];
        $list_id = [];
        foreach ($for_list_id as $list) {
            array_push($list_id, $list['value']);
        }

        $for_smtp_id = (gettype($email_details["smtp_ids"]) == "string") ? json_decode($email_details['smtp_ids'], true) : $email_details["smtp_ids"];
        $smtp_arr = [];
        foreach ($for_smtp_id as $smtp) {
            array_push($smtp_arr, $smtp['value']);
        }

        if (isset($other['double_opt']) || isset($other['thankyou']) || isset($other['sequence'])) {
            $all_emails_with_data = Lead::whereIn([[DB::raw('md5(list_id)'), $list_id], ['email', $extra_emails[0]]])->where('confirmed', 1)->select("id", "list_id", "name", "email", "extra_fields")->get();
        } else {
            $all_emails_with_data = Lead::whereIn(DB::raw('md5(list_id)'), $list_id)->where('confirmed', 1)->select("id", "list_id", "name", "email", "extra_fields")->get();
        }

        $time_zone = date_default_timezone_get();
        $date_time = date('d-m-Y h:ia');
        if (isset($other['schedule_option']['timezone'])) {
            $time_zone = $other['schedule_option']['timezone'];
            $date_time = $other['schedule_option']['datetime'];
        }
        if (isset($other['is_schedule'])) {
            if ($other['is_schedule'] === "false" || $other['is_schedule'] === false) {
                $is_schedule = 0;
            } elseif ($other['is_schedule'] === "true" || $other['is_schedule'] === true) {
                $is_schedule = 1;
            } else {
                $is_schedule = (int)$other['is_schedule'];
            }
        } else {
            $is_schedule = 0;
        }

        $cron_delay = (int)get_option('cron_delay_sec');

        $timezone1 = new DateTimeZone($time_zone);
        $timezone2 = new DateTimeZone($time_zone);
        $date1 = $date_time;
        $date2 = new DateTime('now', $timezone2);
        $date1 = new DateTime($date1, $timezone1);
        $interval = $date1->diff($date2);
        $years = $interval->y;
        $months = $interval->m;
        $days = $interval->days;
        $hours = $interval->h;
        $minuts = $interval->i;
        $seconds = $interval->s;

        // Extract email addresses from $arr
        $emails = array_map(function ($item) {
            return $item['email'];
        }, (gettype($all_emails_with_data) != "array") ? $all_emails_with_data->toArray() : $all_emails_with_data);

        // Remove emails that are present in both $emails and $compare arrays
        $extra_emails = array_diff($extra_emails, $emails);

        foreach ($extra_emails as $email) {
            if (gettype($all_emails_with_data) != "array") {
                $all_emails_with_data = $all_emails_with_data->toArray();
            }
            $all_emails_with_data = array_merge($all_emails_with_data, [["id" => 0, "list_id" => 0, "name" => "", "email" => $email, "extra_fields" => json_encode([])]]);
        }

        if (count($extra_emails) == 0) {
            $all_emails_with_data = $all_emails_with_data->toArray();
        }

        $all_emails_with_data = array_filter(array_map(function ($email) {
            return (filter_var($email["email"], FILTER_VALIDATE_EMAIL)) ? $email : false;
        }, $all_emails_with_data));

        $unique_email = array_reduce($all_emails_with_data, function ($carry, $item) {
            if (!array_key_exists($item['email'], $carry)) {
                $carry[$item['email']] = $item;
            }
            return $carry;
        }, []);
        $all_emails_with_data = array_values($unique_email);

        if (isset($other['campaign'])) {
            Campaign::where("token", $attempt)->update([
                'total_mails' => count($all_emails_with_data)
            ]);
        }

        EmailSchedule::insert([
            "list_id" => json_encode($list_id),
            "smtp_id" => json_encode($smtp_arr),
            "campaign_id" => isset($campaign_data['campaign']) ? $campaign_data['id'] : 0,
            "status" => 1,
            "subject" => $subject,
            "body" => $body,
            "attachment" => json_encode($attachments),
            "extra_emails" => json_encode($extra_emails),
            "sdate" => date('Y-m-d'),
            "stime" => date('h:i A'),
            "stimezone" => date_default_timezone_get(),
            "stoken" => $attempt,
            "mailsent" => count($all_emails_with_data),
            "attempt" => $attempt,
            "date" => date('Y-m-d'),
            "time" => date('h:i A'),
        ]);

        $send_at_time = (int) get_option("send_noof_mail_schedule_min");

        $chunk_emails = array_chunk($all_emails_with_data, $send_at_time);

        $is_schedule = false; // default value

        if (isset($other['is_schedule'])) {
            $is_schedule = filter_var($other['is_schedule'], FILTER_VALIDATE_BOOLEAN);
        }

        foreach ($chunk_emails as $key => $emails) {
            $delay = now()->addSeconds($key === 0 ? get_option('cron_delay_sec') : 0);

            // foreach ($emails as $email) {
                if ($is_schedule) {
                    SendMail::dispatch(
                        $emails,
                        $subject,
                        $body,
                        $other['unsubscribe_message'],
                        $attachments,
                        $other,
                        $attempt,
                        $smtp_arr
                    )->delay(
                        now()
                            ->addYears($years)
                            ->addMonths($months)
                            ->addDays($days)
                            ->addHours($hours)
                            ->addMinutes($minuts)
                            ->addSeconds($cron_delay + $seconds)
                            ->setTimezone($time_zone)
                    );
                } else {
                    SendMail::dispatch(
                        $emails,
                        $subject,
                        $body,
                        $other['unsubscribe_message'],
                        $attachments,
                        $other,
                        $attempt,
                        $smtp_arr
                    )->delay(
                        now()
                            ->addSeconds(0)
                            ->setTimezone($time_zone)
                    );
                }
            // }
        }

        artisanExceptionHandle('schedule:run');
    }


    function showTemplates($request)
    {
        $template_url = "http://63.250.45.252/resources/index.php";
        $template_data = [];
        $type = $request->category;
        $search = $request->search_data;

        if (Session::has('cache_downloadable_templates')) {
            $template_data = json_decode(stripslashes(Session::get('cache_downloadable_templates')));
        } else {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $template_url . "?view_templates=1");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                "Host: sendsterapp.in"
            ));
            $res = curl_exec($ch);
            curl_close($ch);
            $jsntemplates = $res;
            $data = json_decode($res);
            if (count($data) > 0) {
                Session::put('cache_downloadable_templates', $jsntemplates);
                $template_data = $data;
            }
        }

        $search_arr = array();
        if (strlen($search) > 3) {
            $search = strtolower($search);
            $search_arr = explode(" ", $search);
            $search_arr = array_merge(array($search), $search_arr);
        }

        $searched_data = array_filter($template_data, function ($item) use ($type, $search) {
            if ($type != "all") {
                return str_contains($item->tags, $type) && str_contains($item->name, $type) && (str_contains($item->tags, $search) ||
                    str_contains($item->name, $search));
            } else {
                return str_contains($item->tags, $search) || str_contains($item->name, $search);
            }
        }, ARRAY_FILTER_USE_BOTH);

        $elementsToKeep = count($searched_data) - 1;
        $trimmedArray = array_slice($searched_data, 0, $elementsToKeep);

        $removedArray = array_slice($searched_data, $elementsToKeep, 2);

        return [$trimmedArray, $removedArray];
    }

    private function emptyImagesFolder()
    {
        $imagesPath = storage_path('app/public/template_data/images/');
        $files = glob($imagesPath . '*');
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
    }

    function getHtml($request)
    {
        $id = $request['id'];
        $url = "https://sendsterapp.in/resources/index.php" . "?download=" . $id;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $res = curl_exec($ch);
        curl_close($ch);
        $res = json_decode($res, true);

        self::emptyImagesFolder();

        $html = base64_decode($res['index.html']);

        $dir = base64_decode($res['dir']);
        $explode_dir = explode("/", $dir);
        $dir = $explode_dir[count($explode_dir) - 2];

        $res = preg_replace('/<!--(.|\s)*?-->/', '', $html);

        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML('<?xml encoding="utf-8" ?>' . $res);

        $styleContent = '';
        $styleTags = $dom->getElementsByTagName('style');
        if ($styleTags->length > 0) {
            $styleContent = $styleTags->item(0)->nodeValue;
        }

        // Get the content within the <body> tag
        $bodyContent = '';
        $body = $dom->getElementsByTagName('body')->item(0);
        if ($body) {
            foreach ($body->childNodes as $node) {
                $bodyContent .= $dom->saveHTML($node);
            }
        }

        if ((strpos($bodyContent, "<body>") > 0) && (strpos($bodyContent, "</body>") > 0)) {
            $res = substr($bodyContent, (strpos($bodyContent, "<body>") + 6), (strpos($bodyContent, "</body>") - (strpos($bodyContent, "<body>") + 6)));
        }

        $bodyContent = str_replace("%7B", "{", $bodyContent);
        $bodyContent = str_replace("%7D", "}", $bodyContent);

        $htmlContent = "<style>" . $styleContent . "</style>" . $bodyContent;

        // $images = [];
        $replace_image_str1 = 'https://sendsterapp.in/storage/templates/' . $dir . '/demo/images/';
        $htmlContent = replaceImages($replace_image_str1, $htmlContent);

        return $htmlContent;
    }

    function save_html(Request $request)
    {
        $html = $request['html'];
        $html = "<!DOCTYPE html><html><head></head>" . $html . "</html>";
        $storage_url = storage_path('app/public/template_data/index.html');
        return ['status' => file_put_contents($storage_url, $html)];
    }
}
