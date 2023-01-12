import { TestBed } from '@angular/core/testing';

import { CostingreportService } from './costingreport.service';

describe('CostingreportService', () => {
  let service: CostingreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostingreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
