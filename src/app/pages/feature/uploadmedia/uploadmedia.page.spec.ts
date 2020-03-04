import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadmediaPage } from './uploadmedia.page';

describe('UploadmediaPage', () => {
  let component: UploadmediaPage;
  let fixture: ComponentFixture<UploadmediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadmediaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadmediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
