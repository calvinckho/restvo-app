(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["discover-discover-discover-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/discover/discover/discover.page.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/discover/discover/discover.page.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"userData\" id=\"discover-header\">\n  <ion-toolbar color=\"lightgrey\" *ngIf=\"(platform.is('mobileweb') && (platform.is('ios') || platform.is('android'))) && userData.showDownloadLink\">\n    <ion-item-sliding side=\"end\">\n      <ion-item lines=\"none\"  color=\"lightgrey\">\n        <ion-avatar slot=\"start\">\n          <ion-img src=\"assets/img/icon.png\"></ion-img>\n        </ion-avatar>\n        <div class=\"details\" class=\"ion-text-wrap\">\n          <a *ngIf=\"platform.is('ios')\" href=\"https://itunes.apple.com/us/app/restvo-connect-with-churches/id1365903479?ls=1&mt=8\" style=\"font-size: 14px; color: var(--ion-color-button1)\">Download app for better experience</a>\n          <a *ngIf=\"platform.is('android')\" href=\"https://play.google.com/store/apps/details?id=com.restvo.app\" style=\"font-size: 14px; color: var(--ion-color-button1)\">Download app for better experience</a>\n        </div>\n        <ion-icon name=\"chevron-forward-outline\" color=\"primary\" slot=\"end\"></ion-icon>\n        <!--<ion-button fill=\"clear\" slot=\"end\"><ion-icon name=\"close\"></ion-icon></ion-button>-->\n      </ion-item>\n      <ion-item-options>\n        <ion-item-option color=\"primary\" (click)=\"userData.showDownloadLink = false\">\n          Dismiss\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-toolbar>\n  <ion-toolbar class=\"bulletin-nav\">\n    <ion-menu-toggle slot=\"start\" menu=\"main\" id=\"dashboard-menu-toggle\">\n      <ion-button fill=\"clear\" color=\"grey\">\n        <ion-icon name=\"menu\"></ion-icon>\n      </ion-button>\n      <ion-badge *ngIf=\"this.chatService && this.chatService.connectTabBadge\" mode=\"md\">{{this.chatService.connectTabBadge}}</ion-badge>\n    </ion-menu-toggle>\n    <ion-title *ngIf=\"!userData.defaultProgram\">Discover</ion-title>\n    <!--<ion-title *ngIf=\"userData.defaultProgram && platform.width() >= 768\">Dashboard</ion-title>-->\n    <ion-title *ngIf=\"userData.defaultProgram\">{{userData.defaultProgram.matrix_string[0][0]}}</ion-title>\n    <ion-item lines=\"none\" routerLink=\"/app/user/profile\" *ngIf=\"userData.user && platform.width() >= 768\" slot=\"end\" mode=\"md\" style=\"--background: transparent\">\n      <ion-avatar slot=\"start\">\n        <ion-img *ngIf=\"userData.user && userData.user.avatar\" [src]=\"userData.user.avatar\"></ion-img>\n        <ion-img *ngIf=\"!userData.user || !userData.user.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n      </ion-avatar>\n      <ion-label>\n        {{userData.user.first_name}} {{userData.user.last_name}}\n      </ion-label>\n    </ion-item>\n  </ion-toolbar>\n  <!--<ion-toolbar *ngIf=\"userData.user && authService.incompleteOnboardProcess\">\n    <ion-item-sliding side=\"end\">\n      <ion-item (click)=\"authService.openOnboarding({ modalPage: true })\" lines=\"none\">\n        <ion-avatar slot=\"start\">\n          <ion-img src=\"assets/img/finish.png\"></ion-img>\n        </ion-avatar>\n        <div class=\"ion-text-wrap message-container\">\n          <ion-label class=\"ion-margin-top\">Complete Your Profile</ion-label>\n          <p class=\"message-detail\">Answer a few questions to complete your profile.</p>\n        </div>\n        <ion-icon name=\"chevron-forward-outline\" color=\"primary\" slot=\"end\"></ion-icon>\n      </ion-item>\n      <ion-item-options>\n        <ion-item-option color=\"primary\" (click)=\"authService.incompleteOnboardProcess = null\">\n          Dismiss\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-toolbar>-->\n</ion-header>\n\n<ion-content>\n  <ion-router-outlet></ion-router-outlet>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/discover/discover/discover-routing.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/discover/discover/discover-routing.module.ts ***!
  \********************************************************************/
/*! exports provided: DiscoverRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscoverRoutingModule", function() { return DiscoverRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _discover_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./discover.page */ "./src/app/pages/discover/discover/discover.page.ts");
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
        component: _discover_page__WEBPACK_IMPORTED_MODULE_2__["DiscoverPage"],
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                    }
                ]
            },
            {
                path: 'insight',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../feature/manage/feature-insight/feature-insight.module#FeatureInsightPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/discover/home/5d5785b462489003817fee18',
                pathMatch: 'full'
            }
        ]
    }
];
var DiscoverRoutingModule = /** @class */ (function () {
    function DiscoverRoutingModule() {
    }
    DiscoverRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DiscoverRoutingModule);
    return DiscoverRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/discover/discover/discover.module.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/discover/discover/discover.module.ts ***!
  \************************************************************/
/*! exports provided: DiscoverPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscoverPageModule", function() { return DiscoverPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _discover_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./discover.page */ "./src/app/pages/discover/discover/discover.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var _discover_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./discover-routing.module */ "./src/app/pages/discover/discover/discover-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var DiscoverPageModule = /** @class */ (function () {
    function DiscoverPageModule() {
    }
    DiscoverPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__["ApplicationPipesModule"],
                _discover_routing_module__WEBPACK_IMPORTED_MODULE_6__["DiscoverRoutingModule"]
            ],
            declarations: [_discover_page__WEBPACK_IMPORTED_MODULE_4__["DiscoverPage"]]
        })
    ], DiscoverPageModule);
    return DiscoverPageModule;
}());



