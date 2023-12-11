import { TestBed } from '@angular/core/testing';

import { WillBePickedUpService } from './will-be-picked-up.service';

describe('WillBePickedUpService', () => {
  let service: WillBePickedUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WillBePickedUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
