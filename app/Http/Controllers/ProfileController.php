<?php

namespace App\Http\Controllers;

use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    function index(Request $request)
    {
        if ($request['method_type'] == 'get_user') return self::getUserById($request);
        elseif ($request['method_type'] == 'post') return self::saveProfileSettings($request);
        elseif ($request['method_type'] == 'get_all_users') return self::getAllUsers();
        elseif ($request['method_type'] == 'delete_user') return self::deleteUser($request);
        elseif ($request['method_type'] == 'get_logged_in') return self::showProfileSettings($request);
    }

    function showProfileSettings($request)
    {
        $validLicense = self::userDataIsValid(json_decode(get_option('license_auth'), true));
        $status = $validLicense['status'];
        $product_permissions = isset($validLicense['product_permissions']) ? $validLicense['product_permissions'] : 'elite';

        $user = $request->user();
        $user_details['status'] = 1;
        $user_details['id'] = md5($user->id);
        $user_details['name'] = $user->name;
        $user_details['email'] = $user->email;
        $user_details['verified'] = $status;
        $user_details['product_permissions'] = $product_permissions;
        $user_details['permission'] = $user->permission;
        $user_details['profile'] = $user->profile_picture;
        return $user_details;
    }

    function userDataIsValid($license_auth)
    {
        $verifyEmail = new VerifyEmailController();
        $email = isset($license_auth['custemail']) ? $license_auth['custemail'] : "";
        $license = isset($license_auth['license']) ? $license_auth['license'] : "";
        $custinfo = [
            "email" => $email,
            "license" => $license
        ];
        return $verifyEmail->doRegister($custinfo);
    }

    function saveProfileSettings($request)
    {
        $profile_picture = "";
        $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'permission' => ['required', 'array'],
            'current_password' => ['required', function ($attribute, $value, $fail) {
                if (!Hash::check($value, auth()->user()->password)) {
                    return $fail(__('The current password is incorrect'));
                }
            }],
        ]);

        $current_password = $request->current_password;

        if ($request['password'] !== null || $request['password_confirmation'] !== null) {
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
            $current_password = $request->password;
        }

        $username = explode('@', $request->email)[0];

        if ($request->profile_picture != null || gettype($request->profile_picture) === "string") {
            $image_extension = self::uploadImage($request->file('profile_picture'), $username);
            $profile_picture = "assets/images/profile/profile" . $username . '.' . $image_extension;
        }

        $user_id = $request->id;
        if ($user_id !== 'NaN') {
            $status = DB::table('users')->where(DB::raw("md5(id)"), $user_id)->update([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($current_password),
                "profile_picture" => $profile_picture ?? 'assets/images/profile/profile.png',
                "verified" => $request->verified,
                "permission" => json_encode($request->permission),
                "updated_at" => now(),
            ]);
            $message = "User updated successfully";
        } else {
            $request->validate([
                'email' => 'unique:users'
            ]);
            $insert_id = DB::table('users')->insertGetId([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($current_password),
                "ip_created" => request()->ip(),
                "profile_picture" => $request->profile_picture ?? 'assets/images/profile/profile.png',
                "verified" => 1,
                "permission" => json_encode($request->permission),
                "created_at" => now(),
            ]);
            $status = $insert_id;
            $user_id = md5($insert_id === null ? 0 : $insert_id);
            $message = "User created successfully";
        }

        return array(
            'status' => $status,
            'id' => $user_id,
            'message' => $message
        );
    }

    function uploadImage($request, $username)
    {
        $name = 'profile' . $username . '.' . $request->getClientOriginalExtension();
        $request->move(public_path('assets/images/profile'), $name);
        return $request->getClientOriginalExtension();
    }

    function getAllUsers($is_md5 = true)
    {
        $get_all = json_decode(User::select('id', 'name', 'email', 'created_at')->orderBy('id', 'desc')->get(), true);
        foreach ($get_all as $key => $value) {
            $get_all[$key]['id'] = $is_md5 ? md5($value['id']) : $value['id'];
            $get_all[$key]['created_at'] = changeDateTime($value['created_at']);
        }
        return array(
            'status' => 1,
            'message' => $get_all
        );
    }

    function getValidId($id)
    {
        $data = DB::table('users')->select('id')->where(DB::raw('MD5(id)'), "=", $id)->get();
        return isset($data->id) ? $data->id : 0;
    }

    function deleteUser($request)
    {
        $request->validate([
            'id' => ['required', 'array'],
        ]);
        $status = User::whereIn(DB::raw("md5(id)"), $request['id'])->delete();
        return array('status' => $status);
    }

    function getUserById($request)
    {
        $user_data = User::select('id', 'name', 'email', 'profile_picture', 'permission', 'verified')->where(DB::raw('MD5(id)'), '=', $request['id'])->get()->toArray()[0];
        $user_data['id'] = md5($user_data['id']);
        return $user_data;
    }
}
