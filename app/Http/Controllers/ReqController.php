<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReqController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $request->validate([
            'type' => 'required'
        ]);

        if ($request['type'] == 'logout') {
            if (Auth::check()) {
                session()->flush();
                auth()->logout();
                return redirect('/login');
            }
            return "Unable to logout";
        }

        if ($request['type'] == 'is_auth') {
            if (Auth::check()) {
                return 1;
            }
        }
    }
}
