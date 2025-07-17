<?php

use App\Models\Lead;
use App\Models\LinkVisits;
use App\Models\Option;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;

if (!function_exists('checkLogin')) {
    function checkLogin()
    {
        if (Auth::check()) {
            return 1;
        } else {
            return 0;
        }
    }
}

if (!function_exists('replaceImages')) {
    function replaceImages($first, $res)
    {
        $data = str_replace(
            ['src="images/', "src='images/", 'url("images/', "url('images/"],
            ['src="' . $first, "src='" . $first, 'url("' . $first, "url('" . $first],
            $res
        );
        return $data;
    }
}

if (!function_exists('updateEnvFile')) {
    function updateEnvFile($envArray)
    {
        \Artisan::call('config:clear');
        $envContent = file_get_contents(base_path('.env'));
        foreach ($envArray as $key => $value) {
            if (strpos($envContent, "$key=") === false) {
                $envContent .= "$key=$value\n";
            } else {
                $envContent = preg_replace("/^$key=.*/m", "$key=$value", $envContent);
            }
        }
        file_put_contents(base_path('.env'), $envContent);
    }
}

if (!function_exists('mysqliConnect')) {
    function mysqliConnect($request)
    {
        $database_data = $request->session()->get('database_data');
        $host = $database_data['db_host_name'];
        $username = $database_data['db_user_name'];
        $password = $database_data['db_password'];
        $database = $database_data['db_name'];
        $port = $database_data['db_port'] !== null ? (int) $database_data['db_port'] : 3306;
        $prefix = $database_data['db_prefix'];

        $connection = new mysqli($host, $username, $password, $database, $port);

        if ($connection->connect_error && mysqli_connect_errno() > 0) {
            return 0;
        }

        return $connection;
    }
}

if (!function_exists('quoteDotEnvValue')) {
    function quoteDotEnvValue($value)
    {
        $containsSharp = (strpos($value, '#') !== false);

        if ($containsSharp) {
            $value = str_replace('"', '\"', $value);
            $value = '"' . $value . '"';
        }

        return $value;
    }
}

if (!function_exists('write_envs')) {
    function write_envs($params)
    {
        foreach ($params as $key => $value) {
            write_env($key, $value);
        }
    }
}

if (!function_exists("getCurrentVersion")) {
    function getCurrentVersion()
    {
        return trim(file_get_contents(base_path('VERSION')));
    }
}

if (!function_exists("write_env")) {
    function write_env($key, $value)
    {
        // Important: make sure all variables are already loaded before retrieving $_ENV
        \Artisan::call('config:cache');

        // $path = base_path('.env');
        // if (!File::exists($path)) {
        //     File::copy(base_path('.env.example'), $path);
        // }

        // Get current env
        $outputs = $_ENV;

        // Set the value
        $outputs[$key] = $value;

        // Prepare for writing back to file
        array_walk($outputs, function (&$v, $k) {
            // Check if $v is null, and if so, replace it with an empty string
            if ($v === null) {
                $v = '';
            } else {
                // Escape double quote
                $cleaned = addcslashes($v, '"');

                // Quote if there is at least one space or # or any suspected char!
                if (preg_match('/[\s\#!\$]/', $cleaned)) {
                    $cleaned = "\"$cleaned\"";
                }

                $v = "$k=$cleaned";
            }
        });

        $outputs = array_values($outputs);
        $outputs = implode("\n", $outputs);

        // Actually write to file .env
        file_put_contents(app()->environmentFilePath(), $outputs);

        // Important, make the new environment var available
        // Otherwise, this method may failed if called twice (in a loop for example) in the same process
        \Artisan::call('config:cache');
    }
}

