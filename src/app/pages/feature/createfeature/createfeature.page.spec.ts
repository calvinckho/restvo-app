import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefeaturePage } from './createfeature.page';

describe('CreatefeaturePage', () => {
  let component: CreatefeaturePage;
  let fixture: ComponentFixture<CreatefeaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefeaturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefeaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
