import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY, IdsTooltipDirective, IdsTooltipPosition, IdsTooltipPositionType, IdsTooltipTextAlign, IdsTooltipTouchGestures, IdsTooltipVariant, IdsTooltipVariantType } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';

type TooltipInputControls = {
  tooltipText: string,
  position: IdsTooltipPositionType,
  size: IdsSizeType,
  variant: IdsTooltipVariantType,
  showDelay: number,
  hideDelay: number,
  disabled: boolean,
  touchGestures: IdsTooltipTouchGestures,
  textAlign: IdsTooltipTextAlign,
  showPointer: boolean,
};

const defaultConfig = IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-tooltip-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsTooltipDirective,
    IdsButtonComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './tooltip-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tooltip-demo.component.scss',
  ],
})
export class TooltipDemoComponent {
  protected _inputControlConfig: DemoControlConfig<TooltipInputControls> = {
    tooltipText: {
      description: 'The text displayed inside the tooltip.',
      type: 'string',
      default: '-',

      demoDefault: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      control: DemoControl.TEXT,
    },
    position: {
      description: 'The position of the tooltip relative to the target element.',
      type: 'IdsTooltipPositionType',
      default: defaultConfig.position,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTooltipPosition),
    },
    size: {
      description: 'The size of the tooltip.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'The variant or style of the tooltip.',
      type: 'IdsTooltipVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTooltipVariant),
    },
    showDelay: {
      description: 'The delay (in milliseconds) before the tooltip appears after hovering.',
      type: 'number',
      default: defaultConfig.showDelay,
      control: DemoControl.TEXT,
    },
    hideDelay: {
      description: 'The delay (in milliseconds) before the tooltip disappears after losing focus.',
      type: 'number',
      default: defaultConfig.hideDelay,
      control: DemoControl.TEXT,
    },
    disabled: {
      description: 'Determines if the tooltip is disabled.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    touchGestures: {
      description: 'Specifies the touch gestures behavior for the tooltip (auto, on, off).',
      type: 'IdsTooltipTouchGestures',
      default: 'auto',
      control: DemoControl.SELECT,
      list: [
        'auto',
        'on',
        'off',
      ],
    },
    textAlign: {
      description: 'The text alignment inside the tooltip.',
      type: 'IdsTooltipTextAlign',
      default: 'auto',
      control: DemoControl.SELECT,
      list: [
        'auto',
        'center',
        'left',
        'right',
      ],
    },
    showPointer: {
      description: 'Whether to show tooltip pointer or not.',
      type: 'boolean',
      default: defaultConfig.showPointer,
      control: DemoControl.CHECKBOX,
    },
  };

  public defaults = getDefaultFromDemoConfig<TooltipInputControls>(this._inputControlConfig);

  public model: TooltipInputControls = { ...this.defaults  };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
