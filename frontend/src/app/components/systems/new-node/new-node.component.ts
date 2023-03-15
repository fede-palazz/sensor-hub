import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.scss'],
})
export class NewNodeComponent implements OnInit {
  @Input() isActive: boolean;
  @Input() isSmart!: boolean;
  @Input() color!: string;
  @Input() systemName!: string;
  @Input() smartNodes?: { id: string; name: string }[];
  node: {
    id: string;
    name: string;
    isStandalone?: boolean;
    smartNodes?: { id: string; name: string }[] | [];
  };

  constructor() {
    this.isActive = false;
    this.node = {
      id: '',
      name: '',
    };
  }

  ngOnInit() {
    this.isSmart
      ? (this.node.isStandalone = false)
      : (this.node.smartNodes = this.smartNodes || []);
    console.log(this.smartNodes);
  }

  close(): void {
    this.isActive = false;
  }

  onQrScan(): void {}

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    console.log('Submitted');
    console.log(this.node);
  }
}
