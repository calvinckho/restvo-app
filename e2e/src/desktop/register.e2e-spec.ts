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
    CreatefeaturePage,
    AboutPage,
    PreferencesPage
} from '../app.po';
import {browser} from 'protractor';

describe('register an account as a new user', () => {
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
    let createfeature: CreatefeaturePage;
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
        createfeature = new CreatefeaturePage();
        onboardfeature = new OnboardingfeaturePage();
        await browser.get('/');
    });

    it('should show unauthenticated main page', async () => {
        await discover.waitUntilElementPresent('#discover-header');
        expect(await discover.headerIsPresent('#discover-header')).toBeTruthy();
    });

    it('should open register modal', async () => {
        await discover.clickElement('#signin');
        await register.waitUntilVisible();
        expect(await register.elementIsPresent('#register')).toBeTruthy();
    });

    it('should show welcome walkthrough', async () => {
        await register.clickElement('#switchToSignUp');
        await register.waitUntilElementPresent('#welcomeSlides');
        expect(await register.elementIsPresent('#welcomeSlides')).toBeTruthy();
    });

    it('should show create account form', async () => {
        await register.clickElement('#leaveWelcomeSlides');
        await register.waitUntilElementPresent('#createAccount');
        expect(await register.elementIsPresent('#createAccount')).toBeTruthy();
    });

    it('should fill out and submit email registration form', async () => {
        await register.fillSubmitCreateAccountEmailForm();
        await app.waitUntilElementPresent('ion-alert');
        expect(await app.elementIsPresent('ion-alert')).toBeTruthy();
    });

    it('should confirm success prompt', async () => {
        await app.clickAlertButton('OK');
        await register.waitUntilElementPresent('#login-button');
        expect(await register.elementIsPresent('#login-button')).toBeTruthy();
    });

    it('should authenticate the new user', async () => {
        await browser.get('/activity/5d5785b462489003817fee18;verify=9LL1tFgDTH9skXdYmoofMmPmgwYLaAQ78elfIWu6xRebj2L7');
        expect(await maintab.waitUntilPresent()).toBeTruthy();
    });

    it('should finish the onboarding process', async () => {
        await onboardfeature.waitUntilVisible();
        await onboardfeature.waitUntilElementVisible('.tile-card');
        await onboardfeature.finishOnboarding();
        await onboardfeature.waitUntilInvisible();
        expect(await onboardfeature.elementIsPresent('#get-started')).toBeFalsy();
    });

    it('should open Privacy & Security page', async () => {
        await app.clickElement('#userProfileSettings');
        await app.waitUntilUrlContains('profile');
        await app.clickElement('#privacy-tab');
        await app.waitUntilUrlContains('privacy');
        expect(await app.currentUrl()).toContain('privacy');
    });

    it('should delete the new user', async () => {
        await app.clickElement('#delete-user');
        await app.waitUntilElementVisible('ion-alert');
        await app.clickAlertButton('Yes, delete my account.');
        await app.waitUntilElementInvisible('ion-alert');
        await browser.waitForAngular();
        await discover.waitUntilElementVisible('#signin');
        expect(await discover.elementIsPresent('#signin')).toBeTruthy();
    });
});
