import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewDetectorService } from '../../../services/view-detector.service';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NavMenuComponent],
  styleUrls: ['./sidebar.component.scss'],
  template: `
    <div
      class="sidebar-container no-scrollbars"
      *ngIf="!(isMobileView$ | async)"
      [style.width]="isExpanded ? '200px' : '60px'"
    >
      <!--------- SIDEBAR MENU ----------->
      <app-nav-menu></app-nav-menu>

      <!--------- SIDEBAR LOGO ----------->
      <div class="logo-container" *ngIf="isExpanded">
        <a href="#">
          <!-- Insert your company website link here -->
          <img
            src="assets/imgs/logo_placeholder.png"
            title="Insert your company website link"
          />
        </a>
      </div>
    </div>
  `,
})
export class SidebarComponent {
  isMobileView$: Observable<boolean>;
  @Input() isExpanded!: boolean;

  constructor(private viewDetectorService: ViewDetectorService) {
    this.isMobileView$ = this.viewDetectorService.getMobileView();
  }
}
