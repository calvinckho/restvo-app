(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["connect-videoconference-videoconference-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/videoconference/videoconference.page.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/videoconference/videoconference.page.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content *ngIf=\"!platform.is('mobileweb')\">\n  <div *ngIf=\"platform.is('cordova')\" style=\"height: 100%\">\n    <ion-grid style=\"height: 100%\" *ngIf=\"!userData.readyToControlVideoChat\">\n      <ion-row class=\"ion-justify-content-center ion-align-items-center\" style=\"height: 100%\">\n        <ion-spinner name=\"dots\"></ion-spinner>\n      </ion-row>\n    </ion-grid>\n    <ion-grid style=\"height: 100%\" *ngIf=\"userData.readyToControlVideoChat\">\n      <ion-row class=\"ion-justify-content-center ion-align-items-center\" style=\"height: 100%\">\n        <div>\n          <ion-row class=\"ion-justify-content-center\" style=\"margin-bottom: 50px\">\n            <ion-img class=\"login-logo\" src=\"assets/img/icon.png\"></ion-img>\n          </ion-row>\n          <ion-row class=\"ion-justify-content-center\">\n            <ion-button (click)=\"reload()\" fill=\"clear\">Join Video Session</ion-button>\n          </ion-row>\n          <ion-row class=\"ion-justify-content-center\" *ngIf=\"!authService.token\">\n            <ion-button (click)=\"goToHome()\" fill=\"clear\">Go to Home</ion-button>\n          </ion-row>\n        </div>\n      </ion-row>\n    </ion-grid>\n  </div>\n  <div *ngIf=\"!platform.is('cordova')\" style=\"height: 100%\">\n    <div id=\"videoConference\" *ngIf=\"!videoEnded\"></div>\n    <ion-grid style=\"height: 100%\" *ngIf=\"videoEnded\">\n      <ion-row class=\"ion-justify-content-center ion-align-items-center\" style=\"height: 100%\">\n        <ion-list>\n          <ion-row class=\"ion-justify-content-center ion-margin-bottom\">\n            <ion-label>Your Have Left the Video Session</ion-label>\n          </ion-row>\n          <ion-row class=\"ion-justify-content-center\">\n            <ion-button (click)=\"reload()\" fill=\"clear\">Rejoin Video Session</ion-button>\n          </ion-row>\n          <ion-row class=\"ion-justify-content-center\">\n            <ion-button (click)=\"goToHome()\" fill=\"clear\">Go to Home</ion-button>\n          </ion-row>\n        </ion-list>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n<ion-content *ngIf=\"platform.is('mobileweb')\">\n  <ion-grid style=\"height: 100%\">\n    <ion-row class=\"ion-justify-content-center ion-align-items-center\" style=\"height: 100%\">\n      <div>\n        <ion-row class=\"ion-justify-content-center\" style=\"margin-bottom: 50px\">\n          <ion-img class=\"login-logo\" src=\"assets/img/icon.png\"></ion-img>\n        </ion-row>\n        <ion-row class=\"ion-justify-content-center\" style=\"margin: 30px 10%\">\n          <ion-card-subtitle class=\"ion-text-center\">You need the Restvo mobile app to join this meeting on your phone.</ion-card-subtitle>\n        </ion-row>\n        <ion-row class=\"ion-justify-content-center\">\n          <ion-button *ngIf=\"platform.is('android')\" href=\"https://play.google.com/store/apps/details?id=com.restvo.app\">Download the app</ion-button>\n          <ion-button *ngIf=\"platform.is('ios')\" href=\"https://itunes.apple.com/us/app/restvo-connect-with-churches/id1365903479?ls=1&mt=8\">Download the app</ion-button>\n          <ion-button *ngIf=\"!platform.is('ios') && !platform.is('android')\" routerLink=\"https://restvo.com\">Download the app</ion-button>\n        </ion-row>\n        <ion-row class=\"ion-justify-content-center\">\n          <ion-button (click)=\"location.back()\" fill=\"clear\">Continue to the app</ion-button>\n        </ion-row>\n      </div>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/connect/videoconference/videoconference-routing.module.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/pages/connect/videoconference/videoconference-routing.module.ts ***!
  \*********************************************************************************/
/*! exports provided: VideoconferencePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoconferencePageRoutingModule", function() { return VideoconferencePageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _videoconference_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./videoconference.page */ "./src/app/pages/connect/videoconference/videoconference.page.ts");
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
        component: _videoconference_page__WEBPACK_IMPORTED_MODULE_2__["VideoconferencePage"]
    }
];
var VideoconferencePageRoutingModule = /** @class */ (function () {
    function VideoconferencePageRoutingModule() {
    }
    VideoconferencePageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], VideoconferencePageRoutingModule);
    return VideoconferencePageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/connect/videoconference/videoconference.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/pages/connect/videoconference/videoconference.module.ts ***!
  \*************************************************************************/
