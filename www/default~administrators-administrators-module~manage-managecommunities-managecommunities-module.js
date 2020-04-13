(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~administrators-administrators-module~manage-managecommunities-managecommunities-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/administrators/administrators.page.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/administrators/administrators.page.html ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{userData.user.churches[userData.currentCommunityIndex].name}}: Administrators</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <div>To add administrator, go to Members, then click on the Member profile to change the admin status.</div>\n  <ion-list *ngIf=\"churchService && churchService.currentManagedCommunity\">\n    <ion-item *ngFor=\"let admin of churchService.currentManagedCommunity.admins\" (click)=\"editAdmin($event, admin)\">\n      <ion-avatar slot=\"start\">\n        <img *ngIf=\"admin.avatar\" [src]=\"admin.avatar\"/>\n        <img *ngIf=\"!admin.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n      </ion-avatar>\n      {{admin.first_name}} {{admin.last_name}}\n    </ion-item>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/manage/administrators/administrators.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/manage/administrators/administrators.module.ts ***!
  \**********************************************************************/
/*! exports provided: AdministratorsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdministratorsPageModule", function() { return AdministratorsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _administrators_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./administrators.page */ "./src/app/pages/manage/administrators/administrators.page.ts");
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
        component: _administrators_page__WEBPACK_IMPORTED_MODULE_5__["AdministratorsPage"]
    }
];
var AdministratorsPageModule = /** @class */ (function () {
    function AdministratorsPageModule() {
    }
    AdministratorsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_administrators_page__WEBPACK_IMPORTED_MODULE_5__["AdministratorsPage"]]
        })
    ], AdministratorsPageModule);
    return AdministratorsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/manage/administrators/administrators.page.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/manage/administrators/administrators.page.scss ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL21hbmFnZS9hZG1pbmlzdHJhdG9ycy9hZG1pbmlzdHJhdG9ycy5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/manage/administrators/administrators.page.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/manage/administrators/administrators.page.ts ***!
  \********************************************************************/
/*! exports provided: AdministratorsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdministratorsPage", function() { return AdministratorsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../connect/invitetoconnect/invitetoconnect.page */ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.ts");
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






var AdministratorsPage = /** @class */ (function () {
    function AdministratorsPage(modalCtrl, userData, churchService) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.userData = userData;
        this.churchService = churchService;
        this.refreshNeeded = false;
        this.searchKeyword = '';
        this.subscriptions = {};
        this.refreshHandler = function (data) {
            if (data && data.type === 'load community ready') {
                console.log("admins", _this.churchService.currentManagedCommunity.admins);
            }
        };
    }
    AdministratorsPage.prototype.ngOnInit = function () {
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    };
    AdministratorsPage.prototype.editAdmin = function (event, admin) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal, needsToRefresh;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_4__["ShowrecipientinfoPage"], componentProps: { recipient: admin, modalPage: true } })];
                    case 1:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, recipientModal.onDidDismiss()];
                    case 3:
                        needsToRefresh = (_a.sent()).data;
                        if (needsToRefresh) {
                            this.userData.refreshUserStatus({ type: 'refresh manage pag' });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdministratorsPage.prototype.addAdmin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal, needsToRefresh;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_5__["InvitetoconnectPage"], componentProps: { church: this.churchService.currentManagedCommunity, type: 'Restvo Users', modalPage: true } })];
                    case 1:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, recipientModal.onDidDismiss()];
                    case 3:
                        needsToRefresh = (_a.sent()).data;
                        if (needsToRefresh) {
                            this.userData.refreshUserStatus({ type: 'refresh manage pag' });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdministratorsPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    AdministratorsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_3__["Churches"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AdministratorsPage.prototype, "modalPage", void 0);
    AdministratorsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-administrators',
            template: __importDefault(__webpack_require__(/*! raw-loader!./administrators.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/manage/administrators/administrators.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./administrators.page.scss */ "./src/app/pages/manage/administrators/administrators.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_3__["Churches"]])
    ], AdministratorsPage);
    return AdministratorsPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~administrators-administrators-module~manage-managecommunities-managecommunities-module.js.map