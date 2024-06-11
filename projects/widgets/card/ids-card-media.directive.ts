import { IdsCardSectionBase } from './card-section-base.directive';

import { Directive, input } from '@angular/core';

@Directive({
  selector: '[idsCardMedia]',
  standalone: true,
  host: {
    class: 'ids-card-media',
  },
})
export class IdsCardMediaDirective extends IdsCardSectionBase {
  public override stretch = input(true);
}
