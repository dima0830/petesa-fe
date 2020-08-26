import { TestBed, inject } from '@angular/core/testing';

import { GetHelpService } from './get-help.service';

describe('GetHelpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetHelpService]
    });
  });

  it('should be created', inject([GetHelpService], (service: GetHelpService) => {
    expect(service).toBeTruthy();
  }));
});