import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const successGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const successData = sessionStorage.getItem('successData');

  if (successData) {
    return true;
  } else {
    return router.parseUrl('/appointment-form');
  }
};
