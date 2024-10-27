import { Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { HeadCompaniesRelationsComponent } from './components/head-companies-relations/head-companies-relations.component';
import { HeadCompaniesComponent } from './pages/head-companies/head-companies.component';
import { DashboardComponent } from './headCompanies/dashboard/dashboard.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'headCompanies', component: HeadCompaniesComponent,children:[
    {path:'dash', component: DashboardComponent},
    {path:'relations', component: HeadCompaniesRelationsComponent}
  ]}
];
