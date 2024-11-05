import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',

})
export class HeadCompaniesService {

  constructor(private readonly http: HttpClient) { }

  public getHeadCompany(headCompanyID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headCompanies/${headCompanyID}`);
  }

  public getHeadCompanies(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headCompanies`);
  }

  public getHeadExpenseTypes(headID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headExpenseTypes/list/${headID}`);
  }

  public addHeadExpenseType(expenseType: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}headExpenseTypes`, expenseType);
  }

  public deleteHeadExpenseType(expenseTypeID: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}headExpenseTypes/${expenseTypeID}`);
  }

  public updateHeadExpenseType(headID: string, expenseType: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}headExpenseTypes/${headID}`, expenseType);
  }

  public getHeadExpenses(headID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headExpenses/list/${headID}`);
  }

  public addHeadExpense( expense: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}headExpenses`, expense);
  }

  public deleteHeadExpense(headID: string, expenseID: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}headExpenses/${headID}/${expenseID}`);
  }

  public updateHeadExpense(headID: string, expense: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}headExpenses/${headID}`, expense);
  }

  public getHeadRelations(headID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headChildCompanyRelations/list/${headID}`);
  }

  public getHeadChildCompanyRelations(headID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headChildCompanyRelations/list/${headID}`);
  }

  public addChildCompanyRelation(relation: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}headChildCompanyRelations`, relation);
  }

  public deleteChildCompanyRelation(headID: string, relationID: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}headChildCompanyRelations/${headID}/${relationID}`);
  }

  public updateChildCompanyRelation(headID: string, relation: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}headChildCompanyRelations/${headID}`, relation);
  }

  public getHeadIncomes(headID: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headIncomes/list/${headID}`);
  }

  public getSuggestIncome(headCompanyID: string, companyID: string, date: string | null): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}headIncomes/suggestIncome/${headCompanyID}/${companyID}/${date}`);
  }

  public saveHeadIncome(income: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}headIncomes`, income);
  }

  public updateHeadIncome(income: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}headIncomes/${income.headIncomeID}`, income);
  }

}
