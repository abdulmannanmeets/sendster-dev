export default {
    template: `
    <div class="flex-lg-row-fluid ms-lg-15" id="kt_subscription_inputs">
	    <ul class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8">
	    	<li class="nav-item">
	    		<a class="nav-link text-active-primary pb-4 active" data-bs-toggle="tab" href="#kt_subscription_general">General</a>
	    	</li>
            <li class="nav-item">
                <a class="nav-link text-active-primary pb-4" data-bs-toggle="tab" href="#kt_subscription_form_inputs">Form inputs</a>
            </li>
	    	<li class="nav-item">
	    		<a class="nav-link text-active-primary pb-4" data-bs-toggle="tab" href="#kt_subscription_style">Style</a>
	    	</li>
	    </ul>
	    <form id="kt_subscription_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
	    	<div class="tab-content" id="myTabContent">
	    		<div class="tab-pane fade show active" id="kt_subscription_general" role="tabpanel">
	    			<div class="card card-flush">
	    				<div class="card-header align-items-center py-5 gap-2 gap-md-5">
	    					<div class="card-title">
	    						<h2>General</h2>
	    					</div>
	    				</div>
	    				<div class="card-body pt-0">
	    					<div class="row fv-row mb-7 fv-plugins-icon-container">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Form name</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
	    							<input type="text" v-model="create_item.form_name" class="form-control form-control-solid" name="form_name">
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Form title</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
	    							<input type="text" v-model="create_item.form_title" class="form-control form-control-solid" name="form_title">
	    						</div>
	    					</div>
                            <div class="row fv-row mb-7 fv-plugins-icon-container">
                                <div class="col-md-3 text-md-end">
                                    <label class="fs-6 fw-bold form-label mt-3">
                                        <span class="required">Select list</span>
                                    </label>
                                </div>
                                <div class="col-md-9">
                                    <select class="form-select form-select-solid" name="select_list" v-model="create_item.select_list">
                                        <option value="" disabled v-if="Object.keys(lists).length<0">There are no any lists</option>
                                        <option v-for="(value, index) in lists" :value="value.id">{{ value.title }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row fv-row mb-7 fv-plugins-icon-container">
                                <div class="col-md-3 text-md-end">
                                    <label class="fs-6 fw-bold form-label mt-3">
                                        <span class="required">Select form type</span>
                                    </label>
                                </div>
                                <div class="col-md-9">
                                    <select class="form-select form-select-solid" v-model="create_item.form_type" name="form_type" data-control="select2">
                                        <option value="0">Embed</option>
                                        <option value="1">Popup</option>
                                    </select>
                                </div>
                            </div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span>Form description</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
	    							<textarea class="form-control form-control-solid" id="form_description">{{ create_item.form_description }}</textarea>
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span>Redirect after subscription</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" style="height: 49.23px; border:0; border-radius:0.475rem 0rem 0rem 0.475rem;"><input type="checkbox" v-model="create_item.redirect_after_subs.is_redirect"></span>
                                        </div>
                                        <input type="url" :style="!create_item.redirect_after_subs.is_redirect ? {'opacity' : '0.5'} : {'opacity' : '1'}" placeholder="Enter action URL" :disabled="!create_item.redirect_after_subs.is_redirect" v-model="create_item.redirect_after_subs.url" class="form-control form-control-solid mb-3 mb-lg-0">
                                    </div>
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span>Hide after successful subscription</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
                                    <select class="form-select form-select-solid" v-model="create_item.hide_after_subs" name="hide_after_subs" data-control="select2">
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Delay time</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
                                    <div class="input-group">
                                    <input type="number" class="form-control form-control-solid" min="0" name="form_delay" v-model="create_item.delay_time">
                                    <div class="input-group-append">
                                        <span class="input-group-text">sec</span>
                                    </div>
                                    </div>
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Subscribe button text</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
                                    <input type="text" class="form-control form-control-solid" name="subscribe_button" v-model="create_item.subscribe_button">
	    						</div>
	    					</div>
	    				</div>
	    			</div>
	    		</div>
	    		<div class="tab-pane fade" id="kt_subscription_form_inputs" role="tabpanel">
	    			<div class="card card-flush">
	    				<div class="card-header align-items-center py-5 gap-2 gap-md-5">
	    					<div class="card-title">
	    						<h2>Form inputs</h2>
	    					</div>
	    				</div>
	    				<div class="card-body pt-0">
	    					<div class="row fv-row mb-7 fv-plugins-icon-container p-3 justify-content-center align-items-center text-center rounded" style="border: 1px solid #78bfe7;" v-for="(custom, index) in create_item.custom_inputs" :key="index">
                                <div class="col-md-4 my-1">
                                    <input type="text" class="form-control form-control-solid" v-model="custom.label" placeholder="Enter label" />
                                </div>
                                <div class="col-md-4 my-1">
                                    <input type="text" class="form-control form-control-solid" v-model="custom.placeholder" placeholder="Enter placeholder" />
                                </div>
                                <div class="col-md-4 my-1">
                                    <input type="text" class="form-control form-control-solid" v-model="custom.default" placeholder="Enter default value" />
                                </div>
                                <div class="col-md-4 my-1">
                                    <select class="form-select form-select-solid" v-model="custom.type">
                                        <option v-if="custom.is_disabled=='false'" value="text">Text</option>
                                        <option v-if="custom.is_disabled=='false'" value="number">Number</option>
                                        <option v-if="custom.is_disabled=='false'" value="textarea">Textarea</option>
                                        <option v-if="custom.is_disabled=='false'" value="checkbox">Checkbox</option>
                                        <option v-if="custom.is_disabled=='false'" value="radio">Radio</option>
                                        <option v-if="custom.is_disabled=='false'" value="hidden">Hidden</option>
                                        <option value="email">Email</option>
                                    </select>
                                </div>
                                <div class="col-md-4 my-1">
                                    <input type="text" class="form-control form-control-solid" v-model="custom.name" :disabled="custom.is_disabled=='true'" @change="checkBeforeAdd(custom)" placeholder="Enter unique name" />
                                </div>
                                <div class="col-md-4 my-1">
                                    <select class="form-select form-select-solid" v-model="custom.required">
                                        <option value="true">Required</option>
                                        <option value="false" v-if="custom.is_disabled==='false'">Optional</option>
                                    </select>
                                </div>
                                <div class="col-md-4" v-if="custom.is_disabled==='false'">
                                    <span class="svg-icon svg-icon-1" @click="removeCustom(custom)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                                          <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="#000000" />
                                          <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="#000000" />
                                          <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="#000000" />
                                        </svg>
                                    </span>
                                </div>
	    					</div>
                            <div class="row fv-row mb-7 fv-plugins-icon-container text-center justify-content-center">
                                <button type="button" class="btn btn-primary w-25" @click="addCustom()">
                                    <span class="svg-icon svg-icon-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect opacity="0.5" x="11.364" y="20.364" width="16" height="2" rx="1" transform="rotate(-90 11.364 20.364)" fill="currentColor"></rect>
                                        <rect x="4.36396" y="11.364" width="16" height="2" rx="1" fill="currentColor"></rect>
                                      </svg>
                                    </span>Add form input
                                </button>
                            </div>
	    				</div>
	    			</div>
	    		</div>
	    		<div class="tab-pane fade" id="kt_subscription_style" role="tabpanel">
	    			<div class="card card-flush">
	    				<div class="card-header align-items-center py-5 gap-2 gap-md-5">
	    					<div class="card-title">
	    						<h2>Style</h2>
	    					</div>
	    				</div>
	    				<div class="card-body pt-0">
	    					<div class="row fv-row mb-7 fv-plugins-icon-container align-items-end">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Form background color</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
	    							<input class="form-control" type="color" style="border:0;padding:0;" v-model="create_item.style.form_background_color" name="form_background_color">
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container align-items-end">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Title background color</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
	    							<input class="form-control" type="color" style="border:0;padding:0;" v-model="create_item.style.title_background_color" name="title_background_color">
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container align-items-end">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Title color</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
	    							<input class="form-control" type="color" style="border:0;padding:0;" v-model="create_item.style.title_color" name="title_color">
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Title size</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
                                    <div class="input-group">
	    							    <input type="number" class="form-control form-control-solid" min="0" v-model="create_item.style.title_size" name="title_size">
                                        <div class="input-group-append">
                                            <span class="input-group-text">px</span>
                                        </div>
                                    </div>
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container align-items-end">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Button background color</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
	    							<input class="form-control" type="color" style="padding: 0;border:0;" v-model="create_item.style.btn_background_color" name="btn_background_color">
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container align-items-end">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span class="required">Button color</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
	    							<input class="form-control" type="color" style="padding: 0;border:0;" v-model="create_item.style.btn_color" name="btn_color">
	    						</div>
	    					</div>
	    					<div class="row fv-row mb-7 fv-plugins-icon-container align-items-end">
	    						<div class="col-md-3 text-md-end">
	    							<label class="fs-6 fw-bold form-label mt-3">
	    								<span>Custom CSS</span>
	    							</label>
	    						</div>
	    						<div class="col-md-9">
	    							<input class="form-control" type="text" v-model="create_item.style.custom_css" name="custom_css">
	    						</div>
	    					</div>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
            <div class="row">
	    		<div class="col-md-9">
	    			<div class="separator mb-6"></div>
	    			<div class="d-flex">
	    				<button type="submit" data-kt-ecommerce-settings-type="submit" class="btn btn-primary me-10">
	    					<span class="indicator-label">Save</span>
	    					<span class="indicator-progress">Please wait...
	    						<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
	    				</button>
                        <button type="button" class="btn btn-primary me-10" data-bs-toggle="modal" data-bs-target="#kt_modal_preview" >Preview</button>
	    				<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_embed_form" @click="getEmbedForm" v-if="create_item.form_id!=='0'">
	    					<span class="indicator-label">Embed form</span>
	    				</button>
	    			</div>
	    		</div>
	    	</div>
	    </form>
    </div>
<div class="modal fade" id="kt_modal_preview" tabindex="-1">
	<div class="modal-dialog mw-1000px">
		<div class="modal-content modal-rounded">
			<div class="modal-header py-7 d-flex justify-content-between">
				<h2>Preview</h2>
				<div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal" data-kt-modal-action-type="close">
					<span class="svg-icon svg-icon-1">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
							<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
						</svg>
					</span>
				</div>
			</div>
			<div class="modal-body scroll-y m-5" :style="{'background-color': create_item.style.form_background_color}">
                <div class="w-100">
                    <div class="text-center" :style="{'background-color': create_item.style.title_background_color}">
                        <h1 class="mb-3" :style="{'color': create_item.style.title_color, 'font-size': create_item.style.title_size+'px'}">{{create_item.form_title}}</h1>
                    </div>
                    <div v-html="create_item.form_description"></div>
                    <div class="mb-10 fv-row fv-plugins-icon-container" v-for="(custom, index) in create_item.custom_inputs" :key="index">
                        <label class="form-label mb-3">
                            <span :class="custom.required=='true' ? 'required' : ''">{{custom.label}}</span>
                        </label>
                        <input v-if="custom.type=='text' || custom.type=='number' || custom.type=='email' || custom.type=='hidden'" :type="custom.type" class="form-control form-control-lg form-control-solid" :name="custom.name" :placeholder="custom.placeholder" :value="custom.default" autocomplete="off" />
                        <textarea v-if="custom.type=='textarea'" rows="7" class="form-control form-control-lg form-control-solid" :name="custom.name" :placeholder="custom.placeholder" :value="custom.default" autocomplete="off" />
                        <input v-if="custom.type=='radio'" type="radio" class="form-check-input" style="margin-left:1rem;" :name="custom.name" :value="custom.default" />
                        <input v-if="custom.type=='checkbox'" class="form-check-input" style="margin-left:1rem;" :name="custom.name" type="checkbox" :value="custom.default" />
                    </div>
                    <div class="text-center">
                        <button type="button" :style="{'background-color': create_item.style.btn_background_color, 'color': create_item.style.btn_color}" class="btn btn-primary">
							<span class="indicator-label">{{create_item.subscribe_button}}</span>
							<span class="indicator-progress">Please wait...
							<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
						</button>
					</div>
                </div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="kt_modal_embed_form" tabindex="-1">
	<div class="modal-dialog mw-1000px">
		<div class="modal-content modal-rounded">
			<div class="modal-header py-7 d-flex justify-content-between">
				<h2>Embed code</h2>
				<div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal" data-kt-modal-action-type="close">
					<span class="svg-icon svg-icon-1">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
							<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
						</svg>
					</span>
				</div>
			</div>
			<div class="modal-body scroll-y m-5">
                <div class="w-100">
                    <div class="d-flex justify-content-center" v-if="embed.loading" v-html="embed.loading_code"></div>
                    <pre class=" language-html" v-if="!embed.loading">
                        <code class=" language-html">{{embed.code}}</code>
                    </pre>
                    <button v-if="!embed.loading" type="button" id="copy_button" class="btn btn-primary" @click="copyCode">Copy</button>
                </div>
			</div>
		</div>
	</div>
</div>`,
    props: ['profile_details'],
    data() {
        return {
            create_item: {
                form_id: "0",
                type: "create",
                form_name: '',
                form_title: '',
                select_list: '',
                form_type: 0,
                form_description: '',
                redirect_after_subs: {
                    is_redirect: false,
                    url: ''
                },
                hide_after_subs: 0,
                delay_time: 0,
                subscribe_button: 'Subscribe',
                custom_inputs: [{
                    label: "Enter your email",
                    placeholder: "Enter your email",
                    type: "email",
                    default: "",
                    name: "email",
                    required: true,
                    is_disabled: true
                }],
                style: {
                    form_background_color: "#FFFFFF",
                    title_background_color: "#FFFFFF",
                    title_color: "#000000",
                    title_size: 30,
                    btn_background_color: "#009ef7",
                    btn_color: "#FFFFFF",
                    custom_css: ""
                }
            },
            embed: {
                loading: true,
                loading_code: `<div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>`,
                code: ''
            },
            lists: [],
            _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
        }
    },

    mounted() {
        this.getLists()
        let queryPath = this.$route.query;
        if (queryPath.id !== undefined) {
            this.create_item.form_id = queryPath.id
            this.create_item.type = "update"
            this.getFormSetup()
        }
        this.utilScript()
    },

    unmounted() {
        loadAndRemoveTinyEditorAssets(false)
    },

    methods: {
        getLists() {
            let method = axios.post;
            let __this = this
            method("list", { list_type: 'get', lists: [] }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': __this._token
                }
            }).then((res) => {
                let post_data = res.data
                if (post_data.status) {
                    __this.lists = post_data.message
                } else {
                    swal_fire("", "error", "Something went wrong")
                }
            }).catch((error) => {
                swal_fire("", "error", error.response.data.message)
            })
        },

        getEmbedForm() {
            this.embed.loading = true
            let method = axios.post
            let __this = this
            method("form", { type: 'get_embed_form', form_id: __this.create_item.form_id }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': __this._token
                }
            }).then((res) => {
                let post_data = res.data
                __this.embed.loading = false
                __this.embed.code = post_data.message
            }).finally(() => {
            })
        },

        addCustom() {
            this.create_item.custom_inputs.push({
                label: "",
                placeholder: "",
                default: "",
                type: "text",
                name: "",
                required: "false",
                is_disabled: "false"
            })
        },

        removeCustom(custom) {
            let index = this.create_item.custom_inputs.indexOf(custom)
            this.create_item.custom_inputs.splice(index, 1)
        },

        utilScript() {
            "use strict";
            var KTUsersAddUser = (function (__this) {
                var __this = __this;
                return {
                    init: function () {
                        (() => {
                            const t = document.getElementById("kt_subscription_form");
                            const r = t.querySelectorAll(".required");
                            var o, n = {
                                fields: {},
                                plugins: {
                                    trigger: new FormValidation.plugins.Trigger,
                                    bootstrap: new FormValidation.plugins.Bootstrap5({
                                        rowSelector: ".fv-row",
                                        eleInvalidClass: "",
                                        eleValidClass: ""
                                    })
                                }
                            };
                            r.forEach((e => {
                                const t = e.closest(".row").querySelector("input");
                                t && (o = t);
                                const r = e.closest(".row").querySelector("textarea");
                                r && (o = r);
                                const s = e.closest(".row").querySelector("select");
                                s && (o = s);
                                const i = o.getAttribute("name");
                                n.fields[i] = {
                                    validators: {
                                        onlyBlankSpaces: {
                                            message: e.innerText + " is required"
                                        }
                                    }
                                }
                            }));
                            var s = FormValidation.formValidation(t, n);
                            const i = t.querySelector('[data-kt-ecommerce-settings-type="submit"]');
                            i.addEventListener("click", (function (e) {
                                e.preventDefault(), s && s.validate().then((function (e) {
                                    if ("Valid" == e) {
                                        i.setAttribute("data-kt-indicator", "on");
                                        i.disabled = !0;
                                        __this.create_item.form_description = tinymce.get("form_description").getContent()
                                        let method = axios.post;
                                        method("form", __this.create_item, {
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded',
                                                'X-CSRF-Token': __this._token
                                            }
                                        }).then((res) => {
                                            let post_data = res.data
                                            if (post_data.status) {
                                                if (__this.create_item.type == "create") {
                                                    __this.create_item.form_id = post_data.message.id
                                                    __this.create_item.type = "update"
                                                    __this.$router.go(-1);
                                                    swal_fire("", "success", "Form created successfully")
                                                } else {
                                                    swal_fire("", "success", "Form updated successfully")
                                                }
                                            } else {
                                                swal_fire("", "error", "Something went wrong")
                                            }
                                        }).catch((error) => {
                                            swal_fire("", "error", error.response.data.message)
                                        }).finally(() => {
                                            i.removeAttribute("data-kt-indicator");
                                            i.disabled = !1;
                                        })
                                    } else {
                                        Swal.fire({
                                            text: "Oops! There are some error(s) detected.",
                                            icon: "error",
                                            buttonsStyling: !1,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: {
                                                confirmButton: "btn btn-primary"
                                            }
                                        })
                                    }
                                }))
                            }))
                        })();
                    },
                };
            })(this);
            KTUtil.onDOMContentLoaded(function () {
                KTUsersAddUser.init();
            }, this);
        },

        getFormSetup() {
            let url = "form", method = axios.post
            let __this = this
            method(url, { type: "get_setup", form_id: this.create_item.form_id }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': __this._token
                }
            }).then((res) => {
                let post_data = res.data
                if (post_data.status) {
                    let message = post_data.message
                    __this.create_item.form_name = message.form_name
                    __this.create_item.form_title = message.form_title
                    __this.create_item.select_list = message.select_list
                    __this.create_item.form_type = message.form_type
                    __this.create_item.form_description = message.form_description
                    __this.create_item.redirect_after_subs = JSON.parse(message.redirect_after_subs)
                    __this.create_item.hide_after_subs = message.hide_after_subs
                    __this.create_item.delay_time = message.delay_time
                    __this.create_item.subscribe_button = message.subscribe_button
                    __this.create_item.custom_inputs = JSON.parse(message.custom_inputs)
                    __this.create_item.style = JSON.parse(message.style)
                    loadAndRemoveTinyEditorAssets(true, "#form_description", false)
                }
            })
        },

        checkBeforeAdd(custom) {
            var key = "name", create_item = this.create_item.custom_inputs, i;
            var l = create_item.length
            var arrUniqueByKey = [...new Map(create_item.map(item => [item[key], item])).values()]
            let index = this.create_item.custom_inputs.indexOf(custom)
            if (l > arrUniqueByKey.length) {
                this.create_item.custom_inputs[index].name = ""
                swal_fire("", "error", "The name field cannot be the same")
            }
        },

        copyCode() {
            var copy_button = document.getElementById('copy_button')
            navigator.clipboard.writeText(this.embed.code);
            copy_button.innerHTML = 'Copied'
            copy_button.classList.replace('btn-primary', 'btn-success')
            setTimeout(function () {
                copy_button.innerHTML = 'Copy'
                copy_button.classList.replace('btn-success', 'btn-primary')
            }, 2000)
        }
    },
}