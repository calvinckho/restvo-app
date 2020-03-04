import {Component, ViewEncapsulation} from '@angular/core';
import '../../../../assets/js/restvo';
declare var Webflow: any;

@Component({
    selector: 'app-home',
    templateUrl: './pricing.page.html',
    styleUrls: ['../home/home.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PricingPage {

    constructor(
    ) {}

    scrollEvent() {
        Webflow.scroll.up();
    }
}