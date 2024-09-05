import { IdsSnackbarService } from './snackbar.service';

import { TestBed } from '@angular/core/testing';

describe('IdsSnackbarService', () => {
  let service: IdsSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdsSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
