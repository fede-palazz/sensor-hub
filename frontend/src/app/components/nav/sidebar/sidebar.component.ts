import { Component, Input } from '@angular/core';
import { ViewDetectorService } from '../../../services/view-detector.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  currentIndex?: number;
  isMobileView!: boolean;
  @Input() isExpanded!: boolean;

  constructor(private viewDetectorService: ViewDetectorService) {}

  ngOnInit() {
    this.viewDetectorService
      .getMobileView()
      .subscribe((isMobile) => (this.isMobileView = isMobile));
  }

  onLinkClick($elem: HTMLElement) {
    this.currentIndex = Number($elem.getAttribute('data-index'));
  }
}