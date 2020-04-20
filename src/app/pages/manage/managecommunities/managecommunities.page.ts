import {Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router} from '@angular/router';
import {
    ActionSheetController,
    ModalController,
    AlertController,
    PopoverController,
    Platform,
    IonContent
} from '@ionic/angular';
import { UserData } from "../../../services/user.service";
import { Churches } from "../../../services/church.service";
import { Chat } from "../../../services/chat.service";
import { Auth } from "../../../services/auth.service";
import { Resource } from "../../../services/resource.service";
import {InvitetoconnectPage} from "../../connect/invitetoconnect/invitetoconnect.page";
import {AnalyticsPage} from "../analytics/analytics.page";
import {ActivitiesPage} from "../activities/activities.page";
import {MembersPage} from "../members/members.page";
import {TopicsPage} from "../topics/topics.page";
import {GroupsPage} from "../groups/groups.page";
import {AdministratorsPage} from "../administrators/administrators.page";
import {CommunitiesPage} from "../communities/communities.page";
import {PaymentService} from "../../../services/payment.service";
import {ShowcommunityPage} from "../../community/showcommunity/showcommunity.page";
import {DevelopmentPage} from "../development/development.page";

@Component({
  selector: 'app-managecommunities',
  templateUrl: './managecommunities.page.html',
  styleUrls: ['./managecommunities.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManagecommunitiesPage implements OnInit, OnDestroy {
    @ViewChild(IonContent, {static: false}) content: IonContent;

    subscriptions: any = {};
    title = '';
    restvoStaff: boolean = false;
    stripeCustomer: any;
    selectedMenuOption = '';
    menu = [
        {
            url: 'insight',
            label: 'Insight',
            component: AnalyticsPage,
        },
        {
            url: 'activities',
            label: 'Activities',
            component: ActivitiesPage,
        },
        {
            url: 'members',
            label: 'Members',
            component: MembersPage,
        },
        {
            url: 'topics',
            label: 'Topics',
            component: TopicsPage,
        },
        {
            url: 'groups',
            label: 'Groups',
            component: GroupsPage,
        },
        {
            url: 'administrators',
            label: 'Administrators',
            component: AdministratorsPage,
        },
        {
            url: 'platforms',
            label: 'Platforms',
            component: CommunitiesPage,
        },
        {
            url: 'development',
            label: 'Development',
            component: DevelopmentPage,
        }
    ];

    constructor(private router: Router,
                private storage: Storage,
                private platform: Platform,
                private authService: Auth,
                private chatService: Chat,
                public userData: UserData,
                private churchService: Churches,
                private paymentService: PaymentService,
                private resourceService: Resource,
                private modalCtrl: ModalController,
                private alertCtrl: AlertController,
                private popoverCtrl: PopoverController,
                private actionSheetCtrl: ActionSheetController) {}

    async ngOnInit() {
        if (this.userData && this.userData.hasPlatformAdminAccess) {
            this.setupManagePage();
            this.title = this.userData.user.churches[this.userData.currentCommunityIndex].name;
        }

        // link refresh user observable with refresh user handler
        this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshUserHandler);
    }

    refreshUserHandler = (data) => {
        if (data && (data.type === 'update admin' || data.type === 'change aux data')) {
            this.setupManagePage();
        }
        if (data && data.type === 'refresh manage page') {
            this.loadCommunity();
        }
    };

    async setupManagePage() {
        await this.loadCommunity();
        let currentSubPage: any;
        if (this.router.url === '/app/manage') {
            currentSubPage = this.menu.find((c) => c.url === 'profile');
            this.selectedMenuOption = this.platform.width() >= 768 ? 'profile' : '';
        } else {
            currentSubPage = this.menu.find((c) => this.router.url.includes(c.url));
            if (currentSubPage) {
                this.selectedMenuOption = this.platform.width() >= 768 ? currentSubPage.url : '';
            }
        }
        if (currentSubPage) {
            this.title = this.userData.user.churches[this.userData.currentCommunityIndex].name + (currentSubPage.label.length ? ': ' : '') + currentSubPage.label;
        }
        this.restvoStaff = (['owner','admin','staff']).includes(this.userData.user.role);
        console.log("page", this.router.url, this.selectedMenuOption);
    }

    async loadCommunity() {
        this.stripeCustomer = await this.paymentService.loadCustomer(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
        [this.churchService.currentManagedCommunity] = await this.churchService.loadChurchProfile(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
        this.churchService.currentManagedCommunity.admins.forEach((admin) => {
            admin.role = "Admin";
            admin.wee_user = true;
        });
        await this.churchService.checkAbuseReport(this.userData.user.churches[this.userData.currentCommunityIndex]._id);
        if (this.router.url.indexOf('billing') > -1 && !this.stripeCustomer) {
            this.clickManageMenu('plan');
        } else {
            this.userData.refreshUserStatus({ type: 'load community ready' });
        }
    }

    async clickManageMenu(menuOption) {
        const menuItem = this.menu.find((c) => c.url === menuOption);
        if (this.platform.width() >= 768) {
            this.selectedMenuOption = menuOption;
            this.router.navigateByUrl('/app/manage/' + menuOption);
        } else {
            this.selectedMenuOption = '';
            const manageModal = await this.modalCtrl.create({ component: menuItem.component, componentProps: { modalPage: true } });
            await manageModal.present();
        }
    }

    async showCommunityProfile() {
        const showCommunityProfileModal = await this.modalCtrl.create({component: ShowcommunityPage,
            componentProps: {
                community: this.userData.user.churches[this.userData.currentCommunityIndex]
            }
        });
        await showCommunityProfileModal.present();
        const {data: refreshNeeded} = await showCommunityProfileModal.onDidDismiss();
        if (refreshNeeded) {
            this.setupManagePage();
        }
    }

    async invite() {
        const buttons = [
            {
                text: 'Restvo Users',
                handler: () => {
                    this.invitePage('Restvo Users');
                }
            },
            {
                text: 'Email',
                handler: () => {
                    this.invitePage('Email');
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                }
            }];
        if (this.platform.is('cordova')) {
            buttons.splice(1, 0, {
                text: 'SMS Message',
                handler: () => {
                    this.invitePage('SMS Message');
                }
            });
        }
        const actionSheet = await this.actionSheetCtrl.create({header: 'Invite a Friend', buttons: buttons});
        await actionSheet.present();
    }

    async invitePage(type) {
        const invitePage = await this.modalCtrl.create({component: InvitetoconnectPage, componentProps: {type: type}});
        await invitePage.present();
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

    ngOnDestroy() {
        this.userData.splitPaneState = 'md';
        // PWA fast load listener + reload listener
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshUserHandler);
    }
}
