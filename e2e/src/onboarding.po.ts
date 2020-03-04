import { browser, by, element } from 'protractor';
import * as faker from 'faker';

export class OnBoardingPage {
  navigateTo() {
    return browser.get('/register');
  }

  clickCreateButton() {
      return element(by.css('[data-po=create-account]')).click();
  }

  async fillOutName() {
      await by.addLocator('shadowCss', (selector, inShadowSelector, root) =>
          (root || document)
              .querySelector(selector)
              .shadowRoot
              .querySelector(inShadowSelector));
      await element(by.shadowCss('ion-input[data-po=first-name]', 'input')).sendKeys(faker.name.firstName());
      await element(by.shadowCss('ion-input[data-po=last-name]', 'input')).sendKeys(faker.name.lastName());
      await element(by.css('[data-po=submit-name]')).click();
      return
  }

  currentUrl() {
      return browser.getCurrentUrl();
  }

  getTitle() {
      return element(by.css('[data-po=title]')).getText();
  }
}
