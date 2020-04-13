(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~dashboard-dashboard-module~pages-main-tab-main-tab-module~user-user-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/listmycommunities/listmycommunities.page.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/listmycommunities/listmycommunities.page.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"modalCtrl.dismiss()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>\n      My Community\n    </ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"searchChurch()\"><ion-icon name=\"add\"></ion-icon></ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <!--get new data when page is refreshed-->\n  <ion-refresher (ionRefresh)=\"refresh($event)\" slot=\"fixed\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <p class=\"ion-padding\" [hidden]=\"!noChurchAdded\">Tap the + sign to add a community.</p>\n  <ion-list>\n    <ion-item *ngFor=\"let community of mycommunities\" (click)=\"showChurchProfile(community)\">\n      <ion-avatar slot=\"start\">\n        <img *ngIf=\"community.background\" [src]=\"community.background\"/>\n        <img *ngIf=\"!community.background\" src=\"assets/img/group-default.png\"/>\n      </ion-avatar>\n      <ion-label>\n        <h2>{{community.name}} <span *ngIf=\"community.verified != true\">(pending approval)</span></h2>\n        <p>{{community.industry.value}}</p>\n        <p><ion-icon name=\"pin\"></ion-icon>{{\" \"}}{{community.meeting_location.city}}<span [hidden]=\"!community.meeting_location.city||!community.meeting_location.state\">{{\", \"}}</span>{{community.meeting_location.state}}<span [hidden]=\"!community.meeting_location.city&&!community.meeting_location.state\">{{\" \"}}</span>{{community.meeting_location.country}}</p>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/searchcommunity/searchcommunity.page.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/searchcommunity/searchcommunity.page.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"modalCtrl.dismiss()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Search Community</ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <ion-list>\n    <!--list communities-->\n    <ion-item *ngFor=\"let community of communities\" (click)=\"showCommunityProfile(community)\">\n      <ion-avatar slot=\"start\">\n        <img *ngIf=\"community.background\" [src]=\"community.background\"/>\n        <img *ngIf=\"!community.background\" src=\"assets/img/group-default.png\"/>\n      </ion-avatar>\n      <ion-label>\n        <h2>{{community.name}} <span *ngIf=\"community.verified != true\">(pending approval)</span></h2>\n        <p>{{community.industry.value}}</p>\n        <p><ion-icon name=\"pin\"></ion-icon>{{\" \"}}{{community.meeting_location.city}}<span [hidden]=\"(community.meeting_location.city.length==0)||(community.meeting_location.state.length==0)\">{{\", \"}}</span>{{community.meeting_location.state}}<span [hidden]=\"(community.meeting_location.city.length==0)&&(community.meeting_location.state.length==0)\">{{\" \"}}</span>{{community.meeting_location.country}}</p>\n      </ion-label>\n      <ion-icon slot=\"end\" *ngIf=\"community.alreadyJoined == true\" name=\"checkmark\"></ion-icon>\n    </ion-item>\n    <ion-infinite-scroll position=\"bottom\" (ionInfinite)=\"listcommunities($event)\">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n    <p [hidden]=\"!needToCreateChurchProfile\">If you cannot find your community, click the button below to create a new community profile. </p>\n    <ion-button expand=\"full\" shape=\"round\" color=\"primary\" (click)=\"createChurchProfile()\">Create a Community Profile</ion-button>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/dashboard/dashboard.page.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/dashboard/dashboard.page.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [hidden]=\"router.url.includes('/app/user') && !modalPage\">\n  <ion-toolbar color=\"lightgrey\" *ngIf=\"(platform.is('mobileweb') && (platform.is('ios') || platform.is('android'))) && userData.showDownloadLink\">\n    <ion-item-sliding side=\"end\">\n      <ion-item lines=\"none\" color=\"lightgrey\">\n        <ion-avatar slot=\"start\">\n          <ion-img src=\"assets/img/icon.png\"></ion-img>\n        </ion-avatar>\n        <div class=\"details\" class=\"ion-text-wrap\">\n          <a *ngIf=\"platform.is('ios')\" href=\"https://itunes.apple.com/us/app/restvo-connect-with-churches/id1365903479?ls=1&mt=8\" style=\"font-size: 14px; color: var(--ion-color-button1)\">Download app for better experience</a>\n          <a *ngIf=\"platform.is('android')\" href=\"https://play.google.com/store/apps/details?id=com.restvo.app\" style=\"font-size: 14px; color: var(--ion-color-button1)\">Download app for better experience</a>\n        </div>\n        <ion-icon name=\"chevron-forward-outline\" color=\"primary\" slot=\"end\"></ion-icon>\n        <!--<ion-button fill=\"clear\" slot=\"end\"><ion-icon name=\"close\"></ion-icon></ion-button>-->\n      </ion-item>\n      <ion-item-options>\n        <ion-item-option color=\"primary\" (click)=\"userData.showDownloadLink = false\">\n          Dismiss\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-menu-toggle menu=\"main\" *ngIf=\"!modalPage && userData.user\" slot=\"start\" fill=\"clear\" id='menuToggle'>\n      <ion-button fill=\"clear\" color=\"grey\">\n        <ion-icon name=\"menu\"></ion-icon>\n      </ion-button>\n      <ion-badge *ngIf=\"this.chatService && this.chatService.connectTabBadge\" mode=\"md\">{{this.chatService.connectTabBadge}}</ion-badge>\n    </ion-menu-toggle>\n    <ion-buttons slot=\"start\" *ngIf=\"modalPage\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title slot=\"start\" *ngIf=\"view === 'profile'\">Me</ion-title>\n    <ion-title slot=\"start\" *ngIf=\"view === 'calendar'\">Calendar</ion-title>\n      <!--<ion-searchbar class=\"header-searchbar\" [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\" (ionCancel)=\"cancelSearch($event)\" *ngIf=\"platform.width() >= 768 && !platform.is('ios')\" slot=\"start\"></ion-searchbar>-->\n    <ion-item lines=\"none\" routerLink=\"/app/user/profile\" *ngIf=\"userData.user && platform.width() >= 768\" slot=\"end\" mode=\"md\" style=\"--background: transparent\">\n      <ion-avatar slot=\"start\">\n        <ion-img *ngIf=\"userData.user && userData.user.avatar\" [src]=\"userData.user.avatar\"></ion-img>\n        <ion-img *ngIf=\"!userData.user || !userData.user.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n      </ion-avatar>\n      <ion-label>\n        {{userData.user.first_name}} {{userData.user.last_name}}\n      </ion-label>\n    </ion-item>\n    <ion-button [routerLink]=\"['/app/user/profile']\" *ngIf=\"!modalPage && userData.user && platform.width() < 768\" slot=\"end\" fill=\"clear\">\n      <ion-icon name=\"settings-outline\"></ion-icon>\n    </ion-button>\n    <ion-buttons slot=\"end\" *ngIf=\"!userData.user\">\n      <ion-button routerLink=\"/register\" color=\"grey\">\n        Sign In\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"userData.user\">\n  <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n  <div class=\"content-container\" [ngStyle]=\"{'background': platform.width() >= 768 ? 'var(--ion-color-secondary)' : 'var(--ion-color-lightgrey)'}\">\n    <ion-row class=\"profile-row\">\n      <ion-card class=\"profile-card\" [ngClass]=\"{'mobile-card': platform.width() < 768}\" *ngIf=\"view === 'profile'\">\n        <ion-item lines=\"none\">\n          <div class=\"person-photo-container\">\n            <ion-avatar class=\"person-avatar\">\n              <img class=\"person-avatar\" [src]=\"userData.user.avatar\">\n            </ion-avatar>\n          </div>\n          <div class=\"person-content-left\">\n            <ion-card-title class=\"person-name\">\n              {{userData.user.first_name}} {{userData.user.last_name}}\n            </ion-card-title>\n            <div class=\"person-title\" [innerHTML]=\"userData.user.bio\"></div>\n            <ion-button shape=\"round\" class=\"person-edit-profile\" fill=\"outline\" (click)=\"openAboutMe()\" >Edit Profile</ion-button>\n          </div>\n        </ion-item>\n      </ion-card>\n    </ion-row>\n\n    <!-- Complete your Profile Banner -->\n    <ion-row class=\"profile-row\">\n      <ion-card [routerLink]=\"['/app/completeprofile']\" class=\"profile-card\" *ngIf=\"userData.user && (!userData.user.avatar || authService.incompleteOnboardProcess || (platform.is('cordova') && !userData.user.importContactList && !userData.delayImportContactListReminder) || (!userData.user.enablePushNotification && !userData.delayPushNotificationReminder))\" [ngClass]=\"{'mobile-card': platform.width() < 768}\">\n        <ion-item-sliding>\n          <ion-item lines=\"none\">\n            <div class=\"completed_percentage\">\n              {{(userData.user.avatar ? 50 : 0) + (authService.incompleteOnboardProcess ? 0 : 50)}}%\n            </div>\n            <div class=\"ion-text-wrap message-container\">\n              <ion-label style=\"font-size: 14px\">Complete the Setup</ion-label>\n              <p class=\"message-detail\">Complete these steps to help you get the most out of Restvo</p>\n            </div>\n            <ion-icon name=\"chevron-forward-outline\" color=\"primary\" slot=\"end\"></ion-icon>\n          </ion-item>\n          <ion-item-options>\n            <ion-item-option color=\"primary\" (click)=\"authService.incompleteOnboardProcess = null\">\n              Dismiss\n            </ion-item-option>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-card>\n    </ion-row>\n\n    <ion-grid class=\"content-grid\" *ngIf=\"view === 'profile'\">\n      <ion-row>\n        <!--List My Mentors-->\n        <ion-col *ngIf=\"myMentors && myMentors.length\" [size]=\"(platform.width() >= 768) && (myMentors.length <= 2) ? 6 : 12\" [ngStyle]=\"{'padding': platform.width() >= 768 ? '6px 5px' : '6px 0'}\">\n          <ion-card class=\"ion-no-margin ion-no-padding section-card\" [ngClass]=\"{'mobile-card': platform.width() < 768}\">\n            <ion-item class=\"section\" lines=\"none\"> <!--section header-->\n              <ion-label class=\"section-label\" color=\"darkgrey\">My Mentors</ion-label>\n            </ion-item>\n            <ion-slides class=\"relationship-slides\" [options]=\"{slidesPerView: 2.8, grabCursor: true, updateOnWindowResize: true}\" *ngIf=\"platform.width() < 768\">\n              <ion-slide class=\"relationship-slide\" *ngFor=\"let relationship of myMentors; trackBy: customTrackBy;\" [hidden]=\"!(relationship.matrix_string[0][0].toLowerCase().includes(searchKeyword.toLowerCase()) || relationship.resource['en-US'].value[0].toLowerCase().includes(searchKeyword.toLowerCase()))\">\n                <ion-card class=\"relationship-card\" (click)=\"openProgram($event, relationship)\">\n                  <ion-card-header class=\"ion-no-padding ion-justify-content-center\">\n                    <div class=\"relationship-photo-container\">\n                      <ion-avatar class=\"relationship-avatar\" *ngFor=\"let user of relationship.mentors; index as i\" [hidden]=\"!relationship.mentors.length\">\n                        <img class=\"relationship-photo\" *ngIf=\"(relationship.mentors.length % 3) === 1\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '12px', 'left': 24 + 'px', 'z-index': (i % relationship.numberOfMentorsDisplayed), 'height': '72px', 'width': '72px'}\" />\n                        <img class=\"relationship-photo border\" *ngIf=\"(relationship.mentors.length % 3) === 2\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '18px', 'left': 55 - (i % relationship.numberOfMentorsDisplayed) * 44 + 'px', 'z-index': (i % relationship.numberOfMentorsDisplayed), 'height': '54px', 'width': '54px'}\" />\n                        <img class=\"relationship-photo border\" *ngIf=\"(relationship.mentors.length % 3) === 0\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '17px', 'left': 69 - (i % relationship.numberOfMentorsDisplayed) * 31 + 'px', 'z-index': (i % relationship.numberOfMentorsDisplayed), 'height': '45px', 'width': '45px'}\" />\n                      </ion-avatar>\n                      <ion-avatar class=\"relationship-avatar\" [hidden]=\"relationship.mentors.length\">\n                        <img class=\"relationship-photo\" src=\"assets/img/avatar-default.jpg\" [ngStyle]=\"{'top': '12px', 'left': '24px', 'height': '72px', 'width': '72px'}\" />\n                      </ion-avatar>\n                    </div>\n                  </ion-card-header>\n                  <ion-card-content class=\"ion-no-padding\">\n                    <ion-row class=\"relationship-name-container top ion-align-items-center\">\n                      <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"relationship.mentors.length === 1\">{{relationship.mentors[0].first_name}}</ion-col>\n                      <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"relationship.mentors.length === 2\">{{relationship.mentors[1].first_name}}, {{relationship.mentors[0].first_name}}</ion-col>\n                      <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"!relationship.mentors.length || (relationship.mentors.length > 2)\">{{relationship.matrix_string[0][0]}}</ion-col>\n                    </ion-row>\n                    <ion-row class=\"relationship-name-container ion-align-items-center\">\n                      <ion-col class=\"relationship-description\">{{relationship.program}}</ion-col>\n                    </ion-row>\n                  </ion-card-content>\n                </ion-card>\n              </ion-slide>\n            </ion-slides>\n            <ion-grid *ngIf=\"platform.width() >= 768\">\n              <ion-row class=\"ion-justify-content-start\">\n                <ion-col class=\"ion-align-self-center\" size=\"auto\" *ngFor=\"let relationship of myMentors; trackBy: customTrackBy;\" [hidden]=\"!(relationship.matrix_string[0][0].toLowerCase().includes(searchKeyword.toLowerCase()) || relationship.resource['en-US'].value[0].toLowerCase().includes(searchKeyword.toLowerCase()))\">\n                  <ion-card class=\"relationship-card\" (click)=\"openProgram($event, relationship)\">\n                    <ion-card-header class=\"ion-no-padding ion-justify-content-center\">\n                      <div class=\"relationship-photo-container\">\n                        <ion-avatar class=\"relationship-avatar\" *ngFor=\"let user of relationship.mentors; index as i\" [hidden]=\"!relationship.mentors.length\">\n                          <img class=\"relationship-photo\" *ngIf=\"(relationship.mentors.length % 3) === 1\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '12px', 'left': 24 + 'px', 'z-index': (i % relationship.numberOfMentorsDisplayed), 'height': '72px', 'width': '72px'}\" />\n                          <img class=\"relationship-photo border\" *ngIf=\"(relationship.mentors.length % 3) === 2\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '18px', 'left': 55 - (i % relationship.numberOfMentorsDisplayed) * 44 + 'px', 'z-index': (i % relationship.numberOfMentorsDisplayed), 'height': '54px', 'width': '54px'}\" />\n                          <img class=\"relationship-photo border\" *ngIf=\"(relationship.mentors.length % 3) === 0\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '17px', 'left': 69 - (i % relationship.numberOfMentorsDisplayed) * 31 + 'px', 'z-index': (i % relationship.numberOfMentorsDisplayed), 'height': '45px', 'width': '45px'}\" />\n                        </ion-avatar>\n                        <ion-avatar class=\"relationship-avatar\" [hidden]=\"relationship.mentors.length\">\n                          <img class=\"relationship-photo\" src=\"assets/img/avatar-default.jpg\" [ngStyle]=\"{'top': '12px', 'left': '24px', 'height': '72px', 'width': '72px'}\" />\n                        </ion-avatar>\n                      </div>\n                    </ion-card-header>\n                    <ion-card-content class=\"ion-no-padding\">\n                      <ion-row class=\"relationship-name-container top ion-align-items-center\">\n                        <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"relationship.mentors.length === 1\">{{relationship.mentors[0].first_name}}</ion-col>\n                        <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"relationship.mentors.length === 2\">{{relationship.mentors[1].first_name}}, {{relationship.mentors[0].first_name}}</ion-col>\n                        <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"!relationship.mentors.length || (relationship.mentors.length > 2)\">{{relationship.matrix_string[0][0]}}</ion-col>\n                      </ion-row>\n                      <ion-row class=\"relationship-name-container ion-align-items-center\">\n                        <ion-col class=\"relationship-description\">{{relationship.program}}</ion-col>\n                      </ion-row>\n                    </ion-card-content>\n                  </ion-card>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card>\n        </ion-col>\n        <!--List My Mentees-->\n        <ion-col *ngIf=\"myMentees && myMentees.length\" [size]=\"(platform.width() >= 768) && (myMentees.length <= 2) ? 6 : 12\" [ngStyle]=\"{'padding': platform.width() >= 768 ? '6px 5px' : '6px 0'}\">\n          <ion-card class=\"ion-no-margin ion-no-padding section-card\" [ngClass]=\"{'mobile-card': platform.width() < 768}\">\n            <ion-item class=\"section\" lines=\"none\"> <!--section header-->\n              <ion-label class=\"section-label\" color=\"darkgrey\">My Mentees</ion-label>\n            </ion-item>\n            <ion-slides class=\"relationship-slides\" [options]=\"{slidesPerView: 2.8, grabCursor: true, updateOnWindowResize: true}\" *ngIf=\"platform.width() < 768\">\n              <ion-slide class=\"relationship-slide\" *ngFor=\"let relationship of myMentees; trackBy: customTrackBy;\" [hidden]=\"!(relationship.matrix_string[0][0].toLowerCase().includes(searchKeyword.toLowerCase()) || relationship.resource['en-US'].value[0].toLowerCase().includes(searchKeyword.toLowerCase()))\">\n                <ion-card class=\"relationship-card\" (click)=\"openProgram($event, relationship)\">\n                  <ion-card-header class=\"ion-no-padding\">\n                    <div class=\"relationship-photo-container ion-justify-content-center\">\n                      <ion-avatar class=\"relationship-avatar\" *ngFor=\"let user of relationship.mentees; index as i\" [hidden]=\"!relationship.mentees.length\">\n                        <img class=\"relationship-photo\" *ngIf=\"(relationship.mentees.length % 3) === 1\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '12px', 'left': 24 + 'px', 'z-index': (i % relationship.numberOfMenteesDisplayed), 'height': '72px', 'width': '72px'}\" />\n                        <img class=\"relationship-photo border\" *ngIf=\"(relationship.mentees.length % 3) === 2\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '18px', 'left': 55 - (i % relationship.numberOfMenteesDisplayed) * 44 + 'px', 'z-index': (i % relationship.numberOfMenteesDisplayed), 'height': '54px', 'width': '54px'}\" />\n                        <img class=\"relationship-photo border\" *ngIf=\"(relationship.mentees.length % 3) === 0\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '17px', 'left': 69 - (i % relationship.numberOfMenteesDisplayed) * 31 + 'px', 'z-index': (i % relationship.numberOfMenteesDisplayed), 'height': '45px', 'width': '45px'}\" />\n                      </ion-avatar>\n                      <ion-avatar class=\"relationship-avatar\" [hidden]=\"relationship.mentees.length\">\n                        <img class=\"relationship-photo\" src=\"assets/img/avatar-default.jpg\" [ngStyle]=\"{'top': '12px', 'left': '24px', 'height': '72px', 'width': '72px'}\" />\n                      </ion-avatar>\n                    </div>\n                  </ion-card-header>\n                  <ion-card-content class=\"ion-no-padding\">\n                    <ion-row class=\"relationship-name-container top ion-align-items-center\">\n                      <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"relationship.mentees.length === 1\">{{relationship.mentees[0].first_name}}</ion-col>\n                      <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"relationship.mentees.length === 2\">{{relationship.mentees[1].first_name}}, {{relationship.mentees[0].first_name}}</ion-col>\n                      <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"!relationship.mentees.length || (relationship.mentees.length > 2)\">{{relationship.matrix_string[0][0]}}</ion-col>\n                    </ion-row>\n                    <ion-row class=\"relationship-name-container ion-align-items-center\">\n                      <ion-col class=\"relationship-description\">{{relationship.program}}</ion-col>\n                    </ion-row>\n                  </ion-card-content>\n                </ion-card>\n              </ion-slide>\n            </ion-slides>\n            <ion-grid *ngIf=\"platform.width() >= 768\">\n              <ion-row class=\"ion-justify-content-start\">\n                <ion-col class=\"ion-align-self-center\" size=\"auto\" *ngFor=\"let relationship of myMentees; trackBy: customTrackBy;\" [hidden]=\"!(relationship.matrix_string[0][0].toLowerCase().includes(searchKeyword.toLowerCase()) || relationship.resource['en-US'].value[0].toLowerCase().includes(searchKeyword.toLowerCase()))\">\n                  <ion-card class=\"relationship-card\" (click)=\"openProgram($event, relationship)\">\n                    <ion-card-header class=\"ion-no-padding\">\n                      <div class=\"relationship-photo-container ion-justify-content-center\">\n                        <ion-avatar class=\"relationship-avatar\" *ngFor=\"let user of relationship.mentees; index as i\" [hidden]=\"!relationship.mentees.length\">\n                          <img class=\"relationship-photo\" *ngIf=\"(relationship.mentees.length % 3) === 1\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '12px', 'left': 24 + 'px', 'z-index': (i % relationship.numberOfMenteesDisplayed), 'height': '72px', 'width': '72px'}\" />\n                          <img class=\"relationship-photo border\" *ngIf=\"(relationship.mentees.length % 3) === 2\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '18px', 'left': 55 - (i % relationship.numberOfMenteesDisplayed) * 44 + 'px', 'z-index': (i % relationship.numberOfMenteesDisplayed), 'height': '54px', 'width': '54px'}\" />\n                          <img class=\"relationship-photo border\" *ngIf=\"(relationship.mentees.length % 3) === 0\" [src]=\"user.avatar || 'assets/img/avatar-default.jpg'\" [ngStyle]=\"{'top': '17px', 'left': 69 - (i % relationship.numberOfMenteesDisplayed) * 31 + 'px', 'z-index': (i % relationship.numberOfMenteesDisplayed), 'height': '45px', 'width': '45px'}\" />\n                        </ion-avatar>\n                        <ion-avatar class=\"relationship-avatar\" [hidden]=\"relationship.mentees.length\">\n                          <img class=\"relationship-photo\" src=\"assets/img/avatar-default.jpg\" [ngStyle]=\"{'top': '12px', 'left': '24px', 'height': '72px', 'width': '72px'}\" />\n                        </ion-avatar>\n                      </div>\n                    </ion-card-header>\n                    <ion-card-content class=\"ion-no-padding\">\n                      <ion-row class=\"relationship-name-container top ion-align-items-center\">\n                        <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"relationship.mentees.length === 1\">{{relationship.mentees[0].first_name}}</ion-col>\n                        <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"relationship.mentees.length === 2\">{{relationship.mentees[1].first_name}}, {{relationship.mentees[0].first_name}}</ion-col>\n                        <ion-col class=\"relationship-name ion-no-padding\" *ngIf=\"!relationship.mentees.length || (relationship.mentees.length > 2)\">{{relationship.matrix_string[0][0]}}</ion-col>\n                      </ion-row>\n                      <ion-row class=\"relationship-name-container ion-align-items-center\">\n                        <ion-col class=\"relationship-description\">{{relationship.program}}</ion-col>\n                      </ion-row>\n                    </ion-card-content>\n                  </ion-card>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card>\n        </ion-col>\n        <!--List My Community-->\n        <ion-col *ngIf=\"programs && programs.length\" [size]=\"(platform.width() >= 768) && (programs.length <= 6) ? 6 : 12\" [ngStyle]=\"{'padding': platform.width() >= 768 ? '6px 5px' : '6px 0'}\">\n          <ion-card class=\"ion-no-margin ion-no-padding section-card\" [ngClass]=\"{'mobile-card': platform.width() < 768}\">\n            <ion-item class=\"section\" lines=\"none\"> <!--section header-->\n              <ion-label class=\"section-label\" color=\"darkgrey\">My Community</ion-label>\n            </ion-item>\n            <ion-slides class=\"program-slides\" [options]=\"{slidesPerView: 2.2, grabCursor: true, updateOnWindowResize: true}\" *ngIf=\"platform.width() < 768\">\n              <ion-slide class=\"program-slide\" *ngFor=\"let program of programs; trackBy: customTrackBy\" [hidden]=\"!((program.matrix_string[0][0].toLowerCase().includes(searchKeyword.toLowerCase()) || program.resource['en-US'].value[0].toLowerCase().includes(searchKeyword.toLowerCase())))\">\n                <ion-card class=\"program-card\" (click)=\"openProgram($event, program)\">\n                  <ion-card-header class=\"ion-no-padding\">\n                    <div class=\"program-photo-container\">\n                      <img class=\"program-photo\" [src]=\"(program.assets && program.assets.length && program.assets[0]) | background: program._id\" />\n                    </div>\n                  </ion-card-header>\n                  <div class=\"program-name\">{{program.matrix_string[0][0]}}</div>\n                </ion-card>\n              </ion-slide>\n            </ion-slides>\n            <ion-grid *ngIf=\"platform.width() >= 768\">\n              <ion-row class=\"ion-justify-content-start\">\n                <ion-col class=\"ion-align-self-center grid-col\" *ngFor=\"let program of programs; trackBy: customTrackBy\" [hidden]=\"!((program.matrix_string[0][0].toLowerCase().includes(searchKeyword.toLowerCase()) || program.resource['en-US'].value[0].toLowerCase().includes(searchKeyword.toLowerCase())))\" size=\"auto\">\n                  <ion-card class=\"grid-program-card\" (click)=\"openProgram($event, program)\">\n                    <ion-card-header class=\"ion-no-padding\">\n                      <div class=\"program-photo-container\">\n                        <img class=\"program-photo\" [src]=\"(program.assets && program.assets.length && program.assets[0]) | background: program._id\" />\n                      </div>\n                    </ion-card-header>\n                    <div class=\"program-name\">{{program.matrix_string[0][0]}}</div>\n                  </ion-card>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card>\n        </ion-col>\n\n        <ion-col *ngIf=\"!noSystemMessage\" size-xs=\"12\" size-sm=\"12\" size-md=\"6\" [ngStyle]=\"{'padding': platform.width() >= 768 ? '6px 5px' : '6px 0'}\">\n          <ion-card class=\"ion-no-margin ion-no-padding\" [ngClass]=\"{'mobile-card': platform.width() < 768}\">\n            <ion-item class=\"section\" lines=\"none\" *ngIf=\"platform.width() >= 768\"> <!--section header-->\n              <ion-label class=\"section-label\" color=\"darkgrey\">System Notifications</ion-label>\n            </ion-item>\n            <ion-list class=\"system-message-container ion-padding\">\n              <ion-item>\n                <ion-buttons slot=\"end\">\n                  <ion-button fill=\"solid\" color=\"primary\" size=\"small\" (click)=\"handleSystemMessages('accept')\">Accept All</ion-button>\n                  <ion-button fill=\"clear\" color=\"primary\" size=\"small\" (click)=\"handleSystemMessages('clear')\">Clear All</ion-button>\n                </ion-buttons>\n              </ion-item>\n              <div *ngFor=\"let pendingNotification of pendingNotifications; trackBy: customTrackBy\">\n                <ion-item class=\"ion-text-wrap\" (click)=\"viewMessage($event, pendingNotification)\" *ngIf=\"pendingNotification.message.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1\" lines=\"none\">\n                  <p style=\"color: var(--ion-color-dark);\">{{pendingNotification.message}}</p>\n                  <ion-icon color=\"primary\" ios=\"ellipsis-horizontal\" md=\"ellipsis-vertical\" slot=\"end\"></ion-icon>\n                </ion-item>\n              </div>\n            </ion-list>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <div *ngIf=\"view === 'calendar'\" size-xs=\"12\" size-sm=\"12\" size-md=\"6\">\n      <ion-toolbar>\n        <ion-item class=\"transparent ion-margin-top\" lines=\"none\" *ngIf=\"view === 'calendar'\">\n          <ion-row class=\"calendar-buttons\">\n            <ion-col class=\"calendar-button\" (click)=\"calendarService.changeMode('month')\">\n              <div class=\"calendar-label\" [ngClass]=\"{ 'selected' : calendarService.calendar.mode == 'month'}\">Month</div>\n            </ion-col>\n            <ion-col class=\"calendar-button\" (click)=\"calendarService.changeMode('week')\">\n              <div class=\"calendar-label\" [ngClass]=\"{ 'selected' : calendarService.calendar.mode == 'week'}\">Week</div>\n            </ion-col>\n            <ion-col class=\"calendar-button\" (click)=\"calendarService.changeMode('upcoming')\" *ngIf=\"calendarService.hasUpcomingItems\">\n              <div class=\"calendar-label\" [ngClass]=\"{ 'selected' : calendarService.calendar.mode == 'upcoming'}\">Upcoming</div>\n            </ion-col>\n          </ion-row>\n        </ion-item>\n      </ion-toolbar>\n      <!--CALENDAR SECTION-->\n      <ion-card class=\"calendar-container\" *ngIf=\"calendarService.calendar.mode == 'month' || calendarService.calendar.mode == 'week'\">\n        <div class=\"month-title-container\">\n          <ion-icon name=\"chevron-back-outline\" class=\"calendar-arrow left\" (click)=\"calendarService.changeDate($event, 4)\"></ion-icon>\n          <h4 class=\"month-title\">{{calendarService.calendar.viewTitle}}</h4>\n          <ion-icon name=\"chevron-forward-outline\" class=\"calendar-arrow right\" (click)=\"calendarService.changeDate($event, 2)\"></ion-icon>\n        </div>\n\n        <div class=\"monthview-day-headers\">S</div>\n        <div class=\"monthview-day-headers\">M</div>\n        <div class=\"monthview-day-headers\">T</div>\n        <div class=\"monthview-day-headers\">W</div>\n        <div class=\"monthview-day-headers\">T</div>\n        <div class=\"monthview-day-headers\">F</div>\n        <div class=\"monthview-day-headers\">S</div>\n\n        <!--month view-->\n        <div *ngIf=\"calendarService.calendar.mode == 'month'\">\n          <div class=\"monthview-element\" *ngFor=\"let dayOfMonth of calendarService.calendar.daysInViewMonth; trackBy: customTrackBy\">\n            <div class=\"monthview-element-content\" [ngClass]=\"{'selected-date' : calendarService.calendar.selectedDate.toString() === dayOfMonth.date.toString() && dayOfMonth.date != ' ','current-date': calendarService.calendar.currentDate.toString().substring( 0 , 15) == dayOfMonth.date.toString().substring(0 , 15)}\" (click)=\"changeSelectedDate(dayOfMonth.date)\">\n              <div *ngIf=\"dayOfMonth.date == ' ' \">&nbsp;&nbsp;</div>\n              <div *ngIf=\"dayOfMonth.date != ' ' \">\n                {{dayOfMonth.date.getDate()}}\n              </div>\n              <div class=\"monthview-dot-container\" *ngFor=\"let calendarItem of dayOfMonth.dayEvents; trackBy: customTrackBy; let i = index\">\n                <div class=\"monthview-element-dot\" [ngClass]=\"{'past-calendar-item' : calendarItem.pastEvent}\" *ngIf=\"i < 5\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <!--week view-->\n        <div *ngIf=\"calendarService.calendar.mode == 'week'\">\n          <div class=\"monthview-element\" *ngFor=\"let dayOfWeek of calendarService.calendar.daysInViewWeek; trackBy: customTrackBy\">\n            <div class=\"monthview-element-content\" [ngClass]=\"{'selected-date' : calendarService.calendar.selectedDate.toString() === dayOfWeek.date.toString() && dayOfWeek.date != ' ','current-date': calendarService.calendar.currentDate.toString().substring( 0 , 15) == dayOfWeek.date.toString().substring(0 , 15)}\" (click)=\"changeSelectedDate( dayOfWeek.date )\">\n              <div *ngIf=\"dayOfWeek.date == ' ' \">&nbsp;&nbsp;</div>\n              <div *ngIf=\"dayOfWeek.date != ' ' \">\n                {{dayOfWeek.date.getDate()}}\n              </div>\n              <div class=\"monthview-dot-container\" *ngFor=\"let calendarItem of dayOfWeek.dayEvents; trackBy: customTrackBy; let i = index\">\n                <div class=\"monthview-element-dot\" [ngClass]=\"{'past-calendar-item' : calendarItem.pastEvent}\" *ngIf=\"i < 5\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </ion-card>\n\n      <!-- list features after being filtered -->\n      <ion-list lines=\"none\" class=\"list-container ion-padding\">\n        <div *ngFor=\"let calendarItem of calendarService.calendarItems; trackBy: customTrackBy\" id=\"event-title\" >\n          <ion-item (click)=\"clickCalendarItem(calendarItem)\" *ngIf=\"((((calendarService.calendar.mode == 'month' && calendarService.calendar.selectedDate.getMonth() == calendarService.calendar.currentViewDate.getMonth()) || (calendarService.calendar.mode == 'week' && calendarService.calendar.selectedDate.getMonth() == calendarService.calendar.currentViewDate.getMonth())) && calendarService.eventOnDay( calendarService.calendar.selectedDate , calendarItem )) || (calendarService.calendar.mode == 'upcoming' && calendarItem.validUpcomingItem)) && calendarItem.title.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1\" id=\"feature\" lines=\"none\">\n            <ion-label class=\"moment-icon\" slot=\"start\">\n              <img [src]=\"momentService.loadIcon(calendarItem.moment.resource.field).url\" />\n            </ion-label>\n            <ion-badge [color]=\"momentService.loadIcon(calendarItem.moment.resource.field).color\">{{calendarItem.moment.resource['en-US'].value[0]}}</ion-badge>\n            <div class=\"item-container\" slot=\"end\">\n              <ion-label>{{calendarItem.title}}</ion-label>\n              <ion-note *ngIf=\"calendarItem.moment.resource.field !== 'Poll'\">{{calendarItem.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-note>\n              <ion-note *ngIf=\"calendarItem.moment.resource.field === 'Poll'\">{{calendarItem.endDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-note>\n            </div>\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/community/listmycommunities/listmycommunities.page.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/community/listmycommunities/listmycommunities.page.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvbW11bml0eS9saXN0bXljb21tdW5pdGllcy9saXN0bXljb21tdW5pdGllcy5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/community/listmycommunities/listmycommunities.page.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/community/listmycommunities/listmycommunities.page.ts ***!
  \*****************************************************************************/
/*! exports provided: ListmycommunitiesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListmycommunitiesPage", function() { return ListmycommunitiesPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../showcommunity/showcommunity.page */ "./src/app/pages/community/showcommunity/showcommunity.page.ts");
/* harmony import */ var _searchcommunity_searchcommunity_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../searchcommunity/searchcommunity.page */ "./src/app/pages/community/searchcommunity/searchcommunity.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var ListmycommunitiesPage = /** @class */ (function () {
    function ListmycommunitiesPage(navCtrl, modalCtrl, authService, churchService, userData) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.authService = authService;
        this.churchService = churchService;
        this.userData = userData;
        this.noChurchAdded = false;
    }
    ListmycommunitiesPage.prototype.ngOnInit = function () {
        this.loadMyChurches();
    };
    ListmycommunitiesPage.prototype.loadMyChurches = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.mycommunities = []; //reset the array
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this.userData.loadMyChurches()];
                    case 2:
                        _a.mycommunities = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log("failed to get mycommunities data");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ListmycommunitiesPage.prototype.searchChurch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var searchCommunityModal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _searchcommunity_searchcommunity_page__WEBPACK_IMPORTED_MODULE_6__["SearchcommunityPage"] })];
                    case 1:
                        searchCommunityModal = _a.sent();
                        return [4 /*yield*/, searchCommunityModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, searchCommunityModal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.loadMyChurches();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ListmycommunitiesPage.prototype.showChurchProfile = function (community) {
        return __awaiter(this, void 0, void 0, function () {
            var showCommunityProfileModal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_5__["ShowcommunityPage"], componentProps: { community: community, modalPage: true } })];
                    case 1:
                        showCommunityProfileModal = _a.sent();
                        return [4 /*yield*/, showCommunityProfileModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, showCommunityProfileModal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.loadMyChurches();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //get the latest user data from the server
    ListmycommunitiesPage.prototype.refresh = function (refresher) {
        this.loadMyChurches();
        setTimeout(function () {
            refresher.complete();
        }, 2000);
    };
    ListmycommunitiesPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["NavController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["Auth"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_3__["Churches"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"] }
    ]; };
    ListmycommunitiesPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-listmycommunities',
            template: __importDefault(__webpack_require__(/*! raw-loader!./listmycommunities.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/listmycommunities/listmycommunities.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./listmycommunities.page.scss */ "./src/app/pages/community/listmycommunities/listmycommunities.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["NavController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["Auth"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_3__["Churches"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"]])
    ], ListmycommunitiesPage);
    return ListmycommunitiesPage;
}());



