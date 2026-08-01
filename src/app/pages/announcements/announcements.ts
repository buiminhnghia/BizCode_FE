import { Component, computed, signal } from '@angular/core';

interface Announcement {
  id: string;
  dateShort: string;
  dateLabel: string;
  badge: 'important' | 'new' | null;
  category: string;
  timeAgo: string;
  title: string;
  desc: string;
  authorInitials: string;
  author: string;
  views: string;
  comments: number;
  attachments?: number;
}

@Component({
  selector: 'app-announcements',
  imports: [],
  templateUrl: './announcements.html',
  styleUrl: './announcements.scss',
})
export class Announcements {
  protected readonly stats = [
    { icon: 'campaign', label: 'Tổng thông báo', value: '124', tone: 'navy' as const },
    { icon: 'priority_high', label: 'Quan trọng', value: '08', tone: 'red' as const },
    { icon: 'fiber_new', label: 'Mới trong tuần', value: '15', tone: 'pink' as const },
    { icon: 'visibility', label: 'Lượt xem trung bình', value: '452', tone: 'gray' as const },
  ];

  protected readonly categories = ['Tất cả danh mục', 'Chính sách', 'Sự kiện', 'Chung'];
  protected readonly selectedCategory = signal('Tất cả danh mục');
  protected readonly viewMode = signal<'list' | 'grid'>('list');

  protected readonly announcements: Announcement[] = [
    {
      id: 'a1',
      dateShort: 'Th08',
      dateLabel: '24',
      badge: 'important',
      category: 'Chính sách',
      timeAgo: '2 giờ trước',
      title: 'Cập nhật Quy định Làm việc Từ xa & Nghỉ lễ Quốc khánh 2/9',
      desc: 'Chào các thành viên BizCode, nhằm đảm bảo tiến độ dự án và phúc lợi nhân viên, Ban Giám đốc thông báo điều chỉnh thời gian làm việc linh hoạt và lịch nghỉ lễ sắp tới...',
      authorInitials: 'N',
      author: 'Phòng Nhân sự - Mr. Nam',
      views: '1,240',
      comments: 12,
      attachments: 2,
    },
    {
      id: 'a2',
      dateShort: 'Th08',
      dateLabel: '23',
      badge: 'new',
      category: 'Sự kiện',
      timeAgo: 'Hôm qua lúc 15:30',
      title: 'Mời tham gia Workshop: Tối ưu quy trình ERP với AI Gen',
      desc: 'Buổi chia sẻ kiến thức về ứng dụng trí tuệ nhân tạo trong vận hành doanh nghiệp sẽ diễn ra vào sáng Thứ 6 tuần này tại hội trường tầng 12...',
      authorInitials: 'L',
      author: 'Tech Board - Ms. Linh',
      views: '842',
      comments: 45,
    },
    {
      id: 'a3',
      dateShort: 'Th08',
      dateLabel: '21',
      badge: null,
      category: 'Chung',
      timeAgo: '3 ngày trước',
      title: 'Thông báo Bảo trì Hệ thống ERP định kỳ - Cuối tháng 8',
      desc: 'Để nâng cấp hiệu năng server, hệ thống sẽ tạm dừng hoạt động từ 22:00 ngày 31/08 đến 04:00 ngày 01/09. Rất mong các bộ phận lưu ý...',
      authorInitials: 'K',
      author: 'Phòng IT - Mr. Khoa',
      views: '654',
      comments: 3,
    },
  ];

  protected readonly filteredAnnouncements = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'Tất cả danh mục') return this.announcements;
    return this.announcements.filter((a) => a.category === cat);
  });

  protected readonly totalCount = 124;
  protected readonly page = signal(1);

  setCategory(value: string) {
    this.selectedCategory.set(value);
  }

  setViewMode(mode: 'list' | 'grid') {
    this.viewMode.set(mode);
  }

  goToPage(p: number) {
    if (p >= 1) {
      this.page.set(p);
    }
  }
}
