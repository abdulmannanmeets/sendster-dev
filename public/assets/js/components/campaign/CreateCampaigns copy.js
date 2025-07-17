export default {
    template: `
    <div class="card">
        <div class="card-body p-lg-17">
            <div class="row mb-3">
                <div class="col-md-12 pe-lg-10">
                    <form id="kt_campaign_form" class="form" action="#">
                        <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll">
                            <div class="row mb-5">
                                <div class="col-md-6 fv-row mb-7 fv-plugins-icon-container">
                                    <label class="required fw-bold fs-6 mb-2">Enter campaign title</label>
                                    <input type="text" id="campaign_title" name="campaign_title" v-model="create_item.campaign_title" placeholder="Enter title" class="form-control form-control-solid mb-3 mb-lg-0" />
                                </div>
                                <div class="col-md-6 fv-row mb-7 fv-plugins-icon-container">
                                    <label class="fw-bold fs-6 mb-2">Enter campaign description (Optional)</label>
                                    <input type="text" name="campaign_description" id="campaign_description" v-model="create_item.campaign_description" placeholder="Enter campaign detail" class="form-control form-control-solid mb-3 mb-lg-0" />
                                </div>
                            </div>
                            <div class="fv-row mb-7 fv-plugins-icon-container">
                                <label class="required fw-bold fs-6 mb-2">Enter email subject</label>
                                <input type="text" id="email_subject" name="email_subject" v-model="create_item.email_details.subject" placeholder="Enter email subject" class="form-control form-control-solid mb-3 mb-lg-0" />
                            </div>
                            <div class="row mb-5">
                                <div class="col-md-6 fv-row mb-7 fv-plugins-icon-container">
                                    <label class="required fw-bold fs-6 mb-2">Select lists</label>
                                    <input class="form-control form-control-solid" name="select_list" v-model="create_item.email_details.list_ids" data-kt-campaign-list="tagify" />
                                </div>
                                <div class="col-md-6 fv-row mb-7 fv-plugins-icon-container">
                                    <label class="required fw-bold fs-6 mb-2">Select smtps</label>
                                    <input class="form-control form-control-solid" name="select_smtp" v-model="create_item.email_details.smtp_ids" data-kt-campaign-smtp="tagify" />
                                </div>
                            </div>
                            <div class="fv-row mb-7 fv-plugins-icon-container">
                                <label class="fw-bold fs-6 mb-2">Manual emails</label>
                                <textarea name="manual_email" id="manual_email" v-model="create_item.email_details.manual_emails" placeholder="Enter emails manually (One on each line)" class="form-control form-control-solid mb-3 mb-lg-0"></textarea>
                            </div>
                            <div class="fv-row mb-7 fv-plugins-icon-container">
                                <label class="required fw-bold fs-6 mb-2">Body of the email</label>
                                <textarea id="email_body" name="email_body" placeholder="Enter email" class="form-control form-control-solid mb-3 mb-lg-0">{{create_item.email_body.body}}</textarea>
                            </div>
                            <div class="fv-row mb-7 fv-plugins-icon-container">
                                <label class="fw-bold fs-6 mb-2">Plain text version</label>
                                <textarea rows="7" id="plain_body" name="plain_body"
                                    v-model="create_item.email_body.plain_body" placeholder="Enter plain text version"
                                    class="form-control form-control-solid mb-3 mb-lg-0"></textarea>
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
                            </div>
                            <div class="fv-row mb-7 fv-plugins-icon-container">
                                <label class="fw-bold fs-6 mb-2 required">Unsubscribe message</label>
                                <textarea name="unsubscribe_message" class="form-control mb-3 mb-lg-0" rows="5" v-model="create_item.other.unsubscribe_message"></textarea>
                            </div>

                            <div class="fv-row mb-7">
                                <!--begin::Wrapper-->
                                <div class="d-flex flex-stack">
                                    <!--begin::Label-->
                                    <div class="me-5">
                                        <!--begin::Label-->
                                        <label class="fs-6 fw-bold">Track opens</label>
                                        <!--end::Label-->
                                    </div>
                                    <!--end::Label-->
                                    <!--begin::Switch-->
                                    <label class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                        <input class="form-check-input" type="checkbox" :checked="create_item.other.track_open" v-model="create_item.other.track_open">
                                        <span class="form-check-label fw-bold text-muted" for="kt_modal_add_customer_billing">{{create_item.other.track_open=='true' ? 'Yes' : 'No'}}</span>
                                    </label>
                                    <!--end::Switch-->
                                </div>
                                <!--begin::Wrapper-->
                            </div>
                            <div class="fv-row mb-7">
                                <!--begin::Wrapper-->
                                <div class="d-flex flex-stack">
                                    <!--begin::Label-->
                                    <div class="me-5">
                                        <!--begin::Label-->
                                        <label class="fs-6 fw-bold">Track clicks</label>
                                        <!--end::Label-->
                                    </div>
                                    <!--end::Label-->
                                    <!--begin::Switch-->
                                    <label
                                        class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                        <!--begin::Input-->
                                        <input class="form-check-input" type="checkbox" checked="checked" v-model="create_item.other.track_click">
                                        <!--end::Input-->
                                        <!--begin::Label-->
                                        <span class="form-check-label fw-bold text-muted" for="kt_modal_add_customer_billing">{{create_item.other.track_click ? 'Yes' : 'No'}}</span>
                                        <!--end::Label-->
                                    </label>
                                    <!--end::Switch-->
                                </div>
                                <!--begin::Wrapper-->
                            </div>
                            <div class="fv-row mb-7">
                                <!--begin::Wrapper-->
                                <div class="d-flex flex-stack">
                                    <!--begin::Label-->
                                    <div class="me-5">
                                        <!--begin::Label-->
                                        <label class="fs-6 fw-bold">Schedule</label>
                                        <!--end::Label-->
                                    </div>
                                    <!--end::Label-->
                                    <!--begin::Switch-->
                                    <label
                                        class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
                                        <!--begin::Input-->
                                        <input class="form-check-input" type="checkbox" :checked="create_item.other.is_schedule !== 'false'" v-model="create_item.other.is_schedule">
                                        <!--end::Input-->
                                        <!--begin::Label-->
                                        <span class="form-check-label fw-bold text-muted" for="kt_modal_add_customer_billing">{{create_item.other.is_schedule ? 'Yes' : 'No'}}</span>
                                        <!--end::Label-->
                                    </label>
                                    <!--end::Switch-->
                                </div>
                                <!--begin::Wrapper-->
                            </div>
                            <div class="fv-row mb-7" v-show="create_item.other.is_schedule !== 'false'">
                                <!--begin::Wrapper-->
                                <div class="d-flex flex-stack">
                                    <!--begin::Label-->
                                    <div class="me-5">
                                        <label class="fs-6 fw-bold">Select date and time</label>
                                    </div>
                                    <label class="form-check form-switch form-check-custom form-check-solid">
                                        <!--begin::Input-->
                                        <div class="fv-row fv-plugins-icon-container">
                                            <div class="position-relative d-flex align-items-center">
                                                <!--begin::Svg Icon | path: icons/duotune/general/gen014.svg-->
                                                <span class="svg-icon position-absolute ms-4 mb-1 svg-icon-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="currentColor"></path>
                                                        <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="currentColor"></path>
                                                        <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="currentColor"></path>
                                                    </svg>
                                                </span>
                                                <input class="form-control form-control-solid ps-12" v-model="create_item.other.schedule_option.datetime" placeholder="Select a date" name="datetime" />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div class="fv-row mb-7" v-show="create_item.other.is_schedule !== 'false'" id="timezone_drop">
                                <!--begin::Wrapper-->
                                <div class="d-flex flex-stack">
                                    <!--begin::Label-->
                                    <div class="me-5">
                                        <label class="fs-6 fw-bold">Select timezone</label>
                                    </div>
                                    <label class="form-check form-switch form-check-custom form-check-solid">
                                        <div class="fv-row fv-plugins-icon-container">
                                            <div class="position-relative d-flex align-items-center">
                                                <select aria-label="Select a timezone" data-control="select2" data-placeholder="Select a timzone..." data-dropdown-parent="#timezone_drop" class="form-select form-select-solid fw-bolder" name="select_timezone" v-model="create_item.other.schedule_option.timezone">
                                                    <option value="">Select a timezone</option>
                                                    <option v-for="(value, index) in timezones" :value="value.timezone">{{ value.name }}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--end::Scroll-->
                        <!--begin::Actions-->
                        <div class="pt-15">
                            <button type="submit" class="btn btn-primary" id="kt_submit_campaign_form">
                                <span class="indicator-label">Submit</span>
                                <span class="indicator-progress">Please wait...
                                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            </button>
                        </div>
                        <!--end::Actions-->
                    </form>
                </div>
            </div>
        </div>
    </div>

    <button type="button" class="d-none" id="show_check_smtp_modal" data-bs-toggle="modal" data-bs-target="#kt_modal_check_smtp"></button>

    <div class="modal fade" id="kt_modal_check_smtp" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mw-650px">
            <div class="modal-content">
                <div class="modal-header" id="kt_modal_check_smtp_header">
                    <h2 class="fw-bolder">Spam check</h2>
                    <div class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal" data-kt-modal-action-type="close">
                        <span class="svg-icon svg-icon-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                    <form id="kt_modal_check_smtp_form" class="form" action="#">
                        <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_check_smtp_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_check_smtp_header" data-kt-scroll-wrappers="#kt_modal_check_smtp_scroll" data-kt-scroll-offset="300px">
                            <div class="fv-row mb-7 fv-plugins-icon-container" id="modal_data_status" style="background-color: aliceblue; padding: 10px;">
                            </div>
                            <div class="fv-row mb-7 fv-plugins-icon-container">
                                <label class="required fw-bold fs-6 mb-2">Email</label>
                                <input type="text" v-model="spam_email" name="spam_email" placeholder="Please enter test email" class="form-control form-control-solid mb-3 mb-lg-0" />
                            </div>
                            <div id="messagebox" class="text-center p-3">
                            </div>
                            <div class="text-center">
                                <button type="reset" class="btn btn-light me-3" data-bs-dismiss="modal" data-kt-modal-action-type="close">Close</button>
                                <button type="submit" class="btn btn-primary" data-kt-check-smtp-modal-action="submit">
                                    <span class="indicator-label">Send Email</span>
                                    <span class="indicator-progress">Please wait...
                                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            timezones: [
                { "name": "(GMT-11:00) Midway Island", "timezone": "Pacific/Midway" },
                { "name": "(GMT-11:00) Samoa", "timezone": "US/Samoa" },
                { "name": "(GMT-10:00) Hawaii", "timezone": "US/Hawaii" },
                { "name": "(GMT-09:00) Alaska", "timezone": "US/Alaska" },
                { "name": "(GMT-08:00) Pacific Time (US & Canada)", "timezone": "US/Pacific" },
                { "name": "(GMT-08:00) Tijuana", "timezone": "America/Tijuana" },
                { "name": "(GMT-07:00) Arizona", "timezone": "US/Arizona" },
                { "name": "(GMT-07:00) Mountain Time (US & Canada)", "timezone": "US/Mountain" },
                { "name": "(GMT-07:00) Chihuahua", "timezone": "America/Chihuahua" },
                { "name": "(GMT-07:00) Mazatlan", "timezone": "America/Mazatlan" },
                { "name": "(GMT-06:00) Mexico City", "timezone": "America/Mexico_City" },
                { "name": "(GMT-06:00) Monterrey", "timezone": "America/Monterrey" },
                { "name": "(GMT-06:00) Saskatchewan", "timezone": "Canada/Saskatchewan" },
                { "name": "(GMT-06:00) Central Time (US & Canada)", "timezone": "US/Central" },
                { "name": "(GMT-05:00) Eastern Time (US & Canada)", "timezone": "US/Eastern" },
                { "name": "(GMT-05:00) Indiana (East)", "timezone": "US/East-Indiana" },
                { "name": "(GMT-05:00) Bogota", "timezone": "America/Bogota" },
                { "name": "(GMT-05:00) Lima", "timezone": "America/Lima" },
                { "name": "(GMT-04:30) Caracas", "timezone": "America/Caracas" },
                { "name": "(GMT-04:00) Atlantic Time (Canada)", "timezone": "Canada/Atlantic" },
                { "name": "(GMT-04:00) La Paz", "timezone": "America/La_Paz" },
                { "name": "(GMT-04:00) Santiago", "timezone": "America/Santiago" },
                { "name": "(GMT-03:30) Newfoundland", "timezone": "Canada/Newfoundland" },
                { "name": "(GMT-03:00) Buenos Aires", "timezone": "America/Buenos_Aires" },
                { "name": "(GMT-03:00) Greenland", "timezone": "Greenland" },
                { "name": "(GMT-02:00) Stanley", "timezone": "Atlantic/Stanley" },
                { "name": "(GMT-01:00) Azores", "timezone": "Atlantic/Azores" },
                { "name": "(GMT-01:00) Cape Verde Is.", "timezone": "Atlantic/Cape_Verde" },
                { "name": "(GMT) Casablanca", "timezone": "Africa/Casablanca" },
                { "name": "(GMT) Dublin", "timezone": "Europe/Dublin" },
                { "name": "(GMT) Lisbon", "timezone": "Europe/Lisbon" },
                { "name": "(GMT) London", "timezone": "Europe/London" },
                { "name": "(GMT) Monrovia", "timezone": "Africa/Monrovia" },
                { "name": "(GMT+01:00) Amsterdam", "timezone": "Europe/Amsterdam" },
                { "name": "(GMT+01:00) Belgrade", "timezone": "Europe/Belgrade" },
                { "name": "(GMT+01:00) Berlin", "timezone": "Europe/Berlin" },
                { "name": "(GMT+01:00) Bratislava", "timezone": "Europe/Bratislava" },
                { "name": "(GMT+01:00) Brussels", "timezone": "Europe/Brussels" },
                { "name": "(GMT+01:00) Budapest", "timezone": "Europe/Budapest" },
                { "name": "(GMT+01:00) Copenhagen", "timezone": "Europe/Copenhagen" },
                { "name": "(GMT+01:00) Ljubljana", "timezone": "Europe/Ljubljana" },
                { "name": "(GMT+01:00) Madrid", "timezone": "Europe/Madrid" },
                { "name": "(GMT+01:00) Paris", "timezone": "Europe/Paris" },
                { "name": "(GMT+01:00) Prague", "timezone": "Europe/Prague" },
                { "name": "(GMT+01:00) Rome", "timezone": "Europe/Rome" },
                { "name": "(GMT+01:00) Sarajevo", "timezone": "Europe/Sarajevo" },
                { "name": "(GMT+01:00) Skopje", "timezone": "Europe/Skopje" },
                { "name": "(GMT+01:00) Stockholm", "timezone": "Europe/Stockholm" },
                { "name": "(GMT+01:00) Vienna", "timezone": "Europe/Vienna" },
                { "name": "(GMT+01:00) Warsaw", "timezone": "Europe/Warsaw" },
                { "name": "(GMT+01:00) Zagreb", "timezone": "Europe/Zagreb" },
                { "name": "(GMT+02:00) Athens", "timezone": "Europe/Athens" },
                { "name": "(GMT+02:00) Bucharest", "timezone": "Europe/Bucharest" },
                { "name": "(GMT+02:00) Cairo", "timezone": "Africa/Cairo" },
                { "name": "(GMT+02:00) Harare", "timezone": "Africa/Harare" },
                { "name": "(GMT+02:00) Helsinki", "timezone": "Europe/Helsinki" },
                { "name": "(GMT+02:00) Istanbul", "timezone": "Europe/Istanbul" },
                { "name": "(GMT+02:00) Jerusalem", "timezone": "Asia/Jerusalem" },
                { "name": "(GMT+02:00) Kyiv", "timezone": "Europe/Kiev" },
                { "name": "(GMT+02:00) Minsk", "timezone": "Europe/Minsk" },
                { "name": "(GMT+02:00) Riga", "timezone": "Europe/Riga" },
                { "name": "(GMT+02:00) Sofia", "timezone": "Europe/Sofia" },
                { "name": "(GMT+02:00) Tallinn", "timezone": "Europe/Tallinn" },
                { "name": "(GMT+02:00) Vilnius", "timezone": "Europe/Vilnius" },
                { "name": "(GMT+03:00) Baghdad", "timezone": "Asia/Baghdad" },
                { "name": "(GMT+03:00) Kuwait", "timezone": "Asia/Kuwait" },
                { "name": "(GMT+03:00) Nairobi", "timezone": "Africa/Nairobi" },
                { "name": "(GMT+03:00) Riyadh", "timezone": "Asia/Riyadh" },
                { "name": "(GMT+03:00) Moscow", "timezone": "Europe/Moscow" },
                { "name": "(GMT+03:30) Tehran", "timezone": "Asia/Tehran" },
                { "name": "(GMT+04:00) Baku", "timezone": "Asia/Baku" },
                { "name": "(GMT+04:00) Volgograd", "timezone": "Europe/Volgograd" },
                { "name": "(GMT+04:00) Muscat", "timezone": "Asia/Muscat" },
                { "name": "(GMT+04:00) Tbilisi", "timezone": "Asia/Tbilisi" },
                { "name": "(GMT+04:00) Yerevan", "timezone": "Asia/Yerevan" },
                { "name": "(GMT+04:30) Kabul", "timezone": "Asia/Kabul" },
                { "name": "(GMT+05:00) Karachi", "timezone": "Asia/Karachi" },
                { "name": "(GMT+05:00) Tashkent", "timezone": "Asia/Tashkent" },
                { "name": "(GMT+05:30) Kolkata", "timezone": "Asia/Kolkata" },
                { "name": "(GMT+05:45) Kathmandu", "timezone": "Asia/Kathmandu" },
                { "name": "(GMT+06:00) Ekaterinburg", "timezone": "Asia/Yekaterinburg" },
                { "name": "(GMT+06:00) Almaty", "timezone": "Asia/Almaty" },
                { "name": "(GMT+06:00) Dhaka", "timezone": "Asia/Dhaka" },
                { "name": "(GMT+07:00) Novosibirsk", "timezone": "Asia/Novosibirsk" },
                { "name": "(GMT+07:00) Bangkok", "timezone": "Asia/Bangkok" },
                { "name": "(GMT+07:00) Jakarta", "timezone": "Asia/Jakarta" },
                { "name": "(GMT+08:00) Krasnoyarsk", "timezone": "Asia/Krasnoyarsk" },
                { "name": "(GMT+08:00) Chongqing", "timezone": "Asia/Chongqing" },
                { "name": "(GMT+08:00) Hong Kong", "timezone": "Asia/Hong_Kong" },
                { "name": "(GMT+08:00) Kuala Lumpur", "timezone": "Asia/Kuala_Lumpur" },
                { "name": "(GMT+08:00) Perth", "timezone": "Australia/Perth" },
                { "name": "(GMT+08:00) Singapore", "timezone": "Asia/Singapore" },
                { "name": "(GMT+08:00) Taipei", "timezone": "Asia/Taipei" },
                { "name": "(GMT+08:00) Ulaan Bataar", "timezone": "Asia/Ulaanbaatar" },
                { "name": "(GMT+08:00) Urumqi", "timezone": "Asia/Urumqi" },
                { "name": "(GMT+09:00) Irkutsk", "timezone": "Asia/Irkutsk" },
                { "name": "(GMT+09:00) Seoul", "timezone": "Asia/Seoul" },
                { "name": "(GMT+09:00) Tokyo", "timezone": "Asia/Tokyo" },
                { "name": "(GMT+09:30) Adelaide", "timezone": "Australia/Adelaide" },
                { "name": "(GMT+09:30) Darwin", "timezone": "Australia/Darwin" },
                { "name": "(GMT+10:00) Yakutsk", "timezone": "Asia/Yakutsk" },
                { "name": "(GMT+10:00) Brisbane", "timezone": "Australia/Brisbane" },
                { "name": "(GMT+10:00) Canberra", "timezone": "Australia/Canberra" },
                { "name": "(GMT+10:00) Guam", "timezone": "Pacific/Guam" },
                { "name": "(GMT+10:00) Hobart", "timezone": "Australia/Hobart" },
                { "name": "(GMT+10:00) Melbourne", "timezone": "Australia/Melbourne" },
                { "name": "(GMT+10:00) Port Moresby", "timezone": "Pacific/Port_Moresby" },
                { "name": "(GMT+10:00) Sydney", "timezone": "Australia/Sydney" },
                { "name": "(GMT+11:00) Vladivostok", "timezone": "Asia/Vladivostok" },
                { "name": "(GMT+12:00) Magadan", "timezone": "Asia/Magadan" },
                { "name": "(GMT+12:00) Auckland", "timezone": "Pacific/Auckland" },
                { "name": "(GMT+12:00) Fiji", "timezone": "Pacific/Fiji" }
            ],
            _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
            smtps: [],
            lists: [],
            create_item: {
                head: 'Create',
                id: '0',
                campaign_type: "create",
                title: null,
                description: null,
                email_details: {
                    subject: null,
                    list_ids: null,
                    smtp_ids: null,
                    manual_emails: null,
                },
                email_body: {
                    plain_body: null,
                    body: null,
                },
                attachments: {
                    name: '',
                    url: ''
                },
                other: {
                    track_open: 'true',
                    track_click: 'true',
                    is_schedule: 'false',
                    unsubscribe_message: `This email was sent by ${(location.href.slice(0, location.href.lastIndexOf("/")))} If you do not want to receive this type of email in the future, please [unsubscribe]unsubscribe[/unsubscribe]`,
                    schedule_option: {
                        datetime: '',
                        timezone: ''
                    },
                }
            },
            spam_email: null,
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
        loadAndRemoveTinyEditorAssets(true, "#email_body", true)
        let query = this.$route.query
        let method = axios.post

        if (query.id !== undefined && query.id !== "") {
            this.create_item.id = query.id
            this.create_item.campaign_type = "update"
            let url = 'campaign'
            let form_data = {
                campaign_type: 'get_campaign_setup',
                campaign_id: query.id,
            }
            let __this = this

            method = axios.post;
            method(url, form_data, {
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
                        __this.create_item.campaign_id = post_data.id
                        __this.create_item.campaign_title = post_data.title
                        __this.create_item.campaign_description = post_data.description

                        __this.create_item.email_details.subject = email_details.subject
                        __this.create_item.email_details.manual_emails = email_details.manual_emails
                        __this.create_item.email_details.list_ids = email_details.list_ids
                        __this.create_item.email_details.smtp_ids = email_details.smtp_ids

                        var attachments_post_data = JSON.parse(post_data.attachments)
                        if (attachments_post_data.name === null) {
                            attachments_post_data.name = ""
                        }
                        if (attachments_post_data.url === null) {
                            attachments_post_data.url = ""
                        }

                        __this.create_item.attachments = JSON.parse(post_data.attachments)
                        __this.create_item.email_body = JSON.parse(post_data.email_body)
                        __this.create_item.other = JSON.parse(post_data.other)
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
        }
        this.mailScript();
    },

    methods: {
        mailScript() {
            "use strict";
            var KTUsersSmtp = (function (__this) {
                var __this = __this;
                const t = document.getElementById("kt_modal_check_smtp"),
                    e = t.querySelector("#kt_modal_check_smtp_form"),
                    n = new bootstrap.Modal(t);
                return {
                    init: function () {
                        (() => {
                            var o = FormValidation.formValidation(e, {
                                fields: {
                                    spam_email: {
                                        validators: {
                                            emailCheck: { message: "Test email is required" },
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
                                    o.validate().then(function (t) {
                                        if ("Valid" == t) {
                                            i.setAttribute("data-kt-indicator", "on");
                                            i.disabled = !0;
                                            var smtp = __this.create_item.email_details.smtp_ids;
                                            if (!smtp) {
                                                swal_fire("", "error", "Please select SMTP");
                                                i.removeAttribute("data-kt-indicator");
                                                i.disabled = 0;
                                                return;
                                            }
                                            smtp = JSON.parse(smtp)[0]["value"];
                                            let url = 'smtp';
                                            let form_data = {
                                                smtp_type: 'send_mail',
                                                sending_type: 'manual',
                                                create_item: { custom_id: smtp },
                                                manual_data: {
                                                    test_title: '(no subject)',
                                                    test_body: tinyMCE.get("email_body").getContent(),
                                                    test_sendto: __this.spam_email,
                                                    test_sendfrom: '',
                                                    debug_type: 'off',
                                                }
                                            }

                                            let method = axios.post;
                                            method(url, form_data)
                                                .then((res) => {
                                                    let post_data = res.data;
                                                    let messagebox = document.getElementById("messagebox");
                                                    messagebox.innerHTML = post_data.message;
                                                })
                                                .catch((error) => {
                                                    setSwalMixin("Something went wrong! Please try again", 'error')
                                                }).finally(() => {
                                                    i.removeAttribute("data-kt-indicator")
                                                    i.disabled = !1
                                                });
                                        }
                                    });
                            });
                        })();
                    },
                };
            })(this);
            KTUtil.onDOMContentLoaded(function () {
                KTUsersSmtp.init();
            }, this);
        },

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
            form_data.append('campaign_type', "attachment")
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
            axios.post('campaign', form_data, config).then((res) => {
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
            var KTcampaignSubmit = function (__this) {
                var t, e, o, m, n, t2, t1;
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
                        o = document.querySelector("#kt_campaign_form"),
                            t = document.getElementById("kt_submit_campaign_form"),
                            $(o.querySelector('[name="position"]')).on("change", (function () {
                                e.revalidateField("position")
                            })),
                            $(o.querySelector('[name="datetime"]')).flatpickr({
                                enableTime: !0,
                                dateFormat: "d-m-Y h:i"
                            }),
                            e = FormValidation.formValidation(o, {
                                fields: {
                                    campaign_title: {
                                        validators: {
                                            onlyBlankSpaces: { message: "Title of the campaign is required" },
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
                            o.querySelectorAll('[data-kt-campaign-list="tagify"]').forEach((e => {
                                lists(e)
                            }))
                        o.querySelectorAll('[data-kt-campaign-smtp="tagify"]').forEach((e => {
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

                                            let url = 'campaign'
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
                                                        // if (post_data.status == 1 || post_data.status == 2) {
                                                            if (__this.create_item.campaign_type === "create") {
                                                                __this.create_item.campaign_id = post_data.id

                                                                __this.$router.push({
                                                                    name: 'live_sending',
                                                                    query: {
                                                                        qmlr_id: post_data.id,
                                                                        compose_token: post_data.token
                                                                    }
                                                                });
                                                            } else {
                                                                __this.$router.push({
                                                                    name: 'live_sending',
                                                                    query: {
                                                                        qmlr_id: post_data.id,
                                                                        compose_token: post_data.token,
                                                                    }
                                                                });
                                                                setSwalMixin("Campaign updated successfully", 'success');
                                                            }
                                                        // } else {
                                                        //     setSwalMixin("Unable to schedule this email", 'error')
                                                        // }
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
                KTcampaignSubmit.init()
            }, this);
        },

        getListandSmtp() {
            let method = axios.post;
            let __this = this
            method("campaign", { campaign_type: 'get_list_campaign' }, {
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
        }
    },
}