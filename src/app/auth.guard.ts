import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './authorization/auth.service';
import { Role } from './models/role';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.IsInRole([Role.Administrator, Role.HeadCompanyOwner]);
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
