import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface BomRow {
  sku: string;
  name: string;
  qty: string;
  stock: string;
  status: 'ok' | 'low' | 'critical';
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly sidebarMenu = [
    { icon: 'precision_manufacturing', label: 'Sản xuất', active: true },
    { icon: 'inventory_2', label: 'Kho', active: false },
    { icon: 'point_of_sale', label: 'Bán hàng', active: false },
    { icon: 'shopping_cart', label: 'Mua hàng', active: false },
    { icon: 'account_balance', label: 'Kế toán', active: false },
  ];

  protected readonly bomRows: BomRow[] = [
    { sku: 'CPU-X100-M', name: 'Mainboard BizBoard V2', qty: '1,200 Units', stock: '45,800', status: 'ok' },
    { sku: 'DIS-4K-ULTRA', name: 'Tấm nền OLED 4K-120', qty: '500 Units', stock: '120', status: 'critical' },
    { sku: 'BAT-LION-5K', name: 'Pin Lithium-ion 5000mAh', qty: '2,500 Units', stock: '12,400', status: 'ok' },
    { sku: 'CAS-ALU-CNC', name: 'Vỏ nhôm CNC nguyên khối', qty: '800 Units', stock: '950', status: 'low' },
  ];

  protected readonly statusLabel: Record<BomRow['status'], string> = {
    ok: 'Đủ tồn kho',
    low: 'Sắp hết',
    critical: 'Thiếu hụt',
  };

  protected readonly experienceCards = [
    { icon: 'speed', title: 'Tốc độ xử lý', desc: 'Xử lý hàng triệu bản ghi chỉ trong vài mili-giây với kiến trúc BizDB.' },
    { icon: 'encrypted', title: 'Bảo mật đa tầng', desc: 'Mã hóa AES-256 và phân quyền chi tiết tới từng tác vụ nhỏ nhất.' },
    { icon: 'api', title: 'API Mở', desc: 'Dễ dàng tích hợp với phần mềm kế toán hoặc CRM hiện hữu của bạn.' },
    { icon: 'support_agent', title: 'Hỗ trợ 24/7', desc: 'Đội ngũ kỹ thuật luôn sẵn sàng đồng hành cùng doanh nghiệp bạn.' },
  ];

  protected readonly whyCards = [
    { icon: 'cloud_done', title: 'Nền tảng Web', desc: 'Truy cập mọi lúc, mọi nơi trên trình duyệt, không cần cài đặt phần mềm phức tạp.' },
    { icon: 'groups', title: 'Đa người dùng', desc: 'Phân quyền chi tiết, làm việc cộng tác theo thời gian thực giữa các phòng ban.' },
    { icon: 'volunteer_activism', title: 'Dịch vụ miễn phí', desc: 'Miễn phí khởi tạo, đào tạo sử dụng và tư vấn kỹ thuật trong suốt quá trình vận hành.' },
    { icon: 'update', title: 'Nâng cấp tự động', desc: 'Hệ thống luôn cập nhật tính năng mới nhất, không tốn thêm chi phí nâng cấp.' },
  ];
}
