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
import { Payroll } from './pages/payroll/payroll';
import { BonusPenalty } from './pages/bonus-penalty/bonus-penalty';
import { Attendance } from './pages/attendance/attendance';
import { Announcements } from './pages/announcements/announcements';
import { Customers } from './pages/customers/customers';
import { SalesOrders } from './pages/sales-orders/sales-orders';
import { Transactions } from './pages/transactions/transactions';
import { SalesManagement } from './pages/sales-management/sales-management';
import { Warranty } from './pages/warranty/warranty';
import { StockReport } from './pages/stock-report/stock-report';
import { StockManagement } from './pages/stock-management/stock-management';
import { Products } from './pages/products/products';
import { ProfitManagement } from './pages/profit-management/profit-management';
import { Branches } from './pages/branches/branches';
import { PurchaseOrders } from './pages/purchase-orders/purchase-orders';
import { AuditRevenue } from './pages/audit-revenue/audit-revenue';
import { ProfitLoss } from './pages/profit-loss/profit-loss';
import { TotalPayroll } from './pages/total-payroll/total-payroll';
import { BusinessOverview } from './pages/business-overview/business-overview';
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
      { path: 'quan-ly-luong', component: Payroll },
      { path: 'thuong-phat', component: BonusPenalty },
      { path: 'quan-ly-cham-cong', component: Attendance },
      { path: 'thong-bao-noi-bo', component: Announcements },
      { path: 'quan-ly-khach-hang', component: Customers },
      { path: 'quan-ly-don-hang', component: SalesOrders },
      { path: 'quan-ly-khoan-thu-chi', component: Transactions },
      { path: 'quan-ly-ban-hang', component: SalesManagement },
      { path: 'quan-ly-bao-hanh', component: Warranty },
      { path: 'bao-cao-ton-kho', component: StockReport },
      { path: 'quan-ly-hang-ton-kho', component: StockManagement },
      { path: 'quan-ly-san-pham', component: Products },
      { path: 'quan-ly-loi-nhuan', component: ProfitManagement },
      { path: 'quan-ly-chi-nhanh', component: Branches },
      { path: 'quan-ly-don-dat-hang', component: PurchaseOrders },
      { path: 'quan-ly-tong-doanh-thu', component: AuditRevenue },
      { path: 'quan-ly-lai-lo', component: ProfitLoss },
      { path: 'tong-luong-nhan-vien', component: TotalPayroll },
      { path: 'tinh-hinh-kinh-doanh', component: BusinessOverview },
    ],
  },
  { path: '**', redirectTo: '' },
];
