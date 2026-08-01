import { Component, computed, signal } from '@angular/core';

interface BonusPenaltyRecord {
  date: string;
  initials: string;
  name: string;
  dept: string;
  type: 'bonus' | 'penalty';
  amount: string;
  reason: string;
  approver: string;
}

@Component({
  selector: 'app-bonus-penalty',
  imports: [],
  templateUrl: './bonus-penalty.html',
  styleUrl: './bonus-penalty.scss',
})
export class BonusPenalty {
  protected readonly summary = {
    totalBonus: '84.500.000',
    bonusChange: '+12% vs tháng trước',
    totalPenalty: '12.250.000',
    penaltyChange: '-5% vs tháng trước',
    topEmployee: 'Lê Minh Tuấn',
    topEmployeeNote: 'Kỹ thuật - 5 phần thưởng',
  };

  protected readonly records: BonusPenaltyRecord[] = [
    { date: '24/10/2023', initials: 'NL', name: 'Nguyễn Lan', dept: 'Marketing Team', type: 'bonus', amount: '2.000.000', reason: 'KPI vượt chỉ tiêu tháng 10', approver: 'Trần Văn A' },
    { date: '22/10/2023', initials: 'PV', name: 'Phạm Văn Việt', dept: 'IT Support', type: 'penalty', amount: '500.000', reason: 'Đi muộn quá 3 lần/tháng', approver: 'Lê Thị B' },
    { date: '20/10/2023', initials: 'TH', name: 'Trần Hoàng', dept: 'Sales Dept', type: 'bonus', amount: '5.000.000', reason: 'Ký thành công dự án ERP-X', approver: 'Trần Văn A' },
    { date: '18/10/2023', initials: 'MT', name: 'Lê Minh Tuấn', dept: 'Kỹ thuật', type: 'bonus', amount: '1.500.000', reason: 'Sáng kiến tối ưu quy trình kho', approver: 'Nguyễn C' },
    { date: '15/10/2023', initials: 'QH', name: 'Quốc Huy', dept: 'Bảo vệ', type: 'penalty', amount: '200.000', reason: 'Vi phạm nội quy đồng phục', approver: 'Lê Thị B' },
  ];

  protected readonly filterType = signal<'all' | 'bonus' | 'penalty'>('all');

  protected readonly filteredRecords = computed(() => {
    const filter = this.filterType();
    if (filter === 'all') return this.records;
    return this.records.filter((r) => r.type === filter);
  });

  protected readonly totalRecords = 42;
  protected readonly page = signal(1);

  setFilter(value: string) {
    this.filterType.set(value as 'all' | 'bonus' | 'penalty');
  }

  goToPage(p: number) {
    if (p >= 1 && p <= 3) {
      this.page.set(p);
    }
  }
}