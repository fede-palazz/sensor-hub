import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  // TODO: Declare as standalone component
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  // TODO: Initialise based on current route
  currentIndex: number = 0;
  @Output() linkClicked = new EventEmitter<any>();

  onLinkClick($elem: HTMLElement) {
    this.currentIndex = Number($elem.getAttribute('data-index'));
    this.linkClicked.emit();
  }
}
