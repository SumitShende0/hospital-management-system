import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { PageNotFoundComponent } from './features/errors/page-not-found/page-not-found.component';
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
    path: '**',
    component: PageNotFoundComponent,
  },
];
