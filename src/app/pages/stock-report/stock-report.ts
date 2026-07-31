import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

type StockStatus = 'stable' | 'low' | 'warning';

interface StockRow {
  sku: string;
  name: string;
  category: string;
  qty: number;
  price: string;
  status: StockStatus;
}

@Component({
  selector: 'app-stock-report',
  imports: [DecimalPipe],
  templateUrl: './stock-report.html',
  styleUrl: './stock-report.scss',
})
export class StockReport {
  protected readonly summary = [
    { icon: 'inventory_2', label: 'Tổng tồn kho', value: '42,850', note: '+12% vs tháng trước', detail: 'Giá trị ước tính: $1.2M', tone: 'navy' as const },
    { icon: 'warning', label: 'Hàng sắp hết', value: '142', note: 'Cần nhập hàng gấp', detail: 'SKUs dưới mức an toàn', tone: 'red' as const },
    { icon: 'local_shipping', label: 'Hàng đang về', value: '12', note: '5 đơn dự kiến hôm nay', detail: 'Container/Lô hàng', tone: 'gray' as const },
  ];

  protected readonly categoryBars = [
    { label: 'Điện tử', pct: 85 },
    { label: 'Gia dụng', pct: 45 },
    { label: 'Thời trang', pct: 65 },
    { label: 'Mỹ phẩm', pct: 30 },
    { label: 'Phụ kiện', pct: 75 },
  ];

  protected readonly statusLabel: Record<StockStatus, string> = {
    stable: 'Ổn định',
    low: 'Sắp hết',
    warning: 'Cảnh báo',
  };

  protected readonly rows: StockRow[] = [
    { sku: 'BC-EL-001', name: 'MacBook Pro M2 14"', category: 'Điện tử', qty: 120, price: '$1,999', status: 'stable' },
    { sku: 'BC-EL-042', name: 'iPhone 15 Pro Max', category: 'Điện tử', qty: 8, price: '$1,199', status: 'low' },
    { sku: 'BC-GD-110', name: 'Máy lọc không khí Samsung', category: 'Gia dụng', qty: 450, price: '$350', status: 'stable' },
    { sku: 'BC-PK-205', name: 'Tai nghe Sony WH-1000XM5', category: 'Phụ kiện', qty: 15, price: '$399', status: 'warning' },
    { sku: 'BC-EL-088', name: 'iPad Air 5 M1', category: 'Điện tử', qty: 88, price: '$599', status: 'stable' },
  ];

  protected readonly totalProducts = 1240;
}
