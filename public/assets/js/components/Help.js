export default {
    template: `
    <div class="card shadow-sm mb-7">
        <div class="card-header collapsible cursor-pointer rotate" data-bs-toggle="collapse" data-bs-target="#kt_docs_card_collapsible">
            <div class="card-title"><h3>Email template</h3></div>
            <div class="card-toolbar rotate-180">
                <span class="svg-icon svg-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                        <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor"></path>
                    </svg>
                </span>
            </div>
        </div>
        <div id="kt_docs_card_collapsible" class="collapse show">
            <div class="card-body">
                <div class="row mb-7">
                    <div class="col-md-12 pb-10 pb-lg-0">
                        <h2>Leads value</h2>
                        <p class="fs-6 fw-semibold text-gray-600 py-2">Use variables <code>{name}</code>, <code>{first_name}</code>, <code>{last_name}</code>, or <code>{extra_fields_key}</code> to auto detect name, first name, last name, or leads extra email values like: address, phone number, etc during email sending.</p>
                    </div>
                </div>
                <div class="row mb-7">
                    <div class="col-md-12 pb-10 pb-lg-0">
                        <h2>Unsubscribe message</h2>
                        <p class="fs-6 fw-semibold text-gray-600 py-2">Use shortcode <code data-bs-toggle="tooltip" data-bs-placement="top" title="Click to copy" data-action-copy="true">[unsubscribe]Text[/unsubscribe]</code> to convert a text to Unsubscription link inside email editor.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card shadow-sm mb-7">
        <div class="card-header collapsible cursor-pointer rotate collapsed" data-bs-toggle="collapse" data-bs-target="#kt_docs_card_collect_subscriber_collapsible">
            <div class="card-title"><h3>Add lead to a list</h3></div>
            <div class="card-toolbar rotate-180">
                <span class="svg-icon svg-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                        <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor"></path>
                    </svg>
                </span>
            </div>
        </div>
        <div id="kt_docs_card_collect_subscriber_collapsible" class="collapse">
            <div class="card-body">
                <div class="row mb-7">
                    <div class="col-md-12 pb-10 pb-lg-0">
                        <p class="fs-6 fw-semibold text-gray-600 py-2">To store subscribers with list API you need to make a http <strong>POST</strong> request with your API credentials and subscription data. The required parameters written below:</p>
                        <div class="mb-5">
                            <h4 class="fs-4 fw-bold text-dark-600">API url:</h4>
                            <code class="text-dark-900 fw-semibold m-0 p-0">{{install_url + '/api/list'}}</code>
                        </div>
                        <div class="mb-5">
                            <h4 class="fs-4 fw-bold text-dark-600">Post parameters:</h4>
                            <div class="text-dark-900 fw-semibold m-0 p-0">add_subscriber: 1</div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">api_key: <code>{{api_key}}</code></div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">list_id: Your list id</div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">name: Subscribers name</div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">email: Subscribers email</div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">extra_data: Your data (optional) - <i>(You can add multiple additional data as extra field with seperate post parameters)</i></div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">dont_store: 1 OR 0 (optional) - <i>(This is an optional field if you just need to check whether all the credentials are right and no need to insert the subscriber you can use it.)</i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card shadow-sm mb-7">
        <div class="card-header collapsible cursor-pointer rotate collapsed" data-bs-toggle="collapse" data-bs-target="#kt_docs_card_view_lists_collapsible">
            <div class="card-title"><h3>View all lists</h3></div>
            <div class="card-toolbar rotate-180">
                <span class="svg-icon svg-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                        <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor"></path>
                    </svg>
                </span>
            </div>
        </div>
        <div id="kt_docs_card_view_lists_collapsible" class="collapse">
            <div class="card-body">
                <div class="row mb-7">
                    <div class="col-md-12 pb-10 pb-lg-0">
                        <p class="fs-6 fw-semibold text-gray-600 py-2">To view lists through API you need to create another <strong>POST</strong> request. (Currently it will show all your list's names including their ID)</p>
                        <div class="mb-5">
                            <h4 class="fs-4 fw-bold text-dark-600">API url:</h4>
                            <code class="text-dark-900 fw-semibold m-0 p-0">{{install_url + '/api/list'}}</code>
                        </div>
                        <div class="mb-5">
                            <h4 class="fs-4 fw-bold text-dark-600">Post parameters:</h4>
                            <div class="text-dark-900 fw-semibold m-0 p-0">all_lists: 1</div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">api_key: <code>{{api_key}}</code></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card shadow-sm mb-7">
        <div class="card-header collapsible cursor-pointer rotate collapsed" data-bs-toggle="collapse" data-bs-target="#kt_docs_card_view_leads_collapsible">
            <div class="card-title"><h3>View all leads</h3></div>
            <div class="card-toolbar rotate-180">
                <span class="svg-icon svg-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.5" x="11" y="18" width="13" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
                        <path d="M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z" fill="currentColor"></path>
                    </svg>
                </span>
            </div>
        </div>
        <div id="kt_docs_card_view_leads_collapsible" class="collapse">
            <div class="card-body">
                <div class="row mb-7">
                    <div class="col-md-12 pb-10 pb-lg-0">
                        <p class="fs-6 fw-semibold text-gray-600 py-2">To view leads through API you need to create another <strong>POST</strong> request.</p>
                        <div class="mb-5">
                            <h4 class="fs-4 fw-bold text-dark-600">API url:</h4>
                            <code class="text-dark-900 fw-semibold m-0 p-0">{{install_url + '/api/list'}}</code>
                        </div>
                        <div class="mb-5">
                            <h4 class="fs-4 fw-bold text-dark-600">Post parameters:</h4>
                            <div class="text-dark-900 fw-semibold m-0 p-0">view_leads: 1</div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">api_key: <code>{{api_key}}</code></div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">list_id: Your list id</div>
                            <div class="text-dark-900 fw-semibold m-0 p-0">leads_count: 10 <i>(By default it will return 10 leads put -1 to get all)</i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    name: 'help',
    data: () => ({
        api_key: null,
        install_url: null,
        _token: document.querySelector('meta[name="__token"]').getAttribute('content')
    }),
    created() {
        axios.post("setting", {
            type: 'get',
            from: 'help'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRF-Token': this._token
            }
        }).then((res) => {
            let data = res.data
            if (data.api_key !== "" && data.install_url !== "") {
                this.api_key = data.api_key
                this.install_url = data.install_url
            }
        }).catch((error) => {})
    },
    mounted() {
        hoverAndCopy()
    },
}