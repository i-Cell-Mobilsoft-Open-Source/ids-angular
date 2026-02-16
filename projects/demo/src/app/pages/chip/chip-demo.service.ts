import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import {
  IDS_CHIP_DEFAULT_CONFIG_FACTORY,
  IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY,
  IdsChipAppearance,
  IdsChipAppearanceType,
  IdsChipRemoveEvent,
  IdsChipVariant,
  IdsChipVariantType,
} from '@i-cell/ids-angular/chip';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_CHIP_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY();

type ChipInputControls = {
  appearance: IdsChipAppearanceType;
  size: IdsSizeType;
  variant: IdsChipVariantType;
  removable: boolean;
  disabled: boolean;
};

type ChipHelperControls = {
  hasAvatar: boolean;
  hasLeadingIcon: boolean;
  label: string;
  hasTrailingIconButton: boolean;
};

type ChipGroupInputControls = {
  appearance: IdsChipAppearanceType;
  size: IdsSizeType;
  disabled: boolean;
};

type ChipGroupHelperControls = {
  chipsAreInteractive: boolean;
};

type ChipMethodControls = {
  remove: void;
};

const chipList: { label: string; variant: IdsChipVariantType }[] = [
  { label: 'carrot', variant: IdsChipVariant.PRIMARY },
  { label: 'onion', variant: IdsChipVariant.SECONDARY },
  { label: 'mushroom', variant: IdsChipVariant.SURFACE },
];

@Injectable()
export class ChipDemoService {
  public readonly inputControlConfig: DemoControlConfig<ChipInputControls> = {
    appearance: {
      description: 'Chip appearance.',
      type: 'IdsChipAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsChipAppearance),
    },
    size: {
      description: 'Chip size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Chip variant.',
      type: 'IdsChipVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsChipVariant),
    },
    removable: {
      description: 'Whether the chip is removable or not.',
      type: 'boolean',
      default: defaultConfig.removable,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: 'Whether the chip is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<ChipHelperControls> = {
    hasAvatar: {
      description: 'Whether the chip has avatar.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    hasLeadingIcon: {
      description: 'Whether the chip has leading icon.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    label: {
      description: 'Label of chip',
      type: 'string',
      default: '-',
      demoDefault: 'Label',
    },
    hasTrailingIconButton: {
      description: 'Whether the chip has trailing iconButton.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly groupInputControlConfig: DemoControlConfig<ChipGroupInputControls> = {
    appearance: {
      description: 'Chip group appearance.',
      type: 'IdsChipAppearanceType',
      default: defaultGroupConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsChipAppearance),
    },
    size: {
      description: 'Chip group size.',
      type: 'IdsSizeType',
      default: defaultGroupConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    disabled: {
      description: 'Whether the chip group is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly groupHelperControlConfig: DemoControlConfig<ChipGroupHelperControls> = {
    chipsAreInteractive: {
      description: 'Whether the chip group build from interactive chips or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly methodControlConfig: DemoMethodConfig<ChipMethodControls> = {
    remove: {
      name: 'remove()',
      description: 'Remove the chip.',
      returnType: 'void',
    },
  };

  public defaults = getDefaultFromDemoConfig<ChipInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<ChipHelperControls>(this.helperControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<ChipGroupInputControls>(this.groupInputControlConfig);
  public groupHelperDefaults = getDefaultFromDemoConfig<ChipGroupHelperControls>(this.groupHelperControlConfig);

  public model: ChipInputControls = { ...this.defaults };
  public helperModel: ChipHelperControls = { ...this.helperDefaults };
  public groupModel: ChipGroupInputControls = { ...this.groupDefaults };
  public groupHelperModel: ChipGroupHelperControls = { ...this.groupHelperDefaults };

  public chipList = chipList;

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.groupModel = { ...this.groupDefaults };
    this.groupHelperModel = { ...this.groupHelperDefaults };
    this.interactivChipIsVisible = true;

    this.chipList = chipList;
  }

  public interactivChipIsVisible = true;

  public onChipRemove(event: IdsChipRemoveEvent): void {
    console.info('chip removed:', event.chip.id());
    this.interactivChipIsVisible = false;
  }

  public onChipRemoveFromGroup(event: IdsChipRemoveEvent, index: number, label: string): void {
    console.info('chip removed:', event.chip.id(), label);
    this.chipList = this.chipList.toSpliced(index, 1);
  }

  public getMethodConfig(): DemoMethodConfig<unknown>[] {
    return [this.methodControlConfig];
  }
}
