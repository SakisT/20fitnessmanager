import { Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { HeadCompaniesComponent } from './pages/head-companies/head-companies.component';
import { DashboardComponent } from './components/headCompanies/dashboard/dashboard.component';
import { HeadCompaniesRelationsComponent } from './components/headCompanies/head-companies-relations/head-companies-relations.component';
import { AuthGuard } from './auth.guard';
import { LogOutComponent } from './authorization/log-out/log-out.component';


export const routes: Routes = [
  {path: '', redirectTo: 'headCompanies', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path:'logout',component: LogOutComponent},
  {path: 'headCompanies', component: HeadCompaniesComponent,children:[
    {path:'dash', component: DashboardComponent},
    {path:'relations', component: HeadCompaniesRelationsComponent}
  ], canActivate: [AuthGuard]}
];
