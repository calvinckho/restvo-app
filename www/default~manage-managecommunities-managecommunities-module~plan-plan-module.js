(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~manage-managecommunities-managecommunities-module~plan-plan-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/plan/plan.page.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/plan/plan.page.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{userData.user.churches[userData.currentCommunityIndex].name}}: Plan</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n  <ion-slides (ionSlidesDidLoad)=\"onSlidesLoaded()\">\n    <ion-slide>\n      <ion-grid *ngIf=\"resource\">\n        <ion-row>\n          <ion-col size-xs=\"12\" size-sm=\"12\" size-md=\"12\" size-lg=\"6\">\n            <ion-card class=\"ion-text-center\">\n              <ion-card-header>\n                <ion-card-title>{{resource['en-US'].matrix_string[0][0]}}</ion-card-title>\n                <img src=\"\"/>\n              </ion-card-header>\n              <ion-card-header>\n                <ion-card-title>{{resource['en-US'].matrix_string[0][1]}}</ion-card-title>\n                <ion-card-subtitle>{{resource['en-US'].matrix_string[0][2]}}</ion-card-subtitle>\n              </ion-card-header>\n              <ion-card-content>\n                <ion-list class=\"ion-text-center\">\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[0][11]}}\n                  </ion-item>\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[0][12]}}\n                  </ion-item>\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[0][13]}}\n                  </ion-item>\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[0][14]}}\n                  </ion-item>\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[0][15]}}\n                  </ion-item>\n                </ion-list>\n              </ion-card-content>\n              <ion-col *ngIf=\"churchService.currentManagedCommunity && (!churchService.currentManagedCommunity.hasOwnProperty('subscription') || churchService.currentManagedCommunity.subscription === 'Free')\">\n                <ion-button color=\"primary\" fill=\"solid\" shape=\"round\" [disabled]=\"true\">Current Plan</ion-button>\n              </ion-col>\n              <ion-col *ngIf=\"churchService.currentManagedCommunity && churchService.currentManagedCommunity.hasOwnProperty('subscription') && churchService.currentManagedCommunity.subscription !== 'Free'\">\n                <ion-button color=\"primary\" fill=\"solid\" shape=\"round\" (click)=\"selectPlan('Free')\">Downgrade Plan</ion-button>\n              </ion-col>\n            </ion-card>\n          </ion-col>\n          <ion-col size-xs=\"12\" size-sm=\"12\" size-md=\"12\" size-lg=\"6\">\n            <ion-card class=\"ion-text-center\">\n              <ion-card-header>\n                <ion-card-title>{{resource['en-US'].matrix_string[1][0]}}</ion-card-title>\n                <img src=\"\"/>\n              </ion-card-header>\n              <ion-card-header>\n                <ion-card-title>{{resource['en-US'].matrix_string[1][1]}}</ion-card-title>\n                <ion-card-subtitle>{{resource['en-US'].matrix_string[1][2]}}</ion-card-subtitle>\n              </ion-card-header>\n              <ion-card-content>\n                <ion-list class=\"ion-text-center\">\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[1][11]}}\n                  </ion-item>\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[1][12]}}\n                  </ion-item>\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[1][13]}}\n                  </ion-item>\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[1][14]}}\n                  </ion-item>\n                  <ion-item>\n                    {{resource['en-US'].matrix_string[1][15]}}\n                  </ion-item>\n                </ion-list>\n              </ion-card-content>\n              <ion-col *ngIf=\"churchService.currentManagedCommunity && churchService.currentManagedCommunity.hasOwnProperty('subscription') && churchService.currentManagedCommunity.subscription === resource['en-US'].matrix_string[1][0]\">\n                <ion-button color=\"primary\" fill=\"solid\" shape=\"round\" [disabled]=\"true\">Current Plan</ion-button>\n              </ion-col>\n              <ion-col *ngIf=\"churchService.currentManagedCommunity && (!churchService.currentManagedCommunity.hasOwnProperty('subscription') || churchService.currentManagedCommunity.subscription !== resource['en-US'].matrix_string[1][0])\">\n                <ion-button color=\"primary\" fill=\"solid\" shape=\"round\" (click)=\"selectPlan(resource['en-US'].matrix_string[1][0])\">Upgrade Plan</ion-button>\n              </ion-col>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-slide>\n    <ion-slide>\n      <ion-grid *ngIf=\"resource\">\n        <ion-row>\n          <ion-col>\n            <ion-label class=\"text-start\">You are switching to the Standard Plan</ion-label>\n            <ion-card>\n                <ion-card-title>Billing Amount</ion-card-title>\n              <ion-card-content>\n                <h2 class=\"ion-text-center\">{{churchService.numberOfActiveUsers}} active users x {{resource['en-US'].matrix_string[1][1]}} (per user, per month) = ${{(churchService.numberOfActiveUsers*resource.matrix_number[1][0]).toFixed(2)}}</h2>\n              </ion-card-content>\n            </ion-card>\n            <ion-card>\n                <ion-card-title>Billing Information</ion-card-title>\n              <ion-card-content>\n                <form [formGroup]=\"billingForm\">\n                  <div [id]=stripeElementName class=\"field\"></div>\n                  <ion-item>\n                    <ion-label position=\"stacked\">Name</ion-label>\n                    <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"name\" placeholder=\"Jane Doe\"></ion-input>\n                  </ion-item>\n                  <ion-item>\n                    <ion-label position=\"stacked\">Email Address</ion-label>\n                    <ion-input autocomplete=\"on\" type=\"email\" formControlName=\"email\" placeholder=\"jane@restvo.com\"></ion-input>\n                  </ion-item>\n                  <ion-item>\n                    <ion-label position=\"stacked\">Street</ion-label>\n                    <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"line1\"></ion-input>\n                  </ion-item>\n                  <ion-item>\n                    <ion-label position=\"stacked\">City</ion-label>\n                    <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"city\"></ion-input>\n                  </ion-item>\n                  <ion-item>\n                    <ion-label position=\"stacked\">State</ion-label>\n                    <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"state\"></ion-input>\n                  </ion-item>\n                  <ion-item>\n                    <ion-label position=\"stacked\">Zip/Postal Code</ion-label>\n                    <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"postal_code\"></ion-input>\n                  </ion-item>\n                  <ion-item>\n                    <ion-label position=\"stacked\">Country</ion-label>\n                    <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"country\">\n                      <ion-select-option value=\"US\" [class.selected]='true'>United States</ion-select-option>\n                      <ion-select-option value=\"AU\">Australia</ion-select-option>\n                      <ion-select-option value=\"AT\">Austria</ion-select-option>\n                      <ion-select-option value=\"BE\">Belgium</ion-select-option>\n                      <ion-select-option value=\"BR\">Brazil</ion-select-option>\n                      <ion-select-option value=\"CA\">Canada</ion-select-option>\n                      <ion-select-option value=\"CN\">China</ion-select-option>\n                      <ion-select-option value=\"DK\">Denmark</ion-select-option>\n                      <ion-select-option value=\"FI\">Finland</ion-select-option>\n                      <ion-select-option value=\"FR\">France</ion-select-option>\n                      <ion-select-option value=\"DE\">Germany</ion-select-option>\n                      <ion-select-option value=\"HK\">Hong Kong</ion-select-option>\n                      <ion-select-option value=\"IE\">Ireland</ion-select-option>\n                      <ion-select-option value=\"IT\">Italy</ion-select-option>\n                      <ion-select-option value=\"JP\">Japan</ion-select-option>\n                      <ion-select-option value=\"LU\">Luxembourg</ion-select-option>\n                      <ion-select-option value=\"MX\">Mexico</ion-select-option>\n                      <ion-select-option value=\"NL\">Netherlands</ion-select-option>\n                      <ion-select-option value=\"NZ\">New Zealand</ion-select-option>\n                      <ion-select-option value=\"NO\">Norway</ion-select-option>\n                      <ion-select-option value=\"PT\">Portugal</ion-select-option>\n                      <ion-select-option value=\"SG\">Singapore</ion-select-option>\n                      <ion-select-option value=\"ES\">Spain</ion-select-option>\n                      <ion-select-option value=\"SE\">Sweden</ion-select-option>\n                      <ion-select-option value=\"CH\">Switzerland</ion-select-option>\n                      <ion-select-option value=\"GB\">United Kingdom</ion-select-option>\n                    </ion-select>\n                  </ion-item>\n                </form>\n                <ion-row>\n                  <ion-col>\n                    <ion-button color=\"primary\" shape=\"round\" fill=\"solid\" expand=\"block\" (click)=\"submitBillingForm()\">Submit</ion-button>\n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col>\n                    <ion-button color=\"danger\" shape=\"round\" fill=\"solid\" expand=\"block\" (click)=\"prevSlide()\">Cancel</ion-button>\n                  </ion-col>\n                </ion-row>\n              </ion-card-content>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/manage/plan/plan.module.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/manage/plan/plan.module.ts ***!
  \**************************************************/
