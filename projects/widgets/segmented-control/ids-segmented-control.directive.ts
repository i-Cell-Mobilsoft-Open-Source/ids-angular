import { IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS, IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY } from './ids-segmented-control-default-options';
import { IdsSegmentedControlItemComponent } from './segmented-control-item/ids-segmented-control-item.component';
import { SegmentedControlAppearanceType } from './types/ids-semneted-control-appearance';
import { SegmentedControlVariantType } from './types/ids-semneted-control-variant';

import { AfterContentInit, computed, contentChildren, Directive, HostBinding, inject, Injector, input, isDevMode } from '@angular/core';
import { createHostClassList, SelectionModel, SizeType } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

const defaultOptions = IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY();

@Directive({
  selector: 'ids-segmented-control',
  standalone: true,
})
export class IdsSegmentedControlDirective implements AfterContentInit {
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
  public appearance = input<SegmentedControlAppearanceType>(this._defaultOptions.appearance);
  public disabled = input<boolean>(false);
  public multiSelect = input<boolean>(false);

  private _selectionModel?: SelectionModel<IdsSegmentedControlItemComponent>;

  private _items = contentChildren<IdsSegmentedControlItemComponent>(IdsSegmentedControlItemComponent);

  private _hostClasses = computed(() => createHostClassList(
    this._componentClass,
    [
      this.size(),
      this.variant(),
      this.appearance(),
    ],
  ));

  @HostBinding('id') get hostId(): string {
    return this.id();
  }

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  public ngAfterContentInit(): void {
    const items = this._items();
    const minItemCount = 2;
    const maxItemCount = 5;
    if (isDevMode() && (items.length < minItemCount || items.length > maxItemCount)) {
      throw new Error('Segmented control: invalid count of segmented control items. Minimum item count is 2, maximum is 5.');
    }
  }
}
