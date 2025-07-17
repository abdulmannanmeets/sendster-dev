<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RouteHandle extends Controller
{
    public function index()
    {
        return view('welcome');
    }
}
