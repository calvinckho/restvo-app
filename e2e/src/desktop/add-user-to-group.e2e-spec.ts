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
    EditfeaturePage,
    OnboardingfeaturePage,
    CreateFeaturePage,
    AboutPage,
    PreferencesPage
} from '../app.po';
import {browser} from 'protractor';

describe('add and remove user from group', () => {
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
    let editfeature: EditfeaturePage;
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
        editfeature = new EditfeaturePage();
        onboardfeature = new OnboardingfeaturePage();
        await browser.get('/activity/5f72454627cf747d0ccb16d0');
        //await browser.waitForAngular(); // wait for angular to direct /app/activity to /activity since it is still unauthenticated
        await showfeature.waitUntilElementVisible('#signin');
        await showfeature.clickElement('#signin');
        await register.waitUntilVisible();
        await register.fillEmail();
        await register.fillPassword();
        await register.submitLoginForm();
    });

    it('should show authenticated activity page', async () => {
        await register.waitUntilInvisible(); // for unknown reason, this method takes 5-7 seconds to complete
        expect(await maintab.waitUntilPresent()).toBeTruthy();
    });

    it('should click to add user to group', async () => {
        await showfeature.clickElement('#add-user-to-group');
        await editfeature.waitUntilElementVisible('#add-people');
        expect(await editfeature.elementIsPresent('#add-people')).toBeTruthy();
    });

    it('should select new user and add them', async () => {
        await editfeature.clickElement('#add-people');
        await app.waitUntilElementVisible('ion-popover');
        await app.clickPopoverChoice('member');
        await pickpeople.userSelect('Asia Ho');
        await pickpeople.clickElement('#done');
        await pickpeople.waitUntilInvisible();
        await editfeature.clickElement('#exit-pickpeople');
        expect(await editfeature.waitUntilInvisible()).toBeTruthy();
    });
});
