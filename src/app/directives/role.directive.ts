import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from '../authorization/auth.service';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {

  height: string;
  width: string;
  template: ElementRef;
  allowedByRole=false;
  _forceDeny=false;

  @Input() set forceDeny(value: boolean) {
    this._forceDeny = value;
    if ( !this._forceDeny  && this.allowedByRole) {
      this.template.nativeElement.style.visibility = 'visible';
      this.template.nativeElement.style.width = this.width;
      this.template.nativeElement.style.height = this.height;
    } else {
      this.template.nativeElement.style.visibility = 'hidden';
      this.template.nativeElement.style.width = '0px';
      this.template.nativeElement.style.height = '0px';
    }
  }

  @Input() set appRole(value: string[]) {
    this.allowedByRole = value && this.auth.IsInRole(value);
    if (this.allowedByRole && !this._forceDeny) {
      this.template.nativeElement.style.visibility = 'visible';
      this.template.nativeElement.style.width = this.width;
      this.template.nativeElement.style.height = this.height;
    } else {
      this.template.nativeElement.style.visibility = 'hidden';
      this.template.nativeElement.style.width = '0px';
      this.template.nativeElement.style.height = '0px';
    }
  }


  constructor(private ref: ElementRef<HTMLElement>, private readonly auth: AuthService) {
    this.template = ref;
    this.width = ref.nativeElement.style.width;
    this.height = ref.nativeElement.style.height;
  }


}
