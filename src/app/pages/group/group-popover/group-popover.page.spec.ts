import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPopoverPage } from './group-popover.page';

describe('GroupPopoverPage', () => {
  let component: GroupPopoverPage;
  let fixture: ComponentFixture<GroupPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
