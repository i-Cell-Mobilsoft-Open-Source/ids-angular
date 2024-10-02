import { ActionPanelAppearance, ActionPanelAppearanceType } from './types/action-panel-appearance.type';
import { ActionPanelVariant, ActionPanelVariantType } from './types/action-panel-variant.type';

import { CdkMenu, CdkTargetMenuAim } from '@angular/cdk/menu';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import {
  createClassList,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu-item';

@Component({
  selector: 'ids-action-panel,div[idsActionPanel]',
  standalone: true,
  imports: [IdsMenuItemComponent],
  hostDirectives: [
    CdkMenu,
    CdkTargetMenuAim,
  ],
  template: '<ng-content />',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
  },
})
export class IdsActionPanelComponent {
  /** @ignore */
  private readonly _componentClass = 'ids-action-panel';

  public appearance = input<ActionPanelAppearanceType | null>(
    ActionPanelAppearance.FILLED,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<ActionPanelVariantType | null>(ActionPanelVariant.LIGHT);

  /** @ignore */
  public actionItems = contentChildren(IdsMenuItemComponent);

  /** @ignore */
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this.appearance(),
    this.size(),
    this.variant(),
  ]),
  );
}
