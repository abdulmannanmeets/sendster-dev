import Editor3 from "../theme_editor/Editor3.js";
import AiwriterSubject from "../ai/AiwriterSubject.js";
import editor from "../theme_editor/Editor2.js";
export default {
  template: `
<form method="post" id="sequence_form">
  <div class="card mb-10">
      <div class="card-body p-lg-17">
        <div class="d-flex flex-column scroll-y me-n7 pe-7">
          <div class="row">
            <div class="col-md-6 fv-row fv-plugins-icon-container">
              <label class="required fw-bold fs-6 mb-2">Enter sequence title</label>
              <input type="text" id="sequence_title" name="sequence_title" v-model="create_item.title" placeholder="Enter title" class="form-control form-control-solid mb-3 mb-lg-0" />
            </div>
            <div class="col-md-6 fv-row fv-plugins-icon-container">
              <label class="fw-bold fs-6 mb-2">Enter sequence description (Optional)</label>
              <input type="text" name="sequence_description" id="sequence_description" v-model="create_item.description" placeholder="Enter sequence detail" class="form-control form-control-solid mb-3 mb-lg-0" />
            </div>
          </div>
        </div>
      </div>
  </div>

  <div id="sequence_emails">
    <div v-for="(item, key, index) in create_item.emailInputs" :key="key">
      <div class="card sequence_emails">
        <div class="card-header collapsible cursor-pointer rotate" data-bs-toggle="collapse" :data-bs-target="'#kt_docs_card_collapsible_' + key">
          <div class="card-title">
            <div class="d-flex align-items-center position-relative my-1">{{item.title}}</div>
          </div>
          <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
            <a @click="deleteSequence(key)" class="btn btn-danger btn-active-light-danger btn-sm me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="fa fa-trash"></i></a>
          </div>
        </div>
        <div :id="'kt_docs_card_collapsible_' + key" class="collapse show">
          <div class="card-body p-lg-17">
            <div class="d-flex flex-column scroll-y me-n7 pe-7">
              <div class="row">
                <div class="col-md-12 fv-row fv-plugins-icon-container mb-5">
                  <label class="required fw-bold fs-6 mb-2">Enter email title</label>
                  <ai-modal :subject="item.title" :radio_name="'aiwriter_radio'+key" @changeSubject="item.title=$event"></ai-modal>
                  <input type="text" :name="'email_title_'+key" v-model="item.title" placeholder="Enter title" class="form-control form-control-solid mb-3 mb-lg-0" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 fv-row fv-plugins-icon-container mb-5">
                  <label class="required fw-bold fs-6 mb-2">Select list</label>
                  <input class="form-control form-control-solid" :name="'select_list_'+key" v-model="item.list_ids" data-kt-sequence-list="tagify" />
                </div>
                <div class="col-md-6 fv-row fv-plugins-icon-container mb-5">
                  <label class="required fw-bold fs-6 mb-2">Select smtp</label>
                  <input class="form-control form-control-solid" :name="'select_smtp_'+key" v-model="item.smtp_ids" data-kt-sequence-smtp="tagify" />
                </div>
              </div>
              <div class="col-md-12 fv-row fv-plugins-icon-container mb-5">
                <label class="required fw-bold fs-6 mb-2">Email body</label>
                <div class="col-12">
                  <div class="card overlay overflow-hidden">
                    <div class="card-body p-0">
                      <div class="overlay-wrapper">
                        <img style="min-height:250px;max-height:350px" :id="'body_image_show'+key" />
                      </div>
                      <div class="overlay-layer bg-dark bg-opacity-10 d-flex flex-wrap align-items-center">
                        <button type="button" class="btn btn-light-primary btn-shadow me-2" @click="changedKey(key)">New Email</button>
                        <button type="button" class="btn btn-light-primary btn-shadow me-2" v-if="is_editor_body[key].show" @click="is_editor_body[key].init=true">Edit Email</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 fv-row fv-plugins-icon-container mb-5">
                <label class="fw-bold fs-6 mb-2">Plain text version</label>
                <textarea rows="7" :name="'plain_body_'+key" placeholder="Enter plain text version" class="form-control form-control-solid mb-3 mb-lg-0" v-model="item.plain_body"></textarea>
              </div>
              <div class="col-md-12 fv-row fv-plugins-icon-container mb-5">
                <label class="fw-bold fs-6 mb-2">Attachments</label>
                <div class="input-group mb-3">
                  <input :name="'attachments_'+key" @change="loadAttachments($event, key)" type="file" class="form-control mb-3 mb-lg-0" />
                  <div class="input-group-append" v-if="item.files_init">
                    <span class="input-group-text bg-primary text-white" style="border-radius: 0 0.475rem 0.475rem 0; cursor:pointer;" @click="uploadAttachments(key)">Upload</span>
                  </div>
                </div>
                <a :href="item.attachments.url" v-if="item.attachments.url" target="_blank">{{item.attachments.name}}</a>
                <span v-if="item.attachments.url">&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt text-danger cursor-pointer" data-bs-toggle="tooltip" data-bs-original-title="Delete this attachment" title="Delete this attachment" aria-label="Delete this attachment" @click="delAttachment(item.attachments.url, key)"></i></span>
              </div>
              <div class="col-md-12 fv-row fv-plugins-icon-container mb-5">
                <div class="d-flex flex-stack">
                  <div class="me-5">
                    <label class="fs-6 fw-bold">Track opens</label>
                  </div>
                  <label class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                    <input class="form-check-input" :id="'track_open_'+key" type="checkbox" v-model="item.track_open">
                    <span class="form-check-label fw-bold text-muted" :for="'track_open_'+key">{{item.track_open ? 'Yes' : 'No'}}</span>
                  </label>
                </div>
              </div>
              <div class="col-md-12 fv-row fv-plugins-icon-container mb-5">
                <div class="d-flex flex-stack">
                  <div class="me-5">
                    <label class="fs-6 fw-bold">Track click</label>
                  </div>
                  <label class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                    <input class="form-check-input" :id="'track_click_'+key" type="checkbox" v-model="item.track_click">
                    <span class="form-check-label fw-bold text-muted" :for="'track_click_'+key">{{item.track_click ? 'Yes' : 'No'}}</span>
                  </label>
                </div>
              </div>
              <div class="col-md-12 fv-row fv-plugins-icon-container mb-5">
                <div class="d-flex flex-stack">
                  <div class="me-5">
                    <label class="fs-6 fw-bold">Send mail</label>
                  </div>
                  <label>
                    <select v-model="item.send_after" class="form-select mb-2" tabindex="-1" aria-hidden="true">
                      <option value="during">On subscription</option>
                      <option v-for="i in 365" :key="i" :value="i">After {{i}} days</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center">
        <div style="border-left: 1px solid #cccccc; height: 16px;"></div>
        <svg @click="createSequence(key)" role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
        </svg>
        <div style="border-left: 1px solid #cccccc; height: 16px;" v-if="create_item.emailInputs.length != key+1"></div>
      </div>
    </div>
  </div>

  <div class="d-flex flex-column align-items-center" v-if="create_item.emailInputs.length <= 0">
    <svg @click="createSequence()" role="button" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
    </svg>
  </div>

  <div class="mt-5">
    <button type="submit" class="btn btn-primary" id="kt_submit_sequence_form">
      <span class="indicator-label">Submit</span>
      <span class="indicator-progress">Please wait...<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
    </button>
  </div>
</form>
<editor3 v-if="is_editor_body[sequence_key]&&is_editor_body[sequence_key].init" :index="'html'" :body="create_item.emailInputs[sequence_key].email_body" @editor_init="this.is_editor_body[sequence_key].init=false" @body="changedBody($event)" />
<editor :body="create_item.emailInputs[sequence_key].email_body" :is_editor_init="is_editor_init" @changed_body="changedBody($event)" @changed_init="is_editor_init=false" v-if="is_editor_init" />
<iframe id="html_to_img" ref="htmlcanvas" style="width: 100%;height: 1px;opacity: 0;"></iframe>
  `,
  components: {
    'ai-modal': AiwriterSubject,
    'editor': editor,
    "editor3": Editor3
  },
  props: ['profile_details'],
  data() {
    return {
      _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
      smtps: [],
      lists: [],
      files: [],
      is_editor_init: false,
      is_editor_body: [],
      create_item: {
        id: 0,
        type: "create",
        title: null,
        description: null,
        emailInputs: [],
      },
      files_init: false,
      f: null,
      sequence_key: 0,
    }
  },

  unmounted() {
    localStorage.removeItem('body');
  },

  mounted() {
    this.getListandSmtp();
    this.submitForm();
    let query = this.$route.query;
    let submit_button = document.querySelector("#kt_submit_sequence_form");
    submit_button.setAttribute("data-kt-indicator", 1);
    submit_button.disabled = 1;

    if (query.id !== undefined) {
      this.create_item.id = query.id;
      this.create_item.type = "update";
      axios.post("sequence", {
        type: 'get_details',
        sequence_id: query.id
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': this._token
        }
      }).then((res) => {
        let data = res.data;
        if (data.status) {
          let message = data.message;
          let inputs = message.email_inputs;

          this.create_item.title = message.title;
          this.create_item.description = message.description;

          for (var i = 0; i < inputs.length; i++) {
            this.create_item.emailInputs.push({
              title: inputs[i].title,
              list_ids: inputs[i].list_ids,
              smtp_ids: inputs[i].smtp_ids,
              email_body: inputs[i].email_body ?? null,
              plain_body: inputs[i].plain_body ?? null,
              attachments: inputs[i].attachments ? inputs[i].attachments : { name: null, url: null },
              track_open: inputs[i].track_open,
              track_click: inputs[i].track_click,
              send_after: inputs[i].send_after,
            });
            this.utilScript();
            this.changedKey(i);
            this.is_editor_body.splice(i + 1, 0, { init: false, show: true });
            this.changedBody(inputs[i].email_body);
          }
        }
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        submit_button.removeAttribute("data-kt-indicator");
        submit_button.disabled = 0;
      })
    } else {
      submit_button.removeAttribute("data-kt-indicator");
      submit_button.disabled = 0;
    }
  },

  methods: {
    setDefaultImage(id, url = 'assets/images/email_body.png') {
      let doc = document.getElementById('body_image_show' + id);
      doc.src = url;
    },
    changedBody(event) {
      this.is_editor_init = false;
      if (typeof document.querySelector(".modal-backdrop") !== "object") {
        document.querySelector(".modal-backdrop").remove();
      }
      this.create_item.emailInputs[this.sequence_key].email_body = event;
      const iframe = this.$refs.htmlcanvas;
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(this.create_item.emailInputs[this.sequence_key].email_body ?? "");
        iframeDoc.close();

        this.htmlcanvas();
        // localStorage.removeItem('body');
        this.is_editor_body[this.sequence_key].show = true;
        this.create_item.emailInputs[this.sequence_key].plain_body = extractPlainText(event);
      } catch (ee) { console.log(ee); }
    },
    changedKey(key) {
      this.sequence_key = key;
      this.is_editor_init = true;
    },
    createSequence(index = 0) {
      var dummyData = {
        title: "Email " + (this.create_item.emailInputs.length + 1),
        list_ids: null,
        smtp_ids: null,
        email_body: null,
        plain_body: null,
        attachments: {
          name: null,
          url: null
        },
        track_open: true,
        track_click: true,
        send_after: 'during',
      };
      this.create_item.emailInputs.splice(index + 1, 0, dummyData);
      this.is_editor_body.splice(index + 1, 0, { init: false, show: false });
      this.utilScript();
      let __this = this;
      setTimeout(() => {
        __this.setDefaultImage(index);
      }, 500);
    },

    htmlcanvas() {
      const iframe = this.$refs.htmlcanvas;
      const iframeData = iframe.contentDocument.body;
      html2canvas(iframeData).then(canvas => {
        try {
          let url = canvas.toDataURL('image/png');
          if (url == "data:,") {
            this.setDefaultImage(this.sequence_key);
          } else {
            this.setDefaultImage(this.sequence_key, url)
          }
        } catch (err) { console.log(err); }
      }, 500);
    },

    deleteSequence(index) {
      this.create_item.emailInputs.splice(index, 1);
      this.utilScript();
    },

    utilScript() {
      "use strict";
      var KTUsersAddUser = (function (__this) {
        var __this = __this, t2, t1, form, f;
        const smtps = e => {
          var smtps = new Tagify(e, {
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
          t1 = smtps;
          try {
            smtps.on("dropdown:show dropdown:updated", (function (e) {
              var m = e.detail.tagify.DOM.dropdown.content;
              smtps.suggestedListItems.length > 1 && (t1 = smtps.parseTemplate("dropdownItem", [{
                class: "addAll",
                title: "Add all",
                host: smtps.settings.whitelist.reduce((function (e, t) {
                  return smtps.isTagDuplicate(t.value) ? e : e + 1
                }), 0) + " smtps"
              }]), m.insertBefore(t1, m.firstChild))
            })), smtps.on("dropdown:select", (function (e) {
              e.detail.elm == t1 && smtps.dropdown.selectAll.call(smtps)
            }));
          } catch (errr) { }
        }, lists = e => {
          var lists = new Tagify(e, {
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
          t2 = lists;
          try {
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
            }));
          } catch (errr) { }
        };

        var initUtil = function () {
          const t = document.getElementById("sequence_form"), r = t.querySelectorAll(".required");
          var o, n = {
            fields: {},
            plugins: {
              trigger: new FormValidation.plugins.Trigger,
              bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: ".fv-row",
                eleInvalidClass: "",
                eleValidClass: ""
              })
            }
          };
          r.forEach((e => {
            const currentRowCol = e.closest(".col-md-6") ?? e.closest(".col-md-12");
            const tag_smtp = currentRowCol.querySelector('[data-kt-sequence-smtp="tagify"]');
            const tag_list = currentRowCol.querySelector('[data-kt-sequence-list="tagify"]');
            const t = currentRowCol.querySelector("input");
            t && (o = t);
            const r = currentRowCol.querySelector("textarea");
            r && (o = r);
            const s = currentRowCol.querySelector("select");
            s && (o = s);
            const i = o.getAttribute("name");
            var innerText = e.innerText;
            innerText = innerText.replace(/\b\d+\b/g, "");

            if (s) {
              n.fields[i] = {
                validators: {
                  notEmpty: {
                    message: innerText + " is required"
                  }
                }
              }
            } else {
              n.fields[i] = {
                validators: {
                  onlyBlankSpaces: {
                    message: innerText + " is required"
                  }
                }
              }
            }

            setTimeout(() => {
              const plugin_message = currentRowCol.querySelectorAll(".fv-plugins-message-container");
              if (plugin_message.length > 1) {
                plugin_message.forEach((e, key) => {
                  if (key !== 0) {
                    e.remove();
                  }
                });
              }
            }, 10)

            if (tag_list) {
              var intName = i.replace(/^\D+/g, '');
              lists(tag_list);
              $(tag_list).on("change", function (evt) {
                evt.preventDefault();
                __this.create_item.emailInputs[intName].list_ids = evt.currentTarget.tagifyValue;
                f.revalidateField(i);
              });
            }
            if (tag_smtp) {
              var intName = i.replace(/^\D+/g, '');
              smtps(tag_smtp);
              $(tag_smtp).on("change", function (evt) {
                evt.preventDefault();
                __this.create_item.emailInputs[intName].smtp_ids = evt.currentTarget.tagifyValue;
                f.revalidateField(i);
              });
            }
          }));
          var s = FormValidation.formValidation(t, n);
          f = __this.f = s;
        }

        return {
          init: function () {
            setTimeout(() => {
              initUtil();
            }, 50);
          },
        };
      })(this);
      KTUtil.onDOMContentLoaded(function () {
        KTUsersAddUser.init();
      }, this);
    },

    submitForm() {
      let __this = this;
      const i = document.querySelector("#sequence_form");
      const b = document.querySelector("#kt_submit_sequence_form");
      i.addEventListener("submit", (evt) => {
        evt.preventDefault();
        __this.f && __this.f.validate().then((e) => {
          if ("Valid" == e) {
            b.setAttribute("data-kt-indicator", "on");
            b.disabled = !0;

            axios.post("sequence", __this.create_item, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': __this._token
              }
            }).then((res) => {
              try {
                let post_data = res.data;
                if (post_data !== undefined || post_data !== '') {
                  if (post_data.status) {
                    if (__this.create_item.type === "create") {
                      __this.create_item.sequence_id = post_data.id;

                      setSwalMixin("Sequence created successfully", 'success');
                      __this.$router.push({
                        name: 'all_sequences',
                      });
                    } else {
                      setSwalMixin("Sequence updated successfully", 'success');
                    }
                  } else {
                    setSwalMixin("Something went wrong! Please try again", 'error');
                  }
                }
              } catch (err) {
                setSwalMixin("Something went wrong! Please try again", 'error');
              }
            }).catch((error) => {
              swal_fire("", "error", error.response.data.message)
            }).finally(() => {
              b.removeAttribute("data-kt-indicator");
              b.disabled = !1;
            });
          } else {
            swal_fire("", "error", "Oops! There are some error(s) detected.");
          }
        });
      })
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
        let post_data = res.data;
        __this.lists = post_data.list;
        __this.smtps = post_data.smtp;
      }).catch((error) => {
        swal_fire("", "error", error.response.data.message);
      }).finally(() => {
        __this.utilScript();
      });
    },

    loadAttachments(e, key) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return;
      this.create_item.emailInputs[key].files = files[0];
      this.create_item.emailInputs[key].files_init = true;
    },

    uploadAttachments(key) {
      let __this = this;
      let form_data = new FormData();
      form_data.append('files', __this.create_item.emailInputs[key].files);
      form_data.append('type', "attachment");
      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': __this._token
        }
      }
      axios.post('sequence', form_data, config).then((res) => {
        let post_data = res.data;
        if (post_data.status) {
          __this.create_item.emailInputs[key].attachments.name = post_data.name;
          __this.create_item.emailInputs[key].attachments.url = post_data.url;
          __this.create_item.emailInputs[key].files = [];
          __this.create_item.emailInputs[key].files_init = false;
          document.querySelector("input[name='attachments_" + key + "']").value = '';
        } else {
          swal_fire("", "error", "Unable to upload.");
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    delAttachment(url, key) {
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
        if (result.value) {
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
              __this.create_item.emailInputs[key].attachments = {
                name: '',
                url: ''
              }
              __this.create_item.emailInputs[key].files = [];
              __this.create_item.emailInputs[key].files_init = false;
            } else {
              swal_fire("", "error", "Unable to delete the attachment")
            }
          }).catch((error) => {
            swal_fire("", "error", error.response)
          })
        }
      })
    },
  },
}