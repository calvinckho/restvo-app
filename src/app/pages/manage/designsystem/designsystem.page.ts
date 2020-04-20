import {Component, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IonSelect, Platform} from "@ionic/angular";
import {Auth} from "../../../services/auth.service";

@Component({
  selector: 'app-designsystem',
  templateUrl: './designsystem.page.html',
  styleUrls: ['./designsystem.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignsystemPage implements OnInit {
  @ViewChild('addSelect', {static: false}) select: IonSelect;

  prefersDark: any;

  constructor(
      public platform: Platform,
      private zone: NgZone,
      public authService: Auth
  ) { }

  ngOnInit() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.toggleDarkTheme(this.prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    this.prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
  }

  // Add or remove the "dark" class based on if the media query matches
  toggleDarkTheme(shouldAdd) {
    console.log("check color", shouldAdd)
    this.zone.run(() => {
      document.body.classList.toggle('dark', shouldAdd);
    });
  }
}
