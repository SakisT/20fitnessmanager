import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../authorization/auth.service';

@Directive({
  selector: '[appVisibleFor]',
  standalone: true
})
export class VisibleForDirective {
  @Input() set appVisibleFor(values: string[]){
    if(values && this.auth.IsInRole(values) && !this.hasView){
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }else if (values && this.auth.IsInRole(values) && this.hasView){
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
  private hasView = false;
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private readonly auth: AuthService) { }

}
