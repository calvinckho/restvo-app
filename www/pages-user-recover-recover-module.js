(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-user-recover-recover-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/recover/recover.page.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/recover/recover.page.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content class=\"ion-padding\">\n  <ion-grid class=\"full-height\">\n    <ion-row class=\"ion-align-items-center full-height\">\n      <ion-col>\n        <form [formGroup]=\"passForm\">\n          <ion-list lines=\"none\">\n            <div class=\"title\" style=\"margin: 10% 0 20% 0;\">Reset Your Password</div>\n            <ion-item lines=\"full\">\n              <ion-input #password [type]=\"passwordType\" formControlName=\"password\" placeholder=\"Password\"></ion-input>\n              <ion-icon slot=\"end\" [name]=\"passwordIcon\" class=\"password-icon\" (click)='hideShowPassword()'></ion-icon>\n            </ion-item>\n            <ion-item *ngIf=\"!passForm.controls.password.pristine && !passForm.controls.password.valid\">\n              <p class=\"form-error\" slot=\"end\" *ngIf=\"!passForm.controls.password.pristine && passForm.controls.password.hasError('required')\">\n                This is a required field.\n              </p>\n              <p class=\"form-error\" slot=\"end\" *ngIf=\"!passForm.controls.password.pristine && passForm.controls.password?.errors?.minlength\">\n                Password must have more than 5 characters\n              </p>\n            </ion-item>\n            <ion-item lines=\"full\">\n              <ion-input type=\"password\" formControlName=\"passwordConfirmation\" placeholder=\"Confirm Password\"></ion-input>\n            </ion-item>\n            <ion-item  *ngIf=\"!passForm.controls.passwordConfirmation.pristine && (!passForm.controls.passwordConfirmation.valid || passForm.hasError('mismatchedPasswords'))\">\n              <p class=\"form-error\" slot=\"end\" *ngIf=\"!passForm.controls.passwordConfirmation.pristine && passForm.controls.passwordConfirmation.hasError('required')\">\n                This is a required field.\n              </p>\n              <p class=\"form-error\" slot=\"end\" *ngIf=\"!passForm.controls.passwordConfirmation.pristine && passForm.controls.passwordConfirmation?.errors?.minlength\">\n                Password must have more than 5 characters\n              </p>\n              <p class=\"form-error\" slot=\"end\" *ngIf=\"!passForm.controls.passwordConfirmation.pristine && passForm.hasError('mismatchedPasswords')\">\n                Password do not match\n              </p>\n            </ion-item>\n            <div></div><!--Do not remove! This fixes the white line issue at the bottom-->\n          </ion-list>\n          <ion-row style=\"margin-top: 20%;\">\n            <ion-col>\n              <ion-button [disabled]=\"!passForm.valid || !password\" expand=\"full\" shape=\"round\" color=\"primary\" (click)=\"recover()\">Recover</ion-button>\n            </ion-col>\n          </ion-row>\n        </form>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/user/recover/recover-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/user/recover/recover-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: RecoverPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecoverPageRoutingModule", function() { return RecoverPageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _recover_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recover.page */ "./src/app/pages/user/recover/recover.page.ts");
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
        component: _recover_page__WEBPACK_IMPORTED_MODULE_2__["RecoverPage"]
    }
];
var RecoverPageRoutingModule = /** @class */ (function () {
    function RecoverPageRoutingModule() {
    }
    RecoverPageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], RecoverPageRoutingModule);
    return RecoverPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/user/recover/recover.module.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/user/recover/recover.module.ts ***!
  \******************************************************/
