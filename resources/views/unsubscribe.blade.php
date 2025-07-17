<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <base href="">
    <meta charset="utf-8" />
    <title>Sendster - Unsubscribe</title>
    <meta name="__token" content="{{csrf_token()}}">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="{{ URL::asset('/favicon.ico') }}">
    <!--begin::Fonts-->
    <link rel="stylesheet" href="assets/css/fonts/poppins.css" />
    <link href="assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/plugin.bundle.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/custom/datatables/datatables.bundle.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/custom/fullcalendar/fullcalendar.bundle.css" rel="stylesheet" type="text/css" />
</head>

<body id="kt_body" class="header-fixed header-tablet-and-mobile-fixed aside-enabled aside-fixed bg-white" style="--kt-toolbar-height:55px;--kt-toolbar-height-tablet-and-mobile:55px" data-kt-scrolltop="on">
    <div class="d-flex flex-column flex-root">
        <!--begin::Authentication - Signup Welcome Message -->
        <div class="d-flex flex-column flex-column-fluid">
            <!--begin::Content-->
            <div class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15">
                <!--begin::Logo-->
                <a class="mb-10 pt-lg-10">
                    <img alt="Logo" src="assets/images/logos/Mailengine-lo-1.png" class="h-40px mb-5">
                </a>
                <!--end::Logo-->
                <!--begin::Wrapper-->
                <div class="pt-lg-10 mb-10">
                    <!--begin::Logo-->
                    <h1 class="fw-bolder fs-2qx text-gray-800 mb-7">Do you want to unsubscribe?</h1>
                    <!--end::Logo-->
                    <!--begin::Message-->
                    <div class="fw-bold fs-3 text-muted mb-15"><span class="text-danger">Alert!</span> If you unsubscribe, you will stop receiving our newsletter.</div>
                    <form method="POST" id="unsubscribe_form">
                        <div class="text-center">
                            <button type="submit" class="btn btn-lg btn-danger fw-bolder mb-5">Unsubscribe</button>
                            <button type="button" class="btn btn-lg btn-primary fw-bolder mb-5">Cancel</button>
                        </div>
                    </form>
                    <!--end::Action-->
                </div>
                <div class="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px" style="background-image: url(assets/images/illustrations/unsubscribe.gif)"></div>
            </div>
        </div>
    </div>
    <script src="assets/lib/axios.js"></script>
    <script>
        let form = document.querySelector("#unsubscribe_form");
        let unsubscibe = form.querySelector('button[type="submit"]');
        let _token = document.querySelector('meta[name="__token"]').getAttribute("content");
        let email = "{{$email}}";
        let attempt = "{{$attempt}}";
        form.addEventListener("submit", ((event) => {
            event.preventDefault();
            unsubscibe.innerHTML = "Please wait";
            unsubscibe.disabled = true;
            axios.post("unsubscribe", {
                unsubscribe: true,
                qmlrunsubotp: attempt,
                card: email,
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': _token
                }
            }).then((res) => {
                res = res.data;
                alert(res.message);
            }).catch((error) => {
                alert(error.response.data.message);
            }).finally(() => {
                unsubscibe.disabled = false;
                unsubscibe.innerHTML = "Unsubscribe";
            });
        }));
    </script>
</body>