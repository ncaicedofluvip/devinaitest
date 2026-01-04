import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export type Platform = 'instagram' | 'tiktok' | 'youtube';

export interface CacheEntry {
  data: ModashReport;
  fetchedAt: number;
  expiresAt: number;
}

export interface CacheStore {
  [key: string]: CacheEntry;
}

export interface WeightWithCode {
  code: string;
  weight: number;
}

export interface WeightWithCodeName {
  code: string;
  name: string;
  weight: number;
}

export interface WeightWithName {
  name: string;
  weight: number;
}

export interface GenderPerAge {
  code: string;
  male: number;
  female: number;
}

export interface AudienceLanguage {
  code: string;
  name: string;
  weight: number;
}

export interface AudienceType {
  code: string;
  weight: number;
}

export interface ModashAudience {
  notable?: number;
  credibility?: number;
  genders?: WeightWithCode[];
  ages?: WeightWithCode[];
  geoCountries?: WeightWithCodeName[];
  geoCities?: WeightWithName[];
  geoStates?: WeightWithName[];
  gendersPerAge?: GenderPerAge[];
  languages?: AudienceLanguage[];
  interests?: WeightWithName[];
  brandAffinity?: WeightWithName[];
  audienceTypes?: AudienceType[];
  audienceReachability?: WeightWithCode[];
  ethnicities?: WeightWithCode[];
}

export interface ModashInterest {
  id: string;
  name: string;
}

export interface ModashContact {
  type: string;
  value: string;
}

export interface ModashRecentPost {
  id: string;
  text?: string;
  url?: string;
  created?: string;
  likes?: number;
  comments?: number;
  views?: number;
  thumbnail?: string;
}

export interface ModashProfile {
  userId: string;
  username?: string;
  fullname?: string;
  picture?: string;
  url?: string;
  isVerified?: boolean;
  isPrivate?: boolean;
  followers?: number;
  following?: number;
  engagementRate?: number;
  avgLikes?: number;
  avgComments?: number;
  avgViews?: number;
  avgReelsPlays?: number;
  totalPosts?: number;
  totalVideos?: number;
  subscriberCount?: number;
  viewCount?: number;
  totalViews?: number;
  postsCount?: number;
  bio?: string;
  description?: string;
  city?: string;
  state?: string;
  country?: string;
  gender?: 'MALE' | 'FEMALE';
  ageGroup?: string;
  accountType?: 'Regular' | 'Business' | 'Creator';
  language?: { code: string; name: string };
  paidPostPerformance?: number;
}

export interface ModashReportProfile {
  userId: string;
  profile?: ModashProfile;
  audience?: ModashAudience;
  hashtags?: Array<{ tag: string; weight: number }>;
  mentions?: Array<{ tag: string; weight: number }>;
  interests?: ModashInterest[];
  brandAffinity?: Array<{ id: string; name: string }>;
  contacts?: ModashContact[];
  recentPosts?: ModashRecentPost[];
  popularPosts?: ModashRecentPost[];
  sponsoredPosts?: ModashRecentPost[];
  statHistory?: Array<{ month: string; followers?: number; following?: number; avgLikes?: number }>;
  lookalikes?: Array<{ userId: string; username?: string; picture?: string; followers?: number }>;
  city?: string;
  state?: string;
  country?: string;
  gender?: 'MALE' | 'FEMALE';
  ageGroup?: string;
  accountType?: 'Regular' | 'Business' | 'Creator';
  isPrivate?: boolean;
  isVerified?: boolean;
  postsCount?: number;
  avgLikes?: number;
  avgComments?: number;
  avgViews?: number;
  avgReelsPlays?: number;
  bio?: string;
  description?: string;
  totalViews?: number;
  paidPostPerformance?: number;
  username?: string;
  fullname?: string;
  picture?: string;
  url?: string;
  followers?: number;
  following?: number;
  engagementRate?: number;
  subscriberCount?: number;
  viewCount?: number;
  totalPosts?: number;
  totalVideos?: number;
}

export interface ModashReport {
  error?: boolean;
  profile: ModashReportProfile;
}

export interface FetchResult {
  data: ModashReport;
  fromCache: boolean;
  fetchedAt: number;
}

export interface FetchError {
  status: number;
  message: string;
}

const CACHE_KEY = 'modash_cache';
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class ModashService {
  private ttlMs = DEFAULT_TTL_MS;

  normalizeInput(input: string, platform: Platform): string {
    let normalized = input.trim();

    normalized = normalized.replace(/\?.*$/, '');
    normalized = normalized.replace(/\/$/, '');

    if (normalized.startsWith('@')) {
      return normalized.substring(1);
    }

    const patterns: Record<Platform, RegExp[]> = {
      instagram: [
        /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^/?]+)/i,
      ],
      tiktok: [
        /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([^/?]+)/i,
      ],
      youtube: [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([^/?]+)/i,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/channel\/([^/?]+)/i,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/c\/([^/?]+)/i,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/user\/([^/?]+)/i,
      ],
    };

    for (const pattern of patterns[platform]) {
      const match = normalized.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return normalized;
  }

  private getCacheKey(platform: Platform, userId: string): string {
    return `${platform}:${userId}`;
  }

  private getCache(): CacheStore {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  }

  private setCache(store: CacheStore): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(store));
    } catch {
      console.warn('Failed to save to localStorage');
    }
  }

  private getCacheEntry(platform: Platform, userId: string): CacheEntry | null {
    const store = this.getCache();
    const key = this.getCacheKey(platform, userId);
    const entry = store[key];

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      return null;
    }

    return entry;
  }

  private setCacheEntry(platform: Platform, userId: string, data: ModashReport): CacheEntry {
    const store = this.getCache();
    const key = this.getCacheKey(platform, userId);
    const now = Date.now();

    const entry: CacheEntry = {
      data,
      fetchedAt: now,
      expiresAt: now + this.ttlMs,
    };

    store[key] = entry;
    this.setCache(store);

    return entry;
  }

  async fetchReport(
    platform: Platform,
    input: string,
    bypassCache = false
  ): Promise<FetchResult> {
    const userId = this.normalizeInput(input, platform);

    if (!bypassCache) {
      const cached = this.getCacheEntry(platform, userId);
      if (cached) {
        return {
          data: cached.data,
          fromCache: true,
          fetchedAt: cached.fetchedAt,
        };
      }
    }

        const url = `${environment.modashApiUrl}/${platform}/profile/${encodeURIComponent(userId)}/report`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${environment.modashToken}`,
            'Content-Type': 'application/json',
          },
        });

    if (!response.ok) {
      const error: FetchError = {
        status: response.status,
        message: await response.text().catch(() => 'Unknown error'),
      };
      throw error;
    }

    const data: ModashReport = await response.json();
    const entry = this.setCacheEntry(platform, userId, data);

    return {
      data,
      fromCache: false,
      fetchedAt: entry.fetchedAt,
    };
  }

  exportToJson(data: ModashReport, platform: Platform, userId: string): void {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const filename = `${platform}-${userId}-${dateStr}.json`;

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  clearCache(): void {
    localStorage.removeItem(CACHE_KEY);
  }

  setTtl(hours: number): void {
    this.ttlMs = hours * 60 * 60 * 1000;
  }
}