/*! exports provided: VideoconferencePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoconferencePageModule", function() { return VideoconferencePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _videoconference_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./videoconference-routing.module */ "./src/app/pages/connect/videoconference/videoconference-routing.module.ts");
/* harmony import */ var _videoconference_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./videoconference.page */ "./src/app/pages/connect/videoconference/videoconference.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var VideoconferencePageModule = /** @class */ (function () {
    function VideoconferencePageModule() {
    }
    VideoconferencePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _videoconference_routing_module__WEBPACK_IMPORTED_MODULE_4__["VideoconferencePageRoutingModule"]
            ],
            declarations: [_videoconference_page__WEBPACK_IMPORTED_MODULE_5__["VideoconferencePage"]]
        })
    ], VideoconferencePageModule);
    return VideoconferencePageModule;
}());



/***/ }),

/***/ "./src/app/pages/connect/videoconference/videoconference.page.scss":
/*!*************************************************************************!*\
  !*** ./src/app/pages/connect/videoconference/videoconference.page.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-videoconference #videoConference {\n  background-color: var(--ion-color-secondary);\n  border: none;\n  height: 100%;\n}\napp-videoconference .login-logo {\n  max-width: 25%;\n  margin: 0 auto;\n}\napp-videoconference .welcome-name {\n  font-size: 20px;\n  margin: 2% auto 0 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2Nvbm5lY3QvdmlkZW9jb25mZXJlbmNlL3ZpZGVvY29uZmVyZW5jZS5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2Nvbm5lY3QvdmlkZW9jb25mZXJlbmNlL3ZpZGVvY29uZmVyZW5jZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0U7RUFDRSw0Q0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FDQUo7QURHRTtFQUNFLGNBQUE7RUFDQSxjQUFBO0FDREo7QURJRTtFQUNFLGVBQUE7RUFFQSxzQkFBQTtBQ0hKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvY29ubmVjdC92aWRlb2NvbmZlcmVuY2UvdmlkZW9jb25mZXJlbmNlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC12aWRlb2NvbmZlcmVuY2Uge1xuICAjdmlkZW9Db25mZXJlbmNlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG5cbiAgLmxvZ2luLWxvZ28ge1xuICAgIG1heC13aWR0aDogMjUlO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG5cbiAgLndlbGNvbWUtbmFtZSB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIC8vY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICAgIG1hcmdpbjogMiUgYXV0byAwIGF1dG87XG4gIH1cbn1cbiIsImFwcC12aWRlb2NvbmZlcmVuY2UgI3ZpZGVvQ29uZmVyZW5jZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGhlaWdodDogMTAwJTtcbn1cbmFwcC12aWRlb2NvbmZlcmVuY2UgLmxvZ2luLWxvZ28ge1xuICBtYXgtd2lkdGg6IDI1JTtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5hcHAtdmlkZW9jb25mZXJlbmNlIC53ZWxjb21lLW5hbWUge1xuICBmb250LXNpemU6IDIwcHg7XG4gIG1hcmdpbjogMiUgYXV0byAwIGF1dG87XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/connect/videoconference/videoconference.page.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/connect/videoconference/videoconference.page.ts ***!
  \***********************************************************************/
