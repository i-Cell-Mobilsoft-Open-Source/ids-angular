import { IdsSideSheetType, IdsSideSheetTypeType } from './types/side-sheet.type';

import { trigger, transition, style, animate } from '@angular/animations';
import { Component, computed, input, output } from '@angular/core';
import { ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';
import {
  IDS_SIDE_SHEET_DEFAULT_CONFIG,
  IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY,
  IdsSideSheetDefaultConfig,
} from '@i-cell/ids-angular/side-sheet/side-sheet-defaults';

const defaultConfig = IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-side-sheet',
  standalone: true,
  templateUrl: './side-sheet.component.html',
  styleUrls: ['./side-sheet.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))]),
    ]),
  ],
  host: {
    '[class.open]': 'open()',
  },
})
export class IdsSideSheetComponent extends ComponentBaseWithDefaults<IdsSideSheetDefaultConfig> {
  protected override get _hostName(): string {
    return 'side-sheet';
  }

  protected _idsSideSheetType = IdsSideSheetType;
  public open = input(false);
  public closed = output();

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SIDE_SHEET_DEFAULT_CONFIG);

  public type = input<IdsSideSheetTypeType>(this._defaultConfig.type);
  public position = input(this._defaultConfig.position);
  public header = input(this._defaultConfig.header);
  public isScrollable = input(this._defaultConfig.isScrollable);
  public isBackdrop = input(this._defaultConfig.isBackdrop);
  public isClosable = input(this._defaultConfig.isClosable);
  public isShowFooter = input(this._defaultConfig.isShowFooter);

  public close(): void {
    this.closed.emit();
  }

  protected override _hostClasses = computed(() => this._getHostClasses([]));
}
