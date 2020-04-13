(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-main-tab-main-tab-module~user-user-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/user.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/user.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"userData.user\">\n  <ion-toolbar>\n    <ion-menu-toggle menu=\"main\" *ngIf=\"userData.user\" slot=\"start\" fill=\"clear\" id=\"user-menu-toggle\">\n    <ion-button fill=\"clear\" color=\"grey\">\n        <ion-icon name=\"menu\"></ion-icon>\n      </ion-button>\n      <ion-badge *ngIf=\"this.chatService && this.chatService.connectTabBadge\" mode=\"md\">{{this.chatService.connectTabBadge}}</ion-badge>\n    </ion-menu-toggle>\n    <ion-title>Settings</ion-title>\n    <ion-item lines=\"none\" routerLink=\"/app/user/profile\" *ngIf=\"userData.user && platform.width() >= 768\" slot=\"end\" mode=\"md\" style=\"--background: transparent\">\n      <ion-avatar slot=\"start\">\n        <ion-img *ngIf=\"userData.user && userData.user.avatar\" [src]=\"userData.user.avatar\"></ion-img>\n        <ion-img *ngIf=\"!userData.user || !userData.user.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n      </ion-avatar>\n      <ion-label>\n        {{userData.user.first_name}} {{userData.user.last_name}}\n      </ion-label>\n    </ion-item>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"userData.user\" forceOverscroll=\"false\">\n  <ion-grid>\n    <ion-row>\n      <ion-col size-xs=\"12\" size-sm=\"12\" size-md=\"3\" size-lg=\"3\">\n        <ion-list>\n          <ion-item (click)=\"clickManageMenu('profile')\">\n            <ion-icon slot=\"start\" name=\"person\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'profile')}\">User Profile</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('about')\">\n            <ion-icon slot=\"start\" name=\"bicycle\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'about')}\">About Me</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('programs')\">\n            <ion-icon slot=\"start\" name=\"book\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'programs')}\">Mentoring</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('calendar')\">\n            <ion-icon slot=\"start\" name=\"calendar\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'calendar')}\">Calendar</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('privacy')\">\n            <ion-icon slot=\"start\" name=\"settings\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'privacy')}\">Privacy & Security</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('notifications')\">\n            <ion-icon slot=\"start\" name=\"notifications\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'notifications')}\">Notifications</ion-label>\n          </ion-item>\n          <ion-item (click)=\"selectProgram()\">\n            <ion-icon slot=\"start\" ios=\"share\" md=\"share\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label>Invite</ion-label>\n          </ion-item>\n          <ion-item (click)=\"logout($event)\">\n            <ion-icon slot=\"start\" name=\"log-out\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label>Log Out</ion-label>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n      <ion-col size-xs=\"0\" size-sm=\"0\" size-md=\"9\" size-lg=\"9\" *ngIf=\"this.platform.width() >= 768\">\n        <ion-router-outlet></ion-router-outlet>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/connect/invitetoconnect/invitetoconnect.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/pages/connect/invitetoconnect/invitetoconnect.module.ts ***!
  \*************************************************************************/
/*! exports provided: InvitetoconnectModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvitetoconnectModule", function() { return InvitetoconnectModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _invitetoconnect_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invitetoconnect.page */ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.ts");
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
        component: _invitetoconnect_page__WEBPACK_IMPORTED_MODULE_5__["InvitetoconnectPage"]
    }
];
var InvitetoconnectModule = /** @class */ (function () {
    function InvitetoconnectModule() {
    }
    InvitetoconnectModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_5__["InvitetoconnectPage"]]
        })
    ], InvitetoconnectModule);
    return InvitetoconnectModule;
}());



/***/ }),

/***/ "./src/app/pages/discover/preferences/preferences.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/discover/preferences/preferences.module.ts ***!
  \******************************************************************/
/*! exports provided: PreferencesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferencesPageModule", function() { return PreferencesPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _preferences_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./preferences.page */ "./src/app/pages/discover/preferences/preferences.page.ts");
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
        component: _preferences_page__WEBPACK_IMPORTED_MODULE_5__["PreferencesPage"]
    }
];
var PreferencesPageModule = /** @class */ (function () {
    function PreferencesPageModule() {
    }
    PreferencesPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_preferences_page__WEBPACK_IMPORTED_MODULE_5__["PreferencesPage"]]
        })
    ], PreferencesPageModule);
    return PreferencesPageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/about/about.module.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/user/about/about.module.ts ***!
  \**************************************************/
