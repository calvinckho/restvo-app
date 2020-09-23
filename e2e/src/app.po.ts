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
                if (await el.isDisplayed()) {
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

    waitUntilUrlContains() {
        return browser.wait(ExpectedConditions.urlContains(this.path), 10000);
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
        console.log("wait", els.length)
        if (els.length) {
            for (const el of els) {
                if (await el.isDisplayed()) {
                    console.log("wait 2", els.length)
                    return await browser.wait(ExpectedConditions.presenceOf(el), 18000);
                }
            }
        } else {
            console.log("wait 3", els.length)
            await browser.wait(ExpectedConditions.presenceOf(element(by.css(`${this.tag} ${sel}`))), 18000);
        }
    }

    async waitUntilElementVisible(sel: string) {
        const els = await element.all(by.css(`${this.tag} ${sel}`));
        if (els.length) {
            for (const el of els) {
                if (await el.isDisplayed()) {
                    return await browser.wait(ExpectedConditions.presenceOf(el), 10000);
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
            for (const el of els) {
                if (await el.isDisplayed()) {
                    await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
                    const inp = el.element(by.css('input'));
                    await inp.sendKeys(text);
                }
            }
        } else {
            const el = element(by.css(`${this.tag} ${sel}`));
            await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
            const inp = el.element(by.css('input'));
            await inp.sendKeys(text);
        }
        await browser.sleep(2000); // needs to pause and wait for text to be inputed into element, otherwise the next sendKeys will stop the current one
    }

    async clickElement(sel: string) {
        const els = await element.all(by.css(`${this.tag} ${sel}`));
        if (els.length) {
            els.forEach(async (el) => {
                if (await el.isDisplayed()) {
                    await browser.wait(ExpectedConditions.elementToBeClickable(el), 10000);
                    el.click();
                }
            });
        } else {
            const el = element(by.css(`${this.tag} ${sel}`));
            await browser.wait(ExpectedConditions.visibilityOf(el), 10000);
            await browser.wait(ExpectedConditions.elementToBeClickable(el), 10000);
            el.click();
        }
    }

    protected async countElements(sel: string) {
        return await element.all(by.css(`${this.tag} ${sel}`)).count();
    }

    async headerIsPresent(sel: string) {
        return element.all(by.css(`${this.tag} ${sel}`)).isPresent();
    }

    async elementIsPresent(sel: string) {
        return element.all(by.css(`${this.tag} ${sel}`)).isPresent();
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
        element.all(by.css('.alert-button.sc-ion-alert-md')).each(async (el) => {
            if (await el.getText() === text) {
                await browser.wait(ExpectedConditions.elementToBeClickable(el), 10000);
                return el.click();
            }
        });
    }

    async clickActionSheetButton(text) {
        await this.waitUntilElementVisible('.action-sheet-button');
        element.all(by.css('.action-sheet-button')).each(async (el) => {
            if (await el.getText() === text) {
                await browser.wait(ExpectedConditions.elementToBeClickable(el), 10000);
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
        await this.enterInputText('#newEmail', 'calvin+4@restvo.com');
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
        super('app-communityboard', 'app/news')
    }
}

export class OnboardingfeaturePage extends PageObjectBase {
    constructor() {
        super('app-onboardfeature', '/');
    }

    async clickStartButton() {
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
        super('app-manage', 'app/manage');
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
        return await this.countElements('.program-card');
    }
}

export class PickpeoplePopoverPage extends PageObjectBase {
    constructor() {
        super('app-pickpeople-popover', '/');
    }

    clickRecent() {
        this.clickElement('#recent-');
    }
}

export class CreateFeaturePage extends PageObjectBase {
    constructor() {
        super('app-createfeature', '/');
    }
}
