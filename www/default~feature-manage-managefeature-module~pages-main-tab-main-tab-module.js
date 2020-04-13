(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~feature-manage-managefeature-module~pages-main-tab-main-tab-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/managefeature.page.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/managefeature.page.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"resource && resource._id && moment.resource && moment.resource.field\">\n  <ion-toolbar>\n    <ion-menu-toggle menu=\"main\" *ngIf=\"!modalPage && platform.width() < 768\" slot=\"start\" fill=\"clear\">\n      <ion-button fill=\"clear\" color=\"grey\">\n        <ion-icon name=\"menu\"></ion-icon>\n      </ion-button>\n      <ion-badge *ngIf=\"this.chatService && this.chatService.connectTabBadge\" mode=\"md\">{{this.chatService.connectTabBadge}}</ion-badge>\n    </ion-menu-toggle>\n    <ion-buttons *ngIf=\"modalPage || platform.width() >= 768\" slot=\"start\">\n      <ion-button (click)=\"closeModal(false)\">\n        <ion-icon name=\"chevron-back-outline\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-title id=\"show-event-title\" *ngIf=\"moment && moment.matrix_string\" class=\"ion-text-wrap\">{{moment.matrix_string[0][0]}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"edit()\">{{resource['en-US'].value[18]}}</ion-button> <!--Edit-->\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"resource && resource._id && moment.resource && moment.resource.field\" forceOverscroll=\"false\">\n  <ion-grid class=\"full-height\">\n    <ion-row class=\"full-height\">\n      <ion-col class=\"full-height\" size-xs=\"12\" size-sm=\"12\" size-md=\"3\" size-lg=\"3\">\n        <ion-list>\n          <ion-item (click)=\"clickManageMenu('insight', null)\">\n            <ion-icon slot=\"start\" name=\"person\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'insight')}\">Insight</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('profile', null)\">\n            <ion-icon slot=\"start\" name=\"clipboard\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'profile')}\" *ngIf=\"moment && !moment.categories.includes('5c915476e172e4e64590e349')\">Profile</ion-label>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'profile')}\" *ngIf=\"moment && moment.categories.includes('5c915476e172e4e64590e349')\">Plan</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('people', null)\">\n            <ion-icon slot=\"start\" name=\"people\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'people')}\">People</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('programs', null)\" *ngIf=\"moment && moment.categories.includes('5c915324e172e4e64590e346')\"> <!--Community-->\n            <ion-icon slot=\"start\" name=\"book\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'programs')}\">Programs</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('plans', null)\" [hidden]=\"moment && moment.categories.includes('5c915476e172e4e64590e349')\"> <!--show this for everything except Plan-->\n            <ion-icon slot=\"start\" name=\"book\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'plans')}\">Plans</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('relationships', null)\" *ngIf=\"moment && (moment.categories.includes('5c915324e172e4e64590e346') || moment.categories.includes('5c915475e172e4e64590e348'))\"> <!--Community or Program-->\n            <ion-icon slot=\"start\" name=\"book\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'relationships')}\">Relationships</ion-label>\n          </ion-item>\n          <ion-item-group *ngIf=\"moment && moment.resource && moment.resource.matrix_number[0].includes(10210)\"> <!--if Schedule is enabled-->\n            <ion-item (click)=\"clickManageMenu('schedule', schedule)\" *ngFor=\"let schedule of schedules; index as i\">\n              <ion-icon slot=\"start\" name=\"book\" *ngIf=\"platform.width() < 768\"></ion-icon>\n              <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'schedule' && selectedSchedule._id === schedule._id)}\">Schedule {{i + 1}}</ion-label>\n            </ion-item>\n            <ion-item (click)=\"clickManageMenu('new-schedule', null)\">\n              <ion-icon slot=\"start\" name=\"book\" *ngIf=\"platform.width() < 768\"></ion-icon>\n              <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'new-schedule')}\">+ Schedule</ion-label>\n            </ion-item>\n          </ion-item-group>\n          <ion-item (click)=\"clickManageMenu('onboarding', null)\" [hidden]=\"moment && moment.categories.includes('5c915476e172e4e64590e349')\">\n            <ion-icon slot=\"start\" name=\"list\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'onboarding')}\">Onboarding</ion-label>\n          </ion-item>\n          <ion-item (click)=\"switchToUserView()\">\n            <ion-icon slot=\"start\" name=\"eye\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label>View as User</ion-label>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n      <ion-col size-xs=\"0\" size-sm=\"0\" size-md=\"9\" size-lg=\"9\" *ngIf=\"this.platform.width() >= 768\">\n        <ion-router-outlet></ion-router-outlet>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.module.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.module.ts ***!
  \************************************************************************************************/
/*! exports provided: FeatureChildActivitiesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureChildActivitiesPageModule", function() { return FeatureChildActivitiesPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _feature_childactivities_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./feature-childactivities.page */ "./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.ts");
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
        component: _feature_childactivities_page__WEBPACK_IMPORTED_MODULE_5__["FeatureChildActivitiesPage"]
    }
];
var FeatureChildActivitiesPageModule = /** @class */ (function () {
    function FeatureChildActivitiesPageModule() {
    }
    FeatureChildActivitiesPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_feature_childactivities_page__WEBPACK_IMPORTED_MODULE_5__["FeatureChildActivitiesPage"]]
        })
    ], FeatureChildActivitiesPageModule);
    return FeatureChildActivitiesPageModule;
}());



