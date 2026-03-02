import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import {
  IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY,
  IdsBreadcrumbDivider,
  IdsBreadcrumbDividerType,
  IdsBreadcrumbHierarchyType,
  IdsBreadcrumbVariant,
  IdsBreadcrumbVariantType,
} from '@i-cell/ids-angular/breadcrumb';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IdsOverlayPanelAppearance,
  IdsOverlayPanelAppearanceType,
  IdsOverlayPanelVariant,
  IdsOverlayPanelVariantType,
} from '@i-cell/ids-angular/overlay-panel';

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

@Injectable()
export class BreadcrumbDemoService {
  public readonly breadcrumbInputControlConfig: DemoControlConfig<BreadcrumbInputControls> = {
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

  public readonly overlayPanelInputControlConfig: DemoControlConfig<OverlayPanelInputControls> = {
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

  public breadcrumbDefaults = getDefaultFromDemoConfig<BreadcrumbInputControls>(this.breadcrumbInputControlConfig);
  public overlayPanelDefaults = getDefaultFromDemoConfig<OverlayPanelInputControls>(this.overlayPanelInputControlConfig);

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

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [
      this.breadcrumbInputControlConfig,
      this.overlayPanelInputControlConfig,
    ];
  }
}
