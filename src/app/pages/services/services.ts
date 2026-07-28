import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly serviceCards = [
    {
      icon: 'school',
      title: 'Đào tạo chuyên sâu',
      desc: 'Chương trình đào tạo thực chiến về sử dụng hệ thống BizCode và kỹ năng quản lý doanh nghiệp 4.0.',
      bullets: ['1-on-1 Mentoring', 'Chứng chỉ BizCode Pro'],
      cta: 'Tìm hiểu thêm',
    },
    {
      icon: 'rocket_launch',
      title: 'Tư vấn chuyển đổi số',
      desc: 'Xây dựng lộ trình số hóa toàn diện, giúp doanh nghiệp tiết kiệm 40% chi phí vận hành trong 6 tháng.',
      bullets: ['Audit quy trình hiện tại', 'Thiết kế Roadmap 2 năm'],
      cta: 'Khám phá giải pháp',
    },
    {
      icon: 'support_agent',
      title: 'Hỗ trợ kỹ thuật 24/7',
      desc: 'Đội ngũ kỹ sư túc trực mọi lúc, đảm bảo hệ thống của bạn luôn vận hành mượt mà và không gián đoạn.',
      bullets: ['Hotline hỗ trợ khẩn cấp', 'Ticket response < 15p'],
      cta: 'Liên hệ hỗ trợ',
    },
    {
      icon: 'update',
      title: 'Cập nhật hệ thống',
      desc: 'Tự động nâng cấp các tính năng mới nhất và bảo mật định kỳ hàng quý mà không tốn thêm chi phí.',
      bullets: ['Vá lỗi bảo mật Real-time', 'Kho tính năng mới mở rộng'],
      cta: 'Xem lịch cập nhật',
    },
  ];

  protected readonly steps = [
    { no: '01', title: 'Khảo sát & Phân tích', desc: 'Đánh giá hiện trạng hạ tầng và nhu cầu thực tế của doanh nghiệp.' },
    { no: '02', title: 'Đề xuất giải pháp', desc: 'Xây dựng phương án tối ưu về chi phí và thời gian triển khai.' },
    { no: '03', title: 'Thực thi & Đào tạo', desc: 'Cài đặt hệ thống và hướng dẫn nhân sự vận hành thuần thục.' },
    { no: '04', title: 'Nghiệm thu & Support', desc: 'Bàn giao hệ thống và duy trì hỗ trợ kỹ thuật liên tục.' },
  ];
}
