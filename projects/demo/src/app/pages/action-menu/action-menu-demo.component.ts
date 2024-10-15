import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsActionMenuTriggerDirective } from '@i-cell/ids-angular/action-menu';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsMenuItemComponent, MenuItemAppearance, MenuItemAppearanceType, MenuItemVariant, MenuItemVariantType } from '@i-cell/ids-angular/menu-item';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel/overlay-panel.component';
import { OverlayPanelAppearance, OverlayPanelAppearanceType } from '@i-cell/ids-angular/overlay-panel/types/overlay-panel-appearance.type';
import { OverlayPanelVariant, OverlayPanelVariantType } from '@i-cell/ids-angular/overlay-panel/types/overlay-panel-variant.type';
import { TranslateModule } from '@ngx-translate/core';

type OverlayPanelPublicApi = {
  appearance: OverlayPanelAppearanceType,
  size: SizeType,
  variant: OverlayPanelVariantType,
};

type OverlayPanelHelperControls = {
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
  public overlayPanelAppearances = Object.values<OverlayPanelAppearanceType>(OverlayPanelAppearance);
  public overlayPanelVariants = Object.values<OverlayPanelVariantType>(OverlayPanelVariant);
  public menuItemAppearances = Object.values<MenuItemAppearanceType>(MenuItemAppearance);
  public menuItemVariants = Object.values<MenuItemVariantType>(MenuItemVariant);
  public sizes = Object.values<SizeType>(Size);
  public overlayPanelBackgroundColors = [
    'light',
    'dark',
  ];

  public overlayPanelDefaults: OverlayPanelPublicApi & OverlayPanelHelperControls = {
    appearance: OverlayPanelAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: OverlayPanelVariant.LIGHT,
    testBackgroundColor: 'light',
  };

  public overlayPanelModel: OverlayPanelPublicApi & OverlayPanelHelperControls = { ...this.overlayPanelDefaults };

  public menuItemDefaults: MenuItemPublicApi & MenuItemHelperControls = {
    appearance: OverlayPanelAppearance.FILLED,
    size: Size.COMFORTABLE,
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
