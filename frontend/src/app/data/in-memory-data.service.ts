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
import { System } from '../model/system/system';

enum COLLECTION {
  SYSTEMS = 'systems',
  SYSTEMS_SMARTNODES = 'smartNodes',
  SYSTEMS_SIMPLENODES = 'simpleNodes',
}

enum ID {
  SYSTEM_ID = 'systemId',
  SMART_NODE_ID = 'smartNodeId',
  SIMPLE_NODE_ID = 'simpleNodeId',
}

const systems: System[] = [
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
        const queryParams = new Map(parsedUrl.query);

        // Set systemId param
        parsedUrl.query.clear();
        parsedUrl.query.set('systemId', [parsedUrl.id]);

        if (queryParams.get('simpleId')) {
          // Redirect request to simpleNodes collection
          parsedUrl.query.set('smartId', queryParams.get('smartId')!);
          parsedUrl.collectionName = COLLECTION.SYSTEMS_SIMPLENODES;
          parsedUrl.id = queryParams.get('simpleId')![0];
        } else {
          // Redirect request to smartNodes collection
          parsedUrl.collectionName = COLLECTION.SYSTEMS_SMARTNODES;
          parsedUrl.id = queryParams.get('smartId')![0];
        }
        break;
    }
    return parsedUrl;
  }

  /*************************
   * HTTP METHODS OVERRIDE *
   *************************/

  // HTTP GET interceptor
  get(reqInfo: RequestInfo): Observable<any> | undefined {
    switch (reqInfo.collectionName) {
      case COLLECTION.SYSTEMS:
        /**
         * Sub cases:
         * - GET /systems
         * - GET /systems/{id}
         */
        const systemId = reqInfo.id;
        return systemId
          ? this.getSystem(reqInfo, systemId)
          : this.getSystems(reqInfo);

      default:
        return undefined;
    }
  }

  // HTTP DELETE interceptor
  delete(reqInfo: RequestInfo): Observable<any> | undefined {
    switch (reqInfo.collectionName) {
      case COLLECTION.SYSTEMS:
        /**
         * Sub cases:
         * - DELETE /systems/{id}
         */
        const systemId = reqInfo.id;
        return systemId
          ? this.deleteSystem(reqInfo, systemId)
          : this.invalidIdResponse(reqInfo);
      default:
        return undefined;
    }
  }

  /*********************
   * SYSTEMS FUNCTIONS *
   *********************/

  getSystems(reqInfo: RequestInfo): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      const data = this.db.get(COLLECTION.SYSTEMS);
      const options: ResponseOptions = { body: data, status: STATUS.OK };
      return this.finishOptions(options, reqInfo);
    });
  }

  getSystem(reqInfo: RequestInfo, systemId: string): Observable<any> {
    return reqInfo.utils.createResponse$(() => {
      // Get data
      const systems: System[] = this.db.get(COLLECTION.SYSTEMS);
      const data = systems.filter((system) => system.id === systemId);

      // Set response options
      const options: ResponseOptions =
        data && data.length
          ? { body: data, status: STATUS.OK }
          : {
              body: { error: `System with id "${systemId}" not found` },
              status: STATUS.NOT_FOUND,
            };
      return this.finishOptions(options, reqInfo);
    });
  }

  deleteSystem(reqInfo: RequestInfo, systemId: string): Observable<any> {
    // Get data
    let systems: System[] = this.db.get(COLLECTION.SYSTEMS);
    let options: ResponseOptions;
    const systemToDelete = systems.find((system) => system.id === systemId);

    // System not found
    if (!systemToDelete)
      return this.resourceNotFoundResponse(reqInfo, 'system', systemId);

    return reqInfo.utils.createResponse$(() => {
      // SmartNodes inside system
      if (systemToDelete.smartNodes.length) {
        options = {
          body: {
            error: `Impossible to delete the system ${systemId}: remove all the nodes before`,
          },
          status: STATUS.BAD_REQUEST,
        };
      }
      // Request OK
      else {
        // Delete the requested system
        systems = systems.filter((system) => system.id !== systemId);
        options = { body: { id: systemId }, status: STATUS.OK };
      }
      return this.finishOptions(options, reqInfo);
    });
  }

  /********************
   * HELPER FUNCTIONS *
   ********************/

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

  private invalidIdResponse(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const options = {
        body: { error: `Invalid id` },
        status: STATUS.BAD_REQUEST,
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  private resourceNotFoundResponse(
    reqInfo: RequestInfo,
    name: string,
    id: string
  ) {
    return reqInfo.utils.createResponse$(() => {
      const resourceName = name.charAt(0).toUpperCase() + name.slice(1);
      const options = {
        body: { error: `${resourceName} with id: ${id} not found` },
        status: STATUS.NOT_FOUND,
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  // protected responseInterceptor(
  //   res: ResponseOptions,
  //   ri: RequestInfo
  // ): ResponseOptions {
  //   res.body = this.db;
  //   return res;
  // }
}
