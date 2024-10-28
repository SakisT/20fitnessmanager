import { Component, OnInit } from '@angular/core';
import { HeadCompaniesService } from '../../../services/head-companies.service';


@Component({
  selector: 'app-head-companies-relations',
  standalone: true,
  imports: [],
  templateUrl: './head-companies-relations.component.html',
  styleUrl: './head-companies-relations.component.css'
})
export class HeadCompaniesRelationsComponent implements OnInit {

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
