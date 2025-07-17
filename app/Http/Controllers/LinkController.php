<?php

namespace App\Http\Controllers;

use App\Models\LinkVisits;
use DateTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LinkController extends Controller
{
    public function index(Request $request)
    {
        if ($request['type'] == "get") {
            return self::get();
        }

        if ($request['type'] == "create") {
            return self::create($request);
        }

        if ($request['type'] == "update") {
            return self::update($request);
        }

        if ($request['type'] == "delete") {
            return self::delete($request);
        }
    }

    public function get($is_md5 = true)
    {
        $alldata = LinkVisits::where('attempt', '=', 'NO')->orderBy('id', 'desc')->get()->toArray();
        foreach ($alldata as $key => $data) {
            $alldata[$key]['id'] = $is_md5 ? md5($data['id']) : $data['id'];
            $alldata[$key]['visits'] = LinkVisits::where([["url", "=", $data['url']], ['attempt', '!=', 'NO']])->sum('visits');
            $alldata[$key]['created_at'] = changeDateTime($data['created_at']);
            $alldata[$key]['shortcode'] = '[sendster-link token="' . $data['otp'] . '"][/sendster-link]';
        }

        return array(
            "status" => 1,
            "data" => $alldata
        );
    }

    public function getValidId($id)
    {
        $alldata = self::get(false)['data'];
        foreach ($alldata as $key => $data) {
            if (md5($data['id']) == $id) {
                $intId = $data['id'];
                break;
            }
        }

        return $intId ?? 0;
    }

    public function create($request, $updated_at = null)
    {
        $regex = '/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/';
        // $request->validate([
        //     'url' => 'required|regex:' . $regex
        // ]);
        $request->validate([
            'url' => 'required|url'
        ]);
        $link_visit_data = LinkVisits::where("url", "=", $request['url']);
        $data = $link_visit_data->where("attempt", "=", "NO")->get()->toArray();
        $visit_count = $link_visit_data->where("attempt", "=", "YES")->get()->count();
        if (count($data) > 0) {
            return array(
                'status' => 2,
                'shortcode' => '[sendster-link token="' . $data[0]['otp'] . '"][/sendster-link]'
            );
        }

        $token = substr(str_shuffle('qwertyuiopasdfghjklzxcvbnm_-@1234567890'), 1, 8) . time();
        $time = now();
        $link_visit = new LinkVisits();
        $link_visit->attempt = "NO";
        $link_visit->url = $request['url'];
        $link_visit->text = $request['text'];
        $link_visit->visits = $visit_count;
        $link_visit->otp = $token;
        $link_visit->created_at = $time;
        $link_visit->updated_at = $updated_at ?? null;
        $status = $link_visit->save();

        $dateTime = new DateTime($time);
        $time = $dateTime->format('d F Y');

        $link_id = md5($link_visit->id ?? 0);
        return array(
            'status' => $status,
            'id' => $link_id,
            'message' => "Link created successfully",
            'visits' => 0,
            'created_at' => $time,
            'shortcode' => '[sendster-link token="' . $token . '"][/sendster-link]',
        );
    }

    public function update($request)
    {
        $regex = '/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/';
        $request->validate([
            'id' => 'required',
            'url' => 'required|regex:' . $regex
        ]);
        $status = DB::table('link_visits')->where(DB::raw('MD5(id)'), $request->id)->update(['url' => $request->url, 'text' => $request->text, 'updated_at' => now()]);

        return array(
            'status' => $status,
            'message' => "Link updated successfully",
        );
    }

    public function delete($request)
    {
        $request->validate([
            'ids' => ['required', 'array'],
        ]);

        try {
            $is_delete = LinkVisits::whereIn(DB::raw('md5(id)'), $request['ids'])->delete();
            return array(
                'status' => $is_delete,
                'message' => "Link deleted successfully",
            );
        } catch (Exception $e) {
            return array(
                'status' => 0,
                'message' => "Something went wrong!",
            );
        }
    }

    public function add_visit(Request $request)
    {
        $email = $request->email;
        $token = $request->token;
        $attempt = $request->attempt;

        if (strlen($email) > 0) {
            $email = base64_decode($email);
        }
        $attempt = base64_decode($request->attempt);

        $visit_data = LinkVisits::where([["otp", "=", $token], ["attempt", "=", "NO"]]);
        if ($visit_data->get()->count() > 0) {
            $visit_data1 = $visit_data->where("email", "=", $email)->get()->count();
            if ($visit_data1 == 0) {
                $visit_data = $visit_data->first();
                $visits = (int)$visit_data->visits + 1;
                DB::table('link_visits')->insert([
                    'attempt' => 'YES',
                    'url' => $visit_data->url,
                    'text' => $visit_data->text,
                    'visits' => $visits,
                    'email' => $email,
                    'otp' => $attempt,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                header('Location: ' . $visit_data->url);
                exit();
            } else {
                $visit_data = $visit_data->first();
                header('Location: ' . $visit_data->url);
                exit();
            }
        } else {
            return abort(404);
        }
    }
}