/***/ }),

/***/ "./src/app/pages/feature/manage/managefeature-routing.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/feature/manage/managefeature-routing.module.ts ***!
  \**********************************************************************/
/*! exports provided: ManagefeatureRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagefeatureRoutingModule", function() { return ManagefeatureRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _managefeature_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./managefeature.page */ "./src/app/pages/feature/manage/managefeature.page.ts");
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
        path: ':id',
        component: _managefeature_page__WEBPACK_IMPORTED_MODULE_2__["ManagefeaturePage"],
        children: [
            {
                path: 'insight',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-insight/feature-insight.module#FeatureInsightPageModule'
                    },
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../showfeature/showfeature.module#ShowfeaturePageModule'
                    },
                ]
            },
            {
                path: 'people',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../editparticipants/editparticipants.module#EditparticipantsPageModule'
                    },
                ]
            },
            {
                path: 'programs',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule'
                    },
                ]
            },
            {
                path: 'relationships',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule'
                    },
                ]
            },
            {
                path: 'plans',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule'
                    },
                ]
            },
            {
                path: 'contents',
                children: [
                    {
                        path: ':id',
                        loadChildren: './feature-childactivities/feature-childactivities.module#FeatureChildActivitiesPageModule'
                    },
                ]
            },
            {
                path: 'schedule',
                children: [
                    {
                        path: '',
                        loadChildren: './feature-schedule/feature-schedule.module#FeatureSchedulePageModule'
                    },
                ]
            },
            {
                path: 'new-schedule',
                children: [
                    {
                        path: '',
                        loadChildren: './feature-schedule/feature-schedule.module#FeatureSchedulePageModule'
                    },
                ]
            },
            {
                path: 'onboarding',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../discover/preferences/preferences.module#PreferencesPageModule'
                    },
                ]
            },
        ]
    },
];
var ManagefeatureRoutingModule = /** @class */ (function () {
    function ManagefeatureRoutingModule() {
    }
    ManagefeatureRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ManagefeatureRoutingModule);
    return ManagefeatureRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/feature/manage/managefeature.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/feature/manage/managefeature.module.ts ***!
  \**************************************************************/
/*! exports provided: ManagefeaturePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagefeaturePageModule", function() { return ManagefeaturePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _managefeature_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./managefeature.page */ "./src/app/pages/feature/manage/managefeature.page.ts");
/* harmony import */ var _managefeature_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./managefeature-routing.module */ "./src/app/pages/feature/manage/managefeature-routing.module.ts");
/* harmony import */ var _feature_insight_feature_insight_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./feature-insight/feature-insight.module */ "./src/app/pages/feature/manage/feature-insight/feature-insight.module.ts");
/* harmony import */ var _feature_childactivities_feature_childactivities_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./feature-childactivities/feature-childactivities.module */ "./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.module.ts");
/* harmony import */ var _feature_schedule_feature_schedule_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./feature-schedule/feature-schedule.module */ "./src/app/pages/feature/manage/feature-schedule/feature-schedule.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var ManagefeaturePageModule = /** @class */ (function () {
    function ManagefeaturePageModule() {
    }
    ManagefeaturePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _managefeature_routing_module__WEBPACK_IMPORTED_MODULE_5__["ManagefeatureRoutingModule"],
                _feature_insight_feature_insight_module__WEBPACK_IMPORTED_MODULE_6__["FeatureInsightPageModule"],
                _feature_schedule_feature_schedule_module__WEBPACK_IMPORTED_MODULE_8__["FeatureSchedulePageModule"],
                _feature_childactivities_feature_childactivities_module__WEBPACK_IMPORTED_MODULE_7__["FeatureChildActivitiesPageModule"]
            ],
            declarations: [_managefeature_page__WEBPACK_IMPORTED_MODULE_4__["ManagefeaturePage"]]
        })
    ], ManagefeaturePageModule);
    return ManagefeaturePageModule;
}());



