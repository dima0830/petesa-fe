import { TestBed, async, inject } from '@angular/core/testing';

import { OutboundOperateGuard } from './outbound-operate.guard';

describe('OutboundOperateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutboundOperateGuard]
    });
  });

  it('should ...', inject([OutboundOperateGuard], (guard: OutboundOperateGuard) => {
    expect(guard).toBeTruthy();
  }));
});

