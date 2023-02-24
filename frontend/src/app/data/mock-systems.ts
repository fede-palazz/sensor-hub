import { System } from '../model/system/system';
import { NodeStatus } from '../model/system/node-status';

export const SYSTEMS: System[] = [
  {
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
          { id: '1', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: '1', name: 'slave 13', status: NodeStatus.ONLINE },
          { id: '1', name: 'slave 14', status: NodeStatus.DEACTIVATED },
        ],
      },
      {
        id: '1',
        name: 'Master 1',
        status: NodeStatus.ONLINE,
        isStandalone: false,
        simpleNodes: [
          { id: '1', name: 'slave 11', status: NodeStatus.ONLINE },
          { id: '1', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: '1', name: 'slave 13', status: NodeStatus.ONLINE },
          { id: '1', name: 'slave 14', status: NodeStatus.DEACTIVATED },
        ],
      },
    ],
  },
  {
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
          { id: '1', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: '1', name: 'slave 13', status: NodeStatus.OFFLINE },
          { id: '1', name: 'slave 14', status: NodeStatus.OFFLINE },
        ],
      },
    ],
  },
  {
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
          { id: '1', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: '1', name: 'slave 13', status: NodeStatus.ONLINE },
          { id: '1', name: 'slave 14', status: NodeStatus.DEACTIVATED },
        ],
      },
      {
        id: '1',
        name: 'Master 1',
        status: NodeStatus.ONLINE,
        isStandalone: false,
        simpleNodes: [
          { id: '1', name: 'slave 11', status: NodeStatus.ONLINE },
          { id: '1', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: '1', name: 'slave 13', status: NodeStatus.ONLINE },
          { id: '1', name: 'slave 14', status: NodeStatus.DEACTIVATED },
        ],
      },
    ],
  },
  {
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
          { id: '1', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: '1', name: 'slave 13', status: NodeStatus.ONLINE },
          { id: '1', name: 'slave 14', status: NodeStatus.DEACTIVATED },
        ],
      },
    ],
  },
  {
    icon: 'warning',
    name: 'Impianto di test',
    color: 'is-success',
    smartNodes: [],
  },
];