/*! exports provided: PlanPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanPageModule", function() { return PlanPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _plan_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plan.page */ "./src/app/pages/manage/plan/plan.page.ts");
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
        component: _plan_page__WEBPACK_IMPORTED_MODULE_5__["PlanPage"]
    }
];
var PlanPageModule = /** @class */ (function () {
    function PlanPageModule() {
    }
    PlanPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_plan_page__WEBPACK_IMPORTED_MODULE_5__["PlanPage"]]
        })
    ], PlanPageModule);
    return PlanPageModule;
}());



/***/ }),

/***/ "./src/app/pages/manage/plan/plan.page.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/manage/plan/plan.page.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-plan ion-spinner {\n  position: absolute;\n  margin: 48%;\n}\napp-plan ion-card {\n  margin: 5% 10% 5% 10%;\n  padding: 5% 0 8%;\n}\napp-plan ion-item {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\napp-plan ion-slides {\n  width: 100%;\n}\napp-plan ion-grid {\n  width: 100%;\n}\napp-plan ion-slide {\n  width: 100%;\n}\napp-plan .field {\n  flex: 1;\n  padding: 0 15px;\n  background: transparent;\n  font-weight: 400;\n  color: #31325f;\n  outline: none;\n  cursor: text;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL21hbmFnZS9wbGFuL3BsYW4ucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9tYW5hZ2UvcGxhbi9wbGFuLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtBQ0RKO0FESUU7RUFDRSxxQkFBQTtFQUNBLGdCQUFBO0FDRko7QURLRTtFQUNFLGlCQUFBO0VBQ0Esb0JBQUE7QUNISjtBRE1FO0VBQ0UsV0FBQTtBQ0pKO0FET0U7RUFDRSxXQUFBO0FDTEo7QURRRTtFQUNFLFdBQUE7QUNOSjtBRFNFO0VBQ0UsT0FBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FDUEoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9tYW5hZ2UvcGxhbi9wbGFuLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1wbGFuIHtcblxuICBpb24tc3Bpbm5lciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogNDglO1xuICB9XG5cbiAgaW9uLWNhcmQge1xuICAgIG1hcmdpbjogNSUgMTAlIDUlIDEwJTtcbiAgICBwYWRkaW5nOiA1JSAwIDglO1xuICB9XG5cbiAgaW9uLWl0ZW0ge1xuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICB9XG5cbiAgaW9uLXNsaWRlcyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICBpb24tZ3JpZCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICBpb24tc2xpZGUge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmZpZWxkIHtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmc6IDAgMTVweDtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICAgIGNvbG9yOiAjMzEzMjVmO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgY3Vyc29yOiB0ZXh0O1xuICB9XG59IiwiYXBwLXBsYW4gaW9uLXNwaW5uZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG1hcmdpbjogNDglO1xufVxuYXBwLXBsYW4gaW9uLWNhcmQge1xuICBtYXJnaW46IDUlIDEwJSA1JSAxMCU7XG4gIHBhZGRpbmc6IDUlIDAgOCU7XG59XG5hcHAtcGxhbiBpb24taXRlbSB7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cbmFwcC1wbGFuIGlvbi1zbGlkZXMge1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1wbGFuIGlvbi1ncmlkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtcGxhbiBpb24tc2xpZGUge1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1wbGFuIC5maWVsZCB7XG4gIGZsZXg6IDE7XG4gIHBhZGRpbmc6IDAgMTVweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGNvbG9yOiAjMzEzMjVmO1xuICBvdXRsaW5lOiBub25lO1xuICBjdXJzb3I6IHRleHQ7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/manage/plan/plan.page.ts":
/*!************************************************!*\
  !*** ./src/app/pages/manage/plan/plan.page.ts ***!
  \************************************************/
