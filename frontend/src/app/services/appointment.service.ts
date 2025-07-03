import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  apiBaseUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient, private router: Router) {}

  addAppointment(appointmentDetails: any) {
    return this.http.post(
      `${this.apiBaseUrl}/appointment`,
      appointmentDetails,
      { responseType: 'text' }
    );
  }
}
