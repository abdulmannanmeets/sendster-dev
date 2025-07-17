<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class RegisterController extends Controller
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
        if(env('app.db_init')) {
            return redirect('config');
        }
        $this->middleware('guest')->except('logout');
    }

    public function index()
    {
    }
}
