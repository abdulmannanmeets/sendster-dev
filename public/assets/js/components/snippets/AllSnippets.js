export default {
    template: `
    <div class="card">
        <!--begin::Card header-->
        <div class="card-header border-0 pt-6">
            <!--begin::Card title-->
            <div class="card-title">
                <!--begin::Search-->
                <div class="d-flex align-items-center position-relative my-1">
                    <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
                    <span class="svg-icon svg-icon-1 position-absolute ms-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1"
                                transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
                            <path
                                d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                                fill="currentColor" />
                        </svg>
                    </span>
                    <!--end::Svg Icon-->
                    <input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search snippet" />
                </div>
                <!--end::Search-->
            </div>
            <!--begin::Card title-->
            <!--begin::Card toolbar-->
            <div class="card-toolbar">
                <!--begin::Toolbar-->
                <div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">
                    <!--begin::Add user-->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_user">
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg-->
                        <span class="svg-icon svg-icon-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1"
                                    transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                            </svg>
                        </span>
                        <!--end::Svg Icon-->Create Snippet
                    </button>
                    <!--end::Add user-->
                </div>
                <!--end::Toolbar-->
                <!--begin::Group actions-->
                <div class="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
                    <div class="fw-bolder me-5">
                        <span class="me-2" data-kt-user-table-select="selected_count"></span>Selected
                    </div>
                    <button type="button" class="btn btn-danger" data-kt-user-table-select="delete_selected">
                        Delete Selected
                    </button>
                </div>
                <!--end::Group actions-->
                <div class="modal fade" id="kt_modal_add_user" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                    <!--begin::Modal dialog-->
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                        <!--begin::Modal content-->
                        <div class="modal-content modal-rounded">
                            <!--begin::Modal header-->
                            <div class="modal-header" id="kt_modal_add_user_header">
                                <!--begin::Modal title-->
                                <h2 class="fw-bolder">{{ create_item.snippet_head }} Snippets</h2>
                                <!--end::Modal title-->
                                <!--begin::Close-->
                                <div class="btn btn-icon btn-sm btn-active-icon-primary"
                                    data-kt-users-modal-action="close">
                                    <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                                    <span class="svg-icon svg-icon-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none">
                                            <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1"
                                                transform="rotate(-45 6 17.3137)" fill="currentColor" />
                                            <rect x="7.41422" y="6" width="16" height="2" rx="1"
                                                transform="rotate(45 7.41422 6)" fill="currentColor" />
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
                                <form id="kt_modal_add_user_form" class="form" action="#">
                                    <!--begin::Scroll-->
                                    <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                                        <!--begin::Input group-->
                                        <div class="fv-row mb-7 fv-plugins-icon-container">
                                            <!--begin::Label-->
                                            <label class="required fw-bold fs-6 mb-2">Enter snippet title</label>
                                            <!--end::Label-->
                                            <!--begin::Input-->
                                            <input type="text" id="snippet_title" v-model="create_item.snippet_title" name="snippet_title" placeholder="Enter title" class="form-control form-control-solid mb-3 mb-lg-0" />
                                            <!--end::Input-->
                                        </div>
                                        <!--end::Input group-->
                                        <!--begin::Input group-->
                                        <div class="fv-row mb-7 fv-plugins-icon-container">
                                            <label class="fw-bold fs-6 mb-2">Enter snippet content</label>
                                            <textarea v-tinymce-editor="create_item.snippet_content" id="email_body_1" name="email_body_1" v-html="create_item.snippet_content" v-model="create_item.snippet_content" placeholder="Enter snippet content" class="form-control form-control-solid mb-3 mb-lg-0" rows="7"></textarea>
                                        </div>
                                        <!--end::Input group-->
                                    </div>
                                    <!--end::Scroll-->
                                    <!--begin::Actions-->
                                    <div class="text-center pt-15">
                                        <button type="reset" class="btn btn-light me-3" data-kt-users-modal-action="cancel">Close</button>
                                        <button type="submit" class="btn btn-primary"
                                            data-kt-users-modal-action="submit">
                                            <span class="indicator-label">Submit</span>
                                            <span class="indicator-progress">Please wait...
                                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                            </span>
                                        </button>
                                    </div>
                                    <!--end::Actions-->
                                </form>
                                <!--end::Form-->
                            </div>
                            <!--end::Modal body-->
                        </div>
                        <!--end::Modal content-->
                    </div>
                    <!--end::Modal dialog-->
                </div>
                <!--end::Modal - Add task-->
            </div>
            <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body py-4">
            <!--begin::Table-->
            <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped" id="kt_table_users">
                <!--begin::Table head-->
                <thead>
                    <!--begin::Table row-->
                    <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                        <th class="w-10px pe-2">
                            <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                                <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_users .form-check-input" value="1" />
                            </div>
                        </th>
                        <th class="min-w-125px">Title</th>
                        <th class="min-w-125px">Shortcode</th>
                        <th class="min-w-125px">Created at</th>
                        <th class="text-end min-w-100px">Actions</th>
                    </tr>
                    <!--end::Table row-->
                </thead>
                <!--end::Table head-->
                <!--begin::Table body-->
                <tbody class="text-gray-600 fw-bold"></tbody>
                <!--end::Table body-->
            </table>
            <!--end::Table-->
        </div>
        <!--end::Card body-->
    </div>
    `,
    data() {
        return {
            error_data: [],
            snippet_details: {
                data: {},
                index: 0
            },
            value_message: '',
            all_snippets: {
                snippet_type: 'get',
                snippets: []
            },
            create_item: {
                snippet_type: "create",
                snippet_head: "Create",
                snippet_title: "",
                snippet_id: 0,
                snippet_content: "",
            },
            dt: null,
            _token: document.querySelector('meta[name="__token"]').getAttribute('content')
        }
    },

    created() {
        let __this = this;
        if (!this.app.directive("tinymce-editor")) {
            this.app.directive("tinymce-editor", (el, binding) => {
                setTimeout(() => {
                    try {
                        tinymce.get("email_body_1").on('keyup', function (e) {
                            __this.create_item.snippet_content = this.getContent();
                        });
                    } catch (err) { }
                }, 10);
            });
        }
    },

    unmounted() {
        loadAndRemoveTinyEditorAssets(false);
    },

    mounted() {
        this.getsnippets();
        this.utilScript();
        this.tableScript();
        loadAndRemoveTinyEditorAssets(true, "#email_body_1", false);
        document.getElementById("kt_table_users_processing").removeAttribute("style");
    },

    methods: {
        getsnippets() {
            let url = "snippet";
            let method = axios.post;
            let __this = this
            method(url, __this.all_snippets).then((res) => {
                let post_data = res.data;
                __this.all_snippets.snippets = post_data.message;
                __this.dt.clear().rows.add(post_data.message).draw();
            }).catch((error) => {
                try {
                    __this.error_data = error.response.data.errors;
                } catch (err) { }
            }).finally(() => {
                document.getElementById("kt_table_users_processing").style.display = "none";
                let modal_button = document.querySelector('[data-bs-target="#kt_modal_add_user"]')
                modal_button.addEventListener("click", () => {
                    __this.create_item = {
                        snippet_type: "create",
                        snippet_head: "Create",
                        snippet_title: "",
                        snippet_id: 0,
                        snippet_content: "",
                    }
                    __this.snippet_details = {
                        data: {},
                        index: 0
                    }
                });
            });
        },

        utilScript() {
            "use strict";
            var KTUsersAddUser = (function (__this) {
                var __this = __this;
                const t = document.getElementById("kt_modal_add_user"),
                    e = t.querySelector("#kt_modal_add_user_form"),
                    n = new bootstrap.Modal(t);
                return {
                    init: function () {
                        (() => {
                            var o = FormValidation.formValidation(e, {
                                fields: {
                                    snippet_title: {
                                        validators: {
                                            onlyBlankSpaces: { message: "Title of the snippet is required" },
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
                                '[data-kt-users-modal-action="submit"]'
                            );
                            i.addEventListener("click", (t) => {
                                t.preventDefault(),
                                    o &&
                                    o.validate().then(function (t) {
                                        if ("Valid" == t) {
                                            i.setAttribute("data-kt-indicator", "on");
                                            i.disabled = !0;
                                            let url = "snippet";
                                            let method = axios.post;
                                            method(url, __this.create_item)
                                                .then((res) => {
                                                    let post_data = res.data;
                                                    let status = post_data.status
                                                    __this.value_message = post_data.value_message

                                                    if (status) {
                                                        Swal.fire({
                                                            text: post_data.message,
                                                            icon: "success",
                                                            buttonsStyling: !1,
                                                            confirmButtonText: "Ok, got it!",
                                                            customClass: {
                                                                confirmButton: "btn btn-primary",
                                                            },
                                                        }).then(function (t) {
                                                            if (__this.create_item.snippet_type == "create") {
                                                                let json_message = __this.value_message;
                                                                __this.all_snippets.snippets.unshift({
                                                                    id: json_message.id,
                                                                    content: __this.create_item.snippet_content,
                                                                    title: __this.create_item.snippet_title,
                                                                    created_at: json_message.created_at,
                                                                });
                                                            } else {
                                                                __this.all_snippets.snippets[__this.snippet_details.index].title = __this.create_item.snippet_title
                                                                __this.all_snippets.snippets[__this.snippet_details.index].content = __this.create_item.snippet_content
                                                            }

                                                            __this.snippet_details = {
                                                                data: {},
                                                                index: 0
                                                            }

                                                            __this.create_item.snippet_id = 0;
                                                            __this.create_item.snippet_head = "Create";
                                                            __this.create_item.snippet_title = "";
                                                            __this.create_item.snippet_type = "create";
                                                            __this.create_item.snippet_content = "";
                                                            tinymce.get("email_body_1").setContent("");

                                                            t.isConfirmed && n.hide();
                                                            document.body.removeChild(
                                                                document.querySelector(".modal-backdrop")
                                                            );

                                                            __this.dt.clear().rows.add(__this.all_snippets.snippets).draw();
                                                        })
                                                    }
                                                })
                                                .catch((error) => {
                                                    __this.error_data = error.response.data.errors;
                                                    __this.value_message = ""
                                                    __this.snippet_details = {
                                                        data: {},
                                                        index: 0
                                                    }

                                                    Swal.fire({
                                                        text: "Something went wrong!",
                                                        icon: "error",
                                                        buttonsStyling: !1,
                                                        confirmButtonText: "Ok, got it!",
                                                        customClass: {
                                                            confirmButton: "btn btn-primary",
                                                        },
                                                    })
                                                }).finally(() => {
                                                    i.removeAttribute("data-kt-indicator")
                                                    i.disabled = !1
                                                });
                                        } else {
                                            Swal.fire({
                                                text: "Please check all required fields",
                                                icon: "error",
                                                buttonsStyling: !1,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: { confirmButton: "btn btn-primary" },
                                            });
                                        }
                                    });
                            }),
                                t.querySelector('[data-kt-users-modal-action="cancel"]').addEventListener("click", (t) => {
                                    t.preventDefault(),
                                        __this.create_item.snippet_id = 0,
                                        __this.create_item.snippet_head = "Create",
                                        __this.create_item.snippet_title = "",
                                        __this.create_item.snippet_type = "create",
                                        __this.create_item.snippet_content = "",
                                        e.reset(),
                                        n.hide(),
                                        document.body.removeChild(
                                            document.querySelector(".modal-backdrop")
                                        );
                                    __this.snippet_details = {
                                        data: {},
                                        index: 0
                                    };
                                }), t.querySelector('[data-kt-users-modal-action="close"]').addEventListener("click", (t) => {
                                    t.preventDefault(),
                                        __this.create_item.snippet_id = 0,
                                        __this.create_item.snippet_head = "Create",
                                        __this.create_item.snippet_title = "",
                                        __this.create_item.snippet_type = "create",
                                        __this.create_item.snippet_content = "",
                                        e.reset(), n.hide(), document.body.removeChild(
                                            document.querySelector(".modal-backdrop")
                                        ),
                                        __this.snippet_details = {
                                            data: {},
                                            index: 0
                                        };
                                });
                        })();
                    },
                };
            })(this);
            KTUtil.onDOMContentLoaded(function () {
                KTUsersAddUser.init();
            }, this);
        },

        tableScript() {
            "use strict";
            var KTUsersList = function (__this) {
                var e, t, n, r, tb, mom, o = document.getElementById("kt_table_users"), form_appear = document.querySelector('[data-bs-target="#kt_modal_add_user"]'),
                    c = () => {
                        const deleteButtons = document.querySelectorAll('[data-kt-users-table-filter="delete_row"]');
                        deleteButtons.forEach(d => {
                            // Delete button on click
                            d.addEventListener('click', function (e) {
                                e.preventDefault();
                                // Select parent row
                                const parent = e.target.closest('tr');
                                // Get customer name
                                const userName = parent.querySelectorAll('td')[1].innerText;

                                Swal.fire({
                                    text: "Are you sure you want to delete " + userName + "?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    buttonsStyling: false,
                                    confirmButtonText: "Yes, delete!",
                                    cancelButtonText: "No, cancel",
                                    customClass: {
                                        confirmButton: "btn fw-bold btn-danger",
                                        cancelButton: "btn fw-bold btn-active-light-primary"
                                    }
                                }).then(function (result) {
                                    if (result.value) {
                                        // delete row data from server and re-draw datatable
                                        let selected_id = [parent.querySelectorAll('td input')[0].value.trim()]
                                        axios.post("snippet", {
                                            snippet_type: "delete",
                                            id: selected_id
                                        }, {
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded',
                                                'X-CSRF-Token': __this._token
                                            }
                                        }).then((res) => {
                                            let post_data = res.data;
                                            if (post_data.status) {
                                                Swal.fire({
                                                    text: "You have deleted " + userName + "!.",
                                                    icon: "success",
                                                    buttonsStyling: false,
                                                    confirmButtonText: "Ok, got it!",
                                                    customClass: {
                                                        confirmButton: "btn fw-bold btn-primary",
                                                    }
                                                }).then(function () {
                                                    tb.row($(parent)).remove().draw();
                                                });
                                            } else {
                                                swal_fire("", "error", userName + " was not deleted")
                                            }
                                        })
                                    }
                                });
                            })
                        });
                    },
                    l = () => {
                        const c = o.querySelectorAll('[type="checkbox"]'), s = document.querySelector('[data-kt-user-table-select="delete_selected"]');
                        n = document.querySelector('[data-kt-user-table-toolbar="selected"]'), r = document.querySelector('[data-kt-user-table-select="selected_count"]');
                        c.forEach((e => {
                            e.addEventListener("click", (function () {
                                setTimeout((function () {
                                    a()
                                }), 50)
                            }))
                        })), s.addEventListener("click", (function () {
                            Swal.fire({
                                text: "Are you sure you want to delete selected snippets?",
                                icon: "warning",
                                showCancelButton: !0,
                                buttonsStyling: !1,
                                confirmButtonText: "Yes, delete!",
                                cancelButtonText: "No, cancel",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-danger",
                                    cancelButton: "btn fw-bold btn-active-light-primary"
                                }
                            }).then((function (t) {
                                if (t.value) {
                                    let ids = []
                                    c.forEach((t => {
                                        t.checked && ids.push(t.value)
                                    }));
                                    if (ids.indexOf('1') > -1) {
                                        ids.splice(ids.indexOf('1'), 1)
                                    }
                                    axios.post("snippet", {
                                        snippet_type: "delete",
                                        id: ids
                                    }, {
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                            'X-CSRF-Token': __this._token
                                        }
                                    }).then((res) => {
                                        res = res.data;

                                        if (res.status) {
                                            Swal.fire({
                                                text: "You have deleted all selected snippets!.",
                                                icon: "success",
                                                buttonsStyling: !1,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: {
                                                    confirmButton: "btn fw-bold btn-primary"
                                                }
                                            }).then((function () {
                                                c.forEach((t => {
                                                    t.checked && e.row($(t.closest("tbody tr"))).remove().draw()
                                                }));
                                                o.querySelectorAll('[type="checkbox"]')[0].checked = !1
                                            })).then((function () {
                                                a(), l()
                                            }))
                                        } else {
                                            swal_fire("", "error", "Unable to delete the selected snippets!");
                                        }
                                    })
                                }
                            }))
                        }))
                    },
                    a = () => {
                        const e = o.querySelectorAll('tbody [type="checkbox"]');
                        let c = !1,
                            l = 0;
                        e.forEach((e => {
                            e.checked && (c = !0, l++)
                        })), c ? (r.innerHTML = l, n.classList.remove("d-none"), form_appear.classList.add('d-none')) : (n.classList.add("d-none"), form_appear.classList.remove('d-none'))
                    }, getIndex = () => {
                        let editButton = document.querySelectorAll('[data-snippet-edit-button="true"]')
                        editButton.forEach(d => {
                            d.addEventListener("click", function (e) {
                                e.preventDefault();
                                const parent = e.target.closest('tr');
                                const id = parent.querySelector('td div input[type="checkbox"]').value;
                                __this.snippet_details = __this.getIndex(id);
                                __this.create_item = {
                                    snippet_type: "edit",
                                    snippet_title: __this.snippet_details.data.title,
                                    snippet_content: __this.snippet_details.data.content,
                                    snippet_head: "Edit",
                                    snippet_id: __this.snippet_details.data.id
                                }
                                if (__this.create_item.snippet_content) {
                                    tinymce.get("email_body_1").setContent(__this.create_item.snippet_content)
                                }
                            })
                        })
                    };
                return {
                    init: function () {
                        o && ((__this.dt = tb = e = $(o).DataTable({
                            info: 1,
                            order: [],
                            searchDelay: 500,
                            processing: true,
                            data: __this.all_snippets.snippets,
                            pageLength: 10,
                            lengthChange: 1,
                            language: {
                                processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
                            },
                            oLanguage: {
                                sEmptyTable: "No snippets found!"
                            },
                            columns: [
                                { data: 'id' },
                                { data: 'title' },
                                { data: 'id' },
                                { data: 'created_at' },
                                { data: null },
                            ],
                            drawCallback: function () {
                                $('[data-bs-toggle="tooltip"]').tooltip();
                                KTUtil.each(document.querySelectorAll('#kt_table_users_wrapper [data-action="copy"]'), (function (e) {
                                    new ClipboardJS(e, {
                                        target: e,
                                        text: function () {
                                            return e.innerHTML
                                        }
                                    }).on("success", (function (t) {
                                        var backValue = e.innerHTML
                                        e.setAttribute("data-bs-original-title", "Copied successfully")
                                        e.innerHTML = "Copied successfully", e.classList.add("text-success")
                                        setTimeout((function () {
                                            e.setAttribute("data-bs-original-title", "Click to copy")
                                            e.classList.remove("text-success"), e.innerHTML = backValue
                                        }), 3e3)
                                    }))
                                }))
                            },
                            createdRow: function (row, data, dataIndex) {
                                row.querySelectorAll("td")[4].classList.add("d-flex", "align-items-center", "justify-content-end")
                            },
                            columnDefs: [
                                {
                                    targets: 0,
                                    orderable: !1,
                                    render: function (data) {
                                        return `<div class="form-check form-check-sm form-check-custom form-check-solid ms-5"><input class="form-check-input" type="checkbox" value="${data}" /></div>`;
                                    }
                                },
                                {
                                    targets: 1,
                                    orderable: 1,
                                    render: function (data) {
                                        return data;
                                    }
                                },
                                {
                                    targets: 2,
                                    orderable: 1,
                                    render: function (data) {
                                        return `<div class="badge btn btn-active-color-primary btn-sm btn-outline-light badge badge-light fw-bolder p-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action="copy">[snippet ${data}]</div>`;
                                    }
                                },
                                {
                                    targets: 3,
                                    orderable: 1,
                                    render: function (data) {
                                        return data;
                                    }
                                },
                                {
                                    targets: -1,
                                    orderable: 0,
                                    data: null,
                                    class: 'text-end',
                                    render: function () {
                                        return `<button type="button" class="btn btn-primary btn-active-light-primary btn-sm me-3" data-bs-toggle="modal" data-bs-target="#kt_modal_add_user" data-snippet-edit-button="true"><i class="bi bi-pencil" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" data-list-table-filter="delete_row"></i></button>
                                        <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-kt-users-table-filter="delete_row"><i class="fa fa-trash"></i></button>`;
                                    }
                                }
                            ]
                        })).on("draw", (function () {
                            l(), c(), a(), getIndex();
                        })), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function (t) {
                            e.search(t.target.value).draw()
                        })), c())
                    }
                }
            }(this);
            KTUtil.onDOMContentLoaded((function () {
                KTUsersList.init(this)
            }));
        },

        getIndex(id) {
            let snippet_value = [];
            for (var i = 0; i < Object.keys(this.all_snippets.snippets).length; i++) {
                if (this.all_snippets.snippets[i].id == id) {
                    snippet_value['data'] = this.all_snippets.snippets[i];
                    snippet_value['index'] = i;
                }
            }
            return snippet_value;
        }
    }
}