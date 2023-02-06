import { Component } from '@angular/core';
import { ViewDetectorService } from './services/view-detector.service';

const DESKTOP_BREAKPOINT = 1024;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSidebarExpanded!: boolean;
  isMobileView!: boolean;

  constructor(private viewDetectorService: ViewDetectorService) {}

  ngOnInit() {
    this.viewDetectorService.getMobileView().subscribe((isMobile) => {
      this.isMobileView = isMobile;
      if (isMobile) return;
      this.isSidebarExpanded = document.body.offsetWidth >= DESKTOP_BREAKPOINT;
    });
  }

  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
