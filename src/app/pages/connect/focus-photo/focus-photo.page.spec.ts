import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusPhotoPage } from './focus-photo.page';

describe('FocusPhotoPage', () => {
  let component: FocusPhotoPage;
  let fixture: ComponentFixture<FocusPhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusPhotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
