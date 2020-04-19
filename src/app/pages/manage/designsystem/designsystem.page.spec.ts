import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesignsystemPage } from './designsystem.page';

describe('DesignsystemPage', () => {
  let component: DesignsystemPage;
  let fixture: ComponentFixture<DesignsystemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignsystemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesignsystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
