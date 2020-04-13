(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~connect-myconversations-myconversations-module~pages-main-tab-main-tab-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/createchat/createchat.page.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/createchat/createchat.page.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n    <ion-button (click)=\"backButton()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{title}}</ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <div *ngIf=\"page === 1\">\n      <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\" (ionCancel)=\"cancelSearch($event)\"></ion-searchbar>\n      <div class=\"selected-buttons\">\n        <ion-button size=\"small\" *ngFor=\"let person of selectedAppUsers\" (click)=\"unselect(person)\">{{person.name}}<ion-icon name=\"close-circle\" style=\"margin-left: 5px;\"></ion-icon></ion-button>\n      </div>\n      <form *ngIf=\"displayGroup\" [formGroup]=\"chatForm\">\n        <ion-item>\n          <ion-label position=\"stacked\">Chat Name *</ion-label>\n          <ion-input type=\"text\" formControlName=\"name\"></ion-input>\n        </ion-item>\n      </form>\n    </div>\n    <div *ngIf=\"page === 2\" style=\"margin-left: 10px; color: grey;\">\n      Select group type:\n    </div>\n    <div *ngIf=\"page === 3\">\n      <div class=\"default-background\" [ngStyle]=\"{'background-image': 'url(' + (groupForm.value.background | background: userData.user._id) + ')'}\" >\n        <div class=\"edit-icon\"></div>\n        <div class=\"default-title\">\n          {{groupForm.value.name}}\n        </div>\n        <div *ngIf=\"platform.is('cordova')\" class=\"edit-icon\" (click)=\"selectUploadFile($event)\">\n          <ion-icon name=\"cog\" color=\"primary\"></ion-icon>\n        </div>\n        <div *ngIf=\"!platform.is('cordova')\" class=\"edit-icon\">\n          <label for=\"image\"><ion-icon name=\"cog\" color=\"primary\"></ion-icon></label>\n          <input type=\"file\" class=\"file-picker\" name=\"image\" id=\"image\" (change)=\"selectUploadFile($event)\" accept=\"image/*\"/>\n        </div>\n      </div>\n    </div>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid style=\"height: 100%\" *ngIf=\"ionSpinner\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n  <div *ngIf=\"page === 1\">\n    <ion-list-header>Friends</ion-list-header>\n    <ion-list>\n      <ion-item *ngFor=\"let person of listOfFriends; trackBy: customTrackBy\" (click)=\"select(person)\">\n        <ion-avatar slot=\"start\">\n          <ion-img *ngIf=\"person.avatar\" [src]=\"person.avatar\"></ion-img>\n          <ion-img *ngIf=\"!person.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n        </ion-avatar>\n        {{person.name}}\n        <ion-icon color=\"button1\" *ngIf=\"!person.select\" name=\"radio-button-off\" slot=\"end\"></ion-icon>\n        <ion-icon color=\"button1\" *ngIf=\"person.select\" name=\"checkmark-circle\" slot=\"end\"></ion-icon>\n      </ion-item>\n    </ion-list>\n    <ion-list-header>{{userData.user.churches[userData.currentCommunityIndex].name}}</ion-list-header>\n    <ion-list>\n      <ion-item *ngFor=\"let person of listOfAppUsers; trackBy: customTrackBy\" (click)=\"select(person)\">\n        <ion-avatar slot=\"start\">\n          <ion-img *ngIf=\"person.avatar\" [src]=\"person.avatar\"></ion-img>\n          <ion-img *ngIf=\"!person.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n        </ion-avatar>\n        {{person.name}}\n        <ion-icon color=\"button1\" *ngIf=\"!person.select\" name=\"radio-button-off\" slot=\"end\"></ion-icon>\n        <ion-icon color=\"button1\" *ngIf=\"person.select\" name=\"checkmark-circle\" slot=\"end\"></ion-icon>\n      </ion-item>\n    </ion-list>\n    <ion-infinite-scroll position=\"bottom\" (ionInfinite)=\"loadMorePeople($event)\">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </div>\n  <div *ngIf=\"page === 2\">\n    <ion-card (click)=\"selectGroupType('personal')\">\n      <ion-card-header>\n        <ion-card-title class=\"ion-text-center\">Personal Group</ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-note color=\"grey\">\n          A personal group is a private group chat. It does not belong to any community. You and your members can invite others to join.\n        </ion-note>\n      </ion-card-content>\n    </ion-card>\n    <ion-card (click)=\"selectGroupType('community')\">\n      <ion-card-header>\n        <ion-card-title class=\"ion-text-center\">Community Group</ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <ion-note color=\"grey\">\n          A community group is a group that belongs to a community. It can be set as private or public. A community group is managed by its leader (you) and the community administrators.\n        </ion-note>\n      </ion-card-content>\n    </ion-card>\n  </div>\n  <div *ngIf=\"page === 3\">\n    <form [formGroup]=\"groupForm\">\n      <ion-list>\n        <ion-item-group>\n          <ion-item>\n            <ion-label position=\"stacked\">{{title}} Name</ion-label>\n            <ion-input type=\"text\" formControlName=\"name\"></ion-input>\n          </ion-item>\n          <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.name.pristine && !groupForm.controls.name.valid\">\n            <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.name.pristine && groupForm.controls.name.hasError('required')\">\n              This is a required field.\n            </p>\n          </ion-item>\n        </ion-item-group>\n        <div *ngIf=\"type === 'community'\">\n          <ion-item-group>\n            <ion-item-divider></ion-item-divider>\n            <ion-item>\n              <ion-label position=\"stacked\">Community</ion-label>\n              <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" #church formControlName=\"churchId\" (ionChange)=\"changeCommunity(church.value)\">\n                <ion-select-option *ngFor=\"let church of churches\" [value]=\"church._id\">{{church.name}}</ion-select-option>\n              </ion-select>\n            </ion-item>\n            <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.churchId.pristine && !groupForm.controls.churchId.valid\">\n              <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.churchId.pristine && groupForm.controls.churchId.hasError('required')\">\n                This is a required field.\n              </p>\n            </ion-item>\n            <div *ngIf=\"groupForm.value.churchId !== ''\">\n              <ion-item>\n                <ion-label>List in Discover Section? <ion-icon name=\"information-circle\" (click)=\"explainDiscover()\"></ion-icon></ion-label>\n                <ion-toggle formControlName=\"public_group\"></ion-toggle>\n              </ion-item>\n            </div>\n            <ion-item>\n              <ion-label position=\"stacked\">Description</ion-label>\n              <ion-textarea #textArea id=\"textArea\" rows=\"8\" class=\"detailstextarea\" type=\"text\" formControlName=\"details\"></ion-textarea>\n            </ion-item>\n          </ion-item-group>\n          <ion-item-group>\n            <ion-item-divider>\n            </ion-item-divider>\n            <ion-item lines=\"none\" (click)=\"showOptional = !showOptional\">\n              <ion-label slot=\"start\">Optional</ion-label>\n              <ion-button size=\"small\" slot=\"end\" fill=\"outline\" *ngIf=\"!showOptional\">Show More</ion-button>\n            </ion-item>\n            <div  *ngIf=\"showOptional\">\n              <ion-item>\n                <ion-label position=\"stacked\">Start Time</ion-label>\n                <ion-datetime displayFormat=\"MMM DD, YYYY HH:mm\" pickerFormat=\"Z MMM DD, YYYY HH:mm\" min=\"2017\" max=\"2050-12-31\" formControlName=\"beginAtISOString\" [pickerOptions]=\"{cssClass: 'level-15'}\"></ion-datetime>\n              </ion-item>\n              <ion-item>\n                <ion-label position=\"stacked\">End Time</ion-label>\n                <ion-datetime displayFormat=\"MMM DD, YYYY HH:mm\" pickerFormat=\"Z MMM DD, YYYY HH:mm\" min=\"2017\" max=\"2050-12-31\" formControlName=\"endAtISOString\" [pickerOptions]=\"{cssClass: 'level-15'}\"></ion-datetime>\n              </ion-item>\n              <ion-item>\n                <ion-label position=\"stacked\">Day of the Week</ion-label>\n                <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"meeting_day\">\n                  <ion-select-option *ngFor=\"let day of days\" [value]=\"day.name\" [class.selected]=\"day.selected\">{{day.name}}</ion-select-option>\n                </ion-select>\n              </ion-item>\n              <ion-item>\n                <ion-label position=\"stacked\">Meeting Frequency</ion-label>\n                <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"meeting_frequency\">\n                  <ion-select-option *ngFor=\"let frequency of frequencies\" [value]=\"frequency.name\" [class.selected]=\"frequency.selected\">{{frequency.name}}</ion-select-option>\n                </ion-select>\n              </ion-item>\n              <ion-item-divider></ion-item-divider>\n              <ion-item>\n                <ion-label position=\"stacked\">Location/Room</ion-label>\n                <ion-input type=\"text\" formControlName=\"location\"></ion-input>\n              </ion-item>\n              <ion-item>\n                <ion-label position=\"stacked\">Street</ion-label>\n                <ion-input type=\"text\" formControlName=\"street\"></ion-input>\n              </ion-item>\n              <ion-item>\n                <ion-label position=\"stacked\">City</ion-label>\n                <ion-input type=\"text\" formControlName=\"city\"></ion-input>\n              </ion-item>\n              <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.city.pristine && !groupForm.controls.city.valid\">\n                <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.city.pristine && groupForm.controls.city.hasError('required')\">\n                  This is a required field.\n                </p>\n              </ion-item>\n              <ion-item>\n                <ion-label position=\"stacked\">State</ion-label>\n                <ion-input type=\"text\" formControlName=\"state\"></ion-input>\n              </ion-item>\n              <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.state.pristine && !groupForm.controls.state.valid\">\n                <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.state.pristine && groupForm.controls.state.hasError('required')\">\n                  This is a required field.\n                </p>\n              </ion-item>\n              <ion-item>\n                <ion-label position=\"stacked\">Country</ion-label>\n                <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"country\">\n                  <ion-select-option *ngFor=\"let country of countries\" [value]=\"country.name\" [class.selected]=\"country.selected\">{{country.name}}</ion-select-option>\n                </ion-select>\n              </ion-item>\n              <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.country.pristine && !groupForm.controls.country.valid\">\n                <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.country.pristine && groupForm.controls.country.hasError('required')\">\n                  This is a required field.\n                </p>\n              </ion-item>\n            </div>\n\n          </ion-item-group>\n          <ion-item-group *ngIf=\"showOptional\">\n            <ion-item-divider class=\"ion-text-wrap\" *ngIf=\"smsPlan\">\n              <ion-label>Communication Preference</ion-label>\n              <p>You can control chat message delivery to the Email and SMS members.</p>\n            </ion-item-divider>\n            <ion-item-divider class=\"ion-text-wrap\" *ngIf=\"!smsPlan\">\n              <ion-label>Communication Preference</ion-label>\n              <p>You can control chat message delivery to the Email members.</p>\n            </ion-item-divider>\n            <ion-item>\n              <ion-label class=\"ion-text-wrap\">Email members will receive messages</ion-label>\n              <ion-toggle slot=\"end\" formControlName=\"emailDisabled\"></ion-toggle>\n            </ion-item>\n            <div *ngIf=\"smsPlan\">\n              <ion-item>\n                <ion-label class=\"ion-text-wrap\">SMS members will receive messages</ion-label>\n                <ion-toggle slot=\"end\" formControlName=\"smsDisabled\"></ion-toggle>\n              </ion-item>\n              <ion-item-divider class=\"ion-text-wrap\">\n                <p>SMS keyword is a word of your choice for the text-to-join feature</p>\n              </ion-item-divider>\n              <ion-item lines=\"none\">\n                <ion-label position=\"stacked\">SMS Keyword</ion-label>\n                <ion-input type=\"text\" formControlName=\"smsKeyword\"></ion-input>\n              </ion-item>\n            </div>\n          </ion-item-group>\n        </div>\n      </ion-list>\n    </form>\n  </div>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n      <ion-button *ngIf=\"page === 1\" expand=\"full\" shape=\"round\" size=\"medium\" (click)=\"selectAppUsers()\" color=\"primary\" [disabled]=\"totalSelected < 1 || (totalSelected > 1 && chatForm.hasError('required'))\">Select {{totalSelected}}&nbsp;<span *ngIf=\"totalSelected <= 1\">Person</span><span *ngIf=\"totalSelected > 1\">People</span></ion-button>\n      <ion-button *ngIf=\"page === 3\" expand=\"full\" shape=\"round\" size=\"medium\" (click)=\"createGroupChat()\" color=\"primary\">Create {{this.title}}</ion-button>\n  </ion-toolbar>\n</ion-footer>\n\n");

/***/ }),

