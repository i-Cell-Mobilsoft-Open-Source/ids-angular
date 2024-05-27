import { Directive } from '@angular/core';
import { IdsCardSectionBase } from './card-section-base.directive';

@Directive({
  selector: 'ids-card-footer,footer[idsCardFooter]',
  standalone: true,
  host: {
    'class': 'ids-card-footer'
  }
})
export class IdsCardFooterDirective extends IdsCardSectionBase {}
