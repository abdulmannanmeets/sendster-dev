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
            placeholder="Search user" />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div class="d-flex justify-content-end" data-kt-user-table-toolbar="base">
          <!--begin::Filter-->
          <button type="button" class="btn btn-light-primary me-3" data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end">
            <!--begin::Svg Icon | path: icons/duotune/general/gen031.svg-->
            <span class="svg-icon svg-icon-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                  fill="currentColor" />
              </svg>
            </span>
            <!--end::Svg Icon-->Filter
          </button>
          <!--begin::Menu 1-->
          <div class="menu menu-sub menu-sub-dropdown w-300px w-md-325px" data-kt-menu="true">
            <!--begin::Header-->
            <div class="px-7 py-5">
              <div class="fs-5 text-dark fw-bolder">Filter Options</div>
            </div>
            <!--end::Header-->
            <!--begin::Separator-->
            <div class="separator border-gray-200"></div>
            <!--end::Separator-->
            <!--begin::Content-->
            <div class="px-7 py-5" data-kt-user-table-filter="form">
              <!--begin::Input group-->
              <div class="mb-10">
                <label class="form-label fs-6 fw-bold">Role:</label>
                <select class="form-select form-select-solid fw-bolder" data-kt-select2="true"
                  data-placeholder="Select option" data-allow-clear="true" data-kt-user-table-filter="role"
                  data-hide-search="true">
                  <option></option>
                  <option value="Administrator">Administrator</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Developer">Developer</option>
                  <option value="Support">Support</option>
                  <option value="Trial">Trial</option>
                </select>
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="mb-10">
                <label class="form-label fs-6 fw-bold">Two Step Verification:</label>
                <select class="form-select form-select-solid fw-bolder" data-kt-select2="true"
                  data-placeholder="Select option" data-allow-clear="true" data-kt-user-table-filter="two-step"
                  data-hide-search="true">
                  <option></option>
                  <option value="Enabled">Enabled</option>
                </select>
              </div>
              <!--end::Input group-->
              <!--begin::Actions-->
              <div class="d-flex justify-content-end">
                <button type="reset" class="
                    btn btn-light btn-active-light-primary
                    fw-bold
                    me-2
                    px-6
                  " data-kt-menu-dismiss="true" data-kt-user-table-filter="reset">
                  Reset
                </button>
                <button type="submit" class="btn btn-primary fw-bold px-6" data-kt-menu-dismiss="true"
                  data-kt-user-table-filter="filter">
                  Apply
                </button>
              </div>
              <!--end::Actions-->
            </div>
            <!--end::Content-->
          </div>
          <!--end::Menu 1-->
          <!--end::Filter-->
          <!--begin::Export-->
          <button type="button" class="btn btn-light-primary me-3" data-bs-toggle="modal"
            data-bs-target="#kt_modal_export_users">
            <!--begin::Svg Icon | path: icons/duotune/arrows/arr078.svg-->
            <span class="svg-icon svg-icon-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.3" x="12.75" y="4.25" width="12" height="2" rx="1" transform="rotate(90 12.75 4.25)"
                  fill="currentColor" />
                <path
                  d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z"
                  fill="currentColor" />
                <path
                  d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z"
                  fill="#C4C4C4" />
              </svg>
            </span>
            <!--end::Svg Icon-->Export
          </button>
          <!--end::Export-->
          <!--begin::Add user-->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_user">
            <!--begin::Svg Icon | path: icons/duotune/arrows/arr075.svg-->
            <span class="svg-icon svg-icon-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1"
                  transform="rotate(-90 11.364 20.364)" fill="currentColor" />
                <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor" />
              </svg>
            </span>
            <!--end::Svg Icon-->Create List
          </button>
          <!--end::Add user-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div class="d-flex justify-content-end align-items-center d-none" data-kt-user-table-toolbar="selected">
          <div class="fw-bolder me-5">
            <span class="me-2" data-kt-user-table-select="selected_count"></span>Selected
          </div>
          <button type="button" @click="deleteSelected()" class="btn btn-danger"
            data-kt-user-table-select="delete_selected">
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Modal - Adjust Balance-->
        <div class="modal fade" id="kt_modal_export_users" tabindex="-1" aria-hidden="true">
          <!--begin::Modal dialog-->
          <div class="modal-dialog modal-dialog-centered mw-650px">
            <!--begin::Modal content-->
            <div class="modal-content">
              <!--begin::Modal header-->
              <div class="modal-header">
                <!--begin::Modal title-->
                <h2 class="fw-bolder">Export Lists</h2>
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
                <form id="kt_modal_export_users_form" class="form" action="#">
                  <!--begin::Input group-->
                  <div class="fv-row mb-10">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-bold form-label mb-2">Select Export Format:</label>
                    <!--end::Label-->
                    <!--begin::Input-->
                    <select name="format" data-control="select2" data-placeholder="Select a format"
                      data-hide-search="true" class="form-select form-select-solid fw-bolder">
                      <option></option>
                      <option value="excel">Excel</option>
                      <!-- <option value="pdf">PDF</option> -->
                      <!-- <option value="csv">CSV</option> -->
                      <!-- <option value="zip">ZIP</option> -->
                    </select>
                    <!--end::Input-->
                  </div>
                  <!--end::Input group-->
                  <!--begin::Actions-->
                  <div class="text-center">
                    <button type="reset" class="btn btn-light me-3" data-kt-users-modal-action="cancel">
                      Discard
                    </button>
                    <button type="submit" class="btn btn-primary" data-kt-users-modal-action="submit">
                      <span class="indicator-label">Submit</span>
                      <span class="indicator-progress">Please wait...
                        <span class="
                            spinner-border spinner-border-sm
                            align-middle
                            ms-2
                          "></span></span>
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
        <!--end::Modal - New Card-->
        <!--begin::Modal - Add task-->
        <div class="modal fade" id="kt_modal_add_user" tabindex="-1" aria-hidden="true">
          <!--begin::Modal dialog-->
          <div class="modal-dialog modal-dialog-centered mw-650px">
            <!--begin::Modal content-->
            <div class="modal-content">
              <!--begin::Modal header-->
              <div class="modal-header" id="kt_modal_add_user_header">
                <!--begin::Modal title-->
                <h2 class="fw-bolder">Create List</h2>
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
                <form id="kt_modal_add_user_form" class="form" action="#">
                  <!--begin::Scroll-->
                  <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll"
                    data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}"
                    data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header"
                    data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7 fv-plugins-icon-container">
                      <!--begin::Label-->
                      <label class="required fw-bold fs-6 mb-2">Enter list title</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <input type="text" id="list_title" name="list_title" v-model="create_item.list_title"
                        placeholder="Enter title" class="form-control form-control-solid mb-3 mb-lg-0" />
                      <!--end::Input-->
                      <div class="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                    <!--end::Input group-->
                    <!--begin::Input group-->
                    <div class="fv-row mb-7 fv-plugins-icon-container">
                      <!--begin::Label-->
                      <label class="fw-bold fs-6 mb-2">Enter list description (Optional)</label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <input type="text" name="list_description" id="list_description"
                        v-model="create_item.list_description" placeholder="Enter list detail"
                        class="form-control form-control-solid mb-3 mb-lg-0" />
                      <!--end::Input-->
                      <div class="fv-plugins-message-container invalid-feedback"></div>
                    </div>
                    <!--end::Input group-->
                  </div>
                  <!--end::Scroll-->
                  <!--begin::Actions-->
                  <div class="text-center pt-15">
                    <button type="reset" class="btn btn-light me-3" data-kt-users-modal-action="cancel">
                      Close
                    </button>
                    <button type="submit" class="btn btn-primary" data-kt-users-modal-action="submit">
                      <span class="indicator-label">Submit</span>
                      <span class="indicator-progress">Please wait...
                        <span class="
                            spinner-border spinner-border-sm
                            align-middle
                            ms-2
                          "></span></span>
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
    <div class="card-body py-4">
      <!--begin::Table-->
      <table class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" id="kt_table_users">
        <!--begin::Table head-->
        <thead>
          <!--begin::Table row-->
          <tr class="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
            <th class="w-10px pe-2">
              <div class="
                  form-check form-check-sm form-check-custom form-check-solid
                  me-3
                ">
                <input class="form-check-input" type="checkbox" data-kt-check="true"
                  data-kt-check-target="#kt_table_users .form-check-input" value="1" />
              </div>
            </th>
            <th class="min-w-125px">Title</th>
            <th class="min-w-125px">Leads</th>
            <th class="min-w-125px">List ID</th>
            <th class="min-w-125px">Verified Lists</th>
            <th class="min-w-125px">Created at</th>
            <th class="text-end min-w-100px">Actions</th>
          </tr>
          <!--end::Table row-->
        </thead>
        <!--end::Table head-->
        <!--begin::Table body-->
        <tbody class="text-gray-600 fw-bold">
          <!--begin::Table row-->
          <tr v-for="list in all_lists.lists" :key="list.id" :id="list.id">
            <!--begin::Checkbox-->
            <td>
              <div class="form-check form-check-sm form-check-custom form-check-solid">
                <input :id="'input_' + list.id" class="form-check-input" type="checkbox" value="1">
              </div>
            </td>
            <!--end::Checkbox-->
            <!--begin::User=-->
            <td class="d-flex align-items-center">
              <!--begin::User details-->
              <a href="#" class="text-gray-800 text-hover-primary mb-1">{{ list.title }}</a>
              <!--begin::User details-->
            </td>
            <!--end::User=-->
            <!--begin::Role=-->
            <td class="">{{ list.leads }}</td>
            <!--end::Role=-->
            <!--begin::Last login=-->
            <td :data-order="list.id">
              <div class="badge badge-light fw-bolder" >
                  {{ list.id }}
              </div>
            </td>
            <!--end::Last login=-->
            <!--begin::Two step=-->
            <td class="sorting_1">
              <div class="badge badge-light-success fw-bolder">{{ list.verified_lists }}</div>
            </td>
            <!--end::Two step=-->
            <!--begin::Joined-->
            <td :data-order="list.created_at" class="">{{ list.created_at }}</td>
            <!--begin::Joined-->
            <!--begin::Action=-->
            <td class="text-end d-flex align-items-center justify-content-between">
              <a @click="routeList(list.id)" class="btn btn-light btn-active-light-primary btn-sm">Edit
              </a>
              <a @click="deleteList(list.id)" :value="list.id" data-kt-users-table-filter="delete_row"
                class="btn btn-light btn-active-light-primary btn-sm">Delete
              </a>
            </td>
            <!--end::Action=-->
          </tr>
          <!--end::Table row-->
        </tbody>
        <!--end::Table body-->
      </table>
      <!--end::Table-->
    </div>
    <!--end::Card body-->
  </div>
    `
}