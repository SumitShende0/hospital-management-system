import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { PageNotFoundComponent } from './features/errors/page-not-found/page-not-found.component';
import { PatientFormComponent } from './features/patient-form/patient-form.component';
import { FileInputComponent } from './features/file-input/file-input.component';
import { AppointmentFormComponent } from './features/appointment-form/appointment-form.component';
import { SuccessPageComponent } from './features/success-page/success-page.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'admin',
    component: LoginComponent,
  },
  {
    path: 'patient-form',
    component: PatientFormComponent,
  },
  {
    path: 'appointment-form',
    component: AppointmentFormComponent,
  },
  {
    path: 'success-page',
    component: SuccessPageComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
