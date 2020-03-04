import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowboardpostPage } from './showboardpost.page';

describe('ShowboardpostPage', () => {
  let component: ShowboardpostPage;
  let fixture: ComponentFixture<ShowboardpostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowboardpostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowboardpostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
