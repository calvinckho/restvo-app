import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmycommunitiesPage } from './listmycommunities.page';

describe('ListmycommunitiesPage', () => {
  let component: ListmycommunitiesPage;
  let fixture: ComponentFixture<ListmycommunitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmycommunitiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmycommunitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
