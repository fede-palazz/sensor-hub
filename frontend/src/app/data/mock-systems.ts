import { System } from '../model/system';
import { MasterNode } from '../model/master-node';
import { SlaveNode } from '../model/slave-node';

export const SYSTEMS: System[] = [
  {
    icon: 'home',
    name: 'Impianto',
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
];
