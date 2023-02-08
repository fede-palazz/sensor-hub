import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() currentIndex!: number;
  @Output() linkClicked = new EventEmitter<any>();

  onLinkClick($elem: HTMLElement) {
    this.currentIndex = Number($elem.getAttribute('data-index'));
    this.linkClicked.emit();
  }
}
