export default {
    name: "edit_segment",
    template: `
    <div class="row g-5 g-xl-8">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-body py-4">
                    <form id="mlr_edit_segment_form" @submit.prevent="formHandle" class="form fv-plugins-bootstrap5 fv-plugins-framework" method="post" action="#">
                        <div class="fv-row mb-7 fv-plugins-icon-container">
                            <label class="required fw-bold fs-6 mb-2">Enter segment name</label>
                            <input type="text" v-model="title" placeholder="Enter segment name" class="form-control form-control-solid mb-3 mb-lg-0 segmentCard" required />
                        </div>
                        <div class="card shadow-lg mb-7 segmentCard" v-for="(and, key, index) in segment_data" :key="key">
                            <div class="row my-1 px-5" v-for="(or, orkey, orindex) in and.and.or" :key="orkey">
                                <div class="col-md-3 my-1 fv-row fv-plugins-icon-container">
                                    <select class="form-select" v-model="or.condition" required>                                        
                                        <option value=null>Select Option</option>
                                        <option value="name">Name</option>
                                        <option value="email">Email address</option>
                                        <option value="created_at">Created at</option>
                                    </select>
                                </div>
                                <div class="col-md-2 my-1 fv-row fv-plugins-icon-container" v-if="or.condition !== null">
                                    <select class="form-select" v-model="or.middle_condition" required>
                                        <option value=null>Select Option</option>
                                        <option value="is">is</option>
                                        <option value="is_not">is not</option>
                                        <option value="contains">contains</option>
                                        <option value="does_not_contain">does not contain</option>
                                        <option value="starts_with">starts with</option>
                                        <option value="ends_with">ends with</option>
                                        <option value="does_not_starts_with">does not starts with</option>
                                        <option value="does_not_ends_with">does not ends with</option>
                                    </select>
                                </div>
                                <div class="col-md-4 my-1 fv-row fv-plugins-icon-container" v-if="or.middle_condition !== null">
                                    <input type="text" class="form-control" v-model="or.last_condition" required />
                                </div>
                                <div class="col-md-3 my-1 fv-row fv-plugins-icon-container ms-auto text-end">
                                    <button type="button" class="btn btn-primary me-5" @click="createSegment(key)" v-if="Object.keys(and.and.or).length == (orkey + 1)"><i class="fa fa-plus"></i>&nbsp;OR</button>
                                    <button type="button" class="btn btn-danger" :disabled="or.disabled" @click="deleteSegment(key, orkey)"><i class="bi bi-trash p-0"></i></button>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary me-5" @click="createSegment(null)"><i class="fa fa-plus"></i>&nbsp;AND</button>
                        <button type="submit" id="save_segment" class="btn btn-primary">
                            <span class="indicator-label">Submit</span>
                            <span class="indicator-progress">Please wait...<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-xl-12 mt-10">
            <div class="card">
                <div class="card-header align-items-center py-5 gap-2 gap-md-5">
                    <div class="card-title">
                        <div class="d-flex align-items-center position-relative my-1">
                            <span class="svg-icon svg-icon-1 position-absolute ms-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect><path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path></svg>
                            </span>
                            <input type="text" data-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search Lead">
                        </div>
                        <div id="mlr_list_report_views_export" class="d-none"></div>
                    </div>
                    <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                        <button type="button" class="btn btn-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-export-trigger="true">
                            <span class="svg-icon svg-icon-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="currentColor"></rect>
                                    <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="currentColor"></path>
                                    <path d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#C4C4C4"></path>
                                </svg>
                            </span>
                            Export
                        </button>
                        <div id="mlr_list_report_views_export_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-200px py-4" data-kt-menu="true">
                            <div class="menu-item px-3">
                                <a href="#" class="menu-link px-3" data-kt-ecommerce-export="copy">Copy to clipboard</a>
                            </div>
                            <div class="menu-item px-3">
                                <a href="#" class="menu-link px-3" data-kt-ecommerce-export="csv">Export as CSV</a>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end align-items-center d-none" data-mlr-segment-table-toolbar="selected">
                            <div class="fw-bolder me-5">
                                <span class="me-2" data-mlr-segment-table-select="selected_count"></span>Selected
                            </div>
                            <button type="button" class="btn btn-danger" data-mlr-segment-table-select="delete_selected">Delete Selected</button>
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>List ID</th>
                                <th>Created at</th>
                                <th class="text-end min-w-100px">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 fw-bold"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            title: null,
            data: [],
            type: "create",
            segment_data: [{ and: { or: [{ condition: null, middle_condition: null, last_condition: null, disabled: true }] } }],
            dt: null,
            id: 0,
            _token: document.querySelector('meta[name="__token"]').getAttribute('content')
        }
    },

    watch: {
        segment_data: {
            handler(newValue, oldValue) {
                if (newValue.length == 0) {
                    this.segment_data.push({ and: { or: [{ condition: null, middle_condition: null, last_condition: null, disabled: true }] } })
                }
            },
            deep: true
        }
    },

    mounted() {
        this.tableUtil();
        if (this.$route.query.id) {
            this.id = this.$route.query.id;
            this.type = "update";
            this.getSegment();
            document.getElementById("mlr_table_all_segments_processing").removeAttribute("style");
            setScript(".segmentCard:hover{transform: scale(1.05);box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);}", "segmentCard", "css");
        }
    },

    unmounted() {
        deleteScript("segmentCard")
    },

    methods: {
        getSegment() {
            axios.post("segment", {
                id: this.id,
                type: "get_details",
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': this._token
                }
            }).then((res) => {
                let data = res.data;
                this.title = data.title;
                this.segment_data = JSON.parse(data.segment_data);
                this.data = data.data;
                this.dt.rows.add(this.data).draw();
            }).catch((error) => {
                swal_fire("", "error", "Unable to " + this.type + " segment");
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

                // Initialize dataTable
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
                            { data: 'name' },
                            { data: 'email' },
                            { data: 'list_id' },
                            { data: 'created_at' },
                            { data: null },
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
                                    return data;
                                }
                            },
                            {
                                targets: -1,
                                orderable: false,
                                className: 'text-end d-flex align-items-end justify-content-end',
                                render: function () {
                                    return `
                                        <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-list-table-filter="delete_email"><i class="fa fa-trash"></i></button>
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
                        handleDeleteEmail();
                        KTMenu.createInstances();
                    });
                }

                // Delete rows one by one
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
                                    Swal.fire({
                                        text: "Deleting " + logName,
                                        icon: "info",
                                        buttonsStyling: false,
                                        showConfirmButton: false,
                                    });
                                    let selected_id = [parent.querySelectorAll('td input')[0].value.trim()]
                                    let list_id = [parent.querySelectorAll('td')[3].innerHTML]
                                    axios.post("list", {
                                        list_type: "delete_leads",
                                        id: selected_id,
                                        list_id: list_id
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
                                    }).catch(() => {
                                        Swal.fire({
                                            text: logName + " was not deleted.",
                                            icon: "error",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: {
                                                confirmButton: "btn fw-bold btn-primary",
                                            }
                                        });
                                    })
                                }
                            });
                        })
                    });
                }

                // Init toggle toolbar
                var initToggleToolbar = function () {
                    // Toggle selected action toolbar
                    // Select all checkboxes
                    const container = document.querySelector('#mlr_table_all_segments');
                    const checkboxes = container.querySelectorAll('[type="checkbox"]');

                    // Select elements
                    const deleteSelected = document.querySelector('[data-mlr-segment-table-select="delete_selected"]');

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
                            text: "Are you sure you want to delete selected emails?",
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
                                Swal.fire({
                                    text: "Deleting selected emails",
                                    icon: "info",
                                    buttonsStyling: false,
                                    showConfirmButton: false,
                                });

                                const headerCheckbox = container.querySelectorAll('[type="checkbox"]')[0];
                                let checkedBox = [], listIdValue = [];

                                checkboxes.forEach((c, key) => {
                                    c.checked && checkedBox.push(c.value);
                                    if (c.checked && c.closest('tr').querySelectorAll("td").length > 0) {
                                        listIdValue.push(c.closest('tr').querySelectorAll("td")[3].innerHTML);
                                    }
                                });

                                if (checkedBox.indexOf('1') > -1) {
                                    checkedBox.splice(checkedBox.indexOf('1'), 1)
                                }

                                axios.post("list", {
                                    list_type: "delete_leads",
                                    id: checkedBox,
                                    list_id: listIdValue
                                }, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'X-CSRF-Token': __this._token
                                    }
                                }).then((data) => {
                                    data = data.data;
                                    if (data.status) {
                                        Swal.fire({
                                            text: "You have deleted all selected emails!.",
                                            icon: "success",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: {
                                                confirmButton: "btn fw-bold btn-primary",
                                            }
                                        }).then(function () {
                                            checkboxes.forEach(c => {
                                                c.checked && dt.row($(c.closest("tbody tr"))).remove().draw()
                                            });
                                            // Remove header checked box
                                            headerCheckbox.checked = false;
                                        });
                                    } else {
                                        Swal.fire({
                                            text: "Selected emails were not deleted!.",
                                            icon: "error",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: {
                                                confirmButton: "btn fw-bold btn-primary",
                                            }
                                        }).then(function () {
                                            checkboxes.forEach(c => {
                                                c.checked && dt.row($(c.closest("tbody tr"))).remove().draw()
                                            })
                                            // Remove header checked box
                                            headerCheckbox.checked = false;
                                        });
                                    }
                                });
                            }
                        });
                    });
                }

                var toggleToolbars = function () {
                    const container = document.querySelector('#mlr_table_all_segments');
                    const toolbarSelected = document.querySelector('[data-mlr-segment-table-toolbar="selected"]');
                    const exportButton = document.querySelector('[data-kt-export-trigger="true"]');
                    const selectedCount = document.querySelector('[data-mlr-segment-table-select="selected_count"]');

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
                        exportButton.classList.add('d-none');
                        toolbarSelected.classList.remove('d-none');
                    } else {
                        toolbarSelected.classList.add('d-none');
                        exportButton.classList.remove('d-none');
                    }
                }

                var handleSearchDatatable = function () {
                    const filterSearch = document.querySelector('[data-table-filter="search"]');
                    filterSearch.addEventListener('keyup', function (e) {
                        dt.search(e.target.value).draw();
                    });
                }

                var handleExport = () => {
                    const documentTitle = 'List export';

                    var dataTable = __this.dt;
                    var buttons = new $.fn.dataTable.Buttons(document.getElementById('mlr_table_all_segments'), {
                        buttons: [
                            {
                                extend: 'copyHtml5',
                                title: documentTitle,
                                exportOptions: {
                                    columns: [1, 2, 3, 4]
                                },
                            },
                            {
                                extend: 'csvHtml5',
                                title: documentTitle,
                                exportOptions: {
                                    columns: [1, 2, 3, 4]
                                },
                            },
                        ]
                    }).container().appendTo($('#mlr_list_report_views_export'));

                    // Hook dropdown menu click event to datatable export buttons
                    const exportButtons = document.querySelectorAll('#mlr_list_report_views_export_menu [data-kt-ecommerce-export]');
                    exportButtons.forEach(exportButton => {
                        exportButton.addEventListener('click', e => {
                            e.preventDefault();

                            // Get clicked export value
                            const exportValue = e.target.getAttribute('data-kt-ecommerce-export');
                            const target = document.querySelector('.dt-buttons .buttons-' + exportValue);

                            // Trigger click event on hidden datatable export buttons
                            target.click();
                        });
                    });
                    KTMenu.createInstances();
                }

                // Public methods
                return {
                    init: function () {
                        initDatatable();
                        initToggleToolbar();
                        handleDeleteEmail();
                        handleSearchDatatable();
                        handleExport();
                    }
                }
            }(this);

            // On document ready
            KTUtil.onDOMContentLoaded(function () {
                MLRDatatablesServerSide.init();
            }, this);
        },

        formHandle() {
            var letValidateAll = this.validateFields();
            let btn = document.getElementById("save_segment");
            btn.setAttribute("data-kt-indicator", "on");
            btn.disabled = 1;
            if (!letValidateAll) return;

            // New validation to check if "Choose" is selected
            const hasInvalidSelection = this.segment_data.some(and => 
                and.and.or.some(or => or.condition === null || or.middle_condition === null)
            );

            if (hasInvalidSelection) {
                swal_fire("", "warning", "Please select valid options for all conditions.");
                return; // Prevent form submission
            }

            axios.post("segment", {
                id: this.id,
                type: this.type,
                title: this.title,
                segment_data: this.segment_data
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': this._token
                }
            }).then((res) => {
                let data = res.data;
                let __this = this;
                if (data.status) {
                    this.data = data.message;
                    this.dt.clear().rows.add(data.message).draw();
                    if (this.type == "create") {
                        Swal.fire({
                            text: "Segment created successfully",
                            icon: "success",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then((function () {
                            __this.$router.push({
                                name: 'all_segments',
                            });
                        }))
                    } else {
                        swal_fire("", "success", "Segment updated successfully");
                    }
                } else {
                    swal_fire("", "error", "Unable to " + this.type + " segment");
                }
            }).catch((error) => {
                swal_fire("", "error", "Unable to " + this.type + " segment");
            }).finally(() => {
                btn.removeAttribute("data-kt-indicator");
                btn.disabled = 0;
            });
        },

        validateFields() {
            let all_select = document.querySelectorAll('[required]'), is_valid = false;
            all_select.forEach(element => {
                element.value.trim() === "" ? (is_valid = false) && element.classList.add("border-danger") : (is_valid = true) && element.classList.remove("border-danger")
            });

            return is_valid ?? swal_fire("", "warning", "Please fill all required fields");
        },

        createSegment(orindex = null) {
            var dump1 = { condition: null, middle_condition: null, last_condition: null };
            orindex === null ? this.segment_data.push({ and: { or: [dump1] } }) : this.segment_data[orindex].and.or.push(dump1);
        },

        deleteSegment(and, or) {
            this.segment_data[and].and.or.splice(or, 1);
            if (Object.keys(this.segment_data[and].and.or).length == 0) {
                this.segment_data.splice(and, 1);
            }
        }
    },
}