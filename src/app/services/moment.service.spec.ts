import { TestBed } from '@angular/core/testing';

import { Moment } from './moment.service';

describe('MomentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Moment = TestBed.get(Moment);
    expect(service).toBeTruthy();
  });
});
