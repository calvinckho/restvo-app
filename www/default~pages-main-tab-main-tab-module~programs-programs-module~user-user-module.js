(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-main-tab-main-tab-module~programs-programs-module~user-user-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/programs/programs.page.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/programs/programs.page.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Mentoring</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-item lines=\"none\">\n    <ion-label>Choose Your Default Mentoring:</ion-label>\n  </ion-item>\n  <ion-grid class=\"program-grid\">\n    <ion-row class=\"program-row\">\n      <ion-col class=\"ion-align-self-center\" *ngFor=\"let program of programs\" size-xs=\"12\" size-sm=\"6\" size-md=\"4\" size-lg=\"4\" size-xl=\"3\">\n        <ion-card class=\"program-card\" (click)=\"selectDefault($event, program)\">   <!--[ngStyle]=\"{'background-image': 'url(' + (activity.moment.assets?.length ? activity.moment.assets[0] : '') + ')'}\"-->\n          <ion-card-header class=\"ion-no-padding\">\n            <div class=\"program-photo-container\" [ngClass]=\"{'opacity': program._id !== (userData.defaultProgram && userData.defaultProgram._id) }\">\n              <ion-img class=\"program-photo\" [src]=\"(program.assets && program.assets[0]) | background: program._id\"></ion-img>\n            </div>\n          </ion-card-header>\n          <div class=\"program-type\"><ion-badge color=\"button1\">{{program.resource['en-US'].value[0]}}</ion-badge></div>\n          <div class=\"program-name\">{{program.matrix_string[0][0]}}</div>\n          <ion-button class=\"info-moment ion-no-padding ion-no-margin\" (click)=\"openProgram($event, program)\" fill=\"clear\" size=\"small\">\n            <ion-icon name=\"information-circle-outline\" color=\"secondary\"></ion-icon>\n          </ion-button>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/user/programs/programs.module.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/user/programs/programs.module.ts ***!
  \********************************************************/
/*! exports provided: ProgramsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramsPageModule", function() { return ProgramsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _programs_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./programs.page */ "./src/app/pages/user/programs/programs.page.ts");
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
        component: _programs_page__WEBPACK_IMPORTED_MODULE_5__["ProgramsPage"]
    }
];
var ProgramsPageModule = /** @class */ (function () {
    function ProgramsPageModule() {
    }
    ProgramsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_6__["ApplicationPipesModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [_programs_page__WEBPACK_IMPORTED_MODULE_5__["ProgramsPage"]]
        })
    ], ProgramsPageModule);
    return ProgramsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/user/programs/programs.page.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/user/programs/programs.page.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-programs .program-row {\n  height: 100px;\n}\napp-programs .program-card {\n  width: auto;\n  -o-object-fit: contain;\n     object-fit: contain;\n  margin: 0 3%;\n}\napp-programs .program-photo-container {\n  height: 80px;\n  overflow: hidden;\n}\napp-programs .program-photo {\n  -o-object-fit: cover;\n     object-fit: cover;\n  cursor: pointer;\n  height: 100%;\n  margin: auto;\n  display: block;\n}\napp-programs .program-name {\n  position: absolute;\n  bottom: 2%;\n  left: 2%;\n  color: white;\n  font-size: 12px;\n  cursor: pointer;\n  z-index: 15;\n}\napp-programs .program-type {\n  position: absolute;\n  top: 2%;\n  left: 2%;\n  font-size: 12px;\n  cursor: pointer;\n}\napp-programs .info-moment {\n  position: absolute;\n  top: 0;\n  right: 2px;\n}\napp-programs .opacity {\n  opacity: 0.4;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL3VzZXIvcHJvZ3JhbXMvcHJvZ3JhbXMucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy91c2VyL3Byb2dyYW1zL3Byb2dyYW1zLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLGFBQUE7QUNESjtBRElFO0VBQ0UsV0FBQTtFQUNBLHNCQUFBO0tBQUEsbUJBQUE7RUFDQSxZQUFBO0FDRko7QURLRTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQ0hKO0FEUUU7RUFDRSxvQkFBQTtLQUFBLGlCQUFBO0VBQ0EsZUFBQTtFQUVBLFlBQUE7RUFFQSxZQUFBO0VBQ0EsY0FBQTtBQ1JKO0FEWUU7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQ1ZKO0FEYUU7RUFDRSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUNYSjtBRGNFO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtBQ1pKO0FEZUU7RUFDRSxZQUFBO0FDYkoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy91c2VyL3Byb2dyYW1zL3Byb2dyYW1zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1wcm9ncmFtcyB7XG5cbiAgLnByb2dyYW0tcm93IHtcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICB9XG5cbiAgLnByb2dyYW0tY2FyZCB7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgICBtYXJnaW46IDAgMyU7XG4gIH1cblxuICAucHJvZ3JhbS1waG90by1jb250YWluZXIge1xuICAgIGhlaWdodDogODBweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIC8vYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIC8vbWFyZ2luOiA1JSBhdXRvO1xuICB9XG5cbiAgLnByb2dyYW0tcGhvdG8ge1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAvL29wYWNpdHk6IDUwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLy93aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgLy9tYXgtaGVpZ2h0OiAyMDBweDtcbiAgfVxuXG4gIC5wcm9ncmFtLW5hbWUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDIlO1xuICAgIGxlZnQ6IDIlO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHotaW5kZXg6IDE1O1xuICB9XG5cbiAgLnByb2dyYW0tdHlwZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMiU7XG4gICAgbGVmdDogMiU7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuXG4gIC5pbmZvLW1vbWVudCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMnB4O1xuICB9XG5cbiAgLm9wYWNpdHkge1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgfVxufSIsImFwcC1wcm9ncmFtcyAucHJvZ3JhbS1yb3cge1xuICBoZWlnaHQ6IDEwMHB4O1xufVxuYXBwLXByb2dyYW1zIC5wcm9ncmFtLWNhcmQge1xuICB3aWR0aDogYXV0bztcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWFyZ2luOiAwIDMlO1xufVxuYXBwLXByb2dyYW1zIC5wcm9ncmFtLXBob3RvLWNvbnRhaW5lciB7XG4gIGhlaWdodDogODBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbmFwcC1wcm9ncmFtcyAucHJvZ3JhbS1waG90byB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgbWFyZ2luOiBhdXRvO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbmFwcC1wcm9ncmFtcyAucHJvZ3JhbS1uYW1lIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDIlO1xuICBsZWZ0OiAyJTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDEycHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgei1pbmRleDogMTU7XG59XG5hcHAtcHJvZ3JhbXMgLnByb2dyYW0tdHlwZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAyJTtcbiAgbGVmdDogMiU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuYXBwLXByb2dyYW1zIC5pbmZvLW1vbWVudCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMnB4O1xufVxuYXBwLXByb2dyYW1zIC5vcGFjaXR5IHtcbiAgb3BhY2l0eTogMC40O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/user/programs/programs.page.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/user/programs/programs.page.ts ***!
  \******************************************************/
/*! exports provided: ProgramsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramsPage", function() { return ProgramsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
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






var ProgramsPage = /** @class */ (function () {
    function ProgramsPage(router, storage, userData, modalCtrl) {
        var _this = this;
        this.router = router;
        this.storage = storage;
        this.userData = userData;
        this.modalCtrl = modalCtrl;
        this.subscriptions = {};
        this.refreshHandler = function () {
            if (_this.userData.user) {
                _this.loadPrograms();
            }
        };
    }
    ProgramsPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
                return [2 /*return*/];
            });
        });
    };
    ProgramsPage.prototype.loadPrograms = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.userData;
                        return [4 /*yield*/, this.storage.get('defaultProgram')];
                    case 1:
                        _a.defaultProgram = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.userData.loadPrograms(false)];
                    case 2:
                        _b.programs = _c.sent();
                        this.programs.forEach(function (program) {
                            if (program.user_list_1.includes(_this.userData.user._id)) {
                                program.isParticipant = true;
                            }
                            if (program.user_list_2.includes(_this.userData.user._id)) {
                                program.isOrganizer = true;
                            }
                            if (program.user_list_3.includes(_this.userData.user._id)) {
                                program.isLeader = true;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProgramsPage.prototype.openProgram = function (event, program) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!!this.modalPage) return [3 /*break*/, 1];
                        this.router.navigate(['/app/user/activity/' + program._id], { replaceUrl: false });
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_3__["ShowfeaturePage"], componentProps: { moment: { _id: program._id }, modalPage: true } })];
                    case 2:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProgramsPage.prototype.selectDefault = function (event, program) {
        var _this = this;
        event.stopPropagation();
        this.userData.defaultProgram = program;
        this.userData.UIAdminMode = true;
        this.storage.set('defaultProgram', this.userData.defaultProgram);
        var activityURL;
        if (program.user_list_2.includes(this.userData.user._id) || program.user_list_3.includes(this.userData.user._id)) {
            activityURL = '/app/dashboard/insight/' + this.userData.defaultProgram._id;
        }
        else {
            activityURL = '/app/discover/home/' + this.userData.defaultProgram._id;
        }
        this.router.navigate([activityURL]);
        if (this.modalPage) {
            setTimeout(function () {
                _this.closeModal();
            }, 1000);
        }
    };
    ProgramsPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    ProgramsPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    };
    ProgramsPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserData"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ProgramsPage.prototype, "modalPage", void 0);
    ProgramsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-programs',
            template: __importDefault(__webpack_require__(/*! raw-loader!./programs.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/programs/programs.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./programs.page.scss */ "./src/app/pages/user/programs/programs.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserData"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]])
    ], ProgramsPage);
    return ProgramsPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~pages-main-tab-main-tab-module~programs-programs-module~user-user-module.js.map