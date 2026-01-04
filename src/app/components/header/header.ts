import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  isMobileMenuOpen = signal(false);
  isFeaturesDropdownOpen = signal(false);
  isFreeToolsDropdownOpen = signal(false);
  isLanguageDropdownOpen = signal(false);

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

  closeAllDropdowns(): void {
    this.isFeaturesDropdownOpen.set(false);
    this.isFreeToolsDropdownOpen.set(false);
    this.isLanguageDropdownOpen.set(false);
  }
}
