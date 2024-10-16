import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY, IdsTooltipDirective, IdsTooltipPosition, IdsTooltipPositionType, IdsTooltipTextAlign, IdsTooltipTouchGestures, IdsTooltipVariant, IdsTooltipVariantType } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';

type TooltipPublicApi = {
  tooltipText: string,
  position: IdsTooltipPositionType,
  size: IdsSizeType,
  variant: IdsTooltipVariantType,
  showDelay: number,
  hideDelay: number,
  disabled: boolean,
  touchGestures: IdsTooltipTouchGestures,
  textAlign: IdsTooltipTextAlign | undefined,
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

  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsTooltipVariantType>(IdsTooltipVariant);
  public positions = Object.values<IdsTooltipPositionType>(IdsTooltipPosition);
  public touchGestures: IdsTooltipTouchGestures[] = [
    'auto',
    'on',
    'off',
  ];

  public textAligns: IdsTooltipTextAlign[] = [
    'center',
    'left',
    'right',
  ];

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
