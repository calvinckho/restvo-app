(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~feature-childactivities-feature-childactivities-module~feature-manage-managefeature-module~f~af00ffcf"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.html":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.html ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{this.categoryLabel}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header *ngIf=\"categoryId !== '5c915476e172e4e64590e349'\"> <!--non Plan child Activities-->\n      <ion-label>New Mentoring {{this.categoryLabel}} (Available in Library)</ion-label>\n    </ion-list-header>\n    <ion-list-header *ngIf=\"categoryId === '5c915476e172e4e64590e349' && moment.categories.includes('5dfdbb547b00ea76b75e5a70')\"> <!--Plan shown in Relationship-->\n      <ion-label>Adopted {{this.categoryLabel}}</ion-label>\n    </ion-list-header>\n    <ion-list-header *ngIf=\"categoryId === '5c915476e172e4e64590e349' && !moment.categories.includes('5dfdbb547b00ea76b75e5a70')\"> <!--Plan shown in non-Relationship-->\n      <ion-label>Available {{this.categoryLabel}}</ion-label>\n    </ion-list-header>\n    <ion-grid class=\"program-grid\">\n      <ion-row class=\"program-row\">\n        <ion-col class=\"ion-align-self-center\" size-xs=\"6\" size-sm=\"4\" size-md=\"3\" size-lg=\"3\" size-xl=\"3\">\n          <ion-card class=\"program-card\" (click)=\"chooseChildActivity()\" id=\"create-new-moment\">\n            <ion-card-header class=\"ion-no-padding\" color=\"lightgrey\">\n              <ion-row class=\"program-photo-container ion-justify-content-center ion-align-items-center\">\n                <ion-icon name=\"add\" color=\"darkgrey\"></ion-icon>\n              </ion-row>\n            </ion-card-header>\n            <div class=\"program-name dark\">Add</div>\n          </ion-card>\n        </ion-col>\n        <ion-col class=\"ion-align-self-center\" *ngFor=\"let sample of samples; index as i\" size-xs=\"6\" size-sm=\"4\" size-md=\"3\" size-lg=\"3\" size-xl=\"3\" [hidden]=\"!((sample.matrix_string[0][0].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || sample.resource['en-US'].value[0].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1) && sample.array_boolean[1])\">\n          <ion-card class=\"program-card\" (click)=\"openChildActivity(sample)\">\n            <ion-card-header class=\"ion-no-padding\">\n              <div class=\"program-photo-container\">\n                <ion-img class=\"program-photo\" [src]=\"(sample.assets && sample.assets.length && sample.assets[0]) | background: sample._id\"></ion-img>\n              </div>\n            </ion-card-header>\n            <div class=\"program-type\"><ion-badge color=\"button1\">{{sample.resource['en-US'].value[0]}}</ion-badge></div>\n            <div class=\"program-name light\">{{sample.matrix_string[0][0]}}</div>\n            <!--<ion-button class=\"info-moment ion-no-padding ion-no-margin\" (click)=\"openActivity($event, sample)\" fill=\"clear\" size=\"small\">\n              <ion-icon name=\"information-circle-outline\" color=\"secondary\"></ion-icon>\n            </ion-button>-->\n            <ion-button class=\"info-moment ion-no-padding ion-no-margin\" (click)=\"removeActivity($event, sample)\" fill=\"clear\" size=\"small\" *ngIf=\"categoryId === '5c915476e172e4e64590e349'\">\n              <ion-icon name=\"close\" color=\"primary\"></ion-icon>\n            </ion-button>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-list-header *ngIf=\"categoryId !== '5c915476e172e4e64590e349'\"> <!--Only show for non-Plan child Activities-->\n      <ion-label>All Mentoring {{this.categoryLabel}}</ion-label>\n    </ion-list-header>\n    <ion-grid class=\"program-grid\">\n      <ion-row class=\"program-row\">\n        <ion-col class=\"ion-align-self-center\" *ngFor=\"let sample of samples; index as i\" size-xs=\"6\" size-sm=\"4\" size-md=\"3\" size-lg=\"3\" size-xl=\"3\" [hidden]=\"!((sample.matrix_string[0][0].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || sample.resource['en-US'].value[0].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1) && !sample.array_boolean[1])\">\n          <ion-card class=\"program-card\" (click)=\"openChildActivity(sample)\">\n            <ion-card-header class=\"ion-no-padding\">\n              <div class=\"program-photo-container\">\n                <ion-img class=\"program-photo\" [src]=\"(sample.assets && sample.assets.length && sample.assets[0]) | background: sample._id\"></ion-img>\n              </div>\n            </ion-card-header>\n            <div class=\"program-type\"><ion-badge color=\"button1\">{{sample.resource['en-US'].value[0]}}</ion-badge></div>\n            <div class=\"program-name light\">{{sample.matrix_string[0][0]}}</div>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.scss":
/*!************************************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.scss ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-feature-childactivities .program-row {\n  max-height: 70%;\n  overflow: scroll;\n}\napp-feature-childactivities .program-card {\n  width: auto;\n  -o-object-fit: contain;\n     object-fit: contain;\n  margin: 0 3%;\n}\napp-feature-childactivities .program-photo-container {\n  height: 80px;\n  overflow: hidden;\n}\napp-feature-childactivities .program-photo {\n  -o-object-fit: cover;\n     object-fit: cover;\n  cursor: pointer;\n  height: 100%;\n  margin: auto;\n  display: block;\n}\napp-feature-childactivities .program-type {\n  position: absolute;\n  top: 2%;\n  left: 2%;\n  font-size: 12px;\n  cursor: pointer;\n}\napp-feature-childactivities .program-name {\n  position: absolute;\n  bottom: 2%;\n  left: 2%;\n  font-size: 12px;\n  cursor: pointer;\n  z-index: 15;\n}\napp-feature-childactivities .remove-moment {\n  position: absolute;\n  top: 0;\n  right: 2px;\n}\napp-feature-childactivities .dark {\n  color: var(--ion-color-darkgrey);\n}\napp-feature-childactivities .light {\n  color: white;\n}\napp-feature-childactivities .full-height {\n  height: 100%;\n}\napp-feature-childactivities .grid-row {\n  overflow: scroll;\n}\napp-feature-childactivities .selected {\n  opacity: 1;\n}\napp-feature-childactivities .info-moment {\n  position: absolute;\n  top: 0;\n  right: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2ZlYXR1cmUvbWFuYWdlL2ZlYXR1cmUtY2hpbGRhY3Rpdml0aWVzL2ZlYXR1cmUtY2hpbGRhY3Rpdml0aWVzLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvZmVhdHVyZS9tYW5hZ2UvZmVhdHVyZS1jaGlsZGFjdGl2aXRpZXMvZmVhdHVyZS1jaGlsZGFjdGl2aXRpZXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDREo7QURJRTtFQUNFLFdBQUE7RUFDQSxzQkFBQTtLQUFBLG1CQUFBO0VBQ0EsWUFBQTtBQ0ZKO0FES0U7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNISjtBRE1FO0VBQ0Usb0JBQUE7S0FBQSxpQkFBQTtFQUNBLGVBQUE7RUFFQSxZQUFBO0VBRUEsWUFBQTtFQUNBLGNBQUE7QUNOSjtBRFVFO0VBQ0Usa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FDUko7QURXRTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUNUSjtBRFlFO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtBQ1ZKO0FEYUU7RUFDRSxnQ0FBQTtBQ1hKO0FEY0U7RUFDRSxZQUFBO0FDWko7QURlRTtFQUNFLFlBQUE7QUNiSjtBRGdCRTtFQUVFLGdCQUFBO0FDZko7QURrQkU7RUFDRSxVQUFBO0FDaEJKO0FEbUJFO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtBQ2pCSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ZlYXR1cmUvbWFuYWdlL2ZlYXR1cmUtY2hpbGRhY3Rpdml0aWVzL2ZlYXR1cmUtY2hpbGRhY3Rpdml0aWVzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1mZWF0dXJlLWNoaWxkYWN0aXZpdGllcyB7XG5cbiAgLnByb2dyYW0tcm93IHtcbiAgICBtYXgtaGVpZ2h0OiA3MCU7XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgfVxuXG4gIC5wcm9ncmFtLWNhcmQge1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgbWFyZ2luOiAwIDMlO1xuICB9XG5cbiAgLnByb2dyYW0tcGhvdG8tY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC5wcm9ncmFtLXBob3RvIHtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgLy9vcGFjaXR5OiA1MCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC8vd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIC8vbWF4LWhlaWdodDogMjAwcHg7XG4gIH1cblxuICAucHJvZ3JhbS10eXBlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAyJTtcbiAgICBsZWZ0OiAyJTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5cbiAgLnByb2dyYW0tbmFtZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMiU7XG4gICAgbGVmdDogMiU7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB6LWluZGV4OiAxNTtcbiAgfVxuXG4gIC5yZW1vdmUtbW9tZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAycHg7XG4gIH1cblxuICAuZGFyayB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrZ3JleSk7XG4gIH1cblxuICAubGlnaHQge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxuXG4gIC5mdWxsLWhlaWdodCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG5cbiAgLmdyaWQtcm93IHtcbiAgICAvL2FsaWduLWl0ZW1zOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xuICB9XG5cbiAgLnNlbGVjdGVkIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG5cbiAgLmluZm8tbW9tZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAycHg7XG4gIH1cbn0iLCJhcHAtZmVhdHVyZS1jaGlsZGFjdGl2aXRpZXMgLnByb2dyYW0tcm93IHtcbiAgbWF4LWhlaWdodDogNzAlO1xuICBvdmVyZmxvdzogc2Nyb2xsO1xufVxuYXBwLWZlYXR1cmUtY2hpbGRhY3Rpdml0aWVzIC5wcm9ncmFtLWNhcmQge1xuICB3aWR0aDogYXV0bztcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWFyZ2luOiAwIDMlO1xufVxuYXBwLWZlYXR1cmUtY2hpbGRhY3Rpdml0aWVzIC5wcm9ncmFtLXBob3RvLWNvbnRhaW5lciB7XG4gIGhlaWdodDogODBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbmFwcC1mZWF0dXJlLWNoaWxkYWN0aXZpdGllcyAucHJvZ3JhbS1waG90byB7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgbWFyZ2luOiBhdXRvO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbmFwcC1mZWF0dXJlLWNoaWxkYWN0aXZpdGllcyAucHJvZ3JhbS10eXBlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDIlO1xuICBsZWZ0OiAyJTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5hcHAtZmVhdHVyZS1jaGlsZGFjdGl2aXRpZXMgLnByb2dyYW0tbmFtZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAyJTtcbiAgbGVmdDogMiU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB6LWluZGV4OiAxNTtcbn1cbmFwcC1mZWF0dXJlLWNoaWxkYWN0aXZpdGllcyAucmVtb3ZlLW1vbWVudCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMnB4O1xufVxuYXBwLWZlYXR1cmUtY2hpbGRhY3Rpdml0aWVzIC5kYXJrIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrZ3JleSk7XG59XG5hcHAtZmVhdHVyZS1jaGlsZGFjdGl2aXRpZXMgLmxpZ2h0IHtcbiAgY29sb3I6IHdoaXRlO1xufVxuYXBwLWZlYXR1cmUtY2hpbGRhY3Rpdml0aWVzIC5mdWxsLWhlaWdodCB7XG4gIGhlaWdodDogMTAwJTtcbn1cbmFwcC1mZWF0dXJlLWNoaWxkYWN0aXZpdGllcyAuZ3JpZC1yb3cge1xuICBvdmVyZmxvdzogc2Nyb2xsO1xufVxuYXBwLWZlYXR1cmUtY2hpbGRhY3Rpdml0aWVzIC5zZWxlY3RlZCB7XG4gIG9wYWNpdHk6IDE7XG59XG5hcHAtZmVhdHVyZS1jaGlsZGFjdGl2aXRpZXMgLmluZm8tbW9tZW50IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAycHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.ts ***!
  \**********************************************************************************************/
/*! exports provided: FeatureChildActivitiesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureChildActivitiesPage", function() { return FeatureChildActivitiesPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pickfeature-popover/pickfeature-popover.page */ "./src/app/pages/feature/pickfeature-popover/pickfeature-popover.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../services/resource.service */ "./src/app/services/resource.service.ts");
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
var __values = (undefined && undefined.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};









var FeatureChildActivitiesPage = /** @class */ (function () {
    function FeatureChildActivitiesPage(route, router, platform, authService, chatService, userData, momentService, resourceService, modalCtrl) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.platform = platform;
        this.authService = authService;
        this.chatService = chatService;
        this.userData = userData;
        this.momentService = momentService;
        this.resourceService = resourceService;
        this.modalCtrl = modalCtrl;
        this.subscriptions = {};
        this.categoryLabel = '';
        this.ionSpinner = false;
        this.searchKeyword = '';
        this.refreshNeeded = false;
        this.reloadChildActivitiesHandler = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setupChildActivitiesPage();
                return [2 /*return*/];
            });
        }); };
    }
    FeatureChildActivitiesPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resourceService.loadSystemResources()];
                    case 1:
                        _a.sent();
                        // link the refreshUserStatus Observable with the loadChildActivities handler. It fires on page loads and subsequent user status refresh
                        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.reloadChildActivitiesHandler);
                        return [2 /*return*/];
                }
            });
        });
    };
    FeatureChildActivitiesPage.prototype.setupChildActivitiesPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.userData && this.userData.user)) return [3 /*break*/, 4];
                        if (!this.moment) return [3 /*break*/, 1];
                        this.momentId = this.moment._id;
                        return [3 /*break*/, 3];
                    case 1:
                        this.momentId = this.route.snapshot.paramMap.get('id'); // the moment object
                        _a = this;
                        return [4 /*yield*/, this.momentService.load(this.momentId)];
                    case 2:
                        _a.moment = _b.sent();
                        this.moment.categories = this.moment.categories.map(function (c) { return c._id; });
                        _b.label = 3;
                    case 3:
                        this.categoryId = this.categoryId || this.route.snapshot.paramMap.get('categoryId');
                        this.categoryLabel = this.resourceService.categories.find(function (c) { return c._id === _this.categoryId; })['en-US'].value[0] + 's';
                        this.loadChildActivities();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // load Program child activities
    FeatureChildActivitiesPage.prototype.loadChildActivities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.momentService.loadProgramChildActivities(this.momentId, this.categoryId)];
                    case 1:
                        _a.samples = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FeatureChildActivitiesPage.prototype.openChildActivity = function (moment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.modalPage || this.platform.width() < 768) {
                    // for community or program, manage mode
                    if ((moment.categories.map(function (c) { return c._id; }).includes('5c915324e172e4e64590e346') || moment.categories.map(function (c) { return c._id; }).includes('5c915475e172e4e64590e348'))) {
                        this.momentService.manageMoment({ moment: moment, modalPage: true });
                    }
                    else { // for relationship and other Activities, open Moment
                        this.momentService.openMoment({ moment: moment, modalPage: true });
                    }
                }
                else {
                    if (this.router.url.includes('app/manage')) { // if opened from Manage mode
                        this.router.navigate(['/app/manage/activity/' + moment._id + '/profile/' + moment._id], { replaceUrl: false });
                    }
                    else { // such case does not exist yet. User should always open from the User -> About Me
                        this.router.navigate(['/app/activity/' + moment._id], { replaceUrl: false });
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    FeatureChildActivitiesPage.prototype.chooseChildActivity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, _c, componentProps, modal, moments, moments_1, moments_1_1, moment, clonedMoments, clonedMoments_1, clonedMoments_1_1, clonedMoment, index;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        componentProps = { title: 'Choose from Library', categoryId: this.categoryId, allowCreate: true, allowSwitchCategory: false, modalPage: true };
                        if (this.categoryId === '5e17acd47b00ea76b75e5a71') { // Pick onboarding flows
                            componentProps.programId = this.momentId;
                        }
                        else if (this.categoryId === '5c915476e172e4e64590e349') { // pick plan
                            componentProps.parent_programId = this.momentId;
                            componentProps.maxMomentCount = 1;
                            if (this.moment.categories.includes('5dfdbb547b00ea76b75e5a70')) { // in relationships, disable create. Only choosing is allowed. It's because creation needs to take place on the program level in order that a Plan's parent_programs is registered correctly
                                componentProps.allowCreate = false;
                            }
                        }
                        else { // pick other activities
                            componentProps.parent_programId = this.momentId;
                        }
                        return [4 /*yield*/, this.modalCtrl.create({ component: _pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_2__["PickfeaturePopoverPage"], componentProps: componentProps })];
                    case 1:
                        modal = _d.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        moments = (_d.sent()).data;
                        if (!(moments && moments.length)) return [3 /*break*/, 8];
                        if (!(this.categoryId === '5c915476e172e4e64590e349')) return [3 /*break*/, 6];
                        if (!this.moment.resource.matrix_number[0].includes(10210)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.momentService.adoptPlan({
                                operation: 'adopt plan',
                                planIds: moments.map(function (moment) { return moment._id; }),
                                parent_programId: this.momentId,
                            })];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        try {
                            for (moments_1 = __values(moments), moments_1_1 = moments_1.next(); !moments_1_1.done; moments_1_1 = moments_1.next()) {
                                moment = moments_1_1.value;
                                // prepare relationship object for cloning. copy everything except calendar and add programId to parent_programs property
                                moment.calendar = {
                                    title: moment.matrix_string[0][0],
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
                                moment.parent_programs = [this.momentId];
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (moments_1_1 && !moments_1_1.done && (_a = moments_1.return)) _a.call(moments_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, this.momentService.clone(moments, 'admin')];
                    case 7:
                        clonedMoments = _d.sent();
                        try {
                            for (clonedMoments_1 = __values(clonedMoments), clonedMoments_1_1 = clonedMoments_1.next(); !clonedMoments_1_1.done; clonedMoments_1_1 = clonedMoments_1.next()) {
                                clonedMoment = clonedMoments_1_1.value;
                                index = moments.map(function (moment) { return moment.resource._id; }).indexOf(clonedMoment.resource);
                                if (index > -1) {
                                    clonedMoment.resource = moments[index].resource; // clone the populated resource
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (clonedMoments_1_1 && !clonedMoments_1_1.done && (_b = clonedMoments_1.return)) _b.call(clonedMoments_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        (_c = this.samples).unshift.apply(_c, __spread(clonedMoments));
                        _d.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FeatureChildActivitiesPage.prototype.openActivity = function (event, activity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                event.stopPropagation();
                this.momentService.openMoment({ moment: activity, modalPage: true });
                return [2 /*return*/];
            });
        });
    };
    FeatureChildActivitiesPage.prototype.removeActivity = function (event, activity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                event.stopPropagation();
                this.momentService.adoptPlan({
                    operation: 'un-adopt plan',
                    planIds: [activity._id],
                    parent_programId: this.momentId
                });
                return [2 /*return*/];
            });
        });
    };
    FeatureChildActivitiesPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    FeatureChildActivitiesPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe();
    };
    FeatureChildActivitiesPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_5__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_7__["Moment"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeatureChildActivitiesPage.prototype, "modalPage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeatureChildActivitiesPage.prototype, "moment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeatureChildActivitiesPage.prototype, "categoryId", void 0);
    FeatureChildActivitiesPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feature-childactivities',
            template: __importDefault(__webpack_require__(/*! raw-loader!./feature-childactivities.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./feature-childactivities.page.scss */ "./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_5__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_7__["Moment"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_8__["Resource"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"]])
    ], FeatureChildActivitiesPage);
    return FeatureChildActivitiesPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~feature-childactivities-feature-childactivities-module~feature-manage-managefeature-module~f~af00ffcf.js.map