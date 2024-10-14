import { IDS_CHECKBOX_GROUP_DEFAULT_CONFIG, IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY, IdsCheckboxGroupDefaultConfig } from './checkbox-group-defaults';
import { IdsCheckboxComponent } from './checkbox.component';
import { CheckBoxChangeEvent } from './types/checkbox-events';
import { CheckboxVariantType } from './types/checkbox-variant';

import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, input, ViewEncapsulation } from '@angular/core';
import { ComponentBaseWithDefaults, Orientation, OrientationType, SizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-checkbox-group',
  standalone: true,
  imports: [IdsCheckboxComponent],
  templateUrl: './checkbox-group.component.html',
  styleUrl: 'checkbox-group.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsCheckboxGroupComponent extends ComponentBaseWithDefaults<IdsCheckboxGroupDefaultConfig> {
  protected override get _componentName(): string {
    return 'checkbox-group';
  }
  
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_CHECKBOX_GROUP_DEFAULT_CONFIG);

  private _childCheckboxes = contentChildren(IdsCheckboxComponent);

  public groupLabel = input<string>('', { alias: 'label' });
  public allowParent = input<boolean>(this._defaultConfig.allowParent);
  public parentCheckboxLabel = input<string>('', { alias: 'parentLabel' });
  public name = input<string>();
  public size = input<SizeType | null>(this._defaultConfig.size);
  public variant = input<CheckboxVariantType | null>(this._defaultConfig.variant);
  public orientation = input<OrientationType | null>(this._defaultConfig.orientation);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.orientation(),
  ]));

  protected _parentCheckboxChecked = computed(() => this._childCheckboxes().every((child) => child.isChecked()));
  protected _parentCheckboxIndeterminate = computed(() => 
    !this._parentCheckboxChecked() && this._childCheckboxes().some((child) => child.isChecked()),
  );

  private _invalidParentOrientation = effect(() => {
    if (this.allowParent() && this.orientation() === Orientation.HORIZONTAL) {
      throw new Error(this._createComponentError('Parent checkbox can be used only in vertical orientation'));
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

  protected _handleParentChange(event: CheckBoxChangeEvent): void {
    if (event.checked) {
      this.selectAllChild();
    } else {
      this.deselectAllChild();
    }
  }
}
