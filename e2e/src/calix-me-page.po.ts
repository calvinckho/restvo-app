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
        return browser.wait(ExpectedConditions.invisibilityOf(this.rootElement()), 10000);
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

    protected async clickButton(sel: string) {
        const el = element(by.css(`${this.tag} ${sel}`));
        await browser.wait(ExpectedConditions.elementToBeClickable(el), 10000);
        el.click();
    }

    protected async clickElement(sel: string) {
        const el = element(by.css(`${this.tag} ${sel}`));
        el.click();
    }

    protected async countElements(sel: string) {
        return await element.all(by.css(`${this.tag} ${sel}`)).count();
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

    headerIsPresent(sel) {
        return element(by.id(`${sel}`)).isPresent();
    }

    clickSettings(element) {
        //this.clickElement(element);
    }
}

export class MaintabPage extends PageObjectBase {
    constructor() {
        super('app-main-tab', '/app');
    }

    clickTabButton(button) {
        this.clickButton(button);
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
        this.clickButton(button);
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
        this.clickButton(button);
    }

    async fillEmail() {
        await this.enterInputText('#email', 'pianokai@yahoo.com');
    }

    async fillPhoneNumber() {
        await this.enterInputText('#phone_number', '6266298681');
    }

    async fillPassword() {
        await this.enterInputText('#password', '123456');
    }

    async submitLoginForm() {
        await this.clickButton('#login-button');
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

export class ChatPage extends PageObjectBase {
    constructor() {
        super('app-myconversations', 'app/myconversations');
    }
}

export class DiscoverPage extends PageObjectBase {
    constructor() {
        super('app-discover', 'app/discover');
    }

    headerIsPresent() {
        return element(by.id('#main-menu-toolbar')).isPresent();
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

    headerIsPresent(sel) {
        return element(by.css(`${this.tag} ${sel}`)).isPresent();
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

    headerIsPresent(sel) {
        return element(by.css(`${this.tag} ${sel}`)).isPresent();
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
        this.enterTextareaText('#add-event-title', 'Protractor Test Event');
        await this.clickButton('#all-day');
        await this.clickButton('#save-event');
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
        this.clickButton('#back-button');
    }

    clickNextButton() {
        this.clickButton('#next-button');
    }

    clickCreateNewMoment() {
        this.clickElement('#create-new-moment');
    }

    async countNumberOfNewPrograms() {
        return await this.countElements('.program-card');
    }

    headerIsPresent(sel) {
        return element(by.css(`${this.tag} ${sel}`)).isPresent();
    }
}

export class PickpeoplePopoverPage extends PageObjectBase {
    constructor() {
        super('app-pickpeople-popover', '/');
    }

    clickRecent() {
        this.clickElement('#recent-');
    }

    headerIsPresent(sel) {
        return element(by.css(`${this.tag} ${sel}`)).isPresent();
    }
}

export class CreateFeaturePage extends PageObjectBase {
    constructor() {
        super('app-createfeature', '/');
    }

    headerIsPresent(sel) {
        return element(by.css(`${this.tag} ${sel}`)).isPresent();
    }
}
