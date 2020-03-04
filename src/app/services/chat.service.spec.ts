import { TestBed } from '@angular/core/testing';

import { Chat } from './chat.service';

describe('ChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Chat = TestBed.get(Chat);
    expect(service).toBeTruthy();
  });
});
