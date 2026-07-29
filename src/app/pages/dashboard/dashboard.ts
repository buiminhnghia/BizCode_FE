import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SalaryRow {
  code: string;
  name: string;
  dept: string;
  base: string;
  bonus: string;
  bonusPositive: boolean;
  status: 'paid' | 'processing';
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly statCards = [
    { icon: 'groups', label: 'Tổng nhân sự', value: '1,248', tag: '+12%', tone: 'positive' as const },
    { icon: 'payments', label: 'Tổng lương tháng', value: '4.2B', unit: 'VND', tag: 'Ổn định', tone: 'neutral' as const },
    { icon: 'event_available', label: 'Tỷ lệ chuyên cần', value: '94.2%', tag: '-3%', tone: 'negative' as const },
    { icon: 'star', label: 'Thưởng hiệu quả', value: '320M', unit: 'VND', tag: 'Mới', tone: 'positive' as const },
  ];

  protected readonly chartBars = [
    { label: 'Thg 5', h: 60 },
    { label: 'Thg 6', h: 75 },
    { label: 'Thg 7', h: 85 },
    { label: 'Thg 8', h: 70 },
    { label: 'Thg 9', h: 95, current: true },
    { label: 'Thg 10', h: 80 },
  ];

  protected readonly notifications = [
    { dot: 'error', title: 'Lịch nghỉ lễ Quốc khánh', desc: 'Thông báo chi tiết về thời gian nghỉ và công tác trực ca tại các phòng ban...', time: '10 phút trước' },
    { dot: 'primary', title: 'Chương trình Team Building Q4', desc: 'Địa điểm dự kiến tại Đà Nẵng, vui lòng bình chọn lịch trình...', time: '2 giờ trước' },
    { dot: 'muted', title: 'Thay đổi quy định chấm công', desc: 'Áp dụng nhận diện khuôn mặt mới tại cổng số 2...', time: 'Hôm qua' },
  ];

  protected readonly salaryRows: SalaryRow[] = [
    { code: 'NV-8821', name: 'Nguyễn Văn An', dept: 'Kỹ thuật', base: '24,500,000', bonus: '+2,000,000', bonusPositive: true, status: 'paid' },
    { code: 'NV-8822', name: 'Trần Thị Bình', dept: 'Nhân sự', base: '18,200,000', bonus: '+500,000', bonusPositive: true, status: 'paid' },
    { code: 'NV-8823', name: 'Lê Quang Cường', dept: 'Kinh doanh', base: '15,000,000', bonus: '+12,400,000', bonusPositive: true, status: 'processing' },
    { code: 'NV-8824', name: 'Phạm Minh Đức', dept: 'Marketing', base: '21,000,000', bonus: '0', bonusPositive: false, status: 'paid' },
  ];
}
