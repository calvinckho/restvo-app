import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Events, ModalController, Platform} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {PreferencesPage} from "../../discover/preferences/preferences.page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AboutPage implements OnInit, OnDestroy {

  @Input() modalPage: any;
  programs: any;
  role: any;

  constructor(
      private platform: Platform,
      private router: Router,
      private events: Events,
      public modalCtrl: ModalController,
      public userData: UserData,
  ) { }

  ngOnInit() {
    this.events.subscribe('refreshUserStatus', this.refreshUserStatusHandler);
  }

  refreshUserStatusHandler = () => {
    this.loadAnswers();
  };

  ionViewWillEnter() {
    if (this.userData.user) {
      this.loadAnswers();
    }
  }

  async loadAnswers() {
    const result: any = await this.userData.loadMyOnboardingAnswers();
    this.programs = result.programs;
    if (this.programs) {
      for (const program of this.programs) {
        for (const leader of program.leader) {
          if (leader.role) {
            this.role = leader.role;
          }
        }
      }
    }
  }

  async openOnbaordingProcess(programId) {
    if (this.platform.width() >= 768 && !this.modalPage) {
      if (!programId) {
        this.router.navigate(['/app/user/allpreferences', { showHeader: true }]);
      } else {
        this.router.navigate(['/app/user/preferences/' + programId, { showHeader: true }]);
      }
    } else {
      const modal = await this.modalCtrl.create({ component: PreferencesPage, componentProps: { programId: programId, modalPage: true } });
      await modal.present();
      const {data: refreshNeeded} = await modal.onDidDismiss();
      if (refreshNeeded) {
        this.loadAnswers();
      }
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.events.unsubscribe('refreshUserStatus', this.refreshUserStatusHandler);
  }
}
