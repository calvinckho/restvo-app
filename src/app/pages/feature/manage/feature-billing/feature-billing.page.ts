import {ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  StripeCardComponent,
  StripeInstance,
  StripeFactoryService
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {
  ActionSheetController,
  AlertController, LoadingController,
  ModalController,
  Platform,
  PopoverController,
  ToastController
} from "@ionic/angular";
import {Resource} from "../../../../services/resource.service";
import {Churches} from "../../../../services/church.service";
import {UserData} from "../../../../services/user.service";
import {EditfeaturePage} from "../../editfeature/editfeature.page";
import {Aws} from "../../../../services/aws.service";
import {Moment} from "../../../../services/moment.service";
import {NetworkService} from "../../../../services/network-service.service";
import {Location} from "@angular/common";
import {ElectronService} from "ngx-electron";
import {SwUpdate} from "@angular/service-worker";
import {Chat} from "../../../../services/chat.service";
import {Groups} from "../../../../services/group.service";
import {Response} from "../../../../services/response.service";
import {CalendarService} from "../../../../services/calendar.service";
import {PaymentService} from "../../../../services/payment.service";
import {CacheService} from "ionic-cache";

@Component({
  selector: 'app-feature-billing',
  templateUrl: './feature-billing.page.html',
  styleUrls: ['./feature-billing.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeatureBillingPage extends EditfeaturePage implements OnInit {
  @ViewChild(StripeCardComponent, {static: false}) card: StripeCardComponent;
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
  billingForm: FormGroup;
  refreshNeeded = false;
  numberOfActiveUsers: any;
  sources: any;
  invoices = [];
  endOfInvoices = false;
  updatePayment = false;
  ionSpinner = false;
  stripeCustomer: any;
  resource: any;
  subscriptions: any = {};
  community_participants: any = [];
  subscriptionResource: any;

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
      private stripeFactory: StripeFactoryService,
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
    this.invoices = [];
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

  reloadEditPage = async () => { // refresh the Edit Page
    if (this.userData.user) {
      await this.setup(); // this needs to be added because reloadEditPage overwrites the parent handler of the same name
      this.updatePayment = false;
      this.invoices = [];
      this.preparePage();
    }
  };

  async preparePage() {
    this.stripeCustomer = await this.paymentService.loadCustomer(this.moment._id);
    const result: any = await this.paymentService.loadCommunityParticipants(this.moment._id);
    if (result && result.community_participants) {
      this.community_participants = result.community_participants;
    }
    if (this.stripeCustomer) {
      this.loadBillingInfo();
      this.listInvoices(null);
    }
  }

  async loadBillingInfo() {
    this.sources = await this.paymentService.loadBillingInfo(this.moment._id);
  }

  async updatePaymentMethod() {
    this.updatePayment = true;
  }

  async submitBillingMethod() {
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
      this.stripeService.createSource(this.card.element, {
        type: 'card',
        currency: 'usd',
        owner: owner,
      }).subscribe(async (result) => {
        if (result.source) {
          const updateResult: any = await this.paymentService.updateBillingMethod(this.moment._id, result.source);
          this.ionSpinner = false;
          if (updateResult === 'success') {
            this.loadBillingInfo();
            this.billingForm.reset();
            this.updatePayment = false; // close the billing info window
            const alert = await this.alertCtrl.create({
              header: 'Success',
              subHeader: 'Your payment method is updated.',
              buttons: [{ text: 'Ok' }],
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

  async listInvoices(direction) {
    let query = '';
    if (direction === 'previous'){
      query += '?ending_before=' + this.invoices[0].id;
    }
    if (direction === 'next'){
      query += '?starting_after=' + this.invoices[this.invoices.length - 1].id;
    }
    const invoices: any = await this.paymentService.listInvoices(this.moment._id, query);
    invoices.forEach((invoice) => {
      this.invoices.push(invoice);
    });
  }
}
