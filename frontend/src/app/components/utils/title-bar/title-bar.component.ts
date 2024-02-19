import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button } from 'src/app/model/button';

@Component({
  selector: 'app-title-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./title-bar.component.scss'],
  template: `
    <div class="title-container">
      <span class="title">{{ title }}</span>
      <div class="title-buttons-container">
        @for (button of buttons; track button.url) {
        <button class="button" [class]="button.color" [routerLink]="button.url">
          <span class="icon"
            ><i class="material-icons">{{ button.icon }}</i></span
          >
          <span>{{ button.text }}</span>
        </button>
        }
      </div>
    </div>
  `,
})
export class TitleBarComponent {
  @Input() title!: string;
  @Input() buttons?: Button[];
}
