import { IdsMenuItemComponent } from '../menu-item/menu-item.component';

import { contentChild, Directive, input } from '@angular/core';

@Directive({
  selector: '[idsActiveIndicator]',
  host: {
    '[class.ids-active-indicator]': 'true',
    '[class.ids-active-indicator--active]': 'active()',
  },
})
export class IdsActiveIndicatorDirective {
  private _menuItem = contentChild.required(IdsMenuItemComponent);

  public active = input.required<boolean>();
}
