export default {
  template: `
  <div class="card">
    <!--begin::Card header-->
    <div class="card-header align-items-center py-5 gap-2 gap-md-5">
      <div class="card-title">
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
              <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
            </svg>
            </span>
            <input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search List">
          </div>
      </div>
      <div class="card-toolbar flex-row-fluid justify-content-end gap-5">

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mlr_modal_show_error" data-kt-create-model="true">All leads error</button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="totalLists>=3 && profile_details.product_permissions=='free' ? '#kt_modal_free_version' : '#kt_modal_add_user'" data-kt-create-model="true">
          <span class="svg-icon svg-icon-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
              <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
            </svg>
          </span>Create List
        </button>

        <div class="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
          <div class="fw-bolder me-5"><span class="me-2" data-kt-user-table-select="selected_count"></span>Selected</div>
          <button type="button" class="btn btn-danger" data-kt-user-table-select="delete_selected">
            Delete Selected
          </button>
        </div>
      </div>
    </div>

    <div class="modal fade" id="mlr_modal_show_error" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered mw-950px">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="fw-bolder">List Error</h2>
            <div id="mlr_error_close" class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal" data-kt-modal-action-type="close">
              <span class="svg-icon svg-icon-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                  <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                </svg>
              </span>
            </div>
          </div>
          <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
            <div class="row">
              <div class="col-sm-12 text-center">
              <div class="d-flex justify-content-end align-items-center d-none" data-table-toolbar="selected">
                <input type="text" class="form-control form-control-solid text-align-center ps-15 mw-250px" style="margin: 0 auto;" data-table-filter="search" placeholder="Search emails">
                  <div class="fw-bolder me-5"><span class="me-2" data-table-select="selected_count"></span>Selected</div>
                  <button type="button" class="btn btn-danger" data-kt-table-select="delete_selected">Delete Selected</button>
                </div>
              </div>
            </div>
            <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-striped" id="mlr_table_error">
              <thead>
                <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">
                  <th class="w-10px pe-2">
                    <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
                      <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#mlr_table_error .form-check-input" value="1"/>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>List ID</th>
                  <th>Extra fields</th>
                  <th>Error</th>
                  <th>Created At</th>
                  <th class="text-end min-w-100px">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 fw-bold"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="kt_modal_add_user" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered mw-650px">
        <div class="modal-content">
          <div class="modal-header" id="kt_modal_add_user_header">
            <h2 class="fw-bolder">Create List</h2>
            <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
              <span class="svg-icon svg-icon-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                  <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                </svg>
              </span>
            </div>
          </div>
          <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
            <form id="kt_modal_add_user_form" class="form" action="#">
              <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                <div class="fv-row mb-7 fv-plugins-icon-container">
                  <label class="required fw-bold fs-6 mb-2">Enter list title</label>
                  <input type="text" id="list_title" name="list_title" v-model="create_item.list_title" placeholder="Enter title" class="form-control form-control-solid mb-3 mb-lg-0" />
                </div>
                <div class="fv-row mb-7 fv-plugins-icon-container">
                  <label class="fw-bold fs-6 mb-2">Enter list description (Optional)</label>
                  <input type="text" name="list_description" id="list_description" v-model="create_item.list_description" placeholder="Enter list detail" class="form-control form-control-solid mb-3 mb-lg-0" />
                </div>
                <div class="mb-7">
                  <label class="required fw-bold fs-6 mb-5">Select list type</label>
                    <div class="d-flex fv-row">
                      <div class="form-check form-check-custom form-check-solid">
                        <input class="form-check-input me-3" name="list_types" type="radio" v-model="create_item.list_types" value="0" id="kt_modal_update_role_option_0" :checked="create_item.list_types===0">
                        <label class="form-check-label" for="kt_modal_update_role_option_0">
                          <div class="fw-bolder text-gray-800">Single Opt-in</div>
                        </label>
                      </div>
                    </div>
                    <div class="separator separator-dashed my-5"></div>
                    <div class="d-flex fv-row">
                      <div class="form-check form-check-custom form-check-solid">
                        <input class="form-check-input me-3" name="list_type" :checked="create_item.list_types===1" type="radio" value="1" v-model="create_item.list_types" id="kt_modal_update_role_option_1">
                        <label class="form-check-label" for="kt_modal_update_role_option_1"><div class="fw-bolder text-gray-800">Double Opt-in</div></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-15">
                  <button type="reset" class="btn btn-light me-3" data-kt-users-modal-action="cancel">Close</button>
                  <button type="submit" class="btn btn-primary" data-kt-users-modal-action="submit">
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
              <div class="form-check form-check-sm form-check-custom form-check-solid  ms-5">
                <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_users .form-check-input" value="1" />
              </div>
            </th>
            <th>Title</th>
            <th>List ID</th>
            <th>Total Leads</th>
            <th>Verified</th>
            <th>Unverified</th>
            <th>Created at</th>
            <th>Priority</th>
            <th class="text-end">Actions</th>
          </tr>
          <!--end::Table row-->
        </thead>
        <!--end::Table head-->
        <!--begin::Table body-->
        <tbody class="text-gray-600 fw-bold">
        </tbody>
        <!--end::Table body-->
      </table>
      <!--end::Table-->
    </div>
    <!--end::Card body-->
  </div>
  `,
  name: "all_lists",
  data: () => ({
    error_data: [],
    value_message: "",
    all_lists: {
      list_type: 'get',
      lists: []
    },
    all_leads: [],
    dt: null,
    tb: null,
    create_item: {
      list_type: "create",
      list_title: "",
      list_types: 0,
      list_description: "",
    },
    _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
    totalLists: 0
  }),
  props: ['profile_details'],
  mounted() {
    this.getLists();
    this.getLeads();
    this.utilScript();
    this.tableScript();
    document.getElementById('kt_table_users_processing').removeAttribute("style");
  },
  methods: {
    routeList(id = '0') {
      if (id !== 0) {
        this.$router.push({
          name: "edit_lists",
          query: {
            id: id
          },
        });
      }
    },
    getLists() {
      axios.post("list", this.all_lists)
        .then((res) => {
          let post_data = res.data;
          this.all_lists.lists = post_data.message;
          this.tb.clear().rows.add(post_data.message).draw();
        })
        .catch((error) => {
          try {
            this.error_data = error.response.data.errors;
          } catch (err) {
            this.error_data = "Something went wrong!";
          }
        }).finally(() => {
          document.getElementById('kt_table_users_processing').style.display = "none";
        });
    },
    utilScript() {
      "use strict";
      var KTUsersAddUser = (function (__this) {
        const t = document.getElementById("kt_modal_add_user"),
          e = t.querySelector("#kt_modal_add_user_form"),
          n = new bootstrap.Modal(t);
        return {
          init: function () {
            (() => {
              var o = FormValidation.formValidation(e, {
                fields: {
                  list_title: {
                    validators: {
                      onlyBlankSpaces: { message: "Title of the list is required" },
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
                '[data-kt-users-modal-action="submit"]'
              );
              i.addEventListener("click", (t) => {
                t.preventDefault(),
                  o &&
                  o.validate().then(function (t) {
                    if ("Valid" == t) {
                      i.setAttribute("data-kt-indicator", "on");
                      i.disabled = !0;
                      let url = "list";
                      let method = axios.post;
                      method(url, __this.create_item)
                        .then((res) => {
                          let post_data = res.data;
                          let status = post_data.status
                          __this.value_message = post_data.message

                          if (status) {
                            Swal.fire({
                              text: "List created successfully",
                              icon: "success",
                              buttonsStyling: !1,
                              confirmButtonText: "Ok, got it!",
                              customClass: {
                                confirmButton: "btn btn-primary",
                              },
                            }).then(function (t) {
                              let json_message = __this.value_message;
                              addDatatableData(__this.tb, {
                                'id': json_message.id,
                                'list_type': __this.create_item.list_types,
                                'title': __this.create_item.list_title,
                                'description': __this.create_item.list_description,
                                'verified': 0,
                                'unverified': 0,
                                'leads': 0,
                                'created_at': json_message.created_at,
                              });

                              __this.create_item.list_title = "";
                              __this.create_item.list_description = "";
                              t.isConfirmed && n.hide();
                              document.body.removeChild(
                                document.querySelector(".modal-backdrop")
                              );
                            })
                          } else {
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
                        })
                        .catch((error) => {
                          __this.error_data = error.response.data.errors;
                          __this.value_message = ""

                          Swal.fire({
                            text: "Something went wrong!",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                              confirmButton: "btn btn-primary",
                            },
                          })
                        }).finally(() => {
                          i.removeAttribute("data-kt-indicator")
                          i.disabled = !1
                        });
                    } else {
                      Swal.fire({
                        text: "Please check all required fields",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: { confirmButton: "btn btn-primary" },
                      });
                    }
                  });
              }),
                t
                  .querySelector('[data-kt-users-modal-action="cancel"]')
                  .addEventListener("click", (t) => {
                    t.preventDefault(),
                      e.reset(),
                      n.hide(),
                      document.body.removeChild(
                        document.querySelector(".modal-backdrop")
                      );
                  }),
                t
                  .querySelector('[data-kt-users-modal-action="close"]')
                  .addEventListener("click", (t) => {
                    t.preventDefault(),
                      e.reset(),
                      n.hide(),
                      document.body.removeChild(
                        document.querySelector(".modal-backdrop")
                      );
                  });
            })();
          },
        };
      })(this);
      KTUtil.onDOMContentLoaded(function () {
        KTUsersAddUser.init();
      }, this);
    },

    tableScript() {
      "use strict";
      var KTUsersList = function (__this) {
        var e, t, n, r, tb, mom, o = document.getElementById("kt_table_users"), form_appear = document.querySelectorAll('[data-kt-create-model="true"]'),
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
                    axios.post("list", {
                      list_type: "delete",
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
              });
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
                text: "Are you sure you want to delete selected lists?",
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
                  axios.post("list", {
                    list_type: "delete",
                    id: ids
                  }, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'X-CSRF-Token': __this._token
                    }
                  }).then((res) => {
                    Swal.fire({
                      text: "You have deleted all selected lists!.",
                      icon: "success",
                      buttonsStyling: !1,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn fw-bold btn-primary"
                      }
                    }).then((function () {
                      c.forEach((t => {
                        t.checked && e.row($(t.closest("tbody tr"))).remove().draw();
                      }));
                      o.querySelectorAll('[type="checkbox"]')[0].checked = !1
                    })).then((function () {
                      a(), l()
                    }))
                  })
                } else {
                  "cancel" === t.dismiss && Swal.fire({
                    text: "Selected lists were not deleted.",
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
          a = () => {
            const e = o.querySelectorAll('tbody [type="checkbox"]');
            let c = !1,
              l = 0;
            e.forEach((e => {
              e.checked && (c = !0, l++)
            })), c ? (r.innerHTML = l, n.classList.remove("d-none"), form_appear[0].classList.add('d-none'), form_appear[1].classList.add('d-none')) : (n.classList.add("d-none"), form_appear[0].classList.remove('d-none'), form_appear[1].classList.remove('d-none'))
          },
          handleEditRows = () => {
            const all_rows = document.querySelectorAll('[data-list-table-filter="edit_row_title"]');
            all_rows.forEach(d => {
              d.addEventListener("click", function (e) {
                e.preventDefault();

                const parent = e.target.closest('tr');
                const list_id = parent.querySelectorAll('td input')[0].value.trim();
                __this.routeList(list_id);
              })
            })
          },
          handlePriority = () => {
            try {
              o.querySelectorAll('[data-mlr-priority="true"]').forEach(query => {
                query.addEventListener("change", function (evt) {
                  const priorityValue = query.value;
                  const parent = evt.target.closest('tr');
                  const listId = parent.querySelectorAll('td input')[0].value.trim()
                  const listName = parent.querySelectorAll('td')[1].innerHTML.trim()
                  if (priorityValue) {
                    evt.target.closest("select").disabled = true
                    Swal.fire({
                      title: "Please wait!",
                      text: "Updating the priority of list " + listName,
                      icon: "info",
                      didOpen: () => {
                        Swal.showLoading();
                      },
                      allowEscapeKey: false,
                      allowOutsideClick: false,
                    })
                    axios.post("list", {
                      list_type: "priority_update",
                      listId: listId,
                      priorityValue: priorityValue
                    }).then((res) => {
                      __this.tb.clear().rows.add(res.data).draw();
                      swal_fire("", "success", "Priority of " + listName + " has been changes to " + priorityValue)
                    }).catch((error) => {
                      swal_fire("", "success", "Unable to change the priority of " + listName + " to " + priorityValue)
                    }).finally(() => {
                      evt.target.closest("select").disabled = false
                    })
                  }
                })
              })
            } catch { }
          }
        return {
          init: function () {
            o && (o.querySelectorAll("tbody tr").forEach((e => {
              const t = e.querySelectorAll("td");
            })), (__this.tb = tb = e = $(o).DataTable({
              searchDelay: 500,
              data: __this.all_lists.lists,
              processing: true,
              order: [],
              stripeClasses: ['odd-row', 'even-row'],
              destroy: true,
              language: {
                processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
              },
              drawCallback: function () {
                $('[data-bs-toggle="tooltip"]').tooltip();
                KTUtil.each(document.querySelectorAll('#kt_table_users_wrapper [data-action="copy"]'), (function (e) {
                  new ClipboardJS(e, {
                    target: e,
                    text: function () {
                      return e.innerHTML
                    }
                  }).on("success", (function (t) {
                    var backValue = e.innerHTML
                    e.setAttribute("data-bs-original-title", "Copied successfully")
                    e.innerHTML = "Copied successfully", e.classList.add("text-success")
                    setTimeout((function () {
                      e.setAttribute("data-bs-original-title", "Click to copy")
                      e.classList.remove("text-success"), e.innerHTML = backValue
                    }), 3e3)
                  }))
                }))
              },
              oLanguage: {
                sEmptyTable: "No lists found!"
              },
              columns: [
                { data: 'id' },
                { data: 'title' },
                { data: 'id' },
                { data: 'leads' },
                { data: 'verified' },
                { data: 'unverified' },
                { data: 'created_at' },
                { data: 'priority' },
                { data: 'id' },
              ],
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  render: function (data) {
                    return `
                      <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                          <input class="form-check-input" type="checkbox" value="${data}" />
                      </div>`;
                  }
                },
                {
                  targets: 1,
                  orderable: true,
                  className: 'text-nowrap',
                  render: function (data) {
                    return data;
                  }
                },
                {
                  targets: 2,
                  orderable: true,
                  className: 'text-nowrap',
                  render: function (data) {
                    return `<div class="badge btn btn-active-color-primary btn-sm btn-outline-light badge badge-light fw-bolder p-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action="copy">${data}</div>`;
                  }
                },
                {
                  targets: 3,
                  orderable: true,
                  className: 'text-nowrap',
                  render: function (data) {
                    return data;
                  }
                },
                {
                  targets: 4,
                  orderable: true,
                  className: 'text-nowrap',
                  render: function (data) {
                    return `<div class="badge badge-light-success fw-bolder">${data}</div>`;
                  }
                },
                {
                  targets: 5,
                  orderable: true,
                  className: 'text-nowrap',
                  render: function (data) {
                    return `<div class="badge badge-light-danger fw-bolder">${data}</div>`;
                  }
                },
                {
                  targets: 6,
                  orderable: true,
                  className: 'text-nowrap',
                  render: function (data) {
                    return data;
                  }
                },
                {
                  targets: 7,
                  orderable: false,
                  render: function (data, type, full) {
                    var select_start = `<select class="form-select form-select-sm form-select-solid" data-control="select2" data-placeholder="Priority" data-hide-search="true" data-mlr-priority="true">`;
                    var option_data = ``;
                    for (var i = 1; i <= __this.all_lists.lists.length; i++) {
                      if (i == data) {
                        option_data += `<option value="${i}" selected>${i}</option>`;
                      } else {
                        option_data += `<option value="${i}">${i}</option>`;
                      }
                    }
                    return select_start + option_data + `</select>`;
                  }
                },
                {
                  targets: -1,
                  orderable: false,
                  className: 'text-end d-flex align-items-center justify-content-end',
                  render: function (data, type, full) {
                    return `
                      <button type="button" class="btn btn-primary btn-active-light-primary btn-sm me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" data-list-table-filter="edit_row_title"><i class="bi bi-pencil"></i></button>
                      <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-kt-users-table-filter="delete_row"><i class="fa fa-trash"></i></button>
                    `;
                  }
                },
              ]
            })).on("draw", (function () {
              l(), c(), a(), handlePriority(), handleEditRows();
            })), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function (t) {
              e.search(t.target.value).draw()
            })), c(), handlePriority(), handleEditRows())
          }
        }
      }(this);
      KTUtil.onDOMContentLoaded(function () {
        KTUsersList.init()
      }, this);
    },

    getLeads() {
      axios.post("list", {
        list_type: "get_error"
      }).then((res) => {
        let post_data = res.data;
        this.all_leads = post_data;
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.errorTableScript();
      });
    },

    errorTableScript() {
      "use strict";
      var MLRErrorLog = function (__this) {
        var table;
        var dt;
        var __this = __this

        // Private functions
        var initDatatable = function () {
          __this.dt = dt = $("#mlr_table_error").DataTable({
            searchDelay: 500,
            processing: true,
            data: __this.all_leads,
            order: [[6, 'desc']],
            select: {
              style: 'multi',
              selector: 'td:first-child input[type="checkbox"]',
              className: 'row-selected'
            },
            columns: [
              { data: 'id' },
              { data: 'name' },
              { data: 'email' },
              { data: 'list_id' },
              { data: 'extra_fields' },
              { data: 'error' },
              { data: 'created_at' },
              { data: null },
            ],
            drawCallback: function () {
              $('[data-bs-toggle="tooltip"]').tooltip();
            },
            createdRow: function (row, data, dataIndex) {
              row.querySelectorAll("td")[7].classList.add("d-flex", "align-items-center", "justify-content-between")
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                render: function (data) {
                  return `
                    <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                      <input class="form-check-input" type="checkbox" value="${data}" />
                    </div>`;
                }
              },
              {
                targets: 1,
                orderable: true,
                className: 'text-nowrap',
              },
              {
                targets: 2,
                className: 'text-nowrap',
                orderable: true,
              },
              {
                targets: 3,
                orderable: true,
                className: 'text-nowrap',
                render: function (data) {
                  return `<div class="badge btn btn-active-color-primary btn-sm btn-outline-light badge badge-light fw-bolder p-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" onclick="copyValue('${btoa(data)}', 1)">${data}</div>`;
                }
              },
              {
                targets: 4,
                orderable: true,
                className: 'text-nowrap',
                render: function (data) {
                  return `<button class="btn unstyled-button text-info" onclick="show_extrafields(${data})"><i class="fas fa-eye"></i></button>`;
                }
              },
              {
                targets: 5,
                orderable: true,
                className: 'text-nowrap'
              },
              {
                targets: 6,
                className: 'text-nowrap',
              },
              {
                targets: -1,
                data: null,
                orderable: false,
                className: 'text-end',
                render: function () {
                  return `
                    <button class="btn btn-danger btn-active-light-danger btn-sm" data-list-table-filter="delete_row" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                  `;
                },
              },
            ],
          });

          table = dt.$;

          // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
          dt.on('draw', function () {
            initToggleToolbar();
            toggleToolbars();
            handleDeleteRows();
            KTMenu.createInstances();
          });
        }

        // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
        var handleSearchDatatable = function () {
          const filterSearch = document.querySelector('[data-table-filter="search"]');
          filterSearch.addEventListener('keyup', function (e) {
            dt.search(e.target.value).draw();
          });
        }

        // Delete link
        var handleDeleteRows = () => {
          // Select all delete buttons
          const deleteButtons = document.querySelectorAll('[data-list-table-filter="delete_row"]');
          deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
              e.preventDefault();

              // Select parent row
              const parent = e.target.closest('tr');

              // Get link name
              const linkName = parent.querySelectorAll('td')[1].innerText;

              // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
              Swal.fire({
                text: "Are you sure you want to delete " + linkName + "?",
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
                  let selected_id = [parent.querySelectorAll('td input')[0].value.trim()]
                  axios.post("list", {
                    list_type: "delete_error",
                    ids: selected_id
                  }).then((res) => {
                    res = res.data;
                    if (res.status) {
                      Swal.fire({
                        text: "You have deleted " + linkName + "!.",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                          confirmButton: "btn fw-bold btn-primary",
                        }
                      }).then(function () {
                        dt.row($(parent)).remove().draw();
                      });
                    }
                  });
                } else if (result.dismiss === 'cancel') {
                  Swal.fire({
                    text: linkName + " was not deleted.",
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
        }

        // Init toggle toolbar
        var initToggleToolbar = function () {
          // Toggle selected action toolbar
          // Select all checkboxes
          const container = document.querySelector('#mlr_table_error');
          const checkboxes = container.querySelectorAll('[type="checkbox"]');

          // Select elements
          const deleteSelected = document.querySelector('[data-kt-table-select="delete_selected"]');

          // Toggle delete selected toolbar
          checkboxes.forEach(c => {
            // Checkbox on click event
            c.addEventListener('click', function () {
              setTimeout(function () {
                toggleToolbars();
              }, 50, c);
            });
          });

          // Deleted selected rows
          deleteSelected.addEventListener('click', function () {
            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
            Swal.fire({
              text: "Are you sure you want to delete selected leads?",
              icon: "warning",
              showCancelButton: true,
              buttonsStyling: false,
              showLoaderOnConfirm: true,
              confirmButtonText: "Yes, delete!",
              cancelButtonText: "No, cancel",
              customClass: {
                confirmButton: "btn fw-bold btn-danger",
                cancelButton: "btn fw-bold btn-active-light-primary"
              },
            }).then(function (result) {
              if (result.value) {
                let ids = [];
                checkboxes.forEach((r) => {
                  r.checked && (r.value != '1') && ids.push(r.value);
                });

                axios.post("list", {
                  list_type: "delete_error",
                  ids: ids,
                }, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': __this._token
                  }
                }).then((res) => {
                  res = res.data;
                  if (res.status) {
                    Swal.fire({
                      text: "You have deleted all selected leads!.",
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn fw-bold btn-primary",
                      }
                    }).then(function () {
                      checkboxes.forEach(c => {
                        c.checked && dt.row($(c.closest("tbody tr"))).remove().draw()
                      });
                    });
                  } else {
                    Swal.fire({
                      text: "Unable to delete the selected leads!.",
                      icon: "error",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      customClass: {
                        confirmButton: "btn fw-bold btn-primary",
                      }
                    });
                  }
                  // Remove header checked box
                  const headerCheckbox = container.querySelectorAll('[type="checkbox"]')[0];
                  headerCheckbox.checked = false;
                })
              } else if (result.dismiss === 'cancel') {
                Swal.fire({
                  text: "Selected leads were not deleted.",
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  customClass: {
                    confirmButton: "btn fw-bold btn-primary",
                  }
                });
              }
            });
          });
        }

        // Toggle toolbars
        var toggleToolbars = function () {
          // Define variables
          const container = document.querySelector('#mlr_table_error');
          const toolbarSelected = document.querySelector('[data-table-toolbar="selected"]');
          const selectedCount = document.querySelector('[data-table-select="selected_count"]');

          // Select refreshed checkbox DOM elements
          const allCheckboxes = container.querySelectorAll('tbody [type="checkbox"]');

          // Detect checkboxes state & count
          let checkedState = false;
          let count = 0;

          // Count checked boxes
          allCheckboxes.forEach(c => {
            if (c.checked) {
              checkedState = true;
              count++;
            }
          });

          // Toggle toolbars
          if (checkedState) {
            selectedCount.innerHTML = count;
            toolbarSelected.classList.remove('d-none');
          } else {
            toolbarSelected.classList.add('d-none');
          }
        }

        // Public methods
        return {
          init: function () {
            initDatatable();
            handleSearchDatatable();
            initToggleToolbar();
            handleDeleteRows();
          }
        }
      }(this);

      KTUtil.onDOMContentLoaded(function () {
        MLRErrorLog.init();
      }, this);
    },
  },

  watch: {
    all_lists: {
      handler(newValue) {
        this.totalLists = newValue.lists.length;
      },
      deep: true,
    }
  }
};