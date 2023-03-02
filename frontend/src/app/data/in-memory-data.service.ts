import { Injectable } from '@angular/core';
import { NodeStatus } from '../model/system/node-status';
import { Observable } from 'rxjs';
import {
  getStatusText,
  InMemoryDbService,
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';

enum COLLECTION {
  SYSTEMS = 'systems',
  SMARTNODES = 'smartNodes',
  SIMPLENODES = 'simpleNodes',
}

enum ID {
  SYSTEM_ID = 'systemId',
  SMART_NODE_ID = 'smartNodeId',
  SIMPLE_NODE_ID = 'simpleNodeId',
}

const systems = [
  {
    id: 'system1',
    icon: 'home',
    name: 'Impianto Casa',
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
    id: 'system2',
    icon: 'apartment',
    name: 'Impianto Ufficio',
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
    id: 'system3',
    icon: 'warning',
    name: 'Impianto di test',
    color: 'is-success',
    smartNodes: [
      {
        id: 'ueMl2',
        name: 'Nodo smart standalone',
        status: NodeStatus.DEACTIVATED,
        isStandalone: true,
      },
    ],
  },
  {
    id: 'system5',
    icon: 'apartment',
    name: 'Impianto Ufficio',
    color: 'is-info',
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
    id: 'system6',
    icon: 'warning',
    name: 'Impianto di test',
    color: 'is-success',
    smartNodes: [],
  },
  {
    id: 'system7',
    icon: 'warning',
    name: 'Impianto di test 2',
    color: 'is-primary',
    smartNodes: [
      {
        id: 'rMbIE',
        name: 'Nodo smart non standalone',
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
  private db: Map<COLLECTION, any>;

  constructor() {
    // Instantiate the db
    this.db = new Map<COLLECTION, []>();
    // Add the systems collection
    this.db.set(COLLECTION.SYSTEMS, systems);
  }

  createDb() {
    return {};
  }

  // HTTP GET interceptor
  get(reqInfo: RequestInfo): Observable<any> | undefined {
    // console.log(reqInfo);
    switch (reqInfo.collectionName) {
      case COLLECTION.SYSTEMS:
        return reqInfo.utils.createResponse$(() => {
          const data = this.db.get(COLLECTION.SYSTEMS);
          const options: ResponseOptions = data
            ? { body: data, status: STATUS.OK }
            : {
                body: { error: `Error` },
                status: STATUS.NOT_FOUND,
              };
          return this.finishOptions(options, reqInfo);
        });

      default:
        return undefined;
    }
  }

  // HTTP DELETE interceptor
  delete(reqInfo: RequestInfo): Observable<any> | undefined {
    return reqInfo.utils.createResponse$(() => {
      const data = {};
      const options: ResponseOptions = data
        ? { body: data, status: STATUS.OK }
        : {
            body: { error: `Error` },
            status: STATUS.NOT_FOUND,
          };
      return this.finishOptions(options, reqInfo);
    });
  }

  parseRequestUrl(
    url: string,
    utils: RequestInfoUtilities
  ): ParsedRequestUrl | null | undefined {
    const parsedUrl = utils.parseRequestUrl(url);

    switch (parsedUrl.collectionName) {
      case COLLECTION.SYSTEMS:
        // No query params -> use default parser
        if (!parsedUrl.query.size) return undefined;

        // Copy query params
        const map = new Map(parsedUrl.query);

        if (map.get('simpleId')) {
          // Redirect request to simpleNodes collection
          // Set params
          parsedUrl.query.clear();
          parsedUrl.query.set('systemId', [parsedUrl.id]);
          parsedUrl.query.set('smartId', map.get('smartId')!);
          parsedUrl.collectionName = COLLECTION.SIMPLENODES;
          parsedUrl.id = map.get('simpleId')![0];
        } else {
          // Redirect request to smartNodes collection
          // Set params
          parsedUrl.query.clear();
          parsedUrl.query.set('systemId', [parsedUrl.id]);
          parsedUrl.collectionName = COLLECTION.SMARTNODES;
          parsedUrl.id = map.get('smartId')![0];
        }
        break;
    }

    console.log(parsedUrl);
    return parsedUrl;
  }

  // HELPERS
  private finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ) {
    options.statusText =
      options.status == null ? undefined : getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }

  // protected responseInterceptor(
  //   res: ResponseOptions,
  //   ri: RequestInfo
  // ): ResponseOptions {
  //   res.body = this.db;
  //   return res;
  // }
}
