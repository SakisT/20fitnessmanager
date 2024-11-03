import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAppButton]',
  standalone: true
})
export class AppButtonDirective {
  @Input() appButton: string = 'green';
  @Input('buttonWidth') buttonWidth:string='w-auto';

  @HostBinding('class') get classes(): string {
    return `inline-flex ${this.buttonWidth} truncate cursor-pointer flex justify-center text-center rounded border focus:outline-none focus:ring transition text-${this.appButton}-600 border-${this.appButton}-600 hover:text-white hover:bg-${this.appButton}-600 active:bg-${this.appButton}-700 focus:ring-${this.appButton}-300`;
  }
  constructor(el: ElementRef, private readonly renderer: Renderer2) {

  }

}
