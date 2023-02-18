import { SlaveNode } from './slave-node';

export interface MasterNode {
  name: string;
  id: string;
  slaveNodes: SlaveNode[];
}
