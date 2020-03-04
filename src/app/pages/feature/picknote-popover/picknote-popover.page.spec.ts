import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicknotePopoverPage } from './picknote-popover.page';

describe('PicknotePopoverPage', () => {
  let component: PicknotePopoverPage;
  let fixture: ComponentFixture<PicknotePopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicknotePopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicknotePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
