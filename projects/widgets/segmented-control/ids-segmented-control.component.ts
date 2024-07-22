import { IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS, IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY } from './ids-segmented-control-default-options';
import { SegmentedControlAppearanceType } from './types/ids-semneted-control-appearance';
import { SegmentedControlVariantType } from './types/ids-semneted-control-variant';

import { Component, computed, HostBinding, inject, Injector, input } from '@angular/core';
import { createHostClassList, SizeType } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

const defaultOptions = IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY();

@Component({
  selector: 'ids-ids-segmented-control',
  standalone: true,
  imports: [],
  templateUrl: './ids-segmented-control.component.html',
  styleUrl: './ids-segmented-control.component.scss',
})
export class IdsSegmentedControlComponent {
  private readonly _componentClass = 'ids-segmented-control';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS, null, { optional: true }),
  };

  public id = input<string>(this._uniqueId);
  public size = input<SizeType>(this._defaultOptions.size);
  public variant = input<SegmentedControlVariantType>(this._defaultOptions.variant);
  public pageButtonAppearance = input<SegmentedControlAppearanceType>(this._defaultOptions.appearance);
  public disabled = input<boolean>(false);
  public multiSelect = input<boolean>(false);

  private _hostClasses = computed(() => createHostClassList(
    this._componentClass,
    [
      this.size(),
      this.variant(),
    ],
  ));

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
