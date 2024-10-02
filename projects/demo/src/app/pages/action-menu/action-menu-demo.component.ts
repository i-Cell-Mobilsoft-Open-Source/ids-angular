import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsActionMenuTriggerDirective } from '@i-cell/ids-angular/action-menu';
import { ActionPanelAppearance, ActionPanelAppearanceType, ActionPanelVariant, ActionPanelVariantType, IdsActionPanelComponent } from '@i-cell/ids-angular/action-panel';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsMenuItemComponent, MenuItemAppearance, MenuItemAppearanceType, MenuItemVariant, MenuItemVariantType } from '@i-cell/ids-angular/menu-item';
import { mdiChevronDown, mdiChevronRight, mdiChevronUp, mdiMagnify } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

type ActionPanelPublicApi = {
  appearance: ActionPanelAppearanceType,
  size: SizeType,
  variant: ActionPanelVariantType,
};

type ActionPanelHelperControls = {
  testBackgroundColor: 'light' | 'dark',
};

type MenuItemPublicApi = {
  appearance: MenuItemAppearanceType,
  size: SizeType,
  variant: MenuItemVariantType,
};

type MenuItemHelperControls = {
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
  hasDisabledItem: boolean,
};

@Component({
  selector: 'app-action-menu-demo',
  standalone: true,
  imports: [
    IdsActionMenuTriggerDirective,
    IdsActionPanelComponent,
    IdsMenuItemComponent,
    IdsButtonComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './action-menu-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './action-menu-demo.component.scss',
  ],
})
export class ActionMenuDemoComponent {
  public actionPanelAappearances = Object.values(ActionPanelAppearance) as ActionPanelAppearanceType[];
  public actionPanelVariants = Object.values(ActionPanelVariant) as ActionPanelVariantType[];
  public menuItemAappearances = Object.values(MenuItemAppearance) as MenuItemAppearanceType[];
  public menuItemVariants = Object.values(MenuItemVariant) as MenuItemVariantType[];
  public sizes = Object.values(Size) as SizeType[];
  public actionPanelBackgroundColors = [
    'light',
    'dark',
  ];

  public mdiSearch = mdiMagnify;
  public mdiChevronDown = mdiChevronDown;
  public mdiChevronRight = mdiChevronRight;
  public mdiChevronUp = mdiChevronUp;
  
  public actionPanelDefaults: ActionPanelPublicApi & ActionPanelHelperControls = {
    appearance: ActionPanelAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: ActionPanelVariant.LIGHT,
    testBackgroundColor: 'light',
  };

  public actionPanelModel: ActionPanelPublicApi & ActionPanelHelperControls = { ...this.actionPanelDefaults };

  public menuItemDefaults: MenuItemPublicApi & MenuItemHelperControls = {
    appearance: ActionPanelAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: MenuItemVariant.SURFACE,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasDisabledItem: false,
  };

  public menuItemModel: MenuItemPublicApi & MenuItemHelperControls = { ...this.menuItemDefaults };

  // eslint-disable-next-line no-magic-numbers
  public items = Array(3);

  public resetActionPanel(): void {
    this.actionPanelModel = { ...this.actionPanelDefaults };
  }

  public resetMenuItem(): void {
    this.menuItemModel = { ...this.menuItemDefaults };
  }
}
