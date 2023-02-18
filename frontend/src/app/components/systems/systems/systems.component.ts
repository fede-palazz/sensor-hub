import { Component, Input } from '@angular/core';
import { System } from 'src/app/model/system';
import { SYSTEMS } from 'src/app/data/mock-systems';

@Component({
  selector: 'app-systems',
  styleUrls: ['./systems.component.scss'],
  template: `
    <span class="title is-3">Impianti</span>
    <ng-container *ngFor="let system of systems">
      <app-system-panel [system]="system"> </app-system-panel>
    </ng-container>
  `,
})
export class SystemsComponent {
  systems: System[] = SYSTEMS;
}
