import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ModashService,
  Platform,
  ModashReport,
  FetchError,
} from '../../services/modash.service';

type ReportState = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.html',
  styleUrl: './report.scss',
})
export class ReportComponent implements OnInit {
  state = signal<ReportState>('loading');
  report = signal<ModashReport | null>(null);
  fromCache = signal(false);
  fetchedAt = signal<number | null>(null);
  error = signal<FetchError | null>(null);
  platform = signal<Platform | null>(null);
  inputValue = signal<string>('');
  userId = signal<string>('');

  fetchedAtFormatted = computed(() => {
    const timestamp = this.fetchedAt();
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString();
  });

  dataSource = computed(() => {
    return this.fromCache() ? 'Cache' : 'Modash';
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modashService: ModashService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const platform = params['platform'] as Platform;
      const input = params['input'] as string;

      if (!platform || !input) {
        this.router.navigate(['/']);
        return;
      }

      if (!['instagram', 'tiktok', 'youtube'].includes(platform)) {
        this.router.navigate(['/']);
        return;
      }

      this.platform.set(platform);
      this.inputValue.set(input);
      this.userId.set(this.modashService.normalizeInput(input, platform));
      this.fetchReport(false);
    });
  }

  async fetchReport(bypassCache: boolean): Promise<void> {
    const platform = this.platform();
    const input = this.inputValue();

    if (!platform || !input) {
      return;
    }

    this.state.set('loading');
    this.error.set(null);

    try {
      const result = await this.modashService.fetchReport(platform, input, bypassCache);
      this.report.set(result.data);
      this.fromCache.set(result.fromCache);
      this.fetchedAt.set(result.fetchedAt);
      this.state.set('success');
    } catch (err) {
      const fetchError = err as FetchError;
      this.error.set({
        status: fetchError.status || 0,
        message: fetchError.message || 'An unexpected error occurred',
      });
      this.state.set('error');
    }
  }

  onRefresh(): void {
    this.fetchReport(true);
  }

  onRetry(): void {
    this.fetchReport(false);
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  onExport(): void {
    const reportData = this.report();
    const platform = this.platform();
    const userId = this.userId();

    if (reportData && platform && userId) {
      this.modashService.exportToJson(reportData, platform, userId);
    }
  }

  getProfilePicture(): string {
    const data = this.report();
    return data?.profile?.picture || '';
  }

  getProfileName(): string {
    const data = this.report();
    return data?.profile?.fullname || data?.profile?.username || this.userId();
  }

  getProfileUsername(): string {
    const data = this.report();
    return data?.profile?.username || this.userId();
  }

  getFollowers(): string {
    const data = this.report();
    const count = data?.profile?.followers || data?.profile?.subscriberCount;
    return count ? this.formatNumber(count) : '-';
  }

  getFollowing(): string {
    const data = this.report();
    const count = data?.profile?.following;
    return count ? this.formatNumber(count) : '-';
  }

  getEngagementRate(): string {
    const data = this.report();
    const rate = data?.profile?.engagementRate;
    return rate ? `${(rate * 100).toFixed(2)}%` : '-';
  }

  getAvgLikes(): string {
    const data = this.report();
    const count = data?.profile?.avgLikes;
    return count ? this.formatNumber(count) : '-';
  }

  getAvgComments(): string {
    const data = this.report();
    const count = data?.profile?.avgComments;
    return count ? this.formatNumber(count) : '-';
  }

  getAvgViews(): string {
    const data = this.report();
    const count = data?.profile?.avgViews || data?.profile?.viewCount;
    return count ? this.formatNumber(count) : '-';
  }

  getTotalPosts(): string {
    const data = this.report();
    const count = data?.profile?.totalPosts || data?.profile?.totalVideos;
    return count ? this.formatNumber(count) : '-';
  }

  isVerified(): boolean {
    const data = this.report();
    return data?.profile?.isVerified || false;
  }

  getPlatformIcon(): string {
    const platform = this.platform();
    switch (platform) {
      case 'instagram':
        return 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z';
      case 'tiktok':
        return 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z';
      case 'youtube':
        return 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z';
      default:
        return '';
    }
  }

  getPlatformName(): string {
    const platform = this.platform();
    switch (platform) {
      case 'instagram':
        return 'Instagram';
      case 'tiktok':
        return 'TikTok';
      case 'youtube':
        return 'YouTube';
      default:
        return '';
    }
  }

  getRawJson(): string {
    const data = this.report();
    return data ? JSON.stringify(data, null, 2) : '';
  }

  private formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}
