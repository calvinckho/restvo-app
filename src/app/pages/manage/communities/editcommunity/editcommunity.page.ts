import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { CacheService } from 'ionic-cache';
import {Validators, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { Churches } from '../../../../services/church.service';
import { UserData } from '../../../../services/user.service';
import { Aws } from '../../../../services/aws.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-editcommunity',
  templateUrl: './editcommunity.page.html',
  styleUrls: ['./editcommunity.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditcommunityPage implements OnInit {

    communityForm: UntypedFormGroup;
    @Input() community: any;
    loading: any;
    @Input() industries: any;
    new_profile: boolean = false;
    countries: Array<{name: string, selected: boolean}> = [];
    country_list: Array<string> = ["United States","Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and Mcdonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic of","Korea, Republic of","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia, the Former Yugoslav Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia and Montenegro","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province of China","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Virgin Islands, British","Virgin Islands, US","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];
    refreshNeeded = false;

    constructor(
                private cache: CacheService,
                private formBuilder: UntypedFormBuilder,
                private alertCtrl: AlertController,
                private actionSheetCtrl: ActionSheetController,
                public modalCtrl: ModalController,
                public platform: Platform,
                private churchService: Churches,
                private awsService: Aws,
                public userData: UserData,
                ) {
        /*this.community = this.navParams.get('community');
        this.industries = this.navParams.get('industries');*/
    }

    ngOnInit() {
        if(!this.community){
            console.log("create a new profile!");
            this.new_profile = true;
            this.community = {_id: '', name: '', industry: {_id: ''}, background: '', email: '', phone: '', website: '', social: '', keywords: '', meeting_location: {street: '', city: '', state: '', country: ''}};
        }
        for (let i = 0; i < this.country_list.length; i++){
            this.countries.push({name: this.country_list[i], selected: false});
        }

        console.log('industry id', this.community.industry._id);
        this.communityForm = this.formBuilder.group({
            _id: [this.community._id],
            name: [this.community.name, Validators.required],
            industry: [this.community.industry._id, Validators.required],
            background: [this.community.background],
            email: [this.community.email],
            phone: [this.community.phone],
            website: [this.community.website],
            social: [this.community.social],
            keywords: [this.community.keywords],
            meeting_street: [this.community.meeting_location.street],
            meeting_city: [this.community.meeting_location.city, Validators.required],
            meeting_state: [this.community.meeting_location.state, Validators.required],
            meeting_country: [this.community.meeting_location.country, Validators.required]
        });
    }

    clickSaveButton() {
        const community = this.communityForm.value;
        community.meeting_location = {
            street: community.meeting_street,
            city: community.meeting_city,
            state: community.meeting_state,
            country: community.meeting_country
        };
        if (this.new_profile){
            this.createChurchProfile(community);
        }
        else {
            this.updateChurchProfile(community);
        }
    }

    async createChurchProfile(community) {
        try {
            let result = await this.churchService.createChurchProfile(community);
            const alert = await this.alertCtrl.create({
                header: 'Profile Received',
                message: 'This community profile will undergo a review process that usually takes 1-2 days. We may contact you for further information about this submission. You can begin to set up groups. Once your submission is approved, it will be listed in the directory and we will notify you with an email.',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        let navTransition = alert.dismiss();
                        navTransition.then(() => {
                            this.modalCtrl.dismiss(true);
                        });
                    }}],
                cssClass: 'level-15'
            });
            await alert.present();
            console.log(result);
        } catch (err) {
            let alert = await this.alertCtrl.create({
                header: 'Name Already Used',
                message: this.community.name + ' has already been registered by another organization. Please enter a different name.',
                buttons: [{ text: 'Ok' }],
                cssClass: 'level-15'
            });
            await alert.present();
        }
    }

    async updateChurchProfile(community) {
        //no need to send these fields
        delete community.financial_admins;
        delete community.admins;
        delete community.moderators;
        delete community.members;
        try {
            let result = await this.churchService.updateChurchProfile(community);
            this.userData.refreshUserStatus({ type: 'refresh community' });
            let alert = await this.alertCtrl.create({
                header: 'Success',
                message: 'Community profile updated.',
                cssClass: 'level-15',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        let navTransition = alert.dismiss();
                        navTransition.then( async () => {
                            await this.userData.load();
                            this.modalCtrl.dismiss(true);
                        });
                    }}]
            });
            await alert.present();
            console.log(result);
        }
        catch(err){
            console.log(err);
        }
    }

    async editBackground(event) {
        let buttons = [
            {
                text: 'Upload Image',
                handler: () => {
                    this.selectPhotoFromDeviceAndUpload(event);
                }
            }];
        if (this.community.background) {
            buttons.push(
                {
                    text: 'Restore to Default',
                    handler: () => {
                        this.removeFile();
                    }
                });
        }
        const actionSheet = await this.actionSheetCtrl.create({header: "Background Graphics", buttons: buttons});
        actionSheet.present();
    }

    async selectPhotoFromDeviceAndUpload(event){
        try {
            let result: any;
            if (this.platform.is('cordova')) {
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
                result = await this.awsService.uploadImage('communities', this.community._id.length ? this.community._id : "temporary", image, this.community._id);
            } else {
                const compressed = await this.awsService.compressPhoto(event.target.files[0]);
                result = await this.awsService.uploadFile('communities', this.community._id.length ? this.community._id : "temporary", compressed, this.community._id, 0);
            }
            if (result === "Upload succeeded"){
                if(this.community.background){
                    await this.awsService.removeFile(this.community.background); //remove the previous background from Digital Ocean
                }
                this.community.background = this.awsService.url;
                this.communityForm.patchValue({'background': this.awsService.url});
                if (this.community._id && this.community._id.length) { // only if updating profile
                    await this.churchService.updateChurchProfile({_id: this.community._id, background: this.community.background});
                }
                this.refreshNeeded = true;
            }
        } catch (err) {
            console.log(err);
        }
    }

    async removeFile() {
        if(this.community.background){
            await this.awsService.removeFile(this.community.background);
            this.community.background = null;
            await this.churchService.updateChurchProfile({_id: this.community._id, background: null});
            this.refreshNeeded = true;
        }
    }

    closeModal() {
        this.modalCtrl.dismiss(this.refreshNeeded);
    }
}
