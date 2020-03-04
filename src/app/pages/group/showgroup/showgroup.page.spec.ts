import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowgroupPage } from './showgroup.page';

describe('ShowgroupPage', () => {
  let component: ShowgroupPage;
  let fixture: ComponentFixture<ShowgroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowgroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowgroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
