import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { PlyrModule } from 'ngx-plyr';

import {IonicStorageModule} from '@ionic/storage';
import {CacheModule} from 'ionic-cache';
import {Push} from '@ionic-native/push/ngx';
import {Badge} from '@ionic-native/badge/ngx';
import {SMS} from '@ionic-native/sms/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {Contacts} from '@ionic-native/contacts/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {NativeGeocoder} from "@ionic-native/native-geocoder/ngx";
import {SpeechRecognition} from "@ionic-native/speech-recognition/ngx";
import {Calendar} from "@ionic-native/calendar/ngx";
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import { NgxStripeModule } from 'ngx-stripe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {ApplicationPipesModule} from "./pipes/application-pipes";
import {IonicGestureConfig} from '../utils/IonicGestureConfig';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {RegisterPageModule} from "./pages/user/register/register.module";
import {ShowrecipientinfoModule} from "./pages/connect/showrecipientinfo/showrecipientinfo.module";
import {ShowfeaturePageModule} from "./pages/feature/showfeature/showfeature.module";
import {PickpeoplePopoverPageModule} from "./pages/feature/pickpeople-popover/pickpeople-popover.module";
import {PickfeaturePopoverPageModule} from "./pages/feature/pickfeature-popover/pickfeature-popover.module";
import {ProgramsPageModule} from "./pages/user/programs/programs.module";
import {UploadmediaPageModule} from "./pages/feature/uploadmedia/uploadmedia.module";

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
      BrowserModule,
      NgxElectronModule,
      HttpClientModule,
      PinchZoomModule,
      PlyrModule,
      CacheModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      ApplicationPipesModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      AppRoutingModule,
      RegisterPageModule,
      ShowfeaturePageModule,
      ShowrecipientinfoModule,
      PickfeaturePopoverPageModule,
      PickpeoplePopoverPageModule,
      ProgramsPageModule,
      UploadmediaPageModule,
      NgxStripeModule.forRoot(),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
      Push,
      Badge,
      CallNumber,
      Contacts,
      SMS,
      EmailComposer,
      AppVersion,
      ScreenOrientation,
      Geolocation,
      NativeGeocoder,
      SpeechRecognition,
      Calendar
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
