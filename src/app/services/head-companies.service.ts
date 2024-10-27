import { HttpClient } from '@angular/common/http';
import { publishFacade } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadCompaniesService {

  constructor(private readonly http: HttpClient) {}

   public getHeadCompany(headCompanyID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headCompanies/${headCompanyID}`);
  }

  public getHeadCompanies(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headCompanies`);
  }
}
