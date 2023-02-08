import { Component, EventEmitter, Output } from '@angular/core';
import { ViewDetectorService } from 'src/app/services/view-detector.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMobileView!: boolean;
  isMobileMenuOpen: boolean = false;
  @Output() onToggleSidebar = new EventEmitter<boolean>();

  constructor(private viewDetectorService: ViewDetectorService) {}

  ngOnInit() {
    // Detect mobile resizing
    this.viewDetectorService.getMobileView().subscribe((isMobile) => {
      this.isMobileView = isMobile;
      // Automatically close dropdown menu on resize
      if (!isMobile) this.isMobileMenuOpen = false;
    });
  }

  onSidebarMenuClick(): void {
    this.onToggleSidebar.emit();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onMenuLinkClicked(): void {
    // Close the dropdown menu when clicking a link
    this.isMobileMenuOpen = false;
  }

  //TODO: Add eventlistener to autoclose menu onLinkClick
}
