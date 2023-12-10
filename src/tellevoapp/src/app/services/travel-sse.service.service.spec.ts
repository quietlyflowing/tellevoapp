import { TestBed } from '@angular/core/testing';

import { TravelSSEServiceService } from './travel-sse.service.service';

describe('TravelSSEServiceService', () => {
  let service: TravelSSEServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelSSEServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
