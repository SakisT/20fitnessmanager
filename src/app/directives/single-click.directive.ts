import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSingleClick]',
  standalone: true
})
export class SingleClickDirective {
  @Input() delay = 1500;
  @Input() clicksAllowed = 1;
  clicksCount = 1;
  defaultCursor='default';

  constructor(private elementRef: ElementRef) {
    this.defaultCursor=elementRef.nativeElement.style.cursor;
   }
  @HostListener('click', ['$event'])
  clickEvent() {
    this.clicksCount += 1;
    if (this.clicksCount >= this.clicksAllowed) {
      this.elementRef.nativeElement.style.cursor='not-allowed';
      this.elementRef.nativeElement.setAttribute('disabled', 'true');
      setTimeout(() => {
        this.elementRef?.nativeElement?.removeAttribute('disabled');
        this.elementRef.nativeElement.style.cursor=this.defaultCursor;
        this.clicksCount = 0;
      }, this.delay);
    }
  }
}
