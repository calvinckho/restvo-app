import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickpeoplePopoverPage } from './pickpeople-popover.page';

describe('PickpeoplePopoverPage', () => {
  let component: PickpeoplePopoverPage;
  let fixture: ComponentFixture<PickpeoplePopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickpeoplePopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickpeoplePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
