import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

interface NavItem {
  label: string;
  icon?: string;
  path?: string;
}

interface NavGroup {
  key: string;
  label: string;
  icon: string;
  items: NavItem[];
}

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
})
export class AppLayout {
  private readonly router = inject(Router);

  protected readonly navGroups: NavGroup[] = [
    {
      key: 'company',
      label: 'Thông tin chung',
      icon: 'corporate_fare',
      items: [
        { label: 'Thông tin doanh nghiệp', icon: 'info', path: '/app/thong-tin-doanh-nghiep' },
        { label: 'Ngân hàng', icon: 'account_balance', path: '/app/ngan-hang' },
        { label: 'Giấy phép', icon: 'description', path: '/app/giay-phep' },
        { label: 'Cấu trúc bộ máy công ty', icon: 'account_tree', path: '/app/cau-truc-bo-may' },
      ],
    },
    {
      key: 'hr',
      label: 'Nhân sự',
      icon: 'badge',
      items: [
        { label: 'Quản lý nhân sự', icon: 'group', path: '/app/nhan-su' },
        { label: 'Quản lý lương', icon: 'payments' },
        { label: 'Thưởng/Phạt', icon: 'military_tech' },
        { label: 'Quản lý chấm công', icon: 'schedule' },
        { label: 'Thông báo nội bộ', icon: 'campaign' },
      ],
    },
    {
      key: 'sales',
      label: 'Bán hàng',
      icon: 'shopping_cart',
      items: [
        { label: 'Quản lý khách hàng', icon: 'person' },
        { label: 'Quản lý đơn hàng', icon: 'receipt_long' },
        { label: 'Quản lý khoản thu chi', icon: 'payments' },
        { label: 'Quản lý bán hàng', icon: 'storefront' },
        { label: 'Quản lý bảo hành/sửa chữa', icon: 'build' },
      ],
    },
    {
      key: 'stock',
      label: 'Quản lý kho',
      icon: 'inventory_2',
      items: [
        { label: 'Báo cáo tồn kho', icon: 'summarize' },
        { label: 'Quản lý hàng tồn kho', icon: 'inventory' },
        { label: 'Quản lý sản phẩm', icon: 'category' },
        { label: 'Quản lý lợi nhuận', icon: 'trending_up' },
        { label: 'Quản lý chi nhánh/cửa hàng', icon: 'store' },
        { label: 'Quản lý đơn đặt hàng', icon: 'shopping_bag' },
      ],
    },
    {
      key: 'audit',
      label: 'Kiểm toán',
      icon: 'account_balance_wallet',
      items: [
        { label: 'Quản lý tổng doanh thu', icon: 'monitoring' },
        { label: 'Quản lý số tiền lãi lỗ', icon: 'balance' },
        { label: 'Tổng lương nhân viên', icon: 'payments' },
        { label: 'Tình hình kinh doanh', icon: 'query_stats' },
      ],
    },
  ];

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly activeGroupKey = computed(() => {
    const url = this.currentUrl();
    return this.navGroups.find((g) => g.items.some((i) => i.path && url.startsWith(i.path)))?.key;
  });

  protected readonly openGroups = signal(new Set<string>());

  constructor() {
    effect(() => {
      const key = this.activeGroupKey();
      if (key) {
        this.openGroups.update((set) => new Set(set).add(key));
      }
    });
  }

  toggleGroup(key: string) {
    this.openGroups.update((set) => {
      const next = new Set(set);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  isOpen(key: string): boolean {
    return this.openGroups().has(key);
  }

  isItemActive(item: NavItem): boolean {
    return !!item.path && this.currentUrl().startsWith(item.path);
  }
}
