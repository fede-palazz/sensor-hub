import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { System } from '../model/system/system';
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
}
