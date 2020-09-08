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
    OnboardingfeaturePage,
    CreateFeaturePage,
    AboutPage,
    PreferencesPage
} from './app.po';
import {browser} from 'protractor';

describe('join journey and leave journey', () => {
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
    let createfeature: CreateFeaturePage;
    let onboardfeature: OnboardingfeaturePage;

    beforeAll(async () => {
        // testing on desktop sized screen
        const width = 1200;
        const height = 968;
        await browser.driver.manage().window().setSize(width, height);
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
        onboardfeature = new OnboardingfeaturePage();
        await browser.get('/app/activity/5ed1aafcb257a55e9c25beea;type=2;token=ZcksTu5LiY');
        await showfeature.waitUntilPresent();
    });

    it('should show unauthenticated journey page', async () => {
        expect(await showfeature.headerIsPresent(null, '#showfeature-header')).toBeTruthy();
    });

    it('should login and show authenticated journey page', async () => {
        await showfeature.clickElement(null, '#accept-invitation');
        await browser.waitForAngular();
        await register.fillEmail();
        await register.fillPassword();
        await register.submitLoginForm();
        await maintab.waitUntilVisible();
        expect(await showfeature.headerIsPresent('app-main-tab', '#accept-invitation')).toBeTruthy();
    });

    it('should accept invitation and dismiss onboarding', async () => {
        await showfeature.clickElement('app-main-tab', '#accept-invitation');
        await browser.waitForAngular();
        await onboardfeature.clickStartButton();
        await onboardfeature.waitUntilInvisible(); // for unknown reason, this method takes 5-7 seconds to complete
        expect(await showfeature.headerIsPresent('app-main-tab', '#accept-invitation')).toBeFalsy();
    });

    it('should confirm success prompt', async () => {
        await app.clickAlertButton('OK');
        await app.waitUntilElementInvisible('ion-alert');
        expect(await app.alertIsPresent()).toBeFalsy();
    });

    it('should click to see more options', async () => {
        await showfeature.clickElement(`app-main-tab`, '#show-event-title');
        await browser.sleep(1000);
        //await app.waitUntilElementVisible('app-main-tab #toggle-more-options');
        await showfeature.clickElement(`app-main-tab`, '#toggle-more-options');
        await browser.sleep(3000);
        //await app.waitUntilElementVisible('ion-action-sheet');
        expect(await app.actionsheetIsPresent()).toBeTruthy();
    });

    it('should click the leave action sheet button', async () => {
        await app.clickActionSheetButton('Leave');
        await app.waitUntilElementVisible('app-main-tab #click-to-join');
        expect(await showfeature.headerIsPresent('app-main-tab', '#click-to-join')).toBeTruthy();
    });

    it('should click the Settings tab', async () => {
        await app.clickElement('#userProfileSettings');
        await browser.waitForAngular();
        expect(await app.currentUrl()).toContain('profile');
    });

    it('should click the logout button', async () => {
        await app.clickElement('#logoutButton');
        await browser.waitForAngular();
        expect(await showfeature.signinButtonIsPresent()).toBeTruthy();
    });
});
