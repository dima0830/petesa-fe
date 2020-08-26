import { TestBed, inject } from '@angular/core/testing';

import { ResetPwdService } from './reset-pwd.service';

describe('ResetPwdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetPwdService]
    });
  });

  it('should be created', inject([ResetPwdService], (service: ResetPwdService) => {
    expect(service).toBeTruthy();
  }));
});