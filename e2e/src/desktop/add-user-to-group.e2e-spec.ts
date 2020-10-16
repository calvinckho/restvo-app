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
    EditparticipantsPage,
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
    let editparticipants: EditparticipantsPage;
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
        editparticipants = new EditparticipantsPage();
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

    it('should open People view', async () => {
        await showfeature.clickElement('#add-user-to-group');
        await editfeature.waitUntilElementVisible('#add-people');
        expect(await editfeature.elementIsPresent('#add-people')).toBeTruthy();
    });

    it('should select new user and add them', async () => {
        await editfeature.clickElement('#add-people');
        await app.waitUntilElementVisible('ion-popover');
        await app.clickPopoverChoice('member');
        await pickpeople.waitUntilVisible();
        expect(await pickpeople.elementIsPresent('#done')).toBeTruthy();
    });

    it('should search, select, and add user', async () => {
        await pickpeople.searchUser('Asia Ho');
        await browser.sleep(2000);
        await pickpeople.userSelect('Asia Ho');
        await pickpeople.clickElement('#done');
        await pickpeople.waitUntilInvisible();
        expect(await pickpeople.elementIsPresent('#done')).toBeFalsy();
    });

    it('should exit out the People view', async () => {
        await editfeature.clickElement('#exit-pickpeople');
        expect(await editfeature.waitUntilInvisible()).toBeTruthy();
    });

    it('should open People view', async () => {
        await showfeature.clickElement('#add-user-to-group');
        await editfeature.waitUntilElementVisible('#add-people');
    });

    it('should select added user and remove them', async () => {
        await editfeature.userSelect('Asia Ho');
    });
});
