import { IDS_DIALOG_DEFAULT_CONFIG, IDS_DIALOG_DEFAULT_CONFIG_FACTORY, IdsDialogDefaultConfig } from './dialog-defaults';
import { IdsDialogHeaderDirective } from './dialog-header.directive';

import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  InjectionToken,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import {
  createClassList,
  IdsDetectScrollableDirective,
  SizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

let uniqueIdCounter = 0;
const defaultConfig = IDS_DIALOG_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'dialog[idsDialog]',
  standalone: true,
  imports: [
    IdsDetectScrollableDirective,
    IdsIconComponent,
    IdsIconButtonComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  exportAs: 'idsDialog',
  host: {
    '[class]': '_hostClasses()',
    '[attr.aria-labelledby]': 'dialogTitleId',
    '(cancel)': '_onCancel($event)',
  },
})
export class IdsDialogComponent {
  private readonly _componentClass = 'ids-dialog';
  public readonly dialogTitleId = `ids-dialog-title-${uniqueIdCounter++}`;

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_DIALOG_DEFAULT_CONFIG);

  public dialog = inject(ElementRef).nativeElement as HTMLDialogElement;

  public size = input<SizeType | null>(this._defaultConfig.size);
  public mainTitle = input.required<string>();
  public subTitle = input<string>();
  public showCloseButton = input<boolean>(this._defaultConfig.showCloseButton);
  public showBackdrop = input<boolean>(this._defaultConfig.showBackdrop);

  public customHeader = contentChild(IdsDialogHeaderDirective);

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.size(),
      this.showBackdrop() ? 'with-backdrop' : null,
    ]),
  );

  private _onCancel(event: Event): void {
    event.preventDefault();
  }

  public open(): void {
    this.dialog.showModal();
  }

  public close(): void {
    this.dialog.close();
  }

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsDialogDefaultConfig>, injectionToken: InjectionToken<IdsDialogDefaultConfig>): Required<IdsDialogDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
