<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <base href="">
    <meta charset="utf-8" />
    <meta name="__token" content="{{csrf_token()}}">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="{{ URL::asset('/favicon.ico') }}">
    <!--begin::Fonts-->
    <link rel="stylesheet" href="../assets/css/fonts/poppins.css" />
    <link href="../assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/plugin.bundle.css" rel="stylesheet" type="text/css" />
</head>

<body id="kt_body">
    <div class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15">
        <a href="#" class="pt-lg-10">
            <img alt="Logo" src="{{ URL::asset('assets/images/logos/Mailengine-lo-1.png') }}" class="h-40px mb-5">
        </a>
        <div class="pt-lg-10 mb-10 text-center">
            @if($added===1)
            <div class="fs-3 fw-bold mb-10">{{$reason}}</div>
            @elseif($added===5)
            <div class="fs-3 fw-bold mb-5">We haven't received any data from the form.</div>
            <p>
                If you're using a desktop a desktop browser, try reloading the page.
            </p>
            <p>
                If you're using a mobile device, fill out and submit the form in a standalone browser like Chrome or Safari.
            </p>
            @else
            <div class="fs-3 fw-bold mb-10">{{$reason}}</div>
            @endif
        </div>
    </div>

</body>

</html>