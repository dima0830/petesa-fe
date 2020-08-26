import { TestBed, inject } from '@angular/core/testing';

import { CheckTrackidService } from './check-trackid.service';

describe('CheckTrackidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckTrackidService]
    });
  });

  it('should be created', inject([CheckTrackidService], (service: CheckTrackidService) => {
    expect(service).toBeTruthy();
  }));
});