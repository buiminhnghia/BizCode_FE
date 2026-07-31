import { Component, computed, signal } from '@angular/core';

type BranchStatus = 'active' | 'maintenance';
type Region = 'all' | 'north' | 'central' | 'south';

interface Branch {
  id: string;
  icon: string;
  name: string;
  address: string;
  manager: string;
  ordersPerMonth: string;
  revenue: string;
  status: BranchStatus;
  region: Region;
}

@Component({
  selector: 'app-branches',
  imports: [],
  templateUrl: './branches.html',
  styleUrl: './branches.scss',
})
export class Branches {
  protected readonly stats = [
    { icon: 'store', label: 'Tổng chi nhánh', value: '24', note: '+3% MoM', tone: 'navy' as const },
    { icon: 'trending_up', label: 'Doanh thu tháng', value: '4.2B VNĐ', note: '+12.5%', tone: 'pink' as const },
    { icon: 'check_circle', label: 'Trạng thái hoạt động', value: '91.6%', note: '22 online', tone: 'green' as const },
    { icon: 'warning', label: 'Đang bảo trì', value: '02', note: '2 Cửa hàng', tone: 'red' as const },
  ];

  protected readonly regions: { value: Region; label: string }[] = [
    { value: 'all', label: 'Khu vực: Tất cả' },
    { value: 'north', label: 'Miền Bắc' },
    { value: 'central', label: 'Miền Trung' },
    { value: 'south', label: 'Miền Nam' },
  ];

  protected readonly statuses: { value: 'all' | BranchStatus; label: string }[] = [
    { value: 'all', label: 'Trạng thái: Tất cả' },
    { value: 'active', label: 'Đang hoạt động' },
    { value: 'maintenance', label: 'Đang bảo trì' },
  ];

  protected readonly statusLabel: Record<BranchStatus, string> = {
    active: 'Hoạt động',
    maintenance: 'Bảo trì',
  };

  protected readonly branches: Branch[] = [
    {
      id: 'b1', icon: 'storefront',
      name: 'CN Quận 1 - Flagship', address: '88 Đồng Khởi, Quận 1, TP. HCM',
      manager: 'Lê Văn Thành', ordersPerMonth: '1,240 / tháng', revenue: '850.000.000đ',
      status: 'active', region: 'south',
    },
    {
      id: 'b2', icon: 'storefront',
      name: 'CN Hoàn Kiếm - Hà Nội', address: '15 Tràng Tiền, Hoàn Kiếm, Hà Nội',
      manager: 'Trần Thị Minh', ordersPerMonth: '890 / tháng', revenue: '620.000.000đ',
      status: 'maintenance', region: 'north',
    },
    {
      id: 'b3', icon: 'storefront',
      name: 'CN Hải Châu - Đà Nẵng', address: '240 Hùng Vương, Hải Châu, Đà Nẵng',
      manager: 'Nguyễn Hoàng Nam', ordersPerMonth: '450 / tháng', revenue: '315.000.000đ',
      status: 'active', region: 'central',
    },
    {
      id: 'b4', icon: 'storefront',
      name: 'CN Quận 7 - Phú Mỹ Hưng', address: '102 Nguyễn Lương Bằng, Quận 7, TP. HCM',
      manager: 'Phạm Diệu Linh', ordersPerMonth: '1,050 / tháng', revenue: '740.000.000đ',
      status: 'active', region: 'south',
    },
  ];

  protected readonly searchTerm = signal('');
  protected readonly selectedRegion = signal<Region>('all');
  protected readonly selectedStatus = signal<'all' | BranchStatus>('all');

  protected readonly filteredBranches = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const region = this.selectedRegion();
    const status = this.selectedStatus();
    return this.branches.filter((b) => {
      const matchesTerm = !term || b.name.toLowerCase().includes(term) || b.manager.toLowerCase().includes(term);
      const matchesRegion = region === 'all' || b.region === region;
      const matchesStatus = status === 'all' || b.status === status;
      return matchesTerm && matchesRegion && matchesStatus;
    });
  });

  protected readonly totalBranches = 24;

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  setRegion(value: string) {
    this.selectedRegion.set(value as Region);
  }

  setStatus(value: string) {
    this.selectedStatus.set(value as 'all' | BranchStatus);
  }
}
