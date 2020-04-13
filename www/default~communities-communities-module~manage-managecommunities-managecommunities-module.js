(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~communities-communities-module~manage-managecommunities-managecommunities-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/communities/communities.page.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/communities/communities.page.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar *ngIf=\"modalPage\">\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Manage Platforms</ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor=\"let community of communities\" (click)=\"showCommunityProfile(community)\">\n      <ion-thumbnail slot=\"start\">\n        <img *ngIf=\"community.background\" [src]=\"community.background\"/>\n        <img *ngIf=\"!community.background\" src=\"assets/img/group-default.png\"/>\n      </ion-thumbnail>\n      <ion-label>\n        <h2 class=\"ion-text-wrap\">{{community.name}}\n          <!--<ion-badge color=\"danger\" *ngIf=\"community.admin\">Admin</ion-badge>-->\n          <ion-badge color=\"warning\" *ngIf=\"!community.verified\">Pending Approval</ion-badge>\n          <ion-badge color=\"tertiary\" *ngIf=\"community.system_verified\">Approved</ion-badge>\n        </h2>\n        <p>{{community.industry.value}}</p>\n        <p class=\"personnel ion-text-wrap\">Admin<span *ngIf=\"community.admins?.length > 1\">s</span>: <span *ngFor=\"let admin of community.admins; index as i\"><span *ngIf=\"i > 0\">, </span>{{admin.name}}</span></p>\n        <p><ion-icon name=\"pin\"></ion-icon>{{\" \"}}{{community.meeting_location.city}}<span [hidden]=\"(community.meeting_location.city.length==0)||(community.meeting_location.state.length==0)\">{{\", \"}}</span>{{community.meeting_location.state}}<span [hidden]=\"(community.meeting_location.city.length==0)&&(community.meeting_location.state.length==0)\">{{\" \"}}</span>{{community.meeting_location.country}}</p>\n      </ion-label>\n      <ion-badge slot=\"end\">{{community.members.length}}</ion-badge>\n    </ion-item>\n    <ion-item-divider class=\"ion-text-wrap\">\n      Displaying {{communities.length}}&nbsp;<span *ngIf=\"communities.length <= 1\"> community</span><span *ngIf=\"communities.length > 1\"> communities</span>\n    </ion-item-divider>\n  </ion-list>\n  <ion-infinite-scroll position=\"bottom\" (ionInfinite)=\"manageMoreCommunities($event)\">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n  <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/manage/communities/communities.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/manage/communities/communities.module.ts ***!
  \****************************************************************/
/*! exports provided: CommunitiesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunitiesPageModule", function() { return CommunitiesPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _communities_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./communities.page */ "./src/app/pages/manage/communities/communities.page.ts");
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
        component: _communities_page__WEBPACK_IMPORTED_MODULE_5__["CommunitiesPage"]
    }
];
var CommunitiesPageModule = /** @class */ (function () {
    function CommunitiesPageModule() {
    }
    CommunitiesPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_communities_page__WEBPACK_IMPORTED_MODULE_5__["CommunitiesPage"]]
        })
    ], CommunitiesPageModule);
    return CommunitiesPageModule;
}());



/***/ }),

/***/ "./src/app/pages/manage/communities/communities.page.scss":
/*!****************************************************************!*\
  !*** ./src/app/pages/manage/communities/communities.page.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21hbmFnZS9jb21tdW5pdGllcy9jb21tdW5pdGllcy5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/manage/communities/communities.page.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/manage/communities/communities.page.ts ***!
  \**************************************************************/
/*! exports provided: CommunitiesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunitiesPage", function() { return CommunitiesPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _community_editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../community/editcommunity/editcommunity.page */ "./src/app/pages/community/editcommunity/editcommunity.page.ts");
/* harmony import */ var _community_showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../community/showcommunity/showcommunity.page */ "./src/app/pages/community/showcommunity/showcommunity.page.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
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










