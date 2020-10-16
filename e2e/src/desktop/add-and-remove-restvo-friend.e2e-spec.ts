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
  CreateFeaturePage,
  AboutPage,
  PreferencesPage
} from '../app.po';
import { browser, by } from 'protractor';
import { AotCompiler } from '@angular/compiler';

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
  let createfeature: CreateFeaturePage;
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
    createfeature = new CreateFeaturePage();
    onboardfeature = new OnboardingfeaturePage();
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
    await browser.sleep(5000); //change to ensure intended user shows up on list
    // await app.waitUntilElementPresent('#restvoGroup .restvoGroup')
    // await app.waitUntilElementTextPresent('#restvoGroup', 'Asia Ho')
    // await browser.sleep(5000);
    await app.clickElement('#restvoGroup ion-item');
    await app.clickElement('#selectAppUsersButton')
    await app.waitUntilElementVisible('ion-alert');
    expect(await app.elementIsPresent('ion-alert')).toBeTruthy();//expect confirmation alert to be truthy
  });

  it('should confirm selected user to chat with', async () => {
    await app.clickAlertButton('yes');
    await browser.sleep(5000); //change to ensure intended user shows up on list
    await app.waitUntilElementInvisible('ion-alert');
    expect(await app.elementIsPresent('ion-alert')).toBeFalsy();//expect confirmation alert to be truthy
  });

  it('should sender selected user a chat message', async () => {
    await app.waitUntilElementPresent('ion-textarea[ng-reflect-name="Asia Ho"]')
    await app.enterNonRegistrationInputText('ion-textarea[ng-reflect-name="Asia Ho"]', 'This is an e2e test message', 'textarea');
    // await app.clickElement('#sendButton')
    await browser.sleep(5000);
    await app.clickModalChatSendButton()
    //click ion-button.action-button
    //await app.enterTextareaInputText('ion-textarea[ng-reflect-name="Asia Ho"] textarea', 'This is an e2e test message');
    //compare from ion-list chat list
    await browser.sleep(5000);
  });

  //ion-textarea[name="descriptionField"]

  //await app.clickAlertButton('yes');
  //

  //add spec to ch

});
