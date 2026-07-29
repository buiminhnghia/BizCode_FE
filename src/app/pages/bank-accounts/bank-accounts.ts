import { Component, computed, signal } from '@angular/core';

interface BankAccount {
  id: string;
  bank: string;
  initials: string;
  branch: string;
  number: string;
  status: 'connected' | 'pending';
}

@Component({
  selector: 'app-bank-accounts',
  imports: [],
  templateUrl: './bank-accounts.html',
  styleUrl: './bank-accounts.scss',
})
export class BankAccounts {
  protected readonly accounts: BankAccount[] = [
    { id: 'vcb', bank: 'Vietcombank', initials: 'VCB', branch: 'Chi nhánh Sài Thành', number: '0071000889012', status: 'connected' },
    { id: 'tcb', bank: 'Techcombank', initials: 'TCB', branch: 'Chi nhánh Đông Đô', number: '19034567891011', status: 'connected' },
    { id: 'mb', bank: 'MB Bank', initials: 'MB', branch: 'Phòng Giao dịch Láng Hạ', number: '0511100222888', status: 'pending' },
    { id: 'bidv', bank: 'BIDV', initials: 'BIDV', branch: 'Chi nhánh Tây Hồ', number: '21510001234567', status: 'connected' },
  ];

  protected readonly defaultAccountId = signal('vcb');

  protected readonly defaultAccount = computed(() =>
    this.accounts.find((a) => a.id === this.defaultAccountId()),
  );

  setDefault(id: string) {
    this.defaultAccountId.set(id);
  }
}
