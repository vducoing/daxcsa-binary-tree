import { TestBed } from '@angular/core/testing';

import { DaxcsaDataService } from './daxcsa-data.service';

describe('DaxcsaDataService', () => {
  let service: DaxcsaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaxcsaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
