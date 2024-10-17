import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsActionMenuTriggerDirective, IdsMenuItemComponent, IdsMenuItemAppearance, IdsMenuItemAppearanceType, MenuItemVariant, MenuItemVariantType } from '@i-cell/ids-angular/menu';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel/overlay-panel.component';
import { IdsOverlayPanelAppearance, IdsOverlayPanelAppearanceType } from '@i-cell/ids-angular/overlay-panel/types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariant, IdsOverlayPanelVariantType } from '@i-cell/ids-angular/overlay-panel/types/overlay-panel-variant.type';
import { TranslateModule } from '@ngx-translate/core';

type OverlayPanelPublicApi = {
  appearance: IdsOverlayPanelAppearanceType,
  size: IdsSizeType,
  variant: IdsOverlayPanelVariantType,
};

type OverlayPanelHelperControls = {
  testBackgroundColor: 'light' | 'dark',
};

type MenuItemPublicApi = {
  appearance: IdsMenuItemAppearanceType,
  size: IdsSizeType,
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
    IdsOverlayPanelComponent,
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
  public overlayPanelAppearances = Object.values<IdsOverlayPanelAppearanceType>(IdsOverlayPanelAppearance);
  public overlayPanelVariants = Object.values<IdsOverlayPanelVariantType>(IdsOverlayPanelVariant);
  public menuItemAppearances = Object.values<IdsMenuItemAppearanceType>(IdsMenuItemAppearance);
  public menuItemVariants = Object.values<MenuItemVariantType>(MenuItemVariant);
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public overlayPanelBackgroundColors = [
    'light',
    'dark',
  ];

  public overlayPanelDefaults: OverlayPanelPublicApi & OverlayPanelHelperControls = {
    appearance: IdsOverlayPanelAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    variant: IdsOverlayPanelVariant.LIGHT,
    testBackgroundColor: 'light',
  };

  public overlayPanelModel: OverlayPanelPublicApi & OverlayPanelHelperControls = { ...this.overlayPanelDefaults };

  public menuItemDefaults: MenuItemPublicApi & MenuItemHelperControls = {
    appearance: IdsOverlayPanelAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    variant: MenuItemVariant.SURFACE,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasDisabledItem: false,
  };

  public menuItemModel: MenuItemPublicApi & MenuItemHelperControls = { ...this.menuItemDefaults };

  // eslint-disable-next-line no-magic-numbers
  public items = Array(3);

  public resetOverlayPanel(): void {
    this.overlayPanelModel = { ...this.overlayPanelDefaults };
  }

  public resetMenuItem(): void {
    this.menuItemModel = { ...this.menuItemDefaults };
  }
}
