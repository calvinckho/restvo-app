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
        editparticipants = new EditparticipantsPage();
        onboardfeature = new OnboardingfeaturePage();
        await browser.get('/activity/5f72454627cf747d0ccb16d0');
        await showfeature.waitUntilElementPresent('#showfeature-header');
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
        await showfeature.clickElement('#add-user-to-group');
        await editparticipants.waitUntilElementVisible('#add-people');
        expect(await editparticipants.elementIsPresent('#add-people')).toBeTruthy();
    });

    it('should open pick member view', async () => {
        await editparticipants.clickElement('#add-people');
        await app.waitUntilElementVisible('ion-popover');
        await app.clickPopoverChoice('member');
        await pickpeople.waitUntilVisible();
        expect(await pickpeople.elementIsPresent('#done')).toBeTruthy();
    });

    it('should search, select, and add Asia Ho', async () => {
        await pickpeople.searchUser('Asia Ho');
        await pickpeople.waitUntilElementInvisible('.pickpeople-user');
        await pickpeople.waitUntilElementVisible('.pickpeople-user');
        await pickpeople.userSelect('Asia Ho');
        await pickpeople.clickElement('#done');
        await pickpeople.waitUntilInvisible();
        expect(await pickpeople.elementIsPresent('#done')).toBeFalsy();
    });

    it('should have added Asia Ho', async () => {
        await editparticipants.searchUser('Asia Ho');
        await editparticipants.waitUntilElementInvisible('.user-select');
        await editparticipants.waitUntilElementVisible('.user-select');
        expect(await editparticipants.elementIsPresent('.user-select')).toBeTruthy();
    });

    it('should try to remove Asia Ho and see role selection alert', async () => {
        await editparticipants.userSelect('Asia Ho');
        await editparticipants.clickElement('#remove-role');
        await app.waitUntilElementVisible('ion-alert');
        expect(await app.elementIsPresent('ion-alert')).toBeTruthy();
    });

    it('should choose the member category and confirm remove', async () => {
        await app.clickAlertChoice('Member');
        await app.clickAlertButton('OK');
        await app.clickAlertButton('Remove');
        await browser.waitForAngular();
        await editparticipants.searchUser('Asia Ho');
        await browser.waitForAngular();
        expect(await editparticipants.elementIsPresent('.user-select')).toBeFalsy();
    });
});
