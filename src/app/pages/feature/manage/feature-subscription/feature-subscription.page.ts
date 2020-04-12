import {ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonContent,
  IonSlides, LoadingController,
  ModalController,
  Platform, PopoverController,
  ToastController
} from "@ionic/angular";
import {Element as StripeElement, Elements, ElementsOptions, StripeService} from "ngx-stripe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserData} from "../../../../services/user.service";
import {Churches} from "../../../../services/church.service";
import {Resource} from "../../../../services/resource.service";
import {EditfeaturePage} from "../../editfeature/editfeature.page";
import {Location} from "@angular/common";
import {ElectronService} from "ngx-electron";
import {SwUpdate} from "@angular/service-worker";
import {Chat} from "../../../../services/chat.service";
import {Groups} from "../../../../services/group.service";
import {NetworkService} from "../../../../services/network-service.service";
import {Aws} from "../../../../services/aws.service";
import {Moment} from "../../../../services/moment.service";
import {Response} from "../../../../services/response.service";
import {CalendarService} from "../../../../services/calendar.service";
import {PaymentService} from "../../../../services/payment.service";
import {CacheService} from "ionic-cache";

@Component({
  selector: 'app-feature-subscription',
  templateUrl: './feature-subscription.page.html',
  styleUrls: ['./feature-subscription.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeatureSubscriptionPage extends EditfeaturePage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;

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
      public groupService: Groups,
      public networkService: NetworkService,
      public userData: UserData,
      public awsService: Aws,
      public momentService: Moment,
      public resourceService: Resource,
      public responseService: Response,
      public calendarService: CalendarService,
      private formBuilder: FormBuilder,
      private stripeService: StripeService,
      public paymentService: PaymentService,
      private cache: CacheService,
  ) {
    super(route, router, location, electronService, swUpdate, change,
        platform, alertCtrl, toastCtrl, actionSheetCtrl, popoverCtrl, modalCtrl, loadingCtrl,
        chatService, churchService, groupService, networkService, userData, awsService,
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
    //this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
  }

  onSlidesLoaded () {
    this.slides.lockSwipes(true);
  }

  /*refreshHandler = async (data) => {
    if (data && data.type === 'load community ready') {
      //this.prevSlide();
      this.churchService.numberOfActiveUsers = await this.churchService.getAppUserUsage(this.churchService.currentManagedCommunity._id);
    }
  };*/

  reloadEditPage = async () => { // refresh the Edit Page
    if (this.userData.user) {
      this.setup(); // this needs to be added because reloadEditPage overwrites the parent handler of the same name
      //this.prevSlide();
    }
  };

  ionViewDidEnter() {
    this.stripeElementName = 'card-element-plan' + (this.modalPage ? '-modal' : '');
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
      if (plan === 'Growth' && !this.moment.subscriptionId) {
        const result: any = await this.paymentService.loadCommunityParticipants(this.moment._id);
        if (result && result.community_participants) {
          this.community_participants = result.community_participants;
        }
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
                  window.open('https://app.restvo.com/register', '_blank');
                });
              }},
              { text: 'Cancel' }],
            cssClass: 'level-15'
          });
          await alert.present();
        }
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
      this.stripeService.createSource(this.card, {
        type: 'card',
        currency: 'usd',
        owner: owner,
      }).subscribe(async (result) => {
        if (result.source) {
          const updateResult = await this.paymentService.subscribe(this.moment._id, this.subscriptionResource['en-US'].matrix_string[1][0], owner, result.source);
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


}