/***/ "./src/app/pages/connect/createchat/createchat.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/pages/connect/createchat/createchat.page.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-createchat ion-spinner {\n  position: absolute;\n  margin: 48%;\n}\napp-createchat .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-createchat .edit-icon {\n  position: absolute;\n  width: 20px;\n  right: 2px;\n  bottom: 2px;\n}\napp-createchat .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 2em;\n  color: #fff;\n  -webkit-text-stroke: thin;\n  /*    text-shadow:\n              -1px -1px 0 #000,\n              1px -1px 0 #000,\n              -1px 1px 0 #000,\n              1px 1px 0 #000;*/\n}\napp-createchat .selected-buttons {\n  display: block;\n  max-height: 100px;\n  overflow-y: scroll;\n  width: 100%;\n  padding: 0 5px;\n}\napp-createchat ion-card {\n  height: 30%;\n}\napp-createchat .group-type-title {\n  margin: 10% 0;\n}\napp-createchat form {\n  background-color: var(--ion-color-secondary);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2Nvbm5lY3QvY3JlYXRlY2hhdC9jcmVhdGVjaGF0LnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvY29ubmVjdC9jcmVhdGVjaGF0L2NyZWF0ZWNoYXQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0FDREo7QURJRTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtBQ0ZKO0FES0U7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtBQ0hKO0FETUU7RUFDRSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0o7Ozs7OEJBQUE7QUNBQTtBRE9FO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtBQ0xKO0FEUUU7RUFDRSxXQUFBO0FDTko7QURTRTtFQUNFLGFBQUE7QUNQSjtBRFVFO0VBQ0UsNENBQUE7QUNSSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Nvbm5lY3QvY3JlYXRlY2hhdC9jcmVhdGVjaGF0LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImFwcC1jcmVhdGVjaGF0IHtcblxuICBpb24tc3Bpbm5lciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogNDglO1xuICB9XG5cbiAgLmRlZmF1bHQtYmFja2dyb3VuZCB7XG4gICAgZGlzcGxheTogdGFibGU7XG4gICAgbWluLWhlaWdodDogMTUwcHg7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5lZGl0LWljb24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMjBweDtcbiAgICByaWdodDogMnB4O1xuICAgIGJvdHRvbTogMnB4O1xuICB9XG5cbiAgLmRlZmF1bHQtdGl0bGUge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAyLjBlbTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICAtd2Via2l0LXRleHQtc3Ryb2tlOiB0aGluO1xuLyogICAgdGV4dC1zaGFkb3c6XG4gICAgICAgICAgICAtMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgLTFweCAxcHggMCAjMDAwLFxuICAgICAgICAgICAgMXB4IDFweCAwICMwMDA7Ki9cbiAgfVxuXG4gIC5zZWxlY3RlZC1idXR0b25zIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXgtaGVpZ2h0OiAxMDBweDtcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMCA1cHg7XG4gIH1cblxuICBpb24tY2FyZCB7XG4gICAgaGVpZ2h0OiAzMCU7XG4gIH1cblxuICAuZ3JvdXAtdHlwZS10aXRsZSB7XG4gICAgbWFyZ2luOiAxMCUgMDtcbiAgfVxuXG4gIGZvcm0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICB9XG59XG4iLCJhcHAtY3JlYXRlY2hhdCBpb24tc3Bpbm5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWFyZ2luOiA0OCU7XG59XG5hcHAtY3JlYXRlY2hhdCAuZGVmYXVsdC1iYWNrZ3JvdW5kIHtcbiAgZGlzcGxheTogdGFibGU7XG4gIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1jcmVhdGVjaGF0IC5lZGl0LWljb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAyMHB4O1xuICByaWdodDogMnB4O1xuICBib3R0b206IDJweDtcbn1cbmFwcC1jcmVhdGVjaGF0IC5kZWZhdWx0LXRpdGxlIHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDJlbTtcbiAgY29sb3I6ICNmZmY7XG4gIC13ZWJraXQtdGV4dC1zdHJva2U6IHRoaW47XG4gIC8qICAgIHRleHQtc2hhZG93OlxuICAgICAgICAgICAgICAtMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgICAxcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAgIC0xcHggMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgMXB4IDFweCAwICMwMDA7Ki9cbn1cbmFwcC1jcmVhdGVjaGF0IC5zZWxlY3RlZC1idXR0b25zIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwIDVweDtcbn1cbmFwcC1jcmVhdGVjaGF0IGlvbi1jYXJkIHtcbiAgaGVpZ2h0OiAzMCU7XG59XG5hcHAtY3JlYXRlY2hhdCAuZ3JvdXAtdHlwZS10aXRsZSB7XG4gIG1hcmdpbjogMTAlIDA7XG59XG5hcHAtY3JlYXRlY2hhdCBmb3JtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/connect/createchat/createchat.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/connect/createchat/createchat.page.ts ***!
  \*************************************************************/
