import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

type CustomerType = 'VIP' | 'Thân thiết' | 'Bán sỉ' | 'Mới';

interface Customer {
  id: string;
  initials: string;
  name: string;
  location: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam';
  email: string;
  phone: string;
  type: CustomerType;
  orders: number;
  spend: string;
}

const TYPE_CLASS: Record<CustomerType, string> = {
  'VIP': 'vip',
  'Thân thiết': 'loyal',
  'Bán sỉ': 'wholesale',
  'Mới': 'new',
};

@Component({
  selector: 'app-customers',
  imports: [DecimalPipe],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  protected readonly customers: Customer[] = [
    { id: 'c1', initials: 'NM', name: 'Nguyễn Thị Mai', location: 'Hà Nội, Việt Nam', region: 'Miền Bắc', email: 'mai.nguyen@example.com', phone: '090 123 4567', type: 'VIP', orders: 42, spend: '125.400.000 đ' },
    { id: 'c2', initials: 'TL', name: 'Trần Hoàng Long', location: 'TP. Hồ Chí Minh', region: 'Miền Nam', email: 'long.tran@business.vn', phone: '098 765 4321', type: 'Thân thiết', orders: 28, spend: '84.250.000 đ' },
    { id: 'c3', initials: 'LH', name: 'Lê Văn Hùng', location: 'Đà Nẵng, Việt Nam', region: 'Miền Trung', email: 'hung.le@vinhomes.com', phone: '091 222 3333', type: 'Bán sỉ', orders: 12, spend: '312.000.000 đ' },
    { id: 'c4', initials: 'PH', name: 'Phạm Thu Hà', location: 'Hải Phòng, Việt Nam', region: 'Miền Bắc', email: 'ha.pham@designhub.com', phone: '097 555 8888', type: 'Mới', orders: 2, spend: '5.100.000 đ' },
  ];

  protected readonly customerTypes = ['Loại khách hàng', 'VIP', 'Thân thiết', 'Mới', 'Bán sỉ'];
  protected readonly regions = ['Khu vực', 'Miền Bắc', 'Miền Trung', 'Miền Nam'];

  protected readonly searchTerm = signal('');
  protected readonly selectedType = signal('Loại khách hàng');
  protected readonly selectedRegion = signal('Khu vực');

  protected readonly filteredCustomers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const type = this.selectedType();
    const region = this.selectedRegion();

    return this.customers.filter((c) => {
      const matchesTerm =
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.phone.includes(term);
      const matchesType = type === 'Loại khách hàng' || c.type === type;
      const matchesRegion = region === 'Khu vực' || c.region === region;
      return matchesTerm && matchesType && matchesRegion;
    });
  });

  protected readonly totalCustomers = 1248;
  protected readonly page = signal(1);

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  setType(value: string) {
    this.selectedType.set(value);
  }

  setRegion(value: string) {
    this.selectedRegion.set(value);
  }

  goToPage(p: number) {
    if (p >= 1) {
      this.page.set(p);
    }
  }

  typeClass(type: CustomerType): string {
    return TYPE_CLASS[type];
  }
}
