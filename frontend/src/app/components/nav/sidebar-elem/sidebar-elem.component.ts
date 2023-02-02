import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-elem',
  templateUrl: './sidebar-elem.component.html',
  styleUrls: ['./sidebar-elem.component.scss'],
})
export class SidebarElemComponent {
  @Input() iconName!: string;
  @Input() iconText!: string;
}
