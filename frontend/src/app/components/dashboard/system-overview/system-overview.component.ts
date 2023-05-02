import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { System } from 'src/app/model/system/system';

@Component({
  selector: 'app-system-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-overview.component.html',
  styleUrls: ['./system-overview.component.scss'],
})
export class SystemOverviewComponent {
  @Input() system!: System;
}
