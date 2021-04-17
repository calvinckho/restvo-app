import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Contacts, ContactFieldType } from '@ionic-native/contacts/ngx';
import { AlertController, LoadingController, ModalController, NavParams, Platform } from '@ionic/angular';
import { UserData } from '../../../services/user.service';
import { Churches } from '../../../services/church.service';
import { Auth } from '../../../services/auth.service';

@Component({
  selector: 'app-invitetoconnect',
  templateUrl: './invitetoconnect.page.html',
  styleUrls: ['./invitetoconnect.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvitetoconnectPage implements OnInit {

    @Input() type: any;
    @Input() selectedAppUser: any;
    @Input() church: any;
    @Input() group: any;

    page: number = 1;
    title = '';
    selectedChurch: any;
    selectedChurches: any = [];
    selectedGroup: any;
    selectedGroups: any = [];
    name: string = '';
    email: string = '';
    mobile_phone: string = '';
    selectCounter: number = 0;
    entryCounter: number = 0;
    totalSelected: number = 0;
    all_contact_list: any = [];
    contact_list: any = [];
    ionSpinner: boolean = true;
    fields: ContactFieldType[];
    searchKeywords: string = '';
    selectedContacts: any = [];
    selectedEmails: any = [];
    selectedPhoneNumbers: any = [];
    selectedAppUsers: any = [];

    mychurches: any = [];
    allmychurches: any = [];
    mygroups: any = [];
    privateGroup: boolean = false;

    refreshNeeded = false;

    constructor(
                private sms: SMS,
                private emailComposer: EmailComposer,
                private contacts: Contacts,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                private navParams: NavParams,
                private platform: Platform,
                private authService: Auth,
                public userData: UserData,
                private churchService: Churches,
    ) {}

    ngOnInit() {
        this.selectedGroup = this.group || null;
        this.selectedChurch = this.church || null;
        this.title = this.type || null;
        console.log("group", this.selectedGroup, this.type);
        if (this.selectedChurch && this.selectedChurch._id){ // in the event the user already selected a community
            this.selectedChurches.push(this.selectedChurch);
        }
        if(this.selectedGroup && this.selectedGroup._id){ // in the event the user already selected a group
            this.selectedGroups.push(this.selectedGroup);
            if(!this.selectedGroup.churchId){
                this.privateGroup = true;
            }
        }
        if(this.selectedAppUser && this.selectedAppUser._id){ //in the event the user has already selected 1 user
            this.selectedAppUser.name = this.selectedAppUser.name || this.selectedAppUser.first_name + " " + this.selectedAppUser.last_name;
            this.selectedAppUsers.push({_id: this.selectedAppUser._id, name: this.selectedAppUser.name});
        }
        this.goToStep1();
    }

    goToStep1() {
        this.loadFriends();
        if (this.type === 'Invite to Community' || this.type === 'Invite to Group'){
            this.loadMyChurches(); // this will skip to page 2
        } else if (this.type !== 'Restvo Users'){
            this.loadContacts();
        }
        setTimeout(() => {
            this.ionSpinner = false;
        }, 10000);
    }

    async loadFriends() {
        let uniqueMemberId = [];
        if (this.selectedChurches.length) {
            if (this.selectedChurches[0].members && this.selectedChurches[0].members.length){
                this.selectedChurches[0].members.forEach((member) => {
                    uniqueMemberId.push(member._id);
                });
            }
        } else if (this.selectedGroups.length) {
            if (this.selectedGroups[0].members && this.selectedGroups[0].members.length){
                this.selectedGroups[0].members.forEach((member) => {
                    uniqueMemberId.push(member._id);
                });
            }
        }
        try {
            const friends: any = await this.userData.loadMyFriends();
            this.ionSpinner = false;
            if (friends){
                friends.forEach((friend) => {
                    if (friend.restvoApp) {
                        this.all_contact_list.push({type: 'appUser', _id: friend._id, name: friend.name, select: false, joined: uniqueMemberId.indexOf(friend._id) > -1});
                    }
                });
                this.all_contact_list.sort(function(a,b) {return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0});
                this.contact_list = this.all_contact_list;
            }
        } catch (err) {
            this.ionSpinner = false;
        }
    }

    loadContacts() {
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
    }

    sendInvitations() {
        this.prepareContacts();
        this.inviteFriends();
        if (this.selectedChurches.length) {
            this.inviteToChurches();
        }
        this.openComposer();
    }

    goToStep2() {
        this.prepareContacts(); // sync logic to prepare all the contacts for uploading
        this.inviteFriends(); // add the pending request entries for non-Restvo Users in Pending collection
        this.loadMyChurches();
    }

    prepareContacts() {
        this.selectedContacts = [];
        this.selectedAppUsers = [];
        if (this.type === "SMS Message" || this.type === 'Restvo Users'){
            this.selectedPhoneNumbers = [];
            this.all_contact_list.forEach((contact) => {
                if (contact.select){
                    if (contact.type === 'contact'){
                        let foundMobile = false;
                        let contactPhones = [];
                        contact.phoneNumbers.forEach((number) => {
                            if (number.type.toLowerCase().indexOf('mobile') > -1 || number.type.toLowerCase().indexOf('cell') > -1) {
                                this.selectedPhoneNumbers.push(number.value);
                                foundMobile = true;
                            }
                            contactPhones.push(number.value);
                        });
                        if (!foundMobile){ //if no mobile or cell label is found, use the first number
                            this.selectedPhoneNumbers.push(contact.phoneNumbers[0].value);
                        }
                        this.selectedContacts.push({name: contact.name, phones: contactPhones});
                    } else if (contact.type === 'appUser'){
                        this.selectedAppUsers.push({_id: contact._id, name: contact.name});
                    }
                }
            });
            if (this.mobile_phone.length && this.name.length){ //check the manual input fields
                this.selectedPhoneNumbers.push(this.mobile_phone);
                this.selectedContacts.push({name: this.name, phones: [this.mobile_phone]})
            }
        } else if (this.type === "Email"){
            this.selectedEmails = [];
            this.all_contact_list.forEach((contact) => {
                if (contact.select){
                    if (contact.type === 'contact'){
                        let contactEmails = [];
                        contact.emails.forEach((email)=> {
                            this.selectedEmails.push(email.value);
                            contactEmails.push(email.value.toLowerCase());
                        });
                        this.selectedContacts.push({name: contact.name, emails: contactEmails})
                    } else if (contact.type === 'appUser'){
                        this.selectedAppUsers.push({_id: contact._id, name: contact.name});
                    }
                }
            });
            if (this.email.length && this.name.length){ //check the manual input fields
                this.selectedEmails.push(this.email);
                this.selectedContacts.push({name: this.name, emails: [this.email]})
            }
        }
    }

    async inviteFriends() {
        const loading = await this.loadingCtrl.create({
            message: 'Processing...'
        });
        loading.present();
        this.userData.inviteFriends({selectedContacts: this.selectedContacts}).subscribe((result) => {
            loading.dismiss();
        }, async (err) => {
            loading.dismiss();
            let errorAlert = await this.alertCtrl.create({
                header: 'Something went wrong...',
                message: 'The server is busy. Please try again later.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            errorAlert.present();
        });
    }

    async loadMyChurches() {
        // push a modal page to collect optional church invitation
        this.searchKeywords = '';
        this.totalSelected = 0;
        this.mychurches = []; //reset the array
        try {
            const mychurches: any = await this.userData.loadMyChurches();
            this.ionSpinner = false;
            mychurches.forEach((church: any) => {
                let groups = [];
                church.groups.forEach((group) => {
                    groups.push({_id: group._id, name: group.name, select: false});
                });
                this.allmychurches.push({_id: church._id, name: church.name, groups: groups, select: false });
            });
            this.mychurches = this.allmychurches;
            if (this.type === 'Invite to Group'){
                this.loadMyGroups(); // skip to step 3
            } else {
                this.loadMyGroups(); // skip to step 3

                /*this.page = 2;
                this.title = "Invite to Community";*/
            }
        } catch (err) {
            console.log("failed to get mychurches data");
        }
    }

    goToStep3() {
        this.loadMyGroups();
    }

    loadMyGroups() {
        this.searchKeywords = '';
        this.selectedChurches = [];
        this.mychurches.forEach((church) => {
            if(church.select){
                this.selectedChurches.push(church);
            }
        });
        if (this.selectedChurches){
            this.inviteToChurches();
        }
        this.page = 3;
        this.title = "Invite to Group";
        this.totalSelected = 0;
    }

    async inviteToChurches() {
        if (this.selectedChurches.length){
            const loading = await this.loadingCtrl.create({
                message: 'Processing...'
            });
            loading.present();
            if (this.selectedAppUsers.length){
                let data = { churches: this.selectedChurches, appUsers: this.selectedAppUsers };
                try{
                    await this.churchService.inviteNewAppUsers(data);
                    this.selectedAppUsers.forEach((appuser) => {
                        this.userData.socket.emit('refresh user status', appuser._id, {type: 'update church participation'});
                    });
                    loading.dismiss();
                    this.refreshNeeded = true;
                    let alert = await this.alertCtrl.create({
                        header: 'Invited ' + this.selectedAppUsers.length + ' Restvo user(s).',
                        message: 'You have successfully invited ' + this.selectedAppUsers.length + ' Restvo user(s) to join ' + this.selectedChurches.length + ' community.',
                        buttons: [{ text: 'Done' }],
                        cssClass: 'level-15'
                    });
                    alert.present();
                } catch (err){
                    loading.dismiss();
                    this.noNetworkConnection();
                    console.log("send invitation to join community failed");
                }
            }
            if (this.selectedContacts.length){
                try {
                    await this.churchService.invitePendingMembers({churches: this.selectedChurches, selectedContacts: this.selectedContacts });
                    loading.dismiss();
                    this.refreshNeeded = true;
                    let alert = await this.alertCtrl.create({
                        header: 'Invited ' + this.selectedContacts.length + ' person(s).',
                        message: 'You have successfully invited ' + this.selectedContacts.length + ' person(s) to join ' + this.selectedChurches.length + ' community.',
                        buttons: [{ text: 'Done' }],
                        cssClass: 'level-15'
                    });
                    alert.present();
                } catch (err){
                    loading.dismiss();
                    this.refreshNeeded = true;
                    let errorAlert = await this.alertCtrl.create({
                        header: 'Something went wrong...',
                        message: 'The server is busy. Please try again later.',
                        buttons: ['Dismiss'],
                        cssClass: 'level-15'
                    });
                    errorAlert.present();
                }
            }
        }
    }

    finish() {
        this.selectedGroups = [];
        this.mychurches.forEach((church) => {
            church.groups.forEach((group) => {
                if (group.select){
                    this.selectedGroups.push(group);
                }
            });
        });
        this.openComposer();
        setTimeout(() => {
            this.modalCtrl.dismiss();
        }, 3000);
    }

    //misc functions
    executeSearch(event){
        if (this.page === 1){
            if (this.searchKeywords.length) {
                this.contact_list = [];
                this.all_contact_list.forEach((contact) => {
                    if (contact.name.toLowerCase().indexOf(this.searchKeywords.toLowerCase()) > -1) {
                        this.contact_list.push(contact);
                    }
                });
            } else {
                this.contact_list = this.all_contact_list;
            }
        } else if (this.page === 2) {
            if (this.searchKeywords.length) {
                this.mychurches = [];
                this.allmychurches.forEach((church) => {
                    if (church.name.toLowerCase().indexOf(this.searchKeywords.toLowerCase()) > -1) {
                        this.mychurches.push(church);
                    }
                });
            } else {
                this.mychurches = this.allmychurches;
            }
        } else if (this.page === 3) {
            if (this.searchKeywords.length) {
                this.mychurches = [];
                this.allmychurches.forEach((church) => {
                    let groups = [];
                    church.groups.forEach((group) => {
                        if (group.name.toLowerCase().indexOf(this.searchKeywords.toLowerCase()) > -1) {
                            groups.push(group);
                        }
                    });
                    this.mychurches.push({_id: church._id, name: church.name, groups: groups, select: church.select});
                });
            } else {
                this.mychurches = this.allmychurches;
            }
        }
    }

    cancelSearch(event){
        this.contact_list = this.all_contact_list;
        this.mychurches = this.allmychurches;
    }

    async select(contact){
        if (!contact.joined){
            if (contact.select){
                contact.select = false;
                this.selectCounter--;
            } else {
                contact.select = true;
                this.selectCounter++;
            }
            this.totalSelected = this.entryCounter + this.selectCounter;
        }
    }

    selectItem(item){
        if (item.select){
            item.select = false;
            this.totalSelected--;
        } else {
            item.select = true;
            this.totalSelected++;
        }
    }

    async enableImportContact() {
        if (!this.userData.user.importContactList) {
            let alert = await this.alertCtrl.create({
                header: "Allow Restvo to access your Contacts",
                message: "Restvo needs access to your contacts so you can more easily select friends whom you want to invite. Would you give permission to Restvo to access your Contacts?",
                buttons: [{
                    text: 'Yes',
                    handler: () => {
                        this.ionSpinner = true;
                        this.userData.user.importContactList = true;
                        this.userData.update({importContactList: true}).then(() => {
                            this.loadContacts();
                        });
                    }
                }, {text: 'Cancel'}],
                cssClass: 'level-15'
            });
            alert.present();
        }
    }

    openComposer() {
        const welcomeMessage = "Check out this new app called Restvo. It's the only app that intentionally builds deeper relationships and you can create chats, groups, events, polls and more. You can download it for free at: https://restvo.com";
        if (this.type === "SMS Message") {
            this.sms.send(this.selectedPhoneNumbers, welcomeMessage, { android: { intent: 'INTENT' }});
        } else if (this.type === "Email") {
            if (this.platform.is('cordova')){
                let email = {
                    bcc: this.selectedEmails,
                    subject: 'Download Restvo for free today',
                    body: "<p>Hey,</p><p>Check out this new app called Restvo. It's the only app that intentionally builds deeper relationships and you can create chats, groups, events, polls and more.</p><p>You can download it for free at:</p><a href=\"https://www.restvo.com\">restvo.com</a></p><p>" + this.userData.user.first_name + "</p>",
                    isHtml: true
                };
                this.emailComposer.open(email);
            } else {
                window.location.href = 'mailto:' + this.selectedEmails + '?subject=Download Restvo for free today&body=' + encodeURIComponent(welcomeMessage);
            }
        }
    }

    checkInputFields(){
        if ((this.mobile_phone.length || this.email.length) && this.name.length){
            this.entryCounter = 1;
        } else {
            this.entryCounter = 0;
        }
        this.totalSelected = this.entryCounter + this.selectCounter;
    }

    closeModal(){
        this.modalCtrl.dismiss(this.refreshNeeded);
    }

    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    customTrackBy(index: number, item: any): any {
        return index;
    }

    async noNetworkConnection(){
        let networkAlert = await this.alertCtrl.create({
            header: 'No Internet Connection',
            message: 'Please check your internet connection.',
            buttons: ['Dismiss'],
            cssClass: 'level-15'
        });
        await networkAlert.present();
    }
}
