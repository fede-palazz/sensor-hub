import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemOverviewResponse } from 'src/app/model/responses/system-overview-response';
import { System } from 'src/app/model/system/system';
import { SystemsDataService } from 'src/app/services/systems-data.service';
import { SystemOverviewComponent } from '../system-overview/system-overview.component';
import { TitleBarComponent } from '../../utils/title-bar/title-bar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SystemOverviewComponent,
    TitleBarComponent,
    // HttpClientModule,
  ],
  providers: [SystemsDataService],
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
