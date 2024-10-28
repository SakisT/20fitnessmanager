import { Component, OnInit, ViewChild } from '@angular/core';
import { HeadCompaniesService } from '../../../services/head-companies.service';
import { TabComponent, TabModule } from '@syncfusion/ej2-angular-navigations';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { RecordsListComponent } from "../records-list/records-list.component";
import { HeadExpenseTypesComponent } from "../head-expense-types/head-expense-types.component";
import { HeadCompaniesRelationsComponent } from "../head-companies-relations/head-companies-relations.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabModule, TextBoxModule, GridModule, RecordsListComponent, HeadExpenseTypesComponent, HeadCompaniesRelationsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {


  constructor(private readonly service: HeadCompaniesService) { }


}
