import { TestBed } from '@angular/core/testing';

import { PageEvents } from './page-events';

describe('PageEvents', () => {
  let service: PageEvents;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageEvents);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
