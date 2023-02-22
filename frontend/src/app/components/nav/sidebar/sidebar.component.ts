import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewDetectorService } from '../../../services/view-detector.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isMobileView$: Observable<boolean>;
  @Input() isExpanded!: boolean;

  constructor(private viewDetectorService: ViewDetectorService) {
    this.isMobileView$ = this.viewDetectorService.getMobileView();
  }
}
