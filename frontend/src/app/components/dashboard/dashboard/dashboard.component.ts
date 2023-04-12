import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemOverviewResponse } from 'src/app/model/responses/system-overview-response';
import { System } from 'src/app/model/system/system';
import { SystemsDataService } from 'src/app/services/systems-data.service';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <app-title-bar [title]="'Dashboard'"></app-title-bar>
    <div class="wrapper" *ngIf="systems$ | async as systems">
      <app-system-overview *ngFor="let system of systems" [system]="system">
      </app-system-overview>
    </div>
  `,
})
export class DashboardComponent {
  systems$?: Observable<System[]>;

  constructor(private systemDataService: SystemsDataService) {
    this.systems$ = systemDataService.getSystems();
  }
}
