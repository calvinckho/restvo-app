import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfeaturePage } from './editfeature.page';

describe('EditfeaturePage', () => {
  let component: EditfeaturePage;
  let fixture: ComponentFixture<EditfeaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfeaturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfeaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
