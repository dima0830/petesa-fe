import { TestBed, inject } from '@angular/core/testing';

import { DataTransportService } from './data-transport.service';

describe('DataTransportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTransportService]
    });
  });

  it('should be created', inject([DataTransportService], (service: DataTransportService) => {
    expect(service).toBeTruthy();
  }));
});