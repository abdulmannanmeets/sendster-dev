<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <base href="">
    <meta charset="utf-8">
    <title>{{ config('app.name') }} - Login</title>
    <meta name="__token" content={{csrf_token()}}>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ URL::asset('/favicon.ico') }}">

    <script src="assets/lib/vue.js"></script>
    <script src="assets/lib/vue-router.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
    <link rel="stylesheet" href="assets/plugins/global/plugins.bundle.css" type="text/css">
    <link rel="stylesheet" href="assets/css/style.bundle.css" type="text/css">
    @if($header)
    {!! $header !!}
    @endif
</head>

<body>
    <div class="d-flex flex-column flex-root">
        <!--begin::Authentication - Sign-in -->
        <div class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed" style="background-image: url(assets/media/illustrations/sketchy-1/14.png)">
            <!--begin::Content-->
            <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
                <!--begin::Logo-->
                <a href="#" class="mb-12">
                    <img alt="Logo" src="assets/images/logos/Mailengine-lo-1.png" class="h-40px">
                </a>
                <!--end::Logo-->
                <!--begin::Wrapper-->
                <div class="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                    <!--begin::Form-->
                    <form class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" id="kt_sign_in_form" action="#">
                        <div class="text-center mb-10">
                         <h1 class="text-dark mb-3">Sign In to {{ config('app.name') }}</h1>
                        </div>
                        <div class="fv-row mb-10 fv-plugins-icon-container">
                            <label class="form-label fs-6 fw-bolder text-dark">Email</label>
                            <input class="form-control form-control-lg form-control-solid" type="text" name="email" v-model="create_item.email" autocomplete="off">
                        </div>
                        <div class="fv-row mb-10 fv-plugins-icon-container">
                            <div class="d-flex flex-stack mb-2">
                                <label class="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
                                <a href="forgot_password" target="_BLANK" class="link-primary fs-6 fw-bolder">Forgot Password ?</a>
                            </div>
                            <input class="form-control form-control-lg form-control-solid" type="password" v-model="create_item.password" name="password" autocomplete="off">
                        </div>
                        <div class="fv-row mb-10 fv-plugins-icon-container">
                            <div class="d-flex mb-2">
                                <input class="form-check-input" name="remember" type="checkbox" id="rememberCheckbox" v-model="create_item.remember">
                                <label class="form-label fw-bolder text-dark fs-6 mb-0 ms-3">Remember Me</label>
                            </div>                      
                        </div>
                        <div class="text-center">
                            <button type="submit" id="kt_sign_in_submit" class="btn btn-lg btn-primary w-100 mb-5">
                                <span class="indicator-label">Continue</span>
                                <span class="indicator-progress">Please wait...
                                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                            </button>
                        </div>
                        <div></div>
                    </form>
                </div>
            </div>
            <div class="d-flex flex-center flex-column-auto p-10">
                <div class="d-flex align-items-center fw-bold fs-6">
                    <a href="https://teknikforce.com/aboutus/" target="_blank" class="text-muted text-hover-primary px-2">About</a>
                    <a href="https://teknikforce.com/support/" target="_blank" class="text-muted text-hover-primary px-2">Support</a>
                    <a href="https://getsendster.in/" target="_blank" class="text-muted text-hover-primary px-2">Purchase</a>
                </div>
            </div>
        </div>
    </div>

    <script>
        var hostUrl = "assets/";
    </script>
    <script src="assets/lib/axios.js"></script>
    <script src="assets/plugins/global/plugins.bundle.js"></script>
    <script src="assets/js/scripts.bundle.js"></script>
    <script src="assets/js/script.js"></script>
    <script src="assets/js/components/Login.js" type="module"></script>
    @if($footer)
    {!! $footer !!}
    @endif
</body>
</html>