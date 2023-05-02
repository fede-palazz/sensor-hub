import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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
  isMobileView$: Observable<boolean>;
  isMobileMenuOpen: boolean;
  @Output() toggleSidebar = new EventEmitter<any>();

  constructor(private viewDetectorService: ViewDetectorService) {
    this.isMobileView$ = this.viewDetectorService.getMobileView();
    this.isMobileMenuOpen = false;
  }

  onSidebarMenuClick(): void {
    this.toggleSidebar.emit();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onMenuLinkClicked(): void {
    // Close the dropdown menu when clicking a link
    this.isMobileMenuOpen = false;
  }
}
