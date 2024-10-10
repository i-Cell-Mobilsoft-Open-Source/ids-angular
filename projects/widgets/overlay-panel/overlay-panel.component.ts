import { OverlayPanelAppearance, OverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { OverlayPanelVariant, OverlayPanelVariantType } from './types/overlay-panel-variant.type';

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
  selector: 'ids-overlay-panel,div[idsOverlayPanel]',
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
export class IdsOverlayPanelComponent {
  /** @ignore */
  private readonly _componentClass = 'ids-overlay-panel';

  public appearance = input<OverlayPanelAppearanceType | null>(
    OverlayPanelAppearance.FILLED,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<OverlayPanelVariantType | null>(OverlayPanelVariant.LIGHT);

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
