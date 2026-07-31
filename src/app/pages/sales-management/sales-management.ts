import { Component } from '@angular/core';

type OrderStatus = 'completed' | 'pending' | 'cancelled';

interface RecentOrder {
  id: string;
  code: string;
  initials: string;
  customer: string;
  date: string;
  total: string;
  status: OrderStatus;
}

@Component({
  selector: 'app-sales-management',
  imports: [],
  templateUrl: './sales-management.html',
  styleUrl: './sales-management.scss',
})
export class SalesManagement {
  protected readonly stats = [
    { icon: 'payments', label: 'Doanh thu tổng', value: '1.250.000.000', unit: 'VNĐ', note: '+15%', tone: 'positive' as const },
    { icon: 'shopping_bag', label: 'Tổng đơn hàng', value: '842', unit: 'đơn', note: 'Ổn định', tone: 'neutral' as const },
    { icon: 'person_add', label: 'Khách hàng mới', value: '125', unit: 'users', note: '+8%', tone: 'positive' as const },
    { icon: 'verified', label: 'Tỷ lệ thành công', value: '92', unit: '%', note: '+2%', tone: 'positive' as const },
  ];

  protected readonly revenueBars = [
    { label: 'T2', h: 45 },
    { label: 'T3', h: 65 },
    { label: 'T4', h: 55 },
    { label: 'T5', h: 90, current: true },
    { label: 'T6', h: 40 },
    { label: 'T7', h: 75 },
    { label: 'CN', h: 60 },
  ];

  protected readonly productMix = [
    { label: 'Thiết bị CNTT', pct: 45, tone: 'navy' as const },
    { label: 'Giải pháp Cloud', pct: 25, tone: 'mauve' as const },
    { label: 'Tư vấn đào tạo', pct: 20, tone: 'pink' as const },
    { label: 'Khác', pct: 10, tone: 'gray' as const },
  ];

  protected readonly totalUnits = 842;

  protected readonly statusLabel: Record<OrderStatus, string> = {
    completed: 'Completed',
    pending: 'Pending',
    cancelled: 'Cancelled',
  };

  protected readonly recentOrders: RecentOrder[] = [
    { id: 'r1', code: '#BC-9902', initials: 'CT', customer: 'Công ty TNHH TechVina', date: '24/05/2024', total: '45.000.000 VNĐ', status: 'completed' },
    { id: 'r2', code: '#BC-9901', initials: 'HN', customer: 'Hoàng Nam Anh', date: '23/05/2024', total: '12.500.000 VNĐ', status: 'pending' },
    { id: 'r3', code: '#BC-9899', initials: 'DS', customer: 'Đại Siêu Thị Mega', date: '23/05/2024', total: '158.200.000 VNĐ', status: 'cancelled' },
    { id: 'r4', code: '#BC-9895', initials: 'LP', customer: 'Lê Phương Thảo', date: '22/05/2024', total: '5.800.000 VNĐ', status: 'completed' },
  ];

  protected donutGradient(): string {
    let acc = 0;
    const colors: Record<string, string> = {
      navy: 'var(--navy-800)',
      mauve: '#874e58',
      pink: 'var(--pink-500)',
      gray: 'var(--border-200)',
    };
    const stops = this.productMix.map((p) => {
      const start = acc;
      acc += p.pct;
      return `${colors[p.tone]} ${start}% ${acc}%`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }
}
