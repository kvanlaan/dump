import { TestBed, inject } from '@angular/core/testing';

import { UberApiService } from './uber-api.service';

describe('UberApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UberApiService]
    });
  });

  it('should be created', inject([UberApiService], (service: UberApiService) => {
    expect(service).toBeTruthy();
  }));
});
