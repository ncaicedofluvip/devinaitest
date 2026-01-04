import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter';

interface PlatformConfig {
  name: string;
  icon: string;
  prefix: string;
  placeholder: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  selectedPlatform: Platform = 'instagram';
  urlInput = '';

  platforms: Record<Platform, PlatformConfig> = {
    instagram: {
      name: 'Instagram',
      icon: 'instagram',
      prefix: 'instagram.com/',
      placeholder: 'Paste your profile URL or type your @handle'
    },
    tiktok: {
      name: 'TikTok',
      icon: 'tiktok',
      prefix: 'tiktok.com/@',
      placeholder: 'Paste your profile URL or type your @handle'
    },
    youtube: {
      name: 'YouTube',
      icon: 'youtube',
      prefix: 'youtube.com/@',
      placeholder: 'Paste your profile URL or type your @handle'
    },
    twitter: {
      name: 'Twitter',
      icon: 'twitter',
      prefix: 'twitter.com/',
      placeholder: 'Paste your profile URL or type your @handle'
    }
  };

  constructor(private router: Router) {}

  get currentPlatform(): PlatformConfig {
    return this.platforms[this.selectedPlatform];
  }

  selectPlatform(platform: Platform): void {
    this.selectedPlatform = platform;
    this.urlInput = '';
  }

  onSubmit(): void {
    const fullUrl = this.currentPlatform.prefix + this.urlInput;
    this.router.navigate(['/report'], {
      queryParams: { url: fullUrl }
    });
  }
}
