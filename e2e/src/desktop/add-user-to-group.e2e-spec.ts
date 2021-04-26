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
    CreatecommunityPage,
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
    let createcommunity: CreatecommunityPage;
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
        createcommunity = new CreatecommunityPage();
        editparticipants = new EditparticipantsPage();
        onboardfeature = new OnboardingfeaturePage();
    });

    it('should show unauthenticated activity page', async () => {
        await browser.get('/activity/5e0012f714001a7dbf712de2');
        await showfeature.waitUntilElementPresent('#showfeature-header');
        expect(await showfeature.headerIsPresent('#showfeature-header')).toBeTruthy();
    });

    it('should login and show authenticated activity page', async () => {
        await showfeature.waitUntilElementVisible('#signin');
        await showfeature.clickElement('#signin');
        await register.waitUntilVisible();
        await register.fillEmail();
        await register.fillPassword();
        await register.submitLoginForm();
        await register.waitUntilInvisible();
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
        await pickpeople.enterTextInSearchBar('Asia Ho');
        await pickpeople.waitUntilElementInvisible('.pickpeople-user');
        await pickpeople.waitUntilElementVisible('.pickpeople-user');
        await pickpeople.userSelect('Asia Ho');
        await pickpeople.clickElement('#done');
        await pickpeople.waitUntilInvisible();
        expect(await pickpeople.elementIsPresent('#done')).toBeFalsy();
    });

    it('should have added Asia Ho', async () => {
        await editparticipants.enterTextInSearchBar('Asia Ho');
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
        await editparticipants.enterTextInSearchBar('Asia Ho');
        await browser.waitForAngular();
        expect(await editparticipants.elementIsPresent('.user-select')).toBeFalsy();
    });
});
