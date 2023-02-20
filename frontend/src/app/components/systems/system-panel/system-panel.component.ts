import { Component, Input } from '@angular/core';
import { System } from 'src/app/model/system';

@Component({
  selector: 'app-system-panel',
  templateUrl: './system-panel.component.html',
  styleUrls: ['./system-panel.component.scss'],
})
export class SystemPanelComponent {
  @Input() system!: System;
}
