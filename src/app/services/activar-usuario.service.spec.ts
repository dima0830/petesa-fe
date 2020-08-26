import { TestBed, inject } from '@angular/core/testing';

import { ActivarUsuarioService } from './activar-usuario.service';

describe('ActivarUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivarUsuarioService]
    });
  });

  it('should be created', inject([ActivarUsuarioService], (service: ActivarUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});