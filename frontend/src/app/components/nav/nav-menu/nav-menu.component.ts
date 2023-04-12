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
          class="link-inactive"
          routerLink="{{ link.route }}"
          routerLinkActive="link-active"
          (click)="onClick(i)"
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
  @Output() linkClicked = new EventEmitter<number>();

  onClick(index: number): void {
    this.linkClicked.emit(index);
  }
}
