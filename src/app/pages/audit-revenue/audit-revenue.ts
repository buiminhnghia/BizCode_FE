import { Component } from '@angular/core';

type ReportStatus = 'audited' | 'reviewing';

interface KpiCard {
  icon: string;
  label: string;
  value: string;
  note: string | null;
  tone: 'navy' | 'mauve' | 'neutral' | 'solid';
}

interface MonthRow {
  period: string;
  gross: string;
  opex: string;
  tax: string;
  net: string;
  status: ReportStatus;
}

interface RevenueSource {
  label: string;
  pct: number;
  tone: 'navy' | 'mauve' | 'dark';
}

@Component({
  selector: 'app-audit-revenue',
  imports: [],
  templateUrl: './audit-revenue.html',
  styleUrl: './audit-revenue.scss',
})
export class AuditRevenue {
  protected readonly kpis: KpiCard[] = [
    { icon: 'account_balance_wallet', label: 'Tổng doanh thu', value: '4.280.000.000 ₫', note: '+12.4%', tone: 'navy' },
    { icon: 'payments', label: 'Lợi nhuận ròng (Net Profit)', value: '1.150.000.000 ₫', note: '+8.1%', tone: 'mauve' },
    { icon: 'show_chart', label: 'Tỉ lệ tăng trưởng', value: '22.5%', note: 'Mục tiêu: 95%', tone: 'neutral' },
    { icon: 'stars', label: 'Điểm sức khỏe tài chính', value: '98/100', note: null, tone: 'solid' },
  ];

  protected readonly healthScorePct = 98;

  protected readonly trendPoints = [
    { x: 0, y: 250 }, { x: 200, y: 240 }, { x: 400, y: 180 }, { x: 600, y: 120 }, { x: 800, y: 100 },
  ];

  protected readonly monthLabels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10'];

  protected readonly revenueSources: RevenueSource[] = [
    { label: 'Bán lẻ trực tiếp', pct: 65, tone: 'navy' },
    { label: 'Phân phối đại lý', pct: 25, tone: 'mauve' },
    { label: 'Dịch vụ hậu mãi', pct: 10, tone: 'dark' },
  ];

  protected readonly statusLabel: Record<ReportStatus, string> = {
    audited: 'Đã kiểm toán',
    reviewing: 'Đang rà soát',
  };

  protected readonly monthRows: MonthRow[] = [
    { period: 'Tháng 10, 2024', gross: '4.280.000.000 ₫', opex: '2.850.000.000 ₫', tax: '280.000.000 ₫', net: '1.150.000.000 ₫', status: 'audited' },
    { period: 'Tháng 09, 2024', gross: '3.950.000.000 ₫', opex: '2.700.000.000 ₫', tax: '265.000.000 ₫', net: '985.000.000 ₫', status: 'audited' },
    { period: 'Tháng 08, 2024', gross: '3.120.000.000 ₫', opex: '2.200.000.000 ₫', tax: '210.000.000 ₫', net: '710.000.000 ₫', status: 'audited' },
    { period: 'Tháng 07, 2024', gross: '2.840.000.000 ₫', opex: '1.950.000.000 ₫', tax: '190.000.000 ₫', net: '700.000.000 ₫', status: 'reviewing' },
  ];

  protected donutGradient(): string {
    let acc = 0;
    const colors: Record<string, string> = {
      navy: 'var(--navy-800)',
      mauve: '#874e58',
      dark: '#363636',
    };
    const stops = this.revenueSources.map((s) => {
      const start = acc;
      acc += s.pct;
      return `${colors[s.tone]} ${start}% ${acc}%`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }

  protected linePath(): string {
    const pts = this.trendPoints;
    return `M${pts.map((p) => `${p.x},${p.y}`).join(' L')}`;
  }

  protected areaPath(): string {
    const pts = this.trendPoints;
    const line = pts.map((p) => `${p.x},${p.y}`).join(' L');
    return `M${line} L800,300 L0,300 Z`;
  }
}
