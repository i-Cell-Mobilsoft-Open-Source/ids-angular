import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsSize,
  IdsSizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsTagComponent, IdsTagAppearanceType, IdsTagVariantType, IdsTagVariant, IDS_TAG_DEFAULT_CONFIG_FACTORY, IdsTagAppearance } from '@i-cell/ids-angular/tag';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_TAG_DEFAULT_CONFIG_FACTORY();

type TagInputs = {
  appearance: IdsTagAppearanceType,
  size: IdsSizeType,
  variant: IdsTagVariantType,
};

type TagHelperControls = {
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
};

@Component({
  standalone: true,
  selector: 'app-tag-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsTagComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './tag-demo.component.html',
  styleUrl: './tag-demo.component.scss',
})
export class TagDemoComponent {
  protected _inputControlConfig: DemoControlConfig<TagInputs> = {
    appearance: {
      description: 'Appearance of the tag.',
      type: 'IdsTagAppearanceType',
      default: defaultConfig.appearance,
      control: 'select',
      list: convertEnumToStringArray(IdsTagAppearance),
    },
    size: {
      description: 'Size of the tag.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the tag.',
      type: 'IdsTagVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsTagVariant),
    },
  };

  protected _helperControlConfig: DemoControlConfig<TagHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the tag has leading icon or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    hasTrailingIcon: {
      description: 'Whether the tag has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };
  
  public defaults = getDefaultFromDemoConfig<TagInputs>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<TagHelperControls>(this._helperControlConfig);

  public model: TagInputs = { ...this.defaults };
  public helperModel: TagHelperControls = { ...this.helperDefaults };

  public onClick(tagName: string): void {
    console.info(`${tagName} tag clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