/*! exports provided: AboutPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPageModule", function() { return AboutPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _about_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./about.page */ "./src/app/pages/user/about/about.page.ts");
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
        component: _about_page__WEBPACK_IMPORTED_MODULE_5__["AboutPage"]
    }
];
var AboutPageModule = /** @class */ (function () {
    function AboutPageModule() {
    }
    AboutPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_about_page__WEBPACK_IMPORTED_MODULE_5__["AboutPage"]]
        })
    ], AboutPageModule);
    return AboutPageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/profile/profile.module.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/user/profile/profile.module.ts ***!
  \******************************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "./src/app/pages/user/profile/profile.page.ts");
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
        component: _profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"],
    }
];
var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__["ApplicationPipesModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
            ],
            declarations: [
                _profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"],
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/user-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/user/user-routing.module.ts ***!
  \***************************************************/
/*! exports provided: UserRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRoutingModule", function() { return UserRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.page */ "./src/app/pages/user/user.page.ts");
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
        component: _user_page__WEBPACK_IMPORTED_MODULE_2__["UserPage"],
        children: [
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: './profile/profile.module#ProfilePageModule'
                    }
                ]
            },
            {
                path: 'about',
                children: [
                    {
                        path: '',
                        loadChildren: './about/about.module#AboutPageModule'
                    }
                ]
            },
            {
                path: 'allpreferences',
                children: [
                    {
                        path: '',
                        loadChildren: '../discover/preferences/preferences.module#PreferencesPageModule'
                    }
                ]
            },
            {
                path: 'preferences',
                children: [
                    {
                        path: ':programId',
                        loadChildren: '../discover/preferences/preferences.module#PreferencesPageModule'
                    }
                ]
            },
            {
                path: 'programs',
                children: [
                    {
                        path: '',
                        loadChildren: './programs/programs.module#ProgramsPageModule'
                    }
                ]
            },
            {
                path: 'calendar',
                children: [
                    {
                        path: '',
                        loadChildren: './dashboard/dashboard.module#DashboardPageModule'
                    }
                ]
            },
            {
                path: 'privacy',
                children: [
                    {
                        path: '',
                        loadChildren: './settings/settings.module#SettingsPageModule'
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
                path: 'notifications',
                children: [
                    {
                        path: '',
                        loadChildren: './notifications/notifications.module#NotificationsPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/user/profile',
                pathMatch: 'full'
            }
        ]
    }
];
var UserRoutingModule = /** @class */ (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/user/user.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/user/user.module.ts ***!
  \*******************************************/
/*! exports provided: UserPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPageModule", function() { return UserPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var _user_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.page */ "./src/app/pages/user/user.page.ts");
/* harmony import */ var _user_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-routing.module */ "./src/app/pages/user/user-routing.module.ts");
/* harmony import */ var _profile_profile_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile/profile.module */ "./src/app/pages/user/profile/profile.module.ts");
/* harmony import */ var _about_about_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./about/about.module */ "./src/app/pages/user/about/about.module.ts");
/* harmony import */ var _settings_settings_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./settings/settings.module */ "./src/app/pages/user/settings/settings.module.ts");
/* harmony import */ var _discover_preferences_preferences_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../discover/preferences/preferences.module */ "./src/app/pages/discover/preferences/preferences.module.ts");
/* harmony import */ var _programs_programs_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./programs/programs.module */ "./src/app/pages/user/programs/programs.module.ts");
/* harmony import */ var _notifications_notifications_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./notifications/notifications.module */ "./src/app/pages/user/notifications/notifications.module.ts");
/* harmony import */ var _connect_invitetoconnect_invitetoconnect_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../connect/invitetoconnect/invitetoconnect.module */ "./src/app/pages/connect/invitetoconnect/invitetoconnect.module.ts");
/* harmony import */ var _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dashboard/dashboard.module */ "./src/app/pages/user/dashboard/dashboard.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};














