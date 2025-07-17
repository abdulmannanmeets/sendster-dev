function swal_fire(KTUtil = "", icon = "error", text = "Sorry, look like there are some errors detected, please try again") {
    Swal.fire({
        text: text,
        icon: icon,
        buttonsStyling: !1,
        confirmButtonText: "Ok, got it!",
        customClass: {
            confirmButton: "btn btn-primary"
        }
    }).then((function () {
        (typeof KTUtil === "string") ? null : KTUtil.scrollTop()
    }));
}

function getFullUrl() {
    let url = window.location.href;
    return url.substr(0, url.lastIndexOf('/'));
}

function extractPlainText(html) {
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
    html = html.replace(/<\/?[^>]+(>|$)/g, '\n');
    html = html.replace(/\n+/g, '\n').trim();
    return html;
}

function addBlankFormValidator() {
    FormValidation.validators.onlyBlankSpaces = function () {
        return {
            validate: (input) => {
                let strValue = input.field.replace(/[_-]/g, " ");
                strValue = strValue.charAt(0).toUpperCase() + strValue.slice(1);
                if (input.value.trim().length === 0) {
                    return {
                        valid: 0,
                        message: strValue + " is required"
                    };
                }
                return { valid: 1 };
            }
        }
    }

    FormValidation.validators.emailCheck = function () {
        return {
            validate: function (input) {
                const regexForEmails = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                let strValue = input.field.replace(/[_-]/g, " ");

                if (input.value.trim().length === 0) {
                    return {
                        valid: 0,
                        message: strValue + " is required"
                    }
                }

                if (!regexForEmails.test(input.value)) {
                    return {
                        valid: 0,
                        message: "The value is not a valid email address"
                    }
                }

                return { valid: 1 }
            }
        }
    }

    FormValidation.validators.passwordCheck = function () {
        return {
            validate: function (input) {
                const regexForPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                const regexForSpace = /^\S.*\S$/;
                let strValue = input.field.replace(/[_-]/g, " ");

                if (input.value.trim().length === 0) {
                    return {
                        valid: 0,
                        message: strValue + " is required"
                    }
                }

                if (!regexForPassword.test(input.value)) {
                    return {
                        valid: 0,
                        message: "The password atleast 8 characters, should include one alphabet, number and special character"
                    }
                }

                return { valid: 1 }
            }
        }
    }

    FormValidation.validators.validURL = function () {
        return {
            validate: function (input) {
                const regexForURL = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([a-zA-Z0-9.-]+(?:\.[a-zA-Z]{2,})?)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
                let strValue = input.field.replace(/[_-]/g, " ");

                if (input.value.trim().length === 0) {
                    return {
                        valid: 0,
                        message: strValue + " is required"
                    }
                }

                if (!regexForURL.test(input.value)) {
                    return {
                        valid: 0,
                        message: "Invalid url"
                    }
                }

                return { valid: 1 }
            }
        }
    }
}

function controlPageLoading(show = true) {
    if (show) {
        // Enable
        document.body.classList.add("page-loading");
        document.body.setAttribute("data-kt-app-page-loading", "on");
    } else {
        // Disable
        document.body.classList.remove("page-loading");
        document.body.removeAttribute("data-kt-app-page-loading");
    }
}

function addDatatableData(dt, data) {
    var existingRows = dt.rows().data().toArray();
    // Clear the DataTable
    dt.clear();

    // Add the new row data at the first position
    dt.row.add(data);

    // Add the existing rows after the new row
    existingRows.forEach(function (rowData) {
        dt.row.add(rowData);
    });

    // Redraw the DataTable
    dt.draw();
}

