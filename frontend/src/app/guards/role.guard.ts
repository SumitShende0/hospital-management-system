import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const expectedRole = route.data['role'];
  const token = localStorage.getItem('access_token');
  const router = inject(Router);

  if (!token) {
    console.warn('No token found');
    return router.parseUrl('/');
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload.role;
    console.log('Decoded Token Payload:', payload);
    console.log('Expected Role:', expectedRole);
    console.log('User Role:', payload.role);
    if (payload.role === expectedRole) {
      return true;
    }
    if (userRole === 'ADMIN') {
      return router.parseUrl('/admin-dashboard');
    }

    if (userRole === 'PATIENT') {
      return router.parseUrl('/appointment-form');
    }

    // Default fallback
    return router.parseUrl('/');
  } catch (e) {
    console.error('Invalid token:', e);
    return router.parseUrl('/');
  }
};
