import { TestBed } from '@angular/core/testing';

import { Aws } from './aws.service';

describe('AwsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Aws = TestBed.get(Aws);
    expect(service).toBeTruthy();
  });
});
