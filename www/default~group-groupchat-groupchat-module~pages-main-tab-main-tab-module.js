(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~group-groupchat-groupchat-module~pages-main-tab-main-tab-module"],{

/***/ "./src/app/pages/connect/focus-photo/focus-photo.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/connect/focus-photo/focus-photo.module.ts ***!
  \*****************************************************************/
/*! exports provided: FocusPhotoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusPhotoPageModule", function() { return FocusPhotoPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _focus_photo_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./focus-photo.page */ "./src/app/pages/connect/focus-photo/focus-photo.page.ts");
/* harmony import */ var ngx_pinch_zoom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-pinch-zoom */ "./node_modules/ngx-pinch-zoom/fesm5/ngx-pinch-zoom.js");
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
        component: _focus_photo_page__WEBPACK_IMPORTED_MODULE_5__["FocusPhotoPage"]
    }
];
var FocusPhotoPageModule = /** @class */ (function () {
    function FocusPhotoPageModule() {
    }
    FocusPhotoPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                ngx_pinch_zoom__WEBPACK_IMPORTED_MODULE_6__["PinchZoomModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_focus_photo_page__WEBPACK_IMPORTED_MODULE_5__["FocusPhotoPage"]]
        })
    ], FocusPhotoPageModule);
    return FocusPhotoPageModule;
}());



/***/ }),

/***/ "./src/app/pages/group/editgroup/editgroup.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/group/editgroup/editgroup.module.ts ***!
  \***********************************************************/
/*! exports provided: EditgroupPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditgroupPageModule", function() { return EditgroupPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _editgroup_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editgroup.page */ "./src/app/pages/group/editgroup/editgroup.page.ts");
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
        component: _editgroup_page__WEBPACK_IMPORTED_MODULE_5__["EditgroupPage"]
    }
];
var EditgroupPageModule = /** @class */ (function () {
    function EditgroupPageModule() {
    }
    EditgroupPageModule = __decorate([
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
            declarations: [_editgroup_page__WEBPACK_IMPORTED_MODULE_5__["EditgroupPage"]]
        })
    ], EditgroupPageModule);
    return EditgroupPageModule;
}());



/***/ }),

/***/ "./src/app/pages/group/editgroupmember/editgroupmember.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/group/editgroupmember/editgroupmember.module.ts ***!
  \***********************************************************************/
/*! exports provided: EditgroupmemberPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditgroupmemberPageModule", function() { return EditgroupmemberPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _editgroupmember_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editgroupmember.page */ "./src/app/pages/group/editgroupmember/editgroupmember.page.ts");
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
        component: _editgroupmember_page__WEBPACK_IMPORTED_MODULE_5__["EditgroupmemberPage"]
    }
];
var EditgroupmemberPageModule = /** @class */ (function () {
    function EditgroupmemberPageModule() {
    }
    EditgroupmemberPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_editgroupmember_page__WEBPACK_IMPORTED_MODULE_5__["EditgroupmemberPage"]]
        })
    ], EditgroupmemberPageModule);
    return EditgroupmemberPageModule;
}());



/***/ }),

/***/ "./src/app/pages/group/group-popover/group-popover.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/group/group-popover/group-popover.module.ts ***!
  \*******************************************************************/
/*! exports provided: GroupPopoverPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupPopoverPageModule", function() { return GroupPopoverPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _group_popover_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./group-popover.page */ "./src/app/pages/group/group-popover/group-popover.page.ts");
/* harmony import */ var _showgroup_showgroup_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../showgroup/showgroup.module */ "./src/app/pages/group/showgroup/showgroup.module.ts");
/* harmony import */ var _editgroup_editgroup_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editgroup/editgroup.module */ "./src/app/pages/group/editgroup/editgroup.module.ts");
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
        component: _group_popover_page__WEBPACK_IMPORTED_MODULE_5__["GroupPopoverPage"]
    }
];
var GroupPopoverPageModule = /** @class */ (function () {
    function GroupPopoverPageModule() {
    }
    GroupPopoverPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _editgroup_editgroup_module__WEBPACK_IMPORTED_MODULE_7__["EditgroupPageModule"],
                _showgroup_showgroup_module__WEBPACK_IMPORTED_MODULE_6__["ShowgroupPageModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_group_popover_page__WEBPACK_IMPORTED_MODULE_5__["GroupPopoverPage"]]
        })
    ], GroupPopoverPageModule);
    return GroupPopoverPageModule;
}());



/***/ }),

/***/ "./src/app/pages/group/groupchat/groupchat-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/group/groupchat/groupchat-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: GroupchatPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupchatPageRoutingModule", function() { return GroupchatPageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _groupchat_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./groupchat.page */ "./src/app/pages/group/groupchat/groupchat.page.ts");
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
        component: _groupchat_page__WEBPACK_IMPORTED_MODULE_2__["GroupchatPage"]
    },
];
var GroupchatPageRoutingModule = /** @class */ (function () {
    function GroupchatPageRoutingModule() {
    }
    GroupchatPageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], GroupchatPageRoutingModule);
    return GroupchatPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/group/groupchat/groupchat.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/group/groupchat/groupchat.module.ts ***!
  \***********************************************************/
