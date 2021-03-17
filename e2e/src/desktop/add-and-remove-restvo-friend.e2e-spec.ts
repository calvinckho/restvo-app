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
import { browser } from 'protractor';

describe(' Add and Remove a Restvo User as friend', () => {
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
    await browser.get('/');
  });

  it('should show unauthenticated main page', async () => {
    await discover.waitUntilElementPresent('#discover-header');
    expect(await discover.headerIsPresent('#discover-header')).toBeTruthy();
  });

  it('should login as Ted Ho', async () => {
    await discover.waitUntilElementVisible('#signin');
    await discover.clickElement('#signin');
    await register.waitUntilVisible();
    await register.fillEmail();
    await register.fillPassword();
    await register.submitLoginForm();
    await register.waitUntilInvisible();
    expect(await maintab.waitUntilPresent()).toBeTruthy();
  });

  it('should click the Chat tab', async () => {
    await app.clickElement('#chat');
    await app.waitUntilUrlContains('myconversations');
    await chat.waitUntilVisible();
    expect(await app.currentUrl()).toContain('myconversations');
  });

  it('should show the Create Chat page', async () => {
    await app.clickElement('#createNewChatButton');
    await app.waitUntilElementVisible('#createChatHeader');
    expect(await app.elementIsPresent('#createChatHeader')).toBeTruthy();
  });

  it('should select Asia Ho and show confirmation alert', async () => {
    await app.enterNonRegistrationInputText('#chatSearchBar', 'Asia Ho', '.searchbar-input');
    await browser.sleep(3000); // wait to ensure intended user shows up on list
    await app.clickElement('#restvoGroup ion-item');
    await browser.sleep(500);
    await app.clickElement('#selectAppUsersButton');
    await app.waitUntilElementVisible('ion-alert');
    expect(await app.elementIsPresent('ion-alert')).toBeTruthy(); // expect confirmation alert to be truthy
  });

  it('should confirm selected user to chat with', async () => {
    await app.clickAlertButton('yes');
    await app.waitUntilElementInvisible('ion-alert');
    expect(await app.elementIsPresent('ion-alert')).toBeFalsy(); // expect confirmation alert to be truthy
  });

  it('should send selected user a chat message', async () => {
    await app.waitUntilElementPresent('ion-textarea[ng-reflect-name="Asia Ho"]');
    await app.countChatElements();
    await app.enterNonRegistrationInputText('ion-textarea[ng-reflect-name="Asia Ho"]', 'This is an e2e test message', 'textarea');
    await app.clickModalChatSendButton();
    await browser.waitForAngular();
    await app.countChatElements();
    expect (await app.countChatElements()).toBe(2);
  });

  it('should click the more button', async () => {
    await app.clickElement('ion-modal #seeMoreInfo');
    await app.waitUntilElementPresent('#reportUserAbuse');
    expect(await app.elementIsPresent('#reportUserAbuse')).toBeTruthy();
  });

  it('should report selected user then delete and unfriend', async () => {
    await app.clickElement('#reportUserAbuse');
    await app.waitUntilElementVisible('ion-action-sheet');
    await browser.sleep(500);
    await app.clickActionSheetButton('Delete and Unfriend');
    await app.waitUntilElementInvisible('ion-action-sheet');
    await app.waitUntilElementVisible('ion-alert');
    await app.clickAlertButton('Proceed');
    await browser.waitForAngular();
    await app.clickAlertButton('Cancel');
    await app.waitUntilElementInvisible('ion-alert');
    expect(await app.elementIsPresent('#ion-alert')).toBeFalsy();
  });

  it('should ensure Asia Ho no longer shows up in the chat list', async () => {
    await app.enterNonRegistrationInputText('ion-searchbar', 'Asia Ho', 'input');
    await browser.sleep(3000);
    expect(await app.checkForChatListName('ion-virtual-scroll ion-item-sliding', 'Asia Ho')).toBeFalsy();
  });

  it('should log the user out', async () => {
    await app.clickElement('#userProfileSettings');
    await app.waitUntilUrlContains('profile');
    await app.clickElement('#logoutButton');
    await app.waitUntilElementPresent('#signin');
    expect(await discover.elementIsPresent('#signin')).toBeTruthy();
  });

});
