import { TestBed, inject } from '@angular/core/testing';

import { GetResultsFileService } from './get-results-file.service';

describe('GetResultsFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetResultsFileService]
    });
  });

  it('should be created', inject([GetResultsFileService], (service: GetResultsFileService) => {
    expect(service).toBeTruthy();
  }));
});