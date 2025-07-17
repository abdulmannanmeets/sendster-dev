export default {
  template: `
<div id="kt_content_container" class="container-xxl">
<div class="card mb-5 mb-xl-10">
  <div class="card-header border-0">
    <div class="card-title m-0">
      <h3 class="fw-bolder m-0">Profile Details</h3>
    </div>
  </div>
  <div id="kt_account_settings_profile_details">
    <form id="kt_account_profile_details_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" method="post" action="#">
      <div class="card-body border-top p-9">
        <div class="row mb-6">
          <label class="col-lg-4 col-form-label fw-bold fs-6">Avatar</label>
          <div class="col-lg-8">
            <div class="image-input image-input-outline image-input-empty" data-kt-image-input="true" style="background-image: url('assets/media/svg/avatars/blank.svg')">
              <div class="image-input-wrapper w-125px h-125px" :style="show_image"></div>
              <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" title="" data-bs-original-title="Change avatar">
                <i class="bi bi-pencil-fill fs-7"></i>
                <input @change="imgPreview" id="profile_picture" type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                <input type="hidden" name="avatar_remove" value="0" />
              </label>
              <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="" data-bs-original-title="Cancel avatar">
                <i class="bi bi-x fs-2"></i>
              </span>
              <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="" data-bs-original-title="Remove avatar">
                <i class="bi bi-x fs-2"></i>
              </span>
            </div>
            <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
          </div>
        </div>
        <div class="row mb-6">
          <label class="col-lg-4 col-form-label required fw-bold fs-6">Name</label>
          <div class="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
            <input type="text" name="name" v-model="item.name" class="form-control form-control-lg form-control-solid" placeholder="Enter Username" />
          </div>
        </div>
        <div class="row mb-6">
          <label class="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
          <div class="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
            <input type="email" name="email" v-model="item.email" class="form-control form-control-lg form-control-solid" placeholder="Enter Email ID" />
          </div>
        </div>
        <div class="row mb-6">
          <label class="col-lg-4 col-form-label fw-bold fs-6">Password</label>
          <div class="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
            <input type="password" name="password" class="form-control form-control-lg form-control-solid" placeholder="Enter Password" v-model="item.password" />
          </div>
        </div>
        <div class="row mb-6">
          <label class="col-lg-4 col-form-label fw-bold fs-6">Re-enter Password</label>
          <div class="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
            <input type="password" name="password_confirmation" class="form-control form-control-lg form-control-solid" placeholder="Re-enter Password" v-model="item.password_confirmation" />
          </div>
        </div>
        <div class="row mb-6">
          <label class="col-lg-4 col-form-label required fw-bold fs-6">Select Permissions</label>
          <div class="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
              <input class="form-control form-control-solid" v-model="item.permission" name="permissions" />
          </div>
        </div>
        <div class="row mb-6">
          <!--begin::Label-->
          <label class="col-lg-4 col-form-label required fw-bold fs-6">Current Password</label>
          <div class="col-lg-8 fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
            <input type="password" name="current_password" class="form-control form-control-lg form-control-solid" placeholder="Please enter your current password to continue" v-model="item.current_password" />
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end py-6 px-9">
        <button type="submit" class="btn btn-primary" id="kt_account_profile_details_submit" v-html="btn_html"></button>
      </div>
      <div></div>
    </form>
  </div>
</div>
</div>
`,
  data: () => ({
    show_image: { backgroundImage: "url()" },
    avatar_remove: 0,
    item: {
      id: 0,
      name: "",
      email: "",
      password: "",
      permission: [],
      method_type: "get_user",
      profile_picture: "",
      current_password: "",
      password_confirmation: "",
    },
    all_permissions: [
      "Dashboard", "List", "Email Verification", "Snippets", "SMTPs", "Campaign", "Sequence", "Subscription Form", "Settings"
    ],
    btn_html: "Save Changes",
    _token: document.querySelector('meta[name="__token"]').getAttribute('content')
  }),
  mounted() {
    if (this.$route.query.id) {
      this.item.id = this.$route.query.id
      this.getProfileData("get_user");
    }
    this.item.method_type = "post"
  },
  methods: {
    imgPreview(e) {
      let imgSrc = e.target.files[0];
      this.show_image = { backgroundImage: "url(" + imgSrc + ")" };
      this.item.profile_picture = imgSrc;
    },

    getProfileData(method_type = "post") {
      let url = "profile";
      let method = axios.post;
      let formData = new FormData();
      let config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': this._token
        }
      }
      if (this.item.profile_picture != "" && method_type == "post") {
        config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRF-Token': this._token
          }
        }
      }
      this.btn_html = 'Please wait ...<span class="spinner-border spinner-border-sm align-middle ms-2"></span>'
      formData.append('id', this.item.id)
      formData.append('name', this.item.name)
      formData.append('email', this.item.email)
      formData.append('password', this.item.password)
      formData.append('permission', this.item.permission)
      formData.append('method_type', this.item.method_type)
      formData.append('current_password', this.item.current_password)
      formData.append('profile_picture', this.item.profile_picture)
      formData.append('password_confirmation', this.item.password_confirmation)

      method(url, formData, config)
        .then((res) => {
          let post_data = res.data;
          let post_status = post_data.status;
          if (!post_status && method_type === "post") {
            swal_fire("", "error", "Something went wrong")
            return;
          }
          this.avatar_remove = 1;
          this.item.name = post_data.name;
          this.item.email = post_data.email;
          this.item.id = post_data.id;
          this.item.permission = JSON.parse(post_data.permission);
          this.item.profile_picture = post_data.profile;
          this.show_image = { backgroundImage: "url(" + post_data.profile + ")" }
          this.utilScript()
        })
        .catch((error) => {
          swal_fire("", "error", error.response.data.message)
        })
        .finally(() => {
          this.btn_html = 'Save Changes'
          this.item.current_password = ''
          this.item.password_confirmation = ''
        });
    },

    utilScript() {
      "use strict"
      var MLRProfile = function (__this) {
        var e, t, __this = __this, b;
        return {
          init: function () {
            e = document.getElementById('kt_account_profile_details_form'),
              b = e.querySelector("#kt_account_profile_details_submit"),
              new Tagify(e.querySelector('[name="permissions"]'), {
                whitelist: __this.all_permissions,
                maxTags: 9,
                dropdown: {
                  maxItems: 9,
                  enabled: 0,
                  closeOnSelect: !1
                }
              }),
              t = FormValidation.formValidation(e, {
                fields: {
                  name: {
                    validators: {
                      onlyBlankSpaces: {
                        message: 'Name is required'
                      }
                    }
                  },
                  email: {
                    validators: {
                      emailCheck: {
                        message: "Email address is required"
                      },
                      emailAddress: {
                        message: "The value is not a valid email address"
                      }
                    }
                  },
                  current_password: {
                    validators: {
                      passwordCheck: {
                        message: "Current password is required"
                      }
                    }
                  },
                  permissions: {
                    validators: {
                      notEmpty: {
                        message: "Permission is required"
                      }
                    }
                  }
                },
                plugins: {
                  trigger: new FormValidation.plugins.Trigger,
                  submitButton: new FormValidation.plugins.SubmitButton,
                  bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: ".fv-row",
                    eleInvalidClass: "",
                    eleValidClass: ""
                  })
                }
              }), $(e.querySelector('[name="permissions"]')).on("change", (function () {
                t.revalidateField("permissions")
              })), b.addEventListener("click", (function (evt) {
                evt.preventDefault();
                t && t.validate().then(function (event) {
                  if ("Valid" == event) {
                    let url = "profile";
                    let method = axios.post;
                    let formData = new FormData();
                    let config = {
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': __this._token
                      }
                    }
                    if (__this.item.profile_picture != "") {
                      config = {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          'X-CSRF-Token': __this._token
                        }
                      }
                    }
                    __this.btn_html = 'Please wait ...<span class="spinner-border spinner-border-sm align-middle ms-2"></span>'
                    formData.append('id', __this.item.id)
                    formData.append('name', __this.item.name)
                    formData.append('email', __this.item.email)
                    formData.append('password', __this.item.password)
                    formData.append('permission', __this.item.permission)
                    formData.append('method_type', "post")
                    formData.append('current_password', __this.item.current_password)
                    formData.append('profile_picture', __this.item.profile_picture)
                    formData.append('password_confirmation', __this.item.password_confirmation)

                    method(url, formData, config)
                      .then((res) => {
                        let post_data = res.data;
                        let post_status = post_data.status;
                        if (!post_status) {
                          swal_fire("", "error", "Something went wrong")
                          return;
                        }
                        if (__this.item.id) {
                          swal_fire("", "success", post_data.message)
                        } else {
                          __this.$router.go(-1);
                        }
                        __this.avatar_remove = 1;
                      })
                      .catch((error) => {
                        swal_fire("", "error", error.response.data.message)
                      })
                      .finally(() => {
                        __this.btn_html = 'Save Changes'
                        this.item.password = ''
                        __this.item.current_password = ''
                        __this.item.password_confirmation = ''
                      });
                  }
                })
              }))
          }
        }
      }(this)

      KTUtil.onDOMContentLoaded(function () {
        MLRProfile.init()
      }, this);
    }
  },
}