export default {
  template: `
  <div class="card">
    <!--begin::Card header-->
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1"
                transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
              <path
                d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                fill="currentColor" />
            </svg>
          </span>
          <!--end::Svg Icon-->
          <input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14"
            placeholder="Search Smtp" />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">
          <!--begin::Add user-->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_free_version" data-kt-create-button="true" v-if="totalSmtps>=2 && profile_details.product_permissions=='free'">
            <span class="svg-icon svg-icon-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1"
                    transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                  <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
                </svg>
              </span>Create SMTP
          </button>
          <button type="button" class="btn btn-primary" @click="$router.push({name: 'create_smtp'})" data-kt-create-button="true" v-else>
            <!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg-->
            <span class="svg-icon svg-icon-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1"
                  transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
              </svg>
            </span>
            <!--end::Svg Icon-->Create SMTP
          </button>
          <!--end::Add user-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
          <div class="fw-bolder me-5">
            <span class="me-2" data-kt-user-table-select="selected_count"></span>Selected
          </div>
          <button type="button" class="btn btn-danger"
            data-kt-user-table-select="delete_selected">
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->

        <div class="modal fade" id="kt_modal_check_smtp" aria-hidden="true">
          <!--begin::Modal dialog-->
          <div class="modal-dialog modal-dialog-centered mw-650px">
            <!--begin::Modal content-->
            <div class="modal-content">
              <!--begin::Modal header-->
              <div class="modal-header" id="kt_modal_check_smtp_header">
                <!--begin::Modal title-->
                <h2 class="fw-bolder">Test SMTP</h2>
                <!--end::Modal title-->
                <!--begin::Close-->
                <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-check-smtp-modal-action="close">
                  <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                  <span class="svg-icon svg-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1"
                        transform="rotate(-45 6 17.3137)" fill="currentColor" />
                      <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)"
                        fill="currentColor" />
                    </svg>
                  </span>
                  <!--end::Svg Icon-->
                </div>
                <!--end::Close-->
              </div>
              <!--end::Modal header-->
              <!--begin::Modal body-->
              <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                <!--begin::Form-->
                <form id="kt_modal_check_smtp_form" class="form" action="#">
                  <!--begin::Scroll-->
                  <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_check_smtp_scroll"
                    data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}"
                    data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_check_smtp_header"
                    data-kt-scroll-wrappers="#kt_modal_check_smtp_scroll" data-kt-scroll-offset="300px">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7 fv-plugins-icon-container" v-if="debug_data!==''"
                      style="background-color: aliceblue; padding: 10px;">
                      <label class="fw-bold fs-6 mb-2">Debugged data:</label>
                      <pre style="margin: 0;">{{debug_data}}</pre>
                    </div>
                    <div class="fv-row mb-7 fv-plugins-icon-container">
                      <!--begin::Label-->
                      <label class="required fw-bold fs-6 mb-2">Email title</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <input type="text" id="test_title" v-model="test_smtp.test_title" name="test_title"
                        placeholder="Email title" class="form-control form-control-solid mb-3 mb-lg-0" />
                      <!--end::Input-->
                    </div>
                    <div class="fv-row mb-7 fv-plugins-icon-container">
                      <!--begin::Label-->
                      <label class="required fw-bold fs-6 mb-2">Email Body</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <input type="text" id="test_body" v-model="test_smtp.test_body" name="test_body"
                        placeholder="Email body" class="form-control form-control-solid mb-3 mb-lg-0" />
                      <!--end::Input-->
                    </div>
                    <div class="fv-row mb-7 fv-plugins-icon-container">
                      <!--begin::Label-->
                      <label class="required fw-bold fs-6 mb-2">Email To</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <input type="email" id="test_sendto" v-model="test_smtp.test_sendto" name="test_sendto"
                        placeholder="Email To" class="form-control form-control-solid mb-3 mb-lg-0" />
                      <!--end::Input-->
                    </div>
                    <div class="fv-row mb-7 fv-plugins-icon-container">
                      <!--begin::Label-->
                      <label class="required fw-bold fs-6 mb-2">Email From</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <input type="email" id="test_sendfrom" v-model="test_smtp.test_sendfrom" name="test_sendfrom"
                        placeholder="Email From" class="form-control form-control-solid mb-3 mb-lg-0" />
                      <!--end::Input-->
                    </div>

                    <div class="text-center">
                      <button type="reset" class="btn btn-light me-3" data-kt-check-smtp-modal-action="cancel">
                        Close
                      </button>
                      <button type="submit" class="btn btn-primary" data-kt-check-smtp-modal-action="submit">
                        <span class="indicator-label">Send Email</span>
                        <span class="indicator-progress">Please wait...
                          <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->
    <!--begin::Card body-->
    <div class="card-body py-4">
      <!--begin::Table-->
      <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped" id="kt_table_users">
        <!--begin::Table head-->
        <thead>
          <!--begin::Table row-->
          <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
            <th class="w-10px pe-2">
              <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_users .form-check-input" value="1" />
              </div>
            </th>
            <th>Title</th>
            <th>Hostname</th>
            <th>Username</th>
            <th>Created at</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 fw-bold"></tbody>
      </table>
      <!--end::Table-->
    </div>
    <!--end::Card body-->
  </div>
  `,
  data() {
    return {
      modal_ref: {},
      imap_val: false,
      check_smtp_id: 0,
      error_data: [],
      debug_data: '',
      value_message: '',
      all_smtps: {
        smtp_type: 'get',
        smtps: []
      },
      kt_table_users: null,
      test_smtp: {
        test_title: '',
        test_body: '',
        test_sendto: '',
        test_sendfrom: '',
        debug_type: 'on',
      },
      totalSmtps: 0,
      _token: document.querySelector('meta[name="__token"]').getAttribute('content')
    }
  },

  mounted() {
    this.tableScript();
    this.getSmtps();
    this.smtpScript();
    document.getElementById("kt_table_users_processing").removeAttribute("style");
  },

  methods: {
    getSmtps() {
      let url = "smtp";
      let method = axios.post;
      method(url, this.all_smtps)
        .then((res) => {
          let post_data = res.data;
          this.all_smtps.smtps = post_data.message;
          this.kt_table_users.clear().rows.add(post_data.message).draw();
        })
        .catch((error) => {
          swal_fire("", "error", error.response.data.message)
        }).finally(() => {
          document.getElementById("kt_table_users_processing").style.display = "none";
        });
    },
    imap_show_hide(val) {
      this.imap_val = val
    },

    smtpScript() {
      "use strict";
      var KTUsersSmtp = (function (__this) {
        var __this = __this;
        const t = document.getElementById("kt_modal_check_smtp"),
          e = t.querySelector("#kt_modal_check_smtp_form"),
          n = new bootstrap.Modal(t);
        __this.modal_ref = n
        return {
          init: function () {
            (() => {
              var o = FormValidation.formValidation(e, {
                fields: {
                  test_title: {
                    validators: {
                      onlyBlankSpaces: { message: "Title of the test smtp is required" },
                    },
                  },
                  test_body: {
                    validators: {
                      onlyBlankSpaces: { message: "Body of the Test smtp is required" },
                    },
                  },
                  test_sendto: {
                    validators: {
                      emailCheck: { message: "Send to email is required" },
                    },
                  },
                  test_sendfrom: {
                    validators: {
                      emailCheck: { message: "Send from is required" },
                    },
                  },
                },
                plugins: {
                  trigger: new FormValidation.plugins.Trigger(),
                  bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: ".fv-row",
                    eleInvalidClass: "",
                    eleValidClass: "",
                  }),
                },
              });
              const i = t.querySelector(
                '[data-kt-check-smtp-modal-action="submit"]'
              );
              i.addEventListener("click", (t) => {
                t.preventDefault(),
                  o &&
                  o.validate().then(function (tb) {
                    if ("Valid" == tb) {
                      i.setAttribute("data-kt-indicator", "on");
                      i.disabled = !0;
                      __this.debug_data = "";
                      let url = 'smtp';
                      let form_data = {
                        smtp_type: 'send_mail',
                        sending_type: 'manual',
                        create_item: { custom_id: __this.check_smtp_id },
                        manual_data: __this.test_smtp
                      }

                      let method = axios.post;
                      method(url, form_data)
                        .then((res) => {
                          let post_data = res.data;
                          __this.debug_data = post_data
                        })
                        .catch((error) => {
                          setSwalMixin("Something went wrong! Please try again", 'error')
                        }).finally(() => {
                          i.removeAttribute("data-kt-indicator")
                          i.disabled = !1
                        });
                    }
                  });
              }),
                t
                  .querySelector('[data-kt-check-smtp-modal-action="cancel"]')
                  .addEventListener("click", (t) => {
                    t.preventDefault()
                    e.reset()
                    n.hide()
                    document.body.removeChild(
                      document.querySelector(".modal-backdrop")
                    )
                    document.body.style.overflow = "auto";
                    __this.debug_data = ""
                    __this.test_smtp = {
                      test_title: '',
                      test_body: '',
                      test_sendto: '',
                      test_sendfrom: '',
                    }
                  }),
                t
                  .querySelector('[data-kt-check-smtp-modal-action="close"]')
                  .addEventListener("click", (t) => {
                    t.preventDefault()
                    e.reset()
                    n.hide()
                    document.body.removeChild(
                      document.querySelector(".modal-backdrop")
                    )
                    document.body.style.overflow = "auto";
                    __this.debug_data = ""
                    __this.test_smtp = {
                      test_title: '',
                      test_body: '',
                      test_sendto: '',
                      test_sendfrom: '',
                    }
                  });
            })();
          },
        };
      })(this);
      KTUtil.onDOMContentLoaded(function () {
        KTUsersSmtp.init();
      }, this);
    },

    tableScript() {
      "use strict";
      var KTUsersList = function (__this) {
        var e, t, n, r, mom, tb, o = document.getElementById("kt_table_users"), form_appear = document.querySelector('[data-kt-create-button="true"]'),
          c = () => {
            const deleteButtons = document.querySelectorAll('[data-kt-users-table-filter="delete_row"]');
            deleteButtons.forEach(d => {
              // Delete button on click
              d.addEventListener('click', function (e) {
                e.preventDefault();
                // Select parent row
                const parent = e.target.closest('tr');
                // Get customer name
                const userName = parent.querySelectorAll('td')[1].innerText;

                Swal.fire({
                  text: "Are you sure you want to delete " + userName + "?",
                  icon: "warning",
                  showCancelButton: true,
                  buttonsStyling: false,
                  confirmButtonText: "Yes, delete!",
                  cancelButtonText: "No, cancel",
                  customClass: {
                    confirmButton: "btn fw-bold btn-danger",
                    cancelButton: "btn fw-bold btn-active-light-primary"
                  }
                }).then(function (result) {
                  if (result.value) {
                    // delete row data from server and re-draw datatable
                    let selected_id = [parent.querySelectorAll('td input')[0].value.trim()]
                    axios.post("smtp", {
                      smtp_type: "delete",
                      id: selected_id
                    }, {
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': __this._token
                      }
                    }).then((res) => {
                      let post_data = res.data
                      if (post_data.status) {
                        Swal.fire({
                          text: "You have deleted " + userName + "!.",
                          icon: "success",
                          buttonsStyling: false,
                          confirmButtonText: "Ok, got it!",
                          customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                          }
                        }).then(function () {
                          tb.row($(parent)).remove().draw();
                        });
                      } else {
                        swal_fire("", "error", userName + " was not deleted")
                      }
                    })
                  } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                      text: userName + " was not deleted.",
                      icon: "error",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn fw-bold btn-primary",
                      }
                    });
                  }
                });
              })
            });
          },
          l = () => {
            const c = o.querySelectorAll('[type="checkbox"]'), s = document.querySelector('[data-kt-user-table-select="delete_selected"]');
            n = document.querySelector('[data-kt-user-table-toolbar="selected"]'), r = document.querySelector('[data-kt-user-table-select="selected_count"]');
            c.forEach((e => {
              e.addEventListener("click", (function () {
                setTimeout((function () {
                  a()
                }), 50)
              }))
            })), s.addEventListener("click", (function () {
              Swal.fire({
                text: "Are you sure you want to delete selected smtps?",
                icon: "warning",
                showCancelButton: !0,
                buttonsStyling: !1,
                confirmButtonText: "Yes, delete!",
                cancelButtonText: "No, cancel",
                customClass: {
                  confirmButton: "btn fw-bold btn-danger",
                  cancelButton: "btn fw-bold btn-active-light-primary"
                }
              }).then((function (t) {
                if (t.value) {
                  let ids = []
                  c.forEach((t => {
                    t.checked && ids.push(t.value)
                  }));
                  if (ids.indexOf('1') > -1) {
                    ids.splice(ids.indexOf('1'), 1)
                  }
                  axios.post("smtp", {
                    smtp_type: "delete",
                    id: ids
                  }, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'X-CSRF-Token': __this._token
                    }
                  }).then((res) => {
                    Swal.fire({
                      text: "You have deleted all selected smtps!.",
                      icon: "success",
                      buttonsStyling: !1,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn fw-bold btn-primary"
                      }
                    }).then((function () {
                      c.forEach((t => {
                        t.checked && e.row($(t.closest("tbody tr"))).remove().draw()
                      }));
                      o.querySelectorAll('[type="checkbox"]')[0].checked = !1
                    })).then((function () {
                      a(), l()
                    }))
                  })
                } else {
                  "cancel" === t.dismiss && Swal.fire({
                    text: "Selected smtps were not deleted.",
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                      confirmButton: "btn fw-bold btn-primary"
                    }
                  })
                }
              }))
            }))
          },
          buttonManual = () => {
            document.querySelectorAll('[data-list-table-filter="delete_row"]').forEach(d => {
              d.addEventListener("click", function (e) {
                e.preventDefault();
                __this.$router.push({ name: 'create_smtp', query: { id: d.value } });
              });
            });
          }
        const a = () => {
          const e = o.querySelectorAll('tbody [type="checkbox"]');
          let c = !1,
            l = 0;
          e.forEach((e => {
            e.checked && (c = !0, l++)
          })), c ? (r.innerHTML = l, n.classList.remove("d-none"), form_appear.classList.add('d-none')) : (n.classList.add("d-none"), form_appear.classList.remove('d-none'))
        };
        return {
          init: function () {
            o && (o.querySelectorAll('button[data-mlr-button="submit"]').forEach((e => {
              e.addEventListener("click", function (evt) {
                const parent = evt.target.closest('tr');
                const userName = parent.querySelectorAll('td input')[0].value.trim();
                __this.check_smtp_id = userName;
              })
            })), (__this.kt_table_users = tb = e = $(o).DataTable({
              info: 1,
              order: [],
              searchDelay: 500,
              processing: true,
              stripeClasses: ['odd-row', 'even-row'],
              data: __this.all_smtps.smtps,
              pageLength: 10,
              lengthChange: 1,
              language: {
                processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
              },
              oLanguage: {
                sEmptyTable: "No smtps found!"
              },
              drawCallback: function () {
                $('[data-bs-toggle="tooltip"]').tooltip();
              },
              columns: [
                { data: 'id' },
                { data: 'title' },
                { data: 'credentials' },
                { data: 'credentials' },
                { data: 'created_at' },
                { data: 'id' },
              ],
              columnDefs: [
                {
                  targets: 0,
                  orderable: !1,
                  render: function (data) {
                    return `<div class="form-check form-check-sm form-check-custom form-check-solid ms-5"><input class="form-check-input" type="checkbox" value="${data}"></div>`;
                  }
                },
                {
                  targets: 1,
                  orderable: 1,
                  className: 'text-nowrap',
                  render: function (data) {
                    return data;
                  }
                },
                {
                  targets: 2,
                  orderable: 1,
                  className: 'text-nowrap',
                  render: function (data) {
                    data = JSON.parse(data);
                    return data.host;
                  }
                },
                {
                  targets: 3,
                  orderable: 1,
                  className: 'text-nowrap',
                  render: function (data) {
                    data = JSON.parse(data);
                    return data.username;
                  }
                },
                {
                  targets: 4,
                  orderable: 1,
                  className: 'text-nowrap',
                  render: function (data) {
                    return data;
                  }
                },
                {
                  targets: -1,
                  orderable: 0,
                  className: 'text-end d-flex align-items-end justify-content-end',
                  render: function (data, type, fullData) {
                    var basic = JSON.parse(fullData.basic);
                    return `
                    <button type="button" class="btn btn-primary btn-active-light-primary btn-sm me-3" data-bs-toggle="tooltip" value="${data}" data-bs-placement="top" title="Edit" data-list-table-filter="delete_row" ><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn btn-primary btn-active-light-primary btn-sm me-3" value="${basic.from_email}" data-bs-toggle="modal" data-bs-target="#kt_modal_check_smtp" data-mlr-button="submit" data-bs-toggle2="tooltip" data-bs-placement="top" title="Test"><i class="fa fa-eye"></i></button>
                    <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-kt-users-table-filter="delete_row"><i class="fa fa-trash"></i></button>
                    `;
                  }
                },
              ]
            })).on("draw", (function () {
              var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle2="tooltip"]'))
              tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
              })
              l(), c(), a(), buttonManual(), o.querySelectorAll('button[data-mlr-button="submit"]').forEach((e => {
                e.addEventListener("click", function (evt) {
                  const parent = evt.target.closest('tr');
                  const userName = parent.querySelectorAll('td input')[0].value.trim();
                  __this.test_smtp.test_sendfrom = e.value;
                  __this.check_smtp_id = userName;
                })
              }));
            })), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function (t) {
              e.search(t.target.value).draw();
            })), c(), buttonManual())
          }
        }
      }(this);
      KTUtil.onDOMContentLoaded((function () {
        KTUsersList.init(this)
      }));
    }
  },
  props: ['profile_details'],

  watch: {
    all_smtps: {
      handler(newVaue) {
        this.totalSmtps = newVaue.smtps.length;
      },
      deep: true
    }
  }
}