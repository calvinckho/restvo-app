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
  PreferencesPage,
  ManagePage
} from '../app.po';
import { browser } from 'protractor';

describe(' Create and Delete a Community', () => {
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
  let manage: ManagePage;

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
    manage = new ManagePage();
    await browser.get('/');
  });

  it('should show unauthenticated main page', async () => {
    await showfeature.waitUntilElementPresent('#showfeature-header');
    expect(await showfeature.headerIsPresent('#showfeature-header')).toBeTruthy();
  });

  it('should login as Ted Ho', async () => {
    await showfeature.waitUntilElementVisible('#signin');
    await showfeature.clickElement('#signin');
    await register.waitUntilVisible();
    await register.fillEmail();
    await register.fillPassword();
    await register.submitLoginForm();
    await register.waitUntilInvisible();
    await browser.sleep(3000);
    expect(await maintab.waitUntilPresent()).toBeTruthy();
  });

  it('should click the Invite menu toggle', async () => {
    await app.clickElement('#inviteLabel');
    await pickfeature.waitUntilVisible();
    expect(await app.currentUrl()).toContain('invite');
  });

  it('should click Community card then Create card', async () => {
    await app.clickElement('#communityCard');
    await pickfeature.clickNextButton();
    await pickfeature.clickCreateNewMoment();
    await createfeature.waitUntilVisible();
    expect(await app.currentUrl()).toContain('community');
  });

  it('should fill out community info', async () => {
    await createfeature.enterTextareaText('ion-textarea[ng-reflect-name="communityName"]', 'E2E-Community-Test')
    await createfeature.waitUntilElementPresent('#communityName');
    await createfeature.clickNextButton();
    await createfeature.waitUntilElementPresent('#addProgramPrompt');
    await createfeature.clickNextButton();
    await createfeature.waitUntilElementPresent('#communityDescription');
    await createfeature.enterNewCommunityDescription();
    await createfeature.clickSaveButton();
    await createfeature.waitUntilElementPresent('#chooseProgramText')
    await createfeature.clickTutorialNextButton();
    await createfeature.waitUntilElementPresent('#tutorialDone')
    await createfeature.clickTutorialDoneButton();
    await createfeature.waitUntilInvisible();
    expect(await app.currentUrl()).toContain('manage');
  });

  it('should have new community present on the My Community list', async () => {
    await app.clickElement('#meDashboard');
    await app.waitUntilUrlContains('me');
    await app.waitUntilElementPresent('#E2E-Community-Test')
    expect(await app.elementIsPresent('#E2E-Community-Test')).toBeTruthy();
  });

  it('should click into the community, then delete through elipses button to delete', async () => {
    await app.clickElement('#E2E-Community-Test');
    await manage.waitUntilVisible();
    await manage.clickMoreOrganizerActions();
    await app.waitUntilElementVisible('ion-action-sheet');
    await app.clickActionSheetButton('Delete');
    await app.waitUntilElementInvisible('ion-action-sheet');
    await app.waitUntilElementVisible('ion-alert');
    await app.clickAlertButton('OK');
    await browser.waitForAngular();
    expect(await app.elementIsPresent('#E2E-Community-Test')).toBeFalsy();
  });

  it('should log the user out', async () => {
    await app.clickElement('#userProfileSettings');
    await app.waitUntilUrlContains('profile');
    await app.clickElement('#logoutButton');
    await app.waitUntilElementPresent('#signin')
    expect(await showfeature.elementIsPresent('#signin')).toBeTruthy();
  });


});
