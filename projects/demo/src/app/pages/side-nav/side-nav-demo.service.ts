import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SIDE_NAV_DEFAULT_CONFIG_FACTORY, IdsSideNavAppearance, IdsSideNavAppearanceType, IdsSideNavVariant, IdsSideNavVariantType } from '@i-cell/ids-angular/side-nav';

type SideNavInputControls = {
  appearance: IdsSideNavAppearanceType;
  size: IdsSizeType;
  variant: IdsSideNavVariantType;
};

type SideNavHelperControls = {
  text: string,
  target: string,
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
  disabled: boolean,
  hasActiveIndicator: boolean,
  hasLabel: boolean,
  hasTooltip: boolean,
};

const sideNavDefaultConfig = IDS_SIDE_NAV_DEFAULT_CONFIG_FACTORY();
@Injectable()
export class SideNavDemoService {
  public readonly sideNavInputControlConfig: DemoControlConfig<SideNavInputControls> = {
    appearance: {
      description: 'Side nav appearance.',
      type: 'IdsSideNavAppearanceType',
      control: 'select',
      list: convertEnumToStringArray(IdsSideNavAppearance),
      default: sideNavDefaultConfig.appearance,
    },
    size: {
      description: 'Side nav size.',
      type: 'IdsSizeType',
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
      default: sideNavDefaultConfig.size,
    },
    variant: {
      description: 'Side nav variant.',
      type: 'IdsSideNavVariantType',
      control: 'select',
      list: convertEnumToStringArray(IdsSideNavVariant),
      default: sideNavDefaultConfig.variant,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<SideNavHelperControls> = {
    text: {
      description: 'Text of side nav item',
      type: 'string',
      default: '-',
      demoDefault: 'Accordion',
    },
    target: {
      description: 'Router link of side nav item',
      type: 'string',
      default: '-',
      demoDefault: 'components/accordion',
    },
    hasLeadingIcon: {
      description: 'Whether the side nav item has leading icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hasTrailingIcon: {
      description: 'Whether the side nav item has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: 'Whether the side nav item is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    hasActiveIndicator: {
      description: 'Whether the side nav has active indicator or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    hasLabel: {
      description: 'Whether the side nav has label or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hasTooltip: {
      description: 'Whether the side nav item has tooltip or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public sideNavDefaults = getDefaultFromDemoConfig<SideNavInputControls>(this.sideNavInputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SideNavHelperControls>(this.helperControlConfig);

  public model: SideNavInputControls = { ...this.sideNavDefaults };
  public helperModel: SideNavHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.sideNavDefaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
