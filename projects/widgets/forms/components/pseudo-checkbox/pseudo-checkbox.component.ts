import { IDS_PSEUDO_CHECKBOX_PARENT_COMPONENT } from './pseudo-checkbox-parent';

import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { IdsCheckboxState, IdsCheckboxStateType } from '@i-cell/ids-angular/checkbox';
import { coerceBooleanAttribute, ComponentBase, createClassList } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-pseudo-checkbox',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './pseudo-checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PseudoCheckboxComponent extends ComponentBase {
  protected override get _componentName(): string {
    return 'pseudo-checkbox';
  }

  private readonly _parent = inject(IDS_PSEUDO_CHECKBOX_PARENT_COMPONENT, { optional: true });
  public checkboxState = input<IdsCheckboxStateType>(IdsCheckboxState.UNCHECKED);
  public disabled = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });

  protected _isChecked = computed(() => this.checkboxState() === IdsCheckboxState.CHECKED);
  protected _isIndeterminate = computed(() => this.checkboxState() === IdsCheckboxState.INDETERMINATE);

  protected _hostClasses = computed(() => createClassList(this._componentClass, [
    this._parent?.size(),
    this._parent?.variant(),
    this.disabled() ? 'disabled' : null,
  ]),
  );
}
