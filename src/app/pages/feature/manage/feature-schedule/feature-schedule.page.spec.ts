import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSchedulePage } from './feature-schedule.page';

describe('FeatureSchedulePage', () => {
  let component: FeatureSchedulePage;
  let fixture: ComponentFixture<FeatureSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
