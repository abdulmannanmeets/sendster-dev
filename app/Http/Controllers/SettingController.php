<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
    function index(Request $request)
    {
        if ($request['from'] == "help") {
            return self::processHelp($request);
        } else if ($request['from'] == "setting") {
            if ($request['type'] == "get") {
                return self::getSetting();
            } else {
                return self::updateSetting($request);
            }
        }
    }

    function getSetting()
    {
        $installUrl = site_url();
        $current_version = getCurrentVersion();
        $global_smtp = get_option('global_smtp_id');
        $all_smtps = DB::table('smtps')->select('id', 'title', 'credentials')->get()->map(function($smtp) {
            return [
                'id' => md5($smtp->id),
                'title' => $smtp->title,
                'credentials' => json_decode($smtp->credentials, true),
            ];
        });

        $emailTiming['mailAtChunk'] = (int) get_option('send_noof_mail_at_chunk');
        $emailTiming['maxEmailsSent'] = (int) get_option('send_noof_mail_schedule_min');
        $emailTiming['cronDelay'] = (int) get_option('cron_delay_sec');
        $emailTiming['asyncCronMailer'] = (boolean) get_option('async_cron_mailer');
        $emailTiming['cronType'] = get_option('cron_type');
        $emailTiming['crossOriginDomains'] = get_option('cross_origin_domains');

        $apiSettings['apiKey'] = get_option('api_key');
        $apiSettings['getListsWithApi'] = (boolean) get_option('get_lists_with_api');
        $apiSettings['getLeadsWithApi'] = (boolean) get_option('get_leads_with_api');

        $bounceMailSetting['bounceCheckUrl'] = $installUrl."/api/bounce_check";
        $bounceMailSetting['bounceTypeForList'] = get_option('bounce_type_for_list') ?? "none";
        $bounceMailSetting['bounceTypeForMailbox'] = get_option('bouce_type_for_mailbox') ?? "none";

        $headerFooterSettings['header'] = (get_option('header_script') === false || get_option('header_script') === "") ? null : get_option('header_script');
        $headerFooterSettings['footer'] = (get_option('footer_script') === false || get_option('footer_script') === "") ? null : get_option('footer_script');

        $scriptBased = "php " . str_replace("\\", "/", base_path()) . '/artisan schedule:run > /dev/null 2>&1';

        $urlBased = get_option('schedule_api_url');
        $urlBased = add_query_arg(array("runserver" => 1), $urlBased);
        $urlBased= "wget -O - ".$urlBased." >/dev/null 2>&1";

        return array(
            'install_url' => $installUrl,
            'emailTiming' => $emailTiming,
            'bounceMailSetting' => $bounceMailSetting,
            'apiSettings' => $apiSettings,
            'scriptBased' => $scriptBased,
            'urlBased' => $urlBased,
            'global_smtp' => $global_smtp,
            'all_smtps' => $all_smtps,
            'currentVersion' => $current_version,
            'headerFooterSettings' => $headerFooterSettings
        );
    }

    function updateSetting($request)
    {
        $request->validate([
            'emailTiming' => 'required',
            'apiSettings' => 'required',
            'headerFooterSettings' => 'required',
        ]);

        $emailTiming = $request['emailTiming'];
        $apiSettings = $request['apiSettings'];
        $headerFooterSettings = $request['headerFooterSettings'];

        update_option('cron_type', $emailTiming['cronType']);
        update_option('global_smtp_id', $request['global_smtp']);
        update_option('cron_delay_sec', $emailTiming['cronDelay']);
        update_option('header_script', isset($headerFooterSettings['header']) ? $headerFooterSettings['header'] : "");
        update_option('footer_script', isset($headerFooterSettings['footer']) ? $headerFooterSettings['footer'] : "");
        update_option('send_noof_mail_at_chunk', $emailTiming['mailAtChunk']);
        update_option('cross_origin_domains', $emailTiming['crossOriginDomains']);
        update_option('send_noof_mail_schedule_min', $emailTiming['maxEmailsSent']);
        update_option('async_cron_mailer', $emailTiming['asyncCronMailer'] == "false" ? 0 : 1);
        update_option('get_lists_with_api', $apiSettings['getListsWithApi'] == "false" ? 0 : 1);
        update_option('get_leads_with_api', $apiSettings['getLeadsWithApi'] == "false" ? 0 : 1);

        return array('status' => true);
    }

    function processHelp($request)
    {
        if ($request['type'] == 'get') {
            $apiKey = get_option('api_key');
            if (!$apiKey) {
                $apiKey = 'sendster:' . substr(str_shuffle('zasdfghjklzxcvbnmqwertyuiopQWERTYUIOPASDFGHJKLZXCVBNM@1234567890'), 1, 25);
                update_option("api_key", $apiKey);
            }
            return ['api_key' => $apiKey, 'install_url' => site_url()];
        } elseif ($request['type'] == 'update' && $request['api_key'] == get_option('api_key')) {
            $apiKey = 'sendster:' . substr(str_shuffle('zasdfghjklzxcvbnmqwertyuiopQWERTYUIOPASDFGHJKLZXCVBNM@1234567890'), 1, 25);
            update_option("api_key", $apiKey);
            return ["api_key" => get_option("api_key")];
        }
    }
}
