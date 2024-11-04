import { Directive, inject, InjectionToken, input } from '@angular/core';
import { DirectiveBase, fallbackValue } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

@Directive({
  host: {
    '[id]': 'id()',
  },
})
export abstract class ComponentBase extends DirectiveBase {
  protected readonly _uniqueId = `${this._hostClassName}-${++nextUniqueId}`;

  public readonly id = input<string, string | undefined>(this._uniqueId, { transform: (val) => fallbackValue(val, this._uniqueId) });
}

export abstract class ComponentBaseWithDefaults<D> extends ComponentBase {
  protected abstract readonly _defaultConfig: D;

  protected _getDefaultConfig(defaultConfig: Required<D>, injectionToken: InjectionToken<D>): Required<D> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}