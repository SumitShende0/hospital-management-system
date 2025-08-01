import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

let isRefreshing = false;
let refreshFailed = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Inject the auth service
  const accessToken = localStorage.getItem('access_token');
  const router = inject(Router);
  let authReq = req;

  if (
    req.url.includes('api/login') ||
    req.url.includes('api/refreshToken') ||
    req.url.includes('api/check-email') ||
    req.url.includes('api/image/upload')
  ) {
    return next(req); // Pass the request as-is
  }

  if (accessToken) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !isRefreshing && !refreshFailed) {
        isRefreshing = true;
        // Token expired → try refreshing
        return authService.refreshToken().pipe(
          switchMap((res) => {
            // Save new access token
            localStorage.setItem('access_token', res.token);

            // Clone the original request with new token
            const newRequest = req.clone({
              setHeaders: { Authorization: `Bearer ${res.token}` },
            });

            return next(newRequest); // retry original request
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            refreshFailed = true;

            // refresh failed → optional logout
            authService.logout();
            router.navigate(['']);
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error); // other errors
    })
  );
};
