import Editor3 from "../theme_editor/Editor3.js";
export default {
    template: `
    <div class="modal bg-white fade" id="mlr_design_emailbody" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
        <div class="modal-content shadow-none">
            <div class="modal-header">
                <h5 class="modal-title">Choose template</h5>
                <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                    <span class="svg-icon svg-icon-2x">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
                            <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="modal-body" id="mlr_tab_modal_body">
                <div class="card">
                    <div class="card-header card-header-stretch justify-content-center">
                        <div class="card-toolbar">
                            <ul class="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0">
                                <li class="nav-item">
                                    <a class="nav-link active" data-select-tab="template" @click="currentStep='pre'" data-bs-toggle="tab" href="#mlr_tab_pane_predesigned">Predesigned templates</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-select-tab="template" @click="currentStep='blank'" data-bs-toggle="tab" href="#mlr_tab_pane_blanktemplates">Blank templates</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-select-tab="template" @click="currentStep='html'" data-bs-toggle="tab" href="#mlr_tab_pane_htmleditor">HTML editor</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body" id="mlr_tab_card_body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="mlr_tab_pane_predesigned" role="tabpanel">
                                <!-- Start::Show all categories and sort and seach button -->
                                <div class="d-flex justify-content-between mb-5 flex-wrap align-items-center">
                                    <!-- Start::Show all categories -->
                                    <div class="dropdown">
                                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">{{template_download.choosed_category.tag}}</a>
                                        <ul class="dropdown-menu">
                                            <li><a class="nav-link dropdown-item" href="#" @click="change_category('all')">All categories</a></li>
                                        </ul>
                                    </div>

                                    <div class="search-icon">
                                        <div class="d-flex align-items-center position-relative my-1">
                                            <span class="svg-icon svg-icon-1 position-absolute ms-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                                                </svg>
                                            </span>
                                            <input type="text" data-mlr-template-filter="search" class="form-control form-control-solid mw-250px ps-14" placeholder="Search template" @change="change_category(template_download.choosed_category.normal, $event.target.value)" >
                                        </div>
                                    </div>
                                </div>
                                <!-- End::Show all categories and sort and seach button -->

                                <div class="d-flex flex-row align-items-center flex-wrap justify-content-around">
                                    <!--begin::Card-->
                                    <div class="card mw-350px rounded shadow-md" v-for="(value, index) in template_download.values[0]" :key="index" style="margin: 0px 18px 40px;">
                                        <div class="overlay overflow-hidden">
                                            <div class="overlay-wrapper">
                                                <div :style="{'background-image': 'url('+value.img+')', 'height': '400px', 'width':'300px', 'background-size': 'cover'}"></div>
                                            </div>
                                            <div class="overlay-layer bg-dark bg-opacity-50">
                                                <a :href="value.preview_url" target="_BLANK" class="btn btn-primary btn-shadow">Preview</a>
                                                <button type="button" href="#" class="btn btn-light-primary btn-shadow ms-2" @click="template_use_button(value.template_index)">
                                                    <span class="indicator-label">Use template</span>
                                                    <span class="indicator-progress">Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                                </button>
                                            </div>
                                            <!--<div class="overlay-layer bg-dark bg-opacity-50 rounded" v-else >
                                                <a :href="value.preview_url" target="_BLANK" class="btn btn-primary btn-shadow">Upgrade to PRO</a>
                                            </div>-->
                                        </div>
                                        <div class="card-body border border-secondary p-3" style="border-bottom-left-radius:0.475rem;border-bottom-right-radius:0.475rem;">
                                            <p class="card-text text-center text-muted fs-2">{{value.name}}</p>
                                        </div>
                                    </div>
                                    <!--end::Card-->
                                </div>
                            </div>

                            <div class="tab-pane fade" id="mlr_tab_pane_blanktemplates" role="tabpanel">

                                <div class="d-flex flex-row align-items-center flex-wrap justify-content-center">
                                    <!--begin::Card-->
                                    <div class="card mw-350px rounded shadow-md" v-for="(value, index) in template_download.values[1]" :key="index" style="margin: 0px 18px 40px;">
                                        <div class="overlay overflow-hidden">
                                            <div class="overlay-wrapper">
                                                <div :style="{'background-image': 'url('+value.img+')', 'height': '400px', 'width':'300px', 'background-size': 'cover'}"></div>
                                            </div>
                                            <div class="overlay-layer bg-dark bg-opacity-50">
                                                <a :href="value.preview_url" target="_BLANK" class="btn btn-primary btn-shadow">Preview</a>
                                                <button type="button" href="#" class="btn btn-light-primary btn-shadow ms-2" @click="template_use_button(value.template_index)">
                                                    <span class="indicator-label">Use template</span>
                                                    <span class="indicator-progress">Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                                </button>
                                            </div>
                                            <!--<div class="overlay-layer bg-dark bg-opacity-50 rounded" v-else >
                                                <a :href="value.preview_url" target="_BLANK" class="btn btn-primary btn-shadow">Upgrade to PRO</a>
                                            </div>-->
                                        </div>
                                        <div class="card-body border border-secondary p-3" style="border-bottom-left-radius:0.475rem;border-bottom-right-radius:0.475rem;">
                                            <p class="card-text text-center text-muted fs-2">{{value.name}}</p>
                                        </div>
                                    </div>
                                    <!--end::Card-->
                                </div>
                            </div>

                            <div class="tab-pane fade" id="mlr_tab_pane_htmleditor" role="tabpanel">
                                <div class="row">
                                    <div class="col-md-6 shadow-lg px-0">
                                        <div id="html_editor" @keyup="handle_html_editor" style="position: relative; width: 100%; height: 73vh;"></div>
                                    </div>
                                    <div class="col-md-6 shadow-lg px-0">
                                        <iframe ref="preview_html" style="height:100%; width: 100%;"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer" id="mlr_template_modal_footer">
                <button type="button" class="btn btn-light" v-if="currentStep=='html'" @click="htmlProceed()">Proceed to next</button>
                <button type="button" class="btn btn-light" @click="currentStep=='pre'" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<editor3 v-if="editor_init" :index="template_index" :body="cache_body" @editor_init="emit_data($event)" @body="cache_body=$event" />
    `,

    props: ["body", "is_editor_init"],

    components: {
        "editor3": Editor3
    },

    created() {
        this.getAllCategories();
    },

    data() {
        return {
            _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
            template_download: {
                choosed_category: {
                    tag: "All categories",
                    normal: "all"
                },
                values: [],
                is_search: true
            },
            template_index: null,
            editor_init: false,
            currentStep: "pre",
            modal_init: null,
            cache_body: null,
            editor_html_init: null
        }
    },

    mounted() {
        this.handleModel();
        if (localStorage.getItem("sendster_all_templates")) {
            let session_data = JSON.parse(atob(localStorage.getItem("sendster_all_templates")));
            this.template_download.values = session_data;
        }
        this.editor_html_init = ace.edit("html_editor");
        this.editor_html_init.setOptions({
            theme: 'ace/theme/tomorrow_night'
        });
        this.editor_html_init.setValue(this.body);
        this.handle_html_editor();
    },

    unmounted() {
        this.$emit("changed_init");
        this.$emit("changed_body", this.cache_body);
        this.editor_init = false;
    },

    methods: {
        htmlProceed() {
            if (this.editor_html_init.getValue().trim() === "") {
                swal_fire("", "warning", "Please enter the email body or choose template.");
                return;
            }
            this.cache_body = this.editor_html_init.getValue();
            this.template_index = "html";
            this.template_download.values = [];
            this.editor_init = true;
        },
        emit_data(event) {
            this.editor_init = false;
            this.modal_init.hide();
            this.$emit("changed_init");
            this.$emit("changed_body", this.cache_body);
        },
        getAllCategories() {
            axios.post("campaign", {
                campaign_type: "show_templates",
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': this._token
                }
            }).then((res) => {
                let post_data = res.data;
                this.template_download.values = post_data;
                localStorage.setItem("sendster_all_templates", btoa(JSON.stringify(post_data)));
            }).catch((error) => {
                swal_fire("", "error", error.response.data.message);
            }).finally(() => {
                this.template_download.is_search = false;
            });
        },

        change_category(category = "all", is_search = "") {
            if (category != this.template_download.choosed_category) {
                axios.post("campaign", {
                    campaign_type: "show_templates",
                    category: category,
                    is_search: is_search
                }).then((res) => {
                    this.template_download.values = res.data;
                });

                this.template_download.choosed_category.normal = category;

                if (category == 'all') {
                    this.template_download.choosed_category.tag = "All categories";
                } else if (category == "forgotpassword") {
                    this.template_download.choosed_category.tag = "Forgot password";
                } else if (category == "orderform") {
                    this.template_download.choosed_category.tag = "Order form";
                } else if (category == "confirm") {
                    this.template_download.choosed_category.tag = "Confirmation";
                } else if (category == "cancel") {
                    this.template_download.choosed_category.tag = "Cancellation";
                } else if (category == "thankyou") {
                    this.template_download.choosed_category.tag = "Thank you";
                } else if (category == "tandc") {
                    this.template_download.choosed_category.tag = "Terms and conditions";
                } else if (category == "privacy_policy") {
                    this.template_download.choosed_category.tag = "Privacy policy";
                } else {
                    this.template_download.choosed_category.tag = category.charAt(0).toUpperCase() + category.slice(1);
                }
            }
        },

        handleModel() {
            let __this = this;
            let modal = document.getElementById("mlr_design_emailbody");
            let closeBtns = modal.querySelectorAll('[data-bs-dismiss="modal"]');
            this.modal_init = new bootstrap.Modal(modal);
            this.modal_init.show();

            closeBtns.forEach(btn => {
                btn.addEventListener("click", function () {
                    __this.$emit("changed_init");
                    __this.$emit("changed_body", __this.body);
                });
            });

            this.templateTabInit(modal);
        },

        template_use_button(id) {
            this.template_index = id;
            this.editor_init = true;
            this.template_download.values = [];
        },

        templateTabInit(parent) {
            const all_tabs = parent.querySelectorAll('[data-select-tab="template"]');
            all_tabs.forEach((value) => {
                value.addEventListener("click", (e) => {
                    e.preventDefault();
                    (e.target.getAttribute("href") == "#mlr_tab_pane_htmleditor") ? (document.getElementById('mlr_tab_card_body').classList.add("p-0"), document.getElementById("mlr_tab_modal_body").classList.add("p-0"), document.getElementById("mlr_template_modal_footer").classList.remove("d-none")) : (document.getElementById('mlr_tab_card_body').classList.remove("p-0"), document.getElementById("mlr_tab_modal_body").classList.remove("p-0"), document.getElementById("mlr_template_modal_footer").classList.add("d-none"));
                })
            });
        },

        handle_html_editor() {
            const iframe = this.$refs.preview_html;
            const previewDocument = iframe.contentDocument || iframe.contentWindow.document;
            previewDocument.body.innerHTML = this.editor_html_init.getValue();
        },
    },

    emits: ['changed_init', 'changed_body']
}