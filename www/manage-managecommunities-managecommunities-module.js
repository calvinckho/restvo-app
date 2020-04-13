(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manage-managecommunities-managecommunities-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/managecommunities/managecommunities.page.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/managecommunities/managecommunities.page.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"userData.user\">\n  <ion-toolbar class=\"bulletin-nav\">\n    <ion-menu-toggle menu=\"main\" *ngIf=\"userData.user\" slot=\"start\">\n      <ion-button fill=\"clear\" color=\"grey\">\n        <ion-icon name=\"menu\"></ion-icon>\n      </ion-button>\n      <ion-badge *ngIf=\"this.chatService && this.chatService.connectTabBadge\" mode=\"md\">{{this.chatService.connectTabBadge}}</ion-badge>\n    </ion-menu-toggle>\n    <ion-title>Manage</ion-title>\n    <ion-item lines=\"none\" routerLink=\"/app/user/profile\" *ngIf=\"userData.user && platform.width() >= 768\" slot=\"end\" mode=\"md\" style=\"--background: transparent\">\n      <ion-avatar slot=\"start\">\n        <ion-img *ngIf=\"userData.user && userData.user.avatar\" [src]=\"userData.user.avatar\"></ion-img>\n        <ion-img *ngIf=\"!userData.user || !userData.user.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n      </ion-avatar>\n      <ion-label>\n        {{userData.user.first_name}} {{userData.user.last_name}}\n      </ion-label>\n    </ion-item>\n    <ion-buttons slot=\"end\" *ngIf=\"!userData.user\">\n      <ion-button routerLink=\"/register\">\n        Sign In\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"userData && userData.currentCommunityAdminStatus\" forceOverscroll=\"false\">\n  <ion-grid>\n    <ion-row>\n      <ion-col size-xs=\"12\" size-sm=\"12\" size-md=\"3\" size-lg=\"3\">\n        <ion-list>\n          <ion-item (click)=\"clickManageMenu('insight')\">\n            <ion-icon slot=\"start\" name=\"stats-chart\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'insight')}\">Insight</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('activities')\" *ngIf=\"restvoStaff\">\n            <ion-icon slot=\"start\" name=\"american-football\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'activities')}\">Activities</ion-label>\n            <ion-icon *ngIf=\"churchService.abuseReports && churchService.abuseReports.activities?.length\" name=\"alert-circle\"></ion-icon>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('members')\">\n            <ion-icon slot=\"start\" name=\"people\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'members')}\">Members</ion-label>\n            <ion-icon *ngIf=\"churchService.abuseReports && churchService.abuseReports.members?.length\" name=\"alert-circle\"></ion-icon>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('topics')\">\n            <ion-icon slot=\"start\" name=\"chatbubbles\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'topics')}\">Topics</ion-label>\n            <ion-icon *ngIf=\"churchService.abuseReports && churchService.abuseReports.topics?.length\" name=\"alert-circle\"></ion-icon>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('groups')\">\n            <ion-icon slot=\"start\" name=\"people\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'groups')}\">Groups</ion-label>\n            <ion-icon *ngIf=\"churchService.abuseReports && churchService.abuseReports.groups?.length\" name=\"alert-circle\"></ion-icon>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('administrators')\">\n            <ion-icon slot=\"start\" name=\"key\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'administrators')}\">Administrators</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('plan')\">\n            <ion-icon slot=\"start\" name=\"planet\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'plan')}\">Plan</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('billing')\" *ngIf=\"stripeCustomer\">\n            <ion-icon slot=\"start\" name=\"card\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'billing')}\">Billing</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('platforms')\" *ngIf=\"restvoStaff\">\n            <ion-icon slot=\"start\" name=\"cog\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'platforms')}\">Platforms</ion-label>\n          </ion-item>\n          <ion-item (click)=\"clickManageMenu('development')\" *ngIf=\"restvoStaff\">\n            <ion-icon slot=\"start\" name=\"code-working\" *ngIf=\"platform.width() < 768\"></ion-icon>\n            <ion-label [ngClass]=\"{ 'bold-font': (selectedMenuOption === 'development')}\">Development</ion-label>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n      <ion-col size-xs=\"0\" size-sm=\"0\" size-md=\"9\" size-lg=\"9\" *ngIf=\"this.platform.width() >= 768\">\n        <ion-router-outlet></ion-router-outlet>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/manage/managecommunities/managecommunities-routing.module.ts":
/*!************************************************************************************!*\
  !*** ./src/app/pages/manage/managecommunities/managecommunities-routing.module.ts ***!
  \************************************************************************************/
/*! exports provided: ManagecommunitiesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagecommunitiesRoutingModule", function() { return ManagecommunitiesRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _managecommunities_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./managecommunities.page */ "./src/app/pages/manage/managecommunities/managecommunities.page.ts");
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
        component: _managecommunities_page__WEBPACK_IMPORTED_MODULE_2__["ManagecommunitiesPage"],
        children: [
            {
                path: 'insight',
                children: [
                    {
                        path: '',
                        loadChildren: '../analytics/analytics.module#AnalyticsPageModule'
                    }
                ]
            },
            {
                path: 'activities',
                children: [
                    {
                        path: '',
                        loadChildren: '../activities/activities.module#ActivitiesPageModule'
                    }
                ]
            },
            {
                path: 'members',
                children: [
                    {
                        path: '',
                        loadChildren: '../members/members.module#MembersPageModule'
                    }
                ]
            },
            {
                path: 'topics',
                children: [
                    {
                        path: '',
                        loadChildren: '../topics/topics.module#TopicsPageModule'
                    }
                ]
            },
            {
                path: 'groups',
                children: [
                    {
                        path: '',
                        loadChildren: '../groups/groups.module#GroupsPageModule'
                    }
                ]
            },
            { path: 'administrators',
                children: [
                    {
                        path: '',
                        loadChildren: '../administrators/administrators.module#AdministratorsPageModule'
                    }
                ]
            },
            { path: 'plan',
                children: [
                    {
                        path: '',
                        loadChildren: '../plan/plan.module#PlanPageModule'
                    }
                ]
            },
            { path: 'billing',
                children: [
                    {
                        path: '',
                        loadChildren: '../billing/billing.module#BillingPageModule'
                    }
                ]
            },
            {
                path: 'platforms',
                children: [
                    {
                        path: '',
                        loadChildren: '../communities/communities.module#CommunitiesPageModule'
                    }
                ]
            },
            {
                path: 'development',
                children: [
                    {
                        path: '',
                        loadChildren: '../development/development.module#DevelopmentPageModule'
                    }
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/manage/insight',
                pathMatch: 'full'
            }
        ]
    }
];
var ManagecommunitiesRoutingModule = /** @class */ (function () {
    function ManagecommunitiesRoutingModule() {
    }
    ManagecommunitiesRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ManagecommunitiesRoutingModule);
    return ManagecommunitiesRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/manage/managecommunities/managecommunities.module.ts":
/*!****************************************************************************!*\
  !*** ./src/app/pages/manage/managecommunities/managecommunities.module.ts ***!
  \****************************************************************************/
/*! exports provided: ManagecommunitiesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagecommunitiesPageModule", function() { return ManagecommunitiesPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _managecommunities_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./managecommunities.page */ "./src/app/pages/manage/managecommunities/managecommunities.page.ts");
/* harmony import */ var _analytics_analytics_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../analytics/analytics.module */ "./src/app/pages/manage/analytics/analytics.module.ts");
/* harmony import */ var _members_members_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../members/members.module */ "./src/app/pages/manage/members/members.module.ts");
/* harmony import */ var _topics_topics_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../topics/topics.module */ "./src/app/pages/manage/topics/topics.module.ts");
/* harmony import */ var _administrators_administrators_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../administrators/administrators.module */ "./src/app/pages/manage/administrators/administrators.module.ts");
/* harmony import */ var _plan_plan_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../plan/plan.module */ "./src/app/pages/manage/plan/plan.module.ts");
/* harmony import */ var _billing_billing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../billing/billing.module */ "./src/app/pages/manage/billing/billing.module.ts");
/* harmony import */ var _managecommunities_routing_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./managecommunities-routing.module */ "./src/app/pages/manage/managecommunities/managecommunities-routing.module.ts");
/* harmony import */ var _communities_communities_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../communities/communities.module */ "./src/app/pages/manage/communities/communities.module.ts");
/* harmony import */ var _groups_groups_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../groups/groups.module */ "./src/app/pages/manage/groups/groups.module.ts");
/* harmony import */ var _activities_activities_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../activities/activities.module */ "./src/app/pages/manage/activities/activities.module.ts");
/* harmony import */ var _development_development_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../development/development.module */ "./src/app/pages/manage/development/development.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
















