import BasicDetails from './BasicDetails.js'
import ListTemplates from './ListTemplates.js';

export default {
  template: `
  <div class="row g-5 g-xl-8">
    <div>
        <button type="button" style="float:right;" class="btn btn-primary" @click="change_is_edit(!is_edit)">
        <span class="svg-icon svg-icon-3 me-1" v-if="!is_edit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect opacity="0.5" x="6" y="11" width="13" height="2" rx="1" fill="currentColor"></rect>
            <path d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z" fill="currentColor"></path>
          </svg>
          </span>
        {{ is_edit ? 'Advanced Settings' : ''}}</button>
    </div>
  <list-template v-if="!is_edit"></list-template>
    <!-- Basic details start here -->
    <basic-details v-if="is_edit"></basic-details>
    <!-- Basic details ends here -->
    <div class="card" v-if="is_edit">
      <div class="card-header align-items-center py-5 gap-2 gap-md-5" data-select2-id="select2-data-124-9qyc">
        <!--begin::Card title-->
        <div class="card-title">
          <div class="card-title">
          <div class="d-flex align-items-center position-relative my-1">
            <span class="svg-icon svg-icon-1 position-absolute ms-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
              </svg>
              </span>
              <input type="text" data-kt-user-table-filter="search" class="form-control form-control-solid w-250px ps-14" placeholder="Search Lead">
            </div>
            <div id="mlr_list_report_views_export" class="d-none">
          </div>
        </div>
        </div>
        <!--begin::Card title-->
        <!--begin::Card toolbar-->
        <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
          <button type="button" class="btn btn-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-export-trigger="true">
            <span class="svg-icon svg-icon-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)" fill="currentColor"></rect>
                <path d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z" fill="currentColor"></path>
                <path d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z" fill="#C4C4C4"></path>
              </svg>
			    	</span>
            Export
          </button>
          <div id="mlr_list_report_views_export_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-200px py-4" data-kt-menu="true">
            <div class="menu-item px-3">
              <a href="#" class="menu-link px-3" data-kt-ecommerce-export="copy">Copy to clipboard</a>
            </div>
            <div class="menu-item px-3">
              <a href="#" class="menu-link px-3" data-kt-ecommerce-export="csv">Export as CSV</a>
            </div>
					</div>

          <!--start::Get Name and Email data from CSV-->
          <button type="button" class="btn btn-primary" @click="mlrUploadCsv1('open')" id="uploadedcsv">
            Import from CSV
          </button>
          <form action="" method="post" enctype="multipart/form-data" id="list_csv_upload_file"><input type="file" name="mlr-exportcsv" id="qmlr-exportcsv" class="form-control" accept=".csv" required="" style="display:none;" @change="mlrUploadCsv1('set')"></form>
          <button type="button" class="btn btn-primary d-none" id="field_modal_show" data-bs-toggle="modal" data-kt-create-model="true" data-bs-target="#kt_modal_import_csv" style="display:none;">
            <span class="svg-icon svg-icon-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1"
                  transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
              </svg>
            </span>
          </button>
          <div class="modal fade" id="kt_modal_import_csv" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered mw-650px">
              <div class="modal-content">
                <div class="modal-header" id="kt_modal_import_csv_header">
                  <h2 class="fw-bolder">Select Name And Email Field</h2>
                  <div class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal" data-kt-modal-action-type="close">
                    <span class="svg-icon svg-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
                      <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
                    </svg>
                  </span>
                </div>
              </div>
              <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_import_csv_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_import_csv_header" data-kt-scroll-wrappers="#kt_modal_import_csv_scroll" data-kt-scroll-offset="300px" style="max-height: 679px;">
                  <div class="fv-row mb-7 fv-plugins-icon-container">
                    <label class="fw-bold fs-6 mb-2">Select name field</label>
                    <select name="csv_name_field" class="form-select form-select-solid fw-bolder" v-model="csv_data.selected_name">
                      <option value="NO">Select name field</option>
                      <option v-for="(field_data, index) in csv_data.data.name" :value="index">{{field_data}}</option>
                    </select>
                  </div>
                  <div class="fv-row mb-7 fv-plugins-icon-container">
                    <label class="fw-bold fs-6 mb-2 required">Select email field</label>
                    <select name="csv_email_field" class="form-select form-select-solid fw-bolder" v-model="csv_data.selected_email">
                      <option value="NO">Select email field</option>
                      <option v-for="(field_data, index) in csv_data.data.email" :value="index">{{field_data}}</option>
                    </select>
                  </div>
                  <div class="fv-row mb-7 fv-plugins-icon-container">
                    <label class="form-check form-check-custom form-check-solid form-check-inline mb-5">
                      <span class="form-check-label fs-6 fw-bold me-7">Replace existing emails</span>
                      <input type="checkbox" name="csv_email_replace" v-model="csv_data.is_replace" class="form-check-input">
                    </label>
                  </div>
                  <div class="fv-row mb-7 fv-plugins-icon-container text-center d-none" id="live_inserting">
                    <label class="fw-bold fs-2 mb-2 text-primary">{{live_inserting.text}}</label>
                  </div>
                </div>
                <div class="text-center">
                  <button type="button" class="btn btn-light me-3" data-bs-dismiss="modal" data-kt-modal-action-type="close">Close</button>
                  <button type="button" class="btn btn-primary" id="mlrcsvfilesave">
                    <span class="indicator-label">Submit</span>
                    <span class="indicator-progress">Uploading, please wait
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Get Name and Email data from CSV-->

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-kt-create-model="true" :data-bs-target="totalLeads>=500 && profile_details.product_permissions=='free'?'#kt_modal_free_version':'#kt_modal_add_user'">
        <!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg-->
        <span class="svg-icon svg-icon-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1"
              transform="rotate(-90 11.364 20.364)" fill="currentColor" />
            <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
          </svg>
        </span>
        Create Lead
      </button>
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
          <!--begin::Modal - Add task-->
          <div class="modal fade" id="kt_modal_add_user" tabindex="-1" aria-hidden="true">
            <!--begin::Modal dialog-->
            <div class="modal-dialog modal-dialog-centered mw-650px">
              <!--begin::Modal content-->
              <div class="modal-content">
                <!--begin::Modal header-->
                <div class="modal-header" id="kt_modal_add_user_header">
                  <!--begin::Modal title-->
                  <h2 class="fw-bolder">Add Leads</h2>
                  <!--end::Modal title-->
                  <!--begin::Close-->
                  <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
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
                  <form id="kt_modal_add_user_form" class="form" method="post">
                    <!--begin::Scroll-->
                    <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header" data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                      <div class="fv-row mb-7 fv-plugins-icon-container">
                        <label class="fw-bold fs-6 mb-2">Enter name</label>
                        <input type="text" id="name" v-model="name" name="name" placeholder="Enter name" class="form-control form-control-solid mb-3 mb-lg-0" />
                      </div>
                      <div class="fv-row mb-7 fv-plugins-icon-container">
                        <label class="fw-bold fs-6 mb-2 required">Enter email</label>
                        <input type="email" name="email" v-model="email" id="email" placeholder="Enter email"
                          class="form-control form-control-solid mb-3 mb-lg-0" />
                      </div>
                    </div>

                    <div class="text-center mb-7">
                      <div class="form-row mb-3 bg-primary p-3" v-for="(custom, index) in customDataStructure" :key="index">
                        <div class="col d-flex align-items-center">
                          <input type="text" v-model="custom.property" placeholder="Enter property" class="form-control form-control-solid mb-3 mb-lg-0 mx-1" required />
                          <input type="text" v-model="custom.value" placeholder="Enter value" class="form-control form-control-solid mb-3 mb-lg-0 mx-1" />
                          <span class="svg-icon svg-icon-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-bs-title="Delete" @click="removeCustom(custom)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                              <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="#FFFFFF" />
                              <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="#FFFFFF" />
                              <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="#FFFFFF" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="mb-7 text-center">
                      <button type="button" class="btn btn-primary" @click="addCustom()">
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg-->
                        <span class="svg-icon svg-icon-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none">
                            <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1"
                              transform="rotate(-90 11.364 20.364)" fill="currentColor"></rect>
                            <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor">
                            </rect>
                          </svg>
                        </span>
                        <!--end::Svg Icon-->Add custom data
                      </button>
                    </div>
                    <!--end::Scroll-->
                    <!--begin::Actions-->
                    <div class="text-center pt-15">
                      <button type="submit" class="btn btn-light me-3" data-kt-users-modal-action="cancel">
                        Close
                      </button>
                      <button type="submit" class="btn btn-primary" data-kt-users-modal-action="submit">
                        <span class="indicator-label">Submit</span>
                        <span class="indicator-progress">Please wait...
                          <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                      </button>
                    </div>
                    <!--end::Actions-->
                  </form>
                  <!--end::Form-->
                </div>
                <!--end::Modal body-->
              </div>
              <!--end::Modal content-->
            </div>
            <!--end::Modal dialog-->
          </div>
          <!--end::Modal - Add task-->
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end::Card header-->
      <!--begin::Card body-->
      <div class="card-body py-4 overflow-auto">
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
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Verified</th>
              <th>Extra Fields</th>
              <th>Created At</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 fw-bold"></tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Card body-->
    </div>
  </div>
  `,
  props: ['profile_details'],
  name: 'edit_lists',
  components: {
    'basic-details': BasicDetails,
    'list-template': ListTemplates
  },
  data: () => ({
    is_edit: true,
    error_data: [],
    value_message: "",
    id: 0,
    all_table_lists: {
      list_type: 'get_leads',
      list_id: 0,
      lists: []
    },
    totalLeads: 0,
    name: '',
    email: '',
    source: 'Admin',
    valid: 0,
    status: 'create',
    customDataStructure: [],
    csv_data: {
      init: false,
      data: {
        name: [],
        email: []
      },
      selected_name: 'NO',
      selected_email: 'NO',
      is_replace: false,
    },
    parent: null,
    live_inserting: {
      text: "",
      min: 0,
      max: 0
    },
    dataTable: null,
    _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
  }),
  mounted() {
    setScript('assets/js/tinymce/tinymce.min.js', 'tinymce_min_js');
    let queryPath = this.$route.query;
    if (Object.keys(queryPath).length === 0) {
      this.$router.push({
        name: "all_lists",
      });
    }

    if (queryPath.id !== undefined && window.location.pathname.split("/").pop() == 'edit_list') {
      setScript(`.swal_custom_value {max-width: 600px;} .leads_extra_fields .table tr, .leads_extra_fields .table td{text-transform:none !important;}`, 'edit_list_table_script2', 'css')
      this.getLists();
      this.utilScript();
    }
    this.tableScript();
    document.getElementById("kt_table_users_processing").removeAttribute("style");
  },
  unmounted() {
    deleteScript("edit_list_table_script2");
  },
  methods: {
    edit_lead(list) {
      this.name = list.name;
      this.id = list.id;
      this.valid = list.valid;
      this.email = list.email;
      this.confirmed = list.confirmed;
      this.source = list.source;
      this.customDataStructure = JSON.parse(list.extra_fields);
      this.status = "update";
    },
    show_extrafields(extra_fields) {
      let swal_html = ``
      try {
        let custom_fields = JSON.parse(extra_fields)
        if (custom_fields.length > 0) {
          let thead_tr = ``;
          let tbody_tr = ``;
          custom_fields.forEach((value, index) => {
            if(value.property !=="" && value.value !== "") {
              thead_tr += `<th>${value.property}</th>`
              tbody_tr += `<td>${value.value}</td>`
            }
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
    },
    addCustom() {
      this.customDataStructure.push({
        property: '',
        value: ''
      });
      setTimeout(function () {
        $('[data-bs-toggle="tooltip"]').tooltip();
      }, 500);
    },

    removeCustom(custom) {
      let index = this.customDataStructure.indexOf(custom)
      this.customDataStructure.splice(index, 1)
    },

    routeList() {
      this.$router.push({
        name: "all_lists",
      });
    },
    getLists() {
      let url = "list";
      this.all_table_lists.list_id = this.$route.query.id
      let method = axios.post;
      method(url, this.all_table_lists).then((res) => {
        let post_data = res.data;
        this.all_table_lists.lists = post_data.message;
        this.dataTable.clear().rows.add(post_data.message).draw();
      }).catch((error) => {
        swal_fire("", "error", error.response.data.message)
      }).finally(() => {
        this.totalLeads = this.all_table_lists.lists.length;
        document.getElementById("kt_table_users_processing").style.display = "none";
      });
    },
    utilScript() {
      "use strict";
      var KTUsersAddUser = (function (__this) {
        var __this = __this;
        const t = document.getElementById("kt_modal_add_user"),
          e = t.querySelector("#kt_modal_add_user_form"),
          n = new bootstrap.Modal(t);
        return {
          init: function () {
            (() => {
              var o = FormValidation.formValidation(e, {
                fields: {
                  email: {
                    validators: {
                      onlyBlankSpaces: { message: "Email is required" },
                      emailAddress: { message: "The value is not a valid email address" }
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
              const form_close = t.querySelector('[data-kt-users-modal-action="cancel"]');
              form_close.addEventListener("click", (t) => {
                t.preventDefault();
                e.reset(), n.hide()
              });
              const form_cancel = t.querySelector('[data-kt-users-modal-action="close"]');
              form_cancel.addEventListener("click", (t) => {
                t.preventDefault();
                e.reset(), n.hide()
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

                      let custom_values = JSON.stringify(__this.customDataStructure)
                      let formData = new FormData()
                      formData.append('list_type', 'create_leads')
                      formData.append('custom', custom_values)
                      formData.append('name', __this.name)
                      formData.append('id', __this.id)
                      formData.append('email', __this.email)
                      formData.append('source', __this.source)
                      formData.append('valid', __this.valid)
                      formData.append('status', __this.status)
                      formData.append('list_id', __this.$route.query.id)

                      axios.post("list", formData)
                        .then((res) => {
                          let post_data = res.data
                          let status = post_data.status;
                          __this.value_message = post_data.message
                          if (status) {
                            if (__this.status == 'create') {
                              Swal.fire({
                                text: "Lead added successfully",
                                icon: "success",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                  confirmButton: "btn btn-primary",
                                },
                              }).then(function (t) {
                                let json_message = __this.value_message;

                                addDatatableData(__this.dataTable, {
                                  'id': json_message.id,
                                  'name': __this.name,
                                  'email': __this.email,
                                  'source': __this.source,
                                  'valid': __this.valid,
                                  'extra_fields': JSON.stringify(__this.customDataStructure),
                                  'created_at': json_message.created_at
                                });

                                __this.resetForm(n, t);
                              });
                            } else {
                              Swal.fire({
                                text: "Lead updated successfully",
                                icon: "success",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                  confirmButton: "btn btn-primary",
                                },
                              }).then(function (t) {
                                var rowIndex = __this.dataTable.row(__this.parent).index();
                                var row = __this.dataTable.row(rowIndex);
                                var rowData = row.data();
                                rowData.name = __this.name;
                                rowData.email = __this.email;
                                rowData.extra_fields = __this.customDataStructure;
                                row.data(rowData);
                                row.draw();
                                __this.resetForm(n, t, 1);
                              });
                            }
                          } else {
                            Swal.fire({ text: __this.value_message, icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn fw-bold btn-primary" } })
                          }
                        })
                        .catch((error) => {
                          swal_fire(KTUtil, 'error', error.response.data.message)
                          __this.value_message = ''
                        }).finally(() => {
                          i.removeAttribute('data-kt-indicator')
                          i.disabled = !1
                        });
                    } else {
                      Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: { confirmButton: "btn btn-primary" },
                      });
                    }
                  });
              })
            })();
          },
        };
      })(this);
      KTUtil.onDOMContentLoaded(function () {
        KTUsersAddUser.init();
      }, this);
    },

    change_is_edit(is_edit) {
      this.is_edit = is_edit;
    },

    resetForm(n, t) {
      n.hide();
      this.name = '';
      this.email = '';
      this.customDataStructure = [];
      this.parent = null;
      t.isConfirmed;
    },

    mlrUploadCsv1(str) {
      let __this = this;
      if (str == "open") {
        document.getElementById("qmlr-exportcsv").click();
      } else {
        var fileob = document.getElementById("qmlr-exportcsv");
        var file_name = fileob.value;
        file_name = file_name.substring(file_name.lastIndexOf("\\") + 1, file_name.length);

        if (this.checkValidCsv(file_name)) {
          var reader = new FileReader();
          var fileobb = fileob.files[0];
          var currentLeads = __this.all_table_lists.lists.length;
          reader.onload = function () {
            document.getElementById("live_inserting").classList.remove("d-none");
            var result = this.result
            var arr = result.split(/\r?\n|\r/)
            var head = arr[0].trim()
            head = head.split(',')
            __this.csv_data.data.name = __this.csv_data.data.email = []

            for (var i = 0; i < head.length; i++) {
              __this.csv_data.data.name[i] = __this.csv_data.data.email[i] = head[i]
            }
            document.getElementById("field_modal_show").click()
            document.getElementById('mlrcsvfilesave').onclick = function () {
              var selected_name = __this.csv_data.selected_name;
              var selected_email = __this.csv_data.selected_email;
              var selected_email = __this.csv_data.selected_email;
              var is_replace = __this.csv_data.is_replace;
              var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              let form_data = new FormData();
              form_data.append('data', fileobb);
              form_data.append('before', currentLeads);
              form_data.append('list_type', "storefromcsv");
              form_data.append('csv_type', "upload");
              form_data.append('campaign_type', "attachment");
              form_data.append('selected_name', selected_name);
              form_data.append('selected_email', selected_email);
              form_data.append('list_id', __this.all_table_lists.list_id);
              __this.live_inserting.text = "Uploading";

              axios.post("list", form_data, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'X-CSRF-Token': __this._token
                }
              }).then((res) => {
                res = res.data;
                if (res.status) {
                  axios.post("list", {
                    data: res.file,
                    csv_type: "add",
                    before: currentLeads,
                    list_type: "storefromcsv",
                    head: head,
                    selected_name: (selected_name == 0 || selected_name) ? selected_name : "NA",
                    selected_email: selected_email,
                    is_replace: is_replace,
                    list_id: __this.all_table_lists.list_id,
                  }).then((res) => {
                    res = res.data;
                    if (res.status) {
                      __this.live_inserting.min = 0;
                      __this.live_inserting.max = res.count;
                      (async function (___this) {
                        ___this.live_inserting.text = __this.live_inserting.min + "/" + __this.live_inserting.max;
                        var doWhileCase = 1, csv_button = document.getElementById('mlrcsvfilesave');
                        csv_button.setAttribute("data-kt-indicator", "on");
                        csv_button.disabled = !0;

                        const timer = ms => new Promise(res => setTimeout(res, ms))
                        do {
                          await timer(3000);
                          axios.post("list", {
                            list_type: "storefromcsv",
                            list_id: ___this.all_table_lists.list_id,
                            before: currentLeads,
                            csv_type: "check",
                          }, {
                            headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'X-CSRF-Token': ___this._token
                            }
                          }).then((res) => {
                            var post_data = res.data;
                            ___this.live_inserting.min = parseInt(post_data.count);
                            ___this.live_inserting.text = ___this.live_inserting.min + "/" + ___this.live_inserting.max;
                            if (___this.live_inserting.min == ___this.live_inserting.max) {
                              doWhileCase = 0;
                                swal_fire("", "success", "Inserted successfully");
                                location.reload();
                            }
                          }).catch((error) => {
                            console.log(error)
                            if (___this.live_inserting.min == ___this.live_inserting.max) {
                              csv_button.removeAttribute("data-kt-indicator");
                              csv_button.disabled = !1;
                              csv_button.innerHTML = "Import from CSV";
                              doWhileCase = 0;
                              swal_fire("", "error", "Something went wrong, please try again");
                            }
                          }).finally(() => {
                            if (___this.live_inserting.min == ___this.live_inserting.max) {
                              csv_button.removeAttribute("data-kt-indicator");
                              csv_button.disabled = !1;
                              csv_button.innerHTML = "Import from CSV";
                            }
                          });
                        } while (doWhileCase == 1);
                      })(__this);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Unable to upload the CSV file',
                            text: 'Please check your file format and emails column.'
                        });
                    }
                  });
                }
              });
            }
          };
          reader.readAsBinaryString(fileobb)
          document.getElementById("uploadedcsv").innerHTML = file_name
        } else {
          setSwalMixin('Please select a valid CSV file.', 'warning', 3000)
        }
      }
    },

    proceedNextAfterInsert(currentLeads, list_id, totalArr) {
      let ___this = this;
      let loop = true;
      var csv_button = document.getElementById('mlrcsvfilesave');
      do {
        axios.post("list", {
          list_type: "storefromcsv",
          list_id: list_id,
          before: currentLeads,
          csv_type: "check"
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-Token': ___this._token
          }
        }).then((res) => {
          ___this.live_inserting.min = post_data.count;
          if (totalArr == post_data.count) {
            loop = false;
          }
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          if (!loop) {
            csv_button.removeAttribute("data-kt-indicator");
            csv_button.disabled = !1;
            csv_button.innerHTML = "Import from CSV";
          }
        });
      } while (loop == true)
    },

    checkValidCsv(file_name) {
      var parts = file_name.split('.')
      var part = parts[parts.length - 1]
      switch (part.toLowerCase()) {
        case 'csv': return true;
      }
      return false;
    },

    tableScript() {
      "use strict";
      var KTUsersList = function (__this) {
        var e, t, n, r, tb, mom, o = document.getElementById("kt_table_users"), export_trigger = document.querySelector('[data-kt-export-trigger="true"]'), form_appear = document.querySelector('[data-bs-target="#kt_modal_add_user"]'), importCsv = document.querySelector("#uploadedcsv"),
          c = () => {
            const deleteButtons = document.querySelectorAll('[data-kt-users-table-filter="delete_row"]');
            deleteButtons.forEach(d => {
              // Delete button on click
              d.addEventListener('click', function (e) {
                e.preventDefault();
                // Select parent row
                const parent = e.target.closest('tr');
                // Get customer name
                const userName = parent.querySelectorAll('td')[2].innerText;

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
                      list_type: "delete_leads",
                      id: selected_id,
                      list_id: __this.$route.query.id
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
                text: "Are you sure you want to delete selected leads?",
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
                    list_type: "delete_leads",
                    id: ids,
                    list_id: __this.$route.query.id
                  }, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'X-CSRF-Token': __this._token
                    }
                  }).then((res) => {
                    Swal.fire({
                      text: "You have deleted all selected leads!.",
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
                    text: "Selected leads were not deleted.",
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
          showExtraFields = () => {
            var all_rows = document.querySelectorAll('[show_extra_fields="true"');
            all_rows.forEach(row => {
              row.addEventListener("click", function (e) {
                e.preventDefault();
                __this.show_extrafields(JSON.parse(decodeURIComponent(escape(window.atob(row.value)))));
              })
            })
          },
          editButtonHandle = () => {
            var all_rows = document.querySelectorAll('[data-list-table-filter-title="edit_row"]');
            all_rows.forEach(row => {
              row.addEventListener("click", function (e) {
                e.preventDefault();
                __this.parent = row;
                __this.edit_lead(JSON.parse(decodeURIComponent(escape(window.atob(row.value)))));
                setTimeout(function () {
                  $('[data-bs-toggle="tooltip"]').tooltip();
                }, 500);
              })
            });
          };
        const a = () => {
          const e = o.querySelectorAll('tbody [type="checkbox"]');
          let c = !1,
            l = 0;
          e.forEach((e => {
            e.checked && (c = !0, l++)
          })), c ? (r.innerHTML = l, n.classList.remove("d-none"), export_trigger.classList.add('d-none'), form_appear.classList.add('d-none'), importCsv.classList.add('d-none')) : (n.classList.add("d-none"), export_trigger.classList.remove('d-none'), form_appear.classList.remove('d-none'), importCsv.classList.remove('d-none'))
        };
        return {
          init: function () {
            o && ((__this.dataTable = tb = e = $(o).DataTable({
              info: 1,
              searchDelay: 500,
              processing: true,
              data: __this.all_table_lists.lists,
              pageLength: 10,
              lengthChange: 1,
              oLanguage: {
                sEmptyTable: "No leads found!"
              },
              drawCallback: function () {
                $('[data-bs-toggle="tooltip"]').tooltip();
              },
              columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'email' },
                { data: 'source' },
                { data: 'verified' },
                { data: 'extra_fields' },
                { data: 'created_at' },
                { data: null },
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
                    return data;
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
                    return data ? 'Yes' : 'No';
                  }
                },
                {
                  targets: 5,
                  orderable: true,
                  className: 'text-nowrap',
                  render: function (data, type) {
                    data = window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
                    return `<button class="btn unstyled-button text-info" show_extra_fields="true" value="${data}"><i class="fas fa-eye"></i></button>`;
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
                  targets: -1,
                  orderable: false,
                  className: 'text-end d-flex align-items-center justify-content-between',
                  render: function (data, type, row) {
                    data = window.btoa(unescape(encodeURIComponent(JSON.stringify(row))));
                    return `
                    <button type="button" class="btn btn-primary btn-active-light-primary btn-sm me-3" value="${data}" data-bs-toggle="modal" data-list-table-filter-title="edit_row" data-bs-target="#kt_modal_add_user" ><i class="bi bi-pencil" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i></button>
                    <button class="btn btn-danger btn-active-light-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" :value="list.id" data-kt-users-table-filter="delete_row"><i class="fa fa-trash"></i></button>
                    `;
                  },
                },
              ]
            })).on("draw", (function () {
              l(), c(), a(), editButtonHandle(), showExtraFields();
            })), (() => {
              const documentTitle = 'List export';

              var dataTable = __this.dataTable;
              var buttons = new $.fn.dataTable.Buttons(o, {
                buttons: [
                  {
                    extend: 'copyHtml5',
                    title: documentTitle,
                    exportOptions: {
                      columns: [1, 2, 3, 4, 5, 6]
                    },
                  },
                  {
                    extend: 'csvHtml5',
                    title: documentTitle,
                    exportOptions: {
                      columns: [1, 2, 3, 4, 5, 6]
                    },
                  },
                ]
              }).container().appendTo($('#mlr_list_report_views_export'));

              // Hook dropdown menu click event to datatable export buttons
              const exportButtons = document.querySelectorAll('#mlr_list_report_views_export_menu [data-kt-ecommerce-export]');
              exportButtons.forEach(exportButton => {
                exportButton.addEventListener('click', e => {
                  e.preventDefault();

                  // Get clicked export value
                  const exportValue = e.target.getAttribute('data-kt-ecommerce-export');
                  const target = document.querySelector('.dt-buttons .buttons-' + exportValue);

                  // Trigger click event on hidden datatable export buttons
                  target.click();
                });
              });
              KTMenu.createInstances();
            })(), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function (t) {
              e.search(t.target.value).draw();
            })), c(), editButtonHandle(), showExtraFields())
          }
        }
      }(this);
      KTUtil.onDOMContentLoaded((function () {
        KTUsersList.init(this);
      }));
    }
  }
}