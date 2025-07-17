<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <base href="">
    <meta charset="utf-8" />
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

<body id="kt_body" class="bg-body bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style="background-image: url(assets/media/illustrations/sketchy-1/14.png)">
    <div class="d-flex flex-column flex-root">
        <!--begin::Authentication - Signup Verify Email -->
        <div class="d-flex flex-column flex-column-fluid">
            <!--begin::Content-->
            <div class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15">
                <!--begin::Logo-->
                <a href="#" class="mb-10 pt-lg-10">
                <img alt="Logo" src="{{ URL::asset('assets/images/logos/Mailengine-lo-1.png') }}" class="h-40px mb-5">
                </a>
                <!--end::Logo-->
                <!--begin::Wrapper-->
                <div class="pt-lg-10 mb-10">
                    <!--begin::Logo-->
                    <h1 class="fw-bolder fs-2qx text-gray-800 mb-7">Email confirmation</h1>
                    <!--end::Logo-->
                    <!--begin::Message-->
                    @if($status == 0)
                        <div class="fs-3 fw-bold text-muted mb-10">Unable to verify this email <a href="mailto:{{$email}}" class="link-primary fw-bolder">{{$email}}</a></div>
                    @elseif($status == 1)
                        <div class="fs-3 fw-bold text-muted mb-10">You have been sucessfully verified your email <a href="mailto:{{$email}}" class="link-primary fw-bolder">{{$email}}</a></div>
                    @else
                        <div class="fs-3 fw-bold text-muted mb-10">You are already verified your email <a href="mailto:{{$email}}" class="link-primary fw-bolder">{{$email}}</a></div>
                    @endif
                    <!--end::Message-->
                </div>
                <!--end::Wrapper-->
            </div>
            <!--end::Content-->
            <!--begin::Footer-->
            <div class="d-flex flex-center flex-wrap fs-6 p-5 pb-10">
                <!--begin::Links-->
                <div class="d-flex flex-center fw-bold fs-6">
                    <a href="https://teknikforce.com/aboutus/" target="_blank" class="text-muted text-hover-primary px-2">About</a>
                    <a href="https://teknikforce.com/support/" target="_blank" class="text-muted text-hover-primary px-2">Support</a>
                    <a href="https://getsendster.in/" target="_blank" class="text-muted text-hover-primary px-2">Purchase</a>
                </div>
                <!--end::Links-->
            </div>
            <!--end::Footer-->
        </div>
        <!--end::Authentication - Signup Verify Email-->
    </div>

    <!--begin::Javascript-->
    <script>
        var hostUrl = "assets/";
    </script>
    <script src="assets/lib/vue.js"></script>
    <script src="assets/lib/axios.js"></script>
    <!--end::Javascript-->
</body>

</html>