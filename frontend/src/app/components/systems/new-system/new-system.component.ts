import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Button } from 'src/app/model/button';
import { NodeStatus } from 'src/app/model/system/node-status';
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
    'apartment',
    'store',
    'storefront',
    'account_balance',
    'work',
    'fax',
    'shopping_bag',
  ];

  colorsList = [
    'is-dark',
    'is-light',
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
      icon: this.iconsList[this.selectedIconIndex],
      name: '',
      color: this.colorsList[this.selectedColorIndex],
      smartNodes: [
        {
          id: '1',
          name: 'Nodo smart autonomo disattivato',
          status: NodeStatus.DEACTIVATED,
          isStandalone: true,
        },
        {
          id: '2',
          name: 'Nodo smart con sensori online',
          status: NodeStatus.ONLINE,
          isStandalone: false,
          simpleNodes: [
            {
              id: '11',
              name: 'Nodo semplice 1 online',
              status: NodeStatus.ONLINE,
            },
            {
              id: '12',
              name: 'Nodo semplice 2 offline',
              status: NodeStatus.OFFLINE,
            },
            {
              id: '13',
              name: 'Nodo semplice 3 disattivato',
              status: NodeStatus.DEACTIVATED,
            },
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

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    // TODO: Send the system obj to a service
  }
}
