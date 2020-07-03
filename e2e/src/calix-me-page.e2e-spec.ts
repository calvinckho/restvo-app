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
} from './calix-me-page.po';
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
        await showfeature.navigateTo();
        await showfeature.waitUntilPresent();
        await showfeature.clickSigninButton('#signin');
        await browser.waitForAngular();
        await register.fillEmail();
        await register.fillPassword();
        await register.submitLoginForm();
        await maintab.waitUntilVisible();
    });

    it('should log in successfully', async () => {
        expect(await app.currentUrl()).toContain('app');
    });

    it('should load the news page', async () => {
        await maintab.clickTabButton('#tab-button-news');
        await news.waitUntilVisible();
        expect(await app.currentUrl()).toContain('app/news');
    });

    it('should load the Me page', async () => {
        await maintab.clickTabButton('#tab-button-me');
        await me.waitUntilVisible();
        expect(await app.currentUrl()).toContain('app/me');
    });

    it('should load the edit profile page', async () => {
        await maintab.clickTabButton('#edit-profile-button');
        await about.waitUntilVisible();
        expect(app.headerIsPresent('#about-me-header')).toBeTruthy();
    });

});
