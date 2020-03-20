import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Auth } from '../../../services/auth.service';
import { UserData } from '../../../services/user.service';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecoverPage implements OnInit {
    passForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye';
    loading: any;
    deviceToken: any;
    slideOpts: any;
    recoveryURL: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private platform: Platform,
                private alertCtrl: AlertController,
                private menuCtrl: MenuController,
                private authService: Auth,
                public userData: UserData) {

        this.passForm = this.formBuilder.group({
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            passwordConfirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        }, {validator: this.matchingPasswords('password', 'passwordConfirmation')});
    }

    ngOnInit() {
        this.menuCtrl.enable(false);
        if (this.platform.is('cordova')){
            StatusBar.hide();
        }
        this.recoveryURL = this.route.snapshot.paramMap.get('url');
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
    }

    async recover() {
        try {
            const data = {
                loginDeviceType: this.platform.is('cordova') ? 'mobile' : 'browser',
                password: this.passForm.get('passwordConfirmation').value,
                recoveryURL: this.recoveryURL
            };
            console.log("recovery data", data);
            const result: any = await this.authService.recoverPassword(data);
            if (result.status === 'success') {
                const alert = await this.alertCtrl.create({
                    header: 'Success',
                    subHeader: result.message,
                    cssClass: 'level-15',
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            const navTransition = alert.dismiss();
                            navTransition.then( async () => {
                                alert.dismiss();
                                await this.userData.load();
                                await this.userData.loadStoredCommunity();
                                this.userData.refreshUserStatus({type: 'setupDevice'});
                                this.menuCtrl.enable(true);
                                if(this.platform.is('cordova')){
                                    StatusBar.show();
                                }
                                this.router.navigateByUrl('/app/me');
                            });
                        }}]
                });
                alert.present();
            } else if (result.status === 'expired') {
                const alert = await this.alertCtrl.create({
                    header: 'Expired',
                    subHeader: result.message,
                    cssClass: 'level-15',
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            alert.dismiss();
                            this.menuCtrl.enable(true);
                            this.router.navigate(['/register', { slide : '0', exitType: 'slide' }]);
                        }}]
                });
                alert.present();
            }
        } catch (err){
            const alert = await this.alertCtrl.create({
                header: 'Something went wrong',
                subHeader: 'We are not able to process your request. Please try again.',
                buttons: [{ text: 'Ok',
                    handler: () => {
                        alert.dismiss();
                    }}],
                cssClass: 'level-15'
            });
            alert.present();
        }
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
}
