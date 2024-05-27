import { Directive } from '@angular/core';
import { IdsCardSectionBase } from './card-section-base.directive';

@Directive({
  selector: 'ids-card-body',
  standalone: true,
  host: {
    'class': 'ids-card-body'
  }
})
export class IdsCardBodyDirective extends IdsCardSectionBase {}
