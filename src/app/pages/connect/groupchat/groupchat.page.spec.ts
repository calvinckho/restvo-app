import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupchatPage } from './groupchat.page';

describe('GroupchatPage', () => {
  let component: GroupchatPage;
  let fixture: ComponentFixture<GroupchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupchatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