/*! exports provided: PlanPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanPage", function() { return PlanPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var ngx_stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-stripe */ "./node_modules/ngx-stripe/fesm5/ngx-stripe.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_payment_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/payment.service */ "./src/app/services/payment.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
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










var PlanPage = /** @class */ (function () {
    function PlanPage(cache, platform, router, formBuilder, stripeService, modalCtrl, alertCtrl, userData, churchService, paymentService, resourceService) {
        var _this = this;
        this.cache = cache;
        this.platform = platform;
        this.router = router;
        this.formBuilder = formBuilder;
        this.stripeService = stripeService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.userData = userData;
        this.churchService = churchService;
        this.paymentService = paymentService;
        this.resourceService = resourceService;
        // optional parameters
        this.elementsOptions = {
            locale: 'en'
        };
        this.refreshNeeded = false;
        this.stripeElementName = 'card-element-plan';
        this.ionSpinner = false;
        this.subscriptions = {};
        this.refreshHandler = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(data && data.type === 'load community ready')) return [3 /*break*/, 2];
                        this.prevSlide();
                        _a = this.churchService;
                        return [4 /*yield*/, this.churchService.getAppUserUsage(this.churchService.currentManagedCommunity._id)];
                    case 1:
                        _a.numberOfActiveUsers = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
    }
    PlanPage.prototype.ngOnInit = function () {
        var _this = this;
        this.billingForm = this.formBuilder.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            line1: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            line2: [''],
            city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            state: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            postal_code: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
            country: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]],
        });
        var loadResource = this.resourceService.load('en-US', "Restvo Plans");
        var resource = this.cache.loadFromDelayedObservable('loadResource: Restvo Plans', loadResource, 'resource', 3600, 'none');
        resource.subscribe(function (result) {
            _this.resource = result[0];
        }, function (err) { return __awaiter(_this, void 0, void 0, function () {
            var networkAlert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'No Internet Connection',
                            message: 'Please check your internet connection.',
                            buttons: ['Dismiss'],
                            cssClass: 'level-15'
                        })];
                    case 1: return [4 /*yield*/, _a.sent()];
                    case 2:
                        networkAlert = _a.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    };
    PlanPage.prototype.onSlidesLoaded = function () {
        this.slides.lockSwipes(true);
    };
    PlanPage.prototype.ionViewDidEnter = function () {
        this.stripeElementName = 'card-element-plan' + (this.modalPage ? '-modal' : '');
    };
    PlanPage.prototype.prevSlide = function () {
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.content.scrollToTop();
        this.slides.lockSwipes(true);
    };
    PlanPage.prototype.nextSlide = function () {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.content.scrollToTop();
        this.slides.lockSwipes(true);
    };
    PlanPage.prototype.prepareBillingElement = function () {
        var _this = this;
        this.stripeService.elements(this.elementsOptions)
            .subscribe(function (elements) {
            _this.elements = elements;
            // Only mount the element the first time
            if (!_this.card) {
                _this.card = _this.elements.create('card', {
                    style: {
                        base: {
                            iconColor: '#666EE8',
                            color: '#31325F',
                            fontWeight: 300,
                            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                            fontSize: '18px',
                            '::placeholder': {
                                color: '#CFD7E0'
                            }
                        }
                    }
                });
                _this.card.mount('#' + _this.stripeElementName);
            }
            else {
                _this.card.mount('#' + _this.stripeElementName);
            }
        });
    };
    PlanPage.prototype.selectPlan = function (plan) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, alert_1, alert_2, err_1, alert_3;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, , 15]);
                        if (!(plan === this.resource['en-US'].matrix_string[1][0] && !this.churchService.currentManagedCommunity.subscriptionId)) return [3 /*break*/, 6];
                        _a = this.churchService;
                        return [4 /*yield*/, this.churchService.getAppUserUsage(this.churchService.currentManagedCommunity._id)];
                    case 1:
                        _a.numberOfActiveUsers = _b.sent();
                        if (!!this.platform.is('cordova')) return [3 /*break*/, 2];
                        this.nextSlide();
                        this.prepareBillingElement();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Opening the In-App Browser',
                            subHeader: 'To upgrade your plan, you will be redirected to app.restvo.com.',
                            buttons: [{ text: 'Ok',
                                    handler: function () {
                                        var navTransition = alert_1.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                window.open('https://app.restvo.com/register', "_blank");
                                                return [2 /*return*/];
                                            });
                                        }); });
                                    } },
                                { text: 'Cancel' }],
                            cssClass: 'level-15'
                        })];
                    case 3:
                        alert_1 = _b.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 11];
                    case 6:
                        if (!(plan === this.resource['en-US'].matrix_string[1][0] && this.churchService.currentManagedCommunity.subscriptionId)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.paymentService.subscribe(this.churchService.currentManagedCommunity._id, this.resource['en-US'].matrix_string[1][0], null, null)];
                    case 7:
                        _b.sent();
                        this.userData.refreshUserStatus({ type: 'change aux data' });
                        return [3 /*break*/, 11];
                    case 8: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Cancel ' + this.resource['en-US'].matrix_string[1][0] + ' Plan',
                            subHeader: 'Are you sure you want to cancel your subscription to the ' + this.resource['en-US'].matrix_string[1][0] + ' Plan?',
                            buttons: [{ text: 'Ok',
                                    handler: function () {
                                        var navTransition = alert_2.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.paymentService.subscribe(this.churchService.currentManagedCommunity._id, 'Free', null, null)];
                                                    case 1:
                                                        _a.sent();
                                                        this.userData.refreshUserStatus({ type: 'change aux data' });
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    } },
                                { text: 'Cancel' }],
                            cssClass: 'level-15'
                        })];
                    case 9:
                        alert_2 = _b.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [3 /*break*/, 15];
                    case 12:
                        err_1 = _b.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Something Went Wrong',
                                subHeader: 'We cannot process your request at this time. Please try again later.',
                                buttons: [{ text: 'Ok' }],
                                cssClass: 'level-15'
                            })];
                    case 13:
                        alert_3 = _b.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    PlanPage.prototype.submitBillingForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var owner_1, err_2, alert_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 4]);
                        this.ionSpinner = true;
                        owner_1 = this.billingForm.value;
                        owner_1.address = { line1: owner_1.line1, line2: owner_1.line2, city: owner_1.city, state: owner_1.state, postal_code: owner_1.postal_code, country: owner_1.country };
                        delete owner_1.line1;
                        delete owner_1.line2;
                        delete owner_1.city;
                        delete owner_1.state;
                        delete owner_1.postal_code;
                        delete owner_1.country;
                        this.stripeService.createSource(this.card, {
                            type: 'card',
                            currency: 'usd',
                            owner: owner_1,
                        }).subscribe(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var updateResult, alert_5, alert_6, alert_7;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!result.source) return [3 /*break*/, 8];
                                        return [4 /*yield*/, this.paymentService.subscribe(this.churchService.currentManagedCommunity._id, this.resource['en-US'].matrix_string[1][0], owner_1, result.source)];
                                    case 1:
                                        updateResult = _a.sent();
                                        this.ionSpinner = false;
                                        if (!(updateResult === 'success')) return [3 /*break*/, 4];
                                        this.userData.refreshUserStatus({ type: 'change aux data' });
                                        return [4 /*yield*/, this.alertCtrl.create({
                                                header: 'Success',
                                                subHeader: this.churchService.currentManagedCommunity.name + ' is now upgraded to the ' + this.resource['en-US'].matrix_string[1][0] + ' Plan.',
                                                buttons: [{
                                                        text: 'Ok',
                                                        handler: function () {
                                                            var navTransition = alert_5.dismiss();
                                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    this.card.clear();
                                                                    this.billingForm.reset();
                                                                    this.prevSlide();
                                                                    return [2 /*return*/];
                                                                });
                                                            }); });
                                                        }
                                                    }],
                                                cssClass: 'level-15'
                                            })];
                                    case 2:
                                        alert_5 = _a.sent();
                                        return [4 /*yield*/, alert_5.present()];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 7];
                                    case 4: return [4 /*yield*/, this.alertCtrl.create({
                                            header: 'Something Went Wrong',
                                            subHeader: 'We cannot process your request at this time. Please try again later.',
                                            buttons: [{ text: 'Ok' }],
                                            cssClass: 'level-15'
                                        })];
                                    case 5:
                                        alert_6 = _a.sent();
                                        return [4 /*yield*/, alert_6.present()];
                                    case 6:
                                        _a.sent();
                                        _a.label = 7;
                                    case 7: return [3 /*break*/, 11];
                                    case 8:
                                        if (!result.error) return [3 /*break*/, 11];
                                        this.ionSpinner = false;
                                        // Error creating the source
                                        console.log(result.error.message);
                                        return [4 /*yield*/, this.alertCtrl.create({
                                                header: 'Something Went Wrong',
                                                subHeader: 'We cannot process your request at this time.',
                                                message: result.error.message,
                                                buttons: [{ text: 'Ok' }],
                                                cssClass: 'level-15'
                                            })];
                                    case 9:
                                        alert_7 = _a.sent();
                                        return [4 /*yield*/, alert_7.present()];
                                    case 10:
                                        _a.sent();
                                        _a.label = 11;
                                    case 11: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 1:
                        err_2 = _a.sent();
                        this.ionSpinner = false;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Something Went Wrong',
                                subHeader: 'We cannot process your request at this time. Please try again later.',
                                buttons: [{ text: 'Ok' }],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        alert_4 = _a.sent();
                        return [4 /*yield*/, alert_4.present()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlanPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    PlanPage.prototype.ngOnDestroy = function () {
        //this.card.unmount();
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    };
    PlanPage.ctorParameters = function () { return [
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: ngx_stripe__WEBPACK_IMPORTED_MODULE_2__["StripeService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"] },
        { type: _services_payment_service__WEBPACK_IMPORTED_MODULE_7__["PaymentService"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"])
    ], PlanPage.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonSlides"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonSlides"])
    ], PlanPage.prototype, "slides", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PlanPage.prototype, "modalPage", void 0);
    PlanPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-plan',
            template: __importDefault(__webpack_require__(/*! raw-loader!./plan.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/plan/plan.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./plan.page.scss */ "./src/app/pages/manage/plan/plan.page.scss")).default]
        }),
        __metadata("design:paramtypes", [ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            ngx_stripe__WEBPACK_IMPORTED_MODULE_2__["StripeService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"],
            _services_payment_service__WEBPACK_IMPORTED_MODULE_7__["PaymentService"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"]])
    ], PlanPage);
    return PlanPage;
}());



