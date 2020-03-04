import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagefeaturePage } from './managefeature.page';

describe('ManagefeaturePage', () => {
  let component: ManagefeaturePage;
  let fixture: ComponentFixture<ManagefeaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagefeaturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagefeaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
