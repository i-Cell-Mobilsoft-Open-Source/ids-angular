import { IdsAutocompleteTriggerDirective } from './autocomplete-trigger.directive';

import { booleanAttribute, Component, input } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import {
  IdsIconButtonAppearance,
  IdsIconButtonAppearanceType,
  IdsIconButtonComponent,
  IdsIconButtonVariant,
  IdsIconButtonVariantType,
} from '@i-cell/ids-angular/icon-button';
import { IdsSpinnerComponent, IdsSpinnerVariant, IdsSpinnerVariantType } from '@i-cell/ids-angular/spinner';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';

@Component({
  selector: 'ids-autocomplete-controls',
  host: {
    class: 'ids-autocomplete-controls',
  },
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsSpinnerComponent,
    IdsTooltipDirective,
  ],
  template: `
    @if (autocompleteTrigger().selected.length > 0) {
      <button
        type="button"
        idsIconButton
        [appearance]="appearance()"
        [variant]="variant()"
        [size]="size()"
        [disabled]="disabled()"
        [ariaLabel]="ariaLabelClear()"
        [idsTooltip]="ariaLabelClear()"
        [idsTooltipDisabled]="!ariaLabelClear()"
        [idsTooltipIgnoreClipped]="true"
        (click)="autocompleteTrigger().clear()"
      >
        <ids-icon alt="" aria-hidden="true" fontIcon="close" />
      </button>
    }
    @if (isLoading()) {
      <ids-spinner sizeCollection="small" [size]="size()" [variant]="spinnerVariant()" [isTrack]="true" [aria-label]="ariaLabelLoading()" />
    } @else {
      <button
        type="button"
        idsIconButton
        [appearance]="appearance()"
        [variant]="variant()"
        [size]="size()"
        [disabled]="disabled()"
        [ariaLabel]="ariaLabelToggle()"
        [idsTooltip]="ariaLabelToggle()"
        [idsTooltipDisabled]="!ariaLabelToggle()"
        [idsTooltipIgnoreClipped]="true"
        (click)="autocompleteTrigger().toggle()"
      >
        <ids-icon alt="" aria-hidden="true" [fontIcon]="autocompleteTrigger().autocomplete().panelOpen() ? 'chevron-up' : 'chevron-down'" />
      </button>
    }
  `,
})
export class IdsAutocompleteControlsComponent {
  public autocompleteTrigger = input.required<IdsAutocompleteTriggerDirective>({ alias: 'for' });
  public isLoading = input<boolean, boolean>(false, { transform: booleanAttribute });
  public disabled = input<boolean, boolean>(false, { transform: booleanAttribute });
  public appearance = input<IdsIconButtonAppearanceType>(IdsIconButtonAppearance.STANDARD);
  public size = input<IdsSizeType>(IdsSize.COMPACT);
  public variant = input<IdsIconButtonVariantType>(IdsIconButtonVariant.SURFACE);
  public spinnerVariant = input<IdsSpinnerVariantType>(IdsSpinnerVariant.SURFACE);
  public ariaLabelClear = input<string>('');
  public ariaLabelToggle = input<string>('');
  public ariaLabelLoading = input<string>('');
}
