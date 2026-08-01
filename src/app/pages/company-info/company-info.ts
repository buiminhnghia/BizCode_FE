import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-company-info',
  imports: [],
  templateUrl: './company-info.html',
  styleUrl: './company-info.scss',
})
export class CompanyInfo {
  protected readonly taxCode = '0109283746';
  protected readonly copied = signal(false);

  protected readonly history = [
    {
      date: '24/01/2024 - 14:30',
      title: 'Thay đổi người đại diện pháp luật',
      desc: 'Cập nhật bởi Admin: Chuyển đổi từ ông Trần Văn A sang ông Nguyễn Văn BizCode.',
      current: true,
    },
    {
      date: '10/11/2023 - 09:15',
      title: 'Cập nhật địa chỉ văn phòng đại diện',
      desc: 'Bổ sung tầng 12 vào địa chỉ trụ sở chính.',
      current: false,
    },
  ];

  copyTaxCode() {
    navigator.clipboard
      ?.writeText(this.taxCode)
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      })
      .catch(() => {
        /* clipboard permission unavailable — ignore, icon simply won't confirm */
      });
  }
}
