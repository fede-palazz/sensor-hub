import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SmartNode } from 'src/app/model/system/smart-node';

@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.scss'],
})
export class NewNodeComponent implements OnInit {
  @Output() close = new EventEmitter<any>();
  @Input() newNodeData!: {
    isSmart: boolean;
    color: string;
    systemId: string;
    systemName: string;
    smartNodes?: SmartNode[];
  };
  formData: {
    nodeId: string;
    nodeName: string;
    isStandalone?: boolean;
    parentSmartNodeId?: string;
  };

  constructor() {
    this.formData = {
      nodeId: '',
      nodeName: '',
    };
  }

  ngOnInit() {
    this.newNodeData.isSmart
      ? (this.formData.isStandalone = false)
      : (this.formData.parentSmartNodeId = this.newNodeData.smartNodes![0].id);
  }

  onClose(): void {
    this.close.emit();
  }

  onParentNodeSelectChange($event: any): void {
    if (!this.newNodeData.isSmart)
      this.formData.parentSmartNodeId = $event.target.value;
  }

  onQrCodeScan(): void {}

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    console.log(this.formData);
  }
}