/***/ }),

/***/ "./src/app/pages/feature/manage/managefeature.page.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/feature/manage/managefeature.page.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-managefeature ion-menu-toggle ion-badge {\n  position: relative;\n  top: 0.1rem;\n  right: 22px;\n  /*& ~ ion-icon {\n    outline-color: whitesmoke;\n  }*/\n  z-index: 5;\n}\napp-managefeature .full-height {\n  height: 100%;\n}\napp-managefeature ion-router-outlet {\n  border-left: 1px solid var(--ion-color-lightgrey);\n}\napp-managefeature ion-content {\n  display: flex;\n  flex-direction: column;\n}\napp-managefeature .bold-font {\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2ZlYXR1cmUvbWFuYWdlL21hbmFnZWZlYXR1cmUucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9mZWF0dXJlL21hbmFnZS9tYW5hZ2VmZWF0dXJlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHSTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFFQTs7SUFBQTtFQUdBLFVBQUE7QUNITjtBRE9FO0VBQ0UsWUFBQTtBQ0xKO0FEUUU7RUFDRSxpREFBQTtBQ05KO0FEU0U7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7QUNQSjtBRFVFO0VBQ0UsaUJBQUE7QUNSSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ZlYXR1cmUvbWFuYWdlL21hbmFnZWZlYXR1cmUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLW1hbmFnZWZlYXR1cmUge1xuXG4gIGlvbi1tZW51LXRvZ2dsZSB7XG4gICAgaW9uLWJhZGdlIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHRvcDogMC4xcmVtO1xuICAgICAgcmlnaHQ6IDIycHg7XG5cbiAgICAgIC8qJiB+IGlvbi1pY29uIHtcbiAgICAgICAgb3V0bGluZS1jb2xvcjogd2hpdGVzbW9rZTtcbiAgICAgIH0qL1xuICAgICAgei1pbmRleDogNTtcbiAgICB9XG4gIH1cblxuICAuZnVsbC1oZWlnaHQge1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuXG4gIGlvbi1yb3V0ZXItb3V0bGV0IHtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodGdyZXkpO1xuICB9XG5cbiAgaW9uLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gIC5ib2xkLWZvbnQge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB9XG59XG4iLCJhcHAtbWFuYWdlZmVhdHVyZSBpb24tbWVudS10b2dnbGUgaW9uLWJhZGdlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IDAuMXJlbTtcbiAgcmlnaHQ6IDIycHg7XG4gIC8qJiB+IGlvbi1pY29uIHtcbiAgICBvdXRsaW5lLWNvbG9yOiB3aGl0ZXNtb2tlO1xuICB9Ki9cbiAgei1pbmRleDogNTtcbn1cbmFwcC1tYW5hZ2VmZWF0dXJlIC5mdWxsLWhlaWdodCB7XG4gIGhlaWdodDogMTAwJTtcbn1cbmFwcC1tYW5hZ2VmZWF0dXJlIGlvbi1yb3V0ZXItb3V0bGV0IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbn1cbmFwcC1tYW5hZ2VmZWF0dXJlIGlvbi1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbmFwcC1tYW5hZ2VmZWF0dXJlIC5ib2xkLWZvbnQge1xuICBmb250LXdlaWdodDogYm9sZDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/feature/manage/managefeature.page.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/feature/manage/managefeature.page.ts ***!
  \************************************************************/
