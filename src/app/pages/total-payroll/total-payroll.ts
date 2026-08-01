import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

type PayrollStatus = 'approved' | 'awaiting' | 'paid';

interface EmployeePayroll {
  id: string;
  code: string;
  name: string;
  department: string;
  base: number;
  allowance: number;
  deduction: number;
  net: number;
  status: PayrollStatus;
}

interface TaxBreakdownRow {
  label: string;
  value: string;
  pct: number;
  tone: 'navy' | 'mauve' | 'dark';
}

@Component({
  selector: 'app-total-payroll',
  imports: [DecimalPipe],
  templateUrl: './total-payroll.html',
  styleUrl: './total-payroll.scss',
})
export class TotalPayroll {
  protected readonly payPeriod = 'Tháng 10/2023';

  protected readonly stats = [
    { icon: 'account_balance_wallet', label: 'Tổng quỹ lương', value: '1,245,000,000 ₫', note: '+2.4% so với tháng trước', tone: 'positive' as const, accent: 'navy' as const },
    { icon: 'shield', label: 'Thuế & Bảo hiểm', value: '186,750,000 ₫', note: 'Chiếm 15% tổng quỹ lương', tone: 'neutral' as const, accent: 'mauve' as const },
    { icon: 'analytics', label: 'Lương TB/NV', value: '18,500,000 ₫', note: 'Dựa trên 142 nhân viên', tone: 'neutral' as const, accent: 'dark' as const },
    { icon: 'check_circle', label: 'NV đã thanh toán', value: '0 / 142', note: 'Đang chờ xử lý thanh toán', tone: 'negative' as const, accent: 'blue' as const },
  ];

  protected readonly departments = ['Tất cả phòng ban', 'Kỹ thuật', 'Marketing', 'Kế toán', 'Hành chính'];

  protected readonly statusOptions: { value: 'all' | PayrollStatus; label: string }[] = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'approved', label: 'Đã duyệt' },
    { value: 'awaiting', label: 'Chờ duyệt' },
    { value: 'paid', label: 'Đã thanh toán' },
  ];

  protected readonly employees: EmployeePayroll[] = [
    { id: 'e1', code: 'BC-00124', name: 'Nguyễn Văn An', department: 'Kỹ thuật', base: 25000000, allowance: 3500000, deduction: 2400000, net: 26100000, status: 'awaiting' },
    { id: 'e2', code: 'BC-00125', name: 'Trần Thị Bình', department: 'Marketing', base: 18000000, allowance: 2000000, deduction: 1800000, net: 18200000, status: 'approved' },
    { id: 'e3', code: 'BC-00126', name: 'Lê Hoàng Cường', department: 'Kỹ thuật', base: 22000000, allowance: 1500000, deduction: 2100000, net: 21400000, status: 'awaiting' },
    { id: 'e4', code: 'BC-00127', name: 'Phạm Minh Đức', department: 'Hành chính', base: 12000000, allowance: 1000000, deduction: 1200000, net: 11800000, status: 'approved' },
    { id: 'e5', code: 'BC-00128', name: 'Vũ Hải Yến', department: 'Kế toán', base: 20000000, allowance: 5000000, deduction: 3000000, net: 22000000, status: 'awaiting' },
  ];

  protected readonly selectedDepartment = signal('Tất cả phòng ban');
  protected readonly selectedStatus = signal<'all' | PayrollStatus>('all');

  protected readonly filteredEmployees = computed(() => {
    const dept = this.selectedDepartment();
    const status = this.selectedStatus();
    return this.employees.filter((e) => {
      const matchesDept = dept === 'Tất cả phòng ban' || e.department === dept;
      const matchesStatus = status === 'all' || e.status === status;
      return matchesDept && matchesStatus;
    });
  });

  protected readonly totalEmployees = 142;

  protected readonly taxBreakdown: TaxBreakdownRow[] = [
    { label: 'Bảo hiểm xã hội (DN đóng 17.5%)', value: '124,500,000 ₫', pct: 65, tone: 'navy' },
    { label: 'Bảo hiểm y tế (DN đóng 3%)', value: '21,340,000 ₫', pct: 15, tone: 'mauve' },
    { label: 'Thuế TNCN tạm tính', value: '40,910,000 ₫', pct: 20, tone: 'dark' },
  ];

  setDepartment(value: string) {
    this.selectedDepartment.set(value);
  }

  setStatus(value: string) {
    this.selectedStatus.set(value as 'all' | PayrollStatus);
  }
}