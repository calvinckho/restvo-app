(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~feature-insight-feature-insight-module~feature-manage-managefeature-module~pages-main-tab-ma~0fd01f8f"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/feature-insight/feature-insight.page.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/feature-insight/feature-insight.page.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Insight</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-toolbar>\n    <ion-item>\n      <ion-label [hidden]=\"true\">Filter by Program</ion-label>\n      <ion-select [(ngModel)]=\"selectedProgramId\" slot=\"end\" placeholder=\"Show All\">\n        <ion-select-option value='all'>Show All</ion-select-option>\n        <ion-select-option *ngFor=\"let program of listOfPrograms\" [value]=\"program._id\" [class.selected]=\"selectedProgramId === program._id\">{{program.name}}</ion-select-option>\n      </ion-select>\n    </ion-item>\n  </ion-toolbar>\n  <ion-list>  <!--*ngIf=\"platform.width() > 768\"-->\n    <ion-item [ngStyle]=\"{'font-size': platform.width() < 400 ? '11px' : '14px'}\">\n      <div class=\"column column-label\" (click)=\"sortDisplay('participant')\">{{participantsLabel}}</div>\n      <div class=\"column column-label\" (click)=\"sortDisplay('leader')\">{{leadersLabel}}</div>\n      <div class=\"column column-label\" (click)=\"sortDisplay('program')\">Program</div>\n      <div class=\"progress column-label ion-no-margin\" slot=\"end\" (click)=\"sortDisplay('progress')\">Progress</div>\n      <div class=\"last-date column-label ion-no-margin\" slot=\"end\" (click)=\"sortDisplay('lastDate')\">Last Check-in</div>\n    </ion-item>\n    <ion-item *ngFor=\"let relationship of relationshipCompletion\" (click)=\"openProgram($event, relationship)\" [hidden]=\"selectedProgramId && ![relationship.program._id, 'all'].includes(selectedProgramId)\">\n      <div *ngFor=\"let participant of relationship.participants | slice : 0 : 1\" (click)=\"seeUserInfo($event, relationship.participants[0])\" class=\"column\">\n        <ion-avatar class=\"insight-person-avatar\">\n          <img class=\"response-user-img\" *ngIf=\"participant.avatar\" [src]=\"participant.avatar\"/>\n          <img class=\"response-user-img\" *ngIf=\"!participant.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n        </ion-avatar>\n        <ion-label class=\"insight-person-label ion-text-center ion-text-wrap\">{{participant.first_name}} {{participant.last_name}}</ion-label>\n      </div>\n      <div *ngFor=\"let leader of relationship.leaders | slice : 0 : 1\" (click)=\"seeUserInfo($event, relationship.leaders[0])\" class=\"column\">\n        <ion-avatar class=\"insight-person-avatar\">\n          <img class=\"response-user-img\" *ngIf=\"leader.avatar\" [src]=\"leader.avatar\"/>\n          <img class=\"response-user-img\" *ngIf=\"!leader.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n        </ion-avatar>\n        <ion-label class=\"insight-person-label ion-text-center ion-text-wrap\">{{leader.first_name}} {{leader.last_name}}</ion-label>\n      </div>\n      <div class=\"column\">\n        <ion-label class=\"insight-person-label ion-text-center ion-text-wrap\">{{relationship.program.name}}</ion-label>\n      </div>\n      <ion-progress-bar class=\"progress ion-no-margin\" [value]=\"relationship.completed_count/relationship.content_calendar_count\" [buffer]=\"relationship.past_due_count/relationship.content_calendar_count\" slot=\"end\"></ion-progress-bar>\n      <div class=\"last-date small-font ion-text-wrap ion-no-margin\" slot=\"end\">{{relationship.last_response_date | datetime: 'm:n,d:n,y:n'}}</div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/feature/manage/feature-insight/feature-insight.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-insight/feature-insight.module.ts ***!
  \********************************************************************************/
/*! exports provided: FeatureInsightPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureInsightPageModule", function() { return FeatureInsightPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _feature_insight_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./feature-insight.page */ "./src/app/pages/feature/manage/feature-insight/feature-insight.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
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
        component: _feature_insight_page__WEBPACK_IMPORTED_MODULE_5__["FeatureInsightPage"]
    }
];
var FeatureInsightPageModule = /** @class */ (function () {
    function FeatureInsightPageModule() {
    }
    FeatureInsightPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_feature_insight_page__WEBPACK_IMPORTED_MODULE_5__["FeatureInsightPage"]]
        })
    ], FeatureInsightPageModule);
    return FeatureInsightPageModule;
}());



