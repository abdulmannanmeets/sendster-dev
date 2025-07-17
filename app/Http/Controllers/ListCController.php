<?php

namespace App\Http\Controllers;

use App\Jobs\UploadEmailsJob;
use App\Models\Lead;
use App\Models\ListC;
use App\Models\ListError;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class ListCController extends Controller
{
    protected $status = 0;
    protected $msg = "Something went wrong!";

    function index(Request $request)
    {
        if ($request['list_type'] == 'get') return self::get_all();
        if ($request['list_type'] == 'get_email_lists') return self::get_email_lists();
        if ($request['list_type'] == 'get_leads') return self::get_leads($request['list_id'], true, $request);
        elseif ($request['list_type'] == 'get_leads_with_array') return self::get_leads_with_array($request['list_ids']);
        elseif ($request['list_type'] == 'create') return self::create_list($request);
        elseif ($request['list_type'] == 'edit') return self::edit_list($request);
        elseif ($request['list_type'] == 'delete') return self::delete_list($request);
        elseif ($request['list_type'] == 'delete_leads') return self::delete_lead($request);
        elseif ($request['list_type'] == 'create_leads') return self::create_leads($request);
        elseif ($request['list_type'] == 'list_templates') return self::list_templates($request);
        elseif ($request['list_type'] == 'get_list_templates') return self::get_list_templates($request);
        elseif ($request['list_type'] == 'storefromcsv') return self::store_from_csv($request);
        elseif ($request['list_type'] == 'priority_update') return self::priority_update($request);
        elseif ($request['list_type'] == 'get_basic') return self::get_basic($request);
        elseif ($request['list_type'] == 'get_error') return self::get_error();
        elseif ($request['list_type'] == 'delete_error') return self::delete_error($request);
        elseif ($request['list_type'] == 'get_table_leads') return self::getTableLeads($request);
        elseif ($request['list_type'] == 'get_form_leads') return self::getFormLeads($request);
    }

    function getTableLeads($request)
    {
        $start = $request['start'];
        $length = $request['length'];
        $draw = $request['draw'];
        $listId = $request['list_id'];

        $lists = Lead::orderBy('id', 'desc')->where([['confirmed', '=', 1], ['list_id', '=', md5($listId)]])->skip($start)->take($length)->get();
        $lists = $lists->map(function($total) {
            $total->id = md5($total->id);
            $total->list_id = md5($total->list_id);
            $total->created_at = changeDateTime($total->created_at);
            return $total;
        });
        $totalRecordsCount = Lead::where([[DB::raw('MD5(list_id)'), '=', $listId], ["confirmed", "=", 1]])->count();
        return [
            "draw" => intval($draw),
            "recordsTotal" => number_format(intval($totalRecordsCount)),
            "data" => $lists
        ];
    }

    function create_list($request)
    {
        $request->validate([
            'list_title' => ['required', 'string'],
            'list_types' => ['required']
        ]);

        $lists = new ListC();
        $lists->title = $request['list_title'];
        $lists->description = $request['list_description'];
        $lists->list_type = $request['list_types'];
        $lists->list_api_verify = 0;
        $lists->verified = 0;
        $lists->unverified = 0;
        $lists->priority = count(self::get_all()['message']) + 1;
        $lists->subscribe = '{"success_page_url":null,"confirmed_page_url":null,"subscribed_page_url":null}';
        $lists->unsubscribed = '{"behavior":"off","user":"off","unsubscribe_page_url":null}';
        $lists->thank_you_email = json_encode(['is' => "false", 'subject' => "You're on our list!", "message" => '<table id="bodyTable" style="table-layout: fixed; background-color: #ffffff;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td id="bodyCell" style="padding-right: 10px; padding-left: 10px;" align="center" valign="top"><table class="wrapperWebview" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"> </td></tr></tbody></table><table class="wrapperBody" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"><table class="tableCard" style="background-color: #ffffff; border-color: #E5E5E5; border-style: solid; border-width: 0 1px 1px 1px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="imgHero" style="padding-bottom: 10px;" align="center" valign="top"><a style="text-decoration: none;" href="#" target="_blank" rel="noopener"><img style="width: 100%; max-width: 150px; height: auto; display: block;" src="https://mechmarketers.com/sendy/img/email-notifications/applause.gif" alt="" width="150" border="0" /></a></td></tr><tr><td class="mainTitle" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h2 class="text" style="color: #000000; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;">Welcome to the club!</h2></td></tr><tr><td class="subTitle" style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h4 class="text" style="color: #848484; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">You have landed on our list. Changed your mind? Click on the below button to opt out.</h4></td></tr><tr><td class="containtTable ui-sortable" style="padding-left: 20px; padding-right: 20px;" align="center" valign="top"><table class="tableButton" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding-top: 0px; padding-bottom: 20px;" align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="ctaButton" style="background-color: #000000; border-radius: 50px; padding: 12px 35px 12px 35px;" align="center"><a class="text" style="color: #ffffff; font-family: Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" href="[unsubscribe]" target="_blank" rel="noopener">Unsubscribe me</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px;" height="20"> </td></tr></tbody></table><table class="space" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 1px; line-height: 1px;" height="30"> </td></tr></tbody></table></td></tr></tbody></table><p style="color: #666666; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; line-height: 22px; padding: 0; margin: 0;">Powered by <a style="color: #666666; text-decoration: underline;" href="https://getsendster.in">Sendster</a></p></td></tr></tbody></table>']);
        $lists->confirm_email = json_encode(['subject' => 'Please confirm your subscription', 'message' => '<table id="bodyTable" style="table-layout: fixed; background-color: #ffffff;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td id="bodyCell" style="padding-right: 10px; padding-left: 10px;" align="center" valign="top"><table class="wrapperWebview" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"> </td></tr></tbody></table><table class="wrapperBody" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"><table class="tableCard" style="background-color: #ffffff; border-color: #E5E5E5; border-style: solid; border-width: 0 1px 1px 1px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="imgHero" style="padding-bottom: 10px;" align="center" valign="top"><a style="text-decoration: none;" href="#" target="_blank" rel="noopener"><img style="width: 100%; max-width: 150px; height: auto; display: block;" src="https://mechmarketers.com/sendy/img/email-notifications/almost-there.gif" alt="" width="150" border="0" /></a></td></tr><tr><td class="mainTitle" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h2 class="text" style="color: #000000; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;">Almost there!!</h2></td></tr><tr><td class="subTitle" style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h4 class="text" style="color: #848484; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">Click on the given link to confirm your subscription:</h4></td></tr><tr><td class="containtTable ui-sortable" style="padding-left: 20px; padding-right: 20px;" align="center" valign="top"><table class="tableButton" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding-top: 0px; padding-bottom: 20px;" align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="ctaButton" style="background-color: #000000; border-radius: 50px; padding: 12px 35px 12px 35px;" align="center"><a class="text" style="color: #ffffff; font-family: Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" href="[confirmation_link]" target="_blank" rel="noopener">Confirm your subscription</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px;" height="20"> </td></tr></tbody></table><table class="space" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 1px; line-height: 1px;" height="30"> </td></tr></tbody></table></td></tr></tbody></table><p style="color: #666666; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; line-height: 22px; padding: 0; margin: 0;">Powered by <a style="color: #666666; text-decoration: underline;" href="https://getsendster.in">Sendster</a></p></td></tr></tbody></table>']);
        $lists->goodbye_email = json_encode(['is' => "false", "subject" => "You're unsubscribed", "message" => '<table id="bodyTable" style="table-layout: fixed; background-color: #ffffff;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td id="bodyCell" style="padding-right: 10px; padding-left: 10px;" align="center" valign="top"><table class="wrapperWebview" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"> </td></tr></tbody></table><table class="wrapperBody" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"><table class="tableCard" style="background-color: #ffffff; border-color: #E5E5E5; border-style: solid; border-width: 0 1px 1px 1px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="imgHero" style="padding-bottom: 10px;" align="center" valign="top"><a style="text-decoration: none;" href="#" target="_blank" rel="noopener"><img style="width: 100%; max-width: 150px; height: auto; display: block;" src="https://mechmarketers.com/sendy/img/email-notifications/sad.gif" alt="" width="150" border="0" /></a></td></tr><tr><td class="mainTitle" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h2 class="text" style="color: #000000; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;">Leaving Us!</h2></td></tr><tr><td class="subTitle" style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h4 class="text" style="color: #848484; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">Unsubscribed by accident? Click on the given link to re-subscribe.</h4></td></tr><tr><td class="containtTable ui-sortable" style="padding-left: 20px; padding-right: 20px;" align="center" valign="top"><table class="tableButton" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding-top: 0px; padding-bottom: 20px;" align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="ctaButton" style="background-color: #000000; border-radius: 50px; padding: 12px 35px 12px 35px;" align="center"><a class="text" style="color: #ffffff; font-family: Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" href="[resubscribe]" target="_blank" rel="noopener">Re-subscribe me</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px;" height="20"> </td></tr></tbody></table><table class="space" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 1px; line-height: 1px;" height="30"> </td></tr></tbody></table></td></tr></tbody></table><p style="color: #666666; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; line-height: 22px; padding: 0; margin: 0;">Powered by <a style="color: #666666; text-decoration: underline;" href="https://getsendster.in">Sendster</a></p></td></tr></tbody></table>']);
        $lists->save();
        self::refreshList();

        $message = array(
            'id' => md5($lists->id),
            'created_at' => changeDateTime($lists->created_at)
        );

        return array(
            'status' => 1,
            'message' => $message
        );
    }

    function edit_list($request)
    {
        $is_save = 0;
        $request->validate([
            'list_id' => 'required',
            'list_title' => 'required',
            'list_types' => 'required',
            'list_api_verify' => 'required',
            'list_status' => 'required'
        ]);

        if ($request['list_status'] === 'basic') {
            $is_save = self::basic_edit($request);
        }

        return array(
            'status' => $is_save
        );
    }

    function delete_list($request)
    {
        $request->validate([
            'id' => 'required'
        ]);

        $explode_id = $request['id'];

        $is_list = ListC::whereIn(DB::raw("md5(id)"), $explode_id)->delete();
        $is_lead = Lead::whereIn(DB::raw("md5(list_id)"), $explode_id)->delete();

        self::refreshList();

        return array(
            'status' => $is_list && $is_lead,
        );
    }

    function delete_lead($request)
    {
        $request->validate([
            'id' => 'required',
            'list_id' => 'required',
        ]);
        $is_delete = Lead::where(DB::raw("md5(list_id)"), "=", $request["list_id"])->whereIn(DB::raw("md5(id)"), $request['id'])->delete();

        return array(
            'status' => $is_delete ? 1 : 0,
            'message' => self::get_leads($request['list_id'])
        );
    }

    function get_email_lists()
    {
        $verifyemail = new VerifyEmailController();
        $verifyemail->updateCredit();
        return self::get_all();
    }

    function get_all($name = "", $is_md5 = true)
    {
        if ($name !== "") {
            $lists = Lead::orderBy('id', 'desc')->where('confirmed', '=', 1)->get()->toArray();
        } else {
            $lists = ListC::orderBy('id', 'desc')->get()->toArray();
        }

        if (!empty($lists)) {
            foreach ($lists as $id => $value) {
                $lists[$id]['id'] = $is_md5 ? md5($value['id']) : $value['id'];
                $lists[$id]['created_at'] = changeDateTime($lists[$id]['created_at']);

                $lists[$id]['leads'] = number_format(Lead::where([['list_id', '=', $value['id']], ['confirmed', '=', 1]])->count());
                $lists[$id]['verified'] = number_format(Lead::where([['list_id', '=', $value['id']], ['verified', '=', 1], ['confirmed', '=', 1]])->count());
                $lists[$id]['unverified'] = number_format(Lead::where([['list_id', '=', $value['id']], ['verified', '=', 0], ['confirmed', '=', 1]])->count());
            }

            $verify_email = new VerifyEmailController();
            $credit_url = $verify_email->getCreditURL();
            $credit = $verify_email->credit;

            return array(
                'status' => 1,
                'message' => $lists,
                'credit' => ($credit===false || $credit==='false') ? 0 : $credit,
                'credit_url' => $credit_url
            );
        }
        return array(
            'status' => 0,
            'message' => array(),
            'credit' => 0,
            'credit_url' => ""
        );
    }

    function get_basic($request)
    {
        $request->validate([
            'list_id' => ['required']
        ]);
        return ListC::select(DB::raw('MD5(id) as id1'), 'title', 'description', 'list_type', 'list_api_verify')->where(DB::raw("md5(id)"), "=", $request['list_id'])->first();
    }

    function get_leads($list_id, $is_md5 = true, $inputs = [])
    {
        $lists = Lead::where([[DB::raw("md5(list_id)"), $list_id], ["confirmed", "=", 1]])->orderBy('id', 'desc')->get()->toArray();
        if (isset($inputs['search_type'])) {
            if ($inputs['search_type'] == 'verified') {
                $lists = Lead::where([[DB::raw("md5(list_id)"), '=', $list_id], ['verified', '=', 1], ["confirmed", "=", 1]])->orderBy('id', 'desc')->get()->toArray();
            } else if ($inputs['search_type'] == 'unverified') {
                $lists = Lead::where([[DB::raw("md5(list_id)"), '=', $list_id], ['verified', '=', 0], ["confirmed", "=", 1]])->orderBy('id', 'desc')->get()->toArray();
            }
        }
        foreach ($lists as $id => $value) {
            $lists[$id]['id'] = $is_md5 ? md5($value['id']) : $value['id'];
            $lists[$id]['list_id'] = md5($value['list_id']);
            $lists[$id]['created_at'] = changeDateTime($lists[$id]['created_at']);
        }

        return array(
            'status' => 1,
            'message' => $lists
        );
    }

    function get_leads_with_array($request)
    {
        $explode = explode(',', $request);
        $data = DB::table('leads')->select('email')
                ->where('confirmed', '=', 1)
                ->where('verified', '=', 0)
                ->whereIn(DB::raw("MD5(list_id)"), $explode)
                ->selectRaw('name')
                ->selectRaw('extra_fields')
                ->selectRaw('verified')
                ->groupBy('email')
                ->orderBy('id', 'desc')->get()->toArray();
        // $data = DB::table('leads')->select('name', 'email', 'extra_fields', 'verified')->whereIn(DB::raw("MD5(list_id)"), $explode)->groupBy('email')->orderBy('id', 'desc')->distinct('email')->get()->toArray();
        return $data;
    }

    function basic_edit($request)
    {
        $get_all = self::get_all('', false)['message'];
        $is_save = 0;

        foreach ($get_all as $key => $value) {
            if ($request['list_id'] === md5($value['id'])) {
                $id = $get_all[$key]['id'];
                $find_data = ListC::find($id);
                $find_data->title = $request['list_title'];
                $find_data->description = $request['list_description'];
                $find_data->list_type = $request['list_types'];
                $find_data->list_api_verify = $request['list_api_verify'];
                $find_data->updated_at = now();
                $is_save = $find_data->save();

                $find_data->touch();
                break;
            }
        }
        return $is_save;
    }

    function create_leads($request)
    {
        if (!isset($request['api'])) {
            $request->validate([
                'list_id' => 'required',
                'email' => ['required'],
                'source' => 'required',
                'valid' => 'required',
                'status' => 'required'
            ]);
        }

        // Check the status of same email
        $lead_status_data = Lead::where([["email", "=", $request['email']], ['verified', '=', 1]])->distinct()->take(1)->get('email')->toArray();
        $request['valid'] = count($lead_status_data) > 0 ? 1 : 0;
        
        if (filter_var($request['email'], FILTER_VALIDATE_EMAIL)) {
            $list_data = ListC::where(DB::raw("md5(id)"), "=", $request['list_id'])->first();
            if ($list_data) {
                if ($request['status'] == "create") {
                    $is_email_already = Lead::where([["email", "=", $request['email']], [DB::raw("md5(list_id)"), "=", $request['list_id']]])->first();
                    if ($is_email_already) {
                        if(isset($request['is_replace'])) {
                            Lead::where('id', $is_email_already->id)->update([
                                'name' => $request["name"],
                                'email' => $request["email"],
                                'extra_fields' => $request["custom"],
                                'updated_at' => now(),
                            ]);
                            return response()->json([
                                'status' => 1,
                                'message' => 'List updated successfully'
                            ]);
                        } else {
                            ListError::insert([
                                "name" => $request["name"],
                                "list_id" => $request["list_id"],
                                "email" => $request["email"],
                                "extra_fields" => $request["custom"],
                                "error" => "The email has already been taken",
                            ]);
                            return response()->json([
                                'status' => 0,
                                'message' => 'The email has already been taken.'
                            ]);
                        }
                    } else {
                        if ($list_data->list_api_verify && trim($request['source']) != "Admin" && !$request['valid']) {
                            $verify = new VerifyEmailController();
                            $request['valid'] = $verify->processValidation($request['email'], "list");
                        }
                        $lead = new Lead();
                        $lead->name = $request['name'];
                        $lead->list_id = $list_data->id;
                        $lead->email = $request['email'];
                        $lead->source = $request['source'];
                        $lead->verified = $request['valid'];
                        if (($list_data->list_type=='1' || $list_data->list_type==1) && trim($request['source']) != "Admin") {
                            $lead->confirmed = 0;
                        }
                        if (isset($request['form_id'])) {
                            $lead->subs_id = $request['form_id'];
                        }
                        $lead->extra_fields = $request['custom'];
                        $this->status = $lead->save();

                        if ($this->status && ($request['source'] != "Admin")) {
                            self::sendMailAccordingListType($list_data, $request['email']);
                        }
                        $this->msg = array(
                            'id' => md5($lead->id),
                            'type' => $list_data->list_type,
                            'created_at' => $lead->created_at->format('d F Y'),
                        );
                    }
                } else {
                    $this->status = Lead::where([[DB::raw("md5(id)"), "=", $request['id']], [DB::raw("md5(list_id)"), "=", $request['list_id']]])->update([
                        'name' => $request['name'],
                        'email' => $request['email'],
                        'extra_fields' => $request['custom'],
                    ]);
                    if ($this->status > 0) {
                        $this->msg = "Leads updated successfully";
                    } else {
                        $this->msg = "Unable to update.";
                    }
                }
            }
        } else {
            ListError::insert([
                "name" => $request["name"],
                "list_id" => $request["list_id"],
                "email" => $request["email"],
                "extra_fields" => $request["custom"],
                "error" => "Invalid email",
            ]);
            return response()->json([
                'status' => 0,
                'message' => 'Please enter a valid email'
            ]);
        }
        return array(
            'status' => $this->status,
            'message' => $this->msg
        );
    }

    function checkVerification($list_id, $email, $source, $valid)
    {
        if ($source != 'Admin' && !$valid) {
            $list_data = ListC::select('list_api_verify')->where(DB::raw("md5(id)"), "=", $list_id)->first()->toArray()[0];
            $list_api_verify = $list_data['list_api_verify'];
            if ($list_api_verify) {
                $verify = new VerifyEmailController();
                $data = $verify->processValidation($email, "list");
            }
        }
    }

    function sendMailAccordingListType($list_details, $email)
    {
        $attempt = get_option('mail_attempt') + 1;
        update_option('mail_attempt', $attempt);
        $smtp_id = get_option('global_smtp_id');
        if ($smtp_id != "") {
            if ((int)$list_details['list_type']) {
                self::sendDoubleOptin($list_details, $email, array($smtp_id), $attempt);
            } else {
                self::sendThankYouEmail($list_details, $email, array($smtp_id), $attempt);
                $sequence_ob = new SequenceController();
                $sequence_ob->sendSequence($attempt, $list_details, $email);
            }
        }
    }

    function sendThankYouEmail($list_details, $email, $smtp_id, $attempt)
    {
        $thankyou_details = json_decode($list_details['thank_you_email']);
        if ((bool)$thankyou_details->is) {
            $data = array(
                'id' => 0,
                "email_details" => array("subject" => $thankyou_details->subject, 'list_ids' => [["value" => md5($list_details->id)]], 'smtp_ids' => [["value" => $smtp_id]], 'manual_emails' => $email),
                'email_body' => ["body" => $thankyou_details->message],
                'attachments' => array("name" => "", "url" => ""),
                'body' => $thankyou_details->message,
                'other' => array("unsubscribe_message" => "", "is_schedule" => 0, "schedule_option" => ["datetime" => date('d-m-Y h:ia'), "timezone" => date_default_timezone_get(), "thankyou" => 1]),
                'token' => $attempt,
                'list_ids' => array("value" => md5($list_details->id)),
            );
            $camp = new CampaignController();
            $camp->composeOrSchedule($data);
        }
    }

    function sendDoubleOptin($list_details, $email, $smtp_id, $attempt)
    {
        $list_data = json_decode($list_details['confirm_email']);
        $data = array(
            'id' => 0,
            "email_details" => array("subject" => $list_data->subject, 'list_ids' => [["value" => md5($list_details->id)]], 'smtp_ids' => [["value" => $smtp_id]], 'manual_emails' => $email),
            'email_body' => ["body" => $list_data->message],
            'body' => $list_data->message,
            'attachments' => array("name" => "", "url" => ""),
            'other' => array("unsubscribe_message" => "", "is_schedule" => 0, "schedule_option" => ["datetime" => date('d-m-Y h:ia'), "timezone" => date_default_timezone_get(), "double_opt" => 1]),
            'token' => $attempt,
            'list_ids' => array("value" => md5($list_details->id)),
        );
        $camp = new CampaignController();
        $camp->composeOrSchedule($data);
    }

    function validateAndReturnId($list_id, $id, $is = "lead")
    {
        $int_id = 0;
        if ($is == "lead") {
            $lead = self::get_leads($list_id, FALSE)['message'];
            foreach ($lead as $key => $value) {
                if (md5($value['id']) == $id) {
                    $int_id = $value['id'];
                    break;
                }
            }
        } else {
            $list = self::get_all("", false)['message'];
            foreach ($list as $key => $value) {
                if (md5($value['id']) == $list_id) {
                    $int_id = $value['id'];
                    break;
                }
            }
        }
        return $int_id;
    }

    function list_templates($request)
    {
        $request->validate([
            'list_id' => 'required'
        ]);

        $id = self::validateAndReturnId($request['list_id'], '123', 'list');
        $list = ListC::find($id);
        if ($list) {
            $list->confirm_email = $request['confirm_email'];
            $list->goodbye_email = $request['goodbye_email'];
            $list->subscribe = $request['subscribe'];
            $list->thank_you_email = $request['thank_you_email'];
            $list->unsubscribed = $request['unsubscribed'];
            $list->updated_at = now();
            $this->status = $list->save();
            $list->touch();
            $this->msg = "Saved successfully";
        }

        return array(
            'status' => $this->status,
        );
    }

    function get_list_templates($request)
    {
        $request->validate([
            'list_id' => 'required'
        ]);

        $id = self::validateAndReturnId($request['list_id'], '123', 'list');
        $list = ListC::find($id);
        if ($list) {
            $message = array(
                'confirm_email' => $list->confirm_email,
                'goodbye_email' => $list->goodbye_email,
                'subscribe' => $list->subscribe,
                'thank_you_email' => $list->thank_you_email,
                'unsubscribed' => $list->unsubscribed,
            );

            $this->msg = $message;
            $this->status = 1;
        }

        return array(
            'status' => $this->status,
            'message' => $this->msg
        );
    }

    function arrangeListsBasedOnPriority($lists = array())
    {
        if (count($lists) > 0) {
            return DB::table('list_c_s')->select("id")->orderBy('priority', 'DESC')->get()->toArray();
        }
    }

    function checkLeadExist($list_id, $email)
    {
        $data = Lead::where([
            [DB::raw('md5(list_id)'), '=', $list_id],
            ['email', '=', $email]
        ])->count();
        if ($data > 0) return true;
        return false;
    }

    function store_from_csv($request)
    {
        $totalBefore = $request['before'];
        $list_id = $request['list_id'];
        $arr = array("count" => 0, "status" => 0);
        if ($request['csv_type'] == "upload") {
            if ($request->hasFile('data') && $request->file('data')->isValid()) {
                $files = $request->file('data');
                $name = $files->getClientOriginalName();
                $extension = $files->getClientOriginalExtension();

                $temp_name = str_replace("." . $extension, "", $name);
                $name = $temp_name . "_" . time() . "." . $extension;
                $files->storeAs('lists', $name, 'public');
                $url = $name;
                $arr["status"] = 1;
                $arr["file"] = $url;
            }
        } else if ($request["csv_type"] == "add") {
            $head = $request["head"];
            $request->validate([
                'selected_name' => 'required'
            ]);

            $selected_name = $request["selected_name"];
            $selected_email = $request["selected_email"];
            $path = storage_path() . '/app/public/lists/' . $request["data"];
            $csv = array();
            $header = null;
            $handle = fopen($path, "r");
            while (($row = fgetcsv($handle, 1000, ","))) {
                if (!$header) {
                    $header = $row;
                } else {
                    $rowData = $custom = array();
                    foreach ($row as $key => $value) {
                        if ($selected_name == "NO" && $header[$key] == $header[$selected_name]) {
                            $rowData[0] = $value;
                        } elseif ($selected_name != "NO" && $header[$selected_name] == $header[$key]) {
                            $rowData[0] = $value;
                        }
                        if ($header[$key] == $header[$selected_email]) {
                            $rowData[1] = $value;
                        } else {
                            $custom[] = [
                                "property" => $header[$key],
                                "value" => $value,
                            ];
                        }
                    }
                    $rowData[] = json_encode($custom);
                    $csv[] = array_filter($rowData);
                }
            }
            fclose($handle);

            $chunkData = array_chunk($csv, 100);
            foreach ($chunkData as $key => $chunk) {
                $arequest = [
                    "data" => $chunk,
                    "list_id" => $request['list_id'],
                    "is_replace" => $request['is_replace'],
                ];
                if ($key == 0) {
                    UploadEmailsJob::dispatch($arequest);
                } else {
                    UploadEmailsJob::dispatch($arequest)->delay(1);
                }
            }
            $arr["status"] = 1;
            $arr["count"] = count($csv);
            artisanExceptionHandle('schedule:run');
        } else if ($request["csv_type"] == "check") {
            $arr = [
                "count" => abs(Lead::where([
                    [DB::raw("md5(list_id)"), $list_id],
                    ["confirmed", "1"],
                    ])->get()->count() - $totalBefore),
            ];
        }
        return $arr;
    }

    function getEmailWithListId($list_id)
    {
        return Lead::select('email')->where([['list_id', $list_id], ['confirmed', '1']])->toArray();
    }

    function refreshList()
    {
        $get_all = self::get_all("", false)['message'];
        foreach ($get_all as $key => $value) {
            ListC::where('id', '=', $value['id'])->update(['priority' => $key + 1]);
        }
    }

    function priority_update($request)
    {
        $request->validate([
            'listId' => 'required',
            'priorityValue' => 'required'
        ]);

        $list_id = self::validateAndReturnId($request['listId'], 0, "list");
        $previousValue = ListC::where(['id' => $list_id])->get("priority")->toArray()[0]['priority'];
        ListC::where('id', '=', $list_id)->update(['priority' => $request['priorityValue']]);
        ListC::where([['id', '!=', $list_id], ['priority', '=', $request['priorityValue']]])->update(['priority' => $previousValue]);
        return self::get_all()['message'];
    }

    function delete_error($request)
    {
        $request->validate([
            "ids" => "required"
        ]);
        $status = ListError::whereIn(DB::raw("md5(id)"), $request['ids'])->delete();
        return [
            'status' => $status,
        ];
    }

    function get_error()
    {
        return DB::table("list_errors")->select(DB::raw("MD5(id) as id"), "name", "email", "list_id", "extra_fields", "error", "created_at")->get();
    }

    function show_confirmation_page(Request $request)
    {
        $email = $request->query('email');
        $list_id = $request->query('list_id');
        $status = 0;
        if ($email != "") {
            $status = 1;
            $email = base64_decode($email);
        }
        if ($list_id != "") {
            $status = 1;
            $list_id = base64_decode($list_id);
        }

        if ($email == "" || $list_id == "") {
            $status = 0;
        }

        if ($status) {
            $confirmed = Lead::where([[DB::raw('md5(list_id)'), $list_id], ["email", $email]])->first();
            $list = ListC::where(DB::raw('md5(id)'), "=", $list_id)->first();
            if (!$confirmed) {
                $status = 0;
            } elseif ($confirmed && $confirmed->confirmed) {
                $status = 2;
            } else {
                $status = DB::table("leads")->update([
                    'confirmed' => 1,
                    'updated_at' => time()
                ]);
                if ($status) {
                    $attempt = get_option('mail_attempt') + 1;
                    update_option('mail_attempt', $attempt);
                    $smtp_id = get_option('global_smtp_id');
                    if ($smtp_id != "") {
                        self::sendThankYouEmail($list->toArray(), $email, array($smtp_id), $attempt);
                    }
                    $sequence_ob = new SequenceController();
                    $sequence_ob->sendSequence($attempt, $list->toArray(), $email);
                }
            }
        }

        $argument = [
            "status" => $status,
            "email" => $email,
        ];

        return view("emails.confirmation", $argument);
    }

    function resubscribe(Request $request)
    {
        $email = $request->query('email');
        $list_id = $request->query('list_id');
        $status = 0;
        if ($email != "") {
            $status = 1;
            $email = base64_decode($email);
        }
        if ($list_id != "") {
            $status = 1;
            $list_id = base64_decode($list_id);
        }

        if ($email == "" || $list_id == "") {
            $status = 0;
        }

        if ($status) {
            $confirmed = Lead::where([[DB::raw('md5(list_id)'), $list_id], ["email", $email]])->first();
            $list = ListC::where(DB::raw('md5(id)'), "=", $list_id)->first();
            if (!$confirmed) {
                $status = 0;
            } elseif ($confirmed && $confirmed->confirmed) {
                $status = 2;
            } else {
                if ($status) {
                    $attempt = get_option('mail_attempt') + 1;
                    update_option('mail_attempt', $attempt);
                    $smtp_id = get_option('global_smtp_id');
                    if ($smtp_id != "") {
                        if($list->list_type) {
                            $status = 3;
                            self::sendDoubleOptin($list->toArray(), $email, array($smtp_id), $attempt);
                        } else {
                            self::sendThankYouEmail($list->toArray(), $email, array($smtp_id), $attempt);
                            $sequence_ob = new SequenceController();
                            $sequence_ob->sendSequence($attempt, $list->toArray(), $email);
                        }
                    }
                }
            }
        }

        $argument = [
            "status" => $status,
            "email" => $email,
        ];

        return view("emails.reconfirm", $argument);
    }

    function getFormLeads($request)
    {
        $id = $request['form_id'];
        $allLeads = DB::table('leads')->select('name', 'email', DB::raw('MD5(list_id) as list_id'), 'extra_fields', 'created_at');
        if($id == "all") {
            $id = DB::table('subscriptions')->select(DB::raw('MD5(id) as id1'))->pluck('id1')->toArray();
            $allLeads->where('confirmed', '=', 1)->whereIn('subs_id', $id);
        } else {
            $allLeads->where([['subs_id', '=', $id], ["confirmed", "=", 1]]);
        }
        $allLeads = $allLeads->get();
        $allLeads->map(function($lead) {
            $created_at = changeDateTime($lead->created_at);
            return [
                'name' => $lead->name,
                'email' => $lead->email,
                'extra_fields' => $lead->extra_fields,
                'created_at' => $created_at,
            ];
        });

        return $allLeads;
    }
}