/*! exports provided: GroupchatPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupchatPageModule", function() { return GroupchatPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_autosize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-autosize */ "./node_modules/ngx-autosize/fesm5/ngx-autosize.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var ngx_plyr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-plyr */ "./node_modules/ngx-plyr/fesm5/ngx-plyr.js");
/* harmony import */ var _groupchat_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./groupchat.page */ "./src/app/pages/group/groupchat/groupchat.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var _feature_pickfeature_popover_pickfeature_popover_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../feature/pickfeature-popover/pickfeature-popover.module */ "./src/app/pages/feature/pickfeature-popover/pickfeature-popover.module.ts");
/* harmony import */ var _connect_focus_photo_focus_photo_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../connect/focus-photo/focus-photo.module */ "./src/app/pages/connect/focus-photo/focus-photo.module.ts");
/* harmony import */ var _editgroupmember_editgroupmember_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../editgroupmember/editgroupmember.module */ "./src/app/pages/group/editgroupmember/editgroupmember.module.ts");
/* harmony import */ var _groupchat_routing_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./groupchat-routing.module */ "./src/app/pages/group/groupchat/groupchat-routing.module.ts");
/* harmony import */ var _group_popover_group_popover_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../group-popover/group-popover.module */ "./src/app/pages/group/group-popover/group-popover.module.ts");
/* harmony import */ var _user_profile_profile_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../user/profile/profile.module */ "./src/app/pages/user/profile/profile.module.ts");
/* harmony import */ var _groupinfo_groupinfo_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../groupinfo/groupinfo.module */ "./src/app/pages/group/groupinfo/groupinfo.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};















var GroupchatPageModule = /** @class */ (function () {
    function GroupchatPageModule() {
    }
    GroupchatPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                ngx_autosize__WEBPACK_IMPORTED_MODULE_3__["AutosizeModule"],
                ngx_plyr__WEBPACK_IMPORTED_MODULE_5__["PlyrModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_7__["ApplicationPipesModule"],
                _groupchat_routing_module__WEBPACK_IMPORTED_MODULE_11__["GroupchatPageRoutingModule"],
                _feature_pickfeature_popover_pickfeature_popover_module__WEBPACK_IMPORTED_MODULE_8__["PickfeaturePopoverPageModule"],
                _connect_focus_photo_focus_photo_module__WEBPACK_IMPORTED_MODULE_9__["FocusPhotoPageModule"],
                _editgroupmember_editgroupmember_module__WEBPACK_IMPORTED_MODULE_10__["EditgroupmemberPageModule"],
                _group_popover_group_popover_module__WEBPACK_IMPORTED_MODULE_12__["GroupPopoverPageModule"],
                _user_profile_profile_module__WEBPACK_IMPORTED_MODULE_13__["ProfilePageModule"],
                _groupinfo_groupinfo_module__WEBPACK_IMPORTED_MODULE_14__["GroupinfoPageModule"]
            ],
            declarations: [_groupchat_page__WEBPACK_IMPORTED_MODULE_6__["GroupchatPage"]]
        })
    ], GroupchatPageModule);
    return GroupchatPageModule;
}());



/***/ }),

/***/ "./src/app/pages/group/groupinfo/groupinfo.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/group/groupinfo/groupinfo.module.ts ***!
  \***********************************************************/
/*! exports provided: GroupinfoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupinfoPageModule", function() { return GroupinfoPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _groupinfo_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./groupinfo.page */ "./src/app/pages/group/groupinfo/groupinfo.page.ts");
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
        component: _groupinfo_page__WEBPACK_IMPORTED_MODULE_5__["GroupinfoPage"]
    }
];
var GroupinfoPageModule = /** @class */ (function () {
    function GroupinfoPageModule() {
    }
    GroupinfoPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_groupinfo_page__WEBPACK_IMPORTED_MODULE_5__["GroupinfoPage"]]
        })
    ], GroupinfoPageModule);
    return GroupinfoPageModule;
}());



/***/ }),

/***/ "./src/app/pages/group/showgroup/showgroup.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/group/showgroup/showgroup.module.ts ***!
  \***********************************************************/
/*! exports provided: ShowgroupPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowgroupPageModule", function() { return ShowgroupPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _showgroup_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./showgroup.page */ "./src/app/pages/group/showgroup/showgroup.page.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.module */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.module.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
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
        component: _showgroup_page__WEBPACK_IMPORTED_MODULE_5__["ShowgroupPage"]
    }
];
var ShowgroupPageModule = /** @class */ (function () {
    function ShowgroupPageModule() {
    }
    ShowgroupPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_7__["ApplicationPipesModule"],
                _connect_showrecipientinfo_showrecipientinfo_module__WEBPACK_IMPORTED_MODULE_6__["ShowrecipientinfoModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_showgroup_page__WEBPACK_IMPORTED_MODULE_5__["ShowgroupPage"]]
        })
    ], ShowgroupPageModule);
    return ShowgroupPageModule;
}());



/***/ })

}]);
//# sourceMappingURL=default~group-groupchat-groupchat-module~pages-main-tab-main-tab-module.js.map