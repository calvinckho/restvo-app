import { TestBed } from '@angular/core/testing';

import { Response } from './response.service';

describe('ResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Response = TestBed.get(Response);
    expect(service).toBeTruthy();
  });
});
