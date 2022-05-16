import { TestBed } from '@angular/core/testing';

import { KsserviceService } from './ksservice.service';

describe('KsserviceService', () => {
  let service: KsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
