import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
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
import { TranslateService } from '@ngx-translate/core';

const CHIP_DOCS_PATH = 'chip/chip.component.docs.json';
const CHIP_GROUP_DOCS_PATH = 'chip/chip-group.component.docs.json';
const CHIP_SLOTS_DOCS_PATH = 'chip/chip.component.slots.docs.json';

const defaultConfig = IDS_CHIP_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY();

type ChipInputControls = {
  appearance: IdsChipAppearanceType;
  size: IdsSizeType;
  variant: IdsChipVariantType;
  removable: boolean;
  disabled: boolean;
  tabIndex: number;
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

const chipList: { label: string; variant: IdsChipVariantType }[] = [
  { label: 'carrot', variant: IdsChipVariant.PRIMARY },
  { label: 'onion', variant: IdsChipVariant.SECONDARY },
  { label: 'mushroom', variant: IdsChipVariant.SURFACE },
];

@Injectable()
export class ChipDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<ChipInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(CHIP_DOCS_PATH, 'appearance', 'Chip appearance.'),
      type: 'IdsChipAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsChipAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(CHIP_DOCS_PATH, 'size', 'Chip size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(CHIP_DOCS_PATH, 'variant', 'Chip variant.'),
      type: 'IdsChipVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsChipVariant),
    },
    removable: {
      description: this._widgetDocs.getDescription(CHIP_DOCS_PATH, 'removable', 'Whether the chip is removable or not.'),
      type: 'boolean',
      default: defaultConfig.removable,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: this._widgetDocs.getDescription(CHIP_DOCS_PATH, 'disabled', 'Whether the chip is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    tabIndex: {
      description: this._widgetDocs.getDescription(CHIP_DOCS_PATH, 'tabIndex', 'Tab index of the chip.'),
      type: 'number',
      default: 0,
      control: DemoControl.NUMBER,
      step: 1,
    },
  };

  public readonly propControlConfig: DemoControlConfig<unknown> = {
    removed: {
      description: this._widgetDocs.getDescription(
        CHIP_DOCS_PATH,
        'removed',
        'Emitted when the chip is removed (via the remove/trailing icon button).',
      ),
      type: 'EventEmitter<IdsChipRemoveEvent>',
      default: '-',
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
      description: this._widgetDocs.getDescription(CHIP_GROUP_DOCS_PATH, 'appearance', 'Appearance of the chips in the group.'),
      type: 'IdsChipAppearanceType',
      default: defaultGroupConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsChipAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(CHIP_GROUP_DOCS_PATH, 'size', 'Size of the chips in the group.'),
      type: 'IdsSizeType',
      default: defaultGroupConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    disabled: {
      description: this._widgetDocs.getDescription(CHIP_GROUP_DOCS_PATH, 'disabled', 'Whether the chips in the group are disabled.'),
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

  public readonly methodControlConfig: DemoMethodConfig = [
    {
      name: 'remove()',
      description: 'Remove the chip.',
      returnType: 'void',
    },
  ];

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

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodControlConfig];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.CHIP', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputControlConfig, ...this.propControlConfig },
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.CHIP', 'API.PROPERTY_GROUP.GROUP'),
        config: this.groupInputControlConfig,
      },
    ];
  }

  public readonly slotControlConfig: DemoSlotConfig = [
    {
      name: 'avatar',
      selector: 'ids-avatar',
      description: this._widgetDocs.getDescription(
        CHIP_SLOTS_DOCS_PATH,
        'avatar',
        'Projected <ids-avatar> element shown at the start of the chip.',
      ),
    },
    {
      name: 'idsLeadingIcon',
      selector: '[idsLeadingIcon]',
      description: this._widgetDocs.getDescription(
        CHIP_SLOTS_DOCS_PATH,
        'idsLeadingIcon',
        'Content projected before the label (marked with the idsLeadingIcon attribute), typically an <ids-icon>.',
      ),
    },
    {
      name: 'content',
      description: this._widgetDocs.getDescription(
        CHIP_SLOTS_DOCS_PATH,
        'content',
        'Default content of the chip, i.e. the chip\'s label.',
      ),
    },
    {
      name: 'actionButton',
      selector: 'button[idsIconButton]',
      description: this._widgetDocs.getDescription(
        CHIP_SLOTS_DOCS_PATH,
        'actionButton',
        'Custom action button projected instead of the built-in remove button (marked with the idsIconButton attribute), '
          + 'rendered only when removable is false.',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [this.slotControlConfig];
  }

  public getSlotTitles(): string[] {
    return ['Chip'];
  }
}
