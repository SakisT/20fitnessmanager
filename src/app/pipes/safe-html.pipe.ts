import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
@Pipe({
  standalone: true,
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {  }
  transform(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
 }

}
