export default {
    template: `
<div class="card">
    <div class="card-header">
        <div class="card-title">
            <div class="d-flex align-items-center position-relative my-1" data-kt-user-table-toolbar="selected">
                <div class="fw-bolder me-5">
                    <span class="me-2 fs-5" data-kt-user-table-select="selected_count">Select lists</span>
                </div>
            </div>
        </div>
        <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
            <a :href="credit_url" target="_blank" class="fw-bold fs-5 btn btn-primary">Buy credits</a>
            <div class="fw-bold fs-5">Total credits: {{credits}}</div>
        </div>
    </div>
    <div class="card-body py-4">
        <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped" id="mlr_table_verification">
            <thead>
                <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                    <th class="w-10px pe-2">
                        <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                            <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#mlr_table_verification .form-check-input" value="1" />
                        </div>
                    </th>
                    <th>List name</th>
                    <th>Total leads</th>
                    <th>Total Verified</th>
                    <th>Total Unverified</th>
                </tr>
            </thead>
            <tbody class="text-gray-600 fw-bold"></tbody>
        </table>

        <button type="button" class="btn btn-primary" disabled data-kt-user-table-select="process_selected">
            <span class="indicator-label">Start verification</span>
            <span class="indicator-progress">Verifying...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
        </button>
    </div>
</div>

<div class="card mt-10" v-if="all_leads.length > 0">
    <div class="card-header">
        <div class="card-toolbar">
            <!--start::Filter-->
            <div class="d-flex flex-row-fluid justify-content-end">
                <select v-model="select" @change="processSelection($event.target.value)" class="form-select form-select-solid fw-bolder" data-kt-select2="true" data-placeholder="Select option" data-allow-clear="true" data-kt-leads-table-filter="filter" data-hide-search="true">
                    <option value="all">All</option>
                    <option value="Valid">Valid</option>
                    <option value="Invalid">Invalid</option>
                    <option value="Warning">Unchecked</option>
                </select>
            </div>
            <!--end::Filter-->
        </div>
    </div>
    <div class="card-body py-4">
        <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" id="kt_table_users">
            <!--begin::Table head-->
            <thead>
                <!--begin::Table row-->
                <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                    <th class="min-w-125px">#</th>
                    <th class="min-w-125px">Email</th>
                    <th class="min-w-125px">Status</th>
                </tr>
                <!--end::Table row-->
            </thead>
            <!--end::Table head-->
            <!--begin::Table body-->
            <tbody class="text-gray-600 fw-bold">
                <!--begin::Table row-->
                <tr v-for="(lead, index) in all_leads_acc" :key="index" v-if="all_leads_acc.length > 0">
                    <td class="">{{lead.count}}</td>
                    <td class="d-flex align-items-center">
                        <a href="#" class="text-gray-800 text-hover-primary mb-1">{{ lead.email }}</a>
                    </td>
                    <td v-if="lead.status==='Pending'"><span class="spinner-border spinner-border-sm align-middle ms-2"></span>&nbsp;{{lead.status}}</td>
                    <td class="text-success" v-if="lead.status==='Valid'"><span class="glyphicon">&#10003;</span>&nbsp;{{lead.message}}</td>
                    <td class="text-danger" v-if="lead.status==='Invalid'"><span class="glyphicon">&#10006;</span>&nbsp;{{lead.message}}</td>
                    <td class="text-warning" v-if="lead.status==='Warning'"><span class="glyphicon">&#9888;</span>&nbsp;{{lead.message}}</td>
                </tr>
                <tr v-else>
                    <td colspan="3" class="text-center">
                    No emails
                    </td>
                </tr>
                <!--end::Table row-->
            </tbody>
            <!--end::Table body-->
        </table>
    </div>
</div>
<div class="modal fade" id="mlr_modal_leads_show" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-950px">
        <div class="modal-content">
            <div class="modal-header" id="mlr_modal_leads_show_header">
                <h2 class="fw-bolder">{{emailType}} emails</h2>
                <div class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal" data-mlr-email-modal-action="close">
                  <span class="svg-icon svg-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                      <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                    </svg>
                  </span>
                </div>
            </div>
            <div class="modal-body scroll-y mx-5 mx-xl-5 mb-7">
                <div class="d-flex justify-content-end mb-6">
                    <input data-table-filter-emails="search" type="text" class="form-control form-control-solid w-250px ps-14" placeholder="Search emails">
                </div>
                <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable table-striped" id="mlr_table_emails">
                    <thead>
                        <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                            <th class="w-10px pe-2">#</th>
                            <th>List ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th class="text-end min-w-100px">Added on</th>
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
    props: ['profile_details'],
    data() {
        return {
            all_lists: {
                list_type: 'get_email_lists',
                lists: []
            },
            checked_mails: {},
            all_leads: [],
            all_leads_acc: [],
            select: 'all',
            credits: 0,
            emails: [],
            credit_url: '#',
            err_doc: {},
            is_display: 1,
            selected_emails: [],
            email_data: [],
            processSelection: function (e, single = false) {
                this.all_leads_acc = this.all_leads = [];
                let index = 0
                this.all_leads.forEach(lead => {
                    if (lead.status === 'Valid' && e === 'Valid') {
                        this.all_leads_acc.push({
                            'count': ++index,
                            'email': lead.email,
                            'status': lead.status,
                            'message': lead.message
                        })
                    }
                    else if (lead.status === 'Invalid' && e === 'Invalid') {
                        this.all_leads_acc.push({
                            'count': ++index,
                            'email': lead.email,
                            'status': lead.status,
                            'message': lead.message
                        })
                    }
                    else if (lead.status === 'Warning' && e === 'Warning') {
                        this.all_leads_acc.push({
                            'count': ++index,
                            'email': lead.email,
                            'status': lead.status,
                            'message': lead.message
                        })
                    } else if (e === 'all') {
                        this.all_leads_acc.push({
                            'count': ++index,
                            'email': lead.email,
                            'status': lead.status,
                            'message': lead.message
                        })
                    }
                });
            },
            encodeBase64: (data) => {
                return encodeURIComponent(data);
            },
            decodeBase64: (data) => {
                return decodeURIComponent(data);
            },
            processGetLeads: async function (list_ids) {
                let lists = list_ids;
                this.emails = [];
                let list_val = {
                    list_type: 'get_leads_with_array',
                    list_ids: lists.join(',')
                }

                if (lists.length > 0) {
                    let leads = await new Promise(resolve => {
                        let arr = [];
                        let url = "list";
                        let method = axios.post;
                        method(url, list_val)
                            .then((res) => {
                                let data = res.data;
                                data.forEach(optin => {
                                    let temp = { name: optin.name, email: optin.email, exf: optin.extra_fields, verified: optin.verified };
                                    arr.push(temp);
                                });

                                resolve(arr);
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    });
                    this.emails = [...this.emails, ...leads];
                }
                return this.emails
            },
            getCharFixedEmail: function (eml) {
                try {
                    let _eml = eml.toLowerCase();
                    let emls = this.checked_mails;
                    if (emls[eml] !== undefined && emls[eml].status === 'checking') {
                        return eml;
                    }
                    else {
                        for (let i in emls) {
                            let j = i.toLowerCase();
                            if (j == _eml && emls[i].status === 'checking') {
                                return i;
                                break;
                            }
                        }
                    }
                } catch (err) { console.log(err); }
                return eml;
            },
            processVerification: async function (leads) {
                return new Promise(async (resolve) => {
                    this.emails = []
                    let email_count = 0

                    leads.forEach((lead) => {
                        if (this.emails.indexOf() < 0) {
                            ++email_count;
                            if (!lead.verified) {
                                this.emails.push(lead.email);
                                this.all_leads.push({
                                    'count': email_count,
                                    'email': lead.email,
                                    'status': 'Pending',
                                    'message': 'Pending'
                                })
                            } else {
                                this.all_leads.push({
                                    'count': email_count,
                                    'email': lead.email,
                                    'status': 'Valid',
                                    'message': 'Valid'
                                })
                            }
                        }
                    })
                    this.all_leads_acc = this.all_leads

                    this.statCreator()

                    let chunk_len = 10;
                    let g_len = Math.ceil((this.emails.length) / chunk_len);
                    let count = g_len;
                    let res_doc = document.querySelectorAll('#kt_table_users')[0]

                    for (let i = 1; i <= g_len; i++) {
                        let chunk = (this.emails.slice(((i * chunk_len) - chunk_len), i * chunk_len)).join(',');

                        ((chunk) => {
                            let url = "verify_email";
                            let method = axios.post;
                            let form_data = new FormData();
                            form_data.append('list_type', 'process_validation');
                            form_data.append('list_data', chunk);

                            method(url, form_data)
                                .then((res) => {
                                    let post_data = res.data;
                                    --count;
                                    try {
                                        let msg = '';

                                        if (post_data.result) {
                                            let data = JSON.parse(post_data.value);
                                            for (let i in data) {
                                                this.all_leads.forEach((lead, index) => {
                                                    if (lead.email === i) {
                                                        this.credits -= 1;
                                                        if (data[i].status === '1') {
                                                            this.all_leads[index].status = 'Valid'
                                                            this.all_leads[index].message = 'Valid'
                                                        } else if (data[i].status === '2') {
                                                            this.all_leads[index].status = 'Warning'
                                                            this.all_leads[index].message = data[i].reason
                                                        } else {
                                                            this.all_leads[index].status = 'Invalid'
                                                            this.all_leads[index].message = data[i].reason
                                                        }
                                                    }
                                                })
                                            }
                                        } else {
                                            msg = `<p class="text-danger text-center" style="margin:0px !important">${res.data}</p>`;
                                            if (/<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(msg)) {
                                                this.err_doc.innerHTML = 'Something weng wrong';
                                            } else this.err_doc.innerHTML = msg
                                        }
                                    } catch (e) {
                                        console.log(e)
                                    }
                                }, this)
                                .catch((error) => {
                                    console.log(error.response.data.errors);
                                });
                        })(chunk);
                        await new Promise((resolve, reject) => {
                            setTimeout(() => { resolve(1); }, 5000);
                        });
                    }

                })
            },
            statCreator: function () {
                try {
                    this.err_doc = document.querySelector('#err_doc')
                    let doc = this.err_doc;
                    let total = 0
                    let valid = 0
                    let invalid = 0
                    let not_checked = 0;
                    // for (let i in this.checked_mails) {
                    //     let stat = this.checked_mails[i].valid;
                    //     if (stat === true) { ++valid; }
                    //     else if (stat === false) { ++invalid; }
                    //     else { ++not_checked; }
                    //     ++total;
                    // }
                    let cntnt = `<div class="row text-center mb-4" style="font-weight: 600;">
			<div class="col-sm-12 text-primary">Total: ${total}</div>
			<div class="col-sm-12 text-success">Valid: ${valid}</div>
			<div class="col-sm-12 text-danger">Invalid: ${invalid}</div>
			<div class="col-sm-12 text-warning">Unchecked: ${not_checked}</div>
			</div>`;
                    // doc.innerHTML = cntnt;
                } catch (err) { console.log(err); }
            },
            mlr_table_verification: null,
            mlr_table_emails: null,
            emailType: "All",
            rowId: null,
            _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
        }
    },

    mounted() {
        this.utilScript();
        this.getLists();
        this.tableUtil();
        document.getElementById('mlr_table_verification_processing').removeAttribute("style");
    },

    methods: {
        getLists() {
            let url = "list";
            let method = axios.post;
            method(url, this.all_lists)
                .then((res) => {
                    let post_data = res.data
                    this.all_lists.lists = post_data.message
                    this.credits = post_data.credit
                    this.credit_url = post_data.credit_url;
                    this.mlr_table_verification.clear().rows.add(post_data.message).draw();
                })
                .catch((error) => {
                    console.log(error.response.data.errors)
                }).finally(() => {
                    document.getElementById('mlr_table_verification_processing').style.display = "none";
                });
        },

        utilScript() {
            "use script"
            var MLRVerifyEmail = function (__this) {
                var __this = __this
                var tb, e, t = [], n, m, r, s, o = document.getElementById("mlr_table_verification"),
                    c = () => {
                    },
                    l = () => {
                        const c = o.querySelectorAll('[type="checkbox"]');
                        s = document.querySelector('[data-kt-user-table-select="process_selected"]');
                        n = document.querySelector('[data-kt-user-table-toolbar="selected"]'), r = document.querySelector('[data-kt-user-table-select="selected_count"]');
                        c.forEach((e => {
                            e.addEventListener("click", (function () {
                                setTimeout((function () {
                                    a()
                                }), 50)
                            }))
                        }));
                    },
                    buttonInit = () => {
                        s.addEventListener("click", (function (evt) {
                            evt.preventDefault();
                            var unique = t.filter((value, index, self) => {
                                return self.indexOf(value) === index
                            })
                            __this.processGetLeads(unique).then(leads => {
                                s.setAttribute("data-kt-indicator", "on");
                                s.setAttribute("disabled", "true");
                                if (leads.length < 1) {
                                    swal_fire("", "error", "No emails found");
                                    __this.err_doc = ""
                                    s.removeAttribute("data-kt-indicator");
                                } else {
                                    var uniqueCount = 0;
                                    leads.forEach((lead, index) => {
                                        if (__this.emails.indexOf(lead.email) < 0 && !lead.verified) {
                                            ++uniqueCount;
                                        }
                                    });
                                    if (__this.credits===false || uniqueCount > __this.credits) {
                                        Swal.fire({
                                            title: 'Confirmation',
                                            html: `
                                        <div class="d-flex flex-column">
                                            <div>You have only ${__this.credits} and want to verify ${uniqueCount} emails.</div>
                                            <div>Do you want to continue to the ${uniqueCount} emails only?</div>
                                        </div>
                                        `,
                                            allowOutsideClick: false,
                                            allowEscapeKey: false,
                                            icon: 'warning',
                                            showDenyButton: true,
                                            denyButtonText: `Buy credits`,
                                            showCancelButton: true,
                                            denyButtonColor: '#ffc700',
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Continue'
                                        }).then((result) => {
                                            if (result.isDenied) {
                                                var win = window.open(__this.credit_url, '_blank')
                                                win.focus()
                                                s.removeAttribute("data-kt-indicator");
                                            }
                                            else if (result.isConfirmed) {
                                                for (let i = 0; i < uniqueCount - __this.credits; i++) {
                                                    leads.pop();
                                                }
                                                __this.processVerification(leads).then(() => {
                                                })
                                            } else {
                                                s.removeAttribute("data-kt-indicator");
                                            }
                                        });

                                        return;
                                    }
                                    Swal.fire({
                                        title: 'Confirmation',
                                        html: `
                                        <div class="d-flex flex-column">
                                            <div>${uniqueCount} emails to be verified</div>
                                            <div>${uniqueCount} credits will be used</div>
                                        </div>
                                        `,
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        icon: 'warning',
                                        showDenyButton: true,
                                        denyButtonText: `Buy credits`,
                                        showCancelButton: true,
                                        denyButtonColor: '#ffc700',
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Continue'
                                    }).then((result) => {
                                        if (result.isDenied) {
                                            var win = window.open(__this.credit_url, '_blank')
                                            win.focus()
                                            s.removeAttribute("data-kt-indicator");
                                        }
                                        else if (result.isConfirmed) {
                                            __this.processVerification(leads).then(() => {
                                            })
                                        } else {
                                            s.removeAttribute("data-kt-indicator");
                                        }
                                    });
                                }
                            }).finally(() => {
                                s.removeAttribute("data-kt-indicator")
                                s.removeAttribute("disabled")
                            })
                        }));
                    };
                const a = () => {
                    const e = o.querySelectorAll('tbody [type="checkbox"]');
                    let c = !1, l = 0;
                    t = [];
                    e.forEach((e => {
                        if (e.checked) {
                            e.checked && (c = !0, l++, t.push(e.value))
                        }
                    }));
                    if (c) {
                        r.innerHTML = l + " Selected", s.removeAttribute("disabled")
                    } else {
                        (s.setAttribute("disabled", true), r.innerHTML = "Select lists")
                    }
                };

                return {
                    init: function () {
                        o && ((__this.mlr_table_verification = tb = e = $(o).DataTable({
                            searchDelay: 500,
                            processing: true,
                            stripeClasses: ['odd-row', 'even-row'],
                            data: __this.all_lists.lists,
                            destroy: true,
                            language: {
                                processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
                            },
                            columns: [
                                { data: 'id' },
                                { data: 'title' },
                                { data: 'leads' },
                                { data: 'verified' },
                                { data: 'unverified' },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    orderable: !1,
                                    render: function (data) {
                                        return `<div class="form-check form-check-sm form-check-custom form-check-solid ms-5"><input class="form-check-input" type="checkbox" data-kt-check-target="#mlr_table_verification .form-check-input" value="${data}" /></div>`;
                                    },
                                },
                                {
                                    targets: 1,
                                    orderable: 1,
                                    render: function (data) {
                                        return data;
                                    },
                                },
                                {
                                    targets: 2,
                                    orderable: 1,
                                    createdCell: function (td, cellData, rowData) {
                                        $(td).attr('role', 'button');
                                        td.addEventListener("click", function () {
                                            __this.showEmail(rowData.id);
                                        });
                                    },
                                    render: function (data) {
                                        return data;
                                    }
                                },
                                {
                                    targets: 3,
                                    orderable: 1,
                                    createdCell: function (td, cellData, rowData) {
                                        $(td).attr('role', 'button');
                                        td.addEventListener("click", function () {
                                            __this.showEmail(rowData.id, 'verified');
                                        });
                                    },
                                    render: function (data) {
                                        return data;
                                    }
                                },
                                {
                                    targets: 4,
                                    orderable: 1,
                                    createdCell: function (td, cellData, rowData) {
                                        $(td).attr('role', 'button');
                                        td.addEventListener("click", function () {
                                            __this.showEmail(rowData.id, 'unverified');
                                        });
                                    },
                                    render: function (data) {
                                        return data;
                                    }
                                }
                            ],
                        })).on("draw", (function (event) {
                            l(), c(), a();
                        })), l(), c(), buttonInit())
                    }
                }
            }(this)
            KTUtil.onDOMContentLoaded(function () {
                MLRVerifyEmail.init()
            }, this);
        },

        showEmail(id, type = 'total') {
            this.emailType = type.charAt(0).toUpperCase() + type.slice(1);
            this.rowId = id;
            const n = new bootstrap.Modal(document.getElementById("mlr_modal_leads_show"));
            n.show();
            this.mlr_table_emails.clear();
            document.querySelector('[data-table-filter-emails="search"]').value = "";
            this.mlr_table_emails.ajax.reload();
        },

        tableUtil() {
            "use strict";
            var timer;

            // Class definition
            var KTDatatablesServerSide = function (__this) {
                // Shared variables
                var table;
                var dt;

                // Private functions
                var initDatatable = function () {
                    __this.mlr_table_emails = dt = $("#mlr_table_emails").DataTable({
                        searchDelay: 500,
                        processing: true,
                        stripeClasses: ['odd-row', 'even-row'],
                        serverSide: true,
                        pageLength: 10,
                        lengthChange: !0,
                        oLanguage: {
                            sEmptyTable: "No leads found!"
                        },
                        ajax: {
                            url: 'lead',
                            type: 'POST',
                            data: (data) => {
                                data.list_id = __this.rowId;
                                data.email_type = __this.emailType;
                                return data;
                            },
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                xhr.setRequestHeader('X-CSRF-Token', __this._token);
                            }
                        },
                        order: [],
                        columns: [
                            { data: null },
                            { data: 'list_id' },
                            { data: 'name' },
                            { data: 'email' },
                            { data: 'created_at' },
                        ],
                        drawCallback: function () {
                            $('[data-bs-toggle="tooltip"]').tooltip();
                            KTUtil.each(document.querySelectorAll('#mlr_table_emails [data-action="copy"]'), (function (e) {
                                new ClipboardJS(e, {
                                    target: e,
                                    text: function () {
                                        return e.innerHTML
                                    }
                                }).on("success", (function (t) {
                                    var backValue = e.innerHTML;
                                    navigator.clipboard.writeText(e.innerHTML);
                                    e.setAttribute("data-bs-original-title", "Copied successfully");
                                    e.innerHTML = "Copied successfully", e.classList.add("text-success");
                                    setTimeout((function () {
                                        e.setAttribute("data-bs-original-title", "Click to copy");
                                        e.classList.remove("text-success"), e.innerHTML = backValue;
                                    }), 3e3);
                                }))
                            }))
                        },
                        createdRow: function (row, data, dataIndex) {
                            var uniqueNumber = dataIndex + 1;
                            if (dataIndex > 9) { uniqueNumber = (dataIndex % 100) + 1; }
                            row.querySelectorAll("td")[0].innerHTML = uniqueNumber;
                        },
                        columnDefs: [
                            {
                                targets: 0,
                                className: 'text-nowrap',
                                orderable: false,
                            },
                            {
                                targets: 1,
                                className: 'text-nowrap',
                                render: function (data) {
                                    return `<div class="badge btn btn-active-color-primary btn-sm btn-outline-light badge badge-light fw-bolder p-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action="copy">${data}</div>`;
                                }
                            },
                            {
                                targets: 2,
                                className: 'text-nowrap',
                                render: function (data) {
                                    return data;
                                }
                            },
                            {
                                targets: 3,
                                className: 'text-nowrap',
                                render: function (data) {
                                    return data;
                                }
                            },
                            {
                                targets: -1,
                                className: 'text-nowrap',
                                orderable: false,
                                className: 'text-nowrap text-end',
                            },
                        ],
                    });

                    table = dt.$;

                    // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
                    dt.on('draw', function () {
                        KTMenu.createInstances();
                    });
                }

                // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
                var handleSearchDatatable = function () {
                    const filterSearch = document.querySelector('[data-table-filter-emails="search"]');
                    filterSearch.addEventListener('keyup', function (e) {
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            dt.search(e.target.value).draw();
                        }, 500);
                    });
                }

                // Public methods
                return {
                    init: function () {
                        initDatatable();
                        handleSearchDatatable();
                    }
                }
            }(this);

            // On document ready
            KTUtil.onDOMContentLoaded(function () {
                KTDatatablesServerSide.init();
            }, this);
        },
    },

    watch: {
        emails: {
            handler(newVal, oldVal) {
                if (newVal.length > 1) {
                    // function () {
                    //     const n = document.querySelector('[data-kt-leads-table-filter="filter"]')
                    //     n.addEventListener("change", (function () {
                    //         var t = "";
                    //         n.value && "" !== n.value && ((t += " "), t += n.value)
                    //         // e.search(n.value).draw()
                    //     }))
                    // }()
                    // console.log(this.all_lists.lists)
                }
            }
        }
    }
}