import { TestBed, inject } from '@angular/core/testing';

import { CheckpermService } from './checkperm.service';

describe('CheckpermService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckpermService]
    });
  });

  it('should be created', inject([CheckpermService], (service: CheckpermService) => {
    expect(service).toBeTruthy();
  }));
});