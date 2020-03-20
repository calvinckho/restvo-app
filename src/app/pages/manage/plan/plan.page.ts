import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { CacheService } from 'ionic-cache';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AlertController, Events, IonContent, IonSlides, ModalController, Platform} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {Churches} from "../../../services/church.service";
import {PaymentService} from "../../../services/payment.service";
import {Resource} from "../../../services/resource.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanPage implements OnInit {
    @ViewChild(IonContent) content: IonContent;
    @ViewChild(IonSlides) slides: IonSlides;

    @Input() modalPage: any;
    elements: Elements;
    card: StripeElement;
    // optional parameters
    elementsOptions: ElementsOptions = {
        locale: 'en'
    };
    billingForm: FormGroup;
    community: any;
    numberOfActiveUsers: any;
    refreshNeeded = false;
    stripeElementName = 'card-element-plan';
    ionSpinner = false;
    resource: any;

    constructor(
        private cache: CacheService,
        private platform: Platform,
        private router: Router,
        private events: Events,
        private formBuilder: FormBuilder,
        private stripeService: StripeService,
        public modalCtrl: ModalController,
        private alertCtrl: AlertController,
        public userData: UserData,
        public churchService: Churches,
        private paymentService: PaymentService,
        public resourceService: Resource,
    ) {}

    ngOnInit() {
        this.billingForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            line1: ['', [Validators.required]],
            line2: [''],
            city: ['', [Validators.required]],
            state: ['', [Validators.required]],
            postal_code: ['', [Validators.required]],
            country: ['', [Validators.required]],
        });
        this.slides.lockSwipes(true);
        let loadResource = this.resourceService.load('en-US', "Restvo Plans");
        let resource = this.cache.loadFromDelayedObservable('loadResource: Restvo Plans', loadResource, 'resource', 3600, 'none');
        resource.subscribe(result => {
            this.resource = result[0];
        }, async (err) => {
            let networkAlert = await await this.alertCtrl.create({
                header: 'No Internet Connection',
                message: 'Please check your internet connection.',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        });
    }

    refreshHandler = async () => {
        this.prevSlide();
        this.churchService.numberOfActiveUsers = await this.churchService.getAppUserUsage(this.churchService.currentManagedCommunity._id);
    };

    ionViewDidEnter() {
        this.stripeElementName = 'card-element-plan' + (this.modalPage ? '-modal' : '');
        this.events.subscribe('loadCommunityReady', this.refreshHandler);
    }

    prevSlide() {
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.content.scrollToTop();
        this.slides.lockSwipes(true);
    }

    nextSlide() {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.content.scrollToTop();
        this.slides.lockSwipes(true);
    }

    prepareBillingElement() {
        this.stripeService.elements(this.elementsOptions)
            .subscribe(elements => {
                this.elements = elements;
                // Only mount the element the first time
                if (!this.card) {
                    this.card = this.elements.create('card', {
                        style: {
                            base: {
                                iconColor: '#666EE8',
                                color: '#31325F',
                                fontWeight: 300,
                                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                fontSize: '18px',
                                '::placeholder': {
                                    color: '#CFD7E0'
                                }
                            }
                        }
                    });
                    this.card.mount('#' + this.stripeElementName);
                } else {
                    this.card.mount('#' + this.stripeElementName);
                }
            });
    }

    async selectPlan(plan) {
        try {
            if (plan === this.resource['en-US'].matrix_string[1][0] && !this.churchService.currentManagedCommunity.subscriptionId){
                this.churchService.numberOfActiveUsers = await this.churchService.getAppUserUsage(this.churchService.currentManagedCommunity._id);
                if (!this.platform.is('cordova')) {
                    this.nextSlide();
                    this.prepareBillingElement();
                } else {
                    const alert = await this.alertCtrl.create({
                        header: 'Opening the In-App Browser',
                        subHeader: 'To upgrade your plan, you will be redirected to app.restvo.com.',
                        buttons: [{ text: 'Ok',
                            handler: () => {
                                const navTransition = alert.dismiss();
                                navTransition.then(async () => {
                                    window.open('https://app.restvo.com/register', "_blank");
                                });
                            }},
                            { text: 'Cancel' }],
                        cssClass: 'level-15'
                    });
                    await alert.present();
                }
            } else if (plan === this.resource['en-US'].matrix_string[1][0] && this.churchService.currentManagedCommunity.subscriptionId){
                await this.paymentService.subscribe(this.churchService.currentManagedCommunity._id, this.resource['en-US'].matrix_string[1][0], null, null);
                this.userData.refreshUserStatus({type: 'change aux data'});
            } else {
                const alert = await this.alertCtrl.create({
                    header: 'Cancel ' + this.resource['en-US'].matrix_string[1][0] + ' Plan',
                    subHeader: 'Are you sure you want to cancel your subscription to the ' + this.resource['en-US'].matrix_string[1][0] + ' Plan?',
                    buttons: [{ text: 'Ok',
                        handler: () => {
                            const navTransition = alert.dismiss();
                            navTransition.then(async () => {
                                await this.paymentService.subscribe(this.churchService.currentManagedCommunity._id, 'Free', null,null);
                                this.userData.refreshUserStatus({type: 'change aux data'});
                            });
                        }},
                        { text: 'Cancel' }],
                    cssClass: 'level-15'
                });
                await alert.present();
            }
        } catch (err) {
            const alert = await this.alertCtrl.create({
                header: 'Something Went Wrong', //delete board
                subHeader: 'We cannot process your request at this time. Please try again later.',
                buttons: [{ text: 'Ok' }],
                cssClass: 'level-15'
            });
            await alert.present();
        }
    }

    async submitBillingForm() {
        try {
            this.ionSpinner = true;
            const owner = this.billingForm.value;
            owner.address = { line1: owner.line1, line2: owner.line2, city: owner.city, state: owner.state, postal_code: owner.postal_code, country: owner.country };
            delete owner.line1;
            delete owner.line2;
            delete owner.city;
            delete owner.state;
            delete owner.postal_code;
            delete owner.country;
            this.stripeService.createSource(this.card, {
                type: 'card',
                currency: 'usd',
                owner: owner,
            }).subscribe(async (result) => {
                if (result.source) {
                    const updateResult = await this.paymentService.subscribe(this.churchService.currentManagedCommunity._id, this.resource['en-US'].matrix_string[1][0], owner, result.source);
                    this.ionSpinner = false;
                    if (updateResult === 'success') {
                        this.userData.refreshUserStatus({type: 'change aux data'});
                        const alert = await this.alertCtrl.create({
                            header: 'Success',
                            subHeader: this.churchService.currentManagedCommunity.name + ' is now upgraded to the ' + this.resource['en-US'].matrix_string[1][0] + ' Plan.',
                            buttons: [{
                                text: 'Ok',
                                handler: () => {
                                    const navTransition = alert.dismiss();
                                    navTransition.then( async () => {
                                        this.card.clear();
                                        this.billingForm.reset();
                                        this.prevSlide();
                                    });
                                }
                            }],
                            cssClass: 'level-15'
                        });
                        await alert.present();
                    } else {
                        const alert = await this.alertCtrl.create({
                            header: 'Something Went Wrong',
                            subHeader: 'We cannot process your request at this time. Please try again later.',
                            buttons: [{ text: 'Ok' }],
                            cssClass: 'level-15'
                        });
                        await alert.present();
                    }
                } else if (result.error) {
                    this.ionSpinner = false;
                    // Error creating the source
                    console.log(result.error.message);
                    const alert = await this.alertCtrl.create({
                        header: 'Something Went Wrong',
                        subHeader: 'We cannot process your request at this time.',
                        message: result.error.message,
                        buttons: [{ text: 'Ok' }],
                        cssClass: 'level-15'
                    });
                    await alert.present();
                }
            });
        } catch (err) {
            this.ionSpinner = false;
            const alert = await this.alertCtrl.create({
                header: 'Something Went Wrong',
                subHeader: 'We cannot process your request at this time. Please try again later.',
                buttons: [{ text: 'Ok' }],
                cssClass: 'level-15'
            });
            await alert.present();
        }

    }

    closeModal(){
        this.modalCtrl.dismiss(this.refreshNeeded);
    }

    ionViewWillLeave() {
        //this.card.unmount();
        this.events.unsubscribe('loadCommunityReady', this.refreshHandler);
    }
}
