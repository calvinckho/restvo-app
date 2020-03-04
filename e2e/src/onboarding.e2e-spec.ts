import { OnBoardingPage } from './onboarding.po';
import { browser } from 'protractor';

describe('the onboarding process', () => {
  let page: OnBoardingPage;

  beforeEach(() => {
      page = new OnBoardingPage();
  });

  it('should complete user creation', async () => {
      await page.navigateTo();
      await page.clickCreateButton();
      await page.fillOutName();
      console.log('filled out names');
      await browser.sleep(5000); // wait for dashboard to load
      //browser.waitForAngularEnabled(false); //prevent an unknown async function from blocking protractor
      expect(await page.currentUrl()).toContain('register');
  });
});
