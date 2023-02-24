import { NodeStatus } from './node-status';

export interface SimpleNode {
  id: string;
  name: string;
  status: NodeStatus;
}
