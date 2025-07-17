<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AiController extends Controller
{
    var $subject_prompt;
    var $body_prompt;
    public function __construct()
    {
        $this->subject_prompt = "Please suggest 5-10 alternative headlines for the following headline.
        Do not put anything in your reply except the alternative headlines. No Okay, no Sure. Just the headlines. Do not put numbers before the headlines. Do not put bullets or - either. Just put the headlines separated by a line-break. The original headline is below:
        {subject}";

        $this->body_prompt = "Hi ChatGpt! My product's name is '{product_name}' and my line of business is '{business_type}'.
        Please write an email based on the information below for my business. Return only the email text, do not add any greetings of explanation. I want just the actual email.
        The email should in {email_style} style.
        Base the contents of the email on the information below.
        {email_information}";
    }
    public function body($request)
    {
        $request->validate([
            'product_name' => 'required',
            'email_information' => 'required',
            'business_type' => 'required',
            'email_style' => 'required',
        ]);

        $email_style = $request->email_style;
        $product_name = $request->product_name;
        $business_type = $request->business_type;
        $email_information = $request->email_information;

        $response = $this->api(["{product_name}", "{business_type}", "{email_information}", "{email_style}"], [$product_name, $business_type, $email_information, $email_style], $this->body_prompt);

        return $response;
    }

    public function subject($request)
    {
        $request->validate(['subject'=>'required']);

        $response = $this->api(['{subject}'], [$request['subject']], $this->subject_prompt);

        return $response;
    }

    public function api($replaceString, $replaceArray, $body)
    {
        $body = str_replace($replaceString, $replaceArray, $body);

        $data = [
            "subject" => $body
        ];

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'http://63.250.45.252/membership/api/generateai',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => ["Host: sendsterapp.in"],
        ));

        $response = json_decode(curl_exec($curl));

        return $response;
    }
}
