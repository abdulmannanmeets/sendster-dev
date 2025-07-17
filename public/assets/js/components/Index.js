import SideBar from './include/SideBar.js'
import Footer from './include/Footer.js'
export default {
  template: `
  <div>
  <input type="hidden" id="type" v-model="item.type">
  <div class="page-loader flex-column">
    <span class="spinner-border text-primary" role="status"></span>
    <span class="text-gray-800 fs-6 fw-semibold mt-5">Sendster</span>
  </div>
  <side-bar :permission="profile_details.permission"></side-bar>
  <!--begin::Wrapper-->
  <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
    <!--begin::Header-->
    <div id="kt_header" style="" class="header align-items-stretch">
      <!--begin::Container-->
      <div class="container-fluid d-flex align-items-stretch justify-content-between">
        <!--begin::Aside mobile toggle-->
        <div class="d-flex align-items-center d-lg-none ms-n2 me-2" v-if="is_aside" title="Show aside menu">
          <div class=" btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px" id="kt_aside_mobile_toggle">
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
            <span class="svg-icon svg-icon-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor" />
                <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor" />
              </svg>
            </span>
            <!--end::Svg Icon-->
          </div>
        </div>
        <!--end::Aside mobile toggle-->
        <!--begin::Mobile logo-->
        <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
          <a href="#" class="d-lg-none">
            <img alt="Logo" src="assets/images/logos/icon1.png" class="h-30px" />
          </a>
        </div>
        <!--end::Mobile logo-->
        <!--begin::Wrapper-->
        <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
          <!--begin::Navbar-->
          <div class="d-flex align-items-center" id="kt_header_nav">
						<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_header_nav'}" class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
              <img alt="Logo" src="assets/images/logos/icon1.png" class="h-30px me-5" v-if="!is_aside" />
							<h1 class="d-flex text-dark fw-bolder fs-3 align-items-center my-1 currentRouterName" v-html="currentRouterName"></h1>
						</div>
					</div>
          <!--end::Navbar-->
          <!--begin::Toolbar wrapper-->
          <div class="d-flex align-items-stretch flex-shrink-0">
            <div class="d-flex align-items-center ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
              <div class="cursor-pointer symbol symbol-30px symbol-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                <img :src="profile_details.profile" alt="user" />
              </div>
              <!--begin::User account menu-->
              <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-350px" data-kt-menu="true">
                <div class="menu-item px-3">
                  <div class="menu-content d-flex align-items-center px-3">
                    <!--begin::Avatar-->
                    <div class="symbol symbol-50px me-5">
                      <img alt="Logo" :src="profile_details.profile" @click="routeCreateUser" role="button" />
                    </div>
                    <!--end::Avatar-->
                    <!--begin::Username-->
                    <div class="d-flex flex-column">
                      <div class="fw-bolder d-flex align-items-center fs-5" @click="routeCreateUser" role="button"> {{profile_details.name}} <span class="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">{{validProductPermission}}</span></div>
                      <a @click="routeCreateUser" class="fw-bold text-muted text-hover-primary fs-7" role="button">{{profile_details.email}}</a>
                    </div>
                    <!--end::Username-->
                  </div>
                </div>
                <!--end::Menu item-->
                <!--begin::Menu separator-->
                <div class="separator my-2"></div>
                <!--end::Menu separator-->
                <!--begin::Menu item-->
                <div class="menu-item px-5" v-if="is_aside">
                  <a @click="routeCreateUser" class="menu-link px-5">My Profile</a>
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item px-5">
                  <a @click="logout" class="menu-link px-5">Sign Out</a>
                </div>
                <!--end::Menu item-->
              </div>
              <!--end::User account menu-->
              <!--end::Menu wrapper-->
            </div>
            <!--end::User menu-->
          </div>
          <!--end::Toolbar wrapper-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Container-->
    </div>
    <!--end::Header-->
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
      <div class="post d-flex flex-column-fluid" id="kt_post">
        <!--begin::Container-->
        <div id="kt_content_container" class="container-xxl">
          <router-view :profile_details="profile_details"></router-view>
        </div>
      </div>
    </div>
    <!--end::Content-->
    <sendster-footer></sendster-footer>
  </div>
  <!--end::Wrapper-->
  <!--end::Root-->
  <!--begin::Scrolltop-->
  <div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">
    <!--begin::Svg Icon | path: icons/duotune/arrows/arr066.svg-->
    <span class="svg-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
        <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
      </svg>
    </span>
    <!--end::Svg Icon-->
  </div>
  <!--end::Scrolltop-->
  <!--begin::Modals-->
  <!--end::Modals-->
</div>
<div class="modal fade" id="kt_modal_free_version" tabindex="-1" role="dialog" aria-labelledby="kt_modal_free_version" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal Title</h5>
          <button type="button" class="close btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <h5>This Feature Is Not Available In Free Version</h5>
          <img src="assets/images/free_upgrade.png" class="img-fluid my-3">
          <p>To get this feature please buy Sendster</p>
          <a class="btn btn-primary" style="border-radius: 50px;" target="_blank" href="https://getsendster.in">Click here</a>
        </div>
      </div>
    </div>
</div>
  `,
  created() {
    this.getProfile();
  },
  mounted() {
    try {
      var containerAutoUpdate = new AutoUpdate();
      containerAutoUpdate.init();
    } catch (err) { }
  },
  data() {
    return {
      isLogin: 0,
      currentProfileAttempt: 1,
      profile_details: {
        id: 0,
        name: '',
        email: '',
        verified: 1,
        profile: '',
        product_permissions: "elite",
        permission: ["Dashboard", "List", "Email Verification", "Snippets", "SMTPs", "Campaign", "Sequence", "Subscription Form", "Settings"]
      },
      document_title: 'Dashboard',
      _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
      item: {
        type: 'is_auth',
      },
      is_aside: true,
      currentRouterName: document.title,
      isUpgrade: {
        default: " &nbsp;&nbsp;<a class='text-warning' href='https://sendsterapp.in'>Upgrade</a>",
        value: ""
      }
    }
  },

  components: {
    'sendster-footer': Footer,
    'side-bar': SideBar
  },

  methods: {
    routeCreateUser() {
      if(this.is_aside) {
        this.$router.push({name: 'create_user', query: { id: this.profile_details.id }});
      }
    },

    logout() {
      let method = axios.post;
      let url = "logout";

      method(url, {
        type: 'logout'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': this.item._token
        }
      })
        .then((res) => {
          this.isLogin = 0;
          localStorage.removeItem("sendster_data");
          window.location.href = 'login';
        })
        .catch((error) => {
          swal_fire('', 'error', error.response.data.message)
        });
    },

    getProfile() {
      if(localStorage.getItem("sendster_data")) {
        let sendster_data = JSON.parse(atob(localStorage.getItem("sendster_data")));
        this.profile_details = {
          id: sendster_data.id,
          name: sendster_data.name,
          email: sendster_data.email,
          profile: sendster_data.profile,
          verified: sendster_data.verified,
          permission: JSON.parse(sendster_data.permission),
          product_permissions: sendster_data.product_permissions,
        }

        if(sendster_data.product_permissions === "free") {
          this.isUpgrade.value = this.isUpgrade.default;
        }
        return;
      }

      let method = axios.post;
      let url = "profile";

      method(url, { method_type: 'get_logged_in' }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': this.item._token
        }
      }).then((res) => {
        let data = res.data;
        if (data.status) {
          this.profile_details = {
            id: data.id,
            name: data.name,
            email: data.email,
            profile: data.profile,
            verified: data.verified,
            permission: JSON.parse(data.permission),
            product_permissions: data.product_permissions
          };
          if(data.product_permissions === "free") {
            this.isUpgrade.value = this.isUpgrade.default;
          }
        }
      }).catch((error) => {
        this.currentProfileAttempt++;
        if(this.currentProfileAttempt <= 3) {
          this.getProfile();
        }
      }).finally(() => {
      });
    }
  },

  computed: {
    validProductPermission() {
      return this.profile_details.product_permissions.charAt(0).toUpperCase() + this.profile_details.product_permissions.slice(1);
    }
  },

  watch: {
    $route(to, from) {
      this.currentRouterName = to.meta.title.split("-")[1].trim() + this.isUpgrade.value;
    },
    profile_details: {
      handler(newData, oldData) {
        if (!newData.verified) {
          let body = document.querySelectorAll('body')[0]
          body.classList.remove("aside-fixed", "aside-enabled")
          document.getElementById('kt_aside').classList.add('d-none');
          this.$router.push({
            name: 'user_verification'
          });
          this.is_aside = false;
          return;
        } else if (this.$route.name == "user_verification") {
          this.$router.push({
            name: 'dashboard'
          });
        }
        let body = document.querySelectorAll('body')[0];
        body.classList.add("aside-fixed", "aside-enabled");
        document.getElementById('kt_aside').classList.remove('d-none');
      },
      deep: true
    }
  }
}