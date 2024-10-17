import { computed, Directive, input } from '@angular/core';
import { createClassList } from '@i-cell/ids-angular/core';

@Directive({
  host: {
    '[class]': '_hostClasses()',
  },
})
export abstract class IdsCardSectionBase {
  private readonly _componentClass = 'ids-card-section';

  public stretch = input(false);

  private _hostClasses = computed(() => createClassList(this._componentClass, [this.stretch() ? 'stretched' : 'padded']));
}
