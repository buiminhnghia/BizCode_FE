import { Component } from '@angular/core';

type BranchStatus = 'active' | 'maintenance';

interface KpiCard {
  icon: string;
  label: string;
  value: string;
  unit?: string;
  change: string;
  changeTone: 'positive' | 'negative';
}

interface MonthComparison {
  label: string;
  prevPct: number;
  currentPct: number;
}

interface Insight {
  icon: string;
  tone: 'navy' | 'mauve' | 'red';
  title: string;
  description: string;
}

interface BranchPerformance {
  name: string;
  region: string;
  status: BranchStatus;
  revenue: string;
  profit: string;
  performancePct: number;
}

@Component({
  selector: 'app-business-overview',
  imports: [],
  templateUrl: './business-overview.html',
  styleUrl: './business-overview.scss',
})
export class BusinessOverview {
  protected readonly kpis: KpiCard[] = [
    { icon: 'bolt', label: 'Sales Velocity', value: '428.5', unit: 'đơn/ngày', change: '+12%', changeTone: 'positive' },
    { icon: 'pie_chart', label: 'Market Share', value: '18.2%', change: '+4%', changeTone: 'positive' },
    { icon: 'precision_manufacturing', label: 'Operational Efficiency', value: '94.1%', change: '-2%', changeTone: 'negative' },
  ];

  protected readonly yearRevenue = '42.8 tỷ VNĐ';
  protected readonly yearTargetPct = 85;

  protected readonly monthComparisons: MonthComparison[] = [
    { label: 'Th01', prevPct: 40, currentPct: 55 },
    { label: 'Th02', prevPct: 50, currentPct: 65 },
    { label: 'Th03', prevPct: 45, currentPct: 70 },
    { label: 'Th04', prevPct: 60, currentPct: 75 },
    { label: 'Th05', prevPct: 55, currentPct: 80 },
    { label: 'Th06', prevPct: 70, currentPct: 90 },
    { label: 'Th07', prevPct: 65, currentPct: 85 },
    { label: 'Th08', prevPct: 75, currentPct: 95 },
  ];

  protected readonly insights: Insight[] = [
    { icon: 'trending_up', tone: 'navy', title: 'Khu vực Miền Nam', description: 'Đạt kỷ lục doanh thu mới trong tháng 9, tăng trưởng 22% svck.' },
    { icon: 'inventory', tone: 'mauve', title: 'Tối ưu kho bãi', description: 'Thời gian xuất kho giảm 15 phút nhờ hệ thống tự động hóa mới.' },
    { icon: 'warning', tone: 'red', title: 'Chi phí logistics', description: 'Tăng 8% do biến động giá nhiên liệu toàn cầu.' },
  ];

  protected readonly statusLabel: Record<BranchStatus, string> = {
    active: 'Đang hoạt động',
    maintenance: 'Bảo trì hệ thống',
  };

  protected readonly branches: BranchPerformance[] = [
    { name: 'Chi nhánh Quận 1, TP.HCM', region: 'Khu vực Miền Nam', status: 'active', revenue: '8.420.000.000 đ', profit: '1.250.000.000 đ', performancePct: 92 },
    { name: 'Chi nhánh Hoàn Kiếm, Hà Nội', region: 'Khu vực Miền Bắc', status: 'active', revenue: '7.150.000.000 đ', profit: '980.000.000 đ', performancePct: 85 },
    { name: 'Chi nhánh Hải Châu, Đà Nẵng', region: 'Khu vực Miền Trung', status: 'maintenance', revenue: '3.200.000.000 đ', profit: '450.000.000 đ', performancePct: 60 },
  ];
}