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
import { async } from '@angular/core/testing';

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
    await browser.sleep(3000);
    expect(await maintab.waitUntilPresent()).toBeTruthy();
  });

  it('should click the Invite menu toggle', async () => {
    await app.clickElement('#inviteLabel');
    await browser.sleep(3000);
    expect(await app.currentUrl()).toContain('invite');
  });

  it('should click Community card then Create card', async () => {
    await app.clickElement('#communityCard');
    await pickfeature.waitUntilVisible();
    await pickfeature.clickNextButton();
    await pickfeature.clickCreateNewMoment();
    await browser.sleep(3000);
    expect(await app.currentUrl()).toContain('community');
  });

  it('should fill out community info', async () => {
    await createfeature.waitUntilVisible();
    await createfeature.enterTextareaText('ion-textarea[ng-reflect-name="communityName"]', 'E2E-Community-Test')
    await createfeature.clickNextButton();
    await browser.sleep(500); // just for us observe the click to the next page
    await createfeature.clickNextButton();
    await browser.sleep(500); // just for us observe the click to the next page
    await createfeature.enterNewCommunityDescription();
    await createfeature.clickSaveButton();
    await browser.waitForAngular();
    // await createfeature.waitUntilElementInvisible('#communityDescription');
    // await createfeature.waitUntilElementVisible('#tutorialNext');
    await createfeature.clickTutorialNextButton();
    // await browser.sleep(500); // just for us observe the click to the next page
    await createfeature.clickTutorialDoneButton();
    // await browser.sleep(500); // just for us observe the click to the next page
    await createfeature.waitUntilInvisible();
    await browser.sleep(5000);
    expect(await app.currentUrl()).toContain('manage');
  });

  it('should have new community present on the My Community list', async () => {
    await app.clickElement('#meDashboard');
    await app.waitUntilUrlContains('me');
    await app.waitUntilElementPresent('#E2E-Community-Test')
    expect(await app.elementIsPresent('#E2E-Community-Test')).toBeTruthy();
  });


});
