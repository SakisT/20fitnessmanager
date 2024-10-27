import { Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: MainPageComponent},
];
