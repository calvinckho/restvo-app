import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeatureTemplatePageRoutingModule } from './feature-template-routing.module';
import { FeatureTemplatePage } from './feature-template.page';
import {ApplicationPipesModule} from '../../../../pipes/application-pipes';
import {CalendarModule} from 'angular-calendar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ApplicationPipesModule,
        CalendarModule,
        FeatureTemplatePageRoutingModule
    ],
  declarations: [FeatureTemplatePage]
})
export class FeatureTemplatePageModule {}
