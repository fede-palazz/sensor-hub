import { MasterNode } from './master-node';

export interface System {
  name: string;
  icon: string;
  masterNodes: MasterNode[];
}
