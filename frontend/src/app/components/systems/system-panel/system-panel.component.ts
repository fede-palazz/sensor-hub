import { Component, HostListener, Input } from '@angular/core';
import { System } from 'src/app/model/system/system';
import { NodeStatus } from 'src/app/model/system/node-status';

@Component({
  selector: 'app-system-panel',
  templateUrl: './system-panel.component.html',
  styleUrls: ['./system-panel.component.scss'],
})
export class SystemPanelComponent {
  @Input() system!: System;
  @Input() isPreview!: boolean;

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent) {
    if (this.isPreview) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

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

  /**
   * Determine whether the non standalone smart nodes of the current system are all offline or not
   * @returns true if all the non standalone smart nodes are offline, false otherwise
   */
  areNonStandaloneNodesOffline(): boolean {
    return !this.system.smartNodes.filter(
      (smartNode) =>
        !smartNode.isStandalone && smartNode.status === NodeStatus.ONLINE
    ).length;
  }

  onDeleteSystem(): void {
    if (this.isPreview) return;
    console.log('Deleted');
  }
}
