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
</head>

<body>
    <div id="sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942" class="modal">
        <div class="modal-content top-animation">
            <div class="modal-header">
                <h2>Form title</h2>
                <span class="close">×</span>
            </div>
            <div class="modal-body">
                <form action="#" class="form" method="post" id="sendster_contact_form_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942">

                    <input type="hidden" name="form_id" value="c4ca4238a0b923820dcc509a6f75849b">
                    <input type="hidden" name="list_id" value="YzgxZTcyOGQ5ZDRjMmY2MzZmMDY3Zjg5Y2MxNDg2MmM=">
                    <input type="hidden" class="redirect_value" value="eyJpc19yZWRpcmVjdCI6ImZhbHNlIn0=">
                    <input type="hidden" class="display_after" value="0">
                    <input type="hidden" class="dont_display" value="0">
                    <div class="mb-6"><label class="form-label mb-3 required">Enter your email</label><input type="email" class="form-control" required="required" placeholder="Enter your email" name="email" value=""></div>
                    <div class="mb-6"><label class="form-label mb-3 ">Enter your name</label><input type="text" class="form-control" placeholder="" name="name" value=""></div>
                    <div class="mb-6">
                        <div class="error-msg d-none">Something went wrong.</div>
                        <div class="success-msg d-none">Something went wrong.</div>
                    </div>
                    <button type="submit" id="sendster_submit" class="btn" name="sendster_submit">
                        <span class="indicator-label">Subscribe</span>
                        <span class="indicator-progress">Please wait...
                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <style>
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .modal-content {
            background-color: #FFFFFF !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .d-none,
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942.d-none {
            display: none !important
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 input,
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 textarea {
            width: -webkit-fill-available !important
        }

        @media (min-width: 1200px) {
            #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .container {
                width: 1170px !important;
            }
        }

        @media (min-width: 992px) {
            #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .container {
                width: 970px !important;
            }
        }

        @media (min-width: 768px) {
            #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .container {
                width: 750px !important;
            }
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .container {
            font-family: Poppins, Helvetica, sans-serif !important;
            padding-right: 15px !important;
            padding-left: 15px !important;
            margin-right: auto !important;
            margin-left: auto !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .form-group {
            margin-bottom: 1rem !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .mb-6 {
            margin-bottom: 1.5rem !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .form-control::placeholder {
            color: #a1a5b7
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .form-control::-moz-placeholder {
            color: #a1a5b7;
            opacity: 1
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .form-control:active,
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .form-control:focus {
            background-color: #eef3f7;
            border-color: #eef3f7;
            color: #5e6278;
            outline: none !important;
            box-shadow: none;
            transition: color .2s ease, background-color .2s ease
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .form-control {
            padding: .525rem 1.5rem;
            font-size: 1.15rem;
            border-radius: 0.625rem;
            display: block;
            width: 100%;
            font-weight: 500;
            line-height: 1.5;
            background-clip: padding-box;
            border: 1px solid #e4e6ef;
            appearance: none;
            background-color: #f5f8fa;
            border-color: #f5f8fa;
            color: #5e6278;
            box-shadow: none;
            transition: color .2s ease, background-color .2s ease;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 label {
            font-size: 1.05rem !important;
            font-weight: 500 !important;
            color: #3f4254 !important;
            display: inline-block !important;
            margin-bottom: 0.5rem !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .text-center {
            text-align: center !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .mb-3 {
            margin-bottom: 0.75rem !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 button,
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 input,
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 select,
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 textarea {
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .indicator-progress {
            display: none
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 [data-kt-indicator=on]>.indicator-progress {
            display: inline-block
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 [data-kt-indicator=on]>.indicator-label {
            display: none
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .required:after {
            content: '*';
            position: relative;
            font-size: inherit;
            color: #f1416c;
            padding-left: .25rem;
            font-weight: 700
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .btn {
            display: inline-block;
            font-weight: 500;
            line-height: 1.5;
            color: #181c32;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            user-select: none;
            background-color: transparent;
            border: 1px solid transparent;
            font-size: 1.1rem;
            border-radius: 0.475rem;
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            border: 0;
            padding: calc(0.75rem + 1px) calc(1.5rem + 1px);
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .title {
            background-color: #FFFFFF !important;
            color: #000000 !important;
            font-size: 10px !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 button.btn {
            background-color: #009ef7 !important;
            color: #FFFFFF !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .info-msg,
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .success-msg,
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .warning-msg,
        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .error-msg {
            margin: 10px 0;
            padding: 10px;
            border-radius: 3px 3px 3px 3px;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .info-msg {
            color: #059;
            background-color: #BEF;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .success-msg {
            color: #270;
            background-color: #DFF2BF;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .warning-msg {
            color: #9F6000;
            background-color: #FEEFB3;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .error-msg {
            color: #D8000C;
            background-color: #FFBABA;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 #sendster_submit:disabled {
            cursor: not-allowed
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .shake {
            animation: shake 0.5s;
        }

        @keyframes shake {
            0% {
                transform: translate(1px, 1px) rotate(0deg);
            }

            10% {
                transform: translate(-1px, -2px) rotate(-1deg);
            }

            20% {
                transform: translate(-3px, 0px) rotate(1deg);
            }

            30% {
                transform: translate(3px, 2px) rotate(0deg);
            }

            40% {
                transform: translate(1px, -1px) rotate(1deg);
            }

            50% {
                transform: translate(-1px, 2px) rotate(-1deg);
            }

            60% {
                transform: translate(-3px, 1px) rotate(0deg);
            }

            70% {
                transform: translate(3px, 1px) rotate(-1deg);
            }

            80% {
                transform: translate(-1px, -1px) rotate(1deg);
            }

            90% {
                transform: translate(1px, 2px) rotate(0deg);
            }

            100% {
                transform: translate(1px, -2px) rotate(-1deg);
            }
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942.modal {
            position: fixed;
            z-index: 1;
            padding-top: 100px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .modal-content {
            font-family: Arial, Helvetica, sans-serif;
            position: relative;
            background-color: #fefefe;
            margin: auto;
            padding: 0;
            border-radius: .475rem !important;
            border: 1px solid #888;
            width: 80%;
            max-width: 800px !important;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .top-animation {
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s
        }

        @-webkit-keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }

            to {
                top: 0;
                opacity: 1
            }
        }

        @keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }

            to {
                top: 0;
                opacity: 1
            }
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .close {
            opacity: 0.5;
            color: black;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .close:hover,
        .close:focus {
            opacity: 1;
            text-decoration: none;
            cursor: pointer;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .modal-header {
            padding: 2px 16px;
            color: black;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eff2f5;
            justify-content: space-between !important;
        }

        #sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942 .modal-body {
            padding: 2px 16px;
            margin: 1.25rem !important;
        }
    </style>

    <script>
        let email, name, mlr_submit_form = document.querySelector("#sendster_contact_form_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942"),
            display_after = mlr_submit_form.querySelector(".display_after").value
        var error_msg = mlr_submit_form.querySelector(".error-msg"),
            success_msg = mlr_submit_form.querySelector(".success-msg"),
            is_redirect = JSON.parse(atob(mlr_submit_form.querySelector(".redirect_value").value)),
            submit_buttom = mlr_submit_form.querySelector("#sendster_submit"),
            form = mlr_submit_form;
        mlr_submit_form.addEventListener("submit", function(e) {
            e.preventDefault();
            var data = new FormData(form),
                req = new XMLHttpRequest();
            submit_buttom.disabled = true;
            submit_buttom.setAttribute("data-kt-indicator", "on");
            req.withCredentials = false;
            req.open("POST", "http://localhost/sendster-dev/api/subscription_form");
            req.onload = function() {
                var mlr_status = req.status;
                if (mlr_status == 200) {
                    var mlr_post_data = JSON.parse(req.responseText);
                    if (mlr_post_data.added) {
                        success_msg.innerHTML = "Successfully subscribed";
                        success_msg.classList.remove("d-none");
                        setTimeout(function() {
                            success_msg.classList.add("d-none")
                        }, 3000);
                        submit_buttom.removeAttribute("data-kt-indicator");
                        submit_buttom.disabled = false;
                        setCookie("mlr_form_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942", 1, 30);
                        if (is_redirect.is_redirect === "false" && is_redirect.url !== "") {
                            window.location.href = is_redirect.url
                        }
                        return;
                    } else {
                        error_msg.innerHTML = mlr_post_data.reason;
                        error_msg.classList.remove("d-none");
                        setTimeout(function() {
                            error_msg.classList.add("d-none");
                        }, 3000);
                        submit_buttom.removeAttribute("data-kt-indicator");
                        submit_buttom.disabled = false;
                        return;
                    }
                }
                error_msg.innerHTML = "Something went wrong";
                error_msg.classList.remove("d-none");
                setTimeout(function() {
                    error_msg.classList.add("d-none");
                }, 3000);
                submit_buttom.disabled = false;
                submit_buttom.removeAttribute("data-kt-indicator");
            };
            req.send(data);
        })
        var modal = document.getElementById("sendster_contact_form_card_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942"),
            setCookie = function(cname, cvalue, exdays) {
                const d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                let expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                modal.querySelector(".dont_display").value==="1" ? modal.classList.add("d-none") : null;
            },
            getCookie = function(cname) {
                let name = cname + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(";");
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == " ") {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },
            checkCookie = function() {
                let user = getCookie("mlr_form_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942");
                let is_display = document.querySelector("#sendster_contact_form_1689695083c4ca4238a0b923820dcc509a6f75849b5bhdfdcfa95a24k8380c0cn90708jvi69abj48g65sc183b396h2942").querySelector(".dont_display").value;
                if (user != "") {
                    is_display==="1" ? null : handlePopupModal();
                    return;
                }
                handlePopupModal();
            },
            handlePopupModal = function() {
                modal.classList.add("d-block");
                var span = modal.getElementsByClassName("close")[0];
                modal.classList.remove("d-none");
                span.onclick = function() {
                    modal.classList.add("d-none");
                    modal.querySelector(".modal-content").classList.add("top-animation");
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.querySelector(".modal-content").classList.remove("top-animation");
                        modal.querySelector(".modal-content").classList.add("shake");
                        setTimeout(function() {
                            modal.querySelector(".modal-content").classList.remove("shake");
                        }, 1500)
                    }
                }
            }
        setTimeout(function() {
            checkCookie();
        }, display_after)
    </script>
</body>

</html>