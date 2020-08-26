import { TestBed, inject } from '@angular/core/testing';

import { FiltrarRecepcionService } from './filtrar-recepcion.service';

describe('FiltrarRecepcionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltrarRecepcionService]
    });
  });

  it('should be created', inject([FiltrarRecepcionService], (service: FiltrarRecepcionService) => {
    expect(service).toBeTruthy();
  }));
});