import { Component, OnInit } from '@angular/core';
import { HeadCompaniesService } from '../../services/head-companies.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private readonly service:HeadCompaniesService){}

  ngOnInit(): void {
    this.service.getHeadCompanies().subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (error: any) => {
        console.error(error);
      }

    });
  }
}