/***/ }),

/***/ "./src/app/pages/feature/manage/feature-insight/feature-insight.page.scss":
/*!********************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-insight/feature-insight.page.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-feature-insight .column-label {\n  text-align: center;\n}\napp-feature-insight .column {\n  width: 100px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\napp-feature-insight .column .insight-person-avatar {\n  margin: 0 auto;\n}\napp-feature-insight .column .insight-person-label {\n  margin: 5px auto 0 auto;\n  color: grey;\n  font-size: 12px;\n}\napp-feature-insight .program {\n  width: 12%;\n  text-align: center;\n}\napp-feature-insight .progress {\n  text-align: center;\n  width: 20%;\n}\napp-feature-insight .last-date {\n  text-align: center;\n  width: 18%;\n}\napp-feature-insight .small-font {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2ZlYXR1cmUvbWFuYWdlL2ZlYXR1cmUtaW5zaWdodC9mZWF0dXJlLWluc2lnaHQucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9mZWF0dXJlL21hbmFnZS9mZWF0dXJlLWluc2lnaHQvZmVhdHVyZS1pbnNpZ2h0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLGtCQUFBO0FDREo7QURJRTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FDRko7QURJSTtFQUNFLGNBQUE7QUNGTjtBREtJO0VBQ0UsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtBQ0hOO0FET0U7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7QUNMSjtBRFFFO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0FDTko7QURTRTtFQUVFLGtCQUFBO0VBQ0EsVUFBQTtBQ1JKO0FEV0U7RUFDRSxlQUFBO0FDVEoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9mZWF0dXJlL21hbmFnZS9mZWF0dXJlLWluc2lnaHQvZmVhdHVyZS1pbnNpZ2h0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1mZWF0dXJlLWluc2lnaHQge1xuXG4gIC5jb2x1bW4tbGFiZWwge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5jb2x1bW4ge1xuICAgIHdpZHRoOiAxMDBweDtcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcblxuICAgIC5pbnNpZ2h0LXBlcnNvbi1hdmF0YXIge1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxuXG4gICAgLmluc2lnaHQtcGVyc29uLWxhYmVsIHtcbiAgICAgIG1hcmdpbjogNXB4IGF1dG8gMCBhdXRvO1xuICAgICAgY29sb3I6IGdyZXk7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxuICB9XG5cbiAgLnByb2dyYW0ge1xuICAgIHdpZHRoOiAxMiU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLnByb2dyZXNzIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgd2lkdGg6IDIwJTsgLy8gMzIlXG4gIH1cblxuICAubGFzdC1kYXRlIHtcbiAgICAvL2NvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHdpZHRoOiAxOCU7XG4gIH1cblxuICAuc21hbGwtZm9udCB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICB9XG59IiwiYXBwLWZlYXR1cmUtaW5zaWdodCAuY29sdW1uLWxhYmVsIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuYXBwLWZlYXR1cmUtaW5zaWdodCAuY29sdW1uIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5hcHAtZmVhdHVyZS1pbnNpZ2h0IC5jb2x1bW4gLmluc2lnaHQtcGVyc29uLWF2YXRhciB7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuYXBwLWZlYXR1cmUtaW5zaWdodCAuY29sdW1uIC5pbnNpZ2h0LXBlcnNvbi1sYWJlbCB7XG4gIG1hcmdpbjogNXB4IGF1dG8gMCBhdXRvO1xuICBjb2xvcjogZ3JleTtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuYXBwLWZlYXR1cmUtaW5zaWdodCAucHJvZ3JhbSB7XG4gIHdpZHRoOiAxMiU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmFwcC1mZWF0dXJlLWluc2lnaHQgLnByb2dyZXNzIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMjAlO1xufVxuYXBwLWZlYXR1cmUtaW5zaWdodCAubGFzdC1kYXRlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTglO1xufVxuYXBwLWZlYXR1cmUtaW5zaWdodCAuc21hbGwtZm9udCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/feature/manage/feature-insight/feature-insight.page.ts":
/*!******************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-insight/feature-insight.page.ts ***!
  \******************************************************************************/
