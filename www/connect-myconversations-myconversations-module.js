(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["connect-myconversations-myconversations-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/myconversations/myconversations.page.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/myconversations/myconversations.page.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"lightgrey\" *ngIf=\"(platform.is('mobileweb') && (platform.is('ios') || platform.is('android'))) && userData.showDownloadLink\">\n    <ion-item-sliding side=\"end\">\n      <ion-item lines=\"none\"  color=\"lightgrey\">\n        <ion-avatar slot=\"start\">\n          <ion-img src=\"assets/img/icon.png\"></ion-img>\n        </ion-avatar>\n        <div class=\"details\" class=\"ion-text-wrap\">\n          <a *ngIf=\"platform.is('ios')\" href=\"https://itunes.apple.com/us/app/restvo-connect-with-churches/id1365903479?ls=1&mt=8\" style=\"font-size: 14px; color: var(--ion-color-button1)\">Download app for better experience</a>\n          <a *ngIf=\"platform.is('android')\" href=\"https://play.google.com/store/apps/details?id=com.restvo.app\" style=\"font-size: 14px; color: var(--ion-color-button1)\">Download app for better experience</a>\n        </div>\n        <ion-icon name=\"chevron-forward-outline\" color=\"primary\" slot=\"end\"></ion-icon>\n        <!--<ion-button fill=\"clear\" slot=\"end\"><ion-icon name=\"close\"></ion-icon></ion-button>-->\n      </ion-item>\n      <ion-item-options>\n        <ion-item-option color=\"primary\" (click)=\"userData.showDownloadLink = false\">\n          Dismiss\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-menu-toggle menu=\"main\" *ngIf=\"userData.user\" slot=\"start\">\n      <ion-button fill=\"clear\" color=\"grey\">\n        <ion-icon name=\"menu\"></ion-icon>\n      </ion-button>\n      <ion-badge *ngIf=\"this.chatService && this.chatService.connectTabBadge\" mode=\"md\">{{this.chatService.connectTabBadge}}</ion-badge>\n    </ion-menu-toggle>\n    <ion-title>Chat</ion-title>\n    <ion-item lines=\"none\" routerLink=\"/app/user/profile\" *ngIf=\"userData.user && platform.width() >= 768\" slot=\"end\" mode=\"md\" style=\"--background: transparent\">\n      <ion-avatar slot=\"start\">\n        <ion-img *ngIf=\"userData.user && userData.user.avatar\" [src]=\"userData.user.avatar\"></ion-img>\n        <ion-img *ngIf=\"!userData.user || !userData.user.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n      </ion-avatar>\n      <ion-label>\n        {{userData.user.first_name}} {{userData.user.last_name}}\n      </ion-label>\n    </ion-item>\n    <ion-buttons slot=\"end\" *ngIf=\"!userData.user\">\n      <ion-button routerLink=\"/register\" color=\"grey\">\n        Sign In\n      </ion-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"createNewChat()\" [disabled]=\"!finishedLoading\"  color=\"grey\">\n        <ion-icon name=\"add\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n  <ion-toolbar *ngIf=\"platform.width() < 768\">\n    <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\" (ionCancel)=\"cancelSearch($event)\" value=\"\"></ion-searchbar>\n  </ion-toolbar>\n  <!--<ion-toolbar [hidden]=\"((userData.user && userData.user.enablePushNotification) || userData.delayPushNotificationReminder) && (!platform.is('cordova') || (userData.user && userData.user.importContactList) || userData.delayImportContactListReminder)\">\n    <ion-item-sliding side=\"end\" [hidden]=\"(userData.user && userData.user.enablePushNotification) || userData.delayPushNotificationReminder\">\n      <ion-item (click)=\"requestPushNotificationPermission($event)\" lines=\"none\">\n        <ion-avatar slot=\"start\">\n          <ion-img src=\"assets/img/push-notification.png\"></ion-img>\n        </ion-avatar>\n        <div class=\"ion-text-wrap message-container\">\n          <ion-label class=\"ion-margin-top\">Enable Push Notification</ion-label>\n          <p class=\"message-detail\">Get notified when other Restvo users message you.</p>\n        </div>\n        <ion-icon name=\"chevron-forward-outline\" color=\"primary\" slot=\"end\"></ion-icon>\n      </ion-item>\n      <ion-item-options>\n        <ion-item-option color=\"primary\" (click)=\"dismissEnablePushNotification()\">\n          Dismiss\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n    <ion-item-sliding side=\"end\" [hidden]=\"!platform.is('cordova') || (userData.user && userData.user.importContactList) || userData.delayImportContactListReminder\">\n      <ion-item (click)=\"pressImportContactList($event)\" lines=\"none\">\n        <ion-avatar slot=\"start\">\n          <ion-img src=\"assets/img/address-book.jpg\"></ion-img>\n        </ion-avatar>\n        <div class=\"ion-text-wrap message-container\">\n          <ion-label class=\"ion-margin-top\">Import Address Book</ion-label>\n          <p class=\"message-detail\">Connect with friends, family, and coworkers on Restvo.</p>\n        </div>\n        <ion-icon name=\"chevron-forward-outline\" color=\"primary\" slot=\"end\"></ion-icon>\n      </ion-item>\n      <ion-item-options>\n        <ion-item-option color=\"primary\" (click)=\"dismissImportContactList()\">\n          Dismiss\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-toolbar>-->\n</ion-header>\n\n<ion-content>\n  <!--get new obj when page is refreshed-->\n  <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n  <ion-grid style=\"height: 100%\">\n    <ion-row style=\"height: 100%\">\n      <ion-col [ngStyle]=\"{'height': (platform.width() >= 768) ? 'calc(100% - 58px)' : '100%'}\" class=\"conversations-panel ion-no-padding\" size-xs=\"12\" size-sm=\"12\" size-md=\"5\" size-lg=\"4\">\n        <ion-toolbar *ngIf=\"platform.width() >= 768\">\n          <ion-searchbar #searchBar slot=\"start\" [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\" (ionCancel)=\"cancelSearch($event)\" value=\"\"></ion-searchbar>\n        </ion-toolbar>\n        <ion-content>\n          <ion-virtual-scroll [items]=\"datas\" approxItemHeight=\"100px\">\n            <ion-item-sliding *virtualItem=\"let obj\">\n              <div *ngIf=\"obj.conversation.type === 'connect'\">\n                <ion-item>\n                  <ion-avatar class=\"user-avatar\" [ngClass]=\"{'online': (chatService.onlineUsers.indexOf(obj.data.participant._id) > -1), 'fade': (chatService.liveVideoChats.hasOwnProperty(obj.conversation._id) && chatService.liveVideoChats[obj.conversation._id].users.length)}\" slot=\"start\" (click)=\"seeUserInfo($event, obj)\">\n                    <ion-img *ngIf=\"obj.data.participant.avatar\" [src]=\"obj.data.participant.avatar\"></ion-img>\n                    <ion-img *ngIf=\"!obj.data.participant.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n                  </ion-avatar>\n                  <div class=\"details ion-text-wrap\" (click)=\"pushToMessagePage($event, obj)\">\n                    <ion-label>{{obj.data.name}}</ion-label>\n                    <p class=\"short-paragraph\" [innerHTML]=\"obj.message.preview | nl2br\"></p>\n                  </div>\n                  <ion-icon color=\"primary\" *ngIf=\"obj.data.pushNotification === 'none'\" name=\"volume-off\" slot=\"end\"></ion-icon>\n                  <ion-badge *ngIf=\"obj.data.badge > 0\" slot=\"end\" mode=\"md\">{{obj.data.badge}}</ion-badge>\n                </ion-item>\n                <ion-item-options>\n                  <ion-item-option *ngIf=\"obj.data.pushNotification === 'all'\" style=\"width: 15.8%; height: 100%; --background: #f67453;\" (click)=\"togglePushNotification($event, 'connect', obj)\">\n                    <ion-icon name=\"volume-off\"></ion-icon>\n                    Off\n                  </ion-item-option>\n                  <ion-item-option *ngIf=\"obj.data.pushNotification === 'none'\" style=\"width: 15.8%; height: 100%; background-color: #66cdaa;\" color=\"success\" (click)=\"togglePushNotification($event, 'connect', obj)\">\n                    <ion-icon name=\"volume-up\"></ion-icon>\n                    On\n                  </ion-item-option>\n                </ion-item-options>\n              </div>\n              <div *ngIf=\"obj.conversation.type === 'group'\">\n                <ion-item>\n                  <ion-avatar class=\"user-avatar\" slot=\"start\" [ngClass]=\"{'online': (chatService.liveConversations.hasOwnProperty(obj.conversation._id) && chatService.liveConversations[obj.conversation._id].users.length), 'fade': (chatService.liveVideoChats.hasOwnProperty(obj.conversation._id) && chatService.liveVideoChats[obj.conversation._id].users.length)}\" (click)=\"pushToMessagePage($event, obj)\">\n                    <ion-img *ngIf=\"obj.conversation.group.background\" [src]=\"obj.conversation.group.background\"></ion-img>\n                    <ion-img *ngIf=\"!obj.conversation.group.background\" src=\"assets/img/group-default.png\"></ion-img>\n                  </ion-avatar>\n                  <div class=\"details ion-text-wrap\" (click)=\"pushToMessagePage($event, obj)\">\n                    <ion-label>{{obj.conversation.group.name}}</ion-label>\n                    <p class=\"short-paragraph\" [innerHTML]=\"obj.message.preview | nl2br\"></p>\n                  </div>\n                  <ion-icon color=\"primary\" *ngIf=\"obj.data.pushNotification === 'none'\" name=\"volume-off\" slot=\"end\"></ion-icon>\n                  <ion-icon color=\"primary\" *ngIf=\"obj.data.pushNotification === 'leaders-only'\" name=\"person\" slot=\"end\"></ion-icon>\n                  <ion-badge slot=\"end\" *ngIf=\"obj.data.badge !== 0\" mode=\"md\">{{obj.data.badge}}</ion-badge>\n                </ion-item>\n                <ion-item-options>\n                  <ion-item-option *ngIf=\"obj.data.pushNotification === 'leaders-only'\" style=\"width: 15.8%; height: 100%; --background: #f67453;\" (click)=\"togglePushNotification($event, 'group', obj)\">\n                    <ion-icon name=\"volume-off\"></ion-icon>\n                    Off\n                  </ion-item-option>\n                  <ion-item-option *ngIf=\"obj.data.pushNotification === 'all'\" style=\"width: 15.8%; height: 100%;  background-color: #f6c653;\" color=\"warning\" (click)=\"togglePushNotification($event, 'group', obj)\">\n                    <ion-icon name=\"person\"></ion-icon>\n                    Leader\n                  </ion-item-option>\n                  <ion-item-option *ngIf=\"obj.data.pushNotification === 'none'\" style=\"width: 15.8%; height: 100%; background-color: #66cdaa;\" color=\"success\" (click)=\"togglePushNotification($event, 'group', obj)\">\n                    <ion-icon name=\"volume-up\"></ion-icon>\n                    On\n                  </ion-item-option>\n                </ion-item-options>\n              </div>\n              <div *ngIf=\"obj.conversation.type === 'moment'\">\n                <ion-item>\n                  <ion-avatar class=\"user-avatar\" slot=\"start\" [ngClass]=\"{'online': (chatService.liveConversations.hasOwnProperty(obj.conversation._id) && chatService.liveConversations[obj.conversation._id].users.length), 'fade': (chatService.liveVideoChats.hasOwnProperty(obj.conversation._id) && chatService.liveVideoChats[obj.conversation._id].users.length)}\" (click)=\"pushToMessagePage($event, obj)\">\n                    <ion-img *ngIf=\"obj.data.asset\" [src]=\"obj.data.asset\"></ion-img>\n                    <ion-img *ngIf=\"!obj.data.asset\" src=\"assets/img/group-default.png\"></ion-img>\n                  </ion-avatar>\n                  <div class=\"details ion-text-wrap\" (click)=\"pushToMessagePage($event, obj)\">\n                    <ion-label>{{obj.data.name}}</ion-label>\n                    <p class=\"short-paragraph\" [innerHTML]=\"obj.message.preview | nl2br\"></p>\n                  </div>\n                  <ion-icon color=\"primary\" *ngIf=\"obj.data.pushNotification === 'none'\" name=\"volume-off\" slot=\"end\"></ion-icon>\n                  <ion-icon color=\"primary\" *ngIf=\"obj.data.pushNotification === 'leaders-only'\" name=\"person\" slot=\"end\"></ion-icon>\n                  <ion-badge slot=\"end\" *ngIf=\"obj.data.badge !== 0\" mode=\"md\">{{obj.data.badge}}</ion-badge>\n                </ion-item>\n                <ion-item-options>\n                  <ion-item-option *ngIf=\"obj.data.pushNotification === 'leaders-only'\" style=\"width: 15.8%; height: 100%; --background: #f67453;\" (click)=\"togglePushNotification($event, 'moment', obj)\">\n                    <ion-icon name=\"volume-off\"></ion-icon>\n                    Off\n                  </ion-item-option>\n                  <ion-item-option *ngIf=\"obj.data.pushNotification === 'all'\" style=\"width: 15.8%; height: 100%;  background-color: #f6c653;\" color=\"warning\" (click)=\"togglePushNotification($event, 'moment', obj)\">\n                    <ion-icon name=\"person\"></ion-icon>\n                    Leader\n                  </ion-item-option>\n                  <ion-item-option *ngIf=\"obj.data.pushNotification === 'none'\" style=\"width: 15.8%; height: 100%; background-color: #66cdaa;\" color=\"success\" (click)=\"togglePushNotification($event, 'moment', obj)\">\n                    <ion-icon name=\"volume-up\"></ion-icon>\n                    On\n                  </ion-item-option>\n                </ion-item-options>\n              </div>\n            </ion-item-sliding>\n          </ion-virtual-scroll>\n        </ion-content>\n      </ion-col>\n      <ion-col size-xs=\"0\" size-sm=\"0\" size-md=\"7\" size-lg=\"8\" class=\"ion-no-padding\">\n        <ion-router-outlet></ion-router-outlet>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n");

/***/ }),

