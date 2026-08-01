import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

type StockStatus = 'stable' | 'low' | 'out';

interface StockItem {
  sku: string;
  icon: string;
  name: string;
  tag: string;
  category: string;
  location: string;
  actual: number;
  available: number;
  unit: string;
  status: StockStatus;
}

@Component({
  selector: 'app-stock-management',
  imports: [DecimalPipe],
  templateUrl: './stock-management.html',
  styleUrl: './stock-management.scss',
})
export class StockManagement {
  protected readonly summary = {
    totalValue: '1.240.500.000',
    totalSku: '4,582',
    inTransit: '156',
    emptySpacePct: 24,
  };

  protected readonly categories = ['Tất cả danh mục', 'Gaming', 'Phụ kiện', 'Hiển thị'];
  protected readonly statuses: { value: 'all' | StockStatus; label: string }[] = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'stable', label: 'Ổn định' },
    { value: 'low', label: 'Sắp hết' },
    { value: 'out', label: 'Hết hàng' },
  ];

  protected readonly statusLabel: Record<StockStatus, string> = {
    stable: 'Ổn định',
    low: 'Sắp hết',
    out: 'Hết hàng',
  };

  protected readonly items: StockItem[] = [
    { sku: 'BIZ-LAP-G15', icon: 'laptop_mac', name: 'Laptop Dell G15 5530', tag: 'Gaming | Core i7', category: 'Gaming', location: 'Kho A - Kệ 12', actual: 45, available: 42, unit: 'Chiếc', status: 'stable' },
    { sku: 'BIZ-MSE-MX3', icon: 'mouse', name: 'Chuột Logitech MX Master 3', tag: 'Phụ kiện | Bluetooth', category: 'Phụ kiện', location: 'Kho B - Kệ 05', actual: 8, available: 5, unit: 'Cái', status: 'low' },
    { sku: 'BIZ-KBD-WRL', icon: 'keyboard', name: 'Bàn phím cơ không dây', tag: 'Phụ kiện | Mechanical', category: 'Phụ kiện', location: 'Kho A - Kệ 02', actual: 0, available: 0, unit: 'Bộ', status: 'out' },
    { sku: 'BIZ-MON-4K27', icon: 'monitor', name: 'Màn hình 4K 27 inch', tag: 'Hiển thị | Ultra HD', category: 'Hiển thị', location: 'Kho C - Kệ 21', actual: 124, available: 120, unit: 'Cái', status: 'stable' },
  ];

  protected readonly selectedCategory = signal('Tất cả danh mục');
  protected readonly selectedStatus = signal<'all' | StockStatus>('all');

  protected readonly filteredItems = computed(() => {
    const cat = this.selectedCategory();
    const status = this.selectedStatus();
    return this.items.filter((i) => {
      const matchesCat = cat === 'Tất cả danh mục' || i.category === cat;
      const matchesStatus = status === 'all' || i.status === status;
      return matchesCat && matchesStatus;
    });
  });

  protected readonly totalRecords = 4582;
  protected readonly page = signal(1);

  setCategory(value: string) {
    this.selectedCategory.set(value);
  }

  setStatus(value: string) {
    this.selectedStatus.set(value as 'all' | StockStatus);
  }

  goToPage(p: number) {
    if (p >= 1) {
      this.page.set(p);
    }
  }
}
