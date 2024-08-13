import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[idsPrefix], [idsLeadingIcon]',
  standalone: true,
})
export class IdsPrefixDirective {
  @Input('idsLeadingIcon')
  public set idsLeadingIcon(value: '') {
    this.isLeadingIcon = true;
  }

  public isLeadingIcon = false;
}
