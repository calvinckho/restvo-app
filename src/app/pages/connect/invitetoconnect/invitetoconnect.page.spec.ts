import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitetoconnectPage } from './invitetoconnect.page';

describe('InvitetoconnectPage', () => {
  let component: InvitetoconnectPage;
  let fixture: ComponentFixture<InvitetoconnectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitetoconnectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitetoconnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
