(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~board-communityboard-communityboard-module~communities-communities-module~dashboard-dashboar~1ef017ed"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/community-popover/community-popover.page.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/community-popover/community-popover.page.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n  <ion-list class=\"ion-no-padding\">\n    <ion-item class=\"popover-item\" class=\"ion-text-wrap\" [hidden]=\"!joinChurchTag\" (click)=\"joinCommunity()\">Join Community</ion-item>\n    <ion-item class=\"popover-item\" class=\"ion-text-wrap\" (click)=\"invite()\">Invite Friend</ion-item>\n    <ion-item class=\"popover-item\" class=\"ion-text-wrap\" [hidden]=\"!editChurchTag\" (click)=\"editCommunity()\">Edit Community</ion-item>\n    <ion-item class=\"popover-item\" class=\"ion-text-wrap\" [hidden]=\"!leaveChurchTag\" (click)=\"leaveCommunity()\">Leave Community</ion-item>\n  </ion-list>\n</ion-content>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/editcommunity/editcommunity.page.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/editcommunity/editcommunity.page.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>Community Profile</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <ion-list>\n    <form [formGroup]=\"communityForm\">\n      <ion-item-divider *ngIf=\"!community._id?.length\" class=\"ion-text-wrap\">\n        <p>Before you submit a new profile, please search carefully to ensure that the organization has not yet been added.</p>\n      </ion-item-divider>\n      <div class=\"default-background\" [ngStyle]=\"{'background-image': 'url(' + (community.background | background: community._id) + ')'}\"><!-- [ngClass]=\"{ 'opaque' : community.background}\">-->\n        <div class=\"edit-icon\"></div>\n        <div class=\"default-title\">\n          {{communityForm.value.name}}\n        </div>\n        <div *ngIf=\"platform.is('cordova')\" class=\"edit-icon\" (click)=\"editBackground($event)\">\n          <ion-icon name=\"cog\" color=\"primary\"></ion-icon>\n        </div>\n      </div>\n      <ion-item>\n        <ion-label position=\"stacked\">Community Name *</ion-label>\n        <ion-input type=\"text\" formControlName=\"name\"></ion-input>\n      </ion-item>\n      <ion-item class=\"form-error-list\" *ngIf=\"!communityForm.controls.name.pristine && !communityForm.controls.name.valid\">\n        <p class=\"form-error\" slot=\"end\" *ngIf=\"!communityForm.controls.name.pristine && communityForm.controls.name.hasError('required')\">\n          This is a required field.\n        </p>\n      </ion-item>\n      <ion-item-divider class=\"ion-text-wrap\" *ngIf=\"community.short_id\">\n        <p>Community Code is a code you can send to your members to quickly find your community in Restvo.</p>\n      </ion-item-divider>\n      <ion-item *ngIf=\"community.short_id\">\n        <ion-label position=\"stacked\">Community Code: {{community.short_id}}</ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"stacked\">Category *</ion-label>\n        <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"industry\" interface=\"alert\">\n          <ion-select-option *ngFor=\"let industry of industries\" [value]=\"industry._id\" [class.selected]=\"industry.selected\">{{industry.name}}</ion-select-option>\n        </ion-select>\n      </ion-item>\n      <ion-item-divider class=\"ion-text-wrap\">\n        <p>Choose up to 5 keywords, separate by commas, that best describe your organization.</p>\n      </ion-item-divider>\n      <ion-item>\n        <ion-label position=\"stacked\">Keywords</ion-label>\n        <ion-textarea autosize rows=\"1\" [minRows]=\"1\" [maxRows]=\"3\" autocorrect=\"on\" formControlName=\"keywords\" placeholder=\"ex. Advocacy, mercy and justice, worship etc.\" ></ion-textarea>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"stacked\">Email</ion-label>\n        <ion-input type=\"email\" formControlName=\"email\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"stacked\">Phone</ion-label>\n        <ion-input type=\"tel\" formControlName=\"phone\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"stacked\">Website</ion-label>\n        <ion-input type=\"url\" formControlName=\"website\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"stacked\">Social</ion-label>\n        <ion-input type=\"text\" formControlName=\"social\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"stacked\">Street</ion-label>\n        <ion-input type=\"text\" formControlName=\"meeting_street\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"stacked\">City *</ion-label>\n        <ion-input type=\"text\" formControlName=\"meeting_city\"></ion-input>\n      </ion-item>\n      <ion-item class=\"form-error-list\" *ngIf=\"!communityForm.controls.meeting_city.pristine && !communityForm.controls.meeting_city.valid\">\n        <p class=\"form-error\" slot=\"end\" *ngIf=\"!communityForm.controls.meeting_city.pristine && communityForm.controls.meeting_city.hasError('required')\">\n          This is a required field.\n        </p>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"stacked\">State *</ion-label>\n        <ion-input type=\"text\" formControlName=\"meeting_state\"></ion-input>\n      </ion-item>\n      <ion-item class=\"form-error-list\" *ngIf=\"!communityForm.controls.meeting_state.pristine && !communityForm.controls.meeting_state.valid\">\n        <p class=\"form-error\" slot=\"end\" *ngIf=\"!communityForm.controls.meeting_state.pristine && communityForm.controls.meeting_state.hasError('required')\">\n          This is a required field.\n        </p>\n      </ion-item>\n      <ion-item>\n        <ion-label position=\"stacked\">Country *</ion-label>\n        <ion-select [interfaceOptions]=\"{cssClass: 'level-15'}\" formControlName=\"meeting_country\">\n          <ion-select-option *ngFor=\"let country of countries\" [value]=\"country.name\" [class.selected]=\"country.selected\">{{country.name}}</ion-select-option>\n        </ion-select>\n      </ion-item>\n      <ion-item class=\"form-error-list\" *ngIf=\"!communityForm.controls.meeting_country.pristine && !communityForm.controls.meeting_country.valid\">\n        <p class=\"form-error\" slot=\"end\" *ngIf=\"!communityForm.controls.meeting_country.pristine && communityForm.controls.meeting_country.hasError('required')\">\n          This is a required field.\n        </p>\n      </ion-item>\n    </form>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-button expand=\"full\" color=\"primary\" shape=\"round\" (click)=\"clickSaveButton()\" [disabled]=\"!communityForm.valid\">Save</ion-button>\n  </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/showcommunity/showcommunity.page.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/showcommunity/showcommunity.page.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button *ngIf=\"modalPage\" (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n      <ion-back-button *ngIf=\"!modalPage\" (click)=\"destroyPlayers(null)\" defaultHref=\"/map\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{community.name}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"userData && userData.user\" (click)=\"presentPopover($event)\">\n        <ion-icon ios=\"ellipsis-horizontal\" md=\"ellipsis-vertical\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"default-background\" [ngStyle]=\"{'background-image': 'url(' + (community.background | background: community._id) + ')'}\"><!-- [ngClass]=\"{ 'opaque' : community.background}\">-->\n    <div class=\"default-title\">\n      {{community.name}}\n    </div>\n  </div>\n  <ion-list>\n    <ion-item lines=\"none\" color=\"grey\">About</ion-item>\n    <ion-item *ngIf=\"community.hasOwnProperty('verified') && !community.verified\">\n      <ion-label class=\"label-title\">Status</ion-label>\n      <ion-label class=\"community-detail\" class=\"ion-text-wrap\">Pending Approval</ion-label>\n    </ion-item>\n    <ion-item *ngIf=\"community.industry\">\n      <ion-label class=\"label-title\">Category</ion-label>\n      <ion-label class=\"community-detail\" class=\"ion-text-wrap\">{{community.industry['en-US'].value[0]}}</ion-label>\n    </ion-item>\n    <ion-item *ngIf=\"community.industry && community.industry._id === '5a83f63925d7c040d3625938' && community.denomination\">\n      <ion-label class=\"label-title\">Denomination</ion-label>\n      <ion-label class=\"community-detail\" class=\"ion-text-wrap\">{{community.denomination}}</ion-label>\n    </ion-item>\n    <ion-item *ngIf=\"community.meeting_location\">\n      <ion-label class=\"label-title\">Address</ion-label>\n      <ion-label class=\"community-detail\" class=\"ion-text-wrap\">{{community.meeting_location.street}} {{community.meeting_location.city}} {{community.meeting_location.state}} {{community.meeting_location.zip}}</ion-label>\n    </ion-item>\n    <ion-item *ngIf=\"community.keywords\">\n      <ion-label class=\"label-title\" >Tags</ion-label>\n      <ion-label class=\"community-detail\" class=\"ion-text-wrap\">{{community.keywords}}</ion-label>\n    </ion-item>\n    <ion-item *ngIf=\"community.website\">\n      <ion-label class=\"label-title\" >Website</ion-label>\n      <ion-label class=\"community-detail\" class=\"ion-text-wrap\">{{community.website}}</ion-label>\n    </ion-item>\n    <ion-item *ngIf=\"community.social\">\n      <ion-label class=\"label-title\" >Social</ion-label>\n      <ion-label class=\"community-detail\" class=\"ion-text-wrap\">{{community.social}}</ion-label>\n    </ion-item>\n    <ion-item *ngIf=\"community.email\">\n      <ion-label class=\"label-title\" >Email</ion-label>\n      <ion-label class=\"community-detail\" class=\"ion-text-wrap\">{{community.email}}</ion-label>\n    </ion-item>\n    <!--<ion-item *ngIf=\"community.short_id\">\n      <ion-label class=\"label-title\" >Code</ion-label>\n      <ion-label class=\"community-detail\" class=\"ion-text-wrap\">{{community.short_id}}</ion-label>\n    </ion-item>-->\n    <ion-item lines=\"none\" color=\"grey\">Administrators</ion-item>\n    <ion-item *ngFor=\"let admin of community.admins\" (click)=\"seeUserInfo($event, admin)\">\n      <ion-avatar slot=\"start\">\n        <img *ngIf=\"admin.avatar\" [src]=\"admin.avatar\"/>\n        <img *ngIf=\"!admin.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n      </ion-avatar>\n      {{admin.first_name}} {{admin.last_name}}\n    </ion-item>\n    <ion-item lines=\"none\" color=\"grey\">Community Topics</ion-item>\n    <ion-list>\n      <ion-item lines=\"none\" class=\"community-board\" *ngFor=\"let board of community.boards; index as i\">\n        <ion-avatar slot=\"start\">\n          <img [src]=\"board.background | background: board._id\"/>\n        </ion-avatar>\n        <ion-input class=\"board-title\" [(ngModel)]=\"board.name\" (blur)=\"editBoard($event, board)\" [disabled]=\"!currentPageAdminStatus\"></ion-input>\n        <ion-icon slot=\"end\" [hidden]=\"!currentPageAdminStatus || community.boards?.length < 2\" name=\"trash\" color=\"lightgrey\" (click)=\"deleteBoard($event, board)\"></ion-icon>\n      </ion-item>\n    </ion-list>\n    <!--Add Board-->\n    <ion-item *ngIf=\"currentPageAdminStatus\" lines=\"none\">\n      <ion-input class=\"board-title\" placeholder=\"New Board Name\" [(ngModel)]=\"newBoardName\"></ion-input>\n      <ion-buttons slot=\"end\">\n        <ion-button shape=\"round\" fill=\"solid\" color=\"primary\" (click)=\"addBoard()\" [disabled]=\"!newBoardName?.length\">Add</ion-button>\n      </ion-buttons>\n    </ion-item>\n    <ion-item lines=\"none\" color=\"grey\">Community Actions</ion-item>\n    <div *ngIf=\"userData && userData.user\">\n      <ion-row *ngIf=\"!community.verified && (['owner','admin','staff']).indexOf(userData.user.role) > -1\"><ion-col class=\"padding-horizontal\"><ion-button shape=\"round\" expand=\"full\" (click)=\"approveCommunity()\" color='tertiary' >Approve Community</ion-button></ion-col></ion-row>\n      <ion-row *ngIf=\"community.verified && (['owner','admin','staff']).indexOf(userData.user.role) > -1\"><ion-col class=\"padding-horizontal\"><ion-button shape=\"round\" expand=\"full\" (click)=\"unlistCommunity()\" color='warning' >Unlist Community</ion-button></ion-col></ion-row>\n    </div>\n      <ion-row><ion-col class=\"padding-horizontal\"><ion-button [hidden]=\"!joinChurchTag\" shape=\"round\" expand=\"full\" (click)=\"joinChurch()\" color='primary' >Join Community</ion-button></ion-col></ion-row>\n      <ion-row><ion-col class=\"padding-horizontal\"><ion-button [hidden]=\"!editChurchTag\" shape=\"round\" expand=\"full\" (click)=\"editChurch()\" color='primary' >Edit Community Profile</ion-button></ion-col></ion-row>\n      <ion-row><ion-col class=\"padding-horizontal\"><ion-button [hidden]=\"!leaveChurchTag\" shape=\"round\" expand=\"full\" (click)=\"leaveChurch()\" color='primary' [disabled]=\"community._id === '5ab62be8f83e2c1a8d41f894'\">Leave Community</ion-button></ion-col></ion-row>\n  </ion-list>\n\n</ion-content>\n");

/***/ }),

/***/ "./src/app/pages/community/community-popover/community-popover.page.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/community/community-popover/community-popover.page.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-community-popover ion-content {\n  --background: var(--ion-color-primary);\n}\napp-community-popover .popover-item {\n  color: var(--ion-color-secondary);\n  --background: var(--ion-color-primary);\n  font-size: small;\n  text-align: center;\n}\napp-community-popover .item-divider {\n  height: 1px;\n  width: 100%;\n  --background: var(--ion-color-secondary);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2NvbW11bml0eS9jb21tdW5pdHktcG9wb3Zlci9jb21tdW5pdHktcG9wb3Zlci5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2NvbW11bml0eS9jb21tdW5pdHktcG9wb3Zlci9jb21tdW5pdHktcG9wb3Zlci5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUU7RUFDRSxzQ0FBQTtBQ0RKO0FESUU7RUFDRSxpQ0FBQTtFQUNBLHNDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQ0ZKO0FES0U7RUFDRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLHdDQUFBO0FDSEoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9jb21tdW5pdHkvY29tbXVuaXR5LXBvcG92ZXIvY29tbXVuaXR5LXBvcG92ZXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWNvbW11bml0eS1wb3BvdmVyIHtcblxuICBpb24tY29udGVudCB7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cblxuICAucG9wb3Zlci1pdGVtIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgZm9udC1zaXplOiBzbWFsbDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICAuaXRlbS1kaXZpZGVyIHtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICB9XG59IiwiYXBwLWNvbW11bml0eS1wb3BvdmVyIGlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5hcHAtY29tbXVuaXR5LXBvcG92ZXIgLnBvcG92ZXItaXRlbSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmFwcC1jb21tdW5pdHktcG9wb3ZlciAuaXRlbS1kaXZpZGVyIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIHdpZHRoOiAxMDAlO1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/community/community-popover/community-popover.page.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/community/community-popover/community-popover.page.ts ***!
  \*****************************************************************************/
/*! exports provided: CommunityPopoverPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommunityPopoverPage", function() { return CommunityPopoverPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../editcommunity/editcommunity.page */ "./src/app/pages/community/editcommunity/editcommunity.page.ts");
/* harmony import */ var _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../connect/invitetoconnect/invitetoconnect.page */ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
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







var CommunityPopoverPage = /** @class */ (function () {
    function CommunityPopoverPage(platform, cache, actionSheetCtrl, alertCtrl, modalCtrl, popoverCtrl, resourceService, userData) {
        this.platform = platform;
        this.cache = cache;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.resourceService = resourceService;
        this.userData = userData;
        this.joinChurchTag = true;
        this.editChurchTag = false;
        this.leaveChurchTag = false;
    }
    CommunityPopoverPage.prototype.ngOnInit = function () {
        if (this.community) {
            this.setTag();
        }
    };
    CommunityPopoverPage.prototype.setTag = function () {
        var _this = this;
        this.community.members.forEach(function (member) {
            if (member._id == _this.userData.user._id) {
                _this.joinChurchTag = false;
                _this.editChurchTag = false;
                _this.leaveChurchTag = true;
            }
        });
        this.community.admins.forEach(function (admin) {
            if (admin._id == _this.userData.user._id) {
                _this.joinChurchTag = false;
                _this.editChurchTag = true;
                _this.leaveChurchTag = true;
                _this.userData.currentCommunityAdminStatus = true;
            }
        });
    };
    CommunityPopoverPage.prototype.invite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var buttons, actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.popoverCtrl.dismiss();
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
                        return [4 /*yield*/, this.actionSheetCtrl.create({ header: 'Invite a Friend', buttons: buttons, cssClass: 'level-10' })];
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
    CommunityPopoverPage.prototype.invitePage = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var invitePage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_5__["InvitetoconnectPage"], componentProps: { type: type } })];
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
    CommunityPopoverPage.prototype.joinCommunity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, alert_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.popoverCtrl.dismiss();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.userData.joinCommunity(this.community)];
                    case 2:
                        data = _a.sent();
                        if (data === "cancel")
                            return [2 /*return*/];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                message: 'Added to My Community.',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            _this.popoverCtrl.dismiss();
                                        } }],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.log("failed to add to My Community");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CommunityPopoverPage.prototype.leaveCommunity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.popoverCtrl.dismiss();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Warning',
                                message: 'Are you sure you want to leave this community? You will also be removed from all its groups.',
                                buttons: [{ text: 'Yes',
                                        handler: function () {
                                            var navTransition = alert.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: 
                                                        //Remove from database
                                                        return [4 /*yield*/, this.userData.leaveCommunity(this.community._id)];
                                                        case 1:
                                                            //Remove from database
                                                            _a.sent();
                                                            this.userData.refreshMyConversations({ action: 'reload', conversationId: 'all' });
                                                            this.userData.refreshUserStatus({ type: 'refresh community board page' });
                                                            this.userData.refreshUserStatus({ type: 'change aux data' });
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } },
                                    { text: 'Cancel' }],
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
    CommunityPopoverPage.prototype.editCommunity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var industries;
            var _this = this;
            return __generator(this, function (_a) {
                industries = [];
                this.resourceService.load('en-US', "Industry").subscribe(function (fields) { return __awaiter(_this, void 0, void 0, function () {
                    var i, editCommunityModal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                for (i = 0; i < fields.length; i++) {
                                    industries.push({ _id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false });
                                }
                                this.popoverCtrl.dismiss();
                                return [4 /*yield*/, this.modalCtrl.create({
                                        component: _editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_4__["EditcommunityPage"],
                                        componentProps: { community: this.community, industries: industries }
                                    })];
                            case 1:
                                editCommunityModal = _a.sent();
                                return [4 /*yield*/, editCommunityModal.present()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { return __awaiter(_this, void 0, void 0, function () {
                    var networkAlert;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("failed to load resources");
                                return [4 /*yield*/, this.alertCtrl.create({
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
                }); });
                return [2 /*return*/];
            });
        });
    };
    CommunityPopoverPage.prototype.close = function () {
        this.popoverCtrl.dismiss();
    };
    CommunityPopoverPage.prototype.noNetworkConnection = function () {
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
    CommunityPopoverPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_6__["Resource"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CommunityPopoverPage.prototype, "community", void 0);
    CommunityPopoverPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-community-popover',
            template: __importDefault(__webpack_require__(/*! raw-loader!./community-popover.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/community-popover/community-popover.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./community-popover.page.scss */ "./src/app/pages/community/community-popover/community-popover.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_6__["Resource"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserData"]])
    ], CommunityPopoverPage);
    return CommunityPopoverPage;
}());



/***/ }),

/***/ "./src/app/pages/community/editcommunity/editcommunity.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/pages/community/editcommunity/editcommunity.page.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-editcommunity .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-editcommunity .opaque {\n  opacity: 0.6;\n}\napp-editcommunity .edit-icon {\n  width: 32px;\n  display: table-cell;\n  text-align: right;\n  vertical-align: bottom;\n  padding: 5px;\n}\napp-editcommunity .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 2em;\n  color: #fff;\n  -webkit-text-stroke: thin;\n  /*    text-shadow:\n              -1px -1px 0 #000,\n              1px -1px 0 #000,\n              -1px 1px 0 #000,\n              1px 1px 0 #000;*/\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2NvbW11bml0eS9lZGl0Y29tbXVuaXR5L2VkaXRjb21tdW5pdHkucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9jb21tdW5pdHkvZWRpdGNvbW11bml0eS9lZGl0Y29tbXVuaXR5LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtBQ0RKO0FESUU7RUFDRSxZQUFBO0FDRko7QURLRTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0FDSEo7QURNRTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDSjs7Ozs4QkFBQTtBQ0FBIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvY29tbXVuaXR5L2VkaXRjb21tdW5pdHkvZWRpdGNvbW11bml0eS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtZWRpdGNvbW11bml0eSB7XG5cbiAgLmRlZmF1bHQtYmFja2dyb3VuZCB7XG4gICAgZGlzcGxheTogdGFibGU7XG4gICAgbWluLWhlaWdodDogMTUwcHg7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5vcGFxdWUge1xuICAgIG9wYWNpdHk6IDAuNjtcbiAgfVxuXG4gIC5lZGl0LWljb24ge1xuICAgIHdpZHRoOiAzMnB4O1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgICBwYWRkaW5nOiA1cHg7XG4gIH1cblxuICAuZGVmYXVsdC10aXRsZSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDIuMGVtO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHRoaW47XG4vKiAgICB0ZXh0LXNoYWRvdzpcbiAgICAgICAgICAgIC0xcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAxcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAtMXB4IDFweCAwICMwMDAsXG4gICAgICAgICAgICAxcHggMXB4IDAgIzAwMDsqL1xuICB9XG59XG4iLCJhcHAtZWRpdGNvbW11bml0eSAuZGVmYXVsdC1iYWNrZ3JvdW5kIHtcbiAgZGlzcGxheTogdGFibGU7XG4gIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1lZGl0Y29tbXVuaXR5IC5vcGFxdWUge1xuICBvcGFjaXR5OiAwLjY7XG59XG5hcHAtZWRpdGNvbW11bml0eSAuZWRpdC1pY29uIHtcbiAgd2lkdGg6IDMycHg7XG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xuICBwYWRkaW5nOiA1cHg7XG59XG5hcHAtZWRpdGNvbW11bml0eSAuZGVmYXVsdC10aXRsZSB7XG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyZW07XG4gIGNvbG9yOiAjZmZmO1xuICAtd2Via2l0LXRleHQtc3Ryb2tlOiB0aGluO1xuICAvKiAgICB0ZXh0LXNoYWRvdzpcbiAgICAgICAgICAgICAgLTFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgICAtMXB4IDFweCAwICMwMDAsXG4gICAgICAgICAgICAgIDFweCAxcHggMCAjMDAwOyovXG59Il19 */");

/***/ }),

/***/ "./src/app/pages/community/editcommunity/editcommunity.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/community/editcommunity/editcommunity.page.ts ***!
  \*********************************************************************/
/*! exports provided: EditcommunityPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditcommunityPage", function() { return EditcommunityPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
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








var EditcommunityPage = /** @class */ (function () {
    function EditcommunityPage(cache, formBuilder, alertCtrl, actionSheetCtrl, modalCtrl, platform, churchService, awsService, userData) {
        this.cache = cache;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.churchService = churchService;
        this.awsService = awsService;
        this.userData = userData;
        this.new_profile = false;
        this.countries = [];
        this.country_list = ["United States", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, US", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
        this.refreshNeeded = false;
        /*this.community = this.navParams.get('community');
        this.industries = this.navParams.get('industries');*/
    }
    EditcommunityPage.prototype.ngOnInit = function () {
        if (!this.community) {
            console.log("create a new profile!");
            this.new_profile = true;
            this.community = { _id: '', name: '', industry: { _id: '' }, background: '', email: '', phone: '', website: '', social: '', keywords: '', meeting_location: { street: '', city: '', state: '', country: '' } };
        }
        for (var i = 0; i < this.country_list.length; i++) {
            this.countries.push({ name: this.country_list[i], selected: false });
        }
        console.log('industry id', this.community.industry._id);
        this.communityForm = this.formBuilder.group({
            _id: [this.community._id],
            name: [this.community.name, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            industry: [this.community.industry._id, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            background: [this.community.background],
            email: [this.community.email],
            phone: [this.community.phone],
            website: [this.community.website],
            social: [this.community.social],
            keywords: [this.community.keywords],
            meeting_street: [this.community.meeting_location.street],
            meeting_city: [this.community.meeting_location.city, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            meeting_state: [this.community.meeting_location.state, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            meeting_country: [this.community.meeting_location.country, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    EditcommunityPage.prototype.clickSaveButton = function () {
        var community = this.communityForm.value;
        community.meeting_location = {
            street: community.meeting_street,
            city: community.meeting_city,
            state: community.meeting_state,
            country: community.meeting_country
        };
        if (this.new_profile) {
            this.createChurchProfile(community);
        }
        else {
            this.updateChurchProfile(community);
        }
    };
    EditcommunityPage.prototype.createChurchProfile = function (community) {
        return __awaiter(this, void 0, void 0, function () {
            var result, alert_1, err_1, alert_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 7]);
                        return [4 /*yield*/, this.churchService.createChurchProfile(community)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Profile Received',
                                message: 'This community profile will undergo a review process that usually takes 1-2 days. We may contact you for further information about this submission. You can begin to set up groups. Once your submission is approved, it will be listed in the directory and we will notify you with an email.',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () {
                                                _this.modalCtrl.dismiss(true);
                                            });
                                        } }],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 3:
                        _a.sent();
                        console.log(result);
                        return [3 /*break*/, 7];
                    case 4:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Name Already Used',
                                message: this.community.name + ' has already been registered by another organization. Please enter a different name.',
                                buttons: [{ text: 'Ok' }],
                                cssClass: 'level-15'
                            })];
                    case 5:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    EditcommunityPage.prototype.updateChurchProfile = function (community) {
        return __awaiter(this, void 0, void 0, function () {
            var result, alert_3, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //no need to send these fields
                        delete community.financial_admins;
                        delete community.admins;
                        delete community.moderators;
                        delete community.members;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.churchService.updateChurchProfile(community)];
                    case 2:
                        result = _a.sent();
                        this.userData.refreshUserStatus({ type: 'refresh community' });
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                message: 'Community profile updated.',
                                cssClass: 'level-15',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_3.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.userData.load()];
                                                        case 1:
                                                            _a.sent();
                                                            this.modalCtrl.dismiss(true);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } }]
                            })];
                    case 3:
                        alert_3 = _a.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 4:
                        _a.sent();
                        console.log(result);
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EditcommunityPage.prototype.editBackground = function (event) {
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
                                    _this.selectPhotoFromDeviceAndUpload(event);
                                }
                            }
                        ];
                        if (this.community.background) {
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
                        actionSheet.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditcommunityPage.prototype.selectPhotoFromDeviceAndUpload = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result, Camera, image, compressed, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        result = void 0;
                        if (!this.platform.is('cordova')) return [3 /*break*/, 3];
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_7__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_7__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_7__["CameraSource"].Prompt,
                                correctOrientation: false
                            })];
                    case 1:
                        image = _a.sent();
                        if (!image) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.awsService.uploadImage('communities', this.community._id.length ? this.community._id : "temporary", image, this.community._id)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.awsService.compressPhoto(event.target.files[0])];
                    case 4:
                        compressed = _a.sent();
                        return [4 /*yield*/, this.awsService.uploadFile('communities', this.community._id.length ? this.community._id : "temporary", compressed, this.community._id)];
                    case 5:
                        result = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(result === "Upload succeeded")) return [3 /*break*/, 11];
                        if (!this.community.background) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.awsService.removeFile(this.community.background)];
                    case 7:
                        _a.sent(); //remove the previous background from Digital Ocean
                        _a.label = 8;
                    case 8:
                        this.community.background = this.awsService.url;
                        this.communityForm.patchValue({ 'background': this.awsService.url });
                        if (!(this.community._id && this.community._id.length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.churchService.updateChurchProfile({ _id: this.community._id, background: this.community.background })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        this.refreshNeeded = true;
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    EditcommunityPage.prototype.removeFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.community.background) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.awsService.removeFile(this.community.background)];
                    case 1:
                        _a.sent();
                        this.community.background = null;
                        return [4 /*yield*/, this.churchService.updateChurchProfile({ _id: this.community._id, background: null })];
                    case 2:
                        _a.sent();
                        this.refreshNeeded = true;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditcommunityPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    EditcommunityPage.ctorParameters = function () { return [
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_4__["Churches"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_6__["Aws"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EditcommunityPage.prototype, "community", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EditcommunityPage.prototype, "industries", void 0);
    EditcommunityPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-editcommunity',
            template: __importDefault(__webpack_require__(/*! raw-loader!./editcommunity.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/editcommunity/editcommunity.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./editcommunity.page.scss */ "./src/app/pages/community/editcommunity/editcommunity.page.scss")).default]
        }),
        __metadata("design:paramtypes", [ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_4__["Churches"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_6__["Aws"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"]])
    ], EditcommunityPage);
    return EditcommunityPage;
}());



/***/ }),

/***/ "./src/app/pages/community/showcommunity/showcommunity.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/pages/community/showcommunity/showcommunity.page.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-showcommunity .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-showcommunity .opaque {\n  opacity: 0.6;\n}\napp-showcommunity .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 2em;\n  color: #fff;\n  -webkit-text-stroke: thin;\n  /*    text-shadow:\n              -1px -1px 0 #000,\n              1px -1px 0 #000,\n              -1px 1px 0 #000,\n              1px 1px 0 #000;*/\n}\napp-showcommunity .board-background {\n  display: table;\n  min-height: 70px;\n  background-size: cover;\n  width: 80%;\n}\napp-showcommunity .board-title {\n  max-width: 80%;\n}\napp-showcommunity .section-title {\n  color: white;\n  --background: var(--ion-color-grey);\n  text-align: left;\n  font-size: large;\n}\napp-showcommunity .label-title {\n  font-weight: bold;\n  color: var(--ion-color-grey);\n}\napp-showcommunity .community-detail {\n  font-weight: bold;\n  color: var(--ion-color-grey);\n  min-width: 60%;\n}\napp-showcommunity .community-action {\n  color: white;\n  margin-top: 3%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2NvbW11bml0eS9zaG93Y29tbXVuaXR5L3Nob3djb21tdW5pdHkucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9jb21tdW5pdHkvc2hvd2NvbW11bml0eS9zaG93Y29tbXVuaXR5LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtBQ0RKO0FESUU7RUFDRSxZQUFBO0FDRko7QURLRTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDSjs7Ozs4QkFBQTtBQ0NBO0FETUU7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLFVBQUE7QUNKSjtBRE9FO0VBQ0UsY0FBQTtBQ0xKO0FEUUU7RUFDRSxZQUFBO0VBQ0EsbUNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDTko7QURTRTtFQUNFLGlCQUFBO0VBQ0EsNEJBQUE7QUNQSjtBRFVFO0VBQ0UsaUJBQUE7RUFDQSw0QkFBQTtFQUNBLGNBQUE7QUNSSjtBRFdFO0VBQ0UsWUFBQTtFQUNBLGNBQUE7QUNUSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvbW11bml0eS9zaG93Y29tbXVuaXR5L3Nob3djb21tdW5pdHkucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLXNob3djb21tdW5pdHkge1xuXG4gIC5kZWZhdWx0LWJhY2tncm91bmQge1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAub3BhcXVlIHtcbiAgICBvcGFjaXR5OiAwLjY7XG4gIH1cblxuICAuZGVmYXVsdC10aXRsZSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDIuMGVtO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHRoaW47XG4vKiAgICB0ZXh0LXNoYWRvdzpcbiAgICAgICAgICAgIC0xcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAxcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAtMXB4IDFweCAwICMwMDAsXG4gICAgICAgICAgICAxcHggMXB4IDAgIzAwMDsqL1xuICB9XG5cbiAgLmJvYXJkLWJhY2tncm91bmQge1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIG1pbi1oZWlnaHQ6IDcwcHg7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICB3aWR0aDogODAlO1xuICB9XG5cbiAgLmJvYXJkLXRpdGxlIHtcbiAgICBtYXgtd2lkdGg6IDgwJTtcbiAgfVxuXG4gIC5zZWN0aW9uLXRpdGxlIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICB9XG5cbiAgLmxhYmVsLXRpdGxlIHtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICB9XG5cbiAgLmNvbW11bml0eS1kZXRhaWwge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gICAgbWluLXdpZHRoOiA2MCU7XG4gIH1cblxuICAuY29tbXVuaXR5LWFjdGlvbiB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG1hcmdpbi10b3A6IDMlO1xuICB9XG59XG4iLCJhcHAtc2hvd2NvbW11bml0eSAuZGVmYXVsdC1iYWNrZ3JvdW5kIHtcbiAgZGlzcGxheTogdGFibGU7XG4gIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1zaG93Y29tbXVuaXR5IC5vcGFxdWUge1xuICBvcGFjaXR5OiAwLjY7XG59XG5hcHAtc2hvd2NvbW11bml0eSAuZGVmYXVsdC10aXRsZSB7XG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyZW07XG4gIGNvbG9yOiAjZmZmO1xuICAtd2Via2l0LXRleHQtc3Ryb2tlOiB0aGluO1xuICAvKiAgICB0ZXh0LXNoYWRvdzpcbiAgICAgICAgICAgICAgLTFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgICAtMXB4IDFweCAwICMwMDAsXG4gICAgICAgICAgICAgIDFweCAxcHggMCAjMDAwOyovXG59XG5hcHAtc2hvd2NvbW11bml0eSAuYm9hcmQtYmFja2dyb3VuZCB7XG4gIGRpc3BsYXk6IHRhYmxlO1xuICBtaW4taGVpZ2h0OiA3MHB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICB3aWR0aDogODAlO1xufVxuYXBwLXNob3djb21tdW5pdHkgLmJvYXJkLXRpdGxlIHtcbiAgbWF4LXdpZHRoOiA4MCU7XG59XG5hcHAtc2hvd2NvbW11bml0eSAuc2VjdGlvbi10aXRsZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG59XG5hcHAtc2hvd2NvbW11bml0eSAubGFiZWwtdGl0bGUge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbn1cbmFwcC1zaG93Y29tbXVuaXR5IC5jb21tdW5pdHktZGV0YWlsIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gIG1pbi13aWR0aDogNjAlO1xufVxuYXBwLXNob3djb21tdW5pdHkgLmNvbW11bml0eS1hY3Rpb24ge1xuICBjb2xvcjogd2hpdGU7XG4gIG1hcmdpbi10b3A6IDMlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/community/showcommunity/showcommunity.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/community/showcommunity/showcommunity.page.ts ***!
  \*********************************************************************/
/*! exports provided: ShowcommunityPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowcommunityPage", function() { return ShowcommunityPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../editcommunity/editcommunity.page */ "./src/app/pages/community/editcommunity/editcommunity.page.ts");
/* harmony import */ var _community_popover_community_popover_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../community-popover/community-popover.page */ "./src/app/pages/community/community-popover/community-popover.page.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
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











var ShowcommunityPage = /** @class */ (function () {
    function ShowcommunityPage(route, cache, router, storage, modalCtrl, resourceService, churchService, userData, popoverCtrl, alertCtrl) {
        var _this = this;
        this.route = route;
        this.cache = cache;
        this.router = router;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.resourceService = resourceService;
        this.churchService = churchService;
        this.userData = userData;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.community = { _id: '' };
        this.joinChurchTag = true;
        this.editChurchTag = false;
        this.leaveChurchTag = false;
        this.refreshNeeded = false;
        this.newBoardName = '';
        this.currentPageAdminStatus = false;
        this.mediaList = [];
        this.subscriptions = {};
        this.refreshHandler = function (data) {
            if (data && data.type === 'refresh community') {
                _this.loadChurch();
            }
        };
    }
    ShowcommunityPage.prototype.ngOnInit = function () {
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
    };
    ShowcommunityPage.prototype.ionViewWillEnter = function () {
        if (this.modalPage && this.community._id) { // if called by modalCtrl.create()
            this.loadChurch();
        }
        else { // if called by router outlet
            this.community._id = this.route.snapshot.paramMap.get('id');
            this.loadChurch();
        }
    };
    ShowcommunityPage.prototype.loadChurch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.churchService.loadChurchProfile(this.community._id)];
                    case 1:
                        _a = __read.apply(void 0, [_b.sent(), 1]), this.community = _a[0];
                        this.setTag();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcommunityPage.prototype.setTag = function () {
        var _this = this;
        if (this.userData && this.userData.user) {
            this.userData.user.churches.forEach(function (church) {
                if (church._id == _this.community._id) {
                    _this.joinChurchTag = false;
                    _this.editChurchTag = false;
                    _this.leaveChurchTag = true;
                }
            });
            this.community.admins.forEach(function (admin) {
                if (admin._id == _this.userData.user._id) {
                    _this.joinChurchTag = false;
                    _this.editChurchTag = true;
                    _this.leaveChurchTag = true;
                    _this.currentPageAdminStatus = true;
                }
            });
        }
    };
    ShowcommunityPage.prototype.presentPopover = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _community_popover_community_popover_page__WEBPACK_IMPORTED_MODULE_8__["CommunityPopoverPage"],
                            componentProps: { community: this.community },
                            cssClass: 'level-15',
                            event: event
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcommunityPage.prototype.addBoard = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.churchService.editCommunityBoard({ action: "create", board: { name: this.newBoardName, church: this.community._id } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.userData.load()];
                    case 2:
                        _a.sent();
                        this.newBoardName = '';
                        this.userData.refreshUserStatus({ type: 'refresh community board page' });
                        this.loadChurch();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcommunityPage.prototype.editBoard = function (event, board) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.churchService.editCommunityBoard({ action: "edit", board: board })];
                    case 1:
                        _a.sent();
                        this.userData.refreshUserStatus({ type: 'refresh community board page' });
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcommunityPage.prototype.deleteBoard = function (event, board) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Delete Community Topic',
                                subHeader: 'Are you sure you want to delete ' + board.name + '? All its posts and comments will also be erased.',
                                buttons: [{ text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.churchService.editCommunityBoard({ action: "delete", board: board })];
                                                        case 1:
                                                            _a.sent();
                                                            this.userData.refreshUserStatus({ type: 'refresh community board page' });
                                                            this.loadChurch();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        } },
                                    { text: 'Cancel' }],
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
    ShowcommunityPage.prototype.joinChurch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, alert_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.userData.user) return [3 /*break*/, 1];
                        this.modalCtrl.dismiss();
                        this.router.navigate(['/register', { slide: '0', message: 'To join a community, please sign in or create an account.', exitType: 'slide' }]);
                        return [3 /*break*/, 6];
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.userData.joinCommunity(this.community)];
                    case 2:
                        data = _a.sent();
                        if (data === "cancel")
                            return [2 /*return*/];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                subHeader: 'Successfully joined ' + this.community.name,
                                buttons: [{
                                        text: 'Ok',
                                        handler: function () {
                                            _this.modalCtrl.dismiss(true);
                                        }
                                    }],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.log("failed to add to My Community");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ShowcommunityPage.prototype.editChurch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var industries;
            var _this = this;
            return __generator(this, function (_a) {
                industries = [];
                this.resourceService.load('en-US', "Industry").subscribe(function (fields) { return __awaiter(_this, void 0, void 0, function () {
                    var i, editCommunityModal, refreshNeeded;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                for (i = 0; i < fields.length; i++) {
                                    console.log("id", fields[i]._id);
                                    industries.push({ _id: fields[i]._id, name: fields[i]["en-US"].value[0], selected: false });
                                }
                                return [4 /*yield*/, this.modalCtrl.create({ component: _editcommunity_editcommunity_page__WEBPACK_IMPORTED_MODULE_7__["EditcommunityPage"], componentProps: { community: this.community, industries: industries } })];
                            case 1:
                                editCommunityModal = _a.sent();
                                return [4 /*yield*/, editCommunityModal.present()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, editCommunityModal.onDidDismiss()];
                            case 3:
                                refreshNeeded = (_a.sent()).data;
                                if (refreshNeeded) {
                                    this.refreshNeeded = true;
                                    //this.loadChurch(); // refresh is handle by the refresh event listener
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, function (err) { return __awaiter(_this, void 0, void 0, function () {
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
                }); });
                return [2 /*return*/];
            });
        });
    };
    ShowcommunityPage.prototype.leaveChurch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Warning',
                            subHeader: 'Are you sure you want to leave this community? You will also be removed from all its groups.',
                            buttons: [{ text: 'Yes',
                                    handler: function () {
                                        var navTransition = alert.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var err_2;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 2, , 3]);
                                                        return [4 /*yield*/, this.userData.leaveCommunity(this.community._id)];
                                                    case 1:
                                                        _a.sent();
                                                        this.modalCtrl.dismiss(true);
                                                        return [3 /*break*/, 3];
                                                    case 2:
                                                        err_2 = _a.sent();
                                                        console.log(err_2);
                                                        return [3 /*break*/, 3];
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    } },
                                { text: 'Cancel' }],
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
    ShowcommunityPage.prototype.approveCommunity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Approve Community',
                            subHeader: 'Once approved, ' + this.community.name + ' will be listed in the Discover Section. Confirm?',
                            buttons: [{ text: 'Yes',
                                    handler: function () {
                                        var navTransition = alert.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var err_3;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 3, , 4]);
                                                        return [4 /*yield*/, this.churchService.approveCommunity(this.community._id)];
                                                    case 1:
                                                        _a.sent();
                                                        return [4 /*yield*/, this.loadChurch()];
                                                    case 2:
                                                        _a.sent();
                                                        this.refreshNeeded = true;
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        err_3 = _a.sent();
                                                        console.log(err_3);
                                                        return [3 /*break*/, 4];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    } },
                                { text: 'Cancel' }],
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
    ShowcommunityPage.prototype.unlistCommunity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Unlist Community',
                            subHeader: this.community.name + ' will no longer be displayed in the Discover Section. Confirm?',
                            buttons: [{ text: 'Yes',
                                    handler: function () {
                                        var navTransition = alert.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var err_4;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 3, , 4]);
                                                        return [4 /*yield*/, this.churchService.unlistCommunity(this.community._id)];
                                                    case 1:
                                                        _a.sent();
                                                        return [4 /*yield*/, this.loadChurch()];
                                                    case 2:
                                                        _a.sent();
                                                        this.refreshNeeded = true;
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        err_4 = _a.sent();
                                                        console.log(err_4);
                                                        return [3 /*break*/, 4];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    } },
                                { text: 'Cancel' }],
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
    ShowcommunityPage.prototype.seeUserInfo = function (event, user) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userData.user)
                            return [2 /*return*/];
                        event.stopPropagation();
                        user.name = user.first_name + " " + user.last_name;
                        return [4 /*yield*/, this.modalCtrl.create({ component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_9__["ShowrecipientinfoPage"], componentProps: { recipient: user, modalPage: true } })];
                    case 1:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, recipientModal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.refreshNeeded = true;
                            this.loadChurch();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowcommunityPage.prototype.initPlyr = function (event, mediaId) {
        var player;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player });
    };
    ShowcommunityPage.prototype.destroyPlayers = function (mediaId) {
        var e_1, _a;
        if (mediaId) {
            var media = this.mediaList.find(function (c) { return c._id === mediaId; });
            media.player.destroy();
        }
        else {
            try {
                for (var _b = __values(this.mediaList), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var media = _c.value;
                    media.player.destroy();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    ShowcommunityPage.prototype.closeModal = function () {
        this.destroyPlayers(null);
        if (this.userData.user) {
            this.modalCtrl.dismiss(this.refreshNeeded);
        }
        else {
            this.router.navigateByUrl('/map');
        }
    };
    ShowcommunityPage.prototype.noNetworkConnection = function () {
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
    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    ShowcommunityPage.prototype.customTrackBy = function (index, item) {
        return index;
    };
    ShowcommunityPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    };
    ShowcommunityPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_10__["Resource"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_5__["Churches"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ShowcommunityPage.prototype, "community", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ShowcommunityPage.prototype, "modalPage", void 0);
    ShowcommunityPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-showcommunity',
            template: __importDefault(__webpack_require__(/*! raw-loader!./showcommunity.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/community/showcommunity/showcommunity.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./showcommunity.page.scss */ "./src/app/pages/community/showcommunity/showcommunity.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_10__["Resource"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_5__["Churches"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["PopoverController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"]])
    ], ShowcommunityPage);
    return ShowcommunityPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~board-communityboard-communityboard-module~communities-communities-module~dashboard-dashboar~1ef017ed.js.map