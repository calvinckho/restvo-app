import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecommunityPage } from './createcommunity.page';

describe('CreatecommunityPage', () => {
  let component: CreatecommunityPage;
  let fixture: ComponentFixture<CreatecommunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecommunityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