var UserPageModule = /** @class */ (function () {
    function UserPageModule() {
    }
    UserPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _user_routing_module__WEBPACK_IMPORTED_MODULE_5__["UserRoutingModule"],
                _profile_profile_module__WEBPACK_IMPORTED_MODULE_6__["ProfilePageModule"],
                _about_about_module__WEBPACK_IMPORTED_MODULE_7__["AboutPageModule"],
                _discover_preferences_preferences_module__WEBPACK_IMPORTED_MODULE_9__["PreferencesPageModule"],
                _settings_settings_module__WEBPACK_IMPORTED_MODULE_8__["SettingsPageModule"],
                _programs_programs_module__WEBPACK_IMPORTED_MODULE_10__["ProgramsPageModule"],
                _connect_invitetoconnect_invitetoconnect_module__WEBPACK_IMPORTED_MODULE_12__["InvitetoconnectModule"],
                _notifications_notifications_module__WEBPACK_IMPORTED_MODULE_11__["NotificationsPageModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_3__["ApplicationPipesModule"],
                _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_13__["DashboardPageModule"]
            ],
            declarations: [
                _user_page__WEBPACK_IMPORTED_MODULE_4__["UserPage"]
            ],
        })
    ], UserPageModule);
    return UserPageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/user.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/user/user.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-user ion-menu-toggle ion-badge {\n  position: relative;\n  top: 0.1rem;\n  right: 22px;\n  /*& ~ ion-icon {\n    outline-color: whitesmoke;\n  }*/\n  z-index: 5;\n}\napp-user ion-grid {\n  height: 100%;\n}\napp-user ion-row {\n  height: 100%;\n}\napp-user ion-col {\n  height: 100%;\n}\napp-user ion-router-outlet {\n  border-left: 1px solid var(--ion-color-lightgrey);\n}\napp-user ion-content {\n  display: flex;\n  flex-direction: column;\n}\napp-user .bold-font {\n  font-weight: bold;\n}\napp-user .image-cropper {\n  width: 200px;\n  height: 200px;\n  overflow: hidden;\n  border-radius: 50%;\n  margin: 5% auto;\n}\napp-user img {\n  -o-object-fit: cover;\n     object-fit: cover;\n  width: 100%;\n  height: 100%;\n}\napp-user .profile-pic {\n  width: 100%;\n  margin: auto;\n  display: block;\n}\napp-user .calling_code {\n  float: left;\n  max-width: 20%;\n  padding: 8px;\n}\napp-user .phone_number {\n  position: absolute;\n  left: 20%;\n  bottom: 2px;\n  max-width: 50%;\n}\napp-user .verify_button {\n  right: 5px;\n  margin-top: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL3VzZXIvdXNlci5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL3VzZXIvdXNlci5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0k7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBRUE7O0lBQUE7RUFHQSxVQUFBO0FDSE47QURPRTtFQUNFLFlBQUE7QUNMSjtBRFFFO0VBQ0UsWUFBQTtBQ05KO0FEU0U7RUFDRSxZQUFBO0FDUEo7QURVRTtFQUNFLGlEQUFBO0FDUko7QURXRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQ1RKO0FEWUU7RUFDRSxpQkFBQTtBQ1ZKO0FEYUU7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FDWEo7QURjRTtFQUNFLG9CQUFBO0tBQUEsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ1pKO0FEZUU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUNiSjtBRGdCRTtFQUNFLFdBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQ2RKO0FEaUJFO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7QUNmSjtBRGtCRTtFQUNFLFVBQUE7RUFDQSxnQkFBQTtBQ2hCSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXIvdXNlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtdXNlciB7XG5cbiAgaW9uLW1lbnUtdG9nZ2xlIHtcbiAgICBpb24tYmFkZ2Uge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgdG9wOiAwLjFyZW07XG4gICAgICByaWdodDogMjJweDtcblxuICAgICAgLyomIH4gaW9uLWljb24ge1xuICAgICAgICBvdXRsaW5lLWNvbG9yOiB3aGl0ZXNtb2tlO1xuICAgICAgfSovXG4gICAgICB6LWluZGV4OiA1O1xuICAgIH1cbiAgfVxuXG4gIGlvbi1ncmlkIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICBpb24tcm93IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICBpb24tY29sIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICBpb24tcm91dGVyLW91dGxldCB7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgfVxuXG4gIGlvbi1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICAuYm9sZC1mb250IHtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgfVxuXG4gIC5pbWFnZS1jcm9wcGVyIHtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgaGVpZ2h0OiAyMDBweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBtYXJnaW46IDUlIGF1dG87XG4gIH1cblxuICBpbWcge1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuXG4gIC5wcm9maWxlLXBpYyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG5cbiAgLmNhbGxpbmdfY29kZSB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgbWF4LXdpZHRoOiAyMCU7XG4gICAgcGFkZGluZzogOHB4O1xuICB9XG5cbiAgLnBob25lX251bWJlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDIwJTtcbiAgICBib3R0b206IDJweDtcbiAgICBtYXgtd2lkdGg6IDUwJTtcbiAgfVxuXG4gIC52ZXJpZnlfYnV0dG9uIHtcbiAgICByaWdodDogNXB4O1xuICAgIG1hcmdpbi10b3A6IDEycHg7XG4gIH1cbn1cblxuIiwiYXBwLXVzZXIgaW9uLW1lbnUtdG9nZ2xlIGlvbi1iYWRnZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiAwLjFyZW07XG4gIHJpZ2h0OiAyMnB4O1xuICAvKiYgfiBpb24taWNvbiB7XG4gICAgb3V0bGluZS1jb2xvcjogd2hpdGVzbW9rZTtcbiAgfSovXG4gIHotaW5kZXg6IDU7XG59XG5hcHAtdXNlciBpb24tZ3JpZCB7XG4gIGhlaWdodDogMTAwJTtcbn1cbmFwcC11c2VyIGlvbi1yb3cge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5hcHAtdXNlciBpb24tY29sIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuYXBwLXVzZXIgaW9uLXJvdXRlci1vdXRsZXQge1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodGdyZXkpO1xufVxuYXBwLXVzZXIgaW9uLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuYXBwLXVzZXIgLmJvbGQtZm9udCB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuYXBwLXVzZXIgLmltYWdlLWNyb3BwZXIge1xuICB3aWR0aDogMjAwcHg7XG4gIGhlaWdodDogMjAwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgbWFyZ2luOiA1JSBhdXRvO1xufVxuYXBwLXVzZXIgaW1nIHtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5hcHAtdXNlciAucHJvZmlsZS1waWMge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiBhdXRvO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbmFwcC11c2VyIC5jYWxsaW5nX2NvZGUge1xuICBmbG9hdDogbGVmdDtcbiAgbWF4LXdpZHRoOiAyMCU7XG4gIHBhZGRpbmc6IDhweDtcbn1cbmFwcC11c2VyIC5waG9uZV9udW1iZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDIwJTtcbiAgYm90dG9tOiAycHg7XG4gIG1heC13aWR0aDogNTAlO1xufVxuYXBwLXVzZXIgLnZlcmlmeV9idXR0b24ge1xuICByaWdodDogNXB4O1xuICBtYXJnaW4tdG9wOiAxMnB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/user/user.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/user/user.page.ts ***!
  \*****************************************/
/*! exports provided: UserPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPage", function() { return UserPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _profile_profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile/profile.page */ "./src/app/pages/user/profile/profile.page.ts");
/* harmony import */ var _settings_settings_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./settings/settings.page */ "./src/app/pages/user/settings/settings.page.ts");
/* harmony import */ var _programs_programs_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./programs/programs.page */ "./src/app/pages/user/programs/programs.page.ts");
/* harmony import */ var _notifications_notifications_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./notifications/notifications.page */ "./src/app/pages/user/notifications/notifications.page.ts");
/* harmony import */ var _about_about_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./about/about.page */ "./src/app/pages/user/about/about.page.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _dashboard_dashboard_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dashboard/dashboard.page */ "./src/app/pages/user/dashboard/dashboard.page.ts");
/* harmony import */ var _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../feature/pickfeature-popover/pickfeature-popover.page */ "./src/app/pages/feature/pickfeature-popover/pickfeature-popover.page.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../services/moment.service */ "./src/app/services/moment.service.ts");
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

















