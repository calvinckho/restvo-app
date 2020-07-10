
import { browser, element, by, ExpectedConditions } from 'protractor';
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

describe('testing the home page', function(){
    let register: RegisterPage
    beforeAll(async () => {
        let register = new RegisterPage
        await browser.get('http://localhost:4200');
        browser.waitForAngular();
    })
    
    it('should login correctly', async () => {
        await element(by.id('signin')).isPresent();
        await element(by.id('singin')).click();
        console.log('sleeping');
        await browser.sleep(5000);
        console.log('filling email');
        await register.fillEmail();
        console.log('sleeping');
        await browser.sleep(5000);
    }, 60000)
})












// import {
//     AppPage,
//     MaintabPage,
//     RegisterPage,
//     NewsPage,
//     ChatPage,
//     DiscoverPage,
//     DashboardPage,
//     ShowfeaturePage,
//     PickfeaturePopoverPage,
//     PickpeoplePopoverPage,
//     CreateFeaturePage,
//     AboutPage,
//     PreferencesPage
// } from './app.po';
// import { browser } from 'protractor';
// import {disc} from "ionicons/icons";

// describe('navigate around the maintab', function() {
//     let app: AppPage;
//     let showfeature: ShowfeaturePage;
//     let maintab: MaintabPage;
//     let register: RegisterPage;
//     let news: NewsPage;
//     let chat: ChatPage;
//     let discover: DiscoverPage;
//     let about: AboutPage;
//     let preferences: PreferencesPage;
//     let me: DashboardPage;
//     let pickfeature: PickfeaturePopoverPage;
//     let pickpeople: PickpeoplePopoverPage;
//     let createfeature: CreateFeaturePage;

//     beforeAll(async function() {
//         // testing on mobile sized screen
//         const width = 600;
//         const height = 968;
//         await browser.driver.manage().window().setSize(width, height);
//         // app = new AppPage();
//         // // maintab = new MaintabPage();
//         register = new RegisterPage();
//         showfeature = new ShowfeaturePage();
//         // news = new NewsPage();
//         // chat = new ChatPage();
//         // discover = new DiscoverPage();
//         // me = new DashboardPage();
//         // about = new AboutPage();
//         // preferences = new PreferencesPage();
//         // pickfeature = new PickfeaturePopoverPage();
//         // pickpeople = new PickpeoplePopoverPage();
//         // createfeature = new CreateFeaturePage();
//         // browser.waitForAngularEnabled(false); // prevent an unknown async function from blocking protractor
        // await showfeature.navigateTo();
//         // await browser.sleep(500); // wait
//         await showfeature.clickSigninButton('#signin');
//     //     // await browser.sleep(1500); // wait
        // await register.fillEmail();
        // await register.fillPhoneNumber();
        // await register.fillPassword();
//     //     // await browser.sleep(1000); // wait
//         await register.submitLoginForm();
//     });

//     // beforeEach(function() {
//     //     browser.waitForAngularEnabled(false); // prevent an unknown async function from blocking protractor
//     // });
//     it('should have the home page', async function() {
//         console.log("here")
//         await browser.sleep(3000)
//     });
//     // it('should load the discover page', async function() {
//     //         // await browser.sleep(8000); // wait 1 second
//     //         let discover = new DiscoverPage()
//     //         expect(discover.headerIsPresent()).toBeTruthy();
//     // });

//     // it('should load the news page', async function() {
//     //     maintab.clickTabButton('#tab-button-news');
//     //     // await browser.sleep(2000); // wait
//     //     expect(await app.currentUrl()).toContain('app/news');
//     // });

//     // it('should load the chat page', async function() {
//     //     maintab.clickTabButton('#tab-button-myconversations');
//     //     // await browser.sleep(2000); // wait
//     //     expect(await app.currentUrl()).toContain('app/myconversations');
//     // });

//     // it('should load the Me page', async function() {
//     //     maintab.clickTabButton('#tab-button-me');
//     //     // await browser.sleep(2000); // wait 2 sec
//     //     expect(await app.currentUrl()).toContain('app/me');
//     // });

//     // it('should open about page', async function() {
//     //     await me.clickPersonProfileCard();
//     //     // await browser.sleep(1000); // wait 1 sec
//     //     expect(about.headerIsPresent('#about-me-header')).toBeTruthy();
//     // });

//     // it('should go back to Me page', async function() {
//     //     await about.clickBack();
//     //     // await browser.sleep(1000); // wait 1 sec
//     //     expect(await app.currentUrl()).toContain('app/me');
//     // });

