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
    CreateFeaturePage,
    AboutPage,
    PreferencesPage
} from './app.po';
import { browser } from 'protractor';

describe('navigate around the maintab', () => {
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

    beforeAll(async () => {
        // testing on mobile sized screen
        const width = 600;
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
        await browser.get("/app/activity/5ed1aafcb257a55e9c25beea;type=2;token=ZcksTu5LiY");
        await showfeature.waitUntilPresent();
    });

    it('should show unauthenticated journey page', async () => {
        expect(await showfeature.headerIsPresent(null, "#showfeature-header")).toBeTruthy();
    });

    it('should login ahd show authenticated journey page', async () => {
        await showfeature.clickElement(null, "#accept-invitation");
        await browser.waitForAngular();
        await register.fillEmail();
        await register.fillPassword();
        await register.submitLoginForm();
        await maintab.waitUntilVisible();
        expect(await showfeature.headerIsPresent(null, "#showfeature-header")).toBeTruthy();
    });

    it('should load the Me page', async () => {
        await maintab.clickTabButton('#tab-button-me');
        await me.waitUntilVisible();
        expect(await app.currentUrl()).toContain('app/me');
    });

    it('should load the journey if exists', async () => {
        await maintab.clickTabButton('#journey-card');
        await me.waitUntilVisible();
        expect(app.headerIsPresent(null, '#showfeature-header')).toBeTruthy();
    });

    it('should leave the journey', async () => {
        await showfeature.clickTitleAuthenticated('#show-event-title');
        await me.waitUntilVisible();
        await browser.sleep(5000);
    });
});
