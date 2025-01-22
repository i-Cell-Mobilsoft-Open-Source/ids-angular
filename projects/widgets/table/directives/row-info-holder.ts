import { Directive, input } from '@angular/core';

@Directive({
  selector: '[rowInfo]',
  standalone: true,
})
export class RowInfoHolderDirective<D> {
  public rowInfo = input.required<{ rowData: D, index: number }>();
}
