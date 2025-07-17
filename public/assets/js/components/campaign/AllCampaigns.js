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
                    <input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search campaign" />
                </div>
            </div>
            <div class="card-toolbar flex-row-fluid justify-content-end gap-5" data-select2-id="select2-data-123-tkk6">
                <!--begin::Toolbar-->
                <div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">
                    <button type="button" class="btn btn-primary" data-kt-create-model="true" @click="$router.push({name: 'create_campaigns'})">
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg-->
                        <span class="svg-icon svg-icon-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1"
                                    transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                            </svg>
                        </span>Create Campaign
                    </button>
                </div>
                <div class="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
                    <div class="fw-bolder me-5">
                        <span class="me-2" data-kt-user-table-select="selected_count"></span>Selected
                    </div>
                    <button type="button" class="btn btn-danger" data-kt-user-table-select="delete_selected">
                        Delete Selected
                    </button>
                </div>
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
                        <th>Title</th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 fw-bold"></tbody>
            </table>
        </div>
    </div>
    `,
    data: () => ({
        error_data: [],
        value_message: '',
        campaigns: {
            campaign_type: 'get',
            list: []
        },
        interval: null,
        dt: null,
        _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
    }),
    mounted() {
        // this.getAll();
        this.utilScript();
        // document.getElementById('kt_table_users_processing').removeAttribute("style");
    },

    unmounted() {
        clearInterval(this.interval);
    },

    methods: {
        getAll() {
            let url = "campaign";
            let method = axios.post;
            let __this = this;
            method(url, this.campaigns).then((res) => {
                let post_data = res.data;
                if (post_data.status) {
                    this.campaigns.list = post_data.message;
                    this.dt.rows.add(post_data.message).draw();
                }
            }).catch((error) => {
                // this.error_data = error.response.data.errors;
            }).finally(() => {
                var processing = document.getElementById('kt_table_users_processing');
                if (processing) {
                    processing.style.display = "none";
                }
            });
        },

        utilScript() {
            "use strict";
            var timer;
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
                                        axios.post("campaign", {
                                            campaign_type: "delete",
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
                                    } else if (result.dismiss === 'cancel') {
                                        Swal.fire({
                                            text: userName + " was not deleted.",
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
                                text: "Are you sure you want to delete selected campaigns?",
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
                                    axios.post("campaign", {
                                        campaign_type: "delete",
                                        id: ids
                                    }, {
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                            'X-CSRF-Token': __this._token
                                        }
                                    }).then((res) => {
                                        Swal.fire({
                                            text: "You have deleted all selected campaigns!.",
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
                                } else {
                                    "cancel" === t.dismiss && Swal.fire({
                                        text: "Selected campaigns were not deleted.",
                                        icon: "error",
                                        buttonsStyling: !1,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn fw-bold btn-primary"
                                        }
                                    })
                                }
                            }))
                        }))
                    },
                    buttonClick = () => {
                        var all_edit = o.querySelectorAll('[data-list-table-filter="delete_row"]');
                        all_edit.forEach((edit) => {
                            edit.addEventListener("click", function () {
                                var type = this.getAttribute("qmlr_type"), id = this.getAttribute("qmlr_id");
                                if (type == "attempt") {
                                    __this.$router.push({
                                        name: 'live_sending',
                                        query: {
                                            type: type,
                                            token: id
                                        }
                                    });
                                } else if (type == "restart") {
                                    __this.$router.push({
                                        name: 'create_campaigns',
                                        query: {
                                            id: id
                                        }
                                    });
                                }
                            });
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

                var initDatatable = function () {
                    __this.dt = tb = e = $(o).DataTable({
                        processing: true,
                        serverSide: true,
                        stripeClasses: ['odd-row', 'even-row'],
                        destroy: true,
                        ajax: {
                            url: 'campaign',
                            type: 'POST',
                            data: (data) => {
                                data.campaign_type = "get";
                                data.list = [];
                                return data;
                            },
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                xhr.setRequestHeader('X-CSRF-Token', __this._token);
                            },
                            error: function (error) {

                            }
                        },
                        language: {
                            processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
                        },
                        columns: [
                            { data: 'id' },
                            { data: 'title' },
                            { data: 'created_at' },
                            { data: 'other' },
                            { data: 'id' },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                orderable: false,
                                render: (data) => {
                                    return `
                                        <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                                            <input class="form-check-input" type="checkbox" value="${data}">
                                        </div>`;
                                },
                            },
                            {
                                targets: 1,
                                orderable: true,
                                className: 'text-nowrap',
                                render: (data) => {
                                    return data;
                                },
                            },
                            {
                                targets: 2,
                                orderable: true,
                                className: 'text-nowrap',
                                render: (data) => {
                                    return data;
                                },
                            },
                            {
                                targets: 3,
                                orderable: false,
                                className: 'text-nowrap',
                                render: (data, type, row) => {
                                    const other = JSON.parse(data);
                                    const details = row.details;
                                    const composed = parseInt(details.composed), delivered = parseInt(details.delivered), bounces = parseInt(details.bounces);
                                    if (other.is_schedule === "true" || other.is_schedule === true) {
                                        const datetime = new Date(other.schedule_option.datetime).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
                                        if (composed == (delivered + bounces) && composed !== 0) {
                                            return `<span class="text-success">Sent</span>`;
                                        }
                                        return `<span class="text-info">Scheduled (` + datetime + `)</span>`;
                                    }
                                    if (composed == (delivered + bounces)) {
                                        return `<span class="text-success">Sent</span>`;
                                    }
                                    else {
                                        return `Sending (${composed} / ${delivered + bounces})`;
                                    }
                                },
                            },
                            {
                                targets: -1,
                                orderable: false,
                                render: (data, type, row) => {
                                    return `
                                    <button type="button" qmlr_type="restart" qmlr_id="${data}" class="btn btn-primary btn-active-light-primary btn-sm me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Resend" data-list-table-filter="delete_row" ><i class="la la-refresh"></i></button>
                                    <button type="button" qmlr_type="attempt" qmlr_id="${row.details.attempt}" class="btn btn-primary btn-active-light-primary btn-sm me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Live sending" data-list-table-filter="delete_row" ><i class="fas fa-eye"></i></button>
                                    <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-kt-users-table-filter="delete_row"><i class="fa fa-trash"></i></button>`;
                                }
                            }
                        ],
                        order: [[0, "desc"]],
                        pageLength: 10,
                        lengthChange: 1,
                        oLanguage: {
                            sEmptyTable: "No campaigns found!"
                        },
                        drawCallback: function () {
                            $('[data-bs-toggle="tooltip"]').tooltip();
                        },
                        responsive: false,
                        select: {
                            style: 'multi',
                            selector: 'td:first-child input[type="checkbox"]',
                            className: 'row-selected'
                        },
                    });

                    tb.on('draw', function () {
                        l(), c(), a(), buttonClick()
                    })
                }
                return {
                    init: function () {
                        o && (initDatatable(), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function (t) {
                            clearTimeout(timer);
                            timer = setTimeout(() => {
                                e.search(t.target.value).draw();
                            }, 500);
                        })), c());
                    }
                }
            }(this);
            KTUtil.onDOMContentLoaded((function () {
                KTUsersList.init(this)
            }));
        },
    }
}