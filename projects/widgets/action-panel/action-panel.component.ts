import { ActionPanelAppearance, ActionPanelAppearanceType } from './types/action-panel-appearance';

import { CdkMenu, CdkTargetMenuAim } from '@angular/cdk/menu';
import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import {
  AllVariants,
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
})
export class IdsActionPanelComponent {
  /** @ignore */
  private readonly _componentClass = 'ids-action-panel';

  public appearance = input<ActionPanelAppearanceType | null>(
    ActionPanelAppearance.FILLED,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<'light' | null>(AllVariants.LIGHT);

  /** @ignore */
  public actionItems = contentChildren(IdsMenuItemComponent);

  /** @ignore */
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this.appearance(),
    this.size(),
    this.variant(),
  ]),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
