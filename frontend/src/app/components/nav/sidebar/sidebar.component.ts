import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewDetectorService } from '../../../services/view-detector.service';

@Component({
  selector: 'app-sidebar',
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
        <a href="https://www.idea-on-line.it/" target="_blank">
          <img src="assets/imgs/logo.png" />
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
