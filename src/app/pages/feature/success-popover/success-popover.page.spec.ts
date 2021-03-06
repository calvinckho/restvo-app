import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuccessPopoverPage } from './success-popover.page';

describe('SuccessPopoverPage', () => {
  let component: SuccessPopoverPage;
  let fixture: ComponentFixture<SuccessPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
