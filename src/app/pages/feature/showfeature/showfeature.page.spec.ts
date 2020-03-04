import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowfeaturePage } from './showfeature.page';

describe('ShowfeaturePage', () => {
  let component: ShowfeaturePage;
  let fixture: ComponentFixture<ShowfeaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowfeaturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowfeaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
