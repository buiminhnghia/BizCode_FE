import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly stats = [
    { value: '80.000+', label: 'Doanh nghiệp tin dùng' },
    { value: '10+', label: 'Năm kinh nghiệm' },
    { value: '500+', label: 'Chuyên gia hàng đầu' },
    { value: '98%', label: 'Khách hàng hài lòng' },
  ];

  protected readonly coreValues = [
    { icon: 'verified_user', title: 'Tin cậy (Trust)', desc: 'Chúng tôi cam kết bảo mật và chính xác của dữ liệu khách hàng là ưu tiên hàng đầu, xây dựng mối quan hệ bền vững dựa trên sự minh bạch.' },
    { icon: 'auto_awesome', title: 'Sáng tạo (Innovation)', desc: 'Liên tục cập nhật và áp dụng các công nghệ mới nhất như AI và Cloud Computing để mang đến trải nghiệm dẫn đầu xu hướng.' },
    { icon: 'handshake', title: 'Đồng hành (Partner)', desc: 'BizCode không chỉ là nhà cung cấp phần mềm, chúng tôi là đối tác chiến lược luôn sẵn sàng hỗ trợ 24/7 trên mọi nẻo đường phát triển.' },
  ];

  protected readonly team = [
    { name: 'Nguyễn Minh Quân', role: 'CEO & Founder' },
    { name: 'Lê Thu Thảo', role: 'CTO' },
    { name: 'Trần Hoàng Nam', role: 'COO' },
    { name: 'Đặng Mỹ Linh', role: 'VP of Operations' },
  ];

  protected initials(name: string): string {
    const parts = name.trim().split(' ');
    return parts[0][0] + parts[parts.length - 1][0];
  }
}
