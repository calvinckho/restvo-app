import { TestBed } from '@angular/core/testing';

import { Resource } from './resource.service';

describe('ResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Resource = TestBed.get(Resource);
    expect(service).toBeTruthy();
  });
});
