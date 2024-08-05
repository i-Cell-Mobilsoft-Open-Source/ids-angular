import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[idsPrefix], [idsIconPrefix], [idsTextPrefix]',
  standalone: true,
})
export class IdsPrefixDirective {
  @Input('matTextPrefix')
  public set isTextSelector(value: '') {
    this.isText = true;
  }

  public isText = false;
}
