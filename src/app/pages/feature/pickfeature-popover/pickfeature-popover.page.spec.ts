import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickfeaturePopoverPage } from './pickfeature-popover.page';

describe('PickfeaturePopoverPage', () => {
  let component: PickfeaturePopoverPage;
  let fixture: ComponentFixture<PickfeaturePopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickfeaturePopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickfeaturePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
