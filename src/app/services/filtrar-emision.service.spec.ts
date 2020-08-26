import { TestBed, inject } from '@angular/core/testing';

import { FiltrarEmisionService } from './filtrar-emision.service';

describe('FiltrarEmisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltrarEmisionService]
    });
  });

  it('should be created', inject([FiltrarEmisionService], (service: FiltrarEmisionService) => {
    expect(service).toBeTruthy();
  }));
});