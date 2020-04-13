(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-main-tab-main-tab-module"],{

/***/ "./node_modules/capacitor-jitsi-meet/dist/esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/capacitor-jitsi-meet/dist/esm/index.js ***!
  \*************************************************************/
/*! exports provided: JitsiWeb, Jitsi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web */ "./node_modules/capacitor-jitsi-meet/dist/esm/web.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JitsiWeb", function() { return _web__WEBPACK_IMPORTED_MODULE_0__["JitsiWeb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Jitsi", function() { return _web__WEBPACK_IMPORTED_MODULE_0__["Jitsi"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/capacitor-jitsi-meet/dist/esm/web.js":
/*!***********************************************************!*\
  !*** ./node_modules/capacitor-jitsi-meet/dist/esm/web.js ***!
  \***********************************************************/
/*! exports provided: JitsiWeb, Jitsi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JitsiWeb", function() { return JitsiWeb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Jitsi", function() { return Jitsi; });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class JitsiWeb extends _capacitor_core__WEBPACK_IMPORTED_MODULE_0__["WebPlugin"] {
    constructor() {
        super({
            name: 'Jitsi',
            platforms: ['web']
        });
    }
    joinConference(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('join conference', options);
            return options;
        });
    }
}
const Jitsi = new JitsiWeb();

//# sourceMappingURL=web.js.map

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/customreminder-popover/customreminder-popover.page.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/customreminder-popover/customreminder-popover.page.html ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n  <ion-title>Reminder Setting</ion-title>\n  <ion-list>\n    <ion-item no-lines class=\"centered\">\n      <ion-input style=\"width: 20%\" slot=\"start\" [(ngModel)]=\"timeValue\" placeholder=\"10\"></ion-input>\n      <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" style=\"width: 80%\" slot=\"end\" interface=\"popover\" [(ngModel)]=\"timeUnit\">\n        <ion-select-option value=\"m\">min<span *ngIf=\"timeValue > 1\">s</span> before</ion-select-option>\n        <ion-select-option value=\"h\">hour<span *ngIf=\"timeValue > 1\">s</span>  before</ion-select-option>\n        <ion-select-option value=\"d\">day<span *ngIf=\"timeValue > 1\">s</span>  before</ion-select-option>\n        <ion-select-option value=\"w\">week<span *ngIf=\"timeValue > 1\">s</span>  before</ion-select-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n  <ion-button color=\"primary\" expand=\"block\" shape=\"round\" (click)=\"close()\">Done</ion-button>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/main-tab/main-tab.page.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/main-tab/main-tab.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-tabs [hidden]=\"!userData || !userData.user\">\n  <div id=\"videoSpace\"></div>\n  <ion-tab-bar slot=\"bottom\" *ngIf=\"platform.width() < 768\">\n    <ion-tab-button tab=\"discover\" *ngIf=\"!userData.defaultProgram\" [ngClass]=\"{'tab-selected': router.url.includes('discover')}\">\n      <ion-icon ios=\"people-sharp\" md=\"people-sharp\"></ion-icon>\n    </ion-tab-button>\n    <ion-tab-button [tab]=\"'dashboard/insight/' + userData.defaultProgram._id\" *ngIf=\"userData.defaultProgram && userData.UIAdminMode && (userData.defaultProgram.user_list_2.includes(userData.user._id) || userData.defaultProgram.user_list_3.includes(userData.user._id))\"  [ngClass]=\"{'tab-selected': router.url.includes('dashboard')}\">\n      <ion-icon ios=\"people-sharp\" md=\"people-sharp\"></ion-icon>\n    </ion-tab-button>\n    <ion-tab-button [tab]=\"'discover/home/' + userData.defaultProgram._id\" *ngIf=\"userData.defaultProgram && (!userData.UIAdminMode || ((!userData.defaultProgram.user_list_2 || !userData.defaultProgram.user_list_2.includes(userData.user._id)) && (!userData.defaultProgram.user_list_3 || !userData.defaultProgram.user_list_3.includes(userData.user._id))))\"  [ngClass]=\"{'tab-selected': router.url.includes('discover')}\">\n      <ion-icon ios=\"people-sharp\" md=\"people-sharp\"></ion-icon>\n    </ion-tab-button>\n    <ion-tab-button tab=\"news\" *ngIf=\"!userData.UIAdminMode\">\n      <ion-icon name=\"newspaper\"></ion-icon>\n    </ion-tab-button>\n    <ion-tab-button tab=\"myconversations\">\n      <ion-badge *ngIf=\"chatService && chatService.connectTabBadge\" mode=\"md\">{{chatService.connectTabBadge}}</ion-badge>\n      <ion-icon name=\"chatbox\"></ion-icon>\n    </ion-tab-button>\n    <ion-tab-button tab=\"me\">\n      <ion-icon ios=\"person-sharp\" md=\"person-sharp\"></ion-icon>\n    </ion-tab-button>\n  </ion-tab-bar>\n</ion-tabs>\n");

/***/ }),

/***/ "./src/app/pages/board/editboardpost/editboardpost.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/board/editboardpost/editboardpost.module.ts ***!
  \*******************************************************************/
/*! exports provided: EditboardpostPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditboardpostPageModule", function() { return EditboardpostPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _editboardpost_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editboardpost.page */ "./src/app/pages/board/editboardpost/editboardpost.page.ts");
/* harmony import */ var ngx_autosize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-autosize */ "./node_modules/ngx-autosize/fesm5/ngx-autosize.js");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var ngx_plyr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-plyr */ "./node_modules/ngx-plyr/fesm5/ngx-plyr.js");
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
        component: _editboardpost_page__WEBPACK_IMPORTED_MODULE_5__["EditboardpostPage"]
    }
];
var EditboardpostPageModule = /** @class */ (function () {
    function EditboardpostPageModule() {
    }
    EditboardpostPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                ngx_autosize__WEBPACK_IMPORTED_MODULE_6__["AutosizeModule"],
                ngx_plyr__WEBPACK_IMPORTED_MODULE_8__["PlyrModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_7__["ApplicationPipesModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_editboardpost_page__WEBPACK_IMPORTED_MODULE_5__["EditboardpostPage"]]
        })
    ], EditboardpostPageModule);
    return EditboardpostPageModule;
}());



/***/ }),

/***/ "./src/app/pages/board/groupboard/groupboard.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/board/groupboard/groupboard.module.ts ***!
  \*************************************************************/
/*! exports provided: GroupboardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupboardPageModule", function() { return GroupboardPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_plyr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-plyr */ "./node_modules/ngx-plyr/fesm5/ngx-plyr.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _groupboard_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./groupboard.page */ "./src/app/pages/board/groupboard/groupboard.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var _group_editgroupmember_editgroupmember_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../group/editgroupmember/editgroupmember.module */ "./src/app/pages/group/editgroupmember/editgroupmember.module.ts");
/* harmony import */ var _connect_focus_photo_focus_photo_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../connect/focus-photo/focus-photo.module */ "./src/app/pages/connect/focus-photo/focus-photo.module.ts");
/* harmony import */ var _feature_pickfeature_popover_pickfeature_popover_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../feature/pickfeature-popover/pickfeature-popover.module */ "./src/app/pages/feature/pickfeature-popover/pickfeature-popover.module.ts");
/* harmony import */ var _feature_showfeature_showfeature_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.module */ "./src/app/pages/feature/showfeature/showfeature.module.ts");
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
        component: _groupboard_page__WEBPACK_IMPORTED_MODULE_6__["GroupboardPage"]
    }
];
var GroupboardPageModule = /** @class */ (function () {
    function GroupboardPageModule() {
    }
    GroupboardPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_7__["ApplicationPipesModule"],
                ngx_plyr__WEBPACK_IMPORTED_MODULE_4__["PlyrModule"],
                _feature_pickfeature_popover_pickfeature_popover_module__WEBPACK_IMPORTED_MODULE_10__["PickfeaturePopoverPageModule"],
                _feature_showfeature_showfeature_module__WEBPACK_IMPORTED_MODULE_11__["ShowfeaturePageModule"],
                _connect_focus_photo_focus_photo_module__WEBPACK_IMPORTED_MODULE_9__["FocusPhotoPageModule"],
                _group_editgroupmember_editgroupmember_module__WEBPACK_IMPORTED_MODULE_8__["EditgroupmemberPageModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_groupboard_page__WEBPACK_IMPORTED_MODULE_6__["GroupboardPage"]]
        })
    ], GroupboardPageModule);
    return GroupboardPageModule;
}());



/***/ }),

/***/ "./src/app/pages/board/showboardpost/showboardpost.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/board/showboardpost/showboardpost.module.ts ***!
  \*******************************************************************/
/*! exports provided: ShowboardpostPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowboardpostPageModule", function() { return ShowboardpostPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _showboardpost_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./showboardpost.page */ "./src/app/pages/board/showboardpost/showboardpost.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var _editboardpost_editboardpost_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editboardpost/editboardpost.module */ "./src/app/pages/board/editboardpost/editboardpost.module.ts");
/* harmony import */ var ngx_autosize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-autosize */ "./node_modules/ngx-autosize/fesm5/ngx-autosize.js");
/* harmony import */ var ngx_plyr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-plyr */ "./node_modules/ngx-plyr/fesm5/ngx-plyr.js");
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
        component: _showboardpost_page__WEBPACK_IMPORTED_MODULE_5__["ShowboardpostPage"]
    }
];
var ShowboardpostPageModule = /** @class */ (function () {
    function ShowboardpostPageModule() {
    }
    ShowboardpostPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                ngx_autosize__WEBPACK_IMPORTED_MODULE_8__["AutosizeModule"],
                ngx_plyr__WEBPACK_IMPORTED_MODULE_9__["PlyrModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _editboardpost_editboardpost_module__WEBPACK_IMPORTED_MODULE_7__["EditboardpostPageModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_showboardpost_page__WEBPACK_IMPORTED_MODULE_5__["ShowboardpostPage"]]
        })
    ], ShowboardpostPageModule);
    return ShowboardpostPageModule;
}());



