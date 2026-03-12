import { IdsHintMessageComponent } from '../message/hint-message/hint-message.component';
import { IdsMessageVariant, IdsMessageVariantType } from '../message/types/message-variant.type';

import { Component, input } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-autocomplete-hint',
  host: {
    class: 'ids-autocomplete-hint',
  },
  imports: [IdsHintMessageComponent],
  template: `
    <div class="ids-autocomplete-hint__wrapper">
      <ids-hint-message [size]="size()" [variant]="variant()">
        <ng-content />
      </ids-hint-message>
    </div>
  `,
})
export class IdsAutocompleteHintComponent {
  public variant = input<IdsMessageVariantType>(IdsMessageVariant.SURFACE);
  public size = input<IdsSizeType>(IdsSize.COMFORTABLE);
}
