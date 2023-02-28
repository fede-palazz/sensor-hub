import { Injectable } from '@angular/core';
import { NodeStatus } from '../model/system/node-status';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const systems = [
      {
        id: 'system1',
        icon: 'home',
        name: 'Impianto Casa',
        color: 'is-danger',
        smartNodes: [
          {
            id: '1',
            name: 'Master 1',
            status: NodeStatus.ONLINE,
            isStandalone: false,
            simpleNodes: [
              { id: '1', name: 'slave 11', status: NodeStatus.ONLINE },
              { id: '2', name: 'slave 12', status: NodeStatus.OFFLINE },
              { id: '3', name: 'slave 13', status: NodeStatus.ONLINE },
              { id: '4', name: 'slave 14', status: NodeStatus.DEACTIVATED },
            ],
          },
          {
            id: '2',
            name: 'Master 1',
            status: NodeStatus.ONLINE,
            isStandalone: false,
            simpleNodes: [
              { id: '1', name: 'slave 11', status: NodeStatus.ONLINE },
              { id: '2', name: 'slave 12', status: NodeStatus.OFFLINE },
              { id: '3', name: 'slave 13', status: NodeStatus.ONLINE },
              { id: '4', name: 'slave 14', status: NodeStatus.DEACTIVATED },
            ],
          },
        ],
      },
      {
        id: 'system2',
        icon: 'apartment',
        name: 'Impianto Ufficio',
        color: 'is-info',
        smartNodes: [
          {
            id: '1',
            name: 'Master 1',
            status: NodeStatus.OFFLINE,
            isStandalone: false,
            simpleNodes: [
              { id: '1', name: 'slave 11', status: NodeStatus.OFFLINE },
              { id: '2', name: 'slave 12', status: NodeStatus.OFFLINE },
              { id: '3', name: 'slave 13', status: NodeStatus.OFFLINE },
              { id: '4', name: 'slave 14', status: NodeStatus.OFFLINE },
            ],
          },
        ],
      },
      {
        id: 'system3',
        icon: 'warning',
        name: 'Impianto di test',
        color: 'is-success',
        smartNodes: [
          {
            id: '1',
            name: 'Nodo smart standalone',
            status: NodeStatus.DEACTIVATED,
            isStandalone: true,
          },
        ],
      },
      {
        id: 'system4',
        icon: 'home',
        name: 'Impianto Casa',
        color: 'is-danger',
        smartNodes: [
          {
            id: '1',
            name: 'Master 1',
            status: NodeStatus.ONLINE,
            isStandalone: false,
            simpleNodes: [
              { id: '1', name: 'slave 11', status: NodeStatus.ONLINE },
              { id: '2', name: 'slave 12', status: NodeStatus.OFFLINE },
              { id: '3', name: 'slave 13', status: NodeStatus.ONLINE },
              { id: '4', name: 'slave 14', status: NodeStatus.DEACTIVATED },
            ],
          },
          {
            id: '2',
            name: 'Master 1',
            status: NodeStatus.ONLINE,
            isStandalone: false,
            simpleNodes: [
              { id: '1', name: 'slave 11', status: NodeStatus.ONLINE },
              { id: '2', name: 'slave 12', status: NodeStatus.OFFLINE },
              { id: '3', name: 'slave 13', status: NodeStatus.ONLINE },
              { id: '4', name: 'slave 14', status: NodeStatus.DEACTIVATED },
            ],
          },
        ],
      },
      {
        id: 'system5',
        icon: 'apartment',
        name: 'Impianto Ufficio',
        color: 'is-info',
        smartNodes: [
          {
            id: '1',
            name: 'Master 1',
            status: NodeStatus.ONLINE,
            isStandalone: false,
            simpleNodes: [
              { id: '1', name: 'slave 11', status: NodeStatus.ONLINE },
              { id: '2', name: 'slave 12', status: NodeStatus.OFFLINE },
              { id: '3', name: 'slave 13', status: NodeStatus.ONLINE },
              { id: '4', name: 'slave 14', status: NodeStatus.DEACTIVATED },
            ],
          },
        ],
      },
      {
        id: 'system6',
        icon: 'warning',
        name: 'Impianto di test',
        color: 'is-success',
        smartNodes: [],
      },
    ];
    return { systems };
  }
}
