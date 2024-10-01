import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[idsSuffix], [idsTrailingIcon]',
  standalone: true,
})
export class IdsSuffixDirective {
  @Input('idsTrailingIcon')
  public set idsTrailingIcon(value: '') {
    this.isTrailingIcon = true;
  }

  public isTrailingIcon = false;
}
