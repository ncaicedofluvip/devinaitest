import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

interface PlanFeature {
  key: string;
  free: string | boolean;
  starter: string | boolean;
  pro: string | boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss'
})
export class PricingComponent {
  private i18n = inject(I18nService);

  isAnnual = signal(true);

  planFeatures: PlanFeature[] = [
    { key: 'mediaKits', free: '1', starter: '1', pro: '3' },
    { key: 'socialAccounts', free: '1', starter: '3', pro: '10' },
    { key: 'statsUpdates', free: false, starter: 'Daily', pro: 'Daily' },
    { key: 'analytics', free: false, starter: false, pro: true },
    { key: 'calculators', free: true, starter: true, pro: true },
    { key: 'autoUpdate', free: false, starter: true, pro: true },
    { key: 'pdf', free: false, starter: true, pro: true },
    { key: 'customization', free: false, starter: true, pro: true },
    { key: 'verified', free: false, starter: false, pro: true },
    { key: 'removeLogo', free: false, starter: false, pro: true }
  ];

  t(key: string): string {
    return this.i18n.t(key);
  }

  toggleBilling(): void {
    this.isAnnual.update(v => !v);
  }

  getFeatureValue(value: string | boolean): string {
    if (typeof value === 'boolean') {
      return '';
    }
    return value;
  }

  isFeatureEnabled(value: string | boolean): boolean {
    return value === true || (typeof value === 'string' && value !== '');
  }

  isFeatureDisabled(value: string | boolean): boolean {
    return value === false;
  }
}
