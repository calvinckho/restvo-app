import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoconferencePage } from './videoconference.page';

describe('VideoconferencePage', () => {
  let component: VideoconferencePage;
  let fixture: ComponentFixture<VideoconferencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoconferencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoconferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
