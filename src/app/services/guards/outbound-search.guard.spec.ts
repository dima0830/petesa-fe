import { TestBed, async, inject } from '@angular/core/testing';

import { OutboundSearchGuard } from './outbound-search.guard';

describe('OutboundSearchGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutboundSearchGuard]
    });
  });

  it('should ...', inject([OutboundSearchGuard], (guard: OutboundSearchGuard) => {
    expect(guard).toBeTruthy();
  }));
});

