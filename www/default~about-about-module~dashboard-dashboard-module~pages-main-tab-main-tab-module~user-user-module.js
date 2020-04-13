(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~about-about-module~dashboard-dashboard-module~pages-main-tab-main-tab-module~user-user-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/about/about.page.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/about/about.page.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\" id=\"about-me-header\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\" id='clickback'><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>About Me</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"openOnbaordingProcess('')\" id=\"editall\">Edit All</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding-top\">\n  <ion-grid style=\"height: 100%\" *ngIf=\"!programs\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n  <ion-list *ngIf=\"programs\">\n    <div>\n      <ion-item lines=\"none\">\n        <div class=\"image-cropper\" (click)=\"selectPhotoFromDeviceAndUpload($event, true)\">\n          <img *ngIf=\"userData.user.avatar\" [src]=\"userData.user.avatar\" onerror=\"this.src='assets/img/avatar-default.jpg'\"/>\n          <img *ngIf=\"!userData.user.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n          <ion-icon name=\"camera\" class=\"camera-icon\" color=\"primary\"></ion-icon>\n        </div>\n        <ion-button class=\"edit-button\" fill=\"clear\" *ngIf=\"!modalPage\" (click)=\"openOnbaordingProcess('')\">Edit All</ion-button>\n      </ion-item>\n      <ion-item *ngIf=\"!platform.is('cordova')\" class=\"ion-no-padding ion-no-margin\">\n        <div class=\"browser-upload\">\n          <input type=\"file\" name=\"image\" (change)=\"selectPhotoFromDeviceAndUpload($event, false)\" accept=\"image/*\"/>\n        </div>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <p class=\"name ion-text-center ion-text-md-uppercase\">{{userData.user.first_name}} {{userData.user.last_name}} <span *ngIf=\"userData.user.role === 'Contact' || userData.user.role === 'Pending'\">{{userData.user.name}}</span></p>\n      </ion-item>\n      <ion-row class=\"ion-justify-content-center\">\n        <ion-badge shape=\"round\">{{role}}</ion-badge>\n      </ion-row>\n      <div *ngFor=\"let program of programs\">\n        <div *ngIf=\"program._id === '5d5785b462489003817fee18'\">\n          <ion-item>\n            About Me\n            <ion-button shape=\"round\" (click)=\"openOnbaordingProcess(program._id)\" slot=\"end\">Edit</ion-button>\n          </ion-item>\n          <div *ngFor=\"let leader of program.leader\" style=\"margin: 0 16px\">\n            <div class=\"question-answer-container\">\n              <div *ngIf=\"leader._id === 1570150762856667\" class=\"question\">I am...</div>\n              <div *ngIf=\"leader._id !== 1570150762856667\" class=\"question\">{{leader.question}}</div>\n              <div *ngFor=\"let answer of leader.user_answer\">\n                <div class=\"answer\" [innerHTML]=\"answer | nl2br\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div *ngIf=\"program._id !== '5d5785b462489003817fee18'\">\n          <ion-item>\n            {{program.name}}\n            <ion-button shape=\"round\" (click)=\"openOnbaordingProcess(program._id)\" slot=\"end\">Edit</ion-button>\n          </ion-item>\n          <div *ngFor=\"let leader of program.leader\" style=\"margin-left: 16px\">\n            <div class=\"question-answer-container\" *ngIf=\"leader.user_answer?.length && leader.user_answer[0] && leader.user_answer[0].length\">\n              <div class=\"question\">{{leader.question}}</div>\n              <div *ngFor=\"let answer of leader.user_answer\">\n                <div class=\"answer\" [innerHTML]=\"answer | nl2br\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/user/about/about.page.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/user/about/about.page.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-about .browser-upload {\n  width: 200px;\n  margin: 5% auto;\n}\napp-about .camera-icon {\n  width: 25px;\n  height: 25px;\n  position: absolute;\n  bottom: 4px;\n  right: calc(100%/2 - 64px);\n}\napp-about .edit-button {\n  position: absolute;\n  right: 10px;\n  top: 0;\n}\napp-about .section-title {\n  color: white;\n  --background: var(--ion-color-grey);\n  text-align: left;\n  font-size: large;\n}\napp-about .name {\n  width: 100%;\n  margin: 0 auto;\n}\napp-about .image-cropper {\n  width: 150px;\n  height: 150px;\n  overflow: hidden;\n  border-radius: 50%;\n  margin: 0 auto;\n}\napp-about img {\n  -o-object-fit: cover;\n     object-fit: cover;\n  width: 100%;\n  height: 100%;\n}\napp-about .label-title {\n  font-weight: bold;\n  color: var(--ion-color-grey);\n}\napp-about .user-detail {\n  color: var(--ion-color-grey);\n  text-align: right;\n  min-width: 70%;\n}\napp-about .relationship-action {\n  color: white;\n}\napp-about .infoSharingDiv {\n  padding-left: 5%;\n  padding-right: 5%;\n}\napp-about .question-answer-container {\n  text-wrap: normal;\n}\napp-about .question {\n  margin: 8px 12px;\n  font-size: 16px;\n}\napp-about .answer {\n  margin: 8px 12px;\n  font-size: 16px;\n  color: grey;\n  font-style: italic;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL3VzZXIvYWJvdXQvYWJvdXQucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy91c2VyL2Fib3V0L2Fib3V0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FDQUo7QURHRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsMEJBQUE7QUNESjtBRElFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsTUFBQTtBQ0ZKO0FES0U7RUFDRSxZQUFBO0VBQ0EsbUNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDSEo7QURNRTtFQUNFLFdBQUE7RUFDQSxjQUFBO0FDSko7QURPRTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUNMSjtBRFFFO0VBQ0Usb0JBQUE7S0FBQSxpQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDTko7QURTRTtFQUNFLGlCQUFBO0VBQ0EsNEJBQUE7QUNQSjtBRFVFO0VBQ0UsNEJBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUNSSjtBRFdFO0VBQ0UsWUFBQTtBQ1RKO0FEWUU7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0FDVko7QURhRTtFQUNFLGlCQUFBO0FDWEo7QURjRTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtBQ1pKO0FEZUU7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUNiSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXIvYWJvdXQvYWJvdXQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWFib3V0IHtcbiAgLmJyb3dzZXItdXBsb2FkIHtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgbWFyZ2luOiA1JSBhdXRvO1xuICB9XG5cbiAgLmNhbWVyYS1pY29uIHtcbiAgICB3aWR0aDogMjVweDtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogNHB4O1xuICAgIHJpZ2h0OiBjYWxjKDEwMCUvMiAtIDY0cHgpO1xuICB9XG5cbiAgLmVkaXQtYnV0dG9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDEwcHg7XG4gICAgdG9wOiAwO1xuICB9XG5cbiAgLnNlY3Rpb24tdGl0bGUge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIH1cblxuICAubmFtZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIH1cblxuICAuaW1hZ2UtY3JvcHBlciB7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGhlaWdodDogMTUwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIH1cblxuICBpbWcge1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuXG4gIC5sYWJlbC10aXRsZSB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgfVxuXG4gIC51c2VyLWRldGFpbCB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBtaW4td2lkdGg6IDcwJTtcbiAgfVxuXG4gIC5yZWxhdGlvbnNoaXAtYWN0aW9uIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cblxuICAuaW5mb1NoYXJpbmdEaXZ7XG4gICAgcGFkZGluZy1sZWZ0OiA1JTtcbiAgICBwYWRkaW5nLXJpZ2h0OiA1JTtcbiAgfVxuXG4gIC5xdWVzdGlvbi1hbnN3ZXItY29udGFpbmVyIHtcbiAgICB0ZXh0LXdyYXA6IG5vcm1hbDtcbiAgfVxuXG4gIC5xdWVzdGlvbiB7XG4gICAgbWFyZ2luOiA4cHggMTJweDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cblxuICAuYW5zd2VyIHtcbiAgICBtYXJnaW46IDhweCAxMnB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBjb2xvcjogZ3JleTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIH1cbn1cbiIsImFwcC1hYm91dCAuYnJvd3Nlci11cGxvYWQge1xuICB3aWR0aDogMjAwcHg7XG4gIG1hcmdpbjogNSUgYXV0bztcbn1cbmFwcC1hYm91dCAuY2FtZXJhLWljb24ge1xuICB3aWR0aDogMjVweDtcbiAgaGVpZ2h0OiAyNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogNHB4O1xuICByaWdodDogY2FsYygxMDAlLzIgLSA2NHB4KTtcbn1cbmFwcC1hYm91dCAuZWRpdC1idXR0b24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxMHB4O1xuICB0b3A6IDA7XG59XG5hcHAtYWJvdXQgLnNlY3Rpb24tdGl0bGUge1xuICBjb2xvcjogd2hpdGU7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXNpemU6IGxhcmdlO1xufVxuYXBwLWFib3V0IC5uYW1lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuYXBwLWFib3V0IC5pbWFnZS1jcm9wcGVyIHtcbiAgd2lkdGg6IDE1MHB4O1xuICBoZWlnaHQ6IDE1MHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuYXBwLWFib3V0IGltZyB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuYXBwLWFib3V0IC5sYWJlbC10aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xufVxuYXBwLWFib3V0IC51c2VyLWRldGFpbCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBtaW4td2lkdGg6IDcwJTtcbn1cbmFwcC1hYm91dCAucmVsYXRpb25zaGlwLWFjdGlvbiB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbmFwcC1hYm91dCAuaW5mb1NoYXJpbmdEaXYge1xuICBwYWRkaW5nLWxlZnQ6IDUlO1xuICBwYWRkaW5nLXJpZ2h0OiA1JTtcbn1cbmFwcC1hYm91dCAucXVlc3Rpb24tYW5zd2VyLWNvbnRhaW5lciB7XG4gIHRleHQtd3JhcDogbm9ybWFsO1xufVxuYXBwLWFib3V0IC5xdWVzdGlvbiB7XG4gIG1hcmdpbjogOHB4IDEycHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cbmFwcC1hYm91dCAuYW5zd2VyIHtcbiAgbWFyZ2luOiA4cHggMTJweDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogZ3JleTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/user/about/about.page.ts":
/*!************************************************!*\
  !*** ./src/app/pages/user/about/about.page.ts ***!
  \************************************************/
/*! exports provided: AboutPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPage", function() { return AboutPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _discover_preferences_preferences_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../discover/preferences/preferences.page */ "./src/app/pages/discover/preferences/preferences.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
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








var AboutPage = /** @class */ (function () {
    function AboutPage(platform, router, awsService, modalCtrl, userData, authService) {
        var _this = this;
        this.platform = platform;
        this.router = router;
        this.awsService = awsService;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.authService = authService;
        this.subscriptions = {};
        this.refreshUserStatusHandler = function () {
            if (_this.authService.token && _this.userData && _this.userData.user) {
                _this.loadAnswers();
            }
        };
    }
    AboutPage.prototype.ngOnInit = function () {
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
    };
    AboutPage.prototype.loadAnswers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, result, _c, _d, program, _e, _f, leader;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.userData.loadMyOnboardingAnswers()];
                    case 1:
                        result = _g.sent();
                        this.programs = result.programs;
                        if (this.programs) {
                            try {
                                for (_c = __values(this.programs), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    program = _d.value;
                                    try {
                                        for (_e = __values(program.leader), _f = _e.next(); !_f.done; _f = _e.next()) {
                                            leader = _f.value;
                                            if (leader.role) {
                                                this.role = leader.role;
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
    AboutPage.prototype.openOnbaordingProcess = function (programId) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.platform.width() >= 768 && !this.modalPage)) return [3 /*break*/, 1];
                        if (!programId) {
                            this.router.navigate(['/app/user/allpreferences', { showHeader: true }]);
                        }
                        else {
                            this.router.navigate(['/app/user/preferences/' + programId, { showHeader: true }]);
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.modalCtrl.create({ component: _discover_preferences_preferences_page__WEBPACK_IMPORTED_MODULE_3__["PreferencesPage"], componentProps: { programId: programId, modalPage: true } })];
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
    AboutPage.prototype.selectPhotoFromDeviceAndUpload = function (event, useCapacitor) {
        return __awaiter(this, void 0, void 0, function () {
            var result, Camera, image, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        result = void 0;
                        if (!useCapacitor) return [3 /*break*/, 4];
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_5__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_5__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_5__["CameraSource"].Prompt,
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
    AboutPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    AboutPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
    };
    AboutPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_6__["Aws"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserData"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["Auth"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AboutPage.prototype, "modalPage", void 0);
    AboutPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-about',
            template: __importDefault(__webpack_require__(/*! raw-loader!./about.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/about/about.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./about.page.scss */ "./src/app/pages/user/about/about.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_6__["Aws"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserData"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["Auth"]])
    ], AboutPage);
    return AboutPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~about-about-module~dashboard-dashboard-module~pages-main-tab-main-tab-module~user-user-module.js.map