import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { PageNotFoundComponent } from './features/errors/page-not-found/page-not-found.component';
import { PatientFormComponent } from './features/patient-form/patient-form.component';
import { FileInputComponent } from './features/file-input/file-input.component';
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
    path: '**',
    component: PageNotFoundComponent,
  },
];
