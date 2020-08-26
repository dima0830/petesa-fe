import { TestBed, inject } from '@angular/core/testing';

import { CargafeService } from './cargafe.service';

describe('CargafeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargafeService]
    });
  });

  it('should be created', inject([CargafeService], (service: CargafeService) => {
    expect(service).toBeTruthy();
  }));
});