import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
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
  scanningFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  isScanning = false; // user is scanning a qr code

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

  startScanning(): void {
    this.isScanning = true;
  }

  onScanSuccess(result: string) {
    this.formData.nodeId = result;
    this.isScanning = false;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    console.log(this.formData);
  }
}
