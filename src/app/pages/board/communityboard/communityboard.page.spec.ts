import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityboardPage } from './communityboard.page';
import {ApplicationPipesModuleMock} from "../../../pipes/mocks/application-pipes.mock";
import {ActionSheetController, IonContent, Events, IonInfiniteScroll, NavController, ModalController, AlertController, IonSlides} from '@ionic/angular';
import {CacheService} from 'ionic-cache';
import {Storage} from '@ionic/storage';
import {NavigationEnd, Router} from '@angular/router';

describe('CommunityboardPage', () => {

  let component: CommunityboardPage;
  let fixture: ComponentFixture<CommunityboardPage>;

  beforeEach(async(() => {

      const storage = jasmine.createSpyObj('Storage', ['set']);
      storageSetSpy = storage.set.and.returnValue( of(true) );

      returnedValue = [];
      const cacheService = jasmine.createSpyObj('CacheService', ['loadFromDelayedObservable']);
      loadFromDelayedSpy = cacheService.loadFromDelayedObservable.and.returnValue( of(returnedValue) );

      const router = jasmine.createSpyObj('Router', ['events']);
      routerEventSpy = router.events.and.returnValue( of({}) );

      TestBed.configureTestingModule({
      declarations: [
          CommunityboardPage
      ],
      imports: [
          ApplicationPipesModuleMock,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
          ActionSheetController, IonContent, Events, IonInfiniteScroll, NavController, ModalController, AlertController, IonSlides,
          { provide: Storage, useValue: storage },
          { provide: CacheService, useValue: cacheService },
          { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
