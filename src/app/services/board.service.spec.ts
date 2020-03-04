import { TestBed } from '@angular/core/testing';

import { Board } from './board.service';

describe('BoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Board = TestBed.get(Board);
    expect(service).toBeTruthy();
  });
});
