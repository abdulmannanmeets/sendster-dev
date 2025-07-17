<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmbedFormController extends Controller
{
    function index()
    {
        if(!empty($_POST) && isset($_GET['id'])) {
            $id = $_GET['id'];
            $subs = new SubscriptionController();
            $embed_form = $subs->get_embed_form($id);
            // self::renderForm($);
        } else if(isset($_GET['id'])) {
            return view('subscription_form');
        } else {
            return abort(404);
        }
        echo "checking";
    }
    function processEmbedForm()
    {
    }
}