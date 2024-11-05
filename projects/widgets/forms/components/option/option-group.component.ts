import { IDS_OPTION_PARENT_COMPONENT } from './option-parent';

import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanAttribute, ComponentBase } from '@i-cell/ids-angular/core';

export const IDS_OPTION_GROUP = new InjectionToken<IdsOptionGroupComponent>('IdsOptionGroup');

@Component({
  selector: 'ids-option-group',
  standalone: true,
  imports: [],
  templateUrl: './option-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: IDS_OPTION_GROUP, useExisting: IdsOptionGroupComponent }],
  host: {
    '[attr.role]': '_inert ? null : "group"',
    '[attr.aria-disabled]': '_inert ? null : disabled().toString()',
    '[attr.aria-labelledby]': '_inert ? null : _labelId()',
  },
})
export class IdsOptionGroupComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'option-group';
  }

  private readonly _parent = inject(IDS_OPTION_PARENT_COMPONENT);
  protected readonly _inert = this._parent?.inertGroups ?? false;

  public label = input<string>();
  public disabled = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });

  protected readonly _labelId = computed(() => `${this.id()}-label`);
  protected readonly _hostClasses = computed(() => this._getHostClasses([
    this.disabled() ? 'disabled' : null,
    this._parent.parentSize(),
    this._parent.parentVariant(),
  ]));
}
