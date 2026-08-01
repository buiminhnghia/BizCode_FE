import { Component, computed, signal } from '@angular/core';

type ProductStatus = 'selling' | 'low' | 'out';

interface Product {
  id: string;
  icon: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: ProductStatus;
}

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  protected readonly stats = [
    { label: 'Tổng sản phẩm', value: '1,284', note: '+12% tháng này', tone: 'positive' as const },
    { label: 'Sắp hết hàng', value: '24', note: 'Cần nhập kho', tone: 'neutral' as const },
    { label: 'Ngừng kinh doanh', value: '08', note: null, tone: 'neutral' as const },
    { label: 'Danh mục', value: '16', note: null, tone: 'neutral' as const },
  ];

  protected readonly categories = ['Tất cả danh mục', 'Điện tử', 'Phụ kiện', 'Màn hình', 'Nội thất'];

  protected readonly statusLabel: Record<ProductStatus, string> = {
    selling: 'Đang bán',
    low: 'Sắp hết',
    out: 'Hết hàng',
  };

  protected readonly products: Product[] = [
    { id: 'p1', icon: 'laptop_mac', name: 'MacBook Pro M3 14"', sku: 'MB-P14-M3-BK', category: 'Điện tử', price: '45.990.000đ', stock: 42, status: 'selling' },
    { id: 'p2', icon: 'headphones', name: 'Sony WH-1000XM5', sku: 'SN-XM5-NV', category: 'Phụ kiện', price: '8.490.000đ', stock: 15, status: 'low' },
    { id: 'p3', icon: 'desktop_windows', name: 'Samsung Odyssey G9', sku: 'SS-G9-UW49', category: 'Màn hình', price: '32.500.000đ', stock: 0, status: 'out' },
    { id: 'p4', icon: 'weekend', name: 'Herman Miller Aeron', sku: 'HM-AER-GR', category: 'Nội thất', price: '28.000.000đ', stock: 8, status: 'selling' },
  ];

  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal('Tất cả danh mục');
  protected readonly selectedIds = signal(new Set<string>());

  protected readonly filteredProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const cat = this.selectedCategory();
    return this.products.filter((p) => {
      const matchesTerm = !term || p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term);
      const matchesCat = cat === 'Tất cả danh mục' || p.category === cat;
      return matchesTerm && matchesCat;
    });
  });

  protected readonly allSelected = computed(
    () => this.filteredProducts().length > 0 && this.filteredProducts().every((p) => this.selectedIds().has(p.id)),
  );

  protected readonly totalProducts = 1284;

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  setCategory(value: string) {
    this.selectedCategory.set(value);
  }

  toggleOne(id: string) {
    this.selectedIds.update((set) => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  toggleAll() {
    const shouldSelectAll = !this.allSelected();
    this.selectedIds.update((set) => {
      const next = new Set(set);
      for (const p of this.filteredProducts()) {
        if (shouldSelectAll) next.add(p.id);
        else next.delete(p.id);
      }
      return next;
    });
  }

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }
}
