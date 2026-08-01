import { Component, signal } from '@angular/core';

interface PayrollRow {
  initials: string;
  name: string;
  role: string;
  base: string;
  allowance: string;
  deduction: string;
  net: string;
  status: 'paid' | 'pending' | 'error';
}

@Component({
  selector: 'app-payroll',
  imports: [],
  templateUrl: './payroll.html',
  styleUrl: './payroll.scss',
})
export class Payroll {
  protected readonly period = signal('Tháng 11/2023');
  protected readonly periods = ['Tháng 10/2023', 'Tháng 11/2023', 'Tháng 12/2023'];

  protected readonly summary = {
    total: '2.45B',
    employees: 142,
    paidRate: '85%',
  };

  protected readonly rows: PayrollRow[] = [
    { initials: 'TL', name: 'Trần Long', role: 'Software Engineer', base: '32,000,000', allowance: '+ 4,500,000', deduction: '- 1,200,000', net: '35,300,000', status: 'paid' },
    { initials: 'HA', name: 'Hoàng Anh', role: 'UI/UX Designer', base: '28,500,000', allowance: '+ 2,000,000', deduction: '- 950,000', net: '29,550,000', status: 'pending' },
    { initials: 'NM', name: 'Nguyễn Minh', role: 'Project Manager', base: '45,000,000', allowance: '+ 8,000,000', deduction: '- 4,500,000', net: '48,500,000', status: 'paid' },
    { initials: 'PV', name: 'Phạm Văn', role: 'Accountant', base: '18,000,000', allowance: '+ 1,500,000', deduction: '- 600,000', net: '18,900,000', status: 'error' },
    { initials: 'LT', name: 'Lê Thu', role: 'HR Specialist', base: '22,000,000', allowance: '+ 3,000,000', deduction: '- 1,100,000', net: '23,900,000', status: 'paid' },
  ];

  protected readonly statusLabel: Record<PayrollRow['status'], string> = {
    paid: 'Paid',
    pending: 'Pending',
    error: 'Error',
  };

  protected readonly totalEmployees = 142;
  protected readonly pageSize = 5;
  protected readonly totalPages = Math.ceil(this.totalEmployees / this.pageSize);
  protected readonly page = signal(1);

  protected readonly trendBars = [
    { month: 'Jun', h: 40 },
    { month: 'Jul', h: 55 },
    { month: 'Aug', h: 50 },
    { month: 'Sep', h: 65 },
    { month: 'Oct', h: 80 },
    { month: 'Nov', h: 95, current: true },
  ];

  protected readonly costBreakdown = [
    { label: 'Lương cơ bản', pct: 72, tone: 'navy' as const },
    { label: 'Phụ cấp & Thưởng', pct: 18, tone: 'pink' as const },
    { label: 'Bảo hiểm & Thuế', pct: 10, tone: 'gray' as const },
  ];

  setPeriod(value: string) {
    this.period.set(value);
  }

  goToPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page.set(p);
    }
  }
}