import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  // TODO: Initialise based on current route
  currentIndex: number = 0;
  @Output() linkClicked = new EventEmitter<any>();

  onLinkClick($elem: HTMLElement) {
    this.currentIndex = Number($elem.getAttribute('data-index'));
    this.linkClicked.emit();
  }
}
