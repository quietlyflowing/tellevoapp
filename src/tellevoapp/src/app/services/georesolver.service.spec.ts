import { TestBed } from '@angular/core/testing';

import { GeoresolverService } from './georesolver.service';

describe('GeoresolverService', () => {
  let service: GeoresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
