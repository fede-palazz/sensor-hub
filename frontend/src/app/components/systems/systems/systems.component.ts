import { Component } from '@angular/core';

@Component({
  selector: 'app-systems',
  styleUrls: ['./systems.component.scss'],
  template: `
    <span class="title is-3">Impianti</span>
    <app-system-panel></app-system-panel>
  `,
})
export class SystemsComponent {}
