import { Component, EventEmitter, Output } from '@angular/core';
import { Links } from './links';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./nav-menu.component.scss'],
  template: `
    <div class="menu-container">
      @for (link of links; track link.label) {
      <a
        class="link-inactive"
        routerLink="{{ link.route }}"
        routerLinkActive="link-active"
        (click)="onClick($index)"
      >
        <i class="material-icons">{{ link.icon }}</i>
        <span class="is-size-5">{{ link.label }}</span>
      </a>
      }
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
