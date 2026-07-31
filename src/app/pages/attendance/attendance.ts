import { Component, computed, signal } from '@angular/core';

interface AttendanceRow {
  initials: string;
  name: string;
  code: string;
  dept: string;
  date: string;
  checkIn: string;
  checkInLate: boolean;
  checkOut: string;
  totalHours: string;
  note: string;
  noteTone: 'ontime' | 'late' | 'early' | 'remote';
}

interface CalendarDay {
  day: number;
  weekend: boolean;
  muted: boolean;
  current: boolean;
}

const MONTH_LABEL = 'Tháng 05, 2024';
const WEEKDAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_IN_MONTH = 31;
const LEADING_MUTED_DAYS = [29, 30];
const CURRENT_DAY = 24;

@Component({
  selector: 'app-attendance',
  imports: [],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss',
})
export class Attendance {
  protected readonly monthLabel = MONTH_LABEL;
  protected readonly weekdayHeaders = WEEKDAY_HEADERS;

  protected readonly viewMode = signal<'table' | 'calendar'>('table');

  protected readonly departments = ['Tất cả phòng ban', 'Kỹ thuật', 'Marketing', 'Nhân sự'];
  protected readonly selectedDept = signal('Tất cả phòng ban');

  protected readonly summary = {
    today: '24/05/2024',
    present: '142/150',
  };

  protected readonly rows: AttendanceRow[] = [
    { initials: 'LM', name: 'Lê Thị Mai', code: 'NV-00234', dept: 'Nhân sự', date: '24/05/2024', checkIn: '08:02', checkInLate: false, checkOut: '17:35', totalHours: '8.5h', note: 'Đúng giờ', noteTone: 'ontime' },
    { initials: 'NH', name: 'Nguyễn Văn Hùng', code: 'NV-00192', dept: 'Kỹ thuật', date: '24/05/2024', checkIn: '08:45', checkInLate: true, checkOut: '18:00', totalHours: '8.25h', note: 'Đi muộn', noteTone: 'late' },
    { initials: 'TQ', name: 'Trần Minh Quân', code: 'NV-00451', dept: 'Kỹ thuật', date: '24/05/2024', checkIn: '07:55', checkInLate: false, checkOut: '17:05', totalHours: '8.15h', note: 'Về sớm', noteTone: 'early' },
    { initials: 'SJ', name: 'Sarah Johnson', code: 'NV-00312', dept: 'Marketing', date: '24/05/2024', checkIn: '08:00', checkInLate: false, checkOut: '17:00', totalHours: '8.0h', note: 'Remote', noteTone: 'remote' },
  ];

  protected readonly filteredRows = computed(() => {
    const dept = this.selectedDept();
    if (dept === 'Tất cả phòng ban') return this.rows;
    return this.rows.filter((r) => r.dept === dept);
  });

  protected readonly totalEmployees = 150;
  protected readonly page = signal(1);

  protected readonly calendarDays: CalendarDay[] = [
    ...LEADING_MUTED_DAYS.map((day) => ({ day, weekend: false, muted: true, current: false })),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => {
      const day = i + 1;
      const weekdayIndex = (2 + i) % 7; // May 1, 2024 is a Wednesday (index 2)
      return {
        day,
        weekend: weekdayIndex === 5 || weekdayIndex === 6,
        muted: false,
        current: day === CURRENT_DAY,
      };
    }),
  ];

  setViewMode(mode: 'table' | 'calendar') {
    this.viewMode.set(mode);
  }

  setDept(value: string) {
    this.selectedDept.set(value);
  }

  goToPage(p: number) {
    if (p >= 1) {
      this.page.set(p);
    }
  }
}