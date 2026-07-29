import { Routes } from '@angular/router';
import { MarketingLayout } from './layout/marketing-layout/marketing-layout';
import { AppLayout } from './layout/app-layout/app-layout';
import { Home } from './pages/home/home';
import { Pricing } from './pages/pricing/pricing';
import { Services } from './pages/services/services';
import { About } from './pages/about/about';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { CompanyInfo } from './pages/company-info/company-info';
import { BankAccounts } from './pages/bank-accounts/bank-accounts';
import { Licenses } from './pages/licenses/licenses';
import { CompanyStructure } from './pages/company-structure/company-structure';
import { Dashboard } from './pages/dashboard/dashboard';

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
  {
    path: 'app',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'thong-tin-doanh-nghiep', pathMatch: 'full' },
      { path: 'thong-tin-doanh-nghiep', component: CompanyInfo },
      { path: 'ngan-hang', component: BankAccounts },
      { path: 'giay-phep', component: Licenses },
      { path: 'cau-truc-bo-may', component: CompanyStructure },
      { path: 'nhan-su', component: Dashboard },
    ],
  },
  { path: '**', redirectTo: '' },
];
