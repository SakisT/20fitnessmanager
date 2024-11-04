import { Component } from '@angular/core';
import { EditService, GridModule, PageService, SearchService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { HeadCompaniesService } from '../../../services/head-companies.service';
import { AuthService } from '../../../authorization/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { map, Observable, Subject } from 'rxjs';
import { IUser } from '../../../models/user';
import { Role } from '../../../models/role';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Guid } from 'guid-typescript';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

@Component({
  selector: 'app-records-list',
  standalone: true,
  imports: [
    CommonModule,
    GridModule,
    ToolbarModule,
    DropDownListModule,
    ReactiveFormsModule,
    ButtonModule,
    DatePickerModule,
    NumericTextBoxModule,
    TextBoxModule,
    SafeHtmlPipe
  ],
  templateUrl: './records-list.component.html',
  styleUrl: './records-list.component.css',
  providers: [
    SearchService,
    ToolbarService,
    EditService,
    PageService,
    DatePipe]
})
export class RecordsListComponent {
  currentHeadCompany: any;
  user: IUser | undefined;

  companies = [
    { value: 'fa22b1b9-1490-4670-be28-fcfd48211ed2', text: 'Αχαρνές' },
    { value: '3fbc9448-72da-49ec-ba6f-f2e7f2c5470f', text: 'Βούλγαρη' },
    { value: 'eb9fde0f-690a-4aca-84d4-33f83a5a340f', text: 'Γλυφάδα' },
    { value: '596c07ae-f165-4966-94ff-5e42e8a4f127', text: 'Μαρούσι' },
    { value: '8b994b97-c726-4de8-93b1-4a812e2ecb90', text: 'Ν. Σμύρνη' },
    { value: '3e664990-8d4e-4e6d-a39b-2c06e5c89e17', text: 'Πατήσια' },
    { value: 'fe8dd0f7-9c6e-4392-8e7f-d5a0fc13ce7a', text: 'Πειραιάς' },
    { value: '39d049d8-ff03-4658-9da0-6eb0cff7e2ef', text: 'Περιστέρι' },
    { value: 'f43a1135-e4c6-48e4-80b1-9c77d351e88a', text: 'Τρίκαλα' },
    { value: '2610df1b-41a7-4d37-aa9f-a35b4a3498f8', text: 'Χαλάνδρι' },

  ];

  companiesDic: { [key: string]: string } = {
    'fa22b1b9-1490-4670-be28-fcfd48211ed2': 'Αχαρνές',
    '3fbc9448-72da-49ec-ba6f-f2e7f2c5470f': 'Βούλγαρη',
    'eb9fde0f-690a-4aca-84d4-33f83a5a340f': 'Γλυφάδα',
    '596c07ae-f165-4966-94ff-5e42e8a4f127': 'Μαρούσι',
    '8b994b97-c726-4de8-93b1-4a812e2ecb90': 'Ν. Σμύρνη',
    '3e664990-8d4e-4e6d-a39b-2c06e5c89e17': 'Πατήσια',
    'fe8dd0f7-9c6e-4392-8e7f-d5a0fc13ce7a': 'Πειραιάς',
    '39d049d8-ff03-4658-9da0-6eb0cff7e2ef': 'Περιστέρι',
    'f43a1135-e4c6-48e4-80b1-9c77d351e88a': 'Τρίκαλα',
    '2610df1b-41a7-4d37-aa9f-a35b4a3498f8': 'Χαλάνδρι'
  };

  expenseTypes: any[] = [];
  relations: any[] = [];
  expenses: any[] = [];
  incomes: any[] = [];

  recordType: RecordType = RecordType.expense;

  expenseForm!: FormGroup;
  incomeForm!: FormGroup;

  incomeState = 'add';
  expenseState = 'add';

  toolBarActions: string[] = [];

  analysis = '';
  constructor(private readonly fb: FormBuilder, private readonly service: HeadCompaniesService, private readonly auth: AuthService, private readonly dp: DatePipe) {

    this.incomeForm = this.fb.group({
      headIncomeID: [null, Validators.required],
      headCompanyID: [null, Validators.required],
      companyID: [null],
      amount: [0, Validators.required],
      incomeDate: [new Date(), Validators.required],
      userID: [null],
      remarks: [''],
      timestamp: [new Date()]
    });

    this.expenseForm = this.fb.group({
      headExpenseID: [null, Validators.required],
      headExpenseTypeID: [null, Validators.required],
      amount: [0, Validators.required],
      expenseDate: [new Date(), Validators.required],
      userID: [null],
      remarks: [''],
      timestamp: [new Date()]
    });
  }