/*! exports provided: ManagefeaturePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagefeaturePage", function() { return ManagefeaturePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/service-worker */ "./node_modules/@angular/service-worker/fesm5/service-worker.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_network_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/network-service.service */ "./src/app/services/network-service.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _services_response_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/response.service */ "./src/app/services/response.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_calendar_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../services/calendar.service */ "./src/app/services/calendar.service.ts");
/* harmony import */ var _editfeature_editfeature_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../editfeature/editfeature.page */ "./src/app/pages/feature/editfeature/editfeature.page.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _feature_insight_feature_insight_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./feature-insight/feature-insight.page */ "./src/app/pages/feature/manage/feature-insight/feature-insight.page.ts");
/* harmony import */ var _editparticipants_editparticipants_page__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../editparticipants/editparticipants.page */ "./src/app/pages/feature/editparticipants/editparticipants.page.ts");
/* harmony import */ var _feature_childactivities_feature_childactivities_page__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./feature-childactivities/feature-childactivities.page */ "./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.ts");
/* harmony import */ var _feature_schedule_feature_schedule_page__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./feature-schedule/feature-schedule.page */ "./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.ts");
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






















var ManagefeaturePage = /** @class */ (function (_super) {
    __extends(ManagefeaturePage, _super);
    function ManagefeaturePage(cache, route, router, location, electronService, swUpdate, change, platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl, chatService, churchService, groupService, networkService, userData, awsService, momentService, resourceService, responseService, calendarService) {
        var _this = _super.call(this, route, router, location, electronService, swUpdate, change, platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl, chatService, churchService, groupService, networkService, userData, awsService, momentService, resourceService, responseService, calendarService) || this;
        _this.cache = cache;
        _this.route = route;
        _this.router = router;
        _this.location = location;
        _this.electronService = electronService;
        _this.swUpdate = swUpdate;
        _this.change = change;
        _this.platform = platform;
        _this.alertCtrl = alertCtrl;
        _this.toastCtrl = toastCtrl;
        _this.actionSheetCtrl = actionSheetCtrl;
        _this.popoverCtrl = popoverCtrl;
        _this.modalCtrl = modalCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.chatService = chatService;
        _this.churchService = churchService;
        _this.groupService = groupService;
        _this.networkService = networkService;
        _this.userData = userData;
        _this.awsService = awsService;
        _this.momentService = momentService;
        _this.resourceService = resourceService;
        _this.responseService = responseService;
        _this.calendarService = calendarService;
        _this.selectedMenuOption = '';
        _this.reloadEditPage = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.userData.user) {
                    this.setup();
                    this.loadSchedules();
                }
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    ManagefeaturePage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.ngOnInit.call(this);
                if (this.platform.width() >= 768 && this.router.url.includes('profile')) {
                    this.selectedMenuOption = 'profile';
                }
                return [2 /*return*/];
            });
        });
    };
    ManagefeaturePage.prototype.loadSchedules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var momentId, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        momentId = (this.moment && this.moment._id) ? this.moment._id : this.route.snapshot.paramMap.get('id');
                        // check to see if it has any schedules
                        _a = this;
                        return [4 /*yield*/, this.momentService.loadActivitySchedules(momentId)];
                    case 1:
                        // check to see if it has any schedules
                        _a.schedules = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagefeaturePage.prototype.clickManageMenu = function (menuOption, selectedSchedule) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItem, manageModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.menu = [
                            {
                                url: 'insight',
                                label: 'Insight',
                                component: _feature_insight_feature_insight_page__WEBPACK_IMPORTED_MODULE_18__["FeatureInsightPage"],
                            },
                            {
                                url: 'profile',
                                label: 'Profile',
                                component: null,
                            },
                            {
                                url: 'people',
                                label: 'People',
                                component: _editparticipants_editparticipants_page__WEBPACK_IMPORTED_MODULE_19__["EditparticipantsPage"],
                            },
                            {
                                url: 'programs',
                                label: 'Programs',
                                categoryId: '5c915475e172e4e64590e348',
                                component: _feature_childactivities_feature_childactivities_page__WEBPACK_IMPORTED_MODULE_20__["FeatureChildActivitiesPage"],
                                params: {
                                    categoryId: '5c915475e172e4e64590e348',
                                }
                            },
                            {
                                url: 'relationships',
                                label: 'Relationships',
                                categoryId: '5dfdbb547b00ea76b75e5a70',
                                component: _feature_childactivities_feature_childactivities_page__WEBPACK_IMPORTED_MODULE_20__["FeatureChildActivitiesPage"],
                                params: {
                                    categoryId: '5dfdbb547b00ea76b75e5a70',
                                }
                            },
                            {
                                url: 'plans',
                                label: 'Plans',
                                categoryId: '5c915476e172e4e64590e349',
                                component: _feature_childactivities_feature_childactivities_page__WEBPACK_IMPORTED_MODULE_20__["FeatureChildActivitiesPage"],
                                params: {
                                    categoryId: '5c915476e172e4e64590e349',
                                }
                            },
                            {
                                url: 'contents',
                                label: 'Contents',
                                categoryId: '5e1bbda67b00ea76b75e5a73',
                                component: _feature_childactivities_feature_childactivities_page__WEBPACK_IMPORTED_MODULE_20__["FeatureChildActivitiesPage"],
                                params: {
                                    categoryId: '5e1bbda67b00ea76b75e5a73',
                                }
                            },
                            {
                                url: 'schedule',
                                label: 'Schedule',
                                categoryId: '5e1bbda67b00ea76b75e5a73',
                                parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0],
                                component: _feature_schedule_feature_schedule_page__WEBPACK_IMPORTED_MODULE_21__["FeatureSchedulePage"],
                                params: { parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], categoryId: '5e1bbda67b00ea76b75e5a73', scheduleId: selectedSchedule ? selectedSchedule._id : null } // sends in the parent category ID
                            },
                            {
                                url: 'new-schedule',
                                label: 'New Schedule',
                                categoryId: '5e1bbda67b00ea76b75e5a73',
                                parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0],
                                component: _feature_schedule_feature_schedule_page__WEBPACK_IMPORTED_MODULE_21__["FeatureSchedulePage"],
                                params: { parentCategoryId: (this.moment.categories && this.moment.categories.length) && this.moment.categories[0], categoryId: '5e1bbda67b00ea76b75e5a73' } // sends in the parent category ID
                            },
                            {
                                url: 'onboarding',
                                label: 'Onboarding Processes',
                                component: null,
                                params: { programId: this.moment._id, organizer: true, showHeader: false }
                            }
                        ];
                        menuItem = this.menu.find(function (c) { return c.url === menuOption; });
                        if (!(this.platform.width() >= 768)) return [3 /*break*/, 1];
                        this.selectedMenuOption = menuOption;
                        this.router.navigate(['/app/manage/activity/' + this.moment._id + '/' + menuOption + '/' + this.moment._id, (menuItem.params || {})], { replaceUrl: true });
                        return [3 /*break*/, 6];
                    case 1:
                        this.selectedMenuOption = '';
                        if (!(menuOption === 'onboarding')) return [3 /*break*/, 2];
                        this.momentService.openPreferences({ programId: this.moment._id, organizer: true, modalPage: true });
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(menuOption === 'profile')) return [3 /*break*/, 3];
                        this.momentService.openMoment({ moment: this.moment, modalPage: true });
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.modalCtrl.create({ component: menuItem.component, componentProps: { moment: this.moment, categoryId: menuItem.categoryId, parentCategoryId: menuItem.parentCategoryId, title: menuItem.label, scheduleId: (selectedSchedule ? selectedSchedule._id : null), modalPage: true } })];
                    case 4:
                        manageModal = _a.sent();
                        return [4 /*yield*/, manageModal.present()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (selectedSchedule) {
                            this.selectedSchedule = selectedSchedule;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagefeaturePage.prototype.switchToUserView = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.platform.width() >= 768) {
                    this.router.navigate(['/app/activity/' + this.moment._id], { replaceUrl: false });
                }
                else {
                    if (this.modalPage) {
                        this.closeModal(false);
                    }
                    this.momentService.openMoment({ moment: this.moment, modalPage: true });
                }
                return [2 /*return*/];
            });
        });
    };
    ManagefeaturePage.prototype.edit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.modalPage) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _editfeature_editfeature_page__WEBPACK_IMPORTED_MODULE_14__["EditfeaturePage"], componentProps: { moment: this.moment, modalPage: true } })];
                    case 1:
                        editModal = _a.sent();
                        return [4 /*yield*/, editModal.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.router.navigate(['/app/edit/' + this.moment._id]);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManagefeaturePage.ctorParameters = function () { return [
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_5__["CacheService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"] },
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_2__["ElectronService"] },
        { type: _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__["SwUpdate"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ToastController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["PopoverController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["LoadingController"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_12__["Chat"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_15__["Churches"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_16__["Groups"] },
        { type: _services_network_service_service__WEBPACK_IMPORTED_MODULE_8__["NetworkService"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_7__["UserData"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_17__["Aws"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_11__["Moment"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_9__["Resource"] },
        { type: _services_response_service__WEBPACK_IMPORTED_MODULE_10__["Response"] },
        { type: _services_calendar_service__WEBPACK_IMPORTED_MODULE_13__["CalendarService"] }
    ]; };
    ManagefeaturePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-managefeature',
            template: __importDefault(__webpack_require__(/*! raw-loader!./managefeature.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/managefeature.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./managefeature.page.scss */ "./src/app/pages/feature/manage/managefeature.page.scss")).default]
        }),
        __metadata("design:paramtypes", [ionic_cache__WEBPACK_IMPORTED_MODULE_5__["CacheService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"],
            ngx_electron__WEBPACK_IMPORTED_MODULE_2__["ElectronService"],
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_3__["SwUpdate"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["PopoverController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["LoadingController"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_12__["Chat"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_15__["Churches"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_16__["Groups"],
            _services_network_service_service__WEBPACK_IMPORTED_MODULE_8__["NetworkService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_7__["UserData"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_17__["Aws"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_11__["Moment"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_9__["Resource"],
            _services_response_service__WEBPACK_IMPORTED_MODULE_10__["Response"],
            _services_calendar_service__WEBPACK_IMPORTED_MODULE_13__["CalendarService"]])
    ], ManagefeaturePage);
    return ManagefeaturePage;
}(_editfeature_editfeature_page__WEBPACK_IMPORTED_MODULE_14__["EditfeaturePage"]));



/***/ })

}]);
//# sourceMappingURL=default~feature-manage-managefeature-module~pages-main-tab-main-tab-module.js.map