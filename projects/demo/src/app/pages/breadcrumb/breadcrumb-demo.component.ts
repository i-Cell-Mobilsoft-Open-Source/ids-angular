import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import {
  IdsBreadcrumbComponent,
  IdsBreadcrumbDivider,
  IdsBreadcrumbDividerType,
  IdsBreadcrumbVariant,
  IdsBreadcrumbVariantType,
} from '@i-cell/ids-angular/breadcrumb';
import { IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/breadcrumb/breadcrumb-defaults';
import { IdsBreadcrumbHierarchyType } from '@i-cell/ids-angular/breadcrumb/types/breadcrumb-hierarchy.type';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsNotificationComponent } from '@i-cell/ids-angular/notification';
import {
  IdsOverlayPanelAppearance,
  IdsOverlayPanelAppearanceType,
  IdsOverlayPanelVariant,
  IdsOverlayPanelVariantType,
} from '@i-cell/ids-angular/overlay-panel';
import { TranslatePipe } from '@ngx-translate/core';

type BreadcrumbInputControls = {
  size: IdsSizeType;
  variant: IdsBreadcrumbVariantType;
  dividerType: IdsBreadcrumbDividerType;
  hierarchy?: IdsBreadcrumbHierarchyType;
};

type OverlayPanelInputControls = {
  appearance: IdsOverlayPanelAppearanceType;
  size: IdsSizeType;
  variant: IdsOverlayPanelVariantType;
};

const breadcrumbDefaultConfig = IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    TranslatePipe,
    ControlTableComponent,
    IdsBreadcrumbComponent,
    IdsNotificationComponent,
  ],
  templateUrl: './breadcrumb-demo.component.html',
  styleUrl: './breadcrumb-demo.component.scss',
})
export class BreadcrumbDemoComponent {
  protected _breadcrumbInputControlConfig: DemoControlConfig<BreadcrumbInputControls> = {
    size: {
      description: 'Breadcrumb size.',
      type: 'IdsSizeType',
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
      default: breadcrumbDefaultConfig.size,
    },
    variant: {
      description: 'Breadcrumb variant.',
      type: 'IdsBadgeVariantType',
      control: 'select',
      list: convertEnumToStringArray(IdsBreadcrumbVariant),
      default: breadcrumbDefaultConfig.variant,
    },
    dividerType: {
      description: 'Divider type.',
      type: 'IdsBreadcrumbDividerType',
      control: 'select',
      list: convertEnumToStringArray(IdsBreadcrumbDivider),
      default: breadcrumbDefaultConfig.dividerType,
    },
  };

  protected _overlayPanelInputControlConfig: DemoControlConfig<OverlayPanelInputControls> = {
    appearance: {
      description: 'Overlay panel appearance.',
      type: 'IdsOverlayPanelAppearanceType',
      default: breadcrumbDefaultConfig.overlayAppearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOverlayPanelAppearance),
    },
    size: {
      description: 'Overlay panel size.',
      type: 'IdsSizeType',
      default: breadcrumbDefaultConfig.overlaySize,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Overlay panel variant.',
      type: 'IdsOverlayPanelVariantType',
      default: breadcrumbDefaultConfig.overlayVariant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOverlayPanelVariant),
    },
  };

  public breadcrumbDefaults = getDefaultFromDemoConfig<BreadcrumbInputControls>(this._breadcrumbInputControlConfig);
  public overlayPanelDefaults = getDefaultFromDemoConfig<OverlayPanelInputControls>(this._overlayPanelInputControlConfig);

  public hierarchy: IdsBreadcrumbHierarchyType[] = [
    {
      label: 'Home',
      path: '/index',
    },
    {
      label: 'Components',
      path: '/components',
    },
    {
      label: 'Accordion',
      path: '/components/accordion',
    },
    {
      label: 'Button',
      path: '/components/button',
    },
    {
      label: 'Breadcrumb',
      path: '/breadcrumb',
    },
  ];

  public breadcrumbModel: BreadcrumbInputControls = { ...this.breadcrumbDefaults };
  public overlayPanelModel: OverlayPanelInputControls = { ...this.overlayPanelDefaults };

  public reset(): void {
    this.breadcrumbModel = { ...this.breadcrumbDefaults };
    this.overlayPanelModel = { ...this.overlayPanelDefaults };
  }
}
