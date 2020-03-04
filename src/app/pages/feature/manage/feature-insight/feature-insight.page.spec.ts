import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureInsightPage } from './feature-insight.page';

describe('FeatureInsightPage', () => {
  let component: FeatureInsightPage;
  let fixture: ComponentFixture<FeatureInsightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureInsightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureInsightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
