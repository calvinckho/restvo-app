import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyconversationsPage } from './myconversations.page';

describe('MyconversationsPage', () => {
  let component: MyconversationsPage;
  let fixture: ComponentFixture<MyconversationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyconversationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyconversationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
