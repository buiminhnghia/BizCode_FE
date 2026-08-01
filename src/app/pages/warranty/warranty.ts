import { Component, computed, signal } from '@angular/core';

type ServiceStatus = 'checking' | 'replaced' | 'waiting' | 'returned';

interface WarrantyItem {
  id: string;
  icon: string;
  product: string;
  brand: string;
  customer: string;
  email: string;
  serial: string;
  expiryDate: string;
  expiryNote: string;
  expiryTone: 'navy' | 'red' | 'gray';
  status: ServiceStatus;
}

@Component({
  selector: 'app-warranty',
  imports: [],
  templateUrl: './warranty.html',
  styleUrl: './warranty.scss',
})
export class Warranty {
  protected readonly stats = [
    { icon: 'build', label: 'Đang sửa chữa', value: '24', note: '+12%', tone: 'navy' as const },
    { icon: 'verified', label: 'Đã hoàn tất', value: '156', note: '98%', tone: 'mauve' as const },
    { icon: 'timer', label: 'Quá hạn xử lý', value: '05', note: 'Khẩn cấp', tone: 'red' as const },
    { icon: 'history', label: 'Tổng tiếp nhận (tháng)', value: '312', note: null, tone: 'gray' as const },
  ];

  protected readonly statusLabel: Record<ServiceStatus, string> = {
    checking: 'Đang kiểm tra',
    replaced: 'Đã thay linh kiện',
    waiting: 'Chờ tiếp nhận',
    returned: 'Đã trả máy',
  };

  protected readonly items: WarrantyItem[] = [
    { id: 'w1', icon: 'laptop_mac', product: 'MacBook Pro M2 14"', brand: 'Apple Inc.', customer: 'Nguyễn Văn An', email: 'an.nv@email.com', serial: 'SN-2023-X992', expiryDate: '15/12/2025', expiryNote: 'Còn 420 ngày', expiryTone: 'navy', status: 'checking' },
    { id: 'w2', icon: 'laptop_windows', product: 'Dell XPS 13 Plus', brand: 'Dell Technologies', customer: 'Trần Thị Bích', email: 'bich.tt@corporate.vn', serial: 'DEL-77812-B', expiryDate: '02/01/2024', expiryNote: 'Đã hết hạn', expiryTone: 'red', status: 'replaced' },
    { id: 'w3', icon: 'headphones', product: 'Sony WH-1000XM5', brand: 'Sony Corp.', customer: 'Lê Hoàng Nam', email: 'nam.lh@freelance.com', serial: 'SNY-AUD-900', expiryDate: '30/06/2024', expiryNote: 'Còn 240 ngày', expiryTone: 'gray', status: 'waiting' },
    { id: 'w4', icon: 'desktop_windows', product: 'LG UltraFine 5K', brand: 'LG Electronics', customer: 'Phạm Minh Tuấn', email: 'tuan.pm@agency.io', serial: 'LG-DISP-22K', expiryDate: '12/03/2026', expiryNote: 'Bảo hành VIP', expiryTone: 'navy', status: 'returned' },
  ];

  protected readonly searchTerm = signal('');

  protected readonly filteredItems = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.items;
    return this.items.filter(
      (i) => i.serial.toLowerCase().includes(term) || i.customer.toLowerCase().includes(term),
    );
  });

  protected readonly totalRecords = 312;
  protected readonly page = signal(1);

  protected readonly activityLog = [
    { icon: 'engineering', tone: 'navy' as const, title: 'Thay bàn phím cơ MacBook Pro', desc: 'Kỹ thuật viên: Trần Văn Mạnh. Linh kiện: OEM Apple Keyboard.', time: '10 phút trước' },
    { icon: 'check_circle', tone: 'mauve' as const, title: 'Hoàn tất vệ sinh Dell XPS 13', desc: 'Thiết bị đã sẵn sàng để bàn giao cho khách hàng tại chi nhánh Quận 1.', time: '2 giờ trước' },
  ];

  protected readonly genuinePartsPct = 72;

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  goToPage(p: number) {
    if (p >= 1) {
      this.page.set(p);
    }
  }
}
