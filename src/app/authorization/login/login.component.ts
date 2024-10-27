import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Role } from '../../models/role';
import { IUser } from '../../models/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextBoxModule, CheckBoxModule, ButtonModule,RouterModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private auth = inject(AuthService);
  loginForm: FormGroup;

  constructor(@Inject(FormBuilder) private readonly fb: FormBuilder, private readonly router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  ngOnInit(): void {
    // get storedCredentials from local storage IF there are any

    this.auth.currentUser$.subscribe({
      next: (result: IUser) => {
        if (result) {
          if (this.auth.IsInRole(Role.Administrator.toString())) {
            this.router.navigate(['/home']);

          }

          // navigate to the home page
        }
      }
    });
    const storedCredentials = this.userFromStorage();
    this.loginForm.patchValue({
      userName: storedCredentials.userName,
      password: storedCredentials.password,
      rememberMe: (storedCredentials.userName.length > 0)
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    if (this.loginForm.value.rememberMe) {
      localStorage.setItem('currentUser', JSON.stringify(this.loginForm.value));
    }
    await this.auth.login(this.loginForm.value.userName, this.loginForm.value.password);
    // this.auth.login(this.loginForm.value.userName, this.loginForm.value.password).then((user) => {
    //   debugger;
    // });

  }

  userFromStorage(): any {
    let user = localStorage.getItem('currentUser') || `{"userName":"","password":""}`;
    return JSON.parse(user);
  }

}
