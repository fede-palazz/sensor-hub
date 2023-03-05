import { NodeStatus } from './node-status';
import { SimpleNode } from './simple-node';

export interface SmartNode {
  id: string;
  name: string;
  status: NodeStatus;
  isStandalone: boolean;
  simpleNodes?: SimpleNode[];
}
