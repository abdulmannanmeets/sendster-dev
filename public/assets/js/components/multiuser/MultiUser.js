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
            <input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search User">
          </div>
          <div id="kt_ecommerce_report_views_export" class="d-none"><div class="dt-buttons btn-group flex-wrap">
            <button class="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="kt_table_users" type="button"><span>Copy</span></button>
            <button class="btn btn-secondary buttons-excel buttons-html5" tabindex="0" aria-controls="kt_table_users" type="button"><span>Excel</span></button>
            <button class="btn btn-secondary buttons-csv buttons-html5" tabindex="0" aria-controls="kt_table_users" type="button"><span>CSV</span></button>
            <button class="btn btn-secondary buttons-pdf buttons-html5" tabindex="0" aria-controls="kt_table_users" type="button"><span>PDF</span></button>
          </div>
        </div>
      </div>
      <div class="card-toolbar flex-row-fluid justify-content-end gap-5" data-select2-id="select2-data-123-tkk6">

        <button type="button" class="btn btn-primary" @click="$router.push({name:'create_user'})" data-kt-create-model="true">
          <span class="svg-icon svg-icon-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor" />
              <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
            </svg>
          </span>Create User
        </button>

        <div class="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
          <div class="fw-bolder me-5"><span class="me-2" data-kt-user-table-select="selected_count"></span>Selected</div>
          <button type="button" class="btn btn-danger" data-kt-user-table-select="delete_selected">
            Delete Selected
          </button>
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
              <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_table_users .form-check-input" value="1" />
              </div>
            </th>
            <th class="min-w-125px">Name</th>
            <th class="min-w-125px">Email</th>
            <th class="min-w-125px">Created at</th>
            <th class="text-end min-w-100px">Actions</th>
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

  data() {
    return {
      all_users: [],
      _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
      dt: null
    }
  },

  mounted() {
    this.utilScript();
    this.tableScript();
    document.getElementById('kt_table_users_processing').removeAttribute("style");
  },

  methods: {

    utilScript() {
      axios.post("profile", { method_type: 'get_all_users' }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': this._token
        }
      }).then((res) => {
        let post_data = res.data
        if (post_data.status !== undefined) {
          this.all_users = post_data.message;
          this.dt.rows.add(post_data.message).draw();
        }
      }).catch((error) => {
      }).finally(() => {
        document.getElementById('kt_table_users_processing').style.display = "none";
      })
    },

    tableScript() {
      "use strict";
      var KTUsersList = function (__this) {
        var tb, e, t, n, r, mom, o = document.getElementById("kt_table_users"), form_appear = document.querySelector('[data-kt-create-model="true"]'),
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
                    let selected_id = [parent.querySelectorAll('td input')[0].value.trim()]
                    axios.post("profile", {
                      method_type: "delete_user",
                      id: selected_id
                    }, {
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': __this._token
                      }
                    }).then((res) => {
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
                    }).catch((error) => {
                      console.log(error);
                      Swal.fire({
                        text: userName + " was not deleted.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                          confirmButton: "btn fw-bold btn-primary",
                        }
                      });
                    })
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
                text: "Are you sure you want to delete selected customers?",
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
                  axios.post("profile", {
                    method_type: "delete_user",
                    id: ids
                  }, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'X-CSRF-Token': __this._token
                    }
                  }).then((res) => {
                    Swal.fire({
                      text: "You have deleted all selected customers!.",
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
                    text: "Selected customers was not deleted.",
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
          handleEditRows = () => {
            const all_edit_rows = document.querySelectorAll('[data-list-table-filter="edit_row_title"]');
            all_edit_rows.forEach(d => {
              d.addEventListener("click", function (e) {
                e.preventDefault();
                const parent = e.target.closest('tr');
                const list_id = parent.querySelectorAll('td input')[0].value.trim();
                __this.$router.push({
                  name: "create_user",
                  query: {
                    id: list_id
                  },
                });
              })
            });
          };
        const a = () => {
          const e = o.querySelectorAll('tbody [type="checkbox"]');
          let c = !1,
            l = 0;
          e.forEach((e => {
            e.checked && (c = !0, l++)
          }))
          if (c) {
            r.innerHTML = l, n.classList.remove("d-none"), form_appear.classList.add('d-none')
          } else {
            (n.classList.add("d-none"), form_appear.classList.remove('d-none'))
          }
        };
        return {
          init: function () {
            o && ((__this.dt = tb = e = $(o).DataTable({
              select: {
                style: 'multi',
                selector: 'td:first-child input[type="checkbox"]',
                className: 'row-selected'
              },
              columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'email' },
                { data: 'created_at' },
                { data: null },
              ],
              processing: true,
              order: [],
              stripeClasses: ['odd-row', 'even-row'],
              destroy: true,
              language: {
                processing: '<p>Please wait</p><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>',
              },
              oLanguage: {
                sEmptyTable: "No users found!"
              },
              drawCallback: function () {
                $('[data-bs-toggle="tooltip"]').tooltip();
              },
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  render: (data) => {
                    return `
                            <div class="form-check form-check-sm form-check-custom form-check-solid ms-5">
                                <input class="form-check-input" type="checkbox" value="${data}">
                            </div>`;
                  },
                },
                {
                  targets: 1,
                  orderable: true,
                  className: 'text-nowrap',
                  render: (data) => {
                    return data;
                  },
                },
                {
                  targets: 2,
                  orderable: true,
                  className: 'text-nowrap',
                  render: (data) => {
                    return data;
                  },
                },
                {
                  targets: 3,
                  orderable: true,
                  className: 'text-nowrap',
                  render: (data) => {
                    return data;
                  },
                },
                {
                  targets: -1,
                  orderable: false,
                  className: 'text-end d-flex align-items-center justify-content-end',
                  render: (data) => {
                    return `<button type="button" class="btn btn-primary btn-active-light-primary btn-sm me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" data-list-table-filter="edit_row_title"> <i class="bi bi-pencil"></i></button >
                    <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-kt-users-table-filter="delete_row"><i class="fa fa-trash"></i></button>`
                  },
                },
              ]
            })).on("draw", (function (event) {
              l(), c(), a(), handleEditRows();
            })), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function (t) {
              e.search(t.target.value).draw();
            })), c(), handleEditRows())
          }
        }
      }(this);
      KTUtil.onDOMContentLoaded(function () {
        KTUsersList.init()
      }, this);
    },

  },
}