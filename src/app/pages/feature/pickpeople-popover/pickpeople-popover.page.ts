import {Component, OnInit, Input, ViewEncapsulation, ViewChild} from '@angular/core';
import {AlertController, NavParams, IonSearchbar, ModalController, Platform, IonInfiniteScroll} from '@ionic/angular';
import { CalendarService } from '../../../services/calendar.service';
import { UserData } from "../../../services/user.service";
import {Chat} from "../../../services/chat.service";
import {Plugins} from "@capacitor/core";
import {NetworkService} from "../../../services/network-service.service";
import {Churches} from "../../../services/church.service";

@Component({
  selector: 'app-pickpeople-popover',
  templateUrl: './pickpeople-popover.page.html',
  styleUrls: ['./pickpeople-popover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PickpeoplePopoverPage implements OnInit {
    @ViewChild('searchbar', {static: false}) searchbar: IonSearchbar;
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

    @Input() filter: any;
    @Input() includeSelf: any;
    @Input() title: any;
    @Input() action: any;
    @Input() moment: any;
    @Input() invitationType = 'user_list_1';

    shareLink = '';
    hasOrganizerAccess = false;
    totalSelected: number = 0;
    conversations = [];
    selectedConversations = [];
    searchKeyword = '';
    displayFriendList: boolean = false;
    listOfAppUsers: any = [];
    selectedAppUsers: any = [];
    listOfFriends: any = [];
    allFriends: any = [];
    reachedEnd = false;
    pageNum = 0;
    participantLabel = 'Participant';
    organizerLabel = 'Organizer';
    leaderLabel = 'Leader';
    participantsLabel = 'Participants';
    organizersLabel = 'Organizers';
    leadersLabel = 'Leaders';
    ionSpinner: boolean = true;
    churchId: string = '';
    selfConversationObj: any;

    constructor(
        public alertCtrl: AlertController,
        private networkService: NetworkService,
        public platform: Platform,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public calendarService: CalendarService,
        public userData: UserData,
        public chatService: Chat,
        public churchService: Churches,
    ) {
        this.selectedConversations = JSON.parse(JSON.stringify(this.navParams.get('conversations')));
    }

  async ngOnInit() {
      this.action = this.action || 'Search';
      this.filter = this.filter || 'connect';
      this.title = this.title || '';
      this.includeSelf = this.includeSelf || false;
      this.churchId = this.userData.user.churches[this.userData.currentCommunityIndex]._id;

      if (this.moment) {
          this.shareLink = this.networkService.webapp_domain + '/app/activity/' + this.moment._id + ';type=2';
          if (this.moment.user_list_2 && this.moment.user_list_2.length && this.moment.user_list_2[0] && typeof this.moment.user_list_2[0] === 'object') { // if user_list is populated, i.e. array of objects
              this.hasOrganizerAccess = this.moment.user_list_2.map((c) => c._id).includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
          } else if (this.moment.user_list_2 && this.moment.user_list_2.length && this.moment.user_list_2[0] && typeof this.moment.user_list_2[0] === 'string') { // if user_list is not populated, i.e. array of strings
              this.hasOrganizerAccess = this.moment.user_list_2.includes(this.userData.user._id) || ['owner', 'admin', 'staff'].includes(this.userData.user.role);
          } else {
              this.hasOrganizerAccess = ['owner', 'admin', 'staff'].includes(this.userData.user.role);
          }
          // setup People (10500) labels
          const peopleComponentId = this.moment.resource.matrix_number[0].indexOf(10500);
          if (peopleComponentId > -1) {
              this.participantLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 2 && this.moment.matrix_string[peopleComponentId][2] ? this.moment.matrix_string[peopleComponentId][2] : this.moment.resource['en-US'].matrix_string[peopleComponentId][4];
              this.organizerLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 4 && this.moment.matrix_string[peopleComponentId][4] ? this.moment.matrix_string[peopleComponentId][4] : this.moment.resource['en-US'].matrix_string[peopleComponentId][6];
              this.leaderLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 0 && this.moment.matrix_string[peopleComponentId][0] ? this.moment.matrix_string[peopleComponentId][0] : this.moment.resource['en-US'].matrix_string[peopleComponentId][8];
              this.participantsLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 3 && this.moment.matrix_string[peopleComponentId][3] ? this.moment.matrix_string[peopleComponentId][3] : this.moment.resource['en-US'].matrix_string[peopleComponentId][5];
              this.organizersLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 5 && this.moment.matrix_string[peopleComponentId][5] ? this.moment.matrix_string[peopleComponentId][5] : this.moment.resource['en-US'].matrix_string[peopleComponentId][7];
              this.leadersLabel = this.moment.matrix_string[peopleComponentId].length && this.moment.matrix_string[peopleComponentId].length > 1 && this.moment.matrix_string[peopleComponentId][1] ? this.moment.matrix_string[peopleComponentId][1] : this.moment.resource['en-US'].matrix_string[peopleComponentId][9];
          }
      }
      this.setupLoadAppUsers();
      await this.renderList();
      this.chatService.conversations.forEach((obj) => {
          const index = this.selectedConversations.map((c) => c.conversation._id).indexOf(obj.conversation._id);
          if (index > -1) {
              obj.select = true;
              if (this.selectedConversations[index].locked) {
                  obj.locked = true;
              }
          }
      });
      // populate the selfConversationObj with user's data. It can be updated by this.selectedConversations if user is selected
      this.selfConversationObj = {
          select: false,
          lock: false,
          conversation: {
              _id: this.userData.user._id, // this is not applicable because such a conversation does not exist. this exception will be handled in chat.service.ts notifyOfInvitation()
              type: 'self',
              updatedAt: new Date().toISOString()
          },
          data: {
              name: this.userData.user.first_name + ' ' + this.userData.user.last_name,
              participant: {
                  _id: this.userData.user._id,
                  first_name: this.userData.user.first_name,
                  last_name: this.userData.user.last_name,
                  avatar: this.userData.user.avatar
              }
          },
      };
      const index = this.selectedConversations.map((c) => c.conversation._id).indexOf(this.userData.user._id);
      if (index > -1) {
          this.selfConversationObj = this.selectedConversations[index];
      }
  }

    setupLoadAppUsers() {
        setTimeout(async () => {
            if (this.hasOrganizerAccess) {
                this.infiniteScroll.disabled = false;
                this.reachedEnd = false;
                this.listOfAppUsers = [];
                this.pageNum = 0;
                this.loadMoreAppUsers({target: this.infiniteScroll});
            }
        }, 50);
    }

    async loadMoreAppUsers(event) {
        this.pageNum++;
        if (!this.reachedEnd) {
            const churchAppUsers: any = await this.churchService.loadChurchAppUsers(this.churchId, this.searchKeyword, this.pageNum);
            this.ionSpinner = false;
            if (!churchAppUsers.length) {
                this.reachedEnd = true;
                event.target.disabled = true;
            } else {
                churchAppUsers.forEach((appuser) => {
                    if (appuser._id !== this.userData.user._id){
                        appuser.name = appuser.first_name + ' ' + appuser.last_name;
                        this.listOfAppUsers.push({_id: appuser._id, name: appuser.name, avatar: appuser.avatar, select: false});
                    }
                });
            }
            event.target.complete();
        } else {
            this.ionSpinner = false;
            event.target.complete();
        }
    }

    /*loadContacts() {
        if (this.platform.is('cordova') && this.userData.user.importContactList) {
            this.contacts.find(['*'], { desiredFields: ['name','phoneNumbers','emails'], multiple: true }).then((contacts) => {
                this.ionSpinner = false;
                if (contacts) {
                    contacts.forEach((contact) => {
                        if ((this.type === 'SMS Message') && contact.phoneNumbers){
                            this.all_contact_list.push({type: 'contact', _id: null, name: contact.name.formatted, phoneNumbers: contact.phoneNumbers, select: false, joined: false});
                        } else if ((this.type === 'Email') && contact.emails){
                            this.all_contact_list.push({type: 'contact', _id: null, name: contact.name.formatted, emails: contact.emails, select: false, joined: false});
                        }
                    });
                    this.all_contact_list.sort(function(a,b) {return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0});
                    this.contact_list = this.all_contact_list;
                }
            }, (err) => {
                this.ionSpinner = false;
            });
        } else {
            this.ionSpinner = false;
            this.contact_list = [];
        }
    }*/

    async renderList() {
        this.conversations = [];
        this.chatService.conversations.forEach((obj) => {
            if ((obj.conversation.type === 'connect' || obj.conversation.type === 'self') && obj.data.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                this.conversations.push(obj);
            } else if (obj.conversation.type === 'group' && obj.conversation.group.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                this.conversations.push(obj);
            }
        });
        this.conversations.forEach((obj, index) => { // to do a stable sort next, first remember the order
            obj.order = index;
        });
        this.conversations.sort((a, b) => {
            let badge_diff = b.data.badge - a.data.badge;
            if (badge_diff !== 0) {
                return badge_diff; // only sort when there is an actual difference
            } else {
                return a.order - b.order; // preserve the order
            }
        });
    }

    selectFriend(obj) {
        if (obj.locked) return;
        if (obj.select) {
            obj.select = false;
            this.totalSelected--;
            const index = this.selectedConversations.indexOf(obj);
            this.selectedConversations.splice(index, 1);
        } else {
            obj.select = true;
            this.totalSelected++;
            this.selectedConversations.push(obj);
            this.searchbar.setFocus();
        }
    }

    unselectFriend(obj) {
        if (obj.locked) return;
        this.totalSelected--;
        let index = this.conversations.indexOf(obj);
        if (index > -1) {
            this.conversations[index].select = false;
        }
        if (obj.conversation._id === this.userData.user._id) {
            this.selfConversationObj.select = false;
        }
        index = this.selectedConversations.indexOf(obj);
        if (index > -1) {
            this.selectedConversations.splice(index, 1);
        }
    }

    selectAppUser(person) {
        if (person.select){
            person.select = false;
            this.totalSelected--;
            const index = this.selectedAppUsers.indexOf(person);
            this.selectedAppUsers.splice(index, 1);
        } else {
            person.select = true;
            this.totalSelected++;
            this.selectedAppUsers.unshift(person);
            this.searchKeyword = '';
        }
    }

    unselectAppUser(person){
        this.totalSelected--;
        let index = this.listOfAppUsers.indexOf(person);
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
    }

    executeSearch(event) {
        event.stopPropagation();
        this.renderList();
        this.setupLoadAppUsers();
    }

    cancelSearch(event) {
        event.stopPropagation();
        this.searchKeyword = '';
        this.renderList();
        this.setupLoadAppUsers();
    }

    submitPeople() {
        const newlyAddedConversations = this.selectedConversations.filter((c) => c.select && !c.locked);
        this.modalCtrl.dismiss({type: this.invitationType, conversations: newlyAddedConversations, listOfAppUsers: this.selectedAppUsers});
        this.cleanup();
    }

    async share() {
        try {
            if (this.invitationType === 'user_list_1') { // participants
                this.shareLink = this.networkService.webapp_domain + '/app/activity/' + this.moment._id + ';type=2;' + (this.moment.access_tokens ? 'token=' + this.moment.access_tokens[0] : '');
            } else if (this.invitationType === 'user_list_2' && this.hasOrganizerAccess) { // organizers
                this.shareLink = this.networkService.webapp_domain + '/app/activity/' + this.moment._id + ';type=3;' + (this.moment.access_tokens ? 'token=' + this.moment.access_tokens[1] : '');
            } else if (this.invitationType === 'user_list_3' && this.hasOrganizerAccess) { // leaders
                this.shareLink = this.networkService.webapp_domain + '/app/activity/' + this.moment._id + ';type=4;' + (this.moment.access_tokens ? 'token=' + this.moment.access_tokens[2] : '');
            }
            const { Share } = Plugins;
            await Share.share({
                text: this.shareLink
            });
        } catch (err) {
            console.log(err);
            if (err.name !== 'AbortError') { // handle the special condition when Share was loaded but aborted by user
                try {
                    const {Clipboard} = Plugins;
                    await Clipboard.write({
                        url: this.shareLink
                    });
                    const alert = await this.alertCtrl.create({
                        header: 'Share Link Ready',
                        message: 'The invitation link ' + this.shareLink + 'has been copied to your clipboard.',
                        buttons: ['Dismiss'],
                        cssClass: 'level-15'
                    });
                    await alert.present();
                } catch (err) {
                    console.log(err);
                    const alert = await this.alertCtrl.create({
                        header: 'Invitation Link',
                        message: this.shareLink,
                        buttons: ['Dismiss'],
                        cssClass: 'level-15'
                    });
                    await alert.present();
                }
            }
        }
    }

    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    customTrackBy(index: number, item: any): any {
        return index;
    }

    cleanup() {
        this.selectedConversations = [];
        this.chatService.conversations.forEach((obj) => {
            obj.locked = false;
            obj.select = false;
        });
    }

    close() {
        this.cleanup();
        this.modalCtrl.dismiss(false);
    }
}
