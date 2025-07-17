export default {
    name: "mail_history",
    template: `
    <div class="row g-5 g-xl-8">
        <div class="col-xl-12">
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
                            <input type="text" data-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search subject">
                        </div>
                    </div>
                    <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                        <div class="d-flex justify-content-end align-items-center d-none" data-table-toolbar="selected">
                            <div class="fw-bolder me-5"><span class="me-2" data-table-select="selected_count"></span>Selected</div>
                            <button type="button" class="btn btn-danger" data-kt-table-select="delete_selected">Delete Selected</button>
                        </div>
                    </div>
                </div>
                <div class="card-body py-4">
                    <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable  table-striped" id="kt_table_all_history">
                        <thead>
                            <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                                <th class="w-10px pe-2">
                                    <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                                        <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_all_history .form-check-input" value="1"/>
                                    </div>
                                </th>
                                <th>Date</th>
                                <th>Subject</th>
                                <th>Sent</th>
                                <th>Opened</th>
                                <th>Unopened</th>
                                <th>Clicked</th>
                                <th>Unsubscribed</th>
                                <th>Bounced</th>
                                <th class="text-end min-w-100px">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 fw-bold">
                        </tbody>
                        <tfoot class="border-top border-dark">
                            <tr class="fw-bolder fs-6">
                                <th colspan="3" class="text-nowrap align-end">Total:</th>
                                <th id="sent_total"></th>
                                <th id="opened_total"></th>
                                <th id="unOpened_total"></th>
                                <th id="clicked_total"></th>
                                <th id="unsubscribe_total"></th>
                                <th id="bounce_total" colspan="2"></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
    data: () => ({
        _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
        data: [],
        dt: null
    }),

    mounted() {
        var queryType = this.$route.query.type;
        if (queryType != "all") {
            var currentRouterName = document.querySelector('.currentRouterName');
            currentRouterName.innerHTML = queryType.charAt(0).toUpperCase() + queryType.slice(1) + " " + currentRouterName.innerHTML;
        }
        this.tableUtil();
    },

    methods: {
        tableUtil() {
            "use strict";

            // Class definition
            var KTDatatablesServerSide = function (__this) {
                // Shared variables
                var table;
                var dt, timer;

                // Private functions
                var initDatatable = function () {
                    __this.dt = dt = $("#kt_table_all_history").DataTable({
                        processing: true,
                        serverSide: true,
                        ajax: {
                            url: 'history',
                            type: 'POST',
                            data: (data) => {
                                let query = __this.$route.query;
                                data.type = query.type ?? "all";
                                data.columnFilter = data.columns[data.order[0].column].data;
                                return data;
                            },
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                xhr.setRequestHeader('X-CSRF-Token', __this._token);
                            },
                            error: function (error) {
                            }
                        },
                        stripeClasses: ['odd-row', 'even-row'],
                        destroy: true,
                        language: {
                            info: 'Showing _START_ to _END_ of _TOTAL_ records',
                            processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
                        },
                        drawCallback: function () {
                            $('[data-bs-toggle="tooltip"]').tooltip();
                            var sentSum = 0;
                            var openedSum = 0;
                            var unOpenedSum = 0;
                            var clickedSum = 0;
                            var unsubscribeSum = 0;
                            var bounceSum = 0;
                            dt.rows({ search: 'applied' }).every(function () {
                                var data = this.data();
                                sentSum += parseInt(data.sent);
                                openedSum += parseInt(data.opened);
                                unOpenedSum += parseInt(data.unopened);
                                clickedSum += parseInt(data.clicked);
                                unsubscribeSum += parseInt(data.unsubscribed);
                                bounceSum += parseInt(data.bounced);
                            });

                            // Update the total count in the footer
                            $('#sent_total').text(sentSum);
                            $('#opened_total').text(openedSum);
                            $('#unOpened_total').text(unOpenedSum);
                            $('#clicked_total').text(clickedSum);
                            $('#unsubscribe_total').text(unsubscribeSum);
                            $('#bounce_total').text(bounceSum);
                        },
                        order: [[0, 'desc']],
                        select: {
                            style: 'multi',
                            selector: 'td:first-child input[type="checkbox"]',
                            className: 'row-selected'
                        },
                        columns: [
                            { data: 'id' },
                            { data: 'created_at' },
                            { data: 'subject' },
                            { data: 'sent' },
                            { data: 'opened' },
                            { data: 'unopened' },
                            { data: 'clicked' },
                            { data: 'unsubscribed' },
                            { data: 'bounced' },
                            { data: 'attempt' },
                        ],
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
                                    var date = new Date(data);
                                    var hours = date.getHours();
                                    var minutes = date.getMinutes();
                                    var ampm = hours >= 12 ? 'PM' : 'AM';
                                    hours = hours % 12;
                                    hours = hours ? hours : 12;
                                    minutes = minutes < 10 ? '0' + minutes : minutes;

                                    const dateFormat = date.getDate() + " " + date.toLocaleString('default', { month: 'short' }) + " " + date.getFullYear() + " " + hours + ":" + minutes + " " + ampm;
                                    return dateFormat;
                                }
                            },
                            {
                                targets: 2,
                                orderable: true,
                                className: 'text-nowrap',
                                render: function (data) {
                                    return data;
                                }
                            },
                            {
                                targets: 4,
                                orderable: true,
                                className: 'text-nowrap',
                                render: function (data) {
                                    return `${data}`;
                                }
                            },
                            {
                                targets: -1,
                                orderable: false,
                                className: 'text-end d-flex align-items-center justify-content-between',
                                render: function (data, type, full) {
                                    return `
                                        <button type="button" class="btn btn-primary btn-active-light-primary btn-sm me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Live sending" value="${data}" data-list-table-filter="delete_row" ><i class="fa fa-eye"></i></button>
                                        <button class="btn btn-danger btn-active-light-danger btn-sm" value="${full.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-list-table-filter="delete_email"><i class="fa fa-trash"></i></button>
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
                        handleLive();
                        handleDeleteEmail();
                        KTMenu.createInstances();
                    });
                }

                // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
                var handleSearchDatatable = function () {
                    const filterSearch = document.querySelector('[data-table-filter="search"]');
                    filterSearch.addEventListener('keyup', function (e) {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            dt.search(e.target.value).draw();
                        });
                    });
                }

                // Delete link

                var handleDeleteEmail = () => {
                    // Select all edit buttons
                    const editButtons = document.querySelectorAll('[data-list-table-filter="delete_email"]');

                    editButtons.forEach(d => {
                        // Delete button on click
                        d.addEventListener('click', function (e) {
                            e.preventDefault();

                            // Select parent row
                            const parent = e.target.closest('tr');
                            const logName = parent.querySelectorAll('td')[2].innerText;

                            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                            Swal.fire({
                                html: "Are you sure you want to delete <b>" + logName + "</b>?",
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
                                    let selected_id = [d.value]
                                    axios.post("history", {
                                        type: "delete",
                                        id: selected_id
                                    }).then((res) => {
                                        res = res.data;
                                        if (res.status) {
                                            Swal.fire({
                                                text: "You have deleted " + logName + "!.",
                                                icon: "success",
                                                buttonsStyling: false,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: {
                                                    confirmButton: "btn fw-bold btn-primary",
                                                }
                                            }).then(function () {
                                                dt.row($(parent)).remove().draw();
                                            });
                                        } else {
                                            swal_fire("", "error", logName + " was not deleted");
                                        }
                                    }).catch((error) => {
                                        swal_fire("", "error", error.response.data.errors);
                                    });
                                }
                            });
                        })
                    });
                }

                var handleLive = () => {
                    const liveButton = document.querySelectorAll('[data-list-table-filter="delete_row"]');

                    liveButton.forEach(d => {
                        // Delete button on click
                        d.addEventListener('click', function (e) {
                            e.preventDefault();
                            const value = this.value;
                            __this.$router.push({
                                name: 'live_sending',
                                query: { qmlr_id: 'check', compose_token: value }
                            })
                        })
                    })
                }

                // Init toggle toolbar
                var initToggleToolbar = function () {
                    // Toggle selected action toolbar
                    // Select all checkboxes
                    const container = document.querySelector('#kt_table_all_history');
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
                            text: "Are you sure you want to delete selected logs?",
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
                                checkboxes.forEach((r) => {
                                    r.checked && (r.value != '1') && ids.push(r.value);
                                })

                                axios.post("dashboard", {
                                    type: "delete",
                                    id: ids,
                                }, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'X-CSRF-Token': __this._token
                                    }
                                }).then((res) => {
                                    res = res.data;
                                    if (res.status) {
                                        Swal.fire({
                                            text: "You have deleted all selected logs!.",
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
                                    } else {
                                        Swal.fire({
                                            text: "Selected logs were not deleted.",
                                            icon: "error",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: {
                                                confirmButton: "btn fw-bold btn-primary",
                                            }
                                        });
                                    }
                                }).catch((error) => {
                                    swal_fire("", "error", error.response.data.errors);
                                })
                            }
                        });
                    });
                }

                // Toggle toolbars
                var toggleToolbars = function () {
                    // Define variables
                    const container = document.querySelector('#kt_table_all_history');
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
                        toolbarSelected.classList.remove('d-none');
                    } else {
                        toolbarSelected.classList.add('d-none');
                    }
                }

                // Public methods
                return {
                    init: function () {
                        initDatatable();
                        handleSearchDatatable();
                        initToggleToolbar();
                        handleLive();
                        handleDeleteEmail();
                    }
                }
            }(this);

            // On document ready
            KTUtil.onDOMContentLoaded(function () {
                KTDatatablesServerSide.init();
            }, this);
        },
    },
}