export default Vue.createApp({
    el: '#kt_sign_in_form',
    data() {
        return {
            create_item: {
                email: "",
                password: "",
                _token: document.querySelector('meta[name="__token"]').getAttribute('content')
            }
        }
    },
    created() {
        addBlankFormValidator();
    },
    mounted() {
        // Read the email and password from cookies and set them to create_item.email and create_item.password
        const emailCookie = document.cookie.split('; ').find(row => row.startsWith('email='));
        if (emailCookie) {
            this.create_item.email = emailCookie.split('=')[1];
        }

        const passwordCookie = document.cookie.split('; ').find(row => row.startsWith('password='));
        if (passwordCookie) {
            this.create_item.password = passwordCookie.split('=')[1];
        }

        "use strict";
        var KTSigninGeneral = function (_this) {
            var t, e, i;
            return {
                init: function () {
                    t = document.querySelector("#kt_sign_in_form"), e = document.querySelector("#kt_sign_in_submit"), i = FormValidation.formValidation(t, {
                        fields: {
                            email: {
                                validators: {
                                    emailCheck: {
                                        message: "Email address is required"
                                    },
                                }
                            },
                            password: {
                                validators: {
                                    passwordCheck: {
                                        message: "The password is required"
                                    }
                                }
                            }
                        },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger(),
                            bootstrap: new FormValidation.plugins.Bootstrap5({
                                rowSelector: ".fv-row",
                                eleInvalidClass: "",
                                eleValidClass: "",
                            }),
                        }
                    }), e.addEventListener("click", (function (n) {
                        n.preventDefault(), i.validate().then((function (i) {
                            if ("Valid" == i) {
                                e.setAttribute("data-kt-indicator", "on")
                                e.disabled = 1;

                                const rememberMe = document.querySelector("#rememberCheckbox").checked;
                                if (rememberMe) {
                                    document.cookie = `email=${_this.create_item.email}; max-age=${14 * 24 * 60 * 60}; path=/`;
                                    document.cookie = `password=${_this.create_item.password}; max-age=${14 * 24 * 60 * 60}; path=/`;
                                }

                                axios.post('login', _this.create_item).then((res) => {
                                    let data = res.data
                                    if (data.status === 1 && data.status !== undefined) {
                                        setSwalMixin("Logged in successfully! Please wait...", "success")
                                        location.reload()
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
                                    e.removeAttribute("data-kt-indicator")
                                    e.disabled = 0
                                })
                            } else {
                                Swal.fire({
                                    text: "Please check all required fields",
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
                }
            }
        }(this);
        KTUtil.onDOMContentLoaded((function () {
            KTSigninGeneral.init()
        }));
    }
}).mount("#kt_sign_in_form")