import { Injectable } from '@angular/core';
import { NodeStatus } from '../model/system/node-status';
import {
  InMemoryDbService,
  ParsedRequestUrl,
  RequestInfoUtilities,
} from 'angular-in-memory-web-api';
import { System } from '../model/system/system';

const systems: System[] = [
  {
    id: 'place1',
    icon: 'home',
    name: 'Home',
    color: 'is-danger',
    smartNodes: [
      {
        id: 'xNRVZ',
        name: 'Master 1',
        status: NodeStatus.ONLINE,
        isStandalone: false,
        simpleNodes: [
          { id: '5Nzhx', name: 'slave 11', status: NodeStatus.ONLINE },
          { id: 'PuFKO', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: 'Rppfg', name: 'slave 13', status: NodeStatus.ONLINE },
          { id: 'YKYTO', name: 'slave 14', status: NodeStatus.DEACTIVATED },
        ],
      },
      {
        id: 'wjW6R',
        name: 'Master 1',
        status: NodeStatus.ONLINE,
        isStandalone: false,
        simpleNodes: [
          { id: 'b2kJT', name: 'slave 11', status: NodeStatus.ONLINE },
          { id: 'KOzbO', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: '2UZ7P', name: 'slave 13', status: NodeStatus.ONLINE },
          { id: 'qwksK', name: 'slave 14', status: NodeStatus.DEACTIVATED },
        ],
      },
    ],
  },
  {
    id: 'place2',
    icon: 'apartment',
    name: 'Office',
    color: 'is-info',
    smartNodes: [
      {
        id: 'A_41E',
        name: 'Master 1',
        status: NodeStatus.OFFLINE,
        isStandalone: false,
        simpleNodes: [
          { id: 'WKApE', name: 'slave 11', status: NodeStatus.OFFLINE },
          { id: 'xHxwu', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: '98jnC', name: 'slave 13', status: NodeStatus.OFFLINE },
          { id: '6r6iV', name: 'slave 14', status: NodeStatus.OFFLINE },
        ],
      },
    ],
  },
  {
    id: 'place3',
    icon: 'warning',
    name: 'Test place',
    color: 'is-success',
    smartNodes: [
      {
        id: 'ueMl2',
        name: 'Standalone Smart Node',
        status: NodeStatus.DEACTIVATED,
        isStandalone: true,
      },
    ],
  },
  {
    id: 'place5',
    icon: 'apartment',
    name: 'Office',
    color: 'is-warning',
    smartNodes: [
      {
        id: 'hHHAj',
        name: 'Master 1',
        status: NodeStatus.ONLINE,
        isStandalone: false,
        simpleNodes: [
          { id: 'Gwf0h', name: 'slave 11', status: NodeStatus.ONLINE },
          { id: 'ZpMlM', name: 'slave 12', status: NodeStatus.OFFLINE },
          { id: 'NSh01', name: 'slave 13', status: NodeStatus.ONLINE },
          { id: 'L6Y62', name: 'slave 14', status: NodeStatus.DEACTIVATED },
        ],
      },
    ],
  },
  {
    id: 'place6',
    icon: 'warning',
    name: 'Test place',
    color: 'is-success',
    smartNodes: [],
  },
  {
    id: 'place7',
    icon: 'warning',
    name: 'Test place 2',
    color: 'is-primary',
    smartNodes: [
      {
        id: 'rMbIE',
        name: 'Smart Node',
        status: NodeStatus.ONLINE,
        isStandalone: false,
        simpleNodes: [],
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    return { systems };
  }

  parseRequestUrl(
    url: string,
    utils: RequestInfoUtilities
  ): ParsedRequestUrl | null | undefined {
    const parsedUrl = utils.parseRequestUrl(url);
    // Set resource URL
    parsedUrl.resourceUrl = url.slice(url.indexOf(parsedUrl.collectionName));
    return parsedUrl;
  }
}
