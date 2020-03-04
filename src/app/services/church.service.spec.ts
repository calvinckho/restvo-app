import { TestBed } from '@angular/core/testing';

import { Churches } from './church.service';

describe('ChurchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Churches = TestBed.get(Churches);
    expect(service).toBeTruthy();
  });
});
