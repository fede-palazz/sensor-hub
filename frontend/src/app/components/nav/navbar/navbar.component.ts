import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewDetectorService } from 'src/app/services/view-detector.service';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NavMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  @Output() toggleSidebar = new EventEmitter<any>();
  isMobileView$ = inject(ViewDetectorService).getMobileView();

  onSidebarMenuClick() {
    this.toggleSidebar.emit();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onMenuLinkClicked() {
    // Close the dropdown menu when clicking a link
    this.isMobileMenuOpen = false;
  }
}
