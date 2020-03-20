import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { UserData } from "../../../services/user.service";
import {ModalController} from "@ionic/angular";
import {Location} from "@angular/common";


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit, OnDestroy {

    @Input() modalPage: any;

    subscriptions: any = {};
    UIenabledPushNotification: boolean;
    UIpushNotifyUnreadChatMessages: boolean;
    UIpushNotifySystemMessages: boolean;
    UIemailNotifyUnreadChatMessages: boolean;
    UIemailNotifySystemMessages: boolean;

    constructor(public userData: UserData,
                private location: Location,
                private modalCtrl: ModalController) { }

    async ngOnInit() {
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
    }

    refreshUserStatusHandler = async () => {
        if (this.userData && this.userData.user) {
            await this.prepareUserSettings();
        }
        this.userData.splitPaneState = 'md';
    };

    async prepareUserSettings() {
        this.UIpushNotifyUnreadChatMessages = this.userData.user.pushNotifyUnreadChatMessages;
        this.UIpushNotifySystemMessages = this.userData.user.pushNotifySystemMessages;
        this.UIemailNotifyUnreadChatMessages = this.userData.user.emailNotifyUnreadChatMessages;
        this.UIemailNotifySystemMessages = this.userData.user.emailNotifySystemMessages;
    }

    async saveChange(type, event) {
        if (type === 'Push') {
            if (event.detail.value !== 'none') { // when toggling it on
                await this.userData.checkPushNotification(); // if success, will send an event to refresh the userData.user
            }
        }
        // save user notification settings
        const userData = {
            pushNotifyUnreadChatMessages: this.UIpushNotifyUnreadChatMessages,
            pushNotifySystemMessages: this.UIpushNotifySystemMessages,
            emailNotifyUnreadChatMessages: this.UIemailNotifyUnreadChatMessages,
            emailNotifySystemMessages: this.UIemailNotifySystemMessages
        };
        await this.userData.update(userData);
    }

    async togglePushNotification() {
        if (this.userData && this.userData.user) {
            if (this.UIenabledPushNotification) { // when toggling it on
                const result = await this.userData.checkPushNotification(); // if success, will send an event to refresh the userData.user
                if (!result) {
                    this.UIenabledPushNotification = false;
                }
            }
        }
    }

    closeModal() {
        if (this.modalPage) {
            this.modalCtrl.dismiss();
        } else {
            this.location.back();
        }
    }

    ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
    }
}