var ManagecommunitiesPageModule = /** @class */ (function () {
    function ManagecommunitiesPageModule() {
    }
    ManagecommunitiesPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _managecommunities_routing_module__WEBPACK_IMPORTED_MODULE_11__["ManagecommunitiesRoutingModule"],
                _analytics_analytics_module__WEBPACK_IMPORTED_MODULE_5__["AnalyticsPageModule"],
                _members_members_module__WEBPACK_IMPORTED_MODULE_6__["MembersPageModule"],
                _topics_topics_module__WEBPACK_IMPORTED_MODULE_7__["TopicsPageModule"],
                _groups_groups_module__WEBPACK_IMPORTED_MODULE_13__["GroupsPageModule"],
                _administrators_administrators_module__WEBPACK_IMPORTED_MODULE_8__["AdministratorsPageModule"],
                _plan_plan_module__WEBPACK_IMPORTED_MODULE_9__["PlanPageModule"],
                _billing_billing_module__WEBPACK_IMPORTED_MODULE_10__["BillingPageModule"],
                _communities_communities_module__WEBPACK_IMPORTED_MODULE_12__["CommunitiesPageModule"],
                _activities_activities_module__WEBPACK_IMPORTED_MODULE_14__["ActivitiesPageModule"],
                _development_development_module__WEBPACK_IMPORTED_MODULE_15__["DevelopmentPageModule"]
            ],
            declarations: [_managecommunities_page__WEBPACK_IMPORTED_MODULE_4__["ManagecommunitiesPage"]]
        })
    ], ManagecommunitiesPageModule);
    return ManagecommunitiesPageModule;
}());



