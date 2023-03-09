import { SmartNode } from './smart-node';

export interface System {
  id: string;
  name: string;
  icon: string;
  color: string;
  smartNodes: SmartNode[];
}

export type AddSystemRequest = Pick<System, 'name' | 'color' | 'icon'>;
