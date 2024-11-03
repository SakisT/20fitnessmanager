import { Directive, ElementRef, OnInit } from '@angular/core';
import { Role } from '../models/role';
import { AuthService } from '../authorization/auth.service';

@Directive({
  selector: '[appAdmin]',
  exportAs:'adminDirective'
})
export class AdminDirective implements OnInit {
  IsAdministrator=false;
  constructor(private readonly auth: AuthService, private inputElement: ElementRef) {

    if (!this.auth.IsInRole([Role.Administrator])) {
      this.inputElement.nativeElement.style.display = 'none';
    }
  }
  ngOnInit(): void {
    this.IsAdministrator=( this.auth.IsInRole([Role.Administrator]));
  }
}
