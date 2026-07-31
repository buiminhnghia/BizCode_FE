import { Component, computed, signal } from '@angular/core';

type TxCategory = 'Thu bán lẻ' | 'Thu nợ khách' | 'Chi vận hành' | 'Chi mặt bằng';
type TxStatus = 'success' | 'processing';

const CATEGORY_CLASS: Record<TxCategory, string> = {
  'Thu bán lẻ': 'in',
  'Thu nợ khách': 'in',
  'Chi vận hành': 'out',
  'Chi mặt bằng': 'out',
};

interface Transaction {
  id: string;
  code: string;
  initials: string;
  partner: string;
  note: string;
  category: TxCategory;
  amount: string;
  direction: 'in' | 'out';
  date: string;
  methodIcon: string;
  method: string;
  status: TxStatus;
}

@Component({
  selector: 'app-transactions',
  imports: [],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions {
  protected readonly summary = {
    inToday: '124.500.000',
    outToday: '42.800.000',
    balance: '81.700.000',
    overdueDebt: '12.300.000',
  };

  protected readonly transactions: Transaction[] = [
    { id: 't1', code: '#TRX-98231', initials: 'NL', partner: 'Nguyễn Văn Lợi', note: 'Đơn hàng: #DH-1002', category: 'Thu bán lẻ', amount: '15.200.000', direction: 'in', date: '12/05/2024 14:30', methodIcon: 'credit_card', method: 'Chuyển khoản', status: 'success' },
    { id: 't2', code: '#TRX-98230', initials: 'BC', partner: 'Cty TNHH Bách Chiến', note: 'Thanh toán nợ', category: 'Thu nợ khách', amount: '45.000.000', direction: 'in', date: '12/05/2024 11:15', methodIcon: 'account_balance', method: 'NH Vietcombank', status: 'success' },
    { id: 't3', code: '#TRX-98229', initials: 'GH', partner: 'Giao Hàng Nhanh', note: 'Phí vận chuyển tháng 5', category: 'Chi vận hành', amount: '8.500.000', direction: 'out', date: '11/05/2024 16:45', methodIcon: 'account_balance_wallet', method: 'Ví điện tử', status: 'success' },
    { id: 't4', code: '#TRX-98228', initials: 'TV', partner: 'Trần Văn Tú', note: 'Đơn hàng: #DH-1005', category: 'Thu bán lẻ', amount: '2.350.000', direction: 'in', date: '11/05/2024 10:20', methodIcon: 'payments', method: 'Tiền mặt', status: 'processing' },
    { id: 't5', code: '#TRX-98227', initials: 'EV', partner: 'Tiền điện tháng 4', note: 'Chi phí cố định', category: 'Chi mặt bằng', amount: '12.000.000', direction: 'out', date: '10/05/2024 09:00', methodIcon: 'account_balance', method: 'NH Techcombank', status: 'success' },
  ];

  protected readonly categories: (TxCategory | 'Tất cả nguồn thu')[] = [
    'Tất cả nguồn thu',
    'Thu bán lẻ',
    'Thu nợ khách',
    'Chi vận hành',
    'Chi mặt bằng',
  ];

  protected readonly selectedCategory = signal<TxCategory | 'Tất cả nguồn thu'>('Tất cả nguồn thu');

  protected readonly filteredTransactions = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'Tất cả nguồn thu') return this.transactions;
    return this.transactions.filter((t) => t.category === cat);
  });

  protected readonly statusLabel: Record<TxStatus, string> = {
    success: 'Thành công',
    processing: 'Đang xử lý',
  };

  protected readonly totalTransactions = 124;
  protected readonly page = signal(1);

  setCategory(value: string) {
    this.selectedCategory.set(value as TxCategory | 'Tất cả nguồn thu');
  }

  goToPage(p: number) {
    if (p >= 1) {
      this.page.set(p);
    }
  }

  categoryClass(category: TxCategory): string {
    return CATEGORY_CLASS[category];
  }
}
