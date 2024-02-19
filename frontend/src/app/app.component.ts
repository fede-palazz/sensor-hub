import { Component, inject, signal } from '@angular/core';
import { ViewDetectorService } from './services/view-detector.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { SidebarComponent } from './components/nav/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  styleUrls: ['./app.component.scss'],
  template: `
    <app-navbar (toggleSidebar)="toggleSidebar()" />
    @if (!(isMobileView$ | async)) {
    <app-sidebar [isExpanded]="isSidebarExpanded$()" />
    }
    <div
      class="content"
      [style.margin-left]="
        (isMobileView$ | async) ? '0' : isSidebarExpanded$() ? '200px' : '60px'
      "
    >
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  isMobileView$ = inject(ViewDetectorService).getMobileView();
  isSidebarExpanded$ = signal(true);

  toggleSidebar(): void {
    this.isSidebarExpanded$.update((value) => !value);
  }
}
