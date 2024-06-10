import { IdsCardSectionBase } from './card-section-base.directive';

import { Directive } from '@angular/core';

@Directive({
  selector: 'ids-card-body',
  standalone: true,
  host: {
    class: 'ids-card-body',
  },
})
export class IdsCardBodyDirective extends IdsCardSectionBase {}
