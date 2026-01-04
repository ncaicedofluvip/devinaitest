import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-for-managers',
  standalone: true,
  imports: [],
  templateUrl: './for-managers.html',
  styleUrl: './for-managers.scss'
})
export class ForManagersComponent {
  private i18n = inject(I18nService);

  t(key: string): string {
    return this.i18n.t(key);
  }
}
