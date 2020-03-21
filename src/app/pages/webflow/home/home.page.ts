import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {IonContent} from '@ionic/angular';
import '../../../../assets/js/restvo';
declare var Webflow: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit, OnDestroy {
    @ViewChild(IonContent, {static: false}) content: IonContent;

    constructor(
    ) {}

    ngOnInit() {
        console.log("show", Webflow, window);
        Webflow.redraw.up();
    }

    scrollEvent() {
        Webflow.scroll.up();
    }

    scrollTo(selector) {
        console.log("clicked");
        /*let y = document.getElementById(selector).offsetTop;
        this.content.scrollToPoint(0, y);*/
    }

    ngOnDestroy() {
        Webflow.destroy();
    }
}
