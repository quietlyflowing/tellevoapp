import { TestBed } from '@angular/core/testing';

import { ProtectRecoverySubpageService } from './protect-recovery-subpage.service';

describe('ProtectRecoverySubpageService', () => {
  let service: ProtectRecoverySubpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectRecoverySubpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
