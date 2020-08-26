import { TestBed, async, inject } from '@angular/core/testing';

import { InboundOperateGuard } from './inbound-operate.guard';

describe('InboundOperateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InboundOperateGuard]
    });
  });

  it('should ...', inject([InboundOperateGuard], (guard: InboundOperateGuard) => {
    expect(guard).toBeTruthy();
  }));
});