/***/ }),

/***/ "./src/app/pages/manage/managecommunities/managecommunities.page.scss":
/*!****************************************************************************!*\
  !*** ./src/app/pages/manage/managecommunities/managecommunities.page.scss ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-managecommunities ion-menu-toggle ion-badge {\n  position: relative;\n  top: 0.1rem;\n  right: 22px;\n  /*& ~ ion-icon {\n    outline-color: whitesmoke;\n  }*/\n  z-index: 5;\n}\napp-managecommunities ion-spinner {\n  position: absolute;\n  margin: 48%;\n}\napp-managecommunities ion-grid {\n  height: 100%;\n}\napp-managecommunities ion-row {\n  height: 100%;\n}\napp-managecommunities ion-col {\n  height: 100%;\n}\napp-managecommunities ion-router-outlet {\n  border-left: 1px solid var(--ion-color-lightgrey);\n}\napp-managecommunities ion-avatar img {\n  width: 40px !important;\n  height: 40px !important;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\napp-managecommunities .bold-font {\n  font-weight: bold;\n}\napp-managecommunities .group-container {\n  max-width: 70%;\n}\napp-managecommunities .group-name {\n  font-size: 18px;\n}\napp-managecommunities .personnel {\n  max-height: 40px;\n  line-height: 20px;\n  /* Height / no. of lines to display */\n  overflow: hidden;\n}\napp-managecommunities .memberInfo {\n  margin-right: 0.1px;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n}\napp-managecommunities .sub-nav {\n  color: black;\n  padding: 4%;\n  border-radius: 25px;\n  font-size: large;\n  background: none;\n}\napp-managecommunities .discover-card-subtitle {\n  font-size: 1em;\n  position: absolute;\n  top: 52%;\n  width: 100%;\n  color: #fff;\n}\napp-managecommunities .overlay {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.7);\n  z-index: 9;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\napp-managecommunities .walkthrough {\n  color: white;\n  font-size: large;\n  position: absolute;\n}\napp-managecommunities .walkthrough.people {\n  width: 70%;\n  top: 30%;\n  left: 15%;\n}\napp-managecommunities .walkthrough.topics {\n  width: 70%;\n  top: 30%;\n  left: 15%;\n}\napp-managecommunities .walkthrough.communities {\n  width: 70%;\n  top: 30%;\n  right: 5%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL21hbmFnZS9tYW5hZ2Vjb21tdW5pdGllcy9tYW5hZ2Vjb21tdW5pdGllcy5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL21hbmFnZS9tYW5hZ2Vjb21tdW5pdGllcy9tYW5hZ2Vjb21tdW5pdGllcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0k7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBRUE7O0lBQUE7RUFHQSxVQUFBO0FDSE47QURPRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtBQ0xKO0FEUUU7RUFDRSxZQUFBO0FDTko7QURTRTtFQUNFLFlBQUE7QUNQSjtBRFVFO0VBQ0UsWUFBQTtBQ1JKO0FEV0U7RUFDRSxpREFBQTtBQ1RKO0FEWUU7RUFDRSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7S0FBQSxpQkFBQTtBQ1ZKO0FEYUU7RUFDRSxpQkFBQTtBQ1hKO0FEY0U7RUFDRSxjQUFBO0FDWko7QURlRTtFQUNFLGVBQUE7QUNiSjtBRGdCRTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFBbUIscUNBQUE7RUFDbkIsZ0JBQUE7QUNiSjtBRGdCRTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7QUNkSjtBRGlCRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDZko7QUQyQkU7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7QUN6Qko7QUQ0QkU7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSw4QkFBQTtFQUNBLFVBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLGdCQUFBO0FDMUJKO0FENkJFO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUMzQko7QUQ4QkU7RUFDRSxVQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7QUM1Qko7QUQrQkU7RUFDRSxVQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7QUM3Qko7QUQrQkU7RUFDRSxVQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7QUM3QkoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9tYW5hZ2UvbWFuYWdlY29tbXVuaXRpZXMvbWFuYWdlY29tbXVuaXRpZXMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLW1hbmFnZWNvbW11bml0aWVzIHtcblxuICBpb24tbWVudS10b2dnbGUge1xuICAgIGlvbi1iYWRnZSB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB0b3A6IDAuMXJlbTtcbiAgICAgIHJpZ2h0OiAyMnB4O1xuXG4gICAgICAvKiYgfiBpb24taWNvbiB7XG4gICAgICAgIG91dGxpbmUtY29sb3I6IHdoaXRlc21va2U7XG4gICAgICB9Ki9cbiAgICAgIHotaW5kZXg6IDU7XG4gICAgfVxuICB9XG5cbiAgaW9uLXNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW46IDQ4JTtcbiAgfVxuXG4gIGlvbi1ncmlkIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICBpb24tcm93IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICBpb24tY29sIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICBpb24tcm91dGVyLW91dGxldCB7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgfVxuXG4gIGlvbi1hdmF0YXIgaW1nIHtcbiAgICB3aWR0aDogNDBweCAhaW1wb3J0YW50O1xuICAgIGhlaWdodCA6IDQwcHggIWltcG9ydGFudDtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgfVxuXG4gIC5ib2xkLWZvbnQge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB9XG5cbiAgLmdyb3VwLWNvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiA3MCU7XG4gIH1cblxuICAuZ3JvdXAtbmFtZSB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICB9XG5cbiAgLnBlcnNvbm5lbCB7XG4gICAgbWF4LWhlaWdodDogNDBweDtcbiAgICBsaW5lLWhlaWdodDogMjBweDsgLyogSGVpZ2h0IC8gbm8uIG9mIGxpbmVzIHRvIGRpc3BsYXkgKi9cbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLm1lbWJlckluZm8ge1xuICAgIG1hcmdpbi1yaWdodDogMC4xcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgfVxuXG4gIC5zdWItbmF2IHtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgcGFkZGluZzogNCU7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gIH1cblxuICAvLy5kaXNjb3Zlci1jYXJkLXRpdGxlIHtcbiAgLy8gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgLy8gIHRvcDogMzYlO1xuICAvLyAgZm9udC1zaXplOiAyLjBlbTtcbiAgLy8gIHdpZHRoOiAxMDAlO1xuICAvLyAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIC8vICBjb2xvcjogI2ZmZjtcbiAgLy99XG5cbiAgLmRpc2NvdmVyLWNhcmQtc3VidGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMS4wZW07XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTIlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG5cbiAgLm92ZXJsYXkge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjcpO1xuICAgIHotaW5kZXg6IDk7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgb3ZlcmZsb3c6aGlkZGVuO1xuICB9XG5cbiAgLndhbGt0aHJvdWdoIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIH1cblxuICAud2Fsa3Rocm91Z2gucGVvcGxlIHtcbiAgICB3aWR0aDogNzAlO1xuICAgIHRvcDogMzAlO1xuICAgIGxlZnQ6IDE1JTtcbiAgfVxuXG4gIC53YWxrdGhyb3VnaC50b3BpY3Mge1xuICAgIHdpZHRoOiA3MCU7XG4gICAgdG9wOiAzMCU7XG4gICAgbGVmdDogMTUlO1xuICB9XG4gIC53YWxrdGhyb3VnaC5jb21tdW5pdGllcyB7XG4gICAgd2lkdGg6IDcwJTtcbiAgICB0b3A6IDMwJTtcbiAgICByaWdodDogNSU7XG4gIH1cbn1cbiIsImFwcC1tYW5hZ2Vjb21tdW5pdGllcyBpb24tbWVudS10b2dnbGUgaW9uLWJhZGdlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IDAuMXJlbTtcbiAgcmlnaHQ6IDIycHg7XG4gIC8qJiB+IGlvbi1pY29uIHtcbiAgICBvdXRsaW5lLWNvbG9yOiB3aGl0ZXNtb2tlO1xuICB9Ki9cbiAgei1pbmRleDogNTtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyBpb24tc3Bpbm5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWFyZ2luOiA0OCU7XG59XG5hcHAtbWFuYWdlY29tbXVuaXRpZXMgaW9uLWdyaWQge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5hcHAtbWFuYWdlY29tbXVuaXRpZXMgaW9uLXJvdyB7XG4gIGhlaWdodDogMTAwJTtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyBpb24tY29sIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuYXBwLW1hbmFnZWNvbW11bml0aWVzIGlvbi1yb3V0ZXItb3V0bGV0IHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyBpb24tYXZhdGFyIGltZyB7XG4gIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNDBweCAhaW1wb3J0YW50O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyAuYm9sZC1mb250IHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5hcHAtbWFuYWdlY29tbXVuaXRpZXMgLmdyb3VwLWNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogNzAlO1xufVxuYXBwLW1hbmFnZWNvbW11bml0aWVzIC5ncm91cC1uYW1lIHtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuYXBwLW1hbmFnZWNvbW11bml0aWVzIC5wZXJzb25uZWwge1xuICBtYXgtaGVpZ2h0OiA0MHB4O1xuICBsaW5lLWhlaWdodDogMjBweDtcbiAgLyogSGVpZ2h0IC8gbm8uIG9mIGxpbmVzIHRvIGRpc3BsYXkgKi9cbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyAubWVtYmVySW5mbyB7XG4gIG1hcmdpbi1yaWdodDogMC4xcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyAuc3ViLW5hdiB7XG4gIGNvbG9yOiBibGFjaztcbiAgcGFkZGluZzogNCU7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG59XG5hcHAtbWFuYWdlY29tbXVuaXRpZXMgLmRpc2NvdmVyLWNhcmQtc3VidGl0bGUge1xuICBmb250LXNpemU6IDFlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUyJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiAjZmZmO1xufVxuYXBwLW1hbmFnZWNvbW11bml0aWVzIC5vdmVybGF5IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG4gIHotaW5kZXg6IDk7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyAud2Fsa3Rocm91Z2gge1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyAud2Fsa3Rocm91Z2gucGVvcGxlIHtcbiAgd2lkdGg6IDcwJTtcbiAgdG9wOiAzMCU7XG4gIGxlZnQ6IDE1JTtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyAud2Fsa3Rocm91Z2gudG9waWNzIHtcbiAgd2lkdGg6IDcwJTtcbiAgdG9wOiAzMCU7XG4gIGxlZnQ6IDE1JTtcbn1cbmFwcC1tYW5hZ2Vjb21tdW5pdGllcyAud2Fsa3Rocm91Z2guY29tbXVuaXRpZXMge1xuICB3aWR0aDogNzAlO1xuICB0b3A6IDMwJTtcbiAgcmlnaHQ6IDUlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/manage/managecommunities/managecommunities.page.ts":
/*!**************************************************************************!*\
  !*** ./src/app/pages/manage/managecommunities/managecommunities.page.ts ***!
  \**************************************************************************/
/*! exports provided: ManagecommunitiesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagecommunitiesPage", function() { return ManagecommunitiesPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../connect/invitetoconnect/invitetoconnect.page */ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.ts");
/* harmony import */ var _analytics_analytics_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../analytics/analytics.page */ "./src/app/pages/manage/analytics/analytics.page.ts");
/* harmony import */ var _activities_activities_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../activities/activities.page */ "./src/app/pages/manage/activities/activities.page.ts");
/* harmony import */ var _members_members_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../members/members.page */ "./src/app/pages/manage/members/members.page.ts");
/* harmony import */ var _topics_topics_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../topics/topics.page */ "./src/app/pages/manage/topics/topics.page.ts");
/* harmony import */ var _groups_groups_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../groups/groups.page */ "./src/app/pages/manage/groups/groups.page.ts");
/* harmony import */ var _administrators_administrators_page__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../administrators/administrators.page */ "./src/app/pages/manage/administrators/administrators.page.ts");
/* harmony import */ var _plan_plan_page__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../plan/plan.page */ "./src/app/pages/manage/plan/plan.page.ts");
/* harmony import */ var _billing_billing_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../billing/billing.page */ "./src/app/pages/manage/billing/billing.page.ts");
/* harmony import */ var _communities_communities_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../communities/communities.page */ "./src/app/pages/manage/communities/communities.page.ts");
/* harmony import */ var _services_payment_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../services/payment.service */ "./src/app/services/payment.service.ts");
/* harmony import */ var _community_showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../community/showcommunity/showcommunity.page */ "./src/app/pages/community/showcommunity/showcommunity.page.ts");
/* harmony import */ var _development_development_page__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../development/development.page */ "./src/app/pages/manage/development/development.page.ts");
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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};






















