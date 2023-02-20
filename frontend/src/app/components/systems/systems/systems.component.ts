import { Component } from '@angular/core';
import { System } from 'src/app/model/system';
import { SYSTEMS } from 'src/app/data/mock-systems';
import { Button } from 'src/app/model/button';

@Component({
  selector: 'app-systems',
  styleUrls: ['./systems.component.scss'],
  template: `
    <app-title-bar [title]="'Impianti'" [buttons]="buttons"></app-title-bar>
    <div class="systems-container">
      <ng-container *ngFor="let system of systems">
        <app-system-panel [system]="system" class="system-panel">
        </app-system-panel>
      </ng-container>
    </div>
  `,
})
export class SystemsComponent {
  buttons: Button[] = [{ icon: 'add_circle', text: 'Nuovo impianto' }];
  systems: System[] = SYSTEMS;
}
