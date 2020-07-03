import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import { AlertController, IonContent, IonInfiniteScroll, ModalController, Platform} from '@ionic/angular';
import { Aws } from '../../../services/aws.service';
import { UserData } from '../../../services/user.service';
import { Churches } from '../../../services/church.service';
import { Groups } from '../../../services/group.service';
import { Auth } from '../../../services/auth.service';
import { Chat } from "../../../services/chat.service"
import {GroupchatPage} from "../../group/groupchat/groupchat.page";

@Component({
  selector: 'app-createchat',
  templateUrl: './createchat.page.html',
  styleUrls: ['./createchat.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatechatPage implements OnInit {
    @ViewChild(IonContent, {static: false}) content: IonContent;
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

    chatForm: FormGroup;
    title: string = "Create Chat";
    churchId: string = '';
    pageNum: number = 0;
    displayGroup: boolean = false;
    reachedEnd: boolean = false;
    searchKeyword = '';
    allFriends: any = [];
    listOfFriends: any = [];
    listOfAppUsers: any = [];
    selectedAppUsers: any = [];
    group: any;
    totalSelected: number = 0;
    loading: any;
    ionSpinner = true;
    page = 1;
    type: string;
    showOptional = false;

    //group creation variables
    groupForm: FormGroup;
    days: Array<{name: string, selected: boolean}> = [];
    frequencies: Array<{name: string, selected: boolean}> = [];
    countries: Array<{name: string, selected: boolean}> = [];
    churches: Array<{_id: string, name: string, selected: boolean}> = [];
    smsPlan: boolean = false;

    country_list: Array<string> = ["United States","Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and Mcdonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic of","Korea, Republic of","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia, the Former Yugoslav Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia and Montenegro","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province of China","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Virgin Islands, British","Virgin Islands, US","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];
    day_list: Array<string> = ['', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Varied or N/A", "To be determined"];
    frequency_list: Array<string> = ['', "Weekly", "Every Other Week", "One-Time", "Monthly", "1st and 3rd Week", "2nd and 4th Week", "N/A"];

    constructor(
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public platform: Platform,
        private awsService: Aws,
        private authService: Auth,
        public userData: UserData,
        private churchService: Churches,
        private groupService: Groups,
        private chatService: Chat,
    ) {
        this.chatForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
        this.churchId = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
    }

    ngOnInit() {
        this.renderList();
        this.setupLoadPeople();

        setTimeout(() => {
            this.ionSpinner = false;
        }, 5000);
    }

    async renderList() {
        this.listOfFriends = [];
        this.chatService.conversations.forEach((obj) => {
            if ((obj.conversation.type === 'connect') && obj.data.name.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) > -1) {
                this.listOfFriends.push({_id: obj.data.participant._id, name: obj.data.name, avatar: obj.data.participant.avatar, badge: obj.data.badge, order: null, select: false});
            }
        });
        this.listOfFriends.forEach((obj, index) => { // to do a stable sort next, first remember the order
            obj.order = index;
        });
        this.listOfFriends.sort((a, b) => {
            let badge_diff = b.badge - a.badge;
            if (badge_diff !== 0) {
                return badge_diff; // only sort when there is an actual difference
            } else {
                return a.order - b.order; // preserve the order
            }
        });
    }

    setupLoadPeople(){
        setTimeout(() => {
            this.infiniteScroll.disabled = false;
            this.reachedEnd = false;
            this.listOfAppUsers = [];
            this.pageNum = 0;
            this.loadMorePeople({target: this.infiniteScroll});
        }, 100);
    }

    async loadMorePeople(event){
        this.pageNum++;
        if (!this.reachedEnd){
            const churchAppUsers: any = await this.churchService.loadChurchAppUsers(this.churchId, this.searchKeyword, this.pageNum);
            this.ionSpinner = false;
            if (!churchAppUsers.length){
                this.reachedEnd = true;
                event.target.disabled = true;
            } else {
                churchAppUsers.forEach((appuser) => {
                    if (appuser._id !== this.userData.user._id){
                        appuser.name = `${appuser.first_name} ${appuser.last_name}`;
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

    executeSearch(event){
        event.stopPropagation();
        this.setupLoadPeople();
        this.renderList();
        setTimeout(() => {
            //Keyboard.hide();
        }, 2000);
    }

    cancelSearch(event){
        event.stopPropagation();
        this.searchKeyword = '';
        this.setupLoadPeople();
        this.renderList();
    }

    select(person){
        if (person.select){
            person.select = false;
            this.totalSelected--;
            if(this.totalSelected < 2){
                this.displayGroup = false;
            }
            let index = this.selectedAppUsers.indexOf(person);
            this.selectedAppUsers.splice(index, 1);
        } else {
            person.select = true;
            this.totalSelected++;
            if(this.totalSelected > 1){
                this.displayGroup = true;
            }
            this.selectedAppUsers.unshift(person);
            this.searchKeyword = '';
        }
        this.modifyChatName();
    }

    unselect(person){
        this.totalSelected--;
        if (this.totalSelected < 2){
            this.displayGroup = false;
        }
        let index = this.listOfAppUsers.indexOf(person);
        if (index > -1){
            this.listOfAppUsers[index].select = false;
        }
        index = this.listOfFriends.indexOf(person);
        if (index > -1){
            this.listOfFriends[index].select = false;
        }
        index = this.selectedAppUsers.indexOf(person);
        if (index > -1){
            this.selectedAppUsers.splice(index, 1);
        }
        this.modifyChatName();
    }

    modifyChatName(){
        if (this.chatForm.controls.name.pristine) {
            if (this.totalSelected === 1){
                this.chatForm.patchValue({
                  name: `${this.userData.user.first_name} ${this.selectedAppUsers[0].name}`
                });
            } else if (this.totalSelected === 2) {
                this.chatForm.patchValue({
                  name: `${this.userData.user.first_name}, ${this.selectedAppUsers[0].name.split(' ')[0]}, ${this.selectedAppUsers[1].name.split(' ')[0]}`
                });
            } else if (this.totalSelected > 2) {
                this.chatForm.patchValue({
                  name: `${this.userData.user.first_name}, ${this.selectedAppUsers[0].name.split(' ')[0]} ${(this.totalSelected - 1).toString()} friends`
                });
            }
        }
    }

    async selectAppUsers(){
        if (this.totalSelected === 1){ //direct message with 1 person
            this.createPrivateChat();
        } else if (this.totalSelected > 1) { //direct message with 2 or more people
            /*
            this.page = 2;
            this.title = 'Create Group Chat';
            */
            this.selectGroupType('personal');
        }
    }

    async createPrivateChat(){
        this.ionSpinner = true;
        const data: any = await this.chatService.getConversationByRecipientId(this.selectedAppUsers[0]._id, false, null);
        this.ionSpinner = false;
        if (data.length){//if the recipient has been connected
            const conversation = data[0];
            if (conversation.type == "connect") {
                this.modalCtrl.dismiss();
                setTimeout(async () => {
                    this.chatService.currentChatProps.push({
                        conversationId: conversation._id,
                        name: this.selectedAppUsers[0].name,
                        page: 'chat',
                        recipient: this.selectedAppUsers[0],
                        modalPage: true
                    });
                    const messagePage = await this.modalCtrl.create({
                        component: GroupchatPage,
                        componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                    });
                    await messagePage.present();
                }, 50);
            } else if (conversation.type === "request") {
                if (conversation.blockedBy){
                    if (conversation.blockedBy === this.userData.user._id) {
                        const alert = await this.alertCtrl.create({
                            header: 'User is Blocked',
                            subHeader: `Do you want to reconnect with ${this.selectedAppUsers[0].name}?`,
                            buttons: [{
                                text: 'Yes',
                                handler: () => {
                                    const navTransition = alert.dismiss();
                                    navTransition.then(async () => {
                                        await this.chatService.unblockConversation(conversation._id, this.selectedAppUsers[0]._id);
                                        this.modalCtrl.dismiss();
                                        this.chatService.currentChatProps.push({
                                            conversationId: conversation._id,
                                            name: this.selectedAppUsers[0].name,
                                            page: 'chat',
                                            recipient: this.selectedAppUsers[0],
                                            modalPage: true
                                        });
                                        const messagePage = await this.modalCtrl.create({
                                            component: GroupchatPage,
                                            componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                                        });
                                        await messagePage.present();
                                    });
                                }
                            }, {text: 'No'}],
                            cssClass: 'level-15'
                        });
                        alert.present();
                    } else {
                        const alert = await this.alertCtrl.create({
                            header: `Blocked by ${this.selectedAppUsers[0].name}.`,
                            subHeader: 'You cannot direct message this user while being blocked.',
                            buttons: [{ text: 'Dismiss' }],
                            cssClass: 'level-15'
                        });
                        await alert.present();
                    }
                } else {
                    const alert = await this.alertCtrl.create({
                        header: 'Connect request is pending',
                        subHeader: 'You have already sent a connect request to this user.',
                        buttons: [{ text: 'Dismiss' }],
                        cssClass: 'level-15'
                    });
                    await alert.present();
                }
            }
        } else {
            const alert = await this.alertCtrl.create({
                header: `Connect to ${this.selectedAppUsers[0].name}`,
                subHeader: `You are not yet connected with ${this.selectedAppUsers[0].name}. Do you want to direct message ${this.selectedAppUsers[0].name}`,
                buttons: [{ text: 'Yes',
                    handler: () => {
                        let navTransition = alert.dismiss();
                        navTransition.then( async () => {
                            await this.userData.checkPushNotification();
                            const welcomeMessage = `${this.userData.user.first_name} ${this.userData.user.last_name} is now connected with you.`;
                            const conversationId = await this.chatService.newConversation(this.selectedAppUsers[0]._id, { composedMessage : welcomeMessage, type: "connect" });
                            this.chatService.refreshTabBadges();
                            this.modalCtrl.dismiss();
                            this.chatService.currentChatProps.push({
                                conversationId: conversationId,
                                name: this.selectedAppUsers[0].name,
                                page: 'chat',
                                recipient: this.selectedAppUsers[0],
                                modalPage: true
                            });
                            const messagePage = await this.modalCtrl.create({
                                component: GroupchatPage,
                                componentProps: this.chatService.currentChatProps[this.chatService.currentChatProps.length - 1]
                            });
                            await messagePage.present();
                        });
                    }}, { text: 'Cancel' }],
                cssClass: 'level-15'
            });
            alert.present();
        }
    }

    async selectGroupType(type){
        this.type = type;
        let controlConfigs = {
            name: [this.chatForm.value.name, Validators.required],
            background: [''],
            emailDisabled: [false],
            smsDisabled: [false],
            smsKeyword: [''],
            churchId: [''],
            published: [false],
            flagged: [false],
            public_group: [false],
            details: [''],
            meeting_day: [''],
            meeting_frequency: [''],
            beginAtISOString: [new Date().toISOString()],
            endAtISOString: [new Date().toISOString()],
            location: [''],
            street: [''],
            city: [''],
            state: [''],
            country: [''],
            conversation: [''] // not a GUI element but required for group chat creation
        };
        this.churches = this.userData.user.churches.map((c) => {return {_id: c._id, name: c.name, selected: false};});
        this.churches.unshift({_id: '', name: 'None', selected: false});
        this.countries = this.country_list.map((c) => {return {name: c, selected: false};});
        this.days = this.day_list.map((c)=>{return {name: c, selected: false};});
        this.frequencies = this.frequency_list.map((c)=>{return {name: c, selected: false};});
        //populate the community info
        if (this.type === 'community'){
            this.title = 'Community Group';
            controlConfigs.churchId[0] = this.userData.user.churches[this.userData.currentCommunityIndex]._id;
            controlConfigs = await this.loadCommunityInfo(controlConfigs, this.churchId);
            this.page = 3;
        } else if (this.type === 'personal'){
            // clear the settings
            this.title = 'Personal Group';
            controlConfigs.churchId[0] = '';
            this.page = 3;
        }
        this.groupForm = this.formBuilder.group(controlConfigs);
    }

    async loadCommunityInfo(controlConfigs, id){
        try {
            const [church] = await this.churchService.loadChurchProfile(id);
            controlConfigs.city = church.meeting_location.city;
            controlConfigs.state = church.meeting_location.state;
            controlConfigs.country = church.meeting_location.country;
            this.smsPlan = church.payment_type === "SMS";
            return controlConfigs;
        } catch (err){
            console.log(err);
        }
    }

    async changeCommunity(id){
        try {
            const [church] = await this.churchService.loadChurchProfile(id);
            this.groupForm.patchValue(church.meeting_location);
            this.smsPlan = church.payment_type === "SMS";
        } catch (err){
            console.log(err);
        }
    }

    async createGroupChat(){
        try {
            this.ionSpinner = true;
            this.group = this.groupForm.value;
            if (this.type === 'community'){
                this.group.meeting_location = {
                    location: this.group.location,
                    street: this.group.street,
                    city: this.group.city,
                    state: this.group.state,
                    country: this.group.country
                };
            } else if (this.type === 'personal') {
                this.group.meeting_location = {location: '', street: '', city: '', state: '', country: ''};
                this.group.churchId = '';
            }
            this.group.beginAt = new Date(new Date(this.group.beginAtISOString).getTime() + new Date().getTimezoneOffset()*60000).toISOString();
            this.group.endAt = new Date(new Date(this.group.endAtISOString).getTime() + new Date().getTimezoneOffset()*60000).toISOString();
            if (!this.group.background.length) {
                delete this.group.background;
            }
            this.group.emailDisabled = !this.group.emailDisabled; // reverse the boolean of the toggle interface
            this.group.smsDisabled = !this.group.smsDisabled; // reverse the boolean of the toggle interface
            const createdGroup: any = await this.groupService.createGroupProfile(this.group);
            this.userData.user.groups.push({_id: createdGroup._id, name: createdGroup.name, role: "Leader", churchId: createdGroup.churchId});
            const data = { groups: [createdGroup], appUsers: this.selectedAppUsers };
            await this.groupService.addNewAppUsers(data);
            this.selectedAppUsers.forEach((appuser) => {
                this.userData.socket.emit('refresh user status', appuser._id, {type: 'update group participation', conversationId: null});
            });
            this.chatService.currentChatProps.push({
                conversationId: createdGroup.conversation,
                name: createdGroup.name,
                group: createdGroup,
                page: 'chat',
                badge: 0,
                modalPage: this.platform.width() < 768
            });
            this.ionSpinner = false;
            this.modalCtrl.dismiss(true);
        } catch (err) {
            if (err) {
                console.log(JSON.stringify(err));
                this.noNetworkConnection();
                this.ionSpinner = false;
            }
        }
    }

    async selectUploadFile(event){
        try {
            let result: any;
            if (this.platform.is('cordova')) {
                const { Camera } = Plugins;
                const image = await Camera.getPhoto({
                    quality: 60,
                    width: 1280,
                    allowEditing: false,
                    resultType: CameraResultType.DataUrl,
                    source: CameraSource.Prompt,
                    correctOrientation: false
                });
                if (this.groupForm.value.churchId.length ) {
                    result = await this.awsService.uploadImage('communities', this.groupForm.value.churchId, image, 'createchat');
                } else {
                    result = await this.awsService.uploadImage('users', this.userData.user._id, image, 'createchat');
                }
            } else {
                const compressed = await this.awsService.compressPhoto(event.target.files[0]);
                if (this.groupForm.value.churchId.length ) {
                    result = await this.awsService.uploadFile('communities', this.groupForm.value.churchId, compressed, 'createchat');
                } else {
                    result = await this.awsService.uploadFile('users', this.userData.user._id, compressed, 'createchat');
                }
            }
            if(result === "Upload succeeded"){
                if (this.groupForm.value.background && this.groupForm.value.background.length){
                    await this.awsService.removeFile(this.groupForm.value.background); //remove the previous background from Digital Ocean
                }
                this.groupForm.patchValue({background: this.awsService.url});
            }
        } catch (err) {
            console.log(err);
        }
    }

    backButton(){
        if (this.page > 1){
            this.page--;
            if (this.page === 1){
              this.title = 'Create Chat';
            } else if (this.page === 2){
              //this.title = 'Create Group Chat';
                this.page--;
                this.title = 'Create Chat';
            }
        } else {
            this.modalCtrl.dismiss(false);
        }
    }

    // this function is used by Angular *ngFor to track the dynamic DOM creation and destruction
    customTrackBy(index: number, item: any): any {
        return index;
    }

    async noNetworkConnection(){
        const networkAlert = await this.alertCtrl.create({
            header: 'No Internet Connection',
            subHeader: 'Please check your internet connection.',
            buttons: ['Dismiss'],
            cssClass: 'level-15'
        });
        await networkAlert.present();
    }
}
