import { TestBed } from '@angular/core/testing';

import { Groups } from './group.service';

describe('GroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Groups = TestBed.get(Groups);
    expect(service).toBeTruthy();
  });
});
