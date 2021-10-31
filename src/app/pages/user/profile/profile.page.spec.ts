import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfilePage } from './profile.page';

describe('AccountInfoPage', () => {
    let component: ProfilePage;
    let fixture: ComponentFixture<ProfilePage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ ProfilePage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfilePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
