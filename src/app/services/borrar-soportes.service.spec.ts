import { TestBed, inject } from '@angular/core/testing';

import { BorrarSoportesService } from './borrar-soportes.service';

describe('BorrarSoportesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BorrarSoportesService]
    });
  });

  it('should be created', inject([BorrarSoportesService], (service: BorrarSoportesService) => {
    expect(service).toBeTruthy();
  }));
});