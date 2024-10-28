import { Component, OnInit } from '@angular/core';
import { HeadCompaniesService } from '../../../services/head-companies.service';

@Component({
  selector: 'app-head-expense-types',
  standalone: true,
  imports: [],
  templateUrl: './head-expense-types.component.html',
  styleUrl: './head-expense-types.component.css'
})
export class HeadExpenseTypesComponent implements OnInit {
  constructor(private readonly service: HeadCompaniesService) { }

  ngOnInit(): void {
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
