(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~board-communityboard-communityboard-module~connect-myconversations-myconversations-module~gr~29966ac3"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/groupchat/groupchat.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/groupchat/groupchat.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header *ngIf=\"chatService.currentChatProps[propIndex]\">\n  <ion-toolbar mode=\"ios\">\n    <ion-buttons slot=\"start\">\n      <ion-button (click)=\"closeModal(false)\" *ngIf=\"modalPage\"><ion-icon name=\"chevron-back-outline\"></ion-icon></ion-button>\n    </ion-buttons>\n    <ion-title (click)=\"seeMoreInfo()\">{{chatService.currentChatProps[propIndex].name}}</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button *ngIf=\"modalPage && platform.width() >= 768\" (click)=\"expandChatView(false)\">\n        <ion-icon name=\"open\"></ion-icon>\n      </ion-button>\n      <ion-button (click)=\"startVideoChat()\" [ngClass]=\"{'fade': (chatService.liveVideoChats.hasOwnProperty(this.chatService.currentChatProps[propIndex].conversationId) && chatService.liveVideoChats[this.chatService.currentChatProps[propIndex].conversationId].users.length)}\">\n        <ion-icon name=\"videocam\" color=\"dark\"></ion-icon>\n      </ion-button>\n      <ion-button (click)=\"seeMoreInfo()\">\n        <ion-icon ios=\"ellipsis-horizontal\" md=\"ellipsis-vertical\" color=\"dark\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"chatService.currentChatProps[propIndex]\">\n  <!--This is the Chat page-->\n  <!--get new data when page is refreshed-->\n  <ion-infinite-scroll position=\"top\" (ionInfinite)=\"loadMoreMessages($event)\">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n  <ion-list class=\"chat-list\" lines=\"none\">\n    <ion-item *ngIf=\"messages?.length === 0 && chatFinishedLoading\">\n      <p class=\"message-timestamp ion-text-center\" >Be the first one to say 'hi' to your group.</p>\n    </ion-item>\n    <div *ngFor=\"let message of messages; trackBy: customTrackBy\">\n      <!--Individual Chat Bubble-->\n      <ion-item *ngIf=\"message.timestamp\">\n        <p class=\"message-timestamp ion-text-center\">{{message.createdAt | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>\n      </ion-item>\n      <ion-item class=\"message-wrapper\" *ngIf=\"!message.timestamp && (message.author && message.author._id !== userData.user._id)\" (longPressed)=\"seeUserInfo($event, message.author)\">\n        <!--the recipient's message-->\n        <ion-avatar class=\"sender-avatar\" [ngClass]=\"{'online': (chatService.onlineUsers.indexOf(message.author._id) > -1)}\" slot=\"start\" (click)=\"seeUserInfo($event, message.author)\">\n          <img *ngIf=\"message.author && message.author.avatar\" [src]=\"message.author.avatar\" />\n          <img *ngIf=\"(message.author && !message.author.avatar) || message.author_pending_member\" src=\"assets/img/avatar-default.jpg\" />\n        </ion-avatar>\n        <div class=\"sender-message-container\">\n          <div class=\"author\" *ngIf=\"chatService.currentChatProps[this.propIndex]?.group && message.author\">\n            {{ message.author.first_name }}{{\" \"}}{{ message.author.last_name }}\n          </div>\n          <div class=\"author\" *ngIf=\"chatService.currentChatProps[this.propIndex]?.group && message.author_pending_member\">\n            {{ message.author_pending_member.name }}\n          </div>\n          <!--User Defined Activity-->\n          <ion-grid class=\"multiple-photos\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'User Defined Activity' && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] !== 'Poll'\">\n            <ion-row class=\"ion-justify-content-start ion-no-padding\">\n              <ion-col class=\"ion-align-self-center ion-no-padding ion-padding-end ion-padding-top\" size-xs=\"8\" size-sm=\"8\" size-md=\"6\" size-lg=\"6\" size-xl=\"4\">\n                <ion-card class=\"program-card\" (click)=\"openRestvoFeature(message.moment)\">\n                  <ion-card-header class=\"ion-no-padding\">\n                    <div class=\"chat-program-photo-container\">\n                      <ion-img class=\"program-photo\" [src]=\"(message.moment.assets && message.moment.assets.length && message.moment.assets[0]) | background: message.moment._id\"></ion-img>\n                    </div>\n                  </ion-card-header>\n                  <div class=\"program-type\"><ion-badge color=\"button1\">{{message.moment.resource['en-US'].value[0]}}</ion-badge></div>\n                  <div class=\"program-name light\">{{message.moment.matrix_string[0][0]}}</div>\n                </ion-card>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <div class=\"moment left ion-text-wrap\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'Poll'\">\n            <ion-label color=\"dark\">This poll is no longer available</ion-label>\n          </div>\n          <!-- Poll: in 1.6.3+, field = 'User Defined Activity' and message.moment.resource['en-US'].value[0] === 'Poll' -->\n          <div class=\"moment left ion-text-wrap\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'User Defined Activity' && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll'\" (click)=\"openRestvoFeature(message.moment)\">\n            <ion-thumbnail class=\"pollIconDiv\">\n              <ion-img class=\"pollIcon\" src=\"assets/img/Poll_Gray.png\"></ion-img>\n            </ion-thumbnail>\n            <div class=\"pollQuestion\">{{message.moment.resource['en-US'].matrix_string[message.poll.componentId][1]}}</div>\n            <div class=\"pollContainer\" *ngFor=\"let display of message.poll.display; index as count\">\n              <div class=\"optionsContainer\">\n                <div class=\"option\">{{count+1}}. {{display.option}}</div>\n              </div>\n              <div class=\"votesContainer\">\n                <div class=\"votecount\" *ngIf=\"message.poll.winner.length == 0 || !message.poll.winner.includes(count)\" >Votes: {{display.count}}</div>\n              </div>\n              <div class=\"userContainer\">\n                <ion-icon class=\"uservoted\" *ngIf=\"display.votedByUser\" name=\"checkmark\"></ion-icon>\n                <ion-button size=\"small\" shape=\"round\" fill='solid' color=\"grey\" class=\"uservote ion-text-wrap\" *ngIf=\"!display.votedByUser\" (click)=\"momentService.submitVote($event, message.moment, count)\">Cast Vote</ion-button>\n              </div>\n            </div>\n            <div class=\"unresolvedPollFooter\">\n              <ion-label color=\"dark\">{{message.moment.resource['en-US'].matrix_string[message.poll.componentId][4]}}: {{message.poll.totalVoteCount}}</ion-label>\n              <ion-label color=\"dark\">{{message.moment.resource['en-US'].matrix_string[message.poll.componentId][6]}}: {{message.moment.calendar.endDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-label>\n            </div>\n          </div>\n          <!--Track: obsolete in 1.6.3+-->\n          <div class=\"moment left ion-text-wrap\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'Track'\" (click)=\"openRestvoFeature(message.moment)\">\n            <ion-thumbnail>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n            </ion-thumbnail>\n            <ion-label color=\"dark\" class=\"moment-name\" >{{message.moment.resource['en-US'].matrix_string[0][0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n            <!--<p class=\"moment-date\" >Date: {{message.moment.calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>-->\n            <ion-label color=\"dark\" class=\"moment-name\">{{message.moment.matrix_string[0][1]}}</ion-label>\n          </div>\n          <!-- Event: obsolete in 1.6.3+ since it now uses the User Defined Activity -->\n          <div class=\"moment left ion-text-wrap\" *ngIf=\"message.moment && message.moment.resource.field === 'Event'\" (click)=\"openRestvoFeature(message.moment)\">\n            <ion-thumbnail>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n            </ion-thumbnail>\n            <ion-label color=\"dark\" class=\"moment-name\" >{{message.moment.resource['en-US'].matrix_string[0][0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n            <ion-label color=\"dark\" class=\"moment-date\" >Date: {{message.moment.calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-label>\n            <ion-label color=\"dark\" class=\"moment-notes\">{{message.moment.matrix_string[1][0]}}</ion-label>\n          </div>\n          <!-- Meetup: obsolete in 1.6.3+ since it now uses the User Defined Activity -->\n          <div class=\"moment left ion-text-wrap\" *ngIf=\"message.moment && message.moment.resource.field === 'Meetup'\" (click)=\"openRestvoFeature(message.moment)\">\n            <ion-thumbnail>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n            </ion-thumbnail>\n            <ion-label color=\"dark\" class=\"moment-name\" >{{message.moment.resource['en-US'].matrix_string[0][0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n            <ion-label color=\"dark\" class=\"moment-date\" >Date: {{message.moment.calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-label>\n            <ion-label color=\"dark\" class=\"moment-notes\">{{message.moment.matrix_string[1][0]}}</ion-label>\n          </div>\n          <!-- Goal: obsolete in 1.6.3+ since it now uses the User Defined Activity -->\n          <div class=\"moment left ion-text-wrap\" *ngIf=\"message.moment && message.moment.resource.field === 'Goal'\" (click)=\"openRestvoFeature(message.moment)\">\n            <ion-thumbnail>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n            </ion-thumbnail>\n            <ion-label color=\"dark\" *ngIf=\"message.moment.matrix_string?.length > 0\" class=\"moment-name\" >{{message.moment.resource['en-US'].matrix_string[0][0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n            <ion-label color=\"dark\" *ngIf=\"message.moment.calendar\" class=\"moment-date\" >Accomplish By: {{message.moment.calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-label>\n            <ion-label color=\"dark\" *ngIf=\"message.moment.matrix_string?.length > 0\" class=\"moment-notes\">{{message.moment.matrix_string[1][0]}}</ion-label>\n          </div>\n          <!-- Location -->\n          <div class=\"moment right ion-text-wrap\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource && message.moment.resource.field === 'Location'\">\n            <a [href]=\"message.addressURL\" target=\"_blank\">\n              <ion-thumbnail>\n                <ion-img [src]=\"message.moment.matrix_string[0]\"></ion-img>\n              </ion-thumbnail>\n              <ion-label color=\"dark\" class=\"moment-name\" >Location</ion-label>\n            </a>\n          </div>\n          <!--Contact-->\n          <div class=\"moment left ion-text-wrap\" *ngIf=\"message.moment && message.moment.resource.field === 'Contact'\">\n            <div *ngIf=\"message.moment.matrix_number[0][0] === 0\" (click)=\"seeUserInfo($event, message.author)\" class=\"ion-text-wrap\">\n              <ion-icon name=\"book\" large></ion-icon>\n              <ion-label color=\"dark\" [innerHTML]=\"message.author.first_name + ' ' + message.author.last_name + ' ' + message.moment.resource['en-US'].matrix_string[0][6]\"></ion-label>\n            </div>\n            <div *ngIf=\"message.moment.matrix_number[0][0] === 1\" (click)=\"seeUserInfo($event, message.author)\" class=\"ion-text-wrap\">\n              <ion-icon name=\"book\" large></ion-icon>\n              <ion-label color=\"dark\" [innerHTML]=\"message.author.first_name + ' ' + message.author.last_name + ' ' + message.moment.resource['en-US'].matrix_string[0][4]\"></ion-label>\n            </div>\n            <div *ngIf=\"message.moment.matrix_number[0][0] === 2\" (click)=\"prepareToShareContactInfo($event)\" class=\"ion-text-wrap\">\n              <ion-icon name=\"book\" large></ion-icon>\n              <ion-label color=\"dark\" [innerHTML]=\"message.author.first_name + ' ' + message.author.last_name + ' ' + message.moment.resource['en-US'].matrix_string[0][8]\"></ion-label>\n            </div>\n          </div>\n          <!-- Others: Including All Future Features Displaying Basic Info -->\n          <div class=\"moment left ion-text-wrap\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource && ['User Defined Activity','Track','Event','Meetup','Poll','Goal','Location','Contact'].indexOf(message.moment.resource.field) < 0\">\n            <ion-thumbnail>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n              <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n            </ion-thumbnail>\n            <ion-label color=\"dark\" class=\"moment-name\" >{{message.moment.resource['en-US'].value[0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n          </div>\n          <!--Multiple attachments-->\n          <ion-grid *ngIf=\"message.attachments && message.attachments.length > 0\">\n            <ion-row class=\"ion-justify-content-start ion-no-padding\">\n              <ion-col class=\"ion-align-self-center ion-no-padding ion-padding-end ion-padding-top\" size=\"auto\" *ngFor=\"let attachment of message.attachments\" >\n                <ion-thumbnail [ngClass]=\"{'wide-thumbnail': message.attachments.length === 1}\" *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\">\n                  <ion-img [src]=\"attachment\" (click)=\"focusPhoto(attachment)\"></ion-img>\n                </ion-thumbnail>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['doc', 'docx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/docx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['xls', 'xlsx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/xlsx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['pdf']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/pdf.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/file.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <div class=\"video-frame\" plyr [plyrSources]=\"[{ 'src': attachment, 'type': 'video/' + (attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, message._id)\" *ngIf=\"attachment && (['mp4', 'webm', 'ogg', 'mov']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" (click)=\"$event.stopPropagation()\"></div>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-justify-content-end\">\n              <ion-col>\n                <ion-icon class=\"reply-icon photo\" name=\"arrow-undo\" (click)=\"sendQuoteAndReply(message)\"></ion-icon>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <div class=\"chat-bubble left\" *ngIf=\"!message.moment && message.body?.length > 0\">\n            <div class=\"quote-bubble left ion-text-wrap\" *ngIf=\"message.quote && (message.quote.body || (message.quote.attachments && message.quote.attachments.length > 0))\">\n              <div class=\"message\" *ngIf=\"message.quote.body\" [innerHTML]=\"message.quote.body | nl2br\"></div>\n              <!-- Attachments inside a quote -->\n              <ion-grid *ngIf=\"message.quote.attachments && message.quote.attachments.length > 0\">\n                <ion-row class=\"ion-no-padding\">\n                  <ion-col class=\"ion-align-self-center ion-no-padding ion-padding-end ion-padding-top\" size=\"auto\" *ngFor=\"let attachment of message.attachments\">\n                    <ion-thumbnail *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\">\n                      <ion-img [src]=\"attachment\" (click)=\"focusPhoto(attachment)\"></ion-img>\n                    </ion-thumbnail>\n                    <a [href]=\"attachment\" *ngIf=\"attachment && (['doc', 'docx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/docx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                    <a [href]=\"attachment\" *ngIf=\"attachment && (['xls', 'xlsx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/xlsx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                    <a [href]=\"attachment\" *ngIf=\"attachment && (['pdf']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/pdf.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                    <a [href]=\"attachment\" *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/file.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                    <div class=\"video-frame\" plyr [plyrSources]=\"[{ 'src': attachment, 'type': 'video/' + (attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, message._id)\" *ngIf=\"attachment && (['mp4', 'webm', 'ogg', 'mov']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" (click)=\"$event.stopPropagation()\"></div>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n            </div>\n            <!-- Message Text Body -->\n            <p class=\"message\" *ngIf=\"message.body\" [innerHTML]=\"message.body | nl2br\"></p>\n            <!-- Detect if a video is embedded in the text -->\n            <div class=\"video-frame youtube\" plyr [plyrSources]=\"[{ 'src': message.body.substring(message.body.indexOf('a href') + 8, message.body.indexOf(' target') - 1), 'provider': 'youtube'}]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, message._id)\" *ngIf=\"message.body && message.body.indexOf('www.youtube.com/watch?v=') > -1\" (click)=\"resourceService.clickVideo($event, [{ 'src': message.body.substring(message.body.indexOf('a href') + 8, message.body.indexOf(' target') - 1), 'provider': 'youtube' }])\"></div>\n\n            <ion-icon *ngIf=\"message.body?.length <= 30\" class=\"reply-icon-short\" name=\"arrow-undo\" (click)=\"sendQuoteAndReply(message)\"></ion-icon>\n            <ion-icon *ngIf=\"message.body?.length > 30\" class=\"reply-icon\" name=\"arrow-undo\" (click)=\"sendQuoteAndReply(message)\"></ion-icon>\n          </div>\n        </div>\n      </ion-item>\n\n      <!--your message-->\n      <ion-item class=\"message-wrapper\" *ngIf=\"!message.createdAtFormatted && message.author && message.author._id === userData.user._id\">\n        <!--User Defined Activity-->\n        <ion-grid class=\"multiple-photos\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'User Defined Activity' && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] !== 'Poll'\">\n          <ion-row class=\"ion-justify-content-end ion-no-padding\">\n            <ion-col class=\"ion-align-self-center ion-no-padding ion-padding-end ion-padding-top\" size-xs=\"8\" size-sm=\"8\" size-md=\"6\" size-lg=\"6\" size-xl=\"4\">\n              <ion-card class=\"program-card\" (click)=\"openRestvoFeature(message.moment)\">\n                <ion-card-header class=\"ion-no-padding\">\n                  <div class=\"chat-program-photo-container\">\n                    <ion-img class=\"program-photo\" [src]=\"(message.moment.assets && message.moment.assets.length && message.moment.assets[0]) | background: message.moment._id\"></ion-img>\n                  </div>\n                </ion-card-header>\n                <div class=\"program-type\"><ion-badge color=\"button1\">{{message.moment.resource['en-US'].value[0]}}</ion-badge></div>\n                <div class=\"program-name light\">{{message.moment.matrix_string[0][0]}}</div>\n              </ion-card>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <!--Poll: obsolete in 1.6.3+-->\n        <div class=\"moment right ion-text-wrap\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'Poll'\">\n          <ion-label color=\"dark\">This poll is no longer available</ion-label>\n        </div>\n        <!-- Poll: in 1.6.3+, field = 'User Defined Activity' and message.moment.resource['en-US'].value[0] === 'Poll' -->\n        <div class=\"moment right ion-text-wrap\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && (message.moment.resource.field === 'User Defined Activity' && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll' )\" (click)=\"openRestvoFeature(message.moment)\">\n          <ion-thumbnail class=\"pollIconDiv\">\n            <ion-img class=\"pollIcon\" src=\"assets/img/Poll_Gray.png\"></ion-img>\n          </ion-thumbnail>\n          <div class=\"pollQuestion\">{{message.moment.resource['en-US'].matrix_string[message.poll.componentId][1]}}</div>\n          <div class=\"pollContainer\" *ngFor=\"let display of message.poll.display; index as count\">\n            <div class=\"optionsContainer\">\n              <div class=\"option\" >{{count+1}}. {{display.option}}</div>\n            </div>\n            <div class=\"votesContainer\">\n              <div class=\"votecount\">Votes: {{display.count}}</div>\n            </div>\n            <div class=\"userContainer\">\n              <ion-icon class=\"uservoted\" *ngIf=\"display.votedByUser\" name=\"checkmark\"></ion-icon>\n              <ion-button size=\"small\" shape=\"round\" fill='solid' color=\"darkgrey\" class=\"uservote ion-text-wrap\" *ngIf=\"!display.votedByUser\" (click)=\"momentService.submitVote($event, message.moment, count)\">Cast Vote</ion-button>\n            </div>\n          </div>\n          <div class=\"unresolvedPollFooter\">\n            <ion-label color=\"dark\">{{message.moment.resource['en-US'].matrix_string[message.poll.componentId][4]}}: {{message.poll.totalVoteCount}}</ion-label>\n            <ion-label color=\"dark\">{{message.moment.resource['en-US'].matrix_string[message.poll.componentId][6]}}: {{message.moment.calendar.endDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-label>\n          </div>\n        </div>\n        <!--Track: obsolete in 1.6.3+-->\n        <div class=\"moment right ion-text-wrap\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'Track'\" (click)=\"openRestvoFeature(message.moment)\">\n          <ion-thumbnail>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n          </ion-thumbnail>\n          <ion-label color=\"dark\" class=\"moment-name\" >{{message.moment.resource['en-US'].matrix_string[0][0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n          <!--<p class=\"moment-date\" >Date: {{message.moment.calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</p>-->\n          <ion-label color=\"dark\" class=\"moment-name\">{{message.moment.matrix_string[0][1]}}</ion-label>\n        </div>\n        <!--Event: obsolete in 1.6.3+ since it now uses the User Defined Activity-->\n        <div class=\"moment right ion-text-wrap\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'Event'\" (click)=\"openRestvoFeature(message.moment)\">\n          <ion-thumbnail>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n          </ion-thumbnail>\n          <ion-label color=\"dark\" class=\"moment-name\" >{{message.moment.resource['en-US'].matrix_string[0][0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n          <ion-label color=\"dark\" class=\"moment-date\" >Date: {{message.moment.calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-label>\n          <ion-label color=\"dark\" class=\"moment-name\">{{message.moment.matrix_string[1][0]}}</ion-label>\n        </div>\n        <!--Meetup: obsolete in 1.6.3+ since it now uses the User Defined Activity-->\n        <div class=\"moment right ion-text-wrap\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'Meetup'\" (click)=\"openRestvoFeature(message.moment)\">\n          <ion-thumbnail>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n          </ion-thumbnail>\n          <ion-label color=\"dark\" class=\"moment-name\" >{{message.moment.resource['en-US'].matrix_string[0][0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n          <ion-label color=\"dark\" class=\"moment-date\" >Date: {{message.moment.calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-label>\n          <ion-label color=\"dark\" class=\"moment-name\">{{message.moment.matrix_string[1][0]}}</ion-label>\n        </div>\n        <!--Goal: obsolete in 1.6.3+ since it now uses the User Defined Activity-->\n        <div class=\"moment right ion-text-wrap\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource && message.moment.resource.field === 'Goal'\" (click)=\"openRestvoFeature(message.moment)\">\n          <ion-thumbnail>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n          </ion-thumbnail>\n          <ion-label color=\"dark\" class=\"moment-name\" >{{message.moment.resource['en-US'].matrix_string[0][0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n          <ion-label color=\"dark\" *ngIf=\"message.moment.calendar\" class=\"moment-date\" >Accomplish By: {{message.moment.calendar.startDate | datetime: 'h:n,m:n,w:s,m:n,d:n'}}</ion-label>\n          <ion-label color=\"dark\" class=\"moment-notes\">{{message.moment.matrix_string[1][0]}}</ion-label>\n        </div>\n        <!--Location-->\n        <div class=\"moment right ion-text-wrap\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource && message.moment.resource.field === 'Location'\">\n          <a [href]=\"message.addressURL\" target=\"_blank\">\n            <ion-thumbnail>\n              <ion-img [src]=\"message.moment.matrix_string[0]\"></ion-img>\n            </ion-thumbnail>\n            <ion-label color=\"dark\" class=\"moment-name\">Location</ion-label>\n          </a>\n        </div>\n        <!--Contact-->\n        <div class=\"moment right\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource.field === 'Contact'\" >\n          <div *ngIf=\"message.moment.matrix_number[0][0] === 0\" (click)=\"prepareToShareContactInfo($event)\" class=\"ion-text-wrap\">\n            <ion-icon name=\"book\" large></ion-icon>\n            <ion-label color=\"dark\" [innerHTML]=\"message.moment.resource['en-US'].matrix_string[0][7] + ' ' + chatService.currentChatProps[propIndex].name\"></ion-label>\n          </div>\n          <div *ngIf=\"message.moment.matrix_number[0][0] === 1\" (click)=\"prepareToShareContactInfo($event)\" class=\"ion-text-wrap\">\n            <ion-icon name=\"book\" large></ion-icon>\n            <ion-label color=\"dark\" [innerHTML]=\"message.moment.resource['en-US'].matrix_string[0][5] + ' ' + chatService.currentChatProps[propIndex].name\"></ion-label>\n          </div>\n          <div *ngIf=\"message.moment.matrix_number[0][0] === 2\" (click)=\"seeUserInfo($event, chatService.currentChatProps[propIndex].recipient)\" class=\"ion-text-wrap\">\n            <ion-icon name=\"book\" large></ion-icon>\n            <ion-label color=\"dark\" [innerHTML]=\"message.moment.resource['en-US'].matrix_string[0][9] + ' ' + chatService.currentChatProps[propIndex].name\"></ion-label>\n          </div>\n        </div>\n        <!-- Others: Including All Future Features Displaying Basic Info -->\n        <div class=\"moment right\" slot=\"end\" *ngIf=\"message.moment && message.moment.resource && message.moment.resource && ['User Defined Activity','Track','Event','Meetup','Poll','Goal','Location','Contact'].indexOf(message.moment.resource.field) < 0\" class=\"ion-text-wrap\">\n          <ion-thumbnail>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length > 0\" [src]=\"message.moment.assets[0]\"></ion-img>\n            <ion-img class=\"moment-image\" *ngIf=\"message.moment.assets.length == 0\" src=\"assets/img/onboarding-3.jpg\"></ion-img>\n          </ion-thumbnail>\n          <ion-label color=\"dark\" class=\"moment-name\" >{{message.moment.resource['en-US'].value[0]}}: {{message.moment.matrix_string[0][0]}}</ion-label>\n        </div>\n        <!--Multiple attachments-->\n        <ion-grid class=\"multiple-photos\" *ngIf=\"message.attachments && message.attachments.length > 0\">\n          <ion-row class=\"ion-justify-content-end ion-no-padding\">\n            <ion-col class=\"ion-align-self-center ion-no-padding ion-padding-start ion-padding-top\" size=\"auto\" *ngFor=\"let attachment of message.attachments\">\n                <ion-thumbnail [ngClass]=\"{'wide-thumbnail': message.attachments.length === 1}\" *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\">\n                  <ion-img [src]=\"attachment\" (click)=\"focusPhoto(attachment)\"></ion-img>\n                </ion-thumbnail>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['doc', 'docx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/docx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['xls', 'xlsx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/xlsx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['pdf']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/pdf.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/file.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <div class=\"video-frame\" plyr [plyrSources]=\"[{ 'src': attachment, 'type': 'video/' + (attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, message._id)\" *ngIf=\"attachment && (['mp4', 'webm', 'ogg', 'mov']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" (click)=\"$event.stopPropagation()\"></div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <div class=\"chat-bubble right\" slot=\"end\" *ngIf=\"!message.moment && message.body?.length > 0\">\n          <!-- Attachments inside a quote -->\n          <div class=\"quote-bubble right ion-text-wrap\" *ngIf=\"message.quote && (message.quote.body || (message.quote.attachments && message.quote.attachments.length > 0))\">\n            <div color=\"dark\" class=\"message\" *ngIf=\"message.quote.body\" [innerHTML]=\"message.quote.body | nl2br\"></div>\n            <!--Multiple attachments-->\n            <ion-grid *ngIf=\"message.quote.attachments && message.quote.attachments.length > 0\">\n              <ion-row class=\"ion-no-padding\">\n                <ion-col class=\"ion-align-self-center ion-no-padding ion-padding-start ion-padding-top\" size=\"auto\" *ngFor=\"let attachment of message.attachments\" >\n                  <ion-thumbnail *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\">\n                    <ion-img [src]=\"attachment\" (click)=\"focusPhoto(attachment)\"></ion-img>\n                  </ion-thumbnail>\n                  <a [href]=\"attachment\" *ngIf=\"attachment && (['doc', 'docx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/docx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                  <a [href]=\"attachment\" *ngIf=\"attachment && (['xls', 'xlsx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/xlsx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                  <a [href]=\"attachment\" *ngIf=\"attachment && (['pdf']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/pdf.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                  <a [href]=\"attachment\" *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/file.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                  <div class=\"video-frame\" plyr [plyrSources]=\"[{ 'src': attachment, 'type': 'video/' + (attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, message._id)\" *ngIf=\"attachment && (['mp4', 'webm', 'ogg', 'mov']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" (click)=\"$event.stopPropagation()\"></div>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </div>\n          <!-- Text Body -->\n          <p class=\"message\" *ngIf=\"message.body\" [innerHTML]=\"message.body | nl2br\"></p>\n          <!-- Detect if Video is attached -->\n          <div class=\"video-frame youtube\" plyr [plyrSources]=\"[{ 'src': message.body.substring(message.body.indexOf('a href') + 8, message.body.indexOf(' target') - 1), 'provider': 'youtube'}]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, message._id)\" *ngIf=\"message.body && message.body.indexOf('www.youtube.com/watch?v=') > -1\" (click)=\"resourceService.clickVideo($event, [{ 'src': message.body.substring(message.body.indexOf('a href') + 8, message.body.indexOf(' target') - 1), 'provider': 'youtube' }])\"></div>\n          <!-- Attachments -->\n        </div>\n        <div class=\"message-tag\" slot=\"end\">\n          <div class=\"message-tag-centered\">\n            <ion-avatar class=\"self-avatar\">\n              <img *ngIf=\"message.author.avatar\" [src]=\"message.author.avatar\" />\n              <img *ngIf=\"!message.author.avatar\" src=\"assets/img/avatar-default.png\" />\n            </ion-avatar>\n            <div class=\"status-div\">\n              <ion-label color=\"dark\" class=\"status\" id=\"failed\" *ngIf=\"message.status === 'failed'\" (click)=\"resendMessage(message)\">Not Sent</ion-label>\n              <ion-label color=\"dark\" class=\"status\"  *ngIf=\"message.status === 'confirmed'\">Delivered</ion-label>\n              <!--<ion-icon class=\"status\" *ngIf=\"message.status === 'failed'\" name=\"alert-circle\" (click)=\"resendMessage(message)\"></ion-icon>-->\n              <!--<ion-icon class=\"status\" *ngIf=\"message.status === 'confirmed'\" name=\"checkmark\"></ion-icon>-->\n            </div>\n          </div>\n        </div>\n      </ion-item>\n    </div>\n  </ion-list>\n</ion-content>\n\n<ion-footer *ngIf=\"chatService.currentChatProps[propIndex]\" class=\"message-footer\">\n  <!-- Code start for quotation-->\n  <ion-toolbar class=\"replyQuote-wrapper ion-no-padding\" lines=\"none\" *ngIf=\"sendQuoteAndReplyTag\">\n    <div class=\"replyQuote-bubble\">\n      <ion-row>\n        <ion-col size=\"11\">\n          <div class=\"message\" *ngIf=\"replyQuote.body\" [innerHTML]=\"replyQuote.body | nl2br\"></div>\n          <ion-grid class=\"ion-no-padding\" *ngIf=\"replyQuote.attachments && replyQuote.attachments.length > 0\">\n            <ion-row class=\"ion-no-padding ion-justify-content-center\">\n              <ion-col class=\"ion-align-self-center ion-no-padding ion-padding-horizontal\" size=\"auto\" *ngFor=\"let attachment of replyQuote.attachments\" >\n                <ion-thumbnail *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\">\n                  <ion-img [src]=\"attachment\" (click)=\"focusPhoto(attachment)\"></ion-img>\n                </ion-thumbnail>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['doc', 'docx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/docx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['xls', 'xlsx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/xlsx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['pdf']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/pdf.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><ion-thumbnail><ion-img src=\"assets/img/file.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <div class=\"video-frame\" plyr [plyrSources]=\"[{ 'src': attachment, 'type': 'video/' + (attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, message._id)\" *ngIf=\"attachment && (['mp4', 'webm', 'ogg', 'mov']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" (click)=\"$event.stopPropagation()\"></div>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n          <ion-label color=\"dark\" class=\"ion-no-margin author\" *ngIf=\"replyQuote.author\">{{ replyQuote.author.first_name }}{{\" \"}}{{ replyQuote.author.last_name }}</ion-label>\n          <ion-label color=\"dark\" class=\"ion-no-margin author\" *ngIf=\"replyQuote.author_pending_member\">{{ replyQuote.author_pending_member.name }}</ion-label>\n        </ion-col>\n        <ion-col size=\"1\">\n          <ion-icon class=\"closeReply\" name=\"close-circle\" (click)=\"closeReplyQuote()\"></ion-icon>\n        </ion-col>\n      </ion-row>\n    </div>\n  </ion-toolbar>\n  <!-- Code end for quotation-->\n  <ion-toolbar class=\"ion-no-padding\">\n    <div class=\"message-form\">\n      <ion-buttons>\n        <ion-button class=\"moreButton\" fill=\"clear\" (click)=\"messageMoreOptions()\" [disabled]=\"!chatFinishedLoading\">\n          <ion-icon name=\"add-circle\" size=\"large\" color=\"grey\"></ion-icon>\n        </ion-button>\n        <div id=\"expandable-right\" *ngIf=\"moreMediaOptions\">\n          <ion-button class=\"moreButton\" fill=\"clear\" (click)=\"takePhotoAndUpload()\" [disabled]=\"!chatFinishedLoading\">\n            <ion-icon ios=\"camera-sharp\" md=\"camera-sharp\" size=\"large\" color=\"grey\"></ion-icon>\n          </ion-button>\n          <ion-button class=\"moreButton\" *ngIf=\"platform.is('cordova')\" fill=\"clear\" (click)=\"selectPhotoFromDeviceAndUpload($event)\" [disabled]=\"!chatFinishedLoading\">\n            <ion-icon ios=\"image-sharp\" md=\"image-sharp\" size=\"large\" color=\"grey\"></ion-icon>\n          </ion-button>\n          <ion-button class=\"moreButton\" *ngIf=\"!platform.is('cordova')\" fill=\"clear\" [hidden]=\"!chatFinishedLoading\">\n            <label for=\"image\" style=\"height: 32px\"><ion-icon ios=\"image-sharp\" md=\"image-sharp\" size=\"large\" color=\"grey\"></ion-icon></label>\n            <input type=\"file\" class=\"file-picker\" name=\"image\" id=\"image\" (change)=\"selectPhotoFromDeviceAndUpload($event)\" accept=\"image/*\" />\n          </ion-button>\n          <ion-button class=\"moreButton\" fill=\"clear\" [hidden]=\"!chatFinishedLoading\">\n            <label for=\"file\" style=\"height: 32px\"><ion-icon name=\"folder\" size=\"large\" color=\"grey\"></ion-icon></label>\n            <input type=\"file\" class=\"file-picker\" name=\"file\" id=\"file\" (change)=\"selectFileFromDeviceAndUpload($event)\"/>\n          </ion-button>\n        </div>\n        <ion-button class=\"moreButton\" fill=\"clear\" (click)=\"moreMediaOptions = !moreMediaOptions\" [hidden]=\"moreMediaOptions\">\n          <ion-icon name=\"chevron-forward-outline\" size=\"large\" color=\"grey\"></ion-icon>\n        </ion-button>\n      </ion-buttons>\n      <ion-textarea autosize rows=\"1\" [minRows]=\"1\" [maxRows]=\"5\" [(ngModel)]=\"composedMessage\" autocapitalize (ionFocus)=\"moreMediaOptions = false\">\n        <!--Multiple attachments-->\n        <ion-grid *ngIf=\"awsService.sessionAssets.hasOwnProperty(chatService.currentChatProps[propIndex].conversationId) && awsService.sessionAssets[chatService.currentChatProps[propIndex].conversationId]?.length\">\n          <ion-row>\n            <ion-col class=\"ion-align-self-center\" size=\"auto\" *ngFor=\"let attachment of this.awsService.sessionAssets[chatService.currentChatProps[propIndex].conversationId]; index as i;\">\n              <div *ngIf=\"attachment && attachment.length\">\n                <ion-thumbnail [ngClass]=\"{'small-thumbnail': this.awsService.sessionAssets[chatService.currentChatProps[propIndex].conversationId].length > 1}\" *ngIf=\"attachment && (['jpg', 'jpeg', 'gif', 'png']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\">\n                  <ion-img [src]=\"attachment\" (click)=\"focusPhoto(attachment)\"></ion-img>\n                </ion-thumbnail>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['doc', 'docx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail class=\"preview-thumbnail\" ><ion-img src=\"assets/img/docx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['xls', 'xlsx']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail class=\"preview-thumbnail\" ><ion-img src=\"assets/img/xlsx.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"attachment && (['pdf']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" target=\"_blank\"><ion-thumbnail class=\"preview-thumbnail\" ><ion-img src=\"assets/img/pdf.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <a [href]=\"attachment\" *ngIf=\"(['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'mp4', 'webm', 'ogg', 'mov']).indexOf(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) < 0\" target=\"_blank\"><ion-thumbnail class=\"preview-thumbnail\" ><ion-img src=\"assets/img/file.svg\"></ion-img></ion-thumbnail><ion-label color=\"dark\">{{attachment.substring(attachment.lastIndexOf('/') + 1)}}</ion-label></a>\n                <div class=\"video-frame\" plyr [plyrSources]=\"[{ 'src': attachment, 'type': 'video/' + (attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase() === 'mov' ? 'mp4' : attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase()) }]\" [plyrOptions]=\"resourceService.plyrOptions\" (plyrInit)=\"initPlyr($event, message._id)\" *ngIf=\"attachment && (['mp4', 'webm', 'ogg', 'mov']).includes(attachment.substring(attachment.lastIndexOf('.') + 1).toLowerCase())\" (click)=\"$event.stopPropagation()\"></div>\n                <ion-button class=\"remove-media ion-no-padding ion-no-margin\" (click)=\"removeMedia(i)\" fill=\"clear\" size=\"small\">\n                  <ion-icon name=\"close\" color=\"secondary\"></ion-icon>\n                </ion-button>\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n        <ion-grid class=\"selected-grid\" *ngIf=\"selectedMoments.length\">\n          <ion-row>\n            <ion-col class=\"ion-align-self-center\" *ngFor=\"let moment of selectedMoments; index as i\" size-xs=\"12\" size-sm=\"12\" size-md=\"6\" size-lg=\"6\" size-xl=\"4\">\n              <ion-card class=\"program-card\" (click)=\"openRestvoFeature(moment)\">\n                <ion-card-header class=\"ion-no-padding\">\n                  <div class=\"program-photo-container\">\n                    <ion-img class=\"program-photo\" [src]=\"(moment.assets && moment.assets.length && moment.assets[0]) | background: moment._id\"></ion-img>\n                  </div>\n                </ion-card-header>\n                <div class=\"program-type\"><ion-badge color=\"button1\">{{moment.resource['en-US'].value[0]}}</ion-badge></div>\n                <div class=\"program-name light\">{{moment.calendar.title}}</div>\n                <ion-button class=\"remove-moment ion-no-padding ion-no-margin\" (click)=\"removeMoment(i)\" fill=\"clear\" size=\"small\">\n                  <ion-icon name=\"close\" color=\"secondary\"></ion-icon>\n                </ion-button>\n              </ion-card>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-textarea>\n      <ion-buttons>\n        <ion-button class=\"actionButton\" (click)=\"sendMessage()\" fill=\"clear\" *ngIf=\"((composedMessage.length || (this.awsService.sessionAssets.hasOwnProperty(chatService.currentChatProps[propIndex].conversationId) && this.awsService.sessionAssets[chatService.currentChatProps[propIndex].conversationId].length) || selectedMoments.length) && !listening) || !platform.is('cordova')\" [disabled]=\"!(composedMessage.length || (this.awsService.sessionAssets.hasOwnProperty(chatService.currentChatProps[propIndex].conversationId) && this.awsService.sessionAssets[chatService.currentChatProps[propIndex].conversationId].length) || selectedMoments.length)\">\n          <!--<img class=\"sendImage\" src=\"assets/img/Send_Gray.png\"/>-->\n          <ion-icon name=\"send\" size=\"large\" color=\"grey\"></ion-icon>\n        </ion-button>\n        <ion-button class=\"actionButton\" (click)=\"toggleVoiceRecognition()\" fill=\"clear\" *ngIf=\"platform.is('cordova') && (!(composedMessage.length || (this.awsService.sessionAssets.hasOwnProperty(chatService.currentChatProps[propIndex].conversationId) && this.awsService.sessionAssets[chatService.currentChatProps[propIndex].conversationId].length) || selectedMoments.length) || listening)\" >\n          <img class=\"recordAudioImg\" [ngClass]=\"{'fade': listening}\" src=\"assets/img/microphone.png\"/>\n        </ion-button>\n      </ion-buttons>\n    </div>\n  </ion-toolbar>\n  <ion-toolbar id=\"expandable\" *ngIf=\"moreOptions\" class=\"ion-no-padding\">\n    <div class=\"moreoptions\">\n      <ion-slides class=\"program-slides\" [options]=\"{slidesPerView: 3.5, grabCursor: true}\">\n        <ion-slide class=\"program-slide\" *ngFor=\"let calendarItem of calendarService.calendarItems.slice().reverse() | slice : 0 : 20; index as i; trackBy: customTrackBy\" [hidden]=\"!((calendarItem.relationship ? (calendarItem.relationship === chatService.currentChatProps[this.propIndex].moment?._id) : true) && calendarItem.moment?.resource && calendarItem.moment.resource.field === 'User Defined Activity' && calendarItem.moment.resource['en-US'].value[0] !== 'Onboarding Process')\">\n          <ion-card class=\"program-card\" (click)=\"selectCalendarItem($event, calendarItem)\" *ngIf=\"calendarItem.moment\">\n            <ion-card-header class=\"ion-no-padding\">\n              <div class=\"program-photo-container\">\n                <ion-img class=\"program-photo\" [src]=\"(calendarItem.moment.assets && calendarItem.moment.assets.length && calendarItem.moment.assets[0]) | background: calendarItem.moment._id\"></ion-img>\n              </div>\n            </ion-card-header>\n            <div class=\"program-type\"><ion-badge color=\"button1\">{{calendarItem.moment.resource['en-US'].value[0]}}</ion-badge></div>\n            <div class=\"program-name light\">{{calendarItem.title}}</div>\n          </ion-card>\n        </ion-slide>\n        <ion-slide class=\"program-slide\">\n          <ion-card class=\"program-card\" (click)=\"openPickFeature()\">\n            <ion-card-header class=\"ion-no-padding\" color=\"lightgrey\">\n              <ion-row class=\"program-photo-container ion-justify-content-center ion-align-items-center\">\n                <ion-icon ios=\"ellipsis-horizontal\" md=\"ellipsis-horizontal\" color=\"darkgrey\"></ion-icon>\n              </ion-row>\n            </ion-card-header>\n            <div class=\"program-name dark\">More</div>\n          </ion-card>\n        </ion-slide>\n      </ion-slides>\n    </div>\n  </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "./src/app/pages/group/groupchat/groupchat.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/group/groupchat/groupchat.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@charset \"UTF-8\";\napp-groupchat ion-infinite-scroll {\n  height: 0;\n}\napp-groupchat .titles {\n  margin: 0 10%;\n}\napp-groupchat .title {\n  font-style: bold;\n}\napp-groupchat .title-dots-row {\n  position: absolute;\n  bottom: 10px;\n  left: 0;\n  width: 100%;\n}\napp-groupchat .title-dots-container {\n  margin: 0 auto;\n  width: 35px;\n}\napp-groupchat .title-dot {\n  display: inline-block;\n  height: 5px;\n  width: 5px;\n  border-radius: 100%;\n}\napp-groupchat .title-dot-left {\n  margin: 0;\n}\napp-groupchat .title-dot-middle {\n  margin: 0 10px;\n}\napp-groupchat .title-dot-right {\n  margin: 0;\n}\napp-groupchat .header-bottom-padding {\n  height: 15px;\n  width: 100%;\n}\napp-groupchat .chat-list {\n  min-height: 100%;\n}\napp-groupchat .message-timestamp {\n  width: 100%;\n  margin: 0 auto;\n  font-style: italic;\n  color: var(--ion-color-dark);\n}\napp-groupchat ion-avatar {\n  width: 45px !important;\n  height: 45px !important;\n}\napp-groupchat ion-avatar img {\n  width: 100%;\n  height: 100%;\n}\napp-groupchat .online {\n  border: 2px solid var(--ion-color-tertiary);\n}\napp-groupchat .fade {\n  -webkit-animation: fade 3s infinite;\n  animation: fade 3s infinite;\n  -moz-animation: fade 3s infinite;\n  -o-animation: fade 3s infinite;\n}\n@-webkit-keyframes fade {\n  0% {\n    opacity: 0.2;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\n@keyframes fade {\n  0% {\n    opacity: 0.2;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.2;\n  }\n}\napp-groupchat ion-thumbnail {\n  --border-radius: 10px;\n  margin: 0 auto;\n  --size: 100px;\n}\napp-groupchat .small-thumbnail {\n  --size: 50px;\n}\napp-groupchat .wide-thumbnail {\n  --size: 200px;\n}\napp-groupchat .sender-avatar {\n  margin-right: 4%;\n}\napp-groupchat .message-wrapper {\n  /*overflow: auto;\n  position: relative;*/\n}\napp-groupchat .message-wrapper:last-child {\n  margin-bottom: 10px;\n}\napp-groupchat .sender-container {\n  display: inline-block;\n  float: left;\n}\napp-groupchat .sender-message-container {\n  display: inline-block;\n}\napp-groupchat .author {\n  display: block;\n  font-size: 14px;\n  font-style: italic;\n  font-weight: bold;\n}\napp-groupchat .image-bubble {\n  overflow: hidden;\n  perspective: 1px;\n}\napp-groupchat .chat-bubble {\n  border-radius: 5px;\n  padding: 12px;\n  position: relative;\n  margin-bottom: 8px;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}\napp-groupchat .chat-bubble:before {\n  content: \" \";\n  display: block;\n  height: 16px;\n  width: 9px;\n  position: absolute;\n  bottom: -7.5px;\n}\napp-groupchat .chat-bubble.left {\n  margin-right: 20px;\n  padding-right: 25px;\n  background-color: var(--ion-color-light);\n}\napp-groupchat .chat-bubble.left p {\n  color: var(--ion-color-dark);\n}\napp-groupchat .chat-bubble.left a:link {\n  color: var(--ion-color-dark);\n}\napp-groupchat .chat-bubble.left a:visited {\n  color: var(--ion-color-dark);\n}\napp-groupchat .chat-bubble.left:before {\n  background-color: var(--ion-color-light);\n  left: 10px;\n  -webkit-transform: rotate(70deg) skew(5deg);\n}\napp-groupchat .chat-bubble.right {\n  margin-left: 2%;\n  background-color: var(--ion-color-primary);\n}\napp-groupchat .chat-bubble.right p {\n  color: var(--ion-color-light);\n}\napp-groupchat .chat-bubble.right a:link {\n  color: var(--ion-color-light);\n}\napp-groupchat .chat-bubble.right a:visited {\n  color: var(--ion-color-light);\n}\napp-groupchat .chat-bubble.right:before {\n  background-color: var(--ion-color-primary);\n  right: 10px;\n  -webkit-transform: rotate(118deg) skew(-5deg);\n}\napp-groupchat .message {\n  margin: 0;\n  font-size: 14px;\n  word-break: break-word;\n}\napp-groupchat .message.reply {\n  font-weight: bold;\n}\napp-groupchat .video-frame {\n  width: calc((100vw - 60px)*0.75);\n  max-width: 300px;\n}\napp-groupchat .youtube {\n  margin-top: 12px;\n}\napp-groupchat .quote-bubble {\n  margin-bottom: 6px;\n}\napp-groupchat .quote-bubble.left {\n  border-radius: 5px;\n  padding: 5px 6px 5px 6px;\n}\napp-groupchat .quote-bubble.left a:link {\n  color: lightskyblue;\n}\napp-groupchat .quote-bubble.left a:visited {\n  color: lightskyblue;\n}\napp-groupchat .quote-bubble.right {\n  border-radius: 5px;\n  padding: 5px 6px 5px 6px;\n  background-color: var(--ion-color-light);\n}\napp-groupchat .quote-bubble.right p {\n  color: var(--ion-color-dark);\n}\napp-groupchat .moment {\n  border-radius: 5px;\n  padding: 10px 12px;\n  position: relative;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n  background-color: var(--ion-color-lightgrey);\n}\napp-groupchat .moment h2, app-groupchat .moment p {\n  color: var(--ion-color-light);\n}\napp-groupchat .moment.left {\n  background-color: var(--ion-color-lightgrey);\n  margin-right: 20px;\n}\napp-groupchat .moment.left p {\n  color: var(--ion-color-dark);\n}\napp-groupchat .moment.right {\n  margin-right: 3px;\n}\napp-groupchat .moment-image {\n  margin: 0 auto;\n  width: 100%;\n  border-radius: 5%;\n}\napp-groupchat .superimposedIcon {\n  position: absolute;\n  bottom: 50%;\n  right: 40%;\n  height: 20%;\n}\napp-groupchat .moment-name {\n  font-weight: bold;\n  width: 100%;\n}\napp-groupchat .moment-date {\n  width: 100%;\n  font-weight: bold;\n}\napp-groupchat .moment-notes {\n  width: 100%;\n  font-weight: bold;\n}\napp-groupchat .goalFooter {\n  font-style: italic;\n  font-weight: lighter;\n  text-align: center;\n}\napp-groupchat .pollIconDiv {\n  height: 20%;\n  width: 100%;\n}\napp-groupchat .pollIconDiv .pollIcon {\n  height: 1.8em;\n  width: 10%;\n  margin-left: 45%;\n  margin-right: 45%;\n}\napp-groupchat .pollQuestion {\n  color: var(--ion-color-dark);\n  font-size: medium;\n  font-style: italic;\n}\napp-groupchat .pollContainer {\n  width: 100%;\n  display: inline-block;\n  clear: both;\n  border-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4) !important;\n  padding: 2px;\n}\napp-groupchat .optionsContainer {\n  float: left;\n  width: 58%;\n}\napp-groupchat .optionsContainer .option {\n  padding-top: 5px;\n  float: left;\n  font-size: medium;\n  color: #4a90e2;\n  font-weight: bold;\n}\napp-groupchat .votesContainer {\n  float: left;\n  width: 20%;\n}\napp-groupchat .votesContainer .votecount {\n  padding-top: 14px;\n  color: var(--ion-color-dark);\n  font-size: x-small;\n}\napp-groupchat .userContainer {\n  float: right;\n  width: 22%;\n  padding: 0 auto;\n}\napp-groupchat .userContainer .uservote {\n  margin: 15px 5% 0 5%;\n  font-size: x-small;\n  width: 90%;\n  height: 30px;\n  color: var(--ion-color-dark);\n}\napp-groupchat .userContainer .uservoted {\n  padding-top: 20px;\n  width: 30%;\n  margin: 0 40%;\n}\napp-groupchat .cf {\n  clear: both !important;\n  margin-bottom: 30px;\n}\napp-groupchat .replyOptions {\n  width: 60%;\n  height: 20%;\n  top: 20px;\n  background-color: #00B7FF;\n}\napp-groupchat .replyOption {\n  background-color: #8A6343;\n  width: 20%;\n  height: 100%;\n  display: inline-block;\n}\napp-groupchat .reply-icon-short {\n  position: absolute;\n  float: right;\n  right: 5px;\n  bottom: 5px;\n  color: var(--ion-color-darkgrey);\n}\napp-groupchat .reply-icon {\n  position: relative;\n  right: 0;\n  bottom: 0;\n  color: var(--ion-color-darkgrey);\n}\napp-groupchat .reply-icon.photo {\n  right: -5px;\n}\napp-groupchat .replyQuote-wrapper {\n  overflow: auto;\n  position: relative;\n  --min-height: 36px;\n}\napp-groupchat .replyQuote-bubble {\n  border-radius: 5px;\n  padding: 2px 10px;\n  max-width: 100%;\n  background-color: var(--ion-color-lightgrey);\n}\napp-groupchat .closeReply {\n  margin-right: 0.1px;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n}\napp-groupchat .message-tag {\n  margin-left: 4%;\n}\napp-groupchat .message-tag-centered {\n  width: 100%;\n  height: 65px;\n  margin: auto 0 auto 0;\n}\napp-groupchat .message-tag-centered .self-avatar {\n  margin: 0 auto;\n  top: 0;\n}\napp-groupchat .message-tag-centered .status-div {\n  width: 100%;\n  margin: 5px auto 0 auto;\n}\napp-groupchat .message-tag-centered .status {\n  margin: 0 auto;\n  color: grey;\n  font-size: 12px;\n}\napp-groupchat .message-tag-centered .status #failed {\n  color: #d0021b;\n}\napp-groupchat .reply-icon {\n  position: absolute;\n  bottom: 10px;\n  right: 8px;\n  font-size: 15px;\n}\napp-groupchat .message-footer {\n  background: #ffffff;\n}\napp-groupchat .message-form {\n  display: flex;\n  border-color: var(--ion-color-lightgrey);\n  border-style: solid;\n  border-width: 0.5px;\n  padding: 0 8px;\n  /*.textarea-wrapper {\n    background-color:var(--ion-color-grey);\n    border-radius: 10px;\n  }*/\n}\napp-groupchat .message-form ion-button {\n  margin-top: auto;\n  margin-bottom: auto;\n  margin-left: 0;\n  margin-right: 0;\n  padding-left: 0;\n  padding-right: 0;\n}\napp-groupchat .message-form ion-icon {\n  margin: 0;\n  padding-left: 0px;\n  padding-right: 0;\n}\napp-groupchat .message-form ion-textarea {\n  margin: 8px;\n  width: auto;\n  --color: #222428;\n  --background: white;\n  border-style: solid;\n  border-radius: 8px;\n  border-color: var(--ion-color-lightgrey);\n  border-width: 1px;\n  --padding-start: 4px;\n}\napp-groupchat .message-form .sendImage {\n  margin: 16px 0 16px 3%;\n  height: 30px;\n  width: 30px;\n  float: right;\n}\napp-groupchat .message-form .recordAudioImg {\n  background-color: transparent;\n  margin: 16px 0 16px 2%;\n  height: 30px;\n  width: 30px;\n  float: right;\n}\napp-groupchat #expandable {\n  -webkit-animation-name: move;\n          animation-name: move;\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate;\n}\n@-webkit-keyframes move {\n  from {\n    transform: translateY(170px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\n@keyframes move {\n  from {\n    transform: translateY(170px);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\napp-groupchat #expandable-right {\n  -webkit-animation-name: move-right;\n          animation-name: move-right;\n  -webkit-animation-duration: 0.5s;\n          animation-duration: 0.5s;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate;\n}\n@-webkit-keyframes move-right {\n  from {\n    transform: translateX(-144px);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n@keyframes move-right {\n  from {\n    transform: translateX(-144px);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\napp-groupchat #features {\n  --bullet-background: #9b9b9b;\n  --bullet-background-active: #4a4a4a;\n}\napp-groupchat .moreoptions {\n  width: 100%;\n  max-height: 180px;\n  background-color: var(--ion-color-lightgrey);\n  overflow: scroll;\n}\napp-groupchat .moreoptions .moreGrid {\n  width: 100%;\n}\napp-groupchat .moreoptions .topRow {\n  margin-top: 2px;\n  width: 100%;\n}\napp-groupchat .moreoptions .optionscol {\n  height: 100%;\n  width: 100%;\n}\napp-groupchat .moreoptions .optionscol .colelement {\n  height: 60px;\n  width: 60px;\n  display: table;\n  margin: 2% auto;\n  border-radius: 50%;\n  text-align: center;\n  padding-top: 8px;\n}\napp-groupchat .moreoptions .optionscol .colelement .button-font {\n  font-family: Roboto;\n  font-weight: 500;\n  font-size: 11px;\n  line-height: 11px;\n  /* identical to box height */\n  color: #FFFFFF;\n  position: absolute;\n  bottom: 14px;\n  left: 50%;\n  width: 100%;\n  left: 0px;\n}\napp-groupchat .moreoptions .optionscol .colelement.green {\n  background-color: #1DAC3C;\n}\napp-groupchat .moreoptions .optionscol .colelement.purple {\n  background-color: #674FFF;\n}\napp-groupchat .moreoptions .optionscol .colelement.blue {\n  background-color: #3FADFD;\n}\napp-groupchat .moreoptions .optionscol .colelement.red {\n  background-color: #FF6060;\n}\napp-groupchat .moreoptions .optionscol .moreLabel {\n  display: table;\n  margin: 0 auto;\n  color: #969696;\n  font-size: medium;\n}\napp-groupchat .program-card {\n  height: 100%;\n  width: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n  margin: 0 3%;\n}\napp-groupchat .chat-program-photo-container {\n  height: 120px;\n  min-width: 100px;\n  overflow: hidden;\n}\napp-groupchat .program-photo-container {\n  height: 80px;\n  overflow: hidden;\n}\napp-groupchat .program-photo {\n  -o-object-fit: cover;\n     object-fit: cover;\n  cursor: pointer;\n  height: 100%;\n  width: 100%;\n  margin: auto;\n  display: block;\n}\napp-groupchat .program-type {\n  position: absolute;\n  top: 2%;\n  left: 2%;\n  font-size: 12px;\n  cursor: pointer;\n}\napp-groupchat .program-name {\n  position: absolute;\n  max-height: 28px;\n  overflow: hidden;\n  bottom: 2%;\n  left: 2%;\n  font-size: 12px;\n  cursor: pointer;\n  z-index: 15;\n}\napp-groupchat .remove-media {\n  position: absolute;\n  top: 3px;\n  right: calc(100%/2 - 22px);\n  z-index: 15;\n}\napp-groupchat .remove-moment {\n  position: absolute;\n  top: 0;\n  right: 2px;\n}\napp-groupchat .dark {\n  color: var(--ion-color-darkgrey);\n}\napp-groupchat .light {\n  color: white;\n}\napp-groupchat .upload {\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 0;\n  margin-bottom: 0;\n  width: 45%;\n}\napp-groupchat .goal {\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 0;\n  margin-bottom: 0;\n  width: 40%;\n}\napp-groupchat .pageRow {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 14px;\n}\napp-groupchat .circle-left {\n  height: 5px;\n  width: 5px;\n  background-color: #9b9b9b;\n  border-radius: 100%;\n  margin-left: 48%;\n  margin-right: 1.3%;\n}\napp-groupchat .circle-right {\n  height: 5px;\n  width: 5px;\n  background-color: #9b9b9b;\n  border-radius: 100%;\n  margin-left: 0;\n  margin-right: 47%;\n}\napp-groupchat .active {\n  background-color: #4a4a4a;\n}\napp-groupchat .default-background {\n  display: table;\n  min-height: 150px;\n  background-size: cover;\n  width: 100%;\n}\napp-groupchat .default-title {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n  font-size: 2em;\n  color: #fff;\n  -webkit-text-stroke: thin;\n  /*    text-shadow:\n              -1px -1px 0 #000,\n              1px -1px 0 #000,\n              -1px 1px 0 #000,\n              1px 1px 0 #000;*/\n}\napp-groupchat .section-title {\n  color: var(--ion-color-secondary);\n  --background: var(--ion-color-grey);\n  text-align: left;\n  font-size: large;\n}\napp-groupchat .avatar {\n  width: 40px !important;\n  height: 40px !important;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\napp-groupchat .multiple-photos {\n  float: right;\n}\napp-groupchat .program-slides {\n  padding: 12px;\n}\napp-groupchat .program-slide {\n  max-width: 150px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZ3JvdXAvZ3JvdXBjaGF0L2dyb3VwY2hhdC5wYWdlLnNjc3MiLCIvVXNlcnMvY2FsaXhodWFuZy9XZWJfRGV2ZWxvcG1lbnQvcmVzdHZvL3Jlc3R2by1hcHAvc3JjL2FwcC9wYWdlcy9ncm91cC9ncm91cGNoYXQvZ3JvdXBjaGF0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUNFZDtFQUNFLFNBQUE7QURBSjtBQ0dFO0VBQ0UsYUFBQTtBRERKO0FDSUU7RUFDRSxnQkFBQTtBREZKO0FDS0U7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtBREhKO0FDTUU7RUFDRSxjQUFBO0VBQ0EsV0FBQTtBREpKO0FDT0U7RUFDRSxxQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsbUJBQUE7QURMSjtBQ1FFO0VBQ0UsU0FBQTtBRE5KO0FDU0U7RUFDRSxjQUFBO0FEUEo7QUNVRTtFQUNFLFNBQUE7QURSSjtBQ1dFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QURUSjtBQ2FFO0VBRUUsZ0JBQUE7QURaSjtBQ2dCRTtFQUNFLFdBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtBRGRKO0FDbUJFO0VBQ0Usc0JBQUE7RUFDQSx1QkFBQTtBRGpCSjtBQ21CSTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FEakJOO0FDcUJFO0VBQ0UsMkNBQUE7QURuQko7QUNzQkU7RUFDRSxtQ0FBQTtFQUNBLDJCQUFBO0VBQ0EsZ0NBQUE7RUFDQSw4QkFBQTtBRHBCSjtBQ3VCRTtFQUNFO0lBQUksWUFBQTtFRHBCTjtFQ3FCRTtJQUFLLFVBQUE7RURsQlA7RUNtQkU7SUFBTSxZQUFBO0VEaEJSO0FBQ0Y7QUN3QkU7RUFDRTtJQUFJLFlBQUE7RURWTjtFQ1dFO0lBQUssVUFBQTtFRFJQO0VDU0U7SUFBSyxZQUFBO0VETlA7QUFDRjtBQ2FFO0VBQ0UscUJBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtBREFKO0FDR0U7RUFDRSxZQUFBO0FEREo7QUNJRTtFQUNFLGFBQUE7QURGSjtBQ0tFO0VBQ0UsZ0JBQUE7QURISjtBQ01FO0VBQ0U7c0JBQUE7QURISjtBQ0tJO0VBQ0UsbUJBQUE7QURITjtBQ09FO0VBQ0UscUJBQUE7RUFDQSxXQUFBO0FETEo7QUNRRTtFQUNFLHFCQUFBO0FETko7QUNTRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBRFBKO0FDVUU7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0FEUko7QUNXRTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBRFRKO0FDWUU7RUFDRSxZQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FEVko7QUNhRTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSx3Q0FBQTtBRFhKO0FDWUk7RUFDRSw0QkFBQTtBRFZOO0FDWUk7RUFDRSw0QkFBQTtBRFZOO0FDWUk7RUFDRSw0QkFBQTtBRFZOO0FDY0U7RUFDRSx3Q0FBQTtFQUNBLFVBQUE7RUFDQSwyQ0FBQTtBRFpKO0FDZUU7RUFDRSxlQUFBO0VBQ0EsMENBQUE7QURiSjtBQ2NJO0VBQ0UsNkJBQUE7QURaTjtBQ2NJO0VBQ0UsNkJBQUE7QURaTjtBQ2NJO0VBQ0UsNkJBQUE7QURaTjtBQ2dCRTtFQUNFLDBDQUFBO0VBQ0EsV0FBQTtFQUNBLDZDQUFBO0FEZEo7QUNpQkU7RUFDRSxTQUFBO0VBQ0EsZUFBQTtFQUNBLHNCQUFBO0FEZko7QUNrQkU7RUFDRSxpQkFBQTtBRGhCSjtBQ21CRTtFQUNFLGdDQUFBO0VBQ0EsZ0JBQUE7QURqQko7QUNvQkU7RUFDRSxnQkFBQTtBRGxCSjtBQ3FCRTtFQUNFLGtCQUFBO0FEbkJKO0FDc0JFO0VBQ0Usa0JBQUE7RUFDQSx3QkFBQTtBRHBCSjtBQ3FCSTtFQUNFLG1CQUFBO0FEbkJOO0FDcUJJO0VBQ0UsbUJBQUE7QURuQk47QUN1QkU7RUFDRSxrQkFBQTtFQUNBLHdCQUFBO0VBQ0Esd0NBQUE7QURyQko7QUNzQkk7RUFDRSw0QkFBQTtBRHBCTjtBQ3dCRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsNENBQUE7QUR0Qko7QUN1Qkk7RUFDRSw2QkFBQTtBRHJCTjtBQ3lCRTtFQUNFLDRDQUFBO0VBQ0Esa0JBQUE7QUR2Qko7QUN3Qkk7RUFDRSw0QkFBQTtBRHRCTjtBQzBCRTtFQUNFLGlCQUFBO0FEeEJKO0FDNEJFO0VBQ0UsY0FBQTtFQUVBLFdBQUE7RUFDQSxpQkFBQTtBRDNCSjtBQzhCRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FENUJKO0FDK0JFO0VBQ0UsaUJBQUE7RUFDQSxXQUFBO0FEN0JKO0FDZ0NFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FEOUJKO0FDaUNFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FEL0JKO0FDa0NFO0VBQ0Usa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0FEaENKO0FDcUNFO0VBQ0UsV0FBQTtFQUNBLFdBQUE7QURuQ0o7QUNxQ0k7RUFDRSxhQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QURuQ047QUN1Q0U7RUFDRSw0QkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QURyQ0o7QUN3Q0U7RUFDRSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxxREFBQTtFQUNBLFlBQUE7QUR0Q0o7QUN5Q0U7RUFDRSxXQUFBO0VBQ0EsVUFBQTtBRHZDSjtBQ3dDSTtFQUNFLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0FEdENOO0FDMENFO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUR4Q0o7QUN5Q0k7RUFDRSxpQkFBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7QUR2Q047QUMyQ0U7RUFDRSxZQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7QUR6Q0o7QUMwQ0k7RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSw0QkFBQTtBRHhDTjtBQzBDSTtFQUNFLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7QUR4Q047QUM0Q0U7RUFDRSxzQkFBQTtFQUNBLG1CQUFBO0FEMUNKO0FDK0NFO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EseUJBQUE7QUQ3Q0o7QUNpREU7RUFDRSx5QkFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7QUQvQ0o7QUNrREU7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGdDQUFBO0FEaERKO0FDdURFO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0FEckRKO0FDd0RFO0VBQ0UsV0FBQTtBRHRESjtBQ3lERTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0FEdkRKO0FDMERFO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSw0Q0FBQTtBRHhESjtBQzJERTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7QUR6REo7QUM0REU7RUFDRSxlQUFBO0FEMURKO0FDNkRFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtBRDNESjtBQzhESTtFQUNFLGNBQUE7RUFDQSxNQUFBO0FENUROO0FDK0RJO0VBQ0UsV0FBQTtFQUNBLHVCQUFBO0FEN0ROO0FDZ0VJO0VBQ0UsY0FBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FEOUROO0FDaUVJO0VBQ0UsY0FBQTtBRC9ETjtBQ21FRTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0FEakVKO0FDc0VFO0VBQ0UsbUJBQUE7QURwRUo7QUN1RUU7RUFFRSxhQUFBO0VBQ0Esd0NBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQTZCQTs7O0lBQUE7QUQvRko7QUNvRUk7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QURsRU47QUNxRUk7RUFDRSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBRG5FTjtBQ3NFSTtFQUNFLFdBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSx3Q0FBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QURwRU47QUMyRUk7RUFDRSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBRHpFTjtBQzRFSTtFQUNFLDZCQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUQxRU47QUM4RUU7RUFDRSw0QkFBQTtVQUFBLG9CQUFBO0VBQ0EsZ0NBQUE7VUFBQSx3QkFBQTtFQUNBLDhDQUFBO1VBQUEsc0NBQUE7RUFDQSxzQ0FBQTtVQUFBLDhCQUFBO0FENUVKO0FDK0VFO0VBQ0U7SUFDRSw0QkFBQTtFRDdFSjtFQytFRTtJQUNFLHdCQUFBO0VEN0VKO0FBQ0Y7QUN1RUU7RUFDRTtJQUNFLDRCQUFBO0VEN0VKO0VDK0VFO0lBQ0Usd0JBQUE7RUQ3RUo7QUFDRjtBQ2dGRTtFQUNFLGtDQUFBO1VBQUEsMEJBQUE7RUFDQSxnQ0FBQTtVQUFBLHdCQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtFQUNBLHNDQUFBO1VBQUEsOEJBQUE7QUQ5RUo7QUNpRkU7RUFDRTtJQUNFLDZCQUFBO0VEL0VKO0VDaUZFO0lBQ0Usd0JBQUE7RUQvRUo7QUFDRjtBQ3lFRTtFQUNFO0lBQ0UsNkJBQUE7RUQvRUo7RUNpRkU7SUFDRSx3QkFBQTtFRC9FSjtBQUNGO0FDa0ZFO0VBQ0UsNEJBQUE7RUFDQSxtQ0FBQTtBRGhGSjtBQ21GRTtFQUNFLFdBQUE7RUFDQSxpQkFBQTtFQUNBLDRDQUFBO0VBQ0EsZ0JBQUE7QURqRko7QUNtRkk7RUFDRSxXQUFBO0FEakZOO0FDb0ZJO0VBQ0UsZUFBQTtFQUNBLFdBQUE7QURsRk47QUNxRkk7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBRG5GTjtBQ3FGTTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBR0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QURyRlI7QUN1RlE7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0FEckZWO0FDeUZNO0VBQ0UseUJBQUE7QUR2RlI7QUMwRk07RUFDRSx5QkFBQTtBRHhGUjtBQzJGTTtFQUNFLHlCQUFBO0FEekZSO0FDNEZNO0VBQ0UseUJBQUE7QUQxRlI7QUM2Rk07RUFDRSxjQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBRDNGUjtBQ2dHRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7S0FBQSxtQkFBQTtFQUNBLFlBQUE7QUQ5Rko7QUNpR0U7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBRC9GSjtBQ2tHRTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBRGhHSjtBQ21HRTtFQUNFLG9CQUFBO0tBQUEsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBRGpHSjtBQ29HRTtFQUNFLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBRGxHSjtBQ3FHRTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0FEbkdKO0FDc0dFO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsMEJBQUE7RUFDQSxXQUFBO0FEcEdKO0FDdUdFO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtBRHJHSjtBQ3dHRTtFQUNFLGdDQUFBO0FEdEdKO0FDeUdFO0VBQ0UsWUFBQTtBRHZHSjtBQzBHRTtFQUNHLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0FEeEdMO0FDMkdFO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7QUR6R0o7QUM0R0U7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBRDFHSjtBQzZHRTtFQUNFLFdBQUE7RUFDQSxVQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUQzR0o7QUM4R0U7RUFDRSxXQUFBO0VBQ0EsVUFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUQ1R0o7QUMrR0U7RUFDRSx5QkFBQTtBRDdHSjtBQ21IRTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtBRGpISjtBQ29IRTtFQUNFLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7RUFDSjs7Ozs4QkFBQTtBRDlHQTtBQ3FIRTtFQUNFLGlDQUFBO0VBQ0EsbUNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FEbkhKO0FDc0hFO0VBQ0Usc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QURwSEo7QUN1SEU7RUFDRSxZQUFBO0FEckhKO0FDd0hFO0VBQ0UsYUFBQTtBRHRISjtBQ3lIRTtFQUNFLGdCQUFBO0FEdkhKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvZ3JvdXAvZ3JvdXBjaGF0L2dyb3VwY2hhdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG5hcHAtZ3JvdXBjaGF0IGlvbi1pbmZpbml0ZS1zY3JvbGwge1xuICBoZWlnaHQ6IDA7XG59XG5hcHAtZ3JvdXBjaGF0IC50aXRsZXMge1xuICBtYXJnaW46IDAgMTAlO1xufVxuYXBwLWdyb3VwY2hhdCAudGl0bGUge1xuICBmb250LXN0eWxlOiBib2xkO1xufVxuYXBwLWdyb3VwY2hhdCAudGl0bGUtZG90cy1yb3cge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMTBweDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBjaGF0IC50aXRsZS1kb3RzLWNvbnRhaW5lciB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICB3aWR0aDogMzVweDtcbn1cbmFwcC1ncm91cGNoYXQgLnRpdGxlLWRvdCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiA1cHg7XG4gIHdpZHRoOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XG59XG5hcHAtZ3JvdXBjaGF0IC50aXRsZS1kb3QtbGVmdCB7XG4gIG1hcmdpbjogMDtcbn1cbmFwcC1ncm91cGNoYXQgLnRpdGxlLWRvdC1taWRkbGUge1xuICBtYXJnaW46IDAgMTBweDtcbn1cbmFwcC1ncm91cGNoYXQgLnRpdGxlLWRvdC1yaWdodCB7XG4gIG1hcmdpbjogMDtcbn1cbmFwcC1ncm91cGNoYXQgLmhlYWRlci1ib3R0b20tcGFkZGluZyB7XG4gIGhlaWdodDogMTVweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBjaGF0IC5jaGF0LWxpc3Qge1xuICBtaW4taGVpZ2h0OiAxMDAlO1xufVxuYXBwLWdyb3VwY2hhdCAubWVzc2FnZS10aW1lc3RhbXAge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbn1cbmFwcC1ncm91cGNoYXQgaW9uLWF2YXRhciB7XG4gIHdpZHRoOiA0NXB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNDVweCAhaW1wb3J0YW50O1xufVxuYXBwLWdyb3VwY2hhdCBpb24tYXZhdGFyIGltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5hcHAtZ3JvdXBjaGF0IC5vbmxpbmUge1xuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xufVxuYXBwLWdyb3VwY2hhdCAuZmFkZSB7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlIDNzIGluZmluaXRlO1xuICBhbmltYXRpb246IGZhZGUgM3MgaW5maW5pdGU7XG4gIC1tb3otYW5pbWF0aW9uOiBmYWRlIDNzIGluZmluaXRlO1xuICAtby1hbmltYXRpb246IGZhZGUgM3MgaW5maW5pdGU7XG59XG5ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwLjI7XG4gIH1cbiAgNTAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDAuMjtcbiAgfVxufVxuQC1tb3ota2V5ZnJhbWVzIGZhZGUge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMC4yO1xuICB9XG4gIDUwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG59XG5Aa2V5ZnJhbWVzIGZhZGUge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMC4yO1xuICB9XG4gIDUwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwLjI7XG4gIH1cbn1cbkAtby1rZXlmcmFtZXMgZmFkZSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwLjI7XG4gIH1cbiAgNTAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDAuMjtcbiAgfVxufVxuYXBwLWdyb3VwY2hhdCBpb24tdGh1bWJuYWlsIHtcbiAgLS1ib3JkZXItcmFkaXVzOiAxMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgLS1zaXplOiAxMDBweDtcbn1cbmFwcC1ncm91cGNoYXQgLnNtYWxsLXRodW1ibmFpbCB7XG4gIC0tc2l6ZTogNTBweDtcbn1cbmFwcC1ncm91cGNoYXQgLndpZGUtdGh1bWJuYWlsIHtcbiAgLS1zaXplOiAyMDBweDtcbn1cbmFwcC1ncm91cGNoYXQgLnNlbmRlci1hdmF0YXIge1xuICBtYXJnaW4tcmlnaHQ6IDQlO1xufVxuYXBwLWdyb3VwY2hhdCAubWVzc2FnZS13cmFwcGVyIHtcbiAgLypvdmVyZmxvdzogYXV0bztcbiAgcG9zaXRpb246IHJlbGF0aXZlOyovXG59XG5hcHAtZ3JvdXBjaGF0IC5tZXNzYWdlLXdyYXBwZXI6bGFzdC1jaGlsZCB7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5hcHAtZ3JvdXBjaGF0IC5zZW5kZXItY29udGFpbmVyIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmbG9hdDogbGVmdDtcbn1cbmFwcC1ncm91cGNoYXQgLnNlbmRlci1tZXNzYWdlLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbmFwcC1ncm91cGNoYXQgLmF1dGhvciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5hcHAtZ3JvdXBjaGF0IC5pbWFnZS1idWJibGUge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwZXJzcGVjdGl2ZTogMXB4O1xufVxuYXBwLWdyb3VwY2hhdCAuY2hhdC1idWJibGUge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAtbW96LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAtbXMtdXNlci1zZWxlY3Q6IHRleHQ7XG4gIHVzZXItc2VsZWN0OiB0ZXh0O1xufVxuYXBwLWdyb3VwY2hhdCAuY2hhdC1idWJibGU6YmVmb3JlIHtcbiAgY29udGVudDogXCLCoFwiO1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAxNnB4O1xuICB3aWR0aDogOXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogLTcuNXB4O1xufVxuYXBwLWdyb3VwY2hhdCAuY2hhdC1idWJibGUubGVmdCB7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbiAgcGFkZGluZy1yaWdodDogMjVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbn1cbmFwcC1ncm91cGNoYXQgLmNoYXQtYnViYmxlLmxlZnQgcCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG59XG5hcHAtZ3JvdXBjaGF0IC5jaGF0LWJ1YmJsZS5sZWZ0IGE6bGluayB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG59XG5hcHAtZ3JvdXBjaGF0IC5jaGF0LWJ1YmJsZS5sZWZ0IGE6dmlzaXRlZCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG59XG5hcHAtZ3JvdXBjaGF0IC5jaGF0LWJ1YmJsZS5sZWZ0OmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gIGxlZnQ6IDEwcHg7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNzBkZWcpIHNrZXcoNWRlZyk7XG59XG5hcHAtZ3JvdXBjaGF0IC5jaGF0LWJ1YmJsZS5yaWdodCB7XG4gIG1hcmdpbi1sZWZ0OiAyJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuYXBwLWdyb3VwY2hhdCAuY2hhdC1idWJibGUucmlnaHQgcCB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xufVxuYXBwLWdyb3VwY2hhdCAuY2hhdC1idWJibGUucmlnaHQgYTpsaW5rIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG59XG5hcHAtZ3JvdXBjaGF0IC5jaGF0LWJ1YmJsZS5yaWdodCBhOnZpc2l0ZWQge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbn1cbmFwcC1ncm91cGNoYXQgLmNoYXQtYnViYmxlLnJpZ2h0OmJlZm9yZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgcmlnaHQ6IDEwcHg7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTE4ZGVnKSBza2V3KC01ZGVnKTtcbn1cbmFwcC1ncm91cGNoYXQgLm1lc3NhZ2Uge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbn1cbmFwcC1ncm91cGNoYXQgLm1lc3NhZ2UucmVwbHkge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbmFwcC1ncm91cGNoYXQgLnZpZGVvLWZyYW1lIHtcbiAgd2lkdGg6IGNhbGMoKDEwMHZ3IC0gNjBweCkqMC43NSk7XG4gIG1heC13aWR0aDogMzAwcHg7XG59XG5hcHAtZ3JvdXBjaGF0IC55b3V0dWJlIHtcbiAgbWFyZ2luLXRvcDogMTJweDtcbn1cbmFwcC1ncm91cGNoYXQgLnF1b3RlLWJ1YmJsZSB7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbn1cbmFwcC1ncm91cGNoYXQgLnF1b3RlLWJ1YmJsZS5sZWZ0IHtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiA1cHggNnB4IDVweCA2cHg7XG59XG5hcHAtZ3JvdXBjaGF0IC5xdW90ZS1idWJibGUubGVmdCBhOmxpbmsge1xuICBjb2xvcjogbGlnaHRza3libHVlO1xufVxuYXBwLWdyb3VwY2hhdCAucXVvdGUtYnViYmxlLmxlZnQgYTp2aXNpdGVkIHtcbiAgY29sb3I6IGxpZ2h0c2t5Ymx1ZTtcbn1cbmFwcC1ncm91cGNoYXQgLnF1b3RlLWJ1YmJsZS5yaWdodCB7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgcGFkZGluZzogNXB4IDZweCA1cHggNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xufVxuYXBwLWdyb3VwY2hhdCAucXVvdGUtYnViYmxlLnJpZ2h0IHAge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xufVxuYXBwLWdyb3VwY2hhdCAubW9tZW50IHtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogdGV4dDtcbiAgLW1vei11c2VyLXNlbGVjdDogdGV4dDtcbiAgLW1zLXVzZXItc2VsZWN0OiB0ZXh0O1xuICB1c2VyLXNlbGVjdDogdGV4dDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG59XG5hcHAtZ3JvdXBjaGF0IC5tb21lbnQgaDIsIGFwcC1ncm91cGNoYXQgLm1vbWVudCBwIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG59XG5hcHAtZ3JvdXBjaGF0IC5tb21lbnQubGVmdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodGdyZXkpO1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG59XG5hcHAtZ3JvdXBjaGF0IC5tb21lbnQubGVmdCBwIHtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbn1cbmFwcC1ncm91cGNoYXQgLm1vbWVudC5yaWdodCB7XG4gIG1hcmdpbi1yaWdodDogM3B4O1xufVxuYXBwLWdyb3VwY2hhdCAubW9tZW50LWltYWdlIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiA1JTtcbn1cbmFwcC1ncm91cGNoYXQgLnN1cGVyaW1wb3NlZEljb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogNTAlO1xuICByaWdodDogNDAlO1xuICBoZWlnaHQ6IDIwJTtcbn1cbmFwcC1ncm91cGNoYXQgLm1vbWVudC1uYW1lIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWdyb3VwY2hhdCAubW9tZW50LWRhdGUge1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5hcHAtZ3JvdXBjaGF0IC5tb21lbnQtbm90ZXMge1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5hcHAtZ3JvdXBjaGF0IC5nb2FsRm9vdGVyIHtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuYXBwLWdyb3VwY2hhdCAucG9sbEljb25EaXYge1xuICBoZWlnaHQ6IDIwJTtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBjaGF0IC5wb2xsSWNvbkRpdiAucG9sbEljb24ge1xuICBoZWlnaHQ6IDEuOGVtO1xuICB3aWR0aDogMTAlO1xuICBtYXJnaW4tbGVmdDogNDUlO1xuICBtYXJnaW4tcmlnaHQ6IDQ1JTtcbn1cbmFwcC1ncm91cGNoYXQgLnBvbGxRdWVzdGlvbiB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5hcHAtZ3JvdXBjaGF0IC5wb2xsQ29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY2xlYXI6IGJvdGg7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmc6IDJweDtcbn1cbmFwcC1ncm91cGNoYXQgLm9wdGlvbnNDb250YWluZXIge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDU4JTtcbn1cbmFwcC1ncm91cGNoYXQgLm9wdGlvbnNDb250YWluZXIgLm9wdGlvbiB7XG4gIHBhZGRpbmctdG9wOiA1cHg7XG4gIGZsb2F0OiBsZWZ0O1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgY29sb3I6ICM0YTkwZTI7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuYXBwLWdyb3VwY2hhdCAudm90ZXNDb250YWluZXIge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDIwJTtcbn1cbmFwcC1ncm91cGNoYXQgLnZvdGVzQ29udGFpbmVyIC52b3RlY291bnQge1xuICBwYWRkaW5nLXRvcDogMTRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgZm9udC1zaXplOiB4LXNtYWxsO1xufVxuYXBwLWdyb3VwY2hhdCAudXNlckNvbnRhaW5lciB7XG4gIGZsb2F0OiByaWdodDtcbiAgd2lkdGg6IDIyJTtcbiAgcGFkZGluZzogMCBhdXRvO1xufVxuYXBwLWdyb3VwY2hhdCAudXNlckNvbnRhaW5lciAudXNlcnZvdGUge1xuICBtYXJnaW46IDE1cHggNSUgMCA1JTtcbiAgZm9udC1zaXplOiB4LXNtYWxsO1xuICB3aWR0aDogOTAlO1xuICBoZWlnaHQ6IDMwcHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG59XG5hcHAtZ3JvdXBjaGF0IC51c2VyQ29udGFpbmVyIC51c2Vydm90ZWQge1xuICBwYWRkaW5nLXRvcDogMjBweDtcbiAgd2lkdGg6IDMwJTtcbiAgbWFyZ2luOiAwIDQwJTtcbn1cbmFwcC1ncm91cGNoYXQgLmNmIHtcbiAgY2xlYXI6IGJvdGggIWltcG9ydGFudDtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cbmFwcC1ncm91cGNoYXQgLnJlcGx5T3B0aW9ucyB7XG4gIHdpZHRoOiA2MCU7XG4gIGhlaWdodDogMjAlO1xuICB0b3A6IDIwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMEI3RkY7XG59XG5hcHAtZ3JvdXBjaGF0IC5yZXBseU9wdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4QTYzNDM7XG4gIHdpZHRoOiAyMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuYXBwLWdyb3VwY2hhdCAucmVwbHktaWNvbi1zaG9ydCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZmxvYXQ6IHJpZ2h0O1xuICByaWdodDogNXB4O1xuICBib3R0b206IDVweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrZ3JleSk7XG59XG5hcHAtZ3JvdXBjaGF0IC5yZXBseS1pY29uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmtncmV5KTtcbn1cbmFwcC1ncm91cGNoYXQgLnJlcGx5LWljb24ucGhvdG8ge1xuICByaWdodDogLTVweDtcbn1cbmFwcC1ncm91cGNoYXQgLnJlcGx5UXVvdGUtd3JhcHBlciB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC0tbWluLWhlaWdodDogMzZweDtcbn1cbmFwcC1ncm91cGNoYXQgLnJlcGx5UXVvdGUtYnViYmxlIHtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBwYWRkaW5nOiAycHggMTBweDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbn1cbmFwcC1ncm91cGNoYXQgLmNsb3NlUmVwbHkge1xuICBtYXJnaW4tcmlnaHQ6IDAuMXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG59XG5hcHAtZ3JvdXBjaGF0IC5tZXNzYWdlLXRhZyB7XG4gIG1hcmdpbi1sZWZ0OiA0JTtcbn1cbmFwcC1ncm91cGNoYXQgLm1lc3NhZ2UtdGFnLWNlbnRlcmVkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNjVweDtcbiAgbWFyZ2luOiBhdXRvIDAgYXV0byAwO1xufVxuYXBwLWdyb3VwY2hhdCAubWVzc2FnZS10YWctY2VudGVyZWQgLnNlbGYtYXZhdGFyIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHRvcDogMDtcbn1cbmFwcC1ncm91cGNoYXQgLm1lc3NhZ2UtdGFnLWNlbnRlcmVkIC5zdGF0dXMtZGl2IHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogNXB4IGF1dG8gMCBhdXRvO1xufVxuYXBwLWdyb3VwY2hhdCAubWVzc2FnZS10YWctY2VudGVyZWQgLnN0YXR1cyB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBjb2xvcjogZ3JleTtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuYXBwLWdyb3VwY2hhdCAubWVzc2FnZS10YWctY2VudGVyZWQgLnN0YXR1cyAjZmFpbGVkIHtcbiAgY29sb3I6ICNkMDAyMWI7XG59XG5hcHAtZ3JvdXBjaGF0IC5yZXBseS1pY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDEwcHg7XG4gIHJpZ2h0OiA4cHg7XG4gIGZvbnQtc2l6ZTogMTVweDtcbn1cbmFwcC1ncm91cGNoYXQgLm1lc3NhZ2UtZm9vdGVyIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbn1cbmFwcC1ncm91cGNoYXQgLm1lc3NhZ2UtZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci13aWR0aDogMC41cHg7XG4gIHBhZGRpbmc6IDAgOHB4O1xuICAvKi50ZXh0YXJlYS13cmFwcGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWlvbi1jb2xvci1ncmV5KTtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICB9Ki9cbn1cbmFwcC1ncm91cGNoYXQgLm1lc3NhZ2UtZm9ybSBpb24tYnV0dG9uIHtcbiAgbWFyZ2luLXRvcDogYXV0bztcbiAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgbWFyZ2luLWxlZnQ6IDA7XG4gIG1hcmdpbi1yaWdodDogMDtcbiAgcGFkZGluZy1sZWZ0OiAwO1xuICBwYWRkaW5nLXJpZ2h0OiAwO1xufVxuYXBwLWdyb3VwY2hhdCAubWVzc2FnZS1mb3JtIGlvbi1pY29uIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nLWxlZnQ6IDBweDtcbiAgcGFkZGluZy1yaWdodDogMDtcbn1cbmFwcC1ncm91cGNoYXQgLm1lc3NhZ2UtZm9ybSBpb24tdGV4dGFyZWEge1xuICBtYXJnaW46IDhweDtcbiAgd2lkdGg6IGF1dG87XG4gIC0tY29sb3I6ICMyMjI0Mjg7XG4gIC0tYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIC0tcGFkZGluZy1zdGFydDogNHB4O1xufVxuYXBwLWdyb3VwY2hhdCAubWVzc2FnZS1mb3JtIC5zZW5kSW1hZ2Uge1xuICBtYXJnaW46IDE2cHggMCAxNnB4IDMlO1xuICBoZWlnaHQ6IDMwcHg7XG4gIHdpZHRoOiAzMHB4O1xuICBmbG9hdDogcmlnaHQ7XG59XG5hcHAtZ3JvdXBjaGF0IC5tZXNzYWdlLWZvcm0gLnJlY29yZEF1ZGlvSW1nIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIG1hcmdpbjogMTZweCAwIDE2cHggMiU7XG4gIGhlaWdodDogMzBweDtcbiAgd2lkdGg6IDMwcHg7XG4gIGZsb2F0OiByaWdodDtcbn1cbmFwcC1ncm91cGNoYXQgI2V4cGFuZGFibGUge1xuICBhbmltYXRpb24tbmFtZTogbW92ZTtcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDtcbiAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xufVxuQGtleWZyYW1lcyBtb3ZlIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDE3MHB4KTtcbiAgfVxuICB0byB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG5hcHAtZ3JvdXBjaGF0ICNleHBhbmRhYmxlLXJpZ2h0IHtcbiAgYW5pbWF0aW9uLW5hbWU6IG1vdmUtcmlnaHQ7XG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC41cztcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7XG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcbn1cbkBrZXlmcmFtZXMgbW92ZS1yaWdodCB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTQ0cHgpO1xuICB9XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIH1cbn1cbmFwcC1ncm91cGNoYXQgI2ZlYXR1cmVzIHtcbiAgLS1idWxsZXQtYmFja2dyb3VuZDogIzliOWI5YjtcbiAgLS1idWxsZXQtYmFja2dyb3VuZC1hY3RpdmU6ICM0YTRhNGE7XG59XG5hcHAtZ3JvdXBjaGF0IC5tb3Jlb3B0aW9ucyB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAxODBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG4gIG92ZXJmbG93OiBzY3JvbGw7XG59XG5hcHAtZ3JvdXBjaGF0IC5tb3Jlb3B0aW9ucyAubW9yZUdyaWQge1xuICB3aWR0aDogMTAwJTtcbn1cbmFwcC1ncm91cGNoYXQgLm1vcmVvcHRpb25zIC50b3BSb3cge1xuICBtYXJnaW4tdG9wOiAycHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWdyb3VwY2hhdCAubW9yZW9wdGlvbnMgLm9wdGlvbnNjb2wge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xufVxuYXBwLWdyb3VwY2hhdCAubW9yZW9wdGlvbnMgLm9wdGlvbnNjb2wgLmNvbGVsZW1lbnQge1xuICBoZWlnaHQ6IDYwcHg7XG4gIHdpZHRoOiA2MHB4O1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgbWFyZ2luOiAyJSBhdXRvO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDhweDtcbn1cbmFwcC1ncm91cGNoYXQgLm1vcmVvcHRpb25zIC5vcHRpb25zY29sIC5jb2xlbGVtZW50IC5idXR0b24tZm9udCB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgbGluZS1oZWlnaHQ6IDExcHg7XG4gIC8qIGlkZW50aWNhbCB0byBib3ggaGVpZ2h0ICovXG4gIGNvbG9yOiAjRkZGRkZGO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMTRweDtcbiAgbGVmdDogNTAlO1xuICB3aWR0aDogMTAwJTtcbiAgbGVmdDogMHB4O1xufVxuYXBwLWdyb3VwY2hhdCAubW9yZW9wdGlvbnMgLm9wdGlvbnNjb2wgLmNvbGVsZW1lbnQuZ3JlZW4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMURBQzNDO1xufVxuYXBwLWdyb3VwY2hhdCAubW9yZW9wdGlvbnMgLm9wdGlvbnNjb2wgLmNvbGVsZW1lbnQucHVycGxlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY3NEZGRjtcbn1cbmFwcC1ncm91cGNoYXQgLm1vcmVvcHRpb25zIC5vcHRpb25zY29sIC5jb2xlbGVtZW50LmJsdWUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0ZBREZEO1xufVxuYXBwLWdyb3VwY2hhdCAubW9yZW9wdGlvbnMgLm9wdGlvbnNjb2wgLmNvbGVsZW1lbnQucmVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGNjA2MDtcbn1cbmFwcC1ncm91cGNoYXQgLm1vcmVvcHRpb25zIC5vcHRpb25zY29sIC5tb3JlTGFiZWwge1xuICBkaXNwbGF5OiB0YWJsZTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIGNvbG9yOiAjOTY5Njk2O1xuICBmb250LXNpemU6IG1lZGl1bTtcbn1cbmFwcC1ncm91cGNoYXQgLnByb2dyYW0tY2FyZCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIG1hcmdpbjogMCAzJTtcbn1cbmFwcC1ncm91cGNoYXQgLmNoYXQtcHJvZ3JhbS1waG90by1jb250YWluZXIge1xuICBoZWlnaHQ6IDEyMHB4O1xuICBtaW4td2lkdGg6IDEwMHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuYXBwLWdyb3VwY2hhdCAucHJvZ3JhbS1waG90by1jb250YWluZXIge1xuICBoZWlnaHQ6IDgwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5hcHAtZ3JvdXBjaGF0IC5wcm9ncmFtLXBob3RvIHtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiBhdXRvO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbmFwcC1ncm91cGNoYXQgLnByb2dyYW0tdHlwZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAyJTtcbiAgbGVmdDogMiU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuYXBwLWdyb3VwY2hhdCAucHJvZ3JhbS1uYW1lIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXgtaGVpZ2h0OiAyOHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3R0b206IDIlO1xuICBsZWZ0OiAyJTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHotaW5kZXg6IDE1O1xufVxuYXBwLWdyb3VwY2hhdCAucmVtb3ZlLW1lZGlhIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDNweDtcbiAgcmlnaHQ6IGNhbGMoMTAwJS8yIC0gMjJweCk7XG4gIHotaW5kZXg6IDE1O1xufVxuYXBwLWdyb3VwY2hhdCAucmVtb3ZlLW1vbWVudCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMnB4O1xufVxuYXBwLWdyb3VwY2hhdCAuZGFyayB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFya2dyZXkpO1xufVxuYXBwLWdyb3VwY2hhdCAubGlnaHQge1xuICBjb2xvcjogd2hpdGU7XG59XG5hcHAtZ3JvdXBjaGF0IC51cGxvYWQge1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tdG9wOiAwO1xuICBtYXJnaW4tYm90dG9tOiAwO1xuICB3aWR0aDogNDUlO1xufVxuYXBwLWdyb3VwY2hhdCAuZ29hbCB7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIG1hcmdpbi10b3A6IDA7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIHdpZHRoOiA0MCU7XG59XG5hcHAtZ3JvdXBjaGF0IC5wYWdlUm93IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDE0cHg7XG59XG5hcHAtZ3JvdXBjaGF0IC5jaXJjbGUtbGVmdCB7XG4gIGhlaWdodDogNXB4O1xuICB3aWR0aDogNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWI5YjliO1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICBtYXJnaW4tbGVmdDogNDglO1xuICBtYXJnaW4tcmlnaHQ6IDEuMyU7XG59XG5hcHAtZ3JvdXBjaGF0IC5jaXJjbGUtcmlnaHQge1xuICBoZWlnaHQ6IDVweDtcbiAgd2lkdGg6IDVweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzliOWI5YjtcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgbWFyZ2luLWxlZnQ6IDA7XG4gIG1hcmdpbi1yaWdodDogNDclO1xufVxuYXBwLWdyb3VwY2hhdCAuYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRhNGE0YTtcbn1cbmFwcC1ncm91cGNoYXQgLmRlZmF1bHQtYmFja2dyb3VuZCB7XG4gIGRpc3BsYXk6IHRhYmxlO1xuICBtaW4taGVpZ2h0OiAxNTBweDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5hcHAtZ3JvdXBjaGF0IC5kZWZhdWx0LXRpdGxlIHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDJlbTtcbiAgY29sb3I6ICNmZmY7XG4gIC13ZWJraXQtdGV4dC1zdHJva2U6IHRoaW47XG4gIC8qICAgIHRleHQtc2hhZG93OlxuICAgICAgICAgICAgICAtMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgICAxcHggLTFweCAwICMwMDAsXG4gICAgICAgICAgICAgIC0xcHggMXB4IDAgIzAwMCxcbiAgICAgICAgICAgICAgMXB4IDFweCAwICMwMDA7Ki9cbn1cbmFwcC1ncm91cGNoYXQgLnNlY3Rpb24tdGl0bGUge1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXNpemU6IGxhcmdlO1xufVxuYXBwLWdyb3VwY2hhdCAuYXZhdGFyIHtcbiAgd2lkdGg6IDQwcHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA0MHB4ICFpbXBvcnRhbnQ7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xufVxuYXBwLWdyb3VwY2hhdCAubXVsdGlwbGUtcGhvdG9zIHtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuYXBwLWdyb3VwY2hhdCAucHJvZ3JhbS1zbGlkZXMge1xuICBwYWRkaW5nOiAxMnB4O1xufVxuYXBwLWdyb3VwY2hhdCAucHJvZ3JhbS1zbGlkZSB7XG4gIG1heC13aWR0aDogMTUwcHg7XG59IiwiYXBwLWdyb3VwY2hhdCB7XG5cbiAgaW9uLWluZmluaXRlLXNjcm9sbCB7XG4gICAgaGVpZ2h0OiAwO1xuICB9XG5cbiAgLnRpdGxlcyB7XG4gICAgbWFyZ2luOiAwIDEwJTtcbiAgfVxuXG4gIC50aXRsZSB7XG4gICAgZm9udC1zdHlsZTogYm9sZDtcbiAgfVxuXG4gIC50aXRsZS1kb3RzLXJvdyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMTBweDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLnRpdGxlLWRvdHMtY29udGFpbmVyIHtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICB3aWR0aDogMzVweDtcbiAgfVxuXG4gIC50aXRsZS1kb3Qge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBoZWlnaHQ6IDVweDtcbiAgICB3aWR0aDogIDVweDtcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICB9XG5cbiAgLnRpdGxlLWRvdC1sZWZ0IHtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAudGl0bGUtZG90LW1pZGRsZSB7XG4gICAgbWFyZ2luOiAwIDEwcHg7XG4gIH1cblxuICAudGl0bGUtZG90LXJpZ2h0IHtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICAuaGVhZGVyLWJvdHRvbS1wYWRkaW5nIHtcbiAgICBoZWlnaHQ6IDE1cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuXG4gIC5jaGF0LWxpc3Qge1xuICAgIC8vcGFkZGluZy10b3A6IDUlO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAvL3RpbWUgc3RhbXBcbiAgLm1lc3NhZ2UtdGltZXN0YW1wIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgfVxuXG4gIC8vIENoYXRcblxuICBpb24tYXZhdGFyIHtcbiAgICB3aWR0aDogNDVweCAhaW1wb3J0YW50O1xuICAgIGhlaWdodDogNDVweCAhaW1wb3J0YW50O1xuXG4gICAgaW1nIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cbiAgfVxuXG4gIC5vbmxpbmUge1xuICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSk7XG4gIH1cblxuICAuZmFkZSB7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZhZGUgM3MgaW5maW5pdGU7XG4gICAgYW5pbWF0aW9uOiBmYWRlIDNzIGluZmluaXRlO1xuICAgIC1tb3otYW5pbWF0aW9uOiBmYWRlIDNzIGluZmluaXRlO1xuICAgIC1vLWFuaW1hdGlvbjogZmFkZSAzcyBpbmZpbml0ZTtcbiAgfVxuXG4gIEAtd2Via2l0LWtleWZyYW1lcyBmYWRlIHtcbiAgICAwJSB7b3BhY2l0eTogMC4yfVxuICAgIDUwJSB7b3BhY2l0eTogMX1cbiAgICAxMDAlIHtvcGFjaXR5OjAuMn1cbiAgfVxuXG4gIEAtbW96LWtleWZyYW1lcyBmYWRlIHtcbiAgICAwJSB7b3BhY2l0eTogMC4yfVxuICAgIDUwJSB7b3BhY2l0eTogMX1cbiAgICAxMDAlIHtvcGFjaXR5OjB9XG4gIH1cblxuICBAa2V5ZnJhbWVzIGZhZGUge1xuICAgIDAlIHtvcGFjaXR5OiAwLjJ9XG4gICAgNTAlIHtvcGFjaXR5OiAxfVxuICAgIDEwMCV7b3BhY2l0eTogMC4yfVxuICB9XG4gIEAtby1rZXlmcmFtZXMgZmFkZSB7XG4gICAgMCUge29wYWNpdHk6IDAuMn1cbiAgICA1MCUge29wYWNpdHk6IDF9XG4gICAgMTAwJXtvcGFjaXR5OiAwLjJ9XG4gIH1cblxuICBpb24tdGh1bWJuYWlsIHtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgLS1zaXplOiAxMDBweDtcbiAgfVxuXG4gIC5zbWFsbC10aHVtYm5haWwge1xuICAgIC0tc2l6ZTogNTBweDtcbiAgfVxuXG4gIC53aWRlLXRodW1ibmFpbCB7XG4gICAgLS1zaXplOiAyMDBweDtcbiAgfVxuXG4gIC5zZW5kZXItYXZhdGFyIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDQlO1xuICB9XG5cbiAgLm1lc3NhZ2Utd3JhcHBlciB7XG4gICAgLypvdmVyZmxvdzogYXV0bztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7Ki9cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICB9XG4gIH1cblxuICAuc2VuZGVyLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZsb2F0OiBsZWZ0O1xuICB9XG5cbiAgLnNlbmRlci1tZXNzYWdlLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG5cbiAgLmF1dGhvciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgfVxuXG4gIC5pbWFnZS1idWJibGUge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcGVyc3BlY3RpdmU6IDFweDtcbiAgfVxuXG4gIC5jaGF0LWJ1YmJsZSB7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDEycHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IHRleHQ7XG4gICAgLW1zLXVzZXItc2VsZWN0OiB0ZXh0O1xuICAgIHVzZXItc2VsZWN0OiB0ZXh0O1xuICB9XG5cbiAgLmNoYXQtYnViYmxlOmJlZm9yZSB7XG4gICAgY29udGVudDogXCJcXDAwYTBcIjtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBoZWlnaHQ6IDE2cHg7XG4gICAgd2lkdGg6IDlweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAtNy41cHg7XG4gIH1cblxuICAuY2hhdC1idWJibGUubGVmdCB7XG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4OyAvL25lZWRzIHRvIGJlIGEgZml4ZWQgcHggdmFsdWUsIG5vdCAlLCBvciB0aGUgLm1lc3NhZ2Ugd2lsbCBub3Qga25vdyB0aGUgZXhhY3Qgd2lkdGggYW5kIHdyYXBzIHRoZSB0ZXh0IGluY29ycmVjdGx5XG4gICAgcGFkZGluZy1yaWdodDogMjVweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIHAge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG4gICAgYTpsaW5rIHtcbiAgICAgIGNvbG9yOnZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG4gICAgYTp2aXNpdGVkIHtcbiAgICAgIGNvbG9yOnZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG4gIH1cblxuICAuY2hhdC1idWJibGUubGVmdDpiZWZvcmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6dmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICBsZWZ0OiAxMHB4O1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNzBkZWcpIHNrZXcoNWRlZyk7XG4gIH1cblxuICAuY2hhdC1idWJibGUucmlnaHQge1xuICAgIG1hcmdpbi1sZWZ0OiAyJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgcCB7XG4gICAgICBjb2xvcjp2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIH1cbiAgICBhOmxpbmsge1xuICAgICAgY29sb3I6dmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICB9XG4gICAgYTp2aXNpdGVkIHtcbiAgICAgIGNvbG9yOnZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgfVxuICB9XG5cbiAgLmNoYXQtYnViYmxlLnJpZ2h0OmJlZm9yZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTE4ZGVnKSBza2V3KC01ZGVnKTtcbiAgfVxuXG4gIC5tZXNzYWdlIHtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIHdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7XG4gIH1cblxuICAubWVzc2FnZS5yZXBseSB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cblxuICAudmlkZW8tZnJhbWUge1xuICAgIHdpZHRoOiBjYWxjKCgxMDB2dyAtIDYwcHgpKjAuNzUpO1xuICAgIG1heC13aWR0aDogMzAwcHg7XG4gIH1cblxuICAueW91dHViZSB7XG4gICAgbWFyZ2luLXRvcDogMTJweDtcbiAgfVxuXG4gIC5xdW90ZS1idWJibGUge1xuICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgfVxuXG4gIC5xdW90ZS1idWJibGUubGVmdCB7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDVweCA2cHggNXB4IDZweDtcbiAgICBhOmxpbmsge1xuICAgICAgY29sb3I6IGxpZ2h0c2t5Ymx1ZTtcbiAgICB9XG4gICAgYTp2aXNpdGVkIHtcbiAgICAgIGNvbG9yOiBsaWdodHNreWJsdWU7XG4gICAgfVxuICB9XG5cbiAgLnF1b3RlLWJ1YmJsZS5yaWdodCB7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDVweCA2cHggNXB4IDZweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgcCB7XG4gICAgICBjb2xvcjp2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgfVxuICB9XG5cbiAgLm1vbWVudCB7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogdGV4dDtcbiAgICAtbW96LXVzZXItc2VsZWN0OiB0ZXh0O1xuICAgIC1tcy11c2VyLXNlbGVjdDogdGV4dDtcbiAgICB1c2VyLXNlbGVjdDogdGV4dDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgICBoMiwgcCB7XG4gICAgICBjb2xvcjp2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIH1cbiAgfVxuXG4gIC5tb21lbnQubGVmdCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICAgIHAge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICB9XG4gIH1cblxuICAubW9tZW50LnJpZ2h0IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDNweDtcbiAgICAvL21heC13aWR0aDogNzAlOyAvLzcwJSBvZiB0aGUgZW50aXJlIGlvbi1pdGVtIHdpZHRoLCB3aXRoIGl0ZW0tZW5kIHR1cm5lZCBvbiB0byBzdGljayB0aGUgbW9tZW50IGJ1YmJsZSB0byB0aGUgcmlnaHRcbiAgfVxuXG4gIC5tb21lbnQtaW1hZ2Uge1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIC8vbWF4LWhlaWdodDogNDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDUlO1xuXG4gIH1cbiAgLnN1cGVyaW1wb3NlZEljb24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDUwJTtcbiAgICByaWdodDogNDAlO1xuICAgIGhlaWdodDogMjAlO1xuICB9XG5cbiAgLm1vbWVudC1uYW1lIHtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5tb21lbnQtZGF0ZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgfVxuICAubW9tZW50LW5vdGVzIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgfVxuXG4gIC5nb2FsRm9vdGVyIHtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cblxuICAvL1BvbGwgbWVzc2FnZVxuICAucG9sbEljb25EaXYge1xuICAgIGhlaWdodDogMjAlO1xuICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgLnBvbGxJY29uIHtcbiAgICAgIGhlaWdodDogMS44ZW07XG4gICAgICB3aWR0aDogMTAlO1xuICAgICAgbWFyZ2luLWxlZnQ6IDQ1JTtcbiAgICAgIG1hcmdpbi1yaWdodDogNDUlO1xuICAgIH1cbiAgfVxuXG4gIC5wb2xsUXVlc3Rpb24ge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgZm9udC1zaXplOiBtZWRpdW07XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICB9XG5cbiAgLnBvbGxDb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBjbGVhcjogYm90aDtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZzogMnB4O1xuICB9XG5cbiAgLm9wdGlvbnNDb250YWluZXIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiA1OCU7XG4gICAgLm9wdGlvbiB7XG4gICAgICBwYWRkaW5nLXRvcDogNXB4O1xuICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICBmb250LXNpemU6IG1lZGl1bTtcbiAgICAgIGNvbG9yOiAjNGE5MGUyO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuICB9XG5cbiAgLnZvdGVzQ29udGFpbmVyIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICB3aWR0aDogMjAlO1xuICAgIC52b3RlY291bnR7XG4gICAgICBwYWRkaW5nLXRvcDogMTRweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICBmb250LXNpemU6IHgtc21hbGw7XG4gICAgfVxuICB9XG5cbiAgLnVzZXJDb250YWluZXIge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICB3aWR0aDogMjIlO1xuICAgIHBhZGRpbmc6IDAgYXV0bztcbiAgICAudXNlcnZvdGV7XG4gICAgICBtYXJnaW46IDE1cHggNSUgMCA1JTtcbiAgICAgIGZvbnQtc2l6ZTogeC1zbWFsbDtcbiAgICAgIHdpZHRoOiA5MCU7XG4gICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgIH1cbiAgICAudXNlcnZvdGVkIHtcbiAgICAgIHBhZGRpbmctdG9wOiAyMHB4O1xuICAgICAgd2lkdGg6IDMwJTtcbiAgICAgIG1hcmdpbjogMCA0MCU7XG4gICAgfVxuICB9XG5cbiAgLmNmIHtcbiAgICBjbGVhcjogYm90aCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gIH1cblxuICAvL3JlcGx5IHF1b3RlXG5cbiAgLnJlcGx5T3B0aW9ucyB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBoZWlnaHQ6IDIwJTtcbiAgICB0b3A6IDIwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwQjdGRjtcblxuICB9XG5cbiAgLnJlcGx5T3B0aW9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOEE2MzQzO1xuICAgIHdpZHRoOiAyMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgfVxuXG4gIC5yZXBseS1pY29uLXNob3J0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHJpZ2h0OiA1cHg7XG4gICAgYm90dG9tOiA1cHg7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrZ3JleSk7XG4gIH1cblxuICAvLyAuaWNvbi1pbm5lciB7XG4gIC8vICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFya2dyZXkpO1xuICAvLyB9XG5cbiAgLnJlcGx5LWljb24ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrZ3JleSk7XG4gIH1cblxuICAucmVwbHktaWNvbi5waG90byB7XG4gICAgcmlnaHQ6IC01cHg7XG4gIH1cblxuICAucmVwbHlRdW90ZS13cmFwcGVyIHtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLS1taW4taGVpZ2h0OiAzNnB4O1xuICB9XG5cbiAgLnJlcGx5UXVvdGUtYnViYmxlIHtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgcGFkZGluZzogMnB4IDEwcHg7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6dmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG4gIH1cblxuICAuY2xvc2VSZXBseSB7XG4gICAgbWFyZ2luLXJpZ2h0OiAwLjFweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB9XG5cbiAgLm1lc3NhZ2UtdGFnIHtcbiAgICBtYXJnaW4tbGVmdDogNCU7XG4gIH1cblxuICAubWVzc2FnZS10YWctY2VudGVyZWQge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNjVweDtcbiAgICBtYXJnaW46IGF1dG8gMCBhdXRvIDA7XG5cblxuICAgIC5zZWxmLWF2YXRhciB7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgIHRvcDogMFxuICAgIH1cblxuICAgIC5zdGF0dXMtZGl2IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgbWFyZ2luOiA1cHggYXV0byAwIGF1dG87XG4gICAgfVxuXG4gICAgLnN0YXR1cyB7XG4gICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgIGNvbG9yOiBncmV5O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cblxuICAgIC5zdGF0dXMgI2ZhaWxlZCB7XG4gICAgICBjb2xvcjogI2QwMDIxYjtcbiAgICB9XG4gIH1cblxuICAucmVwbHktaWNvbiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMTBweDtcbiAgICByaWdodDogOHB4O1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBcbiAgfVxuXG5cbiAgLm1lc3NhZ2UtZm9vdGVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICB9XG5cbiAgLm1lc3NhZ2UtZm9ybSB7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0Z3JleSk7XG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICBib3JkZXItd2lkdGg6IDAuNXB4O1xuICAgIHBhZGRpbmc6IDAgOHB4O1xuXG4gICAgaW9uLWJ1dHRvbiB7XG4gICAgICBtYXJnaW4tdG9wOiBhdXRvO1xuICAgICAgbWFyZ2luLWJvdHRvbTogYXV0bztcbiAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICB9XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDBweDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgfVxuXG4gICAgaW9uLXRleHRhcmVhIHtcbiAgICAgIG1hcmdpbjogOHB4O1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAtLWNvbG9yOiAjMjIyNDI4O1xuICAgICAgLS1iYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodGdyZXkpO1xuICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDRweDtcbiAgICB9XG5cbiAgICAvKi50ZXh0YXJlYS13cmFwcGVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6dmFyKC0taW9uLWNvbG9yLWdyZXkpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICB9Ki9cbiAgICAuc2VuZEltYWdlIHtcbiAgICAgIG1hcmdpbjogMTZweCAwIDE2cHggMyU7XG4gICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICB3aWR0aDogMzBweDtcbiAgICAgIGZsb2F0OiByaWdodDtcbiAgICB9XG5cbiAgICAucmVjb3JkQXVkaW9JbWcge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBtYXJnaW46IDE2cHggMCAxNnB4IDIlO1xuICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgd2lkdGg6IDMwcHg7XG4gICAgICBmbG9hdDogcmlnaHQ7XG4gICAgfVxuICB9XG5cbiAgI2V4cGFuZGFibGUge1xuICAgIGFuaW1hdGlvbi1uYW1lOiBtb3ZlO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC41cztcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDtcbiAgICBhbmltYXRpb24tZGlyZWN0aW9uOiBhbHRlcm5hdGU7XG4gIH1cblxuICBAa2V5ZnJhbWVzIG1vdmUge1xuICAgIGZyb20ge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDE3MHB4KTtcbiAgICB9XG4gICAgdG8ge1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIH1cbiAgfVxuXG4gICNleHBhbmRhYmxlLXJpZ2h0IHtcbiAgICBhbmltYXRpb24tbmFtZTogbW92ZS1yaWdodDtcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDAuNXM7XG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7XG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xuICB9XG5cbiAgQGtleWZyYW1lcyBtb3ZlLXJpZ2h0IHtcbiAgICBmcm9tIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTQ0cHgpO1xuICAgIH1cbiAgICB0byB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgfVxuICB9XG5cbiAgI2ZlYXR1cmVzIHtcbiAgICAtLWJ1bGxldC1iYWNrZ3JvdW5kOiAjOWI5YjliO1xuICAgIC0tYnVsbGV0LWJhY2tncm91bmQtYWN0aXZlOiAjNGE0YTRhO1xuICB9XG5cbiAgLm1vcmVvcHRpb25zIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtaGVpZ2h0OiAxODBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHRncmV5KTtcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xuXG4gICAgLm1vcmVHcmlkIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC50b3BSb3cge1xuICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLm9wdGlvbnNjb2wge1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgd2lkdGg6IDEwMCU7XG5cbiAgICAgIC5jb2xlbGVtZW50IHtcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgICB3aWR0aDogNjBweDtcbiAgICAgICAgLy9tYXgtaGVpZ2h0OiA3NSU7XG4gICAgICAgIC8vbWF4LXdpZHRoOiA3MCU7XG4gICAgICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgICAgICBtYXJnaW46IDIlIGF1dG87XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBwYWRkaW5nLXRvcDogOHB4O1xuXG4gICAgICAgIC5idXR0b24tZm9udCB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IFJvYm90bztcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMTFweDtcbiAgICAgICAgICAvKiBpZGVudGljYWwgdG8gYm94IGhlaWdodCAqL1xuICAgICAgICAgIGNvbG9yOiAjRkZGRkZGO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICBib3R0b206IDE0cHg7XG4gICAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGxlZnQ6IDBweDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAuY29sZWxlbWVudC5ncmVlbiB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxREFDM0M7XG4gICAgICB9XG5cbiAgICAgIC5jb2xlbGVtZW50LnB1cnBsZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM2NzRGRkY7XG4gICAgICB9XG5cbiAgICAgIC5jb2xlbGVtZW50LmJsdWUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0ZBREZEO1xuICAgICAgfVxuXG4gICAgICAuY29sZWxlbWVudC5yZWQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkY2MDYwO1xuICAgICAgfVxuXG4gICAgICAubW9yZUxhYmVsIHtcbiAgICAgICAgZGlzcGxheTogdGFibGU7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICBjb2xvcjogIzk2OTY5NjtcbiAgICAgICAgZm9udC1zaXplOiBtZWRpdW07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLnByb2dyYW0tY2FyZCB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gICAgbWFyZ2luOiAwIDMlO1xuICB9XG5cbiAgLmNoYXQtcHJvZ3JhbS1waG90by1jb250YWluZXIge1xuICAgIGhlaWdodDogMTIwcHg7XG4gICAgbWluLXdpZHRoOiAxMDBweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICB9XG5cbiAgLnByb2dyYW0tcGhvdG8tY29udGFpbmVyIHtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC5wcm9ncmFtLXBob3RvIHtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuXG4gIC5wcm9ncmFtLXR5cGUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDIlO1xuICAgIGxlZnQ6IDIlO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAucHJvZ3JhbS1uYW1lIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWF4LWhlaWdodDogMjhweDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGJvdHRvbTogMiU7XG4gICAgbGVmdDogMiU7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB6LWluZGV4OiAxNTtcbiAgfVxuXG4gIC5yZW1vdmUtbWVkaWEge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDNweDtcbiAgICByaWdodDogY2FsYygxMDAlLzIgLSAyMnB4KTtcbiAgICB6LWluZGV4OiAxNTtcbiAgfVxuXG4gIC5yZW1vdmUtbW9tZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAycHg7XG4gIH1cblxuICAuZGFyayB7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrZ3JleSk7XG4gIH1cblxuICAubGlnaHQge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxuXG4gIC51cGxvYWQge1xuICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICB3aWR0aDogNDUlO1xuICAgfVxuXG4gIC5nb2FsIHtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIHdpZHRoOiA0MCU7XG4gIH1cblxuICAucGFnZVJvd3tcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTRweDtcbiAgfVxuXG4gIC5jaXJjbGUtbGVmdCB7XG4gICAgaGVpZ2h0OiA1cHg7XG4gICAgd2lkdGg6ICA1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzliOWI5YjtcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgIG1hcmdpbi1sZWZ0OiA0OCU7XG4gICAgbWFyZ2luLXJpZ2h0OiAxLjMlO1xuICB9XG5cbiAgLmNpcmNsZS1yaWdodCB7XG4gICAgaGVpZ2h0OiA1cHg7XG4gICAgd2lkdGg6ICA1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzliOWI5YjtcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIG1hcmdpbi1yaWdodDogNDclO1xuICB9XG5cbiAgLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRhNGE0YTtcbiAgfVxuXG5cbiAgLy8gYWJvdXRcblxuICAuZGVmYXVsdC1iYWNrZ3JvdW5kIHtcbiAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICBtaW4taGVpZ2h0OiAxNTBweDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmRlZmF1bHQtdGl0bGUge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAyLjBlbTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICAtd2Via2l0LXRleHQtc3Ryb2tlOiB0aGluO1xuLyogICAgdGV4dC1zaGFkb3c6XG4gICAgICAgICAgICAtMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgMXB4IC0xcHggMCAjMDAwLFxuICAgICAgICAgICAgLTFweCAxcHggMCAjMDAwLFxuICAgICAgICAgICAgMXB4IDFweCAwICMwMDA7Ki9cbiAgfVxuXG4gIC5zZWN0aW9uLXRpdGxlIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZ3JleSk7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBmb250LXNpemU6IGxhcmdlO1xuICB9XG5cbiAgLmF2YXRhciB7XG4gICAgd2lkdGg6IDQwcHggIWltcG9ydGFudDtcbiAgICBoZWlnaHQgOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gIH1cblxuICAubXVsdGlwbGUtcGhvdG9zIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gIH1cblxuICAucHJvZ3JhbS1zbGlkZXMge1xuICAgIHBhZGRpbmc6IDEycHg7XG4gIH1cblxuICAucHJvZ3JhbS1zbGlkZSB7XG4gICAgbWF4LXdpZHRoOiAxNTBweDtcbiAgfVxufVxuXG4iXX0= */");

/***/ }),

