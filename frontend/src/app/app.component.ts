import { Component } from '@angular/core';
import { ViewDetectorService } from './services/view-detector.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { SidebarComponent } from './components/nav/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

const DESKTOP_BREAKPOINT = 1024;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  styleUrls: ['./app.component.scss'],
  template: `
    <app-navbar (toggleSidebar)="toggleSidebar()"></app-navbar>
    <app-sidebar [isExpanded]="isSidebarExpanded"></app-sidebar>
    <div
      class="content"
      [style.margin-left]="
        isMobileView ? '0' : isSidebarExpanded ? '200px' : '60px'
      "
    >
      <router-outlet></router-outlet>
    </div>
  `,
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
