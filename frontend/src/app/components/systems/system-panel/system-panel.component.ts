import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { System } from 'src/app/model/system/system';
import { NodeStatus } from 'src/app/model/system/node-status';
import { SmartNode } from 'src/app/model/system/smart-node';

@Component({
  selector: 'app-system-panel',
  templateUrl: './system-panel.component.html',
  styleUrls: ['./system-panel.component.scss'],
})
export class SystemPanelComponent {
  @Input() system!: System;
  @Input() isPreview!: boolean;
  @Output() deleteSystem = new EventEmitter<string>();
  systemDeletion = false; // binded to the delete system btn
  nodeStatus = NodeStatus; // access NodeStatus enum from template

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent) {
    if (this.isPreview) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onDeleteSystem($event: MouseEvent): void {
    if (this.isPreview) return;
    this.deleteSystem.emit(this.system.id);
    // Display loading spinner
    this.systemDeletion = true;
  }

  /**
   * Retrieve all the standalone smart nodes of the current system
   * @returns an array of standalone smart nodes
   */
  getStandaloneNodes(): SmartNode[] {
    return this.system.smartNodes.filter((smartNode) => smartNode.isStandalone);
  }

  /**
   * Retrieve all the standalone online smart nodes of the current system
   * @returns an array of standalone smart nodes
   */
  // getStandaloneNodesOnline(): SmartNode[] {
  //   return this.getStandaloneNodes().filter(
  //     (smartNode) => smartNode.status === NodeStatus.ONLINE
  //   );
  // }

  /**
   * Retrieve all the non standalone smart nodes of the current system
   * @returns an array of non standalone smart nodes
   */
  getNonStandaloneNodes(): SmartNode[] {
    return this.system.smartNodes.filter(
      (smartNode) => !smartNode.isStandalone
    );
  }

  /**
   * Determine whether the current system is composed by only standalone smart nodes or not
   * @returns true if the system is standalone, false otherwise
   */
  isStandaloneSystem(): boolean {
    return this.system.smartNodes.length === this.getStandaloneNodes().length;
  }

  /**
   * Determine whether the non standalone smart nodes of the current system are all offline or not
   * @returns true if all the non standalone smart nodes are offline, false otherwise
   */
  areNonStandaloneNodesOffline(): boolean {
    return !this.getNonStandaloneNodes().filter(
      (smartNode) => smartNode.status === NodeStatus.ONLINE
    ).length;
  }
}
