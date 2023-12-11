import { TestBed } from '@angular/core/testing';

import { SeekTravelService } from './seek-travel.service';

describe('SeekTravelService', () => {
  let service: SeekTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
