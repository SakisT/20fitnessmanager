import { HttpClient } from '@angular/common/http';
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

  public getHeadExpenseTypes(headID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headExpenseTypes/list/${headID}`);
  }

  public addHeadExpenseType(headID: string, expenseType: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}headExpenseTypes/${headID}`, expenseType);
  }

  public deleteHeadExpenseType(headID: string, expenseTypeID: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}headExpenseTypes/${headID}/${expenseTypeID}`);
  }

  public updateHeadExpenseType(headID: string, expenseType: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}headExpenseTypes/${headID}`, expenseType);
  }

  public getHeadExpenses(headID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headExpenses/list/${headID}`);
  }

  public addHeadExpense(headID: string, expense: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}headExpenses/${headID}`, expense);
  }

  public deleteHeadExpense(headID: string, expenseID: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}headExpenses/${headID}/${expenseID}`);
  }

  public updateHeadExpense(headID: string, expense: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}headExpenses/${headID}`, expense);
  }

  public getHeadChildCompanyRelations(headID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}HeadChildCompanyRelations/list/${headID}`);
  }

  public addChildCompanyRelation(headID: string, relation: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}HeadChildCompanyRelations/${headID}`, relation);
  }

  public deleteChildCompanyRelation(headID: string, relationID: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}HeadChildCompanyRelations/${headID}/${relationID}`);
  }

  public updateChildCompanyRelation(headID: string, relation: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}HeadChildCompanyRelations/${headID}`, relation);
  }

}
