import { Component, Input } from '@angular/core';
import { Button } from 'src/app/model/button';

@Component({
  selector: 'app-title-bar',
  styleUrls: ['./title-bar.component.scss'],
  template: `
    <div class="title-container">
      <span class="title">{{ title }}</span>
      <div class="title-buttons-container">
        <button
          class="button is-primary is-light"
          *ngFor="let button of buttons"
        >
          <span class="icon"
            ><i class="material-icons">{{ button.icon }}</i></span
          >
          <span>{{ button.text }}</span>
        </button>
      </div>
    </div>
  `,
})
export class TitleBarComponent {
  @Input() title!: string;
  @Input() buttons?: Button[];
}
