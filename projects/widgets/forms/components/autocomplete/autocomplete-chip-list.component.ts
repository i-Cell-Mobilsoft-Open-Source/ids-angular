import { IdsAutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { IdsOptionValue } from './types/option-value.type';

import { Component, input } from '@angular/core';
import { IdsChipAppearance, IdsChipAppearanceType, IdsChipComponent, IdsChipVariant, IdsChipVariantType } from '@i-cell/ids-angular/chip';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-autocomplete-chip-list',
  host: {
    class: 'ids-autocomplete-chip-list',
  },
  imports: [IdsChipComponent],
  template: `
    @for (option of autocompleteTrigger().selected; track $index) {
      <button
        idsChip
        type="button"
        [appearance]="appearance()"
        [size]="size()"
        [variant]="variant()"
        [disabled]="autocompleteTrigger().autocomplete().disabled()"
        [removable]="true"
        (removed)="autocompleteTrigger().removeOption(option)"
      >
        {{ option.viewValue }}
      </button>
    }
  `,
})
export class IdsAutocompleteChipListComponent {
  public autocompleteTrigger = input.required<IdsAutocompleteTriggerDirective>({ alias: 'for' });
  public options = input<IdsOptionValue[]>([]);
  public appearance = input<IdsChipAppearanceType>(IdsChipAppearance.OUTLINED);
  public size = input<IdsSizeType>(IdsSize.DENSE);
  public variant = input<IdsChipVariantType>(IdsChipVariant.SURFACE);
}
