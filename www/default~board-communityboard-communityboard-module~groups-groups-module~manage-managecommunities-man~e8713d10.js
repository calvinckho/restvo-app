(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~board-communityboard-communityboard-module~groups-groups-module~manage-managecommunities-man~e8713d10"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/editboardpost/editboardpost.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/editboardpost/editboardpost.page.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-button (click)=\"closeModal(false)\">\n                <ion-icon name=\"chevron-back-outline\"></ion-icon>\n            </ion-button>\n        </ion-buttons>\n        <ion-title *ngIf=\"!post._id\">{{resource['en-US'].matrix_string[0][2]}}</ion-title>\n        <ion-title *ngIf=\"post._id\">{{resource['en-US'].matrix_string[0][12]}} {{resource['en-US'].matrix_string[0][2]}} </ion-title>\n        <ion-buttons slot=\"end\">\n            <ion-button *ngIf=\"!post._id\" ion-button (click)=\"savePost()\" [disabled]=\"!post.body?.length\">{{resource['en-US'].matrix_string[0][8]}}</ion-button>\n            <ion-button *ngIf=\"post._id\" ion-button (click)=\"savePost()\" [disabled]=\"!post.body?.length\">{{resource['en-US'].matrix_string[0][13]}}</ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid style=\"height: 100%\" *ngIf=\"!loadCompleted\">\n        <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n            <ion-spinner name=\"dots\"></ion-spinner>\n        </ion-row>\n    </ion-grid>\n    <ion-list>\n        <ion-item lines=\"none\">\n            <ion-label class=\"post-label\"><ion-icon name=\"chatbox\" color=\"grey\"></ion-icon></ion-label>\n            <ion-textarea rows=\"1\" [minRows]=\"1\" [maxRows]=\"8\" autosize autocorrect=\"on\" [placeholder]=\"resource['en-US'].matrix_string[0][4]\" [(ngModel)]=\"post.body\"></ion-textarea>\n        </ion-item>\n        <ion-item *ngIf=\"awsService.sessionAssets?.length\" lines=\"none\">\n            <div class=\"event-photo-container\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png']).indexOf(awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" >\n                <img #photo class=\"event-photo\" [src]=\"awsService.sessionAssets[0]\"/>\n            </div>\n            <a [href]=\"awsService.sessionAssets[0]\" *ngIf=\"(['doc', 'docx']).indexOf(awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/docx.svg\"></ion-img></ion-thumbnail><p>{{awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('/') + 1)}}</p></a>\n            <a [href]=\"awsService.sessionAssets[0]\" *ngIf=\"(['xls', 'xlsx']).indexOf(awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/xlsx.svg\"></ion-img></ion-thumbnail><p>{{awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('/') + 1)}}</p></a>\n            <a [href]=\"awsService.sessionAssets[0]\" *ngIf=\"(['pdf']).indexOf(awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/pdf.svg\"></ion-img></ion-thumbnail><p>{{awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('/') + 1)}}</p></a>\n            <a [href]=\"awsService.sessionAssets[0]\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/file.svg\"></ion-img></ion-thumbnail><p>{{awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('/') + 1)}}</p></a>\n            <div class=\"event-photo-container\" plyr [plyrSources]=\"[{ 'src': awsService.sessionAssets[0], 'type': 'video/' + (awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"player = $event\" *ngIf=\"(['mp4', 'webm', 'ogg', 'mov']).indexOf(awsService.sessionAssets[0].substring(awsService.sessionAssets[0].lastIndexOf('.') + 1).toLowerCase()) > -1\"  (click)=\"$event.stopPropagation()\"></div>\n            <ion-button class=\"remove-photo\" fill=\"clear\" size=\"large\" (click)=\"removePhoto()\">\n                <ion-icon name=\"trash\" color=\"primary\"></ion-icon>\n            </ion-button>\n        </ion-item>\n        <ion-item *ngIf=\"post.media?.length\" (click)=\"resourceService.clickVideo($event, post.media[0].sources)\" lines=\"none\">\n            <div plyr class=\"event-photo-container\" [plyrSources]=\"post.media[0].sources\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"player = $event\"></div>\n\n            <ion-button class=\"remove-photo\" fill=\"clear\" size=\"large\" (click)=\"removeVideo()\">\n                <ion-icon name=\"trash\" color=\"primary\"></ion-icon>\n            </ion-button>\n        </ion-item>\n        <div class=\"photo-frame\" *ngIf=\"post.moments && post.moments.length && post.moments[0]._id && post.moments[0].resource && ['User Defined Activity','Track','Event','Goal','Meetup'].indexOf(post.moments[0].resource.field) > -1\">\n            <img class=\"photo\" *ngIf=\"post.moments[0].assets.length > 0\" [src]=\"post.moments[0].assets[0]\">\n        </div>\n        <ion-item *ngIf=\"post.moments && post.moments.length && post.moments[0]._id\" lines=\"none\">\n            <ion-thumbnail *ngIf=\"['User Defined Activity','Track','Event','Goal','Meetup'].indexOf(post.moments[0].resource.field) > -1 && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] !== 'Poll'\" slot=\"start\">\n                <img [src]=\"momentService.loadIcon(post.moments[0].resource.field).url\" />\n            </ion-thumbnail>\n            <!--User Defined Activity-->\n            <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'User Defined Activity' && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] !== 'Poll'\" (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].value[0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n            </div>\n            <!--Track-->\n            <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Track'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n                <p class=\"moment-name\">{{post.moments[0].matrix_string[0][1]}}</p>\n            </div>\n            <!--Event-->\n            <div class=\"moment ion-text-wrap\" slot=\"end\" *ngIf=\"post.moments[0] && post.moments[0].resource && post.moments[0].resource.field === 'Event'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n                <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n                <p class=\"moment-name\">{{post.moments[0].matrix_string[1][0]}}</p>\n            </div>\n            <!--Meetup-->\n            <div class=\"moment ion-text-wrap\" slot=\"end\" *ngIf=\"post.moments[0] && post.moments[0].resource && post.moments[0].resource.field === 'Meetup'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n                <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n                <p class=\"moment-name\">{{post.moments[0].matrix_string[1][0]}}</p>\n            </div>\n            <!--Goal-->\n            <div class=\"moment ion-text-wrap\" slot=\"end\" *ngIf=\"post.moments[0] && post.moments[0].resource && post.moments[0].resource && post.moments[0].resource.field === 'Goal'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n                <p *ngIf=\"post.moments[0].calendar\" class=\"moment-date\" >Accomplish By: {{post.moments[0].calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n                <p class=\"moment-notes\">{{post.moments[0].matrix_string[1][0]}}</p>\n            </div>\n            <!-- Poll -->\n            <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0] && post.moments[0].resource && post.moments[0].resource.field === 'Poll'\">\n                <p>This poll is no longer available</p>\n            </div>\n            <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0] && post.moments[0].resource && post.moments[0].resource.field === 'User Defined Activity' && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] === 'Poll'\" (click)=\"openRestvoFeature($event, post.moments[0])\">\n                <div class=\"pollIconDiv\">\n                    <img class=\"pollIcon\" src=\"assets/img/Poll_Gray.png\">\n                </div>\n                <p class=\"pollQuestion\">{{post.moments[0].resource['en-US'].matrix_string[1][1]}}</p>\n                <div class=\"unresolvedPollFooter\">\n                    <p>{{post.moments[0].resource['en-US'].matrix_string[1][6]}}: {{post.moments[0].calendar.endDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n                </div>\n            </div>\n            <ion-button size=\"large\" fill=\"clear\" slot=\"end\" (click)=\"removeMoment()\">\n                <ion-icon name=\"trash\" color=\"primary\"></ion-icon>\n            </ion-button>\n        </ion-item>\n\n        <div *ngIf=\"resourceService.showPixabay > -1\">\n            <ion-searchbar [(ngModel)]=\"resourceService.searchKeyword\" (ionChange)=\"resourceService.searchPixabay()\" placeholder=\"Type keywords to search Pixabay\" debounce=\"500\"></ion-searchbar>\n            <ion-grid class=\"pixabay-grid\" *ngIf=\"resourceService.stockPhotoResults && resourceService.stockPhotoResults.hits?.length\">\n                <ion-row>\n                    <ion-col *ngFor=\"let photo of resourceService.stockPhotoResults.hits\">\n                        <ion-thumbnail (click)=\"awsService.selectStockPhoto(photo, this.boardId)\">\n                            <ion-img [src]=\"photo.previewURL\"></ion-img>\n                        </ion-thumbnail>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </div>\n        <ion-item-divider color=\"grey\">\n            <div style=\"color: white\">Restvo Features</div>\n        </ion-item-divider>\n    </ion-list>\n    <ion-grid class=\"moreGrid\">\n        <ion-row class=\"topRow\" ion-align-self-center>\n            <ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\"> <img class=\"colelement\" (click)=\"takePhotoAndUpload()\" src=\"assets/img/Camera_Gray.png\" /><div class=\"moreLabel\">Photo</div></ion-col>\n            <ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\"> <img class=\"colelement\" (click)=\"promptVideoUrl('youtube')\" src=\"assets/img/Facetime_Gray.png\" /><div class=\"moreLabel\">Youtube</div></ion-col>\n            <ion-col *ngIf=\"platform.is('cordova')\" class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\">\n                <img class=\"colelement\" (click)=\"selectPhotoFromDeviceAndUpload($event)\" src=\"assets/img/Album_Gray.png\" />\n                <div class=\"moreLabel\">Album</div>\n            </ion-col>\n            <ion-col *ngIf=\"!platform.is('cordova')\" class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\">\n                <label for=\"image\"><img class=\"colelement\" src=\"assets/img/Album_Gray.png\" /></label>\n                <div class=\"moreLabel\">Album</div>\n                <input type=\"file\" class=\"file-picker\" name=\"image\" id=\"image\" (change)=\"selectPhotoFromDeviceAndUpload($event)\" accept=\"image/*\"/>\n            </ion-col>\n            <ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\">\n                <label for=\"file\"><img class=\"colelement\" src=\"assets/img/Folder_Gray.png\" /></label>\n                <div class=\"moreLabel\">Upload</div>\n                <input type=\"file\" class=\"file-picker\" name=\"file\" id=\"file\" (change)=\"selectFileFromDeviceAndUpload($event)\" />\n            </ion-col>\n            <ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\"> <img class=\"colelement\" (click)=\"resourceService.showPixabay = 0\" src=\"assets/img/Album_Gray.png\"><p class=\"moreLabel\">Stock</p></ion-col>\n            <!--<ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\"> <img class=\"colelement\" (click)=\"shareLocation()\" src=\"assets/img/Location_Grey.png\"><p class=\"moreLabel\">Location</p></ion-col>-->\n            <ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\"> <img class=\"colelement\" (click)=\"pickFeatureModalPage($event, 'User Defined Activity')\" src=\"assets/img/Calendar_Gray.png\"/><div class=\"moreLabel\">Library</div></ion-col>\n\n            <ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\"> <img class=\"colelement\" (click)=\"pickFeatureModalPage($event, 'Poll')\" src=\"assets/img/Poll_Gray.png\" /><div class=\"moreLabel\">Poll</div></ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n\n<ion-footer *ngIf=\"post._id?.length\">\n    <ion-toolbar style=\"margin-top: 5%;\">\n        <ion-button expand=\"full\" shape=\"round\" fill=\"solid\" color='danger' (click)=\"deletePost()\" class=\"centered action\">{{resource['en-US'].matrix_string[0][10]}} {{resource['en-US'].matrix_string[0][2]}}</ion-button>\n    </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/groupboard/groupboard.page.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/groupboard/groupboard.page.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal(false)\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-slides #titles class=\"titles\" (ionSlideDidChange)=\"titleSlideChange($event)\">\n      <ion-slide>\n        <div class=\"title ion-padding-vertical\">{{group.name}}</div>\n      </ion-slide>\n      <ion-slide *ngIf=\"userData.user\">\n        <div class=\"title ion-padding-vertical\">Members</div>\n      </ion-slide>\n    </ion-slides>\n    <ion-buttons slot=\"end\">\n      <ion-button color=\"secondary\" (click)=\"createNewPost()\" *ngIf=\"page === 'board' && userData.user\">\n      <ion-icon name=\"add\"></ion-icon>\n      </ion-button>\n      <ion-button (click)=\"presentPopover($event)\" *ngIf=\"page !== 'board' && userData.user\">\n        <ion-icon ios=\"ellipsis-horizontal\" md=\"ellipsis-vertical\"></ion-icon>\n      </ion-button>\n      <ion-button *ngIf=\"!userData.user\">\n        <ion-icon name=\"add\" color=\"primary\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-row *ngIf=\"group\" class=\"title-dots-row\">\n      <div class=\"title-dots-container\">\n        <div class=\"title-dot title-dot-left\" (click)=\"title_slides.slideTo(0)\" [ngClass]=\"{'active': page === 'board'}\"></div>\n        <div class=\"title-dot title-dot-right\" (click)=\"title_slides.slideTo(1)\" [ngClass]=\"{'active': page === 'members'}\"></div>\n      </div>\n    </ion-row>\n    <div *ngIf=\"group\" class=\"header-bottom-padding\"></div>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <!--This is the Chat page-->\n  <div *ngIf=\"page === 'board'\">\n    <div class=\"default-background\" [ngStyle]=\"{'background-image': 'url(' + (group.background | background: group._id) + ')'}\"><!-- [ngClass]=\"{ 'opaque' : group.hasOwnProperty('background')}\">-->\n      <div class=\"default-title\" *ngIf=\"group.name\">\n        {{group.name}}\n      </div>\n    </div>\n    <!--group details-->\n    <div class=\"ion-padding\">\n      <p *ngIf=\"(group.beginAt && group.endAt)\"><ion-icon name=\"calendar\"></ion-icon>&nbsp;{{group.beginAt | datetime: 'h:n,m:n,w:s,m:n,d:n'}} - {{group.endAt | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n      <div *ngIf=\"group.churchId && group.meeting_location\">\n        <p [hidden]=\"!group.meeting_location.location\"><ion-icon name=\"pin\"></ion-icon>&nbsp;{{group.meeting_location.location}}</p>\n        <p><ion-icon name=\"pin\"></ion-icon>&nbsp;{{group.meeting_location.street}}<span [hidden]=\"(group.meeting_location.street.length==0)\">{{\", \"}}</span>{{group.meeting_location.city}}<span [hidden]=\"(group.meeting_location.city.length==0)||(group.meeting_location.state.length==0)\">{{\", \"}}</span>{{group.meeting_location.state}}<span [hidden]=\"(group.meeting_location.city.length==0)&&(group.meeting_location.state.length==0)\">&nbsp;</span>{{group.meeting_location.country}}</p>\n      </div>\n      <p *ngIf=\"group.details\" [innerHTML]=\"group.details\"></p>\n    </div>\n    <ion-list>\n      <ion-item lines=\"none\" color=\"grey\">Leaders</ion-item>\n      <ion-item *ngFor=\"let leader of group.leaders\" (click)=\"seeUserInfo($event, leader)\">\n        <ion-avatar slot=\"start\">\n          <img *ngIf=\"leader.avatar\" [src]=\"leader.avatar\"/>\n          <img *ngIf=\"!leader.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n        </ion-avatar>\n        {{leader.first_name}} {{leader.last_name}}\n      </ion-item>\n    </ion-list>\n    <ion-row *ngIf=\"joinGroupTag\"><ion-col><ion-button [hidden]=\"!joinGroupTag\" expand=\"full\" shape=\"round\" color=\"primary\" fill=\"solid\" (click)=\"joinGroup()\">Subscribe to Topic</ion-button></ion-col></ion-row>\n\n    <ion-item lines=\"none\" color=\"grey\">News</ion-item>\n    <ion-refresher (ionRefresh)=\"refresh($event)\" slot=\"fixed\">\n      <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <!--get new data when page is refreshed-->\n    <ion-item *ngIf=\"noPost\" lines=\"none\">\n      <p class=\"no-post-message ion-text-center\">This feed is empty.</p>\n    </ion-item>\n    <ion-card *ngFor=\"let post of boardposts\" (click)=\"openPost(post)\">\n      <ion-item lines=\"none\">\n        <ion-avatar slot=\"start\" (click)=\"seeUserInfo($event, post.author)\">\n          <img *ngIf=\"post.author.avatar\" [src]=\"post.author.avatar\"/>\n          <img *ngIf=\"!post.author.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n        </ion-avatar>\n        <div class=\"author-container\">\n          <div class=\"author ion-text-wrap\" >\n            {{post.author.first_name}} {{post.author.last_name}}\n            <ion-icon name=\"alert-circle\" *ngIf=\"post.status === 'review'\" (click)=\"boardService.explainPostAbuse($event, (hasAdminAccess || isGroupLeader) && post.author._id !== userData.user._id)\" color=\"grey\"></ion-icon>\n          </div>\n        </div>\n        <ion-col slot=\"end\" class=\"note-col\">\n          <p class=\"note\" class=\"ion-text-end\">{{post.updatedAt | datetime: 'm:l,d:n,y:n'}}</p>\n          <p class=\"note\" class=\"ion-text-end\">{{displayTimeElapsed(post.updatedAt)}}</p>\n        </ion-col>\n      </ion-item>\n      <div class=\"photo-frame\" *ngIf=\"post.attachments?.length\">\n        <img class=\"photo\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\"  [src]=\"post.attachments[0]\" (click)=\"focusPhoto($event, post.attachments[0])\"/>\n        <a [href]=\"post.attachments[0]\" *ngIf=\"(['doc', 'docx']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/docx.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n        <a [href]=\"post.attachments[0]\" *ngIf=\"(['xls', 'xlsx']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/xlsx.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n        <a [href]=\"post.attachments[0]\" *ngIf=\"(['pdf']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/pdf.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n        <a [href]=\"post.attachments[0]\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><img src=\"assets/img/file.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n        <div plyr [plyrSources]=\"[{ 'src': post.attachments[0], 'type': 'video/' + (post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, post.attachments[0])\" *ngIf=\"(['mp4', 'webm', 'ogg', 'mov']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" (click)=\"$event.stopPropagation()\"></div>\n      </div>\n      <div class=\"photo-frame\" *ngIf=\"post.media?.length\" (click)=\"resourceService.clickVideo($event, post.media[0].sources)\">\n          <div plyr [plyrSources]=\"post.media[0].sources\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, post.media[0]._id)\"></div>\n      </div>\n      <ion-card-content>\n        <p class=\"short-paragraph\" [innerHTML]=\"post.body | nl2br\"></p>\n      </ion-card-content>\n      <ion-item *ngIf=\"post.moments && post.moments.length && post.moments[0]._id\">\n        <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'User Defined Activity'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n          <div>\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length > 0\" [src]=\"post.moments[0].assets[0]\">\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length == 0\" src=\"assets/img/onboarding-3.jpg\">\n          </div>\n          <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].value[0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n          <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n        </div>\n        <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Track'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n          <div>\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length > 0\" [src]=\"post.moments[0].assets[0]\">\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length == 0\" src=\"assets/img/onboarding-3.jpg\">\n          </div>\n          <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n          <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n          <p class=\"moment-name\">{{post.moments[0].matrix_string[1][0]}}</p>\n        </div>\n        <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Event'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n          <div>\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length > 0\" [src]=\"post.moments[0].assets[0]\">\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length == 0\" src=\"assets/img/onboarding-3.jpg\">\n          </div>\n          <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n          <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n          <p class=\"moment-name\">{{post.moments[0].matrix_string[1][0]}}</p>\n        </div>\n        <!--Meetup-->\n        <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Meetup'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n          <div>\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length > 0\" [src]=\"post.moments[0].assets[0]\">\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length == 0\" src=\"assets/img/onboarding-3.jpg\">\n          </div>\n          <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n          <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n          <p class=\"moment-name\">{{post.moments[0].matrix_string[1][0]}}</p>\n        </div>\n        <!--Goal-->\n        <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Goal'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n          <div>\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length > 0\" [src]=\"post.moments[0].assets[0]\">\n            <img class=\"moment-image\" *ngIf=\"post.moments[0].assets.length == 0\" src=\"assets/img/onboarding-3.jpg\">\n          </div>\n          <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n          <p *ngIf=\"post.moments[0].calendar\" class=\"moment-date\" >Accomplish By: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n          <p class=\"moment-notes\">{{post.moments[0].matrix_string[1][0]}}</p>\n        </div>\n        <!-- Poll -->\n        <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0] && post.moments[0].resource && post.moments[0].resource.field === 'Poll'\">\n          <p>This poll is no longer available</p>\n        </div>\n        <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'User Defined Activity' && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] === 'Poll'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n          <ion-thumbnail class=\"pollIconDiv\">\n            <ion-img class=\"pollIcon\" src=\"assets/img/Poll_Gray.png\"></ion-img>\n          </ion-thumbnail>\n          <p class=\"pollQuestion\">{{post.moments[0].matrix_string[0][0]}}</p>\n          <div class=\"pollContainer\" *ngFor=\"let display of post.poll.display; index as count\">\n            <div class=\"optionsContainer\">\n              <p class=\"option\" >{{count+1}}. {{display.option}}</p>\n            </div>\n            <div class=\"votesContainer\">\n              <p class=\"votecount\">Votes: {{display.count}}</p>\n            </div>\n            <div class=\"userContainer\">\n              <ion-icon class=\"uservoted\" *ngIf=\"display.votedByUser\" name=\"checkmark\"></ion-icon>\n              <ion-button size=\"small\" shape=\"round\" fill='solid' color=\"darkgrey\" class=\"uservote ion-text-wrap\" *ngIf=\"!display.votedByUser\" (click)=\"momentService.submitVote($event, post.moments[0], count)\">Cast Vote</ion-button>\n            </div>\n          </div>\n          <div class=\"unresolvedPollFooter\" *ngIf=\"post.moments[0].resource.field === 'User Defined Activity'\">\n            <p>{{post.moments[0].resource['en-US'].matrix_string[1][4]}}: {{post.poll.totalVoteCount}}</p>\n            <p>{{post.moments[0].resource['en-US'].matrix_string[1][6]}}: {{post.moments[0].calendar.endDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n          </div>\n        </div>\n      </ion-item>\n      <ion-row>\n        <ion-col>\n          <ion-button fill=\"clear\" size=\"small\" (click)=\"likePost($event, post)\">\n            <ion-icon name=\"thumbs-up\"></ion-icon>\n            {{post.likes?.length}} Likes\n          </ion-button>\n        </ion-col>\n        <ion-col>\n          <ion-button fill=\"clear\" size=\"small\" (click)=\"openPost(post)\">\n            <ion-icon name=\"chatbox-ellipses\"></ion-icon>\n            {{post.comments?.length}} Comments\n          </ion-button>\n        </ion-col>\n        <ion-col>\n          <ion-button fill=\"clear\" size=\"small\" (click)=\"presentPickPeoplePopover($event)\">\n            <ion-icon name=\"share\"></ion-icon>Share\n          </ion-button>\n        </ion-col>\n      </ion-row>\n    </ion-card>\n    <ion-infinite-scroll position=\"bottom\" (ionInfinite)=\"listcommunityboardposts($event)\">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </div>\n  <!--This is the Members page-->\n  <div *ngIf=\"page === 'members'\">\n    <ion-searchbar [(ngModel)]=\"searchKeyword\" debounce=\"500\" (ionChange)=\"executeSearch($event)\" (ionCancel)=\"cancelSearch($event)\"></ion-searchbar>\n    <ion-list>\n      <ion-item *ngFor=\"let member of members\" (click)=\"seeUserInfo($event, member)\">\n        <ion-avatar slot=\"start\">\n          <img *ngIf=\"member.avatar\" [src]=\"member.avatar\"/>\n          <img *ngIf=\"!member.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n        </ion-avatar>\n        {{member.name}} <span *ngFor=\"let icon of member.icons\"><ion-icon name={{icon}}></ion-icon> </span><ion-badge *ngIf=\"member.badge\">{{member.role}}</ion-badge>\n        <ion-icon slot=\"end\" [hidden]=\"!editMemberTag\" name=\"cog\" (click)=\"editMember($event, member)\"></ion-icon>\n      </ion-item>\n      <div style=\"margin-top: 20%;\"></div>\n    </ion-list>\n    <ion-infinite-scroll position=\"bottom\" (ionInfinite)=\"listgroupmembers($event)\">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n    <ion-fab vertical=\"bottom\" horizontal=\"center\">\n      <ion-fab-button color=\"primary\" (click)=\"addMemberActionSheet()\"><ion-icon name=\"person-add\"></ion-icon></ion-fab-button>\n    </ion-fab>\n  </div>\n</ion-content>\n\n<!--\n<ion-footer *ngIf=\"page === 'board'\" class=\"message-footer\">\n  <ion-fab vertical=\"bottom\" horizontal=\"center\" *ngIf=\"isGroupLeader\">\n    <ion-fab-button (click)=\"createNewPost()\"><ion-icon name=\"add\"></ion-icon></ion-fab-button>\n  </ion-fab>\n</ion-footer>-->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/showboardpost/showboardpost.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/showboardpost/showboardpost.page.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal()\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title>{{resource['en-US'].matrix_string[0][2]}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"openActionSheet($event);\">\n        <ion-icon ios=\"ellipsis-horizontal\" md=\"ellipsis-vertical\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid style=\"height: 100%\" *ngIf=\"!loadCompleted\">\n    <ion-row class=\"ion-justify-content-start ion-align-items-center\" style=\"height: 100%\">\n      <ion-spinner name=\"dots\"></ion-spinner>\n    </ion-row>\n  </ion-grid>\n  <ion-card>\n    <ion-item class=\"header-container\" lines=\"none\">\n      <ion-avatar slot=\"start\" (click)=\"seeUserInfo($event, post.author)\">\n        <img class=\"avatar\" *ngIf=\"post.author.avatar\" [src]=\"post.author.avatar\"/>\n        <img class=\"avatar\" *ngIf=\"!post.author.avatar\" src=\"assets/img/avatar-default.jpg\"/>\n      </ion-avatar>\n      <div class=\"post-author-container\">\n        <div class=\"post-author ion-text-wrap\" >\n          {{post.author.first_name}} {{post.author.last_name}}\n          <ion-icon name=\"alert-circle\" *ngIf=\"post.status === 'review'\" (click)=\"boardService.explainPostAbuse($event, (hasAdminAccess || isGroupLeader) && post.author._id !== userData.user._id)\" color=\"grey\"></ion-icon>\n        </div>\n      </div>\n      <ion-col slot=\"end\" class=\"note-col\">\n        <p class=\"note\" class=\"ion-text-end\">{{post.createdAt | datetime: 'm:l,d:n,y:n'}}</p>\n        <p class=\"note\" class=\"ion-text-end\">{{displayTimeElapsed(post.createdAt)}}</p>\n      </ion-col>\n    </ion-item>\n    <div class=\"photo-frame\" *ngIf=\"post.attachments?.length\">\n      <img class=\"photo\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\"  [src]=\"post.attachments[0]\" (click)=\"focusPhoto($event, post.attachments[0])\"/>\n      <a [href]=\"post.attachments[0]\" *ngIf=\"(['doc', 'docx']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/docx.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n      <a [href]=\"post.attachments[0]\" *ngIf=\"(['xls', 'xlsx']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/xlsx.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n      <a [href]=\"post.attachments[0]\" *ngIf=\"(['pdf']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/pdf.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n      <a [href]=\"post.attachments[0]\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><img src=\"assets/img/file.svg\" /><p>{{post.attachments[0].substring(post.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n      <div plyr [plyrSources]=\"[{ 'src': post.attachments[0], 'type': 'video/' + (post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"player = $event\" *ngIf=\"(['mp4', 'webm', 'ogg', 'mov']).indexOf(post.attachments[0].substring(post.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" (click)=\"$event.stopPropagation()\"></div>\n    </div>\n    <div class=\"photo-frame\" *ngIf=\"post.media?.length\" (click)=\"resourceService.clickVideo($event, post.media[0].sources)\">\n      <div plyr [plyrSources]=\"post.media[0].sources\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"player = $event\" (plyrError)=\"videoError($event)\"></div>\n    </div>\n    <ion-card-content>\n      <p class=\"short-paragraph\" [innerHTML]=\"post.body | nl2br\"></p>\n    </ion-card-content>\n    <div class=\"photo-frame\" *ngIf=\"post.moments && post.moments.length && post.moments[0]._id && post.moments[0].resource && ['User Defined Activity','Track','Event','Goal','Meetup'].indexOf(post.moments[0].resource.field) > -1\">\n      <img class=\"photo\" *ngIf=\"post.moments[0].assets.length > 0\" [src]=\"post.moments[0].assets[0]\">\n    </div>\n    <ion-item *ngIf=\"post.moments && post.moments.length && post.moments[0]._id\" lines=\"none\">\n      <ion-thumbnail *ngIf=\"['User Defined Activity','Track','Event','Goal','Meetup','Poll'].indexOf(post.moments[0].resource.field) > -1  && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] !== 'Poll'\" slot=\"start\">\n        <img [src]=\"momentService.loadIcon(post.moments[0].resource.field).url\" />\n      </ion-thumbnail>\n      <!--User Defined Activity-->\n      <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'User Defined Activity'  && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] !== 'Poll'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n        <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].value[0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n      </div>\n      <!--Track-->\n      <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Track'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n        <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n        <p class=\"moment-name\">{{post.moments[0].matrix_string[0][1]}}</p>\n      </div>\n      <!--Event-->\n      <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Event'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n        <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n        <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n        <p class=\"moment-name\">{{post.moments[0].matrix_string[1][0]}}</p>\n      </div>\n      <!--Meetup-->\n      <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'Meetup'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n        <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n        <p class=\"moment-date\" >Date: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n        <p class=\"moment-name\">{{post.moments[0].matrix_string[1][0]}}</p>\n      </div>\n      <!--Goal-->\n      <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource && post.moments[0].resource.field === 'Goal'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n        <p class=\"moment-name\" >{{post.moments[0].resource['en-US'].matrix_string[0][0]}}: {{post.moments[0].matrix_string[0][0]}}</p>\n        <p *ngIf=\"post.moments[0].calendar\" class=\"moment-date\" >Accomplish By: {{post.moments[0].calendar.startDate | datetime: 'm:l,d:n,y:n'}}</p>\n        <p class=\"moment-notes\">{{post.moments[0].matrix_string[1][0]}}</p>\n      </div>\n      <!-- Poll -->\n      <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0] && post.moments[0].resource && post.moments[0].resource.field === 'Poll'\">\n        <p>This poll is no longer available</p>\n      </div>\n      <div class=\"moment ion-text-wrap\" *ngIf=\"post.moments[0].resource && post.moments[0].resource.field === 'User Defined Activity' && post.moments[0].resource.hasOwnProperty('en-US') && post.moments[0].resource['en-US'].value[0] === 'Poll'\"  (click)=\"openRestvoFeature($event, post.moments[0])\">\n        <ion-thumbnail class=\"pollIconDiv\">\n          <ion-img class=\"pollIcon\" src=\"assets/img/Poll_Gray.png\"></ion-img>\n        </ion-thumbnail>\n        <p class=\"pollQuestion\">{{post.moments[0].matrix_string[0][0]}}</p>\n        <div class=\"pollContainer\" *ngFor=\"let display of post.poll.display; index as count\">\n          <div class=\"optionsContainer\">\n            <p class=\"option\" >{{count+1}}. {{display.option}}</p>\n          </div>\n          <div class=\"votesContainer\">\n            <p class=\"votecount\">Votes: {{display.count}}</p>\n          </div>\n          <div class=\"userContainer\">\n            <ion-icon class=\"uservoted\" *ngIf=\"display.votedByUser\" name=\"checkmark\"></ion-icon>\n            <ion-button size=\"small\" shape=\"round\" fill='solid' color=\"darkgrey\" class=\"uservote ion-text-wrap\" *ngIf=\"!display.votedByUser\" (click)=\"momentService.submitVote($event, post.moments[0], count)\">Cast Vote</ion-button>\n          </div>\n        </div>\n        <div class=\"unresolvedPollFooter\" *ngIf=\"post.moments[0].resource.field === 'User Defined Activity'\">\n          <p>{{post.moments[0].resource['en-US'].matrix_string[1][4]}}: {{post.poll.totalVoteCount}}</p>\n          <p>{{post.moments[0].resource['en-US'].matrix_string[1][6]}}: {{post.moments[0].calendar.endDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n        </div>\n      </div>\n    </ion-item>\n    <ion-row>\n      <ion-col>\n        <ion-button fill=\"clear\" size=\"small\" (click)=\"likePost($event)\">\n          <ion-icon name=\"thumbs-up\"></ion-icon>\n          {{post.likes?.length}} Likes\n        </ion-button>\n      </ion-col>\n      <ion-col>\n        <ion-button fill=\"clear\" size=\"small\">\n          <ion-icon name=\"chatbox-ellipses\"></ion-icon>\n          {{post.comments?.length}} Comments\n        </ion-button>\n      </ion-col>\n      <ion-col>\n        <ion-button fill=\"clear\" size=\"small\" (click)=\"presentPickPeoplePopover($event)\">\n          <ion-icon name=\"share\"></ion-icon>Share</ion-button>\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf=\"hasAdminAccess || isGroupLeader || post.author._id === userData.user._id\">\n      <ion-col>\n        <ion-button fill=\"clear\" size=\"small\" (click)=\"editPost()\">\n          <ion-icon name=\"cog\"></ion-icon>\n          {{resource['en-US'].matrix_string[0][12]}} {{resource['en-US'].matrix_string[0][2]}}\n        </ion-button>\n      </ion-col>\n      <ion-col>\n        <ion-button fill=\"clear\" size=\"small\" (click)=\"deletePost()\">\n          <ion-icon name=\"trash\"></ion-icon>\n          {{resource['en-US'].matrix_string[0][10]}} {{resource['en-US'].matrix_string[0][2]}}\n        </ion-button>\n      </ion-col>\n      <ion-col></ion-col>\n    </ion-row>\n    <ion-item class=\"comment\" *ngFor=\"let lv1_comment of post.comments\" lines=\"none\">\n      <ion-avatar slot=\"start\" (click)=\"seeUserInfo($event, lv1_comment.author)\">\n        <img class=\"avatar\" *ngIf=\"lv1_comment.author && lv1_comment.author.avatar\" [src]=\"lv1_comment.author.avatar\"/>\n        <img class=\"avatar\" *ngIf=\"(lv1_comment.author && !lv1_comment.author.avatar) || lv1_comment.author_pending_member\" src=\"assets/img/avatar-default.jpg\"/>\n      </ion-avatar>\n      <div class=\"message-content\">\n        <div class=\"comment-author\" *ngIf=\"lv1_comment.author\">\n          {{ lv1_comment.author.first_name }}{{\" \"}}{{ lv1_comment.author.last_name }}\n        </div>\n        <div class=\"chat-bubble left\" *ngIf=\"!lv1_comment.moment\">\n          <div class=\"ion-text-wrap\">\n            <p class=\"message\" *ngIf=\"lv1_comment.body\" [innerHTML]=\"lv1_comment.body | nl2br\"></p>\n          </div>\n          <div class=\"photo-frame\" *ngIf=\"lv1_comment.attachments?.length\">\n            <ion-thumbnail *ngIf=\"(['jpg', 'jpeg', 'gif', 'png']).indexOf(lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" >\n              <ion-img [src]=\"lv1_comment.attachments[0]\" (click)=\"focusPhoto($event, lv1_comment.attachments[0])\"></ion-img>\n            </ion-thumbnail>\n            <a [href]=\"lv1_comment.attachments[0]\" *ngIf=\"(['doc', 'docx']).indexOf(lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/docx.svg\" /><p>{{lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n            <a [href]=\"lv1_comment.attachments[0]\" *ngIf=\"(['xls', 'xlsx']).indexOf(lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/xlsx.svg\" /><p>{{lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n            <a [href]=\"lv1_comment.attachments[0]\" *ngIf=\"(['pdf']).indexOf(lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" target=\"_blank\"><img src=\"assets/img/pdf.svg\" /><p>{{lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n            <a [href]=\"lv1_comment.attachments[0]\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><img src=\"assets/img/file.svg\" /><p>{{lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('/') + 1)}}</p></a>\n            <div plyr [plyrSources]=\"[{ 'src': lv1_comment.attachments[0], 'type': 'video/' + (lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"player = $event\" *ngIf=\"(['mp4', 'webm', 'ogg', 'mov']).indexOf(lv1_comment.attachments[0].substring(lv1_comment.attachments[0].lastIndexOf('.') + 1).toLowerCase()) > -1\" (click)=\"$event.stopPropagation()\"></div>\n          </div>\n          <div class=\"photo-frame\" *ngIf=\"lv1_comment.media?.length\" (click)=\"resourceService.clickVideo($event, lv1_comment.media[0].sources)\">\n            <div plyr [plyrSources]=\"lv1_comment.media[0].sources\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"player = $event\" (plyrError)=\"videoError($event)\"></div>\n          </div>\n          <!--<ion-icon class=\"reply-icon\" name=\"arrow-undo\" (click)=\"selectParentToReply(lv1_comment)\"></ion-icon>-->\n        </div>\n      </div>\n    </ion-item>\n  </ion-card>\n</ion-content>\n\n<ion-footer class=\"message-footer\">\n  <!-- Code start for quotation-->\n  <ion-toolbar class=\"replyQuote-wrapper\" *ngIf=\"selectParentTag\">\n    <div class=\"replyQuote-bubble\">\n      <div ion-row>\n        <div ion-col col-11>\n          <div class=\"message\" *ngIf=\"parent.body\" [innerHTML]=\"parent.body | nl2br\"></div>\n          <div *ngFor=\"let attachment of parent.attachments\">\n            <img [src]=\"attachment\" />\n          </div>\n          <div class=\"message-detail\" *ngIf=\"parent.author\">\n            <em><b>{{ parent.author.first_name }}{{\" \"}}{{ parent.author.last_name }}</b></em>\n          </div>\n          <div class=\"message-detail\" *ngIf=\"parent.author_pending_member\">\n            <em><b>{{ parent.author_pending_member.name }}</b></em>\n          </div>\n        </div>\n        <div ion-col>\n          <ion-icon class=\"closeReply\" name=\"close-circle\" (click)=\"closeSelectParent()\"></ion-icon>\n        </div>\n      </div>\n    </div>\n  </ion-toolbar>\n  <!-- Code end for quotation-->\n  <ion-toolbar class=\"ion-no-padding\">\n    <div class=\"message-form\">\n      <ion-buttons>\n        <ion-button class=\"moreButton\" fill=\"clear\" (click)=\"messageMoreOptions()\">\n          <ion-icon name=\"add-circle\" size=\"large\" color=\"grey\"></ion-icon>\n        </ion-button>\n      </ion-buttons>\n      <ion-textarea rows=\"1\" [minRows]=\"1\" [maxRows]=\"4\" autosize [(ngModel)]=\"composedComment\" autocapitalize></ion-textarea>\n      <ion-buttons>\n        <ion-button class=\"actionButton\" (click)=\"sendComment()\" fill=\"clear\" [disabled]=\"!composedComment?.length\">\n          <img class=\"sendImage\" src=\"assets/img/Send_Gray.png\"/>\n        </ion-button>\n      </ion-buttons>\n      <!--<ion-button (click)=\"recordAudio()\" fill=\"clear\" *ngIf=\"platform.is('cordova') && !composedComment.length && listening === false\" >\n        <img class=\"recordAudioImg\" src=\"assets/img/microphone.png\"/>\n      </ion-button>\n      <ion-button (click)=\"stopListening()\" fill=\"clear\" *ngIf=\"listening === true\">\n        <img class=\"recordAudioImg\" src=\"assets/img/no-microphone.png\"/>\n      </ion-button>-->\n    </div>\n  </ion-toolbar>\n  <ion-toolbar id=\"expandable\" *ngIf=\"moreOptions\" class=\"ion-no-padding\">\n    <div class=\"moreoptions\">\n      <ion-grid class=\"moreGrid\">\n        <ion-row class=\"topRow\" ion-align-self-center>\n          <ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\"> <img class=\"colelement\" (click)=\"takePhotoAndUpload()\" src=\"assets/img/Camera_Gray.png\" /><div class=\"moreLabel\">Camera</div></ion-col>\n          <ion-col *ngIf=\"platform.is('cordova')\" class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\">\n            <img class=\"colelement\" (click)=\"selectPhotoFromDeviceAndUpload($event)\" src=\"assets/img/Album_Gray.png\" />\n            <div class=\"moreLabel\">Album</div>\n          </ion-col>\n          <ion-col *ngIf=\"!platform.is('cordova')\" class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\">\n            <label for=\"image\"><img class=\"colelement\" src=\"assets/img/Album_Gray.png\" /></label>\n            <div class=\"moreLabel\">Album</div>\n            <input type=\"file\" class=\"file-picker\" name=\"image\" id=\"image\" (change)=\"selectPhotoFromDeviceAndUpload($event)\" accept=\"image/*\"/>\n          </ion-col>\n          <ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\">\n            <label for=\"file\"><img class=\"colelement\" src=\"assets/img/Folder_Gray.png\" /></label>\n            <div class=\"moreLabel\">Upload</div>\n            <input type=\"file\" class=\"file-picker\" name=\"file\" id=\"file\" (change)=\"selectFileFromDeviceAndUpload($event, 'file')\" />\n          </ion-col>\n          <ion-col class=\"optionscol ion-align-self-center\" size-xs=\"3\" size-sm=\"3\" size-md=\"3\" size-lg=\"2\" size-xl=\"2\"> <img class=\"colelement\" (click)=\"pickFeatureModalPage($event, 'User Defined Activity')\" src=\"assets/img/Calendar_Gray.png\" /><div class=\"moreLabel\">Library</div></ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n  </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "./src/app/pages/board/editboardpost/editboardpost.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/board/editboardpost/editboardpost.page.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-editboardpost {\n  /*    .bottomRow {\n        padding: 0 10px;\n        margin-bottom: 14px;\n        height: 80px;\n        width: 100%;\n        float: left;\n      }*/\n}\napp-editboardpost ion-item ion-datetime {\n  position: relative !important;\n}\napp-editboardpost ion-item ion-select {\n  position: relative !important;\n}\napp-editboardpost .pixabay-grid {\n  max-height: 200px;\n  overflow: scroll;\n}\napp-editboardpost #custom-select {\n  padding: 0;\n  width: 100% !important;\n}\napp-editboardpost .delete-container {\n  width: 14%;\n  float: right;\n}\napp-editboardpost .side-image {\n  height: 100%;\n  width: 100%;\n  float: left;\n}\napp-editboardpost .side-icon {\n  height: 100%;\n  width: 100%;\n  float: left;\n}\napp-editboardpost .post-label {\n  width: 20px;\n  height: 20px;\n}\napp-editboardpost .month-title {\n  color: var(--ion-color-grey);\n  display: inline-block;\n}\napp-editboardpost .post-input {\n  height: 30%;\n  width: 90%;\n  float: left;\n}\napp-editboardpost .post-input ::-webkit-input-placeholder {\n  color: #cecece;\n}\napp-editboardpost .post-input ::-moz-placeholder {\n  color: #cecece;\n}\napp-editboardpost .post-input :-ms-input-placeholder {\n  color: #cecece;\n}\napp-editboardpost .post-input ::-ms-input-placeholder {\n  color: #cecece;\n}\napp-editboardpost .post-input ::placeholder {\n  color: #cecece;\n}\napp-editboardpost input {\n  border: none;\n}\napp-editboardpost .event-photo-container {\n  width: 80%;\n  margin-bottom: 10px;\n}\napp-editboardpost .event-photo {\n  width: 100%;\n  height: 100%;\n}\napp-editboardpost .remove-photo {\n  width: 20%;\n}\napp-editboardpost .monthview {\n  width: 85%;\n  margin-left: 7.5%;\n  margin-right: 7.5%;\n}\napp-editboardpost .monthview-day-headers {\n  font-size: large;\n  width: 13%;\n  padding: 5% 0 5% 0;\n  display: inline-block;\n  color: var(--ion-color-grey);\n  text-align: center;\n}\napp-editboardpost .monthview-element {\n  font-size: large;\n  width: 14%;\n  padding: 1% 1% 3% 1%;\n  display: inline-block;\n  text-align: center;\n}\napp-editboardpost .underline-datestring {\n  text-decoration: underline;\n}\napp-editboardpost .selected-date {\n  background-color: var(--ion-color-lightgrey);\n  border-radius: 50%;\n}\napp-editboardpost .moment {\n  width: 95%;\n  margin: 5px auto;\n  border-radius: 5px;\n  padding: 10px 12px 10px 12px;\n  position: relative;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n  background-color: #f0f0f0;\n}\napp-editboardpost .moment h2, app-editboardpost .moment p {\n  color: black;\n}\napp-editboardpost .moment-image {\n  max-height: 20%;\n  width: 100%;\n  border-radius: 5%;\n}\napp-editboardpost .superimposedIcon {\n  position: absolute;\n  bottom: 50%;\n  right: 40%;\n  height: 20%;\n}\napp-editboardpost .moment-name {\n  font-weight: bold;\n  width: 100%;\n}\napp-editboardpost .moment-date {\n  width: 100%;\n  font-weight: bold;\n}\napp-editboardpost .moment-notes {\n  width: 100%;\n  font-weight: bold;\n}\napp-editboardpost .goalFooter {\n  font-style: italic;\n  font-weight: lighter;\n  text-align: center;\n}\napp-editboardpost .pollIconDiv {\n  height: 20%;\n  width: 100%;\n}\napp-editboardpost .pollIconDiv .pollIcon {\n  height: 1.8em;\n  width: 10%;\n  margin-left: 45%;\n  margin-right: 45%;\n}\napp-editboardpost .pollQuestion {\n  color: black;\n  font-size: medium;\n  font-style: italic;\n}\napp-editboardpost .pollContainer {\n  width: 100%;\n  display: inline-block;\n  clear: both;\n  border-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4) !important;\n  padding: 2px;\n}\napp-editboardpost .optionsContainer {\n  float: left;\n  width: 60%;\n}\napp-editboardpost .optionsContainer .option {\n  padding-top: 5px;\n  float: left;\n  font-size: medium;\n  font-weight: bold;\n}\napp-editboardpost .votesContainer {\n  float: left;\n  width: 20%;\n}\napp-editboardpost .votesContainer .votecount {\n  padding-top: 10px;\n  color: black;\n  font-size: x-small;\n}\napp-editboardpost .userContainer {\n  float: right;\n  width: 20%;\n}\napp-editboardpost .userContainer .uservote {\n  border-radius: 50px;\n  background-color: #9b9b9b;\n}\napp-editboardpost .userContainer .uservoted {\n  padding-top: 5px;\n  margin: 0 40%;\n}\napp-editboardpost .section-title {\n  color: white;\n  background-color: var(--ion-color-grey);\n  text-align: left;\n  font-size: large;\n}\napp-editboardpost .moreGrid {\n  width: 100%;\n}\napp-editboardpost .topRow {\n  padding: 0 10px;\n  margin-top: 2px;\n  margin-bottom: 14px;\n  width: 100%;\n}\napp-editboardpost .optionscol {\n  height: 100%;\n  width: 100%;\n}\napp-editboardpost .optionscol .colelement {\n  height: 50px;\n  width: 50px;\n  padding: 10px;\n  display: table;\n  margin: 2% auto;\n  border-radius: 10px;\n  border-style: solid;\n  border-width: 1px;\n  background-color: #FFFFFF;\n  border-color: #CCCCCC;\n}\napp-editboardpost .optionscol .moreLabel {\n  display: table;\n  margin: 0 auto;\n  color: #969696;\n  font-size: medium;\n}\napp-editboardpost .pageRow {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2JvYXJkL2VkaXRib2FyZHBvc3QvZWRpdGJvYXJkcG9zdC5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2JvYXJkL2VkaXRib2FyZHBvc3QvZWRpdGJvYXJkcG9zdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUEwUEU7Ozs7OztRQUFBO0FDbFBGO0FETkU7RUFDRSw2QkFBQTtBQ1FKO0FETEU7RUFDRSw2QkFBQTtBQ09KO0FESkU7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0FDTUo7QURIRTtFQUNFLFVBQUE7RUFDQSxzQkFBQTtBQ0tKO0FEQUU7RUFDRSxVQUFBO0VBQ0EsWUFBQTtBQ0VKO0FERUU7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7QUNBSjtBREdFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0FDREo7QURJRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FDRko7QURLRTtFQUNFLDRCQUFBO0VBQ0EscUJBQUE7QUNISjtBRE1FO0VBQ0UsV0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FDSko7QURLSTtFQUNFLGNBQUE7QUNITjtBREVJO0VBQ0UsY0FBQTtBQ0hOO0FERUk7RUFDRSxjQUFBO0FDSE47QURFSTtFQUNFLGNBQUE7QUNITjtBREVJO0VBQ0UsY0FBQTtBQ0hOO0FET0U7RUFDRSxZQUFBO0FDTEo7QURRRTtFQUNFLFVBQUE7RUFDQSxtQkFBQTtBQ05KO0FEU0U7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQ1BKO0FEVUU7RUFDRSxVQUFBO0FDUko7QURXRTtFQUNFLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FDVEo7QURZRTtFQUNFLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0FDVko7QURjRTtFQUNFLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtBQ1pKO0FEZUU7RUFDRSwwQkFBQTtBQ2JKO0FEZ0JFO0VBQ0UsNENBQUE7RUFDQSxrQkFBQTtBQ2RKO0FEdUJFO0VBQ0UsVUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtBQ3JCSjtBRHNCSTtFQUNFLFlBQUE7QUNwQk47QUR3QkU7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FDdEJKO0FEeUJFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QUN2Qko7QUQwQkU7RUFDRSxpQkFBQTtFQUNBLFdBQUE7QUN4Qko7QUQyQkU7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7QUN6Qko7QUQ0QkU7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7QUMxQko7QUQ2QkU7RUFDRSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7QUMzQko7QURnQ0U7RUFDRSxXQUFBO0VBQ0EsV0FBQTtBQzlCSjtBRGdDSTtFQUNFLGFBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQzlCTjtBRGtDRTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FDaENKO0FEbUNFO0VBQ0UsV0FBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EscURBQUE7RUFDQSxZQUFBO0FDakNKO0FEb0NFO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUNsQ0o7QURtQ0k7RUFDRSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0FDakNOO0FEcUNFO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUNuQ0o7QURvQ0k7RUFDRSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ2xDTjtBRHNDRTtFQUNFLFlBQUE7RUFDQSxVQUFBO0FDcENKO0FEcUNJO0VBQ0UsbUJBQUE7RUFDQSx5QkFBQTtBQ25DTjtBRHFDSTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtBQ25DTjtBRHlDRTtFQUNFLFlBQUE7RUFDQSx1Q0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUN2Q0o7QUQwQ0U7RUFDRSxXQUFBO0FDeENKO0FEMkNFO0VBQ0UsZUFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUN6Q0o7QURxREU7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQ25ESjtBRHFESTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBR0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQ3JETjtBRHdESTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FDdEROO0FEMERFO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUN4REoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ib2FyZC9lZGl0Ym9hcmRwb3N0L2VkaXRib2FyZHBvc3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLWVkaXRib2FyZHBvc3Qge1xuXG4gIGlvbi1pdGVtIGlvbi1kYXRldGltZXtcbiAgICBwb3NpdGlvbjpyZWxhdGl2ZSAhaW1wb3J0YW50O1xuICB9XG5cbiAgaW9uLWl0ZW0gaW9uLXNlbGVjdHtcbiAgICBwb3NpdGlvbjpyZWxhdGl2ZSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLnBpeGFiYXktZ3JpZCB7XG4gICAgbWF4LWhlaWdodDogMjAwcHg7XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgfVxuXG4gICNjdXN0b20tc2VsZWN0IHtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgLy93aWR0aDogOTAlICFpbXBvcnRhbnQ7XG4gICAgLy9mbG9hdDogbGVmdDtcbiAgfVxuXG4gIC5kZWxldGUtY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTQlO1xuICAgIGZsb2F0OiByaWdodDtcbiAgfVxuXG5cbiAgLnNpZGUtaW1hZ2V7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZsb2F0OmxlZnQ7XG4gIH1cblxuICAuc2lkZS1pY29ue1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmbG9hdDogbGVmdDtcbiAgfVxuXG4gIC5wb3N0LWxhYmVse1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgfVxuXG4gIC5tb250aC10aXRsZSB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cblxuICAucG9zdC1pbnB1dHtcbiAgICBoZWlnaHQ6IDMwJTtcbiAgICB3aWR0aDogOTAlO1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIDo6cGxhY2Vob2xkZXJ7XG4gICAgICBjb2xvcjogI2NlY2VjZTtcbiAgICB9XG4gIH1cblxuICBpbnB1dCB7XG4gICAgYm9yZGVyOiBub25lO1xuICB9XG5cbiAgLmV2ZW50LXBob3RvLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDgwJTtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB9XG5cbiAgLmV2ZW50LXBob3RvIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAucmVtb3ZlLXBob3RvIHtcbiAgICB3aWR0aDogMjAlO1xuICB9XG5cbiAgLm1vbnRodmlldyB7XG4gICAgd2lkdGg6IDg1JTtcbiAgICBtYXJnaW4tbGVmdDogNy41JTtcbiAgICBtYXJnaW4tcmlnaHQ6IDcuNSU7XG4gIH1cblxuICAubW9udGh2aWV3LWRheS1oZWFkZXJzIHtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICAgIHdpZHRoOiAxMyU7XG4gICAgcGFkZGluZzogNSUgMCA1JSAwO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICB9XG5cbiAgLm1vbnRodmlldy1lbGVtZW50IHtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICAgIHdpZHRoOiAxNCU7XG4gICAgcGFkZGluZzogMSUgMSUgMyUgMSU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC51bmRlcmxpbmUtZGF0ZXN0cmluZyB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIH1cblxuICAuc2VsZWN0ZWQtZGF0ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB9XG5cbiAgLy8uc2VsZWN0ZWQtZGF0ZS10eXBlIHtcbiAgLy8gIGJhY2tncm91bmQtY29sb3I6IG1hcF9nZXQoICRjb2xvcnMgLCBsaWdodC1ncmV5ICk7XG4gIC8vfVxuXG5cbiAgLy9tb21lbnRzXG4gIC5tb21lbnQge1xuICAgIHdpZHRoOiA5NSU7XG4gICAgbWFyZ2luOiA1cHggYXV0bztcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgcGFkZGluZzogMTBweCAxMnB4IDEwcHggMTJweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogdGV4dDtcbiAgICAtbW96LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAgIC1tcy11c2VyLXNlbGVjdDogdGV4dDtcbiAgICB1c2VyLXNlbGVjdDogdGV4dDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuICAgIGgyLCBwIHtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICB9XG4gIH1cblxuICAubW9tZW50LWltYWdlIHtcbiAgICBtYXgtaGVpZ2h0OiAyMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyLXJhZGl1czogNSU7XG5cbiAgfVxuICAuc3VwZXJpbXBvc2VkSWNvbntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiA1MCU7XG4gICAgcmlnaHQ6IDQwJTtcbiAgICBoZWlnaHQ6IDIwJTtcbiAgfVxuXG4gIC5tb21lbnQtbmFtZXtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5tb21lbnQtZGF0ZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgfVxuICAubW9tZW50LW5vdGVzIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgfVxuXG4gIC5nb2FsRm9vdGVyIHtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cblxuICAvL1BvbGwgbWVzc2FnZVxuICAucG9sbEljb25EaXYge1xuICAgIGhlaWdodDogMjAlO1xuICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgLnBvbGxJY29ue1xuICAgICAgaGVpZ2h0OiAxLjhlbTtcbiAgICAgIHdpZHRoOiAxMCU7XG4gICAgICBtYXJnaW4tbGVmdDogNDUlO1xuICAgICAgbWFyZ2luLXJpZ2h0OiA0NSU7XG4gICAgfVxuICB9XG5cbiAgLnBvbGxRdWVzdGlvbiB7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgfVxuXG4gIC5wb2xsQ29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgY2xlYXI6IGJvdGg7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmc6IDJweDtcbiAgfVxuXG4gIC5vcHRpb25zQ29udGFpbmVye1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiA2MCU7XG4gICAgLm9wdGlvbntcbiAgICAgIHBhZGRpbmctdG9wOiA1cHg7XG4gICAgICBmbG9hdDogbGVmdDtcbiAgICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICB9XG5cbiAgLnZvdGVzQ29udGFpbmVyIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogMjAlO1xuICAgIC52b3RlY291bnR7XG4gICAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcbiAgICB9XG4gIH1cblxuICAudXNlckNvbnRhaW5lcntcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgd2lkdGg6IDIwJTtcbiAgICAudXNlcnZvdGV7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzliOWI5YjtcbiAgICB9XG4gICAgLnVzZXJ2b3RlZHtcbiAgICAgIHBhZGRpbmctdG9wOiA1cHg7XG4gICAgICBtYXJnaW46IDAgNDAlO1xuICAgIH1cbiAgfVxuXG4gIC8vcmVzdHZvIGZlYXR1cmVzIG1vcmUgZ3JpZFxuXG4gIC5zZWN0aW9uLXRpdGxlIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgfVxuXG4gIC5tb3JlR3JpZHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC50b3BSb3d7XG4gICAgcGFkZGluZzogMCAxMHB4O1xuICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxNHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIC8vZmxvYXQ6IGxlZnQ7XG4gIH1cblxuICAvKiAgICAuYm90dG9tUm93IHtcbiAgICAgICAgcGFkZGluZzogMCAxMHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxNHB4O1xuICAgICAgICBoZWlnaHQ6IDgwcHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgIH0qL1xuXG4gIC5vcHRpb25zY29sIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICAuY29sZWxlbWVudCB7XG4gICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIC8vbWF4LWhlaWdodDogNzUlO1xuICAgICAgLy9tYXgtd2lkdGg6IDcwJTtcbiAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICAgIG1hcmdpbjogMiUgYXV0bztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICAgICAgYm9yZGVyLWNvbG9yOiAjQ0NDQ0NDO1xuICAgIH1cblxuICAgIC5tb3JlTGFiZWwge1xuICAgICAgZGlzcGxheTogdGFibGU7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgIGNvbG9yOiAjOTY5Njk2O1xuICAgICAgZm9udC1zaXplOiBtZWRpdW07XG4gICAgfVxuICB9XG5cbiAgLnBhZ2VSb3d7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDE0cHg7XG4gIH1cbn0iLCJhcHAtZWRpdGJvYXJkcG9zdCB7XG4gIC8qICAgIC5ib3R0b21Sb3cge1xuICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDE0cHg7XG4gICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgfSovXG59XG5hcHAtZWRpdGJvYXJkcG9zdCBpb24taXRlbSBpb24tZGF0ZXRpbWUge1xuICBwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IGlvbi1pdGVtIGlvbi1zZWxlY3Qge1xuICBwb3NpdGlvbjogcmVsYXRpdmUgIWltcG9ydGFudDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5waXhhYmF5LWdyaWQge1xuICBtYXgtaGVpZ2h0OiAyMDBweDtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0ICNjdXN0b20tc2VsZWN0IHtcbiAgcGFkZGluZzogMDtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5kZWxldGUtY29udGFpbmVyIHtcbiAgd2lkdGg6IDE0JTtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLnNpZGUtaW1hZ2Uge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBmbG9hdDogbGVmdDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5zaWRlLWljb24ge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBmbG9hdDogbGVmdDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5wb3N0LWxhYmVsIHtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5tb250aC10aXRsZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5wb3N0LWlucHV0IHtcbiAgaGVpZ2h0OiAzMCU7XG4gIHdpZHRoOiA5MCU7XG4gIGZsb2F0OiBsZWZ0O1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLnBvc3QtaW5wdXQgOjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiAjY2VjZWNlO1xufVxuYXBwLWVkaXRib2FyZHBvc3QgaW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAuZXZlbnQtcGhvdG8tY29udGFpbmVyIHtcbiAgd2lkdGg6IDgwJTtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5ldmVudC1waG90byB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAucmVtb3ZlLXBob3RvIHtcbiAgd2lkdGg6IDIwJTtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5tb250aHZpZXcge1xuICB3aWR0aDogODUlO1xuICBtYXJnaW4tbGVmdDogNy41JTtcbiAgbWFyZ2luLXJpZ2h0OiA3LjUlO1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLm1vbnRodmlldy1kYXktaGVhZGVycyB7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIHdpZHRoOiAxMyU7XG4gIHBhZGRpbmc6IDUlIDAgNSUgMDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAubW9udGh2aWV3LWVsZW1lbnQge1xuICBmb250LXNpemU6IGxhcmdlO1xuICB3aWR0aDogMTQlO1xuICBwYWRkaW5nOiAxJSAxJSAzJSAxJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAudW5kZXJsaW5lLWRhdGVzdHJpbmcge1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5zZWxlY3RlZC1kYXRlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5tb21lbnQge1xuICB3aWR0aDogOTUlO1xuICBtYXJnaW46IDVweCBhdXRvO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDEwcHggMTJweCAxMHB4IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogdGV4dDtcbiAgLW1vei11c2VyLXNlbGVjdDogdGV4dDtcbiAgLW1zLXVzZXItc2VsZWN0OiB0ZXh0O1xuICB1c2VyLXNlbGVjdDogdGV4dDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5tb21lbnQgaDIsIGFwcC1lZGl0Ym9hcmRwb3N0IC5tb21lbnQgcCB7XG4gIGNvbG9yOiBibGFjaztcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5tb21lbnQtaW1hZ2Uge1xuICBtYXgtaGVpZ2h0OiAyMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiA1JTtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5zdXBlcmltcG9zZWRJY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDUwJTtcbiAgcmlnaHQ6IDQwJTtcbiAgaGVpZ2h0OiAyMCU7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAubW9tZW50LW5hbWUge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAubW9tZW50LWRhdGUge1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAubW9tZW50LW5vdGVzIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLmdvYWxGb290ZXIge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAucG9sbEljb25EaXYge1xuICBoZWlnaHQ6IDIwJTtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAucG9sbEljb25EaXYgLnBvbGxJY29uIHtcbiAgaGVpZ2h0OiAxLjhlbTtcbiAgd2lkdGg6IDEwJTtcbiAgbWFyZ2luLWxlZnQ6IDQ1JTtcbiAgbWFyZ2luLXJpZ2h0OiA0NSU7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAucG9sbFF1ZXN0aW9uIHtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLnBvbGxDb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBjbGVhcjogYm90aDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCkgIWltcG9ydGFudDtcbiAgcGFkZGluZzogMnB4O1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLm9wdGlvbnNDb250YWluZXIge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDYwJTtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5vcHRpb25zQ29udGFpbmVyIC5vcHRpb24ge1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBmbG9hdDogbGVmdDtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLnZvdGVzQ29udGFpbmVyIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHdpZHRoOiAyMCU7XG59XG5hcHAtZWRpdGJvYXJkcG9zdCAudm90ZXNDb250YWluZXIgLnZvdGVjb3VudCB7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtc2l6ZTogeC1zbWFsbDtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC51c2VyQ29udGFpbmVyIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICB3aWR0aDogMjAlO1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLnVzZXJDb250YWluZXIgLnVzZXJ2b3RlIHtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzliOWI5Yjtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC51c2VyQ29udGFpbmVyIC51c2Vydm90ZWQge1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBtYXJnaW46IDAgNDAlO1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLnNlY3Rpb24tdGl0bGUge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZm9udC1zaXplOiBsYXJnZTtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5tb3JlR3JpZCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWVkaXRib2FyZHBvc3QgLnRvcFJvdyB7XG4gIHBhZGRpbmc6IDAgMTBweDtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5vcHRpb25zY29sIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5vcHRpb25zY29sIC5jb2xlbGVtZW50IHtcbiAgaGVpZ2h0OiA1MHB4O1xuICB3aWR0aDogNTBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgZGlzcGxheTogdGFibGU7XG4gIG1hcmdpbjogMiUgYXV0bztcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIGJvcmRlci1jb2xvcjogI0NDQ0NDQztcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5vcHRpb25zY29sIC5tb3JlTGFiZWwge1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGNvbG9yOiAjOTY5Njk2O1xuICBmb250LXNpemU6IG1lZGl1bTtcbn1cbmFwcC1lZGl0Ym9hcmRwb3N0IC5wYWdlUm93IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDE0cHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/board/editboardpost/editboardpost.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/board/editboardpost/editboardpost.page.ts ***!
  \*****************************************************************/
/*! exports provided: EditboardpostPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditboardpostPage", function() { return EditboardpostPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_board_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/board.service */ "./src/app/services/board.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../feature/pickfeature-popover/pickfeature-popover.page */ "./src/app/pages/feature/pickfeature-popover/pickfeature-popover.page.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
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













var EditboardpostPage = /** @class */ (function () {
    function EditboardpostPage(elRef, renderer, geolocation, cache, platform, modalCtrl, toastCtrl, actionSheetCtrl, alertCtrl, resourceService, momentService, boardService, userData, awsService) {
        var _this = this;
        this.elRef = elRef;
        this.renderer = renderer;
        this.geolocation = geolocation;
        this.cache = cache;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.resourceService = resourceService;
        this.momentService = momentService;
        this.boardService = boardService;
        this.userData = userData;
        this.awsService = awsService;
        this.churchId = '';
        this.searchKeyword = '';
        this.resource = {};
        this.loadCompleted = false;
        this.subscriptions = {};
        this.refreshBoardHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var data_1, alert_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(res && res.type === 'refresh board' && res.boardId === this.boardId)) return [3 /*break*/, 5];
                        data_1 = res.data;
                        if (!(data_1.action === 'update post' && data_1.post.author._id !== this.userData.user._id)) return [3 /*break*/, 4];
                        if (!(this.post.bucketId === data_1.post.bucketId && this.post._id === data_1.post._id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: "Post changed",
                                message: "Another administrator has updated this post.",
                                buttons: [{ text: 'Accept external changes',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    this.post.body = data_1.post.body;
                                                    this.post.attachments = data_1.post.attachments;
                                                    this.awsService.sessionAssets = this.post.attachments;
                                                    if (this.post.media && this.post.media.length && data_1.post.media && !data_1.post.media.length) {
                                                        if (this.player)
                                                            this.player.destroy();
                                                    }
                                                    this.post.moments = data_1.post.moments;
                                                    return [2 /*return*/];
                                                });
                                            }); });
                                        } },
                                    { text: 'Cancel' }],
                                cssClass: 'level-15'
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        if (data_1.action === 'delete post') {
                            if (this.post.bucketId === data_1.bucketId && this.post._id === data_1.postId) {
                                //just update the body and attachments
                                if (this.player)
                                    this.player.destroy();
                                this.closeModal(false);
                            }
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.churchId = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
        this.resource = { "en-US": { matrix_string: [[''], [''], [''], ['']] } };
    }
    EditboardpostPage.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.post) {
            this.post = {
                body: '',
                attachments: [],
                media: [],
                moments: [],
                groups: [],
                users: [],
                status: "published"
            };
        }
        else {
            this.post = JSON.parse(JSON.stringify(this.post)); //clone the object
            this.awsService.sessionAssets = this.post.attachments;
        }
        var loadResource = this.resourceService.load('en-US', "Board");
        var resource = this.cache.loadFromDelayedObservable('loadResource: Board', loadResource, 'resource', 3600, 'none');
        resource.subscribe(function (result) {
            _this.resource = result[0];
        }, function (err) { return __awaiter(_this, void 0, void 0, function () {
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
        this.loadCompleted = true;
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshBoardHandler);
    };
    EditboardpostPage.prototype.pickFeatureModalPage = function (event, typeOfMoment) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, moments, err_1, networkAlert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 7]);
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_10__["PickfeaturePopoverPage"], componentProps: { title: 'Choose from Library', typeOfMoment: typeOfMoment } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        moments = (_a.sent()).data;
                        if (moments && moments.length) {
                            this.post.moments = moments;
                        }
                        return [3 /*break*/, 7];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'No Internet Connection',
                                message: 'Please check your internet connection.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 5:
                        networkAlert = _a.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.takePhotoAndUpload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Camera, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_11__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_11__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_11__["CameraSource"].Camera,
                                correctOrientation: false
                            })];
                    case 1:
                        image = _a.sent();
                        if (!image) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.awsService.uploadImage('communities', this.churchId, image, this.boardId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.promptVideoUpload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Embed Video',
                            inputs: [{
                                    name: 'youtube',
                                    type: 'radio',
                                    label: 'Youtube',
                                    value: 'youtube',
                                    checked: true
                                } /*,
                                {
                                    name: 'oauth2',
                                    type: 'radio',
                                    label: 'Login to Youtube',
                                    value: 'oauth2'
                                },
                                {
                                    name: 'digital ocean',
                                    type: 'radio',
                                    label: 'Digital Ocean',
                                    value: 'do'
                                }*/
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel video upload');
                                        return;
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (provider) {
                                        if (provider === 'oauth2') {
                                            //this.oauthLogin();
                                        }
                                        else if (provider === 'do') {
                                            var source = {
                                                type: 'video',
                                                sources: [{
                                                        src: 'https://wee.nyc3.digitaloceanspaces.com/app/test.mp4',
                                                        type: 'video/mp4'
                                                    }],
                                                author: _this.userData.user._id
                                            };
                                            _this.post.media.push(source);
                                        }
                                        else {
                                            _this.promptVideoUrl(provider);
                                        }
                                    }
                                }
                            ],
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
    EditboardpostPage.prototype.promptVideoUrl = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var alert2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Input the Youtube link',
                            inputs: [{
                                    name: 'src',
                                    type: 'text',
                                    placeholder: 'Youtube link'
                                }],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel video upload');
                                        return;
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        var source = {
                                            type: 'video',
                                            sources: [{
                                                    src: data.src,
                                                    provider: provider
                                                }],
                                            author: _this.userData.user._id
                                        };
                                        _this.post.media = [];
                                        _this.post.media.push(source);
                                    }
                                }
                            ],
                            cssClass: 'level-15'
                        })];
                    case 1:
                        alert2 = _a.sent();
                        return [4 /*yield*/, alert2.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.selectPhotoFromDeviceAndUpload = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var Camera, image, compressed, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        if (!this.platform.is('cordova')) return [3 /*break*/, 3];
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_11__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_11__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_11__["CameraSource"].Photos,
                                correctOrientation: false
                            })];
                    case 1:
                        image = _a.sent();
                        return [4 /*yield*/, this.awsService.uploadImage('communities', this.churchId, image, this.boardId)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.awsService.compressPhoto(event.target.files[0])];
                    case 4:
                        compressed = _a.sent();
                        return [4 /*yield*/, this.awsService.uploadFile('boards', this.userData.user._id, compressed, this.boardId)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.selectFileFromDeviceAndUpload = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.awsService.uploadFile('communities', this.churchId, event.target.files[0], this.boardId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.removePhoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.awsService.sessionAssets.pop();
                return [2 /*return*/];
            });
        });
    };
    EditboardpostPage.prototype.removeVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.player)
                    this.player.destroy();
                this.post.media = [];
                return [2 /*return*/];
            });
        });
    };
    EditboardpostPage.prototype.shareLocation = function () {
        var _this = this;
        console.log("load current location...");
        //Find the device's location
        this.geolocation.getCurrentPosition().then(function (position) {
            console.log("geolocation returning results...");
            var yourPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log("Geolocation Latitude is: " + yourPosition.lat + "Longitude is: " + yourPosition.lng);
            //this.updateMap(yourPosition);
            _this.post.body += (_this.post.body.length ? " " : '') + "https://www.google.com/maps/search/?api=1&query=" + yourPosition.lat + "+%2C" + yourPosition.lng;
        }).catch(function (err) {
            console.log('Error getting location', err);
        });
    };
    EditboardpostPage.prototype.removeMoment = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.post.moments.splice(0, 1);
                return [2 /*return*/];
            });
        });
    };
    EditboardpostPage.prototype.seeUserInfo = function (event, user) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        user.name = user.first_name + " " + user.last_name;
                        if (!user._id) return [3 /*break*/, 3];
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_9__["ShowrecipientinfoPage"], componentProps: { recipient: user, modalPage: true } })];
                    case 1:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.openRestvoFeature = function (event, moment) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_12__["ShowfeaturePage"], componentProps: { moment: moment, modalPage: true } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.reloadMoment(moment._id);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.reloadMoment = function (momentId) {
        return __awaiter(this, void 0, void 0, function () {
            var moment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.momentService.load(momentId)];
                    case 1:
                        moment = _a.sent();
                        this.post.moments.splice(0, moment);
                        return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.deletePost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: this.resource['en-US'].matrix_string[0][10] + ' ' + this.resource['en-US'].matrix_string[0][2],
                            message: this.resource['en-US'].matrix_string[0][11],
                            buttons: [{ text: 'Ok',
                                    handler: function () {
                                        var navTransition = alert.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var e_1, _a, _b, _c, attachment, e_1_1;
                                            return __generator(this, function (_d) {
                                                switch (_d.label) {
                                                    case 0:
                                                        if (!(this.post.attachments && this.post.attachments.length)) return [3 /*break*/, 8];
                                                        _d.label = 1;
                                                    case 1:
                                                        _d.trys.push([1, 6, 7, 8]);
                                                        _b = __values(this.post.attachments), _c = _b.next();
                                                        _d.label = 2;
                                                    case 2:
                                                        if (!!_c.done) return [3 /*break*/, 5];
                                                        attachment = _c.value;
                                                        if (!attachment.length) return [3 /*break*/, 4];
                                                        return [4 /*yield*/, this.awsService.removeFile(attachment)];
                                                    case 3:
                                                        _d.sent();
                                                        _d.label = 4;
                                                    case 4:
                                                        _c = _b.next();
                                                        return [3 /*break*/, 2];
                                                    case 5: return [3 /*break*/, 8];
                                                    case 6:
                                                        e_1_1 = _d.sent();
                                                        e_1 = { error: e_1_1 };
                                                        return [3 /*break*/, 8];
                                                    case 7:
                                                        try {
                                                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                                        }
                                                        finally { if (e_1) throw e_1.error; }
                                                        return [7 /*endfinally*/];
                                                    case 8: return [4 /*yield*/, this.boardService.deletePost(this.boardId, this.post.bucketId, this.post._id)];
                                                    case 9:
                                                        _d.sent();
                                                        if (this.player)
                                                            this.player.destroy();
                                                        this.closeModal(true);
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
    EditboardpostPage.prototype.presentToast = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: text,
                            duration: 3000,
                            position: 'top'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.savePost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.post.body.length) {
                            this.presentToast("Please say something .");
                            return [2 /*return*/];
                        }
                        // process the photos upload and clean up
                        this.awsService.cleanUp(this.boardId, this.post.attachments);
                        this.post.attachments = this.awsService.sessionAssets;
                        console.log("The post looks like this: " + JSON.stringify(this.post));
                        if (!this.post._id) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.boardService.updatePost(this.boardId, this.post)];
                    case 2:
                        _a.sent(); //this.post.bucketId will also be sent
                        this.closeModal(true);
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        this.closeModal(false);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 7];
                    case 5: //creating a new event
                    return [4 /*yield*/, this.boardService.createPost(this.boardId, { boardId: this.boardId, post: this.post })];
                    case 6:
                        _a.sent();
                        this.closeModal(true);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    EditboardpostPage.prototype.closeModal = function (refreshNeeded) {
        //erase uploaded but abandoned files
        this.awsService.cleanUp(this.boardId, true);
        if (this.player)
            this.player.destroy();
        this.modalCtrl.dismiss(refreshNeeded);
    };
    EditboardpostPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshBoardHandler);
    };
    EditboardpostPage.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] },
        { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_3__["Geolocation"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_2__["CacheService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_6__["Resource"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_4__["Moment"] },
        { type: _services_board_service__WEBPACK_IMPORTED_MODULE_5__["Board"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_7__["UserData"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_8__["Aws"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonInfiniteScroll"])
    ], EditboardpostPage.prototype, "infiniteScroll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('textArea', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditboardpostPage.prototype, "textArea", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pixaBay', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], EditboardpostPage.prototype, "pixaBay", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EditboardpostPage.prototype, "boardId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], EditboardpostPage.prototype, "post", void 0);
    EditboardpostPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-editboardpost',
            template: __importDefault(__webpack_require__(/*! raw-loader!./editboardpost.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/editboardpost/editboardpost.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./editboardpost.page.scss */ "./src/app/pages/board/editboardpost/editboardpost.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_3__["Geolocation"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_2__["CacheService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_6__["Resource"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_4__["Moment"],
            _services_board_service__WEBPACK_IMPORTED_MODULE_5__["Board"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_7__["UserData"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_8__["Aws"]])
    ], EditboardpostPage);
    return EditboardpostPage;
}());



/***/ }),

/***/ "./src/app/pages/board/groupboard/groupboard.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/board/groupboard/groupboard.page.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("app-groupboard {\n  /*  .title-dot-middle {\n      margin: 0 10px;\n    }*/\n}\napp-groupboard .titles {\n  margin: 0 10%;\n}\napp-groupboard .title {\n  font-style: bold;\n}\napp-groupboard .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-groupboard .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 1.2em;\n  color: #fff;\n}\napp-groupboard .arrow {\n  display: table-cell;\n  vertical-align: middle;\n}\napp-groupboard .arrow .left {\n  float: left;\n}\napp-groupboard .arrow .right {\n  float: right;\n}\napp-groupboard .title-dots-row {\n  position: absolute;\n  bottom: 10px;\n  left: 0;\n  width: 100%;\n}\napp-groupboard .title-dots-container {\n  margin: 0 auto;\n  width: 35px;\n}\napp-groupboard .title-dot {\n  display: inline-block;\n  height: 5px;\n  width: 5px;\n  background-color: #9b9b9b;\n  border-radius: 100%;\n}\napp-groupboard .title-dot-left {\n  margin: 0 5px;\n}\napp-groupboard .title-dot-right {\n  margin: 0 5px;\n}\napp-groupboard .header-bottom-padding {\n  height: 15px;\n  width: 100%;\n}\napp-groupboard .no-post-message {\n  margin: 0 auto;\n  font-style: italic;\n  color: grey;\n}\napp-groupboard .active {\n  background-color: #4a4a4a;\n}\napp-groupboard .avatar {\n  width: 40px !important;\n  height: 40px !important;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\napp-groupboard .author-container {\n  width: 100%;\n}\napp-groupboard .author {\n  margin: 10px 0 2px 0;\n  display: block;\n  width: 100%;\n}\napp-groupboard .date {\n  margin: 0 0 5px 0;\n  color: lightgrey;\n}\napp-groupboard .photo-frame {\n  margin: 0 auto;\n  width: 100%;\n}\napp-groupboard .photo {\n  width: 100%;\n  height: 100%;\n}\napp-groupboard .short-paragraph {\n  color: var(--ion-color-dark);\n  max-height: 80px;\n  line-height: 20px;\n  /* Height / no. of lines to display */\n  overflow: hidden;\n}\napp-groupboard .note-col {\n  height: 100%;\n  padding-left: 0;\n  margin-left: 3px;\n}\napp-groupboard .note {\n  color: lightgrey;\n  width: 100%;\n  margin: 5px 0 0 0;\n}\napp-groupboard .moment {\n  width: 85%;\n  margin: 0 auto;\n  border-radius: 5px;\n  padding: 10px 12px 10px 12px;\n  position: relative;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n  background-color: #9b9b9b;\n}\napp-groupboard .moment h2, app-groupboard .moment p {\n  color: #fff;\n}\napp-groupboard .moment-image {\n  max-height: 20%;\n  width: 100%;\n  border-radius: 5%;\n}\napp-groupboard .superimposedIcon {\n  position: absolute;\n  bottom: 50%;\n  right: 40%;\n  height: 20%;\n}\napp-groupboard .moment-name {\n  font-weight: bold;\n  width: 100%;\n}\napp-groupboard .moment-date {\n  width: 100%;\n  font-weight: bold;\n}\napp-groupboard .moment-notes {\n  width: 100%;\n  font-weight: bold;\n}\napp-groupboard .goalFooter {\n  font-style: italic;\n  font-weight: lighter;\n  text-align: center;\n}\napp-groupboard .pollIconDiv {\n  height: 20%;\n  width: 100%;\n}\napp-groupboard .pollIconDiv .pollIcon {\n  height: 1.8em;\n  width: 10%;\n  margin-left: 45%;\n  margin-right: 45%;\n}\napp-groupboard .pollQuestion {\n  color: black;\n  font-size: medium;\n  font-style: italic;\n}\napp-groupboard .pollContainer {\n  width: 100%;\n  display: inline-block;\n  clear: both;\n  border-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4) !important;\n  padding: 2px;\n}\napp-groupboard .optionsContainer {\n  float: left;\n  width: 68%;\n}\napp-groupboard .optionsContainer .option {\n  padding-top: 5px;\n  float: left;\n  font-size: medium;\n  font-weight: bold;\n}\napp-groupboard .votesContainer {\n  float: left;\n  width: 20%;\n}\napp-groupboard .votesContainer .votecount {\n  padding-top: 10px;\n  color: black;\n  font-size: x-small;\n}\napp-groupboard .userContainer {\n  float: right;\n  width: 20%;\n}\napp-groupboard .userContainer .uservote {\n  border-radius: 50px;\n  background-color: #9b9b9b;\n}\napp-groupboard .userContainer .uservoted {\n  padding-top: 5px;\n  margin: 0 40%;\n}\napp-groupboard .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-groupboard .opaque {\n  opacity: 0.6;\n}\napp-groupboard .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 2em;\n  color: #fff;\n  -webkit-text-stroke: thin;\n  /*    text-shadow:\n              -1px -1px 0 #000,\n              1px -1px 0 #000,\n              -1px 1px 0 #000,\n              1px 1px 0 #000;*/\n}\napp-groupboard .section-title {\n  color: white;\n  --background: var(--ion-color-grey);\n  text-align: left;\n  font-size: large;\n}\napp-groupboard .avatar {\n  width: 40px !important;\n  height: 40px !important;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\napp-groupboard .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-groupboard .opaque {\n  opacity: 0.6;\n}\napp-groupboard .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 2em;\n  color: #fff;\n  -webkit-text-stroke: thin;\n  /*    text-shadow:\n              -1px -1px 0 #000,\n              1px -1px 0 #000,\n              -1px 1px 0 #000,\n              1px 1px 0 #000;*/\n}\napp-groupboard .section-title {\n  color: white;\n  --background: var(--ion-color-grey);\n  text-align: left;\n  font-size: large;\n}\napp-groupboard .avatar {\n  width: 40px !important;\n  height: 40px !important;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2JvYXJkL2dyb3VwYm9hcmQvZ3JvdXBib2FyZC5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2JvYXJkL2dyb3VwYm9hcmQvZ3JvdXBib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUE0REE7O01BQUE7QUN4REE7QURGRTtFQUNFLGFBQUE7QUNJSjtBRERFO0VBQ0UsZ0JBQUE7QUNHSjtBREFFO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0FDRUo7QURDRTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQ0NKO0FERUU7RUFDRSxtQkFBQTtFQUNBLHNCQUFBO0FDQUo7QURDSTtFQUNFLFdBQUE7QUNDTjtBRENJO0VBQ0UsWUFBQTtBQ0NOO0FER0U7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtBQ0RKO0FESUU7RUFDRSxjQUFBO0VBQ0EsV0FBQTtBQ0ZKO0FES0U7RUFDRSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtBQ0hKO0FETUU7RUFDRSxhQUFBO0FDSko7QURXRTtFQUNFLGFBQUE7QUNUSjtBRFlFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUNWSjtBRGFFO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQ1hKO0FEY0U7RUFDRSx5QkFBQTtBQ1pKO0FEZUU7RUFDRSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7S0FBQSxpQkFBQTtBQ2JKO0FEZ0JFO0VBQ0UsV0FBQTtBQ2RKO0FEaUJFO0VBQ0Usb0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBQ2ZKO0FEa0JFO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtBQ2hCSjtBRG1CRTtFQUNFLGNBQUE7RUFDQSxXQUFBO0FDakJKO0FEb0JFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNsQko7QURxQkU7RUFDRSw0QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFBbUIscUNBQUE7RUFDbkIsZ0JBQUE7QUNsQko7QURxQkU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDbkJKO0FEc0JFO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUNwQko7QUR5QkU7RUFDRSxVQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7QUN2Qko7QUR3Qkk7RUFDRSxXQUFBO0FDdEJOO0FEMEJFO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtBQ3hCSjtBRDJCRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FDekJKO0FENEJFO0VBQ0UsaUJBQUE7RUFDQSxXQUFBO0FDMUJKO0FENkJFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FDM0JKO0FEOEJFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FDNUJKO0FEK0JFO0VBQ0Usa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0FDN0JKO0FEa0NFO0VBQ0UsV0FBQTtFQUNBLFdBQUE7QUNoQ0o7QURrQ0k7RUFDRSxhQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUNoQ047QURvQ0U7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQ2xDSjtBRHFDRTtFQUNFLFdBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLHFEQUFBO0VBQ0EsWUFBQTtBQ25DSjtBRHNDRTtFQUNFLFdBQUE7RUFDQSxVQUFBO0FDcENKO0FEcUNJO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQ25DTjtBRHVDRTtFQUNFLFdBQUE7RUFDQSxVQUFBO0FDckNKO0FEc0NJO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNwQ047QUR3Q0U7RUFDRSxZQUFBO0VBQ0EsVUFBQTtBQ3RDSjtBRHVDSTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7QUNyQ047QUR1Q0k7RUFDRSxnQkFBQTtFQUNBLGFBQUE7QUNyQ047QUR5Q0U7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7QUN2Q0o7QUQwQ0U7RUFDRSxZQUFBO0FDeENKO0FEMkNFO0VBQ0UsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtFQUNBOzs7OzhCQUFBO0FDckNKO0FENENFO0VBQ0UsWUFBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQzFDSjtBRDZDRTtFQUNFLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtLQUFBLGlCQUFBO0FDM0NKO0FEZ0RFO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0FDOUNKO0FEaURFO0VBQ0UsWUFBQTtBQy9DSjtBRGtERTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDQTs7Ozs4QkFBQTtBQzVDSjtBRG1ERTtFQUNFLFlBQUE7RUFDQSxtQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUNqREo7QURvREU7RUFDRSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7S0FBQSxpQkFBQTtBQ2xESiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2JvYXJkL2dyb3VwYm9hcmQvZ3JvdXBib2FyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtZ3JvdXBib2FyZCB7XG5cbiAgLnRpdGxlcyB7XG4gICAgbWFyZ2luOiAwIDEwJTtcbiAgfVxuXG4gIC50aXRsZSB7XG4gICAgZm9udC1zdHlsZTogYm9sZDtcbiAgfVxuXG4gIC5kZWZhdWx0LWJhY2tncm91bmQge1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuZGVmYXVsdC10aXRsZSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDEuMmVtO1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG5cbiAgLmFycm93IHtcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgLmxlZnQge1xuICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgfVxuICAgIC5yaWdodCB7XG4gICAgICBmbG9hdDogcmlnaHQ7XG4gICAgfVxuICB9XG5cbiAgLnRpdGxlLWRvdHMtcm93IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAxMHB4O1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAudGl0bGUtZG90cy1jb250YWluZXIge1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHdpZHRoOiAzNXB4O1xuICB9XG5cbiAgLnRpdGxlLWRvdCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGhlaWdodDogNXB4O1xuICAgIHdpZHRoOiAgNXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM5YjliOWI7XG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgfVxuXG4gIC50aXRsZS1kb3QtbGVmdCB7XG4gICAgbWFyZ2luOiAwIDVweDtcbiAgfVxuXG4vKiAgLnRpdGxlLWRvdC1taWRkbGUge1xuICAgIG1hcmdpbjogMCAxMHB4O1xuICB9Ki9cblxuICAudGl0bGUtZG90LXJpZ2h0IHtcbiAgICBtYXJnaW46IDAgNXB4O1xuICB9XG5cbiAgLmhlYWRlci1ib3R0b20tcGFkZGluZyB7XG4gICAgaGVpZ2h0OiAxNXB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLm5vLXBvc3QtbWVzc2FnZSB7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIGNvbG9yOiBncmV5O1xuICB9XG5cbiAgLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRhNGE0YTtcbiAgfVxuXG4gIC5hdmF0YXIge1xuICAgIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0IDogNDBweCAhaW1wb3J0YW50O1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICB9XG5cbiAgLmF1dGhvci1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmF1dGhvciB7XG4gICAgbWFyZ2luOiAxMHB4IDAgMnB4IDA7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuZGF0ZSB7XG4gICAgbWFyZ2luOiAwIDAgNXB4IDA7XG4gICAgY29sb3I6IGxpZ2h0Z3JleTtcbiAgfVxuXG4gIC5waG90by1mcmFtZSB7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAucGhvdG8ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuXG4gIC5zaG9ydC1wYXJhZ3JhcGgge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgbWF4LWhlaWdodDogODBweDtcbiAgICBsaW5lLWhlaWdodDogMjBweDsgLyogSGVpZ2h0IC8gbm8uIG9mIGxpbmVzIHRvIGRpc3BsYXkgKi9cbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLm5vdGUtY29sIHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiAzcHg7XG4gIH1cblxuICAubm90ZSB7XG4gICAgY29sb3I6IGxpZ2h0Z3JleTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDVweCAwIDAgMDtcbiAgfVxuXG4gIC8vbW9tZW50c1xuXG4gIC5tb21lbnQge1xuICAgIHdpZHRoOiA4NSU7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDEwcHggMTJweCAxMHB4IDEycHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgLW1vei11c2VyLXNlbGVjdDogdGV4dDtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzliOWI5YjtcbiAgICBoMiwgcCB7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICB9XG4gIH1cblxuICAubW9tZW50LWltYWdlIHtcbiAgICBtYXgtaGVpZ2h0OiAyMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyLXJhZGl1czogNSU7XG5cbiAgfVxuICAuc3VwZXJpbXBvc2VkSWNvbntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiA1MCU7XG4gICAgcmlnaHQ6IDQwJTtcbiAgICBoZWlnaHQ6IDIwJTtcbiAgfVxuXG4gIC5tb21lbnQtbmFtZXtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5tb21lbnQtZGF0ZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgfVxuICAubW9tZW50LW5vdGVze1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB9XG5cbiAgLmdvYWxGb290ZXJ7XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG5cbiAgLy9Qb2xsIG1lc3NhZ2VcbiAgLnBvbGxJY29uRGl2e1xuICAgIGhlaWdodDogMjAlO1xuICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgLnBvbGxJY29ue1xuICAgICAgaGVpZ2h0OiAxLjhlbTtcbiAgICAgIHdpZHRoOiAxMCU7XG4gICAgICBtYXJnaW4tbGVmdDogNDUlO1xuICAgICAgbWFyZ2luLXJpZ2h0OiA0NSU7XG4gICAgfVxuICB9XG5cbiAgLnBvbGxRdWVzdGlvbntcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgZm9udC1zaXplOiBtZWRpdW07XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICB9XG5cbiAgLnBvbGxDb250YWluZXJ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGNsZWFyOiBib3RoO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCkgIWltcG9ydGFudDtcbiAgICBwYWRkaW5nOiAycHg7XG4gIH1cblxuICAub3B0aW9uc0NvbnRhaW5lcntcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogNjglO1xuICAgIC5vcHRpb257XG4gICAgICBwYWRkaW5nLXRvcDogNXB4O1xuICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICBmb250LXNpemU6IG1lZGl1bTtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cbiAgfVxuXG4gIC52b3Rlc0NvbnRhaW5lcntcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogMjAlO1xuICAgIC52b3RlY291bnR7XG4gICAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcbiAgICB9XG4gIH1cblxuICAudXNlckNvbnRhaW5lcntcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgd2lkdGg6IDIwJTtcbiAgICAudXNlcnZvdGV7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzliOWI5YjtcbiAgICB9XG4gICAgLnVzZXJ2b3RlZHtcbiAgICAgIHBhZGRpbmctdG9wOiA1cHg7XG4gICAgICBtYXJnaW46IDAgNDAlO1xuICAgIH1cbiAgfS8vIGFib3V0XG5cbiAgLmRlZmF1bHQtYmFja2dyb3VuZCB7XG4gICAgZGlzcGxheTogdGFibGU7XG4gICAgbWluLWhlaWdodDogMTUwcHg7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5vcGFxdWUge1xuICAgIG9wYWNpdHk6IDAuNjtcbiAgfVxuXG4gIC5kZWZhdWx0LXRpdGxlIHtcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMi4wZW07XG4gICAgY29sb3I6ICNmZmY7XG4gICAgLXdlYmtpdC10ZXh0LXN0cm9rZTogdGhpbjtcbiAgICAvKiAgICB0ZXh0LXNoYWRvdzpcbiAgICAgICAgICAgICAgICAtMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgICAgIDFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgICAtMXB4IDFweCAwICMwMDAsXG4gICAgICAgICAgICAgICAgMXB4IDFweCAwICMwMDA7Ki9cbiAgfVxuXG4gIC5zZWN0aW9uLXRpdGxlIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICB9XG5cbiAgLmF2YXRhciB7XG4gICAgd2lkdGg6IDQwcHggIWltcG9ydGFudDtcbiAgICBoZWlnaHQgOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gIH1cblxuICAvLyBhYm91dFxuXG4gIC5kZWZhdWx0LWJhY2tncm91bmQge1xuICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIG1pbi1oZWlnaHQ6IDE1MHB4O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAub3BhcXVlIHtcbiAgICBvcGFjaXR5OiAwLjY7XG4gIH1cblxuICAuZGVmYXVsdC10aXRsZSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXNpemU6IDIuMGVtO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIC13ZWJraXQtdGV4dC1zdHJva2U6IHRoaW47XG4gICAgLyogICAgdGV4dC1zaGFkb3c6XG4gICAgICAgICAgICAgICAgLTFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgICAxcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAgICAgLTFweCAxcHggMCAjMDAwLFxuICAgICAgICAgICAgICAgIDFweCAxcHggMCAjMDAwOyovXG4gIH1cblxuICAuc2VjdGlvbi10aXRsZSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgZm9udC1zaXplOiBsYXJnZTtcbiAgfVxuXG4gIC5hdmF0YXIge1xuICAgIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0IDogNDBweCAhaW1wb3J0YW50O1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICB9XG59XG5cbiIsImFwcC1ncm91cGJvYXJkIHtcbiAgLyogIC50aXRsZS1kb3QtbWlkZGxlIHtcbiAgICAgIG1hcmdpbjogMCAxMHB4O1xuICAgIH0qL1xufVxuYXBwLWdyb3VwYm9hcmQgLnRpdGxlcyB7XG4gIG1hcmdpbjogMCAxMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAudGl0bGUge1xuICBmb250LXN0eWxlOiBib2xkO1xufVxuYXBwLWdyb3VwYm9hcmQgLmRlZmF1bHQtYmFja2dyb3VuZCB7XG4gIGRpc3BsYXk6IHRhYmxlO1xuICBtaW4taGVpZ2h0OiAxNTBweDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAuZGVmYXVsdC10aXRsZSB7XG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjJlbTtcbiAgY29sb3I6ICNmZmY7XG59XG5hcHAtZ3JvdXBib2FyZCAuYXJyb3cge1xuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuYXBwLWdyb3VwYm9hcmQgLmFycm93IC5sZWZ0IHtcbiAgZmxvYXQ6IGxlZnQ7XG59XG5hcHAtZ3JvdXBib2FyZCAuYXJyb3cgLnJpZ2h0IHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuYXBwLWdyb3VwYm9hcmQgLnRpdGxlLWRvdHMtcm93IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDEwcHg7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWdyb3VwYm9hcmQgLnRpdGxlLWRvdHMtY29udGFpbmVyIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHdpZHRoOiAzNXB4O1xufVxuYXBwLWdyb3VwYm9hcmQgLnRpdGxlLWRvdCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiA1cHg7XG4gIHdpZHRoOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5YjliOWI7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAudGl0bGUtZG90LWxlZnQge1xuICBtYXJnaW46IDAgNXB4O1xufVxuYXBwLWdyb3VwYm9hcmQgLnRpdGxlLWRvdC1yaWdodCB7XG4gIG1hcmdpbjogMCA1cHg7XG59XG5hcHAtZ3JvdXBib2FyZCAuaGVhZGVyLWJvdHRvbS1wYWRkaW5nIHtcbiAgaGVpZ2h0OiAxNXB4O1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1ncm91cGJvYXJkIC5uby1wb3N0LW1lc3NhZ2Uge1xuICBtYXJnaW46IDAgYXV0bztcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBjb2xvcjogZ3JleTtcbn1cbmFwcC1ncm91cGJvYXJkIC5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGE0YTRhO1xufVxuYXBwLWdyb3VwYm9hcmQgLmF2YXRhciB7XG4gIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNDBweCAhaW1wb3J0YW50O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbmFwcC1ncm91cGJvYXJkIC5hdXRob3ItY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAuYXV0aG9yIHtcbiAgbWFyZ2luOiAxMHB4IDAgMnB4IDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1ncm91cGJvYXJkIC5kYXRlIHtcbiAgbWFyZ2luOiAwIDAgNXB4IDA7XG4gIGNvbG9yOiBsaWdodGdyZXk7XG59XG5hcHAtZ3JvdXBib2FyZCAucGhvdG8tZnJhbWUge1xuICBtYXJnaW46IDAgYXV0bztcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAucGhvdG8ge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuYXBwLWdyb3VwYm9hcmQgLnNob3J0LXBhcmFncmFwaCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIG1heC1oZWlnaHQ6IDgwcHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAvKiBIZWlnaHQgLyBuby4gb2YgbGluZXMgdG8gZGlzcGxheSAqL1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuYXBwLWdyb3VwYm9hcmQgLm5vdGUtY29sIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG4gIG1hcmdpbi1sZWZ0OiAzcHg7XG59XG5hcHAtZ3JvdXBib2FyZCAubm90ZSB7XG4gIGNvbG9yOiBsaWdodGdyZXk7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDVweCAwIDAgMDtcbn1cbmFwcC1ncm91cGJvYXJkIC5tb21lbnQge1xuICB3aWR0aDogODUlO1xuICBtYXJnaW46IDAgYXV0bztcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4IDEycHggMTBweCAxMnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IHRleHQ7XG4gIC1tb3otdXNlci1zZWxlY3Q6IHRleHQ7XG4gIC1tcy11c2VyLXNlbGVjdDogdGV4dDtcbiAgdXNlci1zZWxlY3Q6IHRleHQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5YjliOWI7XG59XG5hcHAtZ3JvdXBib2FyZCAubW9tZW50IGgyLCBhcHAtZ3JvdXBib2FyZCAubW9tZW50IHAge1xuICBjb2xvcjogI2ZmZjtcbn1cbmFwcC1ncm91cGJvYXJkIC5tb21lbnQtaW1hZ2Uge1xuICBtYXgtaGVpZ2h0OiAyMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiA1JTtcbn1cbmFwcC1ncm91cGJvYXJkIC5zdXBlcmltcG9zZWRJY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDUwJTtcbiAgcmlnaHQ6IDQwJTtcbiAgaGVpZ2h0OiAyMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAubW9tZW50LW5hbWUge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAubW9tZW50LWRhdGUge1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5hcHAtZ3JvdXBib2FyZCAubW9tZW50LW5vdGVzIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuYXBwLWdyb3VwYm9hcmQgLmdvYWxGb290ZXIge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5hcHAtZ3JvdXBib2FyZCAucG9sbEljb25EaXYge1xuICBoZWlnaHQ6IDIwJTtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAucG9sbEljb25EaXYgLnBvbGxJY29uIHtcbiAgaGVpZ2h0OiAxLjhlbTtcbiAgd2lkdGg6IDEwJTtcbiAgbWFyZ2luLWxlZnQ6IDQ1JTtcbiAgbWFyZ2luLXJpZ2h0OiA0NSU7XG59XG5hcHAtZ3JvdXBib2FyZCAucG9sbFF1ZXN0aW9uIHtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xufVxuYXBwLWdyb3VwYm9hcmQgLnBvbGxDb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBjbGVhcjogYm90aDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCkgIWltcG9ydGFudDtcbiAgcGFkZGluZzogMnB4O1xufVxuYXBwLWdyb3VwYm9hcmQgLm9wdGlvbnNDb250YWluZXIge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDY4JTtcbn1cbmFwcC1ncm91cGJvYXJkIC5vcHRpb25zQ29udGFpbmVyIC5vcHRpb24ge1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBmbG9hdDogbGVmdDtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuYXBwLWdyb3VwYm9hcmQgLnZvdGVzQ29udGFpbmVyIHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHdpZHRoOiAyMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAudm90ZXNDb250YWluZXIgLnZvdGVjb3VudCB7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtc2l6ZTogeC1zbWFsbDtcbn1cbmFwcC1ncm91cGJvYXJkIC51c2VyQ29udGFpbmVyIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICB3aWR0aDogMjAlO1xufVxuYXBwLWdyb3VwYm9hcmQgLnVzZXJDb250YWluZXIgLnVzZXJ2b3RlIHtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzliOWI5Yjtcbn1cbmFwcC1ncm91cGJvYXJkIC51c2VyQ29udGFpbmVyIC51c2Vydm90ZWQge1xuICBwYWRkaW5nLXRvcDogNXB4O1xuICBtYXJnaW46IDAgNDAlO1xufVxuYXBwLWdyb3VwYm9hcmQgLmRlZmF1bHQtYmFja2dyb3VuZCB7XG4gIGRpc3BsYXk6IHRhYmxlO1xuICBtaW4taGVpZ2h0OiAxNTBweDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBib2FyZCAub3BhcXVlIHtcbiAgb3BhY2l0eTogMC42O1xufVxuYXBwLWdyb3VwYm9hcmQgLmRlZmF1bHQtdGl0bGUge1xuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMmVtO1xuICBjb2xvcjogI2ZmZjtcbiAgLXdlYmtpdC10ZXh0LXN0cm9rZTogdGhpbjtcbiAgLyogICAgdGV4dC1zaGFkb3c6XG4gICAgICAgICAgICAgIC0xcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAgIDFweCAtMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgLTFweCAxcHggMCAjMDAwLFxuICAgICAgICAgICAgICAxcHggMXB4IDAgIzAwMDsqL1xufVxuYXBwLWdyb3VwYm9hcmQgLnNlY3Rpb24tdGl0bGUge1xuICBjb2xvcjogd2hpdGU7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXNpemU6IGxhcmdlO1xufVxuYXBwLWdyb3VwYm9hcmQgLmF2YXRhciB7XG4gIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNDBweCAhaW1wb3J0YW50O1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbmFwcC1ncm91cGJvYXJkIC5kZWZhdWx0LWJhY2tncm91bmQge1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgbWluLWhlaWdodDogMTUwcHg7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWdyb3VwYm9hcmQgLm9wYXF1ZSB7XG4gIG9wYWNpdHk6IDAuNjtcbn1cbmFwcC1ncm91cGJvYXJkIC5kZWZhdWx0LXRpdGxlIHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDJlbTtcbiAgY29sb3I6ICNmZmY7XG4gIC13ZWJraXQtdGV4dC1zdHJva2U6IHRoaW47XG4gIC8qICAgIHRleHQtc2hhZG93OlxuICAgICAgICAgICAgICAtMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgICAxcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAgIC0xcHggMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgMXB4IDFweCAwICMwMDA7Ki9cbn1cbmFwcC1ncm91cGJvYXJkIC5zZWN0aW9uLXRpdGxlIHtcbiAgY29sb3I6IHdoaXRlO1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZm9udC1zaXplOiBsYXJnZTtcbn1cbmFwcC1ncm91cGJvYXJkIC5hdmF0YXIge1xuICB3aWR0aDogNDBweCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDQwcHggIWltcG9ydGFudDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/board/groupboard/groupboard.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/board/groupboard/groupboard.page.ts ***!
  \***********************************************************/
/*! exports provided: GroupboardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupboardPage", function() { return GroupboardPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/call-number/ngx */ "./node_modules/@ionic-native/call-number/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_board_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/board.service */ "./src/app/services/board.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _services_response_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/response.service */ "./src/app/services/response.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _editboardpost_editboardpost_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../editboardpost/editboardpost.page */ "./src/app/pages/board/editboardpost/editboardpost.page.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _showboardpost_showboardpost_page__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../showboardpost/showboardpost.page */ "./src/app/pages/board/showboardpost/showboardpost.page.ts");
/* harmony import */ var _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../connect/invitetoconnect/invitetoconnect.page */ "./src/app/pages/connect/invitetoconnect/invitetoconnect.page.ts");
/* harmony import */ var _group_editgroupmember_editgroupmember_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../group/editgroupmember/editgroupmember.page */ "./src/app/pages/group/editgroupmember/editgroupmember.page.ts");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _group_group_popover_group_popover_page__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../group/group-popover/group-popover.page */ "./src/app/pages/group/group-popover/group-popover.page.ts");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
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





















var GroupboardPage = /** @class */ (function () {
    function GroupboardPage(cache, router, callNumber, platform, popoverCtrl, storage, actionSheetCtrl, alertCtrl, modalCtrl, authService, momentService, resourceService, responseService, boardService, chatService, groupService, userData) {
        var _this = this;
        this.cache = cache;
        this.router = router;
        this.callNumber = callNumber;
        this.platform = platform;
        this.popoverCtrl = popoverCtrl;
        this.storage = storage;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.authService = authService;
        this.momentService = momentService;
        this.resourceService = resourceService;
        this.responseService = responseService;
        this.boardService = boardService;
        this.chatService = chatService;
        this.groupService = groupService;
        this.userData = userData;
        this.subscriptions = {};
        this.noPost = false;
        this.boards = [];
        this.searchKeyword = '';
        this.pageNum = 0;
        this.reachedEnd = false;
        this.isGroupLeader = false;
        this.hasAdminAccess = false;
        this.mediaList = [];
        // group
        this.groupLoaded = false;
        // about
        this.joinGroupTag = true;
        // members
        this.members = [];
        this.leaderIds = [];
        this.editMemberTag = false;
        this.membersPageNum = 0;
        this.membersReachedEnd = false;
        this.refreshBoardHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, e_3, _c, boardId, data, reloadNeeded, index, _d, _e, boardpost, index, _f, _g, boardpost, _h, _j, boardpost;
            return __generator(this, function (_k) {
                if (res && res.type === 'refresh board' && res.boardId && res.data) {
                    boardId = res.boardId;
                    data = res.data;
                    reloadNeeded = false;
                    if (boardId === this.group.board) {
                        if (data.action === 'create post') {
                            reloadNeeded = true; //reload board to get the post with bucket ID because bucket ID is not sent via socket.io
                        }
                        else if (data.action === 'delete post') {
                            index = this.boardposts.map(function (c) { return c._id; }).indexOf(data.postId);
                            if (this.boardposts[index].media && this.boardposts[index].media.length) {
                                this.destroyPlayers(this.boardposts[index].media[0]._id);
                            }
                            this.boardposts.splice(index, 1);
                        }
                        else if (data.action === 'like' || data.action === 'cancel like') {
                            try {
                                for (_d = __values(this.boardposts), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    boardpost = _e.value;
                                    if (boardpost.bucketId === data.bucketId && boardpost._id === data.postId) {
                                        if (data.action === 'like') {
                                            boardpost.likes.push(data.author);
                                        }
                                        else if (data.action === 'cancel like') {
                                            index = boardpost.likes.indexOf(data.author);
                                            boardpost.likes.splice(index, 1);
                                        }
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        else if (data.action === 'update post') {
                            try {
                                for (_f = __values(this.boardposts), _g = _f.next(); !_g.done; _g = _f.next()) {
                                    boardpost = _g.value;
                                    if (boardpost._id === data.post._id) {
                                        boardpost.body = data.post.body;
                                        boardpost.attachments = data.post.attachments;
                                        if (boardpost.media && boardpost.media.length && data.post.media && !data.post.media.length) {
                                            this.destroyPlayers(boardpost.media[0]._id);
                                        }
                                        boardpost.media = data.post.media;
                                        if (data.post.moments && data.post.moments[0] && data.post.moments[0].resource.field == 'Poll') {
                                            reloadNeeded = true; //reload is needed to create a new moment socket.io for the feature
                                        }
                                        else {
                                            boardpost.moments = data.post.moments;
                                        }
                                    }
                                    if (boardpost.comments && boardpost.comments.length && boardpost.comments[0]) {
                                        reloadNeeded = true;
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        else if (data.action === 'create comment') {
                            try {
                                for (_h = __values(this.boardposts), _j = _h.next(); !_j.done; _j = _h.next()) {
                                    boardpost = _j.value;
                                    if (boardpost._id === data.comment.parentId) { //first level comment
                                        boardpost.comments.unshift(data.comment);
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                    }
                    if (reloadNeeded) {
                        this.reloadBoard();
                    }
                }
                return [2 /*return*/];
            });
        }); };
        this.refreshMomentHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var e_4, _a, e_5, _b, data, _c, _d, boardpost, listOfResponseIds, index, _e, _f, response, e_4_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!(res && res.momentId && res.data)) return [3 /*break*/, 8];
                        data = res.data;
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 8]);
                        _c = __values(this.boardposts), _d = _c.next();
                        _g.label = 2;
                    case 2:
                        if (!!_d.done) return [3 /*break*/, 5];
                        boardpost = _d.value;
                        if (!(boardpost.moments && boardpost.moments.length && (boardpost.moments[0]._id == data.moment._id) && boardpost.moments[0].resource.hasOwnProperty('en-US') && boardpost.moments[0].resource['en-US'].value[0] === 'Poll')) return [3 /*break*/, 4];
                        listOfResponseIds = boardpost.poll.responses.map(function (c) { return c._id; });
                        index = listOfResponseIds.indexOf(data.response._id);
                        if (index < 0) { //if the response hasn't been added to the response list
                            boardpost.poll.responses.push(data.response);
                        }
                        else { //if it has been added, replace with the incoming one
                            boardpost.poll.responses.splice(index, 1, data.response);
                        }
                        //now the latest response have been included, reset the display array
                        return [4 /*yield*/, boardpost.poll.display.forEach(function (displayitem) {
                                displayitem.count = 0;
                                displayitem.votedByUser = false;
                            })];
                    case 3:
                        //now the latest response have been included, reset the display array
                        _g.sent();
                        //reconstruct the display array
                        boardpost.poll.totalVoteCount = boardpost.poll.responses.length;
                        try {
                            for (_e = __values(boardpost.poll.responses), _f = _e.next(); !_f.done; _f = _e.next()) {
                                response = _f.value;
                                if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                    if (response.matrix_number[0][1] > (boardpost.poll.display.length - 1)) {
                                        return [2 /*return*/]; // if this response belongs to an option that has been deleted
                                    }
                                    if (this.userData.user && response.user === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                        boardpost.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                    }
                                    boardpost.poll.display[response.matrix_number[0][1]].count++;
                                }
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        _g.label = 4;
                    case 4:
                        _d = _c.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4_1 = _g.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.refreshHandler = function (res) {
            if (res) {
                // about
                if (res.data._id === _this.group._id) {
                    _this.group = res.data;
                    _this.setTag();
                }
                else if (res.conversationId === _this.group.conversation) {
                    _this.setTag();
                }
                // members
                if (res.conversationId === _this.group.conversation) {
                    if (res.data.action === 'update leader status') {
                        _this.leaderIds = res.data.leaders.map(function (c) { return c._id; });
                        _this.editMemberTag = ((_this.leaderIds.indexOf(_this.userData.user._id) > -1) || _this.hasAdminAccess);
                    }
                    _this.reloadDirectory();
                }
                else if (res.data._id === _this.group._id) {
                    _this.reloadDirectory();
                }
            }
        };
    }
    GroupboardPage.prototype.ngOnInit = function () {
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshBoardHandler);
        this.subscriptions['refreshMoment'] = this.momentService.refreshMoment$.subscribe(this.refreshMomentHandler);
        this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.refreshHandler);
    };
    GroupboardPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.group) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkLoadGroup()];
                    case 1:
                        _a.sent();
                        if (this.page === 'board') {
                            this.title_slides.slideTo(0);
                        }
                        else if (this.page === 'members') {
                            this.title_slides.slideTo(1);
                        }
                        _a.label = 2;
                    case 2:
                        this.switchPage();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.switchPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkLoadGroup()];
                    case 1:
                        _a.sent();
                        if (this.page === 'board') {
                            this.content.scrollToTop(0);
                            this.reloadBoard();
                            this.setTag();
                        }
                        else if (this.page === 'members') {
                            this.destroyPlayers(null);
                            this.leaderIds = [];
                            //check if the current user is a leader
                            this.leaderIds = this.group.leaders.map(function (c) { return c._id; });
                            if (this.userData.user) {
                                this.editMemberTag = ((this.leaderIds.indexOf(this.userData.user._id) > -1) || this.hasAdminAccess);
                            }
                            this.reloadDirectory();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.checkLoadGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.groupLoaded) return [3 /*break*/, 5];
                        if (!!this.group.public_group) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.groupService.loadGroupProfile(this.group._id)];
                    case 1:
                        _a = __read.apply(void 0, [_c.sent(), 1]), this.group = _a[0];
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.groupService.loadPublicGroup(this.group._id)];
                    case 3:
                        _b = __read.apply(void 0, [_c.sent(), 1]), this.group = _b[0];
                        _c.label = 4;
                    case 4:
                        this.groupLoaded = true;
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.reloadBoard = function () {
        var _this = this;
        this.destroyPlayers(null);
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.userData.user) {
                            this.boardService.socket.emit('join board', this.group.board);
                        }
                        this.infiniteScroll.disabled = false;
                        this.reachedEnd = false;
                        this.boardposts = [];
                        this.pageNum = 0;
                        if (this.userData.user && this.group.leaders) {
                            this.isGroupLeader = this.group.leaders.map(function (c) { return c._id; }).indexOf(this.userData.user._id) > -1;
                        }
                        if (!(this.userData.user && this.group.churchId)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.userData.hasAdminAccess(this.group.churchId)];
                    case 1:
                        _a.hasAdminAccess = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.listcommunityboardposts({ target: this.infiniteScroll });
                        return [2 /*return*/];
                }
            });
        }); }, 50);
    };
    GroupboardPage.prototype.listcommunityboardposts = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var e_6, _a, e_7, _b, e_8, _c, e_9, _d, buckets, returned_posts, buckets_1, buckets_1_1, bucket, _e, _f, post, momentIds, returned_posts_1, returned_posts_1_1, post, _g, _h, option, responseRequest, responseResponse;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        this.pageNum++;
                        if (!!this.reachedEnd) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.boardService.loadBoardBuckets(this.group.board, this.searchKeyword, this.pageNum)];
                    case 1:
                        buckets = _j.sent();
                        event.target.complete();
                        if (this.pageNum === 1 && !buckets.length)
                            this.noPost = true;
                        returned_posts = [];
                        try {
                            for (buckets_1 = __values(buckets), buckets_1_1 = buckets_1.next(); !buckets_1_1.done; buckets_1_1 = buckets_1.next()) {
                                bucket = buckets_1_1.value;
                                try {
                                    for (_e = __values(bucket.posts), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        post = _f.value;
                                        post.bucketId = bucket._id;
                                        returned_posts.push(post);
                                    }
                                }
                                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                    }
                                    finally { if (e_7) throw e_7.error; }
                                }
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (buckets_1_1 && !buckets_1_1.done && (_a = buckets_1.return)) _a.call(buckets_1);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        if (!returned_posts.length) {
                            event.target.disabled = true;
                        }
                        else {
                            this.noPost = false;
                            momentIds = [];
                            try {
                                for (returned_posts_1 = __values(returned_posts), returned_posts_1_1 = returned_posts_1.next(); !returned_posts_1_1.done; returned_posts_1_1 = returned_posts_1.next()) {
                                    post = returned_posts_1_1.value;
                                    if (post.moments && post.moments.length && post.moments[0].resource && post.moments[0].resource.field && post.moments[0].resource.field == 'Poll') {
                                        momentIds.push(post.moments[0]._id);
                                        post.poll = {
                                            display: [],
                                            responses: [],
                                            winner: [],
                                            totalVoteCount: 0
                                        };
                                        try {
                                            for (_g = __values(post.moments[0].matrix_string[1]), _h = _g.next(); !_h.done; _h = _g.next()) {
                                                option = _h.value;
                                                post.poll.display.push({ option: option, votedByUser: false, count: 0 });
                                            }
                                        }
                                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                                        finally {
                                            try {
                                                if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                                            }
                                            finally { if (e_9) throw e_9.error; }
                                        }
                                    }
                                    this.boardposts.push(post);
                                }
                            }
                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
                            finally {
                                try {
                                    if (returned_posts_1_1 && !returned_posts_1_1.done && (_c = returned_posts_1.return)) _c.call(returned_posts_1);
                                }
                                finally { if (e_8) throw e_8.error; }
                            }
                            if (momentIds.length) {
                                momentIds.forEach(function (momentId) {
                                    _this.momentService.socket.emit('join moment', momentId);
                                });
                                responseRequest = this.responseService.findResponsesByMomentIds(JSON.parse(JSON.stringify(momentIds)));
                                responseResponse = this.cache.loadFromDelayedObservable('response-' + this.group.board, responseRequest, 'boards', 5, 'all');
                                responseResponse.subscribe(function (responses) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        this.boardposts.forEach(function (boardpost) { return __awaiter(_this, void 0, void 0, function () {
                                            var e_10, _a, e_11, _b, responses_1, responses_1_1, response, listOfResponseIds, index, _c, _d, response;
                                            return __generator(this, function (_e) {
                                                switch (_e.label) {
                                                    case 0:
                                                        if (!(boardpost.moments[0] && boardpost.moments[0].resource && boardpost.moments[0].resource.field && boardpost.moments[0].resource.field == 'Poll')) return [3 /*break*/, 2];
                                                        try {
                                                            for (responses_1 = __values(responses), responses_1_1 = responses_1.next(); !responses_1_1.done; responses_1_1 = responses_1.next()) {
                                                                response = responses_1_1.value;
                                                                if (response.moment == boardpost.moments[0]._id) {
                                                                    listOfResponseIds = boardpost.poll.responses.map(function (c) {
                                                                        return c._id;
                                                                    });
                                                                    index = listOfResponseIds.indexOf(response._id);
                                                                    if (index < 0) { //if the response hasn't been added to the response list
                                                                        boardpost.poll.responses.push(response);
                                                                    }
                                                                    else { //if it has been added, and if the incoming response is newer
                                                                        if (new Date(boardpost.poll.responses[index].createdAt).getTime() < new Date(response.createdAt).getTime()) {
                                                                            boardpost.poll.responses.splice(index, 1, response);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                                                        finally {
                                                            try {
                                                                if (responses_1_1 && !responses_1_1.done && (_a = responses_1.return)) _a.call(responses_1);
                                                            }
                                                            finally { if (e_10) throw e_10.error; }
                                                        }
                                                        //now the latest response have been included, reset the display array
                                                        return [4 /*yield*/, boardpost.poll.display.forEach(function (displayitem) {
                                                                displayitem.count = 0;
                                                                displayitem.votedByUser = false;
                                                            })];
                                                    case 1:
                                                        //now the latest response have been included, reset the display array
                                                        _e.sent();
                                                        //reconstruct the display array
                                                        boardpost.poll.totalVoteCount = boardpost.poll.responses.length;
                                                        try {
                                                            for (_c = __values(boardpost.poll.responses), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                                response = _d.value;
                                                                if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                                                    if (response.matrix_number[0][1] > (boardpost.poll.display.length - 1)) {
                                                                        return [2 /*return*/]; // if this response belongs to an option that has been deleted
                                                                    }
                                                                    if (this.userData.user && response.user === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                                                        boardpost.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                                                    }
                                                                    boardpost.poll.display[response.matrix_number[0][1]].count++;
                                                                }
                                                            }
                                                        }
                                                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                                                        finally {
                                                            try {
                                                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                                            }
                                                            finally { if (e_11) throw e_11.error; }
                                                        }
                                                        _e.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        return [2 /*return*/];
                                    });
                                }); });
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        event.target.complete();
                        _j.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.initPlyr = function (event, mediaId) {
        var player;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player });
    };
    GroupboardPage.prototype.createNewPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editPostPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _editboardpost_editboardpost_page__WEBPACK_IMPORTED_MODULE_13__["EditboardpostPage"], componentProps: { boardId: this.group.board } })];
                    case 1:
                        editPostPage = _a.sent();
                        return [4 /*yield*/, editPostPage.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.openPost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var showBoardPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _showboardpost_showboardpost_page__WEBPACK_IMPORTED_MODULE_15__["ShowboardpostPage"], componentProps: { boardId: this.group.board, post: post, isGroupLeader: this.isGroupLeader, hasAdminAccess: this.hasAdminAccess } })];
                    case 1:
                        showBoardPage = _a.sent();
                        return [4 /*yield*/, showBoardPage.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.openRestvoFeature = function (event, moment) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_20__["ShowfeaturePage"], componentProps: { moment: moment, modalPage: true } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.reloadBoard();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.likePost = function (event, post) {
        return __awaiter(this, void 0, void 0, function () {
            var action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!this.userData.user)
                            return [2 /*return*/];
                        action = (post.likes.indexOf(this.userData.user._id) > -1) ? "cancel like" : "like";
                        return [4 /*yield*/, this.boardService.likePost(this.group.board, post.bucketId, post._id, action)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.presentPickPeoplePopover = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Sharing is Coming Soon',
                                subHeader: 'This feature will be available in a future release.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GroupboardPage.prototype.seeUserInfo = function (event, recipient) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!this.userData.user)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_14__["ShowrecipientinfoPage"], componentProps: { recipient: recipient, modalPage: true } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.titleSlideChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var title_slide;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.title_slides.getActiveIndex()];
                    case 1:
                        title_slide = _a.sent();
                        if (title_slide === 0) {
                            this.page = 'board';
                        }
                        else if (title_slide === 1) {
                            this.page = 'members';
                        }
                        this.switchPage();
                        return [2 /*return*/];
                }
            });
        });
    };
    //get the latest user data from the server
    GroupboardPage.prototype.refresh = function (refresher) {
        this.boardposts = [];
        this.reloadBoard();
        setTimeout(function () {
            refresher.complete();
        }, 2000);
    };
    GroupboardPage.prototype.noNetworkConnection = function () {
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
    GroupboardPage.prototype.displayTimeElapsed = function (dateTime) {
        var minElapsed = Math.round((new Date().getTime() - new Date(dateTime).getTime()) / (1000 * 60));
        if (minElapsed < 60) {
            return minElapsed.toString() + 'm ago';
        }
        else if (minElapsed >= 60 && minElapsed < (60 * 24)) {
            return Math.round(minElapsed / 60).toString() + 'h ago';
        }
        else if (minElapsed >= (60 * 24) && minElapsed < (60 * 24 * 6)) {
            return Math.round(minElapsed / (60 * 24)).toString() + 'd ago';
        }
        else if (minElapsed >= (60 * 24 * 6) && minElapsed < (60 * 24 * 30)) {
            return Math.round(minElapsed / (60 * 24 * 7)).toString() + 'wk ago';
        }
        else {
            return Math.round(minElapsed / (60 * 24 * 30)).toString() + 'mo ago';
        }
    };
    // about page
    GroupboardPage.prototype.setTag = function () {
        var _this = this;
        if (this.userData.user) {
            this.joinGroupTag = !this.userData.user.groups.find(function (group) { return group._id === _this.group._id; });
        }
    };
    GroupboardPage.prototype.joinGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, alert_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.userData.user) return [3 /*break*/, 1];
                        this.modalCtrl.dismiss();
                        this.router.navigate(['/register', { slide: '0', message: 'To subscribe to this topic, please sign in or create an account.', exitType: 'slide' }]);
                        return [3 /*break*/, 6];
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.userData.joinGroup(this.group)];
                    case 2:
                        data = _a.sent();
                        if (data === "cancel")
                            return [2 /*return*/];
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                message: 'You have subscribed to ' + this.group.name + '.',
                                buttons: [{
                                        text: 'Ok',
                                        handler: function () {
                                            var navTransition = alert_1.dismiss();
                                            navTransition.then(function () {
                                                _this.authService.refreshGroupStatus({ conversationId: _this.group.conversation, data: _this.group });
                                                _this.userData.refreshUserStatus({ type: 'refresh community board page' });
                                            });
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
                        this.noNetworkConnection();
                        console.log("failed to add to My Community");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.presentPopover = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var popover, closeMessage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.popoverCtrl.create({
                                component: _group_group_popover_group_popover_page__WEBPACK_IMPORTED_MODULE_19__["GroupPopoverPage"],
                                componentProps: { group: this.group },
                                event: event,
                                backdropDismiss: true,
                                cssClass: 'level-15'
                            })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, popover.onDidDismiss()];
                    case 3:
                        closeMessage = (_a.sent()).data;
                        if (closeMessage) {
                            console.log("close modal");
                            setTimeout(function () {
                                _this.closeModal(true);
                            }, 1000); // need to give one sec delay for modalCtrl to clear up the previous modal box
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // members
    GroupboardPage.prototype.reloadDirectory = function () {
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
    GroupboardPage.prototype.listgroupmembers = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.membersPageNum++;
                        if (!!this.membersReachedEnd) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.groupService.loadGroupMembers(this.group._id, this.searchKeyword, this.membersPageNum)];
                    case 1:
                        results = _a.sent();
                        event.target.complete();
                        if (!(results.members.length + results.pending_members.length)) {
                            this.membersReachedEnd = true;
                            event.target.disabled = true;
                        }
                        else {
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
                        return [3 /*break*/, 3];
                    case 2:
                        event.target.complete();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.loadLegacyGroupData = function () {
        var _this = this;
        var uniqueNames = this.members.map(function (c) { return c.name; });
        //this is to take care of old wee pending members
        if (!this.group.pending_members)
            return;
        this.group.pending_members.forEach(function (pending_member) {
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
        if (!this.group.pending_email_members)
            return;
        this.group.pending_email_members.forEach(function (contact) {
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
    };
    GroupboardPage.prototype.executeSearch = function (event) {
        event.stopPropagation();
        this.reloadDirectory();
    };
    GroupboardPage.prototype.cancelSearch = function (event) {
        event.stopPropagation();
        this.searchKeyword = '';
        this.reloadDirectory();
    };
    GroupboardPage.prototype.editMember = function (event, member) {
        return __awaiter(this, void 0, void 0, function () {
            var editgroupMemberModal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _group_editgroupmember_editgroupmember_page__WEBPACK_IMPORTED_MODULE_17__["EditgroupmemberPage"], componentProps: { member: member, group: this.group } })];
                    case 1:
                        editgroupMemberModal = _a.sent();
                        return [4 /*yield*/, editgroupMemberModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, editgroupMemberModal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.reloadDirectory();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.addMemberActionSheet = function () {
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
    GroupboardPage.prototype.invitePage = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var invitePage, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _connect_invitetoconnect_invitetoconnect_page__WEBPACK_IMPORTED_MODULE_16__["InvitetoconnectPage"], componentProps: { type: type, group: this.group } })];
                    case 1:
                        invitePage = _a.sent();
                        return [4 /*yield*/, invitePage.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, invitePage.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.reloadDirectory();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupboardPage.prototype.initializeCall = function (number) {
        this.callNumber.callNumber(number, true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    GroupboardPage.prototype.destroyPlayers = function (mediaId) {
        var e_12, _a;
        try {
            console.log("destroy", mediaId);
            if (mediaId) {
                var media = this.mediaList.find(function (c) { return c._id === mediaId; });
                console.log("find", media);
                media.player.destroy();
            }
            else {
                try {
                    for (var _b = __values(this.mediaList), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var media = _c.value;
                        media.player.destroy();
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_12) throw e_12.error; }
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    GroupboardPage.prototype.closeModal = function (refreshNeeded) {
        this.destroyPlayers(null);
        this.modalCtrl.dismiss(refreshNeeded);
    };
    GroupboardPage.prototype.ionViewWillLeave = function () {
        //this.destroyPlayers(null);
    };
    GroupboardPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshMoment'].unsubscribe(this.refreshMomentHandler);
        this.subscriptions['refreshGroupStatus'].unsubscribe(this.refreshHandler);
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshBoardHandler);
    };
    GroupboardPage.ctorParameters = function () { return [
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_4__["CallNumber"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["Auth"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_8__["Moment"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_9__["Resource"] },
        { type: _services_response_service__WEBPACK_IMPORTED_MODULE_10__["Response"] },
        { type: _services_board_service__WEBPACK_IMPORTED_MODULE_7__["Board"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_11__["Chat"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_18__["Groups"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonContent"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonContent"])
    ], GroupboardPage.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('titles', { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonSlides"])
    ], GroupboardPage.prototype, "title_slides", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonInfiniteScroll"])
    ], GroupboardPage.prototype, "infiniteScroll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GroupboardPage.prototype, "group", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GroupboardPage.prototype, "page", void 0);
    GroupboardPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-groupboard',
            template: __importDefault(__webpack_require__(/*! raw-loader!./groupboard.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/groupboard/groupboard.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./groupboard.page.scss */ "./src/app/pages/board/groupboard/groupboard.page.scss")).default]
        }),
        __metadata("design:paramtypes", [ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_4__["CallNumber"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["PopoverController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["Auth"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_8__["Moment"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_9__["Resource"],
            _services_response_service__WEBPACK_IMPORTED_MODULE_10__["Response"],
            _services_board_service__WEBPACK_IMPORTED_MODULE_7__["Board"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_11__["Chat"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_18__["Groups"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserData"]])
    ], GroupboardPage);
    return GroupboardPage;
}());



/***/ }),

/***/ "./src/app/pages/board/showboardpost/showboardpost.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/board/showboardpost/showboardpost.page.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@charset \"UTF-8\";\napp-showboardpost ion-spinner {\n  position: absolute;\n  margin: 48%;\n}\napp-showboardpost .avatar {\n  /*    width: 40px !important;\n      height : 40px !important;\n      object-fit: cover;*/\n}\napp-showboardpost .header-container {\n  margin-bottom: 5px;\n}\napp-showboardpost .post-author-container {\n  width: 100%;\n}\napp-showboardpost .post-author {\n  margin: 10px 0 2px 0;\n  display: block;\n  width: 100%;\n}\napp-showboardpost .date {\n  margin: 0 0 5px 0;\n  color: lightgrey;\n}\napp-showboardpost .photo-frame {\n  margin: 0 auto;\n  width: 100%;\n}\napp-showboardpost .photo {\n  width: 100%;\n  height: 100%;\n}\napp-showboardpost .short-paragraph {\n  color: var(--ion-color-dark);\n  max-height: 100%;\n  line-height: 20px;\n  /* Height / no. of lines to display */\n  overflow: scroll;\n}\napp-showboardpost .note-col {\n  height: 100%;\n  padding-left: 0;\n  margin-left: 3px;\n}\napp-showboardpost .note {\n  color: lightgrey;\n  width: 100%;\n  margin: 5px 0 0 0;\n}\napp-showboardpost .section-title {\n  color: white;\n  background-color: var(--ion-color-grey);\n  text-align: left;\n  font-size: large;\n}\napp-showboardpost .relationship-action {\n  color: white;\n}\napp-showboardpost .chat-bubble {\n  border-radius: 5px;\n  padding: 10px;\n  position: relative;\n  margin-bottom: 8px;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}\napp-showboardpost .chat-bubble:before {\n  content: \" \";\n  display: block;\n  height: 16px;\n  width: 9px;\n  position: absolute;\n  bottom: -7.5px;\n}\napp-showboardpost .chat-bubble.left {\n  margin-right: 40px;\n  background-color: #EEEEEE;\n}\napp-showboardpost .chat-bubble.left p {\n  color: black;\n}\napp-showboardpost .chat-bubble.left:before {\n  background-color: #EEEEEE;\n  left: 10px;\n  -webkit-transform: rotate(70deg) skew(5deg);\n}\napp-showboardpost .message {\n  margin: 0;\n  word-break: break-word;\n}\napp-showboardpost .moment {\n  width: 95%;\n  margin: 5px auto;\n  border-radius: 5px;\n  padding: 10px 12px 10px 12px;\n  position: relative;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n  background-color: #f0f0f0;\n}\napp-showboardpost .moment h2, app-showboardpost .moment p {\n  color: black;\n}\napp-showboardpost .moment-image {\n  max-height: 20%;\n  width: 100%;\n  border-radius: 5%;\n}\napp-showboardpost .superimposedIcon {\n  position: absolute;\n  bottom: 50%;\n  right: 40%;\n  width: 20%;\n}\napp-showboardpost .moment-name {\n  font-weight: bold;\n  width: 100%;\n}\napp-showboardpost .moment-date {\n  width: 100%;\n  font-weight: bold;\n}\napp-showboardpost .moment-notes {\n  width: 100%;\n  font-weight: bold;\n}\napp-showboardpost .goalFooter {\n  font-style: italic;\n  font-weight: lighter;\n  text-align: center;\n}\napp-showboardpost .pollIconDiv {\n  height: 20%;\n  width: 100%;\n}\napp-showboardpost .pollIconDiv .pollIcon {\n  height: 1.8em;\n  width: 10%;\n  margin: 0 auto;\n}\napp-showboardpost .pollQuestion {\n  color: black;\n  font-size: medium;\n  font-style: italic;\n}\napp-showboardpost .pollContainer {\n  width: 100%;\n  display: inline-block;\n  clear: both;\n  border-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4) !important;\n  padding: 2px;\n}\napp-showboardpost .optionsContainer {\n  float: left;\n  width: 60%;\n}\napp-showboardpost .optionsContainer .option {\n  padding-top: 5px;\n  float: left;\n  font-size: medium;\n  font-weight: bold;\n}\napp-showboardpost .votesContainer {\n  float: left;\n  width: 20%;\n}\napp-showboardpost .votesContainer .votecount {\n  padding-top: 10px;\n  color: black;\n  font-size: x-small;\n}\napp-showboardpost .userContainer {\n  float: right;\n  width: 20%;\n}\napp-showboardpost .userContainer .uservote {\n  margin-top: 15px;\n  font-size: x-small;\n  width: 90%;\n  height: 30px;\n  color: black;\n}\napp-showboardpost .userContainer .uservoted {\n  padding-top: 20px;\n  width: 30%;\n  margin: 0 40%;\n}\napp-showboardpost .comment {\n  padding: 6px 5px;\n}\napp-showboardpost .comment-author {\n  display: block;\n  font-size: 12px;\n  width: 100%;\n  margin: 0;\n}\napp-showboardpost .message-footer {\n  background: #ffffff;\n}\napp-showboardpost .message-form {\n  display: flex;\n  border-color: var(--ion-color-lightgrey);\n  border-style: solid;\n  border-width: 0.5px;\n  padding: 0 8px;\n}\napp-showboardpost .message-form ion-button {\n  margin-top: auto;\n  margin-bottom: auto;\n  margin-left: 0;\n  margin-right: 0;\n  padding-left: 0;\n  padding-right: 0;\n}\napp-showboardpost .message-form ion-icon {\n  margin: 0;\n  padding-left: 0px;\n  padding-right: 0;\n}\napp-showboardpost .message-form ion-textarea {\n  margin: 8px;\n  width: auto;\n  border-style: solid;\n  border-radius: 8px;\n  border-color: var(--ion-color-lightgrey);\n  border-width: 1px;\n  --padding-start: 4px;\n}\napp-showboardpost .message-form .sendImage {\n  margin: 16px 0 16px 3%;\n  height: 30px;\n  width: 30px;\n  float: right;\n}\napp-showboardpost .message-form .recordAudioImg {\n  background-color: transparent;\n  margin: 16px 0 16px 2%;\n  height: 30px;\n  width: 30px;\n  float: right;\n}\napp-showboardpost #expandable {\n  -webkit-animation-name: move;\n          animation-name: move;\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate;\n}\n@-webkit-keyframes move {\n  from {\n    transform: translateY(170px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\n@keyframes move {\n  from {\n    transform: translateY(170px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\napp-showboardpost .moreoptions {\n  width: 100%;\n  max-height: 180px;\n  background-color: rgba(238, 238, 238, 0.5);\n  overflow: scroll;\n  /*    .bottomRow {\n        padding: 0 10px;\n        margin-bottom: 14px;\n        height: 80px;\n        width: 100%;\n        float: left;\n      }*/\n}\napp-showboardpost .moreoptions .moreGrid {\n  width: 100%;\n}\napp-showboardpost .moreoptions .topRow {\n  margin-top: 2px;\n  width: 100%;\n}\napp-showboardpost .moreoptions .optionscol {\n  height: 100%;\n  width: 100%;\n}\napp-showboardpost .moreoptions .optionscol .colelement {\n  height: 50px;\n  width: 50px;\n  padding: 10px;\n  display: table;\n  margin: 2% auto;\n  border-radius: 10px;\n  border-style: solid;\n  border-width: 1px;\n  background-color: #FFFFFF;\n  border-color: #CCCCCC;\n}\napp-showboardpost .moreoptions .optionscol .moreLabel {\n  display: table;\n  margin: 0 auto;\n  color: #969696;\n  font-size: medium;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvYm9hcmQvc2hvd2JvYXJkcG9zdC9zaG93Ym9hcmRwb3N0LnBhZ2Uuc2NzcyIsIi9Vc2Vycy9jYWxpeGh1YW5nL1dlYl9EZXZlbG9wbWVudC9yZXN0dm8vcmVzdHZvLWFwcC9zcmMvYXBwL3BhZ2VzL2JvYXJkL3Nob3dib2FyZHBvc3Qvc2hvd2JvYXJkcG9zdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDRWQ7RUFDRSxrQkFBQTtFQUNBLFdBQUE7QURBSjtBQ0dFO0VBQ0Y7O3lCQUFBO0FEQ0E7QUNJRTtFQUNFLGtCQUFBO0FERko7QUNLRTtFQUNFLFdBQUE7QURISjtBQ01FO0VBQ0Usb0JBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtBREpKO0FDT0U7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0FETEo7QUNRRTtFQUNFLGNBQUE7RUFDQSxXQUFBO0FETko7QUNTRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FEUEo7QUNVRTtFQUNFLDRCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUFtQixxQ0FBQTtFQUNuQixnQkFBQTtBRFBKO0FDVUU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FEUko7QUNXRTtFQUNFLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FEVEo7QUNZRTtFQUNFLFlBQUE7RUFDQSx1Q0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QURWSjtBQ2NFO0VBQ0UsWUFBQTtBRFpKO0FDZUU7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QURiSjtBQ2dCRTtFQUNFLFlBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QURkSjtBQ2lCRTtFQUNFLGtCQUFBO0VBRUEseUJBQUE7QURoQko7QUNpQkk7RUFDRSxZQUFBO0FEZk47QUNtQkU7RUFDRSx5QkFBQTtFQUNBLFVBQUE7RUFDQSwyQ0FBQTtBRGpCSjtBQ29CRTtFQUNFLFNBQUE7RUFDQSxzQkFBQTtBRGxCSjtBQ3NCRTtFQUNFLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7QURwQko7QUNxQkk7RUFDRSxZQUFBO0FEbkJOO0FDdUJFO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtBRHJCSjtBQ3dCRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxVQUFBO0FEdEJKO0FDeUJFO0VBQ0UsaUJBQUE7RUFDQSxXQUFBO0FEdkJKO0FDMEJFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FEeEJKO0FDMkJFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FEekJKO0FDNEJFO0VBQ0Usa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0FEMUJKO0FDK0JFO0VBQ0UsV0FBQTtFQUNBLFdBQUE7QUQ3Qko7QUMrQkk7RUFDRSxhQUFBO0VBQ0EsVUFBQTtFQUNBLGNBQUE7QUQ3Qk47QUNpQ0U7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBRC9CSjtBQ2tDRTtFQUNFLFdBQUE7RUFDQSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLHFEQUFBO0VBQ0EsWUFBQTtBRGhDSjtBQ21DRTtFQUNFLFdBQUE7RUFDQSxVQUFBO0FEakNKO0FDa0NJO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7RUFFQSxpQkFBQTtBRGpDTjtBQ3FDRTtFQUNFLFdBQUE7RUFDQSxVQUFBO0FEbkNKO0FDb0NJO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QURsQ047QUNzQ0U7RUFDRSxZQUFBO0VBQ0EsVUFBQTtBRHBDSjtBQ3FDSTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QURuQ047QUNxQ0k7RUFDRSxpQkFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0FEbkNOO0FDdUNFO0VBQ0UsZ0JBQUE7QURyQ0o7QUN3Q0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0FEdENKO0FDeUNFO0VBQ0UsbUJBQUE7QUR2Q0o7QUMwQ0U7RUFFRSxhQUFBO0VBQ0Esd0NBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBRHpDSjtBQzJDSTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBRHpDTjtBQzRDSTtFQUNFLFNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FEMUNOO0FDNkNJO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0NBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FEM0NOO0FDOENJO0VBQ0Usc0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUQ1Q047QUMrQ0k7RUFDRSw2QkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FEN0NOO0FDaURFO0VBQ0UsNEJBQUE7VUFBQSxvQkFBQTtFQUNBLGdDQUFBO1VBQUEsd0JBQUE7RUFDQSw4Q0FBQTtVQUFBLHNDQUFBO0VBQ0Esc0NBQUE7VUFBQSw4QkFBQTtBRC9DSjtBQ2tERTtFQUNFO0lBQ0UsNEJBQUE7RURoREo7RUNrREU7SUFDRSx3QkFBQTtFRGhESjtBQUNGO0FDMENFO0VBQ0U7SUFDRSw0QkFBQTtFRGhESjtFQ2tERTtJQUNFLHdCQUFBO0VEaERKO0FBQ0Y7QUNtREU7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQ0FBQTtFQUNBLGdCQUFBO0VBV0E7Ozs7OztRQUFBO0FEckRKO0FDNENJO0VBQ0UsV0FBQTtBRDFDTjtBQzZDSTtFQUNFLGVBQUE7RUFDQSxXQUFBO0FEM0NOO0FDc0RJO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QURwRE47QUNzRE07RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUdBLGFBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUR0RFI7QUN5RE07RUFDRSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBRHZEUiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2JvYXJkL3Nob3dib2FyZHBvc3Qvc2hvd2JvYXJkcG9zdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG5hcHAtc2hvd2JvYXJkcG9zdCBpb24tc3Bpbm5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWFyZ2luOiA0OCU7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAuYXZhdGFyIHtcbiAgLyogICAgd2lkdGg6IDQwcHggIWltcG9ydGFudDtcbiAgICAgIGhlaWdodCA6IDQwcHggIWltcG9ydGFudDtcbiAgICAgIG9iamVjdC1maXQ6IGNvdmVyOyovXG59XG5hcHAtc2hvd2JvYXJkcG9zdCAuaGVhZGVyLWNvbnRhaW5lciB7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5wb3N0LWF1dGhvci1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5wb3N0LWF1dGhvciB7XG4gIG1hcmdpbjogMTBweCAwIDJweCAwO1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAuZGF0ZSB7XG4gIG1hcmdpbjogMCAwIDVweCAwO1xuICBjb2xvcjogbGlnaHRncmV5O1xufVxuYXBwLXNob3dib2FyZHBvc3QgLnBob3RvLWZyYW1lIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLXNob3dib2FyZHBvc3QgLnBob3RvIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5zaG9ydC1wYXJhZ3JhcGgge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBsaW5lLWhlaWdodDogMjBweDtcbiAgLyogSGVpZ2h0IC8gbm8uIG9mIGxpbmVzIHRvIGRpc3BsYXkgKi9cbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5ub3RlLWNvbCB7XG4gIGhlaWdodDogMTAwJTtcbiAgcGFkZGluZy1sZWZ0OiAwO1xuICBtYXJnaW4tbGVmdDogM3B4O1xufVxuYXBwLXNob3dib2FyZHBvc3QgLm5vdGUge1xuICBjb2xvcjogbGlnaHRncmV5O1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiA1cHggMCAwIDA7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAuc2VjdGlvbi10aXRsZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXNpemU6IGxhcmdlO1xufVxuYXBwLXNob3dib2FyZHBvc3QgLnJlbGF0aW9uc2hpcC1hY3Rpb24ge1xuICBjb2xvcjogd2hpdGU7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAuY2hhdC1idWJibGUge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAtbW96LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAtbXMtdXNlci1zZWxlY3Q6IHRleHQ7XG4gIHVzZXItc2VsZWN0OiB0ZXh0O1xufVxuYXBwLXNob3dib2FyZHBvc3QgLmNoYXQtYnViYmxlOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiwqBcIjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogMTZweDtcbiAgd2lkdGg6IDlweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC03LjVweDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5jaGF0LWJ1YmJsZS5sZWZ0IHtcbiAgbWFyZ2luLXJpZ2h0OiA0MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFRUVFO1xufVxuYXBwLXNob3dib2FyZHBvc3QgLmNoYXQtYnViYmxlLmxlZnQgcCB7XG4gIGNvbG9yOiBibGFjaztcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5jaGF0LWJ1YmJsZS5sZWZ0OmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNFRUVFRUU7XG4gIGxlZnQ6IDEwcHg7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNzBkZWcpIHNrZXcoNWRlZyk7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAubWVzc2FnZSB7XG4gIG1hcmdpbjogMDtcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tb21lbnQge1xuICB3aWR0aDogOTUlO1xuICBtYXJnaW46IDVweCBhdXRvO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDEwcHggMTJweCAxMHB4IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogdGV4dDtcbiAgLW1vei11c2VyLXNlbGVjdDogdGV4dDtcbiAgLW1zLXVzZXItc2VsZWN0OiB0ZXh0O1xuICB1c2VyLXNlbGVjdDogdGV4dDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tb21lbnQgaDIsIGFwcC1zaG93Ym9hcmRwb3N0IC5tb21lbnQgcCB7XG4gIGNvbG9yOiBibGFjaztcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tb21lbnQtaW1hZ2Uge1xuICBtYXgtaGVpZ2h0OiAyMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiA1JTtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5zdXBlcmltcG9zZWRJY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDUwJTtcbiAgcmlnaHQ6IDQwJTtcbiAgd2lkdGg6IDIwJTtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tb21lbnQtbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tb21lbnQtZGF0ZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tb21lbnQtbm90ZXMge1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAuZ29hbEZvb3RlciB7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5wb2xsSWNvbkRpdiB7XG4gIGhlaWdodDogMjAlO1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5wb2xsSWNvbkRpdiAucG9sbEljb24ge1xuICBoZWlnaHQ6IDEuOGVtO1xuICB3aWR0aDogMTAlO1xuICBtYXJnaW46IDAgYXV0bztcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5wb2xsUXVlc3Rpb24ge1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAucG9sbENvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGNsZWFyOiBib3RoO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAycHg7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAub3B0aW9uc0NvbnRhaW5lciB7XG4gIGZsb2F0OiBsZWZ0O1xuICB3aWR0aDogNjAlO1xufVxuYXBwLXNob3dib2FyZHBvc3QgLm9wdGlvbnNDb250YWluZXIgLm9wdGlvbiB7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG4gIGZsb2F0OiBsZWZ0O1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAudm90ZXNDb250YWluZXIge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDIwJTtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC52b3Rlc0NvbnRhaW5lciAudm90ZWNvdW50IHtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIGNvbG9yOiBibGFjaztcbiAgZm9udC1zaXplOiB4LXNtYWxsO1xufVxuYXBwLXNob3dib2FyZHBvc3QgLnVzZXJDb250YWluZXIge1xuICBmbG9hdDogcmlnaHQ7XG4gIHdpZHRoOiAyMCU7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAudXNlckNvbnRhaW5lciAudXNlcnZvdGUge1xuICBtYXJnaW4tdG9wOiAxNXB4O1xuICBmb250LXNpemU6IHgtc21hbGw7XG4gIHdpZHRoOiA5MCU7XG4gIGhlaWdodDogMzBweDtcbiAgY29sb3I6IGJsYWNrO1xufVxuYXBwLXNob3dib2FyZHBvc3QgLnVzZXJDb250YWluZXIgLnVzZXJ2b3RlZCB7XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xuICB3aWR0aDogMzAlO1xuICBtYXJnaW46IDAgNDAlO1xufVxuYXBwLXNob3dib2FyZHBvc3QgLmNvbW1lbnQge1xuICBwYWRkaW5nOiA2cHggNXB4O1xufVxuYXBwLXNob3dib2FyZHBvc3QgLmNvbW1lbnQtYXV0aG9yIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tZXNzYWdlLWZvb3RlciB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAubWVzc2FnZS1mb3JtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLXdpZHRoOiAwLjVweDtcbiAgcGFkZGluZzogMCA4cHg7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAubWVzc2FnZS1mb3JtIGlvbi1idXR0b24ge1xuICBtYXJnaW4tdG9wOiBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICBtYXJnaW4tbGVmdDogMDtcbiAgbWFyZ2luLXJpZ2h0OiAwO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG4gIHBhZGRpbmctcmlnaHQ6IDA7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAubWVzc2FnZS1mb3JtIGlvbi1pY29uIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nLWxlZnQ6IDBweDtcbiAgcGFkZGluZy1yaWdodDogMDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tZXNzYWdlLWZvcm0gaW9uLXRleHRhcmVhIHtcbiAgbWFyZ2luOiA4cHg7XG4gIHdpZHRoOiBhdXRvO1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDRweDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tZXNzYWdlLWZvcm0gLnNlbmRJbWFnZSB7XG4gIG1hcmdpbjogMTZweCAwIDE2cHggMyU7XG4gIGhlaWdodDogMzBweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGZsb2F0OiByaWdodDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tZXNzYWdlLWZvcm0gLnJlY29yZEF1ZGlvSW1nIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIG1hcmdpbjogMTZweCAwIDE2cHggMiU7XG4gIGhlaWdodDogMzBweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGZsb2F0OiByaWdodDtcbn1cbmFwcC1zaG93Ym9hcmRwb3N0ICNleHBhbmRhYmxlIHtcbiAgYW5pbWF0aW9uLW5hbWU6IG1vdmU7XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC41cztcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7XG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcbn1cbkBrZXlmcmFtZXMgbW92ZSB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxNzBweCk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuYXBwLXNob3dib2FyZHBvc3QgLm1vcmVvcHRpb25zIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDE4MHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzOCwgMjM4LCAyMzgsIDAuNSk7XG4gIG92ZXJmbG93OiBzY3JvbGw7XG4gIC8qICAgIC5ib3R0b21Sb3cge1xuICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDE0cHg7XG4gICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgfSovXG59XG5hcHAtc2hvd2JvYXJkcG9zdCAubW9yZW9wdGlvbnMgLm1vcmVHcmlkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAubW9yZW9wdGlvbnMgLnRvcFJvdyB7XG4gIG1hcmdpbi10b3A6IDJweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtc2hvd2JvYXJkcG9zdCAubW9yZW9wdGlvbnMgLm9wdGlvbnNjb2wge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLXNob3dib2FyZHBvc3QgLm1vcmVvcHRpb25zIC5vcHRpb25zY29sIC5jb2xlbGVtZW50IHtcbiAgaGVpZ2h0OiA1MHB4O1xuICB3aWR0aDogNTBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgZGlzcGxheTogdGFibGU7XG4gIG1hcmdpbjogMiUgYXV0bztcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gIGJvcmRlci1jb2xvcjogI0NDQ0NDQztcbn1cbmFwcC1zaG93Ym9hcmRwb3N0IC5tb3Jlb3B0aW9ucyAub3B0aW9uc2NvbCAubW9yZUxhYmVsIHtcbiAgZGlzcGxheTogdGFibGU7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBjb2xvcjogIzk2OTY5NjtcbiAgZm9udC1zaXplOiBtZWRpdW07XG59IiwiYXBwLXNob3dib2FyZHBvc3Qge1xuXG4gIGlvbi1zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luOiA0OCU7XG4gIH1cblxuICAuYXZhdGFyIHtcbi8qICAgIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0IDogNDBweCAhaW1wb3J0YW50O1xuICAgIG9iamVjdC1maXQ6IGNvdmVyOyovXG4gIH1cblxuICAuaGVhZGVyLWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICB9XG5cbiAgLnBvc3QtYXV0aG9yLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAucG9zdC1hdXRob3Ige1xuICAgIG1hcmdpbjogMTBweCAwIDJweCAwO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmRhdGUge1xuICAgIG1hcmdpbjogMCAwIDVweCAwO1xuICAgIGNvbG9yOiBsaWdodGdyZXk7XG4gIH1cblxuICAucGhvdG8tZnJhbWUge1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLnBob3RvIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAuc2hvcnQtcGFyYWdyYXBoIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgIG1heC1oZWlnaHQ6IDEwMCU7XG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7IC8qIEhlaWdodCAvIG5vLiBvZiBsaW5lcyB0byBkaXNwbGF5ICovXG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgfVxuXG4gIC5ub3RlLWNvbCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICBtYXJnaW4tbGVmdDogM3B4O1xuICB9XG5cbiAgLm5vdGUge1xuICAgIGNvbG9yOiBsaWdodGdyZXk7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiA1cHggMCAwIDA7XG4gIH1cblxuICAuc2VjdGlvbi10aXRsZSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIH1cblxuXG4gIC5yZWxhdGlvbnNoaXAtYWN0aW9uIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cblxuICAuY2hhdC1idWJibGUge1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogdGV4dDtcbiAgICAtbW96LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAgIC1tcy11c2VyLXNlbGVjdDogdGV4dDtcbiAgICB1c2VyLXNlbGVjdDogdGV4dDtcbiAgfVxuXG4gIC5jaGF0LWJ1YmJsZTpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiXFwwMGEwXCI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICAgIHdpZHRoOiA5cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogLTcuNXB4O1xuICB9XG5cbiAgLmNoYXQtYnViYmxlLmxlZnQge1xuICAgIG1hcmdpbi1yaWdodDogNDBweDtcbiAgICAvLyBwYWRkaW5nLXJpZ2h0OiAyNXB4OyAvLyBlbmFibGVkIHdoZW4gdXNpbmcgcmVwbHkgaWNvblxuICAgIGJhY2tncm91bmQtY29sb3I6ICNFRUVFRUU7XG4gICAgcCB7XG4gICAgICBjb2xvcjogYmxhY2s7XG4gICAgfVxuICB9XG5cbiAgLmNoYXQtYnViYmxlLmxlZnQ6YmVmb3JlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFRUVFO1xuICAgIGxlZnQ6IDEwcHg7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg3MGRlZykgc2tldyg1ZGVnKTtcbiAgfVxuXG4gIC5tZXNzYWdlIHtcbiAgICBtYXJnaW46IDA7XG4gICAgd29yZC1icmVhazogYnJlYWstd29yZDtcbiAgfVxuXG4gIC8vbW9tZW50c1xuICAubW9tZW50IHtcbiAgICB3aWR0aDogOTUlO1xuICAgIG1hcmdpbjogNXB4IGF1dG87XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDEwcHggMTJweCAxMHB4IDEycHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgLW1vei11c2VyLXNlbGVjdDogdGV4dDtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgICBoMiwgcCB7XG4gICAgICBjb2xvcjogYmxhY2s7XG4gICAgfVxuICB9XG5cbiAgLm1vbWVudC1pbWFnZSB7XG4gICAgbWF4LWhlaWdodDogMjAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDUlO1xuXG4gIH1cbiAgLnN1cGVyaW1wb3NlZEljb257XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogNTAlO1xuICAgIHJpZ2h0OiA0MCU7XG4gICAgd2lkdGg6IDIwJTtcbiAgfVxuXG4gIC5tb21lbnQtbmFtZXtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5tb21lbnQtZGF0ZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgfVxuICAubW9tZW50LW5vdGVze1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB9XG5cbiAgLmdvYWxGb290ZXJ7XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG5cbiAgLy9Qb2xsIG1lc3NhZ2VcbiAgLnBvbGxJY29uRGl2e1xuICAgIGhlaWdodDogMjAlO1xuICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgLnBvbGxJY29ue1xuICAgICAgaGVpZ2h0OiAxLjhlbTtcbiAgICAgIHdpZHRoOiAxMCU7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG4gIH1cblxuICAucG9sbFF1ZXN0aW9ue1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBmb250LXNpemU6IG1lZGl1bTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIH1cblxuICAucG9sbENvbnRhaW5lcntcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgY2xlYXI6IGJvdGg7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40KSAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmc6IDJweDtcbiAgfVxuXG4gIC5vcHRpb25zQ29udGFpbmVye1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiA2MCU7XG4gICAgLm9wdGlvbntcbiAgICAgIHBhZGRpbmctdG9wOiA1cHg7XG4gICAgICBmbG9hdDogbGVmdDtcbiAgICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xuICAgICAgLy9jb2xvcjogIzRhOTBlMjtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cbiAgfVxuXG4gIC52b3Rlc0NvbnRhaW5lcntcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogMjAlO1xuICAgIC52b3RlY291bnR7XG4gICAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcbiAgICB9XG4gIH1cblxuICAudXNlckNvbnRhaW5lcntcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgd2lkdGg6IDIwJTtcbiAgICAudXNlcnZvdGV7XG4gICAgICBtYXJnaW4tdG9wOiAxNXB4O1xuICAgICAgZm9udC1zaXplOiB4LXNtYWxsO1xuICAgICAgd2lkdGg6IDkwJTtcbiAgICAgIGhlaWdodDogMzBweDtcbiAgICAgIGNvbG9yOiBibGFjaztcbiAgICB9XG4gICAgLnVzZXJ2b3RlZHtcbiAgICAgIHBhZGRpbmctdG9wOiAyMHB4O1xuICAgICAgd2lkdGg6IDMwJTtcbiAgICAgIG1hcmdpbjogMCA0MCU7XG4gICAgfVxuICB9XG5cbiAgLmNvbW1lbnQge1xuICAgIHBhZGRpbmc6IDZweCA1cHg7XG4gIH1cblxuICAuY29tbWVudC1hdXRob3Ige1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDBcbiAgfVxuXG4gIC5tZXNzYWdlLWZvb3RlciB7XG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgfVxuXG4gIC5tZXNzYWdlLWZvcm0ge1xuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodGdyZXkpO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLXdpZHRoOiAwLjVweDtcbiAgICBwYWRkaW5nOiAwIDhweDtcblxuICAgIGlvbi1idXR0b24ge1xuICAgICAgbWFyZ2luLXRvcDogYXV0bztcbiAgICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgfVxuXG4gICAgaW9uLWljb24ge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgcGFkZGluZy1sZWZ0OiAwcHg7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIH1cblxuICAgIGlvbi10ZXh0YXJlYSB7XG4gICAgICBtYXJnaW46IDhweDtcbiAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG4gICAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICAgIC0tcGFkZGluZy1zdGFydDogNHB4O1xuICAgIH1cblxuICAgIC5zZW5kSW1hZ2Uge1xuICAgICAgbWFyZ2luOiAxNnB4IDAgMTZweCAzJTtcbiAgICAgIGhlaWdodDogMzBweDtcbiAgICAgIHdpZHRoOiAzMHB4O1xuICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgIH1cblxuICAgIC5yZWNvcmRBdWRpb0ltZyB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIG1hcmdpbjogMTZweCAwIDE2cHggMiU7XG4gICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICB3aWR0aDogMzBweDtcbiAgICAgIGZsb2F0OiByaWdodDtcbiAgICB9XG4gIH1cblxuICAjZXhwYW5kYWJsZSB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IG1vdmU7XG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0O1xuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcbiAgfVxuXG4gIEBrZXlmcmFtZXMgbW92ZSB7XG4gICAgZnJvbSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTcwcHgpO1xuICAgIH1cbiAgICB0byB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgfVxuICB9XG5cbiAgLm1vcmVvcHRpb25zIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtaGVpZ2h0OiAxODBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIzOCwyMzgsMjM4LDAuNSk7XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcblxuICAgIC5tb3JlR3JpZHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC50b3BSb3d7XG4gICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICAvKiAgICAuYm90dG9tUm93IHtcbiAgICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTRweDtcbiAgICAgICAgICBoZWlnaHQ6IDgwcHg7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgIH0qL1xuXG4gICAgLm9wdGlvbnNjb2wge1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgd2lkdGg6IDEwMCU7XG5cbiAgICAgIC5jb2xlbGVtZW50IHtcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgLy9tYXgtaGVpZ2h0OiA3NSU7XG4gICAgICAgIC8vbWF4LXdpZHRoOiA3MCU7XG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgICAgICBtYXJnaW46IDIlIGF1dG87XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIGJvcmRlci13aWR0aDogMXB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xuICAgICAgICBib3JkZXItY29sb3I6ICNDQ0NDQ0M7XG4gICAgICB9XG5cbiAgICAgIC5tb3JlTGFiZWwge1xuICAgICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIGNvbG9yOiAjOTY5Njk2O1xuICAgICAgICBmb250LXNpemU6IG1lZGl1bTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/pages/board/showboardpost/showboardpost.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/board/showboardpost/showboardpost.page.ts ***!
  \*****************************************************************/
/*! exports provided: ShowboardpostPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowboardpostPage", function() { return ShowboardpostPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_network_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/network-service.service */ "./src/app/services/network-service.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_response_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/response.service */ "./src/app/services/response.service.ts");
/* harmony import */ var _services_board_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../services/board.service */ "./src/app/services/board.service.ts");
/* harmony import */ var _editboardpost_editboardpost_page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../editboardpost/editboardpost.page */ "./src/app/pages/board/editboardpost/editboardpost.page.ts");
/* harmony import */ var _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../feature/pickfeature-popover/pickfeature-popover.page */ "./src/app/pages/feature/pickfeature-popover/pickfeature-popover.page.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _connect_focus_photo_focus_photo_page__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../connect/focus-photo/focus-photo.page */ "./src/app/pages/connect/focus-photo/focus-photo.page.ts");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
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



















var ShowboardpostPage = /** @class */ (function () {
    function ShowboardpostPage(storage, cache, geolocation, platform, actionSheetCtrl, alertCtrl, awsService, userData, networkService, resourceService, momentService, responseService, boardService, chatService, modalCtrl) {
        var _this = this;
        this.storage = storage;
        this.cache = cache;
        this.geolocation = geolocation;
        this.platform = platform;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.awsService = awsService;
        this.userData = userData;
        this.networkService = networkService;
        this.resourceService = resourceService;
        this.momentService = momentService;
        this.responseService = responseService;
        this.boardService = boardService;
        this.chatService = chatService;
        this.modalCtrl = modalCtrl;
        this.resource = { "en-US": { matrix_string: [[''], [''], [''], ['']] } };
        this.moreOptions = false;
        this.loadCompleted = false;
        this.anyChangeMade = false;
        this.composedComment = '';
        this.selectParentTag = false;
        this.subscriptions = {};
        this.refreshBoardHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var e_1, _a, data, index, fromAnotherDevice, _b, _c, comment;
            return __generator(this, function (_d) {
                if (res && res.type === 'refresh board' && res.boardId === this.boardId) {
                    data = res.data;
                    if (data.action === 'like' || data.action === 'cancel like') {
                        if (this.post.bucketId === data.bucketId && this.post._id === data.postId) {
                            if (data.action === 'like') {
                                this.post.likes.push(data.author);
                            }
                            else if (data.action === 'cancel like') {
                                index = this.post.likes.indexOf(data.author);
                                this.post.likes.splice(index, 1);
                            }
                        }
                    }
                    else if (data.action === 'update post') {
                        if (this.post.bucketId === data.post.bucketId && this.post._id === data.post._id) {
                            //just update the body and attachments
                            this.post.body = data.post.body;
                            this.post.attachments = data.post.attachments;
                            if (this.post.media && this.post.media.length && data.post.media && !data.post.media.length) {
                                if (this.player)
                                    this.player.destroy();
                            }
                            this.post.media = data.post.media;
                            if (data.post.moments && data.post.moments[0] && data.post.moments[0].resource.hasOwnProperty('en-US') && data.post.moments[0].resource['en-US'].value[0] === 'Poll') {
                                this.loadPost(); //reload is needed to create a new moment socket.io for the feature
                            }
                            else {
                                this.post.moments = data.post.moments;
                            }
                        }
                        if (data.post.comments && data.post.comments.length && data.post.comments[0]) {
                            this.loadPost();
                        }
                    }
                    else if (data.action === 'delete post') {
                        if (this.post.bucketId === data.bucketId && this.post._id === data.postId) {
                            //just update the body and attachments
                            if (this.player)
                                this.player.destroy();
                            this.modalCtrl.dismiss();
                        }
                    }
                    else if (data.action === 'create comment') {
                        if (this.post._id === data.comment.parentId) { //first level comment
                            fromAnotherDevice = true;
                            try {
                                for (_b = __values(this.post.comments), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    comment = _c.value;
                                    if (comment.confirmId === data.comment.confirmId) {
                                        comment.status = 'confirmed';
                                        fromAnotherDevice = false;
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            if (fromAnotherDevice) {
                                data.comment.status = 'confirmed';
                                this.post.comments.unshift(data.comment);
                            }
                        }
                    }
                }
                return [2 /*return*/];
            });
        }); };
        this.refreshMomentHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var e_2, _a, data, index, _b, _c, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(res && res.momentId && res.data)) return [3 /*break*/, 2];
                        data = res.data;
                        if (!(this.post.moments && (this.post.moments[0]._id === data.moment._id) && this.post.moments[0].resource.hasOwnProperty('en-US') && this.post.moments[0].resource['en-US'].value[0] === 'Poll')) return [3 /*break*/, 2];
                        index = this.post.poll.responses.map(function (c) { return c._id; }).indexOf(data.response._id);
                        if (index < 0) { //if the response hasn't been added to the response list
                            this.post.poll.responses.push(data.response);
                        }
                        else { //if it has been added, replace with the incoming one
                            this.post.poll.responses.splice(index, 1, data.response);
                        }
                        //now the latest response have been included, reset the display array
                        return [4 /*yield*/, this.post.poll.display.forEach(function (displayitem) {
                                displayitem.count = 0;
                                displayitem.votedByUser = false;
                            })];
                    case 1:
                        //now the latest response have been included, reset the display array
                        _d.sent();
                        //reconstruct the display array
                        this.post.poll.totalVoteCount = this.post.poll.responses.length;
                        try {
                            for (_b = __values(this.post.poll.responses), _c = _b.next(); !_c.done; _c = _b.next()) {
                                response = _c.value;
                                if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                    if (response.matrix_number[0][1] > (this.post.poll.display.length - 1)) {
                                        return [2 /*return*/]; // if this response belongs to an option that has been deleted
                                    }
                                    if (response.user._id === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                        this.post.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                    }
                                    this.post.poll.display[response.matrix_number[0][1]].count++;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        _d.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
    }
    ShowboardpostPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadResource, resource;
            var _this = this;
            return __generator(this, function (_a) {
                this.parent = this.post;
                this.loadCompleted = false;
                loadResource = this.resourceService.load('en-US', "Board");
                resource = this.cache.loadFromDelayedObservable('loadResource: Board', loadResource, 'resource', 3600, 'none');
                resource.subscribe(function (result) {
                    _this.resource = result[0];
                }, function (err) { return __awaiter(_this, void 0, void 0, function () {
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
                }); });
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshBoardHandler);
                this.subscriptions['refreshMoment'] = this.momentService.refreshMoment$.subscribe(this.refreshMomentHandler);
                return [2 /*return*/];
            });
        });
    };
    ShowboardpostPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loadPost();
                return [2 /*return*/];
            });
        });
    };
    ShowboardpostPage.prototype.loadPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, _b, momentIds, _c, _d, option, responseRequest, responseResponse;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = this;
                        return [4 /*yield*/, this.boardService.loadBoardBucket(this.post.bucketId, this.post._id)];
                    case 1:
                        _b.post = _e.sent();
                        momentIds = [];
                        if (this.post.moments && this.post.moments.length && this.post.moments[0].resource && this.post.moments[0].resource.hasOwnProperty('en-US') && this.post.moments[0].resource['en-US'].value[0] === 'Poll') {
                            momentIds.push(this.post.moments[0]._id);
                            this.post.poll = {
                                display: [],
                                responses: [],
                                winner: [],
                                totalVoteCount: 0
                            };
                            try {
                                for (_c = __values(this.post.moments[0].matrix_string[1]), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    option = _d.value;
                                    this.post.poll.display.push({ option: option, votedByUser: false, count: 0 });
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                        if (momentIds.length) {
                            momentIds.forEach(function (momentId) {
                                _this.momentService.socket.emit('join moment', momentId);
                            });
                            responseRequest = this.responseService.findResponsesByMomentIds(JSON.parse(JSON.stringify(momentIds)));
                            responseResponse = this.cache.loadFromDelayedObservable('response-' + this.boardId, responseRequest, 'boards', 5, 'all');
                            responseResponse.subscribe(function (responses) { return __awaiter(_this, void 0, void 0, function () {
                                var e_4, _a, e_5, _b, responses_1, responses_1_1, response, index, _c, _d, response;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            if (!(this.post.moments[0] && this.post.moments[0].resource && this.post.moments[0].resource.hasOwnProperty('en-US') && this.post.moments[0].resource['en-US'].value[0] === 'Poll')) return [3 /*break*/, 2];
                                            try {
                                                for (responses_1 = __values(responses), responses_1_1 = responses_1.next(); !responses_1_1.done; responses_1_1 = responses_1.next()) {
                                                    response = responses_1_1.value;
                                                    if (response.moment === this.post.moments[0]._id) {
                                                        index = this.post.poll.responses.map(function (c) { return c._id; }).indexOf(response._id);
                                                        if (index < 0) { //if the response hasn't been added to the response list
                                                            this.post.poll.responses.push(response);
                                                        }
                                                        else { //if it has been added, and if the incoming response is newer
                                                            if (new Date(this.post.poll.responses[index].createdAt).getTime() < new Date(response.createdAt).getTime()) {
                                                                this.post.poll.responses.splice(index, 1, response);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                            finally {
                                                try {
                                                    if (responses_1_1 && !responses_1_1.done && (_a = responses_1.return)) _a.call(responses_1);
                                                }
                                                finally { if (e_4) throw e_4.error; }
                                            }
                                            //now the latest response have been included, reset the display array
                                            return [4 /*yield*/, this.post.poll.display.forEach(function (displayitem) {
                                                    displayitem.count = 0;
                                                    displayitem.votedByUser = false;
                                                })];
                                        case 1:
                                            //now the latest response have been included, reset the display array
                                            _e.sent();
                                            //reconstruct the display array
                                            this.post.poll.totalVoteCount = this.post.poll.responses.length;
                                            try {
                                                for (_c = __values(this.post.poll.responses), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                    response = _d.value;
                                                    if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                                        if (response.matrix_number[0][1] > (this.post.poll.display.length - 1)) {
                                                            return [2 /*return*/]; // if this response belongs to an option that has been deleted
                                                        }
                                                        if (this.userData.user && response.user === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                                            this.post.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                                        }
                                                        this.post.poll.display[response.matrix_number[0][1]].count++;
                                                    }
                                                }
                                            }
                                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                            finally {
                                                try {
                                                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                                }
                                                finally { if (e_5) throw e_5.error; }
                                            }
                                            _e.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        this.loadCompleted = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.presentPickPeoplePopover = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Sharing is Coming Soon',
                                subHeader: 'This feature will be available in a future release.',
                                buttons: ['Dismiss'],
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
    //end of UI functions
    ShowboardpostPage.prototype.takePhotoAndUpload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Camera, image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["CameraSource"].Camera,
                                correctOrientation: false
                            })];
                    case 1:
                        image = _a.sent();
                        return [4 /*yield*/, this.awsService.uploadImage('communities', this.userData.user.churches[this.userData.currentCommunityIndex]._id, image, this.boardId)];
                    case 2:
                        result = _a.sent();
                        if (result === "Upload succeeded") {
                            this.sendAttachments();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.selectPhotoFromDeviceAndUpload = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result, Camera, image, compressed, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        result = void 0;
                        if (!this.platform.is('cordova')) return [3 /*break*/, 3];
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["CameraSource"].Photos,
                                correctOrientation: false
                            })];
                    case 1:
                        image = _a.sent();
                        return [4 /*yield*/, this.awsService.uploadImage('communities', this.userData.user.churches[this.userData.currentCommunityIndex]._id, image, this.boardId)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.awsService.compressPhoto(event.target.files[0])];
                    case 4:
                        compressed = _a.sent();
                        return [4 /*yield*/, this.awsService.uploadFile('communities', this.userData.user.churches[this.userData.currentCommunityIndex]._id, compressed, this.boardId)];
                    case 5:
                        result = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (result === "Upload succeeded") {
                            this.sendAttachments();
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.selectFileFromDeviceAndUpload = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.awsService.uploadFile('communities', this.userData.user.churches[this.userData.currentCommunityIndex]._id, event.target.files[0], this.boardId)];
                    case 1:
                        result = _a.sent();
                        console.log("result", result);
                        if (result === "Upload succeeded") {
                            this.sendAttachments();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.pickFeatureModalPage = function (event, typeOfMoment) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, moments, err_3, networkAlert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 7]);
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_15__["PickfeaturePopoverPage"], componentProps: { title: 'Choose from Library' } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        moments = (_a.sent()).data;
                        if (moments && moments.length) {
                            this.moreOptions = false;
                            if (moments[0].resource.hasOwnProperty('en-US') && moments[0].resource['en-US'].value[0] === 'Poll') {
                                this.momentService.socket.emit('join moment', moments[0]._id); //join the moment socket.io to receive real-time update for voting
                            }
                            this.moment = moments[0];
                            this.composedComment = "Restvo Feature: " + moments[0].matrix_string[0][0];
                            this.moreOptions = false;
                        }
                        return [3 /*break*/, 7];
                    case 4:
                        err_3 = _a.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'No Internet Connection',
                                subHeader: 'Please check your internet connection.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 5:
                        networkAlert = _a.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.shareLocation = function () {
        var _this = this;
        console.log("load current location...");
        //Find the device's location
        this.geolocation.getCurrentPosition().then(function (position) {
            console.log("geolocation returning results...");
            var yourPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log("Geolocation Latitude is: " + yourPosition.lat + "Longitude is: " + yourPosition.lng);
            //this.updateMap(yourPosition);
            _this.composedComment += (_this.composedComment.length ? " " : '') + "https://www.google.com/maps/search/?api=1&query=" + yourPosition.lat + "+%2C" + yourPosition.lng;
        }).catch(function (err) {
            console.log('Error getting location', err);
        });
    };
    ShowboardpostPage.prototype.seeUserInfo = function (event, recipient) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_16__["ShowrecipientinfoPage"], componentProps: { recipient: recipient, modalPage: true } })];
                    case 1:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.openRestvoFeature = function (event, moment) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_18__["ShowfeaturePage"], componentProps: { moment: moment, modalPage: true } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.loadPost();
                            this.anyChangeMade = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.selectParentToReply = function (parent) {
        this.selectParentTag = true;
        this.parent = parent;
        console.log("parent", parent);
    };
    ShowboardpostPage.prototype.closeSelectParent = function () {
        this.selectParentTag = false;
        this.parent = {};
    };
    ShowboardpostPage.prototype.likePost = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        action = (this.post.likes.indexOf(this.userData.user._id) > -1) ? "cancel like" : "like";
                        return [4 /*yield*/, this.boardService.likePost(this.boardId, this.post.bucketId, this.post._id, action)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.sendComment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var socketData, serverData, result, err_4, networkAlert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        socketData = {
                            bucketId: this.post.bucketId,
                            parentId: this.selectParentTag ? this.parent._id : this.post._id,
                            body: this.composedComment,
                            //moment: this.moment,
                            author: {
                                _id: this.userData.user._id,
                                first_name: this.userData.user.first_name,
                                last_name: this.userData.user.last_name,
                                avatar: this.userData.user.avatar
                            },
                            status: 'pending',
                            confirmId: Math.random()
                        };
                        serverData = {
                            bucketId: this.post.bucketId,
                            parentId: this.selectParentTag ? this.parent._id : this.post._id,
                            body: this.composedComment,
                            author: this.userData.user._id
                        };
                        if (this.post._id === this.parent._id) {
                            this.post.comments.unshift(socketData);
                            this.composedComment = '';
                            setTimeout(function () {
                                _this.content.scrollToTop(50);
                            }, 50);
                        }
                        return [4 /*yield*/, this.boardService.createComment(this.boardId, serverData, socketData)];
                    case 1:
                        result = _a.sent();
                        if (result === 'success') {
                            this.anyChangeMade = true;
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'No Internet Connection',
                                subHeader: 'Please check your internet connection.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        networkAlert = _a.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.sendAttachments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var socketData, serverData, result, err_5, networkAlert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        socketData = {
                            bucketId: this.post.bucketId,
                            parentId: this.selectParentTag ? this.parent._id : this.post._id,
                            attachments: [this.awsService.url],
                            createdAt: new Date(),
                            author: {
                                _id: this.userData.user._id,
                                first_name: this.userData.user.first_name,
                                last_name: this.userData.user.last_name,
                                avatar: this.userData.user.avatar
                            }
                        };
                        serverData = {
                            bucketId: this.post.bucketId,
                            parentId: this.selectParentTag ? this.parent._id : this.post._id,
                            attachments: [this.awsService.url],
                            author: this.userData.user._id
                        };
                        if (this.post._id === this.parent._id) {
                            this.post.comments.unshift(socketData);
                            this.awsService.url = '';
                            setTimeout(function () {
                                _this.content.scrollToTop(50);
                            }, 50);
                        }
                        return [4 /*yield*/, this.boardService.createComment(this.boardId, serverData, socketData)];
                    case 1:
                        result = _a.sent();
                        if (result === 'success') {
                            this.anyChangeMade = true;
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        err_5 = _a.sent();
                        console.log("reply to conversation failed");
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'No Internet Connection',
                                subHeader: 'Please check your internet connection.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 3:
                        networkAlert = _a.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.reportPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var message, alert_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.post.status === 'review')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.boardService.updatePost(this.boardId, this.post)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: "Post is under Review",
                                message: "Someone has already submitted a report about this post. We will take the necessary actions which may lead to deleting of this post and the suspension of its author.",
                                buttons: [{ text: 'Close' }],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        message = _a.sent();
                        return [4 /*yield*/, message.present()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.alertCtrl.create({
                            header: "Report Post",
                            message: "You are about to report this post for a violation of our terms of use. Are you sure to proceed?",
                            buttons: [{ text: 'Ok',
                                    handler: function () {
                                        var navTransition = alert_1.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var message;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        this.post.status = 'review';
                                                        console.log("report", this.boardId, this.post);
                                                        return [4 /*yield*/, this.boardService.updatePost(this.boardId, this.post)];
                                                    case 1:
                                                        _a.sent();
                                                        return [4 /*yield*/, this.alertCtrl.create({
                                                                header: "Report Received",
                                                                message: "We will take the necessary actions which may lead to deleting of this post and the suspension of its author.",
                                                                buttons: [{ text: 'Close' }],
                                                                cssClass: 'level-15'
                                                            })];
                                                    case 2:
                                                        message = _a.sent();
                                                        return [4 /*yield*/, message.present()];
                                                    case 3:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    } },
                                { text: 'Cancel' }],
                            cssClass: 'level-15'
                        })];
                    case 5:
                        alert_1 = _a.sent();
                        alert_1.present();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.reinstatePost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: "Cancel Abuse Report",
                            message: "You are about to cancel a violation report submitted by a user, Are you sure to proceed?",
                            buttons: [{ text: 'Ok',
                                    handler: function () {
                                        var navTransition = alert.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var message;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        this.post.status = 'restored';
                                                        return [4 /*yield*/, this.boardService.updatePost(this.boardId, this.post)];
                                                    case 1:
                                                        _a.sent();
                                                        return [4 /*yield*/, this.alertCtrl.create({
                                                                header: "User Report Removed",
                                                                message: "This post will not be marked for review. Restvo reserves the right to investigate its content and take actions if necessary.",
                                                                buttons: [{ text: 'Close' }],
                                                                cssClass: 'level-15'
                                                            })];
                                                    case 2:
                                                        message = _a.sent();
                                                        return [4 /*yield*/, message.present()];
                                                    case 3:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    } },
                                { text: 'Cancel' },
                            ],
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
    ShowboardpostPage.prototype.editPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _editboardpost_editboardpost_page__WEBPACK_IMPORTED_MODULE_14__["EditboardpostPage"], componentProps: { boardId: this.boardId, post: this.post } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        //event is an a moment object see server/models/moment.js
                        //event contains a resource with info on the event see server/models/resource.js
                        if (refreshNeeded) {
                            //this.loadPost();
                            this.anyChangeMade = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.deletePost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: this.resource['en-US'].matrix_string[0][10] + ' ' + this.resource['en-US'].matrix_string[0][2],
                            message: this.resource['en-US'].matrix_string[0][11],
                            buttons: [{ text: 'Ok',
                                    handler: function () {
                                        var navTransition = alert.dismiss();
                                        navTransition.then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: 
                                                    //Remove group from user-data and group collections
                                                    return [4 /*yield*/, this.boardService.deletePost(this.boardId, this.post.bucketId, this.post._id)];
                                                    case 1:
                                                        //Remove group from user-data and group collections
                                                        _a.sent();
                                                        if (!(this.post.attachments && this.post.attachments.length && this.post.attachments[0])) return [3 /*break*/, 3];
                                                        return [4 /*yield*/, this.awsService.removeFile(this.post.attachments[0])];
                                                    case 2:
                                                        _a.sent();
                                                        this.post.attachments.splice(0, 1);
                                                        _a.label = 3;
                                                    case 3:
                                                        if (this.player)
                                                            this.player.destroy();
                                                        this.modalCtrl.dismiss(true);
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
    ShowboardpostPage.prototype.sharePost = function (conversations) {
        return __awaiter(this, void 0, void 0, function () {
            var alert_2, err_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!conversations.length) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.post.resource = this.resource; //populate moment before emitting
                        conversations.forEach(function (obj) {
                            _this.chatService.sendReply(obj.conversation._id, {
                                post: _this.post._id,
                                page: obj.conversation.type === 'connect' ? "MessagePage" : "GroupmessagePage",
                                groupId: obj.conversation.type === 'connect' ? null : obj.conversation.group._id,
                                groupName: obj.conversation.type === 'connect' ? null : obj.conversation.group.name
                            }, {
                                conversationId: obj.conversation._id,
                                post: _this.post,
                                createdAt: new Date(),
                                author: {
                                    _id: _this.userData.user._id,
                                    first_name: _this.userData.user.first_name,
                                    last_name: _this.userData.user.last_name,
                                    avatar: _this.userData.user.avatar
                                },
                                status: "pending",
                                confirmId: Math.random()
                            });
                        });
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Success',
                                message: 'Your post has been successfully shared.',
                                buttons: [{ text: 'Ok' }],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        console.log(err_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.focusPhoto = function (event, object) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _connect_focus_photo_focus_photo_page__WEBPACK_IMPORTED_MODULE_17__["FocusPhotoPage"], componentProps: { imageUri: object } })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShowboardpostPage.prototype.messageMoreOptions = function () {
        var _this = this;
        this.moreOptions = !this.moreOptions; //updating to the new state
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var scroll, scrollDistance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.content.getScrollElement()];
                    case 1:
                        scroll = _a.sent();
                        scrollDistance = this.moreOptions ? scroll.scrollTop + 186 : scroll.scrollTop - 186;
                        this.content.scrollByPoint(0, scrollDistance, 5);
                        return [2 /*return*/];
                }
            });
        }); }, 5);
    };
    ShowboardpostPage.prototype.openActionSheet = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var buttons, actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        buttons = [];
                        if (this.post.status !== 'suspended') {
                            if (this.post.status === 'review' && (this.hasAdminAccess || this.isGroupLeader) && this.post.author._id !== this.userData.user._id) {
                                buttons.unshift({
                                    text: 'Remove Abuse Report',
                                    handler: function () {
                                        _this.reinstatePost();
                                    }
                                });
                            }
                            else {
                                buttons.unshift({
                                    text: 'Report Post',
                                    handler: function () {
                                        _this.reportPost();
                                    }
                                });
                            }
                        }
                        if (this.hasAdminAccess || this.isGroupLeader || this.post.author._id === this.userData.user._id) {
                            buttons.unshift({
                                text: 'Delete Post',
                                handler: function () {
                                    _this.deletePost();
                                }
                            });
                            buttons.unshift({
                                text: 'Edit Post',
                                handler: function () {
                                    _this.editPost();
                                }
                            });
                        }
                        return [4 /*yield*/, this.actionSheetCtrl.create({
                                header: buttons.length > 1 ? "Actions" : "Action",
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
    ShowboardpostPage.prototype.closeModal = function () {
        if (this.player)
            this.player.destroy();
        this.modalCtrl.dismiss(this.anyChangeMade);
    };
    ShowboardpostPage.prototype.displayTimeElapsed = function (dateTime) {
        var minElapsed = Math.round((new Date().getTime() - new Date(dateTime).getTime()) / (1000 * 60));
        if (minElapsed < 60) {
            return minElapsed.toString() + 'm ago';
        }
        else if (minElapsed >= 60 && minElapsed < (60 * 24)) {
            return Math.round(minElapsed / 60).toString() + 'h ago';
        }
        else if (minElapsed >= (60 * 24) && minElapsed < (60 * 24 * 6)) {
            return Math.round(minElapsed / (60 * 24)).toString() + 'd ago';
        }
        else if (minElapsed >= (60 * 24 * 6) && minElapsed < (60 * 24 * 30)) {
            return Math.round(minElapsed / (60 * 24 * 7)).toString() + 'wk ago';
        }
        else {
            return Math.round(minElapsed / (60 * 24 * 30)).toString() + 'mo ago';
        }
    };
    ShowboardpostPage.prototype.videoError = function (event) {
        console.log('plyr error', event);
    };
    ShowboardpostPage.prototype.noNetworkConnection = function () {
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
    ShowboardpostPage.prototype.ngOnDestroy = function () {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshBoardHandler);
        this.subscriptions['refreshMoment'].unsubscribe(this.refreshMomentHandler);
    };
    ShowboardpostPage.ctorParameters = function () { return [
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"] },
        { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_3__["Geolocation"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_6__["Aws"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_9__["UserData"] },
        { type: _services_network_service_service__WEBPACK_IMPORTED_MODULE_8__["NetworkService"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_10__["Resource"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_11__["Moment"] },
        { type: _services_response_service__WEBPACK_IMPORTED_MODULE_12__["Response"] },
        { type: _services_board_service__WEBPACK_IMPORTED_MODULE_13__["Board"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonContent"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonContent"])
    ], ShowboardpostPage.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('textArea', { static: false }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ShowboardpostPage.prototype, "textArea", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonSlides"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonSlides"])
    ], ShowboardpostPage.prototype, "slides", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ShowboardpostPage.prototype, "boardId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], ShowboardpostPage.prototype, "isGroupLeader", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], ShowboardpostPage.prototype, "hasAdminAccess", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ShowboardpostPage.prototype, "post", void 0);
    ShowboardpostPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-showboardpost',
            template: __importDefault(__webpack_require__(/*! raw-loader!./showboardpost.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/board/showboardpost/showboardpost.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./showboardpost.page.scss */ "./src/app/pages/board/showboardpost/showboardpost.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_1__["CacheService"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_3__["Geolocation"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_6__["Aws"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_9__["UserData"],
            _services_network_service_service__WEBPACK_IMPORTED_MODULE_8__["NetworkService"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_10__["Resource"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_11__["Moment"],
            _services_response_service__WEBPACK_IMPORTED_MODULE_12__["Response"],
            _services_board_service__WEBPACK_IMPORTED_MODULE_13__["Board"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_7__["Chat"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"]])
    ], ShowboardpostPage);
    return ShowboardpostPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~board-communityboard-communityboard-module~groups-groups-module~manage-managecommunities-man~e8713d10.js.map