import { browser, by, element, ExpectedConditions } from 'protractor';

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

    waitUntilInvisible() {
        return browser.wait(ExpectedConditions.invisibilityOf(this.rootElement()), 15000);
    }

    waitUntilPresent() {
        return browser.wait(ExpectedConditions.presenceOf(this.rootElement()), 10000);
    }

    waitUntilNotPresent() {
        return browser.wait(
            ExpectedConditions.not(ExpectedConditions.presenceOf(this.rootElement())),
            10000
        );
    }

    waitUntilUrlContains() {
        return browser.wait(ExpectedConditions.urlContains(this.path), 10000);
    }

    waitUntilVisible() {
        return browser.wait(ExpectedConditions.visibilityOf(this.rootElement()), 10000);
    }

    getTitle() {
        return element(by.css(`${this.tag} ion-title`)).getText();
    }

    protected async enterInputText(sel: string, text: string) {
        const el = element(by.css(`${this.tag} ${sel}`));
        await browser.wait(ExpectedConditions.presenceOf(el), 10000);
        const inp = el.element(by.css('input'));
        for (let i = 0; i < text.length; i++) {
            inp.sendKeys(text.charAt(i));
        }
    }

    protected async enterTextareaText(sel: string, text: string) {
        const el = element(by.css(`${this.tag} ${sel}`));
        await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
        const inp = el.element(by.css('textarea'));
        for (let i = 0; i < text.length; i++) {
            inp.sendKeys(text.charAt(i));
        }
    }

    protected async clickButton(parentTag: string, sel: string) {
        const el = element(by.css(parentTag ? `${parentTag} ${this.tag} ${sel}` : `${this.tag} ${sel}`));
        await browser.wait(ExpectedConditions.elementToBeClickable(el), 10000);
        el.click();
    }

    async clickElement(parentTag: string, sel: string) {
        const els = element.all(by.css(parentTag ? `${parentTag} ${this.tag} ${sel}` : `${this.tag} ${sel}`));
        els.each(async (el) => {
            if (el.isDisplayed()) {
                await browser.wait(ExpectedConditions.elementToBeClickable(el), 10000);
                el.click();
            }
        });
    }

    protected async countElements(sel: string) {
        return await element.all(by.css(`${this.tag} ${sel}`)).count();
    }

    async headerIsPresent(parentTag: string, sel: string) {
        const el = element(by.css(parentTag ? `${parentTag} ${this.tag} ${sel}` : `${this.tag} ${sel}`));
        if (el) {
            return el.isPresent();
        } else {
            return false;
        }
    }

    async elementIsPresent(parentTag: string, sel: string) {
        const el = element(by.css(parentTag ? `${parentTag} ${this.tag} ${sel}` : `${this.tag} ${sel}`));
        if (el) {
            return el.isPresent();
        } else {
            return false;
        }
    }

    async signinButtonIsPresent() {
        const signinButton = element(by.css('#signin'));
        if (signinButton) {
            return signinButton.isPresent();
        } else {
            return false;
        }
    }
}

export class AppPage {
    navigateTo() {
        return browser.get('/register');
    }

    currentUrl() {
        return browser.getCurrentUrl();
    }

    getTitle() {
        return element(by.id('title')).getText();
    }

    headerIsPresent(parentTag, sel) {
        return element(by.id(`${sel}`)).isPresent();
    }

    async waitUntilElementVisible(sel) {
        const el = element(by.css(sel));
        await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
    }

    async waitUntilElementInvisible(sel) {
        const el = element(by.css(sel));
        await browser.wait(ExpectedConditions.invisibilityOf(el), 10000);
    }

    async clickAlertButton(text) {
        element.all(by.css('.alert-button.sc-ion-alert-md')).each(async (el) => {
            if (await el.getText() === text) {
                el.click();
            }
        });
    }

    alertIsPresent() {
        return element(by.css('ion-alert')).isPresent();
    }

    async clickActionSheetButton(text) {
        element.all(by.css('.action-sheet-button')).each(async (el) => {
            if (await el.getText() === text) {
                el.click();
            }
        });
    }

    actionsheetIsPresent() {
        return element(by.css('ion-action-sheet')).isPresent();
    }

    async clickElement(elementId) {
        const selectedEl = element(by.css(elementId));
        selectedEl.click();
    }

    logoutButtonIsPresent() {
        return element(by.css('#logoutButton')).isPresent(); // is this always present on the DOM?
    }
}

export class MaintabPage extends PageObjectBase {
    constructor() {
        super('app-main-tab', '/app');
    }

    clickTabButton(button) {
        this.clickButton(null, button);
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
        this.clickButton(null, button);
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
        this.clickButton(null, button);
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
        await this.clickButton(null, '#login-button');
    }

    async fillSubmitCreateAccountEmailForm() {
        await this.enterInputText('#firstName', 'Tammy');
        await this.enterInputText('#LastName', 'Ho');
        await this.enterInputText('#newEmail', 'calvin+4@restvo.com');
        await this.enterInputText('#newPassword1', 'makenodifference');
        await this.enterInputText('#newPassword2', 'makenodifference');
        await this.clickButton(null, '#createEmailAccount');
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
        super('app-communityboard', 'app/news')
    }
}

export class OnboardingfeaturePage extends PageObjectBase {
    constructor() {
        super('app-onboardfeature', '/');
    }

    async clickStartButton() {
        await this.clickButton(null, '#get-started');
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
        this.clickElement(null, el);
    }
}

export class ManagePage extends PageObjectBase {
    constructor() {
        super('app-manage', 'app/manage');
    }
}

export class AboutPage extends PageObjectBase {
    constructor() {
        super('app-about', '/');
    }

    clickEditAll() {
        this.clickElement(null, '#editall');
    }

    clickBack() {
        this.clickElement(null, '#clickback');
    }
}

export class PreferencesPage extends PageObjectBase {
    constructor() {
        super('app-preferences', '/');
    }

    clickBack() {
        this.clickElement(null, '#clickback');
    }
}

export class DashboardPage extends PageObjectBase {
    constructor() {
        super('app-dashboard', 'app/me');
    }

    clickCreate() {
        this.clickElement(null, '#create-mentoring');
    }

    clickPersonProfileCard() {
        this.clickElement(null, '#person-profile-card');
    }

    deleteEvent() {
        return element(by.id('delete-event'));
    }

    async createEvent() {
        this.enterTextareaText('#add-event-title', 'Protractor Test Event');
        await this.clickButton(null, '#all-day');
        await this.clickButton(null, '#save-event');
    }

    clickMenuToggle(el) {
        this.clickElement(null, el);
    }
}

export class PickfeaturePopoverPage extends PageObjectBase {
    constructor() {
        super('app-pickfeature-popover', '/');
    }

    chooseCategory(sel) {
        this.clickElement(null, sel);
    }

    clickBackButton() {
        this.clickButton(null, '#back-button');
    }

    clickNextButton() {
        this.clickButton(null, '#next-button');
    }

    clickCreateNewMoment() {
        this.clickElement(null, '#create-new-moment');
    }

    async countNumberOfNewPrograms() {
        return await this.countElements('.program-card');
    }
}

export class PickpeoplePopoverPage extends PageObjectBase {
    constructor() {
        super('app-pickpeople-popover', '/');
    }

    clickRecent() {
        this.clickElement(null, '#recent-');
    }
}

export class CreateFeaturePage extends PageObjectBase {
    constructor() {
        super('app-createfeature', '/');
    }
}
