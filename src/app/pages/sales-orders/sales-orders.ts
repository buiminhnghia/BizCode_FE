import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

type OrderStatus = 'completed' | 'pending' | 'cancelled';

interface Order {
  id: string;
  code: string;
  initials: string;
  customer: string;
  email: string;
  date: string;
  total: string;
  status: OrderStatus;
}

@Component({
  selector: 'app-sales-orders',
  imports: [DecimalPipe],
  templateUrl: './sales-orders.html',
  styleUrl: './sales-orders.scss',
})
export class SalesOrders {
  protected readonly stats = [
    { icon: 'receipt_long', label: 'Tổng đơn hàng', value: '1,284', note: '+12%', tone: 'positive' as const },
    { icon: 'pending_actions', label: 'Đang xử lý', value: '56', note: '24 đơn mới', tone: 'warning' as const },
    { icon: 'check_circle', label: 'Đã hoàn thành', value: '1,120', note: null, tone: 'neutral' as const },
    { icon: 'cancel', label: 'Đã hủy', value: '108', note: null, tone: 'neutral' as const },
  ];

  protected readonly statusOptions: { value: 'all' | OrderStatus; label: string }[] = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'pending', label: 'Đang chờ' },
    { value: 'cancelled', label: 'Đã hủy' },
  ];

  protected readonly statusLabel: Record<OrderStatus, string> = {
    completed: 'Hoàn thành',
    pending: 'Đang chờ',
    cancelled: 'Đã hủy',
  };

  protected readonly orders: Order[] = [
    { id: 'o1', code: '#ORD-2024-001', initials: 'NT', customer: 'Nguyễn Văn Thành', email: 'thanh.nv@gmail.com', date: '20/03/2024', total: '12.500.000 đ', status: 'completed' },
    { id: 'o2', code: '#ORD-2024-002', initials: 'LH', customer: 'Lê Thị Hoa', email: 'hoa.le@outlook.com', date: '21/03/2024', total: '8.200.000 đ', status: 'pending' },
    { id: 'o3', code: '#ORD-2024-003', initials: 'TM', customer: 'Trần Minh', email: 'minh.tran@biz.vn', date: '22/03/2024', total: '450.000 đ', status: 'cancelled' },
    { id: 'o4', code: '#ORD-2024-004', initials: 'PD', customer: 'Phạm Dương', email: 'duong.p@gmail.com', date: '22/03/2024', total: '15.900.000 đ', status: 'completed' },
    { id: 'o5', code: '#ORD-2024-005', initials: 'HN', customer: 'Hoàng Nam', email: 'nam.hoang@company.com', date: '23/03/2024', total: '2.100.000 đ', status: 'completed' },
  ];

  protected readonly selectedStatus = signal<'all' | OrderStatus>('all');

  protected readonly filteredOrders = computed(() => {
    const status = this.selectedStatus();
    if (status === 'all') return this.orders;
    return this.orders.filter((o) => o.status === status);
  });

  protected readonly totalOrders = 1284;
  protected readonly page = signal(1);

  setStatus(value: string) {
    this.selectedStatus.set(value as 'all' | OrderStatus);
  }

  clearFilters() {
    this.selectedStatus.set('all');
  }

  goToPage(p: number) {
    if (p >= 1) {
      this.page.set(p);
    }
  }
}
