export default {
    name: "all_segments",
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
                            <input type="text" data-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search segments">
                        </div>
                    </div>
                    <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                        <div class="d-flex justify-content-end" data-mlr-segment-table-toolbar="base">
                            <button type="button" class="btn btn-primary" @click="$router.push({name: 'edit_segment'})">
                                <span class="svg-icon svg-icon-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor"></rect>
                                    <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor"></rect></svg>
                                </span>Create segment
                            </button>
                        </div>
                        <div class="d-flex justify-content-end align-items-center d-none" data-table-toolbar="selected">
                            <div class="fw-bolder me-5"><span class="me-2" data-table-select="selected_count"></span>Selected</div>
                            <button type="button" class="btn btn-danger" data-kt-table-select="delete_selected">Delete Selected</button>
                        </div>
                    </div>
                </div>
                <div class="card-body py-4">
                    <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable  table-striped" id="mlr_table_all_segments">
                        <thead>
                            <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                                <th class="w-10px pe-2">
                                    <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                                        <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#mlr_table_all_segments .form-check-input" value="1"/>
                                    </div>
                                </th>
                                <th>Segment</th>
                                <th>Leads</th>
                                <th>Created at</th>
                                <th class="text-end min-w-100px">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 fw-bold">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            data: [],
            dt: null
        }
    },

    mounted() {
        this.tableUtil();
        this.getData();
        document.getElementById("mlr_table_all_segments_processing").removeAttribute("style");
    },

    methods: {
        getData() {
            axios.post("segment", {
                type: "get",
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': this._token
                }
            }).then((res) => {
                this.data = res.data;
                this.dt.rows.add(this.data).draw();
            }).catch((error) => {
                console.log(error)
                // swal_fire("", "error", "Unable to " + this.type + " segment");
            }).finally(() => {
                document.getElementById("mlr_table_all_segments_processing").style.display = "none";
            });
        },
        tableUtil() {
            "use strict";

            // Class definition
            var MLRDatatablesServerSide = function (__this) {
                // Shared variables
                var table;
                var dt;
                var __this = __this

                // Private functions
                var initDatatable = function () {
                    __this.dt = dt = $("#mlr_table_all_segments").DataTable({
                        searchDelay: 500,
                        processing: true,
                        stripeClasses: ['odd-row', 'even-row'],
                        data: __this.data,
                        destroy: true,
                        language: {
                            processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
                        },
                        drawCallback: function () {
                            $('[data-bs-toggle="tooltip"]').tooltip();
                        },
                        responsive: false,
                        order: [],
                        select: {
                            style: 'multi',
                            selector: 'td:first-child input[type="checkbox"]',
                            className: 'row-selected'
                        },
                        columns: [
                            { data: 'id' },
                            { data: 'title' },
                            { data: 'subscribers' },
                            { data: 'created_at' },
                            { data: null },
                        ],
                        createdRow: function (row) {
                            row.querySelectorAll("td")[4].classList.add("d-flex", "align-items-center", "justify-content-end")
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
                                targets: -1,
                                orderable: false,
                                className: 'text-end',
                                render: function () {
                                    return `
                                        <button type="button" class="btn btn-primary btn-active-light-primary btn-sm me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" data-list-table-filter="delete_row" ><i class="bi bi-pencil p-0"></i></button>
                                        <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-list-table-filter="delete_email"><i class="bi bi-trash p-0"></i></button>
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
                        dt.search(e.target.value).draw();
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
                            const logName = parent.querySelectorAll('td')[1].innerText;

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
                                    let selected_id = [parent.querySelectorAll('td input')[0].value.trim()]
                                    axios.post("segment", {
                                        type: "delete",
                                        ids: selected_id
                                    });

                                    Swal.fire({
                                        text: "Deleting " + logName,
                                        icon: "info",
                                        buttonsStyling: false,
                                        showConfirmButton: false,
                                        timer: 2000
                                    }).then(function () {
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
                                    });
                                } else if (result.dismiss === 'cancel') {
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
                            const parent = e.target.closest('tr');
                            const logName = parent.querySelectorAll('td input')[0].value;
                            __this.$router.push({
                                name: 'edit_segment',
                                query: { id: logName }
                            })
                        })
                    })
                }

                // Init toggle toolbar
                var initToggleToolbar = function () {
                    // Toggle selected action toolbar
                    // Select all checkboxes
                    const container = document.querySelector('#mlr_table_all_segments');
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
                            text: "Are you sure you want to delete selected segments?",
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

                                axios.post("segment", {
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
                                    text: "Deleting selected logs",
                                    icon: "info",
                                    buttonsStyling: false,
                                    showConfirmButton: false,
                                    timer: 2000
                                }).then(function () {
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
                                });
                            } else if (result.dismiss === 'cancel') {
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
                        });
                    });
                }

                // Toggle toolbars
                var toggleToolbars = function () {
                    // Define variables
                    const container = document.querySelector('#mlr_table_all_segments');
                    const toolbarBase = document.querySelector('[data-mlr-segment-table-toolbar="base"]');
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
                        toolbarBase.classList.add("d-none");
                        toolbarSelected.classList.remove('d-none');
                    } else {
                        toolbarBase.classList.remove("d-none");
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
                MLRDatatablesServerSide.init();
            }, this);
        },
    },

    watch: {
        $route(to, from) {
            console.log(to, from);
        }
    }
}