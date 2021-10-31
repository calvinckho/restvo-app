import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { DashboardPage } from './dashboard.page';
import {Platform} from "@ionic/angular";

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let statusBarSpy, splashScreenSpy, platformSpy;

  beforeEach(waitForAsync(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    TestBed.configureTestingModule({
      declarations: [ DashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
          { provide: StatusBar, useValue: statusBarSpy },
          { provide: SplashScreen, useValue: splashScreenSpy },
          { provide: Platform, useValue: platformSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
