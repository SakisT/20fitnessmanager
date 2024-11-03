import { Component, OnInit } from '@angular/core';
import { HeadCompaniesService } from '../../../services/head-companies.service';
import { AuthService } from '../../../authorization/auth.service';


@Component({
  selector: 'app-head-companies-relations',
  standalone: true,
  imports: [],
  templateUrl: './head-companies-relations.component.html',
  styleUrl: './head-companies-relations.component.css'
})
export class HeadCompaniesRelationsComponent implements OnInit {
  // private auth = inject(AuthService);
  constructor(private readonly service:HeadCompaniesService, private readonly auth:AuthService){}

  ngOnInit(): void {

    this.auth.currentUser$.subscribe({
      next: (user: any) => {
        if(user){
          this.service.getHeadCompanies().subscribe({
            next: (result: any) => {
              console.log(result);
            },
            error: (error: any) => {
              console.error(error);
            }

          });
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }

}
function inject(AuthService: any) {
  throw new Error('Function not implemented.');
}

