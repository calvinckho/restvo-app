import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonContent, LoadingController,
  ModalController,
  Platform, PopoverController,
  ToastController
} from '@ionic/angular';
import {
  StripeCardComponent,
  StripeInstance,
  StripeFactoryService
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserData} from '../../../../services/user.service';
import {Churches} from '../../../../services/church.service';
import {Resource} from '../../../../services/resource.service';
import {EditfeaturePage} from '../../editfeature/editfeature.page';
import {Location} from '@angular/common';
import {ElectronService} from 'ngx-electron';
import {SwUpdate} from '@angular/service-worker';
import {Chat} from '../../../../services/chat.service';
import {NetworkService} from '../../../../services/network-service.service';
import {Aws} from '../../../../services/aws.service';
import {Moment} from '../../../../services/moment.service';
import {Response} from '../../../../services/response.service';
import {CalendarService} from '../../../../services/calendar.service';
import {PaymentService} from '../../../../services/payment.service';
import {CacheService} from 'ionic-cache';

@Component({
  selector: 'app-feature-subscription',
  templateUrl: './feature-subscription.page.html',
  styleUrls: ['./feature-subscription.page.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ CalendarService ]
})
export class FeatureSubscriptionPage extends EditfeaturePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild('swiper') slides: ElementRef | undefined;

  @Input() modalPage: any;
  stripeService: StripeInstance;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#808080', // set as grey to balance dark and light mode
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  billingForm: UntypedFormGroup;
  community: any;
  numberOfActiveUsers: any;
  refreshNeeded = false;
  community_participants: any = [];
  ionSpinner = false;
  subscriptionResource: any;

  subscriptions: any = {};

  constructor(
      public route: ActivatedRoute,
      public router: Router,
      public location: Location,
      public electronService: ElectronService,
      public swUpdate: SwUpdate,
      public change: ChangeDetectorRef,
      public platform: Platform,
      public alertCtrl: AlertController,
      public toastCtrl: ToastController,
      public actionSheetCtrl: ActionSheetController,
      public popoverCtrl: PopoverController,
      public modalCtrl: ModalController,
      public loadingCtrl: LoadingController,
      public chatService: Chat,
      public churchService: Churches,
      public networkService: NetworkService,
      public userData: UserData,
      public awsService: Aws,
      public momentService: Moment,
      public resourceService: Resource,
      public responseService: Response,
      public calendarService: CalendarService,
      private formBuilder: UntypedFormBuilder,
      private stripeFactory: StripeFactoryService,
      public paymentService: PaymentService,
      private cache: CacheService,
  ) {
    super(route, router, location, electronService, swUpdate, change,
        platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl,
        chatService, churchService, networkService, userData, awsService,
        momentService, resourceService, responseService, calendarService);
  }

  async ngOnInit() {
    super.ngOnInit();
    this.billingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      line1: ['', [Validators.required]],
      line2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      country: ['', [Validators.required]],
      coupon: ['']
    });
    const loadResource = this.resourceService.load('en-US', 'Restvo Plans');
    const resource = this.cache.loadFromDelayedObservable('loadResource: Restvo Plans', loadResource, 'resource', 1, 'none');
    resource.subscribe(result => {
      this.subscriptionResource = result[0];
    }, async (err) => {
      const networkAlert = await await this.alertCtrl.create({
        header: 'No Internet Connection',
        message: 'Please check your internet connection.',
        buttons: ['Dismiss'],
        cssClass: 'level-15'
      });
      await networkAlert.present();
    });
    if (this.networkService.domain === 'https://server.restvo.com') {
      this.stripeService = this.stripeFactory.create('pk_live_yJ6A4nw34iPEMTvJnAzTZPLl');
    } else {
      this.stripeService = this.stripeFactory.create('pk_test_x6u9uWj1QBPuhpD1MtOTTriS');
    }
  }

  onSlidesLoaded () {
    this.slides?.nativeElement.allowTouchMove(true);
  }

  reloadEditPage = async () => { // refresh the Edit Page
    if (this.userData.user) {
      this.setup(); // this needs to be added because reloadEditPage overwrites the parent handler of the same name
    }
  }

  prevSlide() {
    this.slides?.nativeElement.allowTouchMove(false);
    this.slides?.nativeElement.swiper.slidePrev();
    this.content.scrollToTop();
    this.slides?.nativeElement.allowTouchMove(true);
  }

  nextSlide() {
    this.slides?.nativeElement.allowTouchMove(false);
    this.slides?.nativeElement.swiper.slideNext();
    this.content.scrollToTop();
    this.slides?.nativeElement.allowTouchMove(true);
  }

  async selectPlan(plan) {
    try {
      if (plan === 'Growth' && !this.moment.subscriptionId) {
        const result: any = await this.paymentService.loadCommunityParticipants(this.moment._id);
        if (result && result.community_participants) {
          this.community_participants = result.community_participants;
        }
        this.nextSlide();
      } else if (plan === 'Growth' && this.moment.subscriptionId) {
        await this.paymentService.subscribe(this.moment._id, this.subscriptionResource['en-US'].matrix_string[1][0], null, null);
        this.userData.refreshUserStatus({type: 'change aux data'});
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Cancel ' + this.subscriptionResource['en-US'].matrix_string[1][0] + ' Plan',
          subHeader: 'Are you sure you want to cancel your subscription to the ' + this.subscriptionResource['en-US'].matrix_string[1][0] + ' Plan?',
          buttons: [{ text: 'Ok',
            handler: () => {
              const navTransition = alert.dismiss();
              navTransition.then(async () => {
                await this.paymentService.subscribe(this.moment._id, plan, null, null);
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
        header: 'Something Went Wrong', // delete board
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
      delete owner.coupon;
      this.stripeService.createSource(this.card.element, {
        type: 'card',
        currency: 'usd',
        owner: owner,
      }).subscribe(async (result) => {
        if (result.source) {
          owner.coupon = this.billingForm.value.coupon;
          const updateResult: any = await this.paymentService.subscribe(this.moment._id, this.subscriptionResource['en-US'].matrix_string[1][0], owner, result.source);
          this.ionSpinner = false;
          if (updateResult === 'success') {
            this.userData.refreshUserStatus({type: 'change aux data'});
            const alert = await this.alertCtrl.create({
              header: 'Success',
              subHeader: this.moment.matrix_string[0][0] + ' is now upgraded to the ' + this.subscriptionResource['en-US'].matrix_string[1][0] + ' Plan.',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  const navTransition = alert.dismiss();
                  navTransition.then( async () => {
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
              header: updateResult && updateResult.message ? 'Payment Method Failed' : 'Something Went Wrong',
              subHeader: updateResult && updateResult.message ? updateResult.message : 'We cannot process your request at this time. Please try again later.',
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
}
