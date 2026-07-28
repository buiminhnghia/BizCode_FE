import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing {
  protected readonly features = [
    'Toàn bộ tính năng ERP',
    'Không giới hạn người dùng',
    'Bảo mật dữ liệu chuẩn ISO',
    'Hỗ trợ 24/7 trực tuyến',
  ];

  protected readonly commitments = [
    { icon: 'upgrade', title: 'Miễn phí nâng cấp', desc: 'BizCode liên tục cập nhật các tính năng mới theo xu hướng thị trường và quy định pháp luật mà không thu thêm bất kỳ chi phí nâng cấp nào.' },
    { icon: 'school', title: 'Đào tạo chuyên sâu', desc: 'Đội ngũ chuyên gia của chúng tôi đồng hành cùng bạn qua các khóa đào tạo trực tiếp và tài liệu hướng dẫn chi tiết cho đến khi vận hành thành thạo.' },
    { icon: 'group_add', title: 'Không giới hạn người dùng', desc: 'Phát triển quy mô nhân sự bạn mong muốn mà không lo ngại về chi phí bản quyền theo đầu người.' },
  ];

  protected readonly customerStats = [
    { label: 'Sản xuất', value: 41.6 },
    { label: 'Phân phối', value: 35.6 },
    { label: 'Dịch vụ & Khác', value: 22.8 },
  ];

  protected readonly platformFeatures = [
    {
      title: 'Giao diện quản trị thông minh',
      caption: 'Trực quan hóa mọi dữ liệu doanh nghiệp trong thời gian thực.',
      heading: 'Tự động hóa báo cáo',
      icon: 'auto_awesome',
      desc: 'Giảm thiểu sai sót thủ công và tiết kiệm 30% thời gian tổng hợp dữ liệu.',
    },
    {
      title: 'Tính linh động tối ưu',
      caption: 'Kết nối đội ngũ của bạn bất kể khoảng cách địa lý.',
      heading: 'Bảo mật đa tầng',
      icon: 'shield_lock',
      desc: 'Dữ liệu của bạn được mã hóa và lưu trữ trên nền tảng đám mây an toàn nhất thế giới.',
    },
  ];

  protected donutGradient(): string {
    let acc = 0;
    const colors = ['#1a2a5e', '#ff6f86', '#c9cdE0'];
    const stops = this.customerStats.map((s, i) => {
      const start = acc;
      acc += s.value;
      return `${colors[i]} ${start}% ${acc}%`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }
}
