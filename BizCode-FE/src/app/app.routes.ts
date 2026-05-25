import { Routes } from '@angular/router';
import { LandingPage } from './pages/auth/landing-page/landing-page';
import { MainLayout } from './layouts/auth/main-layout/main-layout';
import { login } from './pages/auth/Login/login';
import { register } from './pages/auth/register/register';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: LandingPage,
      },
      {
        path: 'login',
        component: login,
      },
      {
        path: 'register',
        component: register,
      },
    ],
  },
];