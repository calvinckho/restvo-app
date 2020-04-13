(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~feature-manage-managefeature-module~feature-schedule-feature-schedule-module~pages-main-tab-~a528695a"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"modalPage\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Schedule</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"schedule\">\n  <ion-toolbar class=\"filter\">\n    <ion-segment [(ngModel)]=\"view\">\n      <ion-segment-button value=\"timeline\">Timeline</ion-segment-button>\n      <ion-segment-button value=\"content\" [disabled]=\"!scheduleId\">Content</ion-segment-button>\n      <ion-segment-button value=\"settings\" [disabled]=\"!scheduleId\">Settings</ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n  <ion-list *ngIf=\"view === 'timeline'\">\n    <ion-item-group>\n      <ion-item lines=\"none\">\n        <div class=\"moment-label\"> <img class=\"side-image\" src=\"assets/img/Calendar_Gray.png\"></div>\n        <div class=\"moment-input\">Timeline</div>\n        <ion-buttons slot=\"end\" class=\"ion-no-margin\">\n          <ion-button fill=\"clear\" (click)=\"deleteSchedule()\" class=\"close-button\"><ion-icon name=\"trash\" color=\"grey\"></ion-icon></ion-button>\n        </ion-buttons>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label (click)=\"focusCalendarDateField('start')\"><span [ngClass]=\"{ 'underline-datestring': dateType == 'start'}\">Start Date: {{recurrenceStartDate | datetime: 'w:l,m:s,y:n,d:n'}}</span><p style=\"color: red; font-style: italic;\" *ngIf=\"dateType === 'start'\"><ion-icon name=\"alert-circle\"></ion-icon>Choose a Date Below</p></ion-label> <!--Start, Choose a date below-->\n        <ion-datetime *ngIf=\"recurrenceStartTime\" (ionCancel)=\"dateType='end'\" placeholder=\"12:00 pm\" displayFormat=\"h:mm a\" minuteValues=\"0,15,30,45\" [(ngModel)]=\"recurrenceStartTime\" [pickerOptions]=\"{cssClass: 'level-15'}\"></ion-datetime>\n      </ion-item>\n      <ion-item lines=\"none\" *ngIf=\"dateType != 'start'\">\n        <ion-label (click)=\"focusCalendarDateField('end')\"><span [ngClass]=\"{ 'underline-datestring': dateType == 'end'}\">End Date: {{recurrenceEndDate | datetime: 'w:l,m:s,y:n,d:n'}}</span><p style=\"color: red; font-style: italic;\" *ngIf=\"dateType === 'end'\"><ion-icon name=\"alert-circle\"></ion-icon>Choose a Date Below</p></ion-label> <!--End, Choose a date below-->\n        <ion-datetime *ngIf=\"recurrenceEndTime\" placeholder=\"12:00 pm\" (ionCancel)=\"dateType=''\" displayFormat=\"h:mm a\" minuteValues=\"0,15,30,45\" [(ngModel)]=\"recurrenceEndTime\" [pickerOptions]=\"{cssClass: 'level-15'}\"></ion-datetime>\n      </ion-item>\n\n      <ion-card class=\"monthview\" *ngIf=\"dateType\">\n        <div class=\"month-title-container\">\n          <ion-icon name=\"chevron-back-outline\" class=\"calendar-arrow left\" (click)=\"calendarService.changeDate($event, 4)\"></ion-icon>\n          <h4 class=\"month-title\">{{calendarService.calendar.viewTitle}}</h4>\n          <ion-icon name=\"chevron-forward-outline\" class=\"calendar-arrow right\" (click)=\"calendarService.changeDate($event, 2)\"></ion-icon>\n        </div>\n        <div class=\"monthview-day-headers\">S</div>\n        <div class=\"monthview-day-headers\">M</div>\n        <div class=\"monthview-day-headers\">T</div>\n        <div class=\"monthview-day-headers\">W</div>\n        <div class=\"monthview-day-headers\">T</div>\n        <div class=\"monthview-day-headers\">F</div>\n        <div class=\"monthview-day-headers\">S</div>\n\n        <div class=\"monthview-element\" *ngFor=\"let dayOfMonth of calendarService.calendar.daysInViewMonth; trackBy: customTrackBy\">\n          <div class=\"monthview-element-content\" [ngClass]=\"{ 'selected-date' : calendarService.calendar.selectedDate.toString() === dayOfMonth.date.toString() && dayOfMonth.date != ' ','current-date': calendarService.calendar.currentDate.toString().substring( 0 , 15) == dayOfMonth.date.toString().substring(0 , 15)}\" (click)=\"changeSelectedDate(dayOfMonth.date)\">\n            <div *ngIf=\"dayOfMonth.date == ' ' \">&nbsp;&nbsp;</div>\n            <div *ngIf=\"dayOfMonth.date != ' ' \">\n              {{dayOfMonth.date.getDate()}}\n            </div>\n            <div class=\"monthview-dot-container\" *ngFor=\"let calendarItem of dayOfMonth.dayEvents; trackBy: customTrackBy; let i = index;\">\n              <div class=\"monthview-element-dot\" [ngClass]=\"{'past-calendar-item' : calendarItem.pastEvent}\" *ngIf=\"i < 5\"></div>\n            </div>\n          </div>\n        </div>\n      </ion-card>\n      <ion-item lines=\"none\" *ngIf=\"!allDay && dateType == 'start'\">\n        <ion-label (click)=\"dateType = 'end'\">End: {{recurrenceEndDate  | datetime: 'w:l,m:l,y:n,d:n'}}</ion-label>\n        <ion-datetime placeholder=\"12:00 pm\" displayFormat=\"h:mm a\" minuteValues=\"0,15,30,45\" [(ngModel)]=\"recurrenceEndTime\" [pickerOptions]=\"{cssClass: 'level-15'}\"></ion-datetime>\n      </ion-item>\n    </ion-item-group>\n    <ion-item lines=\"none\">\n      <ion-label style=\"width: 90%\" class=\"ion-margin-left\" slot=\"start\">Repeat Frequency</ion-label>\n      <ion-select [(ngModel)]=\"schedule.options.recurrence\" (ionChange)=\"touchSchedule('update schedule')\" slot=\"end\">\n        <ion-select-option value=''>None</ion-select-option>\n        <ion-select-option value='daily'>Daily</ion-select-option>\n        <ion-select-option value='weekly'>Weekly</ion-select-option>\n        <ion-select-option value='monthly'>Monthly</ion-select-option>\n        <ion-select-option value='yearly'>Yearly</ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-item lines=\"none\" *ngIf=\"schedule.options.recurrence && schedule.options.recurrence.length\">\n      <ion-label style=\"width: 90%\" class=\"ion-margin-left\" slot=\"start\">Repeat Interval</ion-label>\n      <ion-input style=\"width: 10%; text-align: right\" margin-left=\"20px\" type=\"number\" [placeholder]=\"1\" [max]=\"200\" [(ngModel)]=\"schedule.options.recurrenceInterval\" (ionChange)=\"touchSchedule('update schedule')\" slot=\"end\"></ion-input>\n    </ion-item>\n    <ion-row class=\"ion-justify-content-center\">\n      <ion-button (click)=\"touchSchedule('create schedule')\" *ngIf=\"!this.schedule._id\">\n        <span>Create Schedule</span>\n      </ion-button>\n      <ion-button (click)=\"promptTouchSchedule()\" *ngIf=\"this.schedule._id && this.parentCategoryId !== '5c915476e172e4e64590e349' && this.schedule.options.recurrence\"> <!--Only available for non-Plan child Activity-->\n        <span>Repopulate Timeline</span>\n      </ion-button>\n    </ion-row>\n    <ion-item-divider></ion-item-divider>\n    <ion-row *ngIf=\"this.schedule._id && !timeline.length\" class=\"ion-justify-content-center\">\n      <p>Your timeline is empty. Use the 'Content' tab to add content.</p>\n    </ion-row>\n    <ion-row *ngIf=\"!this.schedule._id\" class=\"ion-justify-content-center\">\n      <p>Click 'Create Schedule' to begin.</p>\n    </ion-row>\n    <ion-virtual-scroll [items]=\"timeline\" approxItemHeight=\"48px\" *ngIf=\"timeline.length\">\n      <ion-item *virtualItem=\"let calendaritem; let j = index;\">\n        <ion-reorder slot=\"start\"><ion-icon name=\"menu\"></ion-icon></ion-reorder>\n        <span class=\"content-count\">{{j+1}}.</span>\n        <span class=\"content-date\">{{calendaritem.startDate | datetime: 'm:s,d:n,y:n'}}</span>\n        <ion-input class=\"moment-input\" type=\"text\" [(ngModel)]=\"calendaritem.title\" [hidden]=\"calendaritem.moment._id\"></ion-input>\n        <span class=\"moment-input\" *ngIf=\"calendaritem.moment._id\">{{calendaritem.title}}</span>\n        <ion-buttons slot=\"end\" class=\"ion-no-margin\">\n          <ion-button fill=\"clear\" color=\"grey\" (click)=\"openContent($event, calendaritem)\"><ion-icon name=\"cog\"></ion-icon></ion-button>\n          <ion-button fill=\"clear\" (click)=\"removeTimelineItem($event, programId, calendaritem)\" class=\"close-button\" *ngIf=\"calendaritem._id\"><ion-icon name=\"trash\" color=\"grey\"></ion-icon></ion-button>\n        </ion-buttons>\n      </ion-item>\n    </ion-virtual-scroll>\n  </ion-list>\n    <ion-list *ngIf=\"view === 'content'\">\n      <ion-item lines=\"none\">\n        <div class=\"moment-label\"><img class=\"side-image\" src=\"assets/img/Folder_Gray.png\"></div>\n        <div class=\"moment-input\">Mentoring {{this.categoryLabel}}</div>\n      </ion-item>\n      <ion-toolbar>\n        <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" placeholder=\"Search\"></ion-searchbar>\n      </ion-toolbar>\n      <ion-grid class=\"program-grid\">\n        <ion-row class=\"program-row\">\n          <ion-col class=\"ion-align-self-center\" size-xs=\"6\" size-sm=\"4\" size-md=\"3\" size-lg=\"3\" size-xl=\"3\">\n            <ion-card class=\"program-card\" (click)=\"chooseChildActivity()\" id=\"create-new-moment\">\n              <ion-card-header class=\"ion-no-padding\" color=\"lightgrey\">\n                <ion-row class=\"program-photo-container ion-justify-content-center ion-align-items-center\">\n                  <ion-icon name=\"add\" color=\"darkgrey\"></ion-icon>\n                </ion-row>\n              </ion-card-header>\n              <div class=\"program-name dark\">Add</div>\n            </ion-card>\n          </ion-col>\n          <ion-col class=\"ion-align-self-center\" *ngFor=\"let content of samples; index as i\" size-xs=\"6\" size-sm=\"4\" size-md=\"3\" size-lg=\"3\" size-xl=\"3\" [hidden]=\"!((content.matrix_string[0][0].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || content.resource['en-US'].value[0].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1))\">\n            <ion-card class=\"program-card\" (click)=\"chooseContent(content)\">\n              <ion-card-header class=\"ion-no-padding\">\n                <div class=\"program-photo-container\">\n                  <ion-img class=\"program-photo\" [src]=\"(content.assets && content.assets.length && content.assets[0]) | background: content._id\"></ion-img>\n                </div>\n              </ion-card-header>\n              <div class=\"program-type\"><ion-badge color=\"button1\">{{content.resource['en-US'].value[0]}}</ion-badge></div>\n              <div class=\"program-name light\">{{content.matrix_string[0][0]}}</div>\n              <ion-button class=\"info-moment ion-no-padding ion-no-margin\" (click)=\"openActivity($event, content)\" fill=\"clear\" size=\"small\">\n                <ion-icon name=\"information-circle-outline\" color=\"secondary\"></ion-icon>\n              </ion-button>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <ion-item-divider></ion-item-divider>\n      <ion-item lines=\"none\">Content List</ion-item>\n        <ion-row *ngIf=\"!timeline.length\" class=\"ion-justify-content-center\">\n            <p>You have not selected any content yet.</p>\n        </ion-row>\n      <ion-reorder-group (ionItemReorder)=\"reorderContents($event)\" disabled=\"false\">\n        <ion-virtual-scroll [items]=\"schedule.child_moments\" approxItemHeight=\"48px\">\n          <ion-item *virtualItem=\"let content; let j = index;\">\n          <ion-reorder slot=\"start\"><ion-icon name=\"menu\"></ion-icon></ion-reorder>\n          <ion-badge slot=\"start\" class=\"moment-type\">{{content.resource['en-US'].value[0]}}</ion-badge>\n          <span class=\"content-count\">{{j+1}}.</span>\n          <ion-input class=\"moment-input\" type=\"text\" [(ngModel)]=\"content.matrix_string[0][0]\" [hidden]=\"content._id\"></ion-input>\n          <span class=\"moment-input\" *ngIf=\"content._id\">{{content.matrix_string[0][0]}}</span>\n          <ion-buttons slot=\"end\" class=\"ion-no-margin\">\n            <ion-button fill=\"clear\" color=\"grey\" (click)=\"openActivity($event, content)\"><ion-icon name=\"cog\"></ion-icon></ion-button>\n            <ion-button fill=\"clear\" (click)=\"removeContent($event, j)\" class=\"close-button\"><ion-icon name=\"trash\" color=\"grey\"></ion-icon></ion-button>\n          </ion-buttons>\n        </ion-item>\n        </ion-virtual-scroll>\n      </ion-reorder-group>\n    </ion-list>\n  <ion-list *ngIf=\"view === 'settings'\">\n    <ion-item lines=\"none\">\n      <div class=\"moment-label\"><img class=\"side-image\" src=\"assets/img/Settings_Gray.png\"></div>\n      <div class=\"moment-input\">Settings</div>\n    </ion-item>\n    <ion-item-group class=\"ion-margin-left\" lines=\"full\">\n      <ion-item lines=\"none\" [disabled]=\"this.parentCategoryId !== '5c915476e172e4e64590e349'\"> <!--Only enable for Plan-->\n        <ion-label class=\"ion-margin-left\">Floating Start Date</ion-label>\n        <ion-checkbox [(ngModel)]=\"schedule.array_boolean[0]\" (ionChange)=\"touchSchedule('update schedule')\"></ion-checkbox>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label class=\"ion-margin-left\">Unique Answers for Each Repeated Content</ion-label>\n        <ion-checkbox [(ngModel)]=\"schedule.array_boolean[1]\" (ionChange)=\"touchSchedule('update schedule')\"></ion-checkbox>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label class=\"ion-margin-left\">Add to Participant's Timeline</ion-label>\n        <ion-checkbox [(ngModel)]=\"schedule.array_boolean[2]\" (ionChange)=\"touchSchedule('update schedule')\"></ion-checkbox>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label class=\"ion-margin-left\">Add to Leader's Timeline</ion-label>\n        <ion-checkbox [(ngModel)]=\"schedule.array_boolean[4]\" (ionChange)=\"touchSchedule('update schedule')\"></ion-checkbox>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label class=\"ion-margin-left\">Add to Admin's Timeline</ion-label>\n        <ion-checkbox [(ngModel)]=\"schedule.array_boolean[3]\" (ionChange)=\"touchSchedule('update schedule')\"></ion-checkbox>\n      </ion-item>\n    </ion-item-group>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/feature/manage/feature-schedule/feature-schedule-routing.module.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-schedule/feature-schedule-routing.module.ts ***!
  \******************************************************************************************/
/*! exports provided: FeatureScheduleRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureScheduleRoutingModule", function() { return FeatureScheduleRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _feature_schedule_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feature-schedule.page */ "./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.ts");
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
        component: _feature_schedule_page__WEBPACK_IMPORTED_MODULE_2__["FeatureSchedulePage"],
    },
];
var FeatureScheduleRoutingModule = /** @class */ (function () {
    function FeatureScheduleRoutingModule() {
    }
    FeatureScheduleRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], FeatureScheduleRoutingModule);
    return FeatureScheduleRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/feature/manage/feature-schedule/feature-schedule.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-schedule/feature-schedule.module.ts ***!
  \**********************************************************************************/
