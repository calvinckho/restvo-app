import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecommunitiesPage } from './managecommunities.page';

describe('ManagecommunitiesPage', () => {
  let component: ManagecommunitiesPage;
  let fixture: ComponentFixture<ManagecommunitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecommunitiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecommunitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
