import {
    AppPage,
    MaintabPage,
    RegisterPage,
    NewsPage,
    ChatPage,
    DiscoverPage,
    DashboardPage,
    ShowfeaturePage,
    PickfeaturePopoverPage,
    PickpeoplePopoverPage,
    EditfeaturePage,
    EditparticipantsPage,
    OnboardingfeaturePage,
    CreateFeaturePage,
    AboutPage,
    PreferencesPage
} from '../app.po';
import {browser} from 'protractor';

describe('add and remove user from group', () => {
    let app: AppPage;
    let showfeature: ShowfeaturePage;
    let maintab: MaintabPage;
    let register: RegisterPage;
    let news: NewsPage;
    let chat: ChatPage;
    let discover: DiscoverPage;
    let about: AboutPage;
    let preferences: PreferencesPage;
    let me: DashboardPage;
    let pickfeature: PickfeaturePopoverPage;
    let pickpeople: PickpeoplePopoverPage;
    let editfeature: EditfeaturePage;
    let editparticipants: EditparticipantsPage;
    let createfeature: CreateFeaturePage;
    let onboardfeature: OnboardingfeaturePage;

    beforeAll(async () => {
        // testing on mobile sized screen
        /*const width = 600;
        const height = 968;
        await browser.driver.manage().window().setSize(width, height);*/
        app = new AppPage();
        maintab = new MaintabPage();
        register = new RegisterPage();
        showfeature = new ShowfeaturePage();
        news = new NewsPage();
        chat = new ChatPage();
        discover = new DiscoverPage();
        me = new DashboardPage();
        about = new AboutPage();
        preferences = new PreferencesPage();
        pickfeature = new PickfeaturePopoverPage();
        pickpeople = new PickpeoplePopoverPage();
        createfeature = new CreateFeaturePage();
        editfeature = new EditfeaturePage();
        editparticipants = new EditparticipantsPage();
        onboardfeature = new OnboardingfeaturePage();
        await browser.get('/activity/5f72454627cf747d0ccb16d0');
        await showfeature.waitUntilElementVisible('#signin');
        await showfeature.clickElement('#signin');
        await register.waitUntilVisible();
        await register.fillEmail();
        await register.fillPassword();
        await register.submitLoginForm();
    });

    it('should show authenticated activity page', async () => {
        await register.waitUntilInvisible(); // for unknown reason, this method takes 5-7 seconds to complete
        expect(await maintab.waitUntilPresent()).toBeTruthy();
    });

    it('should open People view', async () => {
        debugger;
        await showfeature.clickElement('#add-user-to-group');
        await editfeature.waitUntilElementVisible('#add-people');
        expect(await editfeature.elementIsPresent('#add-people')).toBeTruthy();
    });

    it('should open pick member view', async () => {
        await editfeature.clickElement('#add-people');
        await app.waitUntilElementVisible('ion-popover');
        await app.clickPopoverChoice('member');
        expect(await pickpeople.waitUntilVisible()).toBeTruthy();
    });

    it('should search, select, and add user', async () => {
        await pickpeople.searchUser('Asia Ho');
        await pickpeople.waitUntilElementInvisible('.pickpeople-user');
        await pickpeople.waitUntilElementVisible('.pickpeople-user');
        await pickpeople.userSelect('Asia Ho');
        await pickpeople.clickElement('#done');
        expect(await pickpeople.waitUntilInvisible()).toBeTruthy();
    });

    it('should have added Asia Ho', async () => {
        await editfeature.searchUser('Asia Ho');
        await editfeature.waitUntilElementVisible('.user-select');
        expect(await editfeature.elementIsPresent('.user-select')).toBeTruthy();
    });

    it('should try to select Asia Ho and remove her', async () => {
        await editfeature.userSelect('Asia Ho');
        await editfeature.clickElement('#remove-role');
        await app.waitUntilElementVisible('ion-alert');
        await app.clickAlertChoice('Member');
        await app.clickAlertButton('OK');
        await app.waitUntilElementInvisible('ion-alert .alert-head');
        await app.waitUntilElementVisible('ion-alert .alert-head');
        await app.clickAlertButton('Remove');
        expect(await editfeature.waitUntilVisible()).toBeTruthy();
    });

    it('should have removed Asia Ho', async () => {
        expect(await editfeature.elementIsPresent('.user-select')).toBeFalsy();
    });
});
