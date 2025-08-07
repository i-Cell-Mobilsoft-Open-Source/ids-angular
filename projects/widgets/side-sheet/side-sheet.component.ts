import {
  IdsBackdropTypeType,
  IdsSideSheetPosition, IdsSideSheetPositionType,
  IdsSideSheetType,
  IdsSideSheetTypeType,
} from './types/side-sheet.type';

import { trigger, transition, style, animate } from '@angular/animations';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import {
  IDS_SIDE_SHEET_DEFAULT_CONFIG,
  IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY,
  IdsSideSheetDefaultConfig,
} from '@i-cell/ids-angular/side-sheet/side-sheet-defaults';
import { SideSheetHeaderComponent } from '@i-cell/ids-angular/side-sheet/side-sheet-header/side-sheet-header.component';
import { IdsSideSheetHeader } from '@i-cell/ids-angular/side-sheet/types/side-sheet.type';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';

const defaultConfig = IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-side-sheet',
  standalone: true,
  templateUrl: './side-sheet.component.html',
  animations: [
    trigger('slideInOut', [
      transition('void => left', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition('left => void', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))]),
      transition('void => right', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition('right => void', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))]),
    ]),
  ],
  host: {
    '[class.open]': 'open()',
  },
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
    NgTemplateOutlet,
    SideSheetHeaderComponent,
    IdsTooltipDirective,
    NgClass,
  ],
})
export class IdsSideSheetComponent extends ComponentBaseWithDefaults<IdsSideSheetDefaultConfig> {
  protected override get _hostName(): string {
    return 'side-sheet';
  }

  protected _idsSideSheetType = IdsSideSheetType;
  protected _idsSideSheetHeaderType = IdsSideSheetHeader;
  protected _idsSideSheetPositionType = IdsSideSheetPosition;
  public open = input(false);
  public closed = output();
  public backClicked = output();

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SIDE_SHEET_DEFAULT_CONFIG);

  public title = input<string>('');
  public type = input<IdsSideSheetTypeType | string>(this._defaultConfig.type);
  public position = input<IdsSideSheetPositionType | string>(this._defaultConfig.position);
  public header = input(this._defaultConfig.header);
  public backButton = input(false);
  public isBackdrop = input(this._defaultConfig.isBackdrop);
  public backdropType = input<IdsBackdropTypeType | string>(this._defaultConfig.backdropType);
  public backdropOpacity = input<IdsSizeType | string>(this._defaultConfig.backdropOpacity);
  public isScrollable = input(this._defaultConfig.isScrollable);
  public isClosable = input(this._defaultConfig.isClosable);
  public isShowHeader = input(this._defaultConfig.isShowHeader);
  public closeTooltipText = input<string>('');
  public size = input<IdsSideSheetTypeType | string>(this._defaultConfig.size);

  protected _close(): void {
    this.closed.emit();
  }

  protected _onBack(): void {
    this.backClicked.emit();
  }

  protected _hostClasses = computed(() => this._getHostClasses([
    this.type(),
    this.size(),
    [
      `${this.position()}`,
      this.size(),
    ],
    [
      `${this.position()}-opacity`,
      this.backdropOpacity(),
    ],
    this.backdropType(),
  ]));

}
