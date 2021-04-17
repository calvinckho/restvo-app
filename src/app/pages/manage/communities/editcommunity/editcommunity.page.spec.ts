import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcommunityPage } from './editcommunity.page';

describe('EditcommunityPage', () => {
  let component: EditcommunityPage;
  let fixture: ComponentFixture<EditcommunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcommunityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
