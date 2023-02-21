import { Component } from '@angular/core';
import { Button } from 'src/app/model/button';

@Component({
  selector: 'app-new-system',
  styleUrls: ['./new-system.component.scss'],
  template: `
    <app-title-bar
      [title]="'Nuovo Impianto'"
      [buttons]="buttons"
    ></app-title-bar>
  `,
})
export class NewSystemComponent {
  buttons: Button[] = [
    {
      icon: 'arrow_back',
      text: 'Impianti',
      color: 'is-primary is-light',
      url: '/systems',
    },
  ];
}
