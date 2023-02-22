import { Component } from '@angular/core';
import { Button } from 'src/app/model/button';
import { System } from 'src/app/model/system/system';

@Component({
  selector: 'app-new-system',
  templateUrl: './new-system.component.html',
  styleUrls: ['./new-system.component.scss'],
})
export class NewSystemComponent {
  titleButtons: Button[] = [
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
  system: System;

  constructor() {
    this.selectedIconIndex = 0;
    this.selectedColorIndex = 0;
    // Initialize preview system
    this.system = {
      name: '',
      color: this.colorsList[0],
      icon: this.iconsList[0],
      masterNodes: [
        {
          id: '1',
          name: 'Nodo Master 1',
          slaveNodes: [
            { id: '1', name: 'nodo slave 1' },
            { id: '2', name: 'nodo slave 2' },
            { id: '3', name: 'nodo slave 3' },
            { id: '4', name: 'nodo slave 4' },
          ],
        },
      ],
    };
  }

  onIconClick(index: number): void {
    this.selectedIconIndex = index;
    this.system.icon = this.iconsList[this.selectedIconIndex];
  }

  onColorClick(index: number): void {
    this.selectedColorIndex = index;
    this.system.color = this.colorsList[this.selectedColorIndex];
  }

  onSubmit(): void {
    console.log('Submitted!');
  }
}
