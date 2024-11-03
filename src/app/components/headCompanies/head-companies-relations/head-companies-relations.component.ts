import { Component, OnInit } from '@angular/core';
import { HeadCompaniesService } from '../../../services/head-companies.service';
import { AuthService } from '../../../authorization/auth.service';
import { CommonModule } from '@angular/common';
import { EditService, GridModule, PageService, SearchService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { map, Subject } from 'rxjs';
import { IUser } from '../../../models/user';
import { Guid } from 'guid-typescript';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-head-companies-relations',
  standalone: true,
  imports: [CommonModule, GridModule, ToolbarModule, DropDownListModule],
  templateUrl: './head-companies-relations.component.html',
  styleUrl: './head-companies-relations.component.css',
  providers: [SearchService, ToolbarService, EditService, PageService]
})
export class HeadCompaniesRelationsComponent implements OnInit {
  relationsSubject$ = new Subject();
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
  relation: any;
  toolBarActions:string[]=[];
  constructor(private readonly service: HeadCompaniesService, private readonly auth: AuthService) { }

  companyFromID = (field: string, data: any, column: any) => {
    let result = this.companiesDic[data.companyID];
    return `${result}`;
  };


  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (result: IUser) => {
        this.user = result;
        if (this.user) {
          if(this.auth.IsInRole([Role.Administrator])){
            this.toolBarActions=['Add','Edit','Delete','Update','Cancel','Search'];
          }else{
            this.toolBarActions=['Edit','Delete','Update','Cancel','Search'];
          }
          const hcid = this.user.claims.filter((c: any) => c.type === 'HCOWNER')[0]?.value;
          this.loadHeadCompany(hcid).then((headCompany: any) => {
            this.loadHeadRelations(headCompany.headCompanyID);
          });
        }

      },
      error: (error: any) => {
        console.log(error);
      }
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
  loadHeadRelations(headCompanyId: string): void {
    this.service.getHeadChildCompanyRelations(headCompanyId).pipe(
      map((relations: any) => {
        return relations.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      })
    ).subscribe({
      next: (relations: any) => {
        this.relationsSubject$.next(relations);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  addRelation(relationData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.addChildCompanyRelation(relationData).subscribe({
        next: (result: any) => {
          resolve(result);
        },
        error: (error: any) => {
          reject(error);
        }
      });

    });
  }

  updateRelation(relationData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.updateChildCompanyRelation(relationData.headChildCompanyRelationID, relationData).subscribe({
        next: (result: any) => {
          resolve(result);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  deleterelation(relation: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.deleteChildCompanyRelation(this.currentHeadCompany.headCompanyID, relation.headCompanyID).subscribe({
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
            args.data['companyID'] = this.relation['companyID'];
            this.addRelation(args.data);
            break;
          case 'edit':
            args.data['companyID'] = this.relation['companyID'];
            this.updateRelation(args.data);
            break
        }

        break;
      case 'delete':
        this.deleterelation(args.data[0]).catch((error: any) => {
          args.cancel = true;
          this.loadHeadRelations(this.currentHeadCompany.headCompanyID);
        });
        break;
      case 'add':
        args.data.headChildCompanyRelationID = Guid.create().toString();
        args.data.headCompanyID = this.currentHeadCompany.headCompanyID;
        args.data.commission = 14;
        this.relation = Object.assign({}, args.rowData);
        break;
      case 'beginEdit':
      case 'edit':
        this.relation = Object.assign({}, args.rowData);
        break;
      case 'cancel':
        break;
    }
  }

  actionComplete(args: any) {

    switch (args.requestType) {
      case 'save':
        // if(args.action === 'edit'){
        //   args.data.companyID=this.relation.companyID;
        //   this.updateRelation(args.data);
        // }

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