if (!function_exists("writeEnv")) {
    function writeEnv($request)
    {
        $database = $request->session()->get('database_data');

        write_envs([
            'APP_NAME' => 'Sendster',
            'APP_ENV' => 'local',
            'APP_URL' => url('/'),
            'DB_CONNECTION' => 'mysql',
            'DB_HOST' => (isset($database['db_host_name']) ? $database['db_host_name'] : ''),
            'DB_DATABASE' => (isset($database['db_name']) ? $database['db_name'] : ''),
            'DB_USERNAME' => (isset($database['db_user_name']) ? $database['db_user_name'] : ''),
            'DB_PASSWORD' => (isset($database['db_password']) ? quoteDotEnvValue($database['db_password']) : ''),
            'DB_PORT' => (isset($database['db_port']) ? $database['db_port'] : ''),
            'DB_PREF' => (isset($database['db_prefix']) ? $database['db_prefix'] : ''),
            'APP_KEY' => 'base64:enC2RKNUHU1oBdEbzu8bIcBFKX5mpSTVq96fSPHIKuU=',
            'APP_DEBUG' => true,
            'CURRENT_VERSION' => '1.0.4',
            'LOG_CHANNEL' => 'stack',
            'LOG_DEPRECATIONS_CHANNEL' => null,
            'LOG_LEVEL' => 'debug',
            'BROADCAST_DRIVER' => 'log',
            'CACHE_DRIVER' => 'file',
            'FILESYSTEM_DISK' => 'local',
            'QUEUE_CONNECTION' => 'database',
            'SESSION_DRIVER' => 'file',
            'SESSION_LIFETIME' => 120,
            'MEMCACHED_HOST' => '127.0.0.1',
            'REDIS_HOST' => '127.0.0.1',
            'REDIS_PASSWORD' => null,
            'REDIS_PORT' => 6379,
            'MAIL_MAILER' => 'smtp',
            'MAIL_HOST' => 'mailhog',
            'MAIL_PORT' => 1025,
            'MAIL_USERNAME' => null,
            'MAIL_PASSWORD' => null,
            'MAIL_ENCRYPTION' => null,
            'MAIL_FROM_ADDRESS' => "hello@example.com",
            'MAIL_FROM_NAME' => '${APP_NAME}',
            'AWS_ACCESS_KEY_ID' => '',
            'AWS_SECRET_ACCESS_KEY' => '',
            'AWS_DEFAULT_REGION' => 'us-east-1',
            'AWS_BUCKET' => '',
            'AWS_USE_PATH_STYLE_ENDPOINT' => false,
            'PUSHER_APP_ID' => '',
            'PUSHER_APP_KEY' => '',
            'PUSHER_APP_SECRET' => '',
            'PUSHER_HOST' => '',
            'PUSHER_PORT' => 443,
            'PUSHER_SCHEME' => 'https',
            'PUSHER_APP_CLUSTER' => 'mt1',
            'VITE_PUSHER_APP_KEY' => '${PUSHER_APP_KEY}',
            'VITE_PUSHER_HOST' => '${PUSHER_HOST}',
            'VITE_PUSHER_PORT' => '${PUSHER_PORT}',
            'VITE_PUSHER_SCHEME' => '${PUSHER_SCHEME}',
            'VITE_PUSHER_APP_CLUSTER' => '${PUSHER_APP_CLUSTER}'
        ]);
    }
}

if (!function_exists('editEnv')) {
    function editEnv($db_arr, $path)
    {
        artisanExceptionHandle('config:cache');
        foreach ($db_arr as $key => $value) {
            file_put_contents($path, str_replace(
                $key . '=' . env($key),
                $key . '=' . $value,
                file_get_contents($path)
            ));
        }
        artisanExceptionHandle('config:clear');
    }
}

if (!function_exists('artisanExceptionHandle')) {
    function artisanExceptionHandle($command)
    {
        try {
            Artisan::call($command);
        } catch (Exception $ee) {
            Log::info($ee->getMessage());
        }
    }
}

