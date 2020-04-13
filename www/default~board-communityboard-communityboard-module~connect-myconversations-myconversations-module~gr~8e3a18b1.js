(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~board-communityboard-communityboard-module~connect-myconversations-myconversations-module~gr~8e3a18b1"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/editgroup/editgroup.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/editgroup/editgroup.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"modalCtrl.dismiss()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{groupForm.value.name}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <form [formGroup]=\"groupForm\">\n    <ion-list>\n      <div class=\"default-background\" [ngStyle]=\"{'background-image': 'url(' + (groupForm.value.background | background: userData.user._id) + ')'}\" >\n        <div class=\"edit-icon\"></div>\n        <div class=\"default-title\">\n          {{groupForm.value.name}}\n        </div>\n        <div *ngIf=\"platform.is('cordova')\" class=\"edit-icon-container\" (click)=\"editBackground($event)\">\n          <ion-icon name=\"cog\" color=\"primary\"></ion-icon>\n        </div>\n        <div *ngIf=\"!platform.is('cordova')\" class=\"edit-icon-container\">\n          <label for=\"image\"><ion-icon name=\"cog\" color=\"primary\"></ion-icon></label>\n          <input type=\"file\" class=\"file-picker\" name=\"image\" id=\"image\" (change)=\"selectPhotoFromDeviceAndUploadInEdit($event)\" accept=\"image/*\"/>\n        </div>\n      </div>\n      <ion-item>\n        <ion-label position=\"stacked\">Group Name</ion-label>\n        <ion-input type=\"text\" formControlName=\"name\"></ion-input>\n      </ion-item>\n      <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.name.pristine && !groupForm.controls.name.valid\">\n        <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.name.pristine && groupForm.controls.name.hasError('required')\">\n          This is a required field.\n        </p>\n      </ion-item>\n      <div>\n        <!--<ion-item-group>\n          <ion-item>\n            <ion-label position=\"stacked\">Community</ion-label>\n            <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" #church formControlName=\"churchId\" (ionChange)=\"changeCommunity(church.value)\">\n              <ion-select-option *ngFor=\"let church of churches\" [value]=\"church._id\" [class.selected]=\"church.selected\">{{church.name}}</ion-select-option>\n            </ion-select>\n          </ion-item>\n          <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.churchId.pristine && !groupForm.controls.churchId.valid\">\n            <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.churchId.pristine && groupForm.controls.churchId.hasError('required')\">\n              This is a required field.\n            </p>\n          </ion-item>\n          <div *ngIf=\"groupForm.value.churchId !== ''\">\n            <ion-item>\n              <ion-label>List in Discover Section? <ion-icon name=\"information-circle\" (click)=\"explainDiscover()\"></ion-icon></ion-label>\n              <ion-toggle formControlName=\"public_group\"></ion-toggle>\n            </ion-item>\n          </div>\n        </ion-item-group>-->\n        <ion-item>\n          <ion-label position=\"stacked\">Description</ion-label>\n          <ion-textarea autosize rows=\"3\" [minRows]=\"3\" [maxRows]=\"8\" class=\"detailstextarea\" type=\"text\" formControlName=\"details\"></ion-textarea>\n        </ion-item>\n        <!--<ion-item-group lines=\"none\">\n          <ion-item lines=\"none\" (click)=\"showOptional = !showOptional\">\n            <ion-label slot=\"start\">Optional</ion-label>\n            <ion-button size=\"small\" slot=\"end\" fill=\"outline\" *ngIf=\"!showOptional\">Show More</ion-button>\n          </ion-item>\n          <div *ngIf=\"showOptional\">\n            <ion-item>\n              <ion-label position=\"stacked\">Start Time</ion-label>\n              <ion-datetime (ionChange)=\"changeStartTime($event)\" displayFormat=\"MMM DD, YYYY HH:mm\" pickerFormat=\"Z MMM DD, YYYY HH:mm\" min=\"2017\" max=\"2050-12-31\" formControlName=\"beginAt\" [pickerOptions]=\"{cssClass: 'level-15'}\"></ion-datetime>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"stacked\">End Time</ion-label>\n              <ion-datetime displayFormat=\"MMM DD, YYYY HH:mm\" pickerFormat=\"Z MMM DD, YYYY HH:mm\" min=\"2017\" max=\"2050-12-31\" formControlName=\"endAt\" [pickerOptions]=\"{cssClass: 'level-15'}\"></ion-datetime>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"stacked\">Day of the Week</ion-label>\n              <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"meeting_day\">\n                <ion-select-option *ngFor=\"let day of days\" [value]=\"day.name\" [class.selected]=\"day.selected\">{{day.name}}</ion-select-option>\n              </ion-select>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"stacked\">Meeting Frequency</ion-label>\n              <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"meeting_frequency\">\n                <ion-select-option *ngFor=\"let frequency of frequencies\" [value]=\"frequency.name\" [class.selected]=\"frequency.selected\">{{frequency.name}}</ion-select-option>\n              </ion-select>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"stacked\">Location/Room</ion-label>\n              <ion-input type=\"text\" formControlName=\"location\"></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"stacked\">Street</ion-label>\n              <ion-input type=\"text\" formControlName=\"street\"></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"stacked\">City</ion-label>\n              <ion-input type=\"text\" formControlName=\"city\"></ion-input>\n            </ion-item>\n            <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.city.pristine && !groupForm.controls.city.valid\">\n              <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.city.pristine && groupForm.controls.city.hasError('required')\">\n                This is a required field.\n              </p>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"stacked\">State</ion-label>\n              <ion-input type=\"text\" formControlName=\"state\"></ion-input>\n            </ion-item>\n            <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.state.pristine && !groupForm.controls.state.valid\">\n              <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.state.pristine && groupForm.controls.state.hasError('required')\">\n                This is a required field.\n              </p>\n            </ion-item>\n            <ion-item>\n              <ion-label position=\"stacked\">Country</ion-label>\n              <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"country\">\n                <ion-select-option *ngFor=\"let country of countries\" [value]=\"country.name\" [class.selected]=\"country.selected\">{{country.name}}</ion-select-option>\n              </ion-select>\n            </ion-item>\n            <ion-item class=\"form-error-list\" *ngIf=\"!groupForm.controls.country.pristine && !groupForm.controls.country.valid\">\n              <p class=\"form-error\" slot=\"end\" *ngIf=\"!groupForm.controls.country.pristine && groupForm.controls.country.hasError('required')\">\n                This is a required field.\n              </p>\n            </ion-item>\n          </div>\n        </ion-item-group>\n        <ion-item-group *ngIf=\"showOptional\">\n          <ion-item class=\"ion-text-wrap\" *ngIf=\"smsPlan\">\n            <ion-label slot=\"start\">Communication Preference</ion-label>\n            <p>You can control chat message delivery to the Email and SMS members.</p>\n          </ion-item>\n          <ion-item class=\"ion-text-wrap\" *ngIf=\"!smsPlan\">\n            <ion-label slot=\"start\">Communication Preference</ion-label>\n            <p>You can control chat message delivery to the Email members.</p>\n          </ion-item>\n          <ion-item>\n            <ion-label class=\"ion-text-wrap\">Email members will receive messages</ion-label>\n            <ion-toggle slot=\"end\" formControlName=\"emailDisabled\"></ion-toggle>\n          </ion-item>\n          <div *ngIf=\"smsPlan\">\n            <ion-item>\n              <ion-label class=\"ion-text-wrap\">SMS members will receive messages</ion-label>\n              <ion-toggle slot=\"end\" formControlName=\"smsDisabled\"></ion-toggle>\n            </ion-item>\n            <ion-item-divider class=\"ion-text-wrap\">\n              <p>SMS keyword is a word of your choice for the text-to-join feature</p>\n            </ion-item-divider>\n            <ion-item lines=\"none\">\n              <ion-label position=\"stacked\">SMS Keyword</ion-label>\n              <ion-input type=\"text\" formControlName=\"smsKeyword\"></ion-input>\n            </ion-item>\n          </div>\n        </ion-item-group>-->\n      </div>\n    </ion-list>\n  </form>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-button expand=\"full\" shape=\"round\" size=\"medium\" color=\"primary\" (click)=\"clickSaveButton()\" [disabled]=\"!groupForm.valid\">Save</ion-button>\n  </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/editgroupmember/editgroupmember.page.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/editgroupmember/editgroupmember.page.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{member.name}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>\n      Leadership Status\n    </ion-list-header>\n    <ion-item>\n      <ion-label>Group Leader</ion-label>\n      <ion-toggle [(ngModel)]=\"UIisLeaderTag\" (ionChange)=\"leaderStatusChange($event)\" [disabled]=\"disableTag\"></ion-toggle>\n    </ion-item>\n    <ion-item *ngIf=\"!this.group.churchId && this.group.leaders.length === 1 && this.UIisLeaderTag\">\n      <ion-icon name=\"alert-circle\" class=\"ion-margin-right\"></ion-icon><p>You cannot remove this user's leadership status because this user is the only leader in this group.</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer no-shadow>\n  <ion-toolbar>\n    <ion-row>\n      <ion-col>\n        <ion-button expand=\"full\" shape=\"round\" color=\"tertiary\" (click)=\"eraseUserMessages()\" [disabled]=\"disableTag\">Erase User's Messages</ion-button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-button expand=\"full\" shape=\"round\" color=\"danger\" (click)=\"removeMemberFromGroup()\">Remove User from Group</ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/group-popover/group-popover.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/group-popover/group-popover.page.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n  <ion-list class=\"ion-no-padding\">\n    <ion-item class=\"popover-item ion-text-wrap\" (click)=\"invite()\">Invite</ion-item>\n    <div *ngIf=\"loadCompleted\">\n      <ion-item class=\"popover-item ion-text-wrap\" [hidden]=\"!joinGroupTag\" (click)=\"joinGroup()\">Join {{group_type}}</ion-item>\n      <ion-item class=\"popover-item ion-text-wrap\" [hidden]=\"joinGroupTag || !group.churchId || group.flagged\" (click)=\"flagGroup()\">Report Abuse</ion-item>\n      <ion-item class=\"popover-item ion-text-wrap\" [hidden]=\"!leaveGroupTag\" (click)=\"leaveGroup()\">Leave {{group_type}}</ion-item>\n      <ion-item class=\"popover-item ion-text-wrap\" [hidden]=\"!editGroupTag\" (click)=\"editGroup()\">Edit {{group_type}}</ion-item>\n      <ion-item class=\"popover-item ion-text-wrap\" [hidden]=\"!(group.churchId && hasAdminAccess) || !group.flagged\" (click)=\"unflagGroup()\">Remove Abuse Report</ion-item>\n      <ion-item class=\"popover-item ion-text-wrap\" [hidden]=\"!deleteGroupTag\" (click)=\"deleteGroup()\">Delete {{group_type}}</ion-item>\n    </div>\n    </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/groupinfo/groupinfo.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/groupinfo/groupinfo.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"chatService.currentChatProps[propIndex]\">\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title *ngIf=\"chatService.currentChatProps[propIndex].group.name\">{{chatService.currentChatProps[propIndex].group.name}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"presentPopover($event);\">\n        <ion-icon ios=\"ellipsis-horizontal\" md=\"ellipsis-vertical\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"chatService.currentChatProps[propIndex]\">\n  <div class=\"default-background\" [ngStyle]=\"{'background-image': 'url(' + (chatService.currentChatProps[propIndex].group.background | background: chatService.currentChatProps[propIndex].group._id) + ')'}\"><!-- [ngClass]=\"{ 'opaque' : group.hasOwnProperty('background')}\">-->\n    <div class=\"default-title\" *ngIf=\"chatService.currentChatProps[propIndex].group.name\">\n      {{chatService.currentChatProps[propIndex].group.name}}\n    </div>\n  </div>\n  <!--group details-->\n  <div class=\"ion-padding\">\n    <!--<p *ngIf=\"(chatService.currentChatProps[propIndex].group.beginAt && chatService.currentChatProps[propIndex].group.endAt)\"><ion-icon name=\"calendar\"></ion-icon>&nbsp;{{chatService.currentChatProps[propIndex].group.beginAt | datetime: 'h:n,m:n,w:s,m:n,d:n'}} - {{chatService.currentChatProps[propIndex].group.endAt | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n    <div *ngIf=\"chatService.currentChatProps[propIndex].group.churchId && chatService.currentChatProps[propIndex].group.meeting_location\">\n      <p [hidden]=\"!chatService.currentChatProps[propIndex].group.meeting_location.location\"><ion-icon name=\"pin\"></ion-icon>&nbsp;{{chatService.currentChatProps[propIndex].group.meeting_location.location}}</p>\n      <p><ion-icon name=\"pin\"></ion-icon>&nbsp;{{chatService.currentChatProps[propIndex].group.meeting_location.street}}<span [hidden]=\"(chatService.currentChatProps[propIndex].group.meeting_location.street.length==0)\">{{\", \"}}</span>{{chatService.currentChatProps[propIndex].group.meeting_location.city}}<span [hidden]=\"(chatService.currentChatProps[propIndex].group.meeting_location.city.length==0)||(chatService.currentChatProps[propIndex].group.meeting_location.state.length==0)\">{{\", \"}}</span>{{chatService.currentChatProps[propIndex].group.meeting_location.state}}<span [hidden]=\"(chatService.currentChatProps[propIndex].group.meeting_location.city.length==0)&&(chatService.currentChatProps[propIndex].group.meeting_location.state.length==0)\">&nbsp;</span>{{chatService.currentChatProps[propIndex].group.meeting_location.country}}</p>\n    </div>-->\n    <p *ngIf=\"chatService.currentChatProps[propIndex].group.details\" [innerHTML]=\"chatService.currentChatProps[propIndex].group.details | nl2br\"></p>\n  </div>\n  <ion-item lines=\"none\" color=\"grey\" class=\"ion-margin-vertical\">Leaders</ion-item>\n  <ion-list class=\"leaders-list\">\n    <ion-item *ngFor=\"let leader of chatService.currentChatProps[propIndex].group.leaders\" (click)=\"seeUserInfo($event, leader)\">\n      <ion-avatar [ngClass]=\"{'online': (userData.user && chatService.onlineUsers.indexOf(leader._id) > -1)}\" slot=\"start\">\n        <ion-img *ngIf=\"leader.avatar\" [src]=\"leader.avatar\"></ion-img>\n        <ion-img *ngIf=\"!leader.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n      </ion-avatar>\n      {{leader.first_name}} {{leader.last_name}}\n    </ion-item>\n  </ion-list>\n  <ion-row *ngIf=\"joinGroupTag\"><ion-col><ion-button [hidden]=\"!joinGroupTag\" expand=\"full\" shape=\"round\" color=\"primary\" fill=\"solid\" (click)=\"joinGroup()\">Join Group</ion-button></ion-col></ion-row>\n  <ion-item lines=\"none\" color=\"grey\" class=\"ion-margin-vertical\">Members</ion-item>\n  <ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\" (ionCancel)=\"cancelSearch($event)\"></ion-searchbar>\n  </ion-toolbar>\n  <ion-list class=\"members-list\">\n    <ion-item *ngFor=\"let member of members\" (click)=\"seeUserInfo($event, member)\">\n      <ion-avatar [ngClass]=\"{'online': (userData.user && chatService.onlineUsers.indexOf(member._id) > -1)}\" slot=\"start\">\n        <ion-img *ngIf=\"member.avatar\" [src]=\"member.avatar\"></ion-img>\n        <ion-img *ngIf=\"!member.avatar\" src=\"assets/img/avatar-default.jpg\"></ion-img>\n      </ion-avatar>\n      {{member.name}} <span *ngFor=\"let icon of member.icons\"><ion-icon name={{icon}}></ion-icon> </span><ion-badge *ngIf=\"member.badge\">{{member.role}}</ion-badge>\n      <ion-icon slot=\"end\" [hidden]=\"!editMemberTag\" name=\"cog\" (click)=\"editMember($event, member)\"></ion-icon>\n    </ion-item>\n    <div style=\"margin-top: 20%;\"></div>\n  </ion-list>\n  <ion-infinite-scroll position=\"bottom\" (ionInfinite)=\"listgroupmembers($event)\">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button color=\"primary\" (click)=\"addMemberActionSheet()\"><ion-icon name=\"person-add\"></ion-icon></ion-fab-button>\n  </ion-fab>\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/group/editgroup/editgroup.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/group/editgroup/editgroup.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-editgroup .opaque {\n  opacity: 0.6;\n}\napp-editgroup .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-editgroup .edit-icon-container {\n  width: 32px;\n  display: table-cell;\n  text-align: right;\n  vertical-align: bottom;\n  padding: 5px;\n}\napp-editgroup .edit-icon {\n  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;\n}\napp-editgroup .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 2em;\n  color: #fff;\n  -webkit-text-stroke: thin;\n  /*    text-shadow:\n              -1px -1px 0 #000,\n              1px -1px 0 #000,\n              -1px 1px 0 #000,\n              1px 1px 0 #000;*/\n}\napp-editgroup .detailstextarea textarea {\n  width: 100% t;\n  height: 20vh;\n}\napp-editgroup .file-picker {\n  width: 0.1px;\n  height: 0.1px;\n  opacity: 0;\n  overflow: hidden;\n  position: absolute;\n  z-index: -1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2dyb3VwL2VkaXRncm91cC9lZGl0Z3JvdXAucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9ncm91cC9lZGl0Z3JvdXAvZWRpdGdyb3VwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLFlBQUE7QUNESjtBRElFO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0FDRko7QURLRTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0FDSEo7QURNRTtFQUNFLCtFQUNRO0FDTFo7QURXRTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDSjs7Ozs4QkFBQTtBQ0xBO0FEWUU7RUFDRSxhQUFBO0VBQ0EsWUFBQTtBQ1ZKO0FEYUU7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQ1hKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvZ3JvdXAvZWRpdGdyb3VwL2VkaXRncm91cC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtZWRpdGdyb3VwIHtcbiAgXG4gIC5vcGFxdWUge1xuICAgIG9wYWNpdHk6IDAuNjtcbiAgfVxuXG4gIC5kZWZhdWx0LWJhY2tncm91bmQge1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuZWRpdC1pY29uLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDMycHg7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xuICAgIHBhZGRpbmc6IDVweDtcbiAgfVxuXG4gIC5lZGl0LWljb24ge1xuICAgIHRleHQtc2hhZG93OlxuICAgICAgICAgICAgLTFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgIDFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgIC0xcHggMXB4IDAgIzAwMCxcbiAgICAgICAgICAgIDFweCAxcHggMCAjMDAwO1xuICB9XG5cbiAgLmRlZmF1bHQtdGl0bGUge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAyLjBlbTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICAtd2Via2l0LXRleHQtc3Ryb2tlOiB0aGluO1xuLyogICAgdGV4dC1zaGFkb3c6XG4gICAgICAgICAgICAtMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgLTFweCAxcHggMCAjMDAwLFxuICAgICAgICAgICAgMXB4IDFweCAwICMwMDA7Ki9cbiAgfVxuXG4gIC5kZXRhaWxzdGV4dGFyZWEgdGV4dGFyZWF7XG4gICAgd2lkdGg6IDEwMCV0O1xuICAgIGhlaWdodDogMjB2aDtcbiAgfVxuXG4gIC5maWxlLXBpY2tlciB7XG4gICAgd2lkdGg6IDAuMXB4O1xuICAgIGhlaWdodDogMC4xcHg7XG4gICAgb3BhY2l0eTogMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAtMTtcbiAgfVxufVxuIiwiYXBwLWVkaXRncm91cCAub3BhcXVlIHtcbiAgb3BhY2l0eTogMC42O1xufVxuYXBwLWVkaXRncm91cCAuZGVmYXVsdC1iYWNrZ3JvdW5kIHtcbiAgZGlzcGxheTogdGFibGU7XG4gIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1lZGl0Z3JvdXAgLmVkaXQtaWNvbi1jb250YWluZXIge1xuICB3aWR0aDogMzJweDtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gIHBhZGRpbmc6IDVweDtcbn1cbmFwcC1lZGl0Z3JvdXAgLmVkaXQtaWNvbiB7XG4gIHRleHQtc2hhZG93OiAtMXB4IC0xcHggMCAjMDAwLCAxcHggLTFweCAwICMwMDAsIC0xcHggMXB4IDAgIzAwMCwgMXB4IDFweCAwICMwMDA7XG59XG5hcHAtZWRpdGdyb3VwIC5kZWZhdWx0LXRpdGxlIHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDJlbTtcbiAgY29sb3I6ICNmZmY7XG4gIC13ZWJraXQtdGV4dC1zdHJva2U6IHRoaW47XG4gIC8qICAgIHRleHQtc2hhZG93OlxuICAgICAgICAgICAgICAtMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgICAxcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAgIC0xcHggMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgMXB4IDFweCAwICMwMDA7Ki9cbn1cbmFwcC1lZGl0Z3JvdXAgLmRldGFpbHN0ZXh0YXJlYSB0ZXh0YXJlYSB7XG4gIHdpZHRoOiAxMDAlIHQ7XG4gIGhlaWdodDogMjB2aDtcbn1cbmFwcC1lZGl0Z3JvdXAgLmZpbGUtcGlja2VyIHtcbiAgd2lkdGg6IDAuMXB4O1xuICBoZWlnaHQ6IDAuMXB4O1xuICBvcGFjaXR5OiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IC0xO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/group/editgroup/editgroup.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/group/editgroup/editgroup.page.ts ***!
  \*********************************************************/
/*! exports provided: EditgroupPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditgroupPage", function() { return EditgroupPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _services_board_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/board.service */ "./src/app/services/board.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
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













var EditgroupPage = /** @class */ (function () {
    function EditgroupPage(zone, modalCtrl, platform, groupService, churchService, userData, chatService, boardService, formBuilder, alertCtrl, cache, awsService, authService, storage, actionSheetCtrl) {
        this.zone = zone;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.groupService = groupService;
        this.churchService = churchService;
        this.userData = userData;
        this.chatService = chatService;
        this.boardService = boardService;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.cache = cache;
        this.awsService = awsService;
        this.authService = authService;
        this.storage = storage;
        this.actionSheetCtrl = actionSheetCtrl;
        this.days = [];
        this.frequencies = [];
        this.countries = [];
        this.churches = [];
        this.smsPlan = false;
        this.showOptional = false;
        this.saveType = 'create';
        this.initialized = false;
        this.country_list = ["United States", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, US", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
        this.day_list = ['', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Varied or N/A", "To be determined"];
        this.frequency_list = ['', "Weekly", "Every Other Week", "One-Time", "Monthly", "1st and 3rd Week", "2nd and 4th Week", "N/A"];
        this.publishGroup = this.publishGroup || false; //when creating a new group, the user chooses whether she wants to create a personal group or a community group
        var controlConfigs = {
            _id: [''],
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            background: [''],
            emailDisabled: [false],
            smsDisabled: [false],
            smsKeyword: [''],
            churchId: [''],
            public_group: [false],
            flagged: [false],
            details: [''],
            meeting_day: [''],
            meeting_frequency: [''],
            beginAt: [new Date(new Date().setMinutes(0)).toISOString()],
            endAt: [new Date(new Date().setMinutes(0)).toISOString()],
            location: [''],
            street: [''],
            city: [''],
            state: [''],
            country: [''],
            conversation: [''],
            board: ['']
        };
        this.churches = this.userData.user.churches.map(function (c) { return { _id: c._id, name: c.name, selected: false }; });
        this.churches.unshift({ _id: '', name: "None", selected: false });
        this.countries = this.country_list.map(function (c) { return { name: c, selected: false }; });
        this.days = this.day_list.map(function (c) { return { name: c, selected: false }; });
        this.frequencies = this.frequency_list.map(function (c) { return { name: c, selected: false }; });
        this.groupForm = this.formBuilder.group(controlConfigs);
    }
    EditgroupPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log("edit group", this.group);
        setTimeout(function () {
            _this.setupForm();
            _this.initialized = true;
        }, 100);
    };
    EditgroupPage.prototype.setupForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var group, listOfChurchIds, index, _a, church;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.group) return [3 /*break*/, 5];
                        this.saveType = 'update';
                        group = JSON.parse(JSON.stringify(this.group));
                        this.group.emailDisabled = !this.group.emailDisabled; // reverse the boolean of the toggle interface
                        this.group.smsDisabled = !this.group.smsDisabled; // reverse the boolean of the toggle interface
                        this.groupForm.patchValue(group.meeting_location); //fill in the location info
                        delete group.meeting_location;
                        /*this.group.beginAtISOString = group.beginAt.toISOString();
                        this.group.endAtISOString = group.endAt.toISOString();*/
                        this.groupForm.patchValue(this.group);
                        if (!!this.personalGroup) return [3 /*break*/, 3];
                        this.previous_churchId = this.group.churchId;
                        listOfChurchIds = this.churches.map(function (c) {
                            return c._id;
                        });
                        index = listOfChurchIds.indexOf(this.group.churchId);
                        if (!(index === -1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.churchService.loadChurchProfile(this.group.churchId)];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), church = _a[0];
                        this.churches.push({ _id: this.group.churchId, name: church.name, selected: false });
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        this.churches[0].selected = true;
                        _b.label = 4;
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        this.saveType = 'create';
                        if (!!this.personalGroup) return [3 /*break*/, 7];
                        this.groupForm.patchValue({ 'churchId': this.userData.user.churches[this.userData.currentCommunityIndex]._id });
                        return [4 /*yield*/, this.loadCommunityInfo(this.userData.user.churches[this.userData.currentCommunityIndex]._id)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        this.groupForm.patchValue({ 'churchId': '' });
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    EditgroupPage.prototype.clickSaveButton = function () {
        this.group = this.groupForm.value;
        //convert datetime back to UTC
        /*//only convert the raw time zone offset here, server will adjust for day light saving effect
        this.group.beginAt = new Date(new Date(this.group.beginAtISOString).getTime() + new Date().getTimezoneOffset()*60000).toISOString();
        this.group.endAt = new Date(new Date(this.group.endAtISOString).getTime() + new Date().getTimezoneOffset()*60000).toISOString();*/
        this.group.meeting_location = {
            location: this.group.location,
            street: this.group.street,
            city: this.group.city,
            state: this.group.state,
            country: this.group.country
        };
        this.group.emailDisabled = !this.group.emailDisabled; // reverse the boolean of the toggle interface
        this.group.smsDisabled = !this.group.smsDisabled; // reverse the boolean of the toggle interface
        console.log("group", this.group);
        if (this.saveType === 'create') { // if creating new group
            delete this.group._id; // do not send the _id field for new group creation
            delete this.group.board;
            this.createGroupProfile();
        }
        else if (this.saveType === 'update') { // if editing exising group
            this.updateGroupProfile();
        }
    };
    EditgroupPage.prototype.createGroupProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, alert_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.group) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.groupService.createGroupProfile(this.group)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                subHeader: this.group.name + ' is created.',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () {
                                                for (var i = 0; i < _this.userData.user.churches.length; i++) { //for community group
                                                    if (_this.group.churchId && _this.userData.user.churches[i]._id === _this.group.churchId) {
                                                        _this.userData.currentCommunityIndex = i;
                                                        _this.storage.set('currentCommunityIndex', _this.userData.currentCommunityIndex.toString()); //store this for the next time the app starts up
                                                    }
                                                }
                                                _this.modalCtrl.dismiss(true);
                                            });
                                        } }],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 4:
                        _a.sent();
                        console.log(result);
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        this.noNetworkConnection();
                        console.log("not allowed");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EditgroupPage.prototype.updateGroupProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.groupService.updateGroupProfile(this.group)];
                    case 1:
                        _b.sent();
                        if (!this.group.conversation) return [3 /*break*/, 2];
                        this.chatService.socket.emit('update status', this.group.conversation, this.group); // group leader will receive update through socket.io
                        this.authService.refreshGroupStatus({ conversationId: this.group.conversation, data: this.group });
                        return [3 /*break*/, 4];
                    case 2:
                        if (!this.group.board) return [3 /*break*/, 4];
                        this.boardService.socket.emit('refresh board', this.group.board, { action: 'refresh board' }); // refresh the news feed page
                        _a = this.userData;
                        return [4 /*yield*/, this.boardService.loadUserChurchBoards()];
                    case 3:
                        _a.communitiesboards = _b.sent(); //in case of a board group
                        this.userData.refreshUserStatus({ type: 'refresh community board page' }); // refresh News Feed page
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        this.noNetworkConnection();
                        console.log(err_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EditgroupPage.prototype.changeCommunity = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var alert_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.initialized) return [3 /*break*/, 4];
                        if (!(this.group && !this.personalGroup && !id.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Convert to Personal Group',
                                subHeader: 'You are about to convert this ' + (this.group.public_group ? 'topic' : 'community group') + ' to a personal group. This group will no longer be associated with any community and will not be listed in the Discover Section. Proceed?',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_2.dismiss();
                                            navTransition.then(function () {
                                                _this.personalGroup = true;
                                                _this.group.public_group = false;
                                            });
                                        } },
                                    { text: 'Cancel',
                                        handler: function () {
                                            var navTransition = alert_2.dismiss();
                                            navTransition.then(function () {
                                                _this.group.churchId = _this.previous_churchId;
                                            });
                                        } }],
                                cssClass: 'level-15'
                            })];
                    case 1:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.previous_churchId = id;
                        this.personalGroup = false;
                        this.loadCommunityInfo(id);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EditgroupPage.prototype.loadCommunityInfo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, church, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!id.length) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.churchService.loadChurchProfile(id)];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 1]), church = _a[0];
                        this.groupForm.patchValue(church.meeting_location);
                        this.smsPlan = church.payment_type === 'SMS';
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _b.sent();
                        console.log(err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EditgroupPage.prototype.editBackground = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var buttons, actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buttons = [
                            {
                                text: 'Upload Image',
                                handler: function () {
                                    _this.selectPhotoFromDeviceAndUploadInEdit(event);
                                }
                            }
                        ];
                        if (this.group && this.group.background) {
                            buttons.push({
                                text: 'Restore to Default',
                                handler: function () {
                                    _this.removeFile();
                                }
                            });
                        }
                        return [4 /*yield*/, this.actionSheetCtrl.create({ header: "Background Graphics", buttons: buttons })];
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
    EditgroupPage.prototype.changeStartTime = function (event) {
        event.stopPropagation();
        if (this.groupForm.value.beginAt > this.groupForm.value.endAt) {
            this.groupForm.patchValue({ 'endAt': this.groupForm.value.beginAt });
        }
    };
    EditgroupPage.prototype.selectPhotoFromDeviceAndUploadInEdit = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result, Camera, image, compressed, _a, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, , 14]);
                        result = void 0;
                        if (!this.platform.is('cordova')) return [3 /*break*/, 3];
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["CameraSource"].Prompt,
                                correctOrientation: false
                            })];
                    case 1:
                        image = _b.sent();
                        if (!image) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.awsService.uploadImage('users', this.userData.user._id, image, null)];
                    case 2:
                        result = _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.awsService.compressPhoto(event.target.files[0])];
                    case 4:
                        compressed = _b.sent();
                        return [4 /*yield*/, this.awsService.uploadFile('users', this.userData.user._id, compressed, null)];
                    case 5:
                        result = _b.sent();
                        _b.label = 6;
                    case 6:
                        if (!(result === 'Upload succeeded')) return [3 /*break*/, 12];
                        if (!this.groupForm.value.background.length) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.awsService.removeFile(this.groupForm.value.background)];
                    case 7:
                        _b.sent(); //remove the previous background from Digital Ocean
                        _b.label = 8;
                    case 8:
                        this.groupForm.patchValue({ 'background': this.awsService.url });
                        if (!(this.group && this.group._id)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.groupService.updateGroupProfile({ _id: this.group._id, background: this.awsService.url })];
                    case 9:
                        _b.sent();
                        if (!this.group.conversation) return [3 /*break*/, 10];
                        this.chatService.socket.emit('update status', this.group.conversation, this.group);
                        return [3 /*break*/, 12];
                    case 10:
                        if (!this.group.board) return [3 /*break*/, 12];
                        _a = this.userData;
                        return [4 /*yield*/, this.boardService.loadUserChurchBoards()];
                    case 11:
                        _a.communitiesboards = _b.sent(); //in case of a board group
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        err_4 = _b.sent();
                        console.log(err_4);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    EditgroupPage.prototype.removeFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.awsService.removeFile(this.groupForm.value.background)];
                    case 1:
                        _b.sent();
                        this.groupForm.controls.background.setValue('');
                        if (!this.group) return [3 /*break*/, 5];
                        this.group.background = null;
                        return [4 /*yield*/, this.groupService.updateGroupProfile({ _id: this.group._id, background: null })];
                    case 2:
                        _b.sent();
                        if (!this.group.conversation) return [3 /*break*/, 3];
                        this.chatService.socket.emit('update status', this.group.conversation, this.group);
                        return [3 /*break*/, 5];
                    case 3:
                        if (!this.group.board) return [3 /*break*/, 5];
                        _a = this.userData;
                        return [4 /*yield*/, this.boardService.loadUserChurchBoards()];
                    case 4:
                        _a.communitiesboards = _b.sent(); //in case of a board group
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EditgroupPage.prototype.explainDiscover = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'List in Discover Section',
                            subHeader: "You can list this topic in the community's Discover section by toggling it to 'on'. If toggled 'off', no one can join it except the person is being invited by a member.",
                            buttons: [{ text: 'Ok' }],
                            cssClass: 'level-15'
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
    EditgroupPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(false);
    };
    EditgroupPage.prototype.noNetworkConnection = function () {
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
    EditgroupPage.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_7__["Groups"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_9__["UserData"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_8__["Chat"] },
        { type: _services_board_service__WEBPACK_IMPORTED_MODULE_11__["Board"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_10__["Aws"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["Auth"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('textArea', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditgroupPage.prototype, "textArea", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EditgroupPage.prototype, "group", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EditgroupPage.prototype, "personalGroup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EditgroupPage.prototype, "publishGroup", void 0);
    EditgroupPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-editgroup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./editgroup.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/editgroup/editgroup.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./editgroup.page.scss */ "./src/app/pages/group/editgroup/editgroup.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_7__["Groups"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_9__["UserData"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_8__["Chat"],
            _services_board_service__WEBPACK_IMPORTED_MODULE_11__["Board"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_10__["Aws"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["Auth"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"]])
    ], EditgroupPage);
    return EditgroupPage;
}());



/***/ }),

/***/ "./src/app/pages/group/editgroupmember/editgroupmember.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/pages/group/editgroupmember/editgroupmember.page.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2dyb3VwL2VkaXRncm91cG1lbWJlci9lZGl0Z3JvdXBtZW1iZXIucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/pages/group/editgroupmember/editgroupmember.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/group/editgroupmember/editgroupmember.page.ts ***!
  \*********************************************************************/
/*! exports provided: EditgroupmemberPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditgroupmemberPage", function() { return EditgroupmemberPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
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






var EditgroupmemberPage = /** @class */ (function () {
    function EditgroupmemberPage(navParams, alertCtrl, modalCtrl, authService, userData, groupService, chatService) {
        var _this = this;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.authService = authService;
        this.userData = userData;
        this.groupService = groupService;
        this.chatService = chatService;
        this.UIisLeaderTag = false;
        this.disableTag = false;
        this.anyChangeMade = false;
        this.subscriptions = {};
        this.refreshHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var leaderIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(res && res.conversationId && res.data)) return [3 /*break*/, 2];
                        if (!(res.conversationId === this.group.conversation && res.data.action === "update leader status")) return [3 /*break*/, 2];
                        leaderIds = res.data.leaders.map(function (c) { return c._id; });
                        if (!(leaderIds.indexOf(this.userData.user._id) < 0 && this.group.churchId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.hasAdminAccess(this.group.churchId)];
                    case 1:
                        if (!(_a.sent())) { // if not church admin, the user is not supposed to be in this view, therefore exit
                            this.modalCtrl.dismiss();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        this.group = this.navParams.get('group');
        this.member = this.navParams.get('member');
        this.setToggle();
    }
    EditgroupmemberPage.prototype.ngOnInit = function () {
        this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.refreshHandler);
    };
    EditgroupmemberPage.prototype.setToggle = function () {
        this.UIisLeaderTag = this.member.role === 'Leader';
        this.disableTag = (this.member.role === 'Contact' || this.member.role === 'Pending') || (!this.group.churchId && this.group.leaders.length === 1 && this.UIisLeaderTag);
    };
    EditgroupmemberPage.prototype.leaderStatusChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var noLeaderAlert, i, result, err_1, networkAlert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!event.detail.checked) return [3 /*break*/, 1];
                        if (this.group.leaders.map(function (c) { return c._id; }).indexOf(this.member._id) < 0) { // if it has not been added yet
                            this.group.leaders.push(this.member);
                        }
                        else {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(this.group.leaders.length === 1)) return [3 /*break*/, 4];
                        this.disableTag = true;
                        this.UIisLeaderTag = true; // reverse the toggle
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Group Requirement',
                                message: "This group needs at least one leader. Please assign another leader before you surrender your leader's status",
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        noLeaderAlert = _a.sent();
                        return [4 /*yield*/, noLeaderAlert.present()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        for (i = this.group.leaders.length - 1; i >= 0; i--) {
                            if (this.group.leaders[i]._id === this.member._id) {
                                this.group.leaders.splice(i, 1);
                            }
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 10]);
                        return [4 /*yield*/, this.groupService.updateGroupProfile(this.group)];
                    case 6:
                        result = _a.sent();
                        this.chatService.socket.emit('update status', this.group.conversation, { action: "update leader status", leaders: this.group.leaders });
                        this.anyChangeMade = true;
                        console.log(result);
                        return [3 /*break*/, 10];
                    case 7:
                        err_1 = _a.sent();
                        this.setToggle(); // reset the tags if failed
                        console.log(err_1);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'No Internet Connection',
                                message: 'Please resume internet connection to complete the log out process.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 8:
                        networkAlert = _a.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    EditgroupmemberPage.prototype.eraseUserMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Warning!',
                            message: 'This will erase this users\' messages from the chat. Are you sure to proceed?',
                            buttons: [{ text: 'Proceed',
                                    handler: function () {
                                        _this.chatService.eraseUserMessages(_this.member._id, _this.group.conversation).then(function (result) {
                                            console.log(result);
                                        }, function (err) {
                                            _this.noNetworkConnection();
                                            console.log(err);
                                        });
                                    } }, { text: 'Cancel' }],
                            cssClass: 'level-15'
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
    EditgroupmemberPage.prototype.removeMemberFromGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("role", this.member);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Warning!',
                                message: 'This will remove this user from the group. Are you sure to proceed?',
                                buttons: [{ text: 'Proceed',
                                        handler: function () {
                                            var navTransition = alert.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var result, err_2;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 2, , 3]);
                                                            return [4 /*yield*/, this.groupService.removeUserFromGroup({
                                                                    member: this.member,
                                                                    groupId: this.group._id
                                                                })];
                                                        case 1:
                                                            result = _a.sent();
                                                            console.log(result);
                                                            if (this.member.role !== 'Pending') {
                                                                this.userData.socket.emit('refresh user status', this.member._id, {
                                                                    type: 'leave group',
                                                                    groupId: this.group._id
                                                                });
                                                            }
                                                            this.modalCtrl.dismiss(result === "success");
                                                            return [3 /*break*/, 3];
                                                        case 2:
                                                            err_2 = _a.sent();
                                                            this.noNetworkConnection();
                                                            console.log(err_2);
                                                            return [3 /*break*/, 3];
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } }, { text: 'Cancel' }],
                                cssClass: 'level-15'
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
    EditgroupmemberPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.anyChangeMade);
    };
    EditgroupmemberPage.prototype.noNetworkConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var networkAlert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'No Internet Connection',
                            message: 'Please check your internet connection.',
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
    EditgroupmemberPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshGroupStatus'].unsubscribe(this.refreshHandler);
    };
    EditgroupmemberPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["NavParams"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["Auth"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_2__["Groups"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_3__["Chat"] }
    ]; };
    EditgroupmemberPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-editgroupmember',
            template: __importDefault(__webpack_require__(/*! raw-loader!./editgroupmember.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/editgroupmember/editgroupmember.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./editgroupmember.page.scss */ "./src/app/pages/group/editgroupmember/editgroupmember.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["NavParams"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["Auth"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserData"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_2__["Groups"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_3__["Chat"]])
    ], EditgroupmemberPage);
    return EditgroupmemberPage;
}());



