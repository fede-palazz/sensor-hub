import { SmartNode } from './smart-node';

export interface System {
  name: string;
  icon: string;
  color: string;
  smartNodes: SmartNode[];
}
