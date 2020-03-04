import { TestBed } from '@angular/core/testing';

import { Systemlog } from './systemlog.service';

describe('SystemlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Systemlog = TestBed.get(Systemlog);
    expect(service).toBeTruthy();
  });
});
