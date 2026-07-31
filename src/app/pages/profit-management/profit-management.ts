import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

type Period = 'month' | 'quarter' | 'year';

interface Kpi {
  icon: string;
  label: string;
  value: string;
  note: string;
  change: string;
  tone: 'navy' | 'pink' | 'red' | 'navy-solid';
}

interface MonthBar {
  label: string;
  pct: number;
  value: string;
}

interface CostShare {
  label: string;
  pct: number;
  tone: 'navy' | 'pink' | 'pink-dim' | 'gray';
}

type ReportStatus = 'done';

interface FinancialRow {
  period: string;
  revenue: number;
  cogs: number;
  opex: number;
  netProfit: number;
  status: ReportStatus;
}

@Component({
  selector: 'app-profit-management',
  imports: [DecimalPipe],
  templateUrl: './profit-management.html',
  styleUrl: './profit-management.scss',
})
export class ProfitManagement {
  protected readonly period = signal<Period>('month');

  protected readonly kpis: Kpi[] = [
    { icon: 'payments', label: 'Tổng lợi nhuận', value: '2,450.8M', note: 'SO VỚI THÁNG TRƯỚC', change: '+12.5%', tone: 'navy' },
    { icon: 'pie_chart', label: 'Tỷ suất lợi nhuận', value: '24.8%', note: 'BIÊN LỢI NHUẬN GỘP', change: '+2.1%', tone: 'pink' },
    { icon: 'account_balance_wallet', label: 'Chi phí vận hành', value: '842.5M', note: 'CHI PHÍ CỐ ĐỊNH & BIẾN ĐỔI', change: '+4.3%', tone: 'red' },
    { icon: 'savings', label: 'Lợi nhuận ròng', value: '1,608.3M', note: 'SAU THUẾ & CHI PHÍ', change: '+8.7%', tone: 'navy-solid' },
  ];

  protected readonly monthBars: MonthBar[] = [
    { label: 'Tháng 01', pct: 64, value: '7.2B' },
    { label: 'Tháng 02', pct: 76, value: '8.5B' },
    { label: 'Tháng 03', pct: 61, value: '6.8B' },
    { label: 'Tháng 04', pct: 90, value: '10.1B' },
    { label: 'Tháng 05', pct: 84, value: '9.4B' },
    { label: 'Tháng 06', pct: 100, value: '11.2B' },
  ];

  protected readonly costShares: CostShare[] = [
    { label: 'Giá vốn (COGS)', pct: 52, tone: 'navy' },
    { label: 'Marketing & Sales', pct: 28, tone: 'pink' },
    { label: 'Vận hành (Admin)', pct: 15, tone: 'pink-dim' },
    { label: 'Khác', pct: 5, tone: 'gray' },
  ];

  protected readonly rows: FinancialRow[] = [
    { period: 'Tháng 06, 2024', revenue: 11200000000, cogs: 5824000000, opex: 1680000000, netProfit: 3696000000, status: 'done' },
    { period: 'Tháng 05, 2024', revenue: 9400000000, cogs: 4888000000, opex: 1410000000, netProfit: 3102000000, status: 'done' },
    { period: 'Tháng 04, 2024', revenue: 10100000000, cogs: 5252000000, opex: 1515000000, netProfit: 3333000000, status: 'done' },
    { period: 'Tháng 03, 2024', revenue: 6800000000, cogs: 3536000000, opex: 1020000000, netProfit: 2244000000, status: 'done' },
    { period: 'Tháng 02, 2024', revenue: 8500000000, cogs: 4420000000, opex: 1275000000, netProfit: 2805000000, status: 'done' },
  ];

  protected readonly statusLabel: Record<ReportStatus, string> = {
    done: 'Hoàn tất',
  };

  protected readonly totalReports = 24;

  setPeriod(value: Period) {
    this.period.set(value);
  }
}
