import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgroupmembersPage } from './listgroupmembers.page';

describe('ListgroupmembersPage', () => {
  let component: ListgroupmembersPage;
  let fixture: ComponentFixture<ListgroupmembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListgroupmembersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListgroupmembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
