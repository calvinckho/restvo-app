import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupboardPage } from './groupboard.page';

describe('GroupboardPage', () => {
  let component: GroupboardPage;
  let fixture: ComponentFixture<GroupboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
