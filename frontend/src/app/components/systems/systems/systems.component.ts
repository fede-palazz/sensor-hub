import { Component } from '@angular/core';
import { System } from 'src/app/model/system/system';
import { Button } from 'src/app/model/button';
import { Observable } from 'rxjs';
import { SystemsDataService } from 'src/app/services/systems-data.service';

@Component({
  selector: 'app-systems',
  styleUrls: ['./systems.component.scss'],
  template: `
    <app-title-bar [title]="'Impianti'" [buttons]="buttons"></app-title-bar>
    <div class="columns is-multiline" *ngIf="systems$ | async as systems">
      <span *ngIf="!systems.length" class="subtitle">
        Per iniziare crea un nuovo impianto.
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
  systems$: Observable<System[]>;

  constructor(private systemsDataService: SystemsDataService) {
    this.systems$ = this.systemsDataService.getSystems();
  }
}
