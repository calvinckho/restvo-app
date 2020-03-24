import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteprofilePage } from './completeprofile.page';

describe('CompleteprofilePage', () => {
  let component: CompleteprofilePage;
  let fixture: ComponentFixture<CompleteprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
