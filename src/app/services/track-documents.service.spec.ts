import { TestBed, inject } from '@angular/core/testing';

import { TrackDocumentsService } from './track-documents.service';

describe('TrackDocumentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackDocumentsService]
    });
  });

  it('should be created', inject([TrackDocumentsService], (service: TrackDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});