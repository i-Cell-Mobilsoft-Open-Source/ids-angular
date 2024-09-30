import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsTooltipDirective, TooltipPosition, TooltipPositionType, TooltipTextAlign, TooltipTouchGestures, TooltipVariant, TooltipVariantType } from '@i-cell/ids-angular/tooltip';
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

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [
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
   
  public model: TooltipPublicApi = {
    tooltipText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum maxime magnam quae tenetur aliquam repudiandae provident.',
    position: TooltipPosition.NORTH,
    size: Size.COMFORTABLE,
    variant: TooltipVariant.DARK,
    showDelay: 1_000,
    hideDelay: 5_000,
    disabled: false,
    touchGestures: 'auto',
    textAlign: undefined,
  };

  // Selectable properties
  public positions: TooltipPositionType[] = [
    TooltipPosition.NORTH,
    TooltipPosition.NORTHEAST,
    TooltipPosition.EAST,
    TooltipPosition.SOUTHEAST,
    TooltipPosition.SOUTH,
    TooltipPosition.SOUTHWEST,
    TooltipPosition.WEST,
    TooltipPosition.NORTHWEST,
  ];
  
  public sizes: SizeType[] = [
    Size.DENSE,
    Size.COMPACT,
    Size.COMFORTABLE,
    Size.SPACIOUS,
  ];

  public variants: TooltipVariantType[] = [
    TooltipVariant.DARK,
    TooltipVariant.LIGHT,
  ];

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
  
}
