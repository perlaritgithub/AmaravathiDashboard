import { TestBed } from '@angular/core/testing';

import { AdddataService } from './adddata.service';

describe('AdddataService', () => {
  let service: AdddataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdddataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
