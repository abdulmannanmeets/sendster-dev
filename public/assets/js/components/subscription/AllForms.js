export default {
    template: `
    <div class="modal fade" id="mlr_modal_all_leads" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mw-950px">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="fw-bolder">Subscription Leads</h2>
                    <div class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal">
                        <span class="svg-icon svg-icon-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                    <input type="text" data-kt-user-table-filter="search1" class="form-control form-control-solid w-250px ps-14" placeholder="Search Lead">
                    <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped" id="mlr_table_leads">
                        <thead>
                            <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                <th>Name</th>
                                <th>Email</th>
                                <th>List ID</th>
                                <th>Extra fields</th>
                                <th>Created at</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 fw-bold"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <!--begin::Card header-->
        <div class="card-header border-0 pt-6">
            <!--begin::Card title-->
            <div class="card-title">
              <div class="d-flex align-items-center position-relative my-1">
                <span class="svg-icon svg-icon-1 position-absolute ms-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                  </svg>
                </span>
                <input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search form">
              </div>
            </div>
            <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                <button type="button" data-kt-create-model="true" class="btn btn-primary" @click="this.$router.push({name: 'create_form'})">
                    <span class="svg-icon svg-icon-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                            <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                        </svg>
                    </span>
                    Create form
                </button>
                <div class="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
                    <div class="fw-bolder me-5"><span class="me-2" data-kt-user-table-select="selected_count"></span>Selected</div>
                    <button type="button" class="btn btn-danger" data-kt-user-table-select="delete_selected">
                    Delete Selected
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body py-4">
            <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped" id="kt_table_users">
                <thead>
                    <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                        <th class="w-10px pe-2">
                            <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                                <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_users .form-check-input" value="1" />
                            </div>
                        </th>
                        <th class="min-w-125px">Title</th>
                        <th class="min-w-125px">Total leads</th>
                        <th class="min-w-125px">Created at</th>
                        <th class="text-end min-w-100px">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 fw-bold"></tbody>
            </table>
        </div>
    </div>`,
    props: ['profile_details'],
    data() {
        return {
            value: [],
            error_data: [],
            value_message: '',
            all_forms: {
                type: 'get',
                get_type: 'subscription',
                forms: []
            },
            dt: null,
            leadDt: null,
            _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
        }
    },

    mounted() {
        this.getForms();
        this.tableScript();
        this.leadsTable();
        document.getElementById('kt_table_users_processing').removeAttribute("style");
    },

    methods: {
        getForms() {
            let url = "form";
            let method = axios.post;
            method(url, this.all_forms).then((res) => {
                let post_data = res.data;
                this.all_forms.forms = post_data.message;
                this.dt.clear().rows.add(post_data.message).draw();
            }).catch((error) => {
                try {
                    this.error_data = error.response.data.errors;
                } catch (err) { }
            }).finally(() => {
                document.getElementById('kt_table_users_processing').style.display = "none";
            });
        },

        tableScript() {
            "use strict";
            var KTUsersList = function (__this) {
                var e, t, n, r, mom, tb, o = document.getElementById("kt_table_users"), form_appear = document.querySelector('[data-kt-create-model="true"]'),
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
                                        axios.post("form", {
                                            type: "delete",
                                            id: selected_id
                                        }, {
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded',
                                                'X-CSRF-Token': __this._token
                                            }
                                        }).then((res) => {
                                            let post_data = res.data
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
                                text: "Are you sure you want to delete selected forms?",
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
                                    axios.post("form", {
                                        type: "delete",
                                        id: ids
                                    }, {
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                            'X-CSRF-Token': __this._token
                                        }
                                    }).then((res) => {
                                        Swal.fire({
                                            text: "You have deleted all selected forms!.",
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
                                    })
                                }
                            }))
                        }))
                    },
                    handleEditRows = () => {
                        const all_rows = document.querySelectorAll('[data-list-table-filter="edit_row"]');
                        all_rows.forEach(d => {
                            d.addEventListener("click", function (e) {
                                e.preventDefault();

                                const parent = e.target.closest('tr');
                                const list_id = parent.querySelectorAll('td input')[0].value.trim();
                                __this.$router.push({ name: 'create_form', query: { id: list_id } });
                            })
                        })
                    },
                    handleBtnClick = () => {
                        var all_btns = document.querySelectorAll('[mlr-leads-show="true"]');
                        all_btns.forEach(btn => {
                            btn.addEventListener("click", (e) => {
                                e.preventDefault();
                                const parent = e.target.closest('tr');
                                const list_id = parent.querySelectorAll('td input')[0].value.trim();
                                __this.getLeads(list_id);
                            })
                        });
                    };
                const a = () => {
                    const e = o.querySelectorAll('tbody [type="checkbox"]');
                    let c = !1,
                        l = 0;
                    e.forEach((e => {
                        e.checked && (c = !0, l++)
                    })), c ? (r.innerHTML = l, n.classList.remove("d-none"), form_appear.classList.add('d-none')) : (n.classList.add("d-none"), form_appear.classList.remove('d-none'))
                };
                return {
                    init: function () {
                        o && ((__this.dt = tb = e = $(o).DataTable({
                            info: 1,
                            searchDelay: 500,
                            data: __this.all_forms.forms,
                            processing: true,
                            order: [],
                            stripeClasses: ['odd-row', 'even-row'],
                            destroy: true,
                            language: {
                                processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
                            },
                            pageLength: 10,
                            lengthChange: !0,
                            oLanguage: {
                                sEmptyTable: "No forms found!"
                            },
                            columns: [
                                { data: 'id' },
                                { data: 'form_name' },
                                { data: 'total_leads' },
                                { data: 'created_at' },
                                { data: null },
                            ],
                            drawCallback: function () {
                                $('[data-bs-toggle="tooltip"]').tooltip();
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
                                    className: 'text-nowrap',
                                    render: function (data) {
                                        return data;
                                    }
                                },
                                {
                                    targets: 2,
                                    orderable: true,
                                    className: 'text-nowrap',
                                    render: function (data) {
                                        return `<div data-bs-toggle="modal" data-bs-target="#mlr_modal_all_leads" mlr-leads-show="true" role="button">${data}</div>`;
                                    }
                                },
                                {
                                    targets: 3,
                                    orderable: true,
                                    className: 'text-nowrap',
                                    render: function (data) {
                                        return data;
                                    }
                                },
                                {
                                    targets: -1,
                                    orderable: false,
                                    className: 'text-end d-flex align-items-center justify-content-end',
                                    render: function (data) {
                                        return `
                                        <button type="button" class="btn btn-primary btn-active-light-primary btn-sm me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" data-list-table-filter="edit_row" ><i class="bi bi-pencil"></i></button>
                                        <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-kt-users-table-filter="delete_row"><i class="fa fa-trash"></i></button>
                                        `;
                                    }
                                },
                            ]
                        })).on("draw", (function () {
                            l(), c(), a(), handleEditRows(), handleBtnClick();
                        })), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function (t) {
                            e.search(t.target.value).draw()
                        })), c(), handleEditRows(), handleBtnClick());
                    }
                }
            }(this);
            KTUtil.onDOMContentLoaded((function () {
                KTUsersList.init(this)
            }));
        },

        leadsTable() {
            var e, __this = this, o = document.getElementById("mlr_table_leads"), showExtraFields = () => {
                var all_rows = document.querySelectorAll('[show_extra_fields="true"'), all_routes = document.querySelectorAll('[data-sendster-click="route"]');
                all_rows.forEach(row => {
                    row.addEventListener("click", function (e) {
                        e.preventDefault();
                        __this.show_extrafields(JSON.parse(decodeURIComponent(escape(window.atob(row.value)))));
                    });
                });
                all_routes.forEach(route => {
                    route.addEventListener("click", function (e) {
                        e.preventDefault();
                        __this.$router.push({name: 'edit_lists', query: { id: route.getAttribute('value') }});
                    });
                });
            };
            this.leadDt = e = $(o).DataTable({
                info: 1,
                searchDelay: 500,
                data: [],
                processing: true,
                stripeClasses: ['odd-row', 'even-row'],
                destroy: true,
                language: {
                    processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
                },
                pageLength: 10,
                lengthChange: !0,
                oLanguage: {
                    sEmptyTable: "No leads found!"
                },
                drawCallback: function () {
                    $('[data-bs-toggle="tooltip"]').tooltip();
                },
                columns: [
                    { data: 'name' },
                    { data: 'email' },
                    { data: 'list_id' },
                    { data: 'extra_fields' },
                    { data: 'created_at' },
                ],
                columnDefs: [
                    {
                        targets: 0,
                        orderable: true,
                        className: 'text-nowrap',
                        render: function (data) {
                            return data;
                        }
                    },
                    {
                        targets: 1,
                        orderable: true,
                        className: 'text-nowrap',
                        render: function (data) {
                            return data;
                        }
                    },
                    {
                        targets: 2,
                        orderable: true,
                        className: 'text-nowrap',
                        render: function (data, type, row) {
                            return `<div data-sendster-click="route" data-bs-toggle="tooltip" data-bs-placement="top" title="Visi list" value="${data}" role="button">${data}</div>`;
                        }
                    },
                    {
                        targets: 3,
                        orderable: true,
                        className: 'text-nowrap',
                        render: function (data) {
                            data = window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
                            return `<button class="btn unstyled-button text-info" show_extra_fields="true" value="${data}"><i class="fas fa-eye"></i></button>`;
                        }
                    },
                    {
                        targets: -1,
                        orderable: true,
                        className: 'text-nowrap',
                        render: function (data) {
                            return data;
                        }
                    },
                ]
            }).on("draw", (function () {
                showExtraFields();
            })), document.querySelector('[data-kt-user-table-filter="search1"]').addEventListener("keyup", (function (t) {
                e.search(t.target.value).draw()
            })), showExtraFields();
        },

        show_extrafields(extra_fields) {
            let swal_html = ``
            try {
                let custom_fields = typeof extra_fields == "object" ? extra_fields : JSON.parse(extra_fields);
                if (custom_fields.length > 0) {
                    let thead_tr = ``;
                    let tbody_tr = ``;
                    custom_fields.forEach((value, index) => {
                        if (value.property !== "" && value.value !== "") {
                            thead_tr += `<th>${value.property}</th>`
                            tbody_tr += `<td>${value.value}</td>`
                        }
                    })
                    swal_html = `<div class="card-body py-4 p-0 leads_extra_fields"><table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"><thead><tr class="">${thead_tr}</tr></thead><tbody class="text-gray-600 fw-bold"><tr <tr class="text-center text-muted fw-bolder fs-7 text-uppercase gs-0">${tbody_tr}</tr></tbody></table></div>`;
                } else {
                    swal_html = `<div class="table-responsive"><table class="table table-striped"><thead>No data found</thead></table></div>`;
                }
            } catch (err) {
                console.log(err)
                swal_html = `<div class="table-responsive"><table class="table table-striped"><thead>No data found</thead></table></div>`;
            }

            Swal.fire({
                title: 'Custom Data <hr>',
                html: swal_html,
                width: '800px',
                showConfirmButton: false,
                showCancelButton: false,
                showCloseButton: true,
                closeButtonHtml: '<i class="fas fa-times"></i>'
            });
        },

        getLeads(id) {
            this.leadDt.clear();
            document.getElementById("mlr_table_leads_processing").removeAttribute("style");
            axios.post("list", {
                list_type: "get_form_leads",
                form_id: id
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': this._token
                }
            }).then((res) => {
                res = res.data;
                this.leadDt.clear().rows.add(res).draw();
            }).catch((error) => {
                swal_fire("", "error", error.response.data.message)
            }).finally(() => {
                document.getElementById("mlr_table_leads_processing").style.display = "none";
            })
        }
    }
}