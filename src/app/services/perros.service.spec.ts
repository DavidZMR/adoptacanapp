import { TestBed } from '@angular/core/testing';

import { PerrosService } from './perros.service';

describe('PerrosService', () => {
  let service: PerrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
