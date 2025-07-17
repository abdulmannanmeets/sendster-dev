export default Vue.createApp({
    el: '#mlr_forgot_form',
    data() {
        return {
            email: null,
            step: 1,
            otp: null,
            password: null,
            password_confirmation: null,
            _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
            error: null
        }
    },
    mounted() {
        "use strict";
        var MLRForgotGeneral = function (__this) {
            var e, t, i, o, s, r, b, a = [], j = function () {
                return 100 === a.getScore();
            };
            return {
                init: function () {
                    (e = document.querySelector("#kt_modal_create_account")) && new bootstrap.Modal(e), t = document.querySelector("#kt_create_account_stepper"), i = t.querySelector("#mlr_forgot_form"), o = t.querySelector('[data-kt-stepper-action="submit"]'), s = t.querySelector('[data-kt-stepper-action="next"]'), (r = new KTStepper(t)).on("kt.stepper.changed", (function (e) {
                        4 === r.getCurrentStepIndex() ? (o.classList.add("d-none"), s.classList.add("d-none"), setTimeout(function () { location.reload() }, 2000)) : (o.classList.remove("d-inline-block"), o.classList.remove("d-none"), s.classList.remove("d-none"))
                    })), r.on("kt.stepper.next", (function (e) {
                        var t = a[e.getCurrentStepIndex() - 1];
                        t ? t.validate().then((function (t) {
                            if ("Valid" == t) {
                                if (e.getCurrentStepIndex() === 1) {
                                    s.disabled = !0;
                                    s.setAttribute("data-kt-indicator", "on");

                                    axios.post('forgot', { email: __this.email }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-CSRF-Token': __this._token } }).then((res) => {
                                        res = res.data;
                                        if (res.status) {
                                            e.goNext();
                                            KTUtil.scrollTop();
                                            return;
                                        } else {
                                            swal_fire(KTUtil, 'error', res.message);
                                        }
                                    }).catch((error) => {
                                        try {
                                            let err_data = error.response.data.message;
                                            swal_fire(KTUtil, 'error', err_data);
                                        } catch (err) {
                                            swal_fire(KTUtil, 'error', 'Something went wrong! Please try again.');
                                        }
                                    }).finally(() => {
                                        s.removeAttribute("data-kt-indicator");
                                        s.disabled = !1;
                                    });
                                } else if (e.getCurrentStepIndex() == 2) {
                                    s.disabled = 1;
                                    s.setAttribute("data-kt-indicator", "on");

                                    axios.post('forgot', { otp: __this.otp }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-CSRF-Token': __this._token } }).then((res) => {
                                        res = res.data;
                                        if (res.status) {
                                            e.goNext();
                                            KTUtil.scrollTop();
                                            return;
                                        } else {
                                            swal_fire('', 'error', res.message);
                                        }
                                    }).catch((error) => {
                                        try {
                                            let err_data = error.response.data.message;
                                            swal_fire(KTUtil, 'error', err_data);
                                        } catch (err) {
                                            swal_fire(KTUtil, 'error', 'Something went wrong! Please try again.');
                                        }
                                    }).finally(() => {
                                        s.removeAttribute("data-kt-indicator");
                                        s.disabled = !1;
                                    });
                                } else if (e.getCurrentStepIndex() == 3) {
                                    s.disabled = !0
                                    s.setAttribute("data-kt-indicator", "on")

                                    axios.post('forgot', {password: __this.password, password_confirmation: __this.password_confirmation}, {
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                            'X-CSRF-Token': __this._token
                                        }
                                    }).then((res) => {
                                        let data = res.data
                                        if (data.status) {
                                            e.goNext();
                                            KTUtil.scrollTop();
                                            return;
                                        } else {
                                            swal_fire('', 'error', data.message)
                                        }
                                    }).catch((error) => {
                                        try {
                                            let err_data = error.response.data.message
                                            swal_fire(KTUtil, 'error', err_data)
                                        } catch (err) {
                                            swal_fire(KTUtil, 'error', 'Something went wrong! Please try again.')
                                        }
                                    }).finally(() => {
                                        s.removeAttribute("data-kt-indicator")
                                        s.disabled = !1
                                    })
                                } else {
                                    e.goNext();
                                    KTUtil.scrollTop();
                                }
                            } else {
                                swal_fire(KTUtil);
                            }
                        })) : (e.goNext(), KTUtil.scrollTop())
                    })), r.on("kt.stepper.previous", (function (e) {
                        e.goPrevious(), KTUtil.scrollTop()
                    })), a.push(FormValidation.formValidation(i, {
                        fields: {
                            email: {
                                validators: {
                                    emailCheck: {
                                        message: "Email address is required"
                                    },
                                }
                            }
                        },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger,
                            bootstrap: new FormValidation.plugins.Bootstrap5({
                                rowSelector: ".fv-row",
                                eleInvalidClass: "",
                                eleValidClass: ""
                            })
                        }
                    })), a.push(FormValidation.formValidation(i, {
                        fields: {
                            otp: {
                                validators: {
                                    onlyBlankSpaces: {
                                        message: "OTP is required"
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
                    })), a.push(FormValidation.formValidation(i, {
                        fields: {
                            password: {
                                validators: {
                                    passwordCheck: {
                                        message: "The password is required"
                                    },
                                    callback: {
                                        message: "Please enter valid password",
                                        callback: function (e) {
                                            if (e.value.length > 0) return j();
                                        }
                                    }
                                }
                            },
                            "password_confirmation": {
                                validators: {
                                    onlyBlankSpaces: {
                                        message: "The password confirmation is required"
                                    },
                                    identical: {
                                        compare: function () {
                                            return i.querySelector('[name="password"]').value;
                                        },
                                        message: "The password and its confirm are not the same"
                                    }
                                }
                            },
                        },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger({
                                event: {
                                    password: !1
                                }
                            }),
                            bootstrap: new FormValidation.plugins.Bootstrap5({
                                rowSelector: ".fv-row",
                                eleInvalidClass: "",
                                eleValidClass: ""
                            })
                        }
                    })), o.addEventListener("click", (function (e) {
                        a[2].revalidateField('password');
                        a[2].validate().then((function (t) {
                            if ("Valid" == t) {
                                e.preventDefault()
                            } else {
                                swal_fire(KTUtil);
                            }
                        }))
                    })), i.querySelector('input[name="password"]').addEventListener("input", (function () {
                        this.value.length > 0 && a[2].updateFieldStatus("password", "NotValidated")
                    })), b = KTPasswordMeter.getInstance(i.querySelector('[data-kt-password-meter="true"]'))
                }
            }
        }(this);
        KTUtil.onDOMContentLoaded((function () {
            MLRForgotGeneral.init()
        }));
    }
}).mount("#mlr_forgot_form")