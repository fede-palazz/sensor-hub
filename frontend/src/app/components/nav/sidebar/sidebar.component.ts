import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  SIDEBAR_ELEMENTS = new Map<string, string>([
    ['explore', 'Dashboard'],
    ['factory', 'Impianti'],
    ['warning', 'Allarmi'],
    ['bar_chart', 'Storico'],
    ['tune', 'Soglie'],
    ['people', 'Utenti'],
  ]);
}
