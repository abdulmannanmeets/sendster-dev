import Index from './components/Index.js';
import Profile from './components/Profile.js';
import PageNotFound from './components/404.js'
import Links from './components/links/AllLinks.js';
import AllSmtps from './components/smtp/AllSmtps.js';
import AllLists from './components/lists/AllLists.js';
import Setting from './components/multiuser/Setting.js';
import EditLists from './components/lists/EditLists.js';
import CreateSmtp from './components/smtp/CreateSmtp.js';
import Dashboard from './components/dashboard/Dashboard.js';
import MailHistory from './components/dashboard/MailHistory.js';
import MultiUser from './components/multiuser/MultiUser.js';
import AllForms from './components/subscription/AllForms.js';
import EditForm from './components/subscription/EditForm2.js';
import AllSnippets from './components/snippets/AllSnippets.js';
import LiveSending from './components/campaign/LiveSending.js';
import AllSequences from './components/sequence/AllSequences.js';
import AllCampaigns from './components/campaign/AllCampaigns.js';
import EditSequences from './components/sequence/EditSequence2.js';
import CreateMultiUser from './components/multiuser/CreateUser.js';
import CreateCampaigns from './components/campaign/CreateCampaigns2.js';
import UserVerification from './components/UserVerification/UserVerification.js';
import ErrorLog from './components/campaign/ErrorLog.js';
import AllSegments from './components/lists/AllSegments.js';
import EditSegment from './components/lists/EditSegments.js';
import EmailVerification from './components/email_verification/email_verification2.js';
import Test from './components/Test.js';
import Help from './components/Help.js';
import AiWriter from './components/ai/AiwriterBody.js';
const { createStore } = Vuex;

const allUserData = getLoggedInUserData()
controlPageLoading();

const prefix = "Sendster - "
let url = window.location.pathname
url = url.substring(0, url.lastIndexOf('/'))

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    linkExactActiveClass: "active",
    base: url,
    routes: [
        { path: url + '/dashboard', name: 'dashboard', component: Dashboard, meta: { title: prefix + 'Dashboard', routerValue: "Dashboard" } },
        { path: url + '/mail_history', name: 'mail_history', component: MailHistory, meta: { title: prefix + 'Mail History', routerValue: "Dashboard" } },
        { path: url + '/all_lists', name: 'all_lists', component: AllLists, meta: { title: prefix + 'All Lists', routerValue: "List" } },
        { path: url + '/all_segments', name: 'all_segments', component: AllSegments, meta: { title: prefix + 'All Segments', routerValue: "List" } },
        { path: url + '/edit_segment', name: 'edit_segment', component: EditSegment, meta: { title: prefix + 'Edit Segment', routerValue: "List" } },
        { path: url + '/edit_list', name: 'edit_lists', component: EditLists, meta: { title: prefix + 'Edit List', routerValue: "List" }, props: true },
        { path: url + '/all_smtps', name: 'all_smtps', component: AllSmtps, meta: { title: prefix + 'All SMTPs', routerValue: "SMTPs" } },
        { path: url + '/create_smtp', name: 'create_smtp', component: CreateSmtp, meta: { title: prefix + 'Configure SMTP', routerValue: "SMTPs" } },
        { path: url + '/all_snippets', name: 'all_snippets', component: AllSnippets, meta: { title: prefix + 'All Snippets', routerValue: "Snippets" } },
        { path: url + '/all_campaigns', name: 'all_campaigns', component: AllCampaigns, meta: { title: prefix + 'All Campaigns', routerValue: "Campaign" } },
        { path: url + '/create_campaigns', name: 'create_campaigns', component: CreateCampaigns, meta: { title: prefix + 'Create Campaign', routerValue: "Campaign" } },
        { path: url + '/all_sequences', name: 'all_sequences', component: AllSequences, meta: { title: prefix + 'All Sequences', routerValue: "Sequence" } },
        { path: url + '/edit_sequences', name: 'edit_sequences', component: EditSequences, meta: { title: prefix + 'Edit Sequences', routerValue: "Sequence" } },
        { path: url + '/live_sending', name: 'live_sending', component: LiveSending, meta: { title: prefix + 'Live Sending', routerValue: "Campaign" }, props: true },
        { path: url + '/all_forms', name: 'all_forms', component: AllForms, meta: { title: prefix + 'All Forms', routerValue: "Subscription Form" } },
        { path: url + '/create_form', name: 'create_form', component: EditForm, meta: { title: prefix + 'Create Form', routerValue: "Subscription Form" } },
        { path: url + '/email_verification', name: 'email_verification', component: EmailVerification, meta: { title: prefix + 'Email Verification', routerValue: "Email Verification" } },
        { path: url + '/user_verification', name: 'user_verification', component: UserVerification, meta: { title: prefix + 'Verify your Order Code', routerValue: "User Verification" } },
        { path: url + '/all_users', name: 'all_users', component: MultiUser, meta: { title: prefix + 'Multiuser', routerValue: "Settings" } },
        { path: url + '/create_user', name: 'create_user', component: CreateMultiUser, meta: { title: prefix + 'Create Multiuser', routerValue: "Settings" } },
        { path: url + '/setting', name: 'setting', component: Setting, meta: { title: prefix + 'Setting', routerValue: "Settings" } },
        { path: url + '/help', name: 'help', component: Help, meta: { title: prefix + 'Help', routerValue: "Help" } },
        { path: url + '/all_links', name: 'links', component: Links, meta: { title: prefix + 'Links', routerValue: "List" } },
        { path: url + '/error_logs', name: 'error_logs', component: ErrorLog, meta: { title: prefix + 'Error logs', routerValue: "Error" } },
        { path: url + '/test', name: 'test', component: Test, meta: { title: prefix + 'Test', routerValue: "Error" } },
        { path: url + '/aiwriter', name: 'aiwriter', component: AiWriter, meta: { title: prefix + 'AI Writer', routerValue: "AI Writer" } },
        { path: url + '/:catchAll(.*)', name: 'page-not-found', component: PageNotFound, meta: { title: prefix + 'Page not found' } },
    ]
});

const app = Vue.createApp({});
app.config.globalProperties.app = app;
app.use(router);

const store = createStore({
    state: {
        shouldLeaveRoute: true,
    },
    mutations: {
        setShouldLeaveRoute(state, value) {
            state.shouldLeaveRoute = value;
        },
    },
});
app.use(store);

app.component('index', Index);
app.mount('#app');
router.beforeEach((to, from) => {
    document.title = to.meta.title;

    try {
        $('.tooltip').hide();
        const backdrop = document.querySelector('.modal-backdrop');
        if(backdrop) {
            backdrop.remove();
            document.body.style.overflow = "auto";
        }
    } catch (err) { }

    return allUserData.then(function (data) {
        if (data[0]) {
            localStorage.setItem("sendster_data", btoa(JSON.stringify(data[1])));
            let permission = JSON.parse(data[1].permission);
            permission.push('User Verification');
            permission.push('Help');
            permission.push('Error');
            if (Object.values(permission).indexOf(to.meta.routerValue) < 0) {
                return false;
            }
        } else { return false; }
    }).catch((error) => {
        console.log(error);
    })
});
addBlankFormValidator();