export default {
  template: `
  <div class="card">
      <div class="card-body p-lg-17">
          <div class="row mb-3">
              <div class="col-md-12 pe-lg-10">
                  <form id="kt_sequence_form" class="form" action="#">
                      <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll">
                          <div class="row mb-5">
                              <div class="col-md-6 fv-row mb-7 fv-plugins-icon-container">
                                  <label class="required fw-bold fs-6 mb-2">Enter sequence title</label>
                                  <input type="text" id="sequence_title" name="sequence_title" v-model="create_item.title" placeholder="Enter title" class="form-control form-control-solid mb-3 mb-lg-0" />
                              </div>
                              <div class="col-md-6 fv-row mb-7 fv-plugins-icon-container">
                                  <label class="fw-bold fs-6 mb-2">Enter sequence description (Optional)</label>
                                  <input type="text" name="sequence_description" id="sequence_description" v-model="create_item.description" placeholder="Enter sequence detail" class="form-control form-control-solid mb-3 mb-lg-0" />
                              </div>
                          </div>
                          <div class="fv-row mb-7 fv-plugins-icon-container">
                              <label class="required fw-bold fs-6 mb-2">Enter email subject</label>
                              <input type="text" id="email_subject" name="email_subject" v-model="create_item.email_details.subject" placeholder="Enter email subject" class="form-control form-control-solid mb-3 mb-lg-0" />
                          </div>
                          <div class="row mb-5">
                              <div class="col-md-6 fv-row mb-7 fv-plugins-icon-container">
                                  <label class="required fw-bold fs-6 mb-2">Select lists</label>
                                  <input class="form-control form-control-solid" name="select_list" v-model="create_item.email_details.list_ids" data-kt-sequence-list="tagify" />
                              </div>
                              <div class="col-md-6 fv-row mb-7 fv-plugins-icon-container">
                                  <label class="required fw-bold fs-6 mb-2">Select smtps</label>
                                  <input class="form-control form-control-solid" name="select_smtp" v-model="create_item.email_details.smtp_ids" data-kt-sequence-smtp="tagify" />
                              </div>
                          </div>
                          <div class="fv-row mb-7 fv-plugins-icon-container">
                              <label class="required fw-bold fs-6 mb-2">Body of the email</label>
                              <textarea id="email_body" name="email_body" placeholder="Enter email" class="form-control form-control-solid mb-3 mb-lg-0">{{create_item.email_body.body}}</textarea>
                          </div>
                          <div class="fv-row mb-7 fv-plugins-icon-container">
                              <label class="fw-bold fs-6 mb-2">Plain text version</label>
                              <textarea rows="7" id="plain_body" name="plain_body" v-model="create_item.email_body.plain_body" placeholder="Enter plain text version" class="form-control form-control-solid mb-3 mb-lg-0"></textarea>
                          </div>
                          <div class="fv-row mb-7 fv-plugins-icon-container">
                              <label class="fw-bold fs-6 mb-2">Attachments</label>
                              <div class="input-group mb-3">
                                  <input type="file" @change="loadAttachments" class="form-control mb-3 mb-lg-0" />
                                  <div class="input-group-append" v-if="files_init">
                                      <span class="input-group-text bg-primary text-white" style="border-radius: 0 0.475rem 0.475rem 0; cursor:pointer;" @click="uploadAttachments">Upload</span>
                                  </div>
                              </div>
                              <a :href="create_item.attachments.url" v-if="create_item.attachments.url" target="_blank">{{create_item.attachments.name}}</a>
                              <span v-if="create_item.attachments.url">&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt text-danger cursor-pointer" data-bs-toggle="tooltip" data-bs-original-title="Delete this attachment" title="Delete this attachment" aria-label="Delete this attachment" @click="delAttachment(create_item.attachments.url)"></i></span>
                          </div>

                          <div class="fv-row mb-7">
                              <div class="d-flex flex-stack">
                                  <div class="me-5">
                                      <label class="fs-6 fw-bold">Track opens</label>
                                  </div>
                                  <label class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                      <input class="form-check-input" type="checkbox" :checked="create_item.other.track_open" v-model="create_item.other.track_open">
                                      <span class="form-check-label fw-bold text-muted" for="kt_modal_add_customer_billing">{{create_item.other.track_open=='true' ? 'Yes' : 'No'}}</span>
                                  </label>
                              </div>
                          </div>
                          <div class="fv-row mb-7">
                              <div class="d-flex flex-stack">
                                  <div class="me-5">
                                      <label class="fs-6 fw-bold">Track clicks</label>
                                  </div>
                                  <label class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                      <input class="form-check-input" type="checkbox" checked="checked" v-model="create_item.other.track_click">
                                      <span class="form-check-label fw-bold text-muted" for="kt_modal_add_customer_billing">{{create_item.other.track_click ? 'Yes' : 'No'}}</span>
                                  </label>
                              </div>
                          </div>
                          <div class="fv-row mb-7">
                              <div class="d-flex flex-stack">
                                  <div class="me-5">
                                      <label class="fs-6 fw-bold">Send mail</label>
                                  </div>
                                  <label>
                                    <select v-model="create_item.other.send_after" name="send_after" class="form-select mb-2" tabindex="-1" aria-hidden="true">
                                        <option value="during">During subscription</option>
                                        <option v-for="i in 365" :key="i" :value="i">After {{i}} days</option>
                                    </select>
                                  </label>
                              </div>
                          </div>
                      </div>
                      <div class="pt-5">
                          <button type="submit" class="btn btn-primary" id="kt_submit_sequence_form">
                              <span class="indicator-label">Submit</span>
                              <span class="indicator-progress">Please wait...
                                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                              </span>
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
  `,
  data() {
    return {
      _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
      smtps: [],
      lists: [],
      create_item: {
        head: 'Create',
        id: '0',
        type: "create",
        title: "",
        description: "",
        email_details: {
          subject: '',
          list_ids: '',
          smtp_ids: '',
        },
        email_body: {
          plain_body: '',
          body: '',
        },
        attachments: {
          name: '',
          url: ''
        },
        other: {
          track_open: 'true',
          track_click: 'true',
          send_after: 'during'
        }
      },
      percentCompleted: 0,
      files: [],
      files_init: false
    }
  },

  created() {
    this.getListandSmtp()
  },

  unmounted() {
    loadAndRemoveTinyEditorAssets(false)
  },

  mounted() {
    let query = this.$route.query
    let method = axios.post

    if (query.id !== undefined && query.id !== "") {
      this.create_item.id = query.id
      this.create_item.type = "update"
      let form_data = {
        type: 'get_details',
        sequence_id: query.id,
      }
      let __this = this
      axios.post("sequence", form_data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': __this._token
        }
      }).then((res) => {
        try {
          let post_data = res.data;
          if (post_data.status) {
            post_data = post_data.message
            let email_details = JSON.parse(post_data.email_details)
            __this.create_item.id = post_data.id
            __this.create_item.is_on = post_data.is_on
            __this.create_item.title = post_data.title
            __this.create_item.description = post_data.description

            __this.create_item.email_details.subject = email_details.subject
            __this.create_item.email_details.list_ids = email_details.list_ids
            __this.create_item.email_details.smtp_ids = email_details.smtp_ids

            var attachments_post_data = JSON.parse(post_data.attachments)
            if (attachments_post_data.name === null) {
              attachments_post_data.name = ""
            }
            if (attachments_post_data.url === null) {
              attachments_post_data.url = ""
            }

            __this.create_item.attachments = attachments_post_data
            let email_body = JSON.parse(post_data.email_body)
            __this.create_item.email_body.plain_body = email_body.plain_body ?? ""
            __this.create_item.email_body.body = email_body.body ?? ""
            __this.create_item.other = JSON.parse(post_data.other)

            loadAndRemoveTinyEditorAssets(true, "#email_body")
          }
        } catch (err) {
          Swal.fire({
            text: "Something went wrong!",
            icon: "error",
            buttonsStyling: !1,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          })
        }
      }).catch((error) => {
        Swal.fire({
          text: "Something went wrong!",
          icon: "error",
          buttonsStyling: !1,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        })
      })
    } else {
      loadAndRemoveTinyEditorAssets(true, "#email_body")
    }
  },

  methods: {
    loadAttachments(e) {
      let __this = this
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return;
      __this.files = files[0]
      __this.files_init = true
    },

    uploadAttachments() {
      let __this = this
      let form_data = new FormData()
      form_data.append('files', __this.files)
      form_data.append('type', "attachment")
      var config = {
        onUploadProgress: function (progressEvent) {
          __this.percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(__this.percentCompleted)
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': __this._token
        }
      }
      axios.post('sequence', form_data, config).then((res) => {
        let post_data = res.data
        if (post_data.status) {
          __this.create_item.attachments.name = post_data.name
          __this.create_item.attachments.url = post_data.url
          __this.files = []
          __this.files_init = false
          document.querySelector("input[type='file']").value = ''
        } else {
          swal_fire("", "error", "Unable to upload.")
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    utilScript() {
      "use strict";
      var KTsequenceSubmit = function (__this) {
        var t, e, o, n, t2, t1;
        const smtps = e => {
          var smtps = new Tagify(o.querySelector('[name="select_smtp"]'), {
            tagTextProp: "name",
            maxTags: __this.smtps.length,
            dropdown: {
              closeOnSelect: !1,
              maxItems: __this.smtps.length,
              enabled: 0,
              classname: "users-list",
              searchKeys: ["title", "host"]
            },
            templates: {
              tag: function (e) {
                return `\n                <tag title="${e.title || e.host}"\n                        contenteditable='false'\n                        spellcheck='false'\n                        tabIndex="-1"\n                        class="${this.settings.classNames.tag} ${e.class ? e.class : ""}"\n                        ${this.getAttributes(e)}>\n                    <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>\n                    <div class="d-flex align-items-center">\n                        <span class='tagify__tag-text'>${e.title}</span>\n                    </div>\n                </tag>\n            `
              },
              dropdownItem: function (e) {
                return `\n                <div ${this.getAttributes(e)}\n                    class='tagify__dropdown__item d-flex align-items-center ${e.class ? e.class : ""}'\n                    tabindex="0"\n                    role="option">\n\n                    <div class="d-flex flex-row">\n                        <strong>${e.title}</strong>\n                         &nbsp;&nbsp;&nbsp; ${Object.keys(e).length == 3 ? "<span>" + e.host + "</span>" : "( <span>" + e.host + "</span> )"}\n                    </div>\n                </div>`
              }
            },
            whitelist: __this.smtps
          });
          t1 = smtps
          smtps.on("dropdown:show dropdown:updated", (function (e) {
            var n = e.detail.tagify.DOM.dropdown.content;
            smtps.suggestedListItems.length > 1 && (t2 = smtps.parseTemplate("dropdownItem", [{
              class: "addAll",
              title: "Add all",
              host: smtps.settings.whitelist.reduce((function (e, t) {
                return smtps.isTagDuplicate(t.value) ? e : e + 1
              }), 0) + " smtps"
            }]), n.insertBefore(t1, n.firstChild))
          })), smtps.on("dropdown:select", (function (e) {
            e.detail.elm == t1 && smtps.dropdown.selectAll.call(smtps)
          }))
        },
          lists = e => {
            var lists = new Tagify(o.querySelector('[name="select_list"]'), {
              tagTextProp: "name",
              maxTags: __this.lists.length,
              dropdown: {
                closeOnSelect: !1,
                maxItems: __this.lists.length,
                enabled: 0,
                classname: "users-list",
                searchKeys: ["title", "leads"]
              },
              templates: {
                tag: function (e) {
                  return `\n                <tag title="${e.title || e.leads}"\n                        contenteditable='false'\n                        spellcheck='false'\n                        tabIndex="-1"\n                        class="${this.settings.classNames.tag} ${e.class ? e.class : ""}"\n                        ${this.getAttributes(e)}>\n                    <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>\n                    <div class="d-flex align-items-center">\n                        <span class='tagify__tag-text'>${e.title}</span>\n                    </div>\n                </tag>\n            `
                },
                dropdownItem: function (e) {
                  return `\n                <div ${this.getAttributes(e)}\n                    class='tagify__dropdown__item d-flex align-items-center ${e.class ? e.class : ""}'\n                    tabindex="0"\n                    role="option">\n\n                    <div class="d-flex flex-row">\n                        <strong>${e.title}</strong>\n                         &nbsp;&nbsp;&nbsp; ${Object.keys(e).length == 3 ? "<span>" + e.leads + "</span>" : "( <span>" + e.leads + "subscribers</span> )"}\n                    </div>\n                </div>`
                }
              },
              whitelist: __this.lists
            });
            t2 = lists
            lists.on("dropdown:show dropdown:updated", (function (e) {
              var n = e.detail.tagify.DOM.dropdown.content;
              lists.suggestedListItems.length > 1 && (t2 = lists.parseTemplate("dropdownItem", [{
                class: "addAll",
                title: "Add all",
                leads: lists.settings.whitelist.reduce((function (e, t) {
                  return lists.isTagDuplicate(t.value) ? e : e + 1
                }), 0) + " lists"
              }]), n.insertBefore(t2, n.firstChild))
            })), lists.on("dropdown:select", (function (e) {
              e.detail.elm == t2 && lists.dropdown.selectAll.call(lists)
            }))
          };
        return {
          init: function () {
            o = document.querySelector("#kt_sequence_form"),
              t = document.getElementById("kt_submit_sequence_form"),
              $(o.querySelector('[name="position"]')).on("change", (function () {
                e.revalidateField("position")
              })),
              e = FormValidation.formValidation(o, {
                fields: {
                  sequence_title: {
                    validators: {
                      onlyBlankSpaces: { message: "Title of the sequence is required" },
                    },
                  },
                  select_list: {
                    validators: {
                      notEmpty: { message: "List is required" },
                    },
                  },
                  select_smtp: {
                    validators: {
                      notEmpty: { message: "SMTP is required" },
                    },
                  },
                  email_subject: {
                    validators: {
                      onlyBlankSpaces: { message: "Email subject is required" },
                    },
                  },
                },
                plugins: { trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) }
              }),
              o.querySelectorAll('[data-kt-sequence-list="tagify"]').forEach((e => {
                lists(e)
              }))
            o.querySelectorAll('[data-kt-sequence-smtp="tagify"]').forEach((e => {
              smtps(e)
            }))

            $(o.querySelector('[name="select_smtp"]')).on("change", (function (evt) {
              evt.preventDefault()
              e.revalidateField("select_smtp")
              __this.create_item.email_details.smtp_ids = evt.currentTarget.tagifyValue
            })),
              $(o.querySelector('[name="select_list"]')).on("change", (function (evt) {
                evt.preventDefault()
                e.revalidateField("select_list")
                __this.create_item.email_details.list_ids = evt.currentTarget.tagifyValue
              })),
              t.addEventListener("click", (function (o) {
                o.preventDefault(),
                  e && e.validate().then((function (e) {
                    if ("Valid" == e) {
                      t.setAttribute("data-kt-indicator", "on");
                      t.disabled = !0;

                      let url = 'sequence'
                      let method = axios.post;
                      __this.create_item.email_body.body = tinyMCE.get("email_body").getContent().trim()
                      if ((!__this.create_item.email_body.body || __this.create_item.email_body.body.trim() === "") && (!__this.create_item.email_body.plain_body || __this.create_item.email_body.plain_body.trim() === "")) {
                          swal_fire("", "warning", "Please enter the email body (HTML or plain text).")
                          t.removeAttribute("data-kt-indicator")
                          t.disabled = !1
                          return
                      }

                      method(url, __this.create_item, {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'X-CSRF-Token': __this._token
                        }
                      }).then((res) => {
                        try {
                          let post_data = res.data;
                          if (post_data !== undefined || post_data !== '') {
                            if (post_data.status) {
                              post_data = post_data.message
                              if (__this.create_item.type === "create") {
                                let url1 = new URL(window.location.href);
                                __this.create_item.sequence_id = post_data.id

                                setSwalMixin("Sequence created successfully", 'success')
                                __this.$router.push({
                                  name: 'all_sequences',
                                })
                              } else {
                                setSwalMixin("Sequence updated successfully", 'success')
                              }
                            } else {
                              setSwalMixin("Something went wrong! Please try again", 'error')
                            }
                          }
                        } catch (err) {
                          setSwalMixin("Something went wrong! Please try again", 'error')
                        }
                      }).catch((error) => {
                        setSwalMixin("Something went wrong! Please try again", 'error')
                      }).finally(() => {
                        t.removeAttribute("data-kt-indicator")
                        t.disabled = !1
                      });
                    }
                    else {
                      swal_fire(KTUtil, "error", "Please check all required fields")
                    }
                  }));
              }));
          }
        }
      }(this);
      KTUtil.onDOMContentLoaded(function () {
        KTsequenceSubmit.init()
      }, this);
    },

    getListandSmtp() {
      let method = axios.post;
      let __this = this
      method("sequence", { type: 'get_list_smtp' }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': __this._token
        }
      }).then((res) => {
        let post_data = res.data
        __this.lists = post_data.list
        __this.smtps = post_data.smtp
      }).catch((error) => {
        swal_fire("", "error", error.response.data.message)
      }).finally(() => {
        __this.utilScript()
      })
    },

    delAttachment(url) {
      let __this = this
      Swal.fire({
        text: "Are you sure you want to delete?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Yes, delete!",
        cancelButtonText: "No, cancel",
        customClass: {
          confirmButton: "btn fw-bold btn-danger",
          cancelButton: "btn fw-bold btn-active-light-primary"
        }
      }).then((result) => {
        if(result.value) {
          axios.post('sequence', {
            type: 'delete_attachment',
            url: url
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-CSRF-Token': __this._token
            }
          }).then((res) => {
            let post_data = res.data
            if (post_data.status) {
              swal_fire("", "success", post_data.message)
              __this.create_item.attachments = {
                name: '',
                url: ''
              }
              __this.percentCompleted = 0
              __this.files = []
              __this.files_init = false
            } else {
              swal_fire("", "error", "Unable to delete the attachment")
            }
          }).catch((error) => {
            swal_fire("", "error", error.response)
          })
        }
      })
    }
  },
}