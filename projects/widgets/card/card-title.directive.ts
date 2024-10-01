import { Directive } from '@angular/core';

@Directive({
  selector: '[idsCardTitle]',
  standalone: true,
  host: {
    class: 'ids-card-title',
  },
})
export class IdsCardTitleDirective {}