/***/ }),

/***/ "./src/app/pages/discover/discover/discover.page.scss":
/*!************************************************************!*\
  !*** ./src/app/pages/discover/discover/discover.page.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-discover ion-menu-toggle ion-badge {\n  position: relative;\n  top: 0.1rem;\n  right: 22px;\n  /*& ~ ion-icon {\n    outline-color: whitesmoke;\n  }*/\n  z-index: 5;\n}\napp-discover .message-container {\n  width: 100%;\n}\napp-discover .message-detail {\n  width: 85%;\n  color: grey;\n  margin: 8px 0 16px 0;\n  max-height: 36px;\n  line-height: 18px;\n  /* Height / no. of lines to display */\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2Rpc2NvdmVyL2Rpc2NvdmVyL2Rpc2NvdmVyLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvZGlzY292ZXIvZGlzY292ZXIvZGlzY292ZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdJO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUVBOztJQUFBO0VBR0EsVUFBQTtBQ0hOO0FET0U7RUFDRSxXQUFBO0FDTEo7QURRRTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQW1CLHFDQUFBO0VBQ25CLGdCQUFBO0FDTEoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9kaXNjb3Zlci9kaXNjb3Zlci9kaXNjb3Zlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtZGlzY292ZXIge1xuXG4gIGlvbi1tZW51LXRvZ2dsZSB7XG4gICAgaW9uLWJhZGdlIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHRvcDogMC4xcmVtO1xuICAgICAgcmlnaHQ6IDIycHg7XG5cbiAgICAgIC8qJiB+IGlvbi1pY29uIHtcbiAgICAgICAgb3V0bGluZS1jb2xvcjogd2hpdGVzbW9rZTtcbiAgICAgIH0qL1xuICAgICAgei1pbmRleDogNTtcbiAgICB9XG4gIH1cblxuICAubWVzc2FnZS1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLm1lc3NhZ2UtZGV0YWlsIHtcbiAgICB3aWR0aDogODUlO1xuICAgIGNvbG9yOiBncmV5O1xuICAgIG1hcmdpbjogOHB4IDAgMTZweCAwO1xuICAgIG1heC1oZWlnaHQ6IDM2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDE4cHg7IC8qIEhlaWdodCAvIG5vLiBvZiBsaW5lcyB0byBkaXNwbGF5ICovXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxufVxuIiwiYXBwLWRpc2NvdmVyIGlvbi1tZW51LXRvZ2dsZSBpb24tYmFkZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogMC4xcmVtO1xuICByaWdodDogMjJweDtcbiAgLyomIH4gaW9uLWljb24ge1xuICAgIG91dGxpbmUtY29sb3I6IHdoaXRlc21va2U7XG4gIH0qL1xuICB6LWluZGV4OiA1O1xufVxuYXBwLWRpc2NvdmVyIC5tZXNzYWdlLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWRpc2NvdmVyIC5tZXNzYWdlLWRldGFpbCB7XG4gIHdpZHRoOiA4NSU7XG4gIGNvbG9yOiBncmV5O1xuICBtYXJnaW46IDhweCAwIDE2cHggMDtcbiAgbWF4LWhlaWdodDogMzZweDtcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIC8qIEhlaWdodCAvIG5vLiBvZiBsaW5lcyB0byBkaXNwbGF5ICovXG4gIG92ZXJmbG93OiBoaWRkZW47XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/discover/discover/discover.page.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/discover/discover/discover.page.ts ***!
  \**********************************************************/
/*! exports provided: DiscoverPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscoverPage", function() { return DiscoverPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
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







var DiscoverPage = /** @class */ (function () {
    function DiscoverPage(router, storage, platform, authService, chatService, userData) {
        this.router = router;
        this.storage = storage;
        this.platform = platform;
        this.authService = authService;
        this.chatService = chatService;
        this.userData = userData;
    }
    DiscoverPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_1__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["Auth"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_4__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"] }
    ]; };
    DiscoverPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-discover',
            template: __importDefault(__webpack_require__(/*! raw-loader!./discover.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/discover/discover/discover.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./discover.page.scss */ "./src/app/pages/discover/discover/discover.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_1__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_6__["Auth"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_4__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"]])
    ], DiscoverPage);
    return DiscoverPage;
}());



/***/ })

}]);
//# sourceMappingURL=discover-discover-discover-module.js.map