import { TestBed, inject } from '@angular/core/testing';

import { ShowErrorService } from './show-error.service';

describe('ShowErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowErrorService]
    });
  });

  it('should be created', inject([ShowErrorService], (service: ShowErrorService) => {
    expect(service).toBeTruthy();
  }));
});
