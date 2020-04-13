(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~billing-billing-module~manage-managecommunities-managecommunities-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/billing/billing.page.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/billing/billing.page.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{userData.user.churches[userData.currentCommunityIndex].name}}: Billing</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n  <ion-card>\n    <ion-card-header>\n      <ion-card-title>\n        Estimated Monthly Total\n      </ion-card-title>\n    </ion-card-header>\n    <ion-card-content *ngIf=\"resource\">\n      <h2 class=\"ion-text-center\">{{churchService.numberOfActiveUsers}} active users x {{resource['en-US'].matrix_string[1][1]}} (per user, per month) = ${{(churchService.numberOfActiveUsers*resource.matrix_number[1][0]).toFixed(2)}}</h2>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n      <ion-card-title>Payment Information</ion-card-title>\n    </ion-card-header>\n    <ion-card-content>\n      <div *ngFor=\"let source of sources\">\n        <ion-item>\n          <ion-label slot=\"start\">Card Type</ion-label>\n          <p slot=\"end\">{{source.brand}}</p>\n        </ion-item>\n        <ion-item>\n          <ion-label slot=\"start\">Last 4 Digits</ion-label>\n          <p slot=\"end\">{{source.last4}}</p>\n        </ion-item>\n        <ion-item>\n          <ion-label slot=\"start\">Expiration Date</ion-label>\n          <p slot=\"end\">{{source.exp_month}}/{{source.exp_year}}</p>\n        </ion-item>\n      </div>\n    </ion-card-content>\n    <ion-row *ngIf=\"!updatePayment\">\n      <ion-col>\n        <ion-button color=\"primary\" shape=\"round\" fill=\"solid\" expand=\"block\" (click)=\"updatePaymentMethod()\">Change Payment Information</ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n  <ion-card [hidden]=\"!updatePayment\">\n    <form [formGroup]=\"billingForm\">\n      <ion-card-header>\n        <ion-card-title>Update Payment Information</ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <div [id]=stripeElementName class=\"field\"></div>\n        <ion-item>\n          <ion-label position=\"stacked\">Name</ion-label>\n          <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"name\" placeholder=\"Jane Doe\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"stacked\">Email Address</ion-label>\n          <ion-input autocomplete=\"on\" type=\"email\" formControlName=\"email\" placeholder=\"jane@restvo.com\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"stacked\">Street</ion-label>\n          <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"line1\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"stacked\">City</ion-label>\n          <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"city\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"stacked\">State</ion-label>\n          <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"state\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"stacked\">Zip/Postal Code</ion-label>\n          <ion-input autocomplete=\"on\" type=\"text\" formControlName=\"postal_code\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"stacked\">Country</ion-label>\n          <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"country\">\n            <ion-select-option value=\"US\" [class.selected]='true'>United States</ion-select-option>\n            <ion-select-option value=\"AU\">Australia</ion-select-option>\n            <ion-select-option value=\"AT\">Austria</ion-select-option>\n            <ion-select-option value=\"BE\">Belgium</ion-select-option>\n            <ion-select-option value=\"BR\">Brazil</ion-select-option>\n            <ion-select-option value=\"CA\">Canada</ion-select-option>\n            <ion-select-option value=\"CN\">China</ion-select-option>\n            <ion-select-option value=\"DK\">Denmark</ion-select-option>\n            <ion-select-option value=\"FI\">Finland</ion-select-option>\n            <ion-select-option value=\"FR\">France</ion-select-option>\n            <ion-select-option value=\"DE\">Germany</ion-select-option>\n            <ion-select-option value=\"HK\">Hong Kong</ion-select-option>\n            <ion-select-option value=\"IE\">Ireland</ion-select-option>\n            <ion-select-option value=\"IT\">Italy</ion-select-option>\n            <ion-select-option value=\"JP\">Japan</ion-select-option>\n            <ion-select-option value=\"LU\">Luxembourg</ion-select-option>\n            <ion-select-option value=\"MX\">Mexico</ion-select-option>\n            <ion-select-option value=\"NL\">Netherlands</ion-select-option>\n            <ion-select-option value=\"NZ\">New Zealand</ion-select-option>\n            <ion-select-option value=\"NO\">Norway</ion-select-option>\n            <ion-select-option value=\"PT\">Portugal</ion-select-option>\n            <ion-select-option value=\"SG\">Singapore</ion-select-option>\n            <ion-select-option value=\"ES\">Spain</ion-select-option>\n            <ion-select-option value=\"SE\">Sweden</ion-select-option>\n            <ion-select-option value=\"CH\">Switzerland</ion-select-option>\n            <ion-select-option value=\"GB\">United Kingdom</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-card-content>\n    </form>\n    <ion-row>\n      <ion-col>\n        <ion-button color=\"primary\" shape=\"round\" fill=\"solid\" expand=\"block\" (click)=\"submitBillingMethod()\" [disabled]=\"!billingForm.valid\">Update</ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n  <ion-card>\n    <ion-card-header>\n      <ion-card-title>Billing History</ion-card-title>\n    </ion-card-header>\n    <ion-card-content>\n      <table>\n        <thead>\n        <tr>\n          <th>Invoice Number</th>\n          <th>Plan</th>\n          <th>Total &nbsp;</th>\n          <th>Due &nbsp;</th>\n          <th>Created</th>\n        </tr>\n        <tr>\n          <td>&nbsp;</td>\n        </tr>\n        </thead>\n        <tbody *ngIf=\"invoices.length\">\n        <tr *ngFor=\"let invoice of invoices\">\n          <td>\n            <p>{{invoice.number}} &nbsp;&nbsp;</p>\n          </td>\n          <td>\n            <p>{{invoice.lines.data[0].description}} &nbsp;</p>\n          </td>\n          <td>\n            <p>${{invoice.total/100}} {{invoice.currency.toUpperCase()}} &nbsp;</p>\n          </td>\n          <td>\n            <p>${{invoice.amount_due/100}} {{invoice.currency.toUpperCase()}} &nbsp;</p>\n          </td>\n          <td>\n            <p>{{invoice.created*1000 | datetime: 'm:l,d:n,y:n'}}</p>\n          </td>\n        </tr>\n        </tbody>\n      </table>\n    </ion-card-content>\n    <ion-row *ngIf=\"invoices.length\">\n      <ion-col>\n        <ion-button color=\"primary\" shape=\"round\" fill=\"solid\" expand=\"block\" (click)=\"listInvoices('next')\">Show More</ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/manage/billing/billing.module.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/manage/billing/billing.module.ts ***!
  \********************************************************/
