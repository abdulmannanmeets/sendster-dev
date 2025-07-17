export default {
	template: `
    <form id="kt_ecommerce_list_template_form" class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework" data-kt-redirect="../../demo1/dist/apps/ecommerce/sales/listing.html" data-select2-id="select2-data-kt_ecommerce_edit_order_form">
	<!--begin::Aside column-->
	<div class="w-100 flex-lg-row-auto w-lg-500px mb-7 me-7 me-lg-10">
        <h2 class="mb-5">Subscriber Settings</h2>
		<div class="card card-flush py-4">
			<div style="padding: 2rem 2.5rem">
                <label class="fw-bold fs-6 form-label">Subscriber success page</label>
                <div class="fv-row fv-plugins-icon-container">
                    <input class="form-control form-control-solid mb-3" v-model="create_item.subscribe.success_page_url" id="success_page_url" type="url">
                </div>
                <div class="text-muted fs-7 text-justify"><i class="fas fa-exclamation-circle me-2 fs-7"></i>Add a link to redirect users to a custom page letting them know they've subscribed successfully. If you choose 'Double Opt-In' as your 'List type', this page will tell that a confirmation email has been sent to them.</div>
            </div>
		</div>

		<div class="card card-flush my-4">
			<div style="padding: 2rem 2.5rem">
                <label class="fw-bold fs-6 form-label">Subscription confirmation page(Only applies for double opt-ins)</label>
                <div class="fv-row fv-plugins-icon-container">
                    <input class="form-control form-control-solid mb-3" v-model="create_item.subscribe.confirmed_page_url" name="confirmed_page" type="url">
                </div>
                <div class="text-muted fs-7 text-justify"><i class="fas fa-exclamation-circle me-2 fs-7"></i>Add a link to redirect users to a custom URL letting them know their 'Double Opt-in' subscription is confirmed.</div>
            </div>
		</div>

		<div class="card card-flush my-4">
			<div style="padding: 2rem 2.5rem">
                <label class="fw-bold fs-6 form-label">Already subscribed page / Confirmation page</label>
                <div class="fv-row fv-plugins-icon-container">
                    <input class="form-control form-control-solid mb-3" name="subscribed_page" v-model="create_item.subscribe.subscribed_page_url" type="url">
                </div>
                <div class="text-muted fs-7 text-justify"><i class="fas fa-exclamation-circle me-2 fs-7"></i>Add a link to redirect users to a custom URL letting them know they've already subscribed.</div>
            </div>
		</div>

        <h2 class="mb-5 mt-10">Unsubscribe settings</h2>
		<div class="card card-flush my-4">
			<div style="padding: 2rem 2.5rem">
                <label class="fw-bold fs-6 form-label">Unsubscribe behavior</label>
                <div class="fv-row fv-plugins-icon-container">
                    <div class="form-check form-check-custom form-check-solid">
                        <input class="form-check-input me-3" name="list_type" type="radio" id="kt_modal_update_role_option_0" v-model="create_item.unsubscribed.behavior" :checked="!create_item.unsubscribed.behavior">
                        <label class="form-check-label" for="kt_modal_update_role_option_0"><div class="fw-bolder text-gray-800" style="white-space:nowrap;">Single Opt-in</div></label>
                    </div>
                </div>
                <div class="fv-row fv-plugins-icon-container my-3">
                    <div class="form-check form-check-custom form-check-solid">
                        <input class="form-check-input me-3" name="list_type" type="radio" id="kt_modal_update_role_option_1" v-model="create_item.unsubscribed.behavior" :checked="create_item.unsubscribed.behavior">
                        <label class="form-check-label" for="kt_modal_update_role_option_1"><div class="fw-bolder text-gray-800" style="white-space:nowrap;">Double Opt-in</div></label>
                    </div>
                </div>
                <div class="text-muted fs-7 mt-5 text-justify"><i class="fas fa-exclamation-circle me-2 fs-7"></i>If you select double opt-out, users will be required to click a confirmation link on the unsubscribe page to complete their action.</div>
            </div>
		</div>
		<div class="card card-flush my-4">
			<div style="padding: 2rem 2.5rem">
                <label class="fw-bold fs-6 form-label">Unsubscribe user</label>
                <div class="fv-row fv-plugins-icon-container">
                    <div class="form-check form-check-custom form-check-solid">
                        <input class="form-check-input me-3" name="select_list" type="radio" id="kt_list_select_0" v-model="create_item.unsubscribed.user" :checked="!create_item.unsubscribed.user">
                        <label class="form-check-label" for="kt_list_select_0"><div class="fw-bolder text-gray-800" style="white-space:nowrap;">Only this list</div></label>
                    </div>
                </div>
                <div class="fv-row fv-plugins-icon-container my-3">
                    <div class="form-check form-check-custom form-check-solid">
                        <input class="form-check-input me-3" name="select_list" type="radio" id="kt_list_select_1" v-model="create_item.unsubscribed.user" :checked="create_item.unsubscribed.user">
                        <label class="form-check-label" for="kt_list_select_1"><div class="fw-bolder text-gray-800" style="white-space:nowrap;">All Lists</div></label>
                    </div>
                </div>
                <div class="text-muted fs-7 mt-5 text-justify"><i class="fas fa-exclamation-circle me-2 fs-7"></i>When a user unsubscribes from a newsletter or through the API, choose whether to unsubscribe them from this list only or unsubscribe them from all lists</div>
            </div>
		</div>
		<div class="card card-flush py-4">
			<div style="padding: 2rem 2.5rem">
                <label class="fw-bold fs-6 form-label">Unsubscribe success page</label>
                <div class="fv-row fv-plugins-icon-container">
                    <input class="form-control form-control-solid mb-3" name="unsubscribe_page" v-model="create_item.unsubscribed.unsubscribe_page_url" type="url">
                </div>
                <div class="text-muted fs-7 text-justify"><i class="fas fa-exclamation-circle me-2 fs-7"></i>When users unsubscribe from a newsletter, they'll be sent to a generic unsubscription confirmation page. Add a link to redirect users to a page of your preference.</div>
            </div>
		</div>
		<button type="submit" class="btn btn-primary mt-10" data-kt-users-modal-action="submit">
			<span class="indicator-label">Save</span>
			<span class="indicator-progress">Please wait...<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
		</button>
	</div>
	<div class="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-3">
		<div class="mb-5">
			<h2 class="">Thank you email</h2>
			<!--begin::Order details-->
			<div class="card card-flush py-4">
				<!--begin::Card body-->
				<div style="padding: 2rem 2.5rem">
					<div class="d-flex flex-column gap-5">
						<div class="d-flex flex-column"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><input type="checkbox" v-model="create_item.thank_you_email.is" :checked="create_item.thank_you_email.is == 'true'" name="is_send"><label class="fw-bold fs-6" style="margin-left: 5px; white-space: break-spaces;">Send users a thank you email after they subscribe through the subscriber form or API.</label></span></div></div></div>
						<div>
							<label class="fw-bold fs-6 form-label">Thank you email subject</label>
							<div class="fv-row fv-row fv-plugins-icon-container"><input v-model="create_item.thank_you_email.subject" class="form-control form-control-solid mb-3" name="thank_email_subject" type="text"></div>
						</div>
						<div>
							<label class="fw-bold fs-6 form-label">Thank you email message</label>
							<div class="fv-row fv-row fv-plugins-icon-container">
								<textarea id="thank_email_message" name="thank_email_message" v-model="create_item.thank_you_email.message" v-html="create_item.thank_you_email.message"></textarea>
							</div>
						</div>
					</div>
				</div>
				<!--end::Card header-->
			</div>
		</div>
		<div class="mb-5">
			<h2 class="">Confirmation email (for double opt-in)</h2>
			<!--begin::Order details-->
			<div class="card card-flush py-4">
				<!--begin::Card body-->
				<div style="padding: 2rem 2.5rem">
					<div class="d-flex flex-column gap-5">
						<div>
							<label class="fw-bold fs-6 form-label">Confirmation email subject</label>
							<div class="fv-row fv-row fv-plugins-icon-container"><input v-model="create_item.confirm_email.subject" class="form-control form-control-solid mb-3" name="confirm_email_subject" type="text"></div>
						</div>
						<div>
							<label class="fw-bold fs-6 form-label">Confirmation email message</label>
							<div class="fv-row fv-row fv-plugins-icon-container">
								<textarea name="confirm_email_message" v-model="create_item.confirm_email.message" id="confirm_email_message" v-html="create_item.confirm_email.message"></textarea>
							</div>
						</div>
					</div>
				</div>
				<!--end::Card header-->
			</div>
		</div>
		<div class="mb-5">
			<h2 class="">Goodbye email</h2>
			<!--begin::Order details-->
			<div class="card card-flush py-4">
				<!--begin::Card body-->
				<div style="padding: 2rem 2.5rem">
					<div class="d-flex flex-column gap-10">
						<!--begin::Input group-->
						<div class="d-flex flex-column"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><input v-model="create_item.goodbye_email.is" :checked="create_item.goodbye_email.is == 'true'" type="checkbox"><label class="fw-bold fs-6" style="margin-left: 5px; white-space: break-spaces;">Send user a goodbye email after they unsubscribe from a newsletter or through the API?</label></span></div></div></div>
						<div>
							<label class="fw-bold fs-6 form-label">Goodbye email subject</label>
							<div class="fv-row fv-row fv-plugins-icon-container"><input v-model="create_item.goodbye_email.subject" class="form-control form-control-solid mb-3" name="goodbye_email_subject" type="text"></div>
						</div>
						<div>
							<label class="fw-bold fs-6 form-label">Goodbye email message</label>
							<div class="fv-row fv-row fv-plugins-icon-container">
								<textarea name="goodbye_email_message" id="goodbye_email_message" v-model="create_item.goodbye_email.message" v-html="create_item.goodbye_email.message"></textarea>
							</div>
						</div>
					</div>
				</div>
				<!--end::Card header-->
			</div>
		</div>
	</div>
	<div></div></form>
    `,

	data: () => ({
		create_item: {
			list_id: '',
			list_type: 'list_templates',
			subscribe: {
				success_page_url: '',
				confirmed_page_url: '',
				subscribed_page_url: '',
			},
			unsubscribed: {
				behavior: false,
				user: false,
				unsubscribe_page_url: '',
			},
			thank_you_email: {
				is: "false",
				subject: "You're on our list!",
				message: `<table id="bodyTable" style="table-layout: fixed; background-color: #ffffff;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td id="bodyCell" style="padding-right: 10px; padding-left: 10px;" align="center" valign="top"><table class="wrapperWebview" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"> </td></tr></tbody></table><table class="wrapperBody" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"><table class="tableCard" style="background-color: #ffffff; border-color: #E5E5E5; border-style: solid; border-width: 0 1px 1px 1px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="imgHero" style="padding-bottom: 10px;" align="center" valign="top"><a style="text-decoration: none;" href="#" target="_blank" rel="noopener"><img style="width: 100%; max-width: 150px; height: auto; display: block;" src="https://mechmarketers.com/sendy/img/email-notifications/applause.gif" alt="" width="150" border="0" /></a></td></tr><tr><td class="mainTitle" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h2 class="text" style="color: #000000; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;">Welcome to the club!</h2></td></tr><tr><td class="subTitle" style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h4 class="text" style="color: #848484; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">You have landed on our list. Changed your mind? Click on the below button to opt out.</h4></td></tr><tr><td class="containtTable ui-sortable" style="padding-left: 20px; padding-right: 20px;" align="center" valign="top"><table class="tableButton" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding-top: 0px; padding-bottom: 20px;" align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="ctaButton" style="background-color: #000000; border-radius: 50px; padding: 12px 35px 12px 35px;" align="center"><a class="text" style="color: #ffffff; font-family: Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" href="[unsubscribe]" target="_blank" rel="noopener">Unsubscribe me</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px;" height="20"> </td></tr></tbody></table><table class="space" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 1px; line-height: 1px;" height="30"> </td></tr></tbody></table></td></tr></tbody></table><p style="color: #666666; font-family: 'Open Sans', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 22px; padding: 0; margin: 0;">Powered by <a style="color: #666666; text-decoration: underline;" href="https://sendster.in">Sendster</a></p></td></tr></tbody></table>`
			},
			confirm_email: {
				subject: 'Please confirm your subscription',
				message: `<table id="bodyTable" style="table-layout: fixed; background-color: #ffffff;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td id="bodyCell" style="padding-right: 10px; padding-left: 10px;" align="center" valign="top"><table class="wrapperWebview" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"> </td></tr></tbody></table><table class="wrapperBody" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"><table class="tableCard" style="background-color: #ffffff; border-color: #E5E5E5; border-style: solid; border-width: 0 1px 1px 1px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="imgHero" style="padding-bottom: 10px;" align="center" valign="top"><a style="text-decoration: none;" href="#" target="_blank" rel="noopener"><img style="width: 100%; max-width: 150px; height: auto; display: block;" src="https://mechmarketers.com/sendy/img/email-notifications/almost-there.gif" alt="" width="150" border="0" /></a></td></tr><tr><td class="mainTitle" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h2 class="text" style="color: #000000; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;">Almost there!!</h2></td></tr><tr><td class="subTitle" style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h4 class="text" style="color: #848484; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">Click on the given link to confirm your subscription:</h4></td></tr><tr><td class="containtTable ui-sortable" style="padding-left: 20px; padding-right: 20px;" align="center" valign="top"><table class="tableButton" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding-top: 0px; padding-bottom: 20px;" align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="ctaButton" style="background-color: #000000; border-radius: 50px; padding: 12px 35px 12px 35px;" align="center"><a class="text" style="color: #ffffff; font-family: Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" href="[confirmation_link]" target="_blank" rel="noopener">Confirm your subscription</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px;" height="20"> </td></tr></tbody></table><table class="space" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 1px; line-height: 1px;" height="30"> </td></tr></tbody></table></td></tr></tbody></table><p style="color: #666666; font-family: 'Open Sans', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 22px; padding: 0; margin: 0;">Powered by <a style="color: #666666; text-decoration: underline;" href="https://sendster.in">Sendster</a></p></td></tr></tbody></table>`
			},
			goodbye_email: {
				is: "false",
				subject: "You're unsubscribed",
				message: `<table id="bodyTable" style="table-layout: fixed; background-color: #ffffff;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td id="bodyCell" style="padding-right: 10px; padding-left: 10px;" align="center" valign="top"><table class="wrapperWebview" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"> </td></tr></tbody></table><table class="wrapperBody" style="max-width: 600px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center" valign="top"><table class="tableCard" style="background-color: #ffffff; border-color: #E5E5E5; border-style: solid; border-width: 0 1px 1px 1px;" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="imgHero" style="padding-bottom: 10px;" align="center" valign="top"><a style="text-decoration: none;" href="#" target="_blank" rel="noopener"><img style="width: 100%; max-width: 150px; height: auto; display: block;" src="https://mechmarketers.com/sendy/img/email-notifications/sad.gif" alt="" width="150" border="0" /></a></td></tr><tr><td class="mainTitle" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h2 class="text" style="color: #000000; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 36px; text-transform: none; text-align: center; padding: 0; margin: 0;">Leaving Us!</h2></td></tr><tr><td class="subTitle" style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"><h4 class="text" style="color: #848484; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; font-style: normal; letter-spacing: normal; line-height: 24px; text-transform: none; text-align: center; padding: 0; margin: 0;">Unsubscribed by accident? Click on the given link to re-subscribe.</h4></td></tr><tr><td class="containtTable ui-sortable" style="padding-left: 20px; padding-right: 20px;" align="center" valign="top"><table class="tableButton" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding-top: 0px; padding-bottom: 20px;" align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="ctaButton" style="background-color: #000000; border-radius: 50px; padding: 12px 35px 12px 35px;" align="center"><a class="text" style="color: #ffffff; font-family: Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; font-style: normal; letter-spacing: 1px; line-height: 20px; text-transform: uppercase; text-decoration: none; display: block;" href="[resubscribe]" target="_blank" rel="noopener">Re-subscribe me</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size: 1px; line-height: 1px;" height="20"> </td></tr></tbody></table><table class="space" border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-size: 1px; line-height: 1px;" height="30"> </td></tr></tbody></table></td></tr></tbody></table><p style="color: #666666; font-family: 'Open Sans', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 22px; padding: 0; margin: 0;">Powered by <a style="color: #666666; text-decoration: underline;" href="https://sendster.in">Sendster</a></p></td></tr></tbody></table>`
			},
			formValidator: null
		},
		_token: document.querySelector('meta[name="__token"]').getAttribute('content')
	}),

	methods: {
		loadSetup() {
			const url = "list"
			const method = axios.post
			const __this = this

			const formData = {
				list_type: 'get_list_templates',
				list_id: this.$route.query.id
			}

			method(url, formData, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-CSRF-Token': this._token
				}
			}).then((res) => {
				let post_data = res.data
				if (post_data.status) {
					let data = post_data.message, subscribe;
					try {
						subscribe = JSON.parse(data.subscribe)
					} catch(err) {
						console.log(err)
						subscribe = {
							success_page_url: "", confirmed_page_url: "", subscribed_page_url: "",
						}
					}
					__this.create_item.confirm_email = JSON.parse(data.confirm_email);
					__this.create_item.goodbye_email = JSON.parse(data.goodbye_email);
					__this.create_item.thank_you_email = JSON.parse(data.thank_you_email);
					__this.create_item.unsubscribed = JSON.parse(data.unsubscribed);
					tinymce.get("goodbye_email_message").setContent(__this.create_item.goodbye_email.message ?? "");
					tinymce.get("confirm_email_message").setContent(__this.create_item.confirm_email.message ?? "");
					tinymce.get("thank_email_message").setContent(__this.create_item.thank_you_email.message ?? "");
				}
			}).finally(() => {
			})
		},

		ktUtil() {
			this.create_item.list_id = this.$route.query.id;
			"use strict";
			var MLRTemplates = (function (__this) {
				var __this = __this;
				const form = document.querySelector('#kt_ecommerce_list_template_form');
				const submit_button = form.querySelector('[data-kt-users-modal-action="submit"]');
				return {
					init: function () {
						__this.formValidator = FormValidation.formValidation(form, {
							fields: {
								thank_email_subject: {
									validators: {
										onlyBlankSpaces: { message: "Thankyou email subject is required" },
									},
								},
								thank_email_message: {
									validators: {
										onlyBlankSpaces: { message: "Thankyou email message is required" },
									},
								},
								confirm_email_subject: {
									validators: {
										onlyBlankSpaces: { message: "Confirmation email subject is required" },
									},
								},
								confirm_email_message: {
									validators: {
										onlyBlankSpaces: { message: "Confirmation email message is required" },
									},
								},
								goodbye_email_subject: {
									validators: {
										onlyBlankSpaces: { message: "Good bye email subject is required" },
									},
								},
								goodbye_email_message: {
									validators: {
										onlyBlankSpaces: { message: "Good bye email message is required" },
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

						form.addEventListener("submit", function (s) {
							s.preventDefault(), __this.formValidator && __this.formValidator.validate().then(function (t) {
								if ("Valid" == t) {
									submit_button.setAttribute("data-kt-indicator", "on");
									submit_button.disabled = !0;

									axios.post("list", __this.create_item, {
										headers: {
											'Content-Type': 'application/x-www-form-urlencoded',
											'X-CSRF-Token': __this._token
										}
									}).then((res) => {
										let post_data = res.data
										if (post_data.status) {
											swal_fire('', 'success', 'Saved successfully')
										} else {
											swal_fire('', 'error', 'Something went wrong')
										}
									}).catch((error) => {
										swal_fire('', 'error', error.response.data.message)
									}).finally(() => {
										submit_button.removeAttribute("data-kt-indicator");
										submit_button.disabled = !1;
									});
								} else {
									swal_fire("", "error", "Please enter the reuired data");
								}
							});
						});
					}
				}
			})(this);

			KTUtil.onDOMContentLoaded(function () {
				MLRTemplates.init();
			}, this);
		}
	},

	mounted() {
		this.loadSetup();
		this.ktUtil();
		this.create_item.list_id = this.$route.query.id;
		var __this = this;
		loadAndRemoveTinyEditorAssets(true, "#goodbye_email_message", false);
		loadAndRemoveTinyEditorAssets(true, "#confirm_email_message", false);
		loadAndRemoveTinyEditorAssets(true, "#thank_email_message", false);
		tinymce.get("goodbye_email_message").on('keyup', function (e) {
			__this.create_item.thank_you_email.message = this.getContent();
			__this.formValidator.revalidateField("goodbye_email_message");
		});
		tinymce.get("confirm_email_message").on('keyup', function (e) {
			__this.create_item.confirm_email.message = this.getContent();
			__this.formValidator.revalidateField("confirm_email_message");
		});
		tinymce.get("thank_email_message").on('keyup', function (e) {
			__this.create_item.goodbye_email.message = this.getContent();
			__this.formValidator.revalidateField("thank_email_message");
		});
	},
}