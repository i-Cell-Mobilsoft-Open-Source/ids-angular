import { Directive, input } from '@angular/core';
import { IdsCardSectionBase } from './card-section-base.directive';

@Directive({
  selector: '[idsCardMedia]',
  standalone: true,
  host: {
    'class': 'ids-card-media'
  }
})
export class IdsCardMediaDirective extends IdsCardSectionBase {
  public override stretch = input(true);
}
