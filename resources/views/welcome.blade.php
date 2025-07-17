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
    <link href="assets/lib/grapesjs/grapes.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/custom/datatables/datatables.bundle.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/custom/fullcalendar/fullcalendar.bundle.css" rel="stylesheet" type="text/css" />
    @if($header)
    {!! $header !!}
    @endif
</head>

<body id="kt_body" class="header-fixed header-tablet-and-mobile-fixed aside-enabled aside-fixed" style="--kt-toolbar-height:55px;--kt-toolbar-height-tablet-and-mobile:55px">
    <!--begin::Main-->
    <!--begin::Root-->
    <div id="app" class="container-fluid p-0 m-0">
        <index></index>
    </div>

    <!--begin::Javascript-->
    <script>
        var hostUrl = "assets/";
        </script>
    <script src="assets/lib/vue.js"></script>
    <script src="assets/lib/vuex.js"></script>
    <script src="assets/lib/axios.js"></script>
    <script src="assets/js/script.js"></script>
    <script src="assets/js/auto_update.js"></script>
    <script src="assets/lib/vue-router.js"></script>
    <script src="assets/js/scripts.bundle.js"></script>
    <script src="assets/js/app.js" type="module"></script>

    @if($footer)
    {!! $footer !!}
    @endif

    <script src="assets/lib/grapesjs/grapes.min.js"></script>
    <script src="assets/lib/ace/ace.js"></script>
    <script src="assets/plugins/global/plugins.bundle.js"></script>
    <script src="assets/lib/grapesjs/grapejs-blocks-basic.js"></script>
    <script src="assets/lib/grapesjs/all_grapejs.js"></script>
    <script src="assets/plugins/custom/datatables/datatables.bundle.js"></script>
    <script src="assets/plugins/custom/fullcalendar/fullcalendar.bundle.js"></script>
    <!--end::Javascript-->
</body>

</html>