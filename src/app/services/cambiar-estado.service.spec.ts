import { TestBed, inject } from '@angular/core/testing';

import { CambiarEstadoService } from './cambiar-estado.service';

describe('CambiarEstadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CambiarEstadoService]
    });
  });

  it('should be created', inject([CambiarEstadoService], (service: CambiarEstadoService) => {
    expect(service).toBeTruthy();
  }));
});