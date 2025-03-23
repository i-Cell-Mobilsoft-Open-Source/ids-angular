import { IDS_CHECKBOX_GROUP_DEFAULT_CONFIG, IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY, IdsCheckboxGroupDefaultConfig } from './checkbox-group-defaults';
import { IdsCheckboxComponent } from './checkbox.component';
import { IdsCheckBoxChangeEvent } from './types/checkbox-events.class';
import { IDS_CHECKBOX_GROUP_CHILD } from './types/checkbox-group-child';
import { IDS_CHECKBOX_PARENT, IdsCheckboxParent } from './types/checkbox-parent';
import { IdsCheckboxVariantType } from './types/checkbox-variant.type';

import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, input, ViewEncapsulation } from '@angular/core';
import { IdsCheckboxState } from '@i-cell/ids-angular/checkbox/types/checkbox-state.type';
import { ComponentBaseWithDefaults, IdsOrientation, IdsOrientationType, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-checkbox-group',
  imports: [IdsCheckboxComponent],
  templateUrl: './checkbox-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'group',
    '[attr.aria-labelledby]': '_groupLabelId()',
  },
  providers: [
    {
      provide: IDS_CHECKBOX_PARENT,
      useExisting: IdsCheckboxGroupComponent,
    },
  ],
})
export class IdsCheckboxGroupComponent extends ComponentBaseWithDefaults<IdsCheckboxGroupDefaultConfig> implements IdsCheckboxParent {
  protected override get _hostName(): string {
    return 'checkbox-group';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_CHECKBOX_GROUP_DEFAULT_CONFIG);

  private _childCheckboxes = contentChildren(IDS_CHECKBOX_GROUP_CHILD);

  public groupLabel = input<string>('', { alias: 'label' });
  public allowParent = input<boolean>(this._defaultConfig.allowParent);
  public parentCheckboxLabel = input<string>('', { alias: 'parentLabel' });
  public name = input<string>();
  public size = input<IdsSizeType | null>(this._defaultConfig.size);
  public variant = input<IdsCheckboxVariantType | null>(this._defaultConfig.variant);
  public orientation = input<IdsOrientationType | null>(this._defaultConfig.orientation);

  protected _groupLabelId = computed(() =>  `${this.id()}-label`);
  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.orientation(),
  ]));

  protected _parentCheckboxChecked = computed(() =>
    this._childCheckboxes().every((child) =>
      child.checkboxState() === IdsCheckboxState.CHECKED));

  protected _parentCheckboxIndeterminate = computed(() =>
    !this._parentCheckboxChecked() && this._childCheckboxes().some((child) =>
      child.checkboxState() === IdsCheckboxState.CHECKED),
  );

  private _invalidParentOrientation = effect(() => {
    if (this.allowParent() && this.orientation() === IdsOrientation.HORIZONTAL) {
      throw this._createHostError('Parent checkbox can be used only in vertical orientation');
    }
  });

  public selectAllChild(): void {
    this._childCheckboxes().forEach((child) => {
      child.select();
    });
  }

  public deselectAllChild(): void {
    this._childCheckboxes().forEach((child) => {
      child.deselect();
    });
  }

  protected _handleParentChange(event: IdsCheckBoxChangeEvent): void {
    if (event.checked) {
      this.selectAllChild();
    } else {
      this.deselectAllChild();
    }
  }
}