/*! exports provided: VideoconferencePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoconferencePage", function() { return VideoconferencePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scriptjs */ "./node_modules/scriptjs/dist/script.js");
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(scriptjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
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










var Jitsi = _capacitor_core__WEBPACK_IMPORTED_MODULE_9__["Plugins"].Jitsi;
var VideoconferencePage = /** @class */ (function () {
    function VideoconferencePage(platform, location, router, menuCtrl, route, resourceService, authService, userData, chatService) {
        var _this = this;
        this.platform = platform;
        this.location = location;
        this.router = router;
        this.menuCtrl = menuCtrl;
        this.route = route;
        this.resourceService = resourceService;
        this.authService = authService;
        this.userData = userData;
        this.chatService = chatService;
        this.videoChatRoomSubject = ' ';
        this.channelLastN = '6'; // only the last 6 active dominate speakers' stream will be sent
        this.startWithAudioMuted = false;
        this.startWithVideoMuted = false;
        this.subscriptions = {};
        this.jitsi = {};
        this.videoEnded = false;
        this.userLoadedHander = function () {
            if (_this.userData.user && _this.authService.token && !_this.platform.is('cordova') && !_this.userData.videoChatRoomId && _this.userData.readyToControlVideoChat) {
                _this.initializeVideoConference();
            }
        };
        this.onJitsiLoaded = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('loaded Jitsi');
                        this.userData.readyToControlVideoChat = true;
                        this.userData.videoChatRoomId = this.videoChatRoomId;
                        if (!!this.platform.is('cordova')) return [3 /*break*/, 3];
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (this.userData && this.userData.user) {
                                    this.jitsi.executeCommand('displayName', this.userData.user.first_name + ' ' + this.userData.user.last_name);
                                }
                                if (this.userData && this.userData.user && this.userData.user.avatar) {
                                    this.jitsi.executeCommand('avatarUrl', this.userData.user.avatar);
                                }
                                this.jitsi.executeCommand('subject', (this.videoChatRoomSubject || ' '));
                                this.jitsi.on('readyToClose', this.onJitsiUnloaded);
                                return [2 /*return*/];
                            });
                        }); }, 1000);
                        _a = this.authService.token;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.checkRestExpired()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            this.chatService.socket.emit('online status', this.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'online', origin: this.chatService.socket.id, videoChatRoomId: this.videoChatRoomId });
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.onJitsiUnloaded = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('unloading Jitsi');
                        this.userData.readyToControlVideoChat = true;
                        _a = this.authService.token;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.checkRestExpired()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            this.chatService.socket.emit('online status', this.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'leave video chat', origin: this.chatService.socket.id, videoChatRoomId: this.videoChatRoomId });
                        }
                        this.userData.videoChatRoomId = '';
                        if (!this.platform.is('cordova')) return [3 /*break*/, 3];
                        window.removeEventListener('onConferenceJoined', this.onJitsiLoaded);
                        window.removeEventListener('onConferenceLeft', this.onJitsiUnloaded);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.jitsi.dispose()];
                    case 4:
                        _b.sent();
                        // @ts-ignore
                        $("#videoConference").empty();
                        this.videoEnded = true;
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    VideoconferencePage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.authService.cachedRouteParams = this.route.snapshot.params;
                this.videoChatRoomId = this.route.snapshot.paramMap.get('id');
                this.videoChatRoomSubject = this.route.snapshot.paramMap.get('videoChatRoomSubject') || this.videoChatRoomSubject;
                this.channelLastN = this.route.snapshot.paramMap.get('channelLastN') || this.channelLastN;
                this.startWithAudioMuted = this.route.snapshot.paramMap.get('startWithAudioMuted') === 'true';
                this.startWithVideoMuted = this.route.snapshot.paramMap.get('startWithVideoMuted') === 'true';
                this.subscriptions['userLoaded'] = this.userData.refreshUserStatus$.subscribe(this.userLoadedHander);
                return [2 /*return*/];
            });
        });
    };
    VideoconferencePage.prototype.ionViewWillEnter = function () {
        if (!this.router.url.includes('app/video') && !this.platform.is('cordova') && !this.userData.videoChatRoomId && this.userData.readyToControlVideoChat) {
            this.initializeVideoConference();
        }
    };
    VideoconferencePage.prototype.initializeVideoConference = function () {
        return __awaiter(this, void 0, void 0, function () {
            var videoEndpoint;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.userData.readyToControlVideoChat = false;
                        setTimeout(function () {
                            _this.userData.readyToControlVideoChat = true;
                        }, this.platform.is('cordova') ? 2000 : 10000); // default video chat load timeout = 2 sec for mobile plugin, 10s for desktop. it needs shorter load time because TODO: onJitsiUnloaded is not working on mobile plugin so needs to manually readyToControlVideoChat to true after 2 sec
                        return [4 /*yield*/, this.resourceService.assignVideoEndpoint(this.videoChatRoomId)];
                    case 1:
                        videoEndpoint = _a.sent();
                        if (!this.platform.is('cordova')) return [3 /*break*/, 3];
                        return [4 /*yield*/, Jitsi.joinConference({
                                roomName: this.videoChatRoomId,
                                url: videoEndpoint.ssl + videoEndpoint.url,
                                channelLastN: this.channelLastN,
                                startWithAudioMuted: this.startWithAudioMuted,
                                startWithVideoMuted: this.startWithVideoMuted
                            })];
                    case 2:
                        _a.sent();
                        window.addEventListener('onConferenceJoined', this.onJitsiLoaded);
                        window.addEventListener('onConferenceLeft', this.onJitsiUnloaded);
                        return [3 /*break*/, 4];
                    case 3:
                        if (!this.platform.is('mobileweb')) { // desktop app
                            Object(scriptjs__WEBPACK_IMPORTED_MODULE_2__["get"])('https://meet.jit.si/external_api.js', function () {
                                var domain = videoEndpoint.url;
                                var options = {
                                    roomName: _this.videoChatRoomId,
                                    width: '100%',
                                    height: '100%',
                                    parentNode: document.querySelector('#videoConference'),
                                    configOverwrite: {
                                        channelLastN: parseInt(_this.channelLastN || '-1', 10),
                                        startWithAudioMuted: _this.startWithAudioMuted,
                                        startWithVideoMuted: _this.startWithVideoMuted,
                                        externalConnectUrl: 'https://app.restvo.com/video/' + _this.videoChatRoomId
                                    },
                                    interfaceConfigOverwrite: {
                                        APP_NAME: 'Restvo Video',
                                        NATIVE_APP_NAME: 'Restvo',
                                        SHOW_JITSI_WATERMARK: false,
                                        SHOW_BRAND_WATERMARK: true,
                                        BRAND_WATERMARK_LINK: 'https://wee.nyc3.cdn.digitaloceanspaces.com/app/icon_email.png',
                                        DEFAULT_REMOTE_DISPLAY_NAME: 'Restvo friend',
                                        ENABLE_FEEDBACK_ANIMATION: false,
                                        TOOLBAR_BUTTONS: [
                                            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                                            'fodeviceselection', 'hangup', 'profile', 'info', 'recording',
                                            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                                            'videoquality', 'filmstrip', 'invite', 'stats', 'shortcuts',
                                            'tileview'
                                        ],
                                        MOBILE_APP_PROMO: false
                                    },
                                    onload: _this.onJitsiLoaded()
                                };
                                _this.jitsi = new JitsiMeetExternalAPI(domain, options);
                            });
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VideoconferencePage.prototype.reload = function () {
        if (this.platform.is('cordova') && !this.userData.videoChatRoomId && this.userData.readyToControlVideoChat) {
            this.initializeVideoConference();
        }
        else {
            window.location.reload();
        }
    };
    VideoconferencePage.prototype.goToHome = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.menuCtrl.enable(this.userData.user)];
                    case 1:
                        _a.sent();
                        this.router.navigateByUrl('/activity/5d5785b462489003817fee18');
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoconferencePage.prototype.ngOnDestroy = function () {
        this.subscriptions['userLoaded'].unsubscribe(this.userLoadedHander);
    };
    VideoconferencePage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["MenuController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_1__["Resource"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('videoConference', { static: false }),
        __metadata("design:type", Object)
    ], VideoconferencePage.prototype, "videoConference", void 0);
    VideoconferencePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-videoconference',
            template: __importDefault(__webpack_require__(/*! raw-loader!./videoconference.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/videoconference/videoconference.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./videoconference.page.scss */ "./src/app/pages/connect/videoconference/videoconference.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["MenuController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_1__["Resource"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"]])
    ], VideoconferencePage);
    return VideoconferencePage;
}());



/***/ })

}]);
//# sourceMappingURL=connect-videoconference-videoconference-module.js.map