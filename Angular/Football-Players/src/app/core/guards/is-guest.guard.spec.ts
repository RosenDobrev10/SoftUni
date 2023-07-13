import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isGuestGuard } from './is-guest.guard';

describe('isGuestGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isGuestGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