/*! exports provided: BillingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingPageModule", function() { return BillingPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _billing_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./billing.page */ "./src/app/pages/manage/billing/billing.page.ts");
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
        component: _billing_page__WEBPACK_IMPORTED_MODULE_5__["BillingPage"]
    }
];
var BillingPageModule = /** @class */ (function () {
    function BillingPageModule() {
    }
    BillingPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_billing_page__WEBPACK_IMPORTED_MODULE_5__["BillingPage"]]
        })
    ], BillingPageModule);
    return BillingPageModule;
}());



/***/ }),

/***/ "./src/app/pages/manage/billing/billing.page.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/manage/billing/billing.page.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-billing ion-spinner {\n  position: absolute;\n  margin: 48%;\n}\napp-billing .field {\n  flex: 1;\n  padding: 5% 15px;\n  background: transparent;\n  font-weight: 400;\n  color: #31325f;\n  outline: none;\n  cursor: text;\n}\napp-billing table {\n  display: table;\n  overflow-x: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL21hbmFnZS9iaWxsaW5nL2JpbGxpbmcucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9tYW5hZ2UvYmlsbGluZy9iaWxsaW5nLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtBQ0RKO0FESUU7RUFDRSxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FDRko7QURLRTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtBQ0hKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbWFuYWdlL2JpbGxpbmcvYmlsbGluZy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtYmlsbGluZyB7XG5cbiAgaW9uLXNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW46IDQ4JTtcbiAgfVxuXG4gIC5maWVsZCB7XG4gICAgZmxleDogMTtcbiAgICBwYWRkaW5nOiA1JSAxNXB4O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgY29sb3I6ICMzMTMyNWY7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBjdXJzb3I6IHRleHQ7XG4gIH1cblxuICB0YWJsZSB7XG4gICAgZGlzcGxheTogdGFibGU7XG4gICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICB9XG59IiwiYXBwLWJpbGxpbmcgaW9uLXNwaW5uZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG1hcmdpbjogNDglO1xufVxuYXBwLWJpbGxpbmcgLmZpZWxkIHtcbiAgZmxleDogMTtcbiAgcGFkZGluZzogNSUgMTVweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGNvbG9yOiAjMzEzMjVmO1xuICBvdXRsaW5lOiBub25lO1xuICBjdXJzb3I6IHRleHQ7XG59XG5hcHAtYmlsbGluZyB0YWJsZSB7XG4gIGRpc3BsYXk6IHRhYmxlO1xuICBvdmVyZmxvdy14OiBzY3JvbGw7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/manage/billing/billing.page.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/manage/billing/billing.page.ts ***!
  \******************************************************/
