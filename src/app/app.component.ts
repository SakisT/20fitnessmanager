import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { AppService } from './app.service';
import { LoginComponent } from './authorization/login/login.component';
import { MenuModule, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { AuthService } from './authorization/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TextBoxModule, DialogModule, LoginComponent, MenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('loginDialog', { static: true, read: DialogComponent })
  loginDialog!: DialogComponent;

  menuItems: MenuItemModel[] = [];

  title = 'ng-gym-sf';

  constructor(private readonly service: AppService, private readonly auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (user) => {
        //debugger;
      }
    });
    this.menuItems = [
      {
        text: 'Home',
        iconCss: 'e-icons e-home',
        url: '/'
      },
      {
        text: 'About',
        iconCss: 'e-icons e-info'
      },
      {
        text: 'Contact',
        iconCss: 'e-icons e-contact'
      },
      {
        text: 'Login',
        iconCss: 'e-icons e-login', url: '/login',
      }
    ];
  }

}
