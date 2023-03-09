import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSystemRequest, System } from '../model/system/system';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SystemsDataService {
  /**
   * URL CONVENTION
   *
   * - api/systems        ->    all the systems db
   * - api/systems/{id}   ->    specific system
   * - api/systems/{id}/smartnodes/{id} -> specific smart node
   * - api/systems/{id}/smartnodes/{id}/simplenodes/{id} -> specific simple node
   */

  private readonly API_URL = environment.apiUrl + '/systems';

  constructor(private http: HttpClient) {}

  getSystems(): Observable<System[]> {
    return this.http.get<System[]>(this.API_URL);
  }

  getSystem(id: string): Observable<System> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<System>(url);
  }

  addSystem(system: System): Observable<any> {
    const url = `${this.API_URL}`;
    // TODO: Modify with addSystemRequest
    const systemRequest: System = {
      id: this.genId(),
      name: system.name,
      color: system.color,
      icon: system.icon,
      smartNodes: [],
    };
    return this.http.post<any>(url, systemRequest, httpOptions);
  }

  deleteSystem(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  deleteNode(
    systemId: string,
    smartNodeId: string,
    simpleNodeId?: string
  ): Observable<System> {
    let url = `${this.API_URL}/${systemId}/smartnodes/${smartNodeId}`;
    if (simpleNodeId) url = `${url}/simplenodes/${simpleNodeId}`;
    // return this.http.delete<any>(url, httpOptions);
    return this.http.get<any>(url, httpOptions);
  }

  genId(length = 5): string {
    return Math.random()
      .toString(36)
      .substring(2, length + 2)
      .toUpperCase();
  }
}
