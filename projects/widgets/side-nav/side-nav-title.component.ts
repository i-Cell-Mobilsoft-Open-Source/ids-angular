import { IDS_SIDE_NAV_PARENT } from './tokens/ids-side-nav-parent';

import { Component, contentChildren, inject, input } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

/**
 * Side navigation (section) title
 * - title of the navigation section
 * - it can be used with selectors like `ids-side-nav-title` or `li[idsSideNavTitle]`
 * - leading and trailing icons should be projected, label is bound by input
 */
@Component({
  selector: 'ids-side-nav-title, li[idsSideNavTitle]',
  imports: [],
  template: `
    @if (_iconLeading()) {
      <ng-content select="[icon-leading]" />
    }
    @if (_parent?.hasLabel()) {
      <span class="ids-side-nav-title-label">{{ label() }}</span>
    }
    @if (_iconTrailing()) {
      <ng-content select="[icon-trailing]" />
    }
  `,
  host: {
    class: 'ids-side-nav-title',
    role: 'treeitem',
  },
})
export class IdsSideNavTitleComponent {
  public label = input.required<string>();
  protected _iconLeading = contentChildren<IdsIconComponent>('[icon-leading]');
  protected _iconTrailing = contentChildren<IdsIconComponent>('[icon-trailing]');
  protected readonly _parent = inject(IDS_SIDE_NAV_PARENT, { optional: true });
}
