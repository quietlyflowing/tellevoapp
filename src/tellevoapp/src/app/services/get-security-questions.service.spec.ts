import { TestBed } from '@angular/core/testing';

import { GetSecurityQuestionsService } from './get-security-questions.service';

describe('GetSecurityQuestionsService', () => {
  let service: GetSecurityQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSecurityQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
