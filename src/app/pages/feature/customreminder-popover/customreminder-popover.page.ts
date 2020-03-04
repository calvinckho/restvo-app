import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AlertController, PopoverController } from "@ionic/angular";

@Component({
  selector: 'app-customreminder-popover',
  templateUrl: './customreminder-popover.page.html',
  styleUrls: ['./customreminder-popover.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomreminderPopoverPage implements OnInit {

    //time constants
    MINUTES_IN_HOUR = 60;
    MINUTES_IN_DAY = 1440;
    MINUTES_IN_WEEK = 10080;
    MINUTES_IN_MONTH = 43800;

    reminderString: String = '';
    displayString: String = '';
    minutes: any;
    hours: any;
    days: any;
    weeks: any;
    timeValue: any;
    timeUnit: String = "m";

    timeUnitAbreviations: any = ["m","h","d","w"];
    timeUnitDisplayStrings: any = ["min","h","days","weeks"];

    constructor(
        private alertCtrl: AlertController,
        public popoverCtrl: PopoverController,
    ) { }

  async ngOnInit() {
  }

    async getReminderString() {
        //make sure input is a valid number
        if ( !Number.isNaN( parseInt( this.timeValue ) ) ) {
            this.timeValue = parseInt( this.timeValue );
            this.displayString = this.timeValue + " " + this.timeUnitDisplayStrings[ this.timeUnitAbreviations.indexOf( this.timeUnit )] + " before";
        }
        else {
            let networkAlert = await this.alertCtrl.create({
                header: 'Not a valid time',
                message: 'Please enter a valid number',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await networkAlert.present();
        }

        // convert all times to minutes
        this.timeValue = this.convertTimeToMinutes( this.timeValue , this.timeUnit );

        this.reminderString = this.timeValue.toString();

        //alert user if reminder is over a month before event
        if ( this.timeValue > this.MINUTES_IN_MONTH ) {
            let alert = await this.alertCtrl.create({
                header: 'Cannot set reminder for over a month before event',
                message: 'Please enter a valid time',
                buttons: ['Dismiss'],
                cssClass: 'level-15'
            });
            await alert.present();
        }

        return this.reminderString;
    }

    convertTimeToMinutes( timeValue , timeUnit ) {
        if ( timeUnit === "h" ) {
            timeValue *= this.MINUTES_IN_HOUR;
        }
        else if ( timeUnit === "d" ) {
            timeValue *= this.MINUTES_IN_DAY;
        }
        else if ( timeUnit === "w" ) {
            timeValue *= this.MINUTES_IN_WEEK;
        }
        return timeValue;
    }

    close() {
        this.getReminderString();
        console.log( this.displayString );
        this.popoverCtrl.dismiss( [this.reminderString , this.displayString] );
    }
}
