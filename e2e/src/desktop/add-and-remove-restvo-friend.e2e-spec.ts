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

});
