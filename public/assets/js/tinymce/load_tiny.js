function loadTinyEditor(ref = "", selector_name, css = "", height = 400) {
    let _style = ""
    try {
        let doc = document.createElement("div");
        doc.innerHTML = css;
        doc.querySelectorAll("style").forEach(style => {
            _style += style.innerHTML;
        });
    } catch (err) { console.log(err); }

    let snippets = [];

    let ob = tinymce.init({
        selector: selector_name,
        convert_urls: false,
        entity_encoding: "raw",
        height,
        plugins: 'image,link,code,table,lists',
        toolbar: 'undo redo | link image | code | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | snippets | help',

        content_style: `${_style}`,
        // enable title field in the Image dialog
        image_title: true,
        images_upload_url: '/upload/tiny',
        automatic_uploads: false,

        setup: function (editor) {
            editor.ui.registry.addSplitButton('snippets', {
                text: 'Snippets',
                onAction: function () {
                    //editor.insertContent('<p>You clicked the main button</p>');
                },
                onItemAction: function (api, value) {
                    editor.insertContent(value);
                },
                fetch: function (cb) {
                    // loadSnippets(cb);
                }
            });
        },

        images_upload_handler: function (blobInfo, success, failure) {
            var xhr, formData;

            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', '/upload/tiny');

            xhr.onload = function () {
                var json;

                if (xhr.status != 200) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                }

                json = JSON.parse(xhr.responseText.trim());

                if (!json || typeof json.location != 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }

                success(json.location);
            };

            formData = new FormData();
            formData.append('ref', ref);
            console.log(blobInfo.blob());
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            xhr.send(formData);
        },
    });

    return ob;
}