/* Alert and popup Swal with animation */
function setSwalMixin(message, iconName, timeValue = 2000) {
    var toastMixin = Swal.mixin({
        toast: true,
        icon: iconName,
        title: 'Message',
        position: 'top-right',
        showConfirmButton: false,
        timer: timeValue,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    toastMixin.fire({
        title: message
    });
}

function show_extrafields(data) {
    let swal_html = ``
    try {
        let custom_fields = JSON.parse(extra_fields)
        if (custom_fields.length > 0) {
            let thead_tr = ``
            let tbody_tr = ``
            custom_fields.forEach((value, index) => {
                thead_tr += `<th>${value.property}</th>`
                tbody_tr += `<td>${value.value}</td>`
            })
            swal_html = `<div class="card-body py-4 p-0 leads_extra_fields"><table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"><thead><tr class="">${thead_tr}</tr></thead><tbody class="text-gray-600 fw-bold"><tr <tr class="text-center text-muted fw-bolder fs-7 text-uppercase gs-0">${tbody_tr}</tr></tbody></table></div>`;
        } else {
            swal_html = `<div class="table-responsive"><table class="table table-striped"><thead>No data found</thead></table></div>`;
        }
    } catch (err) {
        swal_html = `<div class="table-responsive"><table class="table table-striped"><thead>No data found</thead></table></div>`;
    }

    Swal.fire({
        title: 'Custom Data <hr>',
        html: swal_html,
        width: '800px',
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>'
    });
}

function setScript(url, id, type = "script") {
    if(document.getElementById(id)) return;
    if (type == "css") {
        var style = document.createElement("style"),
            head = document.head || document.getElementsByTagName('head')[0]
        head.appendChild(style)
        style.setAttribute('type', 'text/css')
        style.setAttribute('id', id)
        if (style.styleSheet) {
            style.styleSheet.cssText = url
        } else {
            style.appendChild(document.createTextNode(url));
        }
    } else if (type == "script") {
        let add_script = document.createElement("script");
        add_script.setAttribute("src", url);
        add_script.setAttribute("id", id);
        document.head.appendChild(add_script);
    } else {
        let add_link = document.createElement("link");
        add_link.setAttribute("href", url);
        add_link.setAttribute("rel", "stylesheet");
        add_link.setAttribute("id", id);
        document.head.appendChild(add_link);
    }
}

function deleteScript(id) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.getElementById(id);
    if (script != null) { head.removeChild(script); }
}

function loadTinyEditor(ref = "", selector_name, css = "", placeholder = "", height = 400, extra = null) {
    let _style = "";
    try {
        let doc = document.createElement("div");
        doc.innerHTML = css;
        doc.querySelectorAll("style").forEach(style => {
            _style += style.innerHTML;
        });
    } catch (err) { console.log(err); }

    let snippets = [];
    let loadSnippets = function (cb = false) {
        let doFormat = (snips) => {
            snippets = snips.map(d => {
                return {
                    type: 'choiceitem',
                    text: d.title,
                    value: `[snippet ${d.id}]`
                }
            });
        };
        try {
            if (GLOBAL_SNIPPETS !== undefined && Array.isArray(GLOBAL_SNIPPETS) && GLOBAL_SNIPPETS.length > 0) {
                doFormat(GLOBAL_SNIPPETS);
            }
        } catch (err) { }

        if (Array.isArray(snippets) && snippets.length > 0) {
            if (typeof (cb) === 'function') { cb(snippets); }
            return;
        }

        axios.post('snippet', {
            snippet_type: "get",
            snippets: []
        }).then((res) => {
            let data = res.data.message;
            try {
                if (Array.isArray(data) && data.length > 0) {
                    doFormat(data);
                }
            } catch (err) { console.log(err); }

            if (typeof (cb) === 'function') {
                cb(snippets);
            }
        });
    };
    let toolbar = "undo redo | link image | code | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | snippets | " + (extra ? "check_spam" : "");

    loadSnippets();
    let ob = tinymce.init({
        selector: selector_name,
        convert_urls: false,
        height,
        mode: "textareas",
        theme: "silver",
        theme_advanced_path: false,
        entity_encoding: "raw",
        plugins: 'image,link,code,table,lists',
        paste_data_images: true,
        toolbar: toolbar,
        branding: false,

        content_style: `${_style}`,
        // enable title field in the Image dialog
        image_title: true,
        images_upload_url: '/upload/tiny',
        automatic_uploads: false,

        setup: function (editor) {
            editor.ui.registry.addSplitButton('snippets', {
                text: 'Snippets',
                onAction: function () {
                    // editor.insertContent('<p>You clicked the main button</p>');
                },
                onItemAction: function (api, value) {
                    editor.insertContent(value);
                },
                fetch: function (cb) {
                    loadSnippets(cb);
                }
            });
            editor.ui.registry.addButton('check_spam', {
                text: 'Check spam score',
                class: 'text-primary',
                onAction: function () {
                    if ($.trim(editor.getContent()).length == 0) {
                        Swal.fire({
                            text: "Please provide the email body!",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                        });
                        return;
                    }
                    let modal_data = document.getElementById("modal_data_status");
                    modal_data.innerHTML = `<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>`;

                    document.getElementById("show_check_smtp_modal").click();
                    axios.post("check_spam", {
                        email: editor.getContent(),
                    }, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-CSRF-Token': document.querySelector('meta[name="__token"]').getAttribute('content')
                        }
                    }).then((res) => {
                        let data = res.data, score = data.score;
                        if (data.is_spam) {
                            modal_data.innerHTML = "The given email body found spam with the spam score " + score;
                        } else {
                            modal_data.innerHTML = "No spam word detected.";
                        }
                    });
                },
            });
        },

        images_upload_handler: async function (blobInfo, success, failure) {
            var formData = new FormData();
            formData.append('ref', ref);
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            try {
                let full_url = getFullUrl() + '/tiny_upload';
                const response = await axios.post(full_url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                if (response.status != 200) {
                    failure(response.data)
                    return
                }

                if (!response.data || typeof response.data.location != 'string') {
                    failure('Invalid JSON: ' + response.data);
                    return;
                }

                if (!response.data.status) {
                    failure('Unable to upload');
                    return;
                }
                success(response.data.location)
            } catch (error) {
                failure('Unable to upload: ' + error.message)
                return
            }
        },
    });

    return ob;
}

