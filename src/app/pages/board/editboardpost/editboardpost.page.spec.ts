import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditboardpostPage } from './editboardpost.page';
import {ApplicationPipesModuleMock} from "../../../pipes/mocks/application-pipes.mock";

describe('EditboardpostPage', () => {
  let component: EditboardpostPage;
  let fixture: ComponentFixture<EditboardpostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditboardpostPage ],
        imports: [
            ApplicationPipesModuleMock
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditboardpostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
