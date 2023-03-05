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
import { SmartNode } from '../model/system/smart-node';
import { SimpleNode } from '../model/system/simple-node';

// enum COLLECTION {
//   SYSTEMS = 'systems',
//   SYSTEMS_SMARTNODES = 'smartNodes',
//   SYSTEMS_SIMPLENODES = 'simpleNodes',
// }

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
  // private db;

  constructor() {
    // Instantiate the db
    // this.db = new Map<COLLECTION, any>();
    // Add the systems collection
    // this.db.set(COLLECTION.SYSTEMS, systems);
  }

  createDb() {
    return { systems };
  }

  parseRequestUrl(
    url: string,
    utils: RequestInfoUtilities
  ): ParsedRequestUrl | null | undefined {
    const parsedUrl = utils.parseRequestUrl(url);
    console.log(url);
    // Set resource URL
    parsedUrl.resourceUrl = url.slice(url.indexOf(parsedUrl.collectionName));
    return parsedUrl;
  }

  // parseRequestUrl(
  //   url: string,
  //   utils: RequestInfoUtilities
  // ): ParsedRequestUrl | null | undefined {
  //   const parsedUrl = utils.parseRequestUrl(url);

  //   switch (parsedUrl.collectionName) {
  //     case COLLECTION.SYSTEMS:
  //       // No query params -> use default parser
  //       if (!parsedUrl.query.size) return undefined;

  //       // Copy query params
  //       const queryParams = new Map(parsedUrl.query);

  //       // Set systemId param
  //       parsedUrl.query.clear();
  //       parsedUrl.query.set('systemId', [parsedUrl.id]);

  //       if (queryParams.get('simpleId')) {
  //         // Redirect request to simpleNodes collection
  //         parsedUrl.query.set('smartId', queryParams.get('smartId')!);
  //         parsedUrl.collectionName = COLLECTION.SYSTEMS_SIMPLENODES;
  //         parsedUrl.id = queryParams.get('simpleId')![0];
  //       } else {
  //         // Redirect request to smartNodes collection
  //         parsedUrl.collectionName = COLLECTION.SYSTEMS_SMARTNODES;
  //         parsedUrl.id = queryParams.get('smartId')![0];
  //       }
  //       break;
  //   }
  //   return parsedUrl;
  // }

  /*************************
   * HTTP METHODS OVERRIDE *
   *************************/

  // HTTP GET interceptor
  // get(reqInfo: RequestInfo): Observable<any> | undefined {
  //   switch (reqInfo.collectionName) {
  //     case COLLECTION.SYSTEMS:
  //       /**
  //        * Sub cases:
  //        * - GET /systems
  //        * - GET /systems/{id}
  //        * - GET /systems/{id}/smartnodes
  //        * - GET /systems/{id}/smartnodes/{id}
  //        * - GET /systems/{id}/smartnodes/{id}/simplenodes
  //        * - GET /systems/{id}/smartnodes/{id}/simplenodes/{id}
  //        */
  //       const splittedUrl = reqInfo.resourceUrl.split('/');
  //       switch (splittedUrl.length) {
  //         case 1: // GET /systems
  //           return this.getSystems(reqInfo);
  //         case 2: {
  //           // GET /systems/{id}
  //           const systemId = splittedUrl[1];
  //           return this.getSystem(reqInfo, systemId);
  //         }
  //         case 3: {
  //           // GET /systems/{id}/smartnodes
  //           const systemId = splittedUrl[1];
  //           return this.getSmartNodes(reqInfo, systemId);
  //         }
  //         case 4: {
  //           // GET /systems/{id}/smartnodes/{id}
  //           const systemId = splittedUrl[1];
  //           const smartNodeId = splittedUrl[3];
  //           return this.getSmartNode(reqInfo, systemId, smartNodeId);
  //         }
  //         case 5: {
  //           // GET /systems/{id}/smartnodes/{id}/simplenodes
  //           const systemId = splittedUrl[1];
  //           const smartNodeId = splittedUrl[3];
  //           return this.getSimpleNodes(reqInfo, systemId, smartNodeId);
  //         }
  //         case 6: {
  //           // GET /systems/{id}/smartnodes/{id}/simplenodes/{id}
  //           const systemId = splittedUrl[1];
  //           const smartNodeId = splittedUrl[3];
  //           const simpleNodeId = splittedUrl[5];
  //           return this.getSimpleNode(
  //             reqInfo,
  //             systemId,
  //             smartNodeId,
  //             simpleNodeId
  //           );
  //         }
  //         default:
  //           return undefined;
  //       }
  //     default:
  //       return undefined;
  //   }
  // }

  // HTTP DELETE interceptor
  // delete(reqInfo: RequestInfo): Observable<any> | undefined {
  //   switch (reqInfo.collectionName) {
  //     case COLLECTION.SYSTEMS:
  //       /**
  //        * Sub cases:
  //        * - DELETE /systems/{id}
  //        * - DELETE /systems/{id}/smartnodes/{id}
  //        * - DELETE /systems/{id}/smartnodes/{id}/simplenodes/{id}
  //        */
  //       const splittedUrl = reqInfo.resourceUrl.split('/');
  //       switch (splittedUrl.length) {
  //         case 2: {
  //           // DELETE /systems/{id}
  //           const systemId = splittedUrl[1];
  //           return this.deleteSystem(reqInfo, systemId);
  //         }
  //         case 4: {
  //           // DELETE /systems/{id}/smartnodes/{id}
  //           const systemId = splittedUrl[1];
  //           const smartNodeId = splittedUrl[3];
  //           return this.deleteSmartNode(reqInfo, systemId, smartNodeId);
  //         }
  //         case 6: {
  //           // DELETE /systems/{id}/smartnodes/{id}/simplenodes/{id}
  //           const systemId = splittedUrl[1];
  //           const smartNodeId = splittedUrl[3];
  //           const simpleNodeId = splittedUrl[5];
  //           return this.deleteSimpleNode(
  //             reqInfo,
  //             systemId,
  //             smartNodeId,
  //             simpleNodeId
  //           );
  //         }
  //         default:
  //           return undefined;
  //       }
  //     default:
  //       return undefined;
  //   }
  // }

  /*********************
   * SYSTEMS FUNCTIONS *
   *********************/

  // getSystems(reqInfo: RequestInfo): Observable<any> {
  //   return reqInfo.utils.createResponse$(() => {
  //     const data: System[] = this.getDBCopy().get(COLLECTION.SYSTEMS);
  //     const options: ResponseOptions = {
  //       body: data,
  //       status: STATUS.OK,
  //     };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // getSystem(reqInfo: RequestInfo, systemId: string): Observable<any> {
  //   return reqInfo.utils.createResponse$(() => {
  //     // Get data
  //     const systems: System[] = this.getDBCopy().get(COLLECTION.SYSTEMS);
  //     const data = systems.filter((system) => system.id === systemId);

  //     // Set response options
  //     const options: ResponseOptions =
  //       data && data.length
  //         ? { body: data, status: STATUS.OK }
  //         : {
  //             body: { error: `System with id "${systemId}" not found` },
  //             status: STATUS.NOT_FOUND,
  //           };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // getSmartNodes(reqInfo: RequestInfo, systemId: string): Observable<any> {
  //   return reqInfo.utils.createResponse$(() => {
  //     const data: SmartNode[] = this.getDBCopy()
  //       .get(COLLECTION.SYSTEMS)
  //       .find((system: System) => system.id === systemId).smartNodes;

  //     const options: ResponseOptions = { body: data, status: STATUS.OK };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // getSmartNode(
  //   reqInfo: RequestInfo,
  //   systemId: string,
  //   smartNodeId: string
  // ): Observable<any> {
  //   return reqInfo.utils.createResponse$(() => {
  //     const data: SmartNode = this.getDBCopy()
  //       .get(COLLECTION.SYSTEMS)
  //       .find((system: System) => system.id === systemId)
  //       .smartNodes.find(
  //         (smartNode: SmartNode) => smartNode.id === smartNodeId
  //       );

  //     const options: ResponseOptions = { body: data, status: STATUS.OK };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // getSimpleNodes(
  //   reqInfo: RequestInfo,
  //   systemId: string,
  //   smartNodeId: string
  // ): Observable<any> {
  //   return reqInfo.utils.createResponse$(() => {
  //     const data: SimpleNode[] = this.getDBCopy()
  //       .get(COLLECTION.SYSTEMS)
  //       .find((system: System) => system.id === systemId)
  //       .smartNodes.find(
  //         (smartNode: SmartNode) => smartNode.id === smartNodeId
  //       ).simpleNodes;

  //     const options: ResponseOptions = { body: data, status: STATUS.OK };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // getSimpleNode(
  //   reqInfo: RequestInfo,
  //   systemId: string,
  //   smartNodeId: string,
  //   simpleNodeId: string
  // ): Observable<any> {
  //   return reqInfo.utils.createResponse$(() => {
  //     const data: SimpleNode = this.getDBCopy()
  //       .get(COLLECTION.SYSTEMS)
  //       .find((system: System) => system.id === systemId)
  //       .smartNodes.find((smartNode: SmartNode) => smartNode.id === smartNodeId)
  //       .simpleNodes.find(
  //         (simpleNode: SimpleNode) => simpleNode.id === simpleNodeId
  //       );

  //     const options: ResponseOptions = { body: data, status: STATUS.OK };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // deleteSystem(reqInfo: RequestInfo, systemId: string): Observable<any> {
  //   return reqInfo.utils.createResponse$(() => {
  //     let systems: System[] = this.db.get(COLLECTION.SYSTEMS);
  //     const systemToDelete = systems.find(
  //       (system: System) => system.id === systemId
  //     );
  //     // SmartNodes inside system
  //     if (systemToDelete!.smartNodes.length) {
  //       const options: ResponseOptions = {
  //         body: {
  //           error: `Impossible to delete the system ${systemId}: remove all the child smartNodes before`,
  //         },
  //         status: STATUS.BAD_REQUEST,
  //       };
  //       return this.finishOptions(options, reqInfo);
  //     }
  //     // Delete the requested system
  //     systems = systems.filter((system) => system.id !== systemId);
  //     const options: ResponseOptions = {
  //       body: { systemId: systemId },
  //       status: STATUS.OK,
  //     };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // deleteSmartNode(
  //   reqInfo: RequestInfo,
  //   systemId: string,
  //   smartNodeId: string
  // ): Observable<any> {
  //   return reqInfo.utils.createResponse$(() => {
  //     let system: System = this.db
  //       .get(COLLECTION.SYSTEMS)
  //       .find((system: System) => system.id === systemId);
  //     const smartNode = system.smartNodes.find(
  //       (smartNode) => smartNode.id === smartNodeId
  //     );
  //     // SimpleNodes inside smartNode
  //     if (!smartNode!.isStandalone && smartNode!.simpleNodes!.length) {
  //       const options: ResponseOptions = {
  //         body: {
  //           error: `Impossible to delete the smartNode ${smartNodeId}: remove all the child simpleNodes before`,
  //         },
  //         status: STATUS.BAD_REQUEST,
  //       };
  //       return this.finishOptions(options, reqInfo);
  //     }
  //     // Delete the requested smartNode
  //     system.smartNodes = system.smartNodes.filter(
  //       (smartNode) => smartNode.id !== smartNodeId
  //     );
  //     const options: ResponseOptions = {
  //       body: system,
  //       status: STATUS.OK,
  //     };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // deleteSimpleNode(
  //   reqInfo: RequestInfo,
  //   systemId: string,
  //   smartNodeId: string,
  //   simpleNodeId: string
  // ): Observable<any> {
  //   return reqInfo.utils.createResponse$(() => {
  //     let system: System = this.db
  //       .get(COLLECTION.SYSTEMS)
  //       .find((system: System) => system.id === systemId);
  //     let smartNode = system.smartNodes.find(
  //       (smartNode) => smartNode.id === smartNodeId
  //     );

  //     // Delete the requested simpleNode
  //     smartNode!.simpleNodes = smartNode!.simpleNodes!.filter(
  //       (simpleNode) => simpleNode.id !== simpleNodeId
  //     );

  //     const options: ResponseOptions = {
  //       body: system,
  //       status: STATUS.OK,
  //     };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  /********************
   * HELPER FUNCTIONS *
   ********************/

  // private getDBCopy(): Map<COLLECTION, any> {
  //   return new Map<COLLECTION, any>(this.db);
  // }

  // private finishOptions(
  //   options: ResponseOptions,
  //   { headers, url }: RequestInfo
  // ) {
  //   options.statusText =
  //     options.status == null ? undefined : getStatusText(options.status);
  //   options.headers = headers;
  //   options.url = url;
  //   return options;
  // }

  // private invalidIdResponse(reqInfo: RequestInfo, resourceName: string) {
  //   return reqInfo.utils.createResponse$(() => {
  //     const options = {
  //       body: { error: `Invalid id for the resource ${resourceName}` },
  //       status: STATUS.BAD_REQUEST,
  //     };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // private resourceNotFoundResponse(
  //   reqInfo: RequestInfo,
  //   name: string,
  //   id: string
  // ) {
  //   return reqInfo.utils.createResponse$(() => {
  //     const resourceName = name.charAt(0).toUpperCase() + name.slice(1);
  //     const options = {
  //       body: { error: `${resourceName} with id: ${id} not found` },
  //       status: STATUS.NOT_FOUND,
  //     };
  //     return this.finishOptions(options, reqInfo);
  //   });
  // }

  // protected responseInterceptor(
  //   res: ResponseOptions,
  //   ri: RequestInfo
  // ): ResponseOptions {
  //   res.body = this.db;
  //   return res;
  // }
}