//     // it('should open main menu', async function() {
//     //     me.clickMenuToggle('#menuToggle');
//     //     // await browser.sleep(1000); // wait 1 sec
//     //     expect(app.headerIsPresent('#main-menu-toolbar')).toBeTruthy();
//     // });

//     /*it('should open settings', async function() {
//         app.clickSettings('#settings');
//         await browser.sleep(1000); // wait 1 sec
//         expect(app.headerIsPresent('#main-menu-toolbar')).toBeTruthy();
//     });*/

//   /* it('should open preference page', async function() {
//         await about.clickEditAll();
//         await browser.sleep(1000); // wait 1 sec
//         expect(preferences.headerIsPresent('#editall')).toBeTruthy();
//     });

//     it('should go back to about page', async function() {
//         await preferences.clickBack();
//         await browser.sleep(1000); // wait 1 sec
//         expect(about.headerIsPresent('#about-me-header')).toBeTruthy();
//     });


//    /*it('should open create mentoring popup', async function() {
//         await dashboard.clickCreate();
//         await browser.sleep(3000); // wait
//         expect(pickfeature.headerIsPresent('#pickfeature-header')).toBeTruthy();
//     });

//     /*it('should list more than one new program', async function() {
//         pickfeature.chooseCategory('#program');
//         await browser.sleep(500); // wait
//         pickfeature.clickNextButton();
//         await browser.sleep(200); // wait
//         expect(pickfeature.countNumberOfNewPrograms()).toBeGreaterThan(0);
//     });

//     it('should list more than one new personal plan', async function() {
//         pickfeature.clickBackButton();
//         await browser.sleep(100); // wait
//         pickfeature.chooseCategory('#personal');
//         await browser.sleep(500); // wait
//         pickfeature.clickNextButton();
//         await browser.sleep(200); // wait
//         expect(pickfeature.countNumberOfNewPrograms()).toBeGreaterThan(0);
//     });

//     it('should open clone community view', async function() {
//         pickfeature.clickBackButton();
//         await browser.sleep(100); // wait
//         pickfeature.chooseCategory('#community');
//         await browser.sleep(500); // wait
//         pickfeature.clickNextButton();
//         await browser.sleep(200); // wait
//         pickfeature.clickCreateNewMoment();
//         await browser.sleep(1000); // wait
//         expect(createfeature.headerIsPresent('#createfeature-header')).toBeTruthy();
//         await browser.sleep(5000); // wait
//     });*/



//     /*it('should click create event button', async function() {
//         dashboard.clickCreateEvent();
//         await browser.sleep(1000); //wait for modal to come up
//         expect(dashboard.editEventModalPresent()).toBeTruthy();
//     });*/

//     /*it('should create an event', async function() {
//         await dashboard.createEvent();
//         await browser.sleep(5000); //wait for modal to go down
//         expect(dashboard.getEventText()).toContain('Protractor Test Event');
//         browser.waitForAngularEnabled(false); //prevent an unknown async function from blocking protractor
//     })*/

//     // it('should click the created event', async function() {
//     //     await dashboard.clickNewEvent();
//     //     await browser.sleep(5000); //wait for modal to come up
//     //     expect(dashboard.showEventModalPresent()).toBeTruthy();
//     //     browser.waitForAngularEnabled(false); //prevent an unknown async function from blocking protractor
//     // })

//     // it('should delete the event', async function() {
//     //     await dashboard.deleteEvent();
//     //     await browser.sleep(5000); //wait for modal to go down
//     //     expect(dashboard.getEventText()).not.toContain('Protractor Test Event');
//     //     browser.waitForAngularEnabled(false); //prevent an unknown async function from blocking protractor
//     // })

//     /*it('should click create meetup', async function() {
//         await dashboard.clickMoreOptions();
//         await browser.sleep(5000); //wait for menu to drop
//         await dashboard.clickCreateMeetup();
//         await browser.sleep(5000); //wait for modal to come up
//         expect(dashboard.editMeetupModalPresent()).toBeTruthy();
//         browser.waitForAngularEnabled(false); //prevent an unknown async function from blocking protractor
//     })

//     it('should create a meetup', async function() {
//         await dashboard.createMeetup();
//         await browser.sleep(5000); //wait for modal to go down
//         expect(dashboard.getEventText()).toContain('Protractor Test Meetup');
//         browser.waitForAngularEnabled(true); //prevent an unknown async function from blocking protractor
//     })*/

//     // it('should open the more options page', async function() {    
//     //     //await maintab.navigateTo();
//     //     await dashboard.clickMoreOptions();
//     //     expect(await maintab.currentUrl()).toContain('app/dashboard');
//     // });

// });
