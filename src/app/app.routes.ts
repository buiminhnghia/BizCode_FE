import { Routes } from '@angular/router';
import { MarketingLayout } from './layout/marketing-layout/marketing-layout';
import { Home } from './pages/home/home';
import { Pricing } from './pages/pricing/pricing';
import { Services } from './pages/services/services';
import { About } from './pages/about/about';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';

export const routes: Routes = [
  {
    path: '',
    component: MarketingLayout,
    children: [
      { path: '', component: Home },
      { path: 'bang-gia', component: Pricing },
      { path: 'dich-vu', component: Services },
      { path: 'gioi-thieu', component: About },
    ],
  },
  { path: 'dang-nhap', component: Login },
  { path: 'dang-ky', component: Register },
  { path: '**', redirectTo: '' },
];
