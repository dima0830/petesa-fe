import { TestBed, async, inject } from '@angular/core/testing';

import { ShowTrackSearchGuard } from './show-track-search.guard';

describe('ShowTrackSearchGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowTrackSearchGuard]
    });
  });

  it('should ...', inject([ShowTrackSearchGuard], (guard: ShowTrackSearchGuard) => {
    expect(guard).toBeTruthy();
  }));
});

