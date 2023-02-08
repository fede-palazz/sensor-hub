import { Component, EventEmitter, Output } from '@angular/core';
import { ViewDetectorService } from 'src/app/services/view-detector.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMobileView!: boolean;
  isMobileMenuOpen?: boolean = true;
  @Output() onToggleSidebar = new EventEmitter<boolean>();

  constructor(private viewDetectorService: ViewDetectorService) {}

  ngOnInit() {
    // Detect mobile resizing
    this.viewDetectorService
      .getMobileView()
      .subscribe((isMobile) => (this.isMobileView = isMobile));

    // Register listener to close mobile panel when selecting a menu
  }

  onSidebarMenuClick(): void {
    this.onToggleSidebar.emit();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
