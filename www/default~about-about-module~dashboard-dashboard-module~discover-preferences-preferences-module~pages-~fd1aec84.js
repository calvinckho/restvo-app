(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~about-about-module~dashboard-dashboard-module~discover-preferences-preferences-module~pages-~fd1aec84"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/discover/preferences/preferences.page.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/discover/preferences/preferences.page.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage || showHeader\" id=\"preference-header\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\" id=\"clickback\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title *ngIf=\"organizer\">Onboarding Process</ion-title>\n    <ion-title *ngIf=\"!organizer\">About Me</ion-title>\n  </ion-toolbar>\n  <!--<ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\"></ion-searchbar>\n  </ion-toolbar>-->\n</ion-header>\n\n<ion-content>\n    <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n        <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n            <ion-spinner name=\"dots\"></ion-spinner>\n        </ion-row>\n    </ion-grid>\n  <ion-list *ngIf=\"organizer\">\n    <ion-buttons class=\"ion-justify-content-center ion-margin-vertical\">\n      <ion-button shape=\"round\" fill=\"solid\" color=\"primary\" size=\"small\" (click)=\"chooseOnboardingProcess($event)\">Add Onboarding Process</ion-button>\n    </ion-buttons>\n      <ion-list-header>\n          <ion-label>Participants</ion-label>\n      </ion-list-header>\n        <ion-item *ngFor=\"let moment of moments\" (click)=\"openOnboardingProcess(moment)\" [hidden]=\"!moment.array_boolean[2]\">\n          <ion-thumbnail slot=\"start\">\n            <img *ngIf=\"moment.assets?.length\" [src]=\"moment.assets[0]\"/>\n            <img *ngIf=\"!moment.assets.length\" src=\"assets/img/group-default.png\"/>\n          </ion-thumbnail>\n          <div>\n            <ion-note *ngIf=\"!organizer\" style=\"font-style: italic\" class=\"ion-margin-bottom\">{{moment.program.matrix_string[0][0]}}</ion-note>\n            <ion-label>\n              <h2 class=\"ion-text-wrap\">{{moment.matrix_string[0][0]}}</h2>\n            </ion-label>\n          </div>\n\n          <ion-badge *ngIf=\"!moment.response\" [color]=\"momentService.loadIcon(moment.resource.field).color\" slot=\"end\">{{moment.resource['en-US'].value[0]}}</ion-badge>\n          <ion-badge *ngIf=\"moment.response && moment.status === 'Incomplete'\" color=\"warning\" slot=\"end\">{{moment.status}}</ion-badge>\n          <ion-badge *ngIf=\"moment.response && moment.status === 'Completed'\" color=\"tertiary\" slot=\"end\">{{moment.status}}</ion-badge>\n          <!--<ion-badge slot=\"end\">{{moment.members.length}}</ion-badge>-->\n        </ion-item>\n      <ion-list-header>\n          <ion-label>Leaders</ion-label>\n      </ion-list-header>\n      <ion-item *ngFor=\"let moment of moments\" (click)=\"openOnboardingProcess(moment)\" [hidden]=\"!moment.array_boolean[4]\">\n          <ion-thumbnail slot=\"start\">\n              <img *ngIf=\"moment.assets?.length\" [src]=\"moment.assets[0]\"/>\n              <img *ngIf=\"!moment.assets.length\" src=\"assets/img/group-default.png\"/>\n          </ion-thumbnail>\n          <div>\n              <ion-note *ngIf=\"!organizer\" style=\"font-style: italic\" class=\"ion-margin-bottom\">{{moment.program.matrix_string[0][0]}}</ion-note>\n              <ion-label>\n                  <h2 class=\"ion-text-wrap\">{{moment.matrix_string[0][0]}}</h2>\n              </ion-label>\n          </div>\n\n          <ion-badge *ngIf=\"!moment.response\" [color]=\"momentService.loadIcon(moment.resource.field).color\" slot=\"end\">{{moment.resource['en-US'].value[0]}}</ion-badge>\n          <ion-badge *ngIf=\"moment.response && moment.status === 'Incomplete'\" color=\"warning\" slot=\"end\">{{moment.status}}</ion-badge>\n          <ion-badge *ngIf=\"moment.response && moment.status === 'Completed'\" color=\"tertiary\" slot=\"end\">{{moment.status}}</ion-badge>\n          <!--<ion-badge slot=\"end\">{{moment.members.length}}</ion-badge>-->\n      </ion-item>\n      <ion-list-header>\n          <ion-label>Organizers</ion-label>\n      </ion-list-header>\n      <ion-item *ngFor=\"let moment of moments\" (click)=\"openOnboardingProcess(moment)\" [hidden]=\"!moment.array_boolean[3]\">\n          <ion-thumbnail slot=\"start\">\n              <img *ngIf=\"moment.assets?.length\" [src]=\"moment.assets[0]\"/>\n              <img *ngIf=\"!moment.assets.length\" src=\"assets/img/group-default.png\"/>\n          </ion-thumbnail>\n          <div>\n              <ion-note *ngIf=\"!organizer\" style=\"font-style: italic\" class=\"ion-margin-bottom\">{{moment.program.matrix_string[0][0]}}</ion-note>\n              <ion-label>\n                  <h2 class=\"ion-text-wrap\">{{moment.matrix_string[0][0]}}</h2>\n              </ion-label>\n          </div>\n\n          <ion-badge *ngIf=\"!moment.response\" [color]=\"momentService.loadIcon(moment.resource.field).color\" slot=\"end\">{{moment.resource['en-US'].value[0]}}</ion-badge>\n          <ion-badge *ngIf=\"moment.response && moment.status === 'Incomplete'\" color=\"warning\" slot=\"end\">{{moment.status}}</ion-badge>\n          <ion-badge *ngIf=\"moment.response && moment.status === 'Completed'\" color=\"tertiary\" slot=\"end\">{{moment.status}}</ion-badge>\n          <!--<ion-badge slot=\"end\">{{moment.members.length}}</ion-badge>-->\n      </ion-item>\n      <ion-list-header>\n          <ion-label>Unused</ion-label>\n      </ion-list-header>\n      <ion-item *ngFor=\"let moment of moments\" (click)=\"openOnboardingProcess(moment)\" [hidden]=\"!(!moment.array_boolean[2] && !moment.array_boolean[3] && !moment.array_boolean[4])\">\n          <ion-thumbnail slot=\"start\">\n              <img *ngIf=\"moment.assets?.length\" [src]=\"moment.assets[0]\"/>\n              <img *ngIf=\"!moment.assets.length\" src=\"assets/img/group-default.png\"/>\n          </ion-thumbnail>\n          <div>\n              <ion-note *ngIf=\"!organizer\" style=\"font-style: italic\" class=\"ion-margin-bottom\">{{moment.program.matrix_string[0][0]}}</ion-note>\n              <ion-label>\n                  <h2 class=\"ion-text-wrap\">{{moment.matrix_string[0][0]}}</h2>\n              </ion-label>\n          </div>\n\n          <ion-badge *ngIf=\"!moment.response\" [color]=\"momentService.loadIcon(moment.resource.field).color\" slot=\"end\">{{moment.resource['en-US'].value[0]}}</ion-badge>\n          <ion-badge *ngIf=\"moment.response && moment.status === 'Incomplete'\" color=\"warning\" slot=\"end\">{{moment.status}}</ion-badge>\n          <ion-badge *ngIf=\"moment.response && moment.status === 'Completed'\" color=\"tertiary\" slot=\"end\">{{moment.status}}</ion-badge>\n          <!--<ion-badge slot=\"end\">{{moment.members.length}}</ion-badge>-->\n      </ion-item>\n    <ion-item-divider *ngIf=\"organizer\" class=\"ion-text-wrap\">\n      Displaying {{moments.length}}&nbsp;<span *ngIf=\"moments.length <= 1\"> Onboarding process</span><span *ngIf=\"moments.length > 1\"> Onboarding processes</span>\n    </ion-item-divider>\n  </ion-list>\n    <ion-list *ngIf=\"!organizer\">\n        <ion-item *ngFor=\"let moment of moments\" (click)=\"openOnboardingProcess(moment)\">\n            <ion-thumbnail slot=\"start\">\n                <img *ngIf=\"moment.assets?.length\" [src]=\"moment.assets[0]\"/>\n                <img *ngIf=\"!moment.assets.length\" src=\"assets/img/group-default.png\"/>\n            </ion-thumbnail>\n            <div>\n                <ion-label *ngIf=\"!organizer\" >\n                    <h2 class=\"ion-text-wrap\">{{moment.program.matrix_string[0][0]}}</h2>\n                </ion-label>\n                <ion-note style=\"font-style: italic\" class=\"ion-margin-top\">{{moment.matrix_string[0][0]}}</ion-note>\n            </div>\n\n            <ion-badge *ngIf=\"!moment.response\" [color]=\"momentService.loadIcon(moment.resource.field).color\" slot=\"end\">{{moment.resource['en-US'].value[0]}}</ion-badge>\n            <ion-badge *ngIf=\"moment.response && moment.status === 'Incomplete'\" color=\"warning\" slot=\"end\">{{moment.status}}</ion-badge>\n            <ion-badge *ngIf=\"moment.response && moment.status === 'Completed'\" color=\"tertiary\" slot=\"end\">{{moment.status}}</ion-badge>\n            <!--<ion-badge slot=\"end\">{{moment.members.length}}</ion-badge>-->\n        </ion-item>\n        <ion-item-divider class=\"ion-text-wrap\">\n            Displaying {{moments.length}}&nbsp;<span *ngIf=\"moments.length <= 1\"> About Me section</span><span *ngIf=\"moments.length > 1\"> About Me sections</span>\n        </ion-item-divider>\n    </ion-list>\n      <ion-infinite-scroll position=\"bottom\" (ionInfinite)=\"loadMorePreferences($event)\">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/discover/preferences/preferences.page.scss":
/*!******************************************************************!*\
  !*** ./src/app/pages/discover/preferences/preferences.page.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Rpc2NvdmVyL3ByZWZlcmVuY2VzL3ByZWZlcmVuY2VzLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/discover/preferences/preferences.page.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/discover/preferences/preferences.page.ts ***!
  \****************************************************************/
/*! exports provided: PreferencesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferencesPage", function() { return PreferencesPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../feature/pickfeature-popover/pickfeature-popover.page */ "./src/app/pages/feature/pickfeature-popover/pickfeature-popover.page.ts");
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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};












