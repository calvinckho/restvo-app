import {Component, OnInit, OnDestroy, Input, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import { Storage } from '@ionic/storage';
import { Auth } from '../../../services/auth.service';
import { UserData } from '../../../services/user.service';
import { Aws } from '../../../services/aws.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Events, LoadingController, ModalController, Platform } from '@ionic/angular';
import {CameraResultType, CameraSource, Plugins} from "@capacitor/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfilePage implements OnInit, OnDestroy {

    @Input() recipient: any;
    @Input() mode: string;
    @Input() modalPage: any;

    subscriptions: any = {};
    userForm: FormGroup;
    loading: any;
    user: any = {};
    countries: Array<{name: string, selected: boolean}> = [];
    calling_codes: Array<{value: string, selected: boolean}> = [];
    country_list: Array<string> = ["United States","Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and Mcdonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic of","Korea, Republic of","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia, the Former Yugoslav Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia and Montenegro","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province of China","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Virgin Islands, British","Virgin Islands, US","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];
    calling_code_list: Array<string> = ["+1","+20","+212","+213","+216","+218","+220","+221","+222","+223","+224","+225","+226","+227","+229","+230","+231","+232","+233","+234","+235","+236","+237","+238","+239","+240","+241","+242","+243","+244","+245","+248","+249","+250","+251","+252","+253","+254","+255","+256","+257","+258","+260","+261","+262","+263","+264","+265","+266","+267","+268","+269","+269","+27","+290","+291","+297","+298","+299","+30","+31","+32","+33","+34","+350","+351","+352","+353","+354","+355","+356","+357","+358","+359","+36","+370","+371","+372","+373","+374","+375","+376","+377","+378","+380","+385","+386","+387","+389","+39","+40","+41","+418","+420","+421","+423","+43","+44","+45","+46","+47","+48","+49","+500","+501","+502","+503","+504","+505","+506","+507","+508","+509","+51","+52","+53","+53","+54","+55","+56","+57","+58","+590","+591","+592","+593","+594","+595","+596","+597","+598","+599","+60","+61","+62","+63","+64","+65","+66","+670","+672","+672","+673","+674","+675","+676","+677","+678","+679","+680","+681","+682","+683","+685","+686","+687","+688","+689","+690","+691","+692","+7","+81","+82","+84","+850","+852","+853","+855","+856","+86","+880","+886","+90","+91","+92","+93","+94","+95","+960","+961","+962","+963","+964","+965","+966","+967","+968","+970","+971","+972","+973","+974","+975","+976","+977","+979","+98","+991","+992","+993","+994","+995","+996","+998"];

    showContactInfo = false;
    ionSpinner = true;

    constructor(private events: Events,
                private route: ActivatedRoute,
                private location: Location,
                private storage: Storage,
                public platform: Platform,
                public fb: FormBuilder,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                private authService: Auth,
                public userData: UserData,
                private awsService: Aws) {

        this.userForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            mobile: [{value: '', disabled: true}],
            mobile_calling_code: [''],
            mobile_sig_number: [''],
            email: [{value: '', disabled: true}],
            primary_email: [''],
            home_calling_code: [''],
            home_sig_number: [''],
            street: [''],
            city: [''],
            state: [''],
            zip: [''],
            country: [''],
        });
        for (let i = 0; i < this.country_list.length; i++){
            this.countries.push({name: this.country_list[i], selected: false});
        }
        for (let i = 0; i < this.calling_code_list.length; i++){
            this.calling_codes.push({value: this.calling_code_list[i], selected: false});
        }
    }

    async ngOnInit() {
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserStatusHandler);
        if (this.userData && this.userData.user) {
            this.user = this.userData.user;
            this.populateForm();
        }
        this.userData.splitPaneState = 'md';
        if (!this.mode) {
            this.mode = this.route.snapshot.paramMap.get('mode') || 'save'; // try to load from url param if not provided via @Input
        }
    }

    refreshUserStatusHandler = async (data) => {
        if (data) {
            await this.refreshUserData(data);
        }
        this.ionSpinner = false;
    };

    async refreshUserData(data) {
        if (data && data.type === 'user updated' && data.user) {
            this.user = data.user;
        } else {
            this.user = await this.userData.load();
        }
        this.populateForm();
    }

    async populateForm() {
        for (let i = 0; i < this.calling_codes.length; i++){
            if (this.user.mobile_phone && this.user.mobile_phone.indexOf(this.calling_codes[i].value) > -1){
                this.user.mobile_calling_code = this.calling_codes[i].value;
                this.calling_codes[i].selected = true;
                this.user.mobile_sig_number = this.user.mobile_phone.slice(this.calling_codes[i].value.length);
            }
            if (this.user.home_phone && this.user.home_phone.indexOf(this.calling_codes[i].value) > -1){
                this.user.home_calling_code = this.calling_codes[i].value;
                this.calling_codes[i].selected = true;
                this.user.home_sig_number = this.user.home_phone.slice(this.calling_codes[i].value.length);
            }
        }
        this.userForm.patchValue(this.user);
    }

    async selectPhotoFromDeviceAndUpload(event, useCapacitor) {
        try {
            let result: any;
            if (useCapacitor) {
                const { Camera } = Plugins;
                const image = await Camera.getPhoto({
                    quality: 60,
                    width: 1280,
                    allowEditing: false,
                    resultType: CameraResultType.DataUrl,
                    source: CameraSource.Prompt,
                    correctOrientation: false
                });
                if (image) {
                    result = await this.awsService.uploadImage('users', this.userData.user._id, image);
                }
            } else {
                result = await this.awsService.compressPhoto(event.target.files[0]);
                await this.awsService.uploadFile('users', this.userData.user._id, result);
            }
            if (result) {
                if (this.userData.user.avatar) {
                    await this.awsService.removeFile(this.userData.user.avatar); //remove the previous background from Digital Ocean
                }
                this.user.avatar = this.awsService.url;
                this.userData.user.avatar = this.awsService.url;
                await this.userData.update({ _id: this.userData.user._id, avatar: this.awsService.url });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async registerMobile() {
        if (!this.userForm.get('mobile_sig_number').value || !this.userForm.get('mobile_sig_number').value.length) {return;}
        const alert = await this.alertCtrl.create({
            header: 'Verify Your Mobile Number',
            subHeader: 'We will send you a SMS message to verify your mobile number. Standard SMS rate applies. Proceed?',
            buttons: [{ text: 'Yes',
                handler: () => {
                    const navTransition = alert.dismiss();
                    navTransition.then(async () => {
                        const data = {
                            mobile_phone: this.userForm.get('mobile_calling_code').value + this.userForm.get('mobile_sig_number').value,
                            deviceToken: this.authService.token
                        };
                        try {
                            await this.userData.update({ _id: this.userData.user._id, mobile_phone: this.userForm.get('mobile_calling_code').value + this.userForm.get('mobile_sig_number').value });
                            this.user.mobile_phone = this.userForm.get('mobile_calling_code').value + this.userForm.get('mobile_sig_number').value;
                            const result = await this.authService.registerMobile(data);
                            if (result.success) {
                                this.verifyMobile(result.msg);
                            } else {
                                const alert2 = await this.alertCtrl.create({
                                    header: 'Verification Failed',
                                    subHeader: result.msg,
                                    buttons: [{text: 'Dismiss'}],
                                    cssClass: 'level-15'
                                });
                                await alert2.present();
                            }
                        } catch(err) {
                            const alert3 = await this.alertCtrl.create({
                                header: 'Something Went Wrong',
                                subHeader: 'Please try again later.',
                                buttons: [{text: 'Dismiss'}],
                                cssClass: 'level-15'
                            });
                            await alert3.present();
                        }
                    });
                }}, { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async verifyMobile(message){
        const alert = await this.alertCtrl.create({
            header: 'Verification via SMS',
            subHeader: message,
            inputs: [
                {
                    name: 'code',
                    placeholder: '6-digit code'
                },
            ],
            buttons: [{text: 'Ok',
                handler: input => {
                    const navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        const data = {
                            _id: this.user._id,
                            mobile_phone: this.user.mobile_phone, // this is already up-to-date in the register mobile function after the user update API call
                            //deviceToken: this.deviceToken, // since we are providing the code, the token is not necessary
                            code: input.code
                        };
                        const result = await this.authService.verifyMobile(data);
                        if (result.success) {
                            const alert2 = await this.alertCtrl.create({
                                header: 'Success',
                                subHeader: result.msg,
                                buttons: [{
                                    text: 'Ok',
                                    handler: () => {
                                        this.refreshUserData(null);
                                    }
                                }],
                                cssClass: 'level-15'
                            });
                            await alert2.present();
                        } else {
                            const alert3 = await this.alertCtrl.create({
                                header: 'Failed',
                                subHeader: result.msg,
                                buttons: [{
                                    text: 'Retry',
                                    handler: () => {
                                        this.verifyMobile(result.msg);
                                    }
                                }, {text: 'Cancel'}],
                                cssClass: 'level-15'
                            });
                            await alert3.present();
                        }
                    });
                }
            }, { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        return await alert.present();
    }

    async registerEmail(){
        if (!this.userForm.value.primary_email || !this.userForm.value.primary_email.length) {return;}
        const alert = await this.alertCtrl.create({
            header: 'Verify Your Email Address',
            subHeader: 'We will send a verification email to ' + this.userForm.value.primary_email + '. Proceed?',
            buttons: [{ text: 'Yes',
                handler: () => {
                    const navTransition = alert.dismiss();
                    navTransition.then( async () => {
                        try {
                            const data = {
                                _id: this.user._id,
                                email: this.userForm.value.primary_email,
                            };
                            await this.userData.update({ _id: this.userData.user._id, primary_email: this.userForm.value.primary_email });
                            const result = await this.authService.registerEmail(data);
                            if (result.success) {
                                const alert2 = await this.alertCtrl.create({
                                    header: 'Success',
                                    subHeader: result.msg,
                                    buttons: [{
                                        text: 'Ok',
                                        handler: () => {
                                            this.refreshUserData(null);
                                        }
                                    }],
                                    cssClass: 'level-15'
                                });
                                await alert2.present();
                            } else {
                                const alert3 = await this.alertCtrl.create({
                                    header: 'Verification Failed',
                                    subHeader: result.msg,
                                    buttons: [{text: 'Dismiss'}],
                                    cssClass: 'level-15'
                                });
                                await alert3.present();
                            }
                        } catch (err){
                            console.log(err);
                        }
                    });
                }}, { text: 'Cancel' }],
            cssClass: 'level-15'
        });
        await alert.present();
    }

    async updateUserProfile(action) {
        try {
            this.ionSpinner = true;
            this.user = this.userForm.value;
            if (this.user.mobile_calling_code && this.user.mobile_sig_number){
                this.user.mobile_phone = this.user.mobile_calling_code + this.user.mobile_sig_number;
            }
            if (this.user.home_calling_code && this.user.home_sig_number){
                this.user.home_phone = this.user.home_calling_code + this.user.home_sig_number;
            }
            await this.userData.update(this.user);
            this.user = this.userData.user;
            this.populateForm();
            this.ionSpinner = false;
            if (this.modalPage) {
                this.modalCtrl.dismiss(action);
            }
        } catch (err) {
            console.log(err);
            const alert = await this.alertCtrl.create({
                header: 'Error',
                subHeader: 'Failed to update user profile.',
                buttons: [{text: 'Ok'}],
                cssClass: 'level-15'
            });
            return await alert.present();
        }
    }

    ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserStatusHandler);
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }
}
