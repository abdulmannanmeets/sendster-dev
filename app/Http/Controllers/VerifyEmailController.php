<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VerifyEmailController extends Controller
{
    public $credit = 0;
    protected $api_secret = "MpFnKr9YGt";
    protected $isLicensed = false;
    protected $licenseAuth = array();

    function __construct()
    {
        $this->credit = get_option('credit');
        $this->isLicensed = get_option('is_licensed');
        $this->licenseAuth = json_decode(get_option('license_auth'));
    }

    function index(Request $request_data)
    {
        if ($request_data['list_type'] == 'get_auth_data') return self::getAPIAuthSetup();
        elseif ($request_data['list_type'] == 'process_validation') return self::processValidation($request_data['list_data']);
        elseif ($request_data['list_type'] == 'do_register') return self::doRegister($request_data);
    }

    function getCreditURL()
    {
        $auth= $this->getAPIAuthSetup();
        $url= "https://getsendster.in/sendstercredit?ordercode=";
        if($auth && isset($auth->order_code))
        {
            $url .=$auth->order_code;
        }
        return $url;
    }

    function getAPIAuthSetup()
    {
        if ($this->isLicensed && !empty($this->licenseAuth)) {
            $data = $this->licenseAuth;
            return $data;
        }
        return false;
    }

    function updateCredit()
    {
        $auth = $this->getAPIAuthSetup();
        if ($auth && isset($auth->order_code)) {
            $req = array(
                'ordercode' => $auth->order_code,
                'secret' => $this->api_secret,
            );
            $res = sendApi("https://getsendster.in/zbounceapi/GetMember", $req);
            $res = json_decode($res);
            if (isset($res->result) && isset($res->value->credit) && is_numeric($res->value->credit)) {
                $this->credit = $res->value->credit;
                update_option('credit', $res->value->credit);
            }

            return $res;
        }
    }

    function processValidation($emails, $from = "self")
    {
        $from_list_data = 0;
        $data = array('status' => false, 'data' => 'Unable to find ordercode');
        $config = self::getAPIAuthSetup();
        if ($config && isset($config->order_code)) {
            $emails = json_encode(explode(',', $emails));
            $url = "https://getsendster.in/ZBounceAPI/Validate";
            $data = sendApi($url, array('ordercode' => $config->order_code, 'emails' => $emails, 'secret' => $this->api_secret));
            $data = json_decode($data, true);
            if (isset($data['result']) && $data['result']) {
                foreach (json_decode($data['value'], true) as $key => $value) {
                    if ($value['status'] && $from == "self") {
                        DB::table("leads")->where('email', '=', $key)->update(['verified' => 1]);
                    } else if ($from == "list") {
                        $from_list_data = $value['status'];
                    }
                }
            }
            $this->updateCredit();
        }
        if ($from == "list") {
            return $from_list_data;
        }
        return $data;
    }

    function doRegister($request_data)
    {
        if(isset($request_data['list_type'])) {
            $request_data->validate([
                'license' => ['required'],
                'email' => ['required', 'email'],
            ]);
        }

        if(session()->has('product_verification')) {
            return ["status" => 1];
        }

        $custinfo = array(
            "custemail" => $request_data['email'],
            'custip' => currentIP(),
            'custdomain' => site_url(),
            'license' => $request_data['license']
        );
        $this->licenseAuth = $custinfo;

        // $posturl = "https://sendsterapp.in/membership/api/auth_site";
        $posturl = "http://63.250.45.252/membership/api/auth_site";

        $req_count = 0;
        reqlbl:
        ++$req_count;

        $data = sendApi($posturl, $custinfo, ["Host: sendsterapp.in"]);
        $decodedata = json_decode($data);
        if (isset($decodedata->valid) && $decodedata->valid === true) {
            $custinfo['product_permissions'] = $decodedata->product_permissions;
            $custinfo['order_code'] = $decodedata->order_code;
            add_option('is_licensed', '1');
            add_option('license_auth', json_encode($custinfo));
            session()->put("product_verification", 1);
            return ["status" => 1, "product_permissions" => $decodedata->product_permissions];
        } else {
            if ($req_count < 2) {
                sleep(mt_rand(2, 4));
                goto reqlbl;
            }
            delete_option('is_licensed');
            delete_option('license_auth');
            return ["status" => 0];
        }
    }
}
