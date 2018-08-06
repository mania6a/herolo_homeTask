import { TestBed, inject } from '@angular/core/testing';

import { CheckBookService } from './check-book.service';

describe('CheckBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckBookService]
    });
  });

  it('should be created', inject([CheckBookService], (service: CheckBookService) => {
    expect(service).toBeTruthy();
  }));
});
