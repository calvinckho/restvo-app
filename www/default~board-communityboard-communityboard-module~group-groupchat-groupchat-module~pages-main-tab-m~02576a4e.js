(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~board-communityboard-communityboard-module~group-groupchat-groupchat-module~pages-main-tab-m~02576a4e"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/showgroup/showgroup.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/showgroup/showgroup.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"modalCtrl.dismiss()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>\n      {{group.name}}\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"default-background\" [ngStyle]=\"{'background-image': 'url(' + (group.background | background: group._id) + ')'}\"><!-- [ngClass]=\"{ 'opaque' : group.hasOwnProperty('background')}\">-->\n    <div class=\"default-title\" *ngIf=\"group.name\">\n      {{group.name}}\n    </div>\n  </div>\n  <!--group details-->\n  <div class=\"ion-padding\">\n    <p *ngIf=\"(group.beginAt && group.endAt)\"><ion-icon name=\"calendar\"></ion-icon>&nbsp;{{group.beginAt | datetime: 'h:n,m:n,w:s,m:n,d:n'}} - {{group.endAt | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n    <div *ngIf=\"group.churchId && group.meeting_location\">\n      <p [hidden]=\"!group.meeting_location.location\"><ion-icon name=\"pin\"></ion-icon>&nbsp;{{group.meeting_location.location}}</p>\n      <p><ion-icon name=\"pin\"></ion-icon>&nbsp;{{group.meeting_location.street}}<span [hidden]=\"(group.meeting_location.street.length==0)\">{{\", \"}}</span>{{group.meeting_location.city}}<span [hidden]=\"(group.meeting_location.city.length==0)||(group.meeting_location.state.length==0)\">{{\", \"}}</span>{{group.meeting_location.state}}<span [hidden]=\"(group.meeting_location.city.length==0)&&(group.meeting_location.state.length==0)\">&nbsp;</span>{{group.meeting_location.country}}</p>\n    </div>\n    <p *ngIf=\"group.details\" [innerHTML]=\"group.details\"></p>\n  </div>\n  <ion-list>\n    <ion-item lines=\"none\" color=\"grey\">Leaders</ion-item>\n    <ion-item *ngFor=\"let leader of group.leaders\" (click)=\"seeUserInfo($event, leader)\">\n      <ion-avatar slot=\"start\">\n        <img *ngIf=\"leader.avatar\" [src]=\"leader.avatar\"/>\n        <img *ngIf=\"!leader.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n      </ion-avatar>\n      {{leader.first_name}} {{leader.last_name}}\n    </ion-item>\n  </ion-list>\n\n  <ion-row *ngIf=\"joinGroupTag\"><ion-col><ion-button [hidden]=\"!joinGroupTag\" expand=\"full\" shape=\"round\" color=\"primary\" fill=\"solid\" (click)=\"joinGroup()\">Join Group</ion-button></ion-col></ion-row>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/group/showgroup/showgroup.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/group/showgroup/showgroup.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-showgroup .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-showgroup .opaque {\n  opacity: 0.6;\n}\napp-showgroup .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 2em;\n  color: #fff;\n  -webkit-text-stroke: thin;\n  /*    text-shadow:\n              -1px -1px 0 #000,\n              1px -1px 0 #000,\n              -1px 1px 0 #000,\n              1px 1px 0 #000;*/\n}\napp-showgroup .section-title {\n  color: white;\n  --background: var(--ion-color-grey);\n  text-align: left;\n  font-size: large;\n}\napp-showgroup .avatar {\n  width: 40px !important;\n  height: 40px !important;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2dyb3VwL3Nob3dncm91cC9zaG93Z3JvdXAucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9ncm91cC9zaG93Z3JvdXAvc2hvd2dyb3VwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtBQ0RKO0FESUU7RUFDRSxZQUFBO0FDRko7QURLRTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDSjs7Ozs4QkFBQTtBQ0NBO0FETUU7RUFDRSxZQUFBO0VBQ0EsbUNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDSko7QURPRTtFQUNFLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtLQUFBLGlCQUFBO0FDTEoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ncm91cC9zaG93Z3JvdXAvc2hvd2dyb3VwLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1zaG93Z3JvdXAge1xuXG4gIC5kZWZhdWx0LWJhY2tncm91bmQge1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAub3BhcXVlIHtcbiAgICBvcGFjaXR5OiAwLjY7XG4gIH1cblxuICAuZGVmYXVsdC10aXRsZSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDIuMGVtO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHRoaW47XG4vKiAgICB0ZXh0LXNoYWRvdzpcbiAgICAgICAgICAgIC0xcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAxcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAtMXB4IDFweCAwICMwMDAsXG4gICAgICAgICAgICAxcHggMXB4IDAgIzAwMDsqL1xuICB9XG5cbiAgLnNlY3Rpb24tdGl0bGUge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIH1cblxuICAuYXZhdGFyIHtcbiAgICB3aWR0aDogNDBweCAhaW1wb3J0YW50O1xuICAgIGhlaWdodCA6IDQwcHggIWltcG9ydGFudDtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgfVxufVxuXG4iLCJhcHAtc2hvd2dyb3VwIC5kZWZhdWx0LWJhY2tncm91bmQge1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgbWluLWhlaWdodDogMTUwcHg7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLXNob3dncm91cCAub3BhcXVlIHtcbiAgb3BhY2l0eTogMC42O1xufVxuYXBwLXNob3dncm91cCAuZGVmYXVsdC10aXRsZSB7XG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyZW07XG4gIGNvbG9yOiAjZmZmO1xuICAtd2Via2l0LXRleHQtc3Ryb2tlOiB0aGluO1xuICAvKiAgICB0ZXh0LXNoYWRvdzpcbiAgICAgICAgICAgICAgLTFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgICAtMXB4IDFweCAwICMwMDAsXG4gICAgICAgICAgICAgIDFweCAxcHggMCAjMDAwOyovXG59XG5hcHAtc2hvd2dyb3VwIC5zZWN0aW9uLXRpdGxlIHtcbiAgY29sb3I6IHdoaXRlO1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZm9udC1zaXplOiBsYXJnZTtcbn1cbmFwcC1zaG93Z3JvdXAgLmF2YXRhciB7XG4gIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNDBweCAhaW1wb3J0YW50O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/group/showgroup/showgroup.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/group/showgroup/showgroup.page.ts ***!
  \*********************************************************/
/*! exports provided: ShowgroupPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowgroupPage", function() { return ShowgroupPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
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









var ShowgroupPage = /** @class */ (function () {
    function ShowgroupPage(cache, router, alertCtrl, modalCtrl, popoverCtrl, authService, userData, chatService, groupService) {
        var _this = this;
        this.cache = cache;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.authService = authService;
        this.userData = userData;
        this.chatService = chatService;
        this.groupService = groupService;
        this.subscriptions = {};
        this.joinGroupTag = true;
        this.leadersId = [];
        this.editInfoTag = false;
        this.revealEditTag = false;
        this.refreshHandler = function (res) {
            if (res) {
                if (res.group._id === _this.group._id) {
                    _this.group = res.group;
                    _this.setTag();
                }
                else if (res.conversationId === _this.group.conversation) {
                    _this.setTag();
                }
            }
        };
    }
    ShowgroupPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.refreshHandler);
                        if (!!this.group.public_group) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.groupService.loadGroupProfile(this.group._id)];
                    case 1:
                        profile = _a.sent();
                        this.group = profile[0];
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.groupService.loadPublicGroup(this.group._id)];
                    case 3:
                        profile = _a.sent();
                        this.group = profile[0];
                        _a.label = 4;
                    case 4:
                        this.setTag();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowgroupPage.prototype.setTag = function () {
        var _this = this;
        this.joinGroupTag = !this.userData.user.groups.find(function (group) { return group._id === _this.group._id; });
        console.log("join group", this.joinGroupTag);
    };
    ShowgroupPage.prototype.joinGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, _b, _c, alert_1, err_1;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.userData.user) return [3 /*break*/, 1];
                        this.modalCtrl.dismiss();
                        this.router.navigate(['/register', { slide: '0', message: 'To join a group, please sign in or create an account.', exitType: 'slide' }]);
                        return [3 /*break*/, 7];
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.userData.joinGroup(this.group)];
                    case 2:
                        data = _d.sent();
                        _b = (_a = this.chatService.socket).emit;
                        _c = ['enter conversation', this.group.conversation, this.userData.user._id];
                        return [4 /*yield*/, this.userData.checkRestExpired()];
                    case 3:
                        _b.apply(_a, _c.concat([((_d.sent()) ? { action: 'ping', state: 'online', origin: this.chatService.socket.id } : null)]));
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.userData.checkRestExpired()];
                                    case 1:
                                        if (_a.sent())
                                            this.chatService.socket.emit('online status', this.group.conversation, this.userData.user._id, { action: 'ping', state: 'online' });
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 1000);
                        if (data === "cancel")
                            return [2 /*return*/];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                message: 'You have joined ' + this.group.name + (this.group.board ? '. You can access its board posts via the Board page.' : '.'),
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () {
                                                _this.authService.refreshGroupStatus({ conversationId: _this.group.conversation, data: _this.group });
                                            });
                                        } }],
                                cssClass: 'level-15'
                            })];
                    case 4:
                        alert_1 = _d.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _d.sent();
                        this.noNetworkConnection();
                        console.log("failed to add to My Community");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ShowgroupPage.prototype.seeUserInfo = function (event, user) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userData.user)
                            return [2 /*return*/];
                        event.stopPropagation();
                        user.name = user.first_name + ' ' + user.last_name;
                        return [4 /*yield*/, this.modalCtrl.create({ component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_6__["ShowrecipientinfoPage"], componentProps: { recipient: user, modalPage: true } })];
                    case 1:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, recipientModal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowgroupPage.prototype.noNetworkConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
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
        });
    };
    ShowgroupPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshGroupStatus'].unsubscribe(this.refreshHandler);
    };
    ShowgroupPage.ctorParameters = function () { return [
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_5__["Groups"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ShowgroupPage.prototype, "group", void 0);
    ShowgroupPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-showgroup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./showgroup.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/showgroup/showgroup.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./showgroup.page.scss */ "./src/app/pages/group/showgroup/showgroup.page.scss")).default]
        }),
        __metadata("design:paramtypes", [ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_5__["Groups"]])
    ], ShowgroupPage);
    return ShowgroupPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~board-communityboard-communityboard-module~group-groupchat-groupchat-module~pages-main-tab-m~02576a4e.js.map