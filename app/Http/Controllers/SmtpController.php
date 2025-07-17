<?php

namespace App\Http\Controllers;

use App\Jobs\BounceHandle;
use App\Models\Smtp;
use BounceMailHandler\BounceMailHandler;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PHPMailer\PHPMailer\PHPMailer;

class SmtpController extends Controller
{
    /**
     * @var string
     */
    protected $debug = '';
    protected $status = 0;
    protected $message = "";

    function index(Request $request)
    {
        if ($request['smtp_type'] == 'get') return self::get_all();
        elseif ($request['smtp_type'] == 'create') return self::create_smtp($request['post_data']);
        elseif ($request['smtp_type'] == 'update') return self::update_smtp($request);
        elseif ($request['smtp_type'] == 'delete') return self::delete_smtp($request);
        elseif ($request['smtp_type'] == 'test_imap') return self::test_imap($request);
        elseif ($request['smtp_type'] == 'get_smtp_setup') return self::getSmtpSetup($request);
        elseif ($request['smtp_type'] == 'send_mail') return self::send_mail($request);
    }

    /**
     * get the debug-string
     *
     * @return string
     */
    public function getDebug(): string
    {
        return $this->debug;
    }

    function create_smtp($request)
    {
        $smtps = new Smtp();
        $smtps->title = $request['smtp_title'];
        $smtps->basic = json_encode($request['basic']);
        $smtps->credentials = json_encode($request['credentials']);
        $smtps->imap_setup = json_encode($request['imap_setup']);
        $smtps->save();

        $message = array(
            'id' => md5($smtps->id),
            'created_at' => $smtps->created_at->format('Y-m-D H:i:s')
        );

        return array(
            'status' => 1,
            'message' => $message,
        );
    }

    function update_smtp($request)
    {
        $request->validate([
            'post_data' => 'required',
        ]);

        $get_all = self::get_all(false)['message'];

        $post_data = $request['post_data'];

        foreach ($get_all as $key => $value) {
            if ($post_data['smtp_id'] === md5($value['id'])) {
                $id = $get_all[$key]['id'];
                $find_data = Smtp::find($id);
                $find_data->title = $post_data['smtp_title'];
                $find_data->basic = $post_data['basic'];
                $find_data->credentials = $post_data['credentials'];
                $find_data->imap_setup = $post_data['imap_setup'];
                $find_data->save();

                $find_data->touch();
                break;
            }
        }

        return array(
            'status' => 1,
            'message' => "SMTP updated successfully"
        );
    }

    function delete_smtp($request)
    {
        $request->validate([
            'id' => 'required'
        ]);
        $status = Smtp::whereIn(DB::raw("md5(id)"), $request['id'])->delete();

        return array(
            'status' => $status,
            'message' => self::get_all()['message']
        );
    }

    function get_all($is_md5 = true)
    {
        $smtps = Smtp::orderBy('id', 'desc')->get();
        $encode = json_decode(json_encode($smtps), true);

        foreach ($encode as $id => $value) {
            $encode[$id]['id'] = $is_md5 ? md5($value['id']) : $value['id'];
            $encode[$id]['created_at'] = changeDateTime($value['created_at']);
        }

        return array(
            'status' => 1,
            'message' => $encode
        );
    }

