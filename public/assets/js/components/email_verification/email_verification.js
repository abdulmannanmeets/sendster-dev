export default {
    template: `
    <div class="card" id="kt_verification">
        <!--begin::Card body-->
        <div class="card-body p-lg-17">
            <div class="d-flex flex-column">
                <div class="row d-flex justify-content-between">
                    <div class="row">
                        <div class="col-6">
                            <h4 style="position:relative; top:25%;">Credits: <span>{{ credits }}</span></h4>
                        </div>
                        <div class="col-6">
                            <h4 style="float:right;">
                                <a target="_blank" :href="credit_url" class="btn btn-warning"><span
                                        style="font-size:medium">&#36;</span> Buy Credits</a>
                            </h4>
                        </div>
                    </div>
                </div>
                <!--end::Nav group-->
                <!--begin::Row-->
                <div class="row d-flex justify-content-center">
                    <!--begin::Col-->
                    <div class="col-xl-4" v-if="is_display == 1">
                        <form method="POST" @submit.prevent="save_manual_form($event)" id="manual_form">
                            <div class="d-flex h-100 align-items-center">
                                <!--begin::Option-->
                                <div
                                    class="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10">
                                    <!--begin::Heading-->
                                    <div class="text-center">
                                        <!--end::Description-->
                                        <!--begin::Price-->
                                        <div class="d-flex flex-column mb-7 fv-row fv-plugins-icon-container"
                                            id="verification_list_manual">
                                            <!--end::Label-->
                                            <!--begin::Select-->
                                            <div class="d-none" id="overlay" @click="hide($event)"></div>
                                            <div>
                                                <button @click="dropDown($event);"
                                                    class="menu-btn select2-selection select2-selection--single form-select form-select-solid"
                                                    type="button">
                                                    Select your list
                                                </button>
                                                <div class="d-none shadow rounded menu"
                                                    v-if="all_lists.lists.length > 0">
                                                    <span class="d-block menu-option" v-for="list in all_lists.lists"
                                                        :key="list.id"><label><input type="checkbox"
                                                                name="manual_verification[]" :value="list.id">&nbsp;
                                                            {{ list.title }}</label></span>
                                                </div>
                                                <div class="d-none shadow rounded menu"
                                                    v-if="all_lists.lists.length > 0">
                                                    <span class="d-block menu-option"><label>No lists
                                                            created</label></span>
                                                </div>
                                            </div>
                                            <!--end::Select-->
                                        </div>

                                        <div id="err_doc"></div>
                                        <button type="submit" class="btn btn-primary">Start Verification</button>
                                        <!--end::Price-->
                                    </div>
                                    <!--end::Heading-->
                                </div>
                                <!--end::Option-->
                            </div>
                        </form>
                    </div>
                    <!--end::Col-->
                    <!--begin::Col-->
                    <div class="col-xl-4" v-if="is_display == 0">
                        <div class="d-flex">
                            <!--begin::Option-->
                            <div
                                class="w-100 d-flex flex-column flex-center rounded-3 bg-light bg-opacity-75 py-15 px-10">
                                <!--begin::Heading-->
                                <div class="mb-7 text-center">
                                    <!--begin::Title-->
                                    <h1 class="text-dark mb-5 fw-boldest">Startup12345</h1>
                                    <!--end::Title-->
                                    <!--begin::Description-->
                                    <div class="text-gray-400 fw-bold mb-5">Optimal for 10+ team size
                                        <br />and new startup
                                    </div>
                                    <!--end::Description-->
                                    <!--begin::Price-->
                                    <div class="text-center">
                                        <span class="mb-2 text-primary">$</span>
                                        <span class="fs-3x fw-bolder text-primary" data-kt-plan-price-month="39"
                                            data-kt-plan-price-annual="399">39</span>
                                        <span class="fs-7 fw-bold opacity-50">/
                                            <span data-kt-element="period">Mon</span></span>
                                    </div>
                                    <!--end::Price-->
                                </div>
                                <!--end::Heading-->
                            </div>
                            <!--end::Option-->
                        </div>
                    </div>

                    <div class="card-body py-4 col-xl-8 table-responsive" v-if="is_display != 0">
                        <!--begin::Table-->
                        <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                            id="kt_table_users">
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
                                <tr v-for="lead in all_leads" :key="lead.email" :id="lead.email"
                                    :data-eml="encodeBase64(lead.email)">
                                    <td class=""><input type="checkbox" data-checked="0"
                                            :eml-id="encodeBase64(lead.email)" @click="processSelection($event, true)" disabled></td>
                                    <td class="d-flex align-items-center">
                                        <a href="#" class="text-gray-800 text-hover-primary mb-1">{{ lead.email }}</a>
                                    </td>
                                    <td class="">{{ lead.status }}</td>
                                </tr>
                                <!--end::Table row-->
                            </tbody>
                            <!--end::Table body-->
                        </table>
                        <!--end::Table-->
                    </div>
                    <!--end::Col-->
                </div>
                <!--end::Row-->
            </div>
        </div>
        <!--end::Card body-->
    </div>
    `,
    data: () => ({
        all_lists: {
            list_type: 'get',
            lists: []
        },
        checked_mails: {},
        all_leads: [],
        credits: 0,
        emails: [],
        credit_url: '#',
        err_doc: {},
        is_display: 1,
        selected_emails: [],
        processSelection: function (e, single = false) {
            if (single) {
                let eml = this.decodeBase64(e.target.getAttribute(`eml-id`));
                if (e.target.checked) {
                    this.selected_emails[eml] = this.checked_mails[eml];
                } else if (this.selected_emails[eml] !== undefined) {
                    delete this.selected_emails[eml];
                }
            } else {
                let _e = 'all';
                if (e == 'true') { _e = true; } else if (e == 'false') { _e = false; } else if (e == 'null') { _e = null; } else { _e = e; }
                e = _e;

                this.select = e;
                this.selected_emails = {};

                let selected_arr = [];

                if (e === 'all') {
                    this.selected_emails = { ...this.checked_mails };
                    selected_arr = 1;
                } else {
                    for (let i in this.checked_mails) {
                        let data = this.checked_mails[i];
                        if (e === null && data.valid === null) {
                            this.selected_emails[i] = data;
                            selected_arr.push(this.encodeBase64(i));
                        } else if (e === true && data.valid === true) {
                            this.selected_emails[i] = data;
                            selected_arr.push(this.encodeBase64(i));
                        } else if (e === false && data.valid === false) {
                            this.selected_emails[i] = data;
                            selected_arr.push(this.encodeBase64(i));
                        }
                    }
                }
                this.processSelectionInTable(selected_arr);
            }
        },
        processSelectionInTable: function (eml_arr) {
            try {
                let doc = document.querySelectorAll("#kt_table_users")[0];
                doc.querySelectorAll(`input[type='checkbox']`).forEach(doc => {
                    let current = doc.getAttribute('eml-id');
                    doc.checked = (eml_arr === 1 || (eml_arr.indexOf(current) >= 0)) ? true : false;
                });
            } catch (err) { console.log(err); }
        },
        encodeBase64: (data) => {
            return encodeURIComponent(data);
        },
        decodeBase64: (data) => {
            return decodeURIComponent(data);
        },
        processGetLeads: async function () {
            let lists = []
            document.querySelectorAll('#manual_form')[0].querySelectorAll('input[type="checkbox"]').forEach(cb => {
                if (cb.checked) { lists.push(cb.value) }
            })
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
                                let temp = { name: optin.name, email: optin.email, exf: optin.extra_fields };
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
                        this.checked_mails[lead.email] = { data: lead, valid: null, status: 'checking' };
                        this.emails.push(lead.email);
                        this.all_leads.push({
                            'count': email_count,
                            'email': lead.email,
                            'status': 'Pending'
                        })
                    }
                })

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
                                let post_data = res.data
                                --count
                                try {
                                    let msg = ''

                                    if (post_data.result) {
                                        let data = post_data.value
                                        for (let i in data) {
                                            let eml = this.getCharFixedEmail(i.trim());
                                            this.checked_mails[eml].status = data[i].reason;
                                            let temp_doc = false;

                                            try {
                                                temp_doc = res_doc.querySelectorAll(`[data-eml='${this.encodeBase64(eml)}']`)[0].querySelectorAll('td');
                                            } catch (err) { console.log(err); }

                                            if (temp_doc && temp_doc.length > 0) {
                                                temp_doc[0].querySelectorAll("input[type='checkbox']")[0].disabled = false;
                                            }
                                            if (data[i].status == '1') {
                                                this.checked_mails[eml].valid = true;

                                                if (temp_doc && temp_doc.length > 0) {
                                                    temp_doc[2].classList.add('text-success');
                                                    temp_doc[2].classList.remove('text-primary');
                                                    temp_doc[2].innerHTML = `<span class="glyphicon">&#10003;</span>&nbsp;Valid`;
                                                }
                                            }
                                            else if (data[i].status == '2') {
                                                this.checked_mails[eml].valid = null;

                                                if (temp_doc && temp_doc.length > 0) {
                                                    temp_doc[2].classList.add('text-warning');
                                                    temp_doc[2].classList.remove('text-primary');
                                                    temp_doc[2].innerHTML = `<span class="glyphicon">&#9888;</span>&nbsp;${data[i].reason}`;
                                                }
                                            }
                                            else {
                                                this.checked_mails[eml].valid = false;
                                                if (temp_doc && temp_doc.length > 0) {
                                                    temp_doc[2].classList.add('text-danger');
                                                    temp_doc[2].classList.remove('text-primary');
                                                    temp_doc[2].innerHTML = `<span class="glyphicon">&#10006;</span>&nbsp;${data[i].reason}`;
                                                }
                                            }
                                            let do_check = false;
                                            if (this.select === 'all') {
                                                do_check = true;
                                                this.processSelection('all');
                                            }
                                            else if (this.select === this.checked_mails[eml].valid) {
                                                do_check = true;
                                                this.processSelection(this.select);
                                            }

                                            if (do_check && temp_doc && temp_doc.length > 0) {
                                                temp_doc[0].querySelectorAll("input[type='checkbox']")[0].checked = true;
                                            }
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
                                console.log(error)
                                this.error_data = error.response.data.errors;
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
                for (let i in this.checked_mails) {
                    let stat = this.checked_mails[i].valid;
                    if (stat === true) { ++valid; }
                    else if (stat === false) { ++invalid; }
                    else { ++not_checked; }
                    ++total;
                }
                let cntnt = `<div class="row text-center mb-4" style="font-weight: 600;">
			<div class="col-sm-12 text-primary">Total: ${total}</div>
			<div class="col-sm-12 text-success">Valid: ${valid}</div>
			<div class="col-sm-12 text-danger">Invalid: ${invalid}</div>
			<div class="col-sm-12 text-warning">Unchecked: ${not_checked}</div>
			</div>`;
                doc.innerHTML = cntnt;
            } catch (err) { console.log(err); }
        },
    }),

    mounted() {
        this.getLists()
        setScript(`#verification_list_manual .menu {display: flex; align-items: flex-start; flex-direction: column; padding-top: 10px; z-index: 200; margin-top: 4px; background-color: white;}
        #verification_list_manual .menu-option {color: black; padding: 6px 20px 6px;}
        #verification_list_manual #overlay {position: absolute; top: 0px; left: 0px; width: 100%; height: 42.94px; z-index: 100;}
        .glyphicon {position: relative; top: 1px; display: inline-block; font-family: "Glyphicons Halflings"; font-style: normal; font-weight: 400; line-height: 1; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}`, 'email_verification_style', 'css')
    },

    unmounted() {
        deleteScript('email_verification_style')
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
                    this.credit_url = post_data.credit_url
                })
                .catch((error) => {
                    console.log(error)
                    this.error_data = error.response.data.errors;
                });
        },

        showNHide(t) {
            var n = document.querySelector('#kt_verification'),
                m = n.querySelector('#manual_btn'),
                a = m = n.querySelector('#automatic_btn')

            if ("manual" === t) {
                a.classList.remove('active')
                m.classList.add('active')
                this.is_display = 1;
            } else if ("automatic" === t) {
                m.classList.remove('active')
                a.classList.add('active')
                this.is_display = 0
            }
        },

        dropDown(event) {
            var p = document.querySelector('#verification_list_manual')
            event.target.parentElement.children[1].classList.remove("d-none");
            p.querySelector("#overlay").classList.remove("d-none");
        },

        hide(event) {
            var p = document.querySelector('#verification_list_manual')
            var items = p.getElementsByClassName('menu');
            for (let i = 0; i < items.length; i++) {
                items[i].classList.add("d-none");
            }
            p.querySelector("#overlay").classList.add("d-none");
        },

        save_manual_form(event) {
            this.processGetLeads().then(leads => {
                this.err_doc = ''
                if (leads.length < 1) {
                    this.err_doc = ''
                }

                else {
                    this.processVerification(leads).then(() => {

                    })
                }
            })
        }
    }
}