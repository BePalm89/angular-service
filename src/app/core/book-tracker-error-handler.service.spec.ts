import { TestBed } from '@angular/core/testing';

import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';

describe('BookTrackerErrorHandlerService', () => {
  let service: BookTrackerErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookTrackerErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
