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
import { browser } from 'protractor';

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
        expect(await showfeature.headerIsPresent('app-main-tab', '.can-go-back #accept-invitation')).toBeFalsy(); // need .can-go-back class selector because there are two authenticated showfeature in the DOM
    });

    it('should confirm success prompt', async () => {
        await app.clickAlertButton('OK');
        await browser.sleep(1000);
        expect(await app.alertIsPresent()).toBeFalsy();
    });

    it('should open showfeature header options', async () => {
        await showfeature.clickElement(`app-main-tab`, '#show-event-title');
        await browser.sleep(7000);
        expect(await showfeature.headerIsPresent('app-main-tab', '#accept-invitation')).toBeTruthy();
    });
});
