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
        await browser.get('/');
    });

    it('should show unauthenticated main page', async () => {
        await showfeature.waitUntilElementPresent('#showfeature-header');
        expect(await showfeature.headerIsPresent('#showfeature-header')).toBeTruthy();
    });

    it('should open register modal', async () => {
        await showfeature.clickElement('#signin');
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
});
