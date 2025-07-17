<?php

namespace App\Http\Controllers;

use App\Models\Sequence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SequenceController extends Controller
{
    function index(Request $request)
    {
        if ($request['type'] == 'get') return self::get_all();
        elseif ($request['type'] == 'create' || $request['type'] == 'update') return self::create_update_sequence($request);
        elseif ($request['type'] == 'delete') return self::delete_sequence($request);
        elseif ($request['type'] == 'get_details') return self::get_edit_details($request);
        elseif ($request['type'] == 'get_list_smtp') return self::get_list_smtp();
        elseif ($request['type'] == 'attachment') return self::upload_file($request);
        elseif ($request['type'] == 'delete_attachment') return self::delete_file($request);
    }

    function get_all($is_md5 = true)
    {
        $lists = Sequence::orderBy('id', 'desc')->get()->toArray();

        foreach ($lists as $id => $value) {
            $lists[$id]['id'] = $is_md5 ? md5($value['id']) : $value['id'];
            $lists[$id]['email_inputs'] = json_decode($value['email_inputs'], true);
            $lists[$id]['created_at'] = changeDateTime($value['created_at'], 'd-m-Y H:i:s');
        }

        return array(
            'status' => 1,
            'message' => $lists,
        );
    }

    function create_update_sequence($request)
    {
        $request->validate([
            'id' => ['required'],
            'title' => ['required', 'string'],
            'emailInputs' => ['required'],
        ]);

        if ($request['id'] == 0) {
            $sequences = new Sequence();
            $sequences->title = $request['title'];
            $sequences->description = $request['description'];
            $sequences->email_inputs = json_encode($request['emailInputs']);
            $save_status = $sequences->save();
            $sequence_id = md5($sequences->id);
        } else {
            $sequence_id = Sequence::where(DB::raw("md5(id)"), "=", $request['id'])->first("id");
            $sequences = Sequence::find($sequence_id->id);
            if ($sequences) {
                $sequences->title = $request['title'];
                $sequences->description = $request['description'];
                $sequences->email_inputs = json_encode($request['emailInputs']);
                $sequences->updated_at = now();
                $save_status = $sequences->save();
                $sequences->touch();
            }
        }

        return array(
            'status' => $save_status ?? 0,
            'id' => $sequence_id
        );
    }

    function validateAndReturnId($id)
    {
        $int_id = 0;
        $all = self::get_all(false)['message'];
        foreach ($all as $key => $value) {
            if (md5($value['id']) == $id) {
                $int_id = $value['id'];
                break;
            }
        }
        return $int_id;
    }

    function delete_sequence($request)
    {
        $status = 0;
        $request->validate([
            'id' => 'required'
        ]);
        $explode_id = $request['id'];
        $get_all = self::get_all(false)['message'];

        foreach ($get_all as $key => $value) {
            foreach ($explode_id as $key1 => $value1) {
                if ($value1 === md5($value['id'])) {
                    $id = $get_all[$key]['id'];
                    $status = Sequence::where('id', '=', $id)->delete();
                }
            }
        }
        return array(
            'status' => $status
        );
    }

    function get_edit_details($request)
    {
        $status = 0;
        $message = "Something went wrong";
        $get_all = self::get_all(false)['message'];
        if (count($get_all) > 0) {
            $status = 1;
        }
        foreach ($get_all as $key => $value) {
            if ($request['sequence_id'] === md5($value['id'])) {
                $value['id'] = md5($value['id']);
                $value['created_at'] = changeDateTime($value['created_at'], 'd-m-Y H:i:s');
                $message = $value;
                break;
            }
        }

        return array(
            'status' => $status,
            'message' => $message
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

    function upload_file($request)
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

    function delete_file($request)
    {
        $status = 0;
        $message = "Unable to delete";
        $file = storage_path('app\public\\') . str_replace('uploads/', 'campaigns\\', $request['url']);
        $file = str_replace("\\", "/", $file);
        if (file_exists($file)) {
            unlink($file);
            $status = 1;
            $message = "Successfully deleted the file";
        }

        return array(
            'status' => $status,
            'message' => $message
        );
    }

    function sendSequence($attempt, $list_details = [], $email = "")
    {
        $sequences =  Sequence::orderBy('id', 'desc')->get()->toArray();

        foreach ($sequences as $sequence) {
            $email_inputs = $sequence['email_inputs'];
            foreach ($email_inputs as $email_input) {
                $list_id = $email_input['list_ids'];
                if (strpos($list_id, md5($list_details['id'])) !== false || strpos($list_id, $list_details['id']) !== false) {
                    $send_after = $email_input['send_after'];
                    $subject = $email_input['title'];
                    $body = $email_input['email_body'];
                    $smtp_id = $email_input['smtp_ids'];
                    $is_schedule = 1;
                    $attachments = isset($email_input['attachments']) ? $email_input['attachments'] : json_encode(array("name" => "", "url" => ""));
                    if ($send_after == "during") {
                        $send_after = '0';
                        $is_schedule = 0;
                    }

                    $full_date = date('d-m-Y h:ia');
                    $sdate = date('d-m-Y h:ia', strtotime($full_date . ' +' . (int) $send_after . ' days'));
                    $time_zone = isset($email_input['time_zone']) ? $email_input['time_zone'] : date_default_timezone_get();
                    $data = array(
                        'id' => 0,
                        "email_details" => array("subject" => $subject, 'list_ids' => [["value" => md5($list_id)]], 'smtp_ids' => $smtp_id, 'manual_emails' => $email),
                        'email_body' => ["body" => $body],
                        'attachments' => gettype($attachments) === "string" ? json_decode($attachments, true) : $attachments,
                        'other' => array("unsubscribe_message" => "", "is_schedule" => $is_schedule, "schedule_option" => ["datetime" => $sdate, "timezone" => $time_zone, 'sequence' => 1]),
                        'token' => $attempt,
                        'list_ids' => [["value" => md5($list_id)]],
                    );

                    $camp = new CampaignController();
                    $camp->composeOrSchedule($data);
                } else {
                    continue;
                }
            }
        }
    }
}