/***/ }),

/***/ "./src/app/pages/community/searchcommunity/searchcommunity.page.scss":
/*!***************************************************************************!*\
  !*** ./src/app/pages/community/searchcommunity/searchcommunity.page.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvbW11bml0eS9zZWFyY2hjb21tdW5pdHkvc2VhcmNoY29tbXVuaXR5LnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/community/searchcommunity/searchcommunity.page.ts":
/*!*************************************************************************!*\
  !*** ./src/app/pages/community/searchcommunity/searchcommunity.page.ts ***!
  \*************************************************************************/
/*! exports provided: SearchcommunityPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchcommunityPage", function() { return SearchcommunityPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../showcommunity/showcommunity.page */ "./src/app/pages/community/showcommunity/showcommunity.page.ts");
/* harmony import */ var _editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../editcommunity/editcommunity.page */ "./src/app/pages/community/editcommunity/editcommunity.page.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








var SearchcommunityPage = /** @class */ (function () {
    function SearchcommunityPage(modalCtrl, alertCtrl, resourceService, cache, userData, churchService) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.resourceService = resourceService;
        this.cache = cache;
        this.userData = userData;
        this.churchService = churchService;
        this.reachedEnd = false;
        this.pageNum = 0;
        this.searchKeyword = '';
        this.needToCreateChurchProfile = false;
    }
    SearchcommunityPage.prototype.ngOnInit = function () {
        this.listAllMyCommunities();
    };
    SearchcommunityPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.listAllMyCommunities();
    };
    SearchcommunityPage.prototype.listAllMyCommunities = function () {
        var _this = this;
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.infiniteScroll.disabled = false;
                this.reachedEnd = false;
                this.communities = [];
                this.pageNum = 0;
                this.listcommunities({ target: this.infiniteScroll });
                return [2 /*return*/];
            });
        }); }, 100);
    };
    SearchcommunityPage.prototype.listcommunities = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var churchIdList, communities;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageNum++;
                        churchIdList = [];
                        this.userData.user.churches.forEach(function (church) {
                            churchIdList.push(church._id); //create an array of user subscribed churches
                        });
                        if (!!this.reachedEnd) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.churchService.loadAllChurchProfiles(this.searchKeyword, this.pageNum)];
                    case 1:
                        communities = _a.sent();
                        if (!communities.length) {
                            this.reachedEnd = true;
                            event.target.disabled = true;
                            this.needToCreateChurchProfile = true;
                        }
                        else {
                            this.needToCreateChurchProfile = true;
                            communities.forEach(function (community) {
                                community.alreadyJoined = churchIdList.indexOf(community._id) >= 0;
                                _this.communities.push(community);
                            });
                        }
                        event.target.complete();
                        return [3 /*break*/, 3];
                    case 2:
                        event.target.complete();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SearchcommunityPage.prototype.showCommunityProfile = function (community) {
        return __awaiter(this, void 0, void 0, function () {
            var editCommunityModal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_5__["ShowcommunityPage"],
                            componentProps: { community: community, modalPage: true } })];
                    case 1:
                        editCommunityModal = _a.sent();
                        return [4 /*yield*/, editCommunityModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, editCommunityModal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.modalCtrl.dismiss(refreshNeeded);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchcommunityPage.prototype.createChurchProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var industries;
            var _this = this;
            return __generator(this, function (_a) {
                industries = [];
                this.resourceService.load('en-US', "Industry").subscribe(function (fields) { return __awaiter(_this, void 0, void 0, function () {
                    var i, createCommunityModal, refreshNeeded;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                for (i = 0; i < fields.length; i++) {
                                    console.log("id", fields[i]._id);
                                    industries.push({ _id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false });
                                }
                                return [4 /*yield*/, this.modalCtrl.create({ component: _editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_6__["EditcommunityPage"], componentProps: { industries: industries } })];
                            case 1:
                                createCommunityModal = _a.sent();
                                return [4 /*yield*/, createCommunityModal.present()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, createCommunityModal.onDidDismiss()];
                            case 3:
                                refreshNeeded = (_a.sent()).data;
                                if (refreshNeeded) {
                                    this.modalCtrl.dismiss(refreshNeeded);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { return __awaiter(_this, void 0, void 0, function () {
                    var networkAlert;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.alertCtrl.create({
                                    header: 'No Internet Connection',
                                    message: 'Please check your internet connection.',
                                    buttons: ['Dismiss'],
                                    cssClass: 'level-15'
                                })];
                            case 1:
                                networkAlert = _a.sent();
                                return [4 /*yield*/, networkAlert.present()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    SearchcommunityPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_7__["Resource"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_3__["Churches"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonInfiniteScroll"])
    ], SearchcommunityPage.prototype, "infiniteScroll", void 0);
    SearchcommunityPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-searchcommunity',
            template: __importDefault(__webpack_require__(/*! raw-loader!./searchcommunity.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/searchcommunity/searchcommunity.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./searchcommunity.page.scss */ "./src/app/pages/community/searchcommunity/searchcommunity.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_7__["Resource"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_3__["Churches"]])
    ], SearchcommunityPage);
    return SearchcommunityPage;
}());



/***/ }),

/***/ "./src/app/pages/user/dashboard/dashboard.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/user/dashboard/dashboard.module.ts ***!
  \**********************************************************/
/*! exports provided: DashboardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageModule", function() { return DashboardPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard.page */ "./src/app/pages/user/dashboard/dashboard.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var routes = [
    {
        path: '',
        component: _dashboard_page__WEBPACK_IMPORTED_MODULE_5__["DashboardPage"],
    }
];
var DashboardPageModule = /** @class */ (function () {
    function DashboardPageModule() {
    }
    DashboardPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            ],
            declarations: [
                _dashboard_page__WEBPACK_IMPORTED_MODULE_5__["DashboardPage"],
            ],
        })
    ], DashboardPageModule);
    return DashboardPageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/dashboard/dashboard.page.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/user/dashboard/dashboard.page.scss ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-dashboard {\n  /*  ion-list-header, ion-item, ion-card {\n      background: transparent !important;\n    }*/\n}\napp-dashboard ion-menu-toggle ion-badge {\n  position: relative;\n  top: 0.1rem;\n  right: 22px;\n  /*& ~ ion-icon {\n    outline-color: whitesmoke;\n  }*/\n  z-index: 5;\n}\napp-dashboard ion-spinner {\n  position: absolute;\n  margin: 48%;\n}\napp-dashboard ion-card-header, app-dashboard ion-card-content {\n  font-size: 14px;\n}\napp-dashboard ion-item-divider {\n  margin-top: 3px !important;\n}\napp-dashboard .message-container {\n  margin-left: 16px;\n}\napp-dashboard .message-detail {\n  color: grey;\n  overflow: hidden;\n  font-size: 10px;\n  line-height: 12px;\n  margin: 4px 0 0 0;\n}\napp-dashboard .profile-banner {\n  padding: 10px 0;\n}\napp-dashboard .dashboard-banner {\n  background: url('onboarding-1.jpg');\n  background-size: cover;\n  max-width: 600px;\n  margin: 0 auto;\n}\napp-dashboard .transparent {\n  --background: transparent !important;\n}\napp-dashboard .header-searchbar {\n  width: 50%;\n}\napp-dashboard .image-cropper {\n  width: 120px;\n  height: 120px;\n  overflow: hidden;\n  border-radius: 50%;\n  margin: 2% auto 0 auto;\n}\napp-dashboard .custom-avatar {\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n  width: 100%;\n  height: 100%;\n}\napp-dashboard .user-name {\n  display: inline-block;\n  font-size: large;\n  font-weight: bold;\n  color: var(--ion-color-secondary);\n}\napp-dashboard .current-date-display {\n  display: inline-block;\n  font-size: large;\n  font-weight: normal;\n  color: var(--ion-color-secondary);\n  margin-top: 3%;\n}\napp-dashboard .user-info {\n  width: 100%;\n}\napp-dashboard .user-info-buttons {\n  min-width: 40%;\n  margin: 0 auto;\n}\napp-dashboard .profile-tag {\n  font-size: smaller;\n  color: black;\n  display: inline-block;\n  --margin-start: 10px;\n  --margin-end: 10px;\n}\napp-dashboard .calendar-buttons {\n  color: var(--ion-color-dark);\n  width: 100%;\n}\napp-dashboard .calendar-button {\n  display: inline-block;\n  width: 30%;\n}\napp-dashboard .calendar-label {\n  text-align: center;\n}\napp-dashboard .moment-icon {\n  max-width: 20px;\n  margin: 0 5px;\n}\napp-dashboard .user-goal {\n  font-size: medium;\n  color: var(--ion-color-secondary);\n  margin-left: 2%;\n}\napp-dashboard .selected {\n  text-decoration: underline;\n}\napp-dashboard ion-button ion-badge {\n  position: absolute;\n  top: 0.1rem;\n  right: 0.1rem;\n}\napp-dashboard ion-button ion-badge ~ ion-icon {\n  outline-color: whitesmoke;\n}\napp-dashboard .short-paragraph {\n  margin-top: 3px;\n  max-height: 36px;\n  line-height: 18px;\n  /* Height / no. of lines to display */\n  overflow: hidden;\n}\napp-dashboard .pull-handle {\n  position: absolute;\n  bottom: -2px;\n  right: -2px;\n  width: 2px;\n  height: 5px;\n  border: solid #ffa535;\n  border-radius: 20px;\n}\napp-dashboard .calendar-container {\n  width: 85%;\n  max-width: 400px;\n  margin: 10px auto;\n  padding-bottom: 10px;\n  --color: var(--ion-color-dark);\n}\napp-dashboard .month-title-container {\n  width: 100%;\n}\napp-dashboard .month-title {\n  width: calc((100% / 7) * 5);\n  text-align: center;\n  display: inline-block;\n}\napp-dashboard .calendar-arrow {\n  width: calc(100% / 7);\n  position: relative;\n  display: inline-block;\n}\napp-dashboard .calendar-arrow .left {\n  float: left;\n}\napp-dashboard .calendar-arrow .right {\n  float: right;\n}\napp-dashboard .monthview-day-headers {\n  width: calc(100% / 7);\n  float: left;\n  position: relative;\n  color: var(--ion-color-grey);\n  text-align: center;\n}\napp-dashboard .monthview-element {\n  width: calc(100% / 7);\n  float: left;\n  position: relative;\n  padding-bottom: calc(100% / 9);\n}\napp-dashboard .selected-date {\n  background-color: var(--ion-color-lightgrey);\n  border-radius: 50%;\n}\napp-dashboard .monthview-element .monthview-element-content {\n  width: calc(100% - 10px);\n  height: calc(100% - 10px);\n  text-align: center;\n  margin: 5px;\n  padding-top: 5px;\n  position: absolute;\n}\napp-dashboard .past-calendar-item {\n  background-color: var(--ion-color-grey);\n}\napp-dashboard .monthview-dot-container {\n  text-align: center;\n  display: inline-block;\n}\napp-dashboard .monthview-element-dot {\n  height: 5px;\n  width: 5px;\n  margin: 0px 0.5px 0px 0.5px;\n  border-radius: 50%;\n  background-color: var(--ion-color-primary);\n}\napp-dashboard .list-container {\n  overflow: scroll;\n  max-height: 400px;\n  margin: 0 auto;\n  max-width: 400px;\n}\napp-dashboard .system-message-container {\n  max-width: 600px;\n  margin: 0 auto;\n}\napp-dashboard .feature-thumbnail {\n  height: 40px;\n  width: 40px;\n}\napp-dashboard .item-container {\n  width: 60%;\n  margin: 5px;\n  float: left;\n}\napp-dashboard .custom-dropdown {\n  background-color: var(--ion-color-primary);\n  color: white;\n  height: 34%;\n  margin-bottom: 1%;\n}\napp-dashboard .profile-section {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n}\napp-dashboard .searchbar-cover {\n  background-color: var(--ion-color-primary);\n  border-top: 2px var(--ion-color-light) solid;\n  height: 50px;\n  width: 100%;\n}\napp-dashboard .imgBtn {\n  margin-top: 5%;\n}\napp-dashboard .current-date {\n  font-weight: bold;\n}\napp-dashboard .date-and-day {\n  font-size: large;\n  text-align: center;\n  width: 10%;\n  display: inline-block;\n  min-height: 60px;\n}\napp-dashboard .event-img-div {\n  display: inline-block;\n  width: 20%;\n}\napp-dashboard .event-img {\n  border-radius: 50%;\n}\napp-dashboard .event-type-img {\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  border: 4px white solid;\n}\napp-dashboard .day-in-weekview {\n  height: 100%;\n  width: 14%;\n  margin: 3% 0;\n  display: inline-block;\n  text-align: center;\n}\napp-dashboard .no-events-note {\n  color: var(--ion-color-grey);\n  text-align: center;\n  font-size: large;\n  vertical-align: center;\n}\napp-dashboard #addFeatures {\n  -webkit-animation-name: move-down;\n          animation-name: move-down;\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-timing-function: ease-in;\n          animation-timing-function: ease-in;\n  max-height: 180px;\n  z-index: -50;\n}\n@-webkit-keyframes move-down {\n  from {\n    transform: translateY(-90px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\n@keyframes move-down {\n  from {\n    transform: translateY(-90px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\napp-dashboard #searchbar {\n  -webkit-animation-name: move-down;\n          animation-name: move-down;\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-timing-function: ease-in;\n          animation-timing-function: ease-in;\n}\napp-dashboard .moreOptions {\n  width: 100%;\n  background-color: rgba(238, 238, 238, 0.5);\n  overflow: scroll;\n}\napp-dashboard .moreOptions .moreGrid {\n  width: 100%;\n}\napp-dashboard .moreOptions .topRow {\n  width: 100%;\n}\napp-dashboard .moreOptions .optionscol {\n  height: 100%;\n  width: 100%;\n}\napp-dashboard .moreOptions .optionscol .colelement {\n  height: 50px;\n  width: 50px;\n  padding: 10px;\n  display: table;\n  margin: 2% auto;\n  border-radius: 10px;\n  border-style: solid;\n  border-width: 1px;\n  background-color: #ffffff;\n  border-color: #cccccc;\n}\napp-dashboard .moreOptions .optionscol .moreLabel {\n  display: table;\n  margin: 0 auto;\n  color: #969696;\n  font-size: medium;\n}\napp-dashboard .pageRow {\n  position: absolute;\n  top: 160px;\n  width: 100%;\n  height: 14px;\n}\napp-dashboard .circleOne {\n  height: 5px;\n  width: 5px;\n  background-color: #9b9b9b;\n  border-radius: 100%;\n  margin-left: 48%;\n  margin-right: 1.3%;\n}\napp-dashboard .circleTwo {\n  height: 5px;\n  width: 5px;\n  background-color: #9b9b9b;\n  border-radius: 100%;\n  margin-left: 0;\n  margin-right: 47%;\n}\napp-dashboard #darkCicleOne {\n  background-color: #4a4a4a;\n}\napp-dashboard #darkCircleTwo {\n  background-color: #4a4a4a;\n}\napp-dashboard .to-test-click {\n  background-color: red;\n}\napp-dashboard .person-avatar {\n  width: 100px !important;\n  height: 100px !important;\n}\napp-dashboard .person-content {\n  height: 75px;\n  overflow: scroll;\n  --background: var(--ion-color-light);\n}\napp-dashboard .person-content-item {\n  --background: transparent;\n}\napp-dashboard .person-edit-profile {\n  width: 183px;\n  height: 26px;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 12px;\n  line-height: 14px;\n  /* identical to box height */\n  display: flex;\n}\napp-dashboard .person-content-left {\n  width: 100%;\n  padding-left: 25px;\n  display: flex;\n  flex-direction: column;\n}\napp-dashboard .person-name {\n  width: 183px;\n  height: 23px;\n  font-family: \"Roboto\", sans-serif;\n  font-style: normal;\n  font-weight: 500;\n  font-size: 20px;\n  line-height: 23px;\n}\napp-dashboard .person-content-container {\n  margin-left: 18px;\n}\napp-dashboard .person-title {\n  height: 28px;\n  font-size: 12px;\n  line-height: 14px;\n  overflow: hidden;\n  margin: 8px 0px 16px 0px;\n  color: var(--ion-color-darkgrey);\n}\napp-dashboard .profile-row {\n  padding: 6px 0;\n}\napp-dashboard .profile-card {\n  width: 100%;\n  margin: 0 5px;\n  padding: 10px 0;\n}\napp-dashboard .content-border {\n  border-left: 0.5px solid #979797;\n}\napp-dashboard .person-content-right {\n  padding-left: 12.5px;\n  margin: 10px 0 21px 0;\n  width: 60%;\n  height: 42px;\n  line-height: 14px;\n  /* Height / no. of lines to display */\n  overflow: hidden;\n  font-size: 12px;\n  color: var(--ion-color-darkgrey);\n}\napp-dashboard .section {\n  --min-height: 26px;\n  --background: transparent;\n}\napp-dashboard .section .section-label {\n  font-size: 15px;\n}\napp-dashboard .section-card {\n  height: 100%;\n}\napp-dashboard .program-slides {\n  padding: 10px 0;\n  background-color: transparent;\n}\napp-dashboard .program-slide {\n  width: 150px !important;\n}\napp-dashboard .program-card {\n  height: 100%;\n  width: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n  margin: 0 3%;\n}\napp-dashboard .grid-program-card {\n  width: 133px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  margin: 0 3%;\n}\napp-dashboard .program-photo-container {\n  height: 100px;\n  overflow: hidden;\n}\napp-dashboard .program-photo {\n  -o-object-fit: cover;\n     object-fit: cover;\n  cursor: pointer;\n  height: 100%;\n  width: 100%;\n  margin: auto;\n  display: block;\n}\napp-dashboard .program-name {\n  position: absolute;\n  bottom: 2%;\n  left: 2%;\n  color: white;\n  font-size: 12px;\n  cursor: pointer;\n  z-index: 15;\n}\napp-dashboard .mobile-card {\n  box-shadow: none;\n  border-radius: 0;\n  margin: 0;\n}\napp-dashboard .relationship-slide {\n  max-width: 130px;\n  padding-bottom: 10px;\n}\napp-dashboard .relationship-card {\n  height: 146px;\n  width: 120px;\n  margin: 0 3%;\n}\napp-dashboard .relationship-photo-container {\n  height: 84px;\n  margin: 0 auto;\n}\napp-dashboard .relationship-avatar .relationship-photo {\n  position: absolute;\n  cursor: pointer;\n}\napp-dashboard .relationship-avatar .relationship-photo.border {\n  border: 1px solid var(--ion-color-lightgrey);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);\n}\napp-dashboard .relationship-name-container {\n  height: 20px;\n  overflow: hidden;\n}\napp-dashboard .relationship-name-container.top {\n  height: 32px;\n  margin-top: 2px;\n}\napp-dashboard .relationship-name {\n  font-style: normal;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 16px;\n  text-align: center;\n  color: var(--ion-color-dark);\n}\napp-dashboard .relationship-description {\n  font-style: normal;\n  font-weight: normal;\n  font-size: 12px;\n  line-height: 12px;\n  text-align: center;\n  color: var(--ion-color-dark);\n}\napp-dashboard .desktop-content {\n  padding-left: 5px;\n  padding-right: 5px;\n}\napp-dashboard .content-container {\n  margin: 5px auto;\n  max-width: 936px;\n}\napp-dashboard .content-grid {\n  padding: 0;\n}\napp-dashboard .completed_percentage {\n  font-weight: 500;\n  font-size: 18px;\n  line-height: 21px;\n  color: var(--ion-color-button1);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL3VzZXIvZGFzaGJvYXJkL2Rhc2hib2FyZC5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL3VzZXIvZGFzaGJvYXJkL2Rhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFvQkE7O01BQUE7QUNoQkE7QURESTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFFQTs7SUFBQTtFQUdBLFVBQUE7QUNFTjtBREVFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0FDQUo7QURPRTtFQUNFLGVBQUE7QUNMSjtBRFlFO0VBQ0UsMEJBQUE7QUNWSjtBRGFFO0VBQ0UsaUJBQUE7QUNYSjtBRGVFO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7QUNiSjtBRGdCRTtFQUNFLGVBQUE7QUNkSjtBRGlCRTtFQUNFLG1DQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUNmSjtBRGtCRTtFQUNFLG9DQUFBO0FDaEJKO0FEbUJFO0VBQ0UsVUFBQTtBQ2pCSjtBRG9CRTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FDbEJKO0FEcUJFO0VBQ0Usb0JBQUE7S0FBQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNuQko7QURzQkU7RUFDRSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQ0FBQTtBQ3BCSjtBRHVCRTtFQUNFLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlDQUFBO0VBQ0EsY0FBQTtBQ3JCSjtBRHdCRTtFQUNFLFdBQUE7QUN0Qko7QUR5QkU7RUFDRSxjQUFBO0VBQ0EsY0FBQTtBQ3ZCSjtBRDBCRTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtBQ3hCSjtBRDJCRTtFQUNFLDRCQUFBO0VBQ0EsV0FBQTtBQ3pCSjtBRDRCRTtFQUNFLHFCQUFBO0VBQ0EsVUFBQTtBQzFCSjtBRDZCRTtFQUNFLGtCQUFBO0FDM0JKO0FEOEJFO0VBQ0UsZUFBQTtFQUNBLGFBQUE7QUM1Qko7QUQrQkU7RUFDRSxpQkFBQTtFQUNBLGlDQUFBO0VBQ0EsZUFBQTtBQzdCSjtBRGdDRTtFQUNFLDBCQUFBO0FDOUJKO0FEa0NJO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtBQ2hDTjtBRGtDTTtFQUNFLHlCQUFBO0FDaENSO0FEcUNFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFBbUIscUNBQUE7RUFDbkIsZ0JBQUE7QUNsQ0o7QURxQ0U7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0FDbkNKO0FEc0NFO0VBQ0UsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtFQUNBLDhCQUFBO0FDcENKO0FEdUNFO0VBQ0UsV0FBQTtBQ3JDSjtBRHdDRTtFQUNFLDJCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtBQ3RDSjtBRHlDRTtFQUNFLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtBQ3ZDSjtBRHdDSTtFQUNFLFdBQUE7QUN0Q047QUR3Q0k7RUFDRSxZQUFBO0FDdENOO0FEMENFO0VBQ0UscUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0FDeENKO0FEMkNFO0VBQ0UscUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtBQ3pDSjtBRDRDRTtFQUNFLDRDQUFBO0VBQ0Esa0JBQUE7QUMxQ0o7QUQ2Q0U7RUFDRSx3QkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQzNDSjtBRDhDRTtFQUNFLHVDQUFBO0FDNUNKO0FEK0NFO0VBQ0Usa0JBQUE7RUFDQSxxQkFBQTtBQzdDSjtBRGdERTtFQUNFLFdBQUE7RUFDQSxVQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0FDOUNKO0FEaURFO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQy9DSjtBRGtERTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQ2hESjtBRG1ERTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FDakRKO0FEb0RFO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0FDbERKO0FEcURFO0VBQ0UsMENBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FDbkRKO0FEc0RFO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7QUNwREo7QUR1REU7RUFDRSwwQ0FBQTtFQUNBLDRDQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNyREo7QUR3REU7RUFDRSxjQUFBO0FDdERKO0FEeURFO0VBQ0UsaUJBQUE7QUN2REo7QUQwREU7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7QUN4REo7QUQyREU7RUFDRSxxQkFBQTtFQUNBLFVBQUE7QUN6REo7QUQ0REU7RUFDRSxrQkFBQTtBQzFESjtBRDhERTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtBQzVESjtBRCtERTtFQUNFLFlBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUM3REo7QURnRUU7RUFDRSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtBQzlESjtBRGtFRTtFQUNFLGlDQUFBO1VBQUEseUJBQUE7RUFDQSxnQ0FBQTtVQUFBLHdCQUFBO0VBQ0EsMENBQUE7VUFBQSxrQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQ2hFSjtBRG1FRTtFQUNFO0lBQ0UsNEJBQUE7RUNqRUo7RURtRUU7SUFDRSx3QkFBQTtFQ2pFSjtBQUNGO0FEMkRFO0VBQ0U7SUFDRSw0QkFBQTtFQ2pFSjtFRG1FRTtJQUNFLHdCQUFBO0VDakVKO0FBQ0Y7QURvRUU7RUFDRSxpQ0FBQTtVQUFBLHlCQUFBO0VBQ0EsZ0NBQUE7VUFBQSx3QkFBQTtFQUNBLDBDQUFBO1VBQUEsa0NBQUE7QUNsRUo7QURxRUU7RUFDRSxXQUFBO0VBQ0EsMENBQUE7RUFDQSxnQkFBQTtBQ25FSjtBRHFFSTtFQUNFLFdBQUE7QUNuRU47QURzRUk7RUFDRSxXQUFBO0FDcEVOO0FEdUVJO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUNyRU47QUR1RU07RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUNyRVI7QUR3RU07RUFDRSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQ3RFUjtBRDJFRTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDekVKO0FENEVFO0VBQ0UsV0FBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQzFFSjtBRDZFRTtFQUNFLFdBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBQzNFSjtBRDhFRTtFQUNFLHlCQUFBO0FDNUVKO0FEK0VFO0VBQ0UseUJBQUE7QUM3RUo7QURnRkU7RUFDRSxxQkFBQTtBQzlFSjtBRGlGRTtFQUNFLHVCQUFBO0VBQ0Esd0JBQUE7QUMvRUo7QURrRkU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQ0FBQTtBQ2hGSjtBRG1GRTtFQUNFLHlCQUFBO0FDakZKO0FEb0ZFO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxhQUFBO0FDbEZKO0FEcUZFO0VBS0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FDdkZKO0FEMkZFO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUN6Rko7QUQyRkU7RUFDRSxpQkFBQTtBQ3pGSjtBRDRGRTtFQUVFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHdCQUFBO0VBQ0EsZ0NBQUE7QUMzRko7QUQ4RkU7RUFDRSxjQUFBO0FDNUZKO0FEK0ZFO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0FDN0ZKO0FEZ0dFO0VBQ0UsZ0NBQUE7QUM5Rko7QURpR0U7RUFDRSxvQkFBQTtFQUNBLHFCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFFQSxpQkFBQTtFQUFtQixxQ0FBQTtFQUNuQixnQkFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtBQy9GSjtBRGtHRTtFQUNFLGtCQUFBO0VBQ0EseUJBQUE7QUNoR0o7QURrR0k7RUFDRSxlQUFBO0FDaEdOO0FEb0dFO0VBQ0UsWUFBQTtBQ2xHSjtBRHFHRTtFQUNFLGVBQUE7RUFDQSw2QkFBQTtBQ25HSjtBRHNHRTtFQUNFLHVCQUFBO0FDcEdKO0FEdUdFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtLQUFBLG1CQUFBO0VBQ0EsWUFBQTtBQ3JHSjtBRHdHRTtFQUNFLFlBQUE7RUFDQSxzQkFBQTtLQUFBLG1CQUFBO0VBQ0EsWUFBQTtBQ3RHSjtBRHlHRTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtBQ3ZHSjtBRDRHRTtFQUNFLG9CQUFBO0tBQUEsaUJBQUE7RUFDQSxlQUFBO0VBRUEsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQzNHSjtBRCtHRTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FDN0dKO0FEZ0hFO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7QUM5R0o7QURpSEU7RUFDRSxnQkFBQTtFQUNBLG9CQUFBO0FDL0dKO0FEa0hFO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDaEhKO0FEbUhFO0VBQ0UsWUFBQTtFQUNBLGNBQUE7QUNqSEo7QURxSEk7RUFDRSxrQkFBQTtFQUNBLGVBQUE7QUNuSE47QURzSEk7RUFDRSw0Q0FBQTtFQUNBLHlDQUFBO0FDcEhOO0FEd0hFO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0FDdEhKO0FEeUhFO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUN2SEo7QUQwSEU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtBQ3hISjtBRDJIRTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDRCQUFBO0FDekhKO0FENEhFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtBQzFISjtBRDZIRTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUMzSEo7QUQ4SEU7RUFDRSxVQUFBO0FDNUhKO0FEK0hFO0VBRUUsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSwrQkFBQTtBQzlISiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXIvZGFzaGJvYXJkL2Rhc2hib2FyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtZGFzaGJvYXJkIHtcblxuICBpb24tbWVudS10b2dnbGUge1xuICAgIGlvbi1iYWRnZSB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB0b3A6IDAuMXJlbTtcbiAgICAgIHJpZ2h0OiAyMnB4O1xuXG4gICAgICAvKiYgfiBpb24taWNvbiB7XG4gICAgICAgIG91dGxpbmUtY29sb3I6IHdoaXRlc21va2U7XG4gICAgICB9Ki9cbiAgICAgIHotaW5kZXg6IDU7XG4gICAgfVxuICB9XG5cbiAgaW9uLXNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW46IDQ4JTtcbiAgfVxuXG4vKiAgaW9uLWxpc3QtaGVhZGVyLCBpb24taXRlbSwgaW9uLWNhcmQge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIH0qL1xuXG4gIGlvbi1jYXJkLWhlYWRlciwgaW9uLWNhcmQtY29udGVudCB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICB9XG5cbiAgcCwgaDIge1xuICAgIC8vY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgaW9uLWl0ZW0tZGl2aWRlciB7XG4gICAgbWFyZ2luLXRvcDogM3B4ICFpbXBvcnRhbnQ7XG4gIH1cblxuICAubWVzc2FnZS1jb250YWluZXIge1xuICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICAgIC8vd2lkdGg6IDgwJTtcbiAgfVxuXG4gIC5tZXNzYWdlLWRldGFpbCB7XG4gICAgY29sb3I6IGdyZXk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDEycHg7XG4gICAgbWFyZ2luOiA0cHggMCAwIDA7XG4gIH1cblxuICAucHJvZmlsZS1iYW5uZXIge1xuICAgIHBhZGRpbmc6IDEwcHggMDtcbiAgfVxuXG4gIC5kYXNoYm9hcmQtYmFubmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoJ2Fzc2V0cy9pbWcvb25ib2FyZGluZy0xLmpwZycpO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgbWF4LXdpZHRoOiA2MDBweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxuXG4gIC50cmFuc3BhcmVudCB7XG4gICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmhlYWRlci1zZWFyY2hiYXIge1xuICAgIHdpZHRoOiA1MCU7XG4gIH1cblxuICAuaW1hZ2UtY3JvcHBlciB7XG4gICAgd2lkdGg6IDEyMHB4O1xuICAgIGhlaWdodDogMTIwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgbWFyZ2luOiAyJSBhdXRvIDAgYXV0bztcbiAgfVxuXG4gIC5jdXN0b20tYXZhdGFyIHtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG5cbiAgLnVzZXItbmFtZSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICB9XG5cbiAgLmN1cnJlbnQtZGF0ZS1kaXNwbGF5IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBtYXJnaW4tdG9wOiAzJTtcbiAgfVxuXG4gIC51c2VyLWluZm8ge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLnVzZXItaW5mby1idXR0b25zIHtcbiAgICBtaW4td2lkdGg6IDQwJTtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxuXG4gIC5wcm9maWxlLXRhZyB7XG4gICAgZm9udC1zaXplOiBzbWFsbGVyO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgLS1tYXJnaW4tc3RhcnQ6IDEwcHg7XG4gICAgLS1tYXJnaW4tZW5kOiAxMHB4O1xuICB9XG5cbiAgLmNhbGVuZGFyLWJ1dHRvbnMge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuY2FsZW5kYXItYnV0dG9uIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6IDMwJTtcbiAgfVxuXG4gIC5jYWxlbmRhci1sYWJlbCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLm1vbWVudC1pY29uIHtcbiAgICBtYXgtd2lkdGg6IDIwcHg7XG4gICAgbWFyZ2luOiAwIDVweDtcbiAgfVxuXG4gIC51c2VyLWdvYWwge1xuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBtYXJnaW4tbGVmdDogMiU7XG4gIH1cblxuICAuc2VsZWN0ZWQge1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICB9XG5cbiAgaW9uLWJ1dHRvbiB7XG4gICAgaW9uLWJhZGdlIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMC4xcmVtO1xuICAgICAgcmlnaHQ6IDAuMXJlbTtcblxuICAgICAgJiB+IGlvbi1pY29uIHtcbiAgICAgICAgb3V0bGluZS1jb2xvcjogd2hpdGVzbW9rZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuc2hvcnQtcGFyYWdyYXBoIHtcbiAgICBtYXJnaW4tdG9wOiAzcHg7XG4gICAgbWF4LWhlaWdodDogMzZweDtcbiAgICBsaW5lLWhlaWdodDogMThweDsgLyogSGVpZ2h0IC8gbm8uIG9mIGxpbmVzIHRvIGRpc3BsYXkgKi9cbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLnB1bGwtaGFuZGxlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAtMnB4O1xuICAgIHJpZ2h0OiAtMnB4O1xuICAgIHdpZHRoOiAycHg7XG4gICAgaGVpZ2h0OiA1cHg7XG4gICAgYm9yZGVyOiBzb2xpZCAjZmZhNTM1O1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIH1cblxuICAuY2FsZW5kYXItY29udGFpbmVyIHtcbiAgICB3aWR0aDogODUlO1xuICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgbWFyZ2luOiAxMHB4IGF1dG87XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICB9XG5cbiAgLm1vbnRoLXRpdGxlLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAubW9udGgtdGl0bGUge1xuICAgIHdpZHRoOiBjYWxjKCgxMDAlIC8gNykgKiA1KTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG5cbiAgLmNhbGVuZGFyLWFycm93IHtcbiAgICB3aWR0aDogY2FsYygxMDAlIC8gNyk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAubGVmdCB7XG4gICAgICBmbG9hdDogbGVmdDtcbiAgICB9XG4gICAgLnJpZ2h0IHtcbiAgICAgIGZsb2F0OiByaWdodDtcbiAgICB9XG4gIH1cblxuICAubW9udGh2aWV3LWRheS1oZWFkZXJzIHtcbiAgICB3aWR0aDogY2FsYygxMDAlIC8gNyk7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLm1vbnRodmlldy1lbGVtZW50IHtcbiAgICB3aWR0aDogY2FsYygxMDAlIC8gNyk7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKDEwMCUgLyA5KTtcbiAgfVxuXG4gIC5zZWxlY3RlZC1kYXRlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIH1cblxuICAubW9udGh2aWV3LWVsZW1lbnQgLm1vbnRodmlldy1lbGVtZW50LWNvbnRlbnQge1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAxMHB4KTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDEwcHgpO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBtYXJnaW46IDVweDtcbiAgICBwYWRkaW5nLXRvcDogNXB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgfVxuXG4gIC5wYXN0LWNhbGVuZGFyLWl0ZW0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgfVxuXG4gIC5tb250aHZpZXctZG90LWNvbnRhaW5lciB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgfVxuXG4gIC5tb250aHZpZXctZWxlbWVudC1kb3Qge1xuICAgIGhlaWdodDogNXB4O1xuICAgIHdpZHRoOiA1cHg7XG4gICAgbWFyZ2luOiAwcHggMC41cHggMHB4IDAuNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cblxuICAubGlzdC1jb250YWluZXIge1xuICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gICAgbWF4LWhlaWdodDogNDAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgbWF4LXdpZHRoOiA0MDBweDtcbiAgfVxuXG4gIC5zeXN0ZW0tbWVzc2FnZS1jb250YWluZXIge1xuICAgIG1heC13aWR0aDogNjAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIH1cblxuICAuZmVhdHVyZS10aHVtYm5haWwge1xuICAgIGhlaWdodDogNDBweDtcbiAgICB3aWR0aDogNDBweDtcbiAgfVxuXG4gIC5pdGVtLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBtYXJnaW46IDVweDtcbiAgICBmbG9hdDogbGVmdDtcbiAgfVxuXG4gIC5jdXN0b20tZHJvcGRvd24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgaGVpZ2h0OiAzNCU7XG4gICAgbWFyZ2luLWJvdHRvbTogMSU7XG4gIH1cblxuICAucHJvZmlsZS1zZWN0aW9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cblxuICAuc2VhcmNoYmFyLWNvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgYm9yZGVyLXRvcDogMnB4IHZhcigtLWlvbi1jb2xvci1saWdodCkgc29saWQ7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmltZ0J0biB7XG4gICAgbWFyZ2luLXRvcDogNSU7XG4gIH1cblxuICAuY3VycmVudC1kYXRlIHtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgfVxuXG4gIC5kYXRlLWFuZC1kYXkge1xuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdpZHRoOiAxMCU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1pbi1oZWlnaHQ6IDYwcHg7XG4gIH1cblxuICAuZXZlbnQtaW1nLWRpdiB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHdpZHRoOiAyMCU7XG4gIH1cblxuICAuZXZlbnQtaW1nIHtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgLy9wb3NpdGlvbjogYWJzb2x1dGU7XG4gIH1cblxuICAuZXZlbnQtdHlwZS1pbWcge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYm9yZGVyOiA0cHggd2hpdGUgc29saWQ7XG4gIH1cblxuICAuZGF5LWluLXdlZWt2aWV3IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDE0JTtcbiAgICBtYXJnaW46IDMlIDA7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5uby1ldmVudHMtbm90ZSB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLy9hZGQgRmVhdHVyZXMgbWVudVxuICAjYWRkRmVhdHVyZXMge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBtb3ZlLWRvd247XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW47XG4gICAgbWF4LWhlaWdodDogMTgwcHg7XG4gICAgei1pbmRleDogLTUwO1xuICB9XG5cbiAgQGtleWZyYW1lcyBtb3ZlLWRvd24ge1xuICAgIGZyb20ge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC05MHB4KTtcbiAgICB9XG4gICAgdG8ge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgfVxuXG4gICNzZWFyY2hiYXIge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBtb3ZlLWRvd247XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW47XG4gIH1cblxuICAubW9yZU9wdGlvbnMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjM4LCAyMzgsIDIzOCwgMC41KTtcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xuXG4gICAgLm1vcmVHcmlkIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC50b3BSb3cge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLm9wdGlvbnNjb2wge1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgd2lkdGg6IDEwMCU7XG5cbiAgICAgIC5jb2xlbGVtZW50IHtcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgZGlzcGxheTogdGFibGU7XG4gICAgICAgIG1hcmdpbjogMiUgYXV0bztcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgICAgIGJvcmRlci1jb2xvcjogI2NjY2NjYztcbiAgICAgIH1cblxuICAgICAgLm1vcmVMYWJlbCB7XG4gICAgICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgY29sb3I6ICM5Njk2OTY7XG4gICAgICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5wYWdlUm93IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxNjBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDE0cHg7XG4gIH1cblxuICAuY2lyY2xlT25lIHtcbiAgICBoZWlnaHQ6IDVweDtcbiAgICB3aWR0aDogNXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM5YjliOWI7XG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICBtYXJnaW4tbGVmdDogNDglO1xuICAgIG1hcmdpbi1yaWdodDogMS4zJTtcbiAgfVxuXG4gIC5jaXJjbGVUd28ge1xuICAgIGhlaWdodDogNXB4O1xuICAgIHdpZHRoOiA1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzliOWI5YjtcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIG1hcmdpbi1yaWdodDogNDclO1xuICB9XG5cbiAgI2RhcmtDaWNsZU9uZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRhNGE0YTtcbiAgfVxuXG4gICNkYXJrQ2lyY2xlVHdvIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGE0YTRhO1xuICB9XG5cbiAgLnRvLXRlc3QtY2xpY2sge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbiAgfVxuXG4gIC5wZXJzb24tYXZhdGFyIHtcbiAgICB3aWR0aDogMTAwcHggIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IDEwMHB4ICFpbXBvcnRhbnQ7XG4gIH1cblxuICAucGVyc29uLWNvbnRlbnQge1xuICAgIGhlaWdodDogNzVweDtcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgfVxuXG4gIC5wZXJzb24tY29udGVudC1pdGVtIHtcbiAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICB9XG5cbiAgLnBlcnNvbi1lZGl0LXByb2ZpbGUge1xuICAgIHdpZHRoOiAxODNweDtcbiAgICBoZWlnaHQ6IDI2cHg7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICAgIC8qIGlkZW50aWNhbCB0byBib3ggaGVpZ2h0ICovXG4gICAgZGlzcGxheTogZmxleDtcbiAgfVxuXG4gIC5wZXJzb24tY29udGVudC1sZWZ0IHtcbiAgICAvLyBtYXJnaW46IDhweCAxMi41cHggMjFweCAwO1xuICAgIC8vIHdpZHRoOiA0MCU7XG4gICAgLy8gaGVpZ2h0OiA0NHB4O1xuICAgIC8vIGxpbmUtaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmctbGVmdDogMjVweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgLy8ganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB9XG5cbiAgLnBlcnNvbi1uYW1lIHtcbiAgICB3aWR0aDogMTgzcHg7XG4gICAgaGVpZ2h0OiAyM3B4O1xuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDIzcHg7XG4gIH1cbiAgLnBlcnNvbi1jb250ZW50LWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLWxlZnQ6IDE4cHg7XG4gIH1cblxuICAucGVyc29uLXRpdGxlIHtcbiAgICAvL3dpZHRoOiAxODNweDtcbiAgICBoZWlnaHQ6IDI4cHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgbWFyZ2luOiA4cHggMHB4IDE2cHggMHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFya2dyZXkpO1xuICB9XG5cbiAgLnByb2ZpbGUtcm93IHtcbiAgICBwYWRkaW5nOiA2cHggMDtcbiAgfVxuXG4gIC5wcm9maWxlLWNhcmQge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMCA1cHg7XG4gICAgcGFkZGluZzogMTBweCAwO1xuICB9XG5cbiAgLmNvbnRlbnQtYm9yZGVyIHtcbiAgICBib3JkZXItbGVmdDogMC41cHggc29saWQgIzk3OTc5NztcbiAgfVxuXG4gIC5wZXJzb24tY29udGVudC1yaWdodCB7XG4gICAgcGFkZGluZy1sZWZ0OiAxMi41cHg7XG4gICAgbWFyZ2luOiAxMHB4IDAgMjFweCAwO1xuICAgIHdpZHRoOiA2MCU7XG4gICAgaGVpZ2h0OiA0MnB4O1xuICAgIC8vbWF4LWhlaWdodDogNzJweDtcbiAgICBsaW5lLWhlaWdodDogMTRweDsgLyogSGVpZ2h0IC8gbm8uIG9mIGxpbmVzIHRvIGRpc3BsYXkgKi9cbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmtncmV5KTtcbiAgfVxuXG4gIC5zZWN0aW9uIHtcbiAgICAtLW1pbi1oZWlnaHQ6IDI2cHg7XG4gICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblxuICAgIC5zZWN0aW9uLWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICB9XG4gIH1cblxuICAuc2VjdGlvbi1jYXJkIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAucHJvZ3JhbS1zbGlkZXMge1xuICAgIHBhZGRpbmc6IDEwcHggMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxuXG4gIC5wcm9ncmFtLXNsaWRlIHtcbiAgICB3aWR0aDogMTUwcHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5wcm9ncmFtLWNhcmQge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBvYmplY3QtZml0OiBjb250YWluO1xuICAgIG1hcmdpbjogMCAzJTtcbiAgfVxuXG4gIC5ncmlkLXByb2dyYW0tY2FyZCB7XG4gICAgd2lkdGg6IDEzM3B4O1xuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgbWFyZ2luOiAwIDMlO1xuICB9XG5cbiAgLnByb2dyYW0tcGhvdG8tY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgLy9ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgLy9tYXJnaW46IDUlIGF1dG87XG4gIH1cblxuICAucHJvZ3JhbS1waG90byB7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC8vb3BhY2l0eTogNTAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgLy9tYXgtaGVpZ2h0OiAyMDBweDtcbiAgfVxuXG4gIC5wcm9ncmFtLW5hbWUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDIlO1xuICAgIGxlZnQ6IDIlO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHotaW5kZXg6IDE1O1xuICB9XG5cbiAgLm1vYmlsZS1jYXJkIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgLnJlbGF0aW9uc2hpcC1zbGlkZSB7XG4gICAgbWF4LXdpZHRoOiAxMzBweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbiAgfVxuXG4gIC5yZWxhdGlvbnNoaXAtY2FyZCB7XG4gICAgaGVpZ2h0OiAxNDZweDtcbiAgICB3aWR0aDogMTIwcHg7XG4gICAgbWFyZ2luOiAwIDMlO1xuICB9XG5cbiAgLnJlbGF0aW9uc2hpcC1waG90by1jb250YWluZXIge1xuICAgIGhlaWdodDogODRweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxuXG4gIC5yZWxhdGlvbnNoaXAtYXZhdGFyIHtcbiAgICAucmVsYXRpb25zaGlwLXBob3RvIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG5cbiAgICAucmVsYXRpb25zaGlwLXBob3RvLmJvcmRlciB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICAgIH1cbiAgfVxuXG4gIC5yZWxhdGlvbnNoaXAtbmFtZS1jb250YWluZXIge1xuICAgIGhlaWdodDogMjBweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLnJlbGF0aW9uc2hpcC1uYW1lLWNvbnRhaW5lci50b3Age1xuICAgIGhlaWdodDogMzJweDtcbiAgICBtYXJnaW4tdG9wOiAycHg7XG4gIH1cblxuICAucmVsYXRpb25zaGlwLW5hbWUge1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsaW5lLWhlaWdodDogMTZweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxuXG4gIC5yZWxhdGlvbnNoaXAtZGVzY3JpcHRpb24ge1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBsaW5lLWhlaWdodDogMTJweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxuXG4gIC5kZXNrdG9wLWNvbnRlbnQge1xuICAgIHBhZGRpbmctbGVmdDogNXB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcbiAgfVxuXG4gIC5jb250ZW50LWNvbnRhaW5lciB7XG4gICAgbWFyZ2luOiA1cHggYXV0bztcbiAgICBtYXgtd2lkdGg6IDkzNnB4O1xuICB9XG5cbiAgLmNvbnRlbnQtZ3JpZCB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIC5jb21wbGV0ZWRfcGVyY2VudGFnZSB7XG4gICAgLy93aWR0aDogNDBweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBsaW5lLWhlaWdodDogMjFweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWJ1dHRvbjEpO1xuICB9XG59XG4iLCJhcHAtZGFzaGJvYXJkIHtcbiAgLyogIGlvbi1saXN0LWhlYWRlciwgaW9uLWl0ZW0sIGlvbi1jYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgfSovXG59XG5hcHAtZGFzaGJvYXJkIGlvbi1tZW51LXRvZ2dsZSBpb24tYmFkZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogMC4xcmVtO1xuICByaWdodDogMjJweDtcbiAgLyomIH4gaW9uLWljb24ge1xuICAgIG91dGxpbmUtY29sb3I6IHdoaXRlc21va2U7XG4gIH0qL1xuICB6LWluZGV4OiA1O1xufVxuYXBwLWRhc2hib2FyZCBpb24tc3Bpbm5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWFyZ2luOiA0OCU7XG59XG5hcHAtZGFzaGJvYXJkIGlvbi1jYXJkLWhlYWRlciwgYXBwLWRhc2hib2FyZCBpb24tY2FyZC1jb250ZW50IHtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuYXBwLWRhc2hib2FyZCBpb24taXRlbS1kaXZpZGVyIHtcbiAgbWFyZ2luLXRvcDogM3B4ICFpbXBvcnRhbnQ7XG59XG5hcHAtZGFzaGJvYXJkIC5tZXNzYWdlLWNvbnRhaW5lciB7XG4gIG1hcmdpbi1sZWZ0OiAxNnB4O1xufVxuYXBwLWRhc2hib2FyZCAubWVzc2FnZS1kZXRhaWwge1xuICBjb2xvcjogZ3JleTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBsaW5lLWhlaWdodDogMTJweDtcbiAgbWFyZ2luOiA0cHggMCAwIDA7XG59XG5hcHAtZGFzaGJvYXJkIC5wcm9maWxlLWJhbm5lciB7XG4gIHBhZGRpbmc6IDEwcHggMDtcbn1cbmFwcC1kYXNoYm9hcmQgLmRhc2hib2FyZC1iYW5uZXIge1xuICBiYWNrZ3JvdW5kOiB1cmwoXCJhc3NldHMvaW1nL29uYm9hcmRpbmctMS5qcGdcIik7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIG1heC13aWR0aDogNjAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuYXBwLWRhc2hib2FyZCAudHJhbnNwYXJlbnQge1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG59XG5hcHAtZGFzaGJvYXJkIC5oZWFkZXItc2VhcmNoYmFyIHtcbiAgd2lkdGg6IDUwJTtcbn1cbmFwcC1kYXNoYm9hcmQgLmltYWdlLWNyb3BwZXIge1xuICB3aWR0aDogMTIwcHg7XG4gIGhlaWdodDogMTIwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgbWFyZ2luOiAyJSBhdXRvIDAgYXV0bztcbn1cbmFwcC1kYXNoYm9hcmQgLmN1c3RvbS1hdmF0YXIge1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuYXBwLWRhc2hib2FyZCAudXNlci1uYW1lIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IGxhcmdlO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xufVxuYXBwLWRhc2hib2FyZCAuY3VycmVudC1kYXRlLWRpc3BsYXkge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgbWFyZ2luLXRvcDogMyU7XG59XG5hcHAtZGFzaGJvYXJkIC51c2VyLWluZm8ge1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1kYXNoYm9hcmQgLnVzZXItaW5mby1idXR0b25zIHtcbiAgbWluLXdpZHRoOiA0MCU7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuYXBwLWRhc2hib2FyZCAucHJvZmlsZS10YWcge1xuICBmb250LXNpemU6IHNtYWxsZXI7XG4gIGNvbG9yOiBibGFjaztcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAtLW1hcmdpbi1zdGFydDogMTBweDtcbiAgLS1tYXJnaW4tZW5kOiAxMHB4O1xufVxuYXBwLWRhc2hib2FyZCAuY2FsZW5kYXItYnV0dG9ucyB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWRhc2hib2FyZCAuY2FsZW5kYXItYnV0dG9uIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMzAlO1xufVxuYXBwLWRhc2hib2FyZCAuY2FsZW5kYXItbGFiZWwge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5hcHAtZGFzaGJvYXJkIC5tb21lbnQtaWNvbiB7XG4gIG1heC13aWR0aDogMjBweDtcbiAgbWFyZ2luOiAwIDVweDtcbn1cbmFwcC1kYXNoYm9hcmQgLnVzZXItZ29hbCB7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gIG1hcmdpbi1sZWZ0OiAyJTtcbn1cbmFwcC1kYXNoYm9hcmQgLnNlbGVjdGVkIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5hcHAtZGFzaGJvYXJkIGlvbi1idXR0b24gaW9uLWJhZGdlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDAuMXJlbTtcbiAgcmlnaHQ6IDAuMXJlbTtcbn1cbmFwcC1kYXNoYm9hcmQgaW9uLWJ1dHRvbiBpb24tYmFkZ2UgfiBpb24taWNvbiB7XG4gIG91dGxpbmUtY29sb3I6IHdoaXRlc21va2U7XG59XG5hcHAtZGFzaGJvYXJkIC5zaG9ydC1wYXJhZ3JhcGgge1xuICBtYXJnaW4tdG9wOiAzcHg7XG4gIG1heC1oZWlnaHQ6IDM2cHg7XG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAvKiBIZWlnaHQgLyBuby4gb2YgbGluZXMgdG8gZGlzcGxheSAqL1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuYXBwLWRhc2hib2FyZCAucHVsbC1oYW5kbGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogLTJweDtcbiAgcmlnaHQ6IC0ycHg7XG4gIHdpZHRoOiAycHg7XG4gIGhlaWdodDogNXB4O1xuICBib3JkZXI6IHNvbGlkICNmZmE1MzU7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG59XG5hcHAtZGFzaGJvYXJkIC5jYWxlbmRhci1jb250YWluZXIge1xuICB3aWR0aDogODUlO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xuICBtYXJnaW46IDEwcHggYXV0bztcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbn1cbmFwcC1kYXNoYm9hcmQgLm1vbnRoLXRpdGxlLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWRhc2hib2FyZCAubW9udGgtdGl0bGUge1xuICB3aWR0aDogY2FsYygoMTAwJSAvIDcpICogNSk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuYXBwLWRhc2hib2FyZCAuY2FsZW5kYXItYXJyb3cge1xuICB3aWR0aDogY2FsYygxMDAlIC8gNyk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuYXBwLWRhc2hib2FyZCAuY2FsZW5kYXItYXJyb3cgLmxlZnQge1xuICBmbG9hdDogbGVmdDtcbn1cbmFwcC1kYXNoYm9hcmQgLmNhbGVuZGFyLWFycm93IC5yaWdodCB7XG4gIGZsb2F0OiByaWdodDtcbn1cbmFwcC1kYXNoYm9hcmQgLm1vbnRodmlldy1kYXktaGVhZGVycyB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLyA3KTtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuYXBwLWRhc2hib2FyZCAubW9udGh2aWV3LWVsZW1lbnQge1xuICB3aWR0aDogY2FsYygxMDAlIC8gNyk7XG4gIGZsb2F0OiBsZWZ0O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmctYm90dG9tOiBjYWxjKDEwMCUgLyA5KTtcbn1cbmFwcC1kYXNoYm9hcmQgLnNlbGVjdGVkLWRhdGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuYXBwLWRhc2hib2FyZCAubW9udGh2aWV3LWVsZW1lbnQgLm1vbnRodmlldy1lbGVtZW50LWNvbnRlbnQge1xuICB3aWR0aDogY2FsYygxMDAlIC0gMTBweCk7XG4gIGhlaWdodDogY2FsYygxMDAlIC0gMTBweCk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiA1cHg7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cbmFwcC1kYXNoYm9hcmQgLnBhc3QtY2FsZW5kYXItaXRlbSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbn1cbmFwcC1kYXNoYm9hcmQgLm1vbnRodmlldy1kb3QtY29udGFpbmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5hcHAtZGFzaGJvYXJkIC5tb250aHZpZXctZWxlbWVudC1kb3Qge1xuICBoZWlnaHQ6IDVweDtcbiAgd2lkdGg6IDVweDtcbiAgbWFyZ2luOiAwcHggMC41cHggMHB4IDAuNXB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cbmFwcC1kYXNoYm9hcmQgLmxpc3QtY29udGFpbmVyIHtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgbWF4LWhlaWdodDogNDAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xufVxuYXBwLWRhc2hib2FyZCAuc3lzdGVtLW1lc3NhZ2UtY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiA2MDBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5hcHAtZGFzaGJvYXJkIC5mZWF0dXJlLXRodW1ibmFpbCB7XG4gIGhlaWdodDogNDBweDtcbiAgd2lkdGg6IDQwcHg7XG59XG5hcHAtZGFzaGJvYXJkIC5pdGVtLWNvbnRhaW5lciB7XG4gIHdpZHRoOiA2MCU7XG4gIG1hcmdpbjogNXB4O1xuICBmbG9hdDogbGVmdDtcbn1cbmFwcC1kYXNoYm9hcmQgLmN1c3RvbS1kcm9wZG93biB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgY29sb3I6IHdoaXRlO1xuICBoZWlnaHQ6IDM0JTtcbiAgbWFyZ2luLWJvdHRvbTogMSU7XG59XG5hcHAtZGFzaGJvYXJkIC5wcm9maWxlLXNlY3Rpb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG59XG5hcHAtZGFzaGJvYXJkIC5zZWFyY2hiYXItY292ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGJvcmRlci10b3A6IDJweCB2YXIoLS1pb24tY29sb3ItbGlnaHQpIHNvbGlkO1xuICBoZWlnaHQ6IDUwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWRhc2hib2FyZCAuaW1nQnRuIHtcbiAgbWFyZ2luLXRvcDogNSU7XG59XG5hcHAtZGFzaGJvYXJkIC5jdXJyZW50LWRhdGUge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbmFwcC1kYXNoYm9hcmQgLmRhdGUtYW5kLWRheSB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtaW4taGVpZ2h0OiA2MHB4O1xufVxuYXBwLWRhc2hib2FyZCAuZXZlbnQtaW1nLWRpdiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDIwJTtcbn1cbmFwcC1kYXNoYm9hcmQgLmV2ZW50LWltZyB7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbmFwcC1kYXNoYm9hcmQgLmV2ZW50LXR5cGUtaW1nIHtcbiAgaGVpZ2h0OiAxMHB4O1xuICB3aWR0aDogMTBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3JkZXI6IDRweCB3aGl0ZSBzb2xpZDtcbn1cbmFwcC1kYXNoYm9hcmQgLmRheS1pbi13ZWVrdmlldyB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDE0JTtcbiAgbWFyZ2luOiAzJSAwO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmFwcC1kYXNoYm9hcmQgLm5vLWV2ZW50cy1ub3RlIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IGxhcmdlO1xuICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xufVxuYXBwLWRhc2hib2FyZCAjYWRkRmVhdHVyZXMge1xuICBhbmltYXRpb24tbmFtZTogbW92ZS1kb3duO1xuICBhbmltYXRpb24tZHVyYXRpb246IDAuNXM7XG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW47XG4gIG1heC1oZWlnaHQ6IDE4MHB4O1xuICB6LWluZGV4OiAtNTA7XG59XG5Aa2V5ZnJhbWVzIG1vdmUtZG93biB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtOTBweCk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuYXBwLWRhc2hib2FyZCAjc2VhcmNoYmFyIHtcbiAgYW5pbWF0aW9uLW5hbWU6IG1vdmUtZG93bjtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluO1xufVxuYXBwLWRhc2hib2FyZCAubW9yZU9wdGlvbnMge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzgsIDIzOCwgMjM4LCAwLjUpO1xuICBvdmVyZmxvdzogc2Nyb2xsO1xufVxuYXBwLWRhc2hib2FyZCAubW9yZU9wdGlvbnMgLm1vcmVHcmlkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZGFzaGJvYXJkIC5tb3JlT3B0aW9ucyAudG9wUm93IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZGFzaGJvYXJkIC5tb3JlT3B0aW9ucyAub3B0aW9uc2NvbCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZGFzaGJvYXJkIC5tb3JlT3B0aW9ucyAub3B0aW9uc2NvbCAuY29sZWxlbWVudCB7XG4gIGhlaWdodDogNTBweDtcbiAgd2lkdGg6IDUwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGRpc3BsYXk6IHRhYmxlO1xuICBtYXJnaW46IDIlIGF1dG87XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBib3JkZXItY29sb3I6ICNjY2NjY2M7XG59XG5hcHAtZGFzaGJvYXJkIC5tb3JlT3B0aW9ucyAub3B0aW9uc2NvbCAubW9yZUxhYmVsIHtcbiAgZGlzcGxheTogdGFibGU7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBjb2xvcjogIzk2OTY5NjtcbiAgZm9udC1zaXplOiBtZWRpdW07XG59XG5hcHAtZGFzaGJvYXJkIC5wYWdlUm93IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDE2MHB4O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxNHB4O1xufVxuYXBwLWRhc2hib2FyZCAuY2lyY2xlT25lIHtcbiAgaGVpZ2h0OiA1cHg7XG4gIHdpZHRoOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5YjliOWI7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gIG1hcmdpbi1sZWZ0OiA0OCU7XG4gIG1hcmdpbi1yaWdodDogMS4zJTtcbn1cbmFwcC1kYXNoYm9hcmQgLmNpcmNsZVR3byB7XG4gIGhlaWdodDogNXB4O1xuICB3aWR0aDogNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWI5YjliO1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICBtYXJnaW4tbGVmdDogMDtcbiAgbWFyZ2luLXJpZ2h0OiA0NyU7XG59XG5hcHAtZGFzaGJvYXJkICNkYXJrQ2ljbGVPbmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGE0YTRhO1xufVxuYXBwLWRhc2hib2FyZCAjZGFya0NpcmNsZVR3byB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0YTRhNGE7XG59XG5hcHAtZGFzaGJvYXJkIC50by10ZXN0LWNsaWNrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuYXBwLWRhc2hib2FyZCAucGVyc29uLWF2YXRhciB7XG4gIHdpZHRoOiAxMDBweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEwMHB4ICFpbXBvcnRhbnQ7XG59XG5hcHAtZGFzaGJvYXJkIC5wZXJzb24tY29udGVudCB7XG4gIGhlaWdodDogNzVweDtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xufVxuYXBwLWRhc2hib2FyZCAucGVyc29uLWNvbnRlbnQtaXRlbSB7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG5hcHAtZGFzaGJvYXJkIC5wZXJzb24tZWRpdC1wcm9maWxlIHtcbiAgd2lkdGg6IDE4M3B4O1xuICBoZWlnaHQ6IDI2cHg7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBsaW5lLWhlaWdodDogMTRweDtcbiAgLyogaWRlbnRpY2FsIHRvIGJveCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbn1cbmFwcC1kYXNoYm9hcmQgLnBlcnNvbi1jb250ZW50LWxlZnQge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZy1sZWZ0OiAyNXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuYXBwLWRhc2hib2FyZCAucGVyc29uLW5hbWUge1xuICB3aWR0aDogMTgzcHg7XG4gIGhlaWdodDogMjNweDtcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBsaW5lLWhlaWdodDogMjNweDtcbn1cbmFwcC1kYXNoYm9hcmQgLnBlcnNvbi1jb250ZW50LWNvbnRhaW5lciB7XG4gIG1hcmdpbi1sZWZ0OiAxOHB4O1xufVxuYXBwLWRhc2hib2FyZCAucGVyc29uLXRpdGxlIHtcbiAgaGVpZ2h0OiAyOHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW46IDhweCAwcHggMTZweCAwcHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFya2dyZXkpO1xufVxuYXBwLWRhc2hib2FyZCAucHJvZmlsZS1yb3cge1xuICBwYWRkaW5nOiA2cHggMDtcbn1cbmFwcC1kYXNoYm9hcmQgLnByb2ZpbGUtY2FyZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDAgNXB4O1xuICBwYWRkaW5nOiAxMHB4IDA7XG59XG5hcHAtZGFzaGJvYXJkIC5jb250ZW50LWJvcmRlciB7XG4gIGJvcmRlci1sZWZ0OiAwLjVweCBzb2xpZCAjOTc5Nzk3O1xufVxuYXBwLWRhc2hib2FyZCAucGVyc29uLWNvbnRlbnQtcmlnaHQge1xuICBwYWRkaW5nLWxlZnQ6IDEyLjVweDtcbiAgbWFyZ2luOiAxMHB4IDAgMjFweCAwO1xuICB3aWR0aDogNjAlO1xuICBoZWlnaHQ6IDQycHg7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICAvKiBIZWlnaHQgLyBuby4gb2YgbGluZXMgdG8gZGlzcGxheSAqL1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFya2dyZXkpO1xufVxuYXBwLWRhc2hib2FyZCAuc2VjdGlvbiB7XG4gIC0tbWluLWhlaWdodDogMjZweDtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbmFwcC1kYXNoYm9hcmQgLnNlY3Rpb24gLnNlY3Rpb24tbGFiZWwge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5hcHAtZGFzaGJvYXJkIC5zZWN0aW9uLWNhcmQge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5hcHAtZGFzaGJvYXJkIC5wcm9ncmFtLXNsaWRlcyB7XG4gIHBhZGRpbmc6IDEwcHggMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5hcHAtZGFzaGJvYXJkIC5wcm9ncmFtLXNsaWRlIHtcbiAgd2lkdGg6IDE1MHB4ICFpbXBvcnRhbnQ7XG59XG5hcHAtZGFzaGJvYXJkIC5wcm9ncmFtLWNhcmQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICBtYXJnaW46IDAgMyU7XG59XG5hcHAtZGFzaGJvYXJkIC5ncmlkLXByb2dyYW0tY2FyZCB7XG4gIHdpZHRoOiAxMzNweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWFyZ2luOiAwIDMlO1xufVxuYXBwLWRhc2hib2FyZCAucHJvZ3JhbS1waG90by1jb250YWluZXIge1xuICBoZWlnaHQ6IDEwMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuYXBwLWRhc2hib2FyZCAucHJvZ3JhbS1waG90byB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogYXV0bztcbiAgZGlzcGxheTogYmxvY2s7XG59XG5hcHAtZGFzaGJvYXJkIC5wcm9ncmFtLW5hbWUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMiU7XG4gIGxlZnQ6IDIlO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB6LWluZGV4OiAxNTtcbn1cbmFwcC1kYXNoYm9hcmQgLm1vYmlsZS1jYXJkIHtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgbWFyZ2luOiAwO1xufVxuYXBwLWRhc2hib2FyZCAucmVsYXRpb25zaGlwLXNsaWRlIHtcbiAgbWF4LXdpZHRoOiAxMzBweDtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5hcHAtZGFzaGJvYXJkIC5yZWxhdGlvbnNoaXAtY2FyZCB7XG4gIGhlaWdodDogMTQ2cHg7XG4gIHdpZHRoOiAxMjBweDtcbiAgbWFyZ2luOiAwIDMlO1xufVxuYXBwLWRhc2hib2FyZCAucmVsYXRpb25zaGlwLXBob3RvLWNvbnRhaW5lciB7XG4gIGhlaWdodDogODRweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5hcHAtZGFzaGJvYXJkIC5yZWxhdGlvbnNoaXAtYXZhdGFyIC5yZWxhdGlvbnNoaXAtcGhvdG8ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbmFwcC1kYXNoYm9hcmQgLnJlbGF0aW9uc2hpcC1hdmF0YXIgLnJlbGF0aW9uc2hpcC1waG90by5ib3JkZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgYm94LXNoYWRvdzogMCAycHggNnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG59XG5hcHAtZGFzaGJvYXJkIC5yZWxhdGlvbnNoaXAtbmFtZS1jb250YWluZXIge1xuICBoZWlnaHQ6IDIwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5hcHAtZGFzaGJvYXJkIC5yZWxhdGlvbnNoaXAtbmFtZS1jb250YWluZXIudG9wIHtcbiAgaGVpZ2h0OiAzMnB4O1xuICBtYXJnaW4tdG9wOiAycHg7XG59XG5hcHAtZGFzaGJvYXJkIC5yZWxhdGlvbnNoaXAtbmFtZSB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xufVxuYXBwLWRhc2hib2FyZCAucmVsYXRpb25zaGlwLWRlc2NyaXB0aW9uIHtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG59XG5hcHAtZGFzaGJvYXJkIC5kZXNrdG9wLWNvbnRlbnQge1xuICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgcGFkZGluZy1yaWdodDogNXB4O1xufVxuYXBwLWRhc2hib2FyZCAuY29udGVudC1jb250YWluZXIge1xuICBtYXJnaW46IDVweCBhdXRvO1xuICBtYXgtd2lkdGg6IDkzNnB4O1xufVxuYXBwLWRhc2hib2FyZCAuY29udGVudC1ncmlkIHtcbiAgcGFkZGluZzogMDtcbn1cbmFwcC1kYXNoYm9hcmQgLmNvbXBsZXRlZF9wZXJjZW50YWdlIHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBsaW5lLWhlaWdodDogMjFweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1idXR0b24xKTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/user/dashboard/dashboard.page.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/user/dashboard/dashboard.page.ts ***!
  \********************************************************/
/*! exports provided: DashboardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPage", function() { return DashboardPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_calendar_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/calendar.service */ "./src/app/services/calendar.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _community_listmycommunities_listmycommunities_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../community/listmycommunities/listmycommunities.page */ "./src/app/pages/community/listmycommunities/listmycommunities.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_network_service_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/network-service.service */ "./src/app/services/network-service.service.ts");
/* harmony import */ var _about_about_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../about/about.page */ "./src/app/pages/user/about/about.page.ts");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../feature/pickfeature-popover/pickfeature-popover.page */ "./src/app/pages/feature/pickfeature-popover/pickfeature-popover.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __values = (undefined && undefined.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};















var DashboardPage = /** @class */ (function () {
    function DashboardPage(router, route, platform, cache, storage, alertCtrl, popoverCtrl, loadingCtrl, navCtrl, modalCtrl, userData, authService, calendarService, networkService, chatService, momentService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.platform = platform;
        this.cache = cache;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.authService = authService;
        this.calendarService = calendarService;
        this.networkService = networkService;
        this.chatService = chatService;
        this.momentService = momentService;
        this.pendingNotifications = [];
        this.numberOfNotifications = 0;
        this.noSystemMessage = true;
        this.searchKeyword = '';
        this.slide = 0;
        this.ionSpinner = true;
        this.moreOptions = false;
        this.subscriptions = {};
        this.refreshDashboardPageHandler = function () {
            if (_this.userData && _this.userData.user) {
                _this.setup();
            }
        };
        this.calendarService.updateViewCalendar();
    }
    DashboardPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // link the refreshUserStatus Observable with the refresh handler. It fires on subsequent user refreshes
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshDashboardPageHandler);
                this.view = this.view || this.route.snapshot.paramMap.get('view') || 'profile';
                return [2 /*return*/];
            });
        });
    };
    DashboardPage.prototype.ionViewWillEnter = function () {
        // after loading userData from storage, userData should be ready
        if (this.userData && this.userData.user) {
            this.ionSpinner = false;
            this.setup();
        }
        var currentDateWithoutTime = new Date(this.calendarService.calendar.currentDate.getFullYear(), this.calendarService.calendar.currentDate.getMonth(), this.calendarService.calendar.currentDate.getDate());
        this.changeSelectedDate(currentDateWithoutTime);
    };
    DashboardPage.prototype.setup = function () {
        var _this = this;
        if (this.view === 'profile') {
            this.loadAnswers();
            this.loadPrograms();
        }
        else if (this.view === 'calendar') {
            this.loadDashboard();
        }
        var userRequest = this.userData.loadMySystemMessages();
        var userResponse = this.cache.loadFromDelayedObservable('loadMySystemMessages', userRequest, 'system', 1, 'all');
        userResponse.subscribe(function (pendingNotifications) {
            _this.ionSpinner = false;
            _this.numberOfNotifications = pendingNotifications.length;
            _this.pendingNotifications = pendingNotifications;
            _this.noSystemMessage = !_this.numberOfNotifications;
        });
    };
    DashboardPage.prototype.loadAnswers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, result, _c, _d, program, _e, _f, leader;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.userData.loadMyOnboardingAnswers()];
                    case 1:
                        result = _g.sent();
                        this.ionSpinner = false;
                        if (result.programs) {
                            try {
                                for (_c = __values(result.programs), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    program = _d.value;
                                    try {
                                        for (_e = __values(program.leader), _f = _e.next(); !_f.done; _f = _e.next()) {
                                            leader = _f.value;
                                            if (leader.role) {
                                                this.userData.user.title = leader.role;
                                            }
                                            if (leader._id === 1570150762856667 && leader.user_answer.length) {
                                                this.userData.user.bio = leader.user_answer[0];
                                            }
                                        }
                                    }
                                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                    finally {
                                        try {
                                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.openAboutMe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.platform.width() >= 768)) return [3 /*break*/, 1];
                        this.router.navigate(['/app/user/about']);
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.modalCtrl.create({ component: _about_about_page__WEBPACK_IMPORTED_MODULE_11__["AboutPage"], componentProps: { modalPage: true } })];
                    case 2:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 4:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.loadAnswers();
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.loadDashboard = function () {
        this.pendingNotifications = [];
    };
    DashboardPage.prototype.handleSystemMessages = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, _b, _c, pendingNotification, e_3_1, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 11, , 12]);
                        // check push notification settings
                        this.userData.checkPushNotification();
                        if (!(action === 'accept')) return [3 /*break*/, 8];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _b = __values(this.pendingNotifications), _c = _b.next();
                        _d.label = 2;
                    case 2:
                        if (!!_c.done) return [3 /*break*/, 5];
                        pendingNotification = _c.value;
                        return [4 /*yield*/, this.processPendingMessage(pendingNotification)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _c = _b.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_3_1 = _d.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 8: return [4 /*yield*/, this.userData.removePendingMessages({ messages: this.pendingNotifications })];
                    case 9:
                        _d.sent();
                        this.pendingNotifications = [];
                        this.numberOfNotifications = 0;
                        this.noSystemMessage = true;
                        return [4 /*yield*/, this.userData.load()];
                    case 10:
                        _d.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        err_1 = _d.sent();
                        console.log(err_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.processPendingMessage = function (pendingNotification) {
        return __awaiter(this, void 0, void 0, function () {
            var data, welcomeMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!pendingNotification.community) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.joinCommunityHttp(pendingNotification.community)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        if (!pendingNotification.group) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userData.acceptJoinGroupRequest(pendingNotification.group)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 4:
                        if (!pendingNotification.person) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.chatService.getConversationByRecipientId(pendingNotification.person._id, false, null)];
                    case 5:
                        data = _a.sent();
                        if (!!data.length) return [3 /*break*/, 7];
                        welcomeMessage = this.userData.user.first_name + " " + this.userData.user.last_name + " is now connected with you.";
                        return [4 /*yield*/, this.chatService.newConversation(pendingNotification.person._id, { composedMessage: welcomeMessage, type: "connect" })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.viewMessage = function (event, pendingNotification) {
        return __awaiter(this, void 0, void 0, function () {
            var alert_1, alert_2, alert_3, alert_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!pendingNotification.community) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: "Invitation to join " + pendingNotification.community.name,
                                message: pendingNotification.message,
                                buttons: [{ text: 'Accept',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var result;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.userData.joinCommunity(pendingNotification.community)];
                                                        case 1:
                                                            result = _a.sent();
                                                            if (result === "cancel") {
                                                                return [2 /*return*/];
                                                            }
                                                            this.cache.clearGroup("system");
                                                            this.loadDashboard();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } }, { text: 'Ignore',
                                        handler: function () {
                                            //console.log("Removing pending message...");
                                            _this.removePendingMessage(pendingNotification);
                                        } }, { text: 'Cancel' }],
                                cssClass: 'level-15'
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!pendingNotification.group) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: "Invitation to join " + pendingNotification.group.name,
                                message: pendingNotification.message,
                                buttons: [{ text: 'Accept',
                                        handler: function () {
                                            var navTransition = alert_2.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var result, churchIdList, index;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.userData.checkPushNotification()];
                                                        case 1:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.userData.acceptJoinGroupRequest(pendingNotification.group)];
                                                        case 2:
                                                            result = _a.sent();
                                                            if (result === "cancel") {
                                                                return [2 /*return*/];
                                                            }
                                                            this.cache.clearGroup("system");
                                                            this.loadDashboard();
                                                            if (result['churchId']) {
                                                                churchIdList = this.userData.user.churches.map(function (c) {
                                                                    return c._id;
                                                                });
                                                                index = churchIdList.indexOf(result['churchId']);
                                                                if (index < 0) {
                                                                    index = this.userData.user.churches.length;
                                                                }
                                                                this.userData.currentCommunityIndex = index;
                                                                this.storage.set('currentCommunityIndex', this.userData.currentCommunityIndex.toString()); // store this for the next time the app starts up
                                                            }
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } }, { text: 'Ignore',
                                        handler: function () {
                                            //console.log("Removing pending message...");
                                            _this.removePendingMessage(pendingNotification);
                                        } }, { text: 'Cancel' }],
                                cssClass: 'level-15'
                            })];
                    case 4:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        if (!pendingNotification.person) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: "Connect with " + pendingNotification.person.first_name + " " + pendingNotification.person.last_name,
                                message: pendingNotification.message,
                                buttons: [{ text: 'Connect',
                                        handler: function () {
                                            var navTransition = alert_3.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var data, alert2, welcomeMessage;
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.chatService.getConversationByRecipientId(pendingNotification.person._id, false, null)];
                                                        case 1:
                                                            data = _a.sent();
                                                            if (!data.length) return [3 /*break*/, 4];
                                                            return [4 /*yield*/, this.alertCtrl.create({
                                                                    header: "You are already connected with this user",
                                                                    message: "You can direct message with this user in the Conversations page.",
                                                                    cssClass: 'level-15',
                                                                    buttons: [{ text: 'Dismiss',
                                                                            handler: function () {
                                                                                //console.log("Removing pending message...");
                                                                                _this.removePendingMessage(pendingNotification);
                                                                            }
                                                                        }]
                                                                })];
                                                        case 2:
                                                            alert2 = _a.sent();
                                                            return [4 /*yield*/, alert2.present()];
                                                        case 3:
                                                            _a.sent();
                                                            return [3 /*break*/, 7];
                                                        case 4: 
                                                        //console.log("new conversation...");
                                                        return [4 /*yield*/, this.userData.checkPushNotification()];
                                                        case 5:
                                                            //console.log("new conversation...");
                                                            _a.sent();
                                                            welcomeMessage = this.userData.user.first_name + " " + this.userData.user.last_name + " is now connected with you.";
                                                            return [4 /*yield*/, this.chatService.newConversation(pendingNotification.person._id, { composedMessage: welcomeMessage, type: "connect" })];
                                                        case 6:
                                                            _a.sent();
                                                            this.removePendingMessage(pendingNotification);
                                                            _a.label = 7;
                                                        case 7: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } }, { text: 'Ignore',
                                        handler: function () {
                                            console.log("Removing pending message...");
                                            _this.removePendingMessage(pendingNotification);
                                        } }, { text: 'Cancel' }],
                                cssClass: 'level-15'
                            })];
                    case 7:
                        alert_3 = _a.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 8: return [2 /*return*/, _a.sent()];
                    case 9: return [4 /*yield*/, this.alertCtrl.create({
                            header: "System Message",
                            message: pendingNotification.message,
                            buttons: [{ text: 'OK, delete message.',
                                    handler: function () {
                                        _this.removePendingMessage(pendingNotification);
                                    } }, { text: 'Cancel' }],
                            cssClass: 'level-15'
                        })];
                    case 10:
                        alert_4 = _a.sent();
                        return [4 /*yield*/, alert_4.present()];
                    case 11: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DashboardPage.prototype.removePendingMessage = function (pendingNotification) {
        return __awaiter(this, void 0, void 0, function () {
            var index, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userData.removePendingMessages({ messages: [pendingNotification] })];
                    case 1:
                        _a.sent();
                        index = this.pendingNotifications.indexOf(pendingNotification);
                        if (index > -1) {
                            this.pendingNotifications.splice(index, 1);
                        }
                        if (!this.pendingNotifications.length) {
                            this.noSystemMessage = true;
                        }
                        this.cache.clearGroup("system");
                        this.numberOfNotifications--;
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.updateUserProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert_5, err_3, alert_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 7]);
                        return [4 /*yield*/, this.userData.update(this.userData.user)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                message: 'User profile updated.',
                                buttons: [{ text: 'Ok' }],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        alert_5 = _a.sent();
                        return [4 /*yield*/, alert_5.present()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Something Went Wrong',
                                message: 'We are unable to save your profile. Please try again.',
                                buttons: [{ text: 'Ok' }],
                                cssClass: 'level-15'
                            })];
                    case 5:
                        alert_6 = _a.sent();
                        return [4 /*yield*/, alert_6.present()];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.clickCommunities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listMyCommunityModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _community_listmycommunities_listmycommunities_page__WEBPACK_IMPORTED_MODULE_8__["ListmycommunitiesPage"] })];
                    case 1:
                        listMyCommunityModal = _a.sent();
                        return [4 /*yield*/, listMyCommunityModal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
        async slideChange(event){
            event.stopPropagation();
            this.slide = await this.slides.getActiveIndex();
        }*/
    DashboardPage.prototype.changeSelectedDate = function (inputDate) {
        if (inputDate === ' ')
            return;
        this.calendarService.calendar.selectedDate = inputDate;
        this.calendarService.calendar.daysInViewWeek = this.calendarService.getDaysInWeek(inputDate.getDate(), inputDate.getMonth(), inputDate.getFullYear());
    };
    DashboardPage.prototype.clickCalendarItem = function (calendarItem) {
        return __awaiter(this, void 0, void 0, function () {
            var calendar, moment, componentProps, params, modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        calendar = JSON.parse(JSON.stringify(calendarItem));
                        moment = JSON.parse(JSON.stringify(calendarItem.moment));
                        componentProps = { moment: moment, modalPage: true };
                        params = {};
                        calendar.moment = moment._id;
                        moment.calendar = calendar;
                        if (calendar.relationship) {
                            componentProps.calendarId = calendar._id;
                            params.calendarId = calendar._id;
                            componentProps.relationshipId = calendar.relationship;
                            params.relationshipId = calendar.relationship;
                        }
                        if (!this.modalPage) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_12__["ShowfeaturePage"], componentProps: componentProps })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            return [2 /*return*/, this.loadDashboard()];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        this.router.navigate(['/app/activity/' + moment._id, params]);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.loadPrograms = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userData.loadPrograms(true)];
                    case 1:
                        _a.activities = _b.sent();
                        this.myMentors = [];
                        this.myMentees = [];
                        this.programs = [];
                        this.activities.forEach(function (activity) {
                            activity.mentors = [];
                            activity.mentees = [];
                            activity.uniqueUsers = [];
                            // if community or program
                            if (activity.categories.includes('5c915324e172e4e64590e346') || activity.categories.includes('5c915475e172e4e64590e348')) {
                                _this.programs.push(activity);
                            }
                            else {
                                activity.program = 'Restvo';
                                var combinedUsers = activity.user_list_1.concat(activity.user_list_3);
                                combinedUsers.forEach(function (user) {
                                    if (!activity.uniqueUsers.map(function (c) { return c._id; }).includes(user._id)) {
                                        // each unique user is assigned either as a mentor or a mentee
                                        if (activity.user_list_1.map(function (c) { return c._id; }).includes(user._id)) {
                                            activity.mentees.push(user);
                                        }
                                        if (activity.user_list_3.map(function (c) { return c._id; }).includes(user._id)) {
                                            activity.mentors.push(user);
                                        }
                                        activity.uniqueUsers.push(user);
                                    }
                                });
                                activity.numberOfMentorsDisplayed = (activity.mentors.map(function (c) { return c._id; }).filter(function (c) { return c._id !== _this.userData.user._id; }).length > 3) ? 3 : activity.mentors.map(function (c) { return c._id; }).filter(function (c) { return c._id !== _this.userData.user._id; }).length;
                                activity.numberOfMenteesDisplayed = (activity.mentees.map(function (c) { return c._id; }).filter(function (c) { return c._id !== _this.userData.user._id; }).length > 3) ? 3 : activity.mentees.map(function (c) { return c._id; }).filter(function (c) { return c._id !== _this.userData.user._id; }).length;
                                // insert the parent program name
                                if (activity.parent_programs && activity.parent_programs.length && activity.parent_programs[0].matrix_string) {
                                    activity.program = activity.parent_programs[0].matrix_string[0][0];
                                }
                                if (activity.uniqueUsers && activity.uniqueUsers.length > 4) { // if the relationship has more than 3 users, list it under Community
                                    _this.programs.push(activity);
                                }
                                else { // else, list it under either MyMentors or MyMentees
                                    if (activity.mentors.map(function (c) { return c._id; }).includes(_this.userData.user._id)) { // if user is in the mentors list or is an admin
                                        _this.myMentees.push(activity);
                                    }
                                    else if (activity.mentees.map(function (c) { return c._id; }).includes(_this.userData.user._id)) { // else, the user is a mentee
                                        _this.myMentors.push(activity);
                                    }
                                    else { // if only an admin
                                        _this.myMentees.push(activity);
                                    }
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.openProgram = function (event, program) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!(this.platform.width() >= 768)) return [3 /*break*/, 1];
                        if (program.user_list_2.includes(this.userData.user._id)) { // admin access
                            this.router.navigate(['/app/manage/activity/' + program._id + '/profile/' + program._id]);
                        }
                        else {
                            this.router.navigate(['/app/activity/' + program._id]);
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(program.user_list_2.includes(this.userData.user._id) && (program.categories.includes('5c915324e172e4e64590e346') || program.categories.includes('5c915475e172e4e64590e348')))) return [3 /*break*/, 2];
                        this.momentService.manageMoment({ moment: program, modalPage: true });
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_12__["ShowfeaturePage"], componentProps: { moment: { _id: program._id }, modalPage: true } })];
                    case 3:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.finishOnboarding = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                event.stopPropagation();
                this.authService.openOnboarding({ modalPage: true });
                return [2 /*return*/];
            });
        });
    };
    DashboardPage.prototype.createMentoring = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pickProgramModal, moments, _a, clonedMoments;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_14__["PickfeaturePopoverPage"], componentProps: { title: 'Create Mentoring', maxMomentCount: 1 } })];
                    case 1:
                        pickProgramModal = _b.sent();
                        return [4 /*yield*/, pickProgramModal.present()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, pickProgramModal.onDidDismiss()];
                    case 3:
                        moments = (_b.sent()).data;
                        if (!(moments && moments.length)) return [3 /*break*/, 9];
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: 'Processing...',
                                duration: 5000
                            })];
                    case 4:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 5:
                        _b.sent();
                        if (!(moments[0] && moments[0].type === 'new')) return [3 /*break*/, 7];
                        moments[0].calendar = {
                            title: moments[0].matrix_string[0][0],
                            location: '',
                            notes: '',
                            startDate: new Date().toISOString(),
                            endDate: new Date().toISOString(),
                            options: {
                                firstReminderMinutes: 0,
                                secondReminderMinutes: 0,
                                reminders: []
                            }
                        };
                        return [4 /*yield*/, this.momentService.clone(moments, null)];
                    case 6:
                        clonedMoments = _b.sent();
                        if (clonedMoments && clonedMoments.length) {
                            clonedMoments[0].type = 'new';
                            clonedMoments[0].resource = moments[0].resource; // clone the populated resource
                            this.selectedProgram = clonedMoments[0];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        this.selectedProgram = moments[0];
                        _b.label = 8;
                    case 8:
                        this.momentService.initiateParticipantsView(this.selectedProgram, this.loading);
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
    };
    DashboardPage.prototype.cancelSearch = function (event) {
        event.stopPropagation();
    };
    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    DashboardPage.prototype.customTrackBy = function (index, item) {
        return index;
    };
    DashboardPage.prototype.closeModal = function () {
        if (this.modalPage) {
            this.modalCtrl.dismiss();
        }
    };
    DashboardPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshDashboardPageHandler);
    };
    DashboardPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_13__["Auth"] },
        { type: _services_calendar_service__WEBPACK_IMPORTED_MODULE_6__["CalendarService"] },
        { type: _services_network_service_service__WEBPACK_IMPORTED_MODULE_10__["NetworkService"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_5__["Moment"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonContent"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonContent"])
    ], DashboardPage.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "view", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], DashboardPage.prototype, "modalPage", void 0);
    DashboardPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __importDefault(__webpack_require__(/*! raw-loader!./dashboard.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/dashboard/dashboard.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./dashboard.page.scss */ "./src/app/pages/user/dashboard/dashboard.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_13__["Auth"],
            _services_calendar_service__WEBPACK_IMPORTED_MODULE_6__["CalendarService"],
            _services_network_service_service__WEBPACK_IMPORTED_MODULE_10__["NetworkService"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_5__["Moment"]])
    ], DashboardPage);
    return DashboardPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~dashboard-dashboard-module~pages-main-tab-main-tab-module~user-user-module.js.map