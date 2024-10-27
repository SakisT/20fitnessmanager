import { Component } from '@angular/core';
import { HeadCompaniesRelationsComponent } from "../../components/head-companies-relations/head-companies-relations.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-head-companies',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './head-companies.component.html',
  styleUrl: './head-companies.component.css'
})
export class HeadCompaniesComponent {

}