/***/ "./src/app/pages/connect/myconversations/myconversations-routing.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/pages/connect/myconversations/myconversations-routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: MyconversationsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyconversationsRoutingModule", function() { return MyconversationsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _myconversations_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./myconversations.page */ "./src/app/pages/connect/myconversations/myconversations.page.ts");
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
        component: _myconversations_page__WEBPACK_IMPORTED_MODULE_2__["MyconversationsPage"],
        children: [
            {
                path: 'chat',
                children: [
                    {
                        path: '',
                        loadChildren: '../../group/groupchat/groupchat.module#GroupchatPageModule'
                    }
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                    }
                ]
            },
            {
                path: 'person',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../connect/showrecipientinfo/showrecipientinfo.module#ShowrecipientinfoModule'
                    }
                ]
            },
            {
                path: 'group',
                children: [
                    {
                        path: '',
                        loadChildren: '../../group/groupinfo/groupinfo.module#GroupinfoPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/myconversations/chat',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/app/manage/insight',
        pathMatch: 'full'
    }
];
var MyconversationsRoutingModule = /** @class */ (function () {
    function MyconversationsRoutingModule() {
    }
    MyconversationsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], MyconversationsRoutingModule);
    return MyconversationsRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/connect/myconversations/myconversations.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/pages/connect/myconversations/myconversations.module.ts ***!
  \*************************************************************************/
/*! exports provided: MyconversationsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyconversationsPageModule", function() { return MyconversationsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _myconversations_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./myconversations.page */ "./src/app/pages/connect/myconversations/myconversations.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var _myconversations_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./myconversations-routing.module */ "./src/app/pages/connect/myconversations/myconversations-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var MyconversationsPageModule = /** @class */ (function () {
    function MyconversationsPageModule() {
    }
    MyconversationsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _myconversations_routing_module__WEBPACK_IMPORTED_MODULE_6__["MyconversationsRoutingModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__["ApplicationPipesModule"]
            ],
            declarations: [
                _myconversations_page__WEBPACK_IMPORTED_MODULE_4__["MyconversationsPage"],
            ]
        })
    ], MyconversationsPageModule);
    return MyconversationsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/connect/myconversations/myconversations.page.scss":
