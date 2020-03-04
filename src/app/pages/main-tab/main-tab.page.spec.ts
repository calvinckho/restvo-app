import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTabPage } from './main-tab.page';

describe('MainTabPage', () => {
  let component: MainTabPage;
  let fixture: ComponentFixture<MainTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
