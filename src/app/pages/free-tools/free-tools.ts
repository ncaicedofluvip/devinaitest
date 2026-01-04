import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-free-tools',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './free-tools.html',
  styleUrl: './free-tools.scss'
})
export class FreeToolsComponent {
  private i18n = inject(I18nService);
  private http = inject(HttpClient);

  urlInput = '';
  shortenedUrl = signal<string>('');
  isLoading = signal(false);
  error = signal<string>('');
  copied = signal(false);

  t(key: string): string {
    return this.i18n.t(key);
  }

  async shortenUrl(): Promise<void> {
    if (!this.urlInput.trim()) {
      return;
    }

    let url = this.urlInput.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      new URL(url);
    } catch {
      this.error.set(this.t('freeTools.urlShortener.error'));
      return;
    }

    this.isLoading.set(true);
    this.error.set('');
    this.shortenedUrl.set('');

    try {
      const response = await fetch(`/api/shorten?format=simple&url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const shortUrl = await response.text();
        this.shortenedUrl.set(shortUrl.trim());
      } else {
        this.error.set(this.t('freeTools.urlShortener.error'));
      }
    } catch {
      this.error.set(this.t('freeTools.urlShortener.error'));
    } finally {
      this.isLoading.set(false);
    }
  }

  async copyToClipboard(): Promise<void> {
    if (this.shortenedUrl()) {
      try {
        await navigator.clipboard.writeText(this.shortenedUrl());
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = this.shortenedUrl();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      }
    }
  }
}
