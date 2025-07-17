export default Vue.createApp({
    el: '#kt_create_account_form',
    data() {
        return {
            create_item: {
                db_name: '',
                db_port: 3306,
                db_password: '',
                db_user_name: '',
                type: 'database_create',
                db_prefix: 'sendster_',
                db_host_name: 'localhost',
            },
            admin_create: {
                name: '',
                email: '',
                password: '',
                type: 'admin_create',
                password_confirmation: '',
            },
            __token: document.querySelector('meta[name="__token"]').getAttribute('content')
        }
    },
    mounted() {
        addBlankFormValidator();
        this.config_vue()
    },
    methods: {
        config_vue: function () {
            "use strict";
            var KTCreateAccount = (function (_this) {
                var e, t, i, o, s, r, b, a = [], j = function () {
                    return 100 === a.getScore();
                };
                let _url = window.location.pathname
                _url = _url.substring(0, _url.lastIndexOf('/'))
                return {
                    init: function () {
                        (e = document.querySelector("#kt_modal_create_account")) && new bootstrap.Modal(e), t = document.querySelector("#kt_create_account_stepper"), i = t.querySelector("#kt_create_account_form"), o = t.querySelector('[data-kt-stepper-action="submit"]'), s = t.querySelector('[data-kt-stepper-action="next"]'), (r = new KTStepper(t)).on("kt.stepper.changed", (function (e) {
                            4 === r.getCurrentStepIndex() ? (o.classList.add("d-none"), s.classList.add("d-none"), setTimeout(function () { location.reload() }, 2000)) : (o.classList.remove("d-inline-block"), o.classList.remove("d-none"), s.classList.remove("d-none"))
                        })), r.on("kt.stepper.next", (function (e) {
                            var t = a[e.getCurrentStepIndex() - 1];
                            t ? t.validate().then((function (t) {
                                if ("Valid" == t) {
                                    if (e.getCurrentStepIndex() === 2) {
                                        s.disabled = !0
                                        s.setAttribute("data-kt-indicator", "on")
                                        if (_this.create_item.db_host_name.trim() === '' || _this.create_item.db_user_name.trim() === '' || _this.create_item.db_name.trim() === '' || _this.create_item.db_prefix.trim() === '') {
                                            return swal_fire(KTUtil, "warning", "Please fill all the mandatory fields.")
                                        }

                                        axios.post(_url + '/install', _this.create_item, {
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded',
                                                'X-CSRF-Token': _this.__token
                                            }
                                        }).then((res) => {
                                            let data = res.data
                                            if (data.status !== undefined && data.status === 1) {
                                                e.goNext()
                                                KTUtil.scrollTop()
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
                                    } else if (e.getCurrentStepIndex() == 3) {
                                        s.disabled = !0
                                        s.setAttribute("data-kt-indicator", "on")
                                        if (_this.admin_create.name.trim() === "", _this.admin_create.email.trim() === "", _this.admin_create.password.trim() === "", _this.admin_create.password_confirmation.trim() === "") {
                                            t.disabled = !1;
                                            t.removeAttribute("data-kt-indicator");
                                            return swal_fire(KTUtil, "warning", "Please fill all the mandatory fields.");
                                        }

                                        axios.post(_url + '/api/install', _this.admin_create, {
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded',
                                            }
                                        }).then((res) => {
                                            let data = res.data
                                            if (data.status) {
                                                e.goNext()
                                                KTUtil.scrollTop()
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
                                        e.goNext()
                                        KTUtil.scrollTop()
                                    }
                                } else {
                                    swal_fire(KTUtil);
                                }
                            })) : (e.goNext(), KTUtil.scrollTop())
                        })), r.on("kt.stepper.previous", (function (e) {
                            e.goPrevious(), KTUtil.scrollTop()
                        })), a.push(FormValidation.formValidation(i, {
                            fields: {
                                php_version: {
                                    validators: {
                                        notEmpty: {
                                            message: "PHP version 8.0.0 or higher is required"
                                        }
                                    }
                                },
                                mysqli: {
                                    validators: {
                                        notEmpty: {
                                            message: "MySQLi extension is required"
                                        }
                                    }
                                },
                                open_ssl: {
                                    validators: {
                                        notEmpty: {
                                            message: "OpenSSL extension is required"
                                        }
                                    }
                                },
                                multibyte_string: {
                                    validators: {
                                        notEmpty: {
                                            message: "Multibyte String extension is required"
                                        }
                                    }
                                },
                                php_pdo: {
                                    validators: {
                                        notEmpty: {
                                            message: "PHP PDO extension is required"
                                        }
                                    }
                                },
                                php_curl: {
                                    validators: {
                                        notEmpty: {
                                            message: "PHP Curl extension is required"
                                        }
                                    }
                                },
                                php_zip: {
                                    validators: {
                                        notEmpty: {
                                            message: "ZipArchive extension is required"
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
                                db_host_name: {
                                    validators: {
                                        onlyBlankSpaces: {
                                            message: "Hostname is required"
                                        }
                                    }
                                },
                                db_user_name: {
                                    validators: {
                                        onlyBlankSpaces: {
                                            message: "Username is required"
                                        }
                                    }
                                },
                                db_name: {
                                    validators: {
                                        onlyBlankSpaces: {
                                            message: "Database name is required"
                                        }
                                    }
                                },
                                db_password: {
                                    validators: {
                                        onlyBlankSpaces: {
                                            message: "Database password is required"
                                        }
                                    }
                                },
                                db_prefix: {
                                    validators: {
                                        onlyBlankSpaces: {
                                            message: "Database prefix is required"
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
                                name: {
                                    validators: {
                                        onlyBlankSpaces: {
                                            message: "Name is required"
                                        }
                                    }
                                },
                                email: {
                                    validators: {
                                        emailCheck: {
                                            message: "Email address is required"
                                        },
                                        emailAddress: {
                                            message: "The value is not a valid email address"
                                        }
                                    }
                                },
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
                                        passwordCheck: {
                                            message: "The password confirmation is required"
                                        },
                                        identical: {
                                            compare: function () {
                                                return i.querySelector('[name="password"]').value
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
                            a[2].revalidateField('password')
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
            })(this);
            KTUtil.onDOMContentLoaded(function () {
                KTCreateAccount.init()
            }, this);
        }
    },
}).mount('#kt_create_account_form');