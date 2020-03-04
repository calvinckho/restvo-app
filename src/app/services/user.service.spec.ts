import { TestBed } from '@angular/core/testing';

import { UserData } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserData = TestBed.get(UserData);
    expect(service).toBeTruthy();
  });
});