/***/ }),

/***/ "./src/app/pages/group/group-popover/group-popover.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/group/group-popover/group-popover.page.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-group-popover ion-content {\n  --background: var(--ion-color-primary);\n}\napp-group-popover .popover-item {\n  --background: var(--ion-color-primary);\n  color: var(--ion-color-secondary);\n  font-size: small;\n  text-align: center;\n}\napp-group-popover .item-divider {\n  height: 1px;\n  width: 100%;\n  --background: var(--ion-color-secondary);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2dyb3VwL2dyb3VwLXBvcG92ZXIvZ3JvdXAtcG9wb3Zlci5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2dyb3VwL2dyb3VwLXBvcG92ZXIvZ3JvdXAtcG9wb3Zlci5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUU7RUFDRSxzQ0FBQTtBQ0RKO0FESUU7RUFDRSxzQ0FBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0ZKO0FES0U7RUFDRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLHdDQUFBO0FDSEoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ncm91cC9ncm91cC1wb3BvdmVyL2dyb3VwLXBvcG92ZXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWdyb3VwLXBvcG92ZXIge1xuXG4gIGlvbi1jb250ZW50IHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gIC5wb3BvdmVyLWl0ZW0ge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBmb250LXNpemU6IHNtYWxsO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5pdGVtLWRpdmlkZXIge1xuICAgIGhlaWdodDogMXB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gIH1cbn0iLCJhcHAtZ3JvdXAtcG9wb3ZlciBpb24tY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuYXBwLWdyb3VwLXBvcG92ZXIgLnBvcG92ZXItaXRlbSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmFwcC1ncm91cC1wb3BvdmVyIC5pdGVtLWRpdmlkZXIge1xuICBoZWlnaHQ6IDFweDtcbiAgd2lkdGg6IDEwMCU7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/group/group-popover/group-popover.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/group/group-popover/group-popover.page.ts ***!
  \*****************************************************************/
