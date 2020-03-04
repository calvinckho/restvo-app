import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import '../../../../assets/js/restvo';
declare var Webflow: any;

@Component({
    selector: 'app-home',
    templateUrl: './mission.page.html',
    styleUrls: ['../home/home.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MissionPage implements OnInit {

    constructor(
    ) {}

    ngOnInit() {
        Webflow.redraw.up();
    }

    scrollEvent() {
        Webflow.scroll.up();
    }
}
