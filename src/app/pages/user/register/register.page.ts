import {Component, Input, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
const { StatusBar, SplashScreen } = Plugins;
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, Events, LoadingController, MenuController, ModalController, IonSlides, Platform } from '@ionic/angular';
import { Auth } from '../../../services/auth.service';
import { Aws } from '../../../services/aws.service';
import { UserData } from '../../../services/user.service';
import { Chat } from "../../../services/chat.service";
import {CameraResultType, CameraSource, Plugins} from "@capacitor/core";
import {Moment} from "../../../services/moment.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterPage implements OnInit {
    @ViewChild('welcomeSlides') welcome_slides: IonSlides;
    @ViewChild(IonSlides) slides: IonSlides;

    @Input() modalPage: any;
    @Input() slide: any;
    @Input() loginStatus = '';

    public loginForm: FormGroup;
    view = 'signin';
    ionSpinner: any;
    loginMode = 'email';
    credentials: any;
    passwordType = 'password';
    passwordIcon = 'eye';
    recovery_mode = false;

    nameForm: FormGroup;
    mobileForm: FormGroup;
    verifyCodeForm: FormGroup;
    emailForm: FormGroup;
    emailPassForm: FormGroup;
    passForm: FormGroup;
    loading: any;
    deviceToken: any;
    slidesOpts: any;
    exitType = 'slide';

    calling_codes: Array<{name: string, value: string}> = [{name:"+1 US",value:"+1"},
        {name:"+20 EG",value:"+20"},
        {name:"+211 SS",value:"+211"},
        {name:"+212 MA",value:"+212"},
        {name:"+213 DZ",value:"+213"},
        {name:"+216 TN",value:"+216"},
        {name:"+218 LY",value:"+218"},
        {name:"+220 GM",value:"+220"},
        {name:"+221 SN",value:"+221"},
        {name:"+222 MR",value:"+222"},
        {name:"+223 ML",value:"+223"},
        {name:"+224 GN",value:"+224"},
        {name:"+225 CI",value:"+225"},
        {name:"+226 BF",value:"+226"},
        {name:"+227 NE",value:"+227"},
        {name:"+228 TG",value:"+228"},
        {name:"+229 BJ",value:"+229"},
        {name:"+230 MU",value:"+230"},
        {name:"+231 LR",value:"+231"},
        {name:"+232 SL",value:"+232"},
        {name:"+233 GH",value:"+233"},
        {name:"+234 NG",value:"+234"},
        {name:"+235 TD",value:"+235"},
        {name:"+236 CF",value:"+236"},
        {name:"+237 CM",value:"+237"},
        {name:"+238 CV",value:"+238"},
        {name:"+239 ST",value:"+239"},
        {name:"+240 GQ",value:"+240"},
        {name:"+241 GA",value:"+241"},
        {name:"+242 CG",value:"+242"},
        {name:"+243 CD",value:"+243"},
        {name:"+244 AO",value:"+244"},
        {name:"+245 GW",value:"+245"},
        {name:"+246 IO",value:"+246"},
        {name:"+247 AC",value:"+247"},
        {name:"+248 SC",value:"+248"},
        {name:"+249 SD",value:"+249"},
        {name:"+250 RW",value:"+250"},
        {name:"+251 ET",value:"+251"},
        {name:"+252 SO",value:"+252"},
        {name:"+253 DJ",value:"+253"},
        {name:"+254 KE",value:"+254"},
        {name:"+255 TZ",value:"+255"},
        {name:"+256 UG",value:"+256"},
        {name:"+257 BI",value:"+257"},
        {name:"+258 MZ",value:"+258"},
        {name:"+260 ZM",value:"+260"},
        {name:"+261 MG",value:"+261"},
        {name:"+262 RE, YT, TF",value:"+262"},
        {name:"+263 ZW",value:"+263"},
        {name:"+264 NA",value:"+264"},
        {name:"+265 MW",value:"+265"},
        {name:"+266 LS",value:"+266"},
        {name:"+267 BW",value:"+267"},
        {name:"+268 SZ",value:"+268"},
        {name:"+269 KM",value:"+269"},
        {name:"+27 ZA",value:"+27"},
        {name:"+290 SH, TA",value:"+290"},
        {name:"+291 ER",value:"+291"},
        {name:"+297 AW",value:"+297"},
        {name:"+298 FO",value:"+298"},
        {name:"+299 GL",value:"+299"},
        {name:"+30 GR",value:"+30"},
        {name:"+31 NL",value:"+31"},
        {name:"+320 BE",value:"+32"},
        {name:"+33 FR",value:"+33"},
        {name:"+34 ES",value:"+34"},
        {name:"+350 GI",value:"+350"},
        {name:"+351 PT",value:"+351"},
        {name:"+352 LU",value:"+352"},
        {name:"+353 IE",value:"+353"},
        {name:"+354 IS",value:"+354"},
        {name:"+355 AL",value:"+355"},
        {name:"+356 MT",value:"+356"},
        {name:"+357 CY",value:"+357"},
        {name:"+358 FI, AX",value:"+358"},
        {name:"+359 BG",value:"+359"},
        {name:"+36 HU",value:"+36"},
        {name:"+370 LT",value:"+370"},
        {name:"+371 LV",value:"+371"},
        {name:"+372 EE",value:"+372"},
        {name:"+373 MD",value:"+373"},
        {name:"+374 AM, QN",value:"+374"},
        {name:"+375 BY",value:"+375"},
        {name:"+376 AD",value:"+376"},
        {name:"+377 MC",value:"+377"},
        {name:"+378 SM",value:"+378"},
        {name:"+379 VA",value:"+379"},
        {name:"+380 UA",value:"+380"},
        {name:"+381 RS",value:"+381"},
        {name:"+382 ME",value:"+382"},
        {name:"+383 XK",value:"+383"},
        {name:"+385 HR",value:"+385"},
        {name:"+386 SI",value:"+386"},
        {name:"+387 BA",value:"+387"},
        {name:"+388 EU",value:"+388"},
        {name:"+389 MK",value:"+389"},
        {name:"+39 IT, VA",value:"+39"},
        {name:"+40 RO",value:"+40"},
        {name:"+41 CH",value:"+41"},
        {name:"+420 CZ",value:"+420"},
        {name:"+421 SK",value:"+421"},
        {name:"+423 LI",value:"+423"},
        {name:"+43 AT",value:"+43"},
        {name:"+44 GB/UK, GG, IM, JE",value:"+44"},
        {name:"+45 DK",value:"+45"},
        {name:"+46 SE",value:"+46"},
        {name:"+47 NO, SJ, BV",value:"+47"},
        {name:"+48 PL",value:"+48"},
        {name:"+49 DE",value:"+49"},
        {name:"+500 FK, GS",value:"+500"},
        {name:"+501 BZ",value:"+501"},
        {name:"+502 GT",value:"+502"},
        {name:"+503 SV",value:"+503"},
        {name:"+504 HN",value:"+504"},
        {name:"+505 NI",value:"+505"},
        {name:"+506 CR",value:"+506"},
        {name:"+507 PA",value:"+507"},
        {name:"+508 PM",value:"+508"},
        {name:"+509 HT",value:"+509"},
        {name:"+51 PE",value:"+51"},
        {name:"+52 MX",value:"+52"},
        {name:"+53 CU",value:"+53"},
        {name:"+54 AR",value:"+54"},
        {name:"+55 BR",value:"+55"},
        {name:"+56 CL",value:"+56"},
        {name:"+57 CO",value:"+57"},
        {name:"+58 VE",value:"+58"},
        {name:"+590 GP, BL, MF",value:"+590"},
        {name:"+591 BO",value:"+591"},
        {name:"+592 GY",value:"+592"},
        {name:"+593 EC",value:"+593"},
        {name:"+594 GF",value:"+594"},
        {name:"+595 PY",value:"+595"},
        {name:"+596 MQ",value:"+596"},
        {name:"+597 SR",value:"+597"},
        {name:"+598 UY",value:"+598"},
        {name:"+599 BQ, CW",value:"+599"},
        {name:"+60 MY",value:"+60"},
        {name:"+61 AU, CX, CC",value:"+61"},
        {name:"+62 ID",value:"+62"},
        {name:"+63 PH",value:"+63"},
        {name:"+64 NZ, PN",value:"+64"},
        {name:"+65 SG",value:"+65"},
        {name:"+66 TH",value:"+66"},
        {name:"+670 TL",value:"+670"},
        {name:"+672 NF, AQ, HM",value:"+672"},
        {name:"+673 BN",value:"+673"},
        {name:"+674 NR",value:"+674"},
        {name:"+675 PG",value:"+675"},
        {name:"+676 TO",value:"+676"},
        {name:"+677 SB",value:"+677"},
        {name:"+678 VU",value:"+678"},
        {name:"+679 FJ",value:"+679"},
        {name:"+680 PW",value:"+680"},
        {name:"+681 WF",value:"+681"},
        {name:"+682 CK",value:"+682"},
        {name:"+683 NU",value:"+683"},
        {name:"+685 WS",value:"+685"},
        {name:"+686 KI",value:"+686"},
        {name:"+687 NC",value:"+687"},
        {name:"+688 TV",value:"+688"},
        {name:"+689 FF",value:"+689"},
        {name:"+690 TK",value:"+690"},
        {name:"+691 RM",value:"+691"},
        {name:"+692 MH",value:"+692"},
        {name:"+7 RU, KZ",value:"+700"},
        {name:"+7 3 RU", value:"+7 3"},
        {name:"+7 4 RU", value:"+7 4"},
        {name:"+7 6 KZ", value:"+7 6"},
        {name:"+7 7 RU", value:"+7 7"},
        {name:"+7 8 RU", value:"+7 8"},
        {name:"+7 9 RU", value:"+7 9"},
        {name:"+800 XT",value:"+800"},
        {name:"+808 XS",value:"+808"},
        {name:"+81 JP",value:"+81"},
        {name:"+82 KR",value:"+82"},
        {name:"+84 VN",value:"+84"},
        {name:"+850 KP",value:"+850"},
        {name:"+852 HK",value:"+852"},
        {name:"+853 MO",value:"+853"},
        {name:"+855 KH",value:"+855"},
        {name:"+856 LA",value:"+856"},
        {name:"+86 CN",value:"+86"},
        {name:"+870 XN",value:"+870"},
        {name:"+878 XP",value:"+878"},
        {name:"+880 BD",value:"+880"},
        {name:"+881 XG",value:"+881"},
        {name:"+882 XV",value:"+882"},
        {name:"+883 XV",value:"+883"},
        {name:"+886 TW",value:"+886"},
        {name:"+888 XD",value:"+888"},
        {name:"+90 TR, CT",value:"+90"},
        {name:"+91 IN",value:"+91"},
        {name:"+92 PK",value:"+92"},
        {name:"+93 AF",value:"+93"},
        {name:"+94 LK",value:"+94"},
        {name:"+95 MM",value:"+95"},
        {name:"+960 MV ",value:"+960"},
        {name:"+961 LB",value:"+961"},
        {name:"+962 JO",value:"+962"},
        {name:"+963 SY",value:"+963"},
        {name:"+964 IQ",value:"+964"},
        {name:"+965 KW",value:"+965"},
        {name:"+966 SA",value:"+966"},
        {name:"+967 YE",value:"+967"},
        {name:"+968 OM",value:"+968"},
        {name:"+970 PS",value:"+970"},
        {name:"+971 AE",value:"+971"},
        {name:"+972 IL",value:"+972"},
        {name:"+973 BH",value:"+973"},
        {name:"+974 QA",value:"+974"},
        {name:"+975 BT",value:"+975"},
        {name:"+976 MN",value:"+976"},
        {name:"+977 NP",value:"+977"},
        {name:"+979 XR",value:"+979"},
        {name:"+98 IR",value:"+98"},
        {name:"+991 XC",value:"+991"},
        {name:"+992 TJ",value:"+992"},
        {name:"+993 TM",value:"+993"},
        {name:"+994 AZ",value:"+994"},
        {name:"+995 GE",value:"+995"},
        {name:"+996 KG",value:"+996"},
        {name:"+998 UZ",value:"+998"}];

    constructor(private router: Router,
                private location: Location,
                private storage: Storage,
                public platform: Platform,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private events: Events,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private menuCtrl: MenuController,
                private modalCtrl: ModalController,
                private momentService: Moment,
                private chatService: Chat,
                public authService: Auth,
                private awsService: Aws,
                public userData: UserData) {

        this.loginStatus = this.loginStatus || this.route.snapshot.paramMap.get('message');
        this.slide = this.slide || parseInt(this.route.snapshot.paramMap.get('slide'), 10) || 0;
        // Validate user registration form
        this.loginForm = this.formBuilder.group({
            calling_code: ['+1'],
            phone_number: [''],
            email: [''],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });

        this.exitType = this.route.snapshot.paramMap.get('exitType');
        this.slidesOpts = {
            initialSlide: this.slide ? this.slide : 0,
        };
        this.view = this.slide === 0 ? 'signin' : 'register';
        this.nameForm = this.formBuilder.group({
            first_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            last_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])] });
        this.mobileForm = this.formBuilder.group({
            mobile_calling_code: ['+1'],
            mobile_sig_number: ['', Validators.required]
        });
        this.verifyCodeForm = this.formBuilder.group({
            verification_code: ['', Validators.required]
        });
        this.emailPassForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        }, {validator: this.matchingPasswords('password', 'passwordConfirmation')});
        this.emailForm = this.formBuilder.group({
            email: ['', Validators.required]
        });
        this.passForm = this.formBuilder.group({
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        }, {validator: this.matchingPasswords('password', 'passwordConfirmation')});
    }

    async ngOnInit() {
        this.menuCtrl.enable(false);
        if (this.platform.is('cordova')){
            StatusBar.hide();
            SplashScreen.hide();
        }
    }

    async ionViewWillEnter() {
        if (this.slide > 0) {
            this.loadRegisterSlides()
        }
        this.loginForm.patchValue({
            calling_code: '+1',
            phone_number: '',
            email: '',
            password: ''
        });
    }

    async prevSlide() {
        if (this.exitType === 'dashboard') {
            this.menuCtrl.enable(true);
            this.location.back();
            //this.router.navigateByUrl('/app/dashboard');
        } else {
            await this.slides.lockSwipes(false);
            await this.slides.slidePrev();
            await this.slides.lockSwipes(true);
        }
    }

    async nextSlide() {
        await this.slides.lockSwipes(false);
        await this.slides.slideNext();
        await this.slides.lockSwipes(true);
    }

    async goToSlide(number) {
        await this.slides.lockSwipes(false);
        await this.slides.slideTo(number);
        await this.slides.lockSwipes(true);
    }

    async loadRegisterSlides() {
        this.ionSpinner = true;
        this.view = 'register';
    }

    async registerSlidesLoaded() {
        await this.slides.lockSwipes(true);
        this.ionSpinner = false;
    }

    async login() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading...',
            duration: 5000
        });
        await loading.present();
        await this.storage.clear();
        if (this.loginMode === 'mobile') {
            this.credentials = {
                email: this.loginForm.get('calling_code').value + this.loginForm.get('phone_number').value,
                password: this.loginForm.get('password').value,
                loginDeviceType: 'mobile' // token never expires
            };
        } else if (this.loginMode === 'email') {
            this.credentials = {
                email: this.loginForm.get('email').value.toLowerCase(),
                password: this.loginForm.get('password').value,
                loginDeviceType: 'mobile' // token never expires
            };
        }

        try {
            this.userData.user = await this.authService.login(this.credentials);
            this.loginStatus = '';
            this.loginForm.reset();
            this.userData.processLoadedUserData();
            await this.userData.loadStoredCommunity();
            if (this.userData.user.avatar) {
                this.menuCtrl.enable(true);
                if (this.modalPage) {
                    this.modalCtrl.dismiss(false);
                }
                // since iOS push setup is excluded in setupDevice(), we need to check iOS permission here
                if (this.platform.is('ios') && !this.platform.is('mobileweb')) {
                    this.userData.checkPushNotification();
                }
                await this.authService.routeNewlyLoggedInUser();
                // refreshes app pages because ionViewWillEnter() is not called after navigateByURL()
                setTimeout(() => { // page has already been initiated in PWA fast load so needs to be refreshed
                    this.userData.refreshAppPages();
                }, 4000);
                if (this.platform.is('cordova')){
                    StatusBar.show();
                }
                loading.dismiss();
            } else {
                loading.dismiss();
                this.view = 'register';
                setTimeout(() => {
                    this.goToSlide(2); // go to upload a Profile Pic
                }, 500);
            }
        } catch (err) {
            loading.dismiss();
            console.log('Password Login Failure:', err);
            this.loginStatus = err.error ? err.error.message : 'Restvo is temporarily unavailable. Please try again later.' + (this.authService.token ? ' You can close the app and relaunch it to bypass the login screen.' : '');
        }
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
    }

    toggleRecoveryMode(){
        this.recovery_mode = !this.recovery_mode;
    }

    async recover() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading...',
            duration: 5000
        });
        await loading.present();
        if (this.loginMode === 'mobile') {
            const data = {
                mobile_phone: this.loginForm.get('calling_code').value + this.loginForm.get('phone_number').value
            };
            try {
                const result = await this.authService.registerMobile(data);
                loading.dismiss();
                if (result.success) {
                    this.view = 'register';
                    setTimeout(() => {
                        this.goToSlide(4); // verify SMS
                    }, 500);
                } else {
                    const alert = await this.alertCtrl.create({
                        header: 'Something went wrong...',
                        subHeader: result.msg,
                        buttons: [{text: 'Dismiss'}],
                        cssClass: 'level-15'
                    });
                    await alert.present();
                }
            } catch (err) {
                loading.dismiss();
            }
        } else {
            try {
                const result = await this.authService.recoverPassword({email: this.loginForm.get('email').value.toLowerCase()});
                loading.dismiss();
                // if email has already been added
                if (result && result.success) {
                    const alert = await this.alertCtrl.create({
                        header: 'Password Recovery Email Sent',
                        subHeader: 'An email with a recovery link has been sent to ' + this.loginForm.get('email').value + '.',
                        buttons: [{ text: 'Ok',
                            handler: () => {
                                const navTransition = alert.dismiss();
                                navTransition.then(() => {
                                    this.loginMode = 'email';
                                    this.view = 'signin'; // back to log in slide
                                });
                            }}],
                        cssClass: 'level-15'
                    });
                    alert.present();
                } else if (result && result.status && result.status === 'unverified email') {
                    const alert = await this.alertCtrl.create({
                        header: 'Recover using Mobile Number',
                        subHeader: result.message,
                        buttons: [{ text: 'Ok',
                            handler: () => {
                                const navTransition = alert.dismiss();
                                navTransition.then(() => {
                                    this.loginMode = 'email';
                                    this.view = 'signin'; // back to log in slide
                                });
                            }}],
                        cssClass: 'level-15'
                    });
                    alert.present();
                } else if (result && result.status && result.status === 'no account') {
                    const alert = await this.alertCtrl.create({
                        header: 'Cannot Find Your Account',
                        subHeader: result.message,
                        buttons: [{ text: 'Ok',
                            handler: () => {
                                const navTransition = alert.dismiss();
                                navTransition.then(() => {
                                    this.loginMode = 'email';
                                    this.view = 'signin'; // back to log in slide
                                });
                            }}],
                        cssClass: 'level-15'
                    });
                    alert.present();
                }
            } catch (err) {
                loading.dismiss();
                const networkAlert = await this.alertCtrl.create({
                    header: 'No Internet Connection',
                    subHeader: 'Please check your internet connection.',
                    buttons: ['Dismiss'],
                    cssClass: 'level-15'
                });
                await networkAlert.present();
                console.log('fail to push message');
            }
        }
    }

    async registerMobile(){
        if (!this.mobileForm.get('mobile_sig_number').value.length) return;
        const loading = await this.loadingCtrl.create({
            message: 'Processing...'
        });
        loading.present();
        const data = {
            type: 'register',
            first_name: this.nameForm.get('first_name').value,
            last_name: this.nameForm.get('last_name').value,
            primary_email: this.emailPassForm.get('email').value,
            password: this.emailPassForm.get('password').value,
            mobile_phone: this.mobileForm.get('mobile_calling_code').value + this.mobileForm.get('mobile_sig_number').value,
        };
        try{
            const result = await this.authService.registerMobile(data);
            loading.dismiss();
            if (result.success) {
                this.view = 'register';
                setTimeout(() => {
                    this.goToSlide(4); // verify SMS
                }, 500);
            } else {
                const alert = await this.alertCtrl.create({
                    header: 'Something went wrong...',
                    subHeader: result.msg,
                    buttons: [{text: 'Dismiss'}],
                    cssClass: 'level-15'
                });
                await alert.present();
            }
        } catch (err){
            loading.dismiss();
            console.log(err);
        }
    }

    async verifyMobile() {
        const loading = await this.loadingCtrl.create({
            message: 'Processing...'
        });
        loading.present();
        const data = {
            mobile_phone: this.recovery_mode ? (this.loginForm.get('calling_code').value + this.loginForm.get('phone_number').value) : (this.mobileForm.get('mobile_calling_code').value + this.mobileForm.get('mobile_sig_number').value),
            code: this.verifyCodeForm.get('verification_code').value,
            loginDeviceType: 'mobile'
        };
        try {
            console.log("verify", data);
            const result: any = await this.authService.verifyMobile(data);
            loading.dismiss();
            if (result.success){
                this.userData.user = result.user;
                await this.userData.loadStoredCommunity();
                // if it is not recovery process, select an email
                this.view = 'register';
                setTimeout(() => {
                    if (!this.recovery_mode) {
                        this.goToSlide(5); // input an email
                    } else { // if it is a recovery process, go to create password
                        this.goToSlide(6); // create a password
                    }
                }, 500);

            } else {
                const alert = await this.alertCtrl.create({
                    header: 'Failed',
                    subHeader: result.msg,
                    buttons: [{text: 'Retry'}, { text: 'Cancel' }],
                    cssClass: 'level-15'
                });
                await alert.present();
            }
        } catch (err) {
            loading.dismiss();
            console.log(err);
        }
    }

    async registerEmail() {
        const loading = await this.loadingCtrl.create({
            message: 'Processing...'
        });
        loading.present();
        const data = {
            type: 'register',
            email: this.emailPassForm.get('email').value,
            password: this.emailPassForm.get('passwordConfirmation').value,
            first_name: this.nameForm.get('first_name').value,
            last_name: this.nameForm.get('last_name').value,
            deviceToken: this.deviceToken,
            serializedRouteParams: null,
            routeId: this.authService.cachedRouteParams ? this.authService.cachedRouteParams.id : null
        };
        if (this.router.url.includes(';')) {
            data.serializedRouteParams = this.router.url.slice(this.router.url.indexOf(';'), this.router.url.length);
        }
        try {
            const result: any = await this.authService.registerEmail(data);
            loading.dismiss();
            if (result.success) {
                const alert = await this.alertCtrl.create({
                    header: 'Success',
                    subHeader: result.msg,
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            const navTransition = alert.dismiss();
                            navTransition.then(() => {
                                this.loginMode = 'email';
                                this.view = 'signin'; // back to sign in slide
                                this.loginForm.controls.email.setValue(data.email);
                            });
                        }}],
                    cssClass: 'level-15'
                });
                alert.present();
            } else {
                const alert = await this.alertCtrl.create({
                    header: 'Create Account Failed',
                    subHeader: result.msg,
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            alert.dismiss();
                        }}],
                    cssClass: 'level-15'
                });
                await alert.present();
            }
        } catch (err) {
            loading.dismiss();
            const alert = await this.alertCtrl.create({
                header: 'There is a Problem...',
                subHeader: 'We are not able to process your request. Please try again later',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        alert.dismiss();
                    }}],
                cssClass: 'level-15'
            });
            await alert.present();
            console.log(err);
        }
    }

    async saveEmail() {
        try {
            const data = {
                _id: this.userData.user._id,
                email: this.emailForm.get('email').value,
            };
            await this.userData.update({ _id: this.userData.user._id, primary_email: this.emailForm.get('email').value });
            await this.authService.registerEmail(data);
            this.view = 'register';
            setTimeout(() => {
                this.goToSlide(6); // pick a password
            }, 500);
        } catch (err) {
            console.log("result", err);
            const alert = await this.alertCtrl.create({
                header: 'Failed to save Email',
                subHeader: 'We are not able to save your email address. Please try again.',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        alert.dismiss();
                    }}],
                cssClass: 'level-15'
            });
            alert.present();
        }
    }

    async savePassword() {
        try {
            await this.userData.update({ _id: this.userData.user._id, password: this.passForm.get('passwordConfirmation').value });
            // if this is a recovery process, or authenticated user creating or changing password
            if (this.recovery_mode || this.exitType === 'dashboard') {
                this.menuCtrl.enable(true);
                this.router.navigateByUrl('/app/me');
                if (this.modalPage) {
                    this.modalCtrl.dismiss();
                }
            } else { // if it is a normal registration process
                this.view = 'register';
                setTimeout(() => {
                    this.goToSlide(2); // upload profile picture
                }, 500);
            }
        } catch (err) {
            const alert = await this.alertCtrl.create({
                header: 'Failed to save password',
                subHeader: 'We are not able to save your password. Please try again.',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        alert.dismiss();
                    }}],
                cssClass: 'level-15'
            });
            alert.present();
        }
    }

    async importContacts() {
        const loading = await this.loadingCtrl.create({
            message: 'Processing...'
        });
        loading.present();
        try {
            this.userData.user.importContactList = true;
            await this.userData.update({ importContactList: true });
            this.userData.uploadContactList(0);
            setTimeout(() => {
                loading.dismiss();
                this.finish();
            }, 8000);
        } catch (err){
            loading.dismiss();
            const alert = await this.alertCtrl.create({
                header: 'Something went wrong...',
                message: 'You can enable the Import Contacts feature later under Settings.',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        alert.dismiss();
                        this.finish();
                    }}],
                cssClass: 'level-15'
            });
            alert.present();
            this.userData.user.importContactList = false;
            this.userData.update({ importContactList: false });
        }
    }

    async selectPhotoFromDeviceAndUpload(event, useCapacitor) {
        try {
            let result: any;
            if (useCapacitor) {
                const {Camera} = Plugins;
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
                this.userData.user.avatar = this.awsService.url;
                await this.userData.update({_id: this.userData.user._id, avatar: this.awsService.url});
            }
        } catch (err) {
            console.log(err);
        }
    }

    checkImportContacts() {
        // on browser and Desktop app, skip import contact
        if (!this.platform.is('cordova')) {
            this.finish();
        } else {
            // on native mobile phone, check import contact status
            if (this.userData && this.userData.user && this.userData.user.importContacts) {
                this.finish();
            } else {
                this.nextSlide();
            }
        }
    }

    async finish() {
        this.menuCtrl.enable(true);
        if (this.modalPage) {
            this.modalCtrl.dismiss(false);
        }
        await this.authService.routeNewlyLoggedInUser();
        // refreshes app pages because ionViewWillEnter() is not called after navigateByURL()
        setTimeout(() => { // page has already been initiated in PWA fast load so needs to be refreshed
            this.userData.refreshAppPages();
        }, 4000);
    }

    matchingEmails(emailKey: string, confirmEmailKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            const email = group.controls[emailKey];
            const confirmEmail = group.controls[confirmEmailKey];

            if (email.value !== confirmEmail.value) {
                return {
                    mismatchedEmails: true
                };
            }
        };
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }

    close() {
        if (this.modalPage) {
            this.modalCtrl.dismiss(false);
        } else {
            this.location.back();
        }
    }
}
