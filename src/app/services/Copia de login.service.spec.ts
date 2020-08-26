import { TestBed, inject } from '@angular/core/testing';

import { CopiaDeLoginService } from './Copia de login.service';

describe('CopiaDeLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CopiaDeLoginService]
    });
  });

  it('should be created', inject([CopiaDeLoginService], (service: CopiaDeLoginService) => {
    expect(service).toBeTruthy();
  }));
});