var ManagecommunitiesPage = /** @class */ (function () {
    function ManagecommunitiesPage(router, storage, platform, authService, chatService, userData, churchService, paymentService, resourceService, modalCtrl, alertCtrl, popoverCtrl, actionSheetCtrl) {
        var _this = this;
        this.router = router;
        this.storage = storage;
        this.platform = platform;
        this.authService = authService;
        this.chatService = chatService;
        this.userData = userData;
        this.churchService = churchService;
        this.paymentService = paymentService;
        this.resourceService = resourceService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.subscriptions = {};
        this.title = '';
        this.restvoStaff = false;
        this.selectedMenuOption = '';
        this.menu = [
            {
                url: 'insight',
                label: 'Insight',
                component: _analytics_analytics_page__WEBPACK_IMPORTED_MODULE_10__["AnalyticsPage"],
            },
            {
                url: 'activities',
                label: 'Activities',
                component: _activities_activities_page__WEBPACK_IMPORTED_MODULE_11__["ActivitiesPage"],
            },
            {
                url: 'members',
                label: 'Members',
                component: _members_members_page__WEBPACK_IMPORTED_MODULE_12__["MembersPage"],
            },
            {
                url: 'topics',
                label: 'Topics',
                component: _topics_topics_page__WEBPACK_IMPORTED_MODULE_13__["TopicsPage"],
            },
            {
                url: 'groups',
                label: 'Groups',
                component: _groups_groups_page__WEBPACK_IMPORTED_MODULE_14__["GroupsPage"],
            },
            {
                url: 'administrators',
                label: 'Administrators',
                component: _administrators_administrators_page__WEBPACK_IMPORTED_MODULE_15__["AdministratorsPage"],
            },
            {
                url: 'plan',
                label: 'Plan',
                component: _plan_plan_page__WEBPACK_IMPORTED_MODULE_16__["PlanPage"],
            },
            {
                url: 'billing',
                label: 'Billing',
                component: _billing_billing_page__WEBPACK_IMPORTED_MODULE_17__["BillingPage"],
            },
            {
                url: 'platforms',
                label: 'Platforms',
                component: _communities_communities_page__WEBPACK_IMPORTED_MODULE_18__["CommunitiesPage"],
            },
            {
                url: 'development',
                label: 'Development',
                component: _development_development_page__WEBPACK_IMPORTED_MODULE_21__["DevelopmentPage"],
            }
        ];
        this.refreshUserHandler = function (data) {
            if (data && (data.type === 'update admin' || data.type === 'change aux data')) {
                _this.setupManagePage();
            }
            if (data && data.type === 'refresh manage page') {
                _this.loadCommunity();
            }
        };
    }
    ManagecommunitiesPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.userData && this.userData.currentCommunityAdminStatus) {
                    this.setupManagePage();
                    this.title = this.userData.user.churches[this.userData.currentCommunityIndex].name;
                }
                // link refresh user observable with refresh user handler
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserHandler);
                return [2 /*return*/];
            });
        });
    };
    ManagecommunitiesPage.prototype.setupManagePage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentSubPage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCommunity()];
                    case 1:
                        _a.sent();
                        if (this.router.url === '/app/manage') {
                            currentSubPage = this.menu.find(function (c) { return c.url === 'profile'; });
                            this.selectedMenuOption = this.platform.width() >= 768 ? 'profile' : '';
                        }
                        else {
                            currentSubPage = this.menu.find(function (c) { return _this.router.url.includes(c.url); });
                            if (currentSubPage) {
                                this.selectedMenuOption = this.platform.width() >= 768 ? currentSubPage.url : '';
                            }
                        }
                        if (currentSubPage) {
                            this.title = this.userData.user.churches[this.userData.currentCommunityIndex].name + (currentSubPage.label.length ? ': ' : '') + currentSubPage.label;
                        }
                        this.restvoStaff = (['owner', 'admin', 'staff']).includes(this.userData.user.role);
                        console.log("page", this.router.url, this.selectedMenuOption);
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagecommunitiesPage.prototype.loadCommunity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this;
                        return [4 /*yield*/, this.paymentService.loadCustomer(this.userData.user.churches[this.userData.currentCommunityIndex]._id)];
                    case 1:
                        _b.stripeCustomer = _c.sent();
                        return [4 /*yield*/, this.churchService.loadChurchProfile(this.userData.user.churches[this.userData.currentCommunityIndex]._id)];
                    case 2:
                        _a = __read.apply(void 0, [_c.sent(), 1]), this.churchService.currentManagedCommunity = _a[0];
                        this.churchService.currentManagedCommunity.admins.forEach(function (admin) {
                            admin.role = "Admin";
                            admin.wee_user = true;
                        });
                        return [4 /*yield*/, this.churchService.checkAbuseReport(this.userData.user.churches[this.userData.currentCommunityIndex]._id)];
                    case 3:
                        _c.sent();
                        if (this.router.url.indexOf('billing') > -1 && !this.stripeCustomer) {
                            this.clickManageMenu('plan');
                        }
                        else {
                            this.userData.refreshUserStatus({ type: 'load community ready' });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagecommunitiesPage.prototype.clickManageMenu = function (menuOption) {
        return __awaiter(this, void 0, void 0, function () {
            var menuItem, manageModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        menuItem = this.menu.find(function (c) { return c.url === menuOption; });
                        if (!(this.platform.width() >= 768)) return [3 /*break*/, 1];
                        this.selectedMenuOption = menuOption;
                        this.router.navigateByUrl('/app/manage/' + menuOption);
                        return [3 /*break*/, 4];
                    case 1:
                        this.selectedMenuOption = '';
                        return [4 /*yield*/, this.modalCtrl.create({ component: menuItem.component, componentProps: { modalPage: true } })];
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
    ManagecommunitiesPage.prototype.showCommunityProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var showCommunityProfileModal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _community_showcommunity_showcommunity_page__WEBPACK_IMPORTED_MODULE_20__["ShowcommunityPage"],
                            componentProps: {
                                community: this.userData.user.churches[this.userData.currentCommunityIndex]
                            }
                        })];
                    case 1:
                        showCommunityProfileModal = _a.sent();
                        return [4 /*yield*/, showCommunityProfileModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, showCommunityProfileModal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.setupManagePage();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagecommunitiesPage.prototype.invite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var buttons, actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buttons = [
                            {
                                text: 'Restvo Users',
                                handler: function () {
                                    _this.invitePage('Restvo Users');
                                }
                            },
                            {
                                text: 'Email',
                                handler: function () {
                                    _this.invitePage('Email');
                                }
                            },
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                handler: function () {
                                }
                            }
                        ];
                        if (this.platform.is('cordova')) {
                            buttons.splice(1, 0, {
                                text: 'SMS Message',
                                handler: function () {
                                    _this.invitePage('SMS Message');
                                }
                            });
                        }
                        return [4 /*yield*/, this.actionSheetCtrl.create({ header: 'Invite a Friend', buttons: buttons })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagecommunitiesPage.prototype.invitePage = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var invitePage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_9__["InvitetoconnectPage"], componentProps: { type: type } })];
                    case 1:
                        invitePage = _a.sent();
                        return [4 /*yield*/, invitePage.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManagecommunitiesPage.prototype.noNetworkConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var networkAlert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'No Internet Connection',
                            subHeader: 'Please check your internet connection.',
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
    ManagecommunitiesPage.prototype.ngOnDestroy = function () {
        this.userData.splitPaneState = 'md';
        // PWA fast load listener + reload listener
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserHandler);
    };
    ManagecommunitiesPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_1__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["Auth"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_6__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_5__["Churches"] },
        { type: _services_payment_service__WEBPACK_IMPORTED_MODULE_19__["PaymentService"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonContent"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonContent"])
    ], ManagecommunitiesPage.prototype, "content", void 0);
    ManagecommunitiesPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-managecommunities',
            template: __importDefault(__webpack_require__(/*! raw-loader!./managecommunities.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/managecommunities/managecommunities.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./managecommunities.page.scss */ "./src/app/pages/manage/managecommunities/managecommunities.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_1__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["Auth"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_6__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_5__["Churches"],
            _services_payment_service__WEBPACK_IMPORTED_MODULE_19__["PaymentService"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"]])
    ], ManagecommunitiesPage);
    return ManagecommunitiesPage;
}());



/***/ })

}]);
//# sourceMappingURL=manage-managecommunities-managecommunities-module.js.map