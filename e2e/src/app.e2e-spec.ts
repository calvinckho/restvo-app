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
    CreateFeaturePage,
    AboutPage,
    PreferencesPage
} from './app.po';
import { browser, element, by } from 'protractor';
import {disc} from "ionicons/icons";
import { async } from '@angular/core/testing';

describe('navigate around the maintab', () => {
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

    beforeAll(async () => {
        // testing on mobile sized screen
        const width = 600;
        const height = 968;
        browser.driver.manage().window().setSize(width, height);
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
        await browser.waitForAngularEnabled(false); // prevent an unknown async function from blocking protractor
         showfeature.navigateTo();
         browser.sleep(5000); // wait
        // showfeature.clickSigninButton('#signin');
        console.log("clicking sign in button")
        let el = element(by.id('signin'))
        el.click()
        browser.sleep(1500); // wait
        console.log("filling out email")
        await register.fillEmail();
         
         browser.sleep(5000); // wait
        //  register.fillPhoneNumber();
        console.log("filling out password")
        await register.fillPassword();
         browser.sleep(500); // wait
        console.log("signed in")
        register.submitLoginForm();
        
    });

    beforeEach(async () => {
        await browser.waitForAngularEnabled(false); // prevent an unknown async function from blocking protractor
    });
    // it('should login', function(){
    //     showfeature.navigateTo()
    //     showfeature.clickSigninButton('#signin')
    //     register.fillEmail();
    //     register.fillPassword();
    //     register.submitLoginForm();
    //     browser.sleep(5000)
    //     expect(app.currentUrl()).toContain('app/activity');
    // })
    it('should load the discover page', async () => {
            await browser.sleep(6000); // wait 6 second
            expect(discover.headerIsPresent()).toBeTruthy();
    });
    

    // test cases for checking if the default group changes after user joins the second group
    // it('change default group to users second program after joining.', async () => {
    //     await browser.sleep(20000); //wait 7 seconds
    //     await discover.firstFeaturedCommunity().click()
    //     await browser.sleep(60000);
    // })
    /*it('should load the news page', async () => {
        maintab.clickTabButton('#tab-button-news');
        await browser.sleep(2000); // wait
        expect(await app.currentUrl()).toContain('app/news');
    });

    it('should load the chat page', async () => {
        maintab.clickTabButton('#tab-button-myconversations');
        await browser.sleep(2000); // wait
        expect(await app.currentUrl()).toContain('app/myconversations');
    });*/



    //*** */
    // it('should load the Me page', async () => {
    //     maintab.clickTabButton('#tab-button-me');
    //     await browser.sleep(2000); // wait 2 sec
    //     expect(await app.currentUrl()).toContain('app/me');
    // });

    // it('should open about page', async () => {
    //     await me.clickPersonProfileCard();
    //     await browser.sleep(1000); // wait 1 sec
    //     expect(about.headerIsPresent('#about-me-header')).toBeTruthy();
    // });

    // it('should go back to Me page', async () => {
    //     await about.clickBack();
    //     await browser.sleep(1000); // wait 1 sec
    //     expect(await app.currentUrl()).toContain('app/me');
    // });

    // it('should open main menu', async () => {
    //     me.clickMenuToggle('#menuToggle');
    //     await browser.sleep(1000); // wait 1 sec
    //     expect(app.headerIsPresent('#main-menu-toolbar')).toBeTruthy();
    // });
//** */
    /*it('should open settings', async () => {
        app.clickSettings('#settings');
        await browser.sleep(1000); // wait 1 sec
        expect(app.headerIsPresent('#main-menu-toolbar')).toBeTruthy();
    });*/

  /* it('should open preference page', async () => {
        await about.clickEditAll();
        await browser.sleep(1000); // wait 1 sec
        expect(preferences.headerIsPresent('#editall')).toBeTruthy();
    });

    it('should go back to about page', async () => {
        await preferences.clickBack();
        await browser.sleep(1000); // wait 1 sec
        expect(about.headerIsPresent('#about-me-header')).toBeTruthy();
    });


   /*it('should open create mentoring popup', async () => {
        await dashboard.clickCreate();
        await browser.sleep(3000); // wait
        expect(pickfeature.headerIsPresent('#pickfeature-header')).toBeTruthy();
    });

    /*it('should list more than one new program', async () => {
        pickfeature.chooseCategory('#program');
        await browser.sleep(500); // wait
        pickfeature.clickNextButton();
        await browser.sleep(200); // wait
        expect(pickfeature.countNumberOfNewPrograms()).toBeGreaterThan(0);
    });

    it('should list more than one new personal plan', async () => {
        pickfeature.clickBackButton();
        await browser.sleep(100); // wait
        pickfeature.chooseCategory('#personal');
        await browser.sleep(500); // wait
        pickfeature.clickNextButton();
        await browser.sleep(200); // wait
        expect(pickfeature.countNumberOfNewPrograms()).toBeGreaterThan(0);
    });

    it('should open clone community view', async () => {
        pickfeature.clickBackButton();
        await browser.sleep(100); // wait
        pickfeature.chooseCategory('#community');
        await browser.sleep(500); // wait
        pickfeature.clickNextButton();
        await browser.sleep(200); // wait
        pickfeature.clickCreateNewMoment();
        await browser.sleep(1000); // wait
        expect(createfeature.headerIsPresent('#createfeature-header')).toBeTruthy();
        await browser.sleep(5000); // wait
    });*/



    /*it('should click create event button', async () => {
        dashboard.clickCreateEvent();
        await browser.sleep(1000); //wait for modal to come up
        expect(dashboard.editEventModalPresent()).toBeTruthy();
    });*/

    /*it('should create an event', async () => {
        await dashboard.createEvent();
        await browser.sleep(5000); //wait for modal to go down
        expect(dashboard.getEventText()).toContain('Protractor Test Event');
        browser.waitForAngularEnabled(false); //prevent an unknown async function from blocking protractor
    })*/

    // it('should click the created event', async () => {
    //     await dashboard.clickNewEvent();
    //     await browser.sleep(5000); //wait for modal to come up
    //     expect(dashboard.showEventModalPresent()).toBeTruthy();
    //     browser.waitForAngularEnabled(false); //prevent an unknown async function from blocking protractor
    // })

    // it('should delete the event', async () => {
    //     await dashboard.deleteEvent();
    //     await browser.sleep(5000); //wait for modal to go down
    //     expect(dashboard.getEventText()).not.toContain('Protractor Test Event');
    //     browser.waitForAngularEnabled(false); //prevent an unknown async function from blocking protractor
    // })

    /*it('should click create meetup', async () => {
        await dashboard.clickMoreOptions();
        await browser.sleep(5000); //wait for menu to drop
        await dashboard.clickCreateMeetup();
        await browser.sleep(5000); //wait for modal to come up
        expect(dashboard.editMeetupModalPresent()).toBeTruthy();
        browser.waitForAngularEnabled(false); //prevent an unknown async function from blocking protractor
    })

    it('should create a meetup', async () => {
        await dashboard.createMeetup();
        await browser.sleep(5000); //wait for modal to go down
        expect(dashboard.getEventText()).toContain('Protractor Test Meetup');
        browser.waitForAngularEnabled(true); //prevent an unknown async function from blocking protractor
    })*/

/*    it('should open the more options page', async () => {
        //await maintab.navigateTo();
        await dashboard.clickMoreOptions();
        expect(await maintab.currentUrl()).toContain('app/dashboard');
    });*/
});
