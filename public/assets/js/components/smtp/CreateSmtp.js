export default {
    template: `
    <div class="card">
        <div class="card-body p-lg-17">
            <div class="row mb-3">
                <div class="col-md-12 pe-lg-10">
                    <form action="#" class="form mb-15 fv-plugins-bootstrap5 fv-plugins-framework" method="post" id="kt_smtp_form">
                        <h3 class="mb-6">Basic details</h3>
                        <div class="row mb-5">
                            <div class="col-md-12 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="required fw-bold fs-6 mb-2">Enter SMTP title</label>
                                <input type="text" id="smt_title" v-model="create_item.smtp_title" name="smtp_title" placeholder="Enter title" class="form-control form-control-solid" />
                            </div>
                        </div>
                        <div class="row mb-5">
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="required fw-bold fs-6 mb-2">Enter From Name</label>
                                <input type="text" id="from_name" v-model="create_item.basic.from_name" name="from_name" placeholder="Enter from name" class="form-control form-control-solid" />
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="required fw-bold fs-6 mb-2">Enter From Email</label>
                                <input type="email" id="from_email" v-model="create_item.basic.from_email" @change="test_smtp.test_sendfrom=$event.target.value" name="from_email" placeholder="Enter from email" class="form-control form-control-solid" />
                            </div>
                        </div>
                        <div class="row mb-5">
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="required fw-bold fs-6 mb-2">Enter Reply Name</label>
                                <input type="text" id="reply_name" v-model="create_item.basic.reply_name"
                                    name="reply_name" placeholder="Enter reply name"
                                    class="form-control form-control-solid" />
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="required fw-bold fs-6 mb-2">Enter Reply Email</label>
                                <input type="email" id="reply_email" v-model="create_item.basic.reply_email"
                                    name="reply_email" placeholder="Enter reply email"
                                    class="form-control form-control-solid mb-3 mb-lg-0" />
                            </div>
                        </div>

                        <h3 class="mb-3 mt-10">Credentials</h3>
                        <div class="d-flex flex-column mb-5 fv-row">
                            <label class="required fw-bold fs-6 mb-2">Enter host</label>
                            <input type="text" id="host" v-model="create_item.credentials.host" name="host" placeholder="e.g. smtp.gmail.com" class="form-control form-control-solid" />
                        </div>
                        <div class="row mb-5">
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="required fw-bold fs-6 mb-2">Select port</label>
                                <select id="port" v-model="create_item.credentials.port" name="port" class="form-select form-select-solid fw-bolder">
                                    <option value="'587'">587</option>
                                    <option value="'465'">465</option>
                                </select>
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="required fw-bold fs-6 mb-2">Select encryption</label>
                                <select name="encryption" v-model="create_item.credentials.encryption" class="form-select form-select-solid fw-bolder">
                                    <option value="SSL">SSL</option>
                                    <option value="TLS">TLS</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-5">
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="required fw-bold fs-6 mb-2">Enter username</label>
                                <input type="text" id="username" v-model="create_item.credentials.username" name="username" placeholder="Enter username" class="form-control form-control-solid" />
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="required fw-bold fs-6 mb-2">Enter password</label>
                                <input type="password" id="password" v-model="create_item.credentials.password" name="password" placeholder="Enter password" class="form-control form-control-solid" />
                            </div>
                        </div>
                        <div
                            class="d-flex flex-column mb-10 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                            <label class="fw-bold fs-6 mb-2">Limit sendings per day</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text d-inline-block"><input v-model="create_item.credentials.is_sending_limit" type="checkbox" name="is_action"></span>
                                </div>
                                <input type="number" name="limit_sending_value" placeholder="Enter sending limit" v-model="create_item.credentials.limit_sending_value" class="form-control form-control-solid">
                            </div>
                        </div>
                        <div class="row mb-5">
                            <button class="btn btn-primary bg-white text-dark border border-primary" type="button" @click="imap_show_hide(!imap_val)">IMAP Setup</button>
                        </div>
                        <div class="row rounded mt-2 pt-3" id="imap_details" v-if="imap_val"
                            style="background: cadetblue">
                            <div class="col-md-12 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="fw-bold fs-6 mb-2">Enter host</label>
                                <input type="text" id="imap_host" v-model="create_item.imap_setup.imap_host" name="imap_host" placeholder="Enter IMAP hostname" class="form-control form-control-solid" />
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="fw-bold fs-6 mb-2">Enter IMAP port</label>
                                <select id="imap_port" v-model="create_item.imap_setup.imap_port" name="imap_port" class="form-select form-select-solid fw-bolder">
                                    <option value="'143'">143</option>
                                    <option value="'993'">993</option>
                                </select>
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="fw-bold fs-6 mb-2">Enter IMAP username</label>
                                <input type="text" id="imap_username" v-model="create_item.imap_setup.imap_username" name="imap_username" placeholder="Enter IMAP username" class="form-control form-control-solid" />
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="fw-bold fs-6 mb-2">Enter password</label>
                                <input type="password" id="imap_password" v-model="create_item.imap_setup.imap_password" name="imap_password" placeholder="Enter password" class="form-control form-control-solid" />
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="fw-bold fs-6 mb-2">Select encryption type</label>
                                <select name="imap_encryption" v-model="create_item.imap_setup.imap_encryption" class="form-select form-select-solid fw-bolder">
                                    <option value="SSL">SSL</option>
                                    <option value="TLS">TLS</option>
                                    <option value="STARTTLS">STARTTLS</option>
                                </select>
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="fw-bold fs-6 mb-2">Delay beteen connections (minute)</label>
                                <input type="number" id="imap_delay" v-model="create_item.imap_setup.imap_delay" name="imap_delay" placeholder="e.g. SSL, TLS" class="form-control form-control-solid" />
                            </div>
                            <div class="col-md-6 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                                <label class="fw-bold fs-6 mb-2">Folder to check</label>
                                <input type="imap_folder_check" id="imap_folder_check"
                                    v-model="create_item.imap_setup.imap_folder_check" name="imap_folder_check"
                                    placeholder="e.g. INBOX" class="form-control form-control-solid" />
                            </div>
                            <div class="col-md-12 fv-row">
                                <button type="button" id="test_imap_setup" class="btn btn-primary w-25 mt-2 mb-5" @click="test_imap">
                                <span class="indicator-label">Test IMAP</span>
                                <span class="indicator-progress">Please wait...
                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary mt-4" style="margin-right: 3px;"
                            id="kt_smtp_submit_button">
                            <span class="indicator-label">Save</span>
                            <span class="indicator-progress">Please wait...
                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                        <button type="button" class="btn btn-primary mt-4" style="margin-left: 3px;"
                            data-bs-toggle="modal" data-bs-target="#kt_modal_check_smtp"
                            id="kt_smtp_check_submit_button">
                            <span class="indicator-label">Test SMTP</span>
                            <span class="indicator-progress">Please wait...
                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade" id="kt_modal_check_smtp" aria-hidden="true">
            <!--begin::Modal dialog-->
            <div class="modal-dialog modal-dialog-centered mw-650px">
                <!--begin::Modal content-->
                <div class="modal-content">
                    <!--begin::Modal header-->
                    <div class="modal-header" id="kt_modal_check_smtp_header">
                        <!--begin::Modal title-->
                        <h2 class="fw-bolder">Test the SMTP</h2>
                        <!--end::Modal title-->
                        <!--begin::Close-->
                        <div class="btn btn-icon btn-sm btn-active-icon-primary"
                            data-kt-check-smtp-modal-action="close">
                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                            <span class="svg-icon svg-icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                                </svg>
                            </span>
                            <!--end::Svg Icon-->
                        </div>
                        <!--end::Close-->
                    </div>
                    <!--end::Modal header-->
                    <!--begin::Modal body-->
                    <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                        <!--begin::Form-->
                        <form id="kt_modal_check_smtp_form" class="form" action="#">
                            <!--begin::Scroll-->
                            <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_check_smtp_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_check_smtp_header" data-kt-scroll-wrappers="#kt_modal_check_smtp_scroll" data-kt-scroll-offset="300px">
                                <!--begin::Input group-->
                                <div class="fv-row mb-7 fv-plugins-icon-container" v-if="debug_data!==''"
                                    style="background-color: aliceblue; padding: 10px;">
                                    <label class="fw-bold fs-6 mb-2">Debugged data:</label>
                                    <pre style="margin: 0;">{{debug_data}}</pre>
                                </div>
                                <div class="fv-row mb-7 fv-plugins-icon-container">
                                    <label class="required fw-bold fs-6 mb-2">Email title</label>
                                    <input type="text" id="test_title" v-model="test_smtp.test_title" name="test_title" placeholder="Email title" class="form-control form-control-solid mb-3 mb-lg-0" />
                                </div>
                                <div class="fv-row mb-7 fv-plugins-icon-container">
                                    <label class="required fw-bold fs-6 mb-2">Email Body</label>
                                    <input type="text" id="test_body" v-model="test_smtp.test_body" name="test_body" placeholder="Email body" class="form-control form-control-solid mb-3 mb-lg-0" />
                                </div>
                                <div class="fv-row mb-7 fv-plugins-icon-container">
                                    <label class="required fw-bold fs-6 mb-2">Email To</label>
                                    <input type="email" id="test_sendto" v-model="test_smtp.test_sendto" name="test_sendto" placeholder="Email To" class="form-control form-control-solid mb-3 mb-lg-0" />
                                </div>
                                <div class="fv-row mb-7 fv-plugins-icon-container">
                                    <label class="required fw-bold fs-6 mb-2">Email From</label>
                                    <input type="email" id="test_sendfrom" v-model="test_smtp.test_sendfrom" name="test_sendfrom" placeholder="Email From" class="form-control form-control-solid mb-3 mb-lg-0" />
                                </div>

                                <div class="text-center pt-15">
                                    <button type="reset" class="btn btn-light me-3"
                                        data-kt-check-smtp-modal-action="cancel">
                                        Close
                                    </button>
                                    <button type="submit" class="btn btn-primary" data-kt-check-smtp-modal-action="submit">
                                        <span class="indicator-label">Check SMTP</span>
                                        <span class="indicator-progress">Please wait...
                                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
            imap_val: false,
            error_data: [],
            debug_data: '',
            test_smtp: {
                test_title: '',
                test_body: '',
                test_sendto: '',
                test_sendfrom: '',
                debug_type: 'on',
            },
            smtp_type: "create",
            create_item: {
                smtp_title: "",
                smtp_id: 0,
                basic: {
                    from_name: '',
                    from_email: '',
                    reply_name: '',
                    reply_email: '',
                },
                credentials: {
                    host: '',
                    port: "'587'",
                    encryption: 'TLS',
                    username: '',
                    password: '',
                    is_sending_limit: 0,
                    limit_sending_value: '',
                },
                imap_setup: {
                    imap_host: '',
                    imap_port: "'143'",
                    imap_username: '',
                    imap_password: '',
                    imap_encryption: 'TLS',
                    imap_delay: 10,
                    imap_folder_check: 'INBOX',
                },
            },
        }
    },

    mounted() {
        let query = this.$route.query

        if (query.id !== undefined && query.id !== "") {
            this.create_item.smtp_id = query.id
            this.smtp_type = "update"
            let url = 'smtp'
            let form_data = {
                smtp_type: 'get_smtp_setup',
                smtp_id: query.id,
            }

            let method = axios.post;
            method(url, form_data).then((res) => {
                try {
                    let post_data = res.data;
                    if (post_data.status) {
                        post_data = post_data.message
                        this.create_item.smtp_id = post_data.id
                        this.create_item.smtp_title = post_data.title
                        this.create_item.basic = JSON.parse(post_data.basic)
                        this.test_smtp.test_sendfrom = this.create_item.basic.from_email;
                        this.create_item.credentials = JSON.parse(post_data.credentials)
                        this.create_item.imap_setup = JSON.parse(post_data.imap_setup)
                    }
                } catch (err) {
                    Swal.fire({
                        text: "Something went wrong!",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                    })
                }
            }).catch((error) => {
                Swal.fire({
                    text: "Something went wrong!",
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    },
                })
            })
        }
        this.utilScript();
        this.smtpScript();
    },

    unmounted() {
    },

    methods: {
        utilScript() {
            "use strict";
            var KTSmtpSubmit = function (__this) {
                var t, e, o, n;
                return {
                    init: function () {
                        o = document.querySelector("#kt_smtp_form"),
                            t = document.getElementById("kt_smtp_submit_button"),
                            $(o.querySelector('[name="position"]')).on("change", (function () {
                                e.revalidateField("position")
                            })),
                            e = FormValidation.formValidation(o, {
                                fields: {
                                    smtp_title: {
                                        validators: {
                                            onlyBlankSpaces: { message: "Title of the smtp is required" },
                                        },
                                    },
                                    from_name: {
                                        validators: {
                                            onlyBlankSpaces: { message: "From name is required" },
                                        },
                                    },
                                    from_email: {
                                        validators: {
                                            emailCheck: { message: "From email is required" }
                                        },
                                    },
                                    reply_name: {
                                        validators: {
                                            onlyBlankSpaces: { message: "Reply name is required" },
                                        },
                                    },
                                    reply_email: {
                                        validators: {
                                            emailCheck: { message: "Reply email is required" },
                                        },
                                    },
                                    host: {
                                        validators: {
                                            onlyBlankSpaces: { message: "Host name is required" },
                                        },
                                    },
                                    port: {
                                        validators: {
                                            notEmpty: { message: "Port number is required" },
                                        },
                                    },
                                    encryption: {
                                        validators: {
                                            notEmpty: { message: "Encryption is required" },
                                        },
                                    },
                                    username: {
                                        validators: {
                                            notEmpty: { message: "Username is required" },
                                        },
                                    },
                                    password: {
                                        validators: {
                                            notEmpty: {message: "Password is required"}
                                        },
                                    },
                                },
                                plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) }
                            }),
                            t.addEventListener("click", (function (o) {
                                o.preventDefault(),
                                    e && e.validate().then((function (e) {
                                        if ("Valid" == e) {
                                            t.setAttribute("data-kt-indicator", "on");
                                            t.disabled = !0;

                                            let url = 'smtp'
                                            let form_data = {
                                                smtp_type: __this.smtp_type,
                                                post_data: __this.create_item,
                                            }

                                            let method = axios.post;
                                            method(url, form_data).then((res) => {
                                                try {
                                                    let post_data = res.data;
                                                    if (post_data !== undefined || post_data !== '') {
                                                        if (post_data.status == 1) {
                                                            if (__this.smtp_type === "create") {
                                                                let url = new URL(window.location.href);
                                                                __this.create_item.smtp_id = post_data.message.id
                                                                __this.$router.go(-1);
                                                                setSwalMixin("SMTP created successfully", 'success')
                                                            } else {
                                                                setSwalMixin("SMTP updated successfully", 'success')
                                                            }
                                                        }
                                                    }
                                                } catch (err) {
                                                    setSwalMixin("Something went wrong! Please try again", 'error')
                                                }
                                            }).catch((error) => {
                                                setSwalMixin("Something went wrong! Please try again", 'error')
                                            }).finally(() => {
                                                t.removeAttribute("data-kt-indicator")
                                                t.disabled = !1
                                            });
                                        }
                                        else {
                                            Swal.fire({
                                                text: "Please check all required fields",
                                                icon: "error",
                                                buttonsStyling: !1,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: { confirmButton: "btn btn-primary" }
                                            }).then((function (t) {
                                                KTUtil.scrollTop()
                                            }));
                                        }
                                    }));
                            }));
                    }
                }
            }(this);
            KTUtil.onDOMContentLoaded(function () {
                KTSmtpSubmit.init()
            }, this);
        },

        imap_show_hide(val) {
            this.imap_val = val
        },

        smtpScript() {
            "use strict";
            var KTUsersSmtp = (function (__this) {
                var __this = __this;
                const t = document.getElementById("kt_modal_check_smtp"),
                    e = t.querySelector("#kt_modal_check_smtp_form"),
                    n = new bootstrap.Modal(t);
                __this.modal_ref = n
                return {
                    init: function () {
                        (() => {
                            var o = FormValidation.formValidation(e, {
                                fields: {
                                    test_title: {
                                        validators: {
                                            onlyBlankSpaces: { message: "Title of the test smtp is required" },
                                        },
                                    },
                                    test_body: {
                                        validators: {
                                            onlyBlankSpaces: { message: "Body of the Test smtp is required" },
                                        },
                                    },
                                    test_sendto: {
                                        validators: {
                                            emailCheck: { message: "Send to email is required" },
                                        },
                                    },
                                    test_sendfrom: {
                                        validators: {
                                            emailCheck: { message: "Send from is required" },
                                        },
                                    },
                                },
                                plugins: {
                                    trigger: new FormValidation.plugins.Trigger(),
                                    bootstrap: new FormValidation.plugins.Bootstrap5({
                                        rowSelector: ".fv-row",
                                        eleInvalidClass: "",
                                        eleValidClass: "",
                                    }),
                                },
                            });
                            const i = t.querySelector(
                                '[data-kt-check-smtp-modal-action="submit"]'
                            );
                            i.addEventListener("click", (t) => {
                                t.preventDefault(),
                                    o &&
                                    o.validate().then(function (t) {
                                        if ("Valid" == t) {
                                            i.setAttribute("data-kt-indicator", "on");
                                            i.disabled = !0;
                                            __this.debug_data = "";
                                            let url = 'smtp'
                                            let form_data = {
                                                smtp_type: 'send_mail',
                                                sending_type: 'manual',
                                                create_item: __this.create_item,
                                                manual_data: __this.test_smtp
                                            }

                                            let method = axios.post;
                                            method(url, form_data)
                                                .then((res) => {
                                                    let post_data = res.data;
                                                    __this.debug_data = post_data
                                                })
                                                .catch((error) => {
                                                    setSwalMixin("Something went wrong! Please try again", 'error')
                                                }).finally(() => {
                                                    i.removeAttribute("data-kt-indicator")
                                                    i.disabled = !1
                                                });
                                        }
                                    });
                            }),
                                t
                                    .querySelector('[data-kt-check-smtp-modal-action="cancel"]')
                                    .addEventListener("click", (t) => {
                                        t.preventDefault()
                                        e.reset()
                                        n.hide()
                                        document.body.removeChild(
                                            document.querySelector(".modal-backdrop")
                                        )
                                        document.body.style.overflow = "auto";
                                        __this.debug_data = ""
                                        __this.test_smtp = {
                                            test_title: '',
                                            test_body: '',
                                            test_sendto: '',
                                        }
                                    }),
                                t
                                    .querySelector('[data-kt-check-smtp-modal-action="close"]')
                                    .addEventListener("click", (t) => {
                                        t.preventDefault()
                                        e.reset()
                                        n.hide()
                                        document.body.removeChild(
                                            document.querySelector(".modal-backdrop")
                                        )
                                        document.body.style.overflow = "auto";
                                        __this.debug_data = ""
                                        __this.test_smtp = {
                                            test_title: '',
                                            test_body: '',
                                            test_sendto: '',
                                        }
                                    });
                        })();
                    },
                };
            })(this);
            KTUtil.onDOMContentLoaded(function () {
                KTUsersSmtp.init();
            }, this);
        },

        test_imap() {
            const url = "smtp"
            const method = axios.post
            const __this = this
            const data = __this.create_item.imap_setup
            const imap_button = document.querySelector('#test_imap_setup')
            imap_button.setAttribute("data-kt-indicator", "on")
            imap_button.disabled = !0
            data.smtp_type = "test_imap"

            method(url, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': this._token
                }
            }).then((res) => {
                let post_data = res.data
                if (post_data.status) {
                    swal_fire("", "success", "IMAP is valid")
                    return
                }
                swal_fire("", "error", "IMAP is invalid")
            }).catch((error) => {
                swal_fire("", "error", "Something went wrong")
            }).finally(() => {
                imap_button.removeAttribute("data-kt-indicator")
                imap_button.disabled = !1
            })
        }
    },
}