    function send_mail($data = array())
    {
        if ($data['sending_type'] === 'manual') {
            $all_data = $data['create_item'];
            // Check whether it is from edit or all smtps
            if (isset($all_data['custom_id']) && $all_data['custom_id'] !== "") {
                $all_data = (array) DB::table("smtps")->where(DB::raw("md5(id)"), "=", $all_data['custom_id'])->first();
                $all_data['smtp_title'] = $all_data['title'];
            }

            $title = $all_data['smtp_title'];
            $basic = gettype($all_data['basic']) === "array" ? $all_data['basic'] : json_decode($all_data['basic'], true);
            $credentials = gettype($all_data['credentials']) === "array" ? $all_data['credentials'] : json_decode($all_data['credentials'], true);
            $imap_setup = gettype($all_data['imap_setup']) === "array" ? $all_data['imap_setup'] : json_decode($all_data['imap_setup'], true);
            $manual_data = $data['manual_data'];
            if ($manual_data['test_sendfrom'] == "") {
                $manual_data['test_sendfrom'] = $credentials['username'];
            }

            require base_path("vendor/autoload.php");
            $mail = new PHPMailer(true);

            try {
                $mail->SMTPDebug = ($manual_data['debug_type'] === 'on' ? 1 : 0);
                $mail->isSMTP();
                $mail->Host = $credentials['host'];
                $mail->SMTPAuth = true;
                $mail->Username = $credentials['username'];
                $mail->Password = $credentials['password'];
                $mail->SMTPSecure = $credentials['encryption'];
                $mail->Port = trim($credentials['port'], "'");
                $mail->CharSet = "UTF-8";

                $mail->setFrom($manual_data['test_sendfrom'], $manual_data['test_sendfrom']);
                $mail->addAddress($manual_data['test_sendto']);
                $mail->addCC($manual_data['test_sendfrom']);
                $mail->addBCC($manual_data['test_sendfrom']);
                $mail->addReplyTo($manual_data['test_sendto'], $manual_data['test_sendto']);
                $mail->isHTML(true);
                $mail->Subject = 'Test';
                $mail->Body = $manual_data['test_body'];

                if (!$mail->send()) {
                    $this->status = 0;
                    $this->message = 'Email not sent.';
                } else {
                    $this->status = 1;
                    $this->message = 'Email has been sent.';
                }
                return json_encode(array(
                    'status' => $this->status,
                    'message' => $this->message
                ));
            } catch (Exception $e) {
                return json_encode(array(
                    'status' => $this->status,
                    'message' => $mail->ErrorInfo
                ));
            }
        }
    }

    function getSmtpSetup($request)
    {
        $get_all = self::get_all(false)['message'];
        if (count($get_all) > 0) {
            $this->status = 1;
        }
        foreach ($get_all as $key => $value) {
            if ($request['smtp_id'] === md5($value['id'])) {
                $value['id'] = md5($value['id']);
                $this->message = $value;
                break;
            }
        }

        return array(
            'status' => $this->status,
            'message' => $this->message
        );
    }

    function test_imap($request)
    {
        $time_start = self::microtime_float();
        $bmh = new BounceMailHandler();
        $bmh->verbose = BounceMailHandler::VERBOSE_DEBUG;
        $bmh->disableDelete = true; // false is default, no need to specify

        $bmh->mailhost = $request['imap_host']; // your mail server
        $bmh->mailboxUserName = $request['imap_username']; // your mailbox username
        $bmh->mailboxPassword = $request['imap_password']; // your mailbox password
        $bmh->port = trim($request['imap_port'], "'"); // the port to access your mailbox, default is 143
        $bmh->service = 'imap'; // the service to use (imap or pop3), default is 'imap'
        $bmh->serviceOption = strtolower($request->imap_encryption) . '/novalidate-cert'; // the service options (none, tls, notls, ssl, etc.), default is 'notls'
        $bmh->boxname = $request['imap_folder_check']; // the mailbox to access, default is 'INBOX'

        $bmh->moveHard = true; // default is false
        $bmh->hardMailbox = 'INBOX.hardtest'; // default is 'INBOX.hard' - NOTE: must start with 'INBOX.'
        $bmh->moveSoft = true; // default is false
        $bmh->softMailbox = 'INBOX.softtest';

        try {
            $bmh->openMailbox();
            return [
                'status' => 1
            ];
        } catch (Exception $exception) {
            return [
                'status' => 0,
                'message' => $exception->getMessage()
            ];
        }
    }

    function HandleImap(Request $request)
    {
        set_time_limit(0);

        if($request->has('type') && $request->input("type") == "check_bounce") {
            $mail_setting = $request->input("bounceMailSetting");
            update_option("bounce_type_for_list", $mail_setting["bounceTypeForList"]);
            update_option("bouce_type_for_mailbox", $mail_setting["bounceTypeForMailbox"]);
        }

        $smpts = DB::table('smtps')->orderBy('id', 'desc')->distinct()->pluck('imap_setup')->toArray();

        foreach ($smpts as $key => $smtp) {
            $smtp = json_decode($smtp);
            if ($smtp->imap_username === null && $smtp->imap_password === null && $smtp->imap_host === null) continue;
            $smtp->imap_port = trim($smtp->imap_port, "'");

            BounceHandle::dispatch($smtp);
        }
        artisanExceptionHandle('schedule:run');
    }

    private function microtime_float(): float
    {
        list($usec, $sec) = \explode(' ', \microtime());
        return (float) $usec + (float) $sec;
    }
}
