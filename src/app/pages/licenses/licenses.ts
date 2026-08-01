import { Component, computed, signal } from '@angular/core';

interface License {
  id: string;
  name: string;
  icon: string;
  number: string;
  issued: string;
  expires: string;
  status: 'valid' | 'expiring' | 'expired';
}

@Component({
  selector: 'app-licenses',
  imports: [],
  templateUrl: './licenses.html',
  styleUrl: './licenses.scss',
})
export class Licenses {
  protected readonly stats = [
    { icon: 'verified', label: 'Tổng cộng', value: '24', desc: 'Giấy phép hiện có', tone: 'neutral' as const },
    { icon: 'check_circle', label: 'Đang hiệu lực', value: '18', desc: 'Hoạt động bình thường', tone: 'valid' as const },
    { icon: 'notification_important', label: 'Sắp hết hạn', value: '04', desc: 'Cần gia hạn trong 30 ngày', tone: 'expiring' as const },
    { icon: 'cancel', label: 'Đã hết hạn', value: '02', desc: 'Yêu cầu xử lý ngay', tone: 'expired' as const },
  ];

  protected readonly licenses: License[] = [
    { id: 'gpkd', name: 'Giấy phép đăng ký kinh doanh', icon: 'description', number: '0101234567', issued: '15/05/2020', expires: '--', status: 'valid' },
    { id: 'attp', name: 'An toàn vệ sinh thực phẩm', icon: 'shield_with_heart', number: 'ATTP-2023-99', issued: '20/01/2023', expires: '20/01/2024', status: 'expiring' },
    { id: 'iso', name: 'Chứng nhận ISO 14001:2015', icon: 'potted_plant', number: 'VN-ISO-14001-A2', issued: '10/11/2022', expires: '10/11/2025', status: 'valid' },
    { id: 'pccc', name: 'Giấy phép PCCC', icon: 'local_fire_department', number: 'PCCC-HN-112', issued: '05/02/2021', expires: '05/02/2023', status: 'expired' },
    { id: 'mxh', name: 'Giấy phép Mạng Xã Hội', icon: 'language', number: '123/GP-BTTTT', issued: '12/08/2023', expires: '12/08/2028', status: 'valid' },
  ];

  protected readonly statusLabel: Record<License['status'], string> = {
    valid: 'Valid',
    expiring: 'Expiring',
    expired: 'Expired',
  };

  protected readonly subLicenses = [
    { name: 'Giấy phép xả thải', code: '#GPXT-2023' },
    { name: 'Chứng nhận OCOP 4 sao', code: '#OC-2022-HN' },
  ];

  protected readonly renewalHistory = [
    { date: '15/05/2023', desc: 'Gia hạn thành công GPKD lần 2', current: true },
    { date: '10/02/2023', desc: 'Nộp hồ sơ cấp mới GP PCCC', current: false },
  ];

  protected readonly selectedId = signal<string>('gpkd');

  protected readonly selected = computed(() => this.licenses.find((l) => l.id === this.selectedId()));

  select(id: string) {
    this.selectedId.set(id);
  }
}
