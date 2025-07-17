<!DOCTYPE html>
<html lang="en">

<head>
    <base href="">
    <meta charset="utf-8" />
    <meta name="__token" content="{{csrf_token()}}">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="{{ URL::asset('/favicon.ico') }}">
    <!--begin::Fonts-->
    <link rel="stylesheet" href="assets/css/fonts/poppins.css" />
    <link href="assets/plugins/custom/datatables/datatables.bundle.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
</head>

<body>

<div class='card' id='sendster_contact_form_card_1670686210e4da3b7fbbce2345d7772b0674a318d57ja437fb03b0df4s175eikgd67dn2250d3766h6hcjbbba782181v4e'>
            <div class='card-body p-lg-17'>
                <div class='row mb-3'>
                    <div class='col-12 pe-lg-10'>
                        <form action='#' class='form mb-15 fv-plugins-bootstrap5 fv-plugins-framework' method='post' id='sendster_contact_form_1670686210e4da3b7fbbce2345d7772b0674a318d57ja437fb03b0df4s175eikgd67dn2250d3766h6hcjbbba782181v4e'>
                            <input type='hidden' name='form_id' value='e4da3b7fbbce2345d7772b0674a318d5'>
                            <input type='hidden' name='list_id' value='YzgxZTcyOGQ5ZDRjMmY2MzZmMDY3Zjg5Y2MxNDg2MmM='>
                            <input type='hidden' name='redirect_value' value='eyJpc19yZWRpcmVjdCI6ImZhbHNlIn0='>
                            <h1 class='fw-bolder text-dark mb-9 title'>Set First Target</h1>
                            <div class='d-flex flex-column mb-5 fv-row'><label class='fs-5 fw-bold mb-2 required'>Enter your email</label><input type='email' class='form-control form-control-solid' required placeholder='Enter email' name='email' value=''></div><div class='d-flex flex-column mb-5 fv-row'><label class='fs-5 fw-bold mb-2 '>Enter your name</label><input type='text' class='form-control form-control-solid'  placeholder='Enter name' name='name' value=''></div><div class='d-flex flex-column mb-5 fv-row'><label class='fs-5 fw-bold mb-2 '>Enter your address</label><textarea rows='7' class='form-control form-control-lg form-control-solid'  name='address' placeholder='Enter address' value='' autocomplete='off'></textarea></div><div class='d-flex flex-column mb-5 fv-row'><label class='fs-5 fw-bold mb-2 '>Enter your phone number</label><input type='number' class='form-control form-control-solid'  placeholder='Enter phone number' name='phone' value=''></div><div class='d-flex flex-column mb-5 fv-row'><label class='fs-5 fw-bold mb-2 required'>Are you a student?</label><input type='checkbox' class='form-check-input' style='margin-left:1rem;' name='occupation' required value='' /></div>
                            <button type='submit' class='btn btn-primary' name='sendster_submit'>
                                <span class='indicator-label'>Subscribe</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    <script src="assets/lib/axios.js"></script>
    <script src="assets/plugins/global/plugins.bundle.js"></script>
    <script src="assets/js/scripts.bundle.js"></script>
    <script>
        "use strict";
        var MLRSubscriptionForm = (function() {
            return {
                init: function() {
                    (() => {
                        const t = document.querySelector('#sendster_contact_form_card_1670670884e4da3b7fbbce2345d7772b0674a318d54ena02debbdf37k6b10577874bg6dhi38764cjf821dv754j7s3h0ba')
                        const r = t.querySelectorAll(".required");
                        var o, n = {
                            fields: {},
                            plugins: {
                                trigger: new FormValidation.plugins.Trigger,
                                bootstrap: new FormValidation.plugins.Bootstrap5({
                                    rowSelector: ".fv-row",
                                    eleInvalidClass: "",
                                    eleValidClass: ""
                                })
                            }
                        };
                        r.forEach((e => {
                            const t = e.closest(".row").querySelector("input");
                            t && (o = t);
                            const r = e.closest(".row").querySelector("textarea");
                            r && (o = r);
                            const s = e.closest(".row").querySelector("select");
                            s && (o = s);
                            const i = o.getAttribute("name");
                            console.log(e.innerText)
                            n.fields[i] = {
                                validators: {
                                    onlyBlankSpaces: {
                                        message: e.innerText + " is required"
                                    }
                                }
                            }
                        }));
                        var s = FormValidation.formValidation(t, n);
                        const i = t.querySelector('[data-kt-ecommerce-settings-type="submit"]');
                        i.addEventListener("click", (function(e) {
                            e.preventDefault(), s && s.validate().then((function(e) {
                                if ("Valid" == e) {
                                    console.log('Validated')
                                } else {
                                    Swal.fire({
                                        text: "Oops! There are some error(s) detected.",
                                        icon: "error",
                                        buttonsStyling: !1,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    })
                                }
                            }))
                        }))
                    })();
                },
            };
        })();
        KTUtil.onDOMContentLoaded((function() {
            MLRSubscriptionForm.init()
        }));
    </script>
</body>

</html>