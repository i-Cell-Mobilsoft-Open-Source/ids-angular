import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  public transform(value: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}