var PreferencesPage = /** @class */ (function () {
    function PreferencesPage(route, router, location, storage, platform, authService, chatService, userData, momentService, resourceService, modalCtrl) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.location = location;
        this.storage = storage;
        this.platform = platform;
        this.authService = authService;
        this.chatService = chatService;
        this.userData = userData;
        this.momentService = momentService;
        this.resourceService = resourceService;
        this.modalCtrl = modalCtrl;
        this.organizer = false;
        this.subscriptions = {};
        this.moments = [];
        this.ionSpinner = false;
        this.pageNum = 0;
        this.reachedEnd = false;
        this.members = [];
        this.searchKeyword = '';
        this.refreshNeeded = false;
        this.refreshUserStatusHandler = function () {
            if (!_this.ionSpinner && _this.userData && _this.userData.user) { // after a user has modified the answer to the onboarding process questionniare. data is most likely { type: 'change aux data' }
                _this.setup();
            }
        };
    }
    PreferencesPage.prototype.ngOnInit = function () {
        // link the refreshUserStatus Observable with the refresh handler. It fires on subsequent user refreshes
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
    };
    PreferencesPage.prototype.setup = function () {
        if (this.userData && this.userData.user) {
            this.programId = this.programId || this.route.snapshot.paramMap.get('programId'); // the program ID
            this.type = this.type || parseInt(this.route.snapshot.paramMap.get('type'), 10); // 2: participants, 3: organizers, 4: leaders
            this.showHeader = this.showHeader || (this.route.snapshot.paramMap.get('showHeader') === 'true'); // 2: participants, 3: organizers, 4: leaders
            this.organizer = this.organizer || JSON.parse(this.route.snapshot.paramMap.get('organizer'));
            this.loadPreferences();
        }
        else {
            this.router.navigateByUrl('/app/discover');
        }
    };
    // load Program onboarding processes
    PreferencesPage.prototype.loadPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.ionSpinner = true;
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.infiniteScroll.disabled = false;
                        this.reachedEnd = false;
                        this.pageNum = 0;
                        this.moments = [];
                        this.loadMorePreferences({ target: this.infiniteScroll });
                        return [2 /*return*/];
                    });
                }); }, 50);
                return [2 /*return*/];
            });
        });
    };
    PreferencesPage.prototype.loadMorePreferences = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, processes, processes_1, processes_1_1, process_1, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        this.pageNum++;
                        if (!!this.reachedEnd) return [3 /*break*/, 5];
                        processes = void 0;
                        if (!this.organizer) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.momentService.loadProgramOnboardActivities(this.programId, null, false)];
                    case 1:
                        processes = _b.sent();
                        this.reachedEnd = true;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.momentService.loadUserPreferences(this.pageNum, this.programId, null)];
                    case 3:
                        processes = _b.sent();
                        _b.label = 4;
                    case 4:
                        this.ionSpinner = false;
                        if (!processes.length) {
                            this.reachedEnd = true;
                            event.target.disabled = true;
                        }
                        else {
                            try {
                                for (processes_1 = __values(processes), processes_1_1 = processes_1.next(); !processes_1_1.done; processes_1_1 = processes_1.next()) {
                                    process_1 = processes_1_1.value;
                                    process_1.status = !process_1.response ? 'New' : (process_1.response.matrix_number.filter(function (c) { return c.length > 5; }).length < process_1.resource.matrix_number[0].filter(function (c) { return c === 40000 || c === 40020; }).length || process_1.response.matrix_string.filter(function (c) { return c.length > 1 && c[1] && c[1].length > 0; }).length < process_1.resource.matrix_number[0].filter(function (c) { return (c === 40010); }).length) ? 'Incomplete' : 'Completed';
                                    this.moments.push(process_1);
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (processes_1_1 && !processes_1_1.done && (_a = processes_1.return)) _a.call(processes_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            if (!this.organizer) {
                                // sort the list by program Name if it is showing all user's preferences
                                this.moments.sort(function (a, b) {
                                    if (a.program.matrix_string[0][0] < b.program.matrix_string[0][0]) {
                                        return -1;
                                    }
                                    if (a.program.matrix_string[0][0] > b.program.matrix_string[0][0]) {
                                        return 1;
                                    }
                                    return 0;
                                });
                            }
                        }
                        event.target.complete();
                        return [3 /*break*/, 6];
                    case 5:
                        this.ionSpinner = false;
                        event.target.complete();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_1 = _b.sent();
                        this.ionSpinner = false;
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    PreferencesPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.ionSpinner = true;
        this.loadPreferences();
    };
    PreferencesPage.prototype.openOnboardingProcess = function (moment) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.modalPage || this.platform.width() < 768)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_9__["ShowfeaturePage"], componentProps: { moment: moment, modalPage: true } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.setup();
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        if (this.router.url.includes('app/user')) { // if opened from User -> About Me
                            this.router.navigate(['/app/user/activity/' + moment._id], { replaceUrl: false });
                        }
                        else { // such case does not exist yet. User should always open from the User -> About Me
                            this.router.navigate(['/app/activity/' + moment._id], { replaceUrl: false });
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PreferencesPage.prototype.chooseOnboardingProcess = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, e_3, _b, _c, modal, moments, moments_1, moments_1_1, moment, clonedMoments, clonedMoments_1, clonedMoments_1_1, clonedMoment, index;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_11__["PickfeaturePopoverPage"], componentProps: { title: 'Choose from Library', categoryId: '5e17acd47b00ea76b75e5a71', programId: this.programId, type: this.type, allowCreate: true, allowSwitchCategory: false, modalPage: true } })];
                    case 1:
                        modal = _d.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        moments = (_d.sent()).data;
                        if (!(moments && moments.length)) return [3 /*break*/, 5];
                        try {
                            for (moments_1 = __values(moments), moments_1_1 = moments_1.next(); !moments_1_1.done; moments_1_1 = moments_1.next()) {
                                moment = moments_1_1.value;
                                // prepare object for cloning. copy everything except calendar and add program and onboarding types
                                moment.calendar = {
                                    title: moment.matrix_string[0][0],
                                    location: '',
                                    notes: '',
                                    startDate: new Date().toISOString(),
                                    endDate: new Date().toISOString(),
                                    options: {
                                        firstReminderMinutes: 0,
                                        secondReminderMinutes: 0,
                                        reminders: []
                                    }
                                };
                                moment.program = this.programId;
                                if (this.type && moment.array_boolean.length > this.type) {
                                    moment.array_boolean[this.type] = true;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (moments_1_1 && !moments_1_1.done && (_a = moments_1.return)) _a.call(moments_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [4 /*yield*/, this.momentService.clone(moments, null)];
                    case 4:
                        clonedMoments = _d.sent();
                        try {
                            for (clonedMoments_1 = __values(clonedMoments), clonedMoments_1_1 = clonedMoments_1.next(); !clonedMoments_1_1.done; clonedMoments_1_1 = clonedMoments_1.next()) {
                                clonedMoment = clonedMoments_1_1.value;
                                index = moments.map(function (moment) { return moment.resource._id; }).indexOf(clonedMoment.resource);
                                if (index > -1) {
                                    clonedMoment.resource = moments[index].resource; // clone the populated resource
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (clonedMoments_1_1 && !clonedMoments_1_1.done && (_b = clonedMoments_1.return)) _b.call(clonedMoments_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        (_c = this.moments).unshift.apply(_c, __spread(clonedMoments));
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PreferencesPage.prototype.closeModal = function () {
        if (this.modalPage) {
            // because Preference page is started by EditMoment via event listener and not via modalCtrl (hence it can't return the refreshNeeded obj back to EditMoment), it is necessary to publish a 'RefreshUserStatus' event to update EditMoment
            if (this.refreshNeeded) {
                this.userData.refreshUserStatus({});
            }
            this.modalCtrl.dismiss(this.refreshNeeded);
        }
        else {
            this.location.back();
        }
    };
    PreferencesPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
    };
    PreferencesPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_5__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_7__["Moment"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonInfiniteScroll"])
    ], PreferencesPage.prototype, "infiniteScroll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PreferencesPage.prototype, "modalPage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PreferencesPage.prototype, "showHeader", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PreferencesPage.prototype, "programId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], PreferencesPage.prototype, "type", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], PreferencesPage.prototype, "organizer", void 0);
    PreferencesPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-preferences',
            template: __importDefault(__webpack_require__(/*! raw-loader!./preferences.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/discover/preferences/preferences.page.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./preferences.page.scss */ "./src/app/pages/discover/preferences/preferences.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_5__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_7__["Moment"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"]])
    ], PreferencesPage);
    return PreferencesPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~about-about-module~dashboard-dashboard-module~discover-preferences-preferences-module~pages-~fd1aec84.js.map