/*! exports provided: BillingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingPage", function() { return BillingPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-stripe */ "./node_modules/ngx-stripe/fesm5/ngx-stripe.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_payment_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/payment.service */ "./src/app/services/payment.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
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










var BillingPage = /** @class */ (function () {
    function BillingPage(cache, router, platform, stripeService, formBuilder, modalCtrl, alertCtrl, resourceService, paymentService, churchService, userData) {
        var _this = this;
        this.cache = cache;
        this.router = router;
        this.platform = platform;
        this.stripeService = stripeService;
        this.formBuilder = formBuilder;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.resourceService = resourceService;
        this.paymentService = paymentService;
        this.churchService = churchService;
        this.userData = userData;
        // optional parameters
        this.elementsOptions = {
            locale: 'en'
        };
        this.refreshNeeded = false;
        this.invoices = [];
        this.endOfInvoices = false;
        this.stripeElementName = 'card-element-billing';
        this.updatePayment = false;
        this.ionSpinner = false;
        this.subscriptions = {};
        this.refreshHandler = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data && data.type === 'load community ready') {
                    this.updatePayment = false;
                    this.invoices = [];
                    this.preparePage();
                }
                return [2 /*return*/];
            });
        }); };
    }
    BillingPage.prototype.ngOnInit = function () {
        var _this = this;
        this.billingForm = this.formBuilder.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            line1: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            line2: [''],
            city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            state: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            postal_code: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            country: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
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
        this.invoices = [];
        this.preparePage();
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    };
    BillingPage.prototype.ionViewDidEnter = function () {
        this.stripeElementName = 'card-element-billing' + (this.modalPage ? '-modal' : '');
    };
    BillingPage.prototype.preparePage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.churchService.currentManagedCommunity) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.paymentService.loadCustomer(this.userData.user.churches[this.userData.currentCommunityIndex]._id)];
                    case 1:
                        _a.stripeCustomer = _c.sent();
                        _b = this.churchService;
                        return [4 /*yield*/, this.churchService.getAppUserUsage(this.churchService.currentManagedCommunity._id)];
                    case 2:
                        _b.numberOfActiveUsers = _c.sent();
                        if (this.stripeCustomer) {
                            this.loadBillingInfo();
                            this.listInvoices(null);
                        }
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BillingPage.prototype.prepareBillingElement = function () {
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
    BillingPage.prototype.loadBillingInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.paymentService.loadBillingInfo(this.churchService.currentManagedCommunity._id)];
                    case 1:
                        _a.sources = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BillingPage.prototype.updatePaymentMethod = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.platform.is('cordova')) return [3 /*break*/, 1];
                        this.updatePayment = true;
                        this.prepareBillingElement();
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Opening the In-App Browser',
                            subHeader: 'To update the billing information, you will be redirected to app.restvo.com.',
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
                    case 2:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillingPage.prototype.submitBillingMethod = function () {
        return __awaiter(this, void 0, void 0, function () {
            var owner, err_1, alert_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 4]);
                        this.ionSpinner = true;
                        owner = this.billingForm.value;
                        owner.address = { line1: owner.line1, line2: owner.line2, city: owner.city, state: owner.state, postal_code: owner.postal_code, country: owner.country };
                        delete owner.line1;
                        delete owner.line2;
                        delete owner.city;
                        delete owner.state;
                        delete owner.postal_code;
                        delete owner.country;
                        this.stripeService.createSource(this.card, {
                            type: 'card',
                            currency: 'usd',
                            owner: owner,
                        }).subscribe(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var updateResult, alert_3, alert_4, alert_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!result.source) return [3 /*break*/, 8];
                                        return [4 /*yield*/, this.paymentService.updateBillingMethod(this.churchService.currentManagedCommunity._id, result.source)];
                                    case 1:
                                        updateResult = _a.sent();
                                        this.ionSpinner = false;
                                        if (!(updateResult === 'success')) return [3 /*break*/, 4];
                                        this.loadBillingInfo();
                                        this.card.clear();
                                        this.billingForm.reset();
                                        return [4 /*yield*/, this.alertCtrl.create({
                                                header: 'Success',
                                                subHeader: 'Your payment method is updated.',
                                                buttons: [{ text: 'Ok' }],
                                                cssClass: 'level-15'
                                            })];
                                    case 2:
                                        alert_3 = _a.sent();
                                        return [4 /*yield*/, alert_3.present()];
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
                                        alert_4 = _a.sent();
                                        return [4 /*yield*/, alert_4.present()];
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
                                        alert_5 = _a.sent();
                                        return [4 /*yield*/, alert_5.present()];
                                    case 10:
                                        _a.sent();
                                        _a.label = 11;
                                    case 11: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 1:
                        err_1 = _a.sent();
                        this.ionSpinner = false;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Something Went Wrong',
                                subHeader: 'We cannot process your request at this time. Please try again later.',
                                buttons: [{ text: 'Ok' }],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BillingPage.prototype.listInvoices = function (direction) {
        return __awaiter(this, void 0, void 0, function () {
            var query, invoices;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = '';
                        if (direction === 'previous') {
                            query += "?ending_before=" + this.invoices[0].id;
                        }
                        if (direction === 'next') {
                            query += "?starting_after=" + this.invoices[this.invoices.length - 1].id;
                        }
                        return [4 /*yield*/, this.paymentService.listInvoices(this.churchService.currentManagedCommunity._id, query)];
                    case 1:
                        invoices = _a.sent();
                        invoices.forEach(function (invoice) {
                            _this.invoices.push(invoice);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BillingPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    BillingPage.prototype.ngOnDestroy = function () {
        /*if (this.card) {
            this.card.unmount();
        }*/
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    };
    BillingPage.ctorParameters = function () { return [
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_9__["CacheService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
        { type: ngx_stripe__WEBPACK_IMPORTED_MODULE_1__["StripeService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"] },
        { type: _services_payment_service__WEBPACK_IMPORTED_MODULE_5__["PaymentService"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], BillingPage.prototype, "modalPage", void 0);
    BillingPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-billing',
            template: __importDefault(__webpack_require__(/*! raw-loader!./billing.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/billing/billing.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./billing.page.scss */ "./src/app/pages/manage/billing/billing.page.scss")).default]
        }),
        __metadata("design:paramtypes", [ionic_cache__WEBPACK_IMPORTED_MODULE_9__["CacheService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            ngx_stripe__WEBPACK_IMPORTED_MODULE_1__["StripeService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"],
            _services_payment_service__WEBPACK_IMPORTED_MODULE_5__["PaymentService"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"]])
    ], BillingPage);
    return BillingPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~billing-billing-module~manage-managecommunities-managecommunities-module.js.map