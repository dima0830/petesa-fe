import { TestBed, inject } from '@angular/core/testing';

import { AnaliticaService } from './analitica.service';

describe('AnaliticaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnaliticaService]
    });
  });

  it('should be created', inject([AnaliticaService], (service: AnaliticaService) => {
    expect(service).toBeTruthy();
  }));
});