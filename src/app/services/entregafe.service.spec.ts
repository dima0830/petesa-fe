import { TestBed, inject } from '@angular/core/testing';

import { EntregafeService } from './entregafe.service';

describe('EntregafeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntregafeService]
    });
  });

  it('should be created', inject([EntregafeService], (service: EntregafeService) => {
    expect(service).toBeTruthy();
  }));
});