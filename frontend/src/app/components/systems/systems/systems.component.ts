import { Component } from '@angular/core';
import { System } from 'src/app/model/system/system';
import { Button } from 'src/app/model/button';
import { SystemsDataService } from 'src/app/services/systems-data.service';
import { CommonModule } from '@angular/common';
import { TitleBarComponent } from '../../utils/title-bar/title-bar.component';
import { SystemPanelComponent } from '../system-panel/system-panel.component';
import { NewNodeComponent } from '../new-node/new-node.component';

@Component({
  selector: 'app-systems',
  standalone: true,
  imports: [
    CommonModule,
    TitleBarComponent,
    SystemPanelComponent,
    NewNodeComponent,
  ],
  styleUrls: ['./systems.component.scss'],
  template: `
    <app-title-bar [title]="'Places'" [buttons]="buttons" />
    @if (systems) {
    <div class="columns is-multiline">
      @if (!systems.length) {
      <span class="subtitle"> To start, create a new place </span>
      } @for(system of systems; track system.id) {
      <app-system-panel
        [system]="system"
        class="column system-panel"
        (deleteSystem)="onDeleteSystem(system.id)"
        (deleteNode)="onDeleteNode(system, $event)"
        (newNode)="this.newNodeData = $event; this.isNewNodeModalActive = true"
      />
      } @if (isNewNodeModalActive) {
      <app-new-node
        [newNodeData]="this.newNodeData"
        (close)="this.isNewNodeModalActive = false"
      />}
    </div>
    }
  `,
})
export class SystemsComponent {
  buttons: Button[] = [
    {
      icon: 'add_circle',
      text: 'New place',
      color: 'is-primary is-light',
      url: '/places/new',
    },
  ];
  systems?: System[];
  newNodeData?: any;
  isNewNodeModalActive = false;

  constructor(private systemsDataService: SystemsDataService) {
    this.systemsDataService
      .getSystems()
      .subscribe((systems) => (this.systems = systems));
  }

  /**
   * Display the new node modal component
   * @param newNodeData Node info to display
   */
  // onNewNode(newNodeData: any): void {
  //   this.newNodeData = newNodeData;
  //   this.isAddNodeModalActive = true;
  // }

  onAddNode() {}

  onDeleteSystem(id: string) {
    this.systemsDataService.deleteSystem(id).subscribe(() => {
      this.systems = this.systems!.filter((system) => system.id !== id);
    });
  }

  onDeleteNode(
    system: System,
    node: { smartNodeId: string; simpleNodeId?: string }
  ) {
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
}
