import { TestBed } from '@angular/core/testing';

import { ControlInstance } from './control-instance';

describe('ControlInstance', () => {
  let service: ControlInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlInstance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