  suggestIncome(): void {
    if (this.incomeState === 'add' && this.incomeForm.get('companyID')?.value && this.incomeForm.get('incomeDate')?.value) {
      let dateForString = new Date(this.incomeForm.get('incomeDate')?.value);
      const dateString = this.dp.transform(dateForString, 'yyyy-MM-dd');
      this.service.getSuggestIncome(this.currentHeadCompany.headCompanyID, this.incomeForm.get('companyID')?.value, dateString).subscribe({
        next: (result: any) => {
          this.analysis = `<div class="flex flex-row justify-start -mx-1">` +

            `</div`;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }
  ngOnInit(): void {
    this.incomeForm.get('companyID')?.valueChanges.subscribe({
      next: (value: any) => {
        // Έχει νόημα μόνο αν είναι σε κατάσταση εισαγωγής;
        if (value && this.incomeState === 'add' && this.incomeForm.get('incomeDate')?.value) {
          this.suggestIncome();
        }

      }
    });
    this.incomeForm.get('incomeDate')?.valueChanges.subscribe({
      next: (value: any) => {
        // Έχει νόημα μόνο αν είναι σε κατάσταση εισαγωγής;
        if (value && this.incomeState === 'add' && this.incomeForm.get('companyID')?.value) {
          this.suggestIncome();
        }

      }
    })
    this.auth.currentUser$.subscribe({
      next: (result: IUser) => {
        this.user = result;
        if (this.user) {
          if (this.auth.IsInRole([Role.Administrator])) {
            this.toolBarActions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
          } else {
            this.toolBarActions = ['Edit', 'Delete', 'Update', 'Cancel', 'Search'];
          }
          const hcid = this.user.claims.filter((c: any) => c.type === 'HCOWNER')[0]?.value;
          this.loadHeadCompany(hcid).then((headCompany: any) => {
            this.loadExpenceTypes(headCompany?.headCompanyID).then((expenseTypes: any) => {
              this.expenseTypes = expenseTypes;
            });
            this.loadRelations(headCompany?.headCompanyID).then((relations: any) => {
              this.relations = relations;
            });
            this.loadExpences(headCompany?.headCompanyID).then((expenses: any) => {
              this.expenses = expenses;
            });
            this.loadIncomes(headCompany?.headCompanyID).then((incomes: any) => {
              this.incomes = incomes;
            });
          });
        }

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }


  loadExpenceTypes(headCompanyID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getHeadExpenseTypes(headCompanyID).subscribe({
        next: (result: any) => {
          this.expenseTypes = result;
          resolve(result);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  loadRelations(headCompanyID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getHeadRelations(headCompanyID).pipe(
        map((relations: any) => {
          return relations.map((relation: any) => {
            relation.companyName = this.companiesDic[relation.companyID];
            return relation;
          });
        })
      ).subscribe({
        next: (result: any) => {

          resolve(result);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  loadExpences(headCompanyID: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.service.getHeadExpenses(headCompanyID).subscribe({
        next: (expenses: any) => {
          resolve(expenses);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });

  }

  loadIncomes(headCompanyID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getHeadIncomes(headCompanyID).subscribe({
        next: (incomes: any) => {
          resolve(incomes);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
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

  initNewExpense(): void {
    this.expenseState = 'add';
    this.incomeForm.reset();
    this.expenseForm.reset();
    this.expenseForm.patchValue({
      headExpenseID: Guid.create().toString(),
      headExpenseTypeID: null,
      amount: 0,
      expenseDate: new Date(),
      userID: null,
      remarks: '',
      timestamp: new Date()
    });
  }

  initNewIncome(): void {
    this.incomeState = 'add';
    this.expenseForm.reset();
    this.incomeForm.reset();
    this.incomeForm.patchValue({
      headIncomeID: Guid.create().toString(),
      headCompanyID: this.currentHeadCompany.headCompanyID,
      companyID: null,
      amount: 0,
      incomeDate: new Date(),
      userID: null,
      remarks: '',
      timestamp: new Date()
    });
  }

  saveIncome(): void {

  }

  cancelIncome(): void {

  }


  editExpense(expense: any): void {
    this.expenseState = 'edit';
    this.expenseForm.patchValue(expense);
    this.expenseForm.markAsPristine();
  }

  editIncome(income: any): void {
    this.incomeState = 'edit';
    this.incomeForm.patchValue(income);
    this.incomeForm.markAsPristine();
  }

}

export enum RecordType {
  expense = 0,
  income = 1,
}