/*! exports provided: FeatureSchedulePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureSchedulePageModule", function() { return FeatureSchedulePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _feature_schedule_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./feature-schedule.page */ "./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.ts");
/* harmony import */ var _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../pipes/application-pipes */ "./src/app/pipes/application-pipes.ts");
/* harmony import */ var _feature_schedule_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./feature-schedule-routing.module */ "./src/app/pages/feature/manage/feature-schedule/feature-schedule-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var FeatureSchedulePageModule = /** @class */ (function () {
    function FeatureSchedulePageModule() {
    }
    FeatureSchedulePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _pipes_application_pipes__WEBPACK_IMPORTED_MODULE_5__["ApplicationPipesModule"],
                _feature_schedule_routing_module__WEBPACK_IMPORTED_MODULE_6__["FeatureScheduleRoutingModule"],
            ],
            declarations: [_feature_schedule_page__WEBPACK_IMPORTED_MODULE_4__["FeatureSchedulePage"]]
        })
    ], FeatureSchedulePageModule);
    return FeatureSchedulePageModule;
}());



/***/ }),

/***/ "./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-feature-schedule ion-item ion-datetime {\n  position: relative !important;\n}\napp-feature-schedule .moment-label {\n  width: 25px;\n  height: 25px;\n  margin-right: 20px;\n}\napp-feature-schedule .moment-input {\n  width: 90%;\n  float: left;\n  opacity: 0.5;\n  padding: 5px 0;\n}\napp-feature-schedule .side-image {\n  margin: auto;\n}\napp-feature-schedule .monthview {\n  width: 85%;\n  max-width: 400px;\n  margin: 10px auto;\n  padding-bottom: 10px;\n  --color: var(--ion-color-dark);\n}\napp-feature-schedule .month-title-container {\n  width: 100%;\n}\napp-feature-schedule .month-title {\n  width: calc((100% / 7) * 5);\n  text-align: center;\n  display: inline-block;\n}\napp-feature-schedule .calendar-arrow {\n  width: calc(100% / 7);\n  position: relative;\n  display: inline-block;\n}\napp-feature-schedule .calendar-arrow .left {\n  float: left;\n}\napp-feature-schedule .calendar-arrow .right {\n  float: right;\n}\napp-feature-schedule .content-count {\n  padding-left: 2%;\n  width: 8%;\n}\napp-feature-schedule .content-date {\n  font-size: 12px;\n  padding-left: 2%;\n  margin-right: 8px;\n  width: 20%;\n}\napp-feature-schedule .program-row {\n  max-height: 30%;\n  overflow: scroll;\n}\napp-feature-schedule .program-card {\n  width: auto;\n  -o-object-fit: contain;\n     object-fit: contain;\n  margin: 0 3%;\n}\napp-feature-schedule .program-photo-container {\n  height: 80px;\n  overflow: hidden;\n}\napp-feature-schedule .program-photo {\n  -o-object-fit: cover;\n     object-fit: cover;\n  cursor: pointer;\n  height: 100%;\n  margin: auto;\n  display: block;\n}\napp-feature-schedule .program-type {\n  position: absolute;\n  top: 2%;\n  left: 2%;\n  font-size: 12px;\n  cursor: pointer;\n}\napp-feature-schedule .program-name {\n  position: absolute;\n  bottom: 2%;\n  left: 2%;\n  font-size: 12px;\n  cursor: pointer;\n  z-index: 15;\n}\napp-feature-schedule .remove-moment {\n  position: absolute;\n  top: 0;\n  right: 2px;\n}\napp-feature-schedule .dark {\n  color: var(--ion-color-darkgrey);\n}\napp-feature-schedule .light {\n  color: white;\n}\napp-feature-schedule .full-height {\n  height: 100%;\n}\napp-feature-schedule .grid-row {\n  overflow: scroll;\n}\napp-feature-schedule .selected {\n  opacity: 1;\n}\napp-feature-schedule .info-moment {\n  position: absolute;\n  top: 0;\n  right: 2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2ZlYXR1cmUvbWFuYWdlL2ZlYXR1cmUtc2NoZWR1bGUvZmVhdHVyZS1zY2hlZHVsZS5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2ZlYXR1cmUvbWFuYWdlL2ZlYXR1cmUtc2NoZWR1bGUvZmVhdHVyZS1zY2hlZHVsZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUU7RUFDRSw2QkFBQTtBQ0RKO0FESUU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FDRko7QURLRTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUNISjtBRE1FO0VBQ0UsWUFBQTtBQ0pKO0FET0U7RUFDRSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsOEJBQUE7QUNMSjtBRFFFO0VBQ0UsV0FBQTtBQ05KO0FEU0U7RUFDRSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7QUNQSjtBRFVFO0VBQ0UscUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0FDUko7QURTSTtFQUNFLFdBQUE7QUNQTjtBRFNJO0VBQ0UsWUFBQTtBQ1BOO0FEV0U7RUFDRSxnQkFBQTtFQUNBLFNBQUE7QUNUSjtBRFlFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0FDVko7QURlRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQ2JKO0FEZ0JFO0VBQ0UsV0FBQTtFQUNBLHNCQUFBO0tBQUEsbUJBQUE7RUFDQSxZQUFBO0FDZEo7QURpQkU7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUNmSjtBRGtCRTtFQUNFLG9CQUFBO0tBQUEsaUJBQUE7RUFDQSxlQUFBO0VBRUEsWUFBQTtFQUVBLFlBQUE7RUFDQSxjQUFBO0FDbEJKO0FEc0JFO0VBQ0Usa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FDcEJKO0FEdUJFO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQ3JCSjtBRHdCRTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFVBQUE7QUN0Qko7QUR5QkU7RUFDRSxnQ0FBQTtBQ3ZCSjtBRDBCRTtFQUNFLFlBQUE7QUN4Qko7QUQyQkU7RUFDRSxZQUFBO0FDekJKO0FENEJFO0VBRUUsZ0JBQUE7QUMzQko7QUQ4QkU7RUFDRSxVQUFBO0FDNUJKO0FEK0JFO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtBQzdCSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ZlYXR1cmUvbWFuYWdlL2ZlYXR1cmUtc2NoZWR1bGUvZmVhdHVyZS1zY2hlZHVsZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtZmVhdHVyZS1zY2hlZHVsZSB7XG5cbiAgaW9uLWl0ZW0gaW9uLWRhdGV0aW1le1xuICAgIHBvc2l0aW9uOnJlbGF0aXZlICFpbXBvcnRhbnQ7XG4gIH1cblxuICAubW9tZW50LWxhYmVsIHtcbiAgICB3aWR0aDogMjVweDtcbiAgICBoZWlnaHQ6IDI1cHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICB9XG5cbiAgLm1vbWVudC1pbnB1dCB7XG4gICAgd2lkdGg6IDkwJTtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgcGFkZGluZzogNXB4IDA7XG4gIH1cblxuICAuc2lkZS1pbWFnZSB7XG4gICAgbWFyZ2luOiBhdXRvO1xuICB9XG5cbiAgLm1vbnRodmlldyB7XG4gICAgd2lkdGg6IDg1JTtcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xuICAgIG1hcmdpbjogMTBweCBhdXRvO1xuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxuXG4gIC5tb250aC10aXRsZS1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLm1vbnRoLXRpdGxlIHtcbiAgICB3aWR0aDogY2FsYygoMTAwJSAvIDcpICogNSk7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgfVxuXG4gIC5jYWxlbmRhci1hcnJvdyB7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSAvIDcpO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgLmxlZnQge1xuICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgfVxuICAgIC5yaWdodCB7XG4gICAgICBmbG9hdDogcmlnaHQ7XG4gICAgfVxuICB9XG5cbiAgLmNvbnRlbnQtY291bnQge1xuICAgIHBhZGRpbmctbGVmdDogMiU7XG4gICAgd2lkdGg6IDglO1xuICB9XG5cbiAgLmNvbnRlbnQtZGF0ZSB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIHBhZGRpbmctbGVmdDogMiU7XG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgd2lkdGg6IDIwJTtcbiAgfVxuXG4gIC8vIE9yZGVyXG5cbiAgLnByb2dyYW0tcm93IHtcbiAgICBtYXgtaGVpZ2h0OiAzMCU7XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgfVxuXG4gIC5wcm9ncmFtLWNhcmQge1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgbWFyZ2luOiAwIDMlO1xuICB9XG5cbiAgLnByb2dyYW0tcGhvdG8tY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC5wcm9ncmFtLXBob3RvIHtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgLy9vcGFjaXR5OiA1MCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIC8vd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIC8vbWF4LWhlaWdodDogMjAwcHg7XG4gIH1cblxuICAucHJvZ3JhbS10eXBlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAyJTtcbiAgICBsZWZ0OiAyJTtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5cbiAgLnByb2dyYW0tbmFtZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMiU7XG4gICAgbGVmdDogMiU7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB6LWluZGV4OiAxNTtcbiAgfVxuXG4gIC5yZW1vdmUtbW9tZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAycHg7XG4gIH1cblxuICAuZGFyayB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrZ3JleSk7XG4gIH1cblxuICAubGlnaHQge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxuXG4gIC5mdWxsLWhlaWdodCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG5cbiAgLmdyaWQtcm93IHtcbiAgICAvL2FsaWduLWl0ZW1zOiBjZW50ZXIgIWltcG9ydGFudDtcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xuICB9XG5cbiAgLnNlbGVjdGVkIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG5cbiAgLmluZm8tbW9tZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAycHg7XG4gIH1cbn0iLCJhcHAtZmVhdHVyZS1zY2hlZHVsZSBpb24taXRlbSBpb24tZGF0ZXRpbWUge1xuICBwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDtcbn1cbmFwcC1mZWF0dXJlLXNjaGVkdWxlIC5tb21lbnQtbGFiZWwge1xuICB3aWR0aDogMjVweDtcbiAgaGVpZ2h0OiAyNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAubW9tZW50LWlucHV0IHtcbiAgd2lkdGg6IDkwJTtcbiAgZmxvYXQ6IGxlZnQ7XG4gIG9wYWNpdHk6IDAuNTtcbiAgcGFkZGluZzogNXB4IDA7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAuc2lkZS1pbWFnZSB7XG4gIG1hcmdpbjogYXV0bztcbn1cbmFwcC1mZWF0dXJlLXNjaGVkdWxlIC5tb250aHZpZXcge1xuICB3aWR0aDogODUlO1xuICBtYXgtd2lkdGg6IDQwMHB4O1xuICBtYXJnaW46IDEwcHggYXV0bztcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbn1cbmFwcC1mZWF0dXJlLXNjaGVkdWxlIC5tb250aC10aXRsZS1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1mZWF0dXJlLXNjaGVkdWxlIC5tb250aC10aXRsZSB7XG4gIHdpZHRoOiBjYWxjKCgxMDAlIC8gNykgKiA1KTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAuY2FsZW5kYXItYXJyb3cge1xuICB3aWR0aDogY2FsYygxMDAlIC8gNyk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuYXBwLWZlYXR1cmUtc2NoZWR1bGUgLmNhbGVuZGFyLWFycm93IC5sZWZ0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAuY2FsZW5kYXItYXJyb3cgLnJpZ2h0IHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuYXBwLWZlYXR1cmUtc2NoZWR1bGUgLmNvbnRlbnQtY291bnQge1xuICBwYWRkaW5nLWxlZnQ6IDIlO1xuICB3aWR0aDogOCU7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAuY29udGVudC1kYXRlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBwYWRkaW5nLWxlZnQ6IDIlO1xuICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgd2lkdGg6IDIwJTtcbn1cbmFwcC1mZWF0dXJlLXNjaGVkdWxlIC5wcm9ncmFtLXJvdyB7XG4gIG1heC1oZWlnaHQ6IDMwJTtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbn1cbmFwcC1mZWF0dXJlLXNjaGVkdWxlIC5wcm9ncmFtLWNhcmQge1xuICB3aWR0aDogYXV0bztcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWFyZ2luOiAwIDMlO1xufVxuYXBwLWZlYXR1cmUtc2NoZWR1bGUgLnByb2dyYW0tcGhvdG8tY29udGFpbmVyIHtcbiAgaGVpZ2h0OiA4MHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuYXBwLWZlYXR1cmUtc2NoZWR1bGUgLnByb2dyYW0tcGhvdG8ge1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1hcmdpbjogYXV0bztcbiAgZGlzcGxheTogYmxvY2s7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAucHJvZ3JhbS10eXBlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDIlO1xuICBsZWZ0OiAyJTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAucHJvZ3JhbS1uYW1lIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDIlO1xuICBsZWZ0OiAyJTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHotaW5kZXg6IDE1O1xufVxuYXBwLWZlYXR1cmUtc2NoZWR1bGUgLnJlbW92ZS1tb21lbnQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDJweDtcbn1cbmFwcC1mZWF0dXJlLXNjaGVkdWxlIC5kYXJrIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrZ3JleSk7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAubGlnaHQge1xuICBjb2xvcjogd2hpdGU7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAuZnVsbC1oZWlnaHQge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5hcHAtZmVhdHVyZS1zY2hlZHVsZSAuZ3JpZC1yb3cge1xuICBvdmVyZmxvdzogc2Nyb2xsO1xufVxuYXBwLWZlYXR1cmUtc2NoZWR1bGUgLnNlbGVjdGVkIHtcbiAgb3BhY2l0eTogMTtcbn1cbmFwcC1mZWF0dXJlLXNjaGVkdWxlIC5pbmZvLW1vbWVudCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMnB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.ts":
/*!********************************************************************************!*\
  !*** ./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.ts ***!
  \********************************************************************************/
