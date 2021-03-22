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

describe('join and leave journey without preview', () => {
    sharedTest('/app/activity/5ed1aafcb257a55e9c25beea;type=2;token=ZcksTu5LiY');
});

describe('join and leave journey with preview', () => {
    sharedTest('/app/activity/5f72454627cf747d0ccb16d0;type=2;token=MjHTvRmXCf');
});

function sharedTest(activityUrl) {
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
    });

    it('should show unauthenticated journey page', async () => {
        await browser.get(activityUrl);
        await showfeature.waitUntilElementPresent('#showfeature-header');
        expect(await showfeature.headerIsPresent('#showfeature-header')).toBeTruthy();
    });

    it('should login and show authenticated journey page', async () => {
        await showfeature.clickElement('#accept-invitation');
        await register.waitUntilVisible();
        await register.fillEmail();
        await register.fillPassword();
        await register.submitLoginForm();
        await register.waitUntilInvisible();
        expect(await maintab.waitUntilPresent()).toBeTruthy();
    });

    it('should accept invitation and dismiss onboarding', async () => {
        await showfeature.clickElement('#accept-invitation');
        await onboardfeature.clickElement('#get-started');
        await showfeature.waitUntilElementInvisible('#accept-invitation');
        expect(await showfeature.headerIsPresent('#accept-invitation')).toBeFalsy();
    });

    it('should confirm success prompt', async () => {
        await app.clickAlertButton('OK');
        await app.waitUntilElementInvisible('ion-alert');
        expect(await app.elementIsPresent('ion-alert')).toBeFalsy();
    });

    it('should click to see more options', async () => {
        await showfeature.clickElement('#show-event-title');
        await showfeature.waitUntilElementVisible('#toggle-more-options');
        await showfeature.clickElement('#toggle-more-options');
        await app.waitUntilElementVisible('ion-action-sheet');
        expect(await app.actionsheetIsPresent()).toBeTruthy();
    });

    it('should click the leave action sheet button', async () => {
        await app.clickActionSheetButton('Leave');
        await app.waitUntilElementVisible('app-main-tab #click-to-join');
        expect(await showfeature.headerIsPresent('#click-to-join')).toBeTruthy();
    });

    it('should click the Settings tab', async () => {
        await app.clickElement('#userProfileSettings');
        await app.waitUntilUrlContains('profile');
        expect(await app.currentUrl()).toContain('profile');
    });

    it('should click the logout button', async () => {
        await app.clickElement('#logoutButton');
        await browser.waitForAngular();
        await discover.waitUntilElementVisible('#signin');
        expect(await discover.elementIsPresent('#signin')).toBeTruthy();
    });
}
