import { IDS_CHECKBOX_GROUP_DEFAULT_CONFIG, IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY, IdsCheckboxGroupDefaultConfig } from './checkbox-group-defaults';
import { IdsCheckboxComponent } from './checkbox.component';
import { IdsCheckBoxChangeEvent } from './types/checkbox-events.class';
import { IDS_CHECKBOX_GROUP_CHILD } from './types/checkbox-group-child';
import { IDS_CHECKBOX_PARENT, IdsCheckboxParent } from './types/checkbox-parent';
import { IdsCheckboxState } from './types/checkbox-state.type';
import { IdsCheckboxVariantType } from './types/checkbox-variant.type';

import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ControlContainer } from '@angular/forms';
import {
  coerceBooleanAttribute,
  ComponentBaseWithDefaults,
  IdsOrientation,
  IdsOrientationType,
  IdsSizeType,
  IDS_CONTROL_CONTAINER,
} from '@i-cell/ids-angular/core';
import { IdsErrorMessageComponent, IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { of, startWith, switchMap } from 'rxjs';

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
      provide: IDS_CONTROL_CONTAINER,
      useExisting: IdsCheckboxGroupComponent,
    },
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

  private readonly _controlContainer = inject(ControlContainer, { skipSelf: true, optional: true });
  private _childCheckboxes = contentChildren(IDS_CHECKBOX_GROUP_CHILD);
  public showAsterisk = input(false, { transform: coerceBooleanAttribute });
  public groupLabel = input<string>('', { alias: 'label' });
  public allowParent = input<boolean>(this._defaultConfig.allowParent);
  public parentCheckboxLabel = input<string>('', { alias: 'parentLabel' });
  public size = input<IdsSizeType | null>(this._defaultConfig.size);
  public variant = input<IdsCheckboxVariantType | null>(this._defaultConfig.variant);
  public orientation = input<IdsOrientationType | null>(this._defaultConfig.orientation);
  public controlDir = signal<ControlContainer | null>(this._controlContainer);
  public readonly errorMessages = contentChildren(IdsErrorMessageComponent);
  public readonly hintMessage = contentChildren(IdsHintMessageComponent);

  private readonly _controlState = toSignal(
    toObservable(this.controlDir).pipe(
      switchMap((controlDir) => (controlDir?.control ? controlDir.control.events.pipe(startWith(null)) : of(null))),
    ),
    { equal: () => false },
  );

  protected _groupLabelId = computed(() =>  `${this.id()}-label`);
  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.orientation(),
    this.allowParent() ? 'indeterminated' : null,
  ]));

  protected _hasHint = computed(() => Boolean(this.hintMessage().length));

  public hasError = computed(() => {
    this._controlState();
    if (this.errorMessages().length === 0) {
      return undefined;
    }
    const control = this.controlDir()?.control;
    if (!control) {
      return undefined;
    }
    return control.errors && (control.touched || control.dirty) ? true : undefined;
  });

  protected _parentCheckboxChecked = computed(() =>
    this._childCheckboxes().every((child) =>
      child.checkboxState() === IdsCheckboxState.CHECKED));

  protected _parentCheckboxIndeterminate = computed(() =>
    !this._parentCheckboxChecked() && this._childCheckboxes().some((child) =>
      child.checkboxState() === IdsCheckboxState.CHECKED),
  );

  protected get _shouldShowAsterisk(): boolean {
    return this.showAsterisk();
  };

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
