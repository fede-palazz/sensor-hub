import { System } from '../model/system';

export const SYSTEMS: System[] = [
  {
    icon: 'home',
    name: 'Impianto Casa',
    color: 'danger',
    masterNodes: [
      {
        id: '1',
        name: 'Master 1',
        slaveNodes: [
          { id: '1', name: 'slave 11' },
          { id: '1', name: 'slave 12' },
          { id: '1', name: 'slave 13' },
          { id: '1', name: 'slave 14' },
        ],
      },
      {
        id: '2',
        name: 'Master 2',
        slaveNodes: [
          { id: '1', name: 'slave 21' },
          { id: '1', name: 'slave 22' },
          { id: '1', name: 'slave 23' },
          { id: '1', name: 'slave 24' },
        ],
      },
    ],
  },
  {
    icon: 'apartment',
    name: 'Impianto Ufficio',
    color: 'info',
    masterNodes: [
      {
        id: '1',
        name: 'Master 1',
        slaveNodes: [
          { id: '1', name: 'slave 11' },
          { id: '1', name: 'slave 12' },
          { id: '1', name: 'slave 13' },
          { id: '1', name: 'slave 14' },
        ],
      },
    ],
  },
  {
    icon: 'warning',
    name: 'Impianto di test',
    color: 'success',
    masterNodes: [],
  },
  {
    icon: 'home',
    name: 'Impianto Casa',
    color: 'danger',
    masterNodes: [
      {
        id: '1',
        name: 'Master 1',
        slaveNodes: [
          { id: '1', name: 'slave 11' },
          { id: '1', name: 'slave 12' },
          { id: '1', name: 'slave 13' },
          { id: '1', name: 'slave 14' },
        ],
      },
      {
        id: '2',
        name: 'Master 2',
        slaveNodes: [
          { id: '1', name: 'slave 21' },
          { id: '1', name: 'slave 22' },
          { id: '1', name: 'slave 23' },
          { id: '1', name: 'slave 24' },
        ],
      },
    ],
  },
  {
    icon: 'apartment',
    name: 'Impianto Ufficio',
    color: 'info',
    masterNodes: [
      {
        id: '1',
        name: 'Master 1',
        slaveNodes: [
          { id: '1', name: 'slave 11' },
          { id: '1', name: 'slave 12' },
          { id: '1', name: 'slave 13' },
          { id: '1', name: 'slave 14' },
        ],
      },
    ],
  },
  {
    icon: 'warning',
    name: 'Impianto di test',
    color: 'success',
    masterNodes: [],
  },
];
