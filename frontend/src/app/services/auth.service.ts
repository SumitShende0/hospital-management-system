import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { userEmail: string; userPassword: string }) {
    console.log(credentials);

    return this.http.post(`${this.apiBaseUrl}/login`, credentials, {
      withCredentials: true,
    });
  }

  refreshToken(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiBaseUrl}/refreshToken`,
      {},
      { withCredentials: true }
    );
  }

  logout(): void {
    // Remove access token
    localStorage.removeItem('access_token');
    
    this.router.navigate(['']);
  }
}
