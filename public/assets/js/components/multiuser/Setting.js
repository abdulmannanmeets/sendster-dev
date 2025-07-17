export default {
    name: 'setting',
    template: `
    <form id="mlr_settings_form" class="form" action="#">
        <div class="card shadow-sm mb-7">
            <div class="card-header collapsible cursor-pointer rotate" data-bs-toggle="collapse" data-bs-target="#settings_card_collapsible">
                <div class="card-title"><h3>Email settings</h3></div>
                <div class="card-toolbar rotate-180">
                    <span class="svg-icon svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                            <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <div id="settings_card_collapsible" class="collapse show">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="d-flex flex-column scroll-y me-n7 pe-7">
                                <div class="row mb-7">
                                    <div class="col-md-8 fv-row mb-2 fv-plugins-icon-container">
                                        <label class="fw-bold fs-6 mb-2">Version</label>
                                    </div>
                                    <div class="col-md-4 fv-row mb-2 fv-plugins-icon-container">
                                        <p class="form-control">{{currentVersion}}</p>
                                    </div>
                                </div>
                                <div class="row mb-7">
                                    <div class="col-md-8 fv-row mb-2 fv-plugins-icon-container">
                                        <label class="required fw-bold fs-6 mb-2">Maximum emails that can be sent per run</label>
                                    </div>
                                    <div class="col-md-4 fv-row mb-2 fv-plugins-icon-container">
                                        <input type="text" name="max_emails" placeholder="Enter scheduled mail chunk size/minute" v-model="emailTiming.maxEmailsSent" class="form-control form-control-solid mb-3 mb-lg-0" />
                                    </div>
                                </div>
                                <div class="row mb-7">
                                    <div class="col-md-8 fv-row mb-2 fv-plugins-icon-container">
                                        <label class="required fw-bold fs-6 mb-2">Global SMTP</label>
                                    </div>
                                    <div class="col-md-4 fv-row mb-2 fv-plugins-icon-container">
                                        <select name="global_smtp" v-model="global_smtp" class="form-select form-select-solid">
                                            <option v-for="(value, index) in all_smtps" :key="index" :value="value.id">{{value.title}} ({{value.credentials.host}})</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-7">
                                    <div class="col-md-8 fv-row mb-2 fv-plugins-icon-container">
                                        <label class="required fw-bold fs-6 mb-2 me-10">Delay time between sending two group of mails (For synchronus sending)</label>
                                    </div>
                                    <div class="col-md-4 fv-row mb-2 fv-plugins-icon-container">
                                        <select v-model="emailTiming.cronDelay" class="form-select form-select-solid">
                                            <option v-for="(index, value) in 1000" :value="value+1" :key="index">{{value+1}} sec</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-7">
                                    <div class="col-md-8 fv-row mb-2 fv-plugins-icon-container">
                                        <label class="required fw-bold fs-6 mb-2 me-10">Send mails asynchronusly</label>
                                    </div>
                                    <div class="col-md-4 fv-row mb-2 fv-plugins-icon-container">
                                        <input class="form-check-input" v-model="emailTiming.asyncCronMailer" type="checkbox">
                                    </div>
                                </div>
                                <div class="row mb-7">
                                    <div class="col-md-12 fv-row mb-2 fv-plugins-icon-container">
                                        <label class="required fw-bold fs-6 mb-2 me-10">Scheduled/Sequence email's CRON command <a href="#" onclick="openNewWindow('https://www.youtube.com/watch?v=rkmd46kTR5E');">(watch tutorial)</a></label>
                                    </div>
                                    <div class="col-md-12 fv-row mb-2 fv-plugins-icon-container">
                                        <div class="input-group">
                                            <span class="input-group-prepend">
                                                <label class="input-group-text" style="border-radius:0.475rem 0 0 0.475rem;">Script based</label>
                                            </span>
                                            <div role="button" onclick="setSwalMixin('Script command copied', 'success')" data-setting="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" aria-label="Cron type" class="form-control text-nowrap" style="overflow:overlay;">{{scriptBased}}</div>
                                            <span class="input-group-prepend">
                                                <label class="input-group-text d-inline-block" style="border-radius:0 0.475rem 0.475rem 0;"><input role="button" type="radio" name="cron-type" value="script" v-model="emailTiming.cronType"></label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-12 text-danger">* Please use the selected command only one time at your scheduler, it will work for both scheduled and sequenced mails.</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 fv-row mb-2 fv-plugins-icon-container">
                                        <label class="fw-bold fs-6 mb-2 me-10">Allow domains to make cross origin requests</label>
                                    </div>
                                    <div class="col-md-12 fv-row mb-2 fv-plugins-icon-container">
                                        <textarea class="form-control form-control-solid" v-model="emailTiming.crossOriginDomains" data-setting="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="Insert * if you like to allow all domains or enter URLs separated by comma. This may be used when subscription requests will be made from outside of the domain Example: http://something.com" rows="7" placeholder="Enter domains with protocol separated by comma Ex: http:something.com"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card shadow-sm mb-7">
            <div class="card-header collapsible cursor-pointer rotate collapse" data-bs-toggle="collapse" data-bs-target="#apisettings_card_collapsible">
                <div class="card-title"><h3>API Settings</h3></div>
                <div class="card-toolbar rotate-180">
                    <span class="svg-icon svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                            <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <div id="apisettings_card_collapsible" class="collapse show">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-12">
                            <div class="d-flex flex-column scroll-y me-n7 pe-7">
                                <div class="row mb-7">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text" style="border-radius:0.475rem 0 0 0.475rem;">API Key</span>
                                        </div>
                                        <input type="text" class="form-control" v-model="apiSettings.apiKey" role="button" onclick="setSwalMixin('API key copied', 'success')" data-setting="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" aria-label="API Key" style="border-radius:0;" readonly>
                                        <button type="button" class="input-group-append btn btn-primary btn-sm" data-setting-button="apiKey">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z" fill="currentColor" /></svg>
                                            Re-create
                                        </button>
                                    </div>
                                </div>
                                <div class="row mb-7">
                                    <div class="col-md-8 fv-row mb-2 fv-plugins-icon-container">
                                        <label class="fw-bold fs-6 mb-2 me-10">Allow accessing lists from third party APIs</label>
                                    </div>
                                    <div class="col-md-4 fv-row mb-2 fv-plugins-icon-container">
                                        <input class="form-check-input" type="checkbox" v-if="profile_details.product_permissions=='free'" data-bs-toggle="modal" data-bs-target="#kt_modal_free_version">
                                        <input class="form-check-input" v-model="apiSettings.getListsWithApi" type="checkbox" v-else>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-8 fv-row mb-2 fv-plugins-icon-container">
                                        <label class="fw-bold fs-6 mb-2 me-10">Allow accessing leads from third party APIs</label>
                                    </div>
                                    <div class="col-md-4 fv-row mb-2 fv-plugins-icon-container">
                                        <input class="form-check-input" type="checkbox" v-if="profile_details.product_permissions=='free'" data-bs-toggle="modal" data-bs-target="#kt_modal_free_version">
                                        <input class="form-check-input" v-model="apiSettings.getLeadsWithApi" type="checkbox" v-else>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary" id="kt_submit_setting_form">
            <span class="indicator-label">Save</span>
            <span class="indicator-progress">Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
        </button>
    </form>
    `,

    props: ['profile_details'],

    data: () => ({
        emailTiming: {
            mailAtChunk: 20,
            maxEmailsSent: 30,
            cronDelay: 1,
            asyncCronMailer: false,
            cronType: "script",
            crossOriginDomains: null,
        },
        apiSettings: {
            apiKey: null,
            getListsWithApi: false,
            getLeadsWithApi: false,
        },
        global_smtp: null,
        all_smtps: [],
        currentVersion: null,
        installUrl: null,
        scriptBased: null,
        urlBased: null,
        submit_button: null,
        _token: document.querySelector('meta[name="__token"]').getAttribute('content')
    }),

    mounted() {
        this.submit_button = document.querySelector("#kt_submit_setting_form");
        let __this = this;
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-setting="tooltip"]'));
        $('[data-bs-toggle="tooltip"]').tooltip();
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            new ClipboardJS(tooltipTriggerEl, {
                target: tooltipTriggerEl,
                text: function () {
                    if (tooltipTriggerEl.value) return tooltipTriggerEl.value;
                    return tooltipTriggerEl.innerText;
                }
            });
            return;
        });
        this.getSettingSetup();
        this.apiKeyMethod();
        document.querySelector("#mlr_settings_form").addEventListener("submit", function (evt) {
            evt.preventDefault();
            __this.saveSetting();
        });
    },

    methods: {
        getSettingSetup() {
            this.submit_button.setAttribute("data-kt-indicator", "on");
            this.submit_button.disabled = !0;
            axios.post("setting", {
                type: 'get',
                from: 'setting'
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': this._token
                }
            }).then((res) => {
                let data = res.data
                if (data) {
                    this.emailTiming = data.emailTiming;
                    this.apiSettings = data.apiSettings;
                    this.installUrl = data.installUrl;
                    this.scriptBased = data.scriptBased;
                    this.urlBased = data.urlBased;
                    this.currentVersion = data.currentVersion;
                    this.global_smtp = data.global_smtp;
                    this.all_smtps = data.all_smtps;
                }
            }).catch((error) => { }).finally(() => {
                this.submit_button.removeAttribute("data-kt-indicator");
                this.submit_button.disabled = 0;
            })
        },

        apiKeyMethod() {
            let __this = this
            document.querySelector('[data-setting-button="apiKey"]').addEventListener("click", function () {
                const oldValue = __this.api_key;
                axios.post("setting", {
                    type: 'update',
                    from: "help",
                    api_key: __this.apiSettings.apiKey
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': __this._token
                    }
                }).then((res) => {
                    let data = res.data
                    if (data.api_key != oldValue) {
                        __this.apiSettings.apiKey = data.api_key
                    } else {
                        swal_fire("", "error", "Unable to create the api key")
                    }
                }).catch((error) => {
                    swal_fire("", "error", "Unable to create the api key")
                })
            })
        },

        saveSetting() {

            this.submit_button.setAttribute("data-kt-indicator", "on");
            this.submit_button.disabled = !0;
            let __this = this;

            axios.post("setting", {
                type: 'update',
                from: "setting",
                emailTiming: __this.emailTiming,
                apiSettings: __this.apiSettings,
                global_smtp: __this.global_smtp
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': __this._token
                }
            }).then((res) => {
                let data = res.data
                if (data.status) {
                    swal_fire("", "success", "Updated successfully")
                } else {
                    swal_fire("", "error", "Unable to save setting")
                }
            }).catch((error) => {
                swal_fire("", "error", "Something went wrong")
            }).then(() => {
                __this.submit_button.removeAttribute("data-kt-indicator");
                __this.submit_button.disabled = 0;
            })
        }
    },
}