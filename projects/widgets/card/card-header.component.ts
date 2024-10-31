import { IdsCardSectionBase } from './card-section-base.directive';

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ids-card-header,header[idsCardHeader]',
  standalone: true,
  imports: [],
  template: `
    <div class="ids-card-header-headline">
      <ng-content select="ids-card-title, [idsCardTitle], ids-card-subtitle, [idsCardSubtitle]" />
    </div>
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ids-card-header',
  },
})
export class IdsCardHeaderComponent extends IdsCardSectionBase {}
