(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~development-development-module~manage-managecommunities-managecommunities-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/development/development.page.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/development/development.page.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar *ngIf=\"modalPage\">\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Development</ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-buttons class=\"ion-justify-content-center ion-margin-top\">\n    <ion-button shape=\"round\" fill=\"solid\" color=\"primary\" size=\"small\" (click)=\"createActivity($event)\">Create Sample Activity</ion-button>\n  </ion-buttons>\n  <ion-list>\n    <div *ngFor=\"let parent of moments\">\n      <ion-label class=\"program-title ion-margin\">{{parent.matrix_string[0][0]}}</ion-label>\n      <ion-item *ngFor=\"let moment of parent.sample_activities\" (click)=\"showActivity(moment)\">\n        <ion-thumbnail slot=\"start\">\n          <img *ngIf=\"moment.assets?.length\" [src]=\"moment.assets[0]\"/>\n          <img *ngIf=\"!moment.assets.length\" src=\"assets/img/group-default.png\"/>\n        </ion-thumbnail>\n        <ion-label>\n          <h2 class=\"ion-text-wrap\">{{moment.matrix_string[0][0]}}</h2>\n        </ion-label>\n        <ion-badge [color]=\"momentService.loadIcon(moment.resource.field).color\">{{moment.resource['en-US'].value[0]}}</ion-badge>\n        <!--<ion-badge slot=\"end\">{{moment.members.length}}</ion-badge>-->\n      </ion-item>\n    </div>\n    <ion-item-divider class=\"ion-text-wrap\">\n      Displaying {{moments.length}}&nbsp;<span *ngIf=\"moments.length <= 1\"> activity</span><span *ngIf=\"moments.length > 1\"> activities</span>\n    </ion-item-divider>\n  </ion-list>\n  <ion-infinite-scroll position=\"bottom\" (ionInfinite)=\"manageMoreActivities($event)\">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n  <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/manage/development/development.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/manage/development/development.module.ts ***!
  \****************************************************************/
/*! exports provided: DevelopmentPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopmentPageModule", function() { return DevelopmentPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _development_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./development.page */ "./src/app/pages/manage/development/development.page.ts");
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
        component: _development_page__WEBPACK_IMPORTED_MODULE_5__["DevelopmentPage"]
    }
];
var DevelopmentPageModule = /** @class */ (function () {
    function DevelopmentPageModule() {
    }
    DevelopmentPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_development_page__WEBPACK_IMPORTED_MODULE_5__["DevelopmentPage"]]
        })
    ], DevelopmentPageModule);
    return DevelopmentPageModule;
}());



/***/ }),

/***/ "./src/app/pages/manage/development/development.page.scss":
/*!****************************************************************!*\
  !*** ./src/app/pages/manage/development/development.page.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21hbmFnZS9kZXZlbG9wbWVudC9kZXZlbG9wbWVudC5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/manage/development/development.page.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/manage/development/development.page.ts ***!
  \**************************************************************/
/*! exports provided: DevelopmentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevelopmentPage", function() { return DevelopmentPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
/* harmony import */ var _feature_editfeature_editfeature_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../feature/editfeature/editfeature.page */ "./src/app/pages/feature/editfeature/editfeature.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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











var DevelopmentPage = /** @class */ (function () {
    function DevelopmentPage(router, storage, platform, authService, chatService, userData, momentService, resourceService, modalCtrl) {
        var _this = this;
        this.router = router;
        this.storage = storage;
        this.platform = platform;
        this.authService = authService;
        this.chatService = chatService;
        this.userData = userData;
        this.momentService = momentService;
        this.resourceService = resourceService;
        this.modalCtrl = modalCtrl;
        this.moments = [];
        this.ionSpinner = false;
        this.pageNum = 0;
        this.reachedEnd = false;
        this.members = [];
        this.searchKeyword = '';
        this.refreshNeeded = false;
        this.subscriptions = {};
        this.refreshHandler = function (data) {
            if (data && data.type === 'load community ready') {
                _this.setupManageActivities();
            }
        };
    }
    DevelopmentPage.prototype.ngOnInit = function () {
        if (this.userData && this.userData.currentCommunityAdminStatus) {
            this.setupManageActivities();
        }
        // PWA fast load listener + reload listener
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    };
    //-----------------------------------
    // methods to search for activities
    //-----------------------------------
    DevelopmentPage.prototype.setupManageActivities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.infiniteScroll.disabled = false;
                        this.reachedEnd = false;
                        this.moments = [];
                        this.pageNum = 0;
                        this.manageMoreActivities({ target: this.infiniteScroll });
                        return [2 /*return*/];
                    });
                }); }, 50);
                return [2 /*return*/];
            });
        });
    };
    DevelopmentPage.prototype.manageMoreActivities = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var moments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageNum++;
                        if (!!this.reachedEnd) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.momentService.loadSampleActivities(null)];
                    case 1:
                        moments = _a.sent();
                        this.ionSpinner = false;
                        // temp overide the paging function: i.e. only load page 1
                        this.reachedEnd = true;
                        event.target.disabled = true;
                        if (!moments.length) {
                            this.reachedEnd = true;
                            event.target.disabled = true;
                        }
                        else {
                            this.moments = moments;
                        }
                        event.target.complete();
                        return [3 /*break*/, 3];
                    case 2:
                        this.ionSpinner = false;
                        event.target.complete();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DevelopmentPage.prototype.showActivity = function (activity) {
        return __awaiter(this, void 0, void 0, function () {
            var showActivity, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.modalPage) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_8__["ShowfeaturePage"],
                                componentProps: { moment: activity, modalPage: true } })];
                    case 1:
                        showActivity = _a.sent();
                        return [4 /*yield*/, showActivity.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, showActivity.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.setupManageActivities();
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        this.router.navigateByUrl('/app/manage/activity/' + activity._id);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DevelopmentPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.ionSpinner = true;
        this.setupManageActivities();
    };
    DevelopmentPage.prototype.createActivity = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var editActivity, moment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        this.ionSpinner = true;
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_editfeature_editfeature_page__WEBPACK_IMPORTED_MODULE_9__["EditfeaturePage"], componentProps: { modalPage: true } })];
                    case 1:
                        editActivity = _a.sent();
                        return [4 /*yield*/, editActivity.present()];
                    case 2:
                        _a.sent();
                        this.ionSpinner = false;
                        return [4 /*yield*/, editActivity.onDidDismiss()];
                    case 3:
                        moment = (_a.sent()).data;
                        if (moment) {
                            this.momentService.share(moment);
                            this.setupManageActivities();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DevelopmentPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    DevelopmentPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    };
    DevelopmentPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["Auth"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_4__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_6__["Moment"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_7__["Resource"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonInfiniteScroll"])
    ], DevelopmentPage.prototype, "infiniteScroll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], DevelopmentPage.prototype, "modalPage", void 0);
    DevelopmentPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-development',
            template: __importDefault(__webpack_require__(/*! raw-loader!./development.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/development/development.page.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./development.page.scss */ "./src/app/pages/manage/development/development.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["Auth"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_4__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_6__["Moment"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_7__["Resource"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"]])
    ], DevelopmentPage);
    return DevelopmentPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~development-development-module~manage-managecommunities-managecommunities-module.js.map