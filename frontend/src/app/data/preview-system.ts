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
      name: 'Standalone smart node deactivated',
      status: NodeStatus.DEACTIVATED,
      isStandalone: true,
    },
    {
      id: '2',
      name: 'Smart node with sensors online',
      status: NodeStatus.ONLINE,
      isStandalone: false,
      simpleNodes: [
        {
          id: '11',
          name: 'Simple node 1 online',
          status: NodeStatus.ONLINE,
        },
        {
          id: '12',
          name: 'Simple node 2 offline',
          status: NodeStatus.OFFLINE,
        },
        {
          id: '13',
          name: 'Simple node 3 deactivated',
          status: NodeStatus.DEACTIVATED,
        },
      ],
    },
  ],
};
