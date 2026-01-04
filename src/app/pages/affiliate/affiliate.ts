import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';

interface AffiliateForm {
  name: string;
  email: string;
  social: string;
  followers: string;
  message: string;
}

@Component({
  selector: 'app-affiliate',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './affiliate.html',
  styleUrl: './affiliate.scss'
})
export class AffiliateComponent {
  private i18n = inject(I18nService);

  formData: AffiliateForm = {
    name: '',
    email: '',
    social: '',
    followers: '',
    message: ''
  };

  isSubmitting = signal(false);
  isSubmitted = signal(false);

  t(key: string): string {
    return this.i18n.t(key);
  }

  async submitForm(): Promise<void> {
    if (!this.formData.name || !this.formData.email || !this.formData.social) {
      return;
    }

    this.isSubmitting.set(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    this.isSubmitting.set(false);
    this.isSubmitted.set(true);

    // Reset form
    this.formData = {
      name: '',
      email: '',
      social: '',
      followers: '',
      message: ''
    };
  }
}
