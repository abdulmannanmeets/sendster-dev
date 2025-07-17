export default {
    name: "error_log",
    template: `
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
                    <input type="text" data-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search logs">
                </div>
            </div>
            <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                <button type="button" class="btn btn-danger" data-clear-log="all" data-table-toolbar="base">Clear all logs</button>

                <div class="d-flex justify-content-end align-items-center d-none" data-table-toolbar="selected">
                    <div class="fw-bolder me-5"><span class="me-2" data-table-select="selected_count"></span>Selected</div>
                    <button type="button" class="btn btn-danger" data-kt-table-select="delete_selected">Delete Selected</button>
                </div>
            </div>
        </div>
        <div class="card-body py-4">
            <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable table-striped" id="kt_table_all_logs">
                <thead>
                    <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                        <th class="w-10px pe-2">
                            <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                                <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_all_logs .form-check-input" value="1"/>
                            </div>
                        </th>
                        <th>Email subject</th>
                        <th>Campaign</th>
                        <th>Email</th>
                        <th>List name</th>
                        <th>Error details</th>
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
    data: () => ({
        _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
        data: [],
        dt: null
    }),
    mounted() {
        this.tableUtil();
        // var processing = document.getElementById('kt_table_all_logs_processing');
        // if (processing) {
        //     processing.style.display = removeAttribute("style");
        // }
    },
    methods: {
        tableUtil() {
            "use strict";

            // Class definition
            var KTDatatablesServerSide = function (__this) {
                // Shared variables
                var table;
                var dt;
                var timer;

                // Private functions
                var initDatatable = function () {
                    __this.dt = dt = $("#kt_table_all_logs").DataTable({
                        searchDelay: 500,
                        processing: true,
                        destroy: true,
                        serverSide: true,
                        ajax: {
                            url: 'error',
                            type: 'POST',
                            data: (data) => {
                                data.type = "get";
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
                        language: {
                            processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
                        },
                        order: [[6, "desc"]],
                        select: {
                            style: 'multi',
                            selector: 'td:first-child input[type="checkbox"]',
                            className: 'row-selected'
                        },
                        columns: [
                            { data: 'id' },
                            { data: 'subject' },
                            { data: 'campaign_id' },
                            { data: 'email' },
                            { data: 'list_id' },
                            { data: 'error' },
                            { data: 'created_at' },
                            { data: 'attempt' },
                        ],
                        createdRow: function (row) {
                            row.querySelectorAll("td")[7].classList.add("d-flex", "align-items-center", "justify-content-between")
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
                                    return data;
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
                                targets: 4,
                                orderable: true,
                                className: 'text-nowrap',
                                render: function (data) {
                                    let list_name = Object.keys(data[0]);
                                    return `${list_name}`;
                                }
                            },
                            {
                                targets: 5,
                                orderable: true,
                                className: 'text-nowrap',
                                render: function (data) {
                                    return data;
                                }
                            },
                            {
                                targets: 6,
                                orderable: true,
                                className: 'text-nowrap',
                            },
                            {
                                targets: -1,
                                data: null,
                                orderable: false,
                                className: 'text-end',
                                render: function (data, type, fullData) {
                                    let deleteList = Object.values(fullData.list_id[0]);
                                    return `
                                        <a class="btn btn-warning btn-active-light-warning btn-sm me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete error entry" data-list-table-filter="delete_row" value="${fullData.id}"><i class="fa fa-trash"></i></a>
                                        <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete email from list" value="${deleteList}" data-list-table-filter="delete_email"><i class="fa fa-trash"></i></button>
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
                            const logName = parent.querySelectorAll('td')[1].innerText;
                            const delete_email = parent.querySelectorAll('td input')[0].value;

                            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                            Swal.fire({
                                html: "Are you sure you want to delete <br><b>" + logName + "</b>?",
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
                                    axios.post("history", {
                                        type: "delete",
                                        id: [delete_email]
                                    }).then((res) => {
                                        let data = res.data
                                        if (data.status) {
                                            Swal.fire({
                                                html: "You have deleted <br><b>" + logName + "</b>!.",
                                                icon: "success",
                                                buttonsStyling: false,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: {
                                                    confirmButton: "btn fw-bold btn-primary",
                                                }
                                            }).then(function () {
                                                __this.dt.row($(parent)).remove().draw();
                                            });
                                        } else {
                                            Swal.fire({
                                                text: "Something went wrong! <br><b>" + logName + "</b> was not deleted.",
                                                icon: "error",
                                                buttonsStyling: false,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: {
                                                    confirmButton: "btn fw-bold btn-primary",
                                                }
                                            });
                                        }
                                    })
                                }
                            });
                        })
                    });
                }

                var handleDeleteEmail = () => {
                    // Select all edit buttons
                    const editButtons = document.querySelectorAll('[data-list-table-filter="delete_email"]');

                    editButtons.forEach(d => {
                        // Delete button on click
                        d.addEventListener('click', function (e) {
                            e.preventDefault();

                            // Select parent row
                            const parent = e.target.closest('tr');
                            const logName = parent.querySelectorAll('td')[3].innerText;
                            const listName = parent.querySelectorAll('td')[4].innerText;
                            const email = parent.querySelectorAll('td')[3].innerText.trim();

                            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                            Swal.fire({
                                html: "Are you sure you want to delete <b>" + logName + "</b> from (the list/ these lists) <br>" + listName + "?",
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
                                    let selected_id = d.value.split(",");
                                    axios.post("error", {
                                        type: "delete_from_list",
                                        id: selected_id,
                                        email: email
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
                                            Swal.fire({
                                                text: logName + " was not deleted.",
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
                        })
                    });
                }

                var handleDeleteAll = () => {
                    const deleteButton = document.querySelector('[data-clear-log="all"]');
                    deleteButton.addEventListener("click", function (e) {
                        e.preventDefault();
                        Swal.fire({
                            text: "Are you sure want to clear all the logs?",
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
                        }).then((result) => {
                            if (result.value) {
                                axios.post("error", {
                                    type: "delete_all"
                                }, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'X-CSRF-Token': __this._token
                                    }
                                }).then((res) => {
                                    let data = res.data
                                    if (data.status) {
                                        Swal.fire({
                                            text: "You have deleted all logs!.",
                                            icon: "success",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: {
                                                confirmButton: "btn fw-bold btn-primary",
                                            }
                                        }).then(function () {
                                            dt.clear().draw();
                                        });
                                    } else {
                                        swal_fire("", "error", userName + " was not deleted");
                                    }
                                });
                            }
                        })
                    })
                }

                // Init toggle toolbar
                var initToggleToolbar = function () {
                    // Toggle selected action toolbar
                    // Select all checkboxes
                    const container = document.querySelector('#kt_table_all_logs');
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
                    const container = document.querySelector('#kt_table_all_logs');
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
                        handleDeleteEmail();
                        handleDeleteAll();
                    }
                }
            }(this);

            // On document ready
            KTUtil.onDOMContentLoaded(function () {
                KTDatatablesServerSide.init();
            }, this);
        }
    },
}