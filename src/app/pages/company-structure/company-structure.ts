import { Component, signal } from '@angular/core';

interface SubTeam {
  icon: string;
  label: string;
  count: number;
}

interface Department {
  key: string;
  icon: string;
  name: string;
  accent: 'navy' | 'pink' | 'gray';
  headcount: number;
  headName: string;
  headTitle: string;
  headInitials: string;
  subTeams: SubTeam[];
}

interface DeptRow {
  name: string;
  head: string;
  headcount: number;
  budget: string;
  status: 'stable' | 'hiring';
}

@Component({
  selector: 'app-company-structure',
  imports: [],
  templateUrl: './company-structure.html',
  styleUrl: './company-structure.scss',
})
export class CompanyStructure {
  protected readonly stats = [
    { label: 'Tổng nhân sự', value: '156', note: '+12% tháng này', tone: 'positive' as const },
    { label: 'Phòng ban', value: '08', note: 'Đang hoạt động', tone: 'neutral' as const },
    { label: 'Cấp quản lý', value: '24', note: 'Trưởng phòng & Team Lead', tone: 'neutral' as const },
    { label: 'Vị trí trống', value: '05', note: 'Đang tuyển dụng', tone: 'pink' as const },
  ];

  protected readonly ceo = {
    name: 'Trần Quốc Bảo',
    title: 'Tổng Giám Đốc (CEO)',
    initials: 'TB',
    badge: 'Board of Directors',
  };

  protected readonly departments: Department[] = [
    {
      key: 'tech',
      icon: 'developer_board',
      name: 'Khối Công nghệ & Sản phẩm',
      accent: 'navy',
      headcount: 42,
      headName: 'Lê Minh Tuấn',
      headTitle: 'Giám đốc công nghệ (CTO)',
      headInitials: 'LT',
      subTeams: [
        { icon: 'code', label: 'Backend Team', count: 18 },
        { icon: 'palette', label: 'UI/UX Design', count: 12 },
        { icon: 'verified_user', label: 'QA & Automation', count: 12 },
      ],
    },
    {
      key: 'sales',
      icon: 'trending_up',
      name: 'Khối Kinh doanh & Marketing',
      accent: 'pink',
      headcount: 65,
      headName: 'Phạm Hoàng Yến',
      headTitle: 'G.Đốc Marketing (CMO)',
      headInitials: 'PY',
      subTeams: [
        { icon: 'handshake', label: 'Enterprise Sales', count: 25 },
        { icon: 'campaign', label: 'Digital Marketing', count: 20 },
        { icon: 'support_agent', label: 'Customer Success', count: 20 },
      ],
    },
    {
      key: 'ops',
      icon: 'corporate_fare',
      name: 'Khối Vận hành & Nhân sự',
      accent: 'gray',
      headcount: 49,
      headName: 'Đặng Thế Vinh',
      headTitle: 'Giám đốc vận hành (COO)',
      headInitials: 'ĐV',
      subTeams: [
        { icon: 'person_search', label: 'Tuyển dụng', count: 10 },
        { icon: 'account_balance_wallet', label: 'Tài chính - Kế toán', count: 24 },
        { icon: 'inventory', label: 'Quản lý kho vận', count: 15 },
      ],
    },
  ];

  protected readonly deptRows: DeptRow[] = [
    { name: 'Phòng Kỹ thuật Phần mềm', head: 'Trần Văn Tú', headcount: 28, budget: '₫1.2B', status: 'stable' },
    { name: 'Phòng Marketing & Truyền thông', head: 'Lý Thu Thảo', headcount: 15, budget: '₫850M', status: 'stable' },
    { name: 'Phòng Tài chính Kế toán', head: 'Nguyễn Mai Anh', headcount: 12, budget: '₫450M', status: 'hiring' },
  ];

  protected readonly statusLabel: Record<DeptRow['status'], string> = {
    stable: 'Ổn định',
    hiring: 'Đang tuyển',
  };

  protected readonly viewMode = signal<'table' | 'grid'>('table');

  setViewMode(mode: 'table' | 'grid') {
    this.viewMode.set(mode);
  }
}
