export default {
    template: `
    <div class="card">
        <div class="card-body p-lg-17">
            <div class="position-relative mb-17">
                <div class="overlay overlay-show">
                    <div class="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-250px"
                        style="background-image:url('assets/images/register.jpg')"></div>
                    <div class="overlay-layer rounded bg-black" style="opacity: 0.4"></div>
                </div>
                <div class="position-absolute text-white mb-8 ms-10 bottom-0 me-10">
                    <h3 class="text-white fs-2qx fw-bolder mb-3 m">Welcome to Sendster</h3>
                    <div class="fs-5 fw-bold">Hi! Welcome to Sendster.
                        You need to verify your purchase to continue.
                        This is a one-time task and will not be repeated on this site.
                        All you need to verify is to put in your email and your order code that you received after your
                        purchase.</div>
                </div>
            </div>
            <div class="d-flex flex-column flex-lg-row">
                <div class="flex-lg-row-fluid me-0">
                    <form action="m-0" class="form mb-15 fv-plugins-bootstrap5 fv-plugins-framework" method="post" id="kt_user_verification_form">
                        <div class="row mb-5">
                            <div class="col-md-12 fv-row fv-plugins-icon-container mb-5">
                                <label class="required fs-5 fw-bold mb-2">Email</label>
                                <input v-model="order_details.email" type="text" class="form-control form-control-solid" placeholder="Your Email" name="email">
                            </div>
                            <div class="col-md-12 fv-row fv-plugins-icon-container mb-5">
                                <label class="required fs-5 fw-bold mb-2">Order Code</label>
                                <input v-model="order_details.license" class="form-control form-control-solid" placeholder="Your order code" name="license">
                            </div>
                            <div class="col-md-12 fv-row fv-plugins-icon-container mb-5 text-center">
                                <button type="submit" class="btn btn-primary" id="kt_careers_submit_button">
                                    <span class="indicator-label">Submit</span>
                                    <span class="indicator-progress">Please wait...
                                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `,
    data: () => ({
        order_details: {
            list_type: 'do_register',
            email: null,
            license: null
        },
        __token: document.querySelector('meta[name="__token"]').getAttribute('content'),
    }),
    props: ['profile_details'],
    created() {
        if(this.profile_details.verified) {
            this.$router.push({name: 'dashboard'});
        }
    },
    mounted() {
        this.utilScripts();
    },
    methods: {
        utilScripts() {
            "use strict";
            var KTUserVerification = function (__this) {
                var t, e, i;
                return {
                    init: function () {
                        i = document.querySelector("#kt_user_verification_form"), t = document.getElementById("kt_careers_submit_button"), e = FormValidation.formValidation(i, {
                            fields: {
                                license: {
                                    validators: {
                                        onlyBlankSpaces: {
                                            message: "License is required"
                                        }
                                    }
                                },
                                email: {
                                    validators: {
                                        emailCheck: {
                                            message: "The value is not a valid email address"
                                        }
                                    }
                                },
                            },
                            plugins: {
                                trigger: new FormValidation.plugins.Trigger,
                                bootstrap: new FormValidation.plugins.Bootstrap5({
                                    rowSelector: ".fv-row",
                                    eleInvalidClass: "",
                                    eleValidClass: ""
                                })
                            }
                        }), t.addEventListener("click", (function (i) {
                            i.preventDefault(), e && e.validate().then((function (e) {
                                if ("Valid" == e) {
                                    let url = "verify_email";
                                    let method = axios.post;
                                    t.setAttribute("data-kt-indicator", "on"), t.disabled = !0;

                                    method(url, __this.order_details, {
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                            'X-CSRF-Token': __this.__token
                                        }
                                    }).then((res) => {
                                        let post_data = res.data;
                                        if (post_data.status) {
                                            swal_fire("", "success", "Successfully validated");
                                            setTimeout(function() {
                                                location.reload();
                                            }, 1500);
                                        } else {
                                            swal_fire("", "error", "Unable to verify you, please re-check your credentials");
                                        }
                                    }).catch((error) => {
                                        swal_fire(KTUtil, "error", error.response.data.errors);
                                    }).finally(() => {
                                        t.removeAttribute("data-kt-indicator"), t.disabled = !1;
                                    });
                                } else {
                                    swal_fire(KTUtil, "error", "Please fill out the required fields.");
                                }
                            }))
                        }))
                    }
                }
            }(this);
            KTUtil.onDOMContentLoaded((function () {
                KTUserVerification.init()
            }), this);
            controlPageLoading(0);
        },
    }
}