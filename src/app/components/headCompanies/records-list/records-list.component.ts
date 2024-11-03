import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { HeadCompaniesService } from '../../../services/head-companies.service';
import { AuthService } from '../../../authorization/auth.service';

@Component({
  selector: 'app-records-list',
  standalone: true,
  imports: [ TextBoxModule,GridModule],
  templateUrl: './records-list.component.html',
  styleUrl: './records-list.component.css'
})
export class RecordsListComponent {
  constructor(private readonly service: HeadCompaniesService, private readonly auth:AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (user) => {
        if (user) {
          this.service.getHeadCompanies().subscribe({
            next: (result: any) => {
              console.log(result);

            },
            error: (error: any) => {
              console.log(error);
            }

          });
        }
      }
    });

  }
}
