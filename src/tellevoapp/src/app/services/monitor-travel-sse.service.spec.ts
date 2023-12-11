import { TestBed } from '@angular/core/testing';

import { MonitorTravelSSEServiceService } from './monitor-travel-sse.service';

describe('TravelSSEServiceService', () => {
  let service: MonitorTravelSSEServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitorTravelSSEServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