var CommunitiesPage = /** @class */ (function () {
    function CommunitiesPage(storage, platform, authService, chatService, userData, churchService, resourceService, modalCtrl, alertCtrl) {
        var _this = this;
        this.storage = storage;
        this.platform = platform;
        this.authService = authService;
        this.chatService = chatService;
        this.userData = userData;
        this.churchService = churchService;
        this.resourceService = resourceService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.subscriptions = {};
        this.communities = [];
        this.ionSpinner = false;
        this.pageNum = 0;
        this.reachedEnd = false;
        this.members = [];
        this.searchKeyword = '';
        this.refreshNeeded = false;
        this.refreshHandler = function (data) {
            if (data.type === 'update admin' || data.type === 'change aux data') {
                _this.setupManageCommunities();
            }
        };
    }
    CommunitiesPage.prototype.ionViewWillEnter = function () {
        if (this.userData && this.userData.currentCommunityAdminStatus) {
            this.setupManageCommunities();
        }
        // link refresh user status observable with refresh handler
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    };
    //-----------------------------------
    // methods to search for communities
    //-----------------------------------
    CommunitiesPage.prototype.setupManageCommunities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.infiniteScroll.disabled = false;
                        this.reachedEnd = false;
                        this.communities = [];
                        this.pageNum = 0;
                        this.manageMoreCommunities({ target: this.infiniteScroll });
                        return [2 /*return*/];
                    });
                }); }, 500);
                return [2 /*return*/];
            });
        });
    };
    CommunitiesPage.prototype.manageMoreCommunities = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var communities;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageNum++;
                        if (!!this.reachedEnd) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.loadMyAdminChurches(this.searchKeyword.toLowerCase(), this.pageNum)];
                    case 1:
                        communities = _a.sent();
                        this.ionSpinner = false;
                        if (!communities.length) {
                            this.reachedEnd = true;
                            event.target.disabled = true;
                        }
                        else {
                            communities.forEach(function (community) {
                                var adminIds = community.admins.map(function (c) { return c._id; });
                                if (adminIds.indexOf(_this.userData.user._id) < 0) {
                                    if (community.verified) {
                                        community.system_verified = true;
                                    }
                                }
                                else {
                                    community.admin = true;
                                }
                                _this.communities.push(community);
                            });
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
    CommunitiesPage.prototype.showCommunityProfile = function (community) {
        return __awaiter(this, void 0, void 0, function () {
            var showCommunity, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _community_showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_2__["ShowcommunityPage"],
                            componentProps: { community: community, modalPage: true } })];
                    case 1:
                        showCommunity = _a.sent();
                        return [4 /*yield*/, showCommunity.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, showCommunity.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.setupManageCommunities();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CommunitiesPage.prototype.createNewCommunity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var industries;
            var _this = this;
            return __generator(this, function (_a) {
                industries = [];
                this.resourceService.load('en-US', "Industry").subscribe(function (fields) { return __awaiter(_this, void 0, void 0, function () {
                    var i, editCommunity, refreshNeeded;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                for (i = 0; i < fields.length; i++) {
                                    console.log("id", fields[i]._id);
                                    industries.push({ _id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false });
                                }
                                return [4 /*yield*/, this.modalCtrl.create({ component: _community_editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_1__["EditcommunityPage"], componentProps: { industries: industries } })];
                            case 1:
                                editCommunity = _a.sent();
                                return [4 /*yield*/, editCommunity.present()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, editCommunity.onDidDismiss()];
                            case 3:
                                refreshNeeded = (_a.sent()).data;
                                if (refreshNeeded) {
                                    this.setupManageCommunities();
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { return __awaiter(_this, void 0, void 0, function () {
                    var networkAlert;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.alertCtrl.create({
                                    header: 'No Internet Connection',
                                    message: 'Please check your internet connection.',
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
            });
        });
    };
    CommunitiesPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.ionSpinner = true;
        this.setupManageCommunities();
    };
    CommunitiesPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    CommunitiesPage.prototype.ionViewWillLeave = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    };
    CommunitiesPage.ctorParameters = function () { return [
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["Auth"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_8__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_9__["Churches"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_5__["Resource"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonInfiniteScroll"])
    ], CommunitiesPage.prototype, "infiniteScroll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CommunitiesPage.prototype, "modalPage", void 0);
    CommunitiesPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-communities',
            template: __importDefault(__webpack_require__(/*! raw-loader!./communities.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/communities/communities.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./communities.page.scss */ "./src/app/pages/manage/communities/communities.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["Auth"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_8__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_9__["Churches"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_5__["Resource"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]])
    ], CommunitiesPage);
    return CommunitiesPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~communities-communities-module~manage-managecommunities-managecommunities-module.js.map