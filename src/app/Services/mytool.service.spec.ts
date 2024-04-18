import { TestBed } from '@angular/core/testing';

import { MytoolService } from './mytool.service';

describe('MytoolService', () => {
  let service: MytoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MytoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
