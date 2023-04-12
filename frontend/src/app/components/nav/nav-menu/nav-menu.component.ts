import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Links } from './links';

@Component({
  // TODO: Declare as standalone component
  selector: 'app-nav-menu',
  styleUrls: ['./nav-menu.component.scss'],
  template: `
    <div class="menu-container">
      <ng-container *ngFor="let link of links; let i = index">
        <a
          routerLink="{{ link.route }}"
          (click)="onClick(i)"
          [ngClass]="currentIndex === i ? 'link-active' : 'link-inactive'"
        >
          <i class="material-icons">{{ link.icon }}</i>
          <span class="is-size-5">{{ link.label }}</span>
        </a>
      </ng-container>
    </div>
  `,
})
export class NavMenuComponent {
  links = Links;
  // TODO: Initialise based on current route
  @Input('initialIndex') currentIndex = 0;
  @Output() linkClicked = new EventEmitter<any>();

  // onLinkClick($elem: HTMLElement) {
  //   this.currentIndex = Number($elem.getAttribute('data-index'));
  //   this.linkClicked.emit();
  // }

  onClick(index: number): void {
    this.currentIndex = index;
    this.linkClicked.emit();
  }
}
