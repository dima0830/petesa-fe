import { TestBed, inject } from '@angular/core/testing';

import { ServiciopruebaService } from './servicioprueba.service';

describe('ServiciopruebaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiciopruebaService]
    });
  });

  it('should be created', inject([ServiciopruebaService], (service: ServiciopruebaService) => {
    expect(service).toBeTruthy();
  }));
});