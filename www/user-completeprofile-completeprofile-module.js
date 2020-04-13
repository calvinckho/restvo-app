(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user-completeprofile-completeprofile-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/completeprofile/completeprofile.page.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/completeprofile/completeprofile.page.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header id=\"complete-profile-header\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"location.back()\" id='clickback'><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Complete The Setup</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content color=\"light\">\n  <ion-toolbar *ngIf=\"userData && userData.user\">\n    <progress-bar [progress]=\"(userData.user.avatar ? 50 : 0) + (authService.incompleteOnboardProcess ? 0 : 50)\" [color]=\"'#488aff'\"></progress-bar>\n  </ion-toolbar>\n  <!-- Mandatory profile action buttons -->\n  <div class=\"mandatory-actions\" *ngIf=\"userData.user\">\n    <ion-card class=\"title-reminder\">\n      <small>Tip: Completing your setup helps you get the most out of Restvo</small>\n    </ion-card>\n    <ion-card (click)=\"openUserProfile()\" [ngClass]=\"{'opacity': userData.user && userData.user.avatar}\">\n      <ion-item lines=\"none\" class=\"card-item\">\n        <ion-img class=\"icon\" src=\"assets/icon/user.svg\" alt=\"\" slot=\"start\"></ion-img>\n        <div>\n          <ion-label class=\"action-card-label\" color=\"dark\">Upload a Profile Photo</ion-label>\n          <div class=\"action-card-message\">Let other users see who they’re connecting with</div>\n        </div>\n        <ion-icon [name]=\"userData.user.avatar ? 'checkmark-circle' : 'add-circle'\" slot=end [color]=\"userData.user.avatar ? 'success' : 'danger'\"></ion-icon>\n      </ion-item>\n    </ion-card>\n    <ion-card [ngClass]=\"{'opacity': userData.user && !authService.incompleteOnboardProcess}\">\n      <ion-item lines=\"none\" class=\"card-item\" (click)=\"authService.openOnboarding({ modalPage: true })\">\n        <ion-img class=\"icon\" src=\"assets/icon/quotation.svg\" alt=\"\" slot=\"start\"></ion-img>\n        <div>\n          <ion-label class=\"action-card-label\" color=\"dark\">Complete Your Profile</ion-label>\n          <div class=\"action-card-message\">Answer a few questions to complete your profile</div>\n        </div>\n        <ion-icon [name]=\"!authService.incompleteOnboardProcess ? 'checkmark-circle' : 'add-circle'\" slot=end [color]=\"!authService.incompleteOnboardProcess ? 'success' : 'danger'\"></ion-icon>\n      </ion-item>\n    </ion-card>\n  </div>\n\n  <!-- Optional profile action buttons -->\n  <div class=\"optional-actions\"><!-- [hidden]=\"((userData.user && userData.user.enablePushNotification) || userData.delayPushNotificationReminder) && (!platform.is('cordova') || (userData.user && userData.user.importContactList) || userData.delayImportContactListReminder)\">-->\n    <ion-card class=\"title-reminder\">\n      <small>Optional:</small>\n    </ion-card>\n    <ion-card [ngClass]=\"{'opacity': (userData.user && userData.user.enablePushNotification) || userData.delayPushNotificationReminder}\">\n      <ion-item lines=\"none\" class=\"card-item\" (click)=\"requestPushNotificationPermission($event)\">\n        <ion-img class=\"icon\" src=\"assets/icon/notification.svg\" alt=\"\" slot=\"start\"></ion-img>\n        <div>\n          <ion-label class=\"action-card-label\" color=\"dark\">Enable Push Notifications</ion-label>\n          <div class=\"action-card-message\">Get notified when you recieve a new message or request</div>\n        </div>\n        <ion-icon [name]=\"((userData.user && userData.user.enablePushNotification) || userData.delayPushNotificationReminder) ? 'checkmark-circle' : 'add-circle'\" slot=end [color]=\"((userData.user && userData.user.enablePushNotification) || userData.delayPushNotificationReminder) ? 'success' : 'danger'\"></ion-icon>\n      </ion-item>\n    </ion-card>\n    <ion-card [ngClass]=\"{'opacity': !platform.is('cordova') || (userData.user && userData.user.importContactList) || userData.delayImportContactListReminder}\">\n      <ion-item lines=\"none\" class=\"card-item\" (click)=\"pressImportContactList($event)\">\n        <ion-img class=\"icon\" src=\"assets/icon/contact.svg\" alt=\"\" slot=\"start\"></ion-img>\n        <div>\n          <ion-label class=\"action-card-label\" color=\"dark\">Import Your Contacts</ion-label>\n          <div class=\"action-card-message\">Find out who you know has already joined Restvo</div>\n        </div>\n        <ion-icon [name]=\"(!platform.is('cordova') || (userData.user && userData.user.importContactList) || userData.delayImportContactListReminder) ? 'checkmark-circle' : 'add-circle'\" slot=end [color]=\"(!platform.is('cordova') || (userData.user && userData.user.importContactList) || userData.delayImportContactListReminder) ? 'success' : 'danger'\"></ion-icon>\n      </ion-item>\n    </ion-card>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/user/completeprofile/completeprofile.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/user/completeprofile/completeprofile.module.ts ***!
  \**********************************************************************/
/*! exports provided: CompleteprofilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleteprofilePageModule", function() { return CompleteprofilePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _completeprofile_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./completeprofile.page */ "./src/app/pages/user/completeprofile/completeprofile.page.ts");
/* harmony import */ var angular_progress_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-progress-bar */ "./node_modules/angular-progress-bar/fesm5/angular-progress-bar.js");
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
        component: _completeprofile_page__WEBPACK_IMPORTED_MODULE_5__["CompleteprofilePage"]
    }
];
var CompleteprofilePageModule = /** @class */ (function () {
    function CompleteprofilePageModule() {
    }
    CompleteprofilePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
                angular_progress_bar__WEBPACK_IMPORTED_MODULE_6__["ProgressBarModule"]
            ],
            declarations: [_completeprofile_page__WEBPACK_IMPORTED_MODULE_5__["CompleteprofilePage"]]
        })
    ], CompleteprofilePageModule);
    return CompleteprofilePageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/completeprofile/completeprofile.page.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/user/completeprofile/completeprofile.page.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-completeprofile .title-container {\n  position: relative;\n  height: 50px;\n  margin-top: 20px;\n}\napp-completeprofile .back-icon {\n  position: absolute;\n  top: 50%;\n  left: 10px;\n  transform: translateY(-50%);\n  font-size: 30px;\n}\napp-completeprofile .title-reminder {\n  background-color: transparent !important;\n  box-shadow: none !important;\n  padding-top: 20px !important;\n  margin-top: 0 !important;\n}\napp-completeprofile .title-reminder small {\n  font-size: 12px;\n}\napp-completeprofile .card-item {\n  margin: 10px 0;\n}\napp-completeprofile .icon {\n  height: 31px;\n  width: 31px;\n}\napp-completeprofile .plus {\n  height: 25px;\n  width: 25px;\n}\napp-completeprofile .action-card-label {\n  font-size: 14px !important;\n  line-height: 16px;\n  margin-bottom: 3px;\n}\napp-completeprofile .action-card-message {\n  font-size: 10px;\n  line-height: 12px;\n  color: var(--ion-color-darkgrey);\n}\napp-completeprofile .opacity {\n  opacity: 0.4;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL3VzZXIvY29tcGxldGVwcm9maWxlL2NvbXBsZXRlcHJvZmlsZS5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL3VzZXIvY29tcGxldGVwcm9maWxlL2NvbXBsZXRlcHJvZmlsZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0FKO0FER0U7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0FDREo7QURJRTtFQUNFLHdDQUFBO0VBQ0EsMkJBQUE7RUFDQSw0QkFBQTtFQUNBLHdCQUFBO0FDRko7QURJSTtFQUNFLGVBQUE7QUNGTjtBRE1FO0VBQ0UsY0FBQTtBQ0pKO0FET0U7RUFFRSxZQUFBO0VBQ0EsV0FBQTtBQ05KO0FEU0U7RUFFRSxZQUFBO0VBQ0EsV0FBQTtBQ1JKO0FEV0U7RUFDRSwwQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUNUSjtBRFlFO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0NBQUE7QUNWSjtBRGFFO0VBQ0UsWUFBQTtBQ1hKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvdXNlci9jb21wbGV0ZXByb2ZpbGUvY29tcGxldGVwcm9maWxlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1jb21wbGV0ZXByb2ZpbGUge1xuICAudGl0bGUtY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gIH1cblxuICAuYmFjay1pY29uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogMTBweDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgZm9udC1zaXplOiAzMHB4O1xuICB9XG5cbiAgLnRpdGxlLXJlbWluZGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLXRvcDogMjBweCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcblxuICAgICYgc21hbGwge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgfVxuXG4gIC5jYXJkLWl0ZW0ge1xuICAgIG1hcmdpbjogMTBweCAwO1xuICB9XG5cbiAgLmljb24ge1xuICAgIC8vZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGhlaWdodDogMzFweDtcbiAgICB3aWR0aDogMzFweDtcbiAgfVxuXG4gIC5wbHVzIHtcbiAgICAvL2Rpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgd2lkdGg6IDI1cHg7XG4gIH1cblxuICAuYWN0aW9uLWNhcmQtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xuICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDNweDtcbiAgfVxuXG4gIC5hY3Rpb24tY2FyZC1tZXNzYWdlIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDEycHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrZ3JleSk7XG4gIH1cblxuICAub3BhY2l0eSB7XG4gICAgb3BhY2l0eTogMC40O1xuICB9XG59XG4iLCJhcHAtY29tcGxldGVwcm9maWxlIC50aXRsZS1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogNTBweDtcbiAgbWFyZ2luLXRvcDogMjBweDtcbn1cbmFwcC1jb21wbGV0ZXByb2ZpbGUgLmJhY2staWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDEwcHg7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgZm9udC1zaXplOiAzMHB4O1xufVxuYXBwLWNvbXBsZXRlcHJvZmlsZSAudGl0bGUtcmVtaW5kZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctdG9wOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcbn1cbmFwcC1jb21wbGV0ZXByb2ZpbGUgLnRpdGxlLXJlbWluZGVyIHNtYWxsIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuYXBwLWNvbXBsZXRlcHJvZmlsZSAuY2FyZC1pdGVtIHtcbiAgbWFyZ2luOiAxMHB4IDA7XG59XG5hcHAtY29tcGxldGVwcm9maWxlIC5pY29uIHtcbiAgaGVpZ2h0OiAzMXB4O1xuICB3aWR0aDogMzFweDtcbn1cbmFwcC1jb21wbGV0ZXByb2ZpbGUgLnBsdXMge1xuICBoZWlnaHQ6IDI1cHg7XG4gIHdpZHRoOiAyNXB4O1xufVxuYXBwLWNvbXBsZXRlcHJvZmlsZSAuYWN0aW9uLWNhcmQtbGFiZWwge1xuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gIG1hcmdpbi1ib3R0b206IDNweDtcbn1cbmFwcC1jb21wbGV0ZXByb2ZpbGUgLmFjdGlvbi1jYXJkLW1lc3NhZ2Uge1xuICBmb250LXNpemU6IDEwcHg7XG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmtncmV5KTtcbn1cbmFwcC1jb21wbGV0ZXByb2ZpbGUgLm9wYWNpdHkge1xuICBvcGFjaXR5OiAwLjQ7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/user/completeprofile/completeprofile.page.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/user/completeprofile/completeprofile.page.ts ***!
  \********************************************************************/
/*! exports provided: CompleteprofilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleteprofilePage", function() { return CompleteprofilePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _profile_profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../profile/profile.page */ "./src/app/pages/user/profile/profile.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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








var CompleteprofilePage = /** @class */ (function () {
    function CompleteprofilePage(router, storage, location, platform, modalCtrl, userData, authService) {
        this.router = router;
        this.storage = storage;
        this.location = location;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.authService = authService;
    }
    CompleteprofilePage.prototype.ngOnInit = function () {
    };
    CompleteprofilePage.prototype.openUserProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _profile_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"], componentProps: { modalPage: true } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CompleteprofilePage.prototype.requestPushNotificationPermission = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!this.platform.is('cordova')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.checkPushNotification()];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            this.dismissEnablePushNotification();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CompleteprofilePage.prototype.pressImportContactList = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!this.platform.is('cordova')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.toggleImportContactList(true)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            this.dismissImportContactList();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CompleteprofilePage.prototype.dismissEnablePushNotification = function () {
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
    CompleteprofilePage.prototype.dismissImportContactList = function () {
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
    CompleteprofilePage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CompleteprofilePage.prototype, "modalPage", void 0);
    CompleteprofilePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-completeprofile',
            template: __importDefault(__webpack_require__(/*! raw-loader!./completeprofile.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/completeprofile/completeprofile.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./completeprofile.page.scss */ "./src/app/pages/user/completeprofile/completeprofile.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"]])
    ], CompleteprofilePage);
    return CompleteprofilePage;
}());



/***/ })

}]);
//# sourceMappingURL=user-completeprofile-completeprofile-module.js.map