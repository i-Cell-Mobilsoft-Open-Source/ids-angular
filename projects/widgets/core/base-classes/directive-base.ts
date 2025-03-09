import { createClassList } from '../utils/class-prefix';

import { DestroyRef, Directive, inject, InjectionToken, Signal } from '@angular/core';

@Directive({
  host: {
    '[class]': '_hostClasses()',
  },
  standalone: false,
})
export abstract class DirectiveBase {
  protected get _hostName(): string {
    return '';
  }

  protected readonly _hostClassName = `ids-${this._hostName}`;

  protected readonly _destroyRef = inject(DestroyRef);

  protected abstract _hostClasses: Signal<string>;
  protected _getHostClasses(
    appendableClassNames: Array<string | Array<string | null | undefined> | null | undefined> = [],
    nonAppendableClassNames: Array<string | null> = [],
  ): string {
    return createClassList(this._hostClassName, appendableClassNames, nonAppendableClassNames);
  }

  protected _createHostError(message: string): Error {
    return new Error(`${this._hostClassName}: ${message}`);
  }
}

export abstract class DirectiveBaseWithDefaults<D> extends DirectiveBase {
  protected abstract readonly _defaultConfig: D;

  protected _getDefaultConfig(defaultConfig: Required<D>, injectionToken: InjectionToken<D>): Required<D> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
