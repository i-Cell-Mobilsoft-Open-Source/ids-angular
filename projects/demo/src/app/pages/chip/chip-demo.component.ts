import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsChipAppearance, IdsChipAppearanceType, IdsChipVariant, IdsChipVariantType, IDS_CHIP_DEFAULT_CONFIG_FACTORY, IdsChipComponent, IdsChipRemoveEvent, IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY, IdsChipGroupComponent } from '@i-cell/ids-angular/chip';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsPrefixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_CHIP_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY();

type ChipInputControls = {
  appearance: IdsChipAppearanceType,
  size: IdsSizeType,
  variant: IdsChipVariantType,
  removable: boolean,
  disabled: boolean,
};

type ChipHelperControls = {
  hasAvatar: boolean,
  hasLeadingIcon: boolean,
  label: string,
  hasTrailingIconButton: boolean,
};

type ChipGroupInputControls = {
  appearance: IdsChipAppearanceType,
  size: IdsSizeType,
  disabled: boolean,
};

type ChipGroupHelperControls = {
  chipsAreInteractive: boolean,
};

const chipList: { label: string, variant: IdsChipVariantType }[] = [
  { label: 'carrot',  variant: IdsChipVariant.PRIMARY },
  { label: 'onion', variant: IdsChipVariant.SECONDARY },
  { label: 'mushroom', variant: IdsChipVariant.SURFACE },
];

@Component({
  selector: 'app-chip-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsChipGroupComponent,
    IdsChipComponent,
    IdsAvatarComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsPrefixDirective,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './chip-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './chip-demo.component.scss',
  ],
})
export class ChipDemoComponent {
  protected _inputControlConfig: DemoControlConfig<ChipInputControls> = {
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
      control: DemoControl.CHECKBOX,
    },
    disabled: {
      description: 'Whether the chip is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _helperControlConfig: DemoControlConfig<ChipHelperControls> = {
    hasAvatar: {
      description: 'Whether the chip has avatar.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    hasLeadingIcon: {
      description: 'Whether the chip has leading icon.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
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
      control: DemoControl.CHECKBOX,
    },
  };

  protected _groupInputControlConfig: DemoControlConfig<ChipGroupInputControls> = {
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
      control: DemoControl.CHECKBOX,
    },
  };

  protected _groupHelperControlConfig: DemoControlConfig<ChipGroupHelperControls> = {
    chipsAreInteractive: {
      description: 'Whether the chip group build from interactive chips or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  public defaults = getDefaultFromDemoConfig<ChipInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<ChipHelperControls>(this._helperControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<ChipGroupInputControls>(this._groupInputControlConfig);
  public groupHelperDefaults = getDefaultFromDemoConfig<ChipGroupHelperControls>(this._groupHelperControlConfig);

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
}