/*! exports provided: RecoverPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecoverPageModule", function() { return RecoverPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _recover_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./recover.page */ "./src/app/pages/user/recover/recover.page.ts");
/* harmony import */ var _recover_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./recover-routing.module */ "./src/app/pages/user/recover/recover-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var RecoverPageModule = /** @class */ (function () {
    function RecoverPageModule() {
    }
    RecoverPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _recover_routing_module__WEBPACK_IMPORTED_MODULE_5__["RecoverPageRoutingModule"]
            ],
            declarations: [_recover_page__WEBPACK_IMPORTED_MODULE_4__["RecoverPage"]]
        })
    ], RecoverPageModule);
    return RecoverPageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/recover/recover.page.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/user/recover/recover.page.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-recover ion-content {\n  min-height: 100vh;\n  /*--background-size: cover;*/\n}\napp-recover ion-list {\n  background: transparent !important;\n  margin: 0;\n}\napp-recover p, app-recover li {\n  margin-left: 10px;\n  margin-right: 10px;\n  font-size: 12px;\n  text-align: left;\n}\napp-recover h4 {\n  margin-bottom: 10%;\n}\napp-recover a {\n  color: #41a6de;\n}\napp-recover ion-item {\n  padding-left: 10px !important;\n  margin-bottom: 10px;\n  --background: transparent !important;\n  font-size: 0.9em;\n}\napp-recover ion-select {\n  font-size: 17px;\n}\napp-recover .form {\n  width: 70%;\n  margin: 0 auto;\n}\napp-recover ion-list {\n  margin: 0;\n}\napp-recover .full-height {\n  height: 100%;\n}\napp-recover .password-icon {\n  font-size: 2rem !important;\n  position: relative !important;\n  top: 5px !important;\n  margin: 0 auto !important;\n}\napp-recover .default-avatar {\n  width: 60%;\n  margin: 15% auto 15% auto;\n  display: block;\n  background: transparent;\n}\napp-recover .title {\n  font-size: 24px;\n  font-style: bold;\n  text-align: center;\n}\napp-recover .comment {\n  font-size: 18px;\n  text-align: center;\n}\napp-recover .custom-back-button {\n  margin: 10% 0 20% 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL3VzZXIvcmVjb3Zlci9yZWNvdmVyLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvdXNlci9yZWNvdmVyL3JlY292ZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVFO0VBQ0UsaUJBQUE7RUFFQSw0QkFBQTtBQ0ZKO0FETUU7RUFDRSxrQ0FBQTtFQUNBLFNBQUE7QUNKSjtBRFdFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUVBLGVBQUE7RUFDQSxnQkFBQTtBQ1ZKO0FEYUU7RUFFRSxrQkFBQTtBQ1pKO0FEZUU7RUFDRSxjQUFBO0FDYko7QURnQkU7RUFDRSw2QkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0NBQUE7RUFDQSxnQkFBQTtBQ2RKO0FEaUJFO0VBRUUsZUFBQTtBQ2hCSjtBRG9CRTtFQUNFLFVBQUE7RUFDQSxjQUFBO0FDbEJKO0FEeUJFO0VBQ0UsU0FBQTtBQ3ZCSjtBRDBCRTtFQUNFLFlBQUE7QUN4Qko7QUQyQkU7RUFFRSwwQkFBQTtFQUNBLDZCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtBQzFCSjtBRDZCRTtFQUNFLFVBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7RUFDQSx1QkFBQTtBQzNCSjtBRDhCRTtFQUVFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FDN0JKO0FEZ0NFO0VBRUUsZUFBQTtFQUNBLGtCQUFBO0FDL0JKO0FEdUNFO0VBQ0UsbUJBQUE7QUNyQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy91c2VyL3JlY292ZXIvcmVjb3Zlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtcmVjb3ZlciB7XG5cbiAgaW9uLWNvbnRlbnQge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICAgIC8vLS1iYWNrZ3JvdW5kOiB1cmwoJ2h0dHBzOi8vd2VlLm55YzMuZGlnaXRhbG9jZWFuc3BhY2VzLmNvbS9hcHAvcmVzdHZvX3RlbnRfYmFja2dyb3VuZC5qcGcnKTsgLy9hc3NldHMvaW1nL21vYmlsZS1vbmJvYXJkaW5nLW1haW4uanBnJylcbiAgICAvKi0tYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsqL1xuICB9XG5cblxuICBpb24tbGlzdCB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICBpb24taW5wdXQge1xuICAgIC8vLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gIH1cblxuICBwLCBsaSB7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgIC8vY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB9XG5cbiAgaDQge1xuICAgIC8vY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICAgIG1hcmdpbi1ib3R0b206IDEwJTtcbiAgfVxuXG4gIGEge1xuICAgIGNvbG9yOiByZ2IoNjUsMTY2LDIyMik7XG4gIH1cblxuICBpb24taXRlbSB7XG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4ICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgZm9udC1zaXplOiAwLjllbTtcbiAgfVxuXG4gIGlvbi1zZWxlY3Qge1xuICAgIC8vY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICAgIGZvbnQtc2l6ZTogMTdweDtcbiAgICAvL2JvcmRlci1ib3R0b206IDJweCBzb2xpZCAgI2ZmYTUzNTtcbiAgfVxuXG4gIC5mb3JtIHtcbiAgICB3aWR0aDogNzAlO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG5cbiAgaW9uLWJ1dHRvbiB7XG4gICAgLy9jb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gIH1cblxuICBpb24tbGlzdCB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgLmZ1bGwtaGVpZ2h0IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAucGFzc3dvcmQtaWNvbntcbiAgICAvL2NvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBmb250LXNpemU6MnJlbSAhaW1wb3J0YW50O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZSAhaW1wb3J0YW50O1xuICAgIHRvcDogNXB4ICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luOiAwIGF1dG8gIWltcG9ydGFudDtcbiAgfVxuXG4gIC5kZWZhdWx0LWF2YXRhciB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBtYXJnaW46IDE1JSBhdXRvIDE1JSBhdXRvO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICB9XG5cbiAgLnRpdGxlIHtcbiAgICAvL2NvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgZm9udC1zdHlsZTogYm9sZDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICAuY29tbWVudCB7XG4gICAgLy9jb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5mb3JtLWVycm9yIHtcbiAgICAvL2NvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgfVxuXG5cbiAgLmN1c3RvbS1iYWNrLWJ1dHRvbiB7XG4gICAgbWFyZ2luOiAxMCUgMCAyMCUgMDtcbiAgfVxuXG59XG5cblxuIiwiYXBwLXJlY292ZXIgaW9uLWNvbnRlbnQge1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgLyotLWJhY2tncm91bmQtc2l6ZTogY292ZXI7Ki9cbn1cbmFwcC1yZWNvdmVyIGlvbi1saXN0IHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgbWFyZ2luOiAwO1xufVxuYXBwLXJlY292ZXIgcCwgYXBwLXJlY292ZXIgbGkge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5hcHAtcmVjb3ZlciBoNCB7XG4gIG1hcmdpbi1ib3R0b206IDEwJTtcbn1cbmFwcC1yZWNvdmVyIGEge1xuICBjb2xvcjogIzQxYTZkZTtcbn1cbmFwcC1yZWNvdmVyIGlvbi1pdGVtIHtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAwLjllbTtcbn1cbmFwcC1yZWNvdmVyIGlvbi1zZWxlY3Qge1xuICBmb250LXNpemU6IDE3cHg7XG59XG5hcHAtcmVjb3ZlciAuZm9ybSB7XG4gIHdpZHRoOiA3MCU7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuYXBwLXJlY292ZXIgaW9uLWxpc3Qge1xuICBtYXJnaW46IDA7XG59XG5hcHAtcmVjb3ZlciAuZnVsbC1oZWlnaHQge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5hcHAtcmVjb3ZlciAucGFzc3dvcmQtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMnJlbSAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDtcbiAgdG9wOiA1cHggIWltcG9ydGFudDtcbiAgbWFyZ2luOiAwIGF1dG8gIWltcG9ydGFudDtcbn1cbmFwcC1yZWNvdmVyIC5kZWZhdWx0LWF2YXRhciB7XG4gIHdpZHRoOiA2MCU7XG4gIG1hcmdpbjogMTUlIGF1dG8gMTUlIGF1dG87XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbmFwcC1yZWNvdmVyIC50aXRsZSB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgZm9udC1zdHlsZTogYm9sZDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuYXBwLXJlY292ZXIgLmNvbW1lbnQge1xuICBmb250LXNpemU6IDE4cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmFwcC1yZWNvdmVyIC5jdXN0b20tYmFjay1idXR0b24ge1xuICBtYXJnaW46IDEwJSAwIDIwJSAwO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/user/recover/recover.page.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/user/recover/recover.page.ts ***!
  \****************************************************/
/*! exports provided: RecoverPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecoverPage", function() { return RecoverPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
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







var StatusBar = _capacitor_core__WEBPACK_IMPORTED_MODULE_6__["Plugins"].StatusBar;
var RecoverPage = /** @class */ (function () {
    function RecoverPage(router, route, formBuilder, platform, alertCtrl, menuCtrl, authService, userData) {
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.authService = authService;
        this.userData = userData;
        this.passwordType = 'password';
        this.passwordIcon = 'eye';
        this.passForm = this.formBuilder.group({
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)])],
            passwordConfirmation: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)])]
        }, { validator: this.matchingPasswords('password', 'passwordConfirmation') });
    }
    RecoverPage.prototype.ngOnInit = function () {
        this.menuCtrl.enable(false);
        if (this.platform.is('cordova')) {
            StatusBar.hide();
        }
        this.recoveryURL = this.route.snapshot.paramMap.get('url');
    };
    RecoverPage.prototype.hideShowPassword = function () {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
    };
    RecoverPage.prototype.recover = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, alert_1, alert_2, err_1, alert_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 8]);
                        data = {
                            loginDeviceType: this.platform.is('cordova') ? 'mobile' : 'browser',
                            password: this.passForm.get('passwordConfirmation').value,
                            recoveryURL: this.recoveryURL
                        };
                        console.log("recovery data", data);
                        return [4 /*yield*/, this.authService.recoverPassword(data)];
                    case 1:
                        result = _a.sent();
                        if (!(result.status === 'success')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                subHeader: result.message,
                                cssClass: 'level-15',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            alert_1.dismiss();
                                                            return [4 /*yield*/, this.userData.load()];
                                                        case 1:
                                                            _a.sent();
                                                            return [4 /*yield*/, this.userData.loadStoredCommunity()];
                                                        case 2:
                                                            _a.sent();
                                                            this.userData.refreshUserStatus({ type: 'setup device' });
                                                            this.menuCtrl.enable(true);
                                                            if (this.platform.is('cordova')) {
                                                                StatusBar.show();
                                                            }
                                                            this.router.navigateByUrl('/app/me');
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } }]
                            })];
                    case 2:
                        alert_1 = _a.sent();
                        alert_1.present();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(result.status === 'expired')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Expired',
                                subHeader: result.message,
                                cssClass: 'level-15',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            alert_2.dismiss();
                                            _this.menuCtrl.enable(true);
                                            _this.router.navigate(['/register', { slide: '0', exitType: 'slide' }]);
                                        } }]
                            })];
                    case 4:
                        alert_2 = _a.sent();
                        alert_2.present();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Something went wrong',
                                subHeader: 'We are not able to process your request. Please try again.',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            alert_3.dismiss();
                                        } }],
                                cssClass: 'level-15'
                            })];
                    case 7:
                        alert_3 = _a.sent();
                        alert_3.present();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    RecoverPage.prototype.matchingPasswords = function (passwordKey, confirmPasswordKey) {
        return function (group) {
            var password = group.controls[passwordKey];
            var confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    };
    RecoverPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"] }
    ]; };
    RecoverPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-recover',
            template: __importDefault(__webpack_require__(/*! raw-loader!./recover.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/recover/recover.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./recover.page.scss */ "./src/app/pages/user/recover/recover.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"]])
    ], RecoverPage);
    return RecoverPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-user-recover-recover-module.js.map