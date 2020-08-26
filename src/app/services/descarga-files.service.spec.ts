import { TestBed, inject } from '@angular/core/testing';

import { DescargaFilesService } from './descarga-files.service';

describe('DescargaFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DescargaFilesService]
    });
  });

  it('should be created', inject([DescargaFilesService], (service: DescargaFilesService) => {
    expect(service).toBeTruthy();
  }));
});