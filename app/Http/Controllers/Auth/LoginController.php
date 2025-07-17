<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Exception;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    protected $status = 0;
    protected $message = "Something went wrong! Please try again.";

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function index()
    {
        return view('auth.login', array(
            'header' => get_option('header_script') ?? null,
            'footer' => get_option('footer_script') ?? null
        ));
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => ['required', 'string']
        ]);
        try {
            if (auth()->attempt(array('email' => $request['email'], 'password' => $request['password']))) {
                $this->status = 1;
                $this->message = "Logged in successfully";
            } else {
                $this->message = "Invalid password or email";
            }
        } catch (Exception $e) {
            $this->message = $e->getMessage();
        }
        return array(
            'status' => $this->status,
            'message' => $this->message
        );
    }
}
