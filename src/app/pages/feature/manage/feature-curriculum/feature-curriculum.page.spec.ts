import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeatureCurriculumPage } from './feature-curriculum.page';

describe('FeatureCurriculumPage', () => {
  let component: FeatureCurriculumPage;
  let fixture: ComponentFixture<FeatureCurriculumPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureCurriculumPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCurriculumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
