import { IdsTabGroupComponent } from './tab-group.component';

import { ChangeDetectionStrategy, Component, computed, inject, input, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { coerceStringAttribute, ComponentBase } from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-tab',
  imports: [],
  templateUrl: './tab.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsTabComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'tab';
  };

  private _tabGroup = inject(IdsTabGroupComponent, { skipSelf: true });

  public label = input<string>();
  public disabled = input<boolean>(false);
  public leadingIcon = input('', { transform: coerceStringAttribute });
  public trailingIcon = input('', { transform: coerceStringAttribute });
  public content = viewChild.required<TemplateRef<unknown>>(TemplateRef);
  public panelId = `${this.id()}-panel`;

  public parentOrSelfDisabled = computed(() => this._tabGroup.disabled() || this.disabled());

  protected _hostClasses = signal(this._getHostClasses([]));

  public hostTabClasses = computed(() => this._getHostClasses(
    [this.parentOrSelfDisabled() ? 'disabled' : null],
  ));
}
