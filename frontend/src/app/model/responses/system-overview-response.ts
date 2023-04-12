import { System } from '../system/system';

type SystemOverview = Pick<System, 'id' | 'name' | 'color' | 'icon'>;

export type SystemOverviewResponse = SystemOverview[];
