import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[idsSuffix], [idsIconSuffix], [idsTextSuffix]',
  standalone: true,
})
export class IdsSuffixDirective {
  @Input('matTextSuffix')
  public set isTextSelector(value: '') {
    this.isText = true;
  }

  public isText = false;
}
