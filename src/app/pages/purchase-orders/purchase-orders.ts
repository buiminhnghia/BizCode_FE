import { Component, computed, signal } from '@angular/core';

type PoStatus = 'pending' | 'shipping' | 'done';

interface PurchaseOrder {
  id: string;
  code: string;
  supplier: string;
  date: string;
  total: string;
  status: PoStatus;
}

@Component({
  selector: 'app-purchase-orders',
  imports: [],
  templateUrl: './purchase-orders.html',
  styleUrl: './purchase-orders.scss',
})
export class PurchaseOrders {
  protected readonly stats = [
    { icon: 'pending_actions', label: 'Chờ duyệt', value: '12', note: '+4 mới', tone: 'pink' as const },
    { icon: 'local_shipping', label: 'Đang giao', value: '08', note: 'Đang vận chuyển', tone: 'navy' as const },
    { icon: 'task_alt', label: 'Hoàn thành', value: '142', note: '+12% tháng này', tone: 'green' as const },
  ];

  protected readonly statusOptions: { value: 'all' | PoStatus; label: string }[] = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'pending', label: 'Chờ duyệt' },
    { value: 'shipping', label: 'Đang giao' },
    { value: 'done', label: 'Hoàn thành' },
  ];

  protected readonly statusLabel: Record<PoStatus, string> = {
    pending: 'Chờ duyệt',
    shipping: 'Đang giao',
    done: 'Hoàn thành',
  };

  protected readonly orders: PurchaseOrder[] = [
    { id: 'po1', code: 'PO-2024-001', supplier: 'Samsung Electronics VN', date: '12/10/2024', total: '1.250.000.000 ₫', status: 'pending' },
    { id: 'po2', code: 'PO-2024-012', supplier: 'Logitech Global Supply', date: '10/10/2024', total: '450.000.000 ₫', status: 'shipping' },
    { id: 'po3', code: 'PO-2024-008', supplier: 'Dell Technologies', date: '08/10/2024', total: '890.200.000 ₫', status: 'done' },
    { id: 'po4', code: 'PO-2024-025', supplier: 'Apple Enterprise SE', date: '05/10/2024', total: '2.100.000.000 ₫', status: 'done' },
    { id: 'po5', code: 'PO-2024-031', supplier: 'Intel Components VN', date: '01/10/2024', total: '340.500.000 ₫', status: 'pending' },
  ];

  protected readonly selectedStatus = signal<'all' | PoStatus>('all');

  protected readonly filteredOrders = computed(() => {
    const status = this.selectedStatus();
    if (status === 'all') return this.orders;
    return this.orders.filter((o) => o.status === status);
  });

  protected readonly totalOrders = 142;

  setStatus(value: string) {
    this.selectedStatus.set(value as 'all' | PoStatus);
  }

  clearFilters() {
    this.selectedStatus.set('all');
  }
}
