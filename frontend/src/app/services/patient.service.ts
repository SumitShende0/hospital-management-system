import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  apiBaseUrl: string = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  registerPatient(patientDetails: any) {
    return this.httpClient.post(`${this.apiBaseUrl}/patient`, patientDetails, {
      withCredentials: true,
    });
  }

  checkEmailAvailability(email: string) {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<{ available: boolean }>(
      `${this.apiBaseUrl}/check-email`,
      { params }
    );
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file); // 'image' must match your backend param name

    return this.httpClient.post(`${this.apiBaseUrl}/image/upload`, formData);
  }
}