/*! exports provided: FeatureSchedulePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureSchedulePage", function() { return FeatureSchedulePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _services_calendar_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../services/calendar.service */ "./src/app/services/calendar.service.ts");
/* harmony import */ var _feature_childactivities_feature_childactivities_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../feature-childactivities/feature-childactivities.page */ "./src/app/pages/feature/manage/feature-childactivities/feature-childactivities.page.ts");
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










var FeatureSchedulePage = /** @class */ (function (_super) {
    __extends(FeatureSchedulePage, _super);
    function FeatureSchedulePage(route, router, platform, alertCtrl, authService, chatService, calendarService, userData, momentService, resourceService, modalCtrl) {
        var _this = _super.call(this, route, router, platform, authService, chatService, userData, momentService, resourceService, modalCtrl) || this;
        _this.route = route;
        _this.router = router;
        _this.platform = platform;
        _this.alertCtrl = alertCtrl;
        _this.authService = authService;
        _this.chatService = chatService;
        _this.calendarService = calendarService;
        _this.userData = userData;
        _this.momentService = momentService;
        _this.resourceService = resourceService;
        _this.modalCtrl = modalCtrl;
        _this.ionSpinner = false;
        _this.searchKeyword = '';
        _this.view = 'timeline';
        _this.timeline = [];
        _this.calendaritems = [];
        _this.recurrenceStartDate = new Date();
        _this.recurrenceEndDate = new Date();
        _this.allDay = false;
        _this.dateType = ''; // specifies if user is changing start date or end date
        _this.scheduleObj = {
            parent_moments: [],
            child_moments: [],
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().getTime() + 3600000).toISOString(),
            options: {
                firstReminderMinutes: 0,
                secondReminderMinutes: 0,
                recurrence: '',
                recurrenceInterval: 1,
                recurrenceEndDate: new Date().toISOString(),
            },
            array_boolean: [null, null, true, false, true] // default is to add to both participant's and mentor's timeline
        };
        _this.calendarObj = {
            moment: '',
            title: '',
            startDateObj: new Date(),
            endDateObj: new Date(),
            startDate: '',
            endDate: '',
            options: {
                firstReminderMinutes: 0,
                secondReminderMinutes: 0,
            }
        };
        // because this component extends feature-childactivities.page.ts, the following handler overrides the handler with the same name in the parent component
        _this.reloadChildActivitiesHandler = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setupSchedulePage();
                this.setupChildActivitiesPage();
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    FeatureSchedulePage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.ngOnInit.call(this)];
                    case 1:
                        _a.sent();
                        this.setupSchedulePage();
                        return [2 /*return*/];
                }
            });
        });
    };
    FeatureSchedulePage.prototype.setupSchedulePage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.userData && this.userData.user)) return [3 /*break*/, 4];
                        if (this.moment) {
                            this.programId = this.moment._id;
                        }
                        else {
                            this.programId = this.route.snapshot.paramMap.get('id');
                        }
                        this.scheduleId = this.scheduleId || this.route.snapshot.paramMap.get('scheduleId');
                        if (!this.scheduleId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.momentService.loadSchedule(this.scheduleId)];
                    case 1:
                        result = _a.sent();
                        if (result && result.schedule) {
                            this.schedule = result.schedule;
                            if (!this.schedule.hasOwnProperty('array_boolean')) {
                                this.schedule.array_boolean = []; // initialize the property for backward compatibility
                            }
                            if (this.parentCategoryId !== '5c915476e172e4e64590e349') { // only fetch calendar items for non-Plan
                                this.timeline = result.calendaritems;
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.schedule = this.scheduleObj;
                        _a.label = 3;
                    case 3:
                        this.parentCategoryId = this.parentCategoryId || this.route.snapshot.paramMap.get('parentCategoryId');
                        this.schedule.parent_moments = [this.programId]; // for Plan's and Relationship's schedule, parent_moments is used
                        this.recurrenceStartDate = new Date(this.schedule.startDate);
                        this.recurrenceEndDate = new Date(this.schedule.options.recurrenceEndDate || new Date().toISOString());
                        this.recurrenceStartTime = this.recurrenceStartDate.toISOString();
                        this.recurrenceEndTime = this.recurrenceEndDate.toISOString();
                        this.touchPlanTimeline();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // open Content requires providing the relationshipId
    FeatureSchedulePage.prototype.openContent = function (event, calendarItem) {
        return __awaiter(this, void 0, void 0, function () {
            var componentProps;
            return __generator(this, function (_a) {
                event.stopPropagation();
                componentProps = { moment: { _id: calendarItem.moment._id }, relationshipId: this.programId, modalPage: true };
                if (calendarItem.uniqueAnswersPerCalendar && calendarItem._id) {
                    componentProps.calendarId = calendarItem._id;
                }
                this.momentService.openMoment(componentProps);
                return [2 /*return*/];
            });
        });
    };
    FeatureSchedulePage.prototype.promptTouchSchedule = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Re-populate Timeline',
                            subHeader: 'You are about to delete your existing timeline and re-populate it. Are you sure you want to proceed?',
                            cssClass: 'level-15',
                            buttons: [{ text: 'Re-populate',
                                    handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            this.touchSchedule('repopulate timeline');
                                            return [2 /*return*/];
                                        });
                                    }); } }, { text: 'Cancel' }]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FeatureSchedulePage.prototype.touchSchedule = function (operation) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(operation === 'create schedule' || this.schedule._id)) return [3 /*break*/, 5];
                        this.schedule.startDate = new Date(this.recurrenceStartDate.getFullYear(), this.recurrenceStartDate.getMonth(), this.recurrenceStartDate.getDate(), new Date(this.recurrenceStartTime).getHours(), new Date(this.recurrenceStartTime).getMinutes()).toISOString();
                        this.schedule.endDate = new Date(this.recurrenceStartDate.getFullYear(), this.recurrenceStartDate.getMonth(), this.recurrenceStartDate.getDate(), new Date(this.recurrenceStartTime).getHours() + 1, new Date(this.recurrenceStartTime).getMinutes()).toISOString();
                        this.schedule.options.recurrenceEndDate = new Date(this.recurrenceEndDate.getFullYear(), this.recurrenceEndDate.getMonth(), this.recurrenceEndDate.getDate(), new Date(this.recurrenceEndTime).getHours(), new Date(this.recurrenceEndTime).getMinutes()).toISOString();
                        if (!(this.parentCategoryId === '5c915476e172e4e64590e349')) return [3 /*break*/, 2];
                        // for Plan, auto re-populate the timeline and save the changes
                        this.schedule.operation = operation;
                        this.touchPlanTimeline();
                        return [4 /*yield*/, this.momentService.touchSchedule(this.schedule)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        // for Activity, either create schedule or send to the backend to repopulate the timeline
                        this.schedule.operation = operation;
                        return [4 /*yield*/, this.momentService.touchSchedule(this.schedule)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (operation === 'create schedule' && this.modalPage) {
                            this.closeModal();
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // repopulate the Plan's Timeline
    FeatureSchedulePage.prototype.touchPlanTimeline = function () {
        if (this.parentCategoryId === '5c915476e172e4e64590e349' && this.schedule.child_moments && this.schedule.child_moments.length) {
            this.timeline = [];
            var i = 0;
            var newContentCalendar = JSON.parse(JSON.stringify(this.calendarObj));
            newContentCalendar.startDateObj = new Date(this.schedule.startDate);
            newContentCalendar.endDateObj = new Date(this.schedule.endDate);
            do {
                newContentCalendar.moment = this.schedule.child_moments[i % this.schedule.child_moments.length];
                newContentCalendar.title = newContentCalendar.moment.matrix_string[0][0];
                newContentCalendar.startDate = newContentCalendar.startDateObj.toISOString();
                newContentCalendar.endDate = newContentCalendar.endDateObj.toISOString();
                this.timeline.push(JSON.parse(JSON.stringify(newContentCalendar)));
                // increment up
                switch (this.schedule.options.recurrence) {
                    case 'daily':
                        newContentCalendar.startDateObj.setDate(newContentCalendar.startDateObj.getDate() + this.schedule.options.recurrenceInterval);
                        newContentCalendar.endDateObj.setDate(newContentCalendar.endDateObj.getDate() + this.schedule.options.recurrenceInterval);
                        break;
                    case 'weekly':
                        newContentCalendar.startDateObj.setDate(newContentCalendar.startDateObj.getDate() + (7 * this.schedule.options.recurrenceInterval));
                        newContentCalendar.endDateObj.setDate(newContentCalendar.endDateObj.getDate() + (7 * this.schedule.options.recurrenceInterval));
                        break;
                    case 'monthly':
                        newContentCalendar.startDateObj.setMonth(newContentCalendar.startDateObj.getMonth() + this.schedule.options.recurrenceInterval);
                        newContentCalendar.endDateObj.setMonth(newContentCalendar.endDateObj.getMonth() + this.schedule.options.recurrenceInterval);
                        break;
                    case 'yearly':
                        newContentCalendar.startDateObj.setFullYear(newContentCalendar.startDateObj.getFullYear() + this.schedule.options.recurrenceInterval);
                        newContentCalendar.endDateObj.setFullYear(newContentCalendar.endDateObj.getFullYear() + this.schedule.options.recurrenceInterval);
                        break;
                    default:
                        newContentCalendar.startDateObj = new Date(this.schedule.startDate);
                        newContentCalendar.endDateObj = new Date(this.schedule.endDate);
                        i = 730; // break out from the do while loop
                        break;
                }
                i++;
            } while ((newContentCalendar.startDateObj.getTime() <= new Date(this.schedule.options.recurrenceEndDate).getTime()) && (i <= 730));
        }
    };
    FeatureSchedulePage.prototype.focusCalendarDateField = function (type) {
        this.calendarService.calendar.currentViewDate = type === 'start' ? this.recurrenceStartDate : this.recurrenceEndDate;
        this.calendarService.updateViewCalendar();
        this.dateType = type;
    };
    FeatureSchedulePage.prototype.changeSelectedDate = function (inputDate) {
        if (inputDate === ' ')
            return;
        if (this.dateType === 'start') {
            this.recurrenceStartDate = inputDate;
            this.calendarService.calendar.selectedDate = inputDate;
            this.calendarService.calendar.currentViewDate = this.recurrenceEndDate;
            this.dateType = 'end';
        }
        else if (this.dateType === 'end') {
            this.recurrenceEndDate = inputDate;
            this.dateType = '';
            this.calendarService.calendar.selectedDate = inputDate;
        }
        this.calendarService.updateViewCalendar();
        if (this.parentCategoryId === '5c915476e172e4e64590e349') { // only auto populate for Plans
            this.touchSchedule('update schedule');
        }
    };
    FeatureSchedulePage.prototype.deleteSchedule = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Delete Schedule',
                            subHeader: 'You are about to delete this schedule. Are you sure you want to proceed?',
                            cssClass: 'level-15',
                            buttons: [{ text: 'Remove',
                                    handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    alert.dismiss();
                                                    this.schedule.operation = 'delete schedule';
                                                    return [4 /*yield*/, this.momentService.touchSchedule(this.schedule)];
                                                case 1:
                                                    _a.sent();
                                                    if (this.modalPage) {
                                                        this.closeModal();
                                                    }
                                                    else {
                                                        this.router.navigate(['/app/manage/activity/' + this.programId + '/profile/' + this.programId], { replaceUrl: true });
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); } }, { text: 'Cancel' }]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FeatureSchedulePage.prototype.reorderContents = function (event) {
        this.schedule.child_moments = event.detail.complete(this.schedule.child_moments);
        this.schedule.operation = 'update schedule';
        this.momentService.touchSchedule(this.schedule);
    };
    FeatureSchedulePage.prototype.reorderArray = function (array, from, to) {
        var draggedItem = array.splice(from, 1)[0];
        array.splice(to, 0, draggedItem);
        return array;
    };
    FeatureSchedulePage.prototype.chooseContent = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.schedule.child_moments.push(content);
                        this.schedule.operation = 'update schedule';
                        return [4 /*yield*/, this.momentService.touchSchedule(this.schedule)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FeatureSchedulePage.prototype.removeContent = function (event, index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        this.schedule.child_moments.splice(index, 1);
                        this.schedule.operation = 'update schedule';
                        return [4 /*yield*/, this.momentService.touchSchedule(this.schedule)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FeatureSchedulePage.prototype.removeTimelineItem = function (event, momentId, calendaritem) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.momentService.touchContentCalendarItems(momentId, { operation: 'delete calendar items', calendaritems: [calendaritem] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    FeatureSchedulePage.prototype.customTrackBy = function (index, item) {
        return index;
    };
    FeatureSchedulePage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    FeatureSchedulePage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_5__["Chat"] },
        { type: _services_calendar_service__WEBPACK_IMPORTED_MODULE_8__["CalendarService"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_2__["Moment"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_7__["Resource"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeatureSchedulePage.prototype, "modalPage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeatureSchedulePage.prototype, "moment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeatureSchedulePage.prototype, "schedule", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeatureSchedulePage.prototype, "parentCategoryId", void 0);
    FeatureSchedulePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feature-schedule',
            template: __importDefault(__webpack_require__(/*! raw-loader!./feature-schedule.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./feature-schedule.page.scss */ "./src/app/pages/feature/manage/feature-schedule/feature-schedule.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["Auth"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_5__["Chat"],
            _services_calendar_service__WEBPACK_IMPORTED_MODULE_8__["CalendarService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_2__["Moment"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_7__["Resource"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"]])
    ], FeatureSchedulePage);
    return FeatureSchedulePage;
}(_feature_childactivities_feature_childactivities_page__WEBPACK_IMPORTED_MODULE_9__["FeatureChildActivitiesPage"]));



/***/ })

}]);
//# sourceMappingURL=default~feature-manage-managefeature-module~feature-schedule-feature-schedule-module~pages-main-tab-~a528695a.js.map