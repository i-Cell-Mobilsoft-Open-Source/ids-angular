import { IDS_DIALOG_DEFAULT_CONFIG, IDS_DIALOG_DEFAULT_CONFIG_FACTORY, IdsDialogDefaultConfig } from './dialog-defaults';
import { IdsDialogHeaderDirective } from './dialog-header.directive';

import { OverlayContainer } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { ComponentBaseWithDefaults, IdsDetectScrollableDirective, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

const defaultConfig = IDS_DIALOG_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'dialog[idsDialog]',
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
    '[attr.aria-labelledby]': '_titleId()',
    '(cancel)': '_onCancel($event)',
    '(close)': '_onNativeClose()',
  },
})
export class IdsDialogComponent extends ComponentBaseWithDefaults<IdsDialogDefaultConfig> implements OnDestroy {
  protected override get _hostName(): string {
    return 'dialog';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_DIALOG_DEFAULT_CONFIG);

  public dialog = inject<ElementRef<HTMLDialogElement>>(ElementRef).nativeElement;

  private readonly _overlay = inject(OverlayContainer);
  private _overlayRoot?: HTMLElement | null;
  private _overlayPrevParent?: Node | null;

  protected _titleId = computed(() => `${this.id()}-title`);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public mainTitle = input.required<string>();
  public subTitle = input<string>();
  public showCloseButton = input<boolean>(this._defaultConfig.showCloseButton);
  public showBackdrop = input<boolean>(this._defaultConfig.showBackdrop);

  protected _customHeader = contentChild(IdsDialogHeaderDirective);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.showBackdrop() ? 'with-backdrop' : null,
  ]));

  protected _onCancel(event: Event): void {
    event.preventDefault();
  }

  public open(): void {
    this.dialog.showModal();

    const root = this._overlay.getContainerElement();
    if (root && root.parentNode !== this.dialog) {
      this._overlayRoot = root;
      this._overlayPrevParent = root.parentNode;
      this.dialog.appendChild(root);
    }
  }

  public close(): void {
    this.dialog.close();
    this._restoreOverlay();
  }

  protected _onNativeClose(): void {
    this._restoreOverlay();
  }

  public ngOnDestroy(): void {
    this._restoreOverlay();
  }

  private _restoreOverlay(): void {
    if (this._overlayRoot && this._overlayPrevParent) {
      try {
        this._overlayPrevParent.appendChild(this._overlayRoot);
      } catch { /* empty */ }
    }
    this._overlayRoot = null;
    this._overlayPrevParent = null;
  }
}
