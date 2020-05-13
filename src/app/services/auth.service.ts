import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import {Capacitor, Plugins} from '@capacitor/core';
import {LoadingController, Platform} from '@ionic/angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';
import { NetworkService } from './network-service.service';
import 'capacitor-share-extension';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class Auth {
    public cachedRouteUrl: string;
    public cachedRouteParams: any;
    public incompleteOnboardProcess: any;
    public token: any;
    public httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    public httpAuthOptions = {
        headers: new HttpHeaders
    };
    user: any;

    private _openOnboarding: BehaviorSubject<any> = new BehaviorSubject(null);
    public readonly openOnboarding$: Observable<any> = this._openOnboarding.asObservable();

    private _chatSocketMessage: BehaviorSubject<any> = new BehaviorSubject(null);
    public readonly chatSocketMessage$: Observable<any> = this._chatSocketMessage.asObservable();

    private _refreshGroupStatus: BehaviorSubject<any> = new BehaviorSubject(null);
    public readonly refreshGroupStatus$: Observable<any> = this._refreshGroupStatus.asObservable();

    constructor(private http: HttpClient,
                private platform: Platform,
                private router: Router,
                private storage: Storage,
                private loadingCtrl: LoadingController,
                public networkService: NetworkService) {
    }

    openOnboarding(data) {
        this._openOnboarding.next(data);
    }

    chatSocketMessage(data) {
        this._chatSocketMessage.next(data);
    }

    refreshGroupStatus(res) {
        this._refreshGroupStatus.next(res);
    }

    // checks user authentication and routes user if they should not be on the page
    async checkAuthenticationWithToken(token) {
        this.cachedRouteUrl = this.router.url.split(';')[0];    // save the URL for after register
        try {
            if (this.platform.is('cordova')) { // speed up app loading when the network is slow
                const { StatusBar, SplashScreen } = Plugins;
                StatusBar.show();
                SplashScreen.hide();
            }
            // Load token if exists
            this.token = token || await this.storage.get('token');
            if (this.token && this.token.length) {
                this.httpAuthOptions = {
                    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token})
                };
                if (await this.networkService.hasNetwork()) {
                    try {
                        const res: any = await this.checkAuthenticationHTTP();
                        if (res && res.user) {
                            this.user = res.user;
                        }
                        if (token) { // if token is provided via HTTP params, check and finish the incomplete onboarding processes
                            this.routeNewlyLoggedInUser();
                        } else { // if log in with token from storage, more quickly route authenticated user
                            this.routeAuthenticatedUser();
                        }
                        this.storage.set('token', this.token);
                        return res;
                    } catch (err) {
                        this.storage.clear(); // to remove residual user data in storage if app crashed and didn't clear it
                        this.routeUnauthenticatedUser('1', 'Your session is expired. Please log in again.');
                        return {content: 'Unauthenticated', message: err.error.message || 'Your session is expired. Please log in again.'};
                    }
                } else {
                    this.networkService.showNoNetworkAlert();
                    this.routeAuthenticatedUser();
                    console.log('Found existing login token. Offline mode allowed.');
                    return {content: 'Offline mode'};
                }
            } else {
                this.storage.clear(); // to remove residual user data in storage if app crashed and didn't clear it
                this.routeUnauthenticatedUser('1', '');
                return {content: 'No token found'};
            }
        } catch (err) {
            this.routeUnauthenticatedUser('0', 'Authentication failed. Please check your network connection and try again. Once you are connected to the internet, you can restart the app to bypass the login screen.');
            console.log('error when loading token from storage');
        }
    }

    // routes Unauthenticated user to the correct URL
    // authorized pages are routed register to public pages
    private async routeUnauthenticatedUser(slide, errMessage) {
        console.log("Routing unauthenticated user.");
        // contains all URL parameters that have a public page
        // const publicPageURLParameters = ['activity', 'connect', 'reply'];

        if (this.router.url.includes('activity')) { // route /app/.../activity to /activity
            const activityIdStartIndex = this.router.url.search('activity') + 9; // the index of the first character of the activity id
            const activityAfterIdEndIndex = this.router.url.includes(';') ? this.router.url.search(';') : this.router.url.length; // the index of the character after the last character of the activity id
            const activityURL = '/activity/' + this.router.url.substring(activityIdStartIndex, activityAfterIdEndIndex);
            if (this.cachedRouteParams) {
                this.router.navigate([activityURL, this.cachedRouteParams], { queryParamsHandling: 'preserve' });
            } else {
                this.router.navigate([activityURL], { queryParamsHandling: 'preserve' });
            }
        } else if (this.router.url.includes('app/video')) { // route /app/.../video to /video
            const activityIdStartIndex = this.router.url.search('video') + 6; // the index of the first character of the activity id
            const activityAfterIdEndIndex = this.router.url.includes(';') ? this.router.url.search(';') : this.router.url.length; // the index of the character after the last character of the video chat room id
            const activityURL = '/video/' + this.router.url.substring(activityIdStartIndex, activityAfterIdEndIndex);
            if (this.cachedRouteParams) {
                this.router.navigate([activityURL, this.cachedRouteParams], { queryParamsHandling: 'preserve' });
            } else {
                this.router.navigate([activityURL], { queryParamsHandling: 'preserve' });
            }
            if (this.platform.is('desktop')) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } else {
            const loading = await this.loadingCtrl.create({
                message: 'Loading...',
                duration: 3000
            });
            await loading.present();
            await this.router.navigate(['/activity/5d5785b462489003817fee18'], { replaceUrl: true });
            await loading.dismiss();
        }
    }

    // routes the user after log in, create account, or email verification link
    async routeNewlyLoggedInUser() {
        console.log('Routing newly logged in user', this.cachedRouteUrl, this.cachedRouteParams);
        // when no cached url
        if (!this.cachedRouteUrl || typeof this.cachedRouteUrl === 'undefined') {
            await this.router.navigateByUrl('/app/discover');
            this.checkIncompleteOnboarding(true);
        } else {  // redirect the user back to the cached url
            if (this.cachedRouteUrl.includes('activity')) {
                this.routeAuthenticatedUser();
            } else {
                await this.router.navigate([this.cachedRouteUrl, this.cachedRouteParams], { queryParamsHandling: 'preserve' });
                this.checkIncompleteOnboarding(true);
            }
        }
    }

    // routes authorized user to correct URL
    // public pages are routed to the authorized page
    private async routeAuthenticatedUser() {
        console.log("Routing authenticated user...");
        let activityURL = '';
        if (this.router.url.includes('activity') && !this.router.url.includes('manage')) { // route /activity to /app/activity, except in manage mode
            const activityIdStartIndex = this.router.url.search('activity') + 9; // the index of the first character of the activity id
            const activityAfterIdEndIndex = this.router.url.includes(';') ? this.router.url.search(';') : this.router.url.length; // the index of the character after the last character of the activity id
            if (this.cachedRouteParams && this.cachedRouteParams.id) {
                activityURL = '/app/activity/' + this.router.url.substring(activityIdStartIndex, activityAfterIdEndIndex);
            } else {
                activityURL = '/app/discover/home/' + this.router.url.substring(activityIdStartIndex, activityAfterIdEndIndex);
            }
            if (this.cachedRouteParams) {
                this.router.navigate([activityURL, this.cachedRouteParams], { queryParamsHandling: 'preserve'});
            } else {
                this.router.navigate([activityURL], { queryParamsHandling: 'preserve'});
            }
        } else if (this.router.url.includes('discover/home') || this.router.url.includes('dashboard')) { // if loading landing page /discover/home or /dashboard
            const defaultProgram: any = await this.storage.get('defaultProgram');
            if (defaultProgram) {
                activityURL = '/app/discover/home/' + defaultProgram._id;
            }
            const UIAdminMode: any = await this.storage.get('UIAdminMode');
            if (UIAdminMode && this.user && defaultProgram && (defaultProgram.user_list_2.includes(this.user._id) || defaultProgram.user_list_3.includes(this.user._id))) {
                activityURL = '/app/dashboard/insight/' + defaultProgram._id;
            }
            this.router.navigate([activityURL], { queryParamsHandling: 'preserve'});
        }
        this.checkIncompleteOnboarding(false);
    }

    async checkIncompleteOnboarding(openOnboarding) {
        let onboardProcesses: any, programId;
        if (this.cachedRouteUrl && this.cachedRouteUrl.includes('activity') && this.cachedRouteParams && this.cachedRouteParams.id) {
            programId = this.cachedRouteParams.id;
        }
        // first, check programId's onboarding for incomplete processes with its accompanying token (required for joining as leader or organizer). If there is at least 1 incomplete process, it will trigger open the onboarding modal and the onboarding component will also check for other incomplete onboarding processes for participants
        const type = (this.cachedRouteParams && this.cachedRouteParams.type) ? parseInt(this.cachedRouteParams.type, 10) : null; // if no type is provided via the URL, it should be set to null so it doesn't trigger the sign up process (requires programId and type)

        if (programId) { // check designated program's onboarding
            onboardProcesses = await this.http.get(this.networkService.domain + '/api/moment/preferences?pageNum=1&programId=' + programId + '&type=' + type, this.httpAuthOptions).toPromise();
            this.incompleteOnboardProcess = onboardProcesses.find((m) => !m.response || (m.response.matrix_number.filter((c) => c.length > 5).length < m.resource.matrix_number[0].filter((c) => c === 40000 || c === 40020).length) || (m.response.matrix_string.filter((c) => (c.length > 1) && (c[1].length > 0)).length < m.resource.matrix_number[0].filter((c) => (c === 40010)).length));
        }
        // in the case if the designated onboarding is completed, check if other processes need to be completed
        if (!programId || !this.incompleteOnboardProcess) {
            onboardProcesses = await this.http.get(this.networkService.domain + '/api/moment/preferences?pageNum=1', this.httpAuthOptions).toPromise();
            this.incompleteOnboardProcess = onboardProcesses.find((m) => !m.response || (m.response.matrix_number.filter((c) => c.length > 5).length < m.resource.matrix_number[0].filter((c) => c === 40000 || c === 40020).length) || (m.response.matrix_string.filter((c) => (c.length > 1) && (c[1].length > 0)).length < m.resource.matrix_number[0].filter((c) => (c === 40010)).length));
        }

        if (this.incompleteOnboardProcess && openOnboarding) { // if there is any incomplete onboarding process
            const token = (this.cachedRouteParams && this.cachedRouteParams.token) ? this.cachedRouteParams.token : null;
            setTimeout(() => {
                this.openOnboarding({programId: programId, type: type, token: token, modalPage: true });
            }, 1000);
        }
    }

    checkAuthenticationHTTP() {
        return this.http.get(this.networkService.domain + '/api/auth/protected', this.httpAuthOptions).toPromise();
    }

    registerMobile(data) {
        const url = this.networkService.domain + '/api/auth/registermobile';
        return this.http.put<{success: string, msg: string}>(url, JSON.stringify(data), this.httpOptions).toPromise();
    }

    async verifyEmail(data) {
        const result: any = await this.verifyEmailHTTP(data);
        if (result && result.success){
            this.token = result.token;
            this.storage.set('token', result.token);
            const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': result.token});
            this.httpAuthOptions = { headers: headers };
        }
        return result;
    }

    verifyEmailHTTP(data) {
        return this.http.put(this.networkService.domain + '/api/auth/verifyemail', JSON.stringify(data), this.httpOptions).toPromise();
    }

    async verifyMobile(data) {
        const result: any = await this.verifyMobileHTTP(data);
        if (result && result.success){
            this.token = result.token;
            this.storage.set('token', result.token);
            const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': result.token});
            this.httpAuthOptions = { headers: headers };
        }
        return result;
    }

    verifyMobileHTTP(data) {
        return this.http.put(this.networkService.domain + '/api/auth/verifymobile', JSON.stringify(data), this.httpOptions).toPromise();
    }

    registerEmail(data){
        return this.http.post<{success: boolean, msg: string}>(this.networkService.domain + '/api/auth/register', JSON.stringify(data), this.httpOptions).toPromise();
    }

    async login(credentials) {
        const res: any = await this.loginHTTP(credentials);
        this.token = res.token;
        this.storage.set('token', res.token);
        const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': res.token});
        this.httpAuthOptions = { headers: headers };
        return res.user;
    }

    loginHTTP(credentials) {
        const url = this.networkService.domain + '/api/auth/login';
        return this.http.post(url, JSON.stringify(credentials), this.httpOptions).toPromise();
    }

    async recoverPassword(data) {
        const result: any = await this.recoverPasswordHTTP(data);
        if (data.recoveryURL && result.status === 'success') { // when the recovery URL is accepted
            this.token = result.token;
            this.storage.set('token', result.token);
            const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': result.token});
            this.httpAuthOptions = { headers: headers };
        }
        return result;
    }

    recoverPasswordHTTP(data){
        return this.http.post(this.networkService.domain + '/api/auth/recover', JSON.stringify(data), this.httpOptions).toPromise();
    }

    logout() {
        this.token = '';
        this.httpAuthOptions = {
            headers: new HttpHeaders
        };
        this.cachedRouteUrl = null;
        this.cachedRouteParams = null;
        this.incompleteOnboardProcess = null;
        this.storage.set('token', '');
        this.storage.set('user', '');
    }
}
