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
import { SimpleNode } from 'src/app/model/system/simple-node';

@Component({
  selector: 'app-system-panel',
  templateUrl: './system-panel.component.html',
  styleUrls: ['./system-panel.component.scss'],
})
export class SystemPanelComponent {
  @Input() system!: System;
  @Input() isPreview!: boolean;
  @Output() newNode = new EventEmitter<{
    isSmart: boolean;
    color: string;
    systemId: string;
    systemName: string;
    smartNodes?: SmartNode[];
  }>();
  @Output() deleteSystem = new EventEmitter<any>();
  @Output() deleteNode = new EventEmitter<{
    smartNodeId: string;
    simpleNodeId: string | undefined;
  }>();
  nodeStatus = NodeStatus; // access NodeStatus enum from template

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent) {
    if (this.isPreview) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onAddNode(isSmart: boolean): void {
    isSmart
      ? this.newNode.emit({
          isSmart,
          color: this.system.color,
          systemId: this.system.id,
          systemName: this.system.name,
        })
      : this.newNode.emit({
          isSmart,
          color: this.system.color,
          systemId: this.system.id,
          systemName: this.system.name,
          smartNodes: this.getNonStandaloneNodes(),
        });
  }

  onDeleteSystem($elem: HTMLElement): void {
    if (this.isPreview) return;
    // Display loading spinner
    $elem.classList.add('is-loading');
    this.deleteSystem.emit();
  }

  onDeleteNode(
    $elem: HTMLElement,
    smartNodeId: string,
    simpleNodeId?: string
  ): void {
    if (this.isPreview) return;
    const isSmartNode: boolean = !simpleNodeId;
    // If smart node, check the presence of child simple nodes
    if (
      isSmartNode &&
      this.system.smartNodes.find((smartNode) => smartNode.id === smartNodeId)
        ?.simpleNodes?.length
    )
      return;

    console.log('Emettendo');
    // Display loading spinner
    $elem.classList.add('is-loading');
    this.deleteNode.emit({
      smartNodeId: smartNodeId,
      simpleNodeId: simpleNodeId,
    });
  }

  /**
   * Retrieve all the standalone smart nodes of the current system
   * @returns an array of standalone smart nodes
   */
  getStandaloneNodes(): SmartNode[] {
    return this.system.smartNodes.filter((smartNode) => smartNode.isStandalone);
  }

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

  /**
   * Determine whether a node is either a SmartNode or a SimpleNode
   * @param node SmartNode | SimpleNode
   * @returns true if node is a smartNode, false otherwise
   */
  isSmartNode(node: SmartNode | SimpleNode) {
    return node.hasOwnProperty('isStandalone');
  }
}
