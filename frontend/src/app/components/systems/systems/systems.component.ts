import { Component } from '@angular/core';
import { System } from 'src/app/model/system/system';
import { Button } from 'src/app/model/button';
import { SystemsDataService } from 'src/app/services/systems-data.service';
import { SmartNode } from 'src/app/model/system/smart-node';
import { SimpleNode } from 'src/app/model/system/simple-node';

@Component({
  selector: 'app-systems',
  styleUrls: ['./systems.component.scss'],
  template: `
    <app-title-bar [title]="'Impianti'" [buttons]="buttons"></app-title-bar>
    <div class="columns is-multiline" *ngIf="systems">
      <span *ngIf="!systems.length" class="subtitle">
        Per iniziare crea un nuovo impianto.
      </span>
      <ng-container *ngFor="let system of systems">
        <app-system-panel
          [system]="system"
          class="column system-panel"
          [isPreview]="false"
          (deleteSystem)="onDeleteSystem(system.id)"
          (deleteNode)="onDeleteNode(system, $event)"
        >
        </app-system-panel>
      </ng-container>
    </div>
  `,
})
export class SystemsComponent {
  buttons: Button[] = [
    {
      icon: 'add_circle',
      text: 'Nuovo impianto',
      color: 'is-primary is-light',
      url: '/systems/new',
    },
  ];
  systems?: System[];

  constructor(private systemsDataService: SystemsDataService) {
    this.systemsDataService.getSystems().subscribe((systems) => {
      this.systems = systems;
    });
  }

  onDeleteSystem(id: string): void {
    this.systemsDataService.deleteSystem(id).subscribe(() => {
      this.systems = this.systems!.filter((system) => system.id !== id);
    });
  }

  onDeleteNode(
    system: System,
    node: { smartNodeId: string; simpleNodeId?: string }
  ): void {
    this.systemsDataService
      .deleteNode(system.id, node.smartNodeId, node.simpleNodeId)
      .subscribe((sys) => {
        console.log(sys);
        // TODO: Get the result system
        if (!node.simpleNodeId)
          system.smartNodes = system.smartNodes.filter(
            (smartNode) => smartNode.id !== node.smartNodeId
          );
        else {
          let smartNode = system.smartNodes.find(
            (smartNode) => smartNode.id === node.smartNodeId
          );
          smartNode!.simpleNodes = smartNode!.simpleNodes!.filter(
            (simpleNode) => simpleNode.id !== node.simpleNodeId
          );
        }
      });
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
