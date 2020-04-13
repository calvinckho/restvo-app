(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~analytics-analytics-module~manage-managecommunities-managecommunities-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/analytics/analytics.page.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/analytics/analytics.page.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{userData.user.churches[userData.currentCommunityIndex].name}}: Insight</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <ion-grid>\n    <ion-row>\n      <ion-col size-xs=\"12\" size-sm=\"6\" size-md=\"6\" size-lg=\"6\" size-xl=\"4\">\n        <ion-card *ngIf=\"churchService && churchService.numberOfActiveUsers\">\n          <ion-card-header>\n            <ion-card-title>\n              Active Users\n            </ion-card-title>\n            <ion-note class=\"padding-start\">\n              (last month)\n            </ion-note>\n          </ion-card-header>\n          <ion-card-content>\n            <h1 class=\"ion-text-center\">{{churchService.numberOfActiveUsers}}</h1>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col size-xs=\"12\" size-sm=\"6\" size-md=\"6\" size-lg=\"6\" size-xl=\"4\">\n        <ion-card *ngIf=\"churchService && churchService.currentManagedCommunity\">\n          <ion-card-header>\n            <ion-card-title>\n              Total Users\n            </ion-card-title>\n            <ion-note class=\"padding-start\">\n              (as of today)\n            </ion-note>\n          </ion-card-header>\n          <ion-card-content>\n            <h1 class=\"ion-text-center\">{{churchService.currentManagedCommunity.members.length}}</h1>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col size-xs=\"12\" size-sm=\"6\" size-md=\"6\" size-lg=\"6\" size-xl=\"4\">\n        <ion-card *ngIf=\"churchService && churchService.currentManagedCommunity\">\n          <ion-card-header>\n              <ion-card-title>\n                All Topics + Groups\n              </ion-card-title>\n              <ion-note class=\"padding-start\">\n                (as of today)\n              </ion-note>\n          </ion-card-header>\n          <ion-card-content>\n            <h1 class=\"ion-text-center\">{{churchService.currentManagedCommunity.groups.length}}</h1>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col size-xs=\"12\" size-sm=\"6\" size-md=\"6\" size-lg=\"6\" size-xl=\"4\">\n        <ion-card *ngIf=\"churchService && churchService.currentManagedCommunity\">\n          <ion-card-header>\n            <ion-card-title>\n              Administrators\n            </ion-card-title>\n            <ion-note class=\"padding-start\">\n              (as of today)\n            </ion-note>\n          </ion-card-header>\n          <ion-card-content>\n            <h1 class=\"ion-text-center\">{{churchService.currentManagedCommunity.admins.length}}</h1>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/manage/analytics/analytics.module.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/manage/analytics/analytics.module.ts ***!
  \************************************************************/
/*! exports provided: AnalyticsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsPageModule", function() { return AnalyticsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _analytics_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./analytics.page */ "./src/app/pages/manage/analytics/analytics.page.ts");
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
        component: _analytics_page__WEBPACK_IMPORTED_MODULE_5__["AnalyticsPage"]
    }
];
var AnalyticsPageModule = /** @class */ (function () {
    function AnalyticsPageModule() {
    }
    AnalyticsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_analytics_page__WEBPACK_IMPORTED_MODULE_5__["AnalyticsPage"]]
        })
    ], AnalyticsPageModule);
    return AnalyticsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/manage/analytics/analytics.page.scss":
/*!************************************************************!*\
  !*** ./src/app/pages/manage/analytics/analytics.page.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-analytics ion-row {\n  height: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL21hbmFnZS9hbmFseXRpY3MvYW5hbHl0aWNzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvbWFuYWdlL2FuYWx5dGljcy9hbmFseXRpY3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVFO0VBQ0UsWUFBQTtBQ0RKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbWFuYWdlL2FuYWx5dGljcy9hbmFseXRpY3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWFuYWx5dGljcyB7XG5cbiAgaW9uLXJvdyB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICB9XG5cbn0iLCJhcHAtYW5hbHl0aWNzIGlvbi1yb3cge1xuICBoZWlnaHQ6IGF1dG87XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/manage/analytics/analytics.page.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/manage/analytics/analytics.page.ts ***!
  \**********************************************************/
/*! exports provided: AnalyticsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsPage", function() { return AnalyticsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
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




var AnalyticsPage = /** @class */ (function () {
    function AnalyticsPage(modalCtrl, userData, churchService) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.churchService = churchService;
        this.refreshNeeded = false;
        this.subscriptions = {};
        this.refreshHandler = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data && data.type === 'load community ready') {
                    this.load();
                }
                return [2 /*return*/];
            });
        }); };
    }
    AnalyticsPage.prototype.ngOnInit = function () {
        this.load();
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    };
    AnalyticsPage.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.churchService.currentManagedCommunity) return [3 /*break*/, 2];
                        _a = this.churchService;
                        return [4 /*yield*/, this.churchService.getAppUserUsage(this.churchService.currentManagedCommunity._id)];
                    case 1:
                        _a.numberOfActiveUsers = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AnalyticsPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    AnalyticsPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    };
    AnalyticsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_3__["Churches"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AnalyticsPage.prototype, "modalPage", void 0);
    AnalyticsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-analytics',
            template: __importDefault(__webpack_require__(/*! raw-loader!./analytics.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/analytics/analytics.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./analytics.page.scss */ "./src/app/pages/manage/analytics/analytics.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_3__["Churches"]])
    ], AnalyticsPage);
    return AnalyticsPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~analytics-analytics-module~manage-managecommunities-managecommunities-module.js.map