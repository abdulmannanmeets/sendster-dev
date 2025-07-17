<!DOCTYPE html>
<html lang="en">

<head>
    <base href="">
    <meta charset="UTF-8">
    <title>{{ config('app.name') }} - Config</title>
    <meta name="__token" content={{csrf_token()}}>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ URL::asset('/favicon.ico') }}">

    <link rel="stylesheet" href="{{ URL::asset('assets/css/style.bundle.css')}}" type="text/css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
    <link rel="stylesheet" href="{{ URL::asset('assets/plugins/global/plugins.bundle.css')}}" type="text/css">
</head>

<body id="kt_body" class="bg-body">
    <div class="d-flex flex-column flex-root">
        <div class="d-flex flex-column flex-lg-row flex-column-fluid stepper stepper-pills stepper-column" id="kt_create_account_stepper">
            <div class="d-flex flex-column flex-lg-row-auto w-xl-500px bg-lighten shadow-sm">
                <div class="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-500px scroll-y">
                    <div class="d-flex flex-row-fluid flex-column flex-center p-10 pt-lg-20">
                        <a href="#" class="mb-10 mb-lg-20">
                            <img alt="Logo" src="{{ URL::asset('assets/images/logos/Mailengine-lo-1.png') }}" class="h-40px" />
                        </a>
                        <div class="stepper-nav">
                            <!--begin::Step 1-->
                            <div class="stepper-item current" data-kt-stepper-element="nav">
                                <div class="stepper-line w-40px"></div>
                                <div class="stepper-icon w-40px h-40px">
                                    <i class="stepper-check fas fa-check"></i>
                                    <span class="stepper-number">1</span>
                                </div>
                                <div class="stepper-label">
                                    <h3 class="stepper-title">Pre-install requirements</h3>
                                    <div class="stepper-desc fw-bold">Checking the requirements</div>
                                </div>
                            </div>
                            <!--end::Step 1-->
                            <!--begin::Step 2-->
                            <div class="stepper-item" data-kt-stepper-element="nav">
                                <div class="stepper-line w-40px"></div>
                                <div class="stepper-icon w-40px h-40px">
                                    <i class="stepper-check fas fa-check"></i>
                                    <span class="stepper-number">2</span>
                                </div>
                                <div class="stepper-label">
                                    <h3 class="stepper-title">Configure database</h3>
                                    <div class="stepper-desc fw-bold">Setup your database</div>
                                </div>
                            </div>
                            <div class="stepper-item" data-kt-stepper-element="nav">
                                <div class="stepper-line w-40px"></div>
                                <div class="stepper-icon w-40px h-40px">
                                    <i class="stepper-check fas fa-check"></i>
                                    <span class="stepper-number">3</span>
                                </div>
                                <div class="stepper-label">
                                    <h3 class="stepper-title">Login info</h3>
                                    <div class="stepper-desc fw-bold">Your login setup</div>
                                </div>
                            </div>
                            <!--end::Step 3-->
                            <!--begin::Step 4-->
                            <div class="stepper-item" data-kt-stepper-element="nav">
                                <div class="stepper-line w-40px"></div>
                                <div class="stepper-icon w-40px h-40px">
                                    <i class="stepper-check fas fa-check"></i>
                                    <span class="stepper-number">4</span>
                                </div>
                                <div class="stepper-label">
                                    <h3 class="stepper-title">Completed</h3>
                                    <div class="stepper-desc fw-bold">Woah, we are here!</div>
                                </div>
                            </div>
                            <!--end::Step 4-->
                        </div>
                    </div>
                    <!--end::Header-->
                    <!--begin::Illustration-->
                    <div class="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-150px min-h-lg-300px" style="background-image: url({{url('assets/media/illustrations/sketchy-1/16.png')}})"></div>
                    <!--end::Illustration-->
                </div>
                <!--end::Wrapper-->
            </div>
            <!--begin::Aside-->
            <!--begin::Body-->
            <div class="d-flex flex-column flex-lg-row-fluid py-10">
                <!--begin::Content-->
                <div class="d-flex flex-center flex-column flex-column-fluid">
                    <!--begin::Wrapper-->
                    <div class="w-lg-700px p-10 p-lg-15 mx-auto">
                        <!--begin::Form-->
                        <form class="my-auto pb-5" novalidate="novalidate" id="kt_create_account_form">
                            <!--begin::Step 1-->
                            <div class="current" data-kt-stepper-element="content">
                                <!--begin::Wrapper-->
                                <div class="w-100">
                                    <!--begin::Heading-->
                                    <div class="pb-10 pb-lg-15">
                                        <!--begin::Title-->
                                        <h2 class="fw-bolder d-flex align-items-center text-dark">Checking requirements
                                            <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Installation will happen when fullfill the requirements"></i>
                                        </h2>
                                        <!--end::Title-->
                                        <!--begin::Notice-->
                                        <div class="text-muted fw-bold fs-6">If you need more info, please check out <a href="#" class="link-primary fw-bolder">Help Page</a>.
                                        </div>
                                        <!--end::Notice-->
                                    </div>
                                    <!--end::Heading-->
                                    <!--begin::Input group-->
                                    <div class="fv-row">
                                        <!--begin::Row-->
                                        <div class="row">
                                            @foreach ($compatibilities as $key => $item)
                                            <!--begin::Col-->
                                            <div class="col-lg-12 mb-5">
                                                <!--begin::Option-->
                                                @if ($item["check"])
                                                <input type="radio" class="btn-check" name="{{ $item['name'] }}" checked="checked" id="mlr_config_{{$item['name']}}" />
                                                @else
                                                <input type="radio" class="btn-check" name="{{ $item['name'] }}" disabled id="mlr_config_{{$item['name']}}" />
                                                @endif
                                                <label class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center" for="mlr_config_{{$item['name']}}">
                                                    @if ($item["check"])
                                                    <i class="la la-check fs-1 me-3"></i>
                                                    @else
                                                    <i class="la la-warning fs-1 me-3 text-danger"></i>
                                                    @endif
                                                    <!--begin::Info-->
                                                    <span class="d-block fw-bold text-start">
                                                        <span class="text-dark fw-bolder d-block fs-4 mb-2">{{ $item["label"] }}</span>
                                                        <span class="text-muted fw-bold fs-6">{{$item["note"]}}</span>
                                                    </span>
                                                    <!--end::Info-->
                                                </label>
                                                <!--end::Option-->
                                            </div>
                                            <!--end::Col-->
                                            @endforeach
                                        </div>
                                        <!--end::Row-->
                                    </div>
                                    <!--end::Input group-->
                                </div>
                                <!--end::Wrapper-->
                            </div>
                            <!--end::Step 1-->
                            <!--begin::Step 2-->
                            <div class="" data-kt-stepper-element="content">
                                <!--begin::Wrapper-->
                                <div class="w-100">
                                    <!--begin::Heading-->
                                    <div class="pb-10 pb-lg-15">
                                        <!--begin::Title-->
                                        <h2 class="fw-bolder text-dark">Configure Database</h2>
                                        <!--end::Title-->
                                        <!--begin::Notice-->
                                        <div class="text-danger fw-bold fs-6">Please fill out the database connection information below to get started.</div>
                                        <!--end::Notice-->
                                    </div>
                                    <!--end::Heading-->
                                    <div class="mb-10 fv-row">
                                        <label class="form-label mb-3 required">Database Host Name</label>
                                        <input type="text" class="form-control form-control-lg form-control-solid" name="db_host_name" placeholder="Enter your database hostname" v-model="create_item.db_host_name" />
                                    </div>
                                    <div class="mb-10 fv-row">
                                        <label class="form-label mb-3 required">Database Username</label>
                                        <input type="text" class="form-control form-control-lg form-control-solid" name="db_user_name" placeholder="Enter your database username" v-model="create_item.db_user_name" />
                                    </div>
                                    <div class="mb-10 fv-row">
                                        <label class="form-label mb-3 required">Database Password</label>
                                        <input type="text" class="form-control form-control-lg form-control-solid" name="db_password" placeholder="Enter your database password" v-model="create_item.db_password" />
                                    </div>
                                    <div class="mb-10 fv-row">
                                        <label class="form-label mb-3 required">Database Name</label>
                                        <input type="text" class="form-control form-control-lg form-control-solid" name="db_name" placeholder="Enter your database name" v-model="create_item.db_name" />
                                    </div>
                                    <div class="mb-10 fv-row">
                                        <label class="form-label mb-3">Database Port</label>
                                        <input type="number" class="form-control form-control-lg form-control-solid" name="db_port" placeholder="Enter your database port number" v-model="create_item.db_port" />
                                    </div>
                                    <div class="mb-10 fv-row">
                                        <label class="form-label mb-3 required">Table Prefix</label>
                                        <input type="text" class="form-control form-control-lg form-control-solid" name="db_prefix" placeholder="Provide your database prefix" v-model="create_item.db_prefix" />
                                    </div>
                                </div>
                                <!--end::Wrapper-->
                            </div>
                            <!--end::Step 2-->
                            <!--begin::Step 3-->
                            <div class="" data-kt-stepper-element="content">
                                <!--begin::Wrapper-->
                                <div class="w-100">
                                    <!--begin::Heading-->
                                    <div class="pb-10 pb-lg-12">
                                        <!--begin::Title-->
                                        <h2 class="fw-bolder text-dark">Create an Admin User</h2>
                                        <div class="text-muted fw-bold fs-6">
                                            Put the details of the administrator for this site.<br>
                                            <a href="#" class="link-primary fw-bolder">Click here</a> to watch the tutorial.
                                        </div>
                                    </div>
                                    <div class="fv-row mb-10">
                                        <label class="form-label required">Name</label>
                                        <input name="name" class="form-control form-control-lg form-control-solid" placeholder="Enter your name" v-model="admin_create.name" />
                                    </div>
                                    <div class="fv-row mb-10 fv-plugins-icon-container">
                                        <label class="form-label fw-bolder text-dark fs-6 required">Email</label>
                                        <input class="form-control form-control-solid" type="email" name="email" autocomplete="off" placeholder="Enter email id" v-model="admin_create.email">
                                    </div>
                                    <div class="mb-7 fv-row fv-plugins-icon-container" data-kt-password-meter="true">
                                        <div class="mb-1">
                                            <label class="form-label fw-bolder text-dark fs-6 required">Password</label>
                                            <div class="position-relative mb-3">
                                                <input class="form-control form-control-solid" type="password" name="password" placeholder="Enter password" autocomplete="off" v-model="admin_create.password">
                                                <span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
                                                    <i class="bi bi-eye-slash fs-2"></i>
                                                    <i class="bi bi-eye fs-2 d-none"></i>
                                                </span>
                                            </div>
                                            <div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
                                                <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                                <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                                <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                                <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                                            </div>
                                        </div>
                                        <div class="text-muted">Use 8 or more characters with a mix of letters, numbers &amp; symbols.</div>
                                    </div>
                                    <div class="fv-row mb-10 fv-plugins-icon-container">
                                        <label class="form-label fw-bolder text-dark fs-6 required">Confirm Password</label>
                                        <input class="form-control form-control-solid" type="password" placeholder="Re-enter password" name="password_confirmation" autocomplete="off" v-model="admin_create.password_confirmation">
                                    </div>
                                </div>
                                <!--end::Wrapper-->
                            </div>
                            <!--end::Step 3-->
                            <!--begin::Step 4-->
                            <div class="" data-kt-stepper-element="content">
                                <!--begin::Wrapper-->
                                <div class="w-100">
                                    <!--begin::Heading-->
                                    <div class="pb-8 pb-lg-10">
                                        <!--begin::Title-->
                                        <h2 class="fw-bolder text-dark">You Are Done!</h2>
                                        <!--end::Title-->
                                        <!--begin::Notice-->
                                        <div class="text-muted fw-bold fs-6">The user is created successfully.</div>
                                        <!--end::Notice-->
                                    </div>
                                    <!--end::Heading-->
                                    <!--begin::Body-->
                                    <div class="mb-0">
                                        <!--begin::Text-->
                                        <div class="fs-6 text-gray-600 mb-5">You will be redirected to the login page automatically in a few minutes.
                                            <br> If it is not working, please <a href="login" target="_blank">click here</a> to access the login page.
                                        </div>
                                        <!--end::Text-->
                                    </div>
                                    <!--end::Body-->
                                </div>
                                <!--end::Wrapper-->
                            </div>
                            <!--end::Step 4-->
                            <!--begin::Actions-->
                            <div class="d-flex flex-stack pt-15">
                                <div class="mr-2">
                                    <button type="button" class="btn btn-lg btn-light-primary me-3" data-kt-stepper-action="previous">
                                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr063.svg-->
                                        <span class="svg-icon svg-icon-4 me-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.5" x="6" y="11" width="13" height="2" rx="1" fill="currentColor" />
                                                <path d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z" fill="currentColor" />
                                            </svg>
                                        </span>
                                        <!--end::Svg Icon-->Previous
                                    </button>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-lg btn-primary" data-kt-stepper-action="submit">
                                        <span class="indicator-label">Submit
                                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                                            <span class="svg-icon svg-icon-4 ms-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor" />
                                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor" />
                                                </svg>
                                            </span>
                                            <!--end::Svg Icon-->
                                        </span>
                                        <span class="indicator-progress">Please wait...
                                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                    </button>
                                    <button type="button" class="btn btn-lg btn-primary" data-kt-stepper-action="next">Continue
                                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                                        <span class="svg-icon svg-icon-4 ms-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor" />
                                                <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor" />
                                            </svg>
                                        </span>
                                        <!--end::Svg Icon-->
                                    </button>
                                </div>
                            </div>
                            <!--end::Actions-->
                        </form>
                        <!--end::Form-->
                    </div>
                    <!--end::Wrapper-->
                </div>
                <!--end::Content-->
                <!--begin::Footer-->
                <div class="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
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
        </div>
    </div>

    <script>
        var hostUrl = "assets/";
    </script>
    <script src="{{ URL::asset('assets/lib/vue.js') }}"></script>
    <script src="{{ URL::asset('assets/lib/axios.js') }}"></script>
    <script src="{{ URL::asset('assets/js/script.js') }}"></script>
    <script src="{{ URL::asset('assets/js/scripts.bundle.js') }}"></script>
    <script src="{{ URL::asset('assets/plugins/global/plugins.bundle.js') }}"></script>
    <script src="{{ URL::asset('assets/js/components/Config.js') }}" type="module"></script>
</body>

</html>