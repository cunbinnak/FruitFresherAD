import { TestBed } from '@angular/core/testing';

import { CategoriesserviceService } from './categoriesservice.service';

describe('CategoriesserviceService', () => {
  let service: CategoriesserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
