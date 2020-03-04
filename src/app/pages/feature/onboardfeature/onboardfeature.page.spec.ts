import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardfeaturePage } from './onboardfeature.page';

describe('OnboardfeaturePage', () => {
  let component: OnboardfeaturePage;
  let fixture: ComponentFixture<OnboardfeaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardfeaturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardfeaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
