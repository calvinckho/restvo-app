import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoconferencePageRoutingModule } from './videoconference-routing.module';

import { VideoconferencePage } from './videoconference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoconferencePageRoutingModule
  ],
  declarations: [VideoconferencePage]
})
export class VideoconferencePageModule {}
