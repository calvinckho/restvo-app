import {Component, ElementRef, Input, NgZone, AfterViewInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {CameraResultType, CameraSource, Plugins} from "@capacitor/core";
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { Churches } from '../../../services/church.service';
import { Groups } from '../../../services/group.service';
import { Chat } from '../../../services/chat.service';
import { UserData } from '../../../services/user.service';
import { Aws } from '../../../services/aws.service';
import {Board} from "../../../services/board.service";
import {Auth} from "../../../services/auth.service";

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.page.html',
  styleUrls: ['./editgroup.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditgroupPage implements AfterViewInit {
    @ViewChild('textArea') textArea: ElementRef;

    // two big categories: personal groups vs community groups. Within community groups, you can have public and private groups.

    // personal group is a group that is not associated with a community
    // public_group (aka a Topic) is a property of a group that defines whether the group (associated with a community) is listed in the directory or not.
    // so to summarize: we have 3 types of groups: a personal group, a private community group, a public community group (a topic).

    @Input() group: any;
    @Input() personalGroup: any; // when creating a new group, the user chooses whether she wants to create a personal group or a community group
    @Input() publishGroup: any;
    groupForm: FormGroup;
    previous_churchId: string;
    loading: any;
    days: Array<{name: string, selected: boolean}> = [];
    frequencies: Array<{name: string, selected: boolean}> = [];
    countries: Array<{name: string, selected: boolean}> = [];
    churches: Array<{_id: string, name: string, selected: boolean}> = [];
    smsPlan = false;
    showOptional = false;
    saveType = 'create';
    initialized = false;

    country_list: Array<string> = ["United States","Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and Mcdonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic of","Korea, Republic of","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia, the Former Yugoslav Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia and Montenegro","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province of China","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Virgin Islands, British","Virgin Islands, US","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];
    day_list: Array<string> = ['', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Varied or N/A", "To be determined"];
    frequency_list: Array<string> = ['', "Weekly", "Every Other Week", "One-Time", "Monthly", "1st and 3rd Week", "2nd and 4th Week", "N/A"];

    constructor(private zone: NgZone,
                public modalCtrl: ModalController,
                public platform: Platform,
                private groupService: Groups,
                private churchService: Churches,
                public userData: UserData,
                private chatService: Chat,
                private boardService: Board,
                private formBuilder: FormBuilder,
                private alertCtrl: AlertController,
                private cache: CacheService,
                private awsService: Aws,
                private authService: Auth,
                private storage: Storage,
                private actionSheetCtrl: ActionSheetController) {

        this.publishGroup = this.publishGroup || false; //when creating a new group, the user chooses whether she wants to create a personal group or a community group

        const controlConfigs = {
            _id: [''],
            name: ['', Validators.required],
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
        this.churches = this.userData.user.churches.map((c) => {return {_id: c._id, name: c.name, selected: false};});
        this.churches.unshift({_id: '', name: "None", selected: false});
        this.countries = this.country_list.map((c) => {return {name: c, selected: false};});
        this.days = this.day_list.map((c) => {return {name: c, selected: false};});
        this.frequencies = this.frequency_list.map((c) => {return {name: c, selected: false};});
        this.groupForm = this.formBuilder.group(controlConfigs);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.setupForm();
            this.initialized = true;
        }, 100);
    }

    async setupForm(){
        if (this.group) { // if editing a group
            this.saveType = 'update';
            const group = JSON.parse(JSON.stringify(this.group));
            this.group.emailDisabled = !this.group.emailDisabled; // reverse the boolean of the toggle interface
            this.group.smsDisabled = !this.group.smsDisabled; // reverse the boolean of the toggle interface
            this.groupForm.patchValue(group.meeting_location); //fill in the location info
            delete group.meeting_location;
            /*this.group.beginAtISOString = group.beginAt.toISOString();
            this.group.endAtISOString = group.endAt.toISOString();*/
            this.groupForm.patchValue(this.group);
            if (!this.personalGroup) {
                this.previous_churchId = this.group.churchId;
                // if the group belongs to an outside community
                const listOfChurchIds = this.churches.map((c) => {
                    return c._id;
                });
                const index = listOfChurchIds.indexOf(this.group.churchId);
                if (index === -1) { //in the event of an outside community
                    const [church] = await this.churchService.loadChurchProfile(this.group.churchId);
                    this.churches.push({_id: this.group.churchId, name: church.name, selected: false});
                }
            } else {
                this.churches[0].selected = true;
            }
        } else { // if creating a group
            this.saveType = 'create';
            if (!this.personalGroup){ // if creating a community group
                this.groupForm.patchValue({'churchId': this.userData.user.churches[this.userData.currentCommunityIndex]._id});
                await this.loadCommunityInfo(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
            } else { // if creating a personal group
                this.groupForm.patchValue({'churchId': ''});
            }
        }
    }

    clickSaveButton() {
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
        } else if (this.saveType === 'update') { // if editing exising group
            this.updateGroupProfile();
        }
    }

    async createGroupProfile() {
        if (this.group) {
            try {
                const result: any = await this.groupService.createGroupProfile(this.group);
                const alert = await this.alertCtrl.create({
                    header: 'Success',
                    subHeader: this.group.name + ' is created.',
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            const navTransition = alert.dismiss();
                            navTransition.then(() => {
                                for(let i = 0; i < this.userData.user.churches.length; i++){ //for community group
                                    if(this.group.churchId && this.userData.user.churches[i]._id === this.group.churchId){
                                        this.userData.currentCommunityIndex = i;
                                        this.storage.set('currentCommunityIndex', this.userData.currentCommunityIndex.toString()); //store this for the next time the app starts up
                                    }
                                }
                                this.modalCtrl.dismiss(true);
                            });
                        }}],
                    cssClass: 'level-15'
                });
                await alert.present();
                console.log(result);
            } catch (err){
                this.noNetworkConnection();
                console.log("not allowed");
            }
        }
    }

    async updateGroupProfile() {
        try {
            await this.groupService.updateGroupProfile(this.group);
            if (this.group.conversation){
                this.chatService.socket.emit('update status', this.group.conversation, this.group); // group leader will receive update through socket.io
                this.authService.refreshGroupStatus({conversationId: this.group.conversation, data: this.group});

            } else if (this.group.board){
                this.boardService.socket.emit('refresh board', this.group.board, {action: 'refresh board'}); // refresh the news feed page
                this.userData.communitiesboards = await this.boardService.loadUserChurchBoards(); //in case of a board group
                this.userData.refreshUserStatus({ type: 'refresh community board page' }); // refresh News Feed page
            }
            const alert = await this.alertCtrl.create({
                header: 'Success',
                subHeader: this.group.name + ' is updated. Information on the Discover Page can take up to 1 minute to be updated.',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        const navTransition = alert.dismiss();
                        navTransition.then(() => {
                            this.modalCtrl.dismiss(true);
                        });
                    }}],
                cssClass: 'level-15'
            });
            await alert.present();
        } catch (err) {
            this.noNetworkConnection();
            console.log(err);
        }
    }

    async changeCommunity(id) {
        if (this.initialized) {
            if (this.group && !this.personalGroup && !id.length){
                const alert = await this.alertCtrl.create({
                    header: 'Convert to Personal Group',
                    subHeader: 'You are about to convert this ' + (this.group.public_group ? 'topic' : 'community group') + ' to a personal group. This group will no longer be associated with any community and will not be listed in the Discover Section. Proceed?',
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            const navTransition = alert.dismiss();
                            navTransition.then(() => {
                                this.personalGroup = true;
                                this.group.public_group = false;
                            });
                        }}
                        , { text: 'Cancel',
                            handler: () => {
                                const navTransition = alert.dismiss();
                                navTransition.then(() => {
                                    this.group.churchId = this.previous_churchId;
                                });
                            }}],
                    cssClass: 'level-15'
                });
                await alert.present();
            } else {
                this.previous_churchId = id;
                this.personalGroup = false;
                this.loadCommunityInfo(id);
            }
        }
    }

    async loadCommunityInfo(id) {
        if (id.length) {
            try {
                const [church] = await this.churchService.loadChurchProfile(id);
                this.groupForm.patchValue(church.meeting_location);
                this.smsPlan = church.payment_type === 'SMS';
            } catch (err){
                console.log(err);
            }
        }
    }

    async editBackground(event){
        let buttons = [
            {
                text: 'Upload Image',
                handler: () => {
                    this.selectPhotoFromDeviceAndUpload(event);
                }
            }];
        if (this.group && this.group.background){
            buttons.push(
                {
                    text: 'Restore to Default',
                    handler: () => {
                        this.removeFile();
                    }
                });
        }
        const actionSheet = await this.actionSheetCtrl.create({header: "Background Graphics", buttons: buttons});
        await actionSheet.present();
    }

    changeStartTime(event) {
        event.stopPropagation();
        if (this.groupForm.value.beginAt > this.groupForm.value.endAt) {
            this.groupForm.patchValue({'endAt': this.groupForm.value.beginAt});
        }
    }

    async selectPhotoFromDeviceAndUpload(event){
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
                if (!image) {
                    return;
                }
                if (this.groupForm.value.churchId.length ) {
                    result = await this.awsService.uploadImage('communities', this.groupForm.value.churchId, image);
                } else {
                    result = await this.awsService.uploadImage('users', this.userData.user._id, image);
                }
            } else {
                const compressed = await this.awsService.compressPhoto(event.target.files[0]);
                if (this.groupForm.value.churchId.length ) {
                    result = await this.awsService.uploadFile('communities', this.groupForm.value.churchId, compressed);
                } else {
                    result = await this.awsService.uploadFile('users', this.userData.user._id, compressed);
                }
            }
            if (result === "Upload succeeded") {
                if(this.groupForm.value.background.length){
                    await this.awsService.removeFile(this.groupForm.value.background); //remove the previous background from Digital Ocean
                }
                this.groupForm.patchValue({'background': this.awsService.url});
                if (this.group && this.group._id) { // only if updating a group profile
                    await this.groupService.updateGroupProfile({_id: this.group._id, background: this.awsService.url});
                    if(this.group.conversation){
                        this.chatService.socket.emit('update status', this.group.conversation, this.group);
                    } else if (this.group.board){
                        this.userData.communitiesboards = await this.boardService.loadUserChurchBoards(); //in case of a board group
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async removeFile() {
        await this.awsService.removeFile(this.groupForm.value.background);
        this.groupForm.controls.background.setValue('');
        if (this.group) { // if updating a group
            this.group.background = null;
            await this.groupService.updateGroupProfile({_id: this.group._id, background: null});
            if (this.group.conversation) {
                this.chatService.socket.emit('update status', this.group.conversation, this.group);
            } else if (this.group.board) {
                this.userData.communitiesboards = await this.boardService.loadUserChurchBoards(); //in case of a board group
            }
        }
    }

    async explainDiscover(){
        const alert = await this.alertCtrl.create({
            header: 'List in Discover Section',
            subHeader: "You can list this topic in the community's Discover section by toggling it to 'on'. If toggled 'off', no one can join it except the person is being invited by a member.",
            buttons: [{ text: 'Ok'}],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    closeModal(){
        this.modalCtrl.dismiss(false);
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
