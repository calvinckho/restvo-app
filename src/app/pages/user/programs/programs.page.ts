import {Component, Input, ViewEncapsulation} from '@angular/core';
import {UserData} from "../../../services/user.service";
import {Events, ModalController} from "@ionic/angular";
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProgramsPage {

  @Input() modalPage: any;
  programs: any;

  constructor(
      private router: Router,
      private storage: Storage,
      private events: Events,
      public userData: UserData,
      private modalCtrl: ModalController
  ) { }

  async ionViewWillEnter() {
    if (this.userData.user) {
      this.loadPrograms();
    }
      this.events.subscribe('refreshUserStatus', this.refreshHandler);
  }

    refreshHandler = () => {
        this.loadPrograms();
    };

  async loadPrograms() {
      this.userData.defaultProgram = await this.storage.get('defaultProgram');
      this.programs = await this.userData.loadPrograms(false);
    this.programs.forEach((program) => {
        if (program.user_list_1.includes(this.userData.user._id)) {
          program.isParticipant = true;
        }
        if (program.user_list_2.includes(this.userData.user._id)) {
            program.isOrganizer = true;
        }
        if (program.user_list_3.includes(this.userData.user._id)) {
            program.isLeader = true;
        }
    });
  }

  async openProgram(event, program) {
      event.stopPropagation();
      if (!this.modalPage) {
          this.router.navigate(['/app/user/activity/' + program._id], { replaceUrl: false });
      } else {
          const recipientModal = await this.modalCtrl.create({component: ShowfeaturePage, componentProps: { moment: { _id: program._id }, modalPage: true}} );
          await recipientModal.present();
      }
  }

    selectDefault(event, program) {
      event.stopPropagation();
      this.userData.defaultProgram = program;
      this.userData.UIAdminMode = true;
      this.storage.set('defaultProgram', this.userData.defaultProgram);
      let activityURL;
        if (program.user_list_2.includes(this.userData.user._id) || program.user_list_3.includes(this.userData.user._id)) {
            activityURL = '/app/dashboard/insight/' + this.userData.defaultProgram._id;
        } else {
            activityURL = '/app/discover/home/' + this.userData.defaultProgram._id;
        }
        this.router.navigate([activityURL]);
        if (this.modalPage) {
            setTimeout(() => {
                this.closeModal();
            }, 1000);
        }
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }

    ionViewWillLeave() {
        this.events.unsubscribe('refreshUserStatus', this.refreshHandler);
    }
}