if (!function_exists('currentIP')) {
    function currentIP()
    {
        $ipaddress = "";

        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if (getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if (getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if (getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if (getenv('HTTP_FORWARDED'))
            $ipaddress = getenv('HTTP_FORWARDED');
        else if (getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';

        return $ipaddress;
    }
}

if (!function_exists('getBaseUrl')) {
    function getBaseUrl()
    {
        if (isset($_SERVER['HTTPS'])) {
            $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
        } else {
            $protocol = 'http';
        }
        return $protocol . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    }
}

if (!function_exists('getProtocol')) {
    function getProtocol()
    {
        if ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443) {
            return "https://";
        }
        return "http://";
    }
}

if (!function_exists('update_option')) {
    function update_option($name, $value)
    {
        if (get_option($name) === false) {
            add_option($name, $value);
        } else {
            Option::where('name', '=', trim($name))->update(['value' => $value], ['updated_at' => time()]);
        }
    }
}

if (!function_exists('replaceEmailShortcode')) {
    function replaceEmailShortcode($name, $email, $exf, $subject, $unsubscribe, $email_body_data, $list_ids = array())
    {
        if ($list_ids) {
            foreach ($list_ids as $list_id) {
                $lead_data = Lead::where([[DB::raw("md5(list_id)"), "=", $list_id], ["email", "=", $email], ["confirmed", "=", 1]])->first();
                if ($lead_data) {
                    $name = $lead_data->name;
                    $exf = json_decode($lead_data->extra_fields, true);
                    break;
                }
            }
        }
        $subject = str_replace("{name}", $name, $subject);
        $subject = str_replace("{email}", $email, $subject);
        $unsubscribe = str_replace("{name}", $name, $unsubscribe);
        $unsubscribe = str_replace("{email}", $email, $unsubscribe);
        $email_body_data = str_replace("{name}", $name, $email_body_data);
        $email_body_data = str_replace("{email}", $email, $email_body_data);

        $exf = gettype($exf) == "string" ? json_decode($exf, true) : $exf;
        foreach ($exf as $value1) {
            $subject = str_replace("{" . $value1['property'] . "}", $value1['value'], $subject);
            $unsubscribe = str_replace("{" . $value1['property'] . "}", $value1['value'], $unsubscribe);
            $email_body_data = str_replace("{" . $value1['property'] . "}", $value1['value'], $email_body_data);
        }
        return array(
            $subject, $unsubscribe, $email_body_data
        );
    }
}

if (!function_exists('replaceLinkShortcode')) {
    function replaceLinkShortcode($content, $email, $attempt)
    {
        $links_data = LinkVisits::where('attempt', "=", "NO")->get();
        $pattern = '/\[sendster-link\s+token="([^"]+)"\]\[\/sendster-link\]/';
        $install_url = get_option('install_url');

        foreach ($links_data as $value) {
            $replacement = '<a target="blank" href="' . $install_url . '/linkvisit?token=' . $value->otp . '&email=' . base64_encode($email) . '&attempt=' . base64_encode($attempt) . '">' . $value->text ?? $value->url . '</a>';
            $content = preg_replace($pattern, $replacement, $content);
        }

        return $content;
    }
}

if (!function_exists('add_option')) {
    function add_option($name, $value)
    {
        if (get_option($name) === false) {
            $option = new Option();
            $option->name = $name;
            $option->value = $value;
            $option->created_at = time();
            $option->save();
        } else {
            update_option($name, $value);
        }
    }
}

if (!function_exists('delete_option')) {
    function delete_option($name)
    {
        Option::where('name', $name)->delete();
    }
}

if (!function_exists('spinText')) {
    function spinText($text, $spin = 1)
    {
        if ($spin == 1) {
            return preg_replace_callback('/\{(((?>[^\{\}]+)|(?R))*)\}/x', function ($text) {
                $text = spinText($text[1]);
                $parts = explode('|', $text);
                return $parts[array_rand($parts)];
            }, $text);
        } else {
            return preg_replace('/\{(((?>[^\{\}]+)|(?R))*)\}/x', '', $text);
        }
    }
}

if (!function_exists('getUserIPqmlr')) {
    function getUserIPqmlr()
    {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if (isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if (isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
}

if (!function_exists('get_option')) {
    function get_option($name)
    {
        $option_value = Option::select('value')->where('name', '=', $name)->get()->toArray();
        if (count($option_value) > 0) {
            return $option_value[0]['value'];
        }
        return false;
    }
}

if (!function_exists('sendApi')) {
    function sendApi($url, $data = array(), $header = array())
    {
        $data_arr = array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
        );

        if (!empty($data)) {
            $data_arr[CURLOPT_POSTFIELDS] = $data;
        }

        if (!empty($data)) {
            $data_arr[CURLOPT_HTTPHEADER] = $header;
        }

        $ch = curl_init();

        curl_setopt_array($ch, $data_arr);

        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    }
}

if (!function_exists('doEnc')) {
    function doEnc($string, $do = "encrypt")
    {
        $token = "sendster is great";
        $method = "AES-256-CBC";
        $key = hash("sha256", $token);
        $iv = substr(hash('sha256', '--' . $token), 0, 16);
        if ($do == "encrypt") {
            $data = base64_encode(openssl_encrypt($string, $method, $key, 0, $iv));
        } elseif ($do == "decrypt") {
            $data = openssl_decrypt(base64_decode($string), $method, $key, 0, $iv);
        } else {
            $data = $string;
        }
        return $data;
    }
}

if (!function_exists('spinURL')) {
    function spinURL($text)
    {
        return preg_replace_callback('#\bhttps?://[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/))#', function ($str) {
            if (isset($str[0])) {
                if (filter_var($str[0], FILTER_VALIDATE_URL)) {
                    $otp = substr(str_shuffle('0123456789wertyuidfgcvbnQWYUCVBXCVNHJKFGH'), 1, 5);
                    return add_query_arg(array('qmlrspinid' => $otp), $str[0]);
                }
            }
        }, $text);
    }
}

if (!function_exists('add_query_arg')) {
    function add_query_arg($arg1, $arg2, $arg3 = "")
    {
        $create_url = function ($url, $args) {
            $url_arr = parse_url($url);
            $params = "";
            $all_args = array();
            if (isset($url_arr['query'])) {
                parse_str($url_arr['query'], $temp_all_args);
                $all_args = $temp_all_args;
            }

            foreach ($args as $index => $arg) {
                $all_args[$index] = $arg;
            }

            $new_arr = array();
            foreach ($all_args as $index => $arg) {
                array_push($new_arr, $index . "=" . $arg);
            }
            $params = "?";
            $params .= implode("&", $new_arr);

            $new_url = "";
            if (isset($url_arr['scheme'])) {
                $new_url .= $url_arr['scheme'] . "://";
            }
            if (isset($url_arr['host'])) {
                $new_url .= $url_arr['host'];
            }
            if (isset($url_arr['path'])) {
                $new_url .= $url_arr['path'];
            }
            return $new_url . $params;
        };
        if (is_array($arg1)) {
            $url = $arg2;
            return $create_url($url, $arg1);
        } else {
            $url = $arg3;
            $arr = array($arg1 => $arg2);
            return $create_url($url, $arr);
        }
    }
}

if (!function_exists('getEnvVariable')) {
    function getEnvVariable($name)
    {
        artisanExceptionHandle('config:clear');
        $name = strtolower($name);
        $value = env($name);
        return $value;
    }
}

if (!function_exists('changeDateTime')) {
    function changeDateTime($timestampString, $format = 'd-m-Y')
    {
        $carbonDate = Carbon::createFromTimestamp(strtotime($timestampString));

        if ($carbonDate->isToday()) {
            return 'Today';
        } elseif ($carbonDate->isYesterday()) {
            return 'Yesterday';
        } else {
            return $carbonDate->format($format);
        }
    }
}

if (!function_exists('isInstalled')) {
    function isInstalled()
    {
        $installedFolderExist = File::isDirectory(storage_path('app/installed'));
        $envExists = File::isFile(base_path('.env'));

        if ($installedFolderExist && $envExists) {
            return true;
        }

        if (!$installedFolderExist && $envExists) {
            return File::makeDirectory(storage_path('app/installed'), 0755, true, true);
        }

        return false;
    }
}

if (!function_exists('table')) {
    function table($name)
    {
        return DB::getTablePrefix() . $name;
    }
}

if (!function_exists('site_url')) {
    function site_url()
    {
        $url = URL::to("/");
        return $url;
    }
}

if (!function_exists('unsubscribeLinkInsideUnsubsLink')) {
    function unsubscribeLinkInsideUnsubsLink($content)
    {
        $reg = "/\[unsubscribe(\s.*?)?\](?:([^\[]+)?\[\/unsubscribe\])?/";
        $data = preg_replace('/\[unsubscribe\](.*?)\[\/unsubscribe\]/', '<a href="@unsboxlinkadd@">$1</a>', $content);
        if ($data == $content) {
            $data = '<a href="@unsboxlinkadd@">' . $data . '</a>';
        }
        $data = '<center><p style="color:gray;">' . $data . '</p></center>';
        return $data;
    }
}

if (!function_exists('checkAlreadyAttempted')) {
    function checkAlreadyAttempted($current_attempt, $to_email)
    {
        return DB::table('mail_sending_reports')->where([['attempt', $current_attempt], ['email', $to_email]])->get()->count();
    }
}

if (!function_exists('apiMailSend')) {
    function apiMailSend($name, $email, $subject, $content)
    {
        $api_url = "http://63.250.45.252/membership/api/mail";
        $token = session('forgot_password_token');
        $mailing_data = json_encode(array('name' => $name, 'email' => $email, 'subject' => $subject, 'content' => $content, 'token' => $token, 'url' => site_url()));

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Host: sendsterapp.in"
        ));
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array('data' => $mailing_data));
        $res = curl_exec($ch);
        $data = json_decode($res);
        return (isset($data->sent) && $data->sent === true) ? true : false;
    }
}

if (!function_exists('phpMailSend')) {
    function phpMailSend($name, $email, $email_subject, $email_body, $unsubscribemsg = "")
    {
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $content = $email_body . $unsubscribemsg;
        return mail($email, $email_subject, $content, $headers);
    }
}

if (!function_exists('replaceConfirmedEmail')) {
    function replaceConfirmedEmail($body, $email, $list_ids, $attempt)
    {
        $url = site_url() . '/confirmation_email?email=' . base64_encode($email) . '&list_id=' . base64_encode(md5($list_ids)) . "&attempt=" . base64_encode($attempt);
        $body = str_replace("[confirmation_link]", $url, $body);
        return $body;
    }
}

if (!function_exists('replaceResubscribeEmail')) {
    function replaceResubscribeEmail($body, $email, $list_ids, $attempt)
    {
        $url = site_url() . '/resubscribe?email=' . base64_encode($email) . '&list_id=' . base64_encode(md5($list_ids)) . "&attempt=" . base64_encode($attempt);
        $body = str_replace("[resubscribe]", $url, $body);
        return $body;
    }
}

if (!function_exists('getTableData')) {
    function getTableData($request, String $table, array $whereCondition = [], array $orWhereCondition = [])
    {
        $existingColumns = Schema::getColumnListing($table);
        $columns = [];
        foreach ($request->input('columns') as $key => $value) {
            if (!empty($value['data']) && in_array($value['data'], $existingColumns)) {
                $columns[] = $value['data'];
            }
        }

        $query = DB::table($table)->select($columns);

        // Get the total number of records before filtering
        $totalRecords = DB::table($table);
        if (!empty($whereCondition)) {
            $query->where(function ($query) use ($whereCondition, $totalRecords) {
                foreach ($whereCondition as $column => $value) {
                    $query->where($column, '=', $value);
                    $totalRecords->where($column, '=', $value);
                }
            });
        }

        if (!empty($orWhereCondition)) {
            foreach ($orWhereCondition as $column => $value) {
                $query->orWhere($column, '=', $value);
                $totalRecords->orWhere($column, '=', $value);
            }
        }

        // Apply searching if a search term is provided
        if ($request->has('search')) {
            $search = $request->input('search')['value'];

            if (strlen($search) > 0) {
                $query->where(function ($query) use ($columns, $search, $totalRecords) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'like', '%' . $search . '%');
                        $totalRecords->orWhere($column, 'like', '%' . $search . '%');
                    }
                });
            }
        }
        $totalRecords = $totalRecords->count();

        // Get the total number of records after filtering
        $totalDisplay = $query->count();

        // Pagination
        $length = $request->input('length');
        $start = $request->input('start');
        $query->skip($start)->take($length);

        // Sorting
        $orderColumn = $request->has('columnFilter') ? $request->input('columnFilter') : 'id';
        $orderDirection = isset($request->input('order')[0]['dir']) ? $request->input('order')[0]['dir'] : 'desc';
        $query->orderBy($orderColumn, $orderDirection);

        // Get the paginated data
        $data = $query->get()->toArray();
        $data = json_decode(json_encode($data), true);

        return [
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $totalDisplay,
            'data' => $data
        ];
    }
}
