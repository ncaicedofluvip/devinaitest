import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class FeaturesComponent {
  private i18n = inject(I18nService);

  t(key: string): string {
    return this.i18n.t(key);
  }
}
