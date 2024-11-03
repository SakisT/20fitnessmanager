import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInRole]',
  standalone: true
})
export class InRoleDirective {
  private hasView = false;
  private elseTemplateRef: TemplateRef<any> | null = null;
  private conditionArray: string[] = [];
  private searchString: string = '';

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input() set appCustomIfContains(condition: [string[], string]) {
    this.conditionArray = condition[0];
    this.searchString = condition[1];
    this.updateView();
  }

  @Input() set appCustomIfContainsElse(templateRef: TemplateRef<any> | null) {
    this.elseTemplateRef = templateRef;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    if (this.conditionArray.includes(this.searchString)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.elseTemplateRef) {
      this.viewContainer.createEmbeddedView(this.elseTemplateRef);
      this.hasView = false;
    }
  }
}

