"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GroupsPage = /** @class */ (function () {
    function GroupsPage() {
    }
    GroupsPage = __decorate([
        core_1.Component({
            selector: 'app-groups',
            templateUrl: './groups.page.html',
            styleUrls: ['./groups.page.scss'],
        })
    ], GroupsPage);
    return GroupsPage;
}());
exports.GroupsPage = GroupsPage;
var core_2 = require("@angular/core");
var groupchat_page_1 = require("../../group/groupchat/groupchat.page");
var editgroup_page_1 = require("../../group/editgroup/editgroup.page");
var groupboard_page_1 = require("../../board/groupboard/groupboard.page");
var angular_1 = require("@ionic/angular");
var TopicsPage = /** @class */ (function () {
    function TopicsPage(events, storage, platform, authService, chatService, userData, churchService, resourceService, modalCtrl, alertCtrl) {
        var _this = this;
        this.events = events;
        this.storage = storage;
        this.platform = platform;
        this.authService = authService;
        this.chatService = chatService;
        this.userData = userData;
        this.churchService = churchService;
        this.resourceService = resourceService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        //variables to search topics
        this.ionSpinner = false;
        this.groups = [];
        this.searchKeyword = '';
        this.refreshNeeded = false;
        this.refreshHandler = function (data) {
            if (data.type === 'update admin' || data.type === 'change community') {
                _this.setupManageGroups();
            }
        };
    }
    TopicsPage.prototype.ionViewWillEnter = function () {
        if (this.userData && this.userData.hasPlatformAdminAccess) {
            this.setupManageGroups();
        }
        // PWA fast load listener + reload listener
        this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
        this.storage.set('activePage', { page: "manage", conversationId: null }); // store the active page to the local storage
    };
    //-----------------------------------
    // methods to search for topics
    //-----------------------------------
    //maybe put executeSearch but would have to differentiate for each category
    TopicsPage.prototype.setupManageGroups = function () {
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
                            if (group.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) >= 0) {
                                if (_this.groupType === 'group' && group.hasOwnProperty('conversation')) {
                                    _this.groups.push(group);
                                }
                                else if (_this.groupType === 'topic' && group.hasOwnProperty('board')) {
                                    _this.groups.push(group);
                                }
                                else {
                                    _this.groups.push(group);
                                }
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
    TopicsPage.prototype.showGroupProfile = function (group) {
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
                            page: 'about',
                            modalPage: true
                        });
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: groupchat_page_1.GroupchatPage,
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
                    case 4: return [4 /*yield*/, this.modalCtrl.create({ component: groupboard_page_1.GroupboardPage, componentProps: {
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
    TopicsPage.prototype.createNewTopic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editGroupPage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: editgroup_page_1.EditgroupPage, componentProps: { personalGroup: false, publishGroup: false } })];
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
    TopicsPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.ionSpinner = true;
        this.setupManageGroups();
    };
    TopicsPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    TopicsPage.prototype.ionViewWillLeave = function () {
        this.userData.refreshUserStatus$.unsubscribe(this.refreshHandler);
    };
    __decorate([
        core_2.ViewChild(angular_1.IonInfiniteScroll)
    ], TopicsPage.prototype, "infiniteScroll", void 0);
    __decorate([
        core_2.Input()
    ], TopicsPage.prototype, "modalPage", void 0);
    __decorate([
        core_2.Input()
    ], TopicsPage.prototype, "groupType", void 0);
    TopicsPage = __decorate([
        core_1.Component({
            selector: 'app-topics',
            templateUrl: './topics.page.html',
            styleUrls: ['./topics.page.scss'],
            encapsulation: core_2.ViewEncapsulation.None
        })
    ], TopicsPage);
    return TopicsPage;
}());
exports.TopicsPage = TopicsPage;
