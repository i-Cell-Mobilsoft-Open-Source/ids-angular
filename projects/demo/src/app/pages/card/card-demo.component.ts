import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IDS_CARD_DEFAULT_CONFIG_FACTORY, IdsCardAppearance, IdsCardAppearanceType, IdsCardComponent, IdsCardVariant, IdsCardVariantType } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { IdsCardFooterDirective } from '@i-cell/ids-angular/card/card-footer.directive';
import { IdsCardHeaderComponent } from '@i-cell/ids-angular/card/card-header.component';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/card-media.directive';
import { IdsCardSubtitleDirective } from '@i-cell/ids-angular/card/card-subtitle.directive';
import { IdsCardTitleDirective } from '@i-cell/ids-angular/card/card-title.directive';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_CARD_DEFAULT_CONFIG_FACTORY();

type CardInputControls = {
  appearance: IdsCardAppearanceType,
  size: IdsSizeType,
  variant: IdsCardVariantType,
  orientation: IdsOrientationType,
  disabled: boolean,
};

type CardMediaInputControls = {
  stretch: boolean
};

type CardHelperControls = {
  clickable: boolean,
};

@Component({
  selector: 'app-card-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsCardComponent,
    IdsCardHeaderComponent,
    IdsCardBodyDirective,
    IdsCardMediaDirective,
    IdsCardFooterDirective,
    IdsCardTitleDirective,
    IdsCardSubtitleDirective,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './card-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './card-demo.component.scss',
  ],
})
export class CardDemoComponent {
  protected _inputControlConfig: DemoControlConfig<CardInputControls> = {
    appearance: {
      description: 'Card appearance.',
      type: 'IdsCardAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsCardAppearance),
    },
    size: {
      description: 'Card size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Card variant.',
      type: 'IdsCardVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsCardVariant),
    },
    orientation: {
      description: 'Card orientation.',
      type: 'IdsOrientationType',
      default: defaultConfig.orientation,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOrientation),
    },
    disabled: {
      description: 'Whether the card is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _mediaInputControlConfig: DemoControlConfig<CardMediaInputControls> = {
    stretch: {
      description: 'Whether the image is stretchable or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _helperControlConfig: DemoControlConfig<CardHelperControls> = {
    clickable: {
      description: 'Whether the card is clickable or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  public defaults = getDefaultFromDemoConfig<CardInputControls>(this._inputControlConfig);
  public mediaDefaults = getDefaultFromDemoConfig<CardMediaInputControls>(this._mediaInputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<CardHelperControls>(this._helperControlConfig);

  public model: CardInputControls = { ...this.defaults };
  public mediaModel: CardMediaInputControls = { ...this.mediaDefaults };
  public helperModel: CardHelperControls = { ...this.helperDefaults };

  public onClick(): void {
    alert('Click');
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.mediaModel = { ...this.mediaDefaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
