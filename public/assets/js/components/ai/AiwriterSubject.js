export default {
    template: `
    <label class="fw-bold fs-6 mb-2 text-primary" style="cursor:pointer; float:right;" @click="openModal">AI Subject Line Generator</label>
    <button type="button" class="d-none" data-bs-toggle="modal" :data-bs-target="'#aiWeriterModal_'+radio_name" :id="'aiWriterButton_'+radio_name"></button>
    <div class="modal fade" tabindex="-1" role="dialog" :id="'aiWeriterModal_'+radio_name">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Generate ideas </h5>
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" :id="radio_name" data-bs-dismiss="modal" aria-label="Close">
                        <span class="svg-icon svg-icon-2x">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
                                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="modal-body d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status" v-if="loading"><span class="visually-hidden">Loading...</span></div>
                    <div data-kt-buttons="true" v-else>
                        <label class="btn btn-outline btn-active-light-primary d-flex flex-stack text-start p-6 mb-5" v-for="(res, key) in response" :key="key">
                            <div class="d-flex align-items-center me-2">
                                <div class="form-check form-check-custom form-check-solid form-check-primary me-6 d-none">
                                    <input class="form-check-input" type="radio" :name="radio_name" :value="res" @click="changeData(res)" />
                                </div>
                                <div class="flex-grow-1">
                                    <div class="fw-semibold opacity-50">
                                        {{res}}
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    props: {
        subject: {
            required: true,
            default: null,
        },
        radio_name: {
            required: true,
        }
    },

    data() {
        return {
            loading: true,
            response: [],
            type: "subject",
            _token: document.querySelector('meta[name="__token"]').getAttribute('content'),
            modal: null,
        }
    },

    mounted() {
        this.loading = true;
    },

    methods: {
        openModal() {
            if (this.subject === null || this.subject.trim().length === 0) {
                swal_fire("", "error", "Please provide a Subject to create variations");
                return;
            }
            document.getElementById("aiWriterButton_"+this.radio_name).click();
            this.postData();
        },
        postData() {
            this.loading = true;
            axios.post("aiwriter", { type: this.type, subject: this.subject }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': this._token
                }
            }).then((res) => {
                res = res.data;
                if (res.status) {
                    this.finalizeData(res.message);
                } else {
                    swal_fire("", "error", res.message);
                }
            }).catch((error) => {
                console.log(error);
                swal_fire("", "error", error.response.data.message);
            }).finally(() => {
                this.loading = false;
            });
        },

        finalizeData(message) {
            const lines = message.split("\n");
            const modifiedLines = lines.map(line => {
                var cleanedLine = line.replace(/^[\d*-.\s]+/, '');
                cleanedLine = cleanedLine.replace(/\n/g, '<br>');
                cleanedLine = cleanedLine.replace("Alternative Headlines:", "");
                cleanedLine = cleanedLine.replace("Alternative headlines:", "");
                if(cleanedLine.length !== 0) {
                    return cleanedLine.replace(/\n/g, '<br>');
                }
                return false;
            }).filter(Boolean);
            this.response = modifiedLines;
        },

        changeData(data) {
            this.$emit("changeSubject", data);
            this.loading = true;
            this.response = [];
            document.getElementById(this.radio_name).click();
        }
    },

    emits: ['changeSubject']
}