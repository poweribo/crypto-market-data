import { TestBed } from '@angular/core/testing';

import { OrderfeedService } from './orderfeed.service';

describe('OrderfeedService', () => {
  let service: OrderfeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderfeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
