import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditfeaturePage } from './editfeature.page';
import {ApplicationPipesModule} from "../../../pipes/application-pipes";
import { PlyrModule } from 'ngx-plyr';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
    path: '',
    component: EditfeaturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ApplicationPipesModule,
    PlyrModule,
    IonicModule,
    QuillModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [EditfeaturePage]
})
export class EditfeaturePageModule {}
