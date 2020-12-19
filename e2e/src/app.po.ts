import { browser, by, element, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

class PageObjectBase {
    private path: string;
    protected tag: string;

    constructor(tag: string, path: string) {
        this.tag = tag;
        this.path = path;
    }

    load() {
        return browser.get(this.path);
    }

    rootElement() {
        return element(by.css(this.tag));
    }

    async waitUntilInvisible() {
        const els = await element.all(by.css(this.tag));
        for (const el of els) {
            if (await el.isDisplayed()) {
                return await browser.wait(ExpectedConditions.invisibilityOf(el), 10000);
            }
        }
    }

    async waitUntilPresent() {
        const els = await element.all(by.css(this.tag));
        if (els.length) {
            for (const el of els) {
                if (await el.isPresent()) {
                    return await browser.wait(ExpectedConditions.presenceOf(el), 10000);
                }
            }
        } else {
            await browser.wait(ExpectedConditions.presenceOf(element(by.css(this.tag))));
        }
    }

    async waitUntilNotPresent() {
        const els = await element.all(by.css(this.tag));
        for (const el of els) {
            if (await el.isDisplayed()) {
                return await browser.wait(ExpectedConditions.presenceOf(el), 10000);
            }
        }
    }

    waitUntilUrlContains(path) {
        return browser.wait(ExpectedConditions.urlContains(path), 10000);
    }

    async waitUntilVisible() {
        const els = await element.all(by.css(this.tag));
        if (els.length) {
            for (const el of els) {
                if (await el.isDisplayed()) {
                    return await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
                }
            }
        } else {
            await browser.wait(ExpectedConditions.visibilityOf(element(by.css(this.tag))));
        }
    }

    async waitUntilElementPresent(sel: string) {
        const els = await element.all(by.css(`${this.tag} ${sel}`));
        if (els.length) {
            for (const el of els) {
                if (await el.isPresent()) {
                    return await browser.wait(ExpectedConditions.presenceOf(el), 18000);
                }
            }
        } else {
            await browser.wait(ExpectedConditions.presenceOf(element(by.css(`${this.tag} ${sel}`))), 18000);
        }
    }

    async waitUntilElementVisible(sel: string) {
        const els = await element.all(by.css(`${this.tag} ${sel}`));
        if (els.length) {
            for (const el of els) {
                if (await el.isPresent()) {
                    return await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
                }
            }
        } else {
            await browser.wait(ExpectedConditions.visibilityOf(element(by.css(`${this.tag} ${sel}`))), 10000);
        }
    }

    async waitUntilElementInvisible(sel: string) {
        const els = await element.all(by.css(`${this.tag} ${sel}`));
        if (els.length) {
            for (const el of els) {
                if (await el.isDisplayed()) {
                    return await browser.wait(ExpectedConditions.invisibilityOf(el), 10000);
                }
            }
        } else {
            return await browser.wait(ExpectedConditions.invisibilityOf(element(by.css(`${this.tag} ${sel}`))), 10000);
        }
    }

    getTitle() {
        return element(by.css(`${this.tag} ion-title`)).getText();
    }

    protected async enterInputText(sel: string, text: string) {
        const els = await element.all(by.css(`${this.tag} ${sel}`));
        if (els.length) {
            if (await element.all(by.css(`${this.tag} ${sel} .native-input`)).isPresent()) { // if ion-input
                await element.all(by.css(`${this.tag} ${sel}`))
                    .filter(async (el, index) => await el.isPresent())
                    .first()
                    .element(by.css('input')) // because it is a web component, needs to select its nested input tag
                    .sendKeys(text);
            } else { // else, if it is just the input tag
                await element.all(by.css(`${this.tag} ${sel}`))
                    .filter(async (el, index) => await el.isPresent())
                    .first()
                    .sendKeys(text);
            }
        } else {
            const el = element(by.css(`${this.tag} ${sel}`));
            await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
            let inp = el;
            if (await element(by.css(`${this.tag} ${sel} .native-input`)).isPresent()) { // if ion-input
                inp = el.element(by.css('input')); // needs to select the nested input tag
            } // else, if it is just the input tag
            await inp.sendKeys(text);
        }
    }

    async enterTextareaText(sel: string, text: string) {
        const els = await element.all(by.css(`${this.tag} ${sel}`));
        if (els.length) {
            if (await element.all(by.css(`${this.tag} ${sel} .native-textarea`)).isPresent()) { // if ion-textarea
                await element.all(by.css(`${this.tag} ${sel}`))
                    .filter(async (el, index) => await el.isPresent())
                    .first()
                    .element(by.css('textarea')) // because it is a web component, needs to select its nested textarea tag
                    .sendKeys(text);
            } else { // else, if it is just the input tag
                await element.all(by.css(`${this.tag} ${sel}`))
                    .filter(async (el, index) => await el.isPresent())
                    .first()
                    .sendKeys(text);
            }
        } else {
            const el = element(by.css(`${this.tag} ${sel}`));
            await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
            let inp = el;
            if (await element(by.css(`${this.tag} ${sel} .native-textarea`)).isPresent()) { // if ion-textarea
                inp = el.element(by.css('textarea')); // needs to select the nested textarea tag
            } // else, if it is just the input tag
            await inp.sendKeys(text);
        }
    }

    async clickElement(sel: string) {
        let els = await element.all(by.css(`${this.tag} ${sel}`));
        if (els.length > 1) { // if more than 1 element, use the authenticated version
            els = await element.all(by.css(`app-main-tab ${this.tag} ${sel}`));
        }
        if (els.length) {
            els.forEach(async (el) => {
                if (await el.isPresent()) {
                    await browser.wait(ExpectedConditions.elementToBeClickable(el), 18000);
                    el.click();
                }
            });
        } else {
            const el = element(by.css(`${this.tag} ${sel}`));
            await browser.wait(ExpectedConditions.elementToBeClickable(el), 10000);
            el.click();
        }
    }

    async countElements(sel: string) {
        return element.all(by.css(`${this.tag} ${sel}`)).count();
    }

    async headerIsPresent(sel: string) {
        return element.all(by.css(`${this.tag} ${sel}`)).isPresent();
    }

    async elementIsPresent(sel: string) {
        return element.all(by.css(`${this.tag} ${sel}`)).isPresent();
    }

    async enterTextInSearchBar(name) {
        this.enterInputText('.searchbar-input', name);
    }
}

export class AppPage extends PageObjectBase {
    constructor() {
        super('ion-app', '/');
    }

    currentUrl() {
        return browser.getCurrentUrl();
    }

    getTitle() {
        return element(by.id('title')).getText();
    }

    async clickAlertButton(text) {
        await this.waitUntilElementVisible('.alert-button.sc-ion-alert-md');
        await element.all(by.css('.alert-button.sc-ion-alert-md'))
            .filter(async (el) => (await el.getText()).toLowerCase() === text.toLowerCase())
            .first()
            .click();
    }

    async clickPopoverChoice(text) {
        await this.waitUntilElementVisible('.select-interface-option.sc-ion-select-popover');
        await element.all(by.css('.select-interface-option.sc-ion-select-popover'))
            .filter(async (el) => (await el.getText()).toLowerCase() === text.toLowerCase())
            .first()
            .click();
    }

    async clickAlertChoice(text) {
        await this.waitUntilElementVisible('ion-alert .alert-head');
        await element.all(by.css('ion-alert .select-interface-option.sc-ion-alert-md'))
            .filter(async (el) => (await el.getText()).toLowerCase() === text.toLowerCase())
            .first()
            .click();
    }

    async clickActionSheetButton(text) {
        await this.waitUntilElementVisible('.action-sheet-button');
        await element.all(by.css('.action-sheet-button'))
            .filter(async (el) => (await el.getText()).toLowerCase() === text.toLowerCase())
            .first()
            .click();
    }

    actionsheetIsPresent() {
        return element(by.css('ion-action-sheet')).isPresent();
    }

    async clickModalChatSendButton() {
        await element(by.css('ion-modal #sendButton'))
        .click();
    }

    async countChatElements() {
        return await element.all(by.css('ion-modal .chat-list p.message')).count();
    }

    logoutButtonIsPresent() {
        return element(by.css('#logoutButton')).isPresent(); // is this always present on the DOM?
    }

    async confirmRemoval() {
      await element.all(by.css('.alert-button'))
          .first()
          .click();
    }

    async checkForChatListName(sel: string, text: string) {
        const elsText = await element.all(by.css(`${this.tag} ${sel}`)).getText();
        return elsText.includes('Asia Ho');
    }

    async enterNonRegistrationInputText(sel: string, text: string, filterSelector: string) {
        const els = await element.all(by.css(`${this.tag} ${sel}`));
        if (els.length) {
            await element.all(by.css(`${this.tag} ${sel}`))
                .filter(async (el, index) => await el.isPresent())
                .first()
                .element(by.css(filterSelector))
                .sendKeys(text);
        } else {
            const el = element(by.css(`${this.tag} ${sel}`));
            await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
            const inp = el.element(by.css(filterSelector));
            await inp.sendKeys(text);
        }
    }
}

export class MaintabPage extends PageObjectBase {
    constructor() {
        super('app-main-tab', '/app');
    }

    clickTabButton(button) {
        this.clickElement(button);
    }
}
export class ShowfeaturePage extends PageObjectBase {
    constructor() {
        super('app-showfeature', '/');
    }

    navigateTo() {
        return this.load();
    }

    contentIsPresent() {
        return element(by.id('#showfeature-content')).isPresent();
    }

    clickSigninButton(button) {
        this.clickElement(button);
    }
}

export class RegisterPage extends PageObjectBase {
    constructor() {
        super('app-register', '/register');
    }

    async navigateTo() {
        return this.load();
    }

    clickTabButton(button) {
        this.clickElement(button);
    }

    async fillEmail() {
        await this.enterInputText('#email', 'calvin+3@restvo.com');
    }

    async fillPhoneNumber() {
        await this.enterInputText('#phone_number', '6266298681');
    }

    async fillPassword() {
        await this.enterInputText('#password', '123456');
    }

    async submitLoginForm() {
        await this.clickElement('#login-button');
    }

    async fillSubmitCreateAccountEmailForm() {
        await this.enterInputText('#firstName', 'Tammy');
        await this.enterInputText('#lastName', 'Ho');
        // calvin+e2e1@restvo.com is a special email that is handled differently in the backend for testing purposes.
        // No email is sent to it, but instead, token 9LL1tFgDTH9skXdYmoofMmPmgwYLaAQ78elfIWu6xRebj2L7 can be used to authenticate the fake user
        await this.enterInputText('#newEmail', 'calvin+e2e1@restvo.com');
        await this.enterInputText('#newPassword1', 'makenodifference');
        await this.enterInputText('#newPassword2', 'makenodifference');
        await this.clickElement('#createEmailAccount');
    }

    currentUrl() {
        return browser.getCurrentUrl();
    }

    getTitle() {
        return element(by.id('title')).getText();
    }
}

export class NewsPage extends PageObjectBase {
    constructor() {
        super('app-communityboard', 'app/news');
    }
}

export class OnboardingfeaturePage extends PageObjectBase {
    constructor() {
        super('app-onboardfeature', '/');
    }

    async finishOnboarding() {
        await element.all(by.css('.tile-card')).first().click();
        await this.clickElement('#next');
        await this.waitUntilElementVisible('#get-started');
        await this.clickElement('#get-started');
    }
}

export class ChatPage extends PageObjectBase {
    constructor() {
        super('app-myconversations', 'app/myconversations');
    }
}

export class DiscoverPage extends PageObjectBase {
    constructor() {
        super('app-discover', 'app/discover');
    }

    clickMenuToggle(el) {
        this.clickElement(el);
    }
}

export class ManagePage extends PageObjectBase {
    constructor() {
        super('app-managefeature', 'app/manage');
    }

    async clickMoreOrganizerActions() {
        this.clickElement('#moreOrganizerActions');
    }
}

export class AboutPage extends PageObjectBase {
    constructor() {
        super('app-about', '/');
    }

    clickEditAll() {
        this.clickElement('#editall');
    }

    clickBack() {
        this.clickElement('#clickback');
    }
}

export class PreferencesPage extends PageObjectBase {
    constructor() {
        super('app-preferences', '/');
    }

    clickBack() {
        this.clickElement('#clickback');
    }
}

export class DashboardPage extends PageObjectBase {
    constructor() {
        super('app-dashboard', 'app/me');
    }

    clickCreate() {
        this.clickElement('#create-mentoring');
    }

    clickPersonProfileCard() {
        this.clickElement('#person-profile-card');
    }

    deleteEvent() {
        return element(by.id('delete-event'));
    }

    async createEvent() {
        this.enterInputText('#add-event-title', 'Protractor Test Event');
        await this.clickElement('#all-day');
        await this.clickElement('#save-event');
    }

    clickMenuToggle(el) {
        this.clickElement(el);
    }
}

export class PickfeaturePopoverPage extends PageObjectBase {
    constructor() {
        super('app-pickfeature-popover', '/');
    }

    chooseCategory(sel) {
        this.clickElement(sel);
    }

    clickBackButton() {
        this.clickElement('#back-button');
    }

    clickNextButton() {
        this.clickElement('#next-button');
    }

    clickCreateNewMoment() {
        this.clickElement('#create-new-moment');
    }

    async countNumberOfNewPrograms() {
        return this.countElements('.program-card');
    }
}

export class PickpeoplePopoverPage extends PageObjectBase {
    constructor() {
      super('app-pickpeople-popover', '/');
    }

    clickRecent() {
      this.clickElement('#recent-');
    }

    async exitModal() {
      await this.waitUntilElementVisible('md.button.button-clear.in-toolbar.ion-activatable.ion-focusable.hydrated');
      this.clickElement('md.button.button-clear.in-toolbar.ion-activatable.ion-focusable.hydrated');
    }

    async clickPopoverChoice(text) {
      await this.waitUntilElementVisible('ion-color.ion-color-grey.md.button.button-clear.in-toolbar.ion-activatable.ion-focusable hydrated.ion-activated');
      this.clickElement('ion-color.ion-color-grey.md.button.button-clear.in-toolbar.ion-activatable.ion-focusable hydrated.ion-activated');
    }

    async userSelect(text) {
      await this.waitUntilElementVisible('.pickpeople-user');
      await element.all(by.css('.pickpeople-user'))
          .filter(async (el) => (await el.getText()).toLowerCase() === text.toLowerCase())
          .first()
          .click();
    }
}

export class EditparticipantsPage extends PageObjectBase {
    constructor() {
        super('app-editparticipants', '/');
    }

    async userSelect(text) {
      await this.waitUntilElementVisible('.user-select');
      await element.all(by.css('.user-select-label'))
          .filter(async (el) => (await el.getText()).toLowerCase() === text.toLowerCase())
          .first()
          .click();
    }

    async removeMember() {
      await element.all(by.css('.alert-button'))
          .last()
          .click();
    }
}

export class CreatefeaturePage extends PageObjectBase {
    constructor() {
        super('app-createfeature', '/');
    }

    async enterNewCommunityDescription() {
        const els = await element.all(by.css(`${this.tag} ion-textarea[ng-reflect-name="communityDescription"]`));
        if (els.length) {
            if (await element.all(by.css(`${this.tag} ion-textarea[ng-reflect-name="communityDescription"] .native-textarea`)).isPresent()) { // if ion-textarea
                await element.all(by.css(`${this.tag} ion-textarea[ng-reflect-name="communityDescription"]`))
                    .filter(async (el, index) => await el.isPresent())
                    .first()
                    .element(by.css('textarea')) // because it is a web component, needs to select its nested textarea tag
                    .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'), 'This is a test E2E community');
            } else { // else, if it is just the input tag
                await element.all(by.css(`${this.tag} ion-textarea[ng-reflect-name="communityDescription"]`))
                    .filter(async (el, index) => await el.isPresent())
                    .first()
                    .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'), 'This is a test E2E community');
            }
        } else {
            const el = element(by.css(`${this.tag} ion-textarea[ng-reflect-name="communityDescription"]`));
            await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
            let inp = el;
            if (await element(by.css(`${this.tag} ion-textarea[ng-reflect-name="communityDescription"] .native-textarea`)).isPresent()) { // if ion-textarea
                inp = el.element(by.css('textarea')); // needs to select the nested textarea tag
            } // else, if it is just the input tag
            await inp.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'), 'This is a test E2E community');
        }
    }

    async clickBackButton() {
        this.clickElement('#backButton');
    }

    async clickNextButton() {
        this.clickElement('#nextButton');
    }

    async clickSaveButton() {
        this.clickElement('#saveButton');
    }

    async clickTutorialNextButton() {
        this.clickElement('#tutorialNext');
    }

    async clickTutorialDoneButton() {
        this.clickElement('#tutorialDone');
    }
}
