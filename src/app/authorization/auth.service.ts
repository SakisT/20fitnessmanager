import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Role } from '../models/role';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;

  _token: string | null = sessionStorage.getItem('token');

  _userID: string | null = sessionStorage.getItem('userID');

  public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.getUser());

  constructor(private readonly http: HttpClient) { }

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
    if (!value) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userID');
    } else {
      sessionStorage.setItem('token', value);
      const jetToken = jwtDecode<jwt>(value);
      this.userID = jetToken.userId;

    }

  }

  get userID(): string | null {
    return this._userID;
  }

  set userID(value: string) {
    this._userID = value;
    sessionStorage.setItem('userID', value);
  }

  get currentUser$(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  public logOut(): void {
    sessionStorage.clear();
    this.currentUser = null;
    this.currentUserSubject.next(null);
  }

  public IsInRole(roles: string[] | Role[]): boolean {
    if(!this.currentUser) {
      this.currentUser = this.getUser();
    }
    return roles.some(role=>this.currentUser?.roles?.includes(role)) ;
  }

  public HasClaim(claimType: string, claimValue: string): boolean {
    return this.currentUser.claims.some((c: any) => c.type === claimType && c.value === claimValue);
  }

  getUser(): any {
    var storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiURL}auth/login`, { email: username, password: password }).pipe(
        switchMap((user) => {
          this.token = user.token;
          return this.http.get<any>(`${environment.apiURL}auth/getUser/${this.userID}`);
        })
      ).subscribe({
        next: (user) => {
          console.log('User logged in:', user); // Debug statement
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser = user;

          // Adding a slight delay to ensure all subscribers are ready
          setTimeout(() => {
            this.currentUserSubject.next(user);
          }, 10);

          resolve(user);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }



  async logout(accessToken: string | null): Promise<boolean> {
    sessionStorage.clear();
    const credentials = JSON.stringify({ accessToken: accessToken });
    return await new Promise<boolean>((resolve, reject) => {
      this.http.post<boolean>(`${environment.apiURL}auth/logout`, credentials, {

      }).subscribe({
        next: (res: boolean) => resolve(res),
        error: (ex) => {
          reject(ex);
        }
      });
    });
  }

  tokenExpired(): boolean {
    if (!this.token) {
      return true;
    }
    const decodedToken = jwtDecode(this.token);
    if (!decodedToken) {
      return true;
    }

    if (!decodedToken.exp) {
      return true;
    }
    return ((decodedToken.exp * 1000) < Date.now());
  }

  loadRolesAndClaims(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.apiURL}auth/getUser/${this.userID}`).subscribe({
        next: (user) => {
          resolve(user);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }
}

interface jwt extends JwtPayload {
  userId: string;
}

