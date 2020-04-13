(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["board-communityboard-communityboard-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/communityboard/communityboard.page.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/communityboard/communityboard.page.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"lightgrey\" *ngIf=\"(platform.is('mobileweb') && (platform.is('ios') || platform.is('android'))) && userData.showDownloadLink\">\n    <ion-item-sliding side=\"end\">\n      <ion-item lines=\"none\"  color=\"lightgrey\">\n        <ion-avatar slot=\"start\">\n          <ion-img src=\"assets/img/icon.png\"></ion-img>\n        </ion-avatar>\n        <div class=\"details\" class=\"ion-text-wrap\">\n          <a *ngIf=\"platform.is('ios')\" href=\"https://itunes.apple.com/us/app/restvo-connect-with-churches/id1365903479?ls=1&mt=8\" style=\"font-size: 14px; color: var(--ion-color-button1)\">Download app for better experience</a>\n          <a *ngIf=\"platform.is('android')\" href=\"https://play.google.com/store/apps/details?id=com.restvo.app\" style=\"font-size: 14px; color: var(--ion-color-button1)\">Download app for better experience</a>\n        </div>\n        <ion-icon name=\"chevron-forward-outline\" color=\"primary\" slot=\"end\"></ion-icon>\n        <!--<ion-button fill=\"clear\" slot=\"end\"><ion-icon name=\"close\"></ion-icon></ion-button>-->\n      </ion-item>\n      <ion-item-options>\n        <ion-item-option color=\"primary\" (click)=\"userData.showDownloadLink = false\">\n          Dismiss\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-menu-toggle menu=\"main\" *ngIf=\"userData.user\" slot=\"start\">\n      <ion-button fill=\"clear\" color=\"grey\">\n        <ion-icon name=\"menu\"></ion-icon>\n      </ion-button>\n      <ion-badge *ngIf=\"this.chatService && this.chatService.connectTabBadge\" mode=\"md\">{{this.chatService.connectTabBadge}}</ion-badge>\n    </ion-menu-toggle>\n    <ion-title>News</ion-title>\n    <!--add new featured topic-->\n    <ion-item lines=\"none\" routerLink=\"/app/user/profile\" *ngIf=\"userData.user && platform.width() >= 768\" slot=\"end\" mode=\"md\" style=\"--background: transparent\">\n      <ion-avatar slot=\"start\">\n        <ion-img *ngIf=\"userData.user && userData.user.avatar\" [src]=\"userData.user.avatar\"></ion-img>\n        <ion-img *ngIf=\"!userData.user || !userData.user.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n      </ion-avatar>\n      <ion-label>\n        {{userData.user.first_name}} {{userData.user.last_name}}\n      </ion-label>\n    </ion-item>\n    <ion-buttons slot=\"end\" *ngIf=\"!userData.user\" color=\"grey\">\n      <ion-button routerLink=\"/register\">\n        Sign In\n      </ion-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\" *ngIf=\"userData.currentCommunityAdminStatus\">\n      <ion-button (click)=\"setupLoadGroups()\" id=\"moreoptions\" color=\"grey\">\n        <ion-icon name=\"add\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n  <ion-toolbar *ngIf=\"newsfeedMoreOptions\">\n    <div class=\"moreoptions-container\">\n      <ion-grid *ngIf=\"communitiesboards && communitiesboards.length\">\n        <ion-badge style=\"margin: 0 auto;\">Tap on a topic below to write a post:</ion-badge>\n      </ion-grid>\n      <ion-grid class=\"moreoptions-grid\" *ngFor=\"let community of communitiesboards\">\n        <ion-row class=\"moreoptions-community-name ion-text-center\">{{community.name}}</ion-row>\n        <ion-row class=\"moreoptions-row\">\n          <ion-col *ngIf=\"community._id !== '5ab62be8f83e2c1a8d41f894'\" class=\"ion-align-self-center\" size-xs=\"4\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\">\n            <ion-item lines=\"none\" (click)=\"createNewBoard(community)\">\n              <div class=\"moreoptions-centered\">\n                <ion-avatar class=\"moreoptions-avatar\">\n                  <img src=\"assets/img/Campfire_Gray.png\"/>\n                </ion-avatar>\n                <ion-icon class=\"moreoptions-joined\" color=\"grey\" name=\"add\"></ion-icon>\n                <ion-label class=\"moreoptions-label ion-text-center\">Topic</ion-label>\n              </div>\n            </ion-item>\n          </ion-col>\n          <ion-col *ngFor=\"let board of community.boards\" class=\"ion-align-self-center\" size-xs=\"4\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\">\n            <ion-item lines=\"none\" (click)=\"openBoard($event, board, community)\">\n              <div class=\"moreoptions-centered\">\n                <ion-avatar class=\"moreoptions-avatar\">\n                  <img [src]=\"board.background | background: board._id\"/>\n                </ion-avatar>\n                <ion-icon class=\"moreoptions-joined\" color=\"tertiary\" name=\"create\"></ion-icon>\n                <ion-label class=\"moreoptions-label ion-text-center\">{{board.name}}</ion-label>\n              </div>\n            </ion-item>\n          </ion-col>\n          <ion-col *ngFor=\"let topic of community.topics\" class=\"ion-align-self-center\" size-xs=\"4\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\">\n            <ion-item lines=\"none\" (click)=\"showGroupProfile(topic)\">\n              <div class=\"moreoptions-centered\">\n                <ion-avatar class=\"moreoptions-avatar\">\n                  <img [src]=\"topic.background | background: topic._id\"/>\n                </ion-avatar>\n                <ion-icon class=\"moreoptions-joined\" color=\"tertiary\" *ngIf=\"topic.joined\" name=\"checkmark\"></ion-icon>\n                <ion-label class=\"moreoptions-label ion-text-center\">{{topic.name}}</ion-label>\n              </div>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <!--get new data when page is refreshed-->\n  <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n  <ion-refresher (ionRefresh)=\"refresh($event)\" slot=\"fixed\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  <ion-grid>\n    <div *ngFor=\"let community of communitiesboards\">\n      <!--<ion-item (click)=\"showCommunityProfile(community)\"  [hidden]=\"!community.postCount\" lines=\"none\" color=\"grey\">\n        <div class=\"community-title\">{{community.name}}</div>\n      </ion-item>-->\n      <div *ngFor=\"let board of community.boards\">\n        <ion-row class=\"ion-justify-content-center\">\n          <ion-card *ngFor=\"let post of board.preview_posts\" (click)=\"openPost($event, board, post)\">\n            <ion-item class=\"header-container\" lines=\"none\">\n              <ion-avatar slot=\"start\" (click)=\"seeUserInfo($event, post.author)\">\n                <img *ngIf=\"post.author.avatar\" [src]=\"post.author.avatar\"/>\n                <img *ngIf=\"!post.author.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n              </ion-avatar>\n              <div class=\"author-container\">\n                <div class=\"author ion-text-wrap\" >\n                  {{post.author.first_name}} {{post.author.last_name}}\n                  <ion-icon name=\"alert-circle\" *ngIf=\"post.status === 'review'\" color=\"grey\"></ion-icon>\n                </div>\n                <ion-badge *ngIf=\"board.group\" (click)=\"openBoard($event, board, community)\" color=\"primary\">{{board.name}}</ion-badge>\n                <ion-badge color=\"primary\" *ngIf=\"!board.group\">{{board.name}}</ion-badge>\n              </div>\n              <ion-col slot=\"end\" class=\"note-col\">\n                <p class=\"note ion-text-end\">{{post.updatedAt | datetime: 'm:l,d:n,y:n'}}</p>\n                <p class=\"note ion-text-end\">{{displayTimeElapsed(post.updatedAt)}}</p>\n              </ion-col>\n            </ion-item>\n            <div class=\"photo-frame\" *ngIf=\"post.attachments?.length\">\n              <img class=\"photo\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\"  [src]=\"post.attachments[0]\" />\n              <a [href]=\"post.attachments[0]\" *ngIf=\"(['doc', 'docx']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/docx.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n              <a [href]=\"post.attachments[0]\" *ngIf=\"(['xls', 'xlsx']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/xlsx.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n              <a [href]=\"post.attachments[0]\" *ngIf=\"(['pdf']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/pdf.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n              <a [href]=\"post.attachments[0]\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><img src=\"assets/img/file.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n              <div plyr [plyrSources]=\"[{ 'src': post.attachments[0], 'type': 'video/' + (post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, post.attachments[0])\" *ngIf=\"(['mp4', 'webm', 'ogg', 'mov']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" (click)=\"$event.stopPropagation()\"></div>\n            </div>\n            <div class=\"photo-frame\" *ngIf=\"post.media?.length\" (click)=\"resourceService.clickVideo($event, post.media[0].sources)\">\n              <div plyr [plyrSources]=\"post.media[0].sources\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, post.media[0]._id)\"></div>\n            </div>\n            <ion-card-content>\n              <p class=\"short-paragraph\" [innerHTML]=\"post.body | nl2br\"></p>\n            </ion-card-content>\n            <div class=\"photo-frame\" *ngIf=\"post.moments && post.moments.length && post.moments[0]._id && post.moments[0].resource && ['User Defined Activity','Track','Event','Goal','Meetup'].indexOf(post.moments[0].resource.field) > -1\">\n              <img class=\"photo\" *ngIf=\"post.moments[0].assets.length > 0\" [src]=\"post.moments[0].assets[0]\">\n            </div>\n            <ion-item *ngIf=\"post.moments && post.moments.length && post.moments[0]._id\" lines=\"none\">\n              <ion-thumbnail *ngIf=\"['User Defined Activity','Track','Event','Goal','Meetup'].indexOf(post.moments[0].resource.field) > -1 && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] !== 'Poll'\" slot=\"start\">\n                <img [src]=\"momentService.loadIcon(post.moments[0].resource.field).url\" />\n              </ion-thumbnail>\n              <!--User Defined Activity-->\n              <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'User Defined Activity' && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] !== 'Poll'\" (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].value[0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n              </div>\n              <!--Track-->\n              <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Track'\" class=\"ion-text-wrap\" (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n                <p class=\"moment-name\">{{post.moments[0].matrix_string[0][1]}}</p>\n              </div>\n              <!--Event-->\n              <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Event'\" class=\"ion-text-wrap\" (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n                <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n                <p class=\"moment-name\">{{post.moments[0].matrix_string[1][0]}}</p>\n              </div>\n              <!--Meetup-->\n              <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Meetup'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n                <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n                <p class=\"moment-name\">{{post.moments[0].matrix_string[1][0]}}</p>\n              </div>\n              <!--Goal-->\n              <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Goal'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n                <p *ngIf=\"post.moments[0].calendar\" class=\"moment-date\" >Accomplish By: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n                <p class=\"moment-notes\">{{post.moments[0].matrix_string[1][0]}}</p>\n              </div>\n              <!-- Poll -->\n              <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0] && post.moments[0].resource && post.moments[0].resource.field === 'Poll'\">\n                <p>This poll is no longer available</p>\n              </div>\n              <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'User Defined Activity' && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] === 'Poll'\" (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <ion-thumbnail class=\"pollIconDiv\">\n                  <ion-img class=\"pollIcon\" src=\"assets/img/Poll_Gray.png\"></ion-img>\n                </ion-thumbnail>\n                <p class=\"pollQuestion\">{{post.moments[0].resource['en-US'].matrix_string[1][1]}}</p>\n                <div class=\"pollContainer\" *ngFor=\"let display of post.poll.display; index as count\">\n                  <div class=\"optionsContainer\">\n                    <p class=\"option\" >{{count+1}}. {{display.option}}</p>\n                  </div>\n                  <div class=\"votesContainer\">\n                    <p class=\"votecount\">Votes: {{display.count}}</p>\n                  </div>\n                  <div class=\"userContainer\">\n                    <ion-icon class=\"uservoted\" *ngIf=\"display.votedByUser\" name=\"checkmark\"></ion-icon>\n                    <ion-button size=\"small\" shape=\"round\" fill='solid' color=\"darkgrey\" class=\"uservote ion-text-wrap\" *ngIf=\"!display.votedByUser\" (click)=\"momentService.submitVote($event, post.moments[0], count)\">Cast Vote</ion-button>\n                  </div>\n                </div>\n                <div class=\"unresolvedPollFooter\">\n                  <p>{{post.moments[0].resource['en-US'].matrix_string[1][4]}}: {{post.poll.totalVoteCount}}</p>\n                  <p>{{post.moments[0].resource['en-US'].matrix_string[1][6]}}: {{post.moments[0].calendar.endDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n                </div>\n              </div>\n            </ion-item>\n            <ion-row>\n              <ion-col>\n                <ion-button fill=\"clear\" size=\"small\" (click)=\"likePost($event, board, post)\">\n                  <ion-icon name=\"thumbs-up\" class=\"ion-margin-end\"></ion-icon>\n                  {{post.likes?.length}} Likes\n                </ion-button>\n              </ion-col>\n              <ion-col>\n                <ion-button fill=\"clear\" size=\"small\" (click)=\"openPost($event, board, post)\">\n                  <ion-icon name=\"chatbox-ellipses\" class=\"ion-margin-end\"></ion-icon>\n                  {{post.comments?.length}} Comments\n                </ion-button>\n              </ion-col>\n              <ion-col>\n                <ion-button  fill=\"clear\" size=\"small\" (click)=\"presentPickPeoplePopover($event)\">\n                  <ion-icon name=\"share\" class=\"ion-margin-end\"></ion-icon>Share</ion-button>\n              </ion-col>\n            </ion-row>\n          </ion-card>\n        </ion-row>\n        <ion-buttons class=\"ion-justify-content-center\" *ngIf=\"board.preview_posts?.length < board.posts?.length\">\n          <ion-button (click)=\"loadMorePosts(board)\" color=\"tertiary\" size=\"small\">\n            Load More from {{board.name}}\n          </ion-button>\n        </ion-buttons>\n        <ion-buttons class=\"ion-justify-content-center\" *ngIf=\"board.preview_posts?.length === 15\">\n          <ion-button (click)=\"openBoard($event, board, community)\" color=\"tertiary\" size=\"small\">\n            Read More\n          </ion-button>\n        </ion-buttons>\n      </div>\n    </div>\n  </ion-grid>\n  <ion-infinite-scroll position=\"bottom\" threshold=\"30%\" (ionInfinite)=\"listcommunityboardposts($event)\">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/board/communityboard/communityboard.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/board/communityboard/communityboard.module.ts ***!
  \*********************************************************************/
/*! exports provided: CommunityboardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityboardPageModule", function() { return CommunityboardPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _communityboard_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./communityboard.page */ "./src/app/pages/board/communityboard/communityboard.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var ngx_plyr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-plyr */ "./node_modules/ngx-plyr/fesm5/ngx-plyr.js");
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
        component: _communityboard_page__WEBPACK_IMPORTED_MODULE_5__["CommunityboardPage"],
    }
];
var CommunityboardPageModule = /** @class */ (function () {
    function CommunityboardPageModule() {
    }
    CommunityboardPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                ngx_plyr__WEBPACK_IMPORTED_MODULE_7__["PlyrModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            ],
            declarations: [_communityboard_page__WEBPACK_IMPORTED_MODULE_5__["CommunityboardPage"]]
        })
    ], CommunityboardPageModule);
    return CommunityboardPageModule;
}());



/***/ }),

/***/ "./src/app/pages/board/communityboard/communityboard.page.scss":
/*!*********************************************************************!*\
  !*** ./src/app/pages/board/communityboard/communityboard.page.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-communityboard ion-header {\n  --background: var(--ion-color-secondary);\n}\napp-communityboard ion-menu-toggle ion-badge {\n  position: relative;\n  top: 0.1rem;\n  right: 22px;\n  /*& ~ ion-icon {\n    outline-color: whitesmoke;\n  }*/\n  z-index: 5;\n}\napp-communityboard ion-spinner {\n  position: absolute;\n  margin: 48%;\n}\napp-communityboard .moreoptions-container {\n  max-height: 30vh;\n  overflow: scroll;\n}\napp-communityboard .moreoptions-grid {\n  -webkit-animation-name: move-down;\n          animation-name: move-down;\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-timing-function: ease-in;\n          animation-timing-function: ease-in;\n}\napp-communityboard .moreoptions-community-name {\n  height: 20px;\n  color: grey;\n  font-size: 12px;\n}\n@-webkit-keyframes move-down {\n  from {\n    transform: translateY(-90px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\n@keyframes move-down {\n  from {\n    transform: translateY(-90px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\napp-communityboard .moreoptions-row {\n  width: 100%;\n}\napp-communityboard .moreoptions {\n  width: 100%;\n}\napp-communityboard .moreoptions-centered {\n  width: 100%;\n  height: 65px;\n  margin: auto 0 auto 0;\n}\napp-communityboard .moreoptions-centered .moreoptions-avatar {\n  margin: 0 auto;\n  top: 0;\n}\napp-communityboard .moreoptions-centered .moreoptions-joined {\n  position: absolute;\n  left: 60%;\n  top: 28px;\n}\napp-communityboard .moreoptions-centered .moreoptions-label {\n  margin: 5px auto 0 auto;\n  color: grey;\n  font-size: 12px;\n}\napp-communityboard .community-title {\n  color: var(--ion-color-secondary);\n  font-size: large;\n  margin: 0 auto;\n}\napp-communityboard .feed-title {\n  color: var(--ion-color-dark);\n  font-size: medium;\n}\napp-communityboard ion-card {\n  width: 100%;\n  max-width: 540px;\n}\napp-communityboard .header-container {\n  margin-bottom: 5px;\n}\napp-communityboard .author-container {\n  width: 100%;\n}\napp-communityboard .author {\n  margin: 10px 0 2px 0;\n  display: block;\n  width: 100%;\n}\napp-communityboard .note-col {\n  height: 100%;\n  padding-left: 0;\n  margin-left: 3px;\n}\napp-communityboard .note {\n  color: lightgrey;\n  width: 100%;\n  margin: 5px 0 0 0;\n}\napp-communityboard .date {\n  margin: 0 0 5px 0;\n  width: 100%;\n  color: lightgrey;\n}\napp-communityboard .photo-frame {\n  margin: 0 auto;\n  padding: 0 auto;\n  width: 100%;\n}\napp-communityboard .photo {\n  width: 100%;\n  height: 100%;\n}\napp-communityboard .short-paragraph {\n  color: var(--ion-color-dark);\n  max-height: 80px;\n  line-height: 20px;\n  /* Height / no. of lines to display */\n  overflow: hidden;\n}\napp-communityboard .moment {\n  width: 95%;\n  margin: 5px auto;\n  border-radius: 5px;\n  padding: 10px 12px 10px 12px;\n  position: relative;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n  background-color: #f0f0f0;\n}\napp-communityboard .moment h2, app-communityboard .moment p {\n  color: black;\n}\napp-communityboard .moment-image {\n  max-height: 20%;\n  width: 100%;\n  border-radius: 5%;\n}\napp-communityboard .superimposedIcon {\n  position: absolute;\n  bottom: 50%;\n  right: 40%;\n  height: 20%;\n}\napp-communityboard .moment-name {\n  font-weight: bold;\n  width: 100%;\n}\napp-communityboard .moment-date {\n  width: 100%;\n  font-weight: bold;\n}\napp-communityboard .moment-notes {\n  width: 100%;\n  font-weight: bold;\n}\napp-communityboard .goalFooter {\n  font-style: italic;\n  font-weight: lighter;\n  text-align: center;\n}\napp-communityboard .pollIconDiv {\n  height: 20%;\n  width: 100%;\n}\napp-communityboard .pollIconDiv .pollIcon {\n  height: 1.8em;\n  width: 10%;\n  margin-left: 45%;\n  margin-right: 45%;\n}\napp-communityboard .pollQuestion {\n  color: black;\n  font-size: medium;\n  font-style: italic;\n}\napp-communityboard .pollContainer {\n  width: 100%;\n  display: inline-block;\n  clear: both;\n  border-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4) !important;\n  padding: 2px;\n}\napp-communityboard .optionsContainer {\n  float: left;\n  width: 60%;\n}\napp-communityboard .optionsContainer .option {\n  padding-top: 5px;\n  float: left;\n  font-size: medium;\n  font-weight: bold;\n}\napp-communityboard .votesContainer {\n  float: left;\n  width: 20%;\n}\napp-communityboard .votesContainer .votecount {\n  padding-top: 10px;\n  color: black;\n  font-size: x-small;\n}\napp-communityboard .userContainer {\n  float: right;\n  width: 20%;\n}\napp-communityboard .userContainer .uservote {\n  margin-top: 15px;\n  font-size: x-small;\n  width: 90%;\n  height: 30px;\n  color: black;\n}\napp-communityboard .userContainer .uservoted {\n  padding-top: 20px;\n  width: 30%;\n  margin: 0 40%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2JvYXJkL2NvbW11bml0eWJvYXJkL2NvbW11bml0eWJvYXJkLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvYm9hcmQvY29tbXVuaXR5Ym9hcmQvY29tbXVuaXR5Ym9hcmQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVFO0VBQ0Usd0NBQUE7QUNESjtBREtJO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUVBOztJQUFBO0VBR0EsVUFBQTtBQ0pOO0FEUUU7RUFDRSxrQkFBQTtFQUNBLFdBQUE7QUNOSjtBRFNFO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtBQ1BKO0FEVUU7RUFDRSxpQ0FBQTtVQUFBLHlCQUFBO0VBQ0EsZ0NBQUE7VUFBQSx3QkFBQTtFQUNBLDBDQUFBO1VBQUEsa0NBQUE7QUNSSjtBRFdFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FDVEo7QURZRTtFQUNFO0lBQ0UsNEJBQUE7RUNWSjtFRFlFO0lBQ0Usd0JBQUE7RUNWSjtBQUNGO0FESUU7RUFDRTtJQUNFLDRCQUFBO0VDVko7RURZRTtJQUNFLHdCQUFBO0VDVko7QUFDRjtBRGFFO0VBRUUsV0FBQTtBQ1pKO0FEZUU7RUFDRSxXQUFBO0FDYko7QURnQkU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0FDZEo7QURnQkk7RUFDRSxjQUFBO0VBQ0EsTUFBQTtBQ2ROO0FEaUJJO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsU0FBQTtBQ2ZOO0FEa0JJO0VBQ0UsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ2hCTjtBRG9CRTtFQUNFLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FDbEJKO0FEcUJFO0VBQ0UsNEJBQUE7RUFDQSxpQkFBQTtBQ25CSjtBRHNCRTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtBQ3BCSjtBRHVCRTtFQUNFLGtCQUFBO0FDckJKO0FEd0JFO0VBQ0UsV0FBQTtBQ3RCSjtBRHlCRTtFQUNFLG9CQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUN2Qko7QUQwQkU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDeEJKO0FEMkJFO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUN6Qko7QUQ0QkU7RUFDRSxpQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBQzFCSjtBRDZCRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQzNCSjtBRDhCRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FDNUJKO0FEK0JFO0VBQ0UsNEJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQW1CLHFDQUFBO0VBQ25CLGdCQUFBO0FDNUJKO0FEZ0NFO0VBQ0UsVUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtBQzlCSjtBRCtCSTtFQUNFLFlBQUE7QUM3Qk47QURpQ0U7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FDL0JKO0FEa0NFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUNoQ0o7QURtQ0U7RUFDRSxpQkFBQTtFQUNBLFdBQUE7QUNqQ0o7QURvQ0U7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7QUNsQ0o7QURxQ0U7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7QUNuQ0o7QURzQ0U7RUFDRSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7QUNwQ0o7QUR5Q0U7RUFDRSxXQUFBO0VBQ0EsV0FBQTtBQ3ZDSjtBRHlDSTtFQUNFLGFBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQ3ZDTjtBRDJDRTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FDekNKO0FENENFO0VBQ0UsV0FBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EscURBQUE7RUFDQSxZQUFBO0FDMUNKO0FENkNFO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUMzQ0o7QUQ0Q0k7RUFDRSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUVBLGlCQUFBO0FDM0NOO0FEK0NFO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUM3Q0o7QUQ4Q0k7RUFDRSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQzVDTjtBRGdERTtFQUNFLFlBQUE7RUFDQSxVQUFBO0FDOUNKO0FEK0NJO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQzdDTjtBRCtDSTtFQUNFLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7QUM3Q04iLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ib2FyZC9jb21tdW5pdHlib2FyZC9jb21tdW5pdHlib2FyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtY29tbXVuaXR5Ym9hcmQge1xuXG4gIGlvbi1oZWFkZXIge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gIH1cblxuICBpb24tbWVudS10b2dnbGUge1xuICAgIGlvbi1iYWRnZSB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB0b3A6IDAuMXJlbTtcbiAgICAgIHJpZ2h0OiAyMnB4O1xuXG4gICAgICAvKiYgfiBpb24taWNvbiB7XG4gICAgICAgIG91dGxpbmUtY29sb3I6IHdoaXRlc21va2U7XG4gICAgICB9Ki9cbiAgICAgIHotaW5kZXg6IDU7XG4gICAgfVxuICB9XG5cbiAgaW9uLXNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW46IDQ4JTtcbiAgfVxuXG4gIC5tb3Jlb3B0aW9ucy1jb250YWluZXIge1xuICAgIG1heC1oZWlnaHQ6IDMwdmg7XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgfVxuXG4gIC5tb3Jlb3B0aW9ucy1ncmlkIHtcbiAgICBhbmltYXRpb24tbmFtZTogbW92ZS1kb3duO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC41cztcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluO1xuICB9XG4gIFxuICAubW9yZW9wdGlvbnMtY29tbXVuaXR5LW5hbWUge1xuICAgIGhlaWdodDogMjBweDtcbiAgICBjb2xvcjogZ3JleTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cblxuICBAa2V5ZnJhbWVzIG1vdmUtZG93biB7XG4gICAgZnJvbSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTkwcHgpO1xuICAgIH1cbiAgICB0byB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICB9XG5cbiAgLm1vcmVvcHRpb25zLXJvdyB7XG4gICAgLy9wYWRkaW5nOiAwIDEwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAubW9yZW9wdGlvbnMge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLm1vcmVvcHRpb25zLWNlbnRlcmVkIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDY1cHg7XG4gICAgbWFyZ2luOiBhdXRvIDAgYXV0byAwO1xuXG4gICAgLm1vcmVvcHRpb25zLWF2YXRhciB7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgIHRvcDogMFxuICAgIH1cblxuICAgIC5tb3Jlb3B0aW9ucy1qb2luZWQge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogNjAlO1xuICAgICAgdG9wOiAyOHB4O1xuICAgIH1cblxuICAgIC5tb3Jlb3B0aW9ucy1sYWJlbCB7XG4gICAgICBtYXJnaW46IDVweCBhdXRvIDAgYXV0bztcbiAgICAgIGNvbG9yOiBncmV5O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgfVxuXG4gIC5jb21tdW5pdHktdGl0bGUge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG5cbiAgLmZlZWQtdGl0bGUge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgZm9udC1zaXplOiBtZWRpdW07XG4gIH1cblxuICBpb24tY2FyZCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiA1NDBweDtcbiAgfVxuXG4gIC5oZWFkZXItY29udGFpbmVyIHtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gIH1cblxuICAuYXV0aG9yLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuYXV0aG9yIHtcbiAgICBtYXJnaW46IDEwcHggMCAycHggMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5ub3RlLWNvbCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICBtYXJnaW4tbGVmdDogM3B4O1xuICB9XG5cbiAgLm5vdGUge1xuICAgIGNvbG9yOiBsaWdodGdyZXk7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiA1cHggMCAwIDA7XG4gIH1cblxuICAuZGF0ZSB7XG4gICAgbWFyZ2luOiAwIDAgNXB4IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgY29sb3I6IGxpZ2h0Z3JleTtcbiAgfVxuXG4gIC5waG90by1mcmFtZSB7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgcGFkZGluZzogMCBhdXRvO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLnBob3RvIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAuc2hvcnQtcGFyYWdyYXBoIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgIG1heC1oZWlnaHQ6IDgwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7IC8qIEhlaWdodCAvIG5vLiBvZiBsaW5lcyB0byBkaXNwbGF5ICovXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC8vbW9tZW50c1xuICAubW9tZW50IHtcbiAgICB3aWR0aDogOTUlO1xuICAgIG1hcmdpbjogNXB4IGF1dG87XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDEwcHggMTJweCAxMHB4IDEycHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgLW1vei11c2VyLXNlbGVjdDogdGV4dDtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgICBoMiwgcCB7XG4gICAgICBjb2xvcjogYmxhY2s7XG4gICAgfVxuICB9XG5cbiAgLm1vbWVudC1pbWFnZSB7XG4gICAgbWF4LWhlaWdodDogMjAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDUlO1xuICB9XG5cbiAgLnN1cGVyaW1wb3NlZEljb257XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogNTAlO1xuICAgIHJpZ2h0OiA0MCU7XG4gICAgaGVpZ2h0OiAyMCU7XG4gIH1cblxuICAubW9tZW50LW5hbWV7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAubW9tZW50LWRhdGUge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuXG4gIH1cbiAgLm1vbWVudC1ub3Rlc3tcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgfVxuXG4gIC5nb2FsRm9vdGVye1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuXG4gIC8vUG9sbCBtZXNzYWdlXG4gIC5wb2xsSWNvbkRpdntcbiAgICBoZWlnaHQ6IDIwJTtcbiAgICB3aWR0aDogMTAwJTtcblxuICAgIC5wb2xsSWNvbntcbiAgICAgIGhlaWdodDogMS44ZW07XG4gICAgICB3aWR0aDogMTAlO1xuICAgICAgbWFyZ2luLWxlZnQ6IDQ1JTtcbiAgICAgIG1hcmdpbi1yaWdodDogNDUlO1xuICAgIH1cbiAgfVxuXG4gIC5wb2xsUXVlc3Rpb257XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgfVxuXG4gIC5wb2xsQ29udGFpbmVye1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBjbGVhcjogYm90aDtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZzogMnB4O1xuICB9XG5cbiAgLm9wdGlvbnNDb250YWluZXJ7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgd2lkdGg6IDYwJTtcbiAgICAub3B0aW9ue1xuICAgICAgcGFkZGluZy10b3A6IDVweDtcbiAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgZm9udC1zaXplOiBtZWRpdW07XG4gICAgICAvL2NvbG9yOiAjNGE5MGUyO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICB9XG5cbiAgLnZvdGVzQ29udGFpbmVye1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiAyMCU7XG4gICAgLnZvdGVjb3VudHtcbiAgICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuICAgICAgY29sb3I6IGJsYWNrO1xuICAgICAgZm9udC1zaXplOiB4LXNtYWxsO1xuICAgIH1cbiAgfVxuXG4gIC51c2VyQ29udGFpbmVye1xuICAgIGZsb2F0OiByaWdodDtcbiAgICB3aWR0aDogMjAlO1xuICAgIC51c2Vydm90ZXtcbiAgICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gICAgICBmb250LXNpemU6IHgtc21hbGw7XG4gICAgICB3aWR0aDogOTAlO1xuICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgY29sb3I6IGJsYWNrO1xuICAgIH1cbiAgICAudXNlcnZvdGVke1xuICAgICAgcGFkZGluZy10b3A6IDIwcHg7XG4gICAgICB3aWR0aDogMzAlO1xuICAgICAgbWFyZ2luOiAwIDQwJTtcbiAgICB9XG4gIH1cbn1cblxuIiwiYXBwLWNvbW11bml0eWJvYXJkIGlvbi1oZWFkZXIge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xufVxuYXBwLWNvbW11bml0eWJvYXJkIGlvbi1tZW51LXRvZ2dsZSBpb24tYmFkZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogMC4xcmVtO1xuICByaWdodDogMjJweDtcbiAgLyomIH4gaW9uLWljb24ge1xuICAgIG91dGxpbmUtY29sb3I6IHdoaXRlc21va2U7XG4gIH0qL1xuICB6LWluZGV4OiA1O1xufVxuYXBwLWNvbW11bml0eWJvYXJkIGlvbi1zcGlubmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXJnaW46IDQ4JTtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAubW9yZW9wdGlvbnMtY29udGFpbmVyIHtcbiAgbWF4LWhlaWdodDogMzB2aDtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAubW9yZW9wdGlvbnMtZ3JpZCB7XG4gIGFuaW1hdGlvbi1uYW1lOiBtb3ZlLWRvd247XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC41cztcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAubW9yZW9wdGlvbnMtY29tbXVuaXR5LW5hbWUge1xuICBoZWlnaHQ6IDIwcHg7XG4gIGNvbG9yOiBncmV5O1xuICBmb250LXNpemU6IDEycHg7XG59XG5Aa2V5ZnJhbWVzIG1vdmUtZG93biB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtOTBweCk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuYXBwLWNvbW11bml0eWJvYXJkIC5tb3Jlb3B0aW9ucy1yb3cge1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAubW9yZW9wdGlvbnMge1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAubW9yZW9wdGlvbnMtY2VudGVyZWQge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA2NXB4O1xuICBtYXJnaW46IGF1dG8gMCBhdXRvIDA7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLm1vcmVvcHRpb25zLWNlbnRlcmVkIC5tb3Jlb3B0aW9ucy1hdmF0YXIge1xuICBtYXJnaW46IDAgYXV0bztcbiAgdG9wOiAwO1xufVxuYXBwLWNvbW11bml0eWJvYXJkIC5tb3Jlb3B0aW9ucy1jZW50ZXJlZCAubW9yZW9wdGlvbnMtam9pbmVkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA2MCU7XG4gIHRvcDogMjhweDtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAubW9yZW9wdGlvbnMtY2VudGVyZWQgLm1vcmVvcHRpb25zLWxhYmVsIHtcbiAgbWFyZ2luOiA1cHggYXV0byAwIGF1dG87XG4gIGNvbG9yOiBncmV5O1xuICBmb250LXNpemU6IDEycHg7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLmNvbW11bml0eS10aXRsZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiBsYXJnZTtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLmZlZWQtdGl0bGUge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICBmb250LXNpemU6IG1lZGl1bTtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCBpb24tY2FyZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDU0MHB4O1xufVxuYXBwLWNvbW11bml0eWJvYXJkIC5oZWFkZXItY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuYXBwLWNvbW11bml0eWJvYXJkIC5hdXRob3ItY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLmF1dGhvciB7XG4gIG1hcmdpbjogMTBweCAwIDJweCAwO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLm5vdGUtY29sIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG4gIG1hcmdpbi1sZWZ0OiAzcHg7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLm5vdGUge1xuICBjb2xvcjogbGlnaHRncmV5O1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiA1cHggMCAwIDA7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLmRhdGUge1xuICBtYXJnaW46IDAgMCA1cHggMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiBsaWdodGdyZXk7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLnBob3RvLWZyYW1lIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHBhZGRpbmc6IDAgYXV0bztcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLnBob3RvIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAuc2hvcnQtcGFyYWdyYXBoIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgbWF4LWhlaWdodDogODBweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIC8qIEhlaWdodCAvIG5vLiBvZiBsaW5lcyB0byBkaXNwbGF5ICovXG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLm1vbWVudCB7XG4gIHdpZHRoOiA5NSU7XG4gIG1hcmdpbjogNXB4IGF1dG87XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogMTBweCAxMnB4IDEwcHggMTJweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAtbW96LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAtbXMtdXNlci1zZWxlY3Q6IHRleHQ7XG4gIHVzZXItc2VsZWN0OiB0ZXh0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xufVxuYXBwLWNvbW11bml0eWJvYXJkIC5tb21lbnQgaDIsIGFwcC1jb21tdW5pdHlib2FyZCAubW9tZW50IHAge1xuICBjb2xvcjogYmxhY2s7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLm1vbWVudC1pbWFnZSB7XG4gIG1heC1oZWlnaHQ6IDIwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDUlO1xufVxuYXBwLWNvbW11bml0eWJvYXJkIC5zdXBlcmltcG9zZWRJY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDUwJTtcbiAgcmlnaHQ6IDQwJTtcbiAgaGVpZ2h0OiAyMCU7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLm1vbWVudC1uYW1lIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWNvbW11bml0eWJvYXJkIC5tb21lbnQtZGF0ZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAubW9tZW50LW5vdGVzIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuYXBwLWNvbW11bml0eWJvYXJkIC5nb2FsRm9vdGVyIHtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuYXBwLWNvbW11bml0eWJvYXJkIC5wb2xsSWNvbkRpdiB7XG4gIGhlaWdodDogMjAlO1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAucG9sbEljb25EaXYgLnBvbGxJY29uIHtcbiAgaGVpZ2h0OiAxLjhlbTtcbiAgd2lkdGg6IDEwJTtcbiAgbWFyZ2luLWxlZnQ6IDQ1JTtcbiAgbWFyZ2luLXJpZ2h0OiA0NSU7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLnBvbGxRdWVzdGlvbiB7XG4gIGNvbG9yOiBibGFjaztcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAucG9sbENvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGNsZWFyOiBib3RoO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAycHg7XG59XG5hcHAtY29tbXVuaXR5Ym9hcmQgLm9wdGlvbnNDb250YWluZXIge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDYwJTtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAub3B0aW9uc0NvbnRhaW5lciAub3B0aW9uIHtcbiAgcGFkZGluZy10b3A6IDVweDtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAudm90ZXNDb250YWluZXIge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDIwJTtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAudm90ZXNDb250YWluZXIgLnZvdGVjb3VudCB7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtc2l6ZTogeC1zbWFsbDtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAudXNlckNvbnRhaW5lciB7XG4gIGZsb2F0OiByaWdodDtcbiAgd2lkdGg6IDIwJTtcbn1cbmFwcC1jb21tdW5pdHlib2FyZCAudXNlckNvbnRhaW5lciAudXNlcnZvdGUge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xuICBmb250LXNpemU6IHgtc21hbGw7XG4gIHdpZHRoOiA5MCU7XG4gIGhlaWdodDogMzBweDtcbiAgY29sb3I6IGJsYWNrO1xufVxuYXBwLWNvbW11bml0eWJvYXJkIC51c2VyQ29udGFpbmVyIC51c2Vydm90ZWQge1xuICBwYWRkaW5nLXRvcDogMjBweDtcbiAgd2lkdGg6IDMwJTtcbiAgbWFyZ2luOiAwIDQwJTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/board/communityboard/communityboard.page.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/board/communityboard/communityboard.page.ts ***!
  \*******************************************************************/
/*! exports provided: CommunityboardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityboardPage", function() { return CommunityboardPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_board_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/board.service */ "./src/app/services/board.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _services_response_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/response.service */ "./src/app/services/response.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _editboardpost_editboardpost_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../editboardpost/editboardpost.page */ "./src/app/pages/board/editboardpost/editboardpost.page.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _showboardpost_showboardpost_page__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../showboardpost/showboardpost.page */ "./src/app/pages/board/showboardpost/showboardpost.page.ts");
/* harmony import */ var _community_showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../community/showcommunity/showcommunity.page */ "./src/app/pages/community/showcommunity/showcommunity.page.ts");
/* harmony import */ var _groupboard_groupboard_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../groupboard/groupboard.page */ "./src/app/pages/board/groupboard/groupboard.page.ts");
/* harmony import */ var _community_editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../community/editcommunity/editcommunity.page */ "./src/app/pages/community/editcommunity/editcommunity.page.ts");
/* harmony import */ var _group_editgroup_editgroup_page__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../group/editgroup/editgroup.page */ "./src/app/pages/group/editgroup/editgroup.page.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../group/groupchat/groupchat.page */ "./src/app/pages/group/groupchat/groupchat.page.ts");
/* harmony import */ var _group_showgroup_showgroup_page__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../group/showgroup/showgroup.page */ "./src/app/pages/group/showgroup/showgroup.page.ts");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
























var CommunityboardPage = /** @class */ (function () {
    function CommunityboardPage(platform, cache, router, storage, actionSheetCtrl, navCtrl, authService, momentService, resourceService, responseService, boardService, chatService, userData, churchService, groupService, modalCtrl, alertCtrl) {
        var _this = this;
        this.platform = platform;
        this.cache = cache;
        this.router = router;
        this.storage = storage;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.momentService = momentService;
        this.resourceService = resourceService;
        this.responseService = responseService;
        this.boardService = boardService;
        this.chatService = chatService;
        this.userData = userData;
        this.churchService = churchService;
        this.groupService = groupService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.searchKeyword = '';
        this.communityNum = 0;
        this.reachedEnd = false;
        this.ionSpinner = false;
        this.isGroupLeader = false;
        this.newsfeedMoreOptions = false;
        this.mediaList = [];
        this.subscriptions = {};
        this.refreshPage = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, boardId, data, _f, _g, community, _h, _j, board, index, _k, _l, boardpost, index, _m, _o, boardpost, _p, _q, boardpost, e_2_1, e_1_1;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        if (!(res && res.type === 'refresh community board page')) return [3 /*break*/, 2];
                        this.newsfeedMoreOptions = false;
                        return [4 /*yield*/, this.boardService.loadUserChurchBoards()];
                    case 1:
                        _r.sent();
                        this.reloadBoardPosts();
                        _r.label = 2;
                    case 2:
                        if (!(res && res.type === 'refresh board')) return [3 /*break*/, 21];
                        boardId = res.boardId;
                        data = res.data;
                        _r.label = 3;
                    case 3:
                        _r.trys.push([3, 19, 20, 21]);
                        _f = __values(this.communitiesboards), _g = _f.next();
                        _r.label = 4;
                    case 4:
                        if (!!_g.done) return [3 /*break*/, 18];
                        community = _g.value;
                        _r.label = 5;
                    case 5:
                        _r.trys.push([5, 15, 16, 17]);
                        _h = __values(community.boards), _j = _h.next();
                        _r.label = 6;
                    case 6:
                        if (!!_j.done) return [3 /*break*/, 14];
                        board = _j.value;
                        if (!(board._id === boardId)) return [3 /*break*/, 13];
                        board.updatedAt = new Date().toISOString();
                        if (!(data.action === 'create post')) return [3 /*break*/, 7];
                        this.reloadBoardPosts();
                        return [3 /*break*/, 13];
                    case 7:
                        if (!(data.action === 'delete post')) return [3 /*break*/, 8];
                        index = board.posts.map(function (c) { return c._id; }).indexOf(data.postId);
                        if (board.posts[index].media && board.posts[index].media.length) {
                            this.destroyPlayers(board.posts[index].media._id);
                        }
                        board.posts.splice(index, 1);
                        this.reorderCommunitiesBoards();
                        return [3 /*break*/, 13];
                    case 8:
                        if (!(data.action === 'like' || data.action === 'cancel like')) return [3 /*break*/, 9];
                        try {
                            for (_k = __values(board.posts), _l = _k.next(); !_l.done; _l = _k.next()) {
                                boardpost = _l.value;
                                if (boardpost.bucketId === data.bucketId && boardpost._id === data.postId) {
                                    if (data.action === 'like') {
                                        boardpost.likes.push(data.author);
                                    }
                                    else if (data.action === 'cancel like') {
                                        index = boardpost.likes.indexOf(data.author);
                                        boardpost.likes.splice(index, 1);
                                    }
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [3 /*break*/, 13];
                    case 9:
                        if (!(data.action === 'update post')) return [3 /*break*/, 10];
                        try {
                            for (_m = __values(board.posts), _o = _m.next(); !_o.done; _o = _m.next()) {
                                boardpost = _o.value;
                                if (boardpost._id === data.post._id) {
                                    boardpost.body = data.post.body;
                                    boardpost.attachments = data.post.attachments;
                                    if (boardpost.media && boardpost.media.length && data.post.media && !data.post.media.length) {
                                        this.destroyPlayers(boardpost.media[0]._id);
                                    }
                                    boardpost.media = data.post.media;
                                    this.reorderCommunitiesBoards();
                                    if (data.post.moments && data.post.moments.length && data.post.moments[0] && data.post.moments[0].resource.hasOwnProperty('en-US') && data.post.moments[0].resource['en-US'].value[0] === 'Poll') {
                                        this.reloadBoardPosts(); //reload is needed to create a new moment socket.io for the feature
                                    }
                                    else {
                                        boardpost.moments = data.post.moments;
                                    }
                                }
                                if (boardpost.comments && boardpost.comments.length && boardpost.comments[0]) {
                                    this.reloadBoardPosts();
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        return [3 /*break*/, 13];
                    case 10:
                        if (!(data.action === 'create comment')) return [3 /*break*/, 11];
                        console.log("create comment", data);
                        try {
                            for (_p = __values(board.posts), _q = _p.next(); !_q.done; _q = _p.next()) {
                                boardpost = _q.value;
                                if (boardpost._id === data.comment.parentId) { //first level comment
                                    boardpost.comments.unshift(data.comment);
                                }
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        return [3 /*break*/, 13];
                    case 11: // data.action === 'refresh board'. Need to refresh all users' feeds
                    return [4 /*yield*/, this.boardService.loadUserChurchBoards()];
                    case 12:
                        _r.sent();
                        this.reloadBoardPosts();
                        _r.label = 13;
                    case 13:
                        _j = _h.next();
                        return [3 /*break*/, 6];
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        e_2_1 = _r.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 17];
                    case 16:
                        try {
                            if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 17:
                        _g = _f.next();
                        return [3 /*break*/, 4];
                    case 18: return [3 /*break*/, 21];
                    case 19:
                        e_1_1 = _r.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 21];
                    case 20:
                        try {
                            if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 21: return [2 /*return*/];
                }
            });
        }); };
        this.refreshMomentHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var e_6, _a, e_7, _b, e_8, _c, e_9, _d, data, _e, _f, community, _g, _h, board, _j, _k, boardpost, index, _l, _m, response, e_8_1, e_7_1, e_6_1;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        if (!(res && res.momentId && res.data)) return [3 /*break*/, 20];
                        data = res.data;
                        _o.label = 1;
                    case 1:
                        _o.trys.push([1, 18, 19, 20]);
                        _e = __values(this.communitiesboards), _f = _e.next();
                        _o.label = 2;
                    case 2:
                        if (!!_f.done) return [3 /*break*/, 17];
                        community = _f.value;
                        _o.label = 3;
                    case 3:
                        _o.trys.push([3, 14, 15, 16]);
                        _g = __values(community.boards), _h = _g.next();
                        _o.label = 4;
                    case 4:
                        if (!!_h.done) return [3 /*break*/, 13];
                        board = _h.value;
                        _o.label = 5;
                    case 5:
                        _o.trys.push([5, 10, 11, 12]);
                        _j = __values(board.posts), _k = _j.next();
                        _o.label = 6;
                    case 6:
                        if (!!_k.done) return [3 /*break*/, 9];
                        boardpost = _k.value;
                        if (!(boardpost.moments && boardpost.moments.length && data.moment && (boardpost.moments[0]._id === data.moment._id) && boardpost.moments[0].resource.hasOwnProperty('en-US') && boardpost.moments[0].resource['en-US'].value[0] === 'Poll')) return [3 /*break*/, 8];
                        index = boardpost.poll.responses.map(function (c) { return c._id; }).indexOf(data.response._id);
                        if (index < 0) { //if the response hasn't been added to the response list
                            boardpost.poll.responses.push(data.response);
                        }
                        else { //if it has been added, replace with the incoming one
                            boardpost.poll.responses.splice(index, 1, data.response);
                        }
                        //now the latest response have been included, reset the display array
                        return [4 /*yield*/, boardpost.poll.display.forEach(function (displayitem) {
                                displayitem.count = 0;
                                displayitem.votedByUser = false;
                            })];
                    case 7:
                        //now the latest response have been included, reset the display array
                        _o.sent();
                        //reconstruct the display array
                        boardpost.poll.totalVoteCount = boardpost.poll.responses.length;
                        try {
                            for (_l = __values(boardpost.poll.responses), _m = _l.next(); !_m.done; _m = _l.next()) {
                                response = _m.value;
                                if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                    if (response.matrix_number[0][1] > (boardpost.poll.display.length - 1)) {
                                        return [2 /*return*/]; // if this response belongs to an option that has been deleted
                                    }
                                    if (this.userData.user && response.user._id === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                        boardpost.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                    }
                                    boardpost.poll.display[response.matrix_number[0][1]].count++;
                                }
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                        _o.label = 8;
                    case 8:
                        _k = _j.next();
                        return [3 /*break*/, 6];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_8_1 = _o.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_8) throw e_8.error; }
                        return [7 /*endfinally*/];
                    case 12:
                        _h = _g.next();
                        return [3 /*break*/, 4];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_7_1 = _o.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 16];
                    case 15:
                        try {
                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7 /*endfinally*/];
                    case 16:
                        _f = _e.next();
                        return [3 /*break*/, 2];
                    case 17: return [3 /*break*/, 20];
                    case 18:
                        e_6_1 = _o.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 20];
                    case 19:
                        try {
                            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 20: return [2 /*return*/];
                }
            });
        }); };
    }
    CommunityboardPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // PWA fast load is executed after an event sent from app.component.ts's checkAuthenticationWithToken()
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshPage);
                this.subscriptions['refreshMoment'] = this.momentService.refreshMoment$.subscribe(this.refreshMomentHandler);
                return [2 /*return*/];
            });
        });
    };
    CommunityboardPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userData.user) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.boardService.loadUserChurchBoards()];
                    case 1:
                        _a.sent();
                        this.reloadBoardPosts();
                        this.content.scrollToTop(0);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.reloadBoardPosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.destroyPlayers(null);
                        this.infiniteScroll.disabled = false;
                        this.reachedEnd = false;
                        this.communitiesboards = [];
                        this.communityNum = -1;
                        this.listcommunityboardposts({ target: this.infiniteScroll });
                        return [2 /*return*/];
                    });
                }); }, 100);
                return [2 /*return*/];
            });
        });
    };
    CommunityboardPage.prototype.listcommunityboardposts = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var e_10, _a, currentCommunityId, selectedCurrentCommunity, selectedRestvo, buckets, _loop_1, this_1, _b, _c, board, e_10_1;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.communityNum++;
                        currentCommunityId = '';
                        if (this.userData.user && this.userData.user.churches && this.userData.user.churches.length) {
                            currentCommunityId = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
                        }
                        else {
                            currentCommunityId = '5ab62be8f83e2c1a8d41f894';
                        }
                        selectedCurrentCommunity = (currentCommunityId === this.userData.communitiesboards[this.communityNum]._id);
                        selectedRestvo = (currentCommunityId === '5ab62be8f83e2c1a8d41f894');
                        if (!(!this.reachedEnd && (selectedCurrentCommunity))) return [3 /*break*/, 11];
                        buckets = void 0;
                        this.communitiesboards.push(this.userData.communitiesboards[this.communityNum]);
                        this.communitiesboards[this.communitiesboards.length - 1].postCount = 0;
                        _loop_1 = function (board) {
                            var e_11, _a, e_12, _b, e_13, _c, _loop_2, buckets_1, buckets_1_1, bucket, momentIds, _d, _e, post, _f, _g, option, responseRequest, responseResponse;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        board.posts = [];
                                        board.preview_posts = [];
                                        board.postCount = 0;
                                        return [4 /*yield*/, this_1.boardService.loadBoardBuckets(board._id, this_1.searchKeyword, 1)];
                                    case 1:
                                        buckets = _h.sent(); // load the first page of each feed
                                        this_1.ionSpinner = false;
                                        _loop_2 = function (bucket) {
                                            bucket.posts.forEach(function (post, i) {
                                                _this.communitiesboards[_this.communitiesboards.length - 1].postCount++;
                                                board.postCount++;
                                                post.bucketId = bucket._id;
                                                board.posts.push(post);
                                                if (((new Date().getTime() - new Date(post.updatedAt).getTime()) < 7 * 24 * 60 * 60 * 1000) || i < 2) {
                                                    board.preview_posts.push(post);
                                                }
                                            });
                                        };
                                        try {
                                            for (buckets_1 = __values(buckets), buckets_1_1 = buckets_1.next(); !buckets_1_1.done; buckets_1_1 = buckets_1.next()) {
                                                bucket = buckets_1_1.value;
                                                _loop_2(bucket);
                                            }
                                        }
                                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                                        finally {
                                            try {
                                                if (buckets_1_1 && !buckets_1_1.done && (_a = buckets_1.return)) _a.call(buckets_1);
                                            }
                                            finally { if (e_11) throw e_11.error; }
                                        }
                                        momentIds = [];
                                        try {
                                            for (_d = __values(board.posts), _e = _d.next(); !_e.done; _e = _d.next()) {
                                                post = _e.value;
                                                if (post.moments && post.moments.length && post.moments[0].resource && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] === 'Poll') {
                                                    momentIds.push(post.moments[0]._id);
                                                    post.poll = {
                                                        display: [],
                                                        responses: [],
                                                        winner: [],
                                                        totalVoteCount: 0
                                                    };
                                                    try {
                                                        for (_f = __values(post.moments[0].matrix_string[1]), _g = _f.next(); !_g.done; _g = _f.next()) {
                                                            option = _g.value;
                                                            post.poll.display.push({ option: option, votedByUser: false, count: 0 });
                                                        }
                                                    }
                                                    catch (e_13_1) { e_13 = { error: e_13_1 }; }
                                                    finally {
                                                        try {
                                                            if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                                                        }
                                                        finally { if (e_13) throw e_13.error; }
                                                    }
                                                }
                                                //this.communitiesboards.push(post);
                                            }
                                        }
                                        catch (e_12_1) { e_12 = { error: e_12_1 }; }
                                        finally {
                                            try {
                                                if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                                            }
                                            finally { if (e_12) throw e_12.error; }
                                        }
                                        if (momentIds.length) {
                                            momentIds.forEach(function (momentId) {
                                                if (_this.momentService.socket) {
                                                    _this.momentService.socket.emit('join moment', momentId);
                                                }
                                            });
                                            responseRequest = this_1.responseService.findResponsesByMomentIds(JSON.parse(JSON.stringify(momentIds)));
                                            responseResponse = this_1.cache.loadFromDelayedObservable('response-' + board._id, responseRequest, 'boards', 5, 'all');
                                            responseResponse.subscribe(function (responses) { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    board.posts.forEach(function (boardpost) { return __awaiter(_this, void 0, void 0, function () {
                                                        var e_14, _a, e_15, _b, responses_1, responses_1_1, response, index, _c, _d, response;
                                                        return __generator(this, function (_e) {
                                                            switch (_e.label) {
                                                                case 0:
                                                                    if (!(boardpost.moments[0] && boardpost.moments[0].resource && boardpost.moments[0].resource.field && boardpost.moments[0].resource.hasOwnProperty('en-US') && boardpost.moments[0].resource['en-US'].value[0] === 'Poll')) return [3 /*break*/, 2];
                                                                    try {
                                                                        for (responses_1 = __values(responses), responses_1_1 = responses_1.next(); !responses_1_1.done; responses_1_1 = responses_1.next()) {
                                                                            response = responses_1_1.value;
                                                                            if (response.moment == boardpost.moments[0]._id) {
                                                                                index = boardpost.poll.responses.map(function (c) { return c._id; }).indexOf(response._id);
                                                                                if (index < 0) { //if the response hasn't been added to the response list
                                                                                    boardpost.poll.responses.push(response);
                                                                                }
                                                                                else { //if it has been added, and if the incoming response is newer
                                                                                    if (new Date(boardpost.poll.responses[index].createdAt).getTime() < new Date(response.createdAt).getTime()) {
                                                                                        boardpost.poll.responses.splice(index, 1, response);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    catch (e_14_1) { e_14 = { error: e_14_1 }; }
                                                                    finally {
                                                                        try {
                                                                            if (responses_1_1 && !responses_1_1.done && (_a = responses_1.return)) _a.call(responses_1);
                                                                        }
                                                                        finally { if (e_14) throw e_14.error; }
                                                                    }
                                                                    //now the latest response have been included, reset the display array
                                                                    return [4 /*yield*/, boardpost.poll.display.forEach(function (displayitem) {
                                                                            displayitem.count = 0;
                                                                            displayitem.votedByUser = false;
                                                                        })];
                                                                case 1:
                                                                    //now the latest response have been included, reset the display array
                                                                    _e.sent();
                                                                    //reconstruct the display array
                                                                    boardpost.poll.totalVoteCount = boardpost.poll.responses.length;
                                                                    try {
                                                                        for (_c = __values(boardpost.poll.responses), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                                            response = _d.value;
                                                                            if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                                                                if (response.matrix_number[0][1] > (boardpost.poll.display.length - 1)) {
                                                                                    return [2 /*return*/]; // if this response belongs to an option that has been deleted
                                                                                }
                                                                                if (this.userData.user && response.user === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                                                                    boardpost.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                                                                }
                                                                                boardpost.poll.display[response.matrix_number[0][1]].count++;
                                                                            }
                                                                        }
                                                                    }
                                                                    catch (e_15_1) { e_15 = { error: e_15_1 }; }
                                                                    finally {
                                                                        try {
                                                                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                                                        }
                                                                        finally { if (e_15) throw e_15.error; }
                                                                    }
                                                                    _e.label = 2;
                                                                case 2: return [2 /*return*/];
                                                            }
                                                        });
                                                    }); });
                                                    return [2 /*return*/];
                                                });
                                            }); });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _b = __values(this.communitiesboards[this.communitiesboards.length - 1].boards), _c = _b.next();
                        _d.label = 2;
                    case 2:
                        if (!!_c.done) return [3 /*break*/, 5];
                        board = _c.value;
                        return [5 /*yield**/, _loop_1(board)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _c = _b.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_10_1 = _d.sent();
                        e_10 = { error: e_10_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_10) throw e_10.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        if (this.newsfeedMoreOptions) {
                            this.loadCommunityGroups(this.communitiesboards[this.communitiesboards.length - 1]);
                        }
                        event.target.complete();
                        if (!(this.communitiesboards[this.communitiesboards.length - 1].postCount < 4 && this.communityNum < (this.userData.communitiesboards.length - 1))) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.listcommunityboardposts({ target: this.infiniteScroll })];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10:
                        if ((selectedCurrentCommunity /* && !selectedRestvo*/) || this.communityNum === (this.userData.communitiesboards.length - 1)) {
                            this.reachedEnd = true;
                            event.target.disabled = true;
                        }
                        return [3 /*break*/, 14];
                    case 11:
                        this.ionSpinner = false;
                        if (!(this.communityNum < this.userData.communitiesboards.length - 1)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.listcommunityboardposts({ target: this.infiniteScroll })];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13:
                        if (this.communityNum === this.userData.communitiesboards.length - 1) {
                            this.reachedEnd = true;
                            event.target.disabled = true;
                        }
                        event.target.complete();
                        _d.label = 14;
                    case 14:
                        console.log("check", this.communitiesboards);
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.loadMorePosts = function (board) {
        board.preview_posts = board.posts;
    };
    CommunityboardPage.prototype.openBoard = function (event, board, community) {
        return __awaiter(this, void 0, void 0, function () {
            var alert_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!(board.group && board._id)) return [3 /*break*/, 1];
                        /*let selectedBoard = JSON.parse(JSON.stringify(board));
                        let selectedGroup = JSON.parse(JSON.stringify(board.group));
                        delete selectedBoard.group;
                        selectedGroup.board = board._id;
                        selectedGroup.name = board.name;
                        const boardPage = await this.modalCtrl.create({component: GroupboardPage, componentProps: {
                                group: selectedGroup,
                                page: 'board'
                            }});
                        await boardPage.present();*/
                        this.createNewPost(board);
                        return [3 /*break*/, 6];
                    case 1: return [4 /*yield*/, this.userData.hasAdminAccess(community._id)];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        this.createNewPost(board);
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Community Topic',
                            subHeader: 'You do not have access to post in ' + community.name + ' - ' + board.name + '. Submitting post to a community topic will be available in a future release.',
                            buttons: ['Dismiss'],
                            cssClass: 'level-15'
                        })];
                    case 4:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.createNewBoard = function (community) {
        return __awaiter(this, void 0, void 0, function () {
            var hasAdminAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hasAdminAccess = false;
                        if (!(this.userData.user.churches[this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.hasAdminAccess(community._id)];
                    case 1:
                        hasAdminAccess = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        hasAdminAccess = this.userData.currentCommunityAdminStatus;
                        _a.label = 3;
                    case 3:
                        this.promptBoardName(hasAdminAccess, community._id);
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.promptBoardName = function (access, communityId) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Enter a Name for the new Topic:',
                            inputs: [{
                                    name: 'name',
                                    type: 'text',
                                    placeholder: 'Name for the new Topic'
                                }],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel topic creation');
                                        return;
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        if (access) {
                                            _this.promptBoardType(data.name, communityId);
                                        }
                                        else {
                                            _this.createPersonalBoard(data.name, communityId);
                                        }
                                    }
                                }
                            ],
                            cssClass: 'level-15'
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.promptBoardType = function (name, communityId) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Make ' + name + ' a default News Feed for all community members?',
                            inputs: [{
                                    name: 'community',
                                    type: 'radio',
                                    label: 'Yes, set as default.',
                                    value: 'default',
                                    checked: true
                                },
                                {
                                    name: 'personal',
                                    type: 'radio',
                                    label: 'No, leave it as optional.',
                                    value: 'optional'
                                }],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel topic creation');
                                        return;
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        console.log("result", data);
                                        if (data === 'default') {
                                            _this.createCommunityBoard(name, communityId);
                                        }
                                        else {
                                            _this.createPersonalBoard(name, communityId);
                                        }
                                    }
                                }
                            ],
                            cssClass: 'level-15'
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.createCommunityBoard = function (name, communityId) {
        return __awaiter(this, void 0, void 0, function () {
            var boardId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ionSpinner = true;
                        return [4 /*yield*/, this.churchService.editCommunityBoard({ action: "create", board: { name: name, church: communityId } })];
                    case 1:
                        boardId = _a.sent();
                        //refresh the boards slide array
                        this.boardService.socket.emit('join board', boardId);
                        this.reloadBoardPosts();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.createPersonalBoard = function (name, communityId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, church, group, createdGroup;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.ionSpinner = true;
                        return [4 /*yield*/, this.churchService.loadChurchProfile(communityId)];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), church = _a[0];
                        group = { name: name, details: '', emailDisabled: false, smsDisabled: false, churchId: communityId, board: '', meeting_day: '', meeting_frequency: '', beginAt: new Date().toISOString(), endAt: new Date().toISOString(), meeting_location: { location: '', street: church.meeting_location.street, city: church.meeting_location.city, state: church.meeting_location.state, country: church.meeting_location.country }, published: false, public_group: true, flagged: false, publishedAt: null, expiredAt: null };
                        return [4 /*yield*/, this.groupService.createGroupProfile(group)];
                    case 2:
                        createdGroup = _b.sent();
                        //refresh the boards slide array
                        this.boardService.socket.emit('join board', createdGroup.board);
                        this.reloadBoardPosts();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.createNewPost = function (board) {
        return __awaiter(this, void 0, void 0, function () {
            var editPostPage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _editboardpost_editboardpost_page__WEBPACK_IMPORTED_MODULE_13__["EditboardpostPage"], componentProps: { boardId: board._id } })];
                    case 1:
                        editPostPage = _a.sent();
                        return [4 /*yield*/, editPostPage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, editPostPage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            //this.reloadBoardPosts();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.openPost = function (event, board, post) {
        return __awaiter(this, void 0, void 0, function () {
            var isGroupLeader, hasAdminAccess, showBoardPage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        isGroupLeader = false;
                        hasAdminAccess = false;
                        if (board.group && board.group.leaders) {
                            isGroupLeader = board.group.leaders.map(function (c) { return c._id; }).indexOf(this.userData.user._id) > -1;
                        }
                        if (!(board.group && board.group.churchId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.hasAdminAccess(board.group.churchId)];
                    case 1:
                        hasAdminAccess = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.modalCtrl.create({ component: _showboardpost_showboardpost_page__WEBPACK_IMPORTED_MODULE_15__["ShowboardpostPage"], componentProps: { boardId: board._id, post: post, isGroupLeader: isGroupLeader, hasAdminAccess: hasAdminAccess } })];
                    case 3:
                        showBoardPage = _a.sent();
                        return [4 /*yield*/, showBoardPage.present()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, showBoardPage.onDidDismiss()];
                    case 5:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            //this.reloadBoardPosts();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.openRestvoFeature = function (event, moment) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_23__["ShowfeaturePage"], componentProps: { moment: moment, modalPage: true } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.reloadBoardPosts();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.likePost = function (event, board, post) {
        return __awaiter(this, void 0, void 0, function () {
            var action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        action = (post.likes.indexOf(this.userData.user._id) > -1) ? "cancel like" : "like";
                        return [4 /*yield*/, this.boardService.likePost(board._id, post.bucketId, post._id, action)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.showCommunityProfile = function (community) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _community_showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_16__["ShowcommunityPage"],
                            componentProps: { community: community, modalPage: true } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.seeUserInfo = function (event, recipient) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_14__["ShowrecipientinfoPage"], componentProps: { recipient: recipient, modalPage: true } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.presentPickPeoplePopover = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Sharing is Coming Soon',
                                subHeader: 'This feature will be available in a future release.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //get the latest user data from the server
    CommunityboardPage.prototype.refresh = function (event) {
        this.ionSpinner = true;
        this.communitiesboards = [];
        this.reloadBoardPosts();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    CommunityboardPage.prototype.noNetworkConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var networkAlert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'No Internet Connection',
                            subHeader: 'Please check your internet connection.',
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
        });
    };
    CommunityboardPage.prototype.displayTimeElapsed = function (dateTime) {
        var minElapsed = Math.round((new Date().getTime() - new Date(dateTime).getTime()) / (1000 * 60));
        if (minElapsed < 60) {
            return minElapsed.toString() + 'm ago';
        }
        else if (minElapsed >= 60 && minElapsed < (60 * 24)) {
            return Math.round(minElapsed / 60).toString() + 'h ago';
        }
        else if (minElapsed >= (60 * 24) && minElapsed < (60 * 24 * 6)) {
            return Math.round(minElapsed / (60 * 24)).toString() + 'd ago';
        }
        else if (minElapsed >= (60 * 24 * 6) && minElapsed < (60 * 24 * 30)) {
            return Math.round(minElapsed / (60 * 24 * 7)).toString() + 'wk ago';
        }
        else {
            return Math.round(minElapsed / (60 * 24 * 30)).toString() + 'mo ago';
        }
    };
    CommunityboardPage.prototype.reorderCommunitiesBoards = function () {
        var e_16, _a;
        try {
            for (var _b = __values(this.communitiesboards), _c = _b.next(); !_c.done; _c = _b.next()) { // sort each community's feeds' order
                var community = _c.value;
                community.boards.sort(function (a, b) {
                    var c = new Date(a.updatedAt);
                    var d = new Date(b.updatedAt);
                    return (d - c);
                });
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_16) throw e_16.error; }
        }
        this.communitiesboards.sort(function (a, b) {
            var e = new Date(a.boards[0].updatedAt);
            var f = new Date(b.boards[0].updatedAt);
            return (f - e);
        });
    };
    CommunityboardPage.prototype.createNewCommunity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var industries;
            var _this = this;
            return __generator(this, function (_a) {
                industries = [];
                this.resourceService.load('en-US', "Industry").subscribe(function (fields) { return __awaiter(_this, void 0, void 0, function () {
                    var i, editCommunity, refreshNeeded;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                for (i = 0; i < fields.length; i++) {
                                    console.log("id", fields[i]._id);
                                    industries.push({ _id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false });
                                }
                                return [4 /*yield*/, this.modalCtrl.create({ component: _community_editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_18__["EditcommunityPage"], componentProps: { industries: industries } })];
                            case 1:
                                editCommunity = _a.sent();
                                return [4 /*yield*/, editCommunity.present()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, editCommunity.onDidDismiss()];
                            case 3:
                                refreshNeeded = (_a.sent()).data;
                                if (refreshNeeded) {
                                    //this.loadMap();
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
    CommunityboardPage.prototype.createNewGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editGroupPage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _group_editgroup_editgroup_page__WEBPACK_IMPORTED_MODULE_19__["EditgroupPage"], componentProps: { personalGroup: false, publishGroup: false } })];
                    case 1:
                        editGroupPage = _a.sent();
                        return [4 /*yield*/, editGroupPage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, editGroupPage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.router.navigateByUrl('/app/myconversations/chat');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.setupLoadGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_17, _a, _b, _c, community;
            return __generator(this, function (_d) {
                this.newsfeedMoreOptions = !this.newsfeedMoreOptions;
                if (this.newsfeedMoreOptions) {
                    try {
                        try {
                            for (_b = __values(this.communitiesboards), _c = _b.next(); !_c.done; _c = _b.next()) {
                                community = _c.value;
                                this.loadCommunityGroups(community);
                            }
                        }
                        catch (e_17_1) { e_17 = { error: e_17_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_17) throw e_17.error; }
                        }
                    }
                    catch (err) {
                        this.ionSpinner = false;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    CommunityboardPage.prototype.loadCommunityGroups = function (community) {
        return __awaiter(this, void 0, void 0, function () {
            var groups, listOfCurrentCommunityBoardIds, listOfUserGroupIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.churchService.loadChurchGroupProfiles(community._id, 'all')];
                    case 1:
                        groups = _a.sent();
                        this.ionSpinner = false;
                        community.topics = []; // reset the array
                        community.groups = [];
                        listOfCurrentCommunityBoardIds = community.boards.map(function (c) { return c._id; });
                        listOfUserGroupIds = this.userData.user.groups.map(function (c) { return c._id; });
                        groups.forEach(function (group) {
                            group.joined = listOfUserGroupIds.indexOf(group._id) > -1;
                            if (group.board) {
                                if (listOfCurrentCommunityBoardIds.indexOf(group.board) < 0) {
                                    community.topics.push(group);
                                }
                            }
                            else if (group.conversation) {
                                community.groups.push(group);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.showGroupProfile = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            var groupIds, groupPage, refreshNeeded, groupPage, refreshNeeded, aboutPage, groupPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupIds = this.userData.user.groups.map(function (c) { return c._id; });
                        if (!(groupIds.indexOf(group._id) > -1 || this.userData.currentCommunityAdminStatus)) return [3 /*break*/, 9];
                        if (!group.conversation) return [3 /*break*/, 4];
                        this.chatService.currentChatProps.push({
                            conversationId: group.conversation,
                            name: group.name,
                            group: group,
                            badge: true,
                            page: 'chat',
                            modalPage: true
                        });
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_21__["GroupchatPage"],
                                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                            })];
                    case 1:
                        groupPage = _a.sent();
                        return [4 /*yield*/, groupPage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, groupPage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.setupLoadGroups();
                        }
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, this.modalCtrl.create({ component: _groupboard_groupboard_page__WEBPACK_IMPORTED_MODULE_17__["GroupboardPage"], componentProps: {
                                group: group,
                                page: 'board'
                            } })];
                    case 5:
                        groupPage = _a.sent();
                        return [4 /*yield*/, groupPage.present()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, groupPage.onDidDismiss()];
                    case 7:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.setupLoadGroups();
                        }
                        _a.label = 8;
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        if (!group.conversation) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _group_showgroup_showgroup_page__WEBPACK_IMPORTED_MODULE_22__["ShowgroupPage"], componentProps: {
                                    group: group
                                } })];
                    case 10:
                        aboutPage = _a.sent();
                        return [4 /*yield*/, aboutPage.present()];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 12:
                        if (!group.board) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _groupboard_groupboard_page__WEBPACK_IMPORTED_MODULE_17__["GroupboardPage"], componentProps: {
                                    group: group,
                                    page: 'board'
                                } })];
                    case 13:
                        groupPage = _a.sent();
                        return [4 /*yield*/, groupPage.present()];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    CommunityboardPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        //this.ionSpinner = true;
        this.setupLoadGroups();
    };
    CommunityboardPage.prototype.initPlyr = function (event, mediaId) {
        var player;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player });
    };
    CommunityboardPage.prototype.destroyPlayers = function (mediaId) {
        var e_18, _a;
        if (mediaId) {
            var media = this.mediaList.find(function (c) { return c._id === mediaId; });
            media.player.destroy();
        }
        else {
            try {
                for (var _b = __values(this.mediaList), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var media = _c.value;
                    media.player.destroy();
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_18) throw e_18.error; }
            }
        }
    };
    CommunityboardPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshPage);
    };
    CommunityboardPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["Auth"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_7__["Moment"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_20__["Resource"] },
        { type: _services_response_service__WEBPACK_IMPORTED_MODULE_9__["Response"] },
        { type: _services_board_service__WEBPACK_IMPORTED_MODULE_6__["Board"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_11__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_10__["Churches"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_8__["Groups"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"])
    ], CommunityboardPage.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonSlides"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonSlides"])
    ], CommunityboardPage.prototype, "slides", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInfiniteScroll"])
    ], CommunityboardPage.prototype, "infiniteScroll", void 0);
    CommunityboardPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-communityboard',
            template: __importDefault(__webpack_require__(/*! raw-loader!./communityboard.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/communityboard/communityboard.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./communityboard.page.scss */ "./src/app/pages/board/communityboard/communityboard.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["Auth"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_7__["Moment"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_20__["Resource"],
            _services_response_service__WEBPACK_IMPORTED_MODULE_9__["Response"],
            _services_board_service__WEBPACK_IMPORTED_MODULE_6__["Board"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_11__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_10__["Churches"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_8__["Groups"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"]])
    ], CommunityboardPage);
    return CommunityboardPage;
}());



/***/ })

}]);
//# sourceMappingURL=board-communityboard-communityboard-module.js.map