import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcommunityPage } from './showcommunity.page';

describe('ShowcommunityPage', () => {
  let component: ShowcommunityPage;
  let fixture: ComponentFixture<ShowcommunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcommunityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
