import { Component } from '@angular/core';
import { Button } from 'src/app/model/button';

@Component({
  selector: 'app-new-system',
  templateUrl: './new-system.component.html',
  styleUrls: ['./new-system.component.scss'],
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
  iconsList = [
    'home',
    'shopping_bag',
    'account_balance',
    'work',
    'store',
    'tour',
    'fax',
  ];

  colorsList = [
    'is-black',
    'is-dark',
    'is-primary',
    'is-link',
    'is-info',
    'is-success',
    'is-warning',
    'is-danger',
  ];
  selectedIconIndex?: number;
  selectedColorIndex?: number;

  onIconClick(index: number): void {
    this.selectedIconIndex = index;
  }

  onColorClick(index: number): void {
    this.selectedColorIndex = index;
  }

  onSubmit(): void {
    console.log('Submitted!');
  }
}
