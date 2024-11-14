import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsTagComponent, IdsTagAppearanceType, IdsTagVariantType, IdsTagVariant, IDS_TAG_DEFAULT_CONFIG_FACTORY, IdsTagAppearance, IDS_TAG_GROUP_DEFAULT_CONFIG_FACTORY, IdsTagGroupComponent } from '@i-cell/ids-angular/tag';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_TAG_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_TAG_GROUP_DEFAULT_CONFIG_FACTORY();

type TagInputControls = {
  appearance: IdsTagAppearanceType,
  size: IdsSizeType,
  variant: IdsTagVariantType,
};

type TagHelperControls = {
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
};

type TagGroupInputControls = {
  appearance: IdsTagAppearanceType,
  size: IdsSizeType,
};

@Component({
  standalone: true,
  selector: 'app-tag-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsTagComponent,
    IdsTagGroupComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './tag-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tag-demo.component.scss',
  ],
})
export class TagDemoComponent {
  protected _inputControlConfig: DemoControlConfig<TagInputControls> = {
    appearance: {
      description: 'Appearance of the tag.',
      type: 'IdsTagAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTagAppearance),
    },
    size: {
      description: 'Size of the tag.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the tag.',
      type: 'IdsTagVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTagVariant),
    },
  };

  protected _helperControlConfig: DemoControlConfig<TagHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the tag has leading icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    hasTrailingIcon: {
      description: 'Whether the tag has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _groupInputControlConfig: DemoControlConfig<TagGroupInputControls> = {
    appearance: {
      description: 'Appearance of the tag.',
      type: 'IdsTagAppearanceType',
      default: defaultGroupConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTagAppearance),
    },
    size: {
      description: 'Size of the tag.',
      type: 'IdsSizeType',
      default: defaultGroupConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
  };

  public defaults = getDefaultFromDemoConfig<TagInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<TagHelperControls>(this._helperControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<TagGroupInputControls>(this._groupInputControlConfig);

  public model: TagInputControls = { ...this.defaults };
  public helperModel: TagHelperControls = { ...this.helperDefaults };
  public groupModel: TagGroupInputControls = { ...this.groupDefaults };

  public onClick(tagName: string): void {
    console.info(`${tagName} tag clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.groupModel = { ...this.groupDefaults };
  }
}
