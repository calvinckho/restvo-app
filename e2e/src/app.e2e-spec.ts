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
        await showfeature.navigateTo(); // navigate to '/'
        await showfeature.waitUntilPresent(); // wait until showfeature is present
        await showfeature.clickSigninButton('#signin');
        await browser.waitForAngular(); // wait for angular to stabilize
        await register.fillEmail(); // fill email
        await register.fillPassword(); // fill password
        await register.submitLoginForm(); // submit form
        await maintab.waitUntilVisible(); // wait until maintab is visible
    });

    it('should log in successfully', async () => {
        expect(await app.currentUrl()).toContain('app'); // it should contain /app in url
    });

    it('should load the news page', async () => {
        await maintab.clickTabButton('#tab-button-news'); // click on the News tab
        await news.waitUntilVisible(); // wait for news to be visible
        expect(await app.currentUrl()).toContain('app/news'); // it should contain /news in url
    });

    it('should load the Me page', async () => {
        await maintab.clickTabButton('#tab-button-me'); // click on the Me tab
        await me.waitUntilVisible(); // wait for me to be visible
        expect(await app.currentUrl()).toContain('app/me');
    });

    it('should load the edit profile page', async () => {
        await maintab.clickTabButton('#edit-profile-button'); // click on edit profile
        await about.waitUntilVisible(); // wait until about page is visible
        expect(app.headerIsPresent(null, '#about-me-header')).toBeTruthy(); // the about me header is present
    });

});

//steps
//1 - click the back button (id="clickback")
//2 - click the settings tabs
//3 - click the logout tab logout
