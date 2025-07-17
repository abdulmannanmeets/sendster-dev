<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ForgotPasswordController extends Controller
{
    public function index(Request $request)
    {
        if ($request['email']) {
            return self::otpGeneration($request);
        } else if ($request['otp']) {
            return self::otpValidation($request);
        } else if ($request['password']) {
            return self::passwordCreation($request);
        }
    }

    public function otpGeneration($request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        if (filter_var($request['email'], FILTER_VALIDATE_EMAIL)) {
            $user_data = User::select('id', 'name')->where('email', '=', $request['email'])->first();
            if ($user_data) {
                $token = substr(str_shuffle('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMM124567890'), 1, 10);
                $request->session()->put('forgot_password_token', $token);
                $request->session()->put('forgot_password_email', $request['email']);
                $subject = "Password reset for Sendster";
                $body = "
                <p>Dear " . $user_data->name . ",</p>
                <p>We have received a request to reset password for Sendster installed in <a href='" . get_option('install_url') . "'>" . get_option('install_url') . "</a>.</p>
                <p>Please use the OTP below to reset your password</p>
                <p><strong>" . $token . "</strong></p>
                <p>If you have any queries or feedback you can create a support ticket at <a href='http://teknikforce.com/support'>http://teknikforce.com/support</a>.</p>
                <br>
                <p>Cheers!</p>
                <p>Teknikforce</p>
                ";
                $status = apiMailSend($user_data->name, $request['email'], $subject, $body);
                if ($status) {
                    return ['status' => 1, 'message' => ''];
                } else {
                    return ['status' => 0, 'message' => 'Unable to send mail'];
                }
            } else {
                return ['status' => 0, 'message' => "Invalid email or user doesn't exist"];
            }
        }
        return ['status' => 0, 'message' => "Invalid email or user doesn't exist"];
    }

    public function otpValidation($request)
    {
        $request->validate([
            'otp' => ['required']
        ]);
        $otp = $request['otp'];
        if ($request->session()->has('forgot_password_token')) {
            $session_otp = session('forgot_password_token');
            if ($session_otp == $otp) {
                return ['status' => 1];
            } else {
                return ['status' => 0, 'message' => 'Invalid OTP'];
            }
        } else {
            return ['status' => 0, 'message' => 'Please refresh the page and try again'];
        }
    }

    public function passwordCreation($request)
    {
        $request->validate([
            'password' => [
                'required', 'string', 'confirmed', 'min:8',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/', $value)) {
                        $fail('The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
                    }
                }
            ]
        ]);

        if (!$request->session()->has('forgot_password_email')) {
            return ['status' => 0, 'message' => "Invalid email or user doesn't exist"];
        }

        $email = session('forgot_password_email');

        $status = DB::table('users')->where('email', "=", $email)->update([
            'password' => Hash::make($request['password'])
        ]);

        if ($status) {
            return ['status' => 1];
        } else {
            return ['status' => 0, 'message' => 'Unable to update the password'];
        }
    }
}
