import { TestBed } from '@angular/core/testing';

import { IntraPageDataService } from './intra-page-data.service';

describe('IntraPageDataService', () => {
  let service: IntraPageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntraPageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
