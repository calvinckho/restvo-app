(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~groups-groups-module~manage-managecommunities-managecommunities-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/groups/groups.page.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/groups/groups.page.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar *ngIf=\"modalPage\">\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{userData.user.churches[userData.currentCommunityIndex].name}}: Groups</ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor=\"let group of groups\" (click)=\"showGroupProfile(group)\">\n      <ion-avatar slot=\"start\">\n        <img *ngIf=\"group.background\" [src]=\"group.background\"/>\n        <img *ngIf=\"!group.background\" src=\"assets/img/group-default.png\"/>\n      </ion-avatar>\n      <ion-label>\n        <h2 class=\"ion-text-wrap\">{{group.name}}</h2>\n        <p *ngIf=\"group.conversation\">Type: Group</p>\n        <p *ngIf=\"group.board\">Type: Topic</p>\n        <p class=\"personnel ion-text-wrap\">Leader<span *ngIf=\"group.leaders?.length > 1\">s</span>: <span *ngFor=\"let leader of group.leaders; index as i\"><span *ngIf=\"i > 0\">, </span>{{leader.name}}</span></p>\n      </ion-label>\n      <ion-badge *ngIf=\"!group.flagged\" slot=\"end\" class=\"ion-margin-start\">{{group.members.length}}{{\" member\"}}<span *ngIf=\"group.members?.length >= 2\">s</span></ion-badge>\n      <ion-badge *ngIf=\"group.flagged\" color=\"danger\" slot=\"end\" class=\"ion-margin-start\">Review Required</ion-badge>\n    </ion-item>\n    <ion-item-divider class=\"ion-text-wrap\">\n      Displaying {{groups.length}} group<span *ngIf=\"groups.length > 1\">s</span>\n    </ion-item-divider>\n  </ion-list>\n  <ion-infinite-scroll position=\"bottom\" (ionInfinite)=\"infiniteScroll.complete()\">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n  <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/manage/groups/groups.module.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/manage/groups/groups.module.ts ***!
  \******************************************************/
/*! exports provided: GroupsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupsPageModule", function() { return GroupsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _groups_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./groups.page */ "./src/app/pages/manage/groups/groups.page.ts");
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
        component: _groups_page__WEBPACK_IMPORTED_MODULE_5__["GroupsPage"]
    }
];
var GroupsPageModule = /** @class */ (function () {
    function GroupsPageModule() {
    }
    GroupsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_groups_page__WEBPACK_IMPORTED_MODULE_5__["GroupsPage"]]
        })
    ], GroupsPageModule);
    return GroupsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/manage/groups/groups.page.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/manage/groups/groups.page.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21hbmFnZS9ncm91cHMvZ3JvdXBzLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/manage/groups/groups.page.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/manage/groups/groups.page.ts ***!
  \****************************************************/
/*! exports provided: GroupsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupsPage", function() { return GroupsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../group/groupchat/groupchat.page */ "./src/app/pages/group/groupchat/groupchat.page.ts");
/* harmony import */ var _group_editgroup_editgroup_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../group/editgroup/editgroup.page */ "./src/app/pages/group/editgroup/editgroup.page.ts");
/* harmony import */ var _board_groupboard_groupboard_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../board/groupboard/groupboard.page */ "./src/app/pages/board/groupboard/groupboard.page.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
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











var GroupsPage = /** @class */ (function () {
    function GroupsPage(storage, platform, authService, chatService, userData, churchService, resourceService, modalCtrl, alertCtrl) {
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
        //variables to search topics
        this.ionSpinner = false;
        this.groups = [];
        this.searchKeyword = '';
        this.refreshNeeded = false;
        this.refreshHandler = function (data) {
            if (data.type === 'load community ready' || data.type === 'update admin' || data.type === 'change aux data') {
                _this.setupManageGroups();
            }
        };
    }
    GroupsPage.prototype.ngOnInit = function () {
        if (this.userData && this.userData.currentCommunityAdminStatus) {
            this.setupManageGroups();
        }
        // link refresh user observable to refresh handler
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    };
    //-----------------------------------
    // methods to search for groups
    //-----------------------------------
    //maybe put executeSearch but would have to differentiate for each category
    GroupsPage.prototype.setupManageGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groups, err_1, networkAlert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        return [4 /*yield*/, this.churchService.loadAllChurchGroupProfiles(this.userData.user.churches[this.userData.currentCommunityIndex]._id)];
                    case 1:
                        groups = _a.sent();
                        this.groups = [];
                        this.ionSpinner = false;
                        groups.forEach(function (group) {
                            if (group.hasOwnProperty('conversation') && (group.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) >= 0)) {
                                _this.groups.push(group);
                            }
                        });
                        this.groups.sort(function (a, b) {
                            var c = new Date(a.updatedAt);
                            var d = new Date(b.updatedAt);
                            return (d - c);
                        });
                        this.groups.sort(function (a, b) {
                            return b.flagged - a.flagged;
                        });
                        return [3 /*break*/, 5];
                    case 2:
                        err_1 = _a.sent();
                        this.ionSpinner = false;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'No Internet Connection',
                                subHeader: 'Please check your internet connection.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        networkAlert = _a.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 4:
                        _a.sent();
                        console.log("not allowed");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GroupsPage.prototype.showGroupProfile = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            var groupPage, refreshNeeded, groupBoardPage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!group.conversation) return [3 /*break*/, 4];
                        this.chatService.currentChatProps.push({
                            conversationId: group.conversation,
                            name: group.name,
                            group: group,
                            badge: true,
                            page: 'about',
                            modalPage: true
                        });
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_1__["GroupchatPage"],
                                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                            })];
                    case 1:
                        groupPage = _a.sent();
                        return [4 /*yield*/, groupPage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, groupPage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.setupManageGroups();
                        }
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, this.modalCtrl.create({ component: _board_groupboard_groupboard_page__WEBPACK_IMPORTED_MODULE_3__["GroupboardPage"], componentProps: {
                                group: group,
                                page: 'board'
                            } })];
                    case 5:
                        groupBoardPage = _a.sent();
                        return [4 /*yield*/, groupBoardPage.present()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, groupBoardPage.onDidDismiss()];
                    case 7:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.setupManageGroups();
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    GroupsPage.prototype.createNewTopic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editGroupPage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _group_editgroup_editgroup_page__WEBPACK_IMPORTED_MODULE_2__["EditgroupPage"], componentProps: { personalGroup: false, publishGroup: false } })];
                    case 1:
                        editGroupPage = _a.sent();
                        return [4 /*yield*/, editGroupPage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, editGroupPage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.setupManageGroups();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupsPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.ionSpinner = true;
        this.setupManageGroups();
    };
    GroupsPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    GroupsPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    };
    GroupsPage.ctorParameters = function () { return [
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_9__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_10__["Churches"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_6__["Resource"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInfiniteScroll"])
    ], GroupsPage.prototype, "infiniteScroll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GroupsPage.prototype, "modalPage", void 0);
    GroupsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-groups',
            template: __importDefault(__webpack_require__(/*! raw-loader!./groups.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/groups/groups.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./groups.page.scss */ "./src/app/pages/manage/groups/groups.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_7__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_9__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_10__["Churches"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_6__["Resource"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"]])
    ], GroupsPage);
    return GroupsPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~groups-groups-module~manage-managecommunities-managecommunities-module.js.map