/*! exports provided: FeatureInsightPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureInsightPage", function() { return FeatureInsightPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/badge/ngx */ "./node_modules/@ionic-native/badge/ngx/index.js");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/service-worker */ "./node_modules/@angular/service-worker/fesm5/service-worker.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_network_service_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../services/network-service.service */ "./src/app/services/network-service.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _services_response_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../services/response.service */ "./src/app/services/response.service.ts");
/* harmony import */ var _services_map_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../services/map.service */ "./src/app/services/map.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_calendar_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../services/calendar.service */ "./src/app/services/calendar.service.ts");
/* harmony import */ var _showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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



















var FeatureInsightPage = /** @class */ (function (_super) {
    __extends(FeatureInsightPage, _super);
    function FeatureInsightPage(zone, location, storage, electronService, badge, swUpdate, route, router, cache, platform, alertCtrl, actionSheetCtrl, loadingCtrl, modalCtrl, pickerCtrl, networkService, chatService, userData, authService, mapService, momentService, resourceService, responseService, calendarService) {
        var _this = _super.call(this, zone, location, storage, electronService, badge, swUpdate, route, router, cache, platform, alertCtrl, actionSheetCtrl, loadingCtrl, modalCtrl, pickerCtrl, networkService, chatService, userData, authService, mapService, momentService, resourceService, responseService, calendarService) || this;
        _this.zone = zone;
        _this.location = location;
        _this.storage = storage;
        _this.electronService = electronService;
        _this.badge = badge;
        _this.swUpdate = swUpdate;
        _this.route = route;
        _this.router = router;
        _this.cache = cache;
        _this.platform = platform;
        _this.alertCtrl = alertCtrl;
        _this.actionSheetCtrl = actionSheetCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.modalCtrl = modalCtrl;
        _this.pickerCtrl = pickerCtrl;
        _this.networkService = networkService;
        _this.chatService = chatService;
        _this.userData = userData;
        _this.authService = authService;
        _this.mapService = mapService;
        _this.momentService = momentService;
        _this.resourceService = resourceService;
        _this.responseService = responseService;
        _this.calendarService = calendarService;
        _this.participantAscending = true;
        _this.leaderAscending = true;
        _this.programAscending = true;
        _this.progressAscending = false;
        _this.lastActivityAscending = false;
        _this.listOfPrograms = [];
        // for current user refreshing the app
        _this.loadAndProcessMomentHandler = function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // data.type - 'change aux data' or null or others. In all cases, reload moment and redo permission
                // ready to check authentication status
                this.loadInsight();
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    FeatureInsightPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.ngOnInit.call(this);
                        if (!(this.authService.token && this.userData.user)) return [3 /*break*/, 2];
                        if (!this.moment._id) { // angular router may not have moment._id ready yet
                            this.moment._id = this.route.snapshot.paramMap.get('id');
                        }
                        return [4 /*yield*/, this.loadInsight()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FeatureInsightPage.prototype.loadInsight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, objects_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.moment._id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.momentService.loadProgramInsight(this.moment._id)];
                    case 1:
                        results = _a.sent();
                        if (results && results.relationship_completion) {
                            this.relationshipCompletion = results.relationship_completion;
                            objects_1 = {};
                            this.listOfPrograms = this.relationshipCompletion.map(function (c) { return c.program; }).filter(function (program) {
                                if (objects_1[program._id]) {
                                    return false;
                                }
                                objects_1[program._id] = true;
                                return true;
                            });
                            console.log("list", this.listOfPrograms);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FeatureInsightPage.prototype.sortDisplay = function (type) {
        if (type === 'participant') {
            this.participantAscending = !this.participantAscending;
            var reverseOrder_1 = this.participantAscending;
            this.relationshipCompletion.sort(function (a, b) {
                if (a.participants[0].first_name < b.participants[0].first_name) {
                    return reverseOrder_1 ? -1 : 1;
                }
                if (a.participants[0].first_name > b.participants[0].first_name) {
                    return reverseOrder_1 ? 1 : -1;
                }
            });
        }
        else if (type === 'leader') {
            this.leaderAscending = !this.leaderAscending;
            var reverseOrder_2 = this.leaderAscending;
            this.relationshipCompletion.sort(function (a, b) {
                if (a.leaders[0].first_name < b.leaders[0].first_name) {
                    return reverseOrder_2 ? -1 : 1;
                }
                if (a.leaders[0].first_name > b.leaders[0].first_name) {
                    return reverseOrder_2 ? 1 : -1;
                }
            });
        }
        else if (type === 'program') {
            this.programAscending = !this.programAscending;
            var reverseOrder_3 = this.programAscending;
            this.relationshipCompletion.sort(function (a, b) {
                if (a.program.name < b.program.name) {
                    return reverseOrder_3 ? -1 : 1;
                }
                if (a.program.name > b.program.name) {
                    return reverseOrder_3 ? 1 : -1;
                }
            });
        }
        else if (type === 'progress') {
            this.progressAscending = !this.progressAscending;
            var reverseOrder_4 = this.progressAscending;
            this.relationshipCompletion.sort(function (a, b) {
                var c = a.completed_count / a.content_calendar_count;
                var d = b.completed_count / b.content_calendar_count;
                return (reverseOrder_4 ? 1 : -1) * (d - c);
            });
        }
        else if (type === 'lastDate') {
            this.lastActivityAscending = !this.lastActivityAscending;
            var reverseOrder_5 = this.lastActivityAscending;
            this.relationshipCompletion.sort(function (a, b) {
                var c = new Date(a.last_response_date);
                var d = new Date(b.last_response_date);
                return (reverseOrder_5 ? 1 : -1) * (d - c);
            });
        }
    };
    FeatureInsightPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    FeatureInsightPage.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] },
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_5__["ElectronService"] },
        { type: _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_6__["Badge"] },
        { type: _angular_service_worker__WEBPACK_IMPORTED_MODULE_7__["SwUpdate"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_9__["CacheService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["PickerController"] },
        { type: _services_network_service_service__WEBPACK_IMPORTED_MODULE_11__["NetworkService"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_16__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_10__["UserData"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_15__["Auth"] },
        { type: _services_map_service__WEBPACK_IMPORTED_MODULE_14__["MapService"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_2__["Moment"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_12__["Resource"] },
        { type: _services_response_service__WEBPACK_IMPORTED_MODULE_13__["Response"] },
        { type: _services_calendar_service__WEBPACK_IMPORTED_MODULE_17__["CalendarService"] }
    ]; };
    FeatureInsightPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feature-insight',
            template: __importDefault(__webpack_require__(/*! raw-loader!./feature-insight.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/feature-insight/feature-insight.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./feature-insight.page.scss */ "./src/app/pages/feature/manage/feature-insight/feature-insight.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
            ngx_electron__WEBPACK_IMPORTED_MODULE_5__["ElectronService"],
            _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_6__["Badge"],
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_7__["SwUpdate"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_9__["CacheService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["PickerController"],
            _services_network_service_service__WEBPACK_IMPORTED_MODULE_11__["NetworkService"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_16__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_10__["UserData"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_15__["Auth"],
            _services_map_service__WEBPACK_IMPORTED_MODULE_14__["MapService"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_2__["Moment"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_12__["Resource"],
            _services_response_service__WEBPACK_IMPORTED_MODULE_13__["Response"],
            _services_calendar_service__WEBPACK_IMPORTED_MODULE_17__["CalendarService"]])
    ], FeatureInsightPage);
    return FeatureInsightPage;
}(_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_18__["ShowfeaturePage"]));



/***/ })

}]);
//# sourceMappingURL=default~feature-insight-feature-insight-module~feature-manage-managefeature-module~pages-main-tab-ma~0fd01f8f.js.map