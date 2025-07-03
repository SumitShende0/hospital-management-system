import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getAppointment(
    page: number,
    size: number,
    status?: string,
    sortBy = 'expectedAppointmentDate',
    direction = 'desc'
  ) {
    console.log(status);

    let params = `?page=${page - 1}&size=${size}&direction=${direction}`;
    if (status && status?.toUpperCase() != 'ALL') {
      params += `&status=${status}`;
    }
    console.log('Final URL:', `${this.apiBaseUrl}/appointments${params}`);
    return this.http.get<{ content: any[]; totalElements: number }>(
      `${this.apiBaseUrl}/appointments${params}`
    );
  }

  scheduleAppointment(updatedAppointment: any, appointmentId: string) {
    return this.http.patch<{ message: string }>(
      `${this.apiBaseUrl}/appointment/${appointmentId}/schedule`,
      updatedAppointment
    );
  }

  cancelAppointment(updatedAppointment: any, appointmentId: string) {
    return this.http.patch<{ message: string }>(
      `${this.apiBaseUrl}/appointment/${appointmentId}/cancel`,
      updatedAppointment
    );
  }

  totalNumberOfCancelAppointment(appointmentStatus: string) {
    return this.http.get<{ count: number }>(
      `${this.apiBaseUrl}/appointment/number-of-cancel-appointment/${appointmentStatus}`
    );
  }

  totalNumberOfScheduledAppointment(appointmentStatus: string) {
    return this.http.get<{ count: number }>(
      `${this.apiBaseUrl}/appointment/number-of-scheduled-appointment/${appointmentStatus}`
    );
  }

  totalNumberOfPendingAppointment(appointmentStatus: string) {
    return this.http.get<{ count: number }>(
      `${this.apiBaseUrl}/appointment/number-of-pending-appointment/${appointmentStatus}`
    );
  }

  showImage(imageId: string) {
    return this.http.get(`${this.apiBaseUrl}/image/${imageId}`, {
      responseType: 'blob',
    });
  }
}
