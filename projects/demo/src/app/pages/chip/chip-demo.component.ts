import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsChipAppearance, IdsChipAppearanceType, IdsChipVariant, IdsChipVariantType, IDS_CHIP_DEFAULT_CONFIG_FACTORY, IdsChipComponent, IdsChipRemoveEvent } from '@i-cell/ids-angular/chip';
import { IdsChipGroupComponent } from '@i-cell/ids-angular/chip/chip-group.component';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsPrefixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_CHIP_DEFAULT_CONFIG_FACTORY();

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

const chipList = [
  'carrot',
  'onion',
  'mushroom',
];

@Component({
  selector: 'app-chip-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsChipGroupComponent,
    IdsChipComponent,
    IdsAvatarComponent,
    IdsButtonComponent,
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
      control: 'select',
      list: convertEnumToStringArray(IdsChipAppearance),
    },
    size: {
      description: 'Chip size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Chip variant.',
      type: 'IdsChipVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsChipVariant),
    },
    removable: {
      description: 'Whether the chip is removable or not.',
      type: 'boolean',
      default: defaultConfig.removable,
      control: 'checkbox',
    },
    disabled: {
      description: 'Whether the chip is disabled or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  protected _helperControlConfig: DemoControlConfig<ChipHelperControls> = {
    hasAvatar: {
      description: 'Whether the chip has avatar.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    hasLeadingIcon: {
      description: 'Whether the chip has leading icon.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    label: {
      description: 'Label of chip',
      type: 'string',
      default: false,
      demoDefault: 'Label',
    },
    hasTrailingIconButton: {
      description: 'Whether the chip has trailing iconButton.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  public defaults = getDefaultFromDemoConfig<ChipInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<ChipHelperControls>(this._helperControlConfig);

  public model: ChipInputControls = { ...this.defaults };
  public helperModel: ChipHelperControls = { ...this.helperDefaults };

  public chipList = chipList;

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.standaloneChipIsVisible = true;

    this.chipList = chipList;
  }

  public standaloneChipIsVisible = true;

  public onChipRemove(event: IdsChipRemoveEvent): void {
    console.info('chip removed:', event.chip.id());
    this.standaloneChipIsVisible = false;
  }

  public onChipRemoveFromGroup(event: IdsChipRemoveEvent, index: number, label: string): void {
    console.info('chip removed:', event.chip.id(), label);
    this.chipList = this.chipList.toSpliced(index, 1);
  }
}
