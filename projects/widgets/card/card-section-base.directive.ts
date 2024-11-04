import { computed, Directive, input } from '@angular/core';
import { DirectiveBase } from '@i-cell/ids-angular/core';

@Directive({})
export abstract class IdsCardSectionBase extends DirectiveBase {
  protected override get _hostName(): string {
    return 'card-section';
  }

  public stretch = input(false);

  protected _hostClasses = computed(() => this._getHostClasses([this.stretch() ? 'stretched' : 'padded']));
}
