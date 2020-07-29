import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService); // Tutorial says to use TestBed.inject, but angular version may not be up to date.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
