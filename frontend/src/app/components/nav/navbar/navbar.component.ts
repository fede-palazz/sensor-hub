import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewDetectorService } from 'src/app/services/view-detector.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMobileView!: boolean;
  isMobileMenuOpen?: boolean;
  @Output() onToggleSidebar = new EventEmitter<boolean>();

  constructor(private viewDetectorService: ViewDetectorService) {}

  ngOnInit() {
    this.viewDetectorService.getMobileView().subscribe((isMobile) => {
      this.isMobileView = isMobile;
    });
  }

  onSidebarMenuClick(): void {
    this.onToggleSidebar.emit();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
