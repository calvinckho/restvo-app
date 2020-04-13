(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~board-communityboard-communityboard-module~connect-myconversations-myconversations-module~gr~632626bd"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/profile/profile.page.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/profile/profile.page.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\">\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n        </ion-buttons>\n        <ion-title>Profile</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n        <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n            <ion-spinner name=\"dots\"></ion-spinner>\n        </ion-row>\n    </ion-grid>\n    <form [formGroup]=\"userForm\">\n        <ion-list *ngIf=\"user && user._id\">\n            <!--<ion-item lines=\"none\" color=\"lightgrey\">\n                <ion-label color=\"darkgrey\">Profile Picture</ion-label>\n            </ion-item>-->\n            <ion-item lines=\"none\">\n                <ion-note class=\"ion-padding-vertical text-wrap\">Upload your photo to help your friends see you more easily on Restvo.</ion-note>\n            </ion-item>\n            <ion-item class=\"ion-text-wrap\" lines=\"none\">\n                <div class=\"image-cropper\" (click)=\"selectPhotoFromDeviceAndUpload($event, true)\">\n                    <img *ngIf=\"!user.avatar\" class=\"profile-pic\" src=\"assets/img/avatar-default.jpg\"/>\n                    <img *ngIf=\"user.avatar\" [src]=\"user.avatar\" class=\"profile-pic\" onerror=\"this.src='assets/img/avatar-default.jpg'\"/>\n                    <ion-icon name=\"camera\" class=\"camera-icon\" color=\"primary\"></ion-icon>\n                </div>\n            </ion-item>\n            <ion-item *ngIf=\"!platform.is('cordova')\" class=\"ion-no-padding ion-no-margin\">\n                <div class=\"browser-upload\">\n                    <input type=\"file\" name=\"image\" (change)=\"selectPhotoFromDeviceAndUpload($event, false)\" accept=\"image/*\"/>\n                </div>\n            </ion-item>\n            <ion-item>\n                <ion-label position=\"stacked\">First Name *</ion-label>\n                <ion-input type=\"text\" formControlName=\"first_name\"></ion-input>\n            </ion-item>\n            <ion-item class=\"form-error-list\" *ngIf=\"!userForm.controls.first_name.pristine && !userForm.controls.first_name.valid\">\n                <p class=\"form-error\" slot=\"end\" *ngIf=\"!userForm.controls.first_name.pristine && userForm.controls.first_name.hasError('required')\">\n                    This is a required field.\n                </p>\n            </ion-item>\n            <ion-item>\n                <ion-label position=\"stacked\">Last Name *</ion-label>\n                <ion-input type=\"text\" formControlName=\"last_name\"></ion-input>\n            </ion-item>\n            <ion-item class=\"form-error-list\" *ngIf=\"!userForm.controls.last_name.pristine && !userForm.controls.last_name.valid\">\n                <p class=\"form-error\" slot=\"end\" *ngIf=\"!userForm.controls.last_name.pristine && userForm.controls.last_name.hasError('required')\">\n                    This is a required field.\n                </p>\n            </ion-item>\n            <ion-item-divider></ion-item-divider>\n            <!--<ion-item lines=\"none\"  color=\"lightgrey\">\n                <ion-label color=\"darkgrey\">Account Information</ion-label>\n            </ion-item>-->\n            <ion-item class=\"ion-text-wrap\" lines=\"none\">\n                <ion-note class=\"ion-padding-vertical\">Verify your email and phone number to ensure that you can recover your account in the future if you forget your password.</ion-note>\n            </ion-item>\n            <ion-item *ngIf=\"user.email\">\n                <ion-label position=\"stacked\">Verified Email Address</ion-label>\n                <ion-input type=\"text\" formControlName=\"email\"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label position=\"stacked\">Email Address</ion-label>\n                <ion-input class=\"email\" type=\"email\" pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$\" formControlName=\"primary_email\"></ion-input>\n                <ion-buttons class=\"verify_button\" slot=\"end\">\n                    <ion-button fill=\"solid\" shape=\"round\" color=\"primary\" (click)=\"registerEmail()\" [disabled]=\"(user.email == userForm.value.primary_email) || !userForm.controls.primary_email.valid\">{{this.user.email && (this.user.email === userForm.value.primary_email) ? 'Verified' : 'Verify'}}</ion-button>\n                </ion-buttons>\n            </ion-item>\n            <ion-item class=\"form-error-list\" *ngIf=\"!userForm.controls.primary_email.pristine && !userForm.controls.primary_email.valid\">\n                <p class=\"form-error\" slot=\"end\" *ngIf=\"!userForm.controls.primary_email.pristine && !userForm.controls.primary_email.valid\">\n                    Invalid email address.\n                </p>\n            </ion-item>\n            <ion-item *ngIf=\"user.mobile\">\n                <ion-label position=\"stacked\">Verified Mobile Phone</ion-label>\n                <ion-input type=\"tel\" formControlName=\"mobile\"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label position=\"stacked\">Mobile Phone</ion-label>\n                <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" class=\"calling_code\" formControlName=\"mobile_calling_code\" name='Country Code'>\n                    <ion-select-option *ngFor=\"let calling_code of calling_codes\" [value]=\"calling_code.value\">{{calling_code.value}}</ion-select-option>\n                </ion-select>\n                <ion-input class=\"phone_number\" type=\"tel\" pattern=\"[0-9]{4,}$\" formControlName=\"mobile_sig_number\"></ion-input>\n                <ion-buttons class=\"verify_button\" slot=\"end\">\n                    <ion-button fill=\"solid\" shape=\"round\" color=\"primary\" (click)=\"registerMobile()\" [disabled]=\"user.mobile == (userForm.value.mobile_calling_code + userForm.value.mobile_sig_number) || !userForm.controls.mobile_sig_number.valid\">{{this.user.mobile && (this.user.mobile === (userForm.value.mobile_calling_code + userForm.value.mobile_sig_number)) ? 'Verified' : 'Verify'}}</ion-button>\n                </ion-buttons>\n            </ion-item>\n            <ion-item class=\"form-error-list\" *ngIf=\"!userForm.controls.mobile_sig_number.pristine && !userForm.controls.mobile_sig_number.valid\">\n                <p class=\"form-error\" slot=\"end\" *ngIf=\"!userForm.controls.mobile_sig_number.pristine && !userForm.controls.mobile_sig_number.valid\">\n                    Invalid mobile number.\n                </p>\n            </ion-item>\n            <ion-item-divider></ion-item-divider>\n            <!--<ion-item lines=\"none\"  color=\"lightgrey\">\n                <ion-label color=\"darkgrey\">Contact Info</ion-label>\n            </ion-item>-->\n            <ion-item class=\"ion-text-wrap\" lines=\"none\">\n                <ion-note class=\"ion-padding-vertical\">Your contact information is private and can only be viewed by people with whom you choose to share.</ion-note>\n            </ion-item>\n            <ion-item-group>\n                <ion-item lines=\"none\" *ngIf=\"!showContactInfo\" (click)=\"showContactInfo = !showContactInfo\">\n                    <ion-label slot=\"start\">Optional</ion-label>\n                    <ion-button size=\"small\" slot=\"end\" fill=\"outline\" *ngIf=\"!showOptional\">Show More</ion-button>\n                </ion-item>\n                <div *ngIf=\"showContactInfo\">\n                    <ion-item>\n                        <ion-label position=\"stacked\">Home Phone</ion-label>\n                        <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" class=\"calling_code\" formControlName=\"home_calling_code\" name='Country Calling Code'>\n                            <ion-select-option *ngFor=\"let calling_code of calling_codes\" [value]=\"calling_code.value\">{{calling_code.value}}</ion-select-option>\n                        </ion-select>\n                        <ion-input class=\"phone_number\" type=\"tel\" pattern=\"[0-9]{4,}$\" formControlName=\"home_sig_number\"></ion-input>\n                    </ion-item>\n                    <ion-item class=\"form-error-list\" *ngIf=\"!userForm.controls.home_sig_number.pristine && !userForm.controls.home_sig_number.valid\">\n                        <p class=\"form-error\" slot=\"end\" *ngIf=\"!userForm.controls.home_sig_number.pristine && !userForm.controls.home_sig_number.valid\">\n                            Invalid home phone number.\n                        </p>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"stacked\">Street</ion-label>\n                        <ion-input type=\"text\" formControlName=\"street\"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"stacked\">City</ion-label>\n                        <ion-input type=\"text\" formControlName=\"city\"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"stacked\">State</ion-label>\n                        <ion-input type=\"text\" formControlName=\"state\"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"stacked\">Zip Code</ion-label>\n                        <ion-input type=\"number\" formControlName=\"zip\"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label position=\"stacked\">Country</ion-label>\n                        <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"country\">\n                            <ion-select-option *ngFor=\"let country of countries\" [value]=\"country.name\" [class.selected]=\"country.selected\">{{country.name}}</ion-select-option>\n                        </ion-select>\n                    </ion-item>\n                </div>\n            </ion-item-group>\n        </ion-list>\n    </form>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar>\n        <ion-item *ngIf=\"mode === 'cancel share' && recipient\">\n            <ion-note class=\"ion-text-wrap\">\n                You are already sharing your contact info with {{recipient.first_name}} {{recipient.last_name}}\n            </ion-note>\n        </ion-item>\n        <ion-button *ngIf=\"mode === 'save'\" (click)=\"updateUserProfile(mode)\" expand=\"full\" shape=\"round\" fill=\"solid\" color=\"primary\" [disabled]=\"!userForm.valid\">Save</ion-button>\n        <ion-button *ngIf=\"mode === 'share'\" (click)=\"updateUserProfile(mode)\" expand=\"full\" shape=\"round\" fill=\"solid\" color=\"primary\" [disabled]=\"!userForm.valid\">Save and Share with {{recipient.first_name}}</ion-button>\n        <ion-button *ngIf=\"mode === 'cancel share'\" (click)=\"modalCtrl.dismiss(mode)\" expand=\"full\" shape=\"round\" fill=\"solid\" color=\"primary\" [disabled]=\"!userForm.valid\">Turn Off Sharing My Contact</ion-button>\n    </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "./src/app/pages/user/profile/profile.page.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/user/profile/profile.page.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-profile ion-content {\n  display: flex;\n  flex-direction: column;\n}\napp-profile ion-note {\n  font-size: 12px;\n}\napp-profile .image-cropper {\n  width: 200px;\n  height: 200px;\n  overflow: hidden;\n  border-radius: 50%;\n  margin: 0 auto;\n}\napp-profile .browser-upload {\n  width: 200px;\n  margin: 5% auto;\n}\napp-profile .camera-icon {\n  width: 25px;\n  height: 25px;\n  position: absolute;\n  bottom: 8px;\n  right: calc(100%/2 - 80px);\n}\napp-profile img {\n  -o-object-fit: cover;\n     object-fit: cover;\n  width: 100%;\n  height: 100%;\n}\napp-profile .profile-pic {\n  width: 100%;\n  margin: auto;\n  display: block;\n}\napp-profile .calling_code {\n  float: left;\n  max-width: 20%;\n  padding: 8px;\n}\napp-profile .phone_number {\n  position: absolute;\n  left: 20%;\n  bottom: 2px;\n  max-width: 50%;\n}\napp-profile .verify_button {\n  right: 5px;\n  margin-top: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL3VzZXIvcHJvZmlsZS9wcm9maWxlLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvdXNlci9wcm9maWxlL3Byb2ZpbGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FDREo7QURJRTtFQUNFLGVBQUE7QUNGSjtBREtFO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQ0hKO0FETUU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQ0pKO0FET0U7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLDBCQUFBO0FDTEo7QURRRTtFQUNFLG9CQUFBO0tBQUEsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ05KO0FEU0U7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUNQSjtBRFVFO0VBQ0UsV0FBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FDUko7QURXRTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0FDVEo7QURZRTtFQUNFLFVBQUE7RUFDQSxnQkFBQTtBQ1ZKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvdXNlci9wcm9maWxlL3Byb2ZpbGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLXByb2ZpbGUge1xuXG4gIGlvbi1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICBpb24tbm90ZSB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICB9XG5cbiAgLmltYWdlLWNyb3BwZXIge1xuICAgIHdpZHRoOiAyMDBweDtcbiAgICBoZWlnaHQ6IDIwMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG5cbiAgLmJyb3dzZXItdXBsb2FkIHtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgbWFyZ2luOiA1JSBhdXRvO1xuICB9XG5cbiAgLmNhbWVyYS1pY29uIHtcbiAgICB3aWR0aDogMjVweDtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogOHB4O1xuICAgIHJpZ2h0OiBjYWxjKDEwMCUvMiAtIDgwcHgpO1xuICB9XG5cbiAgaW1nIHtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAucHJvZmlsZS1waWMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuXG4gIC5jYWxsaW5nX2NvZGUge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIG1heC13aWR0aDogMjAlO1xuICAgIHBhZGRpbmc6IDhweDtcbiAgfVxuXG4gIC5waG9uZV9udW1iZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAyMCU7XG4gICAgYm90dG9tOiAycHg7XG4gICAgbWF4LXdpZHRoOiA1MCU7XG4gIH1cblxuICAudmVyaWZ5X2J1dHRvbiB7XG4gICAgcmlnaHQ6IDVweDtcbiAgICBtYXJnaW4tdG9wOiAxMnB4O1xuICB9XG59XG5cbiIsImFwcC1wcm9maWxlIGlvbi1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbmFwcC1wcm9maWxlIGlvbi1ub3RlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuYXBwLXByb2ZpbGUgLmltYWdlLWNyb3BwZXIge1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5hcHAtcHJvZmlsZSAuYnJvd3Nlci11cGxvYWQge1xuICB3aWR0aDogMjAwcHg7XG4gIG1hcmdpbjogNSUgYXV0bztcbn1cbmFwcC1wcm9maWxlIC5jYW1lcmEtaWNvbiB7XG4gIHdpZHRoOiAyNXB4O1xuICBoZWlnaHQ6IDI1cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiA4cHg7XG4gIHJpZ2h0OiBjYWxjKDEwMCUvMiAtIDgwcHgpO1xufVxuYXBwLXByb2ZpbGUgaW1nIHtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5hcHAtcHJvZmlsZSAucHJvZmlsZS1waWMge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiBhdXRvO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbmFwcC1wcm9maWxlIC5jYWxsaW5nX2NvZGUge1xuICBmbG9hdDogbGVmdDtcbiAgbWF4LXdpZHRoOiAyMCU7XG4gIHBhZGRpbmc6IDhweDtcbn1cbmFwcC1wcm9maWxlIC5waG9uZV9udW1iZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDIwJTtcbiAgYm90dG9tOiAycHg7XG4gIG1heC13aWR0aDogNTAlO1xufVxuYXBwLXByb2ZpbGUgLnZlcmlmeV9idXR0b24ge1xuICByaWdodDogNXB4O1xuICBtYXJnaW4tdG9wOiAxMnB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/user/profile/profile.page.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/user/profile/profile.page.ts ***!
  \****************************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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










var ProfilePage = /** @class */ (function () {
    function ProfilePage(route, location, storage, platform, fb, alertCtrl, loadingCtrl, modalCtrl, authService, userData, awsService) {
        var _this = this;
        this.route = route;
        this.location = location;
        this.storage = storage;
        this.platform = platform;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.authService = authService;
        this.userData = userData;
        this.awsService = awsService;
        this.subscriptions = {};
        this.user = {};
        this.countries = [];
        this.calling_codes = [];
        this.country_list = ["United States", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, US", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
        this.calling_code_list = ["+1", "+20", "+212", "+213", "+216", "+218", "+220", "+221", "+222", "+223", "+224", "+225", "+226", "+227", "+229", "+230", "+231", "+232", "+233", "+234", "+235", "+236", "+237", "+238", "+239", "+240", "+241", "+242", "+243", "+244", "+245", "+248", "+249", "+250", "+251", "+252", "+253", "+254", "+255", "+256", "+257", "+258", "+260", "+261", "+262", "+263", "+264", "+265", "+266", "+267", "+268", "+269", "+269", "+27", "+290", "+291", "+297", "+298", "+299", "+30", "+31", "+32", "+33", "+34", "+350", "+351", "+352", "+353", "+354", "+355", "+356", "+357", "+358", "+359", "+36", "+370", "+371", "+372", "+373", "+374", "+375", "+376", "+377", "+378", "+380", "+385", "+386", "+387", "+389", "+39", "+40", "+41", "+418", "+420", "+421", "+423", "+43", "+44", "+45", "+46", "+47", "+48", "+49", "+500", "+501", "+502", "+503", "+504", "+505", "+506", "+507", "+508", "+509", "+51", "+52", "+53", "+53", "+54", "+55", "+56", "+57", "+58", "+590", "+591", "+592", "+593", "+594", "+595", "+596", "+597", "+598", "+599", "+60", "+61", "+62", "+63", "+64", "+65", "+66", "+670", "+672", "+672", "+673", "+674", "+675", "+676", "+677", "+678", "+679", "+680", "+681", "+682", "+683", "+685", "+686", "+687", "+688", "+689", "+690", "+691", "+692", "+7", "+81", "+82", "+84", "+850", "+852", "+853", "+855", "+856", "+86", "+880", "+886", "+90", "+91", "+92", "+93", "+94", "+95", "+960", "+961", "+962", "+963", "+964", "+965", "+966", "+967", "+968", "+970", "+971", "+972", "+973", "+974", "+975", "+976", "+977", "+979", "+98", "+991", "+992", "+993", "+994", "+995", "+996", "+998"];
        this.showContactInfo = false;
        this.ionSpinner = true;
        this.refreshUserStatusHandler = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refreshUserData(data)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.ionSpinner = false;
                        return [2 /*return*/];
                }
            });
        }); };
        this.userForm = this.fb.group({
            first_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            last_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            mobile: [{ value: '', disabled: true }],
            mobile_calling_code: [''],
            mobile_sig_number: [''],
            email: [{ value: '', disabled: true }],
            primary_email: [''],
            home_calling_code: [''],
            home_sig_number: [''],
            street: [''],
            city: [''],
            state: [''],
            zip: [''],
            country: [''],
        });
        for (var i = 0; i < this.country_list.length; i++) {
            this.countries.push({ name: this.country_list[i], selected: false });
        }
        for (var i = 0; i < this.calling_code_list.length; i++) {
            this.calling_codes.push({ value: this.calling_code_list[i], selected: false });
        }
    }
    ProfilePage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
                if (this.userData && this.userData.user) {
                    this.user = this.userData.user;
                    this.populateForm();
                }
                this.userData.splitPaneState = 'md';
                if (!this.mode) {
                    this.mode = this.route.snapshot.paramMap.get('mode') || 'save'; // try to load from url param if not provided via @Input
                }
                return [2 /*return*/];
            });
        });
    };
    ProfilePage.prototype.refreshUserData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(data && data.type === 'user updated' && data.user)) return [3 /*break*/, 1];
                        this.user = data.user;
                        return [3 /*break*/, 3];
                    case 1:
                        _a = this;
                        return [4 /*yield*/, this.userData.load()];
                    case 2:
                        _a.user = _b.sent();
                        _b.label = 3;
                    case 3:
                        this.populateForm();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.populateForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                for (i = 0; i < this.calling_codes.length; i++) {
                    if (this.user.mobile_phone && this.user.mobile_phone.indexOf(this.calling_codes[i].value) > -1) {
                        this.user.mobile_calling_code = this.calling_codes[i].value;
                        this.calling_codes[i].selected = true;
                        this.user.mobile_sig_number = this.user.mobile_phone.slice(this.calling_codes[i].value.length);
                    }
                    if (this.user.home_phone && this.user.home_phone.indexOf(this.calling_codes[i].value) > -1) {
                        this.user.home_calling_code = this.calling_codes[i].value;
                        this.calling_codes[i].selected = true;
                        this.user.home_sig_number = this.user.home_phone.slice(this.calling_codes[i].value.length);
                    }
                }
                this.userForm.patchValue(this.user);
                return [2 /*return*/];
            });
        });
    };
    ProfilePage.prototype.selectPhotoFromDeviceAndUpload = function (event, useCapacitor) {
        return __awaiter(this, void 0, void 0, function () {
            var result, Camera, image, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        result = void 0;
                        if (!useCapacitor) return [3 /*break*/, 4];
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_8__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_8__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_8__["CameraSource"].Prompt,
                                correctOrientation: false
                            })];
                    case 1:
                        image = _a.sent();
                        if (!image) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.awsService.uploadImage('users', this.userData.user._id, image, this.userData.user._id)];
                    case 2:
                        result = _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.awsService.compressPhoto(event.target.files[0])];
                    case 5:
                        result = _a.sent();
                        return [4 /*yield*/, this.awsService.uploadFile('users', this.userData.user._id, result, this.userData.user._id)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!result) return [3 /*break*/, 11];
                        if (!this.userData.user.avatar) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.awsService.removeFile(this.userData.user.avatar)];
                    case 8:
                        _a.sent(); //remove the previous background from Digital Ocean
                        _a.label = 9;
                    case 9:
                        this.user.avatar = this.awsService.url;
                        this.userData.user.avatar = this.awsService.url;
                        return [4 /*yield*/, this.userData.update({ _id: this.userData.user._id, avatar: this.awsService.url })];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.registerMobile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userForm.get('mobile_sig_number').value || !this.userForm.get('mobile_sig_number').value.length) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Verify Your Mobile Number',
                                subHeader: 'We will send you a SMS message to verify your mobile number. Standard SMS rate applies. Proceed?',
                                buttons: [{ text: 'Yes',
                                        handler: function () {
                                            var navTransition = alert.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var data, result, alert2, err_2, alert3;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            data = {
                                                                mobile_phone: this.userForm.get('mobile_calling_code').value + this.userForm.get('mobile_sig_number').value,
                                                                deviceToken: this.authService.token
                                                            };
                                                            _a.label = 1;
                                                        case 1:
                                                            _a.trys.push([1, 8, , 11]);
                                                            return [4 /*yield*/, this.userData.update({ _id: this.userData.user._id, mobile_phone: this.userForm.get('mobile_calling_code').value + this.userForm.get('mobile_sig_number').value })];
                                                        case 2:
                                                            _a.sent();
                                                            this.user.mobile_phone = this.userForm.get('mobile_calling_code').value + this.userForm.get('mobile_sig_number').value;
                                                            return [4 /*yield*/, this.authService.registerMobile(data)];
                                                        case 3:
                                                            result = _a.sent();
                                                            if (!result.success) return [3 /*break*/, 4];
                                                            this.verifyMobile(result.msg);
                                                            return [3 /*break*/, 7];
                                                        case 4: return [4 /*yield*/, this.alertCtrl.create({
                                                                header: 'Verification Failed',
                                                                subHeader: result.msg,
                                                                buttons: [{ text: 'Dismiss' }],
                                                                cssClass: 'level-15'
                                                            })];
                                                        case 5:
                                                            alert2 = _a.sent();
                                                            return [4 /*yield*/, alert2.present()];
                                                        case 6:
                                                            _a.sent();
                                                            _a.label = 7;
                                                        case 7: return [3 /*break*/, 11];
                                                        case 8:
                                                            err_2 = _a.sent();
                                                            return [4 /*yield*/, this.alertCtrl.create({
                                                                    header: 'Something Went Wrong',
                                                                    subHeader: 'Please try again later.',
                                                                    buttons: [{ text: 'Dismiss' }],
                                                                    cssClass: 'level-15'
                                                                })];
                                                        case 9:
                                                            alert3 = _a.sent();
                                                            return [4 /*yield*/, alert3.present()];
                                                        case 10:
                                                            _a.sent();
                                                            return [3 /*break*/, 11];
                                                        case 11: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } }, { text: 'Cancel' }],
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
    ProfilePage.prototype.verifyMobile = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Verification via SMS',
                            subHeader: message,
                            inputs: [
                                {
                                    name: 'code',
                                    placeholder: '6-digit code'
                                },
                            ],
                            buttons: [{ text: 'Ok',
                                    handler: function (input) {
                                        var navTransition = alert.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var data, result, alert2, alert3;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        data = {
                                                            _id: this.user._id,
                                                            mobile_phone: this.user.mobile_phone,
                                                            //deviceToken: this.deviceToken, // since we are providing the code, the token is not necessary
                                                            code: input.code
                                                        };
                                                        return [4 /*yield*/, this.authService.verifyMobile(data)];
                                                    case 1:
                                                        result = _a.sent();
                                                        if (!result.success) return [3 /*break*/, 4];
                                                        return [4 /*yield*/, this.alertCtrl.create({
                                                                header: 'Success',
                                                                subHeader: result.msg,
                                                                buttons: [{
                                                                        text: 'Ok',
                                                                        handler: function () {
                                                                            _this.refreshUserData(null);
                                                                        }
                                                                    }],
                                                                cssClass: 'level-15'
                                                            })];
                                                    case 2:
                                                        alert2 = _a.sent();
                                                        return [4 /*yield*/, alert2.present()];
                                                    case 3:
                                                        _a.sent();
                                                        return [3 /*break*/, 7];
                                                    case 4: return [4 /*yield*/, this.alertCtrl.create({
                                                            header: 'Failed',
                                                            subHeader: result.msg,
                                                            buttons: [{
                                                                    text: 'Retry',
                                                                    handler: function () {
                                                                        _this.verifyMobile(result.msg);
                                                                    }
                                                                }, { text: 'Cancel' }],
                                                            cssClass: 'level-15'
                                                        })];
                                                    case 5:
                                                        alert3 = _a.sent();
                                                        return [4 /*yield*/, alert3.present()];
                                                    case 6:
                                                        _a.sent();
                                                        _a.label = 7;
                                                    case 7: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }
                                }, { text: 'Cancel' }],
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
    ProfilePage.prototype.registerEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userForm.value.primary_email || !this.userForm.value.primary_email.length) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Verify Your Email Address',
                                subHeader: 'We will send a verification email to ' + this.userForm.value.primary_email + '. Proceed?',
                                buttons: [{ text: 'Yes',
                                        handler: function () {
                                            var navTransition = alert.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var data, result, alert2, alert3, err_3;
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 9, , 10]);
                                                            data = {
                                                                _id: this.user._id,
                                                                email: this.userForm.value.primary_email,
                                                            };
                                                            return [4 /*yield*/, this.userData.update({ _id: this.userData.user._id, primary_email: this.userForm.value.primary_email })];
                                                        case 1:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.authService.registerEmail(data)];
                                                        case 2:
                                                            result = _a.sent();
                                                            if (!result.success) return [3 /*break*/, 5];
                                                            return [4 /*yield*/, this.alertCtrl.create({
                                                                    header: 'Success',
                                                                    subHeader: result.msg,
                                                                    buttons: [{
                                                                            text: 'Ok',
                                                                            handler: function () {
                                                                                _this.refreshUserData(null);
                                                                            }
                                                                        }],
                                                                    cssClass: 'level-15'
                                                                })];
                                                        case 3:
                                                            alert2 = _a.sent();
                                                            return [4 /*yield*/, alert2.present()];
                                                        case 4:
                                                            _a.sent();
                                                            return [3 /*break*/, 8];
                                                        case 5: return [4 /*yield*/, this.alertCtrl.create({
                                                                header: 'Verification Failed',
                                                                subHeader: result.msg,
                                                                buttons: [{ text: 'Dismiss' }],
                                                                cssClass: 'level-15'
                                                            })];
                                                        case 6:
                                                            alert3 = _a.sent();
                                                            return [4 /*yield*/, alert3.present()];
                                                        case 7:
                                                            _a.sent();
                                                            _a.label = 8;
                                                        case 8: return [3 /*break*/, 10];
                                                        case 9:
                                                            err_3 = _a.sent();
                                                            console.log(err_3);
                                                            return [3 /*break*/, 10];
                                                        case 10: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } }, { text: 'Cancel' }],
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
    ProfilePage.prototype.updateUserProfile = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4, alert_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        this.ionSpinner = true;
                        this.user = this.userForm.value;
                        if (this.user.mobile_calling_code && this.user.mobile_sig_number) {
                            this.user.mobile_phone = this.user.mobile_calling_code + this.user.mobile_sig_number;
                        }
                        if (this.user.home_calling_code && this.user.home_sig_number) {
                            this.user.home_phone = this.user.home_calling_code + this.user.home_sig_number;
                        }
                        return [4 /*yield*/, this.userData.update(this.user)];
                    case 1:
                        _a.sent();
                        this.user = this.userData.user;
                        this.populateForm();
                        this.ionSpinner = false;
                        if (this.modalPage) {
                            this.modalCtrl.dismiss(action);
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Error',
                                subHeader: 'Failed to update user profile.',
                                buttons: [{ text: 'Ok' }],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
    };
    ProfilePage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    ProfilePage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["Platform"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ModalController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["Auth"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_5__["Aws"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ProfilePage.prototype, "recipient", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ProfilePage.prototype, "mode", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ProfilePage.prototype, "modalPage", void 0);
    ProfilePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile',
            template: __importDefault(__webpack_require__(/*! raw-loader!./profile.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/profile/profile.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./profile.page.scss */ "./src/app/pages/user/profile/profile.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["Platform"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["ModalController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["Auth"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_5__["Aws"]])
    ], ProfilePage);
    return ProfilePage;
}());



/***/ })

}]);
//# sourceMappingURL=default~board-communityboard-communityboard-module~connect-myconversations-myconversations-module~gr~632626bd.js.map