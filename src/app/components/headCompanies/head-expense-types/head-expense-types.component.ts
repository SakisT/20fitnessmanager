import { Component, OnInit } from '@angular/core';
import { HeadCompaniesService } from '../../../services/head-companies.service';
import { AuthService } from '../../../authorization/auth.service';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../models/user';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-head-expense-types',
  standalone: true,
  imports: [CommonModule,GridModule],
  templateUrl: './head-expense-types.component.html',
  styleUrl: './head-expense-types.component.css'
})
export class HeadExpenseTypesComponent implements OnInit {
  expenseTypesSubject$ = new Subject();
  currentHeadCompany: any;
  constructor(private readonly auth: AuthService, private readonly service: HeadCompaniesService) { }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (user: IUser) => {
        if (user) {
          const hcid = user.claims.filter((c: any) => c.type === 'HCOWNER')[0]?.value;
          this.loadHeadCompany(hcid).then((headCompany: any) => {
            this.loadExpenseTypes(headCompany.headCompanyID);
          });
        }

      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }

  get expenseTypes$(): Observable<any> {
    return this.expenseTypesSubject$;
  }

  loadHeadCompany(headID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getHeadCompany(headID).subscribe({
        next: (headCompany: any) => {
          this.currentHeadCompany = headCompany;
          resolve(headCompany);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  loadExpenseTypes(headCompanyId: string): void {
    this.service.getHeadExpenseTypes(headCompanyId).subscribe({
      next: (expenseTypes: any) => {
        this.expenseTypesSubject$.next(expenseTypes);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
