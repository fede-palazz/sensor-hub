import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.scss'],
})
export class NewNodeComponent {
  @Input() isActive: boolean;
  @Input() isSmart!: boolean;
  @Input() color!: string;
  @Input() systemName!: string;
  node: {
    id: string;
    name: string;
    isStandalone?: boolean;
  };

  constructor() {
    this.isActive = false;
    this.node = {
      id: '',
      name: '',
    };
  }

  close(): void {
    this.isActive = false;
  }

  onQrScan(): void {}

  onSubmit(form: NgForm): void {
    console.log('Submitting');
    if (!form.valid) return;
    console.log('Submitted');
  }
}
