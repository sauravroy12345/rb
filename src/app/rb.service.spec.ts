import { TestBed } from '@angular/core/testing';

import { RbService } from './rb.service';

describe('RbService', () => {
  let service: RbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
