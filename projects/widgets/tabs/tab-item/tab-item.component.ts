import { IdsTabGroupComponent } from '../tab-group.component';

import { ChangeDetectionStrategy, Component, computed, inject, input, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { coerceBooleanAttribute, coerceStringAttribute, ComponentBase } from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-tab-item',
  standalone: true,
  imports: [],
  templateUrl: './tab-item.component.html',
  styleUrl: './tab-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsTabItemComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'tab-item';
  };

  private _tabGroup = inject(IdsTabGroupComponent, { skipSelf: true });
  public labelClass = `${this._hostClassName}__label`;

  public label = input<string>();
  public disabled = input<boolean>(false);
  public hasLeadingIcon = input(false, { transform: coerceBooleanAttribute });
  public leadingIcon = input('', { transform: coerceStringAttribute });
  public hasTrailingIcon = input(false, { transform: coerceBooleanAttribute });
  public trailingIcon = input('', { transform: coerceStringAttribute });
  public content = viewChild.required<TemplateRef<unknown>>(TemplateRef);

  public safeDisabled = computed(() => this._tabGroup.disabled() || this.disabled());

  protected _hostClasses = signal(this._getHostClasses([]));

  public hostTabClasses = computed(() => this._getHostClasses(
    [this.safeDisabled() ? 'disabled' : null],
  ));
}
