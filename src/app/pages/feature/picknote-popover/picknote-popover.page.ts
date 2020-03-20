import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AlertController, Events, ModalController, NavParams} from "@ionic/angular";
import {Router} from "@angular/router";
import {CacheService} from "ionic-cache";
import {Resource} from "../../../services/resource.service";
import {Moment} from "../../../services/moment.service";
import {Chat} from "../../../services/chat.service";
import {CalendarService} from "../../../services/calendar.service";

@Component({
  selector: 'app-picknote-popover',
  templateUrl: './picknote-popover.page.html',
  styleUrls: ['./picknote-popover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PicknotePopoverPage implements OnInit {

  @Input() title: any;
  // onboarding process parameters
  @Input() relationshipId: string; // the relationship ID for filtering
  @Input() calendarId: string; // the calendar ID for filtering

  @Input() conversationId: string; // necessary for momentService.share(moment). If provided, the Activity selected will be shared in this conversation chat room
  @Input() allowCreate = false;
  @Input() maxCount = 10; // default max Moment count is 10
  conversation: any;
  searchKeyword = '';
  currentView = 'new';
  relationships_notes = [];
  ionSpinner = false;
  pageNum = 0;
  reachedEnd = false;
  selectedNotes = [];

  constructor(
      private events: Events,
      public router: Router,
      private alertCtrl: AlertController,
      private cache: CacheService,
      public resourceService: Resource,
      private navParams: NavParams,
      public modalCtrl: ModalController,
      private momentService: Moment,
      private chatService: Chat,
      public calendarService: CalendarService
  ) {}

  async ngOnInit() {
    // if picker for Onboarding Processes or if it is pre-selected via Input, assign categoryId the proceed to step 2
    this.loadSamples();

    if (this.conversationId) {
      const index = this.chatService.conversations.map((c) => c.conversation._id).indexOf(this.conversationId);
      if (index > -1) {
        this.conversation = this.chatService.conversations[index].conversation;
      }
    }
  }

  async loadSamples() {
    setTimeout(async () => {
      this.reachedEnd = false;
      this.relationships_notes = [{}];
      this.pageNum = 0;
      this.loadMoreNotes();
    }, 50);
  }

  async loadMoreNotes() {
    this.pageNum++;
    if (!this.reachedEnd) {
      const relationships_notes: any = await this.momentService.loadNotes(this.relationshipId, this.calendarId);
      this.ionSpinner = false;
      // temp overide the paging function: i.e. only load page 1
      this.reachedEnd = true;
      if (!relationships_notes.length) {
        this.reachedEnd = true;
      } else {
        this.relationships_notes = relationships_notes;
        console.log("show", this.relationships_notes);
      }
    } else {
      this.ionSpinner = false;
    }
  }

  selectCalendarItem(calendarItem) {
    // restore moment as parent and calendar as child object
    const selectedCalendar = JSON.parse(JSON.stringify(calendarItem));
    const selectedMoment = JSON.parse(JSON.stringify(calendarItem.moment));
    selectedCalendar.moment = selectedMoment._id;
    selectedMoment.calendar = selectedCalendar;
    if (this.conversation) {
      selectedMoment.conversations = [this.conversation];
    }
    selectedMoment.type = 'recent';
    this.selectedNotes.push(selectedMoment);
    if (this.selectedNotes.length > this.maxCount) {
      this.selectedNotes.splice(0, 1);
    }
  }

  selectSample(sample) {
    if (this.conversation) {
      sample.conversations = [this.conversation];
    }
    sample.type = 'new'; // type 'new' is used in parent component to indicate that a selected moment needs to be cloned
    this.selectedNotes.push(sample);
    if (this.selectedNotes.length > this.maxCount) {
      this.selectedNotes.splice(0, 1);
    }
  }

  async openFeature(event, moment) {
    event.stopPropagation();
    this.momentService.openMoment({ moment: moment, modalPage: true});
  }

  async removeMoment(i) {
    this.selectedNotes.splice(i, 1);
  }

  async done() {
    this.modalCtrl.dismiss(this.selectedNotes);
  }

  async createMoment() {
    /*if (this.categoryId === '5c915324e172e4e64590e346') { // create a community
      this.close();
      this.router.navigate(['/app/create/community', { categoryId: this.categoryId }]);
    } else { // create other Activities
      this.close(); // close the Picker, then open up the create view.
      this.momentService.editMoment({categoryId: this.categoryId, programId: this.programId, parent_programId: this.parent_programId, conversationId: this.conversation ? this.conversation._id : null, modalPage: true });
    }*/
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
