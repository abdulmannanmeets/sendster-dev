<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use ZipArchive;

class UpdateController extends Controller
{
    var $update_url;
    var $current_version;
    var $base_dir;

    function __construct()
    {
        $this->update_url = "http://63.250.45.252/membership/api/auto_update";
        $this->current_version = get_option('current_version');
        $this->base_dir = base_path();
    }
    function index(Request $request)
    {
        $request->validate([
            'check_update' => ['required']
        ]);

        if (!Session::has('install_later')) {
            $do = $request['check_update'];

            if ($do == "check") {
                return self::checkForUpdate();
            } elseif ($do == "download") {
                return self::checkForUpdate(base64_decode($request['url']), $request['version']);
            } elseif ($do == "install") {
                return self::doUpdate();
            } elseif ($do == "install_dependency") {
                $this->current_version = $request->version ?? $this->current_version;
                return self::installDependecies($this->current_version);
            } elseif ($do == "install_later") {
                Session::put('install_later', 1);
            }
        }
    }

    function request($url, $arr = array(), $type = "post")
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        if ($type == "post") {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $arr);
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Host: sendsterapp.in"
        ));
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        $res = curl_exec($ch);
        curl_close($ch);
        return $res;
    }

    function checkForUpdate($url = "", $version = "")
    {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            $arr = array('user_version' => $this->current_version, 'check_mlr_update' => 1);
            $res = self::request($this->update_url, $arr);
            $res = json_decode($res);
            if (json_last_error() === 0) {
                if ($res->update) {
                    return array('status' => 1, 'download_url' => base64_encode($res->download_url), 'version' => $res->updated_version, 'changes' => $res->changes);
                } else {
                    return array('status' => 0);
                }
            } else {
                return array("status" => 0);
            }
        } elseif (filter_var($url, FILTER_VALIDATE_URL)) {
            $zip = self::request($url, array(), 'get');
            $fp = fopen($this->base_dir . "/sendster_update.zip", "w");
            fwrite($fp, $zip);
            fclose($fp);
            return array("status" => 1);
        }

        return array("status" => 0);
    }

    function doUpdate()
    {
        $file = $this->base_dir . "/" . "sendster_update.zip";
        $zip = new ZipArchive();
        $zip->open($file);
        $zip->extractTo($this->base_dir);
        $zip->close();
        unlink($file);
        return array('status' => 1);
    }

    function installDependecies($version = 0)
    {
        lbl:
        if ($version > 0) {
            $current_version = get_option('current_version');

            if (version_compare($version, $current_version, '>')) {
                update_option('current_version', $version);
            }
        }
        return array("status" => 1);
    }
}
