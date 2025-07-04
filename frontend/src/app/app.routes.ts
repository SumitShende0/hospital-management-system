import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { PageNotFoundComponent } from './features/errors/page-not-found/page-not-found.component';
import { PatientFormComponent } from './features/patient-form/patient-form.component';
import { FileInputComponent } from './features/file-input/file-input.component';
import { AppointmentFormComponent } from './features/appointment-form/appointment-form.component';
import { SuccessPageComponent } from './features/success-page/success-page.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { roleGuard } from './guards/role.guard';
import { successGuard } from './guards/success.guard';
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
    // component: PatientFormComponent,
    loadComponent: () =>
      import('./features/patient-form/patient-form.component').then(
        (m) => m.PatientFormComponent
      ),
  },
  {
    path: 'appointment-form',
    // component: AppointmentFormComponent,
    canActivate: [roleGuard],
    data: { role: 'PATIENT' },
    loadComponent: () =>
      import('./features/appointment-form/appointment-form.component').then(
        (m) => {
          import('./features/success-page/success-page.component');
          return m.AppointmentFormComponent;
        }
      ),
  },
  {
    path: 'appointment-form/success-page',
    // component: SuccessPageComponent,
    canActivate: [successGuard],
    loadComponent: () =>
      import('./features/success-page/success-page.component').then(
        (m) => m.SuccessPageComponent
      ),
  },
  {
    path: 'admin-dashboard',
    // component: AdminDashboardComponent
    canActivate: [roleGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./features/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
