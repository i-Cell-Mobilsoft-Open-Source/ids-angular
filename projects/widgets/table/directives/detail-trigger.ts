import { IdsTableDetailTrigger } from '../types/table-detail-trigger';

import { Directive, input } from '@angular/core';

@Directive({
  selector: 'button[idsTableDetailTrigger]',
  host: {
    'type': 'button',
    '[attr.aria-expanded]': 'detail().expanded',
    '[attr.aria-disabled]': '!detail().hasDetailRow || null',
    '(click)': '_toggle()',
  },
})
export class IdsTableDetailTriggerDirective {
  public detail = input.required<IdsTableDetailTrigger>({ alias: 'idsTableDetailTrigger' });

  protected _toggle(): void {
    if (this.detail().hasDetailRow) {
      this.detail().toggle();
    }
  }
}
