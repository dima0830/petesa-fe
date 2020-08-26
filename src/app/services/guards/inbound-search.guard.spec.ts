import { TestBed, async, inject } from '@angular/core/testing';

import { InboundSearchGuard } from './inbound-search.guard';

describe('InboundSearchGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InboundSearchGuard]
    });
  });

  it('should ...', inject([InboundSearchGuard], (guard: InboundSearchGuard) => {
    expect(guard).toBeTruthy();
  }));
});

