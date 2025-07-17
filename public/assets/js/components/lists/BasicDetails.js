export default {
    template: `
    <div class="col-xl-12">
        <!--begin::Charts Widget 1-->
        <div class="card card-xl-stretch mb-xl-8">
            <!--begin::Header-->
            <div class="card-header border-0 pt-5">
                <!--begin::Title-->
                <h3 class="card-title align-items-start flex-column">
                    <span class="card-label fw-bolder fs-3 mb-1">List Details</span>
                </h3>
                <!--end::Title-->
            </div>
            <!--end::Header-->
            <!--begin::Body-->
            <div class="card-body" id="kt_modal_basic_details">
                <form id="kt_modal_basic_details_form" class="form" action="#">
                    <!--begin::Scroll-->
                    <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_basic_details_scroll"
                        data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}"
                        data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_user_header"
                        data-kt-scroll-wrappers="#kt_modal_add_user_scroll" data-kt-scroll-offset="300px">
                        <!--begin::Input group-->
                        <div class="fv-row mb-7 fv-plugins-icon-container">
                            <!--begin::Label-->
                            <label class="required fw-bold fs-6 mb-2">Enter list title</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" id="list_title" v-model="item.list_title" name="list_title" placeholder="Enter title" class="form-control form-control-solid mb-3 mb-lg-0" />
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                        <!--begin::Input group-->
                        <div class="fv-row mb-7 fv-plugins-icon-container">
                            <!--begin::Label-->
                            <label class="fw-bold fs-6 mb-2">Enter list description (Optional)</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <input type="text" name="list_description" v-model="item.list_description" id="list_description" placeholder="Enter list detail" class="form-control form-control-solid mb-3 mb-lg-0" />
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                        <!--begin::Input group-->
                        <div class="mb-7">
                            <!--begin::Label-->
                            <label class="required fw-bold fs-6 mb-5">Select opt-in type</label>
                            <!--end::Label-->
                            <!--begin::Input-->
                            <div class="d-flex fv-row">
                                <!--begin::Radio-->
                                <div class="form-check form-check-custom form-check-solid">
                                    <!--begin::Input-->
                                    <input class="form-check-input me-3" name="list_type" type="radio" v-model="item.list_types" value="0" id="kt_modal_update_role_option_0" :checked="item.list_types==0">
                                    <!--end::Input-->
                                    <!--begin::Label-->
                                    <label class="form-check-label" for="kt_modal_update_role_option_0">
                                        <div class="fw-bolder text-gray-800" style="white-space:nowrap;">Single Opt-in</div>
                                    </label>
                                    <!--end::Label-->
                                </div>
                                <!--end::Radio-->
                            </div>

                            <div class="separator separator-dashed my-5"></div>
                            <!--begin::Input-->
                            <div class="d-flex fv-row">
                                <!--begin::Radio-->
                                <div class="form-check form-check-custom form-check-solid">
                                    <!--begin::Input-->
                                    <input class="form-check-input me-3" name="list_type" :checked="item.list_types===1" type="radio" value="1" v-model="item.list_types" id="kt_modal_update_role_option_1">
                                    <!--end::Input-->
                                    <!--begin::Label-->
                                    <label class="form-check-label" for="kt_modal_update_role_option_1">
                                        <div class="fw-bolder text-gray-800">Double Opt-in</div>
                                    </label>
                                    <!--end::Label-->
                                </div>
                                <!--end::Radio-->
                            </div>
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                        <div class="fv-row fv-plugins-icon-container">
                            <label class="form-check form-check-custom form-check-solid form-check-inline mb-5">
                                <span class="form-check-label fs-6 fw-bold me-7">Verify leads automatically using API</span>
                                <input type="checkbox" v-model="item.list_api_verify" name="list_api_verify" class="form-check-input" />
                            </label>
                        </div>
                    </div>
                    <!--end::Scroll-->
                    <!--begin::Actions-->
                    <div class="mt-7">
                        <button type="submit" class="btn btn-primary" data-kt-basic-details-action="submit">
                            <span class="indicator-label">Save</span>
                            <span class="indicator-progress">Please wait...
                                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>
                    <!--end::Actions-->
                </form>
                <!--end::Form-->
            </div>
            <!--end::Body-->
        </div>
        <!--end::Charts Widget 1-->
    </div>
    `,
    data: () => ({
        error_data: [],
        value_message: "",
        all_lists: {
            list_type: 'get',
            lists: []
        },
        item: {
            list_id: 0,
            list_type: "edit",
            list_status: "basic",
            list_title: "",
            list_api_verify: false,
            list_types: 0,
            list_description: null,
        },
        _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
    }),

    mounted() {
        let list_param = this.$route.query;
        this.item.list_id = list_param.id;
        axios.post("list", {
            list_type: "get_basic",
            list_id: list_param.id
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': this._token
            }
        }).then((res) => {
            let data = res.data;
            if(typeof data == "object") {
                this.item.list_title = data.title;
                this.item.list_description = data.description;
                this.item.list_types = data.list_type;
                this.item.list_id = data.id1;
                this.item.list_api_verify = data.list_api_verify ? true : false;
                this.utilScript();
            } else {
                this.$router.push({name: 'all_lists'})
            }
        }).catch((error) => {
            this.$router.push({name: 'all_lists'})
        }).finally(() => {
            this.$emit("pass-id-previous", this.item.list_id);
        })
    },

    methods: {
        utilScript() {
            "use strict";
            var KTUsersAddUser = (function (__this) {
                var __this = __this;
                const t = document.getElementById("kt_modal_basic_details"),
                    e = document.querySelector("#kt_modal_basic_details_form");
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
                                    list_type: {
                                        validators: {
                                            notEmpty: { message: "List type is required" },
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
                                '[data-kt-basic-details-action="submit"]'
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

                                            // __this.item.list_id = window.location.pathname.replace('/all_lists/', '')

                                            method(url, __this.item)
                                                .then((res) => {
                                                    let post_data = res.data;
                                                    let status = post_data.status
                                                    __this.value_message = post_data.message

                                                    if (status) {
                                                        Swal.fire({
                                                            text: "List updated successfully",
                                                            icon: "success",
                                                            buttonsStyling: !1,
                                                            confirmButtonText: "Ok, got it!",
                                                            customClass: {
                                                                confirmButton: "btn btn-primary",
                                                            },
                                                        })
                                                    } else {
                                                        swal_fire(KTUtil, 'error', 'Something went wrong!')
                                                    }
                                                })
                                                .catch((error) => {
                                                    swal_fire(KTUtil, 'error', error.response.data.message)
                                                    __this.value_message = ""
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
                            })
                        })();
                    },
                };
            })(this);
            KTUtil.onDOMContentLoaded(function () {
                KTUsersAddUser.init();
            }, this);
        },
    }
}