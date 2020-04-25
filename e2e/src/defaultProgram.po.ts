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
        browser.wait(ExpectedConditions.invisibilityOf(this.rootElement()), 3000);
    }

    waitUntilPresent() {
        browser.wait(ExpectedConditions.presenceOf(this.rootElement()), 3000);
    }

    waitUntilNotPresent() {
        browser.wait(
            ExpectedConditions.not(ExpectedConditions.presenceOf(this.rootElement())),
            3000
        );
    }

    waitUntilVisible() {
        browser.wait(ExpectedConditions.visibilityOf(this.rootElement()), 3000);
    }

    getTitle() {
        return element(by.css(`${this.tag} ion-title`)).getText();
    }

    protected async enterInputText(sel: string, text: string) {
        const el = element(by.css(`${this.tag} ${sel}`));
        const inp = el.element(by.css('input'));
        await inp.sendKeys(text);
    }

    protected enterTextareaText(sel: string, text: string) {
        const el = element(by.css(`${this.tag} ${sel}`));
        const inp = el.element(by.css('textarea'));
        inp.sendKeys(text);
    }

    protected clickButton(sel: string) {
        const el = element(by.css(`${this.tag} ${sel}`));
        browser.wait(ExpectedConditions.elementToBeClickable(el));
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

    submitLoginForm() {
        this.clickButton('#login-button');
    }

    currentUrl() {
        return browser.getCurrentUrl();
    }

    getTitle() {
        return element(by.id('title')).getText();
    }
}
