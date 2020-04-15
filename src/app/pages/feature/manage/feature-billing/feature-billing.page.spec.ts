import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeatureBillingPage } from './feature-billing.page';

describe('FeatureBillingPage', () => {
  let component: FeatureBillingPage;
  let fixture: ComponentFixture<FeatureBillingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureBillingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureBillingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
