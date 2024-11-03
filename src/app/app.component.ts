import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, Inject, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { AppService } from './app.service';
import { LoginComponent } from './authorization/login/login.component';
import { MenuModule, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { AuthService } from './authorization/auth.service';
import { IUser } from './models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TextBoxModule, DialogModule, LoginComponent, MenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  private auth = inject(AuthService);
  @ViewChild('loginDialog', { static: true, read: DialogComponent })
  loginDialog!: DialogComponent;

  menuItems: MenuItemModel[] = [];

  title = 'ng-gym-sf';

  constructor(private readonly service: AppService, private readonly router: Router,) {

  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.initializeMenu();
  }

  private initializeMenu(): void {
    this.auth.currentUser$.subscribe({
      next: (user: IUser) => {
        console.log('User updated in app.component:', user); // Debug statement
        this.updateMenuItems(user);
      }
    });
  }

  private updateMenuItems(user: IUser | null): void {
    if (user) {
      this.menuItems = [
        {
          text: 'Home',
          iconCss: 'e-icons e-home',
          url: '/headCompanies/dash'
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
          text: 'Logout',
          id: 'logout',
          iconCss: 'e-icons e-logout',
        }
      ];
    } else {
      this.menuItems = [];
    }
  }



  async onClick(args: any) {
    if (args.item.id === 'logout') {
      await this.logOut();
    }
    if (args.item.path) {
      this.router.navigate([args.item.path]);
    }
  }

  async logOut() {
    try {
      await this.auth.logout(this.auth.token);
    }
    finally {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
  }
}

export interface IMenuItemModel extends MenuItemModel {
  path?: string;
  icon?: string;
  items?: IMenuItemModel[];
  visible: boolean;
}



