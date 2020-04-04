import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Resource} from '../../../services/resource.service';
import {get} from "scriptjs";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuController, Platform} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {Chat} from "../../../services/chat.service";
import {Auth} from "../../../services/auth.service";

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-videoconference',
  templateUrl: './videoconference.page.html',
  styleUrls: ['./videoconference.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoconferencePage implements OnInit {
  @ViewChild('videoConference', {static: false}) videoConference: any;

  videoChatRoomId: any;
  videoChatRoomSubject = ' ';
  channelLastN = '6'; // only the last 6 active dominate speakers' stream will be sent
  startWithAudioMuted = false;
  startWithVideoMuted = false;

  jitsi: any = {};
  videoEnded = false;

  constructor(
      public platform: Platform,
      public location: Location,
      private router: Router,
      private menuCtrl: MenuController,
      private route: ActivatedRoute,
      private resourceService: Resource,
      private authService: Auth,
      private userData: UserData,
      private chatService: Chat
  ) { }

  async ngOnInit() {
    this.authService.cachedRouteParams = this.route.snapshot.params;
    this.videoChatRoomId = this.route.snapshot.paramMap.get('id');
    this.videoChatRoomSubject = this.route.snapshot.paramMap.get('videoChatRoomSubject') || this.videoChatRoomSubject;
    this.channelLastN = this.route.snapshot.paramMap.get('channelLastN') || this.channelLastN;
    this.startWithAudioMuted = this.route.snapshot.paramMap.get('startWithAudioMuted') === 'true';
    this.startWithVideoMuted = this.route.snapshot.paramMap.get('startWithVideoMuted') === 'true';
    if (this.videoChatRoomId && this.platform.is('cordova')) { // if open via deeplinking by mobile app
      setTimeout(() => {
        this.chatService.toggleVideoChat({
          videoChatRoomId: this.videoChatRoomId,
          videoChatRoomSubject: this.videoChatRoomSubject,
          channelLastN: this.channelLastN, // only the last 6 active dominate speakers' stream will be sent
          startWithAudioMuted: this.startWithAudioMuted,
          startWithVideoMuted: this.startWithVideoMuted,
        });
      }, 8000);
    } else if (this.videoChatRoomId && !this.platform.is('mobileweb')) { // only if chat room ID is valid and if platform is desktop
      this.initializeVideoConference();
    }
  }

  async initializeVideoConference() {
    const videoEndpoint: any = await this.resourceService.assignVideoEndpoint(this.videoChatRoomId);
    get('https://meet.jit.si/external_api.js', () => {
      const domain = videoEndpoint.url;
      const options = {
        roomName: this.videoChatRoomId,
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#videoConference'),
        configOverwrite: {
          channelLastN: parseInt(this.channelLastN || '-1', 10),
          startWithAudioMuted: this.startWithAudioMuted,
          startWithVideoMuted: this.startWithVideoMuted,
          externalConnectUrl: 'https://app.restvo.com/video/' + this.videoChatRoomId
        },
        interfaceConfigOverwrite: {
          APP_NAME: 'Restvo Video',
          NATIVE_APP_NAME: 'Restvo',
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: true,
          BRAND_WATERMARK_LINK: 'https://wee.nyc3.cdn.digitaloceanspaces.com/app/icon_email.png',
          DEFAULT_REMOTE_DISPLAY_NAME: 'Restvo friend',
          ENABLE_FEEDBACK_ANIMATION: false,
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'info', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'invite', 'stats', 'shortcuts',
            'tileview'
          ],
          MOBILE_APP_PROMO: false
        },
        onload: this.onJitsiLoaded()
      };
      this.jitsi = new JitsiMeetExternalAPI(domain, options);
    });
  }

  onJitsiLoaded = async () => {
    console.log('loaded Jitsi');
    if (!this.platform.is('cordova')) {
      setTimeout(async () => {
        if (this.userData && this.userData.user) {
          this.jitsi.executeCommand('displayName', this.userData.user.first_name + ' ' + this.userData.user.last_name);
        }
        if (this.userData && this.userData.user && this.userData.user.avatar) {
          this.jitsi.executeCommand('avatarUrl', this.userData.user.avatar);
        }
        this.jitsi.executeCommand('subject', (this.videoChatRoomSubject || ' '));
        this.jitsi.on('readyToClose', this.onJitsiUnloaded);
      }, 1000);
      setTimeout(async () => {
        if (this.userData && this.userData.user && await this.userData.checkRestExpired()) { this.chatService.socket.emit('online status', this.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'online', origin: this.chatService.socket.id, videoChatRoomId: this.videoChatRoomId }); }
      }, 8000);
    }
  }

  onJitsiUnloaded = async () => {
    console.log('unloading Jitsi');
    //this.readyToControlVideoChat = true;
    if (this.userData.user && await this.userData.checkRestExpired()) {
      this.chatService.socket.emit('online status', this.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'leave video chat', origin: this.chatService.socket.id, videoChatRoomId: this.videoChatRoomId });
    }
    if (!this.platform.is('cordova')) {
      await this.jitsi.dispose();
      // @ts-ignore
      $(`#videoConference`).empty();
      this.videoEnded = true;
    }
  };

  reload() {
    window.location.reload();
  }

  async goToHome() {
    await this.menuCtrl.enable(this.userData.user);
    this.router.navigateByUrl('/');
  }
}
