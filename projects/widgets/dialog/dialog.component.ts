import { IDS_DIALOG_DEFAULT_CONFIG, IDS_DIALOG_DEFAULT_CONFIG_FACTORY, IdsDialogDefaultConfig } from './dialog-defaults';
import { IdsDialogHeaderDirective } from './dialog-header.directive';

import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ComponentBaseWithDefaults, IdsDetectScrollableDirective, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

const defaultConfig = IDS_DIALOG_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-dialog, [idsDialog]',
  imports: [
    IdsDetectScrollableDirective,
    IdsIconComponent,
    IdsIconButtonComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'idsDialog',
  host: {
    '[class]': '_hostClasses()',
    '[attr.role]': '"dialog"',
    '[attr.aria-modal]': '"true"',
    '[attr.aria-labelledby]': '_titleId()',
  },
})
export class IdsDialogComponent extends ComponentBaseWithDefaults<IdsDialogDefaultConfig> {
  protected override get _hostName(): string {
    return 'dialog';
  }

  protected readonly _dialog = inject(Dialog);
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_DIALOG_DEFAULT_CONFIG);
  protected _dialogRef = inject<DialogRef<unknown>>(DialogRef, { optional: true });

  protected readonly _isStaticDialog = computed(() => this._dialogRef === null);
  protected _titleId = computed(() => `${this.id()}-title`);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public mainTitle = input.required<string>();
  public subTitle = input<string>();
  public showCloseButton = input<boolean>(this._defaultConfig.showCloseButton);
  public isCloseButtonDisabled = input<boolean>(this._defaultConfig.isCloseButtonDisabled);
  public showBackdrop = input<boolean>(this._defaultConfig.showBackdrop);

  protected _customHeader = contentChild(IdsDialogHeaderDirective);
  private readonly _template = viewChild.required<TemplateRef<unknown>>('template');

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.showBackdrop() ? 'with-backdrop' : null,
  ]));

  protected _onCancel(event: Event): void {
    event.preventDefault();
  }

  public open(): void {
    if (this._dialogRef) {
      return;
    }
    this._dialogRef = this._dialog.open(this._template(), {
      hasBackdrop: this.showBackdrop(),
      disableClose: true,
      panelClass: [
        'ids-dialog',
        `ids-dialog-${this.size()}`,
        this.showBackdrop() ? 'ids-dialog-with-backdrop' : '',
      ],
      backdropClass: this.showBackdrop()
        ? 'ids-dialog-backdrop'
        : 'ids-dialog-transparent-backdrop',
      ariaLabelledBy: this._titleId(),
      ariaModal: true,
      restoreFocus: true,
      autoFocus: 'first-tabbable',
    });

    this._dialogRef.closed.subscribe(() => {
      this._dialogRef = null;
    });
  }

  public close(result?: unknown): void {
    if (this._dialogRef) {
      this._dialogRef.close(result);
    }
  }

  protected _onNativeClose(): void {
  }

}

