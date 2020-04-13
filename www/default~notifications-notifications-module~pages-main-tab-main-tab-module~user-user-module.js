(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~notifications-notifications-module~pages-main-tab-main-tab-module~user-user-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/notifications/notifications.page.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/notifications/notifications.page.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header  *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Notifications</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"userData && userData.user\">\n  <!--Push Notifications-->\n  <ion-item lines=\"none\" color=\"lightgrey\">Push Notifications</ion-item>\n  <ion-item>\n    <ion-label>Chat Messages</ion-label>\n    <ion-select [(ngModel)]=\"UIpushNotifyUnreadChatMessages\" (ionChange)=\"saveChange('Push', $event)\" slot=\"end\">\n      <ion-select-option value=\"none\">Off</ion-select-option>\n      <ion-select-option value=\"instant\">Instant</ion-select-option>\n      <!--<ion-select-option value=\"daily\">Daily</ion-select-option>-->\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label>System Messages</ion-label>\n    <ion-select [(ngModel)]=\"UIpushNotifySystemMessages\" (ionChange)=\"saveChange('Push', $event)\" slot=\"end\">\n      <ion-select-option value=\"none\">Off</ion-select-option>\n      <ion-select-option value=\"instant\">Instant</ion-select-option>\n      <!--<ion-select-option value=\"daily\">Daily</ion-select-option>-->\n    </ion-select>\n  </ion-item>\n  <!--Email Notifications-->\n  <ion-item lines=\"none\" color=\"lightgrey\">Email Notifications</ion-item>\n  <ion-item>\n    <ion-label>Chat Messages</ion-label>\n    <ion-select [(ngModel)]=\"UIemailNotifyUnreadChatMessages\" (ionChange)=\"saveChange('Email', $event)\" slot=\"end\">\n      <ion-select-option value=\"none\">Off</ion-select-option>\n      <!--<ion-select-option value=\"instant\">Instant</ion-select-option>-->\n      <ion-select-option value=\"daily\">Daily</ion-select-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label>System Messages</ion-label>\n    <ion-select [(ngModel)]=\"UIemailNotifySystemMessages\" (ionChange)=\"saveChange('Email', $event)\" slot=\"end\">\n      <ion-select-option value=\"none\">Off</ion-select-option>\n      <!--<ion-select-option value=\"instant\">Instant</ion-select-option>-->\n      <ion-select-option value=\"daily\">Daily</ion-select-option>\n    </ion-select>\n  </ion-item>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/user/notifications/notifications.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/user/notifications/notifications.module.ts ***!
  \******************************************************************/
/*! exports provided: NotificationsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsPageModule", function() { return NotificationsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _notifications_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifications.page */ "./src/app/pages/user/notifications/notifications.page.ts");
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
        component: _notifications_page__WEBPACK_IMPORTED_MODULE_5__["NotificationsPage"]
    }
];
var NotificationsPageModule = /** @class */ (function () {
    function NotificationsPageModule() {
    }
    NotificationsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_notifications_page__WEBPACK_IMPORTED_MODULE_5__["NotificationsPage"]]
        })
    ], NotificationsPageModule);
    return NotificationsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/notifications/notifications.page.scss":
/*!******************************************************************!*\
  !*** ./src/app/pages/user/notifications/notifications.page.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXIvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/user/notifications/notifications.page.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/user/notifications/notifications.page.ts ***!
  \****************************************************************/
/*! exports provided: NotificationsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsPage", function() { return NotificationsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
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




var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(userData, location, modalCtrl) {
        var _this = this;
        this.userData = userData;
        this.location = location;
        this.modalCtrl = modalCtrl;
        this.subscriptions = {};
        this.refreshUserStatusHandler = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.userData && this.userData.user)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.prepareUserSettings()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.userData.splitPaneState = 'md';
                        return [2 /*return*/];
                }
            });
        }); };
    }
    NotificationsPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
                return [2 /*return*/];
            });
        });
    };
    NotificationsPage.prototype.prepareUserSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.UIpushNotifyUnreadChatMessages = this.userData.user.pushNotifyUnreadChatMessages;
                this.UIpushNotifySystemMessages = this.userData.user.pushNotifySystemMessages;
                this.UIemailNotifyUnreadChatMessages = this.userData.user.emailNotifyUnreadChatMessages;
                this.UIemailNotifySystemMessages = this.userData.user.emailNotifySystemMessages;
                return [2 /*return*/];
            });
        });
    };
    NotificationsPage.prototype.saveChange = function (type, event) {
        return __awaiter(this, void 0, void 0, function () {
            var userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(type === 'Push')) return [3 /*break*/, 2];
                        if (!(event.detail.value !== 'none')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.checkPushNotification()];
                    case 1:
                        _a.sent(); // if success, will send an event to refresh the userData.user
                        _a.label = 2;
                    case 2:
                        userData = {
                            pushNotifyUnreadChatMessages: this.UIpushNotifyUnreadChatMessages,
                            pushNotifySystemMessages: this.UIpushNotifySystemMessages,
                            emailNotifyUnreadChatMessages: this.UIemailNotifyUnreadChatMessages,
                            emailNotifySystemMessages: this.UIemailNotifySystemMessages
                        };
                        return [4 /*yield*/, this.userData.update(userData)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationsPage.prototype.togglePushNotification = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.userData && this.userData.user)) return [3 /*break*/, 2];
                        if (!this.UIenabledPushNotification) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.checkPushNotification()];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            this.UIenabledPushNotification = false;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    NotificationsPage.prototype.closeModal = function () {
        if (this.modalPage) {
            this.modalCtrl.dismiss();
        }
        else {
            this.location.back();
        }
    };
    NotificationsPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
    };
    NotificationsPage.ctorParameters = function () { return [
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserData"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NotificationsPage.prototype, "modalPage", void 0);
    NotificationsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notifications',
            template: __importDefault(__webpack_require__(/*! raw-loader!./notifications.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/notifications/notifications.page.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./notifications.page.scss */ "./src/app/pages/user/notifications/notifications.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserData"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
    ], NotificationsPage);
    return NotificationsPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~notifications-notifications-module~pages-main-tab-main-tab-module~user-user-module.js.map