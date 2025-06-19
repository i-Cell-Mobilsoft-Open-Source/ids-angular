import {
  IdsSideSheetPosition, IdsSideSheetPositionType,
  IdsSideSheetType,
  IdsSideSheetTypeType,
} from './types/side-sheet.type';

import { trigger, transition, style, animate } from '@angular/animations';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentChecked,
  Component,
  computed,
  ContentChild, Directive,
  ElementRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import {
  IDS_SIDE_SHEET_DEFAULT_CONFIG,
  IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY,
  IdsSideSheetDefaultConfig,
} from '@i-cell/ids-angular/side-sheet/side-sheet-defaults';
import { SideSheetHeaderComponent } from '@i-cell/ids-angular/side-sheet/side-sheet-header/side-sheet-header.component';
import { IdsSideSheetHeader } from '@i-cell/ids-angular/side-sheet/types/side-sheet.type';

const defaultConfig = IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY();

@Directive({
  selector: '[slot="customTrigger"]',
})
export class CustomTriggerSlotDirective {
  constructor(public elementRef: ElementRef) {}
}

@Component({
  selector: 'ids-side-sheet',
  standalone: true,
  templateUrl: './side-sheet.component.html',
  styleUrls: ['./side-sheet.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition('void => start', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition('start => void', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))]),
      transition('void => end', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition('end => void', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))]),
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
  ],
})
export class IdsSideSheetComponent extends ComponentBaseWithDefaults<IdsSideSheetDefaultConfig> implements AfterContentChecked {
  protected override get _hostName(): string {
    return 'side-sheet';
  }

  @ContentChild('customTrigger', { static: false }) protected _customTrigger?: ElementRef;

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
  public isScrollable = input(this._defaultConfig.isScrollable);
  public isClosable = input(this._defaultConfig.isClosable);
  public isShowFooter = input(this._defaultConfig.isShowFooter);
  public isShowHeader = input(this._defaultConfig.isShowHeader);

  protected _hasCustomTrigger = signal(false);

  public ngAfterContentChecked(): void {
    const isPresent = !!this._customTrigger?.nativeElement;
    if (this._hasCustomTrigger() !== isPresent) {
      this._hasCustomTrigger.set(isPresent);
    }
  }

  protected _close(): void {
    this.closed.emit();
  }

  protected _onBack(): void {
    this.backClicked.emit();
  }

  protected override _hostClasses = computed(() => this._getHostClasses([]));
}
