import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcommunityPage } from './searchcommunity.page';

describe('SearchcommunityPage', () => {
  let component: SearchcommunityPage;
  let fixture: ComponentFixture<SearchcommunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchcommunityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
