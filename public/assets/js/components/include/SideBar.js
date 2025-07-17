export default {
  template: `
	<div id="kt_aside" class="aside aside-dark aside-hoverable" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle">
  <!--begin::Brand-->
  <div class="aside-logo flex-column-auto" id="kt_aside_logo">
    <!--begin::Logo-->
    <a href="" class="brand-link">
      <img src="https://sendsterapp.in/membership/assets/img/logo.png" alt="Logo" class="brand-image">
      <span class="brand-text font-weight-light">
         <img src="https://sendsterapp.in/membership/assets/img/logo-text.png" alt="Logo" class="img-fluid" style="filter: brightness(0) invert(1);">
      </span>
    </a>
    <div id="kt_aside_toggle" class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle" data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body" data-kt-toggle-name="aside-minimize">
      <span class="svg-icon svg-icon-1 rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path opacity="0.5" d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z" fill="currentColor" />
          <path d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z" fill="currentColor" />
        </svg>
      </span>
      <!--end::Svg Icon-->
    </div>
    <!--end::Aside toggler-->
  </div>
  <!--end::Brand-->
  <!--begin::Aside menu-->
  <div class="aside-menu flex-column-fluid">
    <!--begin::Aside Menu-->
    <div class="hover-scroll-overlay-y my-5 my-lg-5" id="kt_aside_menu_wrapper" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer" data-kt-scroll-wrappers="#kt_aside_menu" data-kt-scroll-offset="0">
      <!--begin::Menu-->
      <div class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500" id="#kt_aside_menu" data-kt-menu="true" data-kt-menu-expand="false">
        <div class="menu-item menu-accordion" v-if="permission.indexOf('Dashboard') !== -1">
          <router-link class="menu-link" :to="{name: 'dashboard'}" exact>
            <span class="menu-icon">
              <!--begin::Svg Icon | path: icons/duotune/general/gen025.svg-->
              <span class="svg-icon svg-icon-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
                  <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
                  <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
                  <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
                </svg>
              </span>
              <!--end::Svg Icon-->
            </span>
            <span class="menu-title">Dashboard</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('Campaign') !== -1">
          <router-link class="menu-link" :to="{name: 'all_campaigns'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.43 8.56949L10.744 15.1395C10.6422 15.282 10.5804 15.4492 10.5651 15.6236C10.5498 15.7981 10.5815 15.9734 10.657 16.1315L13.194 21.4425C13.2737 21.6097 13.3991 21.751 13.5557 21.8499C13.7123 21.9488 13.8938 22.0014 14.079 22.0015H14.117C14.3087 21.9941 14.4941 21.9307 14.6502 21.8191C14.8062 21.7075 14.9261 21.5526 14.995 21.3735L21.933 3.33649C22.0011 3.15918 22.0164 2.96594 21.977 2.78013C21.9376 2.59432 21.8452 2.4239 21.711 2.28949L15.43 8.56949Z" fill="currentColor"/>
                  <path opacity="0.3" d="M20.664 2.06648L2.62602 9.00148C2.44768 9.07085 2.29348 9.19082 2.1824 9.34663C2.07131 9.50244 2.00818 9.68731 2.00074 9.87853C1.99331 10.0697 2.04189 10.259 2.14054 10.4229C2.23919 10.5869 2.38359 10.7185 2.55601 10.8015L7.86601 13.3365C8.02383 13.4126 8.19925 13.4448 8.37382 13.4297C8.54839 13.4145 8.71565 13.3526 8.85801 13.2505L15.43 8.56548L21.711 2.28448C21.5762 2.15096 21.4055 2.05932 21.2198 2.02064C21.034 1.98196 20.8409 1.99788 20.664 2.06648Z" fill="currentColor"/>
                </svg>
              </span>
            </span>
            <span class="menu-title">Campaigns</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('List') !== -1">
          <router-link class="menu-link" :to="{name: 'all_lists'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 470.767 470.767" style="enable-background:new 0 0 470.767 470.767;" xml:space="preserve" fill="currentColor">
                  <g>
                    <path d="M362.965,21.384H289.62L286.638,7.99C285.614,3.323,281.467,0,276.685,0h-82.618c-4.782,0-8.913,3.323-9.953,7.99
                      l-2.967,13.394h-73.36c-26.835,0-48.654,21.827-48.654,48.662v352.06c0,26.835,21.819,48.662,48.654,48.662h255.179
                      c26.835,0,48.67-21.827,48.67-48.662V70.046C411.635,43.211,389.8,21.384,362.965,21.384z M379.831,422.105
                      c0,9.295-7.563,16.858-16.866,16.858H107.786c-9.287,0-16.85-7.563-16.85-16.858V70.046c0-9.295,7.563-16.857,16.85-16.857h66.294
                      l-1.692,7.609c-0.684,3.02,0.062,6.188,1.988,8.596c1.94,2.415,4.876,3.82,7.965,3.82h106.082c3.091,0,6.026-1.405,7.951-3.82
                      c1.942-2.415,2.687-5.575,2.004-8.596l-1.692-7.609h66.279c9.303,0,16.866,7.563,16.866,16.857V422.105z" fill="currentColor"/>
                    <path d="M170.835,188.426h43.249l-10.279-7.019c-14.506-9.899-18.232-29.693-8.325-44.197c9.893-14.489,29.693-18.239,44.197-8.324
                      l1.694,1.157v-12.136c0-7.866-6.383-14.248-14.242-14.248h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.271
                      C156.595,182.045,162.978,188.426,170.835,188.426z" fill="currentColor"/>
                    <path d="M303.256,110.313l-49.85,47.194l-22.704-15.49c-7.221-4.962-17.13-3.083-22.099,4.162
                      c-4.954,7.251-3.09,17.144,4.178,22.098l33.28,22.727c2.718,1.864,5.839,2.772,8.961,2.772c3.96,0,7.888-1.474,10.933-4.356
                      l59.167-56.014c6.382-6.033,6.645-16.104,0.62-22.479C319.686,104.552,309.637,104.28,303.256,110.313z" fill="currentColor"/>
                    <path d="M170.835,297.669H214.1l-10.295-7.027c-14.506-9.901-18.232-29.693-8.325-44.197c9.893-14.498,29.693-18.248,44.197-8.325
                      l1.694,1.158v-12.136c0-7.865-6.383-14.248-14.242-14.248h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.279
                      C156.595,291.286,162.978,297.669,170.835,297.669z" fill="currentColor"/>
                    <path d="M303.256,219.555l-49.85,47.186l-22.704-15.49c-7.221-4.97-17.13-3.098-22.099,4.162
                      c-4.954,7.253-3.09,17.144,4.178,22.099l33.28,22.727c2.718,1.864,5.839,2.772,8.961,2.772c3.96,0,7.888-1.476,10.933-4.356
                      l59.167-56.007c6.382-6.033,6.645-16.096,0.62-22.479C319.686,213.793,309.637,213.529,303.256,219.555z" fill="currentColor"/>
                    <path d="M227.129,322.135h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.271c0,7.865,6.383,14.248,14.24,14.248h56.294
                      c7.859,0,14.242-6.383,14.242-14.248v-56.271C241.371,328.518,234.988,322.135,227.129,322.135z" fill="currentColor"/>
                  </g>
                </svg>
              </span>
            </span>
            <span class="menu-title">Lists</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('List') !== -1">
          <router-link class="menu-link" :to="{name: 'all_segments'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z" fill="currentColor"/>
                </svg>
              </span>
            </span>
            <span class="menu-title">Segments</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('List') !== -1">
          <router-link class="menu-link" :to="{name: 'links'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-1.12-1.118-1.735-2.606-1.735-4.188 0-1.582.615-3.07 1.734-4.189l4.866-4.865c2.355-2.355 6.114-2.262 8.377 0 .453.453.81.973 1.089 1.527l-1.593 1.592c-.18-.613-.5-1.189-.964-1.652-1.448-1.448-3.93-1.51-5.439-.001l-.001.002-4.867 4.865c-1.5 1.499-1.5 3.941 0 5.44 1.517 1.517 3.958 1.488 5.442 0l2.425-2.424c.993.284 1.791.335 2.654.284zm.161-16.918l-3.574 3.576c.847-.05 1.655 0 2.653.283l2.393-2.389c1.498-1.502 3.94-1.5 5.44-.001 1.517 1.518 1.486 3.959 0 5.442l-4.831 4.831-.003.002c-1.438 1.437-3.886 1.552-5.439-.002-.473-.474-.785-1.042-.956-1.643l-.084.068-1.517 1.515c.28.556.635 1.075 1.088 1.528 2.245 2.245 6.004 2.374 8.378 0l4.832-4.831c2.314-2.316 2.316-6.062-.001-8.377-2.317-2.321-6.067-2.313-8.379-.002z"/></svg>
              </span>
            </span>
            <span class="menu-title">Links</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('Email Verification') !== -1">
          <router-link class="menu-link" :to="{name: 'email_verification'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21M23 9L18.8001 13.1999L17 11.4M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </span>
            </span>
            <span class="menu-title">Email Verification</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('Snippets') !== -1">
          <router-link class="menu-link" :to="{name: 'all_snippets'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve">
                  <circle fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" cx="6" cy="10" r="3"/>
                  <circle fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" cx="6" cy="10" r="3"/>
                  <g>
                    <polygon stroke="currentColor" points="17.1,15.6 9.2,11.1 7.7,12.6 15.1,16.8 	"/>
                    <polygon stroke="currentColor" points="17.1,17.9 26,23 30,23 19.1,16.8 	"/>
                  </g>
                  <circle fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" cx="6" cy="22" r="3"/>
                  <circle fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" cx="6" cy="22" r="3"/>
                  <g>
                    <polygon stroke="currentColor" points="26,9 7.8,19.4 9.2,20.9 30,9 	"/>
                  </g>
                </svg>
              </span>
            </span>
            <span class="menu-title">Snippets</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('SMTPs') !== -1">
          <router-link class="menu-link" :to="{name: 'all_smtps'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" fill="none">
                  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="none">
                    <path d="M2360 5054 c-163 -20 -217 -28 -301 -44 -375 -76 -737 -245 -1051
                      -490 -106 -83 -295 -271 -382 -380 -615 -768 -726 -1799 -290 -2680 122 -247
                      276 -461 472 -656 196 -195 405 -345 653 -468 175 -87 328 -143 521 -190 225
                      -55 284 -61 588 -61 238 0 292 3 400 22 164 29 358 83 500 139 125 50 346 161
                      397 200 72 54 109 169 84 260 -29 107 -120 174 -239 174 -60 0 -77 -4 -133
                      -35 -215 -120 -411 -194 -634 -242 -121 -25 -147 -27 -375 -28 -272 0 -349 9
                      -560 70 -377 108 -750 354 -992 654 -238 294 -391 656 -437 1031 -14 109 -14
                      351 -1 460 73 590 392 1107 886 1435 322 214 700 327 1094 327 319 0 591 -63
                      875 -202 529 -259 917 -738 1060 -1310 89 -354 75 -744 -37 -1090 -25 -78 -39
                      -102 -92 -158 -130 -139 -357 -139 -495 -1 -56 57 -89 123 -101 206 -5 40 -10
                      386 -10 828 0 719 -1 762 -19 800 -40 86 -120 135 -221 135 -123 0 -218 -76
                      -238 -191 l-7 -39 -45 31 c-70 47 -207 114 -295 143 -120 39 -234 56 -383 56
                      -320 0 -594 -109 -821 -325 -182 -174 -295 -373 -352 -622 -29 -127 -31 -365
                      -5 -488 51 -234 152 -427 311 -594 182 -191 397 -307 660 -356 124 -24 385
                      -16 500 14 184 49 362 139 481 243 19 17 36 29 37 27 2 -2 29 -43 60 -90 157
                      -239 404 -369 703 -369 239 0 450 90 605 258 113 121 165 224 223 435 184 669
                      80 1407 -278 1985 -388 625 -1023 1044 -1756 1157 -100 16 -481 28 -560 19z
                      m344 -1795 c238 -46 448 -234 534 -478 24 -69 27 -89 27 -221 0 -132 -3 -152
                      -27 -221 -15 -42 -44 -105 -64 -140 -48 -82 -171 -205 -253 -253 -409 -238
                      -923 -25 -1051 435 -24 90 -27 244 -5 337 89 377 458 615 839 541z" fill="currentColor" />
                  </g>
                </svg>
              </span>
            </span>
            <span class="menu-title">SMTP</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('Sequence') !== -1">
          <router-link class="menu-link" :to="{name: 'all_sequences'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985zm0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960v799.984zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32zm0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32zm-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32zm0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32z" fill="currentColor"></path></svg>
              </span>
            </span>
            <span class="menu-title">Sequences</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('Subscription Form') !== -1">
          <router-link class="menu-link" :to="{name: 'all_forms'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" version="1.1" xml:space="preserve">
                  <g id="_x32_5_attachment"/>
                  <g id="_x32_4_office"/>
                  <g id="_x32_3_pin"/>
                  <g id="_x32_2_business_card"/>
                  <g id="_x32_1_form">
                    <g>
                      <g>
                        <path d="M54.9351,1H9.0649C7.4746,1,6.1812,2.2939,6.1812,3.8843v8.1963V62c0,0.5522,0.4478,1,1,1h49.6377c0.5522,0,1-0.4478,1-1     V12.0806V3.8843C57.8188,2.2939,56.5254,1,54.9351,1z M8.1812,3.8843C8.1812,3.3965,8.5776,3,9.0649,3h45.8701     c0.4873,0,0.8838,0.3965,0.8838,0.8843v7.1963H8.1812V3.8843z M55.8188,61H8.1812V13.0806h47.6377V61z" fill="currentColor"/>
                        <path d="M14.9141,33.2871h33.5117c1.1748,0,2.1304-0.9561,2.1304-2.1309v-4.3315c0-1.1768-0.9556-2.1338-2.1304-2.1338H14.9141     c-1.1748,0-2.1304,0.957-2.1304,2.1338v4.3315C12.7837,32.3311,13.7393,33.2871,14.9141,33.2871z M14.7837,26.8247     c0-0.0713,0.061-0.1338,0.1304-0.1338h33.5117c0.0693,0,0.1304,0.0625,0.1304,0.1338v4.3315c0,0.0698-0.061,0.1309-0.1304,0.1309     H14.9141c-0.0693,0-0.1304-0.061-0.1304-0.1309V26.8247z" fill="currentColor"/>
                        <path d="M14.9141,44.9717h33.5117c1.1748,0,2.1304-0.9556,2.1304-2.1304v-4.335c0-1.1748-0.9556-2.1309-2.1304-2.1309H14.9141     c-1.1748,0-2.1304,0.9561-2.1304,2.1309v4.335C12.7837,44.0161,13.7393,44.9717,14.9141,44.9717z M14.7837,38.5063     c0-0.0684,0.062-0.1309,0.1304-0.1309h33.5117c0.0684,0,0.1304,0.0625,0.1304,0.1309v4.335c0,0.0693-0.061,0.1304-0.1304,0.1304     H14.9141c-0.0693,0-0.1304-0.061-0.1304-0.1304V38.5063z" fill="currentColor"/>
                        <path d="M22.7197,21.0386h17.8999c0.5522,0,1-0.4478,1-1s-0.4478-1-1-1H22.7197c-0.5522,0-1,0.4478-1,1     S22.1675,21.0386,22.7197,21.0386z"/><path d="M41.9785,6.0405h-0.0313c-0.5522,0-0.9844,0.4478-0.9844,1s0.4634,1,1.0156,1s1-0.4478,1-1     S42.5308,6.0405,41.9785,6.0405z"/><path d="M46.4033,6.0405h-0.0313c-0.5522,0-0.9844,0.4478-0.9844,1s0.4634,1,1.0156,1s1-0.4478,1-1     S46.9556,6.0405,46.4033,6.0405z" fill="currentColor"/>
                        <path d="M50.8281,6.0405h-0.0313c-0.5522,0-0.9844,0.4478-0.9844,1s0.4634,1,1.0156,1s1-0.4478,1-1     S51.3804,6.0405,50.8281,6.0405z"/><path d="M48.7368,48.292h-8.8086c-1.0029,0-1.8188,0.8159-1.8188,1.8193v3.1318c0,1.0034,0.8159,1.8193,1.8188,1.8193h8.8086     c1.0034,0,1.8193-0.8159,1.8193-1.8193v-3.1318C50.5562,49.1079,49.7402,48.292,48.7368,48.292z M48.5562,53.0625h-8.4468V50.292     h8.4468V53.0625z" fill="currentColor"/>
                      </g>
                    </g>
                  </g>
                  <g id="_x32_0_headset"/><g id="_x31_9_video_call"/><g id="_x31_8_letter_box"/><g id="_x31_7_papperplane"/><g id="_x31_6_laptop"/><g id="_x31_5_connection"/><g id="_x31_4_phonebook"/><g id="_x31_3_classic_telephone"/><g id="_x31_2_sending_mail"/><g id="_x31_1_man_talking"/><g id="_x31_0_date"/><g id="_x30_9_review"/><g id="_x30_8_email"/><g id="_x30_7_information"/><g id="_x30_6_phone_talking"/><g id="_x30_5_women_talking"/><g id="_x30_4_calling"/><g id="_x30_3_women"/><g id="_x30_2_writing"/><g id="_x30_1_chatting"/>
                </svg>
              </span>
            </span>
            <span class="menu-title">Subscription Forms</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('AI Writer') !== -1">
          <router-link class="menu-link" :to="{name: 'aiwriter'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" fill="currentColor" xml:space="preserve">
                  <defs></defs>
                  <g style="stroke: currentColor; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                    <path d="M 45 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 12.719 C 48 17.376 46.657 18.719 45 18.719 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 55.267 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 12.719 C 58.267 17.376 56.924 18.719 55.267 18.719 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 65.533 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 12.719 C 68.533 17.376 67.19 18.719 65.533 18.719 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 34.733 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 12.719 C 37.733 17.376 36.39 18.719 34.733 18.719 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 24.467 18.719 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 v 12.719 C 27.467 17.376 26.124 18.719 24.467 18.719 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 45 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 87 C 48 88.657 46.657 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 55.267 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 V 87 C 58.267 88.657 56.924 90 55.267 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 65.533 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 V 87 C 68.533 88.657 67.19 90 65.533 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 34.733 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 V 87 C 37.733 88.657 36.39 90 34.733 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 24.467 90 c -1.657 0 -3 -1.343 -3 -3 V 74.281 c 0 -1.657 1.343 -3 3 -3 s 3 1.343 3 3 V 87 C 27.467 88.657 26.124 90 24.467 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 15.719 48 H 3 c -1.657 0 -3 -1.343 -3 -3 c 0 -1.657 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 C 18.719 46.657 17.376 48 15.719 48 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 15.719 37.733 H 3 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 S 17.376 37.733 15.719 37.733 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 15.719 27.467 H 3 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 S 17.376 27.467 15.719 27.467 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 15.719 58.267 H 3 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 S 17.376 58.267 15.719 58.267 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 15.719 68.533 H 3 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 12.719 c 1.657 0 3 1.343 3 3 S 17.376 68.533 15.719 68.533 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 87 48 H 74.281 c -1.657 0 -3 -1.343 -3 -3 c 0 -1.657 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 C 90 46.657 88.657 48 87 48 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 87 37.733 H 74.281 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 S 88.657 37.733 87 37.733 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 87 27.467 H 74.281 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 S 88.657 27.467 87 27.467 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 87 58.267 H 74.281 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 S 88.657 58.267 87 58.267 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 87 68.533 H 74.281 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.657 0 3 1.343 3 3 S 88.657 68.533 87 68.533 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 74.281 12.719 H 15.719 c -1.657 0 -3 1.343 -3 3 v 58.562 c 0 1.657 1.343 3 3 3 h 58.562 c 1.657 0 3 -1.343 3 -3 V 15.719 C 77.281 14.063 75.938 12.719 74.281 12.719 z M 48.111 59.046 c 0 1.657 -1.343 3 -3 3 c -1.657 0 -3 -1.343 -3 -3 v -9.752 H 30.675 v 9.752 c 0 1.657 -1.343 3 -3 3 s -3 -1.343 -3 -3 V 39.672 c 0 -6.461 5.257 -11.718 11.718 -11.718 s 11.718 5.257 11.718 11.718 V 59.046 z M 62.325 56.046 c 1.657 0 3 1.343 3 3 s -1.343 3 -3 3 h -7.697 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 0.849 V 33.954 h -0.849 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 7.697 c 1.657 0 3 1.343 3 3 s -1.343 3 -3 3 h -0.849 v 22.092 H 62.325 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    <path d="M 36.393 33.954 c -3.153 0 -5.718 2.565 -5.718 5.718 v 3.622 h 11.437 v -3.622 C 42.111 36.52 39.546 33.954 36.393 33.954 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                  </g>
                </svg>
              </span>
            </span>
            <span class="menu-title">AI Writer</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('Settings') !== -1">
          <router-link class="menu-link" :to="{name: 'setting'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg width="1024px" height="1024px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon" fill="none">
                  <path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z" fill="currentColor"/>
                </svg>
              </span>
            </span>
            <span class="menu-title">Settings</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion" v-if="permission.indexOf('Settings') !== -1">
          <router-link class="menu-link" :to="{name: 'all_users'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <i class="fa fa-user fa-lg"></i>
              </span>
            </span>
            <span class="menu-title">Users</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion">
          <router-link class="menu-link" :to="{name: 'error_logs'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.142 2l5.858 5.858v8.284l-5.858 5.858h-8.284l-5.858-5.858v-8.284l5.858-5.858h8.284zm.829-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-8.482 16.992l3.518-3.568 3.554 3.521 1.431-1.43-3.566-3.523 3.535-3.568-1.431-1.432-3.539 3.583-3.581-3.457-1.418 1.418 3.585 3.473-3.507 3.566 1.419 1.417z"></path></svg>
              </span>
            </span>
            <span class="menu-title">Error logs</span>
          </router-link>
        </div>
        <div class="menu-item menu-accordion">
          <router-link class="menu-link" :to="{name: 'help'}" exact>
            <span class="menu-icon">
              <span class="svg-icon svg-icon-2">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.053 17c.466 0 .844-.378.844-.845 0-.466-.378-.844-.844-.844-.466 0-.845.378-.845.844 0 .467.379.845.845.845zm.468-2.822h-.998c-.035-1.162.182-2.054.939-2.943.491-.57 1.607-1.479 1.945-2.058.722-1.229.077-3.177-2.271-3.177-1.439 0-2.615.877-2.928 2.507l-1.018-.102c.28-2.236 1.958-3.405 3.922-3.405 1.964 0 3.615 1.25 3.615 3.22 0 1.806-1.826 2.782-2.638 3.868-.422.563-.555 1.377-.568 2.09z" fill="currentColor"/></svg>
              </span>
            </span>
            <span class="menu-title">Help</span>
          </router-link>
        </div>
      </div>
      <!--end::Menu-->
    </div>
    <!--end::Aside Menu-->
  </div>
  <!--end::Aside menu-->
</div>
	`,
  props: ['permission'],
}