/***/ }),

/***/ "./src/app/services/payment.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/payment.service.ts ***!
  \*********************************************/
/*! exports provided: PaymentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentService", function() { return PaymentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_timeout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/timeout */ "./node_modules/rxjs-compat/_esm5/add/operator/timeout.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/toPromise */ "./node_modules/rxjs-compat/_esm5/add/operator/toPromise.js");
/* harmony import */ var rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_toPromise__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _network_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./network-service.service */ "./src/app/services/network-service.service.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








var PaymentService = /** @class */ (function () {
    function PaymentService(http, authService, networkService, userData) {
        this.http = http;
        this.authService = authService;
        this.networkService = networkService;
        this.userData = userData;
    }
    PaymentService.prototype.loadCustomer = function (churchId) {
        return this.http.get(this.networkService.domain + '/api/payment/loadcustomer/' + churchId, this.authService.httpAuthOptions).toPromise();
    };
    PaymentService.prototype.loadBillingInfo = function (churchId) {
        return this.http.get(this.networkService.domain + '/api/payment/loadbilling/' + churchId, this.authService.httpAuthOptions).toPromise();
    };
    PaymentService.prototype.listInvoices = function (churchId, query) {
        return this.http.get(this.networkService.domain + '/api/payment/listinvoices/' + churchId + query, this.authService.httpAuthOptions).toPromise();
    };
    PaymentService.prototype.subscribe = function (churchId, plan, owner, source) {
        return this.http.post(this.networkService.domain + '/api/payment/subscribe/' + churchId, JSON.stringify({ plan: plan, owner: owner, source: source }), this.authService.httpAuthOptions).toPromise();
    };
    PaymentService.prototype.updateBillingMethod = function (churchId, source) {
        return this.http.post(this.networkService.domain + '/api/payment/updatebilling/' + churchId, JSON.stringify({ source: source }), this.authService.httpAuthOptions).toPromise();
    };
    PaymentService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_6__["Auth"] },
        { type: _network_service_service__WEBPACK_IMPORTED_MODULE_5__["NetworkService"] },
        { type: _user_service__WEBPACK_IMPORTED_MODULE_7__["UserData"] }
    ]; };
    PaymentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _auth_service__WEBPACK_IMPORTED_MODULE_6__["Auth"],
            _network_service_service__WEBPACK_IMPORTED_MODULE_5__["NetworkService"],
            _user_service__WEBPACK_IMPORTED_MODULE_7__["UserData"]])
    ], PaymentService);
    return PaymentService;
}());



/***/ })

}]);
//# sourceMappingURL=default~manage-managecommunities-managecommunities-module~plan-plan-module.js.map