(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~administrators-administrators-module~board-communityboard-communityboard-module~communities-~e958f6f2"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/invitetoconnect/invitetoconnect.page.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/invitetoconnect/invitetoconnect.page.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{title}}</ion-title>\n  </ion-toolbar>\n  <ion-toolbar>\n    <ion-searchbar [(ngModel)]=\"searchKeywords\" debounce=\"500\" (ionChange)=\"executeSearch($event)\" (ionCancel)=\"cancelSearch($event)\"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf=\"page === 1\">\n    <ion-virtual-scroll [items]=\"contact_list\" [trackBy]=\"customTrackBy\">\n      <ion-item *virtualItem=\"let contact\" (click)=\"select(contact)\">\n        <ion-icon *ngIf=\"!(contact.select || contact.joined)\" name=\"radio-button-off\" slot=\"start\"></ion-icon>\n        <ion-icon *ngIf=\"contact.select\" name=\"radio-button-on\" slot=\"start\"></ion-icon>\n        <ion-icon *ngIf=\"contact.joined\" name=\"checkmark\" slot=\"start\"></ion-icon>\n        <div>\n          {{contact.name}}\n        <ion-note *ngIf=\"type === 'SMS Message' && contact.type ==='contact'\">{{contact.phoneNumbers[0].value}}</ion-note>\n          <ion-note *ngIf=\"type === 'Email' && contact.type ==='contact'\">{{contact.emails[0].value}}</ion-note>\n        </div>\n      </ion-item>\n      <ion-spinner *ngIf=\"ionSpinner\"></ion-spinner>\n    </ion-virtual-scroll>\n\n    <ion-list *ngIf=\"type !== 'Restvo Users'\">\n      <ion-item>\n        <ion-label><ion-icon name=\"person\"></ion-icon></ion-label>\n        <ion-input [(ngModel)]=\"name\" placeholder=\"Full name\" type=\"name\"></ion-input>\n      </ion-item>\n\n      <ion-item *ngIf=\"type === 'SMS Message'\">\n        <ion-label><ion-icon name=\"phone-portrait\"></ion-icon></ion-label>\n        <ion-input [(ngModel)]=\"mobile_phone\" placeholder=\"Mobile Number\" type=\"tel\" (input)=\"checkInputFields()\"></ion-input>\n      </ion-item>\n      <ion-item *ngIf=\"type === 'Email'\">\n        <ion-label><ion-icon name=\"mail\"></ion-icon></ion-label>\n        <ion-input [(ngModel)]=\"email\" placeholder=\"Email\" type=\"text\" (input)=\"checkInputFields()\"></ion-input>\n      </ion-item>\n    </ion-list>\n\n    <p class=\"ion-text-wrap ion-padding\" *ngIf=\"!userData.user.importContactList\" (click)=\"enableImportContact()\" class=\"enable-import\">Tired of manually typing in the contact info? Click here to access your phone's contact list.</p>\n  </div>\n  <div *ngIf=\"page === 2\">\n    <ion-list>\n      <ion-item *ngFor=\"let church of mychurches\" (click)=\"selectItem(church)\">\n        <ion-icon *ngIf=\"!church.select\" name=\"radio-button-off\" slot=\"start\"></ion-icon>\n        <ion-icon *ngIf=\"church.select\" name=\"radio-button-on\" slot=\"start\"></ion-icon> {{church.name}}\n      </ion-item>\n    </ion-list>\n  </div>\n  <div *ngIf=\"page === 3\">\n    <ion-list>\n      <div *ngFor=\"let church of mychurches\">\n        <ion-list-header>{{church.name}}</ion-list-header>\n        <ion-item *ngFor=\"let group of church.groups\" (click)=\"selectItem(group)\">\n          <ion-icon *ngIf=\"!group.select\" name=\"radio-button-off\" slot=\"start\"></ion-icon>\n          <ion-icon *ngIf=\"group.select\" name=\"radio-button-on\" slot=\"start\"></ion-icon> {{group.name}}\n        </ion-item>\n      </div>\n\n    </ion-list>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar *ngIf=\"page === 1\">\n      <ion-button [hidden]=\"!selectedGroups.length && !selectedChurches.length\" expand=\"full\" shape=\"round\" (click)=\"sendInvitations()\" color=\"primary\" [disabled]=\"!((mobile_phone.length && name.length) || (email.length && name.length) || (totalSelected) > 0)\">Send {{totalSelected}} Invitation(s)</ion-button>\n      <ion-button [hidden]=\"selectedGroups.length || selectedChurches.length\" expand=\"full\" shape=\"round\" (click)=\"goToStep2()\" color=\"primary\" [disabled]=\"!((mobile_phone.length && name.length) || (email.length && name.length) || (totalSelected) > 0)\">Select {{totalSelected}} Friend(s)</ion-button>\n  </ion-toolbar>\n  <ion-toolbar *ngIf=\"page === 2\">\n      <ion-button expand=\"full\" shape=\"round\" *ngIf=\"totalSelected === 0\" (click)=\"goToStep3($event)\" color=\"primary\">Skip</ion-button>\n      <ion-button expand=\"full\" shape=\"round\" *ngIf=\"totalSelected > 0\" (click)=\"goToStep3($event)\" color=\"primary\">Select {{totalSelected}} Community</ion-button>\n  </ion-toolbar>\n  <ion-toolbar *ngIf=\"page === 3\">\n      <ion-button expand=\"full\" shape=\"round\" *ngIf=\"totalSelected === 0\" (click)=\"finish($event)\" color=\"primary\">Skip</ion-button>\n      <ion-button expand=\"full\" shape=\"round\" *ngIf=\"totalSelected > 0\" (click)=\"finish($event)\" color=\"primary\">Select {{totalSelected}} Group(s)</ion-button>\n  </ion-toolbar>\n</ion-footer>\n\n");

/***/ }),

/***/ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.scss":
/*!*************************************************************************!*\
  !*** ./src/app/pages/connect/invitetoconnect/invitetoconnect.page.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-invitetoconnect .enable-import {\n  color: #e88a91;\n  text-decoration: underline;\n  background: none;\n  border: none;\n  font-size: 15px;\n  word-wrap: break-word;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2Nvbm5lY3QvaW52aXRldG9jb25uZWN0L2ludml0ZXRvY29ubmVjdC5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2Nvbm5lY3QvaW52aXRldG9jb25uZWN0L2ludml0ZXRvY29ubmVjdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUU7RUFDRSxjQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EscUJBQUE7QUNESiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Nvbm5lY3QvaW52aXRldG9jb25uZWN0L2ludml0ZXRvY29ubmVjdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtaW52aXRldG9jb25uZWN0IHtcblxuICAuZW5hYmxlLWltcG9ydCB7XG4gICAgY29sb3I6IHJnYigyMzIsMTM4LDE0NSk7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgfVxufVxuIiwiYXBwLWludml0ZXRvY29ubmVjdCAuZW5hYmxlLWltcG9ydCB7XG4gIGNvbG9yOiAjZTg4YTkxO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXNpemU6IDE1cHg7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/connect/invitetoconnect/invitetoconnect.page.ts ***!
  \***********************************************************************/
/*! exports provided: InvitetoconnectPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvitetoconnectPage", function() { return InvitetoconnectPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_sms_ngx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic-native/sms/ngx */ "./node_modules/@ionic-native/sms/ngx/index.js");
/* harmony import */ var _ionic_native_email_composer_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/email-composer/ngx */ "./node_modules/@ionic-native/email-composer/ngx/index.js");
/* harmony import */ var _ionic_native_contacts_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/contacts/ngx */ "./node_modules/@ionic-native/contacts/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_church_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/church.service */ "./src/app/services/church.service.ts");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
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









var InvitetoconnectPage = /** @class */ (function () {
    function InvitetoconnectPage(sms, emailComposer, contacts, alertCtrl, loadingCtrl, modalCtrl, navParams, platform, authService, userData, churchService, groupService) {
        this.sms = sms;
        this.emailComposer = emailComposer;
        this.contacts = contacts;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.authService = authService;
        this.userData = userData;
        this.churchService = churchService;
        this.groupService = groupService;
        this.page = 1;
        this.title = '';
        this.selectedChurches = [];
        this.selectedGroups = [];
        this.name = '';
        this.email = '';
        this.mobile_phone = '';
        this.selectCounter = 0;
        this.entryCounter = 0;
        this.totalSelected = 0;
        this.all_contact_list = [];
        this.contact_list = [];
        this.ionSpinner = true;
        this.searchKeywords = '';
        this.selectedContacts = [];
        this.selectedEmails = [];
        this.selectedPhoneNumbers = [];
        this.selectedAppUsers = [];
        this.mychurches = [];
        this.allmychurches = [];
        this.mygroups = [];
        this.privateGroup = false;
        this.refreshNeeded = false;
    }
    InvitetoconnectPage.prototype.ngOnInit = function () {
        this.selectedGroup = this.group || null;
        this.selectedChurch = this.church || null;
        this.title = this.type || null;
        console.log("group", this.selectedGroup, this.type);
        if (this.selectedChurch && this.selectedChurch._id) { // in the event the user already selected a community
            this.selectedChurches.push(this.selectedChurch);
        }
        if (this.selectedGroup && this.selectedGroup._id) { // in the event the user already selected a group
            this.selectedGroups.push(this.selectedGroup);
            if (!this.selectedGroup.churchId) {
                this.privateGroup = true;
            }
        }
        if (this.selectedAppUser && this.selectedAppUser._id) { //in the event the user has already selected 1 user
            this.selectedAppUser.name = this.selectedAppUser.name || this.selectedAppUser.first_name + " " + this.selectedAppUser.last_name;
            this.selectedAppUsers.push({ _id: this.selectedAppUser._id, name: this.selectedAppUser.name });
        }
        this.goToStep1();
    };
    InvitetoconnectPage.prototype.goToStep1 = function () {
        var _this = this;
        this.loadFriends();
        if (this.type === 'Invite to Community' || this.type === 'Invite to Group') {
            this.loadMyChurches(); // this will skip to page 2
        }
        else if (this.type !== 'Restvo Users') {
            this.loadContacts();
        }
        setTimeout(function () {
            _this.ionSpinner = false;
        }, 10000);
    };
    InvitetoconnectPage.prototype.loadFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uniqueMemberId, friends, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uniqueMemberId = [];
                        if (this.selectedChurches.length) {
                            if (this.selectedChurches[0].members && this.selectedChurches[0].members.length) {
                                this.selectedChurches[0].members.forEach(function (member) {
                                    uniqueMemberId.push(member._id);
                                });
                            }
                        }
                        else if (this.selectedGroups.length) {
                            if (this.selectedGroups[0].members && this.selectedGroups[0].members.length) {
                                this.selectedGroups[0].members.forEach(function (member) {
                                    uniqueMemberId.push(member._id);
                                });
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userData.loadMyFriends()];
                    case 2:
                        friends = _a.sent();
                        this.ionSpinner = false;
                        if (friends) {
                            friends.forEach(function (friend) {
                                if (friend.restvoApp) {
                                    _this.all_contact_list.push({ type: 'appUser', _id: friend._id, name: friend.name, select: false, joined: uniqueMemberId.indexOf(friend._id) > -1 });
                                }
                            });
                            this.all_contact_list.sort(function (a, b) { return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0; });
                            this.contact_list = this.all_contact_list;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.ionSpinner = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvitetoconnectPage.prototype.loadContacts = function () {
        var _this = this;
        if (this.platform.is('cordova') && this.userData.user.importContactList) {
            this.contacts.find(['*'], { desiredFields: ['name', 'phoneNumbers', 'emails'], multiple: true }).then(function (contacts) {
                _this.ionSpinner = false;
                if (contacts) {
                    contacts.forEach(function (contact) {
                        if ((_this.type === 'SMS Message') && contact.phoneNumbers) {
                            _this.all_contact_list.push({ type: 'contact', _id: null, name: contact.name.formatted, phoneNumbers: contact.phoneNumbers, select: false, joined: false });
                        }
                        else if ((_this.type === 'Email') && contact.emails) {
                            _this.all_contact_list.push({ type: 'contact', _id: null, name: contact.name.formatted, emails: contact.emails, select: false, joined: false });
                        }
                    });
                    _this.all_contact_list.sort(function (a, b) { return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0; });
                    _this.contact_list = _this.all_contact_list;
                }
            }, function (err) {
                _this.ionSpinner = false;
            });
        }
        else {
            this.ionSpinner = false;
            this.contact_list = [];
        }
    };
    InvitetoconnectPage.prototype.sendInvitations = function () {
        this.prepareContacts();
        this.inviteFriends();
        if (this.selectedChurches.length) {
            this.inviteToChurches();
        }
        else if (this.selectedGroups.length) {
            this.inviteToGroups();
        }
        this.openComposer();
    };
    InvitetoconnectPage.prototype.goToStep2 = function () {
        this.prepareContacts(); // sync logic to prepare all the contacts for uploading
        this.inviteFriends(); // add the pending request entries for non-Restvo Users in Pending collection
        this.loadMyChurches();
    };
    InvitetoconnectPage.prototype.prepareContacts = function () {
        var _this = this;
        this.selectedContacts = [];
        this.selectedAppUsers = [];
        if (this.type === "SMS Message" || this.type === 'Restvo Users') {
            this.selectedPhoneNumbers = [];
            this.all_contact_list.forEach(function (contact) {
                if (contact.select) {
                    if (contact.type === 'contact') {
                        var foundMobile_1 = false;
                        var contactPhones_1 = [];
                        contact.phoneNumbers.forEach(function (number) {
                            if (number.type.toLowerCase().indexOf('mobile') > -1 || number.type.toLowerCase().indexOf('cell') > -1) {
                                _this.selectedPhoneNumbers.push(number.value);
                                foundMobile_1 = true;
                            }
                            contactPhones_1.push(number.value);
                        });
                        if (!foundMobile_1) { //if no mobile or cell label is found, use the first number
                            _this.selectedPhoneNumbers.push(contact.phoneNumbers[0].value);
                        }
                        _this.selectedContacts.push({ name: contact.name, phones: contactPhones_1 });
                    }
                    else if (contact.type === 'appUser') {
                        _this.selectedAppUsers.push({ _id: contact._id, name: contact.name });
                    }
                }
            });
            if (this.mobile_phone.length && this.name.length) { //check the manual input fields
                this.selectedPhoneNumbers.push(this.mobile_phone);
                this.selectedContacts.push({ name: this.name, phones: [this.mobile_phone] });
            }
        }
        else if (this.type === "Email") {
            this.selectedEmails = [];
            this.all_contact_list.forEach(function (contact) {
                if (contact.select) {
                    if (contact.type === 'contact') {
                        var contactEmails_1 = [];
                        contact.emails.forEach(function (email) {
                            _this.selectedEmails.push(email.value);
                            contactEmails_1.push(email.value.toLowerCase());
                        });
                        _this.selectedContacts.push({ name: contact.name, emails: contactEmails_1 });
                    }
                    else if (contact.type === 'appUser') {
                        _this.selectedAppUsers.push({ _id: contact._id, name: contact.name });
                    }
                }
            });
            if (this.email.length && this.name.length) { //check the manual input fields
                this.selectedEmails.push(this.email);
                this.selectedContacts.push({ name: this.name, emails: [this.email] });
            }
        }
    };
    InvitetoconnectPage.prototype.inviteFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({
                            message: 'Processing...'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        this.userData.inviteFriends({ selectedContacts: this.selectedContacts }).subscribe(function (result) {
                            loading.dismiss();
                        }, function (err) { return __awaiter(_this, void 0, void 0, function () {
                            var errorAlert;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        loading.dismiss();
                                        return [4 /*yield*/, this.alertCtrl.create({
                                                header: 'Something went wrong...',
                                                message: 'The server is busy. Please try again later.',
                                                buttons: ['Dismiss'],
                                                cssClass: 'level-15'
                                            })];
                                    case 1:
                                        errorAlert = _a.sent();
                                        errorAlert.present();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    InvitetoconnectPage.prototype.loadMyChurches = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mychurches, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // push a modal page to collect optional church invitation
                        this.searchKeywords = '';
                        this.totalSelected = 0;
                        this.mychurches = []; //reset the array
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userData.loadMyChurches()];
                    case 2:
                        mychurches = _a.sent();
                        this.ionSpinner = false;
                        mychurches.forEach(function (church) {
                            var groups = [];
                            church.groups.forEach(function (group) {
                                groups.push({ _id: group._id, name: group.name, select: false });
                            });
                            _this.allmychurches.push({ _id: church._id, name: church.name, groups: groups, select: false });
                        });
                        this.mychurches = this.allmychurches;
                        if (this.type === 'Invite to Group') {
                            this.loadMyGroups(); // skip to step 3
                        }
                        else {
                            this.loadMyGroups(); // skip to step 3
                            /*this.page = 2;
                            this.title = "Invite to Community";*/
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log("failed to get mychurches data");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InvitetoconnectPage.prototype.goToStep3 = function () {
        this.loadMyGroups();
    };
    InvitetoconnectPage.prototype.loadMyGroups = function () {
        var _this = this;
        this.searchKeywords = '';
        this.selectedChurches = [];
        this.mychurches.forEach(function (church) {
            if (church.select) {
                _this.selectedChurches.push(church);
            }
        });
        if (this.selectedChurches) {
            this.inviteToChurches();
        }
        this.page = 3;
        this.title = "Invite to Group";
        this.totalSelected = 0;
    };
    InvitetoconnectPage.prototype.inviteToChurches = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading, data, alert_1, err_3, alert_2, err_4, errorAlert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.selectedChurches.length) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: 'Processing...'
                            })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        if (!this.selectedAppUsers.length) return [3 /*break*/, 6];
                        data = { churches: this.selectedChurches, appUsers: this.selectedAppUsers };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.churchService.inviteNewAppUsers(data)];
                    case 3:
                        _a.sent();
                        this.selectedAppUsers.forEach(function (appuser) {
                            _this.userData.socket.emit('refresh user status', appuser._id, { type: 'update church participation' });
                        });
                        loading.dismiss();
                        this.refreshNeeded = true;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Invited ' + this.selectedAppUsers.length + ' Restvo user(s).',
                                message: 'You have successfully invited ' + this.selectedAppUsers.length + ' Restvo user(s) to join ' + this.selectedChurches.length + ' community.',
                                buttons: [{ text: 'Done' }],
                                cssClass: 'level-15'
                            })];
                    case 4:
                        alert_1 = _a.sent();
                        alert_1.present();
                        return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        loading.dismiss();
                        this.noNetworkConnection();
                        console.log("send invitation to join community failed");
                        return [3 /*break*/, 6];
                    case 6:
                        if (!this.selectedContacts.length) return [3 /*break*/, 12];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 10, , 12]);
                        return [4 /*yield*/, this.churchService.invitePendingMembers({ churches: this.selectedChurches, selectedContacts: this.selectedContacts })];
                    case 8:
                        _a.sent();
                        loading.dismiss();
                        this.refreshNeeded = true;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Invited ' + this.selectedContacts.length + ' person(s).',
                                message: 'You have successfully invited ' + this.selectedContacts.length + ' person(s) to join ' + this.selectedChurches.length + ' community.',
                                buttons: [{ text: 'Done' }],
                                cssClass: 'level-15'
                            })];
                    case 9:
                        alert_2 = _a.sent();
                        alert_2.present();
                        return [3 /*break*/, 12];
                    case 10:
                        err_4 = _a.sent();
                        loading.dismiss();
                        this.refreshNeeded = true;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Something went wrong...',
                                message: 'The server is busy. Please try again later.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 11:
                        errorAlert = _a.sent();
                        errorAlert.present();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    InvitetoconnectPage.prototype.finish = function () {
        var _this = this;
        this.selectedGroups = [];
        this.mychurches.forEach(function (church) {
            church.groups.forEach(function (group) {
                if (group.select) {
                    _this.selectedGroups.push(group);
                }
            });
        });
        if (this.selectedGroups) {
            this.inviteToGroups();
        }
        this.openComposer();
        setTimeout(function () {
            _this.modalCtrl.dismiss();
        }, 3000);
    };
    InvitetoconnectPage.prototype.inviteToGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading, data, alert_3, err_5, alert_4, err_6, errorAlert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.selectedGroups.length) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.loadingCtrl.create({
                                message: 'Processing...'
                            })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        if (!this.selectedAppUsers.length) return [3 /*break*/, 6];
                        data = { groups: this.selectedGroups, appUsers: this.selectedAppUsers };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.groupService.inviteNewAppUsers(data)];
                    case 3:
                        _a.sent();
                        this.selectedAppUsers.forEach(function (appuser) {
                            _this.userData.socket.emit('refresh user status', appuser._id, { type: 'update group participation', conversationId: null });
                        });
                        loading.dismiss();
                        this.refreshNeeded = true;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Invited ' + this.selectedAppUsers.length + ' Restvo user(s).',
                                message: 'You have successfully invited ' + this.selectedAppUsers.length + ' Restvo user(s) to join ' + this.selectedGroups.length + ' group(s).',
                                buttons: [{ text: 'Done' }],
                                cssClass: 'level-15'
                            })];
                    case 4:
                        alert_3 = _a.sent();
                        alert_3.present();
                        return [3 /*break*/, 6];
                    case 5:
                        err_5 = _a.sent();
                        loading.dismiss();
                        this.refreshNeeded = true;
                        this.noNetworkConnection();
                        return [3 /*break*/, 6];
                    case 6:
                        if (!this.selectedContacts.length) return [3 /*break*/, 12];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 10, , 12]);
                        return [4 /*yield*/, this.groupService.invitePendingMembers({ groups: this.selectedGroups, selectedContacts: this.selectedContacts })];
                    case 8:
                        _a.sent();
                        loading.dismiss();
                        this.refreshNeeded = true;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Invited ' + this.selectedContacts.length + ' person(s).',
                                message: 'You have successfully invited ' + this.selectedContacts.length + ' person(s) to join ' + this.selectedGroups.length + ' group(s).',
                                buttons: [{ text: 'Done' }],
                                cssClass: 'level-15'
                            })];
                    case 9:
                        alert_4 = _a.sent();
                        alert_4.present();
                        return [3 /*break*/, 12];
                    case 10:
                        err_6 = _a.sent();
                        loading.dismiss();
                        this.refreshNeeded = true;
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Something went wrong...',
                                message: 'The server is busy. Please try again later.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 11:
                        errorAlert = _a.sent();
                        errorAlert.present();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    //misc functions
    InvitetoconnectPage.prototype.executeSearch = function (event) {
        var _this = this;
        if (this.page === 1) {
            if (this.searchKeywords.length) {
                this.contact_list = [];
                this.all_contact_list.forEach(function (contact) {
                    if (contact.name.toLowerCase().indexOf(_this.searchKeywords.toLowerCase()) > -1) {
                        _this.contact_list.push(contact);
                    }
                });
            }
            else {
                this.contact_list = this.all_contact_list;
            }
        }
        else if (this.page === 2) {
            if (this.searchKeywords.length) {
                this.mychurches = [];
                this.allmychurches.forEach(function (church) {
                    if (church.name.toLowerCase().indexOf(_this.searchKeywords.toLowerCase()) > -1) {
                        _this.mychurches.push(church);
                    }
                });
            }
            else {
                this.mychurches = this.allmychurches;
            }
        }
        else if (this.page === 3) {
            if (this.searchKeywords.length) {
                this.mychurches = [];
                this.allmychurches.forEach(function (church) {
                    var groups = [];
                    church.groups.forEach(function (group) {
                        if (group.name.toLowerCase().indexOf(_this.searchKeywords.toLowerCase()) > -1) {
                            groups.push(group);
                        }
                    });
                    _this.mychurches.push({ _id: church._id, name: church.name, groups: groups, select: church.select });
                });
            }
            else {
                this.mychurches = this.allmychurches;
            }
        }
    };
    InvitetoconnectPage.prototype.cancelSearch = function (event) {
        this.contact_list = this.all_contact_list;
        this.mychurches = this.allmychurches;
    };
    InvitetoconnectPage.prototype.select = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!contact.joined) {
                    if (contact.select) {
                        contact.select = false;
                        this.selectCounter--;
                    }
                    else {
                        contact.select = true;
                        this.selectCounter++;
                    }
                    this.totalSelected = this.entryCounter + this.selectCounter;
                }
                return [2 /*return*/];
            });
        });
    };
    InvitetoconnectPage.prototype.selectItem = function (item) {
        if (item.select) {
            item.select = false;
            this.totalSelected--;
        }
        else {
            item.select = true;
            this.totalSelected++;
        }
    };
    InvitetoconnectPage.prototype.enableImportContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.userData.user.importContactList) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: "Allow Restvo to access your Contacts",
                                message: "Restvo needs access to your contacts so you can more easily select friends whom you want to invite. Would you give permission to Restvo to access your Contacts?",
                                buttons: [{
                                        text: 'Yes',
                                        handler: function () {
                                            _this.ionSpinner = true;
                                            _this.userData.user.importContactList = true;
                                            _this.userData.update({ importContactList: true }).then(function () {
                                                _this.loadContacts();
                                            });
                                        }
                                    }, { text: 'Cancel' }],
                                cssClass: 'level-15'
                            })];
                    case 1:
                        alert_5 = _a.sent();
                        alert_5.present();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    InvitetoconnectPage.prototype.openComposer = function () {
        var welcomeMessage = "Check out this new app called Restvo. It's the only app that intentionally builds deeper relationships and you can create chats, groups, events, polls and more. You can download it for free at: https://restvo.com";
        if (this.type === "SMS Message") {
            this.sms.send(this.selectedPhoneNumbers, welcomeMessage, { android: { intent: 'INTENT' } });
        }
        else if (this.type === "Email") {
            if (this.platform.is('cordova')) {
                var email = {
                    bcc: this.selectedEmails,
                    subject: 'Download Restvo for free today',
                    body: "<p>Hey,</p><p>Check out this new app called Restvo. It's the only app that intentionally builds deeper relationships and you can create chats, groups, events, polls and more.</p><p>You can download it for free at:</p><a href=\"https://www.restvo.com\">restvo.com</a></p><p>" + this.userData.user.first_name + "</p>",
                    isHtml: true
                };
                this.emailComposer.open(email);
            }
            else {
                window.location.href = 'mailto:' + this.selectedEmails + '?subject=Download Restvo for free today&body=' + encodeURI(welcomeMessage);
            }
        }
    };
    InvitetoconnectPage.prototype.checkInputFields = function () {
        if ((this.mobile_phone.length || this.email.length) && this.name.length) {
            this.entryCounter = 1;
        }
        else {
            this.entryCounter = 0;
        }
        this.totalSelected = this.entryCounter + this.selectCounter;
    };
    InvitetoconnectPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss(this.refreshNeeded);
    };
    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    InvitetoconnectPage.prototype.customTrackBy = function (index, item) {
        return index;
    };
    InvitetoconnectPage.prototype.noNetworkConnection = function () {
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
    InvitetoconnectPage.ctorParameters = function () { return [
        { type: _ionic_native_sms_ngx__WEBPACK_IMPORTED_MODULE_1__["SMS"] },
        { type: _ionic_native_email_composer_ngx__WEBPACK_IMPORTED_MODULE_2__["EmailComposer"] },
        { type: _ionic_native_contacts_ngx__WEBPACK_IMPORTED_MODULE_3__["Contacts"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavParams"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"] },
        { type: _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_7__["Groups"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], InvitetoconnectPage.prototype, "type", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], InvitetoconnectPage.prototype, "selectedAppUser", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], InvitetoconnectPage.prototype, "church", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], InvitetoconnectPage.prototype, "group", void 0);
    InvitetoconnectPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-invitetoconnect',
            template: __importDefault(__webpack_require__(/*! raw-loader!./invitetoconnect.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/connect/invitetoconnect/invitetoconnect.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./invitetoconnect.page.scss */ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_native_sms_ngx__WEBPACK_IMPORTED_MODULE_1__["SMS"],
            _ionic_native_email_composer_ngx__WEBPACK_IMPORTED_MODULE_2__["EmailComposer"],
            _ionic_native_contacts_ngx__WEBPACK_IMPORTED_MODULE_3__["Contacts"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavParams"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["Auth"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserData"],
            _services_church_service__WEBPACK_IMPORTED_MODULE_6__["Churches"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_7__["Groups"]])
    ], InvitetoconnectPage);
    return InvitetoconnectPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~administrators-administrators-module~board-communityboard-communityboard-module~communities-~e958f6f2.js.map