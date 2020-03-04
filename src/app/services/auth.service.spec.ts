import { TestBed } from '@angular/core/testing';

import { Auth } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Auth = TestBed.get(Auth);
    expect(service).toBeTruthy();
  });
});
