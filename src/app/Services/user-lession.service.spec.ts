import { TestBed } from '@angular/core/testing';

import { UserLessionService } from './user-lession.service';

describe('UserLessionService', () => {
  let service: UserLessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
