import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

type PlStatus = 'pending' | 'audited';

interface SummaryCard {
  label: string;
  value: string;
  change: string;
  tone: 'positive' | 'negative';
  accent?: 'secondary' | 'highlight';
}

interface MonthlyRow {
  period: string;
  revenue: number;
  cogs: number;
  opex: number;
  other: number;
  otherTone: 'positive' | 'negative' | 'neutral';
  net: number;
  status: PlStatus;
}

interface ChartMonth {
  label: string;
  revenuePct: number;
  profitPct: number;
  current?: boolean;
}

@Component({
  selector: 'app-profit-loss',
  imports: [DecimalPipe],
  templateUrl: './profit-loss.html',
  styleUrl: './profit-loss.scss',
})
export class ProfitLoss {
  protected readonly summary: SummaryCard[] = [
    { label: 'Doanh thu thuần', value: '12,480.50 M', change: '+12.4% so với năm trước', tone: 'positive' },
    { label: 'Tổng chi phí', value: '7,120.30 M', change: '+5.2% so với năm trước', tone: 'negative' },
    { label: 'Lợi nhuận gộp', value: '5,360.20 M', change: '+18.1% so với năm trước', tone: 'positive', accent: 'secondary' },
    { label: 'Lợi nhuận ròng', value: '3,850.15 M', change: '+21.5% so với năm trước', tone: 'positive', accent: 'highlight' },
  ];

  protected readonly statusLabel: Record<PlStatus, string> = {
    pending: 'Pending',
    audited: 'Audited',
  };

  protected readonly rows: MonthlyRow[] = [
    { period: 'Tháng 05/2024', revenue: 2450000000, cogs: 1200000000, opex: 450000000, other: -25000000, otherTone: 'negative', net: 775000000, status: 'pending' },
    { period: 'Tháng 04/2024', revenue: 2120000000, cogs: 1050000000, opex: 410000000, other: 12000000, otherTone: 'positive', net: 672000000, status: 'audited' },
    { period: 'Tháng 03/2024', revenue: 2890000000, cogs: 1500000000, opex: 480000000, other: 0, otherTone: 'neutral', net: 910000000, status: 'audited' },
    { period: 'Tháng 02/2024', revenue: 1850000000, cogs: 980000000, opex: 390000000, other: -18000000, otherTone: 'negative', net: 462000000, status: 'audited' },
  ];

  protected readonly totals = {
    revenue: 9310000000,
    cogs: 4730000000,
    opex: 1730000000,
    other: -31000000,
    net: 2819000000,
  };

  protected readonly totalMonths = 12;

  protected readonly chartMonths: ChartMonth[] = [
    { label: 'Th12', revenuePct: 75, profitPct: 25 },
    { label: 'Th1', revenuePct: 66, profitPct: 20 },
    { label: 'Th2', revenuePct: 80, profitPct: 33 },
    { label: 'Th3', revenuePct: 90, profitPct: 40 },
    { label: 'Th4', revenuePct: 75, profitPct: 25 },
    { label: 'Th5', revenuePct: 100, profitPct: 45, current: true },
  ];

  protected readonly aiInsight = 'Lợi nhuận ròng tháng 5 tăng 15% so với tháng trước, chủ yếu nhờ việc tối ưu hóa chi phí vận hành tại kho trung tâm. Dự kiến quý tới có thể duy trì đà tăng trưởng nếu chi phí logistic được giữ ổn định.';
}
