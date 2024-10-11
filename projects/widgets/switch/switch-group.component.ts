import { IDS_SWITCH_DEFAULT_CONFIG, IDS_SWITCH_DEFAULT_CONFIG_FACTORY } from './switch-defaults';

import { ChangeDetectionStrategy, Component, computed, HostBinding, inject, input, ViewEncapsulation } from '@angular/core';
import { createClassList, SizeType, fallbackValue } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

const defaultConfig = IDS_SWITCH_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-switch-group',
  standalone: true,
  imports: [],
  templateUrl: './switch-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id()',
  },
})
export class IdsSwitchGroupComponent {
  private readonly _componentClass = 'ids-switch-group';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _defaultConfig = {
    ...defaultConfig,
    ...inject(IDS_SWITCH_DEFAULT_CONFIG, { optional: true }),
  };

  public id = input<string, string | undefined>(this._uniqueId, { transform: (val) => fallbackValue(val, this._uniqueId) });
  public size = input<SizeType | null>(this._defaultConfig.size);
  public hasIcon = input(this._defaultConfig.hasIcon);
  public iconPosition = input(this._defaultConfig.iconPosition);
  public labelPosition = input(this._defaultConfig.labelPosition);

  private _hostClasses = computed(() => createClassList(this._componentClass, [this.size()]));

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