function loadAndRemoveTinyEditorAssets(load = true, selector = "", extra = null) {
    let _selector = selector;
    if (load) {
        if (document.getElementById("tinymce_min_js") === null || document.getElementById("tinymce_min_js") === undefined) {
            setScript('assets/js/tinymce/tinymce.min.js', 'tinymce_min_js')
        } else {
            return loadTinyEditor("", _selector, "", "", 400, extra);
        }
        document.getElementById("tinymce_min_js").onload = function () {
            return loadTinyEditor("", _selector, "", "", 400, extra);
        }
        try {
            document.addEventListener("focusin", function (event) {
                if (event.target.closest(".tox-dialog__body")) {
                    event.stopImmediatePropagation();
                }
            })
        } catch (err) { }
    } else {
        deleteScript('tinymce_min_js');
    }
}

function loadAndRemoveDrawFlow(load = true) {
    if (load) {
        setScript('assets/lib/drawflow/drawflow.min.css', 'load_drawflow_css', 'link')
        return
    }
    deleteScript('load_drawflow_css')
}

function trimDoubleQuote(str) {
    var err = 0;
    try {
        str = str.trim();
        var chk = 0;
        if (str.indexOf('"') == 0 && str.lastIndexOf('"') == str.length - 1 && str.length > 2) {

            return str.substr(1, str.length - 2);
        }
        else if (str.lastIndexOf(';') == str.length - 1 && str.length > 2) {
            return str.substr(0, str.length - 1);
        }
        else {
            return str;
        }
    }
    catch (e) { ++err; console.log(e.message); }
    if (err > 0) {
        return str;
    }
}

function getLoggedInUserData() {
    let method = axios.post;
    let url = "profile";
    return method(url, { method_type: 'get_logged_in' }).then((res) => {
        let data = res.data;
        if (data.status) {
            delete data.status
            return [1, data]
        }
    }).catch((error) => {
        return [0, error]
    });
}

function hoverAndCopy() {
    document.querySelectorAll("code").forEach((code) => {
        code.onmouseover = function () {
            var range = document.createRange();
            range.selectNode(code);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            code.onclick = function () {
                navigator.clipboard.writeText(code.innerText);
                setSwalMixin("Copied successfully", 'success')
            }
        }
    })
}

function copyValue(text, base64 = false) {
    text = base64 ? atob(text) : text
    navigator.clipboard.writeText(text)
    setSwalMixin("Copied successfully", 'success')
}

function openNewWindow(url) {
    window.open(url, '_blank', 'location=yes,height=600,width=800,scrollbars=yes,status=yes')
}

function hasNoTags(inputString) {
    const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
    return !htmlTagRegex.test(inputString);
}