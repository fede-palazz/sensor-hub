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
   * - api/systems/{id}?smartId={id} -> specific smart node
   * - api/systems/{id}?smartId={id}&simpleId={id} -> specific simple node
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

  // deleteSmartNode(systemId: string, nodeId: string): Observable<any> {
  //   return this.getSystem(systemId).pipe(

  //   );
  // }

  // deleteSimpleNode(systemId:string, nodeId: string) {

  // }

  deleteNode(systemId: string, nodeId: string): Observable<any> {
    const url = `${this.API_URL}/${systemId}`;
    return this.http.post<any>(url, httpOptions);
  }
}
