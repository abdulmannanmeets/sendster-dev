export default {
    name: "links",
    template: `
    <div class="modal fade" tabindex="-1" id="links_modal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered mw-650px">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{createLink.type}} link</h5>

                    <!--begin::Close-->
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" id="links_modal_close">
                        <span class="svg-icon svg-icon-2x"></span>
                    </div>
                    <!--end::Close-->
                </div>

                <form id="links_modal_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
				    <div class="modal-body py-10 px-lg-17">
				    	<!--begin::Scroll-->
				    	<div class="scroll-y me-n7 pe-7" id="kt_modal_create_api_key_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_create_api_key_header" data-kt-scroll-wrappers="#kt_modal_create_api_key_scroll" data-kt-scroll-offset="300px">
                            <div class="mb-5 fv-row">
                                <label class="required fs-5 fw-bold mb-2">Enter URL</label>
                                <input type="url" class="form-control form-control-solid" placeholder="Enter URL" v-model="createLink.url" name="url" />
                            </div>
                            <div class="mb-5 fv-row">
                                <label class="fs-5 fw-bold mb-2">Enter URL text</label>
                                <input type="text" class="form-control form-control-solid" placeholder="Enter URL text" v-model="createLink.text" name="text" />
                            </div>
                            <div class="mb-5 fv-row" v-if="error.is">
                                <label class="text-center mb-2 text-danger w-100 mb-2" v-html="error.message"></label>
                            </div>
				    	</div>
				    	<!--end::Scroll-->
				    </div>
				    <!--end::Modal body-->
				    <!--begin::Modal footer-->
				    <div class="modal-footer flex-center">
				    	<button type="reset" id="links_modal_cancel" class="btn btn-light me-3">Cancel</button>
				    	<!--begin::Button-->
				    	<button type="submit" id="links_modal_submit" class="btn btn-primary">
				    		<span class="indicator-label">Submit</span>
				    		<span class="indicator-progress">Please wait...
				    		<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
				    	</button>
				    	<!--end::Button-->
				    </div>
				    <!--end::Modal footer-->
                </form>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header align-items-center py-5 gap-2 gap-md-5">
            <div class="card-title">
                <div class="d-flex align-items-center position-relative my-1">
                    <span class="svg-icon svg-icon-1 position-absolute ms-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                            <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                        </svg>
                    </span>
                    <input type="text" data-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search link">
                </div>
            </div>
            <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                <button type="button" class="btn btn-primary" data-modal-name="link_modal" data-table-toolbar="base">
                    <span class="svg-icon svg-icon-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                            <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                        </svg>
                    </span>Create Link
                </button>

                <div class="d-flex justify-content-end align-items-center d-none" data-table-toolbar="selected">
                    <div class="fw-bolder me-5"><span class="me-2" data-table-select="selected_count"></span>Selected</div>
                    <button type="button" class="btn btn-danger" data-kt-table-select="delete_selected">Delete Selected</button>
                </div>
            </div>
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body py-4">
            <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable table-striped" id="kt_table_all_links">
                <thead>
                    <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                        <th class="w-10px pe-2">
                            <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                                <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_all_links .form-check-input" value="1"/>
                            </div>
                        </th>
                        <th>Link</th>
                        <th>Link title</th>
                        <th>Shortcode</th>
                        <th>Visits</th>
                        <th class="min-w-150px">Created at</th>
                        <th class="text-end min-w-100px">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 fw-bold">
                </tbody>
            </table>
        </div>
    </div>
    `,
    props: ['profile_details'],
    data: () => ({
        all_links: [],
        createLink: {
            type: "Create",
            id: 0,
            url: null,
            text: null
        },
        r: null,
        i: null,
        dt: null,
        parent: null,
        error: {
            is: false,
            message: null
        },
        _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
    }),

    mounted() {
        this.utilScript();
        document.getElementById("kt_table_all_links_processing").removeAttribute("style");
        axios.post("links", { type: 'get' }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': this._token
            }
        }).then((res) => {
            let post_data = res.data
            if (post_data.status !== undefined) {
                this.all_links = post_data.data
            }
        }).catch((error) => {
        }).finally(() => {
            this.r = document.querySelector("#links_modal")
            this.i = new bootstrap.Modal(this.r)
            this.modalScript();
            document.getElementById("kt_table_all_links_processing").style.display = "none";
            this.dt.clear().rows.add(this.all_links).draw();
        })
    },

    methods: {
        utilScript() {
            "use strict";

            // Class definition
            var KTDatatablesServerSide = function (__this) {
                // Shared variables
                var table;
                var dt;

                // Private functions
                var initDatatable = function () {
                    __this.dt = dt = $("#kt_table_all_links").DataTable({
                        searchDelay: 500,
                        processing: true,
                        data: __this.all_links,
                        select: {
                            style: 'multi',
                            selector: 'td:first-child input[type="checkbox"]',
                            className: 'row-selected'
                        },
                        language: {
                            processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
                        },
                        columns: [
                            { data: 'id' },
                            { data: 'url' },
                            { data: 'text' },
                            { data: 'shortcode' },
                            { data: 'visits' },
                            { data: 'created_at' },
                            { data: null },
                        ],
                        drawCallback: function () {
                            $('[data-bs-toggle="tooltip"]').tooltip();
                        },
                        createdRow: function (row, data, dataIndex) {
                            row.querySelectorAll("td")[6].classList.add("d-flex", "align-items-center", "justify-content-between")
                        },
                        columnDefs: [
                            {
                                targets: 0,
                                orderable: false,
                                render: function (data) {
                                    return `
                                    <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                                        <input class="form-check-input" type="checkbox" value="${data}" />
                                    </div>`;
                                }
                            },
                            {
                                targets: 1,
                                orderable: true,
                                render: function (data) {
                                    return `
                                    <a href="${data}" target="_blank" >${data}</a>`;
                                }
                            },
                            {
                                targets: 2,
                                className: 'text-nowrap',
                                orderable: true,
                            },
                            {
                                targets: 3,
                                orderable: true,
                                render: function (data) {
                                    return `<div class="badge btn btn-active-color-primary btn-sm btn-outline-light badge badge-light fw-bolder p-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" onclick="copyValue('${btoa(data)}', 1)">${data}</div>`;
                                }
                            },
                            {
                                targets: -1,
                                data: null,
                                orderable: false,
                                className: 'text-end',
                                render: function () {
                                    return `
                                        <button class="btn btn-primary btn-active-light-primary btn-sm me-3" data-list-table-filter="edit_row" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"><i class="bi bi-pencil"></i></button>
                                        <button class="btn btn-danger btn-active-light-danger btn-sm" data-list-table-filter="delete_row" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                                    `;
                                },
                            },
                        ],
                    });

                    table = dt.$;

                    // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
                    dt.on('draw', function () {
                        initToggleToolbar();
                        toggleToolbars();
                        handleDeleteRows();
                        handleEditRows();
                        KTMenu.createInstances();
                    });
                }

                // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
                var handleSearchDatatable = function () {
                    const filterSearch = document.querySelector('[data-table-filter="search"]');
                    filterSearch.addEventListener('keyup', function (e) {
                        dt.search(e.target.value).draw();
                    });
                }

                // Delete link
                var handleDeleteRows = () => {
                    // Select all delete buttons
                    const deleteButtons = document.querySelectorAll('[data-list-table-filter="delete_row"]');

                    deleteButtons.forEach(d => {
                        // Delete button on click
                        d.addEventListener('click', function (e) {
                            e.preventDefault();

                            // Select parent row
                            const parent = e.target.closest('tr');

                            // Get link name
                            const linkName = parent.querySelectorAll('td')[1].innerText;

                            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                            Swal.fire({
                                text: "Are you sure you want to delete " + linkName + "?",
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
                                    let selected_id = [parent.querySelectorAll('td input')[0].value.trim()]
                                    axios.post("links", {
                                        type: "delete",
                                        ids: selected_id
                                    })
                                    // Simulate delete request -- for demo purpose only
                                    Swal.fire({
                                        text: "Deleting " + linkName,
                                        icon: "info",
                                        buttonsStyling: false,
                                        showConfirmButton: false,
                                        timer: 2000
                                    }).then(function () {
                                        Swal.fire({
                                            text: "You have deleted " + linkName + "!.",
                                            icon: "success",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: {
                                                confirmButton: "btn fw-bold btn-primary",
                                            }
                                        }).then(function () {
                                            dt.row($(parent)).remove().draw();
                                        });
                                    });
                                } else if (result.dismiss === 'cancel') {
                                    Swal.fire({
                                        text: linkName + " was not deleted.",
                                        icon: "error",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn fw-bold btn-primary",
                                        }
                                    });
                                }
                            });
                        })
                    });
                }

                var handleEditRows = () => {
                    // Select all edit buttons
                    const editButtons = document.querySelectorAll('[data-list-table-filter="edit_row"]');

                    editButtons.forEach(d => {
                        // Delete button on click
                        d.addEventListener('click', function (e) {
                            e.preventDefault();

                            // Select parent row
                            const parent = e.target.closest('tr');
                            __this.parent = parent

                            // Get link name
                            const allRows = parent.querySelectorAll('td');
                            const linkId = allRows[0].querySelector("input").value.trim();
                            const linkUrl = allRows[1].innerText;
                            const linkText = allRows[2].innerText;
                            __this.createLink = {
                                type: "Update",
                                id: linkId,
                                url: linkUrl,
                                text: linkText
                            }
                            __this.i.show();
                        })
                    });
                }

                // Init toggle toolbar
                var initToggleToolbar = function () {
                    // Toggle selected action toolbar
                    // Select all checkboxes
                    const container = document.querySelector('#kt_table_all_links');
                    const checkboxes = container.querySelectorAll('[type="checkbox"]');

                    // Select elements
                    const deleteSelected = document.querySelector('[data-kt-table-select="delete_selected"]');

                    // Toggle delete selected toolbar
                    checkboxes.forEach(c => {
                        // Checkbox on click event
                        c.addEventListener('click', function () {
                            setTimeout(function () {
                                toggleToolbars();
                            }, 50, c);
                        });
                    });

                    // Deleted selected rows
                    deleteSelected.addEventListener('click', function () {
                        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                        Swal.fire({
                            text: "Are you sure you want to delete selected lists?",
                            icon: "warning",
                            showCancelButton: true,
                            buttonsStyling: false,
                            showLoaderOnConfirm: true,
                            confirmButtonText: "Yes, delete!",
                            cancelButtonText: "No, cancel",
                            customClass: {
                                confirmButton: "btn fw-bold btn-danger",
                                cancelButton: "btn fw-bold btn-active-light-primary"
                            },
                        }).then(function (result) {
                            if (result.value) {
                                let ids = [];
                                let links = [];
                                checkboxes.forEach((r) => {
                                    r.checked && (r.value != '1') && ids.push(r.value) && links.push(r.parentNode.closest("tr").querySelectorAll("td")[1].querySelector("a").href);
                                })

                                axios.post("links", {
                                    type: "delete",
                                    ids: ids,
                                    links: links
                                }, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'X-CSRF-Token': __this._token
                                    }
                                })
                                // Simulate delete request -- for demo purpose only
                                Swal.fire({
                                    text: "Deleting selected lists",
                                    icon: "info",
                                    buttonsStyling: false,
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then(function () {
                                    Swal.fire({
                                        text: "You have deleted all selected lists!.",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn fw-bold btn-primary",
                                        }
                                    }).then(function () {
                                        checkboxes.forEach(c => {
                                            c.checked && dt.row($(c.closest("tbody tr"))).remove().draw()
                                        })
                                    });

                                    // Remove header checked box
                                    const headerCheckbox = container.querySelectorAll('[type="checkbox"]')[0];
                                    headerCheckbox.checked = false;
                                });
                            } else if (result.dismiss === 'cancel') {
                                Swal.fire({
                                    text: "Selected lists were not deleted.",
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn fw-bold btn-primary",
                                    }
                                });
                            }
                        });
                    });
                }

                // Toggle toolbars
                var toggleToolbars = function () {
                    // Define variables
                    const container = document.querySelector('#kt_table_all_links');
                    const toolbarBase = document.querySelector('[data-table-toolbar="base"]');
                    const toolbarSelected = document.querySelector('[data-table-toolbar="selected"]');
                    const selectedCount = document.querySelector('[data-table-select="selected_count"]');

                    // Select refreshed checkbox DOM elements
                    const allCheckboxes = container.querySelectorAll('tbody [type="checkbox"]');

                    // Detect checkboxes state & count
                    let checkedState = false;
                    let count = 0;

                    // Count checked boxes
                    allCheckboxes.forEach(c => {
                        if (c.checked) {
                            checkedState = true;
                            count++;
                        }
                    });

                    // Toggle toolbars
                    if (checkedState) {
                        selectedCount.innerHTML = count;
                        toolbarBase.classList.add('d-none');
                        toolbarSelected.classList.remove('d-none');
                    } else {
                        toolbarBase.classList.remove('d-none');
                        toolbarSelected.classList.add('d-none');
                    }
                }

                // Public methods
                return {
                    init: function () {
                        initDatatable();
                        handleSearchDatatable();
                        initToggleToolbar();
                        handleDeleteRows();
                        handleEditRows();
                    }
                }
            }(this);

            // On document ready
            KTUtil.onDOMContentLoaded(function () {
                KTDatatablesServerSide.init();
            }, this);
        },

        modalScript() {
            "use strict";
            var KTModalCreateApiKey = function (__this) {
                var t, e, n, o, mb, modalClose;
                var confirmBeforeExit = (o) => {
                    o.reset(), __this.i.hide(), __this.createLink = {
                        type: "Create",
                        id: 0,
                        url: null,
                        text: null,
                    }, __this.r = null, __this.parent = null;
                }
                return {
                    init: function () {
                        (mb = document.querySelector('[data-modal-name="link_modal"]'), o = document.querySelector("#links_modal_form"), t = document.getElementById("links_modal_submit"), e = document.getElementById("links_modal_cancel"), modalClose = document.getElementById("links_modal_close"),
                            n = FormValidation.formValidation(o, {
                                fields: {
                                    url: {
                                        validators: {
                                            uri: {
                                                message: "The URL is not valid"
                                            }
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
                            }), t.addEventListener("click", (function (e) {
                                __this.error.is = false
                                __this.error.message = null
                                e.preventDefault(), n && n.validate().then((function (e) {
                                    let form_type = (__this.createLink.type == "Create") ? "create" : "update";
                                    "Valid" == e ? (t.setAttribute("data-kt-indicator", "on"), t.disabled = !0, axios.post("links", { type: form_type, id: __this.createLink.id, url: __this.createLink.url, text: __this.createLink.text }, {
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                            'X-CSRF-Token': __this._token
                                        }
                                    }).then((res) => {
                                        let data = res.data
                                        if (data.status == 1) {
                                            Swal.fire({
                                                text: data.message,
                                                icon: "success",
                                                buttonsStyling: 0,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: {
                                                    confirmButton: "btn btn-primary"
                                                }
                                            }).then((t) => {
                                                __this.i.hide();
                                                if (__this.createLink.type == "Create") {
                                                    addDatatableData(__this.dt, {
                                                        'id': data.id,
                                                        'url': __this.createLink.url,
                                                        'text': __this.createLink.text,
                                                        'shortcode': data.shortcode,
                                                        'visits': data.visits,
                                                        'created_at': data.created_at,
                                                    });
                                                } else {
                                                    var rowIndex = __this.dt.row(__this.parent).index();
                                                    var row = __this.dt.row(rowIndex);
                                                    var rowData = row.data();
                                                    rowData.url = __this.createLink.url;
                                                    rowData.text = __this.createLink.text;
                                                    row.data(rowData);
                                                    row.draw();
                                                }
                                                __this.createLink.url = null, __this.createLink.text = null, __this.createLink.type = "Create", __this.parent = null, __this.createLink.id = 0;
                                            })
                                        } else if (data.status == 2) {
                                            __this.error.is = true
                                            __this.error.message = `The link is already assigned with the shortcode <br>${data.shortcode}`
                                        } else {
                                            swal_fire("", "error", "Something went wrong!")
                                        }
                                    }).catch((error) => {
                                        if (error.response.data.message) {
                                            swal_fire("", "error", error.response.data.message)
                                        } else {
                                            swal_fire("", "error", "Something went wrong!")
                                        }
                                    }).finally(() => {
                                        t.removeAttribute("data-kt-indicator"), t.disabled = !1
                                    })) : Swal.fire({
                                        text: "Please check all required fields",
                                        icon: "error",
                                        buttonsStyling: !1,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    })
                                }))
                            })), e.addEventListener("click", (function (t) {
                                t.preventDefault(), confirmBeforeExit(o)
                            })), mb.addEventListener("click", (function (m) {
                            })), modalClose.addEventListener("click", (function (t) {
                                t.preventDefault(), confirmBeforeExit(o)
                            })), mb.addEventListener("click", (function (m) {
                                __this.i.show()
                            })))
                    }
                }
            }(this);
            KTUtil.onDOMContentLoaded(function () {
                KTModalCreateApiKey.init()
            }, this);
        }
    },
}