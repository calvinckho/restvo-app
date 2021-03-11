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
    CreatefeaturePage,
    AboutPage,
    PreferencesPage
} from '../app.po';
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
    let createfeature: CreatefeaturePage;

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
        createfeature = new CreatefeaturePage();
        await browser.get('/'); // navigate to '/'
        await discover.waitUntilPresent(); // wait until showfeature is present
        await discover.clickElement('#signin');
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
        await browser.sleep(3000);
        expect(await app.currentUrl()).toContain('app/me');
    });

    it('should load the edit profile page', async () => {
        await maintab.clickTabButton('#edit-profile-button'); // click on edit profile
        await about.waitUntilVisible(); // wait until about page is visible
        expect(app.headerIsPresent('#about-me-header')).toBeTruthy(); // the about me header is present
    });

    it('should click the back button', async () => {
        await app.clickElement('#clickback') // click the back button
        expect(app.headerIsPresent('#about-me-header')).toBeTruthy(); // the about me header is present
    });

    it('should click the Settings button', async () => {
        await app.clickElement('#dashboardSettingsButton'); // click the settings icon on the dashboard
        await browser.sleep(1000); // tell webdriver to wait so page can be seen
        expect(await app.currentUrl()).toContain('profile'); // it should contain /profile in url
    });

    it('should click the logout button', async () => {
        await app.clickElement('#logoutButton') //click the logout button
        await browser.sleep(1000); // tell webdriver to wait so sign in page can be seen
        expect(await discover.elementIsPresent('#signin')).toBeTruthy(); //it should contain signin button in header
    });
});
