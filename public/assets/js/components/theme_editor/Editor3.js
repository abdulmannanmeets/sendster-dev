export default {
    template: `
    <div class="modal bg-white fade" id="mlr_design_editor_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content shadow-none">
                <div class="modal-body p-0">
                    <div class="card">
                        <div class="card-body p-0" id="mlr_tab_pane_template_editor">
                            <div id="gjs" class="d-none" style="background:white;height:0px; overflow:hidden"></div>
                            <span class="indicator-progress d-block" id="show_editor_spinner">Please wait...<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                            <div id="personalize-panel" style="display:none">
                                <p><code data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action-copy="true">{name}</code></p>
                                <p><code data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action-copy="true">{first_name}</code></p>
                                <p><code data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action-copy="true">{last_name}</code></p>
                                <p><code data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action-copy="true">{email}</code></p>
                                <p><code data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action-copy="true">{address}</code></p>
                                <p><code data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action-copy="true">{phone}</code></p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-save-button="true">
                        <span class="indicator-label">Save</span>
                        <span class="indicator-progress">Please wait...<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    </button>
                    <button type="button" class="btn btn-light" data-modal-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `,

    props: ["body", "index"],

    emits: ['editor_init', 'body'],

    data() {
        return {
            is_editor3: true,
            cache_body: null,
            editor_inits: null,
            confirmDialog: true,
            modal_init: null
        }
    },

    mounted() {
        this.cache_body = this.body;
        this.handleModel();
        this.template_use_button(this.index);
        let __this = this;
        window.addEventListener('beforeunload', (event) => {
            if (__this.confirmDialog) {
                event.preventDefault();
                event.returnValue = '';
                return 'You have unsaved changes. Are you sure you want to reload this page?';
            }
        });
    },

    beforeUnmount() {
        this.modal_init.hide();
        this.$emit("body", this.cache_body);
        this.$emit("editor_init");
        // localStorage.setItem('body', this.cache_body);
        // this.$store.commit('body', this.cache_body);
        window.removeEventListener('beforeunload', () => { console.log("slskaaslk"); });
        // this.$router.push({ name: "create_campaigns" });
        // window.removeEventListener('beforeunload', () => {console.log("slskaaslk123");});
    },

    methods: {
        handleModel() {
            let modal = document.getElementById("mlr_design_editor_modal");
            let closeBtns = modal.querySelectorAll('[data-modal-dismiss="modal"]');
            this.modal_init = new bootstrap.Modal(modal);
            let __this = this;
            this.modal_init.show();

            closeBtns.forEach(btn => {
                btn.addEventListener("click", function () {
                    if (__this.confirmDialog) {
                        if (confirm("Changes you made may not saved.")) {
                            __this.modal_init.hide();
                            __this.$emit("body", __this.cache_body);
                            __this.$emit("editor_init");
                        }
                    }
                });
            });

            document.querySelector('[data-save-button="true"]').addEventListener("click", function (event) {
                var html = __this.editor_inits.getHtml();
                var css = __this.editor_inits.getCss();
                html = "<style>" + css + "</style>" + html;
                event = event.target;
                __this.modal_init.hide();
                __this.$emit("body", html);
                __this.$emit("editor_init");
                __this.cache_body = html;
            });
        },
        template_use_button(id) {
            var submit_btn = document.querySelector('[data-save-button="true"]');
            submit_btn.setAttribute("data-kt-indicator", "on");
            submit_btn.disabled = 1;
            if (id !== 'html') {
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
                    this.cache_body = res;
                }).catch((error) => {
                    swal_fire("", "error", error.response.data.message);
                }).finally(() => {
                    document.getElementById("show_editor_spinner").classList.add("d-none");
                    document.getElementById("gjs").classList.remove("d-none");
                    this.editorInit();
                    submit_btn.removeAttribute("data-kt-indicator");
                    submit_btn.removeAttribute("disabled");
                });
            } else {
                this.cache_body = this.body;
                document.getElementById("show_editor_spinner").classList.add("d-none");
                document.getElementById("gjs").classList.remove("d-none");
                this.editorInit();
                submit_btn.removeAttribute("data-kt-indicator");
                submit_btn.removeAttribute("disabled");
            }
        },
        editorInit() {
            let __this = this;
            var editor = grapesjs.init({
                height: '89.9vh',
                container: '#gjs',
                showOffsets: true,
                fromElement: true,
                noticeOnUnload: false,
                storageManager: false,
                assetManager: {
                    embedAsBase64: true,
                },
                selectorManager: false,
                styleManager: {
                    sectors: [{
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
                                    className: 'fas fa-align-left'
                                },
                                {
                                    id: 'center',
                                    label: 'Center',
                                    className: 'fas fa-align-center'
                                },
                                {
                                    id: 'right',
                                    label: 'Right',
                                    className: 'fas fa-align-right'
                                },
                                {
                                    id: 'justify',
                                    label: 'Justify',
                                    className: 'fas fa-align-justify'
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
                        ],
                    }, {
                        name: 'Decorations',
                        open: false,
                        properties: [
                            'opacity',
                            'border-radius',
                            'border',
                            'background',
                        ],
                    }],
                },
                plugins: [
                    'gjs-blocks-basic',
                    'grapesjs-plugin-export',
                    'grapesjs-custom-code',
                    'grapesjs-touch',
                    'grapesjs-parser-postcss',
                    'grapesjs-tui-image-editor',
                    'grapesjs-style-bg',
                    'grapesjs-preset-webpage',
                ],
                pluginsOpts: {
                    'gjs-blocks-basic': {
                        flexGrid: true
                    },
                    'grapesjs-tui-image-editor': {
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

            editor.I18n.addMessages({
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

            var pn = editor.Panels;
            var modal = editor.Modal;
            var cmdm = editor.Commands;

            // Update canvas-clear command
            cmdm.add('canvas-clear', function () {
                if (confirm('Are you sure to clear the body')) {
                    editor.runCommand('core:canvas-clear')
                    setTimeout(function () {
                        localStorage.clear();
                        __this.confirmDialog = true;
                    }, 0)
                }
            });

            // Add info command
            var mdlClass = 'gjs-mdl-dialog-sm';
            var infoContainer = document.getElementById('personalize-panel');

            cmdm.add('open-personalize', function () {
                var mdlDialog = document.querySelector('.gjs-mdl-dialog');
                mdlDialog.className += ' ' + mdlClass;
                infoContainer.style.display = 'block';
                modal.setTitle('Personalizations');
                modal.setContent(infoContainer);
                modal.open();
                modal.getModel().once('change:open', function () {
                    mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
                })
            });

            pn.addButton('options', {
                id: 'open-personalize',
                className: 'fas fa-user',
                command: function () {
                    editor.runCommand('open-personalize')
                },
                attributes: {
                    'title': 'Personalization',
                    'data-bs-placement': 'bottom',
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
                        'data-bs-position': 'bottom'
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
                        'data-bs-position': 'bottom'
                    });
                });
            var titles = document.querySelectorAll('*[title]');

            for (var i = 0; i < titles.length; i++) {
                var el = titles[i];
                var title = el.getAttribute('title');
                title = title ? title.trim() : '';
                if (!title)
                    break;
                el.setAttribute('data-bs-toggle', "tooltip");
                el.setAttribute('title', title);
            }

            // Store and load events
            editor.on('storage:load', function (e) { editor.setComponents("") });
            editor.on('storage:store', function (e) { });
            editor.on('update', () => {
                __this.confirmDialog = true;
            });

            // Do stuff on load
            editor.on('load', function () {
                var $ = grapesjs.$;

                if (hasNoTags(__this.cache_body)) {
                    __this.cache_body = '<div style="padding: 10px;">' + __this.cache_body + "</div>";
                }

                var component = editor.DomComponents.addComponent({
                    content: __this.cache_body,
                });

                editor.setComponents(__this.cache_body);

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
                    '<div class="gjs-sm-sector-title"><div class="gjs-sm-sector-caret"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M7,10L12,15L17,10H7Z"></path></svg></div> <span class="gjs-sm-sector-label">Settings</span></div>' +
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
                    traitsSector.toggleClass('gjs-sm-open');
                });

                // Open block manager
                var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
                openBlocksBtn && openBlocksBtn.set('active', 1);

                hoverAndCopy();
            });
            this.editor_inits = editor;
        },
    },
}