/***/ }),

/***/ "./src/app/pages/community/community-popover/community-popover.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/community/community-popover/community-popover.module.ts ***!
  \*******************************************************************************/
/*! exports provided: CommunityPopoverPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityPopoverPageModule", function() { return CommunityPopoverPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _community_popover_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./community-popover.page */ "./src/app/pages/community/community-popover/community-popover.page.ts");
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
        component: _community_popover_page__WEBPACK_IMPORTED_MODULE_5__["CommunityPopoverPage"]
    }
];
var CommunityPopoverPageModule = /** @class */ (function () {
    function CommunityPopoverPageModule() {
    }
    CommunityPopoverPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_community_popover_page__WEBPACK_IMPORTED_MODULE_5__["CommunityPopoverPage"]]
        })
    ], CommunityPopoverPageModule);
    return CommunityPopoverPageModule;
}());



/***/ }),

/***/ "./src/app/pages/community/editcommunity/editcommunity.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/community/editcommunity/editcommunity.module.ts ***!
  \***********************************************************************/
/*! exports provided: EditcommunityPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditcommunityPageModule", function() { return EditcommunityPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _editcommunity_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editcommunity.page */ "./src/app/pages/community/editcommunity/editcommunity.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var ngx_autosize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-autosize */ "./node_modules/ngx-autosize/fesm5/ngx-autosize.js");
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
        component: _editcommunity_page__WEBPACK_IMPORTED_MODULE_5__["EditcommunityPage"]
    }
];
var EditcommunityPageModule = /** @class */ (function () {
    function EditcommunityPageModule() {
    }
    EditcommunityPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_autosize__WEBPACK_IMPORTED_MODULE_7__["AutosizeModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_editcommunity_page__WEBPACK_IMPORTED_MODULE_5__["EditcommunityPage"]]
        })
    ], EditcommunityPageModule);
    return EditcommunityPageModule;
}());



/***/ }),

/***/ "./src/app/pages/community/listmycommunities/listmycommunities.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/community/listmycommunities/listmycommunities.module.ts ***!
  \*******************************************************************************/
/*! exports provided: ListmycommunitiesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListmycommunitiesPageModule", function() { return ListmycommunitiesPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _listmycommunities_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./listmycommunities.page */ "./src/app/pages/community/listmycommunities/listmycommunities.page.ts");
/* harmony import */ var _searchcommunity_searchcommunity_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../searchcommunity/searchcommunity.module */ "./src/app/pages/community/searchcommunity/searchcommunity.module.ts");
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
        component: _listmycommunities_page__WEBPACK_IMPORTED_MODULE_5__["ListmycommunitiesPage"]
    }
];
var ListmycommunitiesPageModule = /** @class */ (function () {
    function ListmycommunitiesPageModule() {
    }
    ListmycommunitiesPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _searchcommunity_searchcommunity_module__WEBPACK_IMPORTED_MODULE_6__["SearchcommunityPageModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_listmycommunities_page__WEBPACK_IMPORTED_MODULE_5__["ListmycommunitiesPage"]]
        })
    ], ListmycommunitiesPageModule);
    return ListmycommunitiesPageModule;
}());



/***/ }),

/***/ "./src/app/pages/community/searchcommunity/searchcommunity.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/pages/community/searchcommunity/searchcommunity.module.ts ***!
  \***************************************************************************/
/*! exports provided: SearchcommunityPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchcommunityPageModule", function() { return SearchcommunityPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _searchcommunity_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./searchcommunity.page */ "./src/app/pages/community/searchcommunity/searchcommunity.page.ts");
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
        component: _searchcommunity_page__WEBPACK_IMPORTED_MODULE_5__["SearchcommunityPage"]
    }
];
var SearchcommunityPageModule = /** @class */ (function () {
    function SearchcommunityPageModule() {
    }
    SearchcommunityPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_searchcommunity_page__WEBPACK_IMPORTED_MODULE_5__["SearchcommunityPage"]]
        })
    ], SearchcommunityPageModule);
    return SearchcommunityPageModule;
}());



/***/ }),

/***/ "./src/app/pages/connect/createchat/createchat.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/connect/createchat/createchat.module.ts ***!
  \***************************************************************/
/*! exports provided: CreatechatPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatechatPageModule", function() { return CreatechatPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _createchat_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createchat.page */ "./src/app/pages/connect/createchat/createchat.page.ts");
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
        component: _createchat_page__WEBPACK_IMPORTED_MODULE_5__["CreatechatPage"]
    }
];
var CreatechatPageModule = /** @class */ (function () {
    function CreatechatPageModule() {
    }
    CreatechatPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_createchat_page__WEBPACK_IMPORTED_MODULE_5__["CreatechatPage"]]
        })
    ], CreatechatPageModule);
    return CreatechatPageModule;
}());



/***/ }),

/***/ "./src/app/pages/feature/customreminder-popover/customreminder-popover.module.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/pages/feature/customreminder-popover/customreminder-popover.module.ts ***!
  \***************************************************************************************/
/*! exports provided: CustomreminderPopoverPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomreminderPopoverPageModule", function() { return CustomreminderPopoverPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _customreminder_popover_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customreminder-popover.page */ "./src/app/pages/feature/customreminder-popover/customreminder-popover.page.ts");
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
        component: _customreminder_popover_page__WEBPACK_IMPORTED_MODULE_5__["CustomreminderPopoverPage"]
    }
];
var CustomreminderPopoverPageModule = /** @class */ (function () {
    function CustomreminderPopoverPageModule() {
    }
    CustomreminderPopoverPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_customreminder_popover_page__WEBPACK_IMPORTED_MODULE_5__["CustomreminderPopoverPage"]]
        })
    ], CustomreminderPopoverPageModule);
    return CustomreminderPopoverPageModule;
}());



/***/ }),

/***/ "./src/app/pages/feature/customreminder-popover/customreminder-popover.page.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/pages/feature/customreminder-popover/customreminder-popover.page.scss ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ZlYXR1cmUvY3VzdG9tcmVtaW5kZXItcG9wb3Zlci9jdXN0b21yZW1pbmRlci1wb3BvdmVyLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/feature/customreminder-popover/customreminder-popover.page.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/pages/feature/customreminder-popover/customreminder-popover.page.ts ***!
  \*************************************************************************************/
/*! exports provided: CustomreminderPopoverPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomreminderPopoverPage", function() { return CustomreminderPopoverPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
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


var CustomreminderPopoverPage = /** @class */ (function () {
    function CustomreminderPopoverPage(alertCtrl, popoverCtrl) {
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        //time constants
        this.MINUTES_IN_HOUR = 60;
        this.MINUTES_IN_DAY = 1440;
        this.MINUTES_IN_WEEK = 10080;
        this.MINUTES_IN_MONTH = 43800;
        this.reminderString = '';
        this.displayString = '';
        this.timeUnit = "m";
        this.timeUnitAbreviations = ["m", "h", "d", "w"];
        this.timeUnitDisplayStrings = ["min", "h", "days", "weeks"];
    }
    CustomreminderPopoverPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CustomreminderPopoverPage.prototype.getReminderString = function () {
        return __awaiter(this, void 0, void 0, function () {
            var networkAlert, alert_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!Number.isNaN(parseInt(this.timeValue))) return [3 /*break*/, 1];
                        this.timeValue = parseInt(this.timeValue);
                        this.displayString = this.timeValue + " " + this.timeUnitDisplayStrings[this.timeUnitAbreviations.indexOf(this.timeUnit)] + " before";
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Not a valid time',
                            message: 'Please enter a valid number',
                            buttons: ['Dismiss'],
                            cssClass: 'level-15'
                        })];
                    case 2:
                        networkAlert = _a.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        // convert all times to minutes
                        this.timeValue = this.convertTimeToMinutes(this.timeValue, this.timeUnit);
                        this.reminderString = this.timeValue.toString();
                        if (!(this.timeValue > this.MINUTES_IN_MONTH)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Cannot set reminder for over a month before event',
                                message: 'Please enter a valid time',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 5:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, this.reminderString];
                }
            });
        });
    };
    CustomreminderPopoverPage.prototype.convertTimeToMinutes = function (timeValue, timeUnit) {
        if (timeUnit === "h") {
            timeValue *= this.MINUTES_IN_HOUR;
        }
        else if (timeUnit === "d") {
            timeValue *= this.MINUTES_IN_DAY;
        }
        else if (timeUnit === "w") {
            timeValue *= this.MINUTES_IN_WEEK;
        }
        return timeValue;
    };
    CustomreminderPopoverPage.prototype.close = function () {
        this.getReminderString();
        console.log(this.displayString);
        this.popoverCtrl.dismiss([this.reminderString, this.displayString]);
    };
    CustomreminderPopoverPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["PopoverController"] }
    ]; };
    CustomreminderPopoverPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customreminder-popover',
            template: __importDefault(__webpack_require__(/*! raw-loader!./customreminder-popover.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/customreminder-popover/customreminder-popover.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./customreminder-popover.page.scss */ "./src/app/pages/feature/customreminder-popover/customreminder-popover.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["PopoverController"]])
    ], CustomreminderPopoverPage);
    return CustomreminderPopoverPage;
}());



/***/ }),

/***/ "./src/app/pages/feature/uploadmedia/uploadmedia.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/feature/uploadmedia/uploadmedia.module.ts ***!
  \*****************************************************************/
/*! exports provided: UploadmediaPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadmediaPageModule", function() { return UploadmediaPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _uploadmedia_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uploadmedia.page */ "./src/app/pages/feature/uploadmedia/uploadmedia.page.ts");
/* harmony import */ var ngx_plyr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-plyr */ "./node_modules/ngx-plyr/fesm5/ngx-plyr.js");
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
        component: _uploadmedia_page__WEBPACK_IMPORTED_MODULE_5__["UploadmediaPage"]
    }
];
var UploadmediaPageModule = /** @class */ (function () {
    function UploadmediaPageModule() {
    }
    UploadmediaPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                ngx_plyr__WEBPACK_IMPORTED_MODULE_6__["PlyrModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_uploadmedia_page__WEBPACK_IMPORTED_MODULE_5__["UploadmediaPage"]]
        })
    ], UploadmediaPageModule);
    return UploadmediaPageModule;
}());



/***/ }),

/***/ "./src/app/pages/main-tab/main-tab-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/main-tab/main-tab-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: MainTabPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainTabPageRoutingModule", function() { return MainTabPageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _main_tab_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main-tab.page */ "./src/app/pages/main-tab/main-tab.page.ts");
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
        component: _main_tab_page__WEBPACK_IMPORTED_MODULE_2__["MainTabPage"],
        children: [
            {
                path: 'discover',
                children: [
                    {
                        path: 'list',
                        children: [
                            {
                                path: '',
                                loadChildren: '../discover/discover/discover.module#DiscoverPageModule'
                            }
                        ]
                    },
                    {
                        path: 'preferences',
                        children: [
                            {
                                path: '',
                                loadChildren: '../discover/preferences/preferences.module#PreferencesPageModule'
                            }
                        ]
                    },
                    {
                        path: 'activity',
                        children: [
                            {
                                path: ':id',
                                loadChildren: '../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                            }
                        ]
                    },
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                loadChildren: '../discover/discover/discover.module#DiscoverPageModule'
                            }
                        ]
                    },
                ]
            },
            {
                path: 'dashboard',
                children: [
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                loadChildren: '../discover/discover/discover.module#DiscoverPageModule'
                            }
                        ]
                    },
                ]
            },
            {
                path: 'news',
                children: [
                    {
                        path: '',
                        loadChildren: '../board/communityboard/communityboard.module#CommunityboardPageModule'
                    },
                    {
                        path: 'activity',
                        children: [
                            {
                                path: ':id',
                                loadChildren: '../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                            }
                        ]
                    }
                ]
            },
            {
                path: 'myconversations',
                children: [
                    {
                        path: '',
                        loadChildren: '../connect/myconversations/myconversations.module#MyconversationsPageModule'
                    }
                ]
            },
            {
                path: 'me',
                children: [
                    {
                        path: '',
                        loadChildren: '../user/dashboard/dashboard.module#DashboardPageModule'
                    },
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                    }
                ]
            },
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        loadChildren: '../user/user.module#UserPageModule'
                    }
                ]
            },
            {
                path: 'manage',
                children: [
                    {
                        path: 'activity',
                        children: [
                            {
                                path: '',
                                loadChildren: '../feature/manage/managefeature.module#ManagefeaturePageModule'
                            },
                        ]
                    },
                    {
                        path: '',
                        loadChildren: '../manage/managecommunities/managecommunities.module#ManagecommunitiesPageModule'
                    }
                ]
            },
            {
                path: 'onboard',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../feature/onboardfeature/onboardfeature.module#OnboardfeaturePageModule'
                    }
                ]
            },
            {
                path: 'create',
                children: [
                    {
                        path: 'community',
                        children: [
                            {
                                path: '',
                                loadChildren: '../feature/createfeature/createfeature.module#CreatefeaturePageModule'
                            }
                        ]
                    },
                    {
                        path: '',
                        loadChildren: '../feature/editfeature/editfeature.module#EditfeaturePageModule'
                    },
                ]
            },
            {
                path: 'edit',
                children: [
                    {
                        path: 'community',
                        children: [
                            {
                                path: ':id',
                                loadChildren: '../feature/createfeature/createfeature.module#CreatefeaturePageModule'
                            }
                        ]
                    },
                    {
                        path: ':id',
                        loadChildren: '../feature/editfeature/editfeature.module#EditfeaturePageModule'
                    },
                ]
            },
            {
                path: 'person',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../connect/showrecipientinfo/showrecipientinfo.module#ShowrecipientinfoModule'
                    }
                ]
            },
            {
                path: 'completeprofile',
                loadChildren: '../user/completeprofile/completeprofile.module#CompleteprofilePageModule'
            },
            {
                path: 'video/:id',
                loadChildren: function () { return __webpack_require__.e(/*! import() | connect-videoconference-videoconference-module */ "connect-videoconference-videoconference-module").then(__webpack_require__.bind(null, /*! ../connect/videoconference/videoconference.module */ "./src/app/pages/connect/videoconference/videoconference.module.ts")).then(function (m) { return m.VideoconferencePageModule; }); }
            },
            {
                path: '',
                redirectTo: '/app/discover',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/app/discover',
        pathMatch: 'full'
    }
];
var MainTabPageRoutingModule = /** @class */ (function () {
    function MainTabPageRoutingModule() {
    }
    MainTabPageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], MainTabPageRoutingModule);
    return MainTabPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/main-tab/main-tab.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/main-tab/main-tab.module.ts ***!
  \***************************************************/
/*! exports provided: MainTabPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainTabPageModule", function() { return MainTabPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _main_tab_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main-tab.page */ "./src/app/pages/main-tab/main-tab.page.ts");
/* harmony import */ var _main_tab_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main-tab-routing.module */ "./src/app/pages/main-tab/main-tab-routing.module.ts");
/* harmony import */ var _group_groupchat_groupchat_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../group/groupchat/groupchat.module */ "./src/app/pages/group/groupchat/groupchat.module.ts");
/* harmony import */ var _feature_editfeature_editfeature_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../feature/editfeature/editfeature.module */ "./src/app/pages/feature/editfeature/editfeature.module.ts");
/* harmony import */ var _connect_createchat_createchat_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../connect/createchat/createchat.module */ "./src/app/pages/connect/createchat/createchat.module.ts");
/* harmony import */ var _board_editboardpost_editboardpost_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../board/editboardpost/editboardpost.module */ "./src/app/pages/board/editboardpost/editboardpost.module.ts");
/* harmony import */ var _board_showboardpost_showboardpost_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../board/showboardpost/showboardpost.module */ "./src/app/pages/board/showboardpost/showboardpost.module.ts");
/* harmony import */ var _community_showcommunity_showcommunity_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../community/showcommunity/showcommunity.module */ "./src/app/pages/community/showcommunity/showcommunity.module.ts");
/* harmony import */ var _board_groupboard_groupboard_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../board/groupboard/groupboard.module */ "./src/app/pages/board/groupboard/groupboard.module.ts");
/* harmony import */ var _community_listmycommunities_listmycommunities_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../community/listmycommunities/listmycommunities.module */ "./src/app/pages/community/listmycommunities/listmycommunities.module.ts");
/* harmony import */ var _group_editgroup_editgroup_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../group/editgroup/editgroup.module */ "./src/app/pages/group/editgroup/editgroup.module.ts");
/* harmony import */ var _discover_preferences_preferences_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../discover/preferences/preferences.module */ "./src/app/pages/discover/preferences/preferences.module.ts");
/* harmony import */ var _feature_onboardfeature_onboardfeature_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../feature/onboardfeature/onboardfeature.module */ "./src/app/pages/feature/onboardfeature/onboardfeature.module.ts");
/* harmony import */ var _community_editcommunity_editcommunity_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../community/editcommunity/editcommunity.module */ "./src/app/pages/community/editcommunity/editcommunity.module.ts");
/* harmony import */ var _group_showgroup_showgroup_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../group/showgroup/showgroup.module */ "./src/app/pages/group/showgroup/showgroup.module.ts");
/* harmony import */ var _community_community_popover_community_popover_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../community/community-popover/community-popover.module */ "./src/app/pages/community/community-popover/community-popover.module.ts");
/* harmony import */ var _feature_uploadmedia_uploadmedia_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../feature/uploadmedia/uploadmedia.module */ "./src/app/pages/feature/uploadmedia/uploadmedia.module.ts");
/* harmony import */ var _user_about_about_module__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../user/about/about.module */ "./src/app/pages/user/about/about.module.ts");
/* harmony import */ var _user_user_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../user/user.module */ "./src/app/pages/user/user.module.ts");
/* harmony import */ var _feature_createfeature_createfeature_module__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../feature/createfeature/createfeature.module */ "./src/app/pages/feature/createfeature/createfeature.module.ts");
/* harmony import */ var _feature_customreminder_popover_customreminder_popover_module__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../feature/customreminder-popover/customreminder-popover.module */ "./src/app/pages/feature/customreminder-popover/customreminder-popover.module.ts");
/* harmony import */ var _feature_editparticipants_editparticipants_module__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../feature/editparticipants/editparticipants.module */ "./src/app/pages/feature/editparticipants/editparticipants.module.ts");
/* harmony import */ var _feature_manage_managefeature_module__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../feature/manage/managefeature.module */ "./src/app/pages/feature/manage/managefeature.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



























var MainTabPageModule = /** @class */ (function () {
    function MainTabPageModule() {
    }
    MainTabPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _main_tab_routing_module__WEBPACK_IMPORTED_MODULE_5__["MainTabPageRoutingModule"],
                _feature_manage_managefeature_module__WEBPACK_IMPORTED_MODULE_26__["ManagefeaturePageModule"],
                _feature_createfeature_createfeature_module__WEBPACK_IMPORTED_MODULE_23__["CreatefeaturePageModule"],
                _feature_editfeature_editfeature_module__WEBPACK_IMPORTED_MODULE_7__["EditfeaturePageModule"],
                _feature_editparticipants_editparticipants_module__WEBPACK_IMPORTED_MODULE_25__["EditparticipantsPageModule"],
                _group_groupchat_groupchat_module__WEBPACK_IMPORTED_MODULE_6__["GroupchatPageModule"],
                _connect_createchat_createchat_module__WEBPACK_IMPORTED_MODULE_8__["CreatechatPageModule"],
                _board_showboardpost_showboardpost_module__WEBPACK_IMPORTED_MODULE_10__["ShowboardpostPageModule"],
                _board_editboardpost_editboardpost_module__WEBPACK_IMPORTED_MODULE_9__["EditboardpostPageModule"],
                _board_groupboard_groupboard_module__WEBPACK_IMPORTED_MODULE_12__["GroupboardPageModule"],
                _community_showcommunity_showcommunity_module__WEBPACK_IMPORTED_MODULE_11__["ShowcommunityPageModule"],
                _community_editcommunity_editcommunity_module__WEBPACK_IMPORTED_MODULE_17__["EditcommunityPageModule"],
                _community_community_popover_community_popover_module__WEBPACK_IMPORTED_MODULE_19__["CommunityPopoverPageModule"],
                _group_showgroup_showgroup_module__WEBPACK_IMPORTED_MODULE_18__["ShowgroupPageModule"],
                _group_editgroup_editgroup_module__WEBPACK_IMPORTED_MODULE_14__["EditgroupPageModule"],
                _community_listmycommunities_listmycommunities_module__WEBPACK_IMPORTED_MODULE_13__["ListmycommunitiesPageModule"],
                _discover_preferences_preferences_module__WEBPACK_IMPORTED_MODULE_15__["PreferencesPageModule"],
                _feature_onboardfeature_onboardfeature_module__WEBPACK_IMPORTED_MODULE_16__["OnboardfeaturePageModule"],
                _feature_uploadmedia_uploadmedia_module__WEBPACK_IMPORTED_MODULE_20__["UploadmediaPageModule"],
                _user_about_about_module__WEBPACK_IMPORTED_MODULE_21__["AboutPageModule"],
                _user_user_module__WEBPACK_IMPORTED_MODULE_22__["UserPageModule"],
                _feature_customreminder_popover_customreminder_popover_module__WEBPACK_IMPORTED_MODULE_24__["CustomreminderPopoverPageModule"],
            ],
            declarations: [
                _main_tab_page__WEBPACK_IMPORTED_MODULE_4__["MainTabPage"],
            ],
        })
    ], MainTabPageModule);
    return MainTabPageModule;
}());



/***/ }),

/***/ "./src/app/pages/main-tab/main-tab.page.scss":
/*!***************************************************!*\
  !*** ./src/app/pages/main-tab/main-tab.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-main-tab ion-tab-bar {\n  padding-top: 5px;\n  padding-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL21haW4tdGFiL21haW4tdGFiLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvbWFpbi10YWIvbWFpbi10YWIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UsZ0JBQUE7RUFDQSxvQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbWFpbi10YWIvbWFpbi10YWIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLW1haW4tdGFiIHtcbiAgaW9uLXRhYi1iYXIge1xuICAgIHBhZGRpbmctdG9wOiA1cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gIH1cbn1cbiIsImFwcC1tYWluLXRhYiBpb24tdGFiLWJhciB7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/main-tab/main-tab.page.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/main-tab/main-tab.page.ts ***!
  \*************************************************/
/*! exports provided: MainTabPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainTabPage", function() { return MainTabPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/service-worker */ "./node_modules/@angular/service-worker/fesm5/service-worker.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_network_service_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/network-service.service */ "./src/app/services/network-service.service.ts");
/* harmony import */ var _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../group/groupchat/groupchat.page */ "./src/app/pages/group/groupchat/groupchat.page.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/badge/ngx */ "./node_modules/@ionic-native/badge/ngx/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/screen-orientation/ngx */ "./node_modules/@ionic-native/screen-orientation/ngx/index.js");
/* harmony import */ var _services_board_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../services/board.service */ "./src/app/services/board.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_systemlog_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../services/systemlog.service */ "./src/app/services/systemlog.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! scriptjs */ "./node_modules/scriptjs/dist/script.js");
/* harmony import */ var scriptjs__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(scriptjs__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var capacitor_jitsi_meet__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! capacitor-jitsi-meet */ "./node_modules/capacitor-jitsi-meet/dist/esm/index.js");
/* harmony import */ var _discover_preferences_preferences_page__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../discover/preferences/preferences.page */ "./src/app/pages/discover/preferences/preferences.page.ts");
/* harmony import */ var _feature_onboardfeature_onboardfeature_page__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../feature/onboardfeature/onboardfeature.page */ "./src/app/pages/feature/onboardfeature/onboardfeature.page.ts");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
/* harmony import */ var _feature_editfeature_editfeature_page__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../feature/editfeature/editfeature.page */ "./src/app/pages/feature/editfeature/editfeature.page.ts");
/* harmony import */ var _services_calendar_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../services/calendar.service */ "./src/app/services/calendar.service.ts");
/* harmony import */ var _feature_editparticipants_editparticipants_page__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../feature/editparticipants/editparticipants.page */ "./src/app/pages/feature/editparticipants/editparticipants.page.ts");
/* harmony import */ var _feature_manage_managefeature_page__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../feature/manage/managefeature.page */ "./src/app/pages/feature/manage/managefeature.page.ts");
/* harmony import */ var _user_programs_programs_page__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../user/programs/programs.page */ "./src/app/pages/user/programs/programs.page.ts");
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




var App = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].App, Network = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].Network, LocalNotifications = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].LocalNotifications, Toast = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].Toast;

























var MainTabPage = /** @class */ (function () {
    function MainTabPage(router, swPush, cache, electronService, screenOrientation, storage, badge, actionSheetCtrl, alertCtrl, menuCtrl, modalCtrl, navCtrl, platform, toastCtrl, authService, networkService, resourceService, calendarService, userData, systemLog, momentService, boardService, chatService) {
        var _this = this;
        this.router = router;
        this.swPush = swPush;
        this.cache = cache;
        this.electronService = electronService;
        this.screenOrientation = screenOrientation;
        this.storage = storage;
        this.badge = badge;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.networkService = networkService;
        this.resourceService = resourceService;
        this.calendarService = calendarService;
        this.userData = userData;
        this.systemLog = systemLog;
        this.momentService = momentService;
        this.boardService = boardService;
        this.chatService = chatService;
        this.readyToDetectNetworkChange = false;
        this.hasSetupEventListeners = false;
        this.pendingVideoChatRoomId = '';
        this.subscriptions = {};
        this.onJitsiLoaded = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('loaded Jitsi');
                        this.userData.readyToControlVideoChat = true;
                        this.userData.videoChatRoomId = this.pendingVideoChatRoomId;
                        _a = this.userData.user;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.checkRestExpired()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            this.chatService.socket.emit('online status', this.userData.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'online', origin: this.chatService.socket.id, videoChatRoomId: this.userData.videoChatRoomId });
                        }
                        if (!this.platform.is('cordova')) {
                            if (this.userData.user) {
                                this.jitsi.executeCommand('displayName', this.userData.user.first_name + ' ' + this.userData.user.last_name);
                            }
                            if (this.userData.user.avatar) {
                                this.jitsi.executeCommand('avatarUrl', this.userData.user.avatar);
                            }
                            this.jitsi.executeCommand('subject', params.videoChatRoomSubject || ' ');
                            this.jitsi.on('readyToClose', this.onJitsiUnloaded);
                        }
                        return [2 /*return*/];
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
                        _a = this.userData.user;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.checkRestExpired()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            this.chatService.socket.emit('online status', this.userData.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'leave video chat', origin: this.chatService.socket.id, videoChatRoomId: this.userData.videoChatRoomId });
                        }
                        this.userData.videoChatRoomId = '';
                        if (!!this.platform.is('cordova')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.jitsi.dispose()];
                    case 3:
                        _b.sent();
                        // @ts-ignore
                        $("#videoSpace").empty();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    MainTabPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('platform info:', this.platform.platforms());
                        this.processAuth();
                        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(function (data) {
                            if (data && data.type === 'setup device') {
                                _this.setupDevice();
                            }
                            // if authentication takes a long time, this listen to when user data is ready and can be used to update the Jitsi
                            if (_this.authService.token && _this.userData.user && _this.jitsi && _this.userData.readyToControlVideoChat) {
                                _this.jitsi.executeCommand('displayName', _this.userData.user.first_name + ' ' + _this.userData.user.last_name);
                                if (_this.userData && _this.userData.user && _this.userData.user.avatar) {
                                    _this.jitsi.executeCommand('avatarUrl', _this.userData.user.avatar);
                                }
                            }
                        });
                        if (!this.platform.is('cordova')) return [3 /*break*/, 2];
                        return [4 /*yield*/, Network.getStatus()];
                    case 1:
                        status_1 = _a.sent();
                        if (!status_1.connected) {
                            this.networkService.showNoNetworkAlert();
                        }
                        this.addNetworkListener();
                        setTimeout(function () {
                            _this.readyToDetectNetworkChange = true;
                        }, 2000);
                        return [3 /*break*/, 3];
                    case 2:
                        console.log('Not on a mobile device. Cannot perform certain functions. ');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MainTabPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.storage.get('user')];
                    case 1:
                        user = _a.sent();
                        if (!(user && user._id)) return [3 /*break*/, 3];
                        // turn on menu in most cases except when showing video on desktop
                        if (this.router.url.includes('/app/video') && this.platform.is('desktop')) {
                            // menu remains disabled
                        }
                        else {
                            this.menuCtrl.enable(true);
                        }
                        this.userData.user = user;
                        return [4 /*yield*/, this.userData.loadStoredCommunity()];
                    case 2:
                        _a.sent();
                        this.setupDevice();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        this.menuCtrl.enable(true);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MainTabPage.prototype.processAuth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_2, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.authService.checkAuthenticationWithToken(null)];
                    case 1:
                        res = _a.sent();
                        if (!(res.content === 'Success')) return [3 /*break*/, 6];
                        console.log('Token authorized');
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.userData.user = res.user;
                        this.userData.processLoadedUserData();
                        return [4 /*yield*/, this.userData.loadStoredCommunity()];
                    case 3:
                        _a.sent();
                        // in the event of deep linking to tab pages, the tab page renders using user data from storage first and then listens to the following events to refresh its view with fresh user data from server
                        // publish event to refresh the dashboard page with new userData from server
                        // publish event to finish loading the Board page as it needs to wait for boardService.socket to start
                        this.userData.refreshAppPages();
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        this.networkService.showNoNetworkAlert();
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (res.content === 'Offline mode') {
                            console.log('offline mode');
                        }
                        else if (res.content === 'Unauthenticated') {
                            console.log('Unauthenticated', res.message);
                        }
                        else {
                            console.log('no token found. originating url:', this.router.url);
                        }
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_3 = _a.sent();
                        console.log('Not already authorized');
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    MainTabPage.prototype.setupDevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var delayImportContactListReminder, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.networkService.hasNetwork()];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 7];
                        // defer iOS push notification permission request until later (after finished onboarding)
                        if (this.platform.is('ios') && !this.userData.user.enablePushNotification) {
                        }
                        else { // automatically set up Push Notification for all device type except iOS mobile web
                            this.initPushNotification();
                            this.requestBadgePermission(); // badge API requires notification permission
                        }
                        if (!this.platform.is('cordova')) return [3 /*break*/, 5];
                        if (!this.userData.user.importContactList) return [3 /*break*/, 2];
                        this.userData.uploadContactList(10);
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.storage.get('delayImportContactListReminder')];
                    case 3:
                        delayImportContactListReminder = _b.sent();
                        this.userData.delayImportContactListReminder = delayImportContactListReminder ? delayImportContactListReminder - 1 : 0;
                        return [4 /*yield*/, this.storage.set('delayImportContactListReminder', this.userData.delayImportContactListReminder)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        // setup the various socket.io connectors
                        this.chatService.createConversationSocket();
                        this.userData.createUserSocket();
                        this.momentService.createMomentSocket();
                        this.boardService.createBoardSocket();
                        // refresh the conversation and calendar cache
                        this.chatService.refreshTabBadges();
                        this.calendarService.getUserCalendar();
                        this.userData.loginAt = new Date(); // log the sign-on time. will be used later for calculating total session time to be stored in system log
                        if (!this.hasSetupEventListeners) { // only set up listeners once
                            this.startEventSubscription();
                        }
                        if (!(this.userData.user && this.userData.user.churches && this.userData.user.churches.length)) return [3 /*break*/, 7];
                        _a = this.userData;
                        return [4 /*yield*/, this.userData.hasAdminAccess(this.userData.user.churches[this.userData.currentCommunityIndex]._id)];
                    case 6:
                        _a.currentCommunityAdminStatus = _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MainTabPage.prototype.requestBadgePermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hasPermission, permission, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!this.platform.is('cordova')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.badge.hasPermission()];
                    case 1:
                        hasPermission = _a.sent();
                        console.log(hasPermission);
                        if (!!hasPermission) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.badge.requestPermission()];
                    case 2:
                        permission = _a.sent();
                        console.log(permission);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.log('Batch is not working. Possibly running on virtual environment.');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MainTabPage.prototype.addNetworkListener = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.networkHandler = Network.addListener('networkStatusChange', function (status) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(!this.networkService.networkSuccess && status.connected && this.readyToDetectNetworkChange)) return [3 /*break*/, 5];
                                this.networkService.networkSuccess = true;
                                this.networkService.showHasNetworkAlert();
                                return [4 /*yield*/, this.userData.load()];
                            case 1:
                                _b.sent();
                                return [4 /*yield*/, this.userData.loadStoredCommunity()];
                            case 2:
                                _b.sent();
                                if (!(this.userData.user && this.userData.user.churches && this.userData.user.churches.length)) return [3 /*break*/, 4];
                                _a = this.userData;
                                return [4 /*yield*/, this.userData.hasAdminAccess(this.userData.user.churches[this.userData.currentCommunityIndex]._id)];
                            case 3:
                                _a.currentCommunityAdminStatus = _b.sent();
                                _b.label = 4;
                            case 4:
                                // hasSetupEventListeners is true if setupDevice() was run successfully on startup.
                                // therefore, on network status change detection, if setupDevice() was not carried up successfully on start up, run setupDevice() again
                                if (!this.hasSetupEventListeners) {
                                    this.setupDevice();
                                    window.location.reload(); // force reload .js and .css in index.html
                                }
                                this.userData.refreshAppPages();
                                _b.label = 5;
                            case 5:
                                if (!status.connected) {
                                    this.networkService.networkSuccess = false;
                                    this.networkService.showNoNetworkAlert();
                                }
                                console.log('Network status changed', status);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    MainTabPage.prototype.initPushNotification = function () {
        return __awaiter(this, void 0, void 0, function () {
            var PushNotifications, err_4, msg, permissionAlert, pushSubscription_1, err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('cordova')) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 2, , 5]);
                        PushNotifications = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].PushNotifications;
                        PushNotifications.register();
                        if (!this.pushHandler) {
                            this.pushHandler = PushNotifications.addListener('registration', function (token) {
                                if (token && token.value) {
                                    console.log('device token ->', token.value);
                                    _this.userData.addDeviceToken({ token: token.value }).subscribe(function () {
                                        _this.userData.deviceToken = token.value;
                                        if (token.value.length === 64) { // APN token is converted to lower case for Capacitor Push's (upper case) compatibility with cordova's Push (lower case) in database
                                            _this.userData.deviceToken = token.value.toLowerCase();
                                        }
                                        _this.userData.user.enablePushNotification = true;
                                        _this.userData.refreshUserStatus({});
                                    }, function (err) {
                                        console.log('cannot store device token in database.');
                                    });
                                }
                            });
                            PushNotifications.addListener('registrationError', function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.pushHandler = null;
                                    console.log('error on register ' + JSON.stringify(error));
                                    return [2 /*return*/];
                                });
                            }); });
                            PushNotifications.addListener('pushNotificationReceived', function (notification) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log('received notification ' + JSON.stringify(notification), JSON.stringify(notification.data));
                                    return [2 /*return*/];
                                });
                            }); });
                            PushNotifications.addListener('pushNotificationActionPerformed', function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var params;
                                return __generator(this, function (_a) {
                                    console.log('action', result.notification);
                                    if (result.notification.data.page === 'MessagePage') {
                                        this.openGroupChat(result.notification.data);
                                    }
                                    else if (result.notification.data.page === 'Moment') {
                                        params = {};
                                        if (result.notification.data.relationshipId) {
                                            params.relationshipId = result.notification.data.relationshipId;
                                        }
                                        if (result.notification.data.calendarId) {
                                            params.calendarId = result.notification.data.calendarId;
                                        }
                                        if (this.platform.width() < 768) {
                                            params.moment = { _id: result.notification.data.momentId };
                                            params.modalPage = true;
                                            this.momentService.openMoment(params);
                                        }
                                        else {
                                            this.router.navigate(['/app/discover/activity/' + result.notification.data.momentId, params]);
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        err_4 = _a.sent();
                        msg = 'To enable the Import Contacts feature: ';
                        if (this.platform.is('android')) {
                            msg += '1. Open your phone Settings and tap Notifications. 2. Turn on Notifications for Restvo.';
                        }
                        else {
                            msg += '1. Open your phone Settings and tap Notifications. 2. Tap Restvo. 3. Turn on Allow Notifications.';
                        }
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'You need to give permission to Restvo',
                                subHeader: msg,
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        permissionAlert = _a.sent();
                        return [4 /*yield*/, permissionAlert.present()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        _a.trys.push([6, 11, , 12]);
                        if (!this.electronService.isElectronApp) return [3 /*break*/, 7];
                        console.log('trying to set up electron Web Push');
                        if (!this.pushHandler) {
                            this.electronService.ipcRenderer.on('PUSH_RECEIVER:::TOKEN_UPDATED', function (_, deviceToken) {
                                console.log('electron device token ->', deviceToken);
                                _this.userData.addDeviceToken({ token: deviceToken }).subscribe(function () {
                                    _this.userData.deviceToken = deviceToken; // FCM token doesn't need to be modified
                                    _this.userData.user.enablePushNotification = true;
                                    _this.userData.refreshUserStatus({});
                                }, function (err) {
                                    console.log('cannot store device token in database.');
                                });
                            });
                            this.electronService.ipcRenderer.on('PUSH_RECEIVER:::NOTIFICATION_SERVICE_STARTED', function (_, deviceToken) {
                                console.log('electron loading previous token', deviceToken);
                                _this.userData.addDeviceToken({ token: deviceToken }).subscribe(function () {
                                    _this.userData.deviceToken = deviceToken; // FCM token doesn't need to be modified
                                    _this.userData.user.enablePushNotification = true;
                                    _this.userData.refreshUserStatus({});
                                }, function (err) {
                                    console.log('cannot store device token in database.');
                                });
                            });
                            this.electronService.ipcRenderer.on('PUSH_RECEIVER:::NOTIFICATION_SERVICE_ERROR', function (_, error) {
                                console.log('electron push notification setup error', error);
                            });
                            this.pushHandler = this.electronService.ipcRenderer.on('PUSH_RECEIVER:::NOTIFICATION_RECEIVED', function (_, notification) {
                                console.log('electron receiving notification', notification);
                                _this.electronService.ipcRenderer.send('SYSTEM_NOTIFICATION:::DISPLAY_INCOMING_NOTIFICATION', notification);
                            }); // display notification);
                        }
                        this.electronService.ipcRenderer.send('PUSH_RECEIVER:::START_NOTIFICATION_SERVICE', 'AAAA0J-WxVY:APA91bHHjlrBbQi60NW1KJAmWHhN-1OabdfQ-mgJzbOVA8vK-WKTQHBDumHKGsu2_RVuR6kDBrv2VVBsIIAY-SmvBw3KWFVoJfJlJZ5ixxxbFw6UdmW3JiYHEQDsZISVfvAb6rvLwl0M');
                        return [3 /*break*/, 10];
                    case 7:
                        if (!this.swPush.isEnabled) return [3 /*break*/, 9];
                        console.log('trying to set up Web Push');
                        return [4 /*yield*/, this.swPush.requestSubscription({
                                serverPublicKey: 'BE4sP7Uc5NLOHj4yyIUbPSWdDnRQfoMv9Vj6jL3s3BqnWYbVLNoYE_wkZXu9-ej1KuEqOPzmu2W8v4fOA58J_FA'
                            })];
                    case 8:
                        pushSubscription_1 = _a.sent();
                        this.userData.addDeviceToken({ token: pushSubscription_1 }).subscribe(function () {
                            _this.userData.pushSubscription = pushSubscription_1;
                            _this.userData.user.enablePushNotification = true;
                            _this.userData.refreshUserStatus({});
                            console.log('push sub obj', _this.userData.pushSubscription);
                        }, function (err) {
                            console.log('cannot store push subscription object in database.');
                        });
                        return [3 /*break*/, 10];
                    case 9:
                        console.log("no valid push strategy available.");
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_5 = _a.sent();
                        console.log('cannot subscribe to push notification on browser', err_5);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    MainTabPage.prototype.startEventSubscription = function () {
        /*        //trying to fix the bug: Keyboard Dismissal Leaves Viewport Shifted in iOS 12 / XCode 10 #417
                // this can be removed once Apple fixed the webview sdk 12
                window.addEventListener('keyboardDidHide', function() {
                    if (window.pageYOffset != 0) {
                        window.scrollTo(0, 0);
                    }
                });*/
        var _this = this;
        if (_capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Capacitor"].isPluginAvailable('App')) {
            App.addListener('appStateChange', function (appState) { return __awaiter(_this, void 0, void 0, function () {
                var _a, err_6, status_2, usageTimeInSec;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!appState.isActive) return [3 /*break*/, 8];
                            console.log("app state change");
                            this.userData.loginAt = new Date();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            if (!(this.userData.user && this.userData.user.churches && this.userData.user.churches.length)) return [3 /*break*/, 3];
                            _a = this.userData;
                            return [4 /*yield*/, this.userData.hasAdminAccess(this.userData.user.churches[this.userData.currentCommunityIndex]._id)];
                        case 2:
                            _a.currentCommunityAdminStatus = _b.sent();
                            _b.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            err_6 = _b.sent();
                            console.log('failed to check admin access');
                            return [3 /*break*/, 5];
                        case 5: return [4 /*yield*/, this.chatService.refreshTabBadges()];
                        case 6:
                            _b.sent();
                            this.userData.refreshAppPages();
                            this.userData.resetOSBadges();
                            return [4 /*yield*/, Network.getStatus()];
                        case 7:
                            status_2 = _b.sent();
                            if (!status_2.connected) {
                                this.networkService.showNoNetworkAlert();
                            }
                            setTimeout(function () {
                                _this.readyToDetectNetworkChange = true;
                            }, 2000);
                            if (this.platform.is('cordova'))
                                this.screenOrientation.unlock(); // unlock screen orientation upon resume
                            return [3 /*break*/, 11];
                        case 8:
                            if (this.platform.is('cordova'))
                                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT); // lock screen orientation so it won't rotate in pocket
                            if (!this.userData.loginAt) return [3 /*break*/, 10];
                            usageTimeInSec = Math.ceil((new Date().getTime() - this.userData.loginAt.getTime()) / 1000);
                            return [4 /*yield*/, this.systemLog.logAppUsage(usageTimeInSec)];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10:
                            this.readyToDetectNetworkChange = false;
                            _b.label = 11;
                        case 11: return [2 /*return*/];
                    }
                });
            }); });
        }
        this.subscriptions['enablePushNotification'] = this.userData.enablePushNotification$.subscribe(function (activate) {
            if (activate) {
                _this.initPushNotification(); // set up push notification
                _this.requestBadgePermission(); // badge API requires notification permission
            }
        });
        try {
            if (_capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Capacitor"].isPluginAvailable('LocalNotifications')) {
                _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].LocalNotifications.registerActionTypes({
                    types: [
                        {
                            id: 'SHOW_CHAT',
                            actions: [{
                                    id: 'openchat',
                                    title: 'Open Chat Room'
                                }]
                        },
                        {
                            id: 'SHOW_MOMENT',
                            actions: [{
                                    id: 'openmoment',
                                    title: 'Show Restvo Feature'
                                }]
                        }
                    ]
                });
                _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].LocalNotifications.addListener('localNotificationActionPerformed', function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var params;
                    return __generator(this, function (_a) {
                        console.log('Notification action performed', result.notification);
                        if (result.notification.extra.type === 'message') {
                            this.openGroupChat(result.notification.extra.data);
                        }
                        else if (result.notification.extra.type === 'moment') {
                            params = {};
                            if (result.notification.extra.data.relationshipId) {
                                params.relationshipId = result.notification.extra.data.relationshipId;
                            }
                            if (result.notification.extra.data.calendarId) {
                                params.calendarId = result.notification.extra.data.calendarId;
                            }
                            if (this.platform.width() < 768) {
                                params.moment = { _id: result.notification.extra.data.momentId };
                                params.modalPage = true;
                                this.momentService.openMoment(params);
                            }
                            else {
                                this.router.navigate(['/app/discover/activity/' + result.notification.extra.data.momentId, params]);
                            }
                        }
                        return [2 /*return*/];
                    });
                }); });
            }
        }
        catch (error) { }
        this.subscriptions['toastNotification'] = this.chatService.toastNotification$.subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var data, type, toast_1, closedByTimeout_1, timeoutHandle, toast_2, closedByTimeout_2, timeoutHandle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!res)
                            return [2 /*return*/];
                        if (this.platform.is('cordova') && this.userData.user.enablePushNotification) {
                            this.badge.increase(1);
                        }
                        data = res.data;
                        type = res.type;
                        if (!(type === 'message')) return [3 /*break*/, 5];
                        if (!(this.platform.is('cordova') && _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Capacitor"].isPluginAvailable('LocalNotifications'))) return [3 /*break*/, 1];
                        LocalNotifications.schedule({
                            notifications: [
                                {
                                    title: data.author ? data.author.first_name + ' ' + data.author.last_name : data.author_pending_member.name,
                                    body: (data.body || '') + ((data.moment && data.moment.resource) ? data.moment.resource['en-US'].value[0] : '') + (!(data.body || data.moment || data.response) ? 'sent you an attachment.' : ''),
                                    id: 1001,
                                    schedule: { at: new Date(Date.now() + 1000) },
                                    sound: null,
                                    attachments: null,
                                    actionTypeId: 'SHOW_CHAT',
                                    extra: { type: type, data: data }
                                }
                            ]
                        });
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.toastCtrl.create({
                            message: (data.author ? data.author.first_name + ' ' + data.author.last_name : data.author_pending_member.name) + ': ' + (data.body || '') + ((data.moment && data.moment.resource) ? data.moment.resource['en-US'].value[0] : '') + (!(data.body || data.moment || data.response) ? 'sent you an attachment.' : ''),
                            buttons: [
                                {
                                    text: 'Open',
                                    role: 'cancel'
                                }
                            ],
                            duration: 5000,
                            position: 'top'
                        })];
                    case 2:
                        toast_1 = _a.sent();
                        toast_1.present();
                        closedByTimeout_1 = false;
                        timeoutHandle = setTimeout(function () { closedByTimeout_1 = true; toast_1.dismiss(); }, 5000);
                        return [4 /*yield*/, toast_1.onDidDismiss()];
                    case 3:
                        _a.sent();
                        if (closedByTimeout_1) {
                            return [2 /*return*/];
                        }
                        clearTimeout(timeoutHandle);
                        this.openGroupChat(data);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        if (!(type === 'moment')) return [3 /*break*/, 9];
                        if (!(this.platform.is('cordova') && _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Capacitor"].isPluginAvailable('LocalNotifications'))) return [3 /*break*/, 6];
                        LocalNotifications.schedule({
                            notifications: [
                                {
                                    title: data.title,
                                    body: data.body,
                                    id: 1002,
                                    schedule: { at: new Date(Date.now() + 1000) },
                                    sound: null,
                                    attachments: null,
                                    actionTypeId: 'SHOW_MOMENT',
                                    extra: { type: type, data: data }
                                }
                            ]
                        });
                        return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, this.toastCtrl.create({
                            message: data.title + ': ' + data.body,
                            buttons: [
                                {
                                    text: 'Open',
                                    role: 'cancel'
                                }
                            ],
                            duration: 5000,
                            position: 'top'
                        })];
                    case 7:
                        toast_2 = _a.sent();
                        closedByTimeout_2 = false;
                        timeoutHandle = setTimeout(function () {
                            closedByTimeout_2 = true;
                            toast_2.dismiss();
                        }, 5000);
                        return [4 /*yield*/, toast_2.onDidDismiss()];
                    case 8:
                        _a.sent();
                        if (closedByTimeout_2) {
                            return [2 /*return*/];
                        }
                        clearTimeout(timeoutHandle);
                        this.router.navigate(['/app/activity/' + data.momentId]);
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        }); });
        this.subscriptions['openChat'] = this.chatService.openChat$.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.openGroupChat(data);
                return [2 /*return*/];
            });
        }); });
        this.subscriptions['openMoment'] = this.momentService.openMoment$.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data && data.modalPage)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_23__["ShowfeaturePage"], componentProps: data })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (data && data.momentId) {
                            this.router.navigate(['/app/activity/' + data.momentId]);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.subscriptions['openUserPrograms'] = this.userData.openUserPrograms$.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var manageModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data)
                            return [2 /*return*/];
                        if (!data.modalPage) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _user_programs_programs_page__WEBPACK_IMPORTED_MODULE_28__["ProgramsPage"], componentProps: { modalPage: true } })];
                    case 1:
                        manageModal = _a.sent();
                        return [4 /*yield*/, manageModal.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.router.navigate(['/app/user/programs']);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.subscriptions['editMoment'] = this.momentService.editMoment$.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data && data.modalPage)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_editfeature_editfeature_page__WEBPACK_IMPORTED_MODULE_24__["EditfeaturePage"], componentProps: data })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (data && data.momentId) {
                            this.router.navigate(['/app/edit/' + data.momentId]);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.subscriptions['manageMoment'] = this.momentService.manageMoment$.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var managePage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(data && data.modalPage)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: _feature_manage_managefeature_page__WEBPACK_IMPORTED_MODULE_27__["ManagefeaturePage"],
                                componentProps: data
                            })];
                    case 1:
                        managePage = _a.sent();
                        return [4 /*yield*/, managePage.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (data && data.moment && data.moment._id) {
                            this.router.navigate(['/app/manage/activity/' + data.moment._id + '/profile/' + data.moment._id]);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.subscriptions['openOnboarding'] = this.authService.openOnboarding$.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_onboardfeature_onboardfeature_page__WEBPACK_IMPORTED_MODULE_22__["OnboardfeaturePage"], componentProps: data })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.subscriptions['openPreferences'] = this.momentService.openPreferences$.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var messagePage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: _discover_preferences_preferences_page__WEBPACK_IMPORTED_MODULE_21__["PreferencesPage"],
                                componentProps: data
                            })];
                    case 1:
                        messagePage = _a.sent();
                        return [4 /*yield*/, messagePage.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.subscriptions['editParticipants'] = this.momentService.editParticipants$.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_editparticipants_editparticipants_page__WEBPACK_IMPORTED_MODULE_26__["EditparticipantsPage"], componentProps: data })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        if (this.electronService.isElectronApp) {
            this.electronService.ipcRenderer.on('CHAT:::OPEN', function (_, data) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.openGroupChat(data);
                    return [2 /*return*/];
                });
            }); });
            this.electronService.ipcRenderer.on('CHAT:::SEND_REPLY', function (_, data) { return __awaiter(_this, void 0, void 0, function () {
                var socketData, serverData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            socketData = {
                                conversationId: data.conversationId,
                                body: data.composedMessage,
                                quote: {
                                    body: '',
                                    attachments: [],
                                    author: ''
                                },
                                createdAt: new Date(),
                                author: {
                                    _id: this.userData.user._id,
                                    first_name: this.userData.user.first_name,
                                    last_name: this.userData.user.last_name,
                                    avatar: this.userData.user.avatar
                                },
                                status: 'pending',
                                confirmId: Math.random()
                            };
                            serverData = {
                                replyQuote: null,
                                composedMessage: data.composedMessage,
                                groupId: (data.group) ? data.group._id : null,
                                groupName: (data.group) ? data.group.name : null
                            };
                            return [4 /*yield*/, this.chatService.sendReply(data.conversationId, serverData, socketData)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        this.subscriptions['toggleVideoChat'] = this.chatService.toggleVideoChat$.subscribe(function (params) {
            if (params) {
                _this.toggleVideoChat(params);
                _this.pendingVideoChatRoomId = params.videoChatRoomId;
            }
        });
        this.hasSetupEventListeners = true;
    };
    MainTabPage.prototype.openGroupChat = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var messagePage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('incoming data', data);
                        if (!data) return [3 /*break*/, 3];
                        if (data.group) { // for a group chat
                            this.chatService.currentChatProps.push({
                                conversationId: data.conversationId,
                                name: data.group.name,
                                page: 'chat',
                                group: data.group,
                                badge: true,
                                modalPage: true,
                                cssClass: 'level-10'
                            });
                        }
                        else if (data.author) { // for a 1-1 message, which can be a text message or sending a moment as the content
                            this.chatService.currentChatProps.push({
                                conversationId: data.conversationId,
                                name: data.author.first_name + ' ' + data.author.last_name,
                                page: 'chat',
                                badge: true,
                                modalPage: true,
                                recipient: data.author,
                                cssClass: 'level-10'
                            });
                        }
                        else if (data.moment) { // if no author is provided but only the moment object, it is to view the moment's conversation
                            this.chatService.currentChatProps.push({
                                conversationId: data.conversationId,
                                name: data.moment.name,
                                moment: data.moment,
                                page: 'chat',
                                badge: true,
                                modalPage: true,
                                cssClass: 'level-10'
                            });
                        }
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_8__["GroupchatPage"],
                                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                            })];
                    case 1:
                        messagePage = _a.sent();
                        return [4 /*yield*/, messagePage.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MainTabPage.prototype.toggleVideoChat = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var videoEndpoint_1, Jitsi, err_7, networkAlert, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.userData.readyToControlVideoChat) return [3 /*break*/, 14];
                        if (!!this.userData.videoChatRoomId) return [3 /*break*/, 11];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 10]);
                        this.userData.readyToControlVideoChat = false;
                        setTimeout(function () {
                            _this.userData.readyToControlVideoChat = true;
                        }, 10000); // default video chat load timeout = 10s
                        return [4 /*yield*/, this.resourceService.assignVideoEndpoint(params.videoChatRoomId)];
                    case 2:
                        videoEndpoint_1 = _b.sent();
                        if (!this.platform.is('cordova')) return [3 /*break*/, 4];
                        Jitsi = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].Jitsi;
                        return [4 /*yield*/, Jitsi.joinConference({
                                roomName: params.videoChatRoomId,
                                url: videoEndpoint_1.ssl + videoEndpoint_1.url,
                                channelLastN: params.channelLastN,
                                startWithAudioMuted: params.startWithAudioMuted,
                                startWithVideoMuted: params.startWithVideoMuted
                            })];
                    case 3:
                        _b.sent();
                        window.addEventListener('onConferenceJoined', this.onJitsiLoaded);
                        window.addEventListener('onConferenceLeft', this.onJitsiUnloaded);
                        return [3 /*break*/, 5];
                    case 4:
                        if (this.platform.is('mobileweb')) { // mobile web, display download app page
                            this.router.navigate(['/app/video/' + this.pendingVideoChatRoomId]);
                        }
                        else if (this.electronService.isElectronApp) { // eletron app, open in same window
                            Object(scriptjs__WEBPACK_IMPORTED_MODULE_19__["get"])('https://meet.jit.si/external_api.js', function () {
                                var domain = videoEndpoint_1.url;
                                var options = {
                                    roomName: params.videoChatRoomId,
                                    width: '100%',
                                    height: 400,
                                    parentNode: document.querySelector('#videoSpace'),
                                    configOverwrite: {
                                        channelLastN: parseInt(params.channelLastN || '-1', 10),
                                        startWithAudioMuted: params.startWithAudioMuted,
                                        startWithVideoMuted: params.startWithVideoMuted
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
                                    onload: _this.onJitsiLoaded(params)
                                };
                                _this.jitsi = new JitsiMeetExternalAPI(domain, options);
                            });
                        }
                        else { // on desktop web, open another tab and run external API
                            window.open(window.location.protocol + '//' + window.location.host + '/app/video/' + this.pendingVideoChatRoomId + ';channelLastN=' + params.channelLastN + ';startWithAudioMuted=' + params.startWithAudioMuted + ';startWithVideoMuted=' + params.startWithVideoMuted, "_blank");
                        }
                        _b.label = 5;
                    case 5: return [3 /*break*/, 10];
                    case 6:
                        err_7 = _b.sent();
                        this.userData.readyToControlVideoChat = true;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'No Internet Connection',
                                message: 'Please check your internet connection.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 7: return [4 /*yield*/, _b.sent()];
                    case 8:
                        networkAlert = _b.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 14];
                    case 11:
                        this.userData.readyToControlVideoChat = true;
                        _a = this.userData.user;
                        if (!_a) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.userData.checkRestExpired()];
                    case 12:
                        _a = (_b.sent());
                        _b.label = 13;
                    case 13:
                        // logically only happens on non-native app (the toggleVideoChat button is covered by the native Jitsi view during call)
                        if (_a) {
                            this.chatService.socket.emit('online status', this.userData.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'leave video chat', origin: this.chatService.socket.id, videoChatRoomId: this.userData.videoChatRoomId });
                        }
                        this.userData.videoChatRoomId = '';
                        if (this.platform.is('cordova')) {
                            // onJitisiUnloaded will take care of clean up
                        }
                        else {
                            this.jitsi.executeCommand('hangup');
                        }
                        // @ts-ignore
                        $("#videoSpace").empty();
                        _b.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    MainTabPage.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.subscriptions && this.hasSetupEventListeners) {
            this.subscriptions['enablePushNotification'].unsubscribe('enablePushNotification', function () {
                _this.initPushNotification(); // set up push notification
                _this.requestBadgePermission(); // badge API requires notification permission
            });
            this.subscriptions['openChat'].unsubscribe('openChat', function (data) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.openGroupChat(data);
                    return [2 /*return*/];
                });
            }); });
            this.subscriptions['openMoment'].unsubscribe('openMoment', function (data) { return __awaiter(_this, void 0, void 0, function () {
                var modal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!data.modalPage) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_23__["ShowfeaturePage"], componentProps: data })];
                        case 1:
                            modal = _a.sent();
                            return [4 /*yield*/, modal.present()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            this.router.navigate(['/app/activity/' + data.momentId]);
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            this.subscriptions['openUserPrograms'].unsubscribe('openUserPrograms', function (data) { return __awaiter(_this, void 0, void 0, function () {
                var manageModal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!data.modalPage) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.modalCtrl.create({ component: _user_programs_programs_page__WEBPACK_IMPORTED_MODULE_28__["ProgramsPage"], componentProps: { modalPage: true } })];
                        case 1:
                            manageModal = _a.sent();
                            return [4 /*yield*/, manageModal.present()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            this.router.navigate(['/app/user/programs']);
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            this.subscriptions['editMoment'].unsubscribe('editMoment', function (data) { return __awaiter(_this, void 0, void 0, function () {
                var modal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!data.modalPage) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.modalCtrl.create({ component: _feature_editfeature_editfeature_page__WEBPACK_IMPORTED_MODULE_24__["EditfeaturePage"], componentProps: data })];
                        case 1:
                            modal = _a.sent();
                            return [4 /*yield*/, modal.present()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            this.router.navigate(['/app/edit/' + data.momentId]);
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            this.subscriptions['manageMoment'].unsubscribe('manageMoment', function (data) { return __awaiter(_this, void 0, void 0, function () {
                var managePage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!data.modalPage) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.modalCtrl.create({
                                    component: _feature_manage_managefeature_page__WEBPACK_IMPORTED_MODULE_27__["ManagefeaturePage"],
                                    componentProps: data
                                })];
                        case 1:
                            managePage = _a.sent();
                            return [4 /*yield*/, managePage.present()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            this.router.navigate(['/app/manage/activity/' + data.moment._id + '/profile/' + data.moment._id]);
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            this.subscriptions['openOnboarding'].unsubscribe('openOnboarding', function (data) { return __awaiter(_this, void 0, void 0, function () {
                var modal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _feature_onboardfeature_onboardfeature_page__WEBPACK_IMPORTED_MODULE_22__["OnboardfeaturePage"], componentProps: data })];
                        case 1:
                            modal = _a.sent();
                            return [4 /*yield*/, modal.present()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            this.subscriptions['openPreferences'].unsubscribe('openPreferences', function (data) { return __awaiter(_this, void 0, void 0, function () {
                var messagePage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.modalCtrl.create({
                                component: _discover_preferences_preferences_page__WEBPACK_IMPORTED_MODULE_21__["PreferencesPage"],
                                componentProps: data
                            })];
                        case 1:
                            messagePage = _a.sent();
                            return [4 /*yield*/, messagePage.present()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            this.subscriptions['editParticipants'].unsubscribe('editParticipants', function (data) { return __awaiter(_this, void 0, void 0, function () {
                var modal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _feature_editparticipants_editparticipants_page__WEBPACK_IMPORTED_MODULE_26__["EditparticipantsPage"], componentProps: data })];
                        case 1:
                            modal = _a.sent();
                            return [4 /*yield*/, modal.present()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            this.subscriptions['toggleVideoChat'].unsubscribe('toggleVideoChat', function (params) {
                _this.toggleVideoChat(params);
                _this.pendingVideoChatRoomId = params.videoChatRoomId;
            });
        }
    };
    MainTabPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"] },
        { type: _angular_service_worker__WEBPACK_IMPORTED_MODULE_1__["SwPush"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_4__["CacheService"] },
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_2__["ElectronService"] },
        { type: _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_13__["ScreenOrientation"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_12__["Storage"] },
        { type: _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_10__["Badge"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["MenuController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["NavController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_17__["Auth"] },
        { type: _services_network_service_service__WEBPACK_IMPORTED_MODULE_7__["NetworkService"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_18__["Resource"] },
        { type: _services_calendar_service__WEBPACK_IMPORTED_MODULE_25__["CalendarService"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"] },
        { type: _services_systemlog_service__WEBPACK_IMPORTED_MODULE_16__["Systemlog"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_15__["Moment"] },
        { type: _services_board_service__WEBPACK_IMPORTED_MODULE_14__["Board"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_5__["Chat"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('videoSpace', { static: false }),
        __metadata("design:type", Object)
    ], MainTabPage.prototype, "videoSpace", void 0);
    MainTabPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main-tab',
            template: __importDefault(__webpack_require__(/*! raw-loader!./main-tab.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/main-tab/main-tab.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./main-tab.page.scss */ "./src/app/pages/main-tab/main-tab.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"],
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_1__["SwPush"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_4__["CacheService"],
            ngx_electron__WEBPACK_IMPORTED_MODULE_2__["ElectronService"],
            _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_13__["ScreenOrientation"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_12__["Storage"],
            _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_10__["Badge"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["MenuController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["NavController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_17__["Auth"],
            _services_network_service_service__WEBPACK_IMPORTED_MODULE_7__["NetworkService"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_18__["Resource"],
            _services_calendar_service__WEBPACK_IMPORTED_MODULE_25__["CalendarService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"],
            _services_systemlog_service__WEBPACK_IMPORTED_MODULE_16__["Systemlog"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_15__["Moment"],
            _services_board_service__WEBPACK_IMPORTED_MODULE_14__["Board"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_5__["Chat"]])
    ], MainTabPage);
    return MainTabPage;
}());



/***/ }),

/***/ "./src/app/services/systemlog.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/systemlog.service.ts ***!
  \***********************************************/
/*! exports provided: Systemlog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Systemlog", function() { return Systemlog; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _network_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./network-service.service */ "./src/app/services/network-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





var Systemlog = /** @class */ (function () {
    function Systemlog(http, authService, userData, networkService) {
        this.http = http;
        this.authService = authService;
        this.userData = userData;
        this.networkService = networkService;
    }
    Systemlog.prototype.logAppUsage = function (time) {
        var churches = [];
        if (this.userData && this.userData.user && this.userData.user.churches && this.userData.user.churches.length) {
            churches = this.userData.user.churches.map(function (c) { return c._id; });
        }
        return this.http.post(this.networkService.domain + '/api/systemlog/appusage', JSON.stringify({ time: time, churches: churches }), this.authService.httpAuthOptions).toPromise();
    };
    Systemlog.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_2__["Auth"] },
        { type: _user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"] },
        { type: _network_service_service__WEBPACK_IMPORTED_MODULE_4__["NetworkService"] }
    ]; };
    Systemlog = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _auth_service__WEBPACK_IMPORTED_MODULE_2__["Auth"],
            _user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"],
            _network_service_service__WEBPACK_IMPORTED_MODULE_4__["NetworkService"]])
    ], Systemlog);
    return Systemlog;
}());



/***/ })

}]);
//# sourceMappingURL=pages-main-tab-main-tab-module.js.map