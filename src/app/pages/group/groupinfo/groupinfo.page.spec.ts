import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupinfoPage } from './groupinfo.page';

describe('GroupinfoPage', () => {
  let component: GroupinfoPage;
  let fixture: ComponentFixture<GroupinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