/*! exports provided: GroupPopoverPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupPopoverPage", function() { return GroupPopoverPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/badge/ngx */ "./node_modules/@ionic-native/badge/ngx/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _editgroup_editgroup_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../editgroup/editgroup.page */ "./src/app/pages/group/editgroup/editgroup.page.ts");
/* harmony import */ var _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../connect/invitetoconnect/invitetoconnect.page */ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.ts");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _services_network_service_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/network-service.service */ "./src/app/services/network-service.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
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














var GroupPopoverPage = /** @class */ (function () {
    function GroupPopoverPage(electronService, storage, cache, platform, badge, actionSheetCtrl, alertCtrl, modalCtrl, navParams, popoverCtrl, networkService, authService, groupService, awsService, chatService, userData) {
        var _this = this;
        this.electronService = electronService;
        this.storage = storage;
        this.cache = cache;
        this.platform = platform;
        this.badge = badge;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.networkService = networkService;
        this.authService = authService;
        this.groupService = groupService;
        this.awsService = awsService;
        this.chatService = chatService;
        this.userData = userData;
        this.subscriptions = {};
        this.group_type = '';
        this.joinGroupTag = true;
        this.editGroupTag = false;
        this.leaveGroupTag = false;
        this.deleteGroupTag = false;
        this.isGroupLeader = false;
        this.hasAdminAccess = false;
        this.loadCompleted = false;
        this.refreshHandler = function (res) {
            if (res) {
                if (_this.group.conversation && res.conversationId === _this.group.conversation && res.data.action === "update leader status") {
                    _this.group.leaders = res.data.leaders;
                    _this.setTag();
                }
            }
        };
    }
    GroupPopoverPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.groupService.loadGroupProfile(this.group._id)];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), this.group = _a[0];
                        this.setTag();
                        this.loadCompleted = true;
                        console.log("group:", this.group);
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupPopoverPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    GroupPopoverPage.prototype.ionViewDidEnter = function () {
        this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.refreshHandler);
    };
    GroupPopoverPage.prototype.setTag = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groupIds, leaderIds, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("user", this.userData.user);
                        groupIds = this.userData.user.groups.map(function (c) { return c._id; });
                        if (groupIds.indexOf(this.group._id) > -1) { //if user is a group member
                            this.joinGroupTag = false;
                            this.editGroupTag = false;
                            this.leaveGroupTag = true;
                            this.deleteGroupTag = false;
                        }
                        leaderIds = this.group.leaders.map(function (c) { return c._id; });
                        if (leaderIds.indexOf(this.userData.user._id) > -1) { //if user is a group leader
                            this.joinGroupTag = false;
                            this.editGroupTag = true;
                            this.leaveGroupTag = true;
                            this.deleteGroupTag = true;
                            this.isGroupLeader = true;
                        }
                        _a = this.group.churchId;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userData.hasAdminAccess(this.group.churchId)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) { //special admin privileges
                            this.editGroupTag = true;
                            this.deleteGroupTag = true;
                            this.hasAdminAccess = true;
                        }
                        this.group_type = this.group.board ? 'Topic' : 'Group';
                        return [2 /*return*/];
                }
            });
        });
    };
    /*async about() {
        const aboutPage = await this.modalCtrl.create({component: ShowgroupPage, componentProps: {
                group: this.group
            }});
        await aboutPage.present();
    }*/
    GroupPopoverPage.prototype.invite = function () {
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
                        return [4 /*yield*/, this.actionSheetCtrl.create({
                                header: 'Invite a Friend',
                                buttons: buttons,
                                cssClass: 'level-15'
                            })];
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
    GroupPopoverPage.prototype.invitePage = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var invitePage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_10__["InvitetoconnectPage"],
                            componentProps: { type: type, group: this.group }
                        })];
                    case 1:
                        invitePage = _a.sent();
                        return [4 /*yield*/, invitePage.present()];
                    case 2:
                        _a.sent();
                        this.popoverCtrl.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupPopoverPage.prototype.joinGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, alert_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userData.joinGroup(this.group)];
                    case 1:
                        data = _a.sent();
                        if (data === "cancel")
                            return [2 /*return*/];
                        this.popoverCtrl.dismiss();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                subHeader: 'You have joined ' + this.group.name,
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () {
                                                //do nothing for now
                                                if (_this.group.conversation) {
                                                    _this.authService.refreshGroupStatus({ conversationId: _this.group.conversation, data: _this.group });
                                                }
                                            });
                                        } }],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        alert_1 = _a.sent();
                        alert_1.present();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.popoverCtrl.dismiss();
                        this.noNetworkConnection();
                        console.log("failed to add to My Community");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GroupPopoverPage.prototype.leaveGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!this.networkService.hasNetwork) return [3 /*break*/, 4];
                        if (!this.group.conversation) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.chatService.resetBadgeCount(this.group.conversation)];
                    case 1:
                        count = _a.sent();
                        this.chatService.socket.emit('leave conversation', this.group.conversation);
                        if (count) {
                            if (this.platform.is('cordova') && this.userData.user.enablePushNotification) {
                                this.badge.decrease(count);
                            }
                            if (this.electronService.isElectronApp) {
                                this.electronService.ipcRenderer.send('SYSTEM_TRAY:::CHANGE_BADGE', -1 * count);
                            }
                        }
                        _a.label = 2;
                    case 2: 
                    //Remove group from user-data and group collections
                    return [4 /*yield*/, this.userData.leaveGroup(this.group)];
                    case 3:
                        //Remove group from user-data and group collections
                        _a.sent();
                        this.popoverCtrl.dismiss(true);
                        return [3 /*break*/, 5];
                    case 4:
                        this.noNetworkConnection();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        this.noNetworkConnection();
                        this.popoverCtrl.dismiss();
                        console.log(JSON.stringify(err_2));
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GroupPopoverPage.prototype.editGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editGroupPage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.popoverCtrl.dismiss();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _editgroup_editgroup_page__WEBPACK_IMPORTED_MODULE_9__["EditgroupPage"], componentProps: { group: this.group, personalGroup: !this.group.churchId } })];
                    case 1:
                        editGroupPage = _a.sent();
                        return [4 /*yield*/, editGroupPage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, editGroupPage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupPopoverPage.prototype.flagGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert_2, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: "Report Abuse",
                                message: "You are about to report this group and its content for a violation of our terms of use. Are you sure to proceed?",
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_2.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var result, message;
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            this.group.flagged = true;
                                                            return [4 /*yield*/, this.groupService.flagGroup(this.group)];
                                                        case 1:
                                                            result = _a.sent();
                                                            return [4 /*yield*/, this.alertCtrl.create({
                                                                    header: 'Report Received',
                                                                    message: this.group.public_group ? 'This topic' : 'This group' + ' has been flagged for review. We will take the necessary actions which may lead to deletion of its content and the suspension of its author.',
                                                                    buttons: [{ text: 'Ok',
                                                                            handler: function () {
                                                                                var navTransition = alert_2.dismiss();
                                                                                navTransition.then(function () {
                                                                                    _this.popoverCtrl.dismiss(true);
                                                                                });
                                                                            } }],
                                                                    cssClass: 'level-15'
                                                                })];
                                                        case 2:
                                                            message = _a.sent();
                                                            return [4 /*yield*/, message.present()];
                                                        case 3:
                                                            _a.sent();
                                                            console.log(result);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } },
                                    { text: 'Cancel' }],
                                cssClass: 'level-15'
                            })];
                    case 1:
                        alert_2 = _a.sent();
                        alert_2.present();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        this.noNetworkConnection();
                        this.popoverCtrl.dismiss();
                        console.log(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GroupPopoverPage.prototype.unflagGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, alert_3, err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.group.flagged = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.groupService.flagGroup(this.group)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'User Report Removed',
                                message: 'This group will not be marked for review. Restvo reserves the right to investigate its content and take actions if necessary.',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_3.dismiss();
                                            navTransition.then(function () {
                                                _this.popoverCtrl.dismiss(true);
                                            });
                                        } }],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        alert_3 = _a.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 4:
                        _a.sent();
                        console.log(result);
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        this.noNetworkConnection();
                        this.popoverCtrl.dismiss();
                        console.log(err_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    GroupPopoverPage.prototype.deleteGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Delete ' + (this.group.published ? 'Topic' : 'Group'),
                            message: 'Are you sure you want to delete ' + this.group.name + '?',
                            buttons: [{ text: 'Ok',
                                    handler: function () {
                                        var navTransition = alert.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var err_5;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 4, , 5]);
                                                        return [4 /*yield*/, this.groupService.deleteGroupProfile(this.group)];
                                                    case 1:
                                                        _a.sent();
                                                        if (!(this.group.background && this.group.background.length)) return [3 /*break*/, 3];
                                                        return [4 /*yield*/, this.awsService.removeFile(this.group.background)];
                                                    case 2:
                                                        _a.sent();
                                                        _a.label = 3;
                                                    case 3:
                                                        this.popoverCtrl.dismiss(true);
                                                        return [3 /*break*/, 5];
                                                    case 4:
                                                        err_5 = _a.sent();
                                                        this.popoverCtrl.dismiss();
                                                        this.noNetworkConnection();
                                                        console.log("delete group failed");
                                                        return [3 /*break*/, 5];
                                                    case 5: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    } },
                                { text: 'Cancel',
                                    handler: function () {
                                        var navTransition = alert.dismiss();
                                        navTransition.then(function () {
                                            _this.popoverCtrl.dismiss();
                                        });
                                    } }],
                            cssClass: 'level-15'
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
    GroupPopoverPage.prototype.close = function () {
        this.popoverCtrl.dismiss();
    };
    GroupPopoverPage.prototype.noNetworkConnection = function () {
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
    GroupPopoverPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshGroupStatus'].unsubscribe(this.refreshHandler);
    };
    GroupPopoverPage.ctorParameters = function () { return [
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_1__["ElectronService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_2__["CacheService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
        { type: _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_3__["Badge"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavParams"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"] },
        { type: _services_network_service_service__WEBPACK_IMPORTED_MODULE_12__["NetworkService"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_13__["Auth"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_7__["Groups"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_11__["Aws"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_8__["Chat"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GroupPopoverPage.prototype, "group", void 0);
    GroupPopoverPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-group-popover',
            template: __importDefault(__webpack_require__(/*! raw-loader!./group-popover.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/group-popover/group-popover.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./group-popover.page.scss */ "./src/app/pages/group/group-popover/group-popover.page.scss")).default]
        }),
        __metadata("design:paramtypes", [ngx_electron__WEBPACK_IMPORTED_MODULE_1__["ElectronService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_2__["CacheService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"],
            _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_3__["Badge"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavParams"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"],
            _services_network_service_service__WEBPACK_IMPORTED_MODULE_12__["NetworkService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_13__["Auth"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_7__["Groups"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_11__["Aws"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_8__["Chat"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"]])
    ], GroupPopoverPage);
    return GroupPopoverPage;
}());



/***/ }),

