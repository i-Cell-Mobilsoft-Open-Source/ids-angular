import { IdsBreadcrumbDivider, IdsBreadcrumbDividerType } from '../public-api';

import { Component, input } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'li[idsBreadcrumbDivider]',
  imports: [IdsIconComponent],
  providers: [],
  host: {
    role: 'presentation',
    'class': 'ids-breadcrumb-divider',
    '[attr.aria-hidden]': 'true',
  },
  template: `
    @if (dividerType() === _dividerType.ICON) {
      <ids-icon aria-hidden="true" fontIcon="chevron-right" [size]="size()" />
    } @else {
      <span class="ids-breadcrumb-divider-foreslash">/</span>
    }
  `,
})
export class IdsBreadcrumbDividerComponent {
  public dividerType = input<IdsBreadcrumbDividerType>();
  public size = input.required<IdsSizeType>();
  protected _dividerType = IdsBreadcrumbDivider;
}
