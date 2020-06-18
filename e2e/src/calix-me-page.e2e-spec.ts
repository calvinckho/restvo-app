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
import {disc} from "ionicons/icons";

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
        browser.driver.manage().window().setSize(width, height);
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
        browser.waitForAngularEnabled(false); // prevent an unknown async function from blocking protractor
        await showfeature.navigateTo();
        await browser.sleep(500); // wait
        showfeature.clickSigninButton('#signin');
        await browser.sleep(1500); // wait
        await register.fillEmail();
        //await register.fillPhoneNumber();
        await register.fillPassword();
        await browser.sleep(500); // wait
        register.submitLoginForm();
    });

    beforeEach(() => {
        browser.waitForAngularEnabled(false); // prevent an unknown async function from blocking protractor
    });

    it('should load the discover page', async () => {
            await browser.sleep(6000); // wait 1 second
            expect(discover.headerIsPresent()).toBeTruthy();
    });

    it('should load the Me page', async () => {
        maintab.clickTabButton('#tab-button-me');
        await browser.sleep(3000); // wait 3 sec
        expect(await app.currentUrl()).toContain('app/me');
    });

    it('should load the edit profile page', async () => {
      maintab.clickTabButton('#edit-profile-button');
      await browser.sleep(5000); // wait 5 sec
      expect(app.headerIsPresent('#about-me-header')).toBeTruthy();
    });
});
