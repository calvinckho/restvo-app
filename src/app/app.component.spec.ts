import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {IonicModule} from '@ionic/angular';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {ShowgroupPageModule} from './pages/group/showgroup/showgroup.module';
// import {AppRoutingModule} from "./app-routing.module";
import {EditgroupPageModule} from './pages/group/editgroup/editgroup.module';
import {environment} from '../environments/environment';
import {GroupboardPageModule} from './pages/board/groupboard/groupboard.module';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CacheModule} from 'ionic-cache';
import {ShowcommunityPageModule} from './pages/community/showcommunity/showcommunity.module';
import {NgxElectronModule} from 'ngx-electron';
import {NetworkService} from './services/network-service.service';
//import {NetworkServiceMock} from './services/mocks/network-service.service.mock';
import { UserData } from './services/user.service';
//import { UserDataMock } from './services/mocks/user.service.mock';

describe('AppComponent', () => {
    const routes: Routes = [
        {
            path: '',
            redirectTo: '/app/news',
            pathMatch: 'full' },
        {
            path: 'map',
            loadChildren: './pages/map/map.module#MapPageModule' },
        {
            path: 'recover',
            loadChildren: './pages/user/recover/recover.module#RecoverPageModule' },
        {
            path: 'register',
            loadChildren: './pages/user/register/register.module#RegisterPageModule' },
        {
            path: 'app',
            loadChildren: './pages/main-tab/main-tab.module#MainTabPageModule' },
        {
            path: 'home',
            loadChildren: './pages/webflow/home/home.module#HomePageModule' },
        {
            path: 'feature',
            loadChildren: './pages/webflow/feature/feature.module#FeaturePageModule' },
        {
            path: 'pricing',
            loadChildren: './pages/webflow/pricing/pricing.module#PricingPageModule' },
        {
            path: 'mission',
            loadChildren: './pages/webflow/mission/mission.module#MissionPageModule' },
        {
            path: '**',
            redirectTo:  '/app/news',
            pathMatch: 'prefix'
        },
    ];

  // let platformSpy, platformReadySpy;

  beforeEach(async(() => {
    // platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [
          AppComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
          BrowserModule,
          NgxElectronModule,
          HttpClientModule,
          CacheModule.forRoot(),
          FormsModule,
          ReactiveFormsModule,
          IonicModule.forRoot(),
          IonicStorageModule.forRoot(),
          // AppRoutingModule,
          ShowcommunityPageModule,
          ShowgroupPageModule,
          GroupboardPageModule,
          EditgroupPageModule,
          ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
          RouterModule.forRoot(routes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        // { provide: Platform, useValue: platformSpy },
          //{ provide: NetworkService, useClass: NetworkServiceMock },
          //{ provide: UserData, useClass: UserDataMock },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

/*  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
  });*/

  // TODO: add more tests!

});
