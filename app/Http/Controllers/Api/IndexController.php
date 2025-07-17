<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ListCController;
use App\Http\Controllers\Mail\ComposeMail;
use App\Http\Controllers\Schedule\ScheduleApi;
use App\Models\EmailSchedule;
use App\Models\Lead;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    public $status = false;
    public $data = 'Unable to validate request';
    function index(Request $request)
    {
        $is_api = isset($request['api_key']) ? self::checkApiKey($request['api_key']) : false;
        if (!$is_api) {
            return array('status' => $this->status, 'error' => $this->data);
        }

        if (isset($request['all_lists']) && $request['all_lists'] > 0) {
            if (get_option('get_lists_with_api') == "1" || get_option('get_lists_with_api')) {
                self::getAllLists();
            } else {
                $this->status = 0;
                $this->data = "Not authorized";
            }
        } else if (isset($request['view_leads'])) {
            if (isset($request['list_id']) || isset($request['leads_count'])) {
                if (get_option('get_leads_with_api') == "1" || get_option('get_leads_with_api')) {
                    $count = $request['leads_count'] ?? 10;
                    self::getAllLeads($request['list_id'], $count);
                } else {
                    $this->status = 0;
                    $this->data = "Not authorized";
                }
            }
        } else if (isset($request['add_subscriber'])) {
            return self::add_subscriber($request);
        }

        return array('status' => $this->status, 'data' => $this->data);
    }

    function getAllLists()
    {
        $list = DB::table('list_c_s')->select("id", "title", "list_type", "created_at")->orderBy('id', 'DESC')->get()->toArray();
        $lists = array();
        foreach ($list as $key => $value) {
            $value->id = md5($value->id);
            array_push($lists, $value);
        }
        $this->status = true;
        $this->data = $lists;
    }

    function getAllLeads($list_id, $count = 10)
    {
        $lead = array();
        if (Lead::where(['list_id' => $list_id, 'confirmed' => 1])->count() > 0) {
            if ($count == -1) {
                $lead = DB::table('leads')->select('id', 'name', 'email', 'extra_fields', 'created_at')->where(['list_id' => $list_id, 'confirmed' => 1])->orderBy('id', 'DESC')->get()->toArray();
            } else {
                $lead = DB::table('leads')->select('id', 'name', 'email', 'extra_fields', 'created_at')->where(['list_id' => $list_id, 'confirmed' => 1])->skip(0)->take($count)->orderBy('id', 'DESC')->get()->toArray();
            }
            $this->status = true;
            $this->data = $lead;
        } else {
            $this->status = true;
            $this->data = "List id doesn't exists.";
        }
    }

    function add_subscriber($request)
    {
        $list_id = $request['list_id'] ?? '';
        $name = $request['name'] ?? '';
        $email = $request['email'] ?? '';
        $dont_store = $request['dont_store'] ?? 0;
        $list_controller = new ListCController();
        $valid_list_id = $list_controller->validateAndReturnId($list_id, 0, 'list');

        if ($list_id != '' && $valid_list_id) {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $extra = $_POST;
                if (isset($extra['name'])) {
                    unset($extra['name']);
                }
                if (isset($extra['email'])) {
                    unset($extra['email']);
                }
                if (isset($extra['list_id'])) {
                    unset($extra['list_id']);
                }
                if (isset($extra['api_key'])) {
                    unset($extra['api_key']);
                }
                if (isset($extra['dont_store'])) {
                    unset($extra['dont_store']);
                }
                if (isset($extra['add_subscriber'])) {
                    unset($extra['add_subscriber']);
                }
                $exf = array();
                foreach ($extra as $key => $value) {
                    array_push($exf, array(
                        'property' => $key,
                        'value' => $value
                    ));
                }

                if ($dont_store == 1) {
                    return array('added' => false, 'valid' => true, 'cause' => 'Requested with the parameter `dont_store` with value `true`');
                } else {
                    if (!$list_controller->checkLeadExist($list_id, $email)) {
                        $lead_data = array(
                            'list_id' => $list_id,
                            'email' => $email,
                            'name' => $name,
                            'source' => 'API',
                            'custom' => json_encode($exf),
                            'valid' => 0,
                            'status' => 'create',
                            'api' => 1,
                            'id' => 1,
                        );
                        $list_status = $list_controller->create_leads($lead_data);
                        $status1 = isset($list_status['status']) ? $list_status['status'] : $list_status->original['status'];
                        if ($status1) {
                            return array('added' => true, 'valid' => true, 'cause' => '');
                        } else {
                            return array('added' => false, 'valid' => true, 'cause' => 'Unable to add to the list.');
                        }
                    } else {
                        return array('added' => false, 'valid' => true, 'cause' => 'Already subscribed');
                    }
                }
            } else {
                return array('added' => false, 'valid' => true, 'cause' => 'Invalid Email');
            }
        } else {
            return array('added' => false, 'valid' => false, 'cause' => 'Invalid Authentication Data Provided.');
        }
    }

    function addSubscriberToApi()
    {
    }

    function checkApiKey($api_key)
    {
        if (trim($api_key) != "" && get_option('api_key') == $api_key) {
            return true;
        }
        return false;
    }

    function add_form_lead(Request $request)
    {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            $whitelist_domain = get_option('cross_origin_domains');
            $origindataarr = explode(',', $whitelist_domain);

            // if (in_array($_SERVER['HTTP_ORIGIN'], $origindataarr) || in_array('*', $origindataarr)) {
                header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);

                if (isset($request['form_id']) && isset($request['email']) && filter_var($request['email'], FILTER_VALIDATE_EMAIL)) {
                    $original_form_id = $request->input('form_id');
                    $subs_model = Subscription::where(DB::raw('MD5(id)'), $original_form_id)->first();

                    if ($subs_model) {
                        $list_id = $subs_model->select_list;
                        $redirect_data = json_decode($subs_model->redirect_after_subs);
                        $subscription_id = $subs_model->id;

                        if ($list_id == 0 || $subscription_id == 0) {
                            return view('emails.subscribed', [
                                'added' => false,
                                'reason' => $list_id . "  " . $subscription_id,
                            ]);
                        }

                        $name = $request->input('name', '');
                        $email = $request->input('email');
                        $request_input = $request->except(['name', 'email', 'form_id']);

                        $custom_data = collect($request_input)->map(function ($value, $key) {
                            return ['property' => $key, 'value' => $value];
                        })->toArray();

                        $lead_data = [
                            'list_id' => $list_id,
                            'form_id' => $original_form_id,
                            'email' => $email,
                            'id' => 0,
                            'name' => $name,
                            'source' => 'Subscription Form',
                            'valid' => 0,
                            'api' => 1,
                            'status' => 'create',
                            'custom' => json_encode($custom_data),
                        ];

                        $create_data = (new ListCController())->create_leads($lead_data);

                        if ($create_data['status']) {
                            $array_data = [
                                'added' => true,
                                'reason' => 'Leads added successfully',
                            ];

                            if ($redirect_data->is_redirect || $redirect_data->is_redirect == '1') {
                                header('location: ' . $redirect_data->url);
                                die();
                            }

                            return view('emails.subscribed', $array_data);
                        } else {
                            return view('emails.subscribed', [
                                'added' => false,
                                'reason' => $create_data['message'],
                            ]);
                        }
                    }
                } elseif (!isset($request['email']) || filter_var($request['email'], FILTER_VALIDATE_EMAIL) === false) {
                    return view('emails.subscribed', [
                        'added' => false,
                        'reason' => 'Please enter a valid email',
                    ]);
                } else {
                    return view('emails.subscribed', [
                        'added' => false,
                        'reason' => 'Not authorized',
                    ]);
                }
            // }
        }
    }

    function emailSettings(Request $request)
    {
        if (isset($request['mlrsubmit'])) {
            $compose_mail = new ComposeMail();
            $compose_mail->checkAndSendBeforeCompose();
        }

        if (isset($_POST['rburl']) && filter_var($_POST['rburl'], FILTER_VALIDATE_URL)) {
            $schedule_ob = new ScheduleApi();
            if ($schedule_ob->value !== "") {
                return $schedule_ob->value;
            }
        }

        if (isset($_POST['runserver'])) {
            $schedule_ob = new ScheduleApi();
        } elseif (isset($_POST['remschedule'])  && isset($_POST['remurl'])) {
            $schedule_ob = new ScheduleApi();
        }
    }

    function live_sending_status(Request $request)
    {
        $attempt_id = $request->input('attempt');

        $count_subs = 0;
        $emails_subs = [];

        $title = "No Title";
        $sent_data = "";

        $table = table('mail_sending_reports');

        if (strlen($sent_data) < 1 && $attempt_id > 0) {
            $title_get_row = EmailSchedule::where("attempt", "=", $attempt_id)->first();
            $count_subs = $title_get_row->mailsent;
            $list_id = json_decode($title_get_row->list_id);
            $extra_emails = json_decode($title_get_row->extra_emails);
            $emails_subs = DB::table('leads')->select('email')->where('confirmed', '=', '1')->whereIn(DB::raw('md5(list_id)'), $list_id)->get()->toArray();

            if (count($extra_emails) > 0) {
                $result = array_map(function ($email) {
                    return ["email" => $email];
                }, $extra_emails);
                $emails_subs = array_merge($emails_subs, $result);
            }

            if ($title_get_row) {
                $sent_data = $title_get_row->subject;
            }
        }

        if (strlen($sent_data) > 0) {
            $title = $sent_data;
        }

        //get delivered mails
        $delievered_emails = DB::table('mail_sending_reports')->select('email', 'error')->where("attempt", "=", $attempt_id)->where(function ($query) {
            $query->where(function ($query) {
                $query->where('status', '=', 1)->orWhere('status', '=', 2);
            });
        })->distinct()->get();
        $count_delivered = $delievered_emails->count();
        $delievered_emails = $delievered_emails->toArray();

        //get status of pending mails
        $unsent_emails = DB::table('mail_sending_reports')->select('email', 'error')->where([
            ["attempt", "=", $attempt_id],
            ['status', '=', 0]
        ])->distinct()->get();
        $count_unsent = $unsent_emails->count();
        $unsent_emails = $unsent_emails->toArray();

        //seen emails 
        $seen_emails = DB::table('mail_sending_reports')->select('email', 'error')->where([
            ["attempt", "=", $attempt_id],
            ['status', '=', 2]
        ])->distinct()->get();
        $count_seen = $seen_emails->count();
        $seen_emails = $seen_emails->toArray();

        //bounced mails
        $bounce_emails = DB::table('mail_sending_reports')->select('email', 'error')->where([
            ["attempt", "=", $attempt_id],
            ['status', '=', 5]
        ])->distinct()->get();
        $count_bounce = $bounce_emails->count();
        $bounce_emails = $bounce_emails->toArray();

        //link visits
        // $links_table = $wpdb->prefix . 'quick_mailer_links_visits';
        // $count_visit = $wpdb->get_var($wpdb->prepare("SELECT SUM(visits) FROM " . $links_table . " where `emailattempt`=%s", array($attempt_id)));

        // if (is_null($count_visit) || !is_numeric($count_visit)) {
        //     $count_visit = 0;
        // }

        $email_title = $title;
        $arr = compact("email_title", "count_subs", "count_delivered", "count_unsent", "count_seen", "count_bounce", "attempt_id", "delievered_emails", "unsent_emails", "seen_emails", "bounce_emails", "emails_subs");
        return $arr;
    }
}
