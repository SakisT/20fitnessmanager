import { Component, OnInit } from '@angular/core';
import { HeadCompaniesService } from '../../../services/head-companies.service';
import { AuthService } from '../../../authorization/auth.service';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../models/user';
import { EditService, GridModule, SearchService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-head-expense-types',
  standalone: true,
  imports: [CommonModule, GridModule, ToolbarModule],
  templateUrl: './head-expense-types.component.html',
  styleUrl: './head-expense-types.component.css',
  providers: [SearchService, ToolbarService, EditService]
})
export class HeadExpenseTypesComponent implements OnInit {
  expenseTypesSubject$ = new Subject();
  currentHeadCompany: any;
  user: IUser | undefined;
  constructor(private readonly auth: AuthService, private readonly service: HeadCompaniesService) { }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (result: IUser) => {
        this.user = result;
        if (this.user) {
          const hcid = this.user.claims.filter((c: any) => c.type === 'HCOWNER')[0]?.value;
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

  addExpenseType(expenseType: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.addHeadExpenseType(expenseType).subscribe({
        next: (result: any) => {
          resolve(result);
        },
        error: (error: any) => {
          reject(error);
        }
      });

    });
  }

  updateExpenseType(expenseType: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.updateHeadExpenseType(expenseType.headExpenseTypeID, expenseType).subscribe({
        next: (result: any) => {
          resolve(result);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  deleteExpenseType(expenseType: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.deleteHeadExpenseType(expenseType.headExpenseTypeID).subscribe({
        next: (result: any) => {
          resolve(result);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }


  actionBegin(args: any) {

    switch (args.requestType) {
      case 'save':
        switch (args.action) {
          case 'add':
            this.addExpenseType(args.data);
            break;
          case 'edit':
            this.updateExpenseType(args.data);
            break
        }

        break;
      case 'delete':
        this.deleteExpenseType(args.data[0]).catch((error: any) => {
          args.cancel = true;
          this.loadExpenseTypes(this.currentHeadCompany.headCompanyID);
        });
        break;
      case 'add':
        //this.addExpenseType(args.data);
        args.data.headCompanyID = this.currentHeadCompany.headCompanyID;
        args.data.headExpenseTypeID = Guid.create().toString();
        args.data.isActive = true;
        break;
      case 'edit':
        //this.editExpenseType(args.data);
        break;
      case 'cancel':
        break;
    }
  }

  actionComplete(args: any) {

    switch (args.requestType) {
      case 'save':
        //this.saveExpenseType(args.data);
        break;
      case 'delete':
        //this.deleteExpenseType(args.data);
        break;
      case 'add':

        //this.addExpenseType(args.data);
        break;
      case 'edit':
        //this.editExpenseType(args.data);
        break;
      case 'cancel':
        break;

    }
  }
}
