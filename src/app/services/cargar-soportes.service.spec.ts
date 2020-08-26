import { TestBed, inject } from '@angular/core/testing';

import { CargarSoportesService } from './cargar-soportes.service';

describe('CargarSoportesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargarSoportesService]
    });
  });

  it('should be created', inject([CargarSoportesService], (service: CargarSoportesService) => {
    expect(service).toBeTruthy();
  }));
});