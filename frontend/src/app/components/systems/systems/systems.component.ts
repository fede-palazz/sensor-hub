import { Component } from '@angular/core';
import { System } from 'src/app/model/system/system';
import { SYSTEMS } from 'src/app/data/mock-systems';
import { Button } from 'src/app/model/button';

@Component({
  selector: 'app-systems',
  styleUrls: ['./systems.component.scss'],
  template: `
    <app-title-bar [title]="'Impianti'" [buttons]="buttons"></app-title-bar>
    <div class="columns is-multiline ">
      <span *ngIf="!systems.length" class="subtitle">
        Per iniziare, registra un nuovo impianto.
      </span>
      <ng-container *ngFor="let system of systems">
        <app-system-panel
          [system]="system"
          class="column system-panel"
          [isPreview]="false"
        >
        </app-system-panel>
      </ng-container>
    </div>
  `,
})
export class SystemsComponent {
  buttons: Button[] = [
    {
      icon: 'add_circle',
      text: 'Nuovo impianto',
      color: 'is-primary is-light',
      url: '/systems/new',
    },
  ];
  systems: System[] = SYSTEMS;
  //systems: System[] = [];
}