/***/ "./src/app/pages/group/groupinfo/groupinfo.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/group/groupinfo/groupinfo.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-groupinfo .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-groupinfo .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 2em;\n  color: #fff;\n  -webkit-text-stroke: thin;\n  /*    text-shadow:\n              -1px -1px 0 #000,\n              1px -1px 0 #000,\n              -1px 1px 0 #000,\n              1px 1px 0 #000;*/\n}\napp-groupinfo .leaders-list {\n  max-height: 30vh;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2dyb3VwL2dyb3VwaW5mby9ncm91cGluZm8ucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9ncm91cC9ncm91cGluZm8vZ3JvdXBpbmZvLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtBQ0FKO0FER0U7RUFDRSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0E7Ozs7OEJBQUE7QUNHSjtBRElFO0VBQ0UsZ0JBQUE7QUNGSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2dyb3VwL2dyb3VwaW5mby9ncm91cGluZm8ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWdyb3VwaW5mbyB7XG4gIC5kZWZhdWx0LWJhY2tncm91bmQge1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuZGVmYXVsdC10aXRsZSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDIuMGVtO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHRoaW47XG4gICAgLyogICAgdGV4dC1zaGFkb3c6XG4gICAgICAgICAgICAgICAgLTFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgICAxcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAgICAgLTFweCAxcHggMCAjMDAwLFxuICAgICAgICAgICAgICAgIDFweCAxcHggMCAjMDAwOyovXG4gIH1cblxuICAubGVhZGVycy1saXN0IHtcbiAgICBtYXgtaGVpZ2h0OiAzMHZoO1xuICB9XG5cbiAgLm1lbWJlcnMtbGlzdCB7XG4gICAgLy9tYXgtaGVpZ2h0OiA0MHZoO1xuICB9XG59XG4iLCJhcHAtZ3JvdXBpbmZvIC5kZWZhdWx0LWJhY2tncm91bmQge1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgbWluLWhlaWdodDogMTUwcHg7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWdyb3VwaW5mbyAuZGVmYXVsdC10aXRsZSB7XG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyZW07XG4gIGNvbG9yOiAjZmZmO1xuICAtd2Via2l0LXRleHQtc3Ryb2tlOiB0aGluO1xuICAvKiAgICB0ZXh0LXNoYWRvdzpcbiAgICAgICAgICAgICAgLTFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgICAtMXB4IDFweCAwICMwMDAsXG4gICAgICAgICAgICAgIDFweCAxcHggMCAjMDAwOyovXG59XG5hcHAtZ3JvdXBpbmZvIC5sZWFkZXJzLWxpc3Qge1xuICBtYXgtaGVpZ2h0OiAzMHZoO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/group/groupinfo/groupinfo.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/group/groupinfo/groupinfo.page.ts ***!
  \*********************************************************/
/*! exports provided: GroupinfoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupinfoPage", function() { return GroupinfoPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../connect/invitetoconnect/invitetoconnect.page */ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.ts");
/* harmony import */ var _editgroupmember_editgroupmember_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../editgroupmember/editgroupmember.page */ "./src/app/pages/group/editgroupmember/editgroupmember.page.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic-native/call-number/ngx */ "./node_modules/@ionic-native/call-number/ngx/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic-native/badge/ngx */ "./node_modules/@ionic-native/badge/ngx/index.js");
/* harmony import */ var _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic-native/speech-recognition/ngx */ "./node_modules/@ionic-native/speech-recognition/ngx/index.js");
/* harmony import */ var _group_popover_group_popover_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../group-popover/group-popover.page */ "./src/app/pages/group/group-popover/group-popover.page.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
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




















var GroupinfoPage = /** @class */ (function () {
    function GroupinfoPage(zone, router, location, electronService, cache, storage, badge, platform, geolocation, callNumber, speechRecognition, toastCtrl, actionSheetCtrl, alertCtrl, modalCtrl, popoverCtrl, authService, groupService, userData, chatService, momentService) {
        var _this = this;
        this.zone = zone;
        this.router = router;
        this.location = location;
        this.electronService = electronService;
        this.cache = cache;
        this.storage = storage;
        this.badge = badge;
        this.platform = platform;
        this.geolocation = geolocation;
        this.callNumber = callNumber;
        this.speechRecognition = speechRecognition;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.authService = authService;
        this.groupService = groupService;
        this.userData = userData;
        this.chatService = chatService;
        this.momentService = momentService;
        this.groupLoaded = false;
        // about
        this.joinGroupTag = true;
        // members
        this.members = [];
        this.searchKeyword = '';
        this.leaderIds = [];
        this.editMemberTag = false;
        this.membersPageNum = 0;
        this.membersReachedEnd = false;
        this.subscriptions = {};
        this.refreshGroupHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setup();
                return [2 /*return*/];
            });
        }); };
        this.closeGroupInfoHandler = function (res) {
            if (res && res.type === 'close group view' && res.data && _this.group) {
                if (_this.modalPage && res.data._id === _this.group._id) {
                    _this.closeModal(true);
                }
            }
        };
    }
    GroupinfoPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.refreshGroupHandler);
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.closeGroupInfoHandler);
                return [2 /*return*/];
            });
        });
    };
    GroupinfoPage.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.propIndex = this.chatService.currentChatProps.length - 1;
                        return [4 /*yield*/, this.groupService.loadGroupProfile(this.chatService.currentChatProps[this.propIndex].group._id)];
                    case 1:
                        _a = __read.apply(void 0, [_e.sent(), 1]), this.chatService.currentChatProps[this.propIndex].group = _a[0];
                        this.groupLoaded = true;
                        this.setTag();
                        this.leaderIds = [];
                        //check if the current user is a leader
                        this.leaderIds = this.chatService.currentChatProps[this.propIndex].group.leaders.map(function (c) { return c._id; });
                        _b = this;
                        _c = (this.leaderIds.indexOf(this.userData.user._id) > -1);
                        if (_c) return [3 /*break*/, 5];
                        if (!this.chatService.currentChatProps[this.propIndex].group.churchId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userData.hasAdminAccess(this.chatService.currentChatProps[this.propIndex].group.churchId)];
                    case 2:
                        _d = _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _d = false;
                        _e.label = 4;
                    case 4:
                        _c = (_d);
                        _e.label = 5;
                    case 5:
                        _b.editMemberTag = (_c);
                        this.reloadDirectory();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupinfoPage.prototype.seeUserInfo = function (event, recipient) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal, closeMessage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!recipient._id) return [3 /*break*/, 5];
                        if (!(!this.modalPage && this.platform.width() >= 768)) return [3 /*break*/, 1];
                        this.router.navigate(['/app/myconversations/person/' + recipient._id], { replaceUrl: false });
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.modalCtrl.create({ component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_4__["ShowrecipientinfoPage"], componentProps: { recipient: recipient, modalPage: true } })];
                    case 2:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, recipientModal.onDidDismiss()];
                    case 4:
                        closeMessage = (_a.sent()).data;
                        if (closeMessage) {
                            setTimeout(function () {
                                _this.closeModal(true);
                            }, 500); // need to give one sec delay for modalCtrl to clear up the previous modal box
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // about page
    GroupinfoPage.prototype.setTag = function () {
        var _this = this;
        this.joinGroupTag = !this.userData.user.groups.find(function (group) { return group._id === _this.chatService.currentChatProps[_this.propIndex].group._id; });
    };
    GroupinfoPage.prototype.joinGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, alert_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userData.joinGroup(this.chatService.currentChatProps[this.propIndex].group)];
                    case 1:
                        data = _a.sent();
                        if (data === "cancel")
                            return [2 /*return*/];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                message: 'You have joined ' + this.chatService.currentChatProps[this.propIndex].group.name + (this.chatService.currentChatProps[this.propIndex].group.board ? '. You can access its board posts via the Board page.' : '.'),
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () {
                                                _this.authService.refreshGroupStatus({ conversationId: _this.chatService.currentChatProps[_this.propIndex].group.conversation, data: _this.chatService.currentChatProps[_this.propIndex].group });
                                            });
                                        } }],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        this.noNetworkConnection();
                        console.log("failed to add to My Community");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // members
    GroupinfoPage.prototype.reloadDirectory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () {
                    _this.infiniteScroll.disabled = false;
                    _this.membersReachedEnd = false;
                    _this.members = [];
                    _this.membersPageNum = 0;
                    _this.listgroupmembers({ target: _this.infiniteScroll });
                    _this.loadLegacyGroupData();
                }, 100);
                return [2 /*return*/];
            });
        });
    };
    GroupinfoPage.prototype.listgroupmembers = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.membersPageNum++;
                        if (!!this.membersReachedEnd) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.groupService.loadGroupMembers(this.chatService.currentChatProps[this.propIndex].group._id, this.searchKeyword, this.membersPageNum)];
                    case 1:
                        results = _a.sent();
                        event.target.complete();
                        if (!(results.members.length + results.pending_members.length)) {
                            this.membersReachedEnd = true;
                            event.target.disabled = true;
                        }
                        else {
                            if (results.members && results.members.length) {
                                results.members.forEach(function (member) {
                                    if (_this.leaderIds.indexOf(member._id) > -1) { // a leader
                                        member.role = 'Leader';
                                        member.badge = true;
                                        member.icons = ["phone-portrait"];
                                    }
                                    else {
                                        member.role = "Member";
                                        member.icons = ["phone-portrait"];
                                    }
                                    member.name = member.first_name + ' ' + member.last_name;
                                    _this.members.push(member);
                                });
                            }
                            if (results.pending_members && results.pending_members.length) {
                                results.pending_members.forEach(function (pending_member) {
                                    if (pending_member.user) {
                                        pending_member.role = "Pending";
                                        pending_member.badge = true;
                                    }
                                    else {
                                        pending_member.icons = [];
                                        pending_member.role = "Contact";
                                    }
                                    // set up the display badge
                                    if (pending_member.emails && pending_member.emails.length) {
                                        pending_member.icons.push("mail");
                                    }
                                    if (pending_member.mobile_phones && pending_member.mobile_phones.length) {
                                        pending_member.icons.push("text");
                                    }
                                    if (pending_member.home_phones && pending_member.home_phones.length) {
                                        pending_member.icons.push("call");
                                    }
                                    if (pending_member.work_phones && pending_member.work_phones.length) {
                                        pending_member.icons.push("call");
                                    }
                                    if (!_this.editMemberTag) { //if not a leader, delete personal info
                                        delete pending_member.emails;
                                        delete pending_member.mobile_phones;
                                        delete pending_member.home_phones;
                                        delete pending_member.work_phones;
                                    }
                                    _this.members.push(pending_member);
                                });
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        event.target.complete();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GroupinfoPage.prototype.loadLegacyGroupData = function () {
        var _this = this;
        var uniqueNames = this.members.map(function (c) { return c.name; });
        //this is to take care of old wee pending members
        if (this.chatService.currentChatProps[this.propIndex].group.pending_members) {
            this.chatService.currentChatProps[this.propIndex].group.pending_members.forEach(function (pending_member) {
                if (pending_member.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) > -1) {
                    pending_member.role = "Pending";
                    pending_member.badge = true;
                    var index = uniqueNames.indexOf(pending_member.name);
                    if (index < 0 && pending_member.name) {
                        _this.members.push(pending_member); //push the member into the members array
                    }
                    else {
                        //ignore if it is already represented in the Pending collection
                    }
                }
            });
        }
        if (this.chatService.currentChatProps[this.propIndex].group.pending_email_members) {
            this.chatService.currentChatProps[this.propIndex].group.pending_email_members.forEach(function (contact) {
                if (contact.name.toLowerCase().indexOf(_this.searchKeyword.toLowerCase()) > -1) {
                    contact.icons = [];
                    contact.role = "Contact";
                    if (contact.email) {
                        contact.emails = [contact.email];
                        contact.icons.push("mail");
                    }
                    if (contact.mobile_phone) {
                        contact.mobile_phones = [contact.mobile_phone];
                        if (contact.sms_opt_in)
                            contact.icons.push('text');
                    }
                    if (contact.mobile_phone || contact.home_phone) {
                        contact.icons.push("call");
                    }
                    if (contact.home_phone) {
                        contact.home_phones = [contact.home_phone];
                    }
                    _this.members.push(contact);
                }
            });
        }
    };
    GroupinfoPage.prototype.presentPopover = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal, closeMessage, popover, closeMessage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!!this.chatService.currentChatProps[this.propIndex].group) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_4__["ShowrecipientinfoPage"],
                                componentProps: { recipient: this.chatService.currentChatProps[this.propIndex].recipient, modalPage: true }
                            })];
                    case 1:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, recipientModal.onDidDismiss()];
                    case 3:
                        closeMessage = (_a.sent()).data;
                        if (closeMessage) {
                            console.log("close modal");
                            setTimeout(function () {
                                _this.closeModal(true);
                            }, 500); // need to give one sec delay for modalCtrl to clear up the previous modal box
                        }
                        return [3 /*break*/, 8];
                    case 4:
                        if (!this.chatService.currentChatProps[this.propIndex].group) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.popoverCtrl.create({
                                component: _group_popover_group_popover_page__WEBPACK_IMPORTED_MODULE_17__["GroupPopoverPage"],
                                componentProps: { group: this.chatService.currentChatProps[this.propIndex].group },
                                event: event,
                                backdropDismiss: true,
                                cssClass: 'level-15'
                            })];
                    case 5:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, popover.onDidDismiss()];
                    case 7:
                        closeMessage = (_a.sent()).data;
                        if (closeMessage) {
                            console.log("close group modal");
                            setTimeout(function () {
                                _this.closeModal(true);
                            }, 500); // need to give one sec delay for modalCtrl to clear up the previous modal box
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    GroupinfoPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.reloadDirectory();
    };
    GroupinfoPage.prototype.cancelSearch = function (event) {
        event.stopPropagation();
        this.searchKeyword = '';
        this.reloadDirectory();
    };
    GroupinfoPage.prototype.editMember = function (event, member) {
        return __awaiter(this, void 0, void 0, function () {
            var editgroupMemberModal, refreshNeeded, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _editgroupmember_editgroupmember_page__WEBPACK_IMPORTED_MODULE_6__["EditgroupmemberPage"], componentProps: { member: member, group: this.chatService.currentChatProps[this.propIndex].group } })];
                    case 1:
                        editgroupMemberModal = _a.sent();
                        return [4 /*yield*/, editgroupMemberModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, editgroupMemberModal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (!refreshNeeded) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.groupService.loadGroupProfile(this.chatService.currentChatProps[this.propIndex].group._id)];
                    case 4:
                        results = _a.sent();
                        this.chatService.currentChatProps[this.propIndex].group = results[0];
                        this.leaderIds = this.chatService.currentChatProps[this.propIndex].group.leaders.map(function (c) { return c._id; });
                        this.reloadDirectory();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GroupinfoPage.prototype.addMemberActionSheet = function () {
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
                        return [4 /*yield*/, this.actionSheetCtrl.create({
                                header: 'Invite a Friend',
                                buttons: buttons,
                                cssClass: 'level-15'
                            })];
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
    GroupinfoPage.prototype.invitePage = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, invitePage, refreshNeeded;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_5__["InvitetoconnectPage"], componentProps: { type: type, group: this.chatService.currentChatProps[this.propIndex].group } })];
                    case 1:
                        invitePage = _b.sent();
                        return [4 /*yield*/, invitePage.present()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, invitePage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_b.sent()).data;
                        if (!refreshNeeded) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.groupService.loadGroupProfile(this.chatService.currentChatProps[this.propIndex].group._id)];
                    case 4:
                        _a = __read.apply(void 0, [_b.sent(), 1]), this.chatService.currentChatProps[this.propIndex].group = _a[0];
                        this.reloadDirectory();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GroupinfoPage.prototype.initializeCall = function (number) {
        this.callNumber.callNumber(number, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    GroupinfoPage.prototype.startVideoChat = function () {
        // only PWA needs to expand chat view. native app will show the native Jitsi view
        if (this.modalPage && !this.platform.is('cordova')) {
            this.expandChatView(true);
        }
        else {
            this.chatService.toggleVideoChat({
                videoChatRoomId: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId,
                videoChatRoomSubject: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].group.name,
                channelLastN: '6',
                startWithAudioMuted: false,
                startWithVideoMuted: false
            });
        }
    };
    GroupinfoPage.prototype.expandChatView = function (startVideoChat) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.chatService.currentChatProps.push(this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]);
                this.closeModal(false);
                setTimeout(function () {
                    _this.userData.refreshMyConversations({ action: 'reload chat view' });
                }, 500);
                if (startVideoChat) {
                    setTimeout(function () {
                        _this.chatService.toggleVideoChat({
                            videoChatRoomId: _this.chatService.currentChatProps[_this.chatService.currentChatProps.length - 1].conversationId,
                            channelLastN: '6',
                            startWithAudioMuted: false,
                            startWithVideoMuted: false
                        });
                    }, 1000);
                }
                return [2 /*return*/];
            });
        });
    };
    GroupinfoPage.prototype.noNetworkConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var networkAlert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'No Internet this.connection',
                            message: 'Please check your internet this.connection.',
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
    GroupinfoPage.prototype.closeModal = function (refreshNeeded) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (this.modalPage) {
                        this.modalCtrl.dismiss(refreshNeeded);
                    }
                    else {
                        this.router.navigate(['/app/myconversations/chat'], { skipLocationChange: true });
                    }
                }
                catch (err) {
                    console.log(err);
                }
                return [2 /*return*/];
            });
        });
    };
    GroupinfoPage.prototype.ngOnDestroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subscriptions['refreshGroupStatus'].unsubscribe(this.refreshGroupHandler);
                this.subscriptions['refreshUserStatus'].unsubscribe(this.closeGroupInfoHandler);
                return [2 /*return*/];
            });
        });
    };
    GroupinfoPage.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_18__["Location"] },
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_10__["ElectronService"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_8__["CacheService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_14__["Storage"] },
        { type: _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_15__["Badge"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"] },
        { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_11__["Geolocation"] },
        { type: _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_13__["CallNumber"] },
        { type: _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_16__["SpeechRecognition"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["PopoverController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_19__["Auth"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_1__["Groups"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_2__["Chat"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_12__["Moment"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_9__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["IonInfiniteScroll"])
    ], GroupinfoPage.prototype, "infiniteScroll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GroupinfoPage.prototype, "modalPage", void 0);
    GroupinfoPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-groupinfo',
            template: __importDefault(__webpack_require__(/*! raw-loader!./groupinfo.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/groupinfo/groupinfo.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./groupinfo.page.scss */ "./src/app/pages/group/groupinfo/groupinfo.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_common__WEBPACK_IMPORTED_MODULE_18__["Location"],
            ngx_electron__WEBPACK_IMPORTED_MODULE_10__["ElectronService"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_8__["CacheService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_14__["Storage"],
            _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_15__["Badge"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_11__["Geolocation"],
            _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_13__["CallNumber"],
            _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_16__["SpeechRecognition"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["PopoverController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_19__["Auth"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_1__["Groups"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_2__["Chat"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_12__["Moment"]])
    ], GroupinfoPage);
    return GroupinfoPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~board-communityboard-communityboard-module~connect-myconversations-myconversations-module~gr~8e3a18b1.js.map