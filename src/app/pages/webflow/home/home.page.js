"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
require("../../../../assets/webflow/restvo");
var HomePage = (function () {
    function HomePage() {
    }
    HomePage.prototype.scrollEvent = function () {
        Webflow.scroll.up();
    };
    HomePage.prototype.scrollTo = function (selector) {
        console.log("clicked");
        /*let y = document.getElementById(selector).offsetTop;
        this.content.scrollToPoint(0, y);*/
    };
    HomePage.prototype.ngOnInit = function () {
        console.log("show", Webflow, window);
        Webflow.redraw.up();
    };
    HomePage.prototype.ngOnDestroy = function () {
        Webflow.destroy();
    };
    return HomePage;
}());
__decorate([
    core_1.ViewChild(angular_1.IonContent)
], HomePage.prototype, "content", void 0);
HomePage = __decorate([
    core_1.Component({
        selector: 'app-home',
        templateUrl: './home.page.html',
        styleUrls: ['./home.page.scss'],
        encapsulation: core_1.ViewEncapsulation.None,
    })
], HomePage);
exports.HomePage = HomePage;
