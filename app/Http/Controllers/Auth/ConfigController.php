<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use app\Library\File as LibraryFile;
use App\Models\Option;
use App\Models\User;
use Exception;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

class ConfigController extends Controller
{
    var $status = 0;
    var $message = "Something went wrong! Please try again";

    public function index()
    {
        $compatibilities = $this->checkSystemCompatibility();
        $result = true;
        foreach ($compatibilities as $compatibility) {
            if (!$compatibility['check']) {
                $result = false;
            }
        }

        return view('auth.config', [
            'compatibilities' => $compatibilities,
            'result' => $result,
        ]);
    }

    public function checkSystemCompatibility()
    {
        return [
            [
                'name' => 'php_version',
                'label' => 'PHP Version',
                'check' => version_compare(PHP_VERSION, '8.0.0', '>='),
                'note' => 'Current PHP version is: ' . phpversion(),
            ],
            [
                'name' => 'mysqli',
                'label' => 'MySQLi',
                'check' => function_exists('mysqli_connect'),
                'note' => 'MySQLi extension is required',
            ],
            [
                'name' => 'open_ssl',
                'label' => 'OpenSSL',
                'check' => extension_loaded('openssl'),
                'note' => 'OpenSSL extension is required',
            ],
            [
                'name' => 'multibyte_string',
                'label' => 'Multibyte String',
                'check' => extension_loaded('mbstring'),
                'note' => 'Multibyte String extension is required',
            ],
            [
                'name' => 'php_pdo',
                'label' => 'PHP PDO',
                'check' => extension_loaded('pdo'),
                'note' => 'PHP PDO extension is required',
            ],
            [
                'name' => 'php_curl',
                'label' => 'PHP Curl',
                'check' => extension_loaded('curl'),
                'note' => 'PHP Curl extension is required',
            ],
            [
                'name' => 'php_zip',
                'label' => 'ZipArchive',
                'check' => extension_loaded('zip'),
                'note' => 'ZipArchive extension is required',
            ]
        ];
    }

    public function save_admin_database(Request $request)
    {
        $request->validate([
            'type' => 'required',
        ]);

        if ($request['type'] === "database_create") return self::save_database($request);
        if ($request['type'] === "admin_create") return self::save_user($request);
    }

    public function save_database($request)
    {
        $request->validate([
            'db_host_name' => 'required',
            'db_user_name' => 'required',
            'db_name' => 'required',
            'db_password' => 'required',
            'db_prefix' => 'required',
        ]);

        $request->session()->forget('database_data');
        $request->session()->put('database_data', $request->input());

        try {
            if (!mysqliConnect($request)) {
                $this->message = "Unable to connect to database.";
            }

            writeEnv($request);

            $this->status = 1;
            $this->message = "Connected successfully";
        } catch (Exception $e) {
            $this->message = "Unable to connect to database.";
        }

        return array(
            'status' => $this->status,
            'message' => $this->message
        );
    }

    public function save_user($request)
    {
        \Artisan::call('migrate', ['--force' => true]);
        // $database = $request->session()->get('database_data');
        // if (!createTable()) {
        //     return ["status" => 0, "message" => "Unable to create tables"];
        // }

        $request->validate([
            'name' => 'required',
            'email' => ['required', 'email'],
            'password' => [
                'required', 'string', 'confirmed', 'min:8',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/', $value)) {
                        $fail('The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
                    }
                }
            ]
        ]);

        $username = explode('@', $request->email)[0];
        try {
            $oldFilePath = public_path('assets/images/profile/profile.jpg');
            $newFilePath = public_path('assets/images/profile/profile' . $username . '.jpg');
            if (File::exists($oldFilePath)) {
                File::copy($oldFilePath, $newFilePath);
            }

            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'verified' => 1,
                'permission' => json_encode(["Dashboard", "List", "Email Verification", "Snippets", "SMTPs", "Campaign", "Sequence", "Subscription Form", "Settings", "AI Writer"]),
                'ip_lastsignin' => null,
                'ip_created' => request()->ip(),
                'profile_picture' => 'assets/images/profile/profile' . $username . '.jpg',
            ]);

            File::makeDirectory(storage_path('app/installed'), 0755, true, true);

            $api_key = 'sendster:' . substr(str_shuffle('zasdfghjklzxcvbnmqwertyuiopQWERTYUIOPASDFGHJKLZXCVBNM@1234567890'), 1, 20);

            Option::insert([
                ['name' => 'install_url', 'value' => site_url()],
                ['name' => 'mail_attempt', 'value' => 0],
                ['name' => 'api_key', 'value' => $api_key],
                ['name' => 'cron_delay_sec', 'value' => 20],
                ['name' => 'send_noof_mail_at_chunk', 'value' => 30],
                ['name' => 'send_noof_mail_schedule_min', 'value' => 30],
                ['name' => 'async_cron_mailer', 'value' => 1],
                ['name' => 'cron_type', 'value' => 'script'],
                ['name' => 'schedule_api_url', 'value' => site_url() . '/api/index_email_settings'],
                ['name' => 'global_smtp_id', 'value' => ''],
                ['name' => 'cross_origin_domains', 'value' => ''],
                ['name' => 'get_lists_with_api', 'value' => 0],
                ['name' => 'get_leads_with_api', 'value' => 0],
                ['name' => 'current_version', 'value' => getCurrentVersion()]
            ]);

            $this->status = 1;
            $this->message = "Created successfully";
        } catch (Exception $e) {
            $this->status = 0;
            $this->message = $e->getMessage();
        }

        return array(
            'status' => $this->status,
            'message' => $this->message
        );
    }

    function cronStart()
    {
        Artisan::call("run:cron");
        // $job1 = new ShellJob();
        // $job1->setCommand('php '.base_path().'/artisan schedule:run');
        // $job1->setSchedule(new CrontabSchedule('*/1 * * * *'));

        // $resolver = new ArrayResolver();
        // $resolver->addJob($job1);

        // $cron = new Cron();
        // $cron->setExecutor(new Executor());
        // $cron->setResolver($resolver);

        // $cron->run();
        // return $job1;
    }
}
