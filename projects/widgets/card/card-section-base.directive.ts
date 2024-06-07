import { Directive, HostBinding, input } from '@angular/core';

@Directive()
export abstract class IdsCardSectionBase {
  public stretch = input(false);

  @HostBinding('class') get classes(): string {
    return `ids-card-section ${this.stretch() ? 'ids-card-section-stretched' : 'ids-card-section-padded'}`;
  }
}
