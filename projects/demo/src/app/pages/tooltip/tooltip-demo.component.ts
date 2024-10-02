import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY, IdsTooltipDirective, TooltipPosition, TooltipPositionType, TooltipTextAlign, TooltipTouchGestures, TooltipVariant, TooltipVariantType } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';

type TooltipPublicApi = {
  tooltipText: string,
  position: TooltipPositionType,
  size: SizeType,
  variant: TooltipVariantType,
  showDelay: number,
  hideDelay: number,
  disabled: boolean,
  touchGestures: TooltipTouchGestures,
  textAlign: TooltipTextAlign | undefined,
};

const defaultConfig = IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [
    IdsTooltipDirective,
    IdsButtonComponent,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './tooltip-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tooltip-demo.component.scss',
  ],
})
export class TooltipDemoComponent {
  public defaults: TooltipPublicApi = {
    tooltipText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum maxime magnam quae tenetur aliquam repudiandae provident.',
    position: defaultConfig.position,
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    showDelay: defaultConfig.showDelay,
    hideDelay: defaultConfig.hideDelay,
    disabled: false,
    touchGestures: 'auto',
    textAlign: undefined,
  };

  public model: TooltipPublicApi = { ...this.defaults  };

  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(TooltipVariant) as TooltipVariantType[];
  public positions = Object.values(TooltipPosition) as TooltipPositionType[];
  public touchGestures: TooltipTouchGestures[] = [
    'auto',
    'on',
    'off',
  ];

  public textAligns: TooltipTextAlign[] = [
    'center',
    'left',
    'right',
  ];

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
