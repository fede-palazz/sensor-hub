import { System } from '../model/system/system';
import { NodeStatus } from '../model/system/node-status';

export const PreviewSystem: System = {
  id: '1',
  icon: '',
  name: '',
  color: '',
  smartNodes: [
    {
      id: '1',
      name: 'Nodo smart autonomo disattivato',
      status: NodeStatus.DEACTIVATED,
      isStandalone: true,
    },
    {
      id: '2',
      name: 'Nodo smart con sensori online',
      status: NodeStatus.ONLINE,
      isStandalone: false,
      simpleNodes: [
        {
          id: '11',
          name: 'Nodo semplice 1 online',
          status: NodeStatus.ONLINE,
        },
        {
          id: '12',
          name: 'Nodo semplice 2 offline',
          status: NodeStatus.OFFLINE,
        },
        {
          id: '13',
          name: 'Nodo semplice 3 disattivato',
          status: NodeStatus.DEACTIVATED,
        },
      ],
    },
  ],
};
