import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService, Language } from '../../services/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  private i18n = inject(I18nService);
  
  isMobileMenuOpen = signal(false);
  isFeaturesDropdownOpen = signal(false);
  isFreeToolsDropdownOpen = signal(false);
  isLanguageDropdownOpen = signal(false);
  
  currentLanguage = this.i18n.language;
  languageLabel = this.i18n.languageLabel;

  languages: { code: Language; label: string; name: string }[] = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'es', label: 'ES', name: 'Espanol' },
    { code: 'pt', label: 'PT', name: 'Portugues' }
  ];

  t(key: string): string {
    return this.i18n.t(key);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  toggleFeaturesDropdown(): void {
    this.isFeaturesDropdownOpen.update(value => !value);
    this.isFreeToolsDropdownOpen.set(false);
    this.isLanguageDropdownOpen.set(false);
  }

  toggleFreeToolsDropdown(): void {
    this.isFreeToolsDropdownOpen.update(value => !value);
    this.isFeaturesDropdownOpen.set(false);
    this.isLanguageDropdownOpen.set(false);
  }

  toggleLanguageDropdown(): void {
    this.isLanguageDropdownOpen.update(value => !value);
    this.isFeaturesDropdownOpen.set(false);
    this.isFreeToolsDropdownOpen.set(false);
  }

  selectLanguage(lang: Language): void {
    this.i18n.setLanguage(lang);
    this.isLanguageDropdownOpen.set(false);
  }

  closeAllDropdowns(): void {
    this.isFeaturesDropdownOpen.set(false);
    this.isFreeToolsDropdownOpen.set(false);
    this.isLanguageDropdownOpen.set(false);
  }
}
