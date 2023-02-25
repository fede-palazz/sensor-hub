import { Component, Input } from '@angular/core';
import { System } from 'src/app/model/system/system';
import { NodeStatus } from 'src/app/model/system/node-status';
import { SmartNode } from 'src/app/model/system/smart-node';
import { SimpleNode } from 'src/app/model/system/simple-node';

@Component({
  selector: 'app-system-panel',
  templateUrl: './system-panel.component.html',
  styleUrls: ['./system-panel.component.scss'],
})
export class SystemPanelComponent {
  @Input() system!: System;

  /**
   * Map node status to the corresponsing style
   * @param status node status
   * @returns style class name
   */
  nodeStyleMapping(status: NodeStatus): string {
    switch (status) {
      case NodeStatus.ONLINE:
        return 'online-node';
      case NodeStatus.OFFLINE:
        return 'offline-node';
      case NodeStatus.DEACTIVATED:
        return 'deactivated-node';
    }
  }

  /**
   * Determine whether the current system is composed by only standalone smart nodes or not
   * @returns true if the system is standalone, false otherwise
   */
  isStandaloneSystem(): boolean {
    return !this.system.smartNodes.filter(
      (smartNode) => !smartNode.isStandalone
    ).length;
  }
  // TODO: Esclude also every DEACTIVATED / OFFLINE smart node
  // getTooltipMessage(node: SmartNode | SimpleNode) {
  //   let tooltipMessage = ''; // (node as SmartNode)?.isStandalone ?
  //   console.log(node as SmartNode);
  // }
}
