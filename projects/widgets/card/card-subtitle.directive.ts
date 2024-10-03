import { Directive } from '@angular/core';

@Directive({
  selector: '[idsCardSubtitle]',
  standalone: true,
  host: {
    class: 'ids-card-subtitle',
  },
})
export class IdsCardSubtitleDirective {}
