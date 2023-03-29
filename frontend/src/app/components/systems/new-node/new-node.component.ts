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
  @Output() submitData = new EventEmitter<{
    nodeId: string;
    nodeName: string;
    isStandalone?: boolean;
    parentSmartNodeId?: string;
  }>();
  @Input('newNodeData') inputData!: {
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
    this.inputData.isSmart
      ? (this.formData.isStandalone = false)
      : (this.formData.parentSmartNodeId = this.inputData.smartNodes![0].id);
  }

  onClose(): void {
    this.close.emit();
  }

  onParentNodeSelectChange($event: any): void {
    if (!this.inputData.isSmart)
      this.formData.parentSmartNodeId = $event.target.value;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    this.submitData.emit(this.formData);
    this.close.emit();
  }

  // QR Code Scanner functions
  // TODO: Test if there is a way to directly access the back camera (maybe getDevices needs to always do this to scan them?)
  onStartScanning() {
    this.isScanning = true;
  }

  onScanSuccess(result: string) {
    this.formData.nodeId = result;
    this.isScanning = false;
  }

  onScanError(error: Error) {
    console.log(error);
  }
}
