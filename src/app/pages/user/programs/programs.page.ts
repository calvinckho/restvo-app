import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserData} from "../../../services/user.service";
import {ModalController} from "@ionic/angular";
import {ShowfeaturePage} from "../../feature/showfeature/showfeature.page";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProgramsPage implements OnInit, OnDestroy {

  @Input() modalPage: any;

  subscriptions: any = {};
  resources: any;
  programs: any;

  constructor(
      private router: Router,
      private storage: Storage,
      public userData: UserData,
      private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
      this.subscriptions['refreshUserStatus'] = this.userData.refreshUserStatus$.subscribe(this.refreshHandler);
  }

    refreshHandler = () => {
        if (this.userData.user) {
            this.loadPrograms();
        }
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
// this is where I need to work to make the changes
    selectDefault(event, program) {
      event.stopPropagation();
      console.log(this.userData)
      this.userData.defaultProgram = program;
<<<<<<< HEAD
      console.log(program)
      console.log("testing the program!")
      //Not sure if we need this line of code due to getting rid of the "mentoring toggle" feature
=======
>>>>>>> removed Mentoring mode button. The first program/community joined is now set as default Dashboard page for user
      this.userData.UIMentoringMode = true;
      this.storage.set('defaultProgram', this.userData.defaultProgram);
<<<<<<< HEAD

      // to here
      let activityURL;
        if (program.user_list_2.includes(this.userData.user._id) || program.user_list_3.includes(this.userData.user._id)) {
=======
      //let activityURL;
        /*if (program.user_list_2.includes(this.userData.user._id) || program.user_list_3.includes(this.userData.user._id)) {
>>>>>>> introduce admin section
            activityURL = '/app/dashboard/insight/' + this.userData.defaultProgram._id;
        } else {
            activityURL = '/app/discover/home/' + this.userData.defaultProgram._id;
        }*/
        this.router.navigate(['/app/discover/home/' + this.userData.defaultProgram._id]);
        if (this.modalPage) {
            setTimeout(() => {
                this.closeModal();
            }, 1000);
        }
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }

    ngOnDestroy() {
        this.subscriptions['refreshUserStatus'].unsubscribe(this.refreshHandler);
    }
}
