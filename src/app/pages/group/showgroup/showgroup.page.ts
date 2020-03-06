import {Component, OnInit, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Router } from '@angular/router';
import { AlertController, Events, ModalController, PopoverController} from '@ionic/angular';
import { UserData } from '../../../services/user.service';
import { Groups } from "../../../services/group.service";
import { ShowrecipientinfoPage } from "../../connect/showrecipientinfo/showrecipientinfo.page";
import {Chat} from "../../../services/chat.service";
import {Auth} from "../../../services/auth.service";

@Component({
  selector: 'app-showgroup',
  templateUrl: './showgroup.page.html',
  styleUrls: ['./showgroup.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowgroupPage implements OnInit, OnDestroy {
    subscriptions: any = {};

    user: any;
    loading: any;
    joinGroupTag: boolean = true;
    leadersId: any= [];
    editInfoTag: boolean = false;
    revealEditTag: boolean = false;
    @Input() group: any;

    constructor(  private cache: CacheService,
                  private events: Events,
                  private router: Router,
                  private alertCtrl: AlertController,
                  public modalCtrl: ModalController,
                  private popoverCtrl: PopoverController,
                  public authService: Auth,
                  public userData: UserData,
                  private chatService: Chat,
                  private groupService: Groups) {
    }

  async ngOnInit() {
      this.subscriptions['refreshGroupStatus'] = this.authService.refreshGroupStatus$.subscribe(this.refreshHandler);

      let profile: any;
      if (!this.group.public_group) {
          profile = await this.groupService.loadGroupProfile(this.group._id);
          this.group = profile[0];
      } else {
          profile = await this.groupService.loadPublicGroup(this.group._id);
          this.group = profile[0];
      }
      this.setTag();
  }


    refreshHandler = (res) => {
        if (res) {
            if (res.group._id === this.group._id) {
                this.group = res.group;
                this.setTag();
            } else if (res.conversationId === this.group.conversation) {
                this.setTag();
            }
        }
    };

    setTag() {
        this.joinGroupTag = !this.userData.user.groups.find((group) => group._id === this.group._id);
        console.log("join group", this.joinGroupTag)
    }

    async joinGroup() {
        if (!this.userData.user) {
            this.modalCtrl.dismiss();
            this.router.navigate(['/register', { slide : '0', message: 'To join a group, please sign in or create an account.', exitType: 'slide' }]);
        } else {
            try {
                const data = await this.userData.joinGroup(this.group);
                this.chatService.socket.emit('enter conversation', this.group.conversation, this.userData.user._id, (await this.userData.checkRestExpired() ? { action: 'ping', state: 'online', origin: this.chatService.socket.id } : null));
                setTimeout(async () => {
                    if(await this.userData.checkRestExpired()) this.chatService.socket.emit('online status', this.group.conversation, this.userData.user._id, { action: 'ping', state: 'online' });
                }, 1000);
                if (data === "cancel") return;
                const alert = await this.alertCtrl.create({
                    header: 'Success',
                    message: 'You have joined ' + this.group.name + (this.group.board ? '. You can access its board posts via the Board page.' : '.'),
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            const navTransition = alert.dismiss();
                            navTransition.then(() => {
                                this.authService.refreshGroupStatus({conversationId: this.group.conversation, data: this.group});
                            });
                        }}],
                    cssClass: 'level-15'
                });
                await alert.present();
            } catch (err){
                this.noNetworkConnection();
                console.log("failed to add to My Community");
            }
        }
    }

    async seeUserInfo(event, user) {
        if (!this.userData.user) return
        event.stopPropagation();
        user.name = user.first_name + ' ' + user.last_name;
        const recipientModal = await this.modalCtrl.create({component: ShowrecipientinfoPage, componentProps: {recipient: user, modalPage: true}});
        await recipientModal.present();
        const {data: refreshNeeded} = await recipientModal.onDidDismiss();
        if (refreshNeeded) {
        }
    }

    async noNetworkConnection(){
        const networkAlert = await this.alertCtrl.create({
            header: 'No Internet Connection',
            message: 'Please check your internet connection.',
            buttons: ['Dismiss'],
            cssClass: 'level-15'
        });
        await networkAlert.present();
    }

    ngOnDestroy(){
        this.subscriptions['refreshGroupStatus'].unsubscribe(this.refreshHandler);
    }
}
