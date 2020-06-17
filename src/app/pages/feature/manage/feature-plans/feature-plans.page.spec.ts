import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeaturePlansPage } from './feature-plans.page';

describe('FeaturePlansPage', () => {
  let component: FeaturePlansPage;
  let fixture: ComponentFixture<FeaturePlansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturePlansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePlansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
