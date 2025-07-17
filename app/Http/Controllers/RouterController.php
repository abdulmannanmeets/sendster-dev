<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RouterController extends Controller
{
    public $route = [
        'Dashboard' => 'dashboard',
        'List' => 'all_lists||edit_list||list_templates',
        'SMTPs' => 'all_smtps||create_smtp',
        'Snippets' => 'all_snippets',
        'Campaign' => 'all_campaigns||create_campaigns||live_sending',
        'Sequence' => 'all_sequences||edit_sequences',
        'Subscription Form' => 'all_forms||create_form||embedded-form',
        'Email Verification' => 'email_verification||user_verification',
        'Settings' => 'all_users||create_user'
    ];

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        // Get header and footer script
        return view('welcome', array(
            'header' => get_option('header_script') ?? null,
            'footer' => get_option('footer_script') ?? null
        ));
        // $auth_user = Auth::user();
        // $permission = json_decode($auth_user['permission']);
        // if(count($permission) > 0) {
        //     $arr = [];
        //     foreach($permission as $key => $value) {
        //         foreach(explode('||', $this->route[$value]) as $key1 => $value1) {
        //             array_push($arr, $value1);
        //         }
        //     }
        //     if(in_array($page, $arr)) {
                // return view('welcome');
        //     }
        //     return abort(404);
        // } else {
        //     return abort(403);
        // }
    }
}
