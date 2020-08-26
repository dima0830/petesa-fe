import { TestBed, inject } from '@angular/core/testing';

import { RecordarContrasenaService } from './recordar-contrasena.service';

describe('RecordarContrasenaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordarContrasenaService]
    });
  });

  it('should be created', inject([RecordarContrasenaService], (service: RecordarContrasenaService) => {
    expect(service).toBeTruthy();
  }));
});