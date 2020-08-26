import { TestBed, inject } from '@angular/core/testing';

import { FiltroTrackService } from './filtro-track.service';

describe('FiltroTrackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltroTrackService]
    });
  });

  it('should be created', inject([FiltroTrackService], (service: FiltroTrackService) => {
    expect(service).toBeTruthy();
  }));
});