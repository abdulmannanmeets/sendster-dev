import '../../../lib/grapesjs/all_grapejs.js';
export default {
    template: `
<div class="modal bg-white fade" id="mlr_design_emailbody" tabindex="-1">
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
                                    <a class="nav-link" data-select-tab="template" data-bs-toggle="tab" href="#mlr_tab_pane_blanktemplates">Blank templates</a>
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
                                    <div class="card mw-350px rounded shadow-lg" v-for="(value, index) in template_download.values" :key="index" style="margin: 0px 18px 40px;">
                                        <div class="overlay overflow-hidden">
                                            <div class="overlay-wrapper">
                                                <div :style="{'background-image': 'url('+value.img+')', 'height': '400px', 'width':'300px', 'background-size': 'cover'}"></div>
                                            </div>
                                            <div class="overlay-layer bg-dark bg-opacity-50">
                                                <a :href="value.preview_url" target="_BLANK" class="btn btn-primary btn-shadow">Preview</a>
                                                <button type="button" href="#" class="btn btn-light-primary btn-shadow ms-2" @click="template_use_button($event, value.template_index)">
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
                                Blank templates
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
    `,
    props: {
        body: {
            required: true,
            default: null
        }
    },
    data() {
        return {
            editor_init: null,
            editor_html_init: null,
            currentStep: "pre",
            template_download: {
                choosed_category: {
                    tag: "All categories",
                    normal: "all"
                },
                values: [],
                is_search: true
            },
        }
    },
    mounted() {
        document.querySelector('[mlr-button-body="true"]').addEventListener("click", function (evt) {
            evt.preventDefault();
            if (localStorage.getItem("sendster_all_templates")) {
                let session_data = JSON.parse(atob(localStorage.getItem("sendster_all_templates")));
                __this.template_download.values = session_data;
            }
        });
        this.editor_html_init = ace.edit("html_editor");
        this.editor_html_init.setOptions({
            theme: 'ace/theme/tomorrow_night'
        });
    },
    methods: {
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
                // localStorage.setItem("sendster_all_templates", btoa(JSON.stringify(post_data)));
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
        handle_html_editor() {
            const iframe = this.$refs.preview_html;
            const previewDocument = iframe.contentDocument || iframe.contentWindow.document;
            previewDocument.body.innerHTML = this.editor_html_init.getValue();
        },
        template_use_button(__this, id) {
            let show_editor_btn = document.getElementById("show_editor_modal");
            show_editor_btn.click();
            this.template_download.values = [];
            axios.post("campaign", {
                campaign_type: "get_html",
                id: id
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': this._token
                }
            }).then((res) => {
                res = res.data;
                this.$emit("body", res);
                this.editorInit();
            }).catch((error) => {
                swal_fire("", "error", error.response.data.message);
            }).finally(() => {
            });
        },
        templateTabInit() {
            const all_tabs = document.querySelectorAll('[data-select-tab="template"]');
            all_tabs.forEach((value) => {
                value.addEventListener("click", (e) => {
                    e.preventDefault();
                    (e.target.getAttribute("href") == "#mlr_tab_pane_htmleditor") ? (document.getElementById('mlr_tab_card_body').classList.add("p-0"), document.getElementById("mlr_tab_modal_body").classList.add("p-0"), document.getElementById("mlr_template_modal_footer").classList.remove("d-none")) : (document.getElementById('mlr_tab_card_body').classList.remove("p-0"), document.getElementById("mlr_tab_modal_body").classList.remove("p-0"), document.getElementById("mlr_template_modal_footer").classList.add("d-none"));
                })
            });
        },
        htmlProceed() {
            if (this.editor_html_init.getValue().trim() === "") {
                swal_fire("", "warning", "Please enter the email body or choose template.");
                return;
            }
            this.create_item.email_body.body = this.editor_html_init.getValue();
            document.getElementById("show_editor_modal").click();
            this.template_download.values = [];
            document.getElementById("navbar").classList.remove("d-none");
            document.getElementById("editor").classList.remove("d-none");
            document.querySelector("#mlr_tab_pane_template_editor .navbar").classList.remove("d-none");
        },
        editorInit() {
            let __this = this;
            if (!this.editor_init) {
                this.editor_init = grapesjs.init({
                    height: '100vh',
                    container: '#gjs',
                    fromElement: true,
                    showOffsets: true,
                    assetManager: {
                        embedAsBase64: true,
                    },
                    fromElement: true,
                    storageManager: null,
                    selectorManager: {
                        componentFirst: true
                    },
                    styleManager: {
                        sectors: [{
                            name: 'General',
                            properties: [{
                                extend: 'float',
                                type: 'radio',
                                default: 'none',
                                options: [{
                                    value: 'none',
                                    className: 'fa fa-times'
                                },
                                {
                                    value: 'left',
                                    className: 'fa fa-align-left'
                                },
                                {
                                    value: 'right',
                                    className: 'fa fa-align-right'
                                }
                                ],
                            },
                                'display',
                            {
                                extend: 'position',
                                type: 'select'
                            },
                                'top',
                                'right',
                                'left',
                                'bottom',
                            ],
                        }, {
                            name: 'Dimension',
                            open: false,
                            properties: [
                                'width',
                                {
                                    id: 'flex-width',
                                    type: 'integer',
                                    name: 'Width',
                                    units: ['px', '%'],
                                    property: 'flex-basis',
                                    toRequire: 1,
                                },
                                'height',
                                'max-width',
                                'min-height',
                                'margin',
                                'padding'
                            ],
                        }, {
                            name: 'Typography',
                            open: false,
                            properties: [
                                'font-family',
                                'font-size',
                                'font-weight',
                                'letter-spacing',
                                'color',
                                'line-height',
                                {
                                    extend: 'text-align',
                                    options: [{
                                        id: 'left',
                                        label: 'Left',
                                        className: 'fa fa-align-left'
                                    },
                                    {
                                        id: 'center',
                                        label: 'Center',
                                        className: 'fa fa-align-center'
                                    },
                                    {
                                        id: 'right',
                                        label: 'Right',
                                        className: 'fa fa-align-right'
                                    },
                                    {
                                        id: 'justify',
                                        label: 'Justify',
                                        className: 'fa fa-align-justify'
                                    }
                                    ],
                                },
                                {
                                    property: 'text-decoration',
                                    type: 'radio',
                                    default: 'none',
                                    options: [{
                                        id: 'none',
                                        label: 'None',
                                        className: 'fa fa-times'
                                    },
                                    {
                                        id: 'underline',
                                        label: 'underline',
                                        className: 'fa fa-underline'
                                    },
                                    {
                                        id: 'line-through',
                                        label: 'Line-through',
                                        className: 'fa fa-strikethrough'
                                    }
                                    ],
                                },
                                'text-shadow'
                            ],
                        }, {
                            name: 'Decorations',
                            open: false,
                            properties: [
                                'opacity',
                                'border-radius',
                                'border',
                                'box-shadow',
                                'background', // { id: 'background-bg', property: 'background', type: 'bg' }
                            ],
                        }, {
                            name: 'Extra',
                            open: false,
                            buildProps: [
                                'transition',
                                'perspective',
                                'transform'
                            ],
                        }, {
                            name: 'Flex',
                            open: false,
                            properties: [{
                                name: 'Flex Container',
                                property: 'display',
                                type: 'select',
                                defaults: 'block',
                                list: [{
                                    value: 'block',
                                    name: 'Disable'
                                },
                                {
                                    value: 'flex',
                                    name: 'Enable'
                                }
                                ],
                            }, {
                                name: 'Flex Parent',
                                property: 'label-parent-flex',
                                type: 'integer',
                            }, {
                                name: 'Direction',
                                property: 'flex-direction',
                                type: 'radio',
                                defaults: 'row',
                                list: [{
                                    value: 'row',
                                    name: 'Row',
                                    className: 'icons-flex icon-dir-row',
                                    title: 'Row',
                                }, {
                                    value: 'row-reverse',
                                    name: 'Row reverse',
                                    className: 'icons-flex icon-dir-row-rev',
                                    title: 'Row reverse',
                                }, {
                                    value: 'column',
                                    name: 'Column',
                                    title: 'Column',
                                    className: 'icons-flex icon-dir-col',
                                }, {
                                    value: 'column-reverse',
                                    name: 'Column reverse',
                                    title: 'Column reverse',
                                    className: 'icons-flex icon-dir-col-rev',
                                }],
                            }, {
                                name: 'Justify',
                                property: 'justify-content',
                                type: 'radio',
                                defaults: 'flex-start',
                                list: [{
                                    value: 'flex-start',
                                    className: 'icons-flex icon-just-start',
                                    title: 'Start',
                                }, {
                                    value: 'flex-end',
                                    title: 'End',
                                    className: 'icons-flex icon-just-end',
                                }, {
                                    value: 'space-between',
                                    title: 'Space between',
                                    className: 'icons-flex icon-just-sp-bet',
                                }, {
                                    value: 'space-around',
                                    title: 'Space around',
                                    className: 'icons-flex icon-just-sp-ar',
                                }, {
                                    value: 'center',
                                    title: 'Center',
                                    className: 'icons-flex icon-just-sp-cent',
                                }],
                            }, {
                                name: 'Align',
                                property: 'align-items',
                                type: 'radio',
                                defaults: 'center',
                                list: [{
                                    value: 'flex-start',
                                    title: 'Start',
                                    className: 'icons-flex icon-al-start',
                                }, {
                                    value: 'flex-end',
                                    title: 'End',
                                    className: 'icons-flex icon-al-end',
                                }, {
                                    value: 'stretch',
                                    title: 'Stretch',
                                    className: 'icons-flex icon-al-str',
                                }, {
                                    value: 'center',
                                    title: 'Center',
                                    className: 'icons-flex icon-al-center',
                                }],
                            }, {
                                name: 'Flex Children',
                                property: 'label-parent-flex',
                                type: 'integer',
                            }, {
                                name: 'Order',
                                property: 'order',
                                type: 'integer',
                                defaults: 0,
                                min: 0
                            }, {
                                name: 'Flex',
                                property: 'flex',
                                type: 'composite',
                                properties: [{
                                    name: 'Grow',
                                    property: 'flex-grow',
                                    type: 'integer',
                                    defaults: 0,
                                    min: 0
                                }, {
                                    name: 'Shrink',
                                    property: 'flex-shrink',
                                    type: 'integer',
                                    defaults: 0,
                                    min: 0
                                }, {
                                    name: 'Basis',
                                    property: 'flex-basis',
                                    type: 'integer',
                                    units: ['px', '%', ''],
                                    unit: '',
                                    defaults: 'auto',
                                }],
                            }, {
                                name: 'Align',
                                property: 'align-self',
                                type: 'radio',
                                defaults: 'auto',
                                list: [{
                                    value: 'auto',
                                    name: 'Auto',
                                }, {
                                    value: 'flex-start',
                                    title: 'Start',
                                    className: 'icons-flex icon-al-start',
                                }, {
                                    value: 'flex-end',
                                    title: 'End',
                                    className: 'icons-flex icon-al-end',
                                }, {
                                    value: 'stretch',
                                    title: 'Stretch',
                                    className: 'icons-flex icon-al-str',
                                }, {
                                    value: 'center',
                                    title: 'Center',
                                    className: 'icons-flex icon-al-center',
                                }],
                            }]
                        }],
                    },
                    plugins: [
                        'gjs-blocks-basic',
                        'grapesjs-plugin-forms',
                        'grapesjs-plugin-export',
                        'grapesjs-tabs',
                        'grapesjs-custom-code',
                        'grapesjs-touch',
                        'grapesjs-parser-postcss',
                        'grapesjs-tooltip',
                        'grapesjs-tui-image-editor',
                        'grapesjs-typed',
                        'grapesjs-style-bg',
                        'grapesjs-preset-webpage',
                    ],
                    pluginsOpts: {
                        'gjs-blocks-basic': {
                            flexGrid: true
                        },
                        'grapesjs-tui-image-editor': {
                        },
                        'grapesjs-tabs': {
                            tabsBlock: {
                                category: 'Extra'
                            }
                        },
                        'grapesjs-typed': {
                            block: {
                                category: 'Extra',
                                content: {
                                    type: 'typed',
                                    'type-speed': 40,
                                    strings: [
                                        'Text row one',
                                        'Text row two',
                                        'Text row three',
                                    ],
                                }
                            }
                        },
                        'grapesjs-preset-webpage': {
                            modalImportTitle: 'Import Template',
                            modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
                            modalImportContent: function (editor) {
                                return editor.getHtml() + '<style>' + editor.getCss() + '</style>'
                            },
                        },
                    },
                });

                this.editor_init.I18n.addMessages({
                    en: {
                        styleManager: {
                            properties: {
                                'background-repeat': 'Repeat',
                                'background-position': 'Position',
                                'background-attachment': 'Attachment',
                                'background-size': 'Size',
                            }
                        },
                    }
                });

                var pn = this.editor_init.Panels;
                var modal = this.editor_init.Modal;
                var cmdm = this.editor_init.Commands;

                // Update canvas-clear command
                cmdm.add('canvas-clear', function () {
                    if (confirm('Are you sure to clean the canvas?')) {
                        __this.editor_init.runCommand('core:canvas-clear')
                        setTimeout(function () {
                            localStorage.clear();
                        }, 0)
                    }
                });

                // Add info command
                var mdlClass = 'gjs-mdl-dialog-sm';
                var infoContainer = document.getElementById('info-panel');

                cmdm.add('open-info', function () {
                    var mdlDialog = document.querySelector('.gjs-mdl-dialog');
                    mdlDialog.className += ' ' + mdlClass;
                    infoContainer.style.display = 'block';
                    modal.setTitle('About this demo');
                    modal.setContent(infoContainer);
                    modal.open();
                    modal.getModel().once('change:open', function () {
                        mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
                    })
                });

                pn.addButton('options', {
                    id: 'open-info',
                    className: 'fa fa-question-circle',
                    command: function () {
                        __this.editor_init.runCommand('open-info')
                    },
                    attributes: {
                        'title': 'About',
                        'data-tooltip-pos': 'bottom',
                    },
                });

                // Simple warn notifier
                var origWarn = console.warn;
                toastr.options = {
                    closeButton: true,
                    preventDuplicates: true,
                    showDuration: 250,
                    hideDuration: 150
                };
                console.warn = function (msg) {
                    if (msg.indexOf('[undefined]') == -1) {
                        toastr.warning(msg);
                    }
                    origWarn(msg);
                };

                // Add and beautify tooltips
                [
                    ['sw-visibility', 'Show Borders'],
                    ['preview', 'Preview'],
                    ['fullscreen', 'Fullscreen'],
                    ['export-template', 'Export'],
                    ['undo', 'Undo'],
                    ['redo', 'Redo'],
                    ['gjs-open-import-webpage', 'Import'],
                    ['canvas-clear', 'Clear canvas']
                ]
                    .forEach(function (item) {
                        pn.getButton('options', item[0]).set('attributes', {
                            title: item[1],
                            'data-tooltip-pos': 'bottom'
                        });
                    });
                [
                    ['open-sm', 'Style Manager'],
                    ['open-layers', 'Layers'],
                    ['open-blocks', 'Blocks']
                ]
                    .forEach(function (item) {
                        pn.getButton('views', item[0]).set('attributes', {
                            title: item[1],
                            'data-tooltip-pos': 'bottom'
                        });
                    });
                var titles = document.querySelectorAll('*[title]');

                for (var i = 0; i < titles.length; i++) {
                    var el = titles[i];
                    var title = el.getAttribute('title');
                    title = title ? title.trim() : '';
                    if (!title)
                        break;
                    el.setAttribute('data-tooltip', title);
                    el.setAttribute('title', '');
                }


                // Store and load events
                this.editor_init.on('storage:load', function (e) {__this.editor_init.setComponents("")});
                this.editor_init.on('storage:store', function (e) { });

                // Do stuff on load
                this.editor_init.on('load', function () {
                    var $ = grapesjs.$;

                    // Show borders by default
                    pn.getButton('options', 'sw-visibility').set('active', 1);

                    // Load and show settings and style manager
                    var openTmBtn = pn.getButton('views', 'open-tm');
                    openTmBtn && openTmBtn.set('active', 1);
                    var openSm = pn.getButton('views', 'open-sm');
                    openSm && openSm.set('active', 1);

                    // Remove trait view
                    pn.removeButton('views', 'open-tm');

                    // Add Settings Sector
                    var traitsSector = $('<div class="gjs-sm-sector no-select">' +
                        '<div class="gjs-sm-sector-title"><span class="icon-settings fa fa-cog"></span> <span class="gjs-sm-sector-label">Settings</span></div>' +
                        '<div class="gjs-sm-properties" style="display: none;"></div></div>');
                    var traitsProps = traitsSector.find('.gjs-sm-properties');
                    traitsProps.append($('.gjs-trt-traits'));
                    $('.gjs-sm-sectors').before(traitsSector);
                    traitsSector.find('.gjs-sm-sector-title').on('click', function () {
                        var traitStyle = traitsProps.get(0).style;
                        var hidden = traitStyle.display == 'none';
                        if (hidden) {
                            traitStyle.display = 'block';
                        } else {
                            traitStyle.display = 'none';
                        }
                    });

                    // Open block manager
                    var openBlocksBtn = __this.editor_init.Panels.getButton('views', 'open-blocks');
                    openBlocksBtn && openBlocksBtn.set('active', 1);

                    // Move Ad
                    $('#gjs').append($('.ad-cont'));
                });

                this.editor_init.DomComponents.addType('html', {
                    model: {
                      defaults: {
                        tagName: 'div',
                        editable: true,
                        // Other properties
                      }
                    }
                  });
            }
        }
    },
    emits: ['body']
}