/***/ "./src/app/pages/group/groupchat/groupchat.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/group/groupchat/groupchat.page.ts ***!
  \*********************************************************/
/*! exports provided: GroupchatPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupchatPage", function() { return GroupchatPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var ionic_cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ionic-cache */ "./node_modules/ionic-cache/dist/index.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/badge/ngx */ "./node_modules/@ionic-native/badge/ngx/index.js");
/* harmony import */ var _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/speech-recognition/ngx */ "./node_modules/@ionic-native/speech-recognition/ngx/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_aws_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/aws.service */ "./src/app/services/aws.service.ts");
/* harmony import */ var _services_network_service_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../services/network-service.service */ "./src/app/services/network-service.service.ts");
/* harmony import */ var _services_response_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../services/response.service */ "./src/app/services/response.service.ts");
/* harmony import */ var _services_moment_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../services/moment.service */ "./src/app/services/moment.service.ts");
/* harmony import */ var _services_group_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../services/group.service */ "./src/app/services/group.service.ts");
/* harmony import */ var _services_resource_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../services/resource.service */ "./src/app/services/resource.service.ts");
/* harmony import */ var _connect_focus_photo_focus_photo_page__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../connect/focus-photo/focus-photo.page */ "./src/app/pages/connect/focus-photo/focus-photo.page.ts");
/* harmony import */ var _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../connect/showrecipientinfo/showrecipientinfo.page */ "./src/app/pages/connect/showrecipientinfo/showrecipientinfo.page.ts");
/* harmony import */ var _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../feature/pickfeature-popover/pickfeature-popover.page */ "./src/app/pages/feature/pickfeature-popover/pickfeature-popover.page.ts");
/* harmony import */ var _group_popover_group_popover_page__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../group-popover/group-popover.page */ "./src/app/pages/group/group-popover/group-popover.page.ts");
/* harmony import */ var _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../feature/showfeature/showfeature.page */ "./src/app/pages/feature/showfeature/showfeature.page.ts");
/* harmony import */ var _user_profile_profile_page__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../user/profile/profile.page */ "./src/app/pages/user/profile/profile.page.ts");
/* harmony import */ var _groupinfo_groupinfo_page__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../groupinfo/groupinfo.page */ "./src/app/pages/group/groupinfo/groupinfo.page.ts");
/* harmony import */ var _services_calendar_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../services/calendar.service */ "./src/app/services/calendar.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
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





//const { Keyboard } = Plugins;






















var GroupchatPage = /** @class */ (function () {
    function GroupchatPage(zone, router, electronService, cache, storage, badge, platform, geolocation, speechRecognition, toastCtrl, actionSheetCtrl, alertCtrl, modalCtrl, popoverCtrl, groupService, authService, userData, chatService, awsService, networkService, calendarService, responseService, momentService, resourceService) {
        var _this = this;
        this.zone = zone;
        this.router = router;
        this.electronService = electronService;
        this.cache = cache;
        this.storage = storage;
        this.badge = badge;
        this.platform = platform;
        this.geolocation = geolocation;
        this.speechRecognition = speechRecognition;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.groupService = groupService;
        this.authService = authService;
        this.userData = userData;
        this.chatService = chatService;
        this.awsService = awsService;
        this.networkService = networkService;
        this.calendarService = calendarService;
        this.responseService = responseService;
        this.momentService = momentService;
        this.resourceService = resourceService;
        this.subscriptions = {};
        // chat
        this.messages = [];
        this.composedMessage = '';
        this.chatPageNum = 0;
        this.chatReachedEnd = false;
        this.chatAPIBusy = false;
        this.sendQuoteAndReplyTag = false;
        this.moreOptions = false;
        this.moreMediaOptions = true;
        this.noNetwork = false;
        this.listening = false;
        this.slide = 0;
        this.chatFinishedLoading = false;
        this.selectedMoments = [];
        this.removedMoments = [];
        this.mediaList = [];
        this.reloadHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!res) return [3 /*break*/, 5];
                        if (!(res.action === 'reload chat view')) return [3 /*break*/, 4];
                        if (!(this.chatService.currentChatProps && this.chatService.currentChatProps.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.cleanup(this.chatService.currentChatProps.badge)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setup()];
                    case 2:
                        _a.sent();
                        this.reloadChatView();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        if (res.action === 'disconnect chat view' && (this.propIndex > -1) && res.conversationId === this.chatService.currentChatProps[this.propIndex].conversationId) {
                            this.closeModal(true);
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.reloadGroupHandler = function (res) {
            if (res) {
                if ((_this.propIndex > -1) && _this.chatService.currentChatProps && (_this.chatService.currentChatProps.length > _this.propIndex) && res.conversationId === _this.chatService.currentChatProps[_this.propIndex].conversationId && _this.chatService.currentChatProps[_this.propIndex].group && res.data && res.data.name) {
                    // update group name
                    _this.chatService.currentChatProps[_this.propIndex].name = res.data.name;
                }
            }
        };
        this.incomingMessageHandler = function (message) { return __awaiter(_this, void 0, void 0, function () {
            var fromAnotherDevice_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (message) {
                    if (this.chatService.currentChatProps[this.propIndex] && message.conversationId === this.chatService.currentChatProps[this.propIndex].conversationId) {
                        // if it is from another user
                        if ((message.author && message.author._id !== this.userData.user._id) || message.author_pending_member) {
                            // if it is the start of a new day
                            if (new Date(this.messages[this.messages.length - 1].createdAt).toDateString !== new Date(message.createdAt).toDateString) {
                                this.messages.push({ timestamp: true, createdAt: message.createdAt });
                            }
                            // if longer than 1 hours
                            else if (new Date(message.createdAt).getTime() - new Date(this.messages[this.messages.length - 1].createdAt).getTime() > 60 * 60 * 1000) {
                                this.messages.push({ timestamp: true, createdAt: message.createdAt });
                            }
                            if (message.moment && message.moment.resource && message.moment.resource.field && message.moment.resource.field == 'Location') {
                                message.addressURL = "http://maps.google.com/?q=" + message.moment.matrix_number[0] + "+%2C" + message.moment.matrix_number[1];
                            }
                            message.status = "confirmed";
                            // push message
                            this.messages.push(message);
                            if (message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll') {
                                // getting a new moment message that requires joining the socket, so refresh the chat
                                this.reloadChatView();
                            }
                            setTimeout(function () {
                                _this.content.scrollToBottom(50);
                            }, 300);
                        }
                        else {
                            fromAnotherDevice_1 = true;
                            this.messages.forEach(function (existing_message) {
                                if (message.confirmId && message.confirmId === existing_message.confirmId) {
                                    if (message.body) {
                                        existing_message.body = message.body; // take advantage of the autolinker done by the backend socketEvent.js
                                    }
                                    existing_message.status = "confirmed";
                                    fromAnotherDevice_1 = false; // if it is coming from the same device, flag it
                                }
                            });
                            if (fromAnotherDevice_1) { // if it is from another device, push the message to the chat this.room
                                if (message.moment && message.moment.resource && message.moment.resource.field && message.moment.resource.field == 'Location') {
                                    message.addressURL = "http://maps.google.com/?q=" + message.moment.matrix_number[0] + "+%2C" + message.moment.matrix_number[1];
                                }
                                message.status = "confirmed";
                                // push message
                                this.messages.push(message);
                                if (message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll') {
                                    // getting a new moment message that requires joining the socket, so refresh the chat
                                    this.reloadChatView();
                                }
                                setTimeout(function () {
                                    _this.content.scrollToBottom(50);
                                }, 300);
                            }
                        }
                    }
                }
                return [2 /*return*/];
            });
        }); };
        this.refreshMomentHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var data_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (res && res.momentId && res.data) {
                    data_1 = res.data;
                    this.messages.forEach(function (message) {
                        var e_1, _a;
                        if (message.moment && data_1.moment && (message.moment._id === data_1.moment._id) && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll') {
                            var index = message.poll.responses.map(function (c) { return c._id; }).indexOf(data_1.response._id);
                            if (index < 0) { // if the response hasn't been added to the response list
                                message.poll.responses.push(data_1.response);
                            }
                            else { // if it has been added, replace with the incoming one
                                message.poll.responses.splice(index, 1, data_1.response);
                            }
                            // now the latest response have been included, reset the display array
                            message.poll.display.forEach(function (displayitem) {
                                displayitem.count = 0;
                                displayitem.votedByUser = false;
                            });
                            // reconstruct the display array
                            message.poll.totalVoteCount = message.poll.responses.length;
                            try {
                                for (var _b = __values(message.poll.responses), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var response = _c.value;
                                    if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                        if (response.matrix_number[0][1] > (message.poll.display.length - 1)) {
                                            return; // if this response belongs to an option that has been deleted
                                        }
                                        if (response.user._id === _this.userData.user._id) { // response.user is populated. Note: this is different from the responses loaded in loadMoreMessages, where the user is not populated
                                            message.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                        }
                                        message.poll.display[response.matrix_number[0][1]].count++;
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
                        }
                        if (message.moment && message.moment.resource && message.moment.resource.field && message.moment.resource.field == 'Location') {
                            message.addressURL = "http://maps.google.com/?q=" + message.moment.matrix_number[0] + "+%2C" + message.moment.matrix_number[1];
                        }
                    });
                }
                return [2 /*return*/];
            });
        }); };
        // for current user refreshing the app, including when updating a selectedMoment which requires reloading the Moment using calendar data
        this.refreshUserStatusHandler = function (res) { return __awaiter(_this, void 0, void 0, function () {
            var e_2, _a, _b, _c, selectedMoment, index, id;
            return __generator(this, function (_d) {
                try {
                    for (_b = __values(this.selectedMoments), _c = _b.next(); !_c.done; _c = _b.next()) {
                        selectedMoment = _c.value;
                        index = this.calendarService.calendarItems.map(function (c) { return c.moment ? c.moment._id : ''; }).indexOf(selectedMoment._id);
                        if (index > -1) {
                            selectedMoment = this.calendarService.calendarItems[index].moment;
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
                if (res && res.type === 'close group view') {
                    id = res.data._id;
                    if (this.chatService.currentChatProps.length > this.propIndex && (id === this.chatService.currentChatProps[this.propIndex].conversationId || id === (this.chatService.currentChatProps[this.propIndex].moment && this.chatService.currentChatProps[this.propIndex].moment._id) || id === (this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group._id))) {
                        this.closeModal(true);
                    }
                }
                return [2 /*return*/];
            });
        }); };
    }
    GroupchatPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.awsService.sessionAllowedCount = 10; // allow up to 10 files upload per session
                this.subscriptions['refreshMyConversations'] = this.userData.refreshMyConversations$.subscribe(this.reloadHandler);
                this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.reloadGroupHandler);
                this.subscriptions['chatMessage'] = this.chatService.chatMessage$.subscribe(this.incomingMessageHandler);
                this.subscriptions['refreshMoment'] = this.momentService.refreshMoment$.subscribe(this.refreshMomentHandler);
                this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
                if (this.chatService.currentChatProps && this.chatService.currentChatProps.length) {
                    this.setup();
                }
                return [2 /*return*/];
            });
        });
    };
    GroupchatPage.prototype.cleanup = function (refreshMyConversations) {
        return __awaiter(this, void 0, void 0, function () {
            var currentChatId, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        this.destroyPlayers(null);
                        this.chatAPIBusy = false;
                        this.chatReachedEnd = false;
                        this.chatPageNum = 0;
                        currentChatId = this.chatService.currentChatProps[0].conversationId;
                        this.awsService.sessionAssets[currentChatId] = [];
                        this.selectedMoments = [];
                        this.resetBadge(currentChatId, refreshMyConversations);
                        if (!this.messages.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storage.set('conversation-' + currentChatId, this.messages)];
                    case 1:
                        _a.sent(); //store the active page to the local storage
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.storage.remove('conversation-' + currentChatId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!this.composedMessage.length) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.storage.set('composedMessage' + currentChatId, this.composedMessage)];
                    case 5:
                        _a.sent(); // store the composed message
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.storage.remove('composedMessage' + currentChatId)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        this.messages.forEach(function (message) {
                            if (message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll') {
                                _this.momentService.socket.emit('leave moment', message.moment._id);
                            }
                        });
                        if (!this.modalPage && this.platform.width() >= 768) { // when viewing it in desktop mode
                            this.chatService.currentChatProps = this.chatService.currentChatProps.slice(this.chatService.currentChatProps.length - 1); // remove the old chat properties
                        }
                        this.composedMessage = '';
                        return [2 /*return*/, currentChatId];
                    case 9:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, messages, composedMessage, uploadedMedia, uploadedMoments, uploadedMoments_1, uploadedMoments_1_1, moment, index;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.propIndex = this.chatService.currentChatProps.length - 1;
                        if (!this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.storage.get('conversation-' + this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId)];
                    case 1:
                        messages = _b.sent();
                        if (messages) {
                            this.messages = messages;
                        }
                        else {
                            this.messages = [];
                        }
                        return [4 /*yield*/, this.storage.get('composedMessage' + this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId)];
                    case 2:
                        composedMessage = _b.sent();
                        if (composedMessage && composedMessage.length) {
                            this.composedMessage = composedMessage;
                            this.moreMediaOptions = false;
                        }
                        return [4 /*yield*/, this.storage.get('media-' + this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId)];
                    case 3:
                        uploadedMedia = _b.sent();
                        if (uploadedMedia && uploadedMedia.length) {
                            this.awsService.sessionAssets[this.chatService.currentChatProps[this.propIndex].conversationId] = uploadedMedia.filter(function (c) { return c && c.length; });
                            this.moreMediaOptions = false;
                        }
                        else {
                            this.awsService.sessionAssets[this.chatService.currentChatProps[this.propIndex].conversationId] = [];
                        }
                        return [4 /*yield*/, this.storage.get('moment-' + this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId)];
                    case 4:
                        uploadedMoments = _b.sent();
                        if (uploadedMoments && uploadedMoments.length) {
                            this.selectedMoments = [];
                            try {
                                for (uploadedMoments_1 = __values(uploadedMoments), uploadedMoments_1_1 = uploadedMoments_1.next(); !uploadedMoments_1_1.done; uploadedMoments_1_1 = uploadedMoments_1.next()) {
                                    moment = uploadedMoments_1_1.value;
                                    index = this.calendarService.calendarItems.map(function (c) { return c.moment && c.moment._id; }).indexOf(moment._id);
                                    if (index > -1) {
                                        this.selectedMoments.push(this.calendarService.calendarItems[index].moment);
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (uploadedMoments_1_1 && !uploadedMoments_1_1.done && (_a = uploadedMoments_1.return)) _a.call(uploadedMoments_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            this.moreMediaOptions = false;
                        }
                        this.resetBadge(this.chatService.currentChatProps[this.propIndex].conversationId, this.chatService.currentChatProps[this.propIndex].badge);
                        _b.label = 5;
                    case 5:
                        this.reloadChatView();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.reloadChatView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.chatAPIBusy) {
                    this.chatReachedEnd = false;
                    this.chatPageNum = 0;
                    setTimeout(function () {
                        if (_this.infiniteScroll) {
                            _this.infiniteScroll.disabled = false;
                        }
                        _this.loadMoreMessages({ target: _this.infiniteScroll });
                    }, 50);
                }
                return [2 /*return*/];
            });
        });
    };
    GroupchatPage.prototype.loadMoreMessages = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result, momentIds_1, responseRequest, responseResponse, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.chatReachedEnd && !this.chatAPIBusy && this.chatService.currentChatProps[this.propIndex])) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.chatPageNum++;
                        this.chatAPIBusy = true;
                        return [4 /*yield*/, this.chatService.getConversationById(this.chatService.currentChatProps[this.propIndex].conversationId, this.chatPageNum)];
                    case 2:
                        result = _a.sent();
                        this.chatAPIBusy = false;
                        if (this.chatPageNum === 1) {
                            this.messages = []; // if this is the first page load, empty the view first
                        }
                        momentIds_1 = [];
                        if (!result.conversation.length) {
                            this.chatReachedEnd = true;
                            this.chatFinishedLoading = true;
                            if (event && event.target) {
                                event.target.disabled = true;
                            }
                        }
                        else {
                            result.conversation.forEach(function (message) {
                                var e_4, _a;
                                if (_this.messages.length) {
                                    if (new Date(_this.messages[0].createdAt).toDateString() !== new Date(message.createdAt).toDateString()) {
                                        // if it is the start of a new day
                                        _this.messages.unshift({ timestamp: true, createdAt: _this.messages[0].createdAt });
                                    }
                                    else if ((new Date(_this.messages[0].createdAt).getTime() - new Date(message.createdAt).getTime()) > 3 * 60 * 60 * 1000) {
                                        // if longer than 3 hours
                                        _this.messages.unshift({ timestamp: true, createdAt: _this.messages[0].createdAt });
                                    }
                                }
                                // process moment
                                if (message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll' && message.moment.resource.matrix_number && message.moment.resource.matrix_number.length && message.moment.resource.matrix_number[0].length) {
                                    momentIds_1.push(message.moment._id);
                                    var componentId = message.moment.resource.matrix_number[0].indexOf(30000);
                                    message.poll = {
                                        componentId: componentId,
                                        display: [],
                                        responses: [],
                                        winner: [],
                                        totalVoteCount: 0
                                    };
                                    try {
                                        for (var _b = __values(message.moment.matrix_string[componentId]), _c = _b.next(); !_c.done; _c = _b.next()) {
                                            var option = _c.value;
                                            message.poll.display.push({ option: option, votedByUser: false, count: 0 });
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                }
                                if (message.moment && message.moment.resource && message.moment.resource.field && message.moment.resource.field == 'Location') {
                                    message.addressURL = "http://maps.google.com/?q=" + message.moment.matrix_number[0] + "+%2C" + message.moment.matrix_number[1];
                                }
                                message.status = 'confirmed';
                                _this.messages.unshift(message);
                            });
                            if (momentIds_1.length) {
                                momentIds_1.forEach(function (momentId) {
                                    _this.momentService.socket.emit('join moment', momentId);
                                });
                                responseRequest = this.responseService.findResponsesByMomentIds(JSON.parse(JSON.stringify(momentIds_1)));
                                responseResponse = this.cache.loadFromDelayedObservable('response-' + this.chatService.currentChatProps[this.propIndex].conversationId, responseRequest, 'chats', 5, 'all');
                                responseResponse.subscribe(function (responses) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        this.messages.forEach(function (message) { return __awaiter(_this, void 0, void 0, function () {
                                            var e_5, _a, e_6, _b, responses_1, responses_1_1, response, index, _c, _d, response;
                                            return __generator(this, function (_e) {
                                                switch (_e.label) {
                                                    case 0:
                                                        if (!(message.moment && message.moment.resource && message.moment.resource.hasOwnProperty('en-US') && message.moment.resource['en-US'].value[0] === 'Poll' && message.moment.resource.matrix_number && message.moment.resource.matrix_number.length && message.moment.resource.matrix_number[0].length)) return [3 /*break*/, 2];
                                                        try {
                                                            for (responses_1 = __values(responses), responses_1_1 = responses_1.next(); !responses_1_1.done; responses_1_1 = responses_1.next()) {
                                                                response = responses_1_1.value;
                                                                if (response.moment === message.moment._id) {
                                                                    index = message.poll.responses.map(function (c) { return c._id; }).indexOf(response._id);
                                                                    if (index < 0) { //if the response hasn't been added to the response list
                                                                        message.poll.responses.push(response);
                                                                    }
                                                                    else { //if it has been added, and if the incoming response is newer
                                                                        if (new Date(message.poll.responses[index].createdAt).getTime() < new Date(response.createdAt).getTime()) {
                                                                            message.poll.responses.splice(index, 1, response);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                                        finally {
                                                            try {
                                                                if (responses_1_1 && !responses_1_1.done && (_a = responses_1.return)) _a.call(responses_1);
                                                            }
                                                            finally { if (e_5) throw e_5.error; }
                                                        }
                                                        //now the latest response have been included, reset the display array
                                                        return [4 /*yield*/, message.poll.display.forEach(function (displayitem) {
                                                                displayitem.count = 0;
                                                                displayitem.votedByUser = false;
                                                            })];
                                                    case 1:
                                                        //now the latest response have been included, reset the display array
                                                        _e.sent();
                                                        //reconstruct the display array
                                                        message.poll.totalVoteCount = message.poll.responses.length;
                                                        try {
                                                            for (_c = __values(message.poll.responses), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                                response = _d.value;
                                                                if (response.matrix_number[0].length > 1) { // 1.6.3 Poll feature has length of 2, i.e. [option_id, index]
                                                                    if (response.matrix_number[0][1] > (message.poll.display.length - 1)) {
                                                                        return [2 /*return*/]; // if this response belongs to an option that has been deleted
                                                                    }
                                                                    if (response.user === this.userData.user._id) { // response.user is not populated. Note: this is different from the response in refreshMoment handler, where the user is populated
                                                                        message.poll.display[response.matrix_number[0][1]].votedByUser = true;
                                                                    }
                                                                    message.poll.display[response.matrix_number[0][1]].count++;
                                                                }
                                                            }
                                                        }
                                                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                                        finally {
                                                            try {
                                                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                                            }
                                                            finally { if (e_6) throw e_6.error; }
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
                            setTimeout(function () {
                                if (_this.chatPageNum === 1 && _this.content) {
                                    _this.content.scrollToBottom(10);
                                }
                                _this.chatFinishedLoading = true;
                            }, 500);
                        }
                        if (event && event.target) {
                            event.target.complete();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        this.networkService.showNoNetworkAlert();
                        this.chatFinishedLoading = true;
                        if (event && event.target) {
                            event.target.complete();
                        }
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.chatFinishedLoading = true;
                        if (event && event.target) {
                            event.target.complete();
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // click Send button
    GroupchatPage.prototype.sendMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conversationId, err_3, promises, serverData_1, err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conversationId = this.chatService.currentChatProps[this.propIndex].conversationId;
                        this.awsService.sessionAssets[conversationId] = this.awsService.sessionAssets.hasOwnProperty(conversationId) ? this.awsService.sessionAssets[conversationId].filter(function (c) { return c && c.length; }) : [];
                        if (!this.awsService.sessionAssets[conversationId].length) return [3 /*break*/, 4];
                        this.socketData = {
                            conversationId: this.chatService.currentChatProps[this.propIndex].conversationId,
                            attachments: this.awsService.sessionAssets[conversationId],
                            quote: {
                                body: '',
                                attachments: [],
                                author: ''
                            },
                            createdAt: new Date(),
                            author: {
                                _id: this.userData.user._id,
                                first_name: this.userData.user.first_name,
                                last_name: this.userData.user.last_name,
                                avatar: this.userData.user.avatar
                            },
                            status: 'pending',
                            confirmId: Math.random()
                        };
                        this.messages.push(this.socketData);
                        this.moreOptions = false;
                        this.recalculateScrollContent();
                        setTimeout(function () {
                            if (_this.socketData.status !== 'confirmed')
                                _this.socketData.status = 'failed';
                        }, 10000);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.chatService.sendReply(this.chatService.currentChatProps[this.propIndex].conversationId, {
                                attachments: this.awsService.sessionAssets[conversationId],
                                page: this.chatService.currentChatProps[this.propIndex].page,
                                groupId: (this.chatService.currentChatProps[this.propIndex].group) ? this.chatService.currentChatProps[this.propIndex].group._id : null,
                                groupName: (this.chatService.currentChatProps[this.propIndex].group) ? this.chatService.currentChatProps[this.propIndex].group.name : null
                            }, this.socketData)];
                    case 2:
                        _a.sent();
                        this.awsService.sessionAssets[conversationId] = [];
                        this.storage.remove('media-' + this.chatService.currentChatProps[this.propIndex].conversationId); // clear the cache of composed message
                        this.noNetwork = false;
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        this.networkService.showNoNetworkAlert();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.selectedMoments.length) return [3 /*break*/, 7];
                        promises = this.selectedMoments.map(function (moment) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (moment.resource.hasOwnProperty('en-US') && moment.resource['en-US'].value[0] === 'Poll') {
                                            this.momentService.socket.emit('join moment', moment._id); // join the moment socket.io to receive real-time update for voting
                                        }
                                        return [4 /*yield*/, this.momentService.share(moment)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 5:
                        _a.sent();
                        this.selectedMoments = []; // empty the selected moments array
                        // remove abandoned moments
                        promises = this.removedMoments.map(function (moment) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("trying to remove", moment);
                                        return [4 /*yield*/, this.momentService.delete(moment)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 6:
                        _a.sent();
                        this.storage.remove('moment-' + this.chatService.currentChatProps[this.propIndex].conversationId); //clear the cache of composed message
                        this.noNetwork = false;
                        this.moreOptions = false;
                        _a.label = 7;
                    case 7:
                        if (!this.composedMessage.length) return [3 /*break*/, 11];
                        this.socketData = {
                            conversationId: this.chatService.currentChatProps[this.propIndex].conversationId,
                            body: this.composedMessage,
                            quote: {
                                body: this.sendQuoteAndReplyTag ? this.replyQuote.body : '',
                                attachments: this.sendQuoteAndReplyTag ? this.replyQuote.attachments : [],
                                author: this.sendQuoteAndReplyTag ? (this.replyQuote.author ? this.replyQuote.author.first_name + " " + this.replyQuote.author.last_name : this.replyQuote.author_pending_member.name) : ''
                            },
                            createdAt: new Date(),
                            author: {
                                _id: this.userData.user._id,
                                first_name: this.userData.user.first_name,
                                last_name: this.userData.user.last_name,
                                avatar: this.userData.user.avatar
                            },
                            status: 'pending',
                            confirmId: Math.random()
                        };
                        this.messages.push(this.socketData);
                        // send to server and via socket.io
                        setTimeout(function () {
                            _this.content.scrollToBottom(50);
                            _this.closeReplyQuote();
                            _this.composedMessage = '';
                            _this.storage.remove('composedMessage' + _this.chatService.currentChatProps[_this.propIndex].conversationId); //clear the cache of composed message
                        }, 50);
                        serverData_1 = {
                            replyQuote: this.replyQuote,
                            composedMessage: this.composedMessage,
                            page: this.chatService.currentChatProps[this.propIndex].page,
                            groupId: (this.chatService.currentChatProps[this.propIndex].group) ? this.chatService.currentChatProps[this.propIndex].group._id : null,
                            groupName: (this.chatService.currentChatProps[this.propIndex].group) ? this.chatService.currentChatProps[this.propIndex].group.name : null
                        };
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, this.chatService.sendReply(this.chatService.currentChatProps[this.propIndex].conversationId, serverData_1, this.socketData)];
                    case 9:
                        _a.sent();
                        this.noNetwork = false;
                        return [3 /*break*/, 11];
                    case 10:
                        err_4 = _a.sent();
                        if (this.noNetwork) {
                            this.socketData.status = 'failed';
                        }
                        else {
                            this.noNetwork = true;
                            setTimeout(function () {
                                _this.resendMessage(serverData_1, _this.socketData);
                            }, 4000);
                        }
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.initPlyr = function (event, mediaId) {
        var player;
        player = event;
        this.mediaList.push({ _id: mediaId, player: player });
    };
    GroupchatPage.prototype.sendQuoteAndReply = function (message) {
        this.sendQuoteAndReplyTag = true;
        this.replyQuote = message;
    };
    GroupchatPage.prototype.closeReplyQuote = function () {
        this.sendQuoteAndReplyTag = false;
        this.replyQuote = {};
    };
    GroupchatPage.prototype.resendMessage = function (serverData, socketData) {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        socketData.status = "pending";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.chatService.sendReply(this.chatService.currentChatProps[this.propIndex].conversationId, serverData, socketData)];
                    case 2:
                        _a.sent();
                        this.noNetwork = false;
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        if (this.noNetwork) {
                            this.socketData.status = "failed";
                        }
                        else {
                            this.noNetwork = true;
                            setTimeout(function () {
                                if (socketData.status !== "confirmed") {
                                    socketData.status = "failed";
                                }
                            }, 2000);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.messageMoreOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.platform.is('cordova')) {
                    //Keyboard.hide();
                }
                this.moreOptions = !this.moreOptions;
                this.recalculateScrollContent();
                return [2 /*return*/];
            });
        });
    };
    GroupchatPage.prototype.toggleVoiceRecognition = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.listening) {
                    this.recordAudio();
                }
                else {
                    this.stopListening();
                }
                return [2 /*return*/];
            });
        });
    };
    GroupchatPage.prototype.recordAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var language, matches, showPartial, recognitionOptions_1, bool, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Record Audio is being run!");
                        if (!!this.listening) return [3 /*break*/, 4];
                        language = "en-US";
                        matches = 1;
                        showPartial = true;
                        recognitionOptions_1 = {
                            language: language,
                            matches: matches,
                            showPartial: showPartial
                        };
                        return [4 /*yield*/, this.speechRecognition.isRecognitionAvailable()];
                    case 1:
                        bool = _a.sent();
                        if (!bool) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.speechRecognition.hasPermission()];
                    case 2:
                        res = _a.sent();
                        if (res) {
                            this.startListening(recognitionOptions_1);
                        }
                        else {
                            this.speechRecognition.requestPermission().then(function () {
                                _this.startListening(recognitionOptions_1);
                            }, function () {
                                _this.presentToast("Voice recognition is not activated.", 3000);
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this.presentToast("Voice recognition is not available.", 3000);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.startListening = function (options) {
        var _this = this;
        this.listening = true;
        this.presentToast("Begin Voice Recognition", null);
        this.speechRecognition.startListening(options).subscribe(function (matches) {
            //There is a difference between Android and iOS platforms. On Android speech recognition stops when the speaker finishes speaking (at end of sentence). On iOS the user has to stop manually the recognition process by calling stopListening() method.
            _this.zone.run(function () {
                _this.composedMessage = matches[0];
            });
            if (_this.platform.is('android')) { //for android only.
                _this.listening = false;
                _this.audioToast.dismiss();
            }
        }, function (onerror) {
            console.log('error:', onerror);
            _this.listening = false;
            _this.audioToast.dismiss();
        });
    };
    GroupchatPage.prototype.stopListening = function () {
        this.speechRecognition.stopListening();
        this.listening = false;
        this.audioToast.dismiss();
    };
    GroupchatPage.prototype.openRestvoFeature = function (moment) {
        return __awaiter(this, void 0, void 0, function () {
            var params, componentProps, modal, refreshNeeded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(moment.resource.field === "Location")) return [3 /*break*/, 1];
                        window.open("http://maps.google.com/?q=" + moment.matrix_number[0] + "+%2C" + moment.matrix_number[1], '_blank');
                        return [3 /*break*/, 6];
                    case 1:
                        params = void 0;
                        componentProps = void 0;
                        params = {};
                        componentProps = { moment: moment, modalPage: true };
                        if (moment.calendar && moment.calendar._id && moment.categories.includes('5e1bbda67b00ea76b75e5a73')) { // only include calendar ID for Content
                            params.calendarId = moment.calendar._id;
                            componentProps.calendarId = moment.calendar._id;
                        }
                        if (this.chatService.currentChatProps[this.propIndex].moment) {
                            params.relationshipId = this.chatService.currentChatProps[this.propIndex].moment._id;
                            componentProps.relationshipId = this.chatService.currentChatProps[this.propIndex].moment._id;
                        }
                        if (!(this.platform.width() >= 768)) return [3 /*break*/, 2];
                        this.router.navigate(['/app/activity/' + moment._id, params], { replaceUrl: false });
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_22__["ShowfeaturePage"], componentProps: componentProps })];
                    case 3:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 5:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.reloadChatView();
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //end of UI functions
    GroupchatPage.prototype.takePhotoAndUpload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Camera, image, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.moreMediaOptions = false;
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["CameraSource"].Camera,
                                correctOrientation: false
                            })];
                    case 1:
                        image = _a.sent();
                        if (!(this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group.churchId && this.chatService.currentChatProps[this.propIndex].group.churchId.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.awsService.uploadImage('communities', this.chatService.currentChatProps[this.propIndex].group.churchId, image, this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.awsService.uploadImage('users', this.userData.user._id, image, this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 4:
                        result = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(result === "Upload succeeded")) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.storage.set('media-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.awsService.sessionAssets[this.chatService.currentChatProps[this.propIndex].conversationId])];
                    case 6:
                        _a.sent(); //store the unsent media
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.selectPhotoFromDeviceAndUpload = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result, Camera, image, compressed, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.moreMediaOptions = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 15, , 16]);
                        result = void 0;
                        if (!this.platform.is('cordova')) return [3 /*break*/, 7];
                        Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].Camera;
                        return [4 /*yield*/, Camera.getPhoto({
                                quality: 60,
                                width: 1280,
                                allowEditing: false,
                                resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["CameraResultType"].DataUrl,
                                source: _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["CameraSource"].Photos,
                                correctOrientation: false
                            })];
                    case 2:
                        image = _a.sent();
                        if (!(this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group.churchId && this.chatService.currentChatProps[this.propIndex].group.churchId.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.awsService.uploadImage('communities', this.chatService.currentChatProps[this.propIndex].group.churchId, image, this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 3:
                        result = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.awsService.uploadImage('users', this.userData.user._id, image, this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 5:
                        result = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.awsService.compressPhoto(event.target.files[0])];
                    case 8:
                        compressed = _a.sent();
                        if (!(this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group.churchId && this.chatService.currentChatProps[this.propIndex].group.churchId.length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.awsService.uploadFile('communities', this.chatService.currentChatProps[this.propIndex].group.churchId, compressed, this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 9:
                        result = _a.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.awsService.uploadFile('users', this.userData.user._id, compressed, this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 11:
                        result = _a.sent();
                        _a.label = 12;
                    case 12:
                        if (!(result === "Upload succeeded")) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.storage.set('media-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.awsService.sessionAssets[this.chatService.currentChatProps[this.propIndex].conversationId])];
                    case 13:
                        _a.sent(); //store the unsent media
                        _a.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        err_6 = _a.sent();
                        console.log(err_6);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.selectFileFromDeviceAndUpload = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result, largeFileAlert, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.moreMediaOptions = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        result = void 0;
                        if (!(event.target.files[0].size < 50000000)) return [3 /*break*/, 8];
                        console.log("uploading file: ", event.target.files[0]);
                        if (!(this.chatService.currentChatProps[this.propIndex].group && this.chatService.currentChatProps[this.propIndex].group.churchId && this.chatService.currentChatProps[this.propIndex].group.churchId.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.awsService.uploadFile('communities', this.chatService.currentChatProps[this.propIndex].group.churchId, event.target.files[0], this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.awsService.uploadFile('users', this.userData.user._id, event.target.files[0], this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 4:
                        result = _a.sent();
                        _a.label = 5;
                    case 5:
                        console.log("result", result);
                        if (!(result === "Upload succeeded")) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.storage.set('media-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.awsService.sessionAssets[this.chatService.currentChatProps[this.propIndex].conversationId])];
                    case 6:
                        _a.sent(); //store the unsent media
                        _a.label = 7;
                    case 7: return [3 /*break*/, 11];
                    case 8: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'File Too Large',
                            subHeader: 'Your file exceeds the maximum file size limit of 50 megabytes.',
                            buttons: ['Dismiss'],
                            cssClass: 'level-15'
                        })];
                    case 9:
                        largeFileAlert = _a.sent();
                        return [4 /*yield*/, largeFileAlert.present()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_7 = _a.sent();
                        console.log(err_7);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.selectCalendarItem = function (event, calendarItem) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedCalendar, selectedMoment, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        this.moreMediaOptions = false;
                        selectedCalendar = JSON.parse(JSON.stringify(calendarItem));
                        selectedMoment = JSON.parse(JSON.stringify(calendarItem.moment));
                        selectedCalendar.moment = selectedMoment._id;
                        selectedMoment.calendar = selectedCalendar;
                        if (this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId) {
                            index = this.chatService.conversations.map(function (c) { return c.conversation._id; }).indexOf(this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId);
                            if (index > -1) {
                                selectedMoment.conversations = [this.chatService.conversations[index]];
                            }
                        }
                        this.selectedMoments.push(selectedMoment);
                        return [4 /*yield*/, this.storage.set('moment-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.selectedMoments)];
                    case 1:
                        _a.sent(); //store the unsent moment
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.openPickFeature = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_7, _a, e_8, _b, e_9, _c, modal, moments, sampleMoments, sampleMoments_1, sampleMoments_1_1, sampleMoment, clonedMoments, clonedMoments_1, clonedMoments_1_1, clonedMoment, index, moments_1, moments_1_1, moment, index, err_8;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_pickfeature_popover_pickfeature_popover_page__WEBPACK_IMPORTED_MODULE_20__["PickfeaturePopoverPage"], componentProps: { title: 'Choose from Library', conversationId: this.chatService.currentChatProps[this.propIndex].conversationId } })];
                    case 1:
                        modal = _d.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        moments = (_d.sent()).data;
                        if (!(moments && moments.length)) return [3 /*break*/, 7];
                        sampleMoments = moments.filter(function (c) { return c.type === 'new'; });
                        if (!(sampleMoments && sampleMoments.length)) return [3 /*break*/, 5];
                        try {
                            for (sampleMoments_1 = __values(sampleMoments), sampleMoments_1_1 = sampleMoments_1.next(); !sampleMoments_1_1.done; sampleMoments_1_1 = sampleMoments_1.next()) {
                                sampleMoment = sampleMoments_1_1.value;
                                sampleMoment.calendar = {
                                    title: sampleMoment.matrix_string[0][0],
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
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (sampleMoments_1_1 && !sampleMoments_1_1.done && (_a = sampleMoments_1.return)) _a.call(sampleMoments_1);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                        return [4 /*yield*/, this.momentService.clone(sampleMoments, null)];
                    case 4:
                        clonedMoments = _d.sent();
                        if (clonedMoments) {
                            try {
                                for (clonedMoments_1 = __values(clonedMoments), clonedMoments_1_1 = clonedMoments_1.next(); !clonedMoments_1_1.done; clonedMoments_1_1 = clonedMoments_1.next()) {
                                    clonedMoment = clonedMoments_1_1.value;
                                    clonedMoment.type = 'new';
                                    index = moments.map(function (moment) { return moment.resource._id; }).indexOf(clonedMoment.resource);
                                    if (index > -1) {
                                        clonedMoment.resource = moments[index].resource; // clone the populated resource
                                        moments.splice(index, 1, clonedMoment);
                                    }
                                }
                            }
                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
                            finally {
                                try {
                                    if (clonedMoments_1_1 && !clonedMoments_1_1.done && (_b = clonedMoments_1.return)) _b.call(clonedMoments_1);
                                }
                                finally { if (e_8) throw e_8.error; }
                            }
                        }
                        _d.label = 5;
                    case 5:
                        try {
                            for (moments_1 = __values(moments), moments_1_1 = moments_1.next(); !moments_1_1.done; moments_1_1 = moments_1.next()) {
                                moment = moments_1_1.value;
                                index = this.calendarService.calendarItems.map(function (c) { return c.moment && c.moment._id; }).indexOf(moment._id);
                                if (index > -1) {
                                    this.selectedMoments.push(this.calendarService.calendarItems[index].moment);
                                }
                                else {
                                    console.log("Cannot find Activity in Calendar");
                                }
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (moments_1_1 && !moments_1_1.done && (_c = moments_1.return)) _c.call(moments_1);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                        this.moreMediaOptions = false;
                        return [4 /*yield*/, this.storage.set('moment-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.selectedMoments)];
                    case 6:
                        _d.sent(); //store the unsent moment
                        _d.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_8 = _d.sent();
                        console.log(err_8);
                        this.networkService.showNoNetworkAlert();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.recalculateScrollContent = function () {
        /*setTimeout(()=>{
            //this.content.resize();
            setTimeout(async () => {
                const scroll = await this.content.getScrollElement();
                const scrollDistance = this.moreOptions ? scroll.scrollTop + 186 : scroll.scrollTop - 186;
                this.content.scrollByPoint(0, scrollDistance, 5);
            }, 5);
        }, 5);*/
    };
    GroupchatPage.prototype.resetBadge = function (conversationId, refreshMyConversations) {
        return __awaiter(this, void 0, void 0, function () {
            var count, badge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        badge = this.chatService.currentChatProps && this.chatService.currentChatProps.length > this.propIndex && this.chatService.currentChatProps[this.propIndex].badge;
                        if (!(this.networkService.hasNetwork && badge)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.chatService.resetBadgeCount(conversationId)];
                    case 1:
                        count = _a.sent();
                        this.chatService.currentChatProps[this.propIndex].badge = 0;
                        if (refreshMyConversations) {
                            this.userData.refreshMyConversations({ action: 'reload', data: conversationId });
                        }
                        if (count) {
                            if (this.platform.is('cordova') && this.userData.user.enablePushNotification) {
                                this.badge.decrease(count);
                            }
                            if (this.electronService.isElectronApp) {
                                this.electronService.ipcRenderer.send('SYSTEM_TRAY:::SET_BADGE', (this.chatService.connectTabBadge > -1) ? this.chatService.connectTabBadge : 0);
                            }
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, count];
                }
            });
        });
    };
    GroupchatPage.prototype.seeMoreInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groupinfoModal, refreshNeeded, modal, refreshNeeded, recipientModal, closeMessage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.chatService.currentChatProps[this.propIndex].group) return [3 /*break*/, 6];
                        if (!this.modalPage) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _groupinfo_groupinfo_page__WEBPACK_IMPORTED_MODULE_24__["GroupinfoPage"], componentProps: { modalPage: true } })];
                    case 1:
                        groupinfoModal = _a.sent();
                        return [4 /*yield*/, groupinfoModal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, groupinfoModal.onDidDismiss()];
                    case 3:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        this.router.navigate(['/app/myconversations/group'], { skipLocationChange: true });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 17];
                    case 6:
                        if (!this.chatService.currentChatProps[this.propIndex].moment) return [3 /*break*/, 12];
                        if (!this.modalPage) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.modalCtrl.create({ component: _feature_showfeature_showfeature_page__WEBPACK_IMPORTED_MODULE_22__["ShowfeaturePage"], componentProps: { moment: { _id: this.chatService.currentChatProps[this.propIndex].moment._id }, modalPage: true } })];
                    case 7:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 9:
                        refreshNeeded = (_a.sent()).data;
                        if (refreshNeeded) {
                            this.closeModal(true);
                        }
                        return [3 /*break*/, 11];
                    case 10:
                        this.router.navigate(['/app/myconversations/activity/' + this.chatService.currentChatProps[this.propIndex].moment._id], { skipLocationChange: true });
                        _a.label = 11;
                    case 11: return [3 /*break*/, 17];
                    case 12:
                        if (!this.modalPage) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_19__["ShowrecipientinfoPage"],
                                componentProps: { recipient: this.chatService.currentChatProps[this.propIndex].recipient, modalPage: true }
                            })];
                    case 13:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, recipientModal.onDidDismiss()];
                    case 15:
                        closeMessage = (_a.sent()).data;
                        if (closeMessage) {
                            console.log("close modal");
                            setTimeout(function () {
                                _this.closeModal(true);
                            }, 500); // need to give one sec delay for modalCtrl to clear up the previous modal box
                        }
                        return [3 /*break*/, 17];
                    case 16:
                        this.router.navigate(['/app/myconversations/person/' + this.chatService.currentChatProps[this.propIndex].recipient._id]);
                        _a.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.presentPopover = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var popover, closeMessage;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        if (!this.chatService.currentChatProps[this.propIndex].group) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.popoverCtrl.create({
                                component: _group_popover_group_popover_page__WEBPACK_IMPORTED_MODULE_21__["GroupPopoverPage"],
                                componentProps: { group: this.chatService.currentChatProps[this.propIndex].group },
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
                            console.log("close group modal");
                            setTimeout(function () {
                                _this.closeModal(true);
                            }, 500); // need to give one sec delay for modalCtrl to clear up the previous modal box
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        this.seeMoreInfo();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.shareLocation = function () {
        var _this = this;
        //Find the device's location
        this.geolocation.getCurrentPosition().then(function (position) {
            var yourPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log("Geolocation Latitude is: " + yourPosition.lat + "Longitude is: " + yourPosition.lng);
            //this.updateMap(yourPosition);
            var matNum = [yourPosition.lat.toString(), yourPosition.lng.toString()];
            var matStr = ["https://maps.locationiq.com/v2/staticmap?key=pk.e5797fe100f9aa5732d5346f742b243f&center=" + yourPosition.lat.toString() + "," + yourPosition.lng.toString() + "&zoom=20&maptype=roadmap&markers=icon:%20large-red-cutout%20|" + yourPosition.lat.toString() + "," + yourPosition.lng.toString()];
            _this.resourceService.load('en-US', "Location").subscribe(function (result) { return __awaiter(_this, void 0, void 0, function () {
                var serverData, createdMoment, index;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            serverData = {
                                comment: [''],
                                notifyAt: new Date().toISOString(),
                                matrix_string: matStr,
                                matrix_number: matNum,
                                conversation: this.chatService.currentChatProps[this.propIndex].conversationId,
                                resource: {}
                            };
                            serverData.resource = result[0]._id;
                            return [4 /*yield*/, this.momentService.create(serverData)];
                        case 1:
                            createdMoment = _a.sent();
                            createdMoment.resource = result[0]; // repopulate resource
                            index = this.chatService.conversations.map(function (c) { return c.conversation._id; }).indexOf(this.chatService.currentChatProps[this.propIndex].conversationId);
                            if (index > -1) {
                                createdMoment.conversations = [this.chatService.conversations[index]];
                            }
                            return [4 /*yield*/, this.momentService.share(createdMoment)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }).catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
            var networkAlert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Error getting location', err);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Please enable Location Services',
                                subHeader: 'This function runs best when location services are turned on for your device and this app. You can enable them in Settings',
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
    };
    GroupchatPage.prototype.focusPhoto = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({ component: _connect_focus_photo_focus_photo_page__WEBPACK_IMPORTED_MODULE_18__["FocusPhotoPage"], componentProps: { imageUri: object } })];
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
    GroupchatPage.prototype.focusText = function () {
        this.moreOptions = false;
    };
    GroupchatPage.prototype.prepareToShareContactInfo = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result, hasSharedContact, recipientModal, action, state, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.chatService.getConversationByRecipientId(this.chatService.currentChatProps[this.propIndex].recipient._id, false, null)];
                    case 1:
                        result = _a.sent();
                        hasSharedContact = false;
                        if (result.length) {
                            hasSharedContact = result[0].shareContactBy.indexOf(this.userData.user._id.toString()) > -1;
                        }
                        return [4 /*yield*/, this.modalCtrl.create({ component: _user_profile_profile_page__WEBPACK_IMPORTED_MODULE_23__["ProfilePage"], componentProps: { mode: hasSharedContact ? "cancel share" : "share", recipient: this.chatService.currentChatProps[this.propIndex].recipient, modalPage: true } })];
                    case 2:
                        recipientModal = _a.sent();
                        return [4 /*yield*/, recipientModal.present()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, recipientModal.onDidDismiss()];
                    case 4:
                        action = (_a.sent()).data;
                        if (!(action === 'share')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.chatService.shareContactInfo(this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 5:
                        state = _a.sent();
                        if (!(state === 1)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.createContactMessage(1)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 11];
                    case 8:
                        if (!(action === 'cancel share')) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.chatService.shareContactInfo(this.chatService.currentChatProps[this.propIndex].conversationId)];
                    case 9:
                        state = _a.sent();
                        if (!(state === 0)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.createContactMessage(0)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        this.moreOptions = false;
                        this.recalculateScrollContent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.createContactMessage = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var err_9, networkAlert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 1, , 4]);
                        this.resourceService.load('en-US', "Contact").subscribe(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var serverData, createdMoment, index;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        serverData = { comment: [''], notifyAt: new Date().toISOString(), matrix_string: [['']], matrix_number: [[]], conversation: this.chatService.currentChatProps[this.propIndex].conversationId, resource: {} };
                                        serverData.resource = result[0]._id;
                                        serverData.matrix_number = [[state]];
                                        return [4 /*yield*/, this.momentService.create(serverData)];
                                    case 1:
                                        createdMoment = _a.sent();
                                        createdMoment.resource = result[0]; // repopulate resource
                                        index = this.chatService.conversations.map(function (c) { return c.conversation._id; }).indexOf(this.chatService.currentChatProps[this.propIndex].conversationId);
                                        if (index > -1) {
                                            createdMoment.conversations = [this.chatService.conversations[index]];
                                        }
                                        return [4 /*yield*/, this.momentService.share(createdMoment)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 1:
                        err_9 = _a.sent();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'No Internet this.connection',
                                subHeader: 'Please check your internet this.connection.',
                                buttons: ['Dismiss'],
                                cssClass: 'level-15'
                            })];
                    case 2:
                        networkAlert = _a.sent();
                        return [4 /*yield*/, networkAlert.present()];
                    case 3:
                        _a.sent();
                        this.noNetwork = true;
                        console.log(err_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.seeUserInfo = function (event, recipient) {
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
                    case 1: return [4 /*yield*/, this.modalCtrl.create({ component: _connect_showrecipientinfo_showrecipientinfo_page__WEBPACK_IMPORTED_MODULE_19__["ShowrecipientinfoPage"], componentProps: { recipient: recipient, modalPage: true } })];
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
    GroupchatPage.prototype.startVideoChat = function () {
        // only PWA needs to expand chat view. native app will show the native Jitsi view
        if (this.modalPage && !this.platform.is('cordova')) {
            this.expandChatView(true);
        }
        else {
            this.chatService.toggleVideoChat({
                videoChatRoomId: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].conversationId,
                videoChatRoomSubject: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1].name,
                channelLastN: '6',
                startWithAudioMuted: false,
                startWithVideoMuted: false
            });
        }
    };
    GroupchatPage.prototype.presentToast = function (text, duration) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.toastCtrl.create({
                                message: text,
                                duration: duration,
                                position: 'top'
                            })];
                    case 1:
                        _a.audioToast = _b.sent();
                        this.audioToast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.expandChatView = function (startVideoChat) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.chatService.currentChatProps.push(this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]);
                this.closeModal(false);
                setTimeout(function () {
                    _this.router.navigate(['/app/myconversations/chat']);
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
    GroupchatPage.prototype.removeMoment = function (i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.selectedMoments[i] && this.selectedMoments[i]._id && this.selectedMoments[i].type === 'new') {
                            console.log("remove cloned Activity");
                            this.removedMoments.push(this.selectedMoments[i]);
                        }
                        this.selectedMoments.splice(i, 1);
                        return [4 /*yield*/, this.storage.set('moment-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.selectedMoments)];
                    case 1:
                        _a.sent(); // store the unsent media
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.removeMedia = function (i) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.awsService.sessionAssets.hasOwnProperty(this.chatService.currentChatProps[this.propIndex].conversationId) && this.awsService.sessionAssets[this.chatService.currentChatProps[this.propIndex].conversationId].length)) return [3 /*break*/, 2];
                        url = JSON.parse(JSON.stringify(this.awsService.sessionAssets[this.chatService.currentChatProps[this.propIndex].conversationId][i]));
                        this.awsService.sessionAssets[this.chatService.currentChatProps[this.propIndex].conversationId].splice(i, 1);
                        return [4 /*yield*/, this.storage.set('media-' + this.chatService.currentChatProps[this.propIndex].conversationId, this.awsService.sessionAssets[this.chatService.currentChatProps[this.propIndex].conversationId].filter(function (c) { return c && c.length; }))];
                    case 1:
                        _a.sent(); // store the unsent media
                        if (url) {
                            this.awsService.removeFile(url);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    GroupchatPage.prototype.customTrackBy = function (index, item) {
        return index;
    };
    GroupchatPage.prototype.destroyPlayers = function (mediaId) {
        var e_10, _a;
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
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
    };
    // close modal should only be execute by a Modal Page, since Chat is always embedded in the Myconversations page in Desktop view
    GroupchatPage.prototype.closeModal = function (refreshNeeded) {
        return __awaiter(this, void 0, void 0, function () {
            var currentChatId, err_10;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cleanup(false)];
                    case 1:
                        currentChatId = _a.sent();
                        //  clean up the chat props
                        this.chatService.currentChatProps.pop(); // pop the current chat props. Once that is done, currentChatProps can't be referenced again in the code below. Use currentChatId
                        if (this.modalPage) {
                            this.modalCtrl.dismiss(refreshNeeded);
                            this.userData.refreshMyConversations({ action: 'reload', conversationId: currentChatId });
                        }
                        else {
                            setTimeout(function () {
                                _this.router.navigate(['/app/myconversations/chat']);
                                _this.userData.refreshMyConversations({ action: 'reload chat view' });
                            }, 500);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_10 = _a.sent();
                        console.log(err_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GroupchatPage.prototype.ngOnDestroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
                // execute when group-tab is exited
                this.subscriptions['refreshMyConversations'].unsubscribe(this.reloadHandler);
                this.subscriptions['refreshMoment'].unsubscribe(this.refreshMomentHandler);
                // when a new message comes in via socket.io
                this.subscriptions['chatMessage'].unsubscribe(this.incomingMessageHandler);
                return [2 /*return*/];
            });
        });
    };
    GroupchatPage.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_2__["ElectronService"] },
        { type: ionic_cache__WEBPACK_IMPORTED_MODULE_3__["CacheService"] },
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"] },
        { type: _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_6__["Badge"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"] },
        { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_8__["Geolocation"] },
        { type: _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_7__["SpeechRecognition"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ActionSheetController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ModalController"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["PopoverController"] },
        { type: _services_group_service__WEBPACK_IMPORTED_MODULE_16__["Groups"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_26__["Auth"] },
        { type: _services_user_service__WEBPACK_IMPORTED_MODULE_11__["UserData"] },
        { type: _services_chat_service__WEBPACK_IMPORTED_MODULE_10__["Chat"] },
        { type: _services_aws_service__WEBPACK_IMPORTED_MODULE_12__["Aws"] },
        { type: _services_network_service_service__WEBPACK_IMPORTED_MODULE_13__["NetworkService"] },
        { type: _services_calendar_service__WEBPACK_IMPORTED_MODULE_25__["CalendarService"] },
        { type: _services_response_service__WEBPACK_IMPORTED_MODULE_14__["Response"] },
        { type: _services_moment_service__WEBPACK_IMPORTED_MODULE_15__["Moment"] },
        { type: _services_resource_service__WEBPACK_IMPORTED_MODULE_17__["Resource"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_9__["IonContent"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["IonContent"])
    ], GroupchatPage.prototype, "content", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_9__["IonInfiniteScroll"], { static: false }),
        __metadata("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["IonInfiniteScroll"])
    ], GroupchatPage.prototype, "infiniteScroll", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GroupchatPage.prototype, "modalPage", void 0);
    GroupchatPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-groupchat',
            template: __importDefault(__webpack_require__(/*! raw-loader!./groupchat.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/group/groupchat/groupchat.page.html")).default,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: [__importDefault(__webpack_require__(/*! ./groupchat.page.scss */ "./src/app/pages/group/groupchat/groupchat.page.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_electron__WEBPACK_IMPORTED_MODULE_2__["ElectronService"],
            ionic_cache__WEBPACK_IMPORTED_MODULE_3__["CacheService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_5__["Storage"],
            _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_6__["Badge"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_8__["Geolocation"],
            _ionic_native_speech_recognition_ngx__WEBPACK_IMPORTED_MODULE_7__["SpeechRecognition"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ActionSheetController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["PopoverController"],
            _services_group_service__WEBPACK_IMPORTED_MODULE_16__["Groups"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_26__["Auth"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_11__["UserData"],
            _services_chat_service__WEBPACK_IMPORTED_MODULE_10__["Chat"],
            _services_aws_service__WEBPACK_IMPORTED_MODULE_12__["Aws"],
            _services_network_service_service__WEBPACK_IMPORTED_MODULE_13__["NetworkService"],
            _services_calendar_service__WEBPACK_IMPORTED_MODULE_25__["CalendarService"],
            _services_response_service__WEBPACK_IMPORTED_MODULE_14__["Response"],
            _services_moment_service__WEBPACK_IMPORTED_MODULE_15__["Moment"],
            _services_resource_service__WEBPACK_IMPORTED_MODULE_17__["Resource"]])
    ], GroupchatPage);
    return GroupchatPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~board-communityboard-communityboard-module~connect-myconversations-myconversations-module~gr~29966ac3.js.map