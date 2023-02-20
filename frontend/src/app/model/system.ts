import { MasterNode } from './master-node';

export interface System {
  name: string;
  icon: string;
  color: string;
  masterNodes: MasterNode[];
}
