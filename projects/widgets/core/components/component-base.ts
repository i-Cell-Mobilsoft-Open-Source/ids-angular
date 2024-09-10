import { createClassList } from '../utils/class-prefix';
import { fallbackValue } from '../utils/fallback-value';

import { DestroyRef, Directive, inject, InjectionToken, input, Signal } from '@angular/core';

let nextUniqueId = 0;
@Directive({
  host: {
    '[id]': 'id()',
    '[class]': '_hostClasses()',
  },
})
export abstract class ComponentBase {
  protected readonly _componentName: string = '';
  protected readonly _componentClass = `ids-${this._componentName}`;
  protected readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  protected abstract readonly _hostClasses: Signal<string>;
  protected readonly _destroyRef = inject(DestroyRef);

  public readonly id = input<string, string | undefined>(this._uniqueId, { transform: (val) => fallbackValue(val, this._uniqueId) });

  protected _getHostClasses(
    appendableClassNames: Array<string | Array<string | null | undefined> | null | undefined> = [],
    nonAppendableClassNames: Array<string | null> = [],
  ): string {
    return createClassList(this._componentClass, appendableClassNames, nonAppendableClassNames);
  }

  protected _createComponentError(message: string): string {
    return `${this._componentClass}: ${message}`;
  }
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
