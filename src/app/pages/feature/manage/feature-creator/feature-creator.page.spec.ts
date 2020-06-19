import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeatureCreatorPage } from './feature-creator.page';

describe('FeatureCreatorPage', () => {
  let component: FeatureCreatorPage;
  let fixture: ComponentFixture<FeatureCreatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureCreatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCreatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