/*!*************************************************************************!*\
  !*** ./src/app/pages/connect/myconversations/myconversations.page.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-myconversations ion-content {\n  height: 100%;\n}\napp-myconversations ion-menu-toggle ion-badge {\n  position: relative;\n  top: 0.1rem;\n  right: 22px;\n  /*& ~ ion-icon {\n    outline-color: whitesmoke;\n  }*/\n  z-index: 5;\n}\napp-myconversations ion-spinner {\n  position: absolute;\n  margin: 48%;\n}\napp-myconversations .message-container {\n  width: 100%;\n}\napp-myconversations .message-detail {\n  color: grey;\n  margin: 8px 0 16px 0;\n  max-height: 36px;\n  line-height: 18px;\n  /* Height / no. of lines to display */\n  overflow: hidden;\n}\napp-myconversations .user-avatar {\n  width: 45px !important;\n  height: 45px !important;\n}\napp-myconversations .conversations-panel {\n  border-right: var(--border);\n}\napp-myconversations .online {\n  border: 2px solid var(--ion-color-tertiary);\n}\napp-myconversations .moreoptions-container {\n  max-height: 30vh;\n  overflow: scroll;\n}\napp-myconversations .moreoptions-grid {\n  -webkit-animation-name: move-down;\n          animation-name: move-down;\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-timing-function: ease-in;\n          animation-timing-function: ease-in;\n}\napp-myconversations .moreoptions-community-name {\n  height: 20px;\n  color: grey;\n  font-size: 12px;\n}\n@-webkit-keyframes move-down {\n  from {\n    transform: translateY(-90px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\n@keyframes move-down {\n  from {\n    transform: translateY(-90px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\napp-myconversations .moreoptions-row {\n  width: 100%;\n}\napp-myconversations .moreoptions {\n  width: 100%;\n}\napp-myconversations .moreoptions-centered {\n  width: 100%;\n  height: 65px;\n  margin: auto 0 auto 0;\n}\napp-myconversations .moreoptions-centered .moreoptions-avatar {\n  margin: 0 auto;\n  top: 0;\n}\napp-myconversations .moreoptions-centered .moreoptions-joined {\n  position: absolute;\n  left: 60%;\n  top: 28px;\n}\napp-myconversations .moreoptions-centered .moreoptions-label {\n  margin: 5px auto 0 auto;\n  color: grey;\n  font-size: 12px;\n}\napp-myconversations .fade {\n  -webkit-animation: fade 3s infinite;\n  animation: fade 3s infinite;\n  -moz-animation: fade 3s infinite;\n  -o-animation: fade 3s infinite;\n}\n@-webkit-keyframes fade {\n  0% {\n    opacity: 0.2;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n@keyframes fade {\n  0% {\n    opacity: 0.2;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\napp-myconversations .filter-warning {\n  margin: 0 auto;\n}\napp-myconversations .details {\n  margin: 14px 0 6px 0;\n  width: 100%;\n}\napp-myconversations .short-paragraph {\n  width: 85%;\n  color: grey;\n  margin: 8px 0;\n  max-height: 36px;\n  line-height: 18px;\n  /* Height / no. of lines to display */\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2Nvbm5lY3QvbXljb252ZXJzYXRpb25zL215Y29udmVyc2F0aW9ucy5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2Nvbm5lY3QvbXljb252ZXJzYXRpb25zL215Y29udmVyc2F0aW9ucy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxZQUFBO0FDQUo7QURJSTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFFQTs7SUFBQTtFQUdBLFVBQUE7QUNITjtBRE9FO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0FDTEo7QURRRTtFQUNFLFdBQUE7QUNOSjtBRFNFO0VBRUUsV0FBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUFtQixxQ0FBQTtFQUNuQixnQkFBQTtBQ1BKO0FEVUU7RUFDRSxzQkFBQTtFQUNBLHVCQUFBO0FDUko7QURXRTtFQUVFLDJCQUFBO0FDVko7QURhRTtFQUNFLDJDQUFBO0FDWEo7QURjRTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUNaSjtBRGVFO0VBQ0UsaUNBQUE7VUFBQSx5QkFBQTtFQUNBLGdDQUFBO1VBQUEsd0JBQUE7RUFDQSwwQ0FBQTtVQUFBLGtDQUFBO0FDYko7QURnQkU7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNkSjtBRGlCRTtFQUNFO0lBQ0UsNEJBQUE7RUNmSjtFRGlCRTtJQUNFLHdCQUFBO0VDZko7QUFDRjtBRFNFO0VBQ0U7SUFDRSw0QkFBQTtFQ2ZKO0VEaUJFO0lBQ0Usd0JBQUE7RUNmSjtBQUNGO0FEa0JFO0VBRUUsV0FBQTtBQ2pCSjtBRG9CRTtFQUNFLFdBQUE7QUNsQko7QURxQkU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0FDbkJKO0FEcUJJO0VBQ0UsY0FBQTtFQUNBLE1BQUE7QUNuQk47QURzQkk7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxTQUFBO0FDcEJOO0FEdUJJO0VBQ0UsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ3JCTjtBRHlCRTtFQUNFLG1DQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQ0FBQTtFQUNBLDhCQUFBO0FDdkJKO0FEMEJFO0VBQ0U7SUFBSSxZQUFBO0VDdkJOO0VEd0JFO0lBQUssVUFBQTtFQ3JCUDtFRHNCRTtJQUFNLFlBQUE7RUNuQlI7QUFDRjtBRDJCRTtFQUNFO0lBQUksWUFBQTtFQ2JOO0VEY0U7SUFBSyxVQUFBO0VDWFA7RURZRTtJQUFLLFlBQUE7RUNUUDtBQUNGO0FEZ0JFO0VBQ0UsY0FBQTtBQ0hKO0FET0U7RUFDRSxvQkFBQTtFQUNBLFdBQUE7QUNMSjtBRFNFO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUFtQixxQ0FBQTtFQUNuQixnQkFBQTtBQ05KIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvY29ubmVjdC9teWNvbnZlcnNhdGlvbnMvbXljb252ZXJzYXRpb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1teWNvbnZlcnNhdGlvbnMge1xuICBpb24tY29udGVudCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG5cbiAgaW9uLW1lbnUtdG9nZ2xlIHtcbiAgICBpb24tYmFkZ2Uge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgdG9wOiAwLjFyZW07XG4gICAgICByaWdodDogMjJweDtcblxuICAgICAgLyomIH4gaW9uLWljb24ge1xuICAgICAgICBvdXRsaW5lLWNvbG9yOiB3aGl0ZXNtb2tlO1xuICAgICAgfSovXG4gICAgICB6LWluZGV4OiA1O1xuICAgIH1cbiAgfVxuXG4gIGlvbi1zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luOiA0OCU7XG4gIH1cblxuICAubWVzc2FnZS1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLm1lc3NhZ2UtZGV0YWlsIHtcbiAgICAvL3dpZHRoOiA4NSU7XG4gICAgY29sb3I6IGdyZXk7XG4gICAgbWFyZ2luOiA4cHggMCAxNnB4IDA7XG4gICAgbWF4LWhlaWdodDogMzZweDtcbiAgICBsaW5lLWhlaWdodDogMThweDsgLyogSGVpZ2h0IC8gbm8uIG9mIGxpbmVzIHRvIGRpc3BsYXkgKi9cbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLnVzZXItYXZhdGFyIHtcbiAgICB3aWR0aDogNDVweCAhaW1wb3J0YW50O1xuICAgIGhlaWdodCA6IDQ1cHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5jb252ZXJzYXRpb25zLXBhbmVsIHtcbiAgICAvL2hlaWdodDogMTAwJTsvL2NhbGMoMTAwJSAtIDU4cHgpO1xuICAgIGJvcmRlci1yaWdodDogdmFyKC0tYm9yZGVyKTtcbiAgfVxuXG4gIC5vbmxpbmUge1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG4gIH1cblxuICAubW9yZW9wdGlvbnMtY29udGFpbmVyIHtcbiAgICBtYXgtaGVpZ2h0OiAzMHZoO1xuICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gIH1cblxuICAubW9yZW9wdGlvbnMtZ3JpZCB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IG1vdmUtZG93bjtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDAuNXM7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjtcbiAgfVxuXG4gIC5tb3Jlb3B0aW9ucy1jb21tdW5pdHktbmFtZSB7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGNvbG9yOiBncmV5O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgfVxuXG4gIEBrZXlmcmFtZXMgbW92ZS1kb3duIHtcbiAgICBmcm9tIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtOTBweCk7XG4gICAgfVxuICAgIHRvIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICB9XG4gIH1cblxuICAubW9yZW9wdGlvbnMtcm93IHtcbiAgICAvL3BhZGRpbmc6IDAgMTBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5tb3Jlb3B0aW9ucyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAubW9yZW9wdGlvbnMtY2VudGVyZWQge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNjVweDtcbiAgICBtYXJnaW46IGF1dG8gMCBhdXRvIDA7XG5cbiAgICAubW9yZW9wdGlvbnMtYXZhdGFyIHtcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgdG9wOiAwXG4gICAgfVxuXG4gICAgLm1vcmVvcHRpb25zLWpvaW5lZCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OiA2MCU7XG4gICAgICB0b3A6IDI4cHg7XG4gICAgfVxuXG4gICAgLm1vcmVvcHRpb25zLWxhYmVsIHtcbiAgICAgIG1hcmdpbjogNXB4IGF1dG8gMCBhdXRvO1xuICAgICAgY29sb3I6IGdyZXk7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxuICB9XG5cbiAgLmZhZGUge1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlIDNzIGluZmluaXRlO1xuICAgIGFuaW1hdGlvbjogZmFkZSAzcyBpbmZpbml0ZTtcbiAgICAtbW96LWFuaW1hdGlvbjogZmFkZSAzcyBpbmZpbml0ZTtcbiAgICAtby1hbmltYXRpb246IGZhZGUgM3MgaW5maW5pdGU7XG4gIH1cblxuICBALXdlYmtpdC1rZXlmcmFtZXMgZmFkZSB7XG4gICAgMCUge29wYWNpdHk6IDAuMn1cbiAgICA1MCUge29wYWNpdHk6IDF9XG4gICAgMTAwJSB7b3BhY2l0eTowLjJ9XG4gIH1cblxuICBALW1vei1rZXlmcmFtZXMgZmFkZXtcbiAgICAwJSB7b3BhY2l0eTogMC4yfVxuICAgIDUwJSB7b3BhY2l0eTogMX1cbiAgICAxMDAlIHtvcGFjaXR5OjB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIGZhZGUge1xuICAgIDAlIHtvcGFjaXR5OiAwLjJ9XG4gICAgNTAlIHtvcGFjaXR5OiAxfVxuICAgIDEwMCV7b3BhY2l0eTogMC4yfVxuICB9XG4gIEAtby1rZXlmcmFtZXMgZmFkZSB7XG4gICAgMCUge29wYWNpdHk6IDAuMn1cbiAgICA1MCUge29wYWNpdHk6IDF9XG4gICAgMTAwJXtvcGFjaXR5OiAwLjJ9XG4gIH1cblxuICAuZmlsdGVyLXdhcm5pbmcge1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG5cblxuICAuZGV0YWlscyB7XG4gICAgbWFyZ2luOiAxNHB4IDAgNnB4IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLy9iYWNrZ3JvdW5kLWNvbG9yOiAjN2Y3ZjdmO1xuICB9XG5cbiAgLnNob3J0LXBhcmFncmFwaCB7XG4gICAgd2lkdGg6IDg1JTtcbiAgICBjb2xvcjogZ3JleTtcbiAgICBtYXJnaW46IDhweCAwO1xuICAgIG1heC1oZWlnaHQ6IDM2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE4cHg7IC8qIEhlaWdodCAvIG5vLiBvZiBsaW5lcyB0byBkaXNwbGF5ICovXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxufVxuIiwiYXBwLW15Y29udmVyc2F0aW9ucyBpb24tY29udGVudCB7XG4gIGhlaWdodDogMTAwJTtcbn1cbmFwcC1teWNvbnZlcnNhdGlvbnMgaW9uLW1lbnUtdG9nZ2xlIGlvbi1iYWRnZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAwLjFyZW07XG4gIHJpZ2h0OiAyMnB4O1xuICAvKiYgfiBpb24taWNvbiB7XG4gICAgb3V0bGluZS1jb2xvcjogd2hpdGVzbW9rZTtcbiAgfSovXG4gIHotaW5kZXg6IDU7XG59XG5hcHAtbXljb252ZXJzYXRpb25zIGlvbi1zcGlubmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXJnaW46IDQ4JTtcbn1cbmFwcC1teWNvbnZlcnNhdGlvbnMgLm1lc3NhZ2UtY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtbXljb252ZXJzYXRpb25zIC5tZXNzYWdlLWRldGFpbCB7XG4gIGNvbG9yOiBncmV5O1xuICBtYXJnaW46IDhweCAwIDE2cHggMDtcbiAgbWF4LWhlaWdodDogMzZweDtcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIC8qIEhlaWdodCAvIG5vLiBvZiBsaW5lcyB0byBkaXNwbGF5ICovXG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5hcHAtbXljb252ZXJzYXRpb25zIC51c2VyLWF2YXRhciB7XG4gIHdpZHRoOiA0NXB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNDVweCAhaW1wb3J0YW50O1xufVxuYXBwLW15Y29udmVyc2F0aW9ucyAuY29udmVyc2F0aW9ucy1wYW5lbCB7XG4gIGJvcmRlci1yaWdodDogdmFyKC0tYm9yZGVyKTtcbn1cbmFwcC1teWNvbnZlcnNhdGlvbnMgLm9ubGluZSB7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG59XG5hcHAtbXljb252ZXJzYXRpb25zIC5tb3Jlb3B0aW9ucy1jb250YWluZXIge1xuICBtYXgtaGVpZ2h0OiAzMHZoO1xuICBvdmVyZmxvdzogc2Nyb2xsO1xufVxuYXBwLW15Y29udmVyc2F0aW9ucyAubW9yZW9wdGlvbnMtZ3JpZCB7XG4gIGFuaW1hdGlvbi1uYW1lOiBtb3ZlLWRvd247XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC41cztcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjtcbn1cbmFwcC1teWNvbnZlcnNhdGlvbnMgLm1vcmVvcHRpb25zLWNvbW11bml0eS1uYW1lIHtcbiAgaGVpZ2h0OiAyMHB4O1xuICBjb2xvcjogZ3JleTtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuQGtleWZyYW1lcyBtb3ZlLWRvd24ge1xuICBmcm9tIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTkwcHgpO1xuICB9XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cbmFwcC1teWNvbnZlcnNhdGlvbnMgLm1vcmVvcHRpb25zLXJvdyB7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLW15Y29udmVyc2F0aW9ucyAubW9yZW9wdGlvbnMge1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1teWNvbnZlcnNhdGlvbnMgLm1vcmVvcHRpb25zLWNlbnRlcmVkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNjVweDtcbiAgbWFyZ2luOiBhdXRvIDAgYXV0byAwO1xufVxuYXBwLW15Y29udmVyc2F0aW9ucyAubW9yZW9wdGlvbnMtY2VudGVyZWQgLm1vcmVvcHRpb25zLWF2YXRhciB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICB0b3A6IDA7XG59XG5hcHAtbXljb252ZXJzYXRpb25zIC5tb3Jlb3B0aW9ucy1jZW50ZXJlZCAubW9yZW9wdGlvbnMtam9pbmVkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA2MCU7XG4gIHRvcDogMjhweDtcbn1cbmFwcC1teWNvbnZlcnNhdGlvbnMgLm1vcmVvcHRpb25zLWNlbnRlcmVkIC5tb3Jlb3B0aW9ucy1sYWJlbCB7XG4gIG1hcmdpbjogNXB4IGF1dG8gMCBhdXRvO1xuICBjb2xvcjogZ3JleTtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuYXBwLW15Y29udmVyc2F0aW9ucyAuZmFkZSB7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlIDNzIGluZmluaXRlO1xuICBhbmltYXRpb246IGZhZGUgM3MgaW5maW5pdGU7XG4gIC1tb3otYW5pbWF0aW9uOiBmYWRlIDNzIGluZmluaXRlO1xuICAtby1hbmltYXRpb246IGZhZGUgM3MgaW5maW5pdGU7XG59XG5ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwLjI7XG4gIH1cbiAgNTAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDAuMjtcbiAgfVxufVxuQC1tb3ota2V5ZnJhbWVzIGZhZGUge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMC4yO1xuICB9XG4gIDUwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG59XG5Aa2V5ZnJhbWVzIGZhZGUge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMC4yO1xuICB9XG4gIDUwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwLjI7XG4gIH1cbn1cbkAtby1rZXlmcmFtZXMgZmFkZSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwLjI7XG4gIH1cbiAgNTAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDAuMjtcbiAgfVxufVxuYXBwLW15Y29udmVyc2F0aW9ucyAuZmlsdGVyLXdhcm5pbmcge1xuICBtYXJnaW46IDAgYXV0bztcbn1cbmFwcC1teWNvbnZlcnNhdGlvbnMgLmRldGFpbHMge1xuICBtYXJnaW46IDE0cHggMCA2cHggMDtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtbXljb252ZXJzYXRpb25zIC5zaG9ydC1wYXJhZ3JhcGgge1xuICB3aWR0aDogODUlO1xuICBjb2xvcjogZ3JleTtcbiAgbWFyZ2luOiA4cHggMDtcbiAgbWF4LWhlaWdodDogMzZweDtcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIC8qIEhlaWdodCAvIG5vLiBvZiBsaW5lcyB0byBkaXNwbGF5ICovXG4gIG92ZXJmbG93OiBoaWRkZW47XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/connect/myconversations/myconversations.page.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/connect/myconversations/myconversations.page.ts ***!
  \***********************************************************************/
/*! exports provided: MyconversationsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyconversationsPage", function() { return MyconversationsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/badge/ngx */ "./node_modules/@ionic-native/badge/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _createchat_createchat_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../createchat/createchat.page */ "./src/app/pages/connect/createchat/createchat.page.ts");
/* harmony import */ var _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../group/groupchat/groupchat.page */ "./src/app/pages/group/groupchat/groupchat.page.ts");
/* harmony import */ var _group_editgroup_editgroup_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../group/editgroup/editgroup.page */ "./src/app/pages/group/editgroup/editgroup.page.ts");
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












var MyconversationsPage = /** @class */ (function () {
    function MyconversationsPage(zone, router, electronService, storage, badge, navCtrl, platform, actionSheetCtrl, modalCtrl, userData, chatService) {
        var _this = this;
        this.zone = zone;
        this.router = router;
        this.electronService = electronService;
        this.storage = storage;
        this.badge = badge;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.chatService = chatService;
        this.datas = [];
        this.ionSpinner = false;
        this.noConversationLoaded = true;
        this.searchKeyword = '';
        this.finishedLoading = false;
        this.recipient = {};
        this.moreOptions = false;
        this.subscriptions = [];
        // event listener when the page needs to be refreshed or re-rendered
        this.refreshPageHandler = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 6];
                        if (!(data.action === 'reload' && data.conversationId === 'all')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadMyConversations(true)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(data.action === 'reload' && data.conversationId)) return [3 /*break*/, 4];
                        this.datas.forEach(function (obj) {
                            if (data.conversationId === obj.conversation._id) {
                                obj.data.badge = 0;
                            }
                        });
                        return [4 /*yield*/, this.renderConversations()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(data.action === 'render')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.renderConversations()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        // triggered when there is an incoming message from socket.io
        this.incomingMessageHandler = function (message) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (message) {
                    this.zone.run(function () { return __awaiter(_this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            data = this.chatService.conversations.find(function (c) { return c.conversation._id === message.conversationId; });
                            if (data) {
                                if (message.author._id !== this.userData.user._id) { // incrementing the badges if incoming message is received from another user
                                    data.data.badge++;
                                }
                                data.message = JSON.parse(JSON.stringify(message)); // exact copy to avoid updating the referenced object
                                data.message.author = data.message.author._id; // depopulate the author from socket.io
                                data.message.preview = ((data.message.author === this.userData.user._id) ? "You: " : '') + (data.message.body || '') + ((data.message.moment && data.message.moment.resource) ? data.message.moment.resource['en-US'].matrix_string[0][0] : '') + (((data.message.body && data.message.body.length) || data.message.moment) ? '' : '📁');
                                data.conversation.updatedAt = new Date().toISOString(); // update the latest updated conversation for caching of the lastUpdatedDate
                            }
                            this.renderConversations();
                            return [2 /*return*/];
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        }); };
    }
    MyconversationsPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // listen to the event when a new message comes in via socket.io
                this.subscriptions['chatMessage'] = this.chatService.chatMessage$.subscribe(this.incomingMessageHandler);
                this.subscriptions['refreshMyConversations'] = this.userData.refreshMyConversations$.subscribe(this.refreshPageHandler);
                return [2 /*return*/];
            });
        });
    };
    MyconversationsPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // after user data is loaded from storage, load conversations
                if (this.userData && this.userData.user && this.userData.user.churches) {
                    this.renderConversations();
                }
                return [2 /*return*/];
            });
        });
    };
    MyconversationsPage.prototype.loadMyConversations = function (ionSpinner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (ionSpinner) {
                            this.ionSpinner = true;
                        }
                        return [4 /*yield*/, this.chatService.refreshTabBadges()];
                    case 1:
                        _a.sent();
                        this.ionSpinner = false;
                        return [4 /*yield*/, this.renderConversations()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.renderConversations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listOfChurchIds;
            var _this = this;
            return __generator(this, function (_a) {
                this.datas = [];
                listOfChurchIds = this.userData.user.churches.map(function (c) { return c._id; });
                this.chatService.conversations.forEach(function (obj) {
                    // Friends
                    if (obj.conversation.type === 'connect') {
                        _this.noConversationLoaded = false;
                        if (obj.data.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) > -1) {
                            _this.datas.push(obj); //push the conversation object into an array
                        }
                    }
                    // Community Groups
                    else if (obj.conversation.group && obj.conversation.group.churchId && (_this.userData.user.churches[_this.userData.currentCommunityIndex]._id === obj.conversation.group.churchId || _this.userData.user.churches[_this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) {
                        _this.noConversationLoaded = false;
                        if (obj.conversation.group.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) > -1) {
                            _this.datas.push(obj); //push the conversation object into an array
                        }
                    }
                    // Personal Groups
                    else if (obj.conversation.group && !obj.conversation.group.churchId && (_this.userData.user.churches[_this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) {
                        _this.noConversationLoaded = false;
                        if (obj.conversation.group.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) > -1) {
                            _this.datas.push(obj); //push the conversation object into an array
                        }
                    }
                    // Outside Groups
                    else if (obj.conversation.group && listOfChurchIds.indexOf(obj.conversation.group.churchId) === -1 && (_this.userData.user.churches[_this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) {
                        _this.noConversationLoaded = false;
                        if (obj.conversation.group.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) > -1) {
                            _this.datas.push(obj); //push the conversation object into an array
                        }
                    }
                    // Moment (Program, Plan, etc)
                    else if (obj.conversation.moment && (_this.userData.user.churches[_this.userData.currentCommunityIndex]._id === '5ab62be8f83e2c1a8d41f894')) {
                        _this.noConversationLoaded = false;
                        if (obj.data.name && obj.data.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) > -1) {
                            _this.datas.push(obj); //push the conversation object into an array
                        }
                    }
                    if (obj.message && Object.keys(obj.message).length > 0) {
                        obj.message.preview = ((obj.message.author === _this.userData.user._id) ? "You: " : '') + (obj.message.body || '') + ((obj.message.moment && obj.message.moment.resource) ? obj.message.moment.resource['en-US'].value[0] : '') + (obj.message.attachments && obj.message.attachments.length ? '📁' : '');
                    }
                });
                this.sortConversations(this.datas);
                // load the chat room when initiating in wide screen view
                if (!this.chatService.currentChatProps.length && this.platform.width() >= 768 && this.datas.length) {
                    this.pushToMessagePage(null, this.datas[0]);
                }
                this.finishedLoading = true;
                return [2 /*return*/];
            });
        });
    };
    MyconversationsPage.prototype.sortConversations = function (datas) {
        datas.forEach(function (obj, index) {
            obj.order = index;
        });
        datas.sort(function (a, b) {
            var badge_diff = b.data.badge - a.data.badge;
            if (badge_diff !== 0) {
                return badge_diff; // only sort when there is an actual difference
            }
            else {
                return a.order - b.order; // preserve the order
            }
        });
    };
    MyconversationsPage.prototype.pushToMessagePage = function (event, object) {
        return __awaiter(this, void 0, void 0, function () {
            var chatObj, groupPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (event)
                            event.stopPropagation();
                        if (object.conversation.type === 'connect') {
                            chatObj = {
                                conversationId: object.conversation._id,
                                name: object.data.name,
                                recipient: object.data.participant,
                                page: 'chat',
                                badge: object.data.badge,
                                modalPage: this.platform.width() < 768
                            };
                        }
                        else if (object.conversation.type === 'group') {
                            chatObj = {
                                conversationId: object.conversation.group.conversation,
                                name: object.conversation.group.name,
                                group: object.conversation.group,
                                page: 'chat',
                                badge: object.data.badge,
                                modalPage: this.platform.width() < 768
                            };
                        }
                        else if (object.conversation.type === 'moment') {
                            chatObj = {
                                conversationId: object.conversation._id,
                                name: object.data.name,
                                moment: object.conversation.moment,
                                page: 'chat',
                                badge: object.data.badge,
                                modalPage: this.platform.width() < 768
                            };
                        }
                        if (!(this.platform.width() >= 768)) return [3 /*break*/, 1];
                        this.chatService.currentChatProps.push(chatObj);
                        // when clicking on a conversation, if it is displaying the group info, it will force it to get back to the chat view
                        this.router.navigate(['/app/myconversations/chat'], { skipLocationChange: true });
                        // if it is displaying the chat view, it will reload the chat data
                        this.userData.refreshMyConversations({ action: 'reload chat view' });
                        return [3 /*break*/, 4];
                    case 1:
                        this.chatService.currentChatProps.push(chatObj);
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_10__["GroupchatPage"],
                                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                            })];
                    case 2:
                        groupPage = _a.sent();
                        return [4 /*yield*/, groupPage.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        // reorder the list
                        this.searchKeyword = '';
                        object.data.badge = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.seeUserInfo = function (event, object) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        object.data.participant.name = object.data.participant.first_name + ' ' + object.data.participant.last_name;
                        if (!(this.platform.width() >= 768)) return [3 /*break*/, 1];
                        this.router.navigate(['/app/myconversations/person/' + object.data.participant._id], { replaceUrl: true });
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.modalCtrl.create({ component: _showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_8__["ShowrecipientinfoPage"], componentProps: { recipient: object.data.participant, modalPage: true } })];
                    case 2:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, recipientModal.onDidDismiss()];
                    case 4:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.loadMyConversations(true);
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.renderConversations();
    };
    MyconversationsPage.prototype.cancelSearch = function (event) {
        event.stopPropagation();
        this.searchKeyword = '';
        this.renderConversations();
    };
    MyconversationsPage.prototype.togglePushNotification = function (event, type, obj) {
        event.stopPropagation();
        if (obj.data.pushNotification === 'all') {
            obj.data.pushNotification = (type === 'group' || type === 'moment') ? 'leaders-only' : 'none';
        }
        else if (obj.data.pushNotification === 'leaders-only') {
            obj.data.pushNotification = 'none';
        }
        else {
            obj.data.pushNotification = 'all';
        }
        this.chatService.togglePushNotification(obj.conversation._id, obj.data.pushNotification)
            .then(function (result) { }, function (err) {
            console.log("not allowed", err);
        });
    };
    // get the latest user data from the server
    MyconversationsPage.prototype.refresh = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ionSpinner = true;
                        this.datas = [];
                        return [4 /*yield*/, this.userData.load()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.remove('conversations')];
                    case 2:
                        _a.sent();
                        this.loadMyConversations(true);
                        setTimeout(function () {
                            event.target.complete();
                        }, 2000);
                        return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.moreOption = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.moreOptions = !this.moreOptions;
                return [2 /*return*/];
            });
        });
    };
    MyconversationsPage.prototype.createNewChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var createChatPage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _createchat_createchat_page__WEBPACK_IMPORTED_MODULE_9__["CreatechatPage"] })];
                    case 1:
                        createChatPage = _a.sent();
                        return [4 /*yield*/, createChatPage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, createChatPage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.loadMyConversations(true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.createNewGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editGroupPage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _group_editgroup_editgroup_page__WEBPACK_IMPORTED_MODULE_11__["EditgroupPage"], componentProps: { personalGroup: false, publishGroup: false } })];
                    case 1:
                        editGroupPage = _a.sent();
                        return [4 /*yield*/, editGroupPage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, editGroupPage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.loadMyConversations(true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.requestPushNotificationPermission = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.userData.checkPushNotification()];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            this.dismissEnablePushNotification();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.pressImportContactList = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.userData.toggleImportContactList(true)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            this.dismissImportContactList();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.dismissEnablePushNotification = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userData.delayPushNotificationReminder = 100;
                        return [4 /*yield*/, this.storage.set('delayPushNotificationReminder', 100)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.dismissImportContactList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userData.delayImportContactListReminder = 100;
                        return [4 /*yield*/, this.storage.set('delayImportContactListReminder', 100)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyconversationsPage.prototype.ngOnDestroy = function () {
        this.subscriptions['chatMessage'].unsubscribe(this.incomingMessageHandler);
        this.subscriptions['refreshMyConversations'].unsubscribe(this.incomingMessageHandler);
    };
    MyconversationsPage.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_2__["ElectronService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] },
        { type: _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_4__["Badge"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonContent"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonContent"])
    ], MyconversationsPage.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('searchBar', { static: false }),
        __metadata("design:type", Object)
    ], MyconversationsPage.prototype, "searchBar", void 0);
    MyconversationsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-myconversations',
            template: __importDefault(__webpack_require__(/*! raw-loader!./myconversations.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/myconversations/myconversations.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./myconversations.page.scss */ "./src/app/pages/connect/myconversations/myconversations.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_electron__WEBPACK_IMPORTED_MODULE_2__["ElectronService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"],
            _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_4__["Badge"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"]])
    ], MyconversationsPage);
    return MyconversationsPage;
}());



/***/ })

}]);
//# sourceMappingURL=connect-myconversations-myconversations-module.js.map