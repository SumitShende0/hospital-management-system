import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
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

  getPatientList() {}
}