/*! exports provided: CreatechatPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatechatPage", function() { return CreatechatPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../group/groupchat/groupchat.page */ "./src/app/pages/group/groupchat/groupchat.page.ts");
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











var CreatechatPage = /** @class */ (function () {
    function CreatechatPage(formBuilder, alertCtrl, modalCtrl, platform, awsService, authService, userData, churchService, groupService, chatService) {
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.awsService = awsService;
        this.authService = authService;
        this.userData = userData;
        this.churchService = churchService;
        this.groupService = groupService;
        this.chatService = chatService;
        this.title = "Create Chat";
        this.churchId = '';
        this.pageNum = 0;
        this.displayGroup = false;
        this.reachedEnd = false;
        this.searchKeyword = '';
        this.allFriends = [];
        this.listOfFriends = [];
        this.listOfAppUsers = [];
        this.selectedAppUsers = [];
        this.totalSelected = 0;
        this.ionSpinner = true;
        this.page = 1;
        this.showOptional = false;
        this.days = [];
        this.frequencies = [];
        this.countries = [];
        this.churches = [];
        this.smsPlan = false;
        this.country_list = ["United States", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, US", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
        this.day_list = ['', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Varied or N/A", "To be determined"];
        this.frequency_list = ['', "Weekly", "Every Other Week", "One-Time", "Monthly", "1st and 3rd Week", "2nd and 4th Week", "N/A"];
        this.chatForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
        this.churchId = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
    }
    CreatechatPage.prototype.ngOnInit = function () {
        var _this = this;
        this.renderList();
        this.setupLoadPeople();
        setTimeout(function () {
            _this.ionSpinner = false;
        }, 5000);
    };
    CreatechatPage.prototype.renderList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.listOfFriends = [];
                this.chatService.conversations.forEach(function (obj) {
                    if ((obj.conversation.type === 'connect') && obj.data.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) > -1) {
                        _this.listOfFriends.push({ _id: obj.data.participant._id, name: obj.data.name, avatar: obj.data.participant.avatar, badge: obj.data.badge, order: null, select: false });
                    }
                });
                this.listOfFriends.forEach(function (obj, index) {
                    obj.order = index;
                });
                this.listOfFriends.sort(function (a, b) {
                    var badge_diff = b.badge - a.badge;
                    if (badge_diff !== 0) {
                        return badge_diff; // only sort when there is an actual difference
                    }
                    else {
                        return a.order - b.order; // preserve the order
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    CreatechatPage.prototype.setupLoadPeople = function () {
        var _this = this;
        setTimeout(function () {
            _this.infiniteScroll.disabled = false;
            _this.reachedEnd = false;
            _this.listOfAppUsers = [];
            _this.pageNum = 0;
            _this.loadMorePeople({ target: _this.infiniteScroll });
        }, 100);
    };
    CreatechatPage.prototype.loadMorePeople = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var churchAppUsers;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pageNum++;
                        if (!!this.reachedEnd) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.churchService.loadChurchAppUsers(this.churchId, this.searchKeyword, this.pageNum)];
                    case 1:
                        churchAppUsers = _a.sent();
                        this.ionSpinner = false;
                        if (!churchAppUsers.length) {
                            this.reachedEnd = true;
                            event.target.disabled = true;
                        }
                        else {
                            churchAppUsers.forEach(function (appuser) {
                                if (appuser._id !== _this.userData.user._id) {
                                    appuser.name = appuser.first_name + " " + appuser.last_name;
                                    _this.listOfAppUsers.push({ _id: appuser._id, name: appuser.name, avatar: appuser.avatar, select: false });
                                }
                            });
                        }
                        event.target.complete();
                        return [3 /*break*/, 3];
                    case 2:
                        this.ionSpinner = false;
                        event.target.complete();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreatechatPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.setupLoadPeople();
        this.renderList();
        setTimeout(function () {
            //Keyboard.hide();
        }, 2000);
    };
    CreatechatPage.prototype.cancelSearch = function (event) {
        event.stopPropagation();
        this.searchKeyword = '';
        this.setupLoadPeople();
        this.renderList();
    };
    CreatechatPage.prototype.select = function (person) {
        if (person.select) {
            person.select = false;
            this.totalSelected--;
            if (this.totalSelected < 2) {
                this.displayGroup = false;
            }
            var index = this.selectedAppUsers.indexOf(person);
            this.selectedAppUsers.splice(index, 1);
        }
        else {
            person.select = true;
            this.totalSelected++;
            if (this.totalSelected > 1) {
                this.displayGroup = true;
            }
            this.selectedAppUsers.unshift(person);
            this.searchKeyword = '';
        }
        this.modifyChatName();
    };
    CreatechatPage.prototype.unselect = function (person) {
        this.totalSelected--;
        if (this.totalSelected < 2) {
            this.displayGroup = false;
        }
        var index = this.listOfAppUsers.indexOf(person);
        if (index > -1) {
            this.listOfAppUsers[index].select = false;
        }
        index = this.listOfFriends.indexOf(person);
        if (index > -1) {
            this.listOfFriends[index].select = false;
        }
        index = this.selectedAppUsers.indexOf(person);
        if (index > -1) {
            this.selectedAppUsers.splice(index, 1);
        }
        this.modifyChatName();
    };
    CreatechatPage.prototype.modifyChatName = function () {
        if (this.chatForm.controls.name.pristine) {
            if (this.totalSelected === 1) {
                this.chatForm.patchValue({ name: this.userData.user.first_name + " and " + this.selectedAppUsers[0].name });
            }
            else if (this.totalSelected === 2) {
                this.chatForm.patchValue({ name: this.userData.user.first_name + ", " + this.selectedAppUsers[0].name.split(' ')[0] + ", " + this.selectedAppUsers[1].name.split(' ')[0] });
            }
            else if (this.totalSelected > 2) {
                this.chatForm.patchValue({ name: this.userData.user.first_name + ", " + this.selectedAppUsers[0].name.split(' ')[0] + " and " + (this.totalSelected - 1).toString() + " friends" });
            }
        }
    };
    CreatechatPage.prototype.selectAppUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.totalSelected === 1) { //direct message with 1 person
                    this.createPrivateChat();
                }
                else if (this.totalSelected > 1) { //direct message with 2 or more people
                    /*this.page = 2;
                    this.title = 'Create Group Chat';*/
                    this.selectGroupType('personal');
                }
                return [2 /*return*/];
            });
        });
    };
    CreatechatPage.prototype.createPrivateChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, conversation_1, alert_1, alert_2, alert_3, alert_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ionSpinner = true;
                        return [4 /*yield*/, this.chatService.getConversationByRecipientId(this.selectedAppUsers[0]._id, false, null)];
                    case 1:
                        data = _a.sent();
                        this.ionSpinner = false;
                        if (!data.length) return [3 /*break*/, 12];
                        conversation_1 = data[0];
                        if (!(conversation_1.type == "connect")) return [3 /*break*/, 2];
                        this.modalCtrl.dismiss();
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var messagePage;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.chatService.currentChatProps.push({
                                            conversationId: conversation_1._id,
                                            name: this.selectedAppUsers[0].name,
                                            page: 'chat',
                                            recipient: this.selectedAppUsers[0],
                                            modalPage: true
                                        });
                                        return [4 /*yield*/, this.modalCtrl.create({
                                                component: _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_10__["GroupchatPage"],
                                                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                                            })];
                                    case 1:
                                        messagePage = _a.sent();
                                        return [4 /*yield*/, messagePage.present()];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 50);
                        return [3 /*break*/, 11];
                    case 2:
                        if (!(conversation_1.type === "request")) return [3 /*break*/, 11];
                        if (!conversation_1.blockedBy) return [3 /*break*/, 8];
                        if (!(conversation_1.blockedBy === this.userData.user._id)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'User is Blocked',
                                subHeader: 'Do you want to reconnect with ' + this.selectedAppUsers[0].name + '?',
                                buttons: [{
                                        text: 'Yes',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var messagePage;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.chatService.unblockConversation(conversation_1._id, this.selectedAppUsers[0]._id)];
                                                        case 1:
                                                            _a.sent();
                                                            this.modalCtrl.dismiss();
                                                            this.chatService.currentChatProps.push({
                                                                conversationId: conversation_1._id,
                                                                name: this.selectedAppUsers[0].name,
                                                                page: 'chat',
                                                                recipient: this.selectedAppUsers[0],
                                                                modalPage: true
                                                            });
                                                            return [4 /*yield*/, this.modalCtrl.create({
                                                                    component: _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_10__["GroupchatPage"],
                                                                    componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                                                                })];
                                                        case 2:
                                                            messagePage = _a.sent();
                                                            return [4 /*yield*/, messagePage.present()];
                                                        case 3:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        }
                                    }, { text: 'No' }],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        alert_1 = _a.sent();
                        alert_1.present();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Blocked by ' + this.selectedAppUsers[0].name + '.',
                            subHeader: 'You cannot direct message this user while being blocked.',
                            buttons: [{ text: 'Dismiss' }],
                            cssClass: 'level-15'
                        })];
                    case 5:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 11];
                    case 8: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Connect request is pending',
                            subHeader: 'You have already sent a connect request to this user.',
                            buttons: [{ text: 'Dismiss' }],
                            cssClass: 'level-15'
                        })];
                    case 9:
                        alert_3 = _a.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Connect to ' + this.selectedAppUsers[0].name,
                            subHeader: 'You are not yet connected with ' + this.selectedAppUsers[0].name + ". Do you want to direct message " + this.selectedAppUsers[0].name + '?',
                            buttons: [{ text: 'Yes',
                                    handler: function () {
                                        console.log("creating new conversation...");
                                        var navTransition = alert_4.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var welcomeMessage, conversationId, messagePage;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.userData.checkPushNotification()];
                                                    case 1:
                                                        _a.sent();
                                                        welcomeMessage = this.userData.user.first_name + ' ' + this.userData.user.last_name + ' is now connected with you.';
                                                        return [4 /*yield*/, this.chatService.newConversation(this.selectedAppUsers[0]._id, { composedMessage: welcomeMessage, type: "connect" })];
                                                    case 2:
                                                        conversationId = _a.sent();
                                                        this.chatService.refreshTabBadges();
                                                        this.modalCtrl.dismiss();
                                                        this.chatService.currentChatProps.push({
                                                            conversationId: conversationId,
                                                            name: this.selectedAppUsers[0].name,
                                                            page: 'chat',
                                                            recipient: this.selectedAppUsers[0],
                                                            modalPage: true
                                                        });
                                                        return [4 /*yield*/, this.modalCtrl.create({
                                                                component: _group_groupchat_groupchat_page__WEBPACK_IMPORTED_MODULE_10__["GroupchatPage"],
                                                                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                                                            })];
                                                    case 3:
                                                        messagePage = _a.sent();
                                                        return [4 /*yield*/, messagePage.present()];
                                                    case 4:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    } }, { text: 'Cancel' }],
                            cssClass: 'level-15'
                        })];
                    case 13:
                        alert_4 = _a.sent();
                        alert_4.present();
                        _a.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    CreatechatPage.prototype.selectGroupType = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var controlConfigs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.type = type;
                        controlConfigs = {
                            name: [this.chatForm.value.name, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                            background: [''],
                            emailDisabled: [false],
                            smsDisabled: [false],
                            smsKeyword: [''],
                            churchId: [''],
                            published: [false],
                            flagged: [false],
                            public_group: [false],
                            details: [''],
                            meeting_day: [''],
                            meeting_frequency: [''],
                            beginAtISOString: [new Date().toISOString()],
                            endAtISOString: [new Date().toISOString()],
                            location: [''],
                            street: [''],
                            city: [''],
                            state: [''],
                            country: [''],
                            conversation: [''] // not a GUI element but required for group chat creation
                        };
                        this.churches = this.userData.user.churches.map(function (c) { return { _id: c._id, name: c.name, selected: false }; });
                        this.churches.unshift({ _id: '', name: 'None', selected: false });
                        this.countries = this.country_list.map(function (c) { return { name: c, selected: false }; });
                        this.days = this.day_list.map(function (c) { return { name: c, selected: false }; });
                        this.frequencies = this.frequency_list.map(function (c) { return { name: c, selected: false }; });
                        if (!(this.type === 'community')) return [3 /*break*/, 2];
                        this.title = 'Community Group';
                        controlConfigs.churchId[0] = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
                        return [4 /*yield*/, this.loadCommunityInfo(controlConfigs, this.churchId)];
                    case 1:
                        controlConfigs = _a.sent();
                        this.page = 3;
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.type === 'personal') {
                            // clear the settings
                            this.title = 'Personal Group';
                            controlConfigs.churchId[0] = '';
                            this.page = 3;
                        }
                        _a.label = 3;
                    case 3:
                        this.groupForm = this.formBuilder.group(controlConfigs);
                        return [2 /*return*/];
                }
            });
        });
    };
    CreatechatPage.prototype.loadCommunityInfo = function (controlConfigs, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, church, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.churchService.loadChurchProfile(id)];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), church = _a[0];
                        controlConfigs.city = church.meeting_location.city;
                        controlConfigs.state = church.meeting_location.state;
                        controlConfigs.country = church.meeting_location.country;
                        this.smsPlan = church.payment_type === "SMS";
                        return [2 /*return*/, controlConfigs];
                    case 2:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreatechatPage.prototype.changeCommunity = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, church, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.churchService.loadChurchProfile(id)];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), church = _a[0];
                        this.groupForm.patchValue(church.meeting_location);
                        this.smsPlan = church.payment_type === "SMS";
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _b.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CreatechatPage.prototype.createGroupChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var createdGroup, data, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.ionSpinner = true;
                        this.group = this.groupForm.value;
                        if (this.type === 'community') {
                            this.group.meeting_location = {
                                location: this.group.location,
                                street: this.group.street,
                                city: this.group.city,
                                state: this.group.state,
                                country: this.group.country
                            };
                        }
                        else if (this.type === 'personal') {
                            this.group.meeting_location = { location: '', street: '', city: '', state: '', country: '' };
                            this.group.churchId = '';
                        }
                        this.group.beginAt = new Date(new Date(this.group.beginAtISOString).getTime() + new Date().getTimezoneOffset() * 60000).toISOString();
                        this.group.endAt = new Date(new Date(this.group.endAtISOString).getTime() + new Date().getTimezoneOffset() * 60000).toISOString();
                        if (!this.group.background.length) {
                            delete this.group.background;
                        }
                        this.group.emailDisabled = !this.group.emailDisabled; // reverse the boolean of the toggle interface
                        this.group.smsDisabled = !this.group.smsDisabled; // reverse the boolean of the toggle interface
                        return [4 /*yield*/, this.groupService.createGroupProfile(this.group)];
                    case 1:
                        createdGroup = _a.sent();
                        this.userData.user.groups.push({ _id: createdGroup._id, name: createdGroup.name, role: "Leader", churchId: createdGroup.churchId });
                        data = { groups: [createdGroup], appUsers: this.selectedAppUsers };
                        return [4 /*yield*/, this.groupService.addNewAppUsers(data)];
                    case 2:
                        _a.sent();
                        this.selectedAppUsers.forEach(function (appuser) {
                            _this.userData.socket.emit('refresh user status', appuser._id, { type: 'update group participation', conversationId: null });
                        });
                        this.chatService.currentChatProps.push({
                            conversationId: createdGroup.conversation,
                            name: createdGroup.name,
                            group: createdGroup,
                            page: 'chat',
                            badge: 0,
                            modalPage: this.platform.width() < 768
                        });
                        this.ionSpinner = false;
                        this.modalCtrl.dismiss(true);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        if (err_3) {
                            console.log(JSON.stringify(err_3));
                            this.noNetworkConnection();
                            this.ionSpinner = false;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CreatechatPage.prototype.selectUploadFile = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result, Camera, image, compressed, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 15, , 16]);
                        result = void 0;
                        if (!this.platform.is('cordova')) return [3 /*break*/, 6];
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["CameraSource"].Prompt,
                                correctOrientation: false
                            })];
                    case 1:
                        image = _a.sent();
                        if (!this.groupForm.value.churchId.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.awsService.uploadImage('communities', this.groupForm.value.churchId, image, 'createchat')];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.awsService.uploadImage('users', this.userData.user._id, image, 'createchat')];
                    case 4:
                        result = _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 11];
                    case 6: return [4 /*yield*/, this.awsService.compressPhoto(event.target.files[0])];
                    case 7:
                        compressed = _a.sent();
                        if (!this.groupForm.value.churchId.length) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.awsService.uploadFile('communities', this.groupForm.value.churchId, compressed, 'createchat')];
                    case 8:
                        result = _a.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.awsService.uploadFile('users', this.userData.user._id, compressed, 'createchat')];
                    case 10:
                        result = _a.sent();
                        _a.label = 11;
                    case 11:
                        if (!(result === "Upload succeeded")) return [3 /*break*/, 14];
                        if (!(this.groupForm.value.background && this.groupForm.value.background.length)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.awsService.removeFile(this.groupForm.value.background)];
                    case 12:
                        _a.sent(); //remove the previous background from Digital Ocean
                        _a.label = 13;
                    case 13:
                        this.groupForm.patchValue({ background: this.awsService.url });
                        _a.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    CreatechatPage.prototype.backButton = function () {
        if (this.page > 1) {
            this.page--;
            if (this.page === 1) {
                this.title = 'Create Chat';
            }
            else if (this.page === 2) {
                //this.title = 'Create Group Chat';
                this.page--;
                this.title = 'Create Chat';
            }
        }
        else {
            this.modalCtrl.dismiss(false);
        }
    };
    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    CreatechatPage.prototype.customTrackBy = function (index, item) {
        return index;
    };
    CreatechatPage.prototype.noNetworkConnection = function () {
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
    CreatechatPage.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_4__["Aws"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_7__["Groups"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_9__["Chat"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonContent"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonContent"])
    ], CreatechatPage.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonInfiniteScroll"])
    ], CreatechatPage.prototype, "infiniteScroll", void 0);
    CreatechatPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-createchat',
            template: __importDefault(__webpack_require__(/*! raw-loader!./createchat.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/createchat/createchat.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./createchat.page.scss */ "./src/app/pages/connect/createchat/createchat.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_4__["Aws"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_7__["Groups"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_9__["Chat"]])
    ], CreatechatPage);
    return CreatechatPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~connect-myconversations-myconversations-module~pages-main-tab-main-tab-module.js.map