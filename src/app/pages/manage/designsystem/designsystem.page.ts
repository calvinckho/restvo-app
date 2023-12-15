import {Component, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IonSelect, Platform} from "@ionic/angular";
import {Auth} from "../../../services/auth.service";
import {Chat} from "../../../services/chat.service";
import { Options } from '@angular-slider/ngx-slider';
import { ContactPicker } from '@calvinckho/capacitor-contact-picker';

@Component({
  selector: 'app-designsystem',
  templateUrl: './designsystem.page.html',
  styleUrls: ['./designsystem.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DesignsystemPage implements OnInit {
  @ViewChild('addSelect') select: IonSelect;

  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };
  prefersDark: any;

  constructor(
      public platform: Platform,
      private zone: NgZone,
      public authService: Auth,
      public chatService: Chat,
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

  testJitsiCall() {
    this.chatService.toggleVideoChat({
      videoChatRoomId: '5bd4b9d1ec930b4efdf7ec81',
      videoChatRoomSubject: 'Test with Family',
      channelLastN: '6', // only the last 6 active dominate speakers' stream will be sent
      startWithAudioMuted: true,
      startWithVideoMuted: false
    });
  }

  async openContactList() {
    try {
      const contact: any = await ContactPicker.open();
      console.log("contact results", contact);
    } catch (err) {
      console.log(err);
    }
  }
}
