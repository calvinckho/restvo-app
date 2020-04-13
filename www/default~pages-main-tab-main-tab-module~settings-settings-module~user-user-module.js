(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-main-tab-main-tab-module~settings-settings-module~user-user-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/settings/settings.page.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/settings/settings.page.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header  *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Privacy and Security</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"userData && userData.user\">\n\n  <!--CONTACTS-->\n  <div *ngIf=\"platform.is('cordova')\">\n    <ion-item lines=\"none\" color=\"lightgrey\">Find Friends on Restvo</ion-item>\n    <ion-item>\n      <ion-label>Import Address Book</ion-label>\n      <ion-toggle slot=\"end\" [(ngModel)]=\"UIimportContactList\" (ionChange)=\"toggleImportContactList()\"></ion-toggle>\n    </ion-item>\n  </div>\n\n<!--  &lt;!&ndash;ACCOUNT&ndash;&gt;\n  <ion-item lines=\"none\" color=\"lightgrey\">Account</ion-item>\n  <ion-item>\n    <ion-label>Restvo ID</ion-label>\n    <ion-label *ngIf=\"userData.user.mobile\" color=\"grey\" style=\"text-align: right;\">{{userData.user.mobile}}</ion-label>\n    <ion-label *ngIf=\"!userData.user.mobile\" color=\"grey\" style=\"text-align: right;\">{{userData.user.email}}</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label>Full Name</ion-label>\n    <ion-label color=\"lightgrey\" style=\"text-align: right;\">{{userData.user.first_name}} {{userData.user.last_name}}</ion-label>\n  </ion-item>-->\n\n  <ion-item lines=\"none\" color=\"lightgrey\">Privacy</ion-item>\n  <ion-item class=\"ion-text-wrap\">\n    <ion-label>Allow to be Discovered <ion-icon name=\"information-circle\" (click)=\"explainDiscover()\"></ion-icon></ion-label>\n    <ion-toggle [(ngModel)]=\"UIAllowedDiscovered\" (ionChange)=\"toggleAllowedDiscovered()\"></ion-toggle>\n  </ion-item>\n  <ion-item class=\"ion-text-wrap\">\n    <ion-label>Allow All Friends to View Contact Info</ion-label>\n    <ion-toggle [(ngModel)]=\"UIShareContactInfo\" (ionChange)=\"toggleShareContactInfo()\"></ion-toggle>\n  </ion-item>\n\n  <!--SECURITY-->\n  <ion-item lines=\"none\" color=\"lightgrey\">Security</ion-item>\n  <ion-button color='light' (click)=\"resetPassword()\" shape=\"round\" expand=\"full\" class=\"ion-margin-vertical\">\n    <span *ngIf=\"userData.user.password\">Reset Password</span>\n    <span *ngIf=\"!userData.user.password\">Create Password</span>\n  </ion-button>\n  <ion-button color='light' (click)=\"changePhone()\" shape=\"round\" expand=\"full\" class=\"ion-margin-vertical\">Register a New Phone</ion-button>\n  <ion-button color='light' (click)=\"permanentlyEraseUser()\" shape=\"round\" expand=\"full\" class=\"ion-margin-vertical\">Delete Account</ion-button>\n  <ion-button color='light' (click)=\"logout($event)\" shape=\"round\" expand=\"full\" class=\"ion-margin-vertical\">Sign Out</ion-button>\n  <p class=\"ion-padding\" style=\"text-align: center; color: black; margin-top: 15px;\">{{appName}} {{appVersionNumber}}</p>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/user/settings/settings.module.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/user/settings/settings.module.ts ***!
  \********************************************************/
/*! exports provided: SettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings.page */ "./src/app/pages/user/settings/settings.page.ts");
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
        component: _settings_page__WEBPACK_IMPORTED_MODULE_6__["SettingsPage"],
    }
];
var SettingsPageModule = /** @class */ (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__["ApplicationPipesModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            ],
            declarations: [
                _settings_page__WEBPACK_IMPORTED_MODULE_6__["SettingsPage"],
            ],
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/settings/settings.page.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/user/settings/settings.page.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-settings ion-content {\n  display: flex;\n  flex-direction: column;\n}\napp-settings .delete-button {\n  color: var(--ion-color-primary);\n  text-decoration: underline;\n  background: none;\n  border: none;\n  font-size: 15px;\n  word-wrap: break-word;\n}\napp-settings .section-title {\n  color: white;\n  --background: var(--ion-color-grey);\n  text-align: left;\n  font-size: large;\n}\napp-settings .security-button {\n  background-color: var(--ion-color-grey);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL3VzZXIvc2V0dGluZ3Mvc2V0dGluZ3MucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy91c2VyL3NldHRpbmdzL3NldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQ0RKO0FESUU7RUFDRSwrQkFBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0FDRko7QURLRTtFQUNFLFlBQUE7RUFDQSxtQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUNISjtBRE1FO0VBQ0UsdUNBQUE7QUNKSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXIvc2V0dGluZ3Mvc2V0dGluZ3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLXNldHRpbmdzIHtcblxuICBpb24tY29udGVudCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG5cbiAgLmRlbGV0ZS1idXR0b24ge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgfVxuXG4gIC5zZWN0aW9uLXRpdGxlIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICB9XG5cbiAgLnNlY3VyaXR5LWJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICB9XG5cbn1cblxuXG5cbiIsImFwcC1zZXR0aW5ncyBpb24tY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5hcHAtc2V0dGluZ3MgLmRlbGV0ZS1idXR0b24ge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXNpemU6IDE1cHg7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbn1cbmFwcC1zZXR0aW5ncyAuc2VjdGlvbi10aXRsZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG59XG5hcHAtc2V0dGluZ3MgLnNlY3VyaXR5LWJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/user/settings/settings.page.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/user/settings/settings.page.ts ***!
  \******************************************************/
/*! exports provided: SettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPage", function() { return SettingsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/app-version/ngx */ "./node_modules/@ionic-native/app-version/ngx/index.js");
/* harmony import */ var _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/badge/ngx */ "./node_modules/@ionic-native/badge/ngx/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
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












var SettingsPage = /** @class */ (function () {
    function SettingsPage(storage, location, router, electronService, appVersion, cache, loadingCtrl, modalCtrl, menuCtrl, alertCtrl, platform, badge, authService, awsService, userData) {
        var _this = this;
        this.storage = storage;
        this.location = location;
        this.router = router;
        this.electronService = electronService;
        this.appVersion = appVersion;
        this.cache = cache;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.badge = badge;
        this.authService = authService;
        this.awsService = awsService;
        this.userData = userData;
        this.subscriptions = {};
        this.appName = '';
        this.appVersionNumber = '';
        this.awaitUserInput = false;
        this.refreshUserStatusHandler = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.authService.token) {
                    this.prepareUserSettings();
                }
                this.userData.splitPaneState = 'md';
                return [2 /*return*/];
            });
        }); };
    }
    SettingsPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
                return [2 /*return*/];
            });
        });
    };
    SettingsPage.prototype.prepareUserSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userData.load()];
                    case 1:
                        _a.sent();
                        this.UIenabledPushNotification = this.userData.user.enablePushNotification;
                        this.UIimportContactList = this.userData.user.importContactList;
                        this.UIAllowedDiscovered = !this.userData.user.hideInDirectory;
                        this.UIShareContactInfo = this.userData.user.shareContactInfo;
                        setTimeout(function () {
                            _this.awaitUserInput = true;
                        }, 50);
                        if (this.platform.is('cordova')) {
                            this.appVersion.getAppName().then(function (appName) {
                                _this.appName = appName;
                            });
                            this.appVersion.getVersionNumber().then(function (appVersionNumber) {
                                _this.appVersionNumber = appVersionNumber;
                            });
                            console.log(this.appName);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.toggleImportContactList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userData.toggleImportContactList(this.UIimportContactList)];
                    case 1:
                        _a.UIimportContactList = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.toggleAllowedDiscovered = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userData.toggleAllowedDiscovered(this.UIAllowedDiscovered)];
                    case 1:
                        _a.UIAllowedDiscovered = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.toggleShareContactInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.userData.toggleShareContactInfo(this.UIShareContactInfo)];
                    case 1:
                        _a.UIShareContactInfo = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.resetPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.modalCtrl.dismiss();
                this.menuCtrl.enable(false);
                this.router.navigate(['/register', { slide: '6', exitType: 'dashboard' }]);
                return [2 /*return*/];
            });
        });
    };
    SettingsPage.prototype.changePhone = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.modalCtrl.dismiss();
                this.menuCtrl.enable(false);
                this.router.navigate(['/register', { slide: '3', exitType: 'dashboard' }]);
                return [2 /*return*/];
            });
        });
    };
    SettingsPage.prototype.permanentlyEraseUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Permanently Delete Your Account',
                            subHeader: 'This action cannot be reversed. Are you sure you want to proceed?',
                            cssClass: 'level-15',
                            buttons: [{ text: 'Yes, delete my account.',
                                    handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                        var loading;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    alert.dismiss();
                                                    return [4 /*yield*/, this.loadingCtrl.create({
                                                            message: 'Loading...'
                                                        })];
                                                case 1:
                                                    loading = _a.sent();
                                                    return [4 /*yield*/, loading.present()];
                                                case 2:
                                                    _a.sent();
                                                    if (!this.modalPage) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, this.modalCtrl.dismiss()];
                                                case 3:
                                                    _a.sent();
                                                    _a.label = 4;
                                                case 4:
                                                    if (!(this.userData.user.avatar && this.userData.user.avatar.length)) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, this.awsService.removeFile(this.userData.user.avatar)];
                                                case 5:
                                                    _a.sent();
                                                    _a.label = 6;
                                                case 6:
                                                    this.userData.permanentlyEraseUser().subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
                                                        var _this = this;
                                                        return __generator(this, function (_a) {
                                                            this.storage.clear();
                                                            this.cache.clearAll();
                                                            if (this.platform.is('cordova') && this.userData.user.enablePushNotification) {
                                                                this.badge.set(0);
                                                            }
                                                            if (this.electronService.isElectronApp) {
                                                                this.electronService.ipcRenderer.send('SYSTEM_TRAY:::SET_BADGE', 0);
                                                            }
                                                            setTimeout(function () {
                                                                loading.dismiss();
                                                                _this.userData.resetUserData();
                                                                _this.menuCtrl.enable(false);
                                                                _this.router.navigate(['/activity/5d5785b462489003817fee18']);
                                                                //this.router.navigate(['/register', { slide : '0', exitType: 'slide' }]);
                                                            }, 500);
                                                            return [2 /*return*/];
                                                        });
                                                    }); }, function (err) { return __awaiter(_this, void 0, void 0, function () {
                                                        var networkAlert;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    loading.dismiss();
                                                                    return [4 /*yield*/, this.alertCtrl.create({
                                                                            header: 'No Internet Connection',
                                                                            subHeader: 'Please connect to the internet connection to complete the log out process.',
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
                                            }
                                        });
                                    }); } }, { text: 'No, I changed my mind.' }]
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
    SettingsPage.prototype.logout = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.userData.logout()];
                    case 1:
                        _a.sent();
                        if (this.modalPage) {
                            this.modalCtrl.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.explainDiscover = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Allow to be Discovered',
                            subHeader: "Allow others in your community to find you in the Discover Section by toggling it to 'on'. If toggled 'off', others in the community will not be able to find you.",
                            buttons: [{ text: 'Ok' }],
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
    SettingsPage.prototype.closeModal = function () {
        if (this.modalPage) {
            this.modalCtrl.dismiss();
        }
        else {
            this.location.back();
        }
    };
    SettingsPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
    };
    SettingsPage.ctorParameters = function () { return [
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_3__["ElectronService"] },
        { type: _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_5__["AppVersion"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_4__["CacheService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["MenuController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"] },
        { type: _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_6__["Badge"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_11__["Aws"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_10__["UserData"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SettingsPage.prototype, "modalPage", void 0);
    SettingsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-settings',
            template: __importDefault(__webpack_require__(/*! raw-loader!./settings.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/settings/settings.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./settings.page.scss */ "./src/app/pages/user/settings/settings.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_electron__WEBPACK_IMPORTED_MODULE_3__["ElectronService"],
            _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_5__["AppVersion"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_4__["CacheService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["MenuController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"],
            _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_6__["Badge"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_11__["Aws"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_10__["UserData"]])
    ], SettingsPage);
    return SettingsPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~pages-main-tab-main-tab-module~settings-settings-module~user-user-module.js.map