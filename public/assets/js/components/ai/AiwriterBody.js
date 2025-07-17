export default {
    template: `
    <div class="card">
        <div class="card-header">
            <div class="card-title">
                <div class="d-flex align-items-center position-relative my-1">
                    <div class="fw-bolder me-5">
                        <span class="me-2 fs-5">Welcome to AI Email Writer</span>
                    </div>
                </div>
            </div>
            <div class="card-toolbar flex-row-fluid justify-content-end gap-5">
                Write your email using AI
            </div>
        </div>
        <div class="card-body py-4">
            <form @submit.prevent="handleSubmit" id="aiwriterform" method="POST">
                <div class="stepper">
                    <div v-for="(step, index) in steps" :key="index" v-show="currentStep === index" class="step">
                        <div v-if="step.fields.length">
                            <div v-for="field in step.fields" :key="field.name" class="fv-row mb-7 fv-plugins-icon-container">
                                <label :for="field.name" class="required fw-bold fs-6" :class="{ 'mb-2' : field.name!='email_information' }">{{ field.label }}</label>
                                <div class="form-text mb-3" v-if="field.name=='email_information'">Tell the AI what your Email is about. Please be as detailed as you want</div>

                                <textarea :name="field.name" :placeholder="field.placeholder" rows="9" v-model="formData[field.name]" class="form-control form-control-solid mb-3 mb-lg-0" v-if="field.type=='textarea'"></textarea>

                                <div data-kt-buttons="true" v-if="field.type=='radio'">
                                    <div class="d-flex flex-wrap">
                                        <label class="btn btn-outline btn-active-light-primary d-flex justify-content-center flex-stack text-start p-6 mx-2 mb-5 w-300px" :class="{ 'active' : formData[field.name]==data_field.value }" v-for="(data_field, data_index) in field.data" :key="data_index">
                                            <div class="d-flex align-items-center" style="white-space: nowrap;">
                                                <input class="form-check-input d-none" type="radio" :name="field.name" v-model="formData[field.name]" :value="data_field.value" />
                                                <div class="fw-semibold">
                                                    <i class="me-2" :class="data_field.class"></i>
                                                    {{data_field.label}}
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <input v-model="formData[field.name]" :name="field.name" :id="field.name" :type="field.type" :required="field.required" :placeholder="field.placeholder" class="form-control form-control-solid mb-3 mb-lg-0" v-if="field.type=='text'">
                            </div>
                        </div>

                        <div v-else-if="currentStep===2">
                            <textarea class="form-control mb-4" rows="10" v-model="aiResponse" id="aiwriter_response" readonly></textarea>
                            <button type="button" class="btn btn-primary mb-5" @click="copyValue"><i class="la la-clipboard"></i> Copy to clipboard</button>
                        </div>
                        <div class="d-flex justify-content-between">
                            <button v-if="index > 0" type="button" @click="prevStep" class="btn btn-primary">Previous</button>
                            <button v-if="index < steps.length - 1 && currentStep<1" type="button" @click="nextStep" class="btn btn-primary">Next</button>
                            <button type="submit" v-else-if="currentStep===1" class="btn btn-primary" data-kt-user-table-select="process_selected">
                                <span class="indicator-label">Finish</span>
                                <span class="indicator-progress">Please wait...
                                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `,
    props: ['profile_details'],
    data() {
        return {
            currentStep: 0,
            formData: {
                product_name: null,
                email_information: null,
                business_type: null,
                email_style: "casual",
                type: "body"
            },
            aiResponse: null,
            _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
            steps: [
                {
                    fields: [
                        { name: "product_name", label: "What is your product's name?", placeholder: "Enter product name", type: "text", required: true },
                        { name: "email_information", label: "Tell us about your email", placeholder: "", type: "textarea", required: true },
                        { name: "business_type", label: "What is your business type?", placeholder: "Examples: Real Estate", type: "text", required: true },
                    ],
                },
                {
                    fields: [
                        {
                            name: "email_style", label: "Choose your Email Style", type: "radio", required: true, data: [
                                { label: "Casual", value: "casual", class: 'fab fa-shirtsinbulk fs-2x' },
                                { label: "Friendly", value: "friendly", class: 'fa fa-smile fs-2x' },
                                { label: "Formal", value: "formal", class: 'fab fa-black-tie fs-2x' },
                                { label: "Informal", value: "informal", class: 'fa fa-tshirt fs-2x' },
                                { label: "Funny", value: "funny", class: 'fa fa-grin-tongue-wink fs-2x'},
                                { label: "Inspirational", value: "inspirational", class: 'fa fa-lightbulb fs-2x'},
                                { label: "Informative", value: "informative", class: 'fa fa-info-circle fs-2x'},
                            ]
                        },
                    ],
                },
                {fields: []}
            ],
            formValidation: null
        }
    },
    mounted() {
        this.formValidation = FormValidation.formValidation(document.getElementById("aiwriterform"), {
            fields: {
                product_name: {
                    validators: {
                        onlyBlankSpaces: { message: "Title of the list is required" },
                    },
                },
                email_information: {
                    validators: {
                        onlyBlankSpaces: { message: "Title of the list is required" },
                    },
                },
                business_type: {
                    validators: {
                        onlyBlankSpaces: { message: "Title of the list is required" },
                    },
                },
                email_style: {
                    validators: {
                        onlyBlankSpaces: { message: "Please select your email style" },
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
            }
        });
    },
    methods: {
        copyValue() {
            copyValue(this.aiResponse);
        },
        nextStep() {
            this.formValidation && this.formValidation.validate().then((t) => {
                if (t != "Valid") {
                    swal_fire("", "error", "Please fill all the required fields");
                    return false;
                }
                this.currentStep++;
            });
        },
        prevStep() {
            this.currentStep--;
        },
        handleSubmit() {
            let __this = this;
            
            this.formValidation && this.formValidation.validate().then((t) => {
                if (t == "Valid") {
                    Swal.fire({
                        html: `Please wait while we are generating email
                        <br><br>
                        <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>`,
                        buttonsStyling: false,
                        showCancelButton: false,
                        showConfirmButton: false,
                        confirmButtonText: "Ok, got it!",
                        cancelButtonText: 'Nope, cancel it',
                        customClass: {
                            confirmButton: "btn btn-primary",
                            cancelButton: 'btn btn-danger'
                        }
                    });

                    let submit_btn = document.querySelector('[data-kt-user-table-select="process_selected"]');

                    submit_btn.setAttribute("data-kt-indicator", "on");
                    submit_btn.disabled = 1;

                    axios.post("aiwriter", __this.formData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-CSRF-Token': __this._token
                        }
                    }).then((res) => {
                        res = res.data;
                        if(res.status) {
                            __this.currentStep===1 ? __this.currentStep++ : 2;
                            __this.aiResponse = res.message;
                            Swal.close();
                        } else {
                            swal_fire("", "error", res.message);
                        }
                    }).catch((error) => {
                        swal_fire("", "error", error.response.data.message);
                    }).finally(() => {
                        submit_btn.removeAttribute("data-kt-indicator");
                        submit_btn.disabled = 0;
                    })
                } else {
                    swal_fire("", "error", "Please fill all the required fields");
                    return;
                }
            });
        },
    },
}