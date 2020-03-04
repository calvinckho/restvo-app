import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditparticipantsPage } from './editparticipants.page';

describe('EditparticipantsPage', () => {
  let component: EditparticipantsPage;
  let fixture: ComponentFixture<EditparticipantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditparticipantsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditparticipantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
