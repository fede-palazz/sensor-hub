import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.scss'],
})
export class NewNodeComponent {
  @Input() isActive: boolean;
  @Input() isSmart: boolean;
  @Input() color: string;

  constructor() {
    this.isActive = false;
    this.isSmart = true;
    this.color = 'is-danger';
  }

  close(): void {
    this.isActive = false;
  }
}
