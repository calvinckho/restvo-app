import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgroupPage } from './editgroup.page';

describe('EditgroupPage', () => {
  let component: EditgroupPage;
  let fixture: ComponentFixture<EditgroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditgroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
