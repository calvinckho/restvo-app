import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyPage } from './reply.page';

describe('ReplyPage', () => {
  let component: ReplyPage;
  let fixture: ComponentFixture<ReplyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