var UserPage = /** @class */ (function () {
    function UserPage(router, route, storage, location, platform, loadingCtrl, chatService, resourceService, momentService, modalCtrl, userData) {
        this.router = router;
        this.route = route;
        this.storage = storage;
        this.location = location;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.chatService = chatService;
        this.resourceService = resourceService;
        this.momentService = momentService;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.selectedMenuOption = '';
        this.hasOrganizerAccess = false;
        this.menu = [
            {
                url: 'profile',
                label: 'Profile',
                component: _profile_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"],
            },
            {
                url: 'about',
                label: 'About',
                component: _about_about_page__WEBPACK_IMPORTED_MODULE_10__["AboutPage"],
            },
            {
                url: 'programs',
                label: 'Programs',
                component: _programs_programs_page__WEBPACK_IMPORTED_MODULE_8__["ProgramsPage"],
            },
            {
                url: 'calendar',
                label: 'Calendar',
                component: _dashboard_dashboard_page__WEBPACK_IMPORTED_MODULE_12__["DashboardPage"],
            },
            {
                url: 'privacy',
                label: 'Privacy and Security',
                component: _settings_settings_page__WEBPACK_IMPORTED_MODULE_7__["SettingsPage"],
            },
            {
                url: 'notifications',
                label: 'Notifications',
                component: _notifications_notifications_page__WEBPACK_IMPORTED_MODULE_9__["NotificationsPage"],
            },
        ];
    }
    UserPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var currentSubPage;
        if (this.router.url === '/app/user') {
            this.selectedMenuOption = this.platform.width() >= 768 ? 'profile' : '';
        }
        else {
            currentSubPage = this.menu.find(function (c) { return _this.router.url.includes(c.url); });
            if (currentSubPage) {
                this.selectedMenuOption = this.platform.width() >= 768 ? currentSubPage.url : '';
            }
        }
    };
    UserPage.prototype.clickManageMenu = function (menuOption) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItem, params, componentProps, manageModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        menuItem = this.menu.find(function (c) { return c.url === menuOption; });
                        console.log(menuOption);
                        params = {};
                        componentProps = { view: null, modalPage: true };
                        if (menuOption === 'calendar') {
                            params = { view: 'calendar' };
                            componentProps.view = 'calendar';
                        }
                        if (!(this.platform.width() >= 768)) return [3 /*break*/, 1];
                        this.selectedMenuOption = menuOption;
                        this.router.navigate(['/app/user/' + menuOption, params], { replaceUrl: true });
                        return [3 /*break*/, 4];
                    case 1:
                        this.selectedMenuOption = '';
                        return [4 /*yield*/, this.modalCtrl.create({ component: menuItem.component, componentProps: componentProps })];
                    case 2:
                        manageModal = _a.sent();
                        return [4 /*yield*/, manageModal.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserPage.prototype.selectProgram = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pickProgramModal, moments, _a, clonedMoments;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_13__["PickfeaturePopoverPage"], componentProps: { title: 'Invite to Mentoring', maxMomentCount: 1 } })];
                    case 1:
                        pickProgramModal = _b.sent();
                        return [4 /*yield*/, pickProgramModal.present()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, pickProgramModal.onDidDismiss()];
                    case 3:
                        moments = (_b.sent()).data;
                        if (!(moments && moments.length)) return [3 /*break*/, 9];
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: 'Processing...',
                                duration: 5000
                            })];
                    case 4:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 5:
                        _b.sent();
                        if (!(moments[0] && moments[0].type === 'new')) return [3 /*break*/, 7];
                        moments[0].calendar = {
                            title: moments[0].matrix_string[0][0],
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
                        return [4 /*yield*/, this.momentService.clone(moments, null)];
                    case 6:
                        clonedMoments = _b.sent();
                        if (clonedMoments && clonedMoments.length) {
                            clonedMoments[0].type = 'new';
                            clonedMoments[0].resource = moments[0].resource; // clone the populated resource
                            this.selectedProgram = clonedMoments[0];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        this.selectedProgram = moments[0];
                        _b.label = 8;
                    case 8:
                        this.momentService.initiateParticipantsView(this.selectedProgram, this.loading);
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserPage.prototype.addToCalendar = function (listOfConversations, listOfUsers) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.momentService.updateMomentUserLists({
                                operation: 'add to calendar',
                                conversations: listOfConversations,
                                users: listOfUsers,
                                calendarId: this.selectedProgram.calendar._id
                            }, null)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserPage.prototype.logout = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.userData.logout()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserPage.prototype.back = function () {
        this.location.back();
    };
    UserPage.prototype.ionViewWillLeave = function () {
        this.userData.splitPaneState = 'md';
    };
    UserPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_11__["Chat"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_14__["Resource"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_15__["Moment"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"] }
    ]; };
    UserPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user',
            template: __importDefault(__webpack_require__(/*! raw-loader!./user.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/user.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./user.page.scss */ "./src/app/pages/user/user.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_11__["Chat"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_14__["Resource"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_15__["Moment"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"]])
    ], UserPage);
    return UserPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~pages-main-tab-main-tab-module~user-user-module.js.map