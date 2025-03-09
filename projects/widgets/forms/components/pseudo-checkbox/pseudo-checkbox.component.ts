import { IDS_PSEUDO_CHECKBOX_PARENT } from './tokens/pseudo-checkbox-parent';
import { IdsPseudoCheckboxState, IdsPseudoCheckboxStateType } from './types/pseudo-checkbox-state.type';

import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanAttribute, ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-pseudo-checkbox',
  imports: [IdsIconComponent],
  templateUrl: './pseudo-checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PseudoCheckboxComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'pseudo-checkbox';
  }

  private readonly _parent = inject(IDS_PSEUDO_CHECKBOX_PARENT, { optional: true });
  public checkboxState = input<IdsPseudoCheckboxStateType>(IdsPseudoCheckboxState.UNCHECKED);
  public disabled = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });

  protected _isChecked = computed(() => this.checkboxState() === IdsPseudoCheckboxState.CHECKED);
  protected _isIndeterminate = computed(() => this.checkboxState() === IdsPseudoCheckboxState.INDETERMINATE);

  protected _hostClasses = computed(() => this._getHostClasses([
    this._parent?.embeddedPseudoCheckboxSize(),
    this._parent?.embeddedPseudoCheckboxVariant(),
    this.disabled() ? 'disabled' : null,
  ]),
  );
}
