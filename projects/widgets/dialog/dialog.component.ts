import { IDS_DIALOG_DEFAULT_CONFIG, IDS_DIALOG_DEFAULT_CONFIG_FACTORY, IdsDialogDefaultConfig } from './dialog-defaults';
import { IdsDialogHeaderDirective } from './dialog-header.directive';

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, computed, contentChild, inject, input } from '@angular/core';
import { ComponentBaseWithDefaults, IdsDetectScrollableDirective, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'idsDialog',
  host: {
    '[attr.aria-labelledby]': 'titleId()',
    '(cancel)': '_onCancel($event)',
  },
})
export class IdsDialogComponent extends ComponentBaseWithDefaults<IdsDialogDefaultConfig> {
  protected override get _hostName(): string {
    return 'dialog';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_DIALOG_DEFAULT_CONFIG);

  public dialog = inject(ElementRef).nativeElement as HTMLDialogElement;

  public titleId = computed(() => `${this.id()}-title`);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public mainTitle = input.required<string>();
  public subTitle = input<string>();
  public showCloseButton = input<boolean>(this._defaultConfig.showCloseButton);
  public showBackdrop = input<boolean>(this._defaultConfig.showBackdrop);

  public customHeader = contentChild(IdsDialogHeaderDirective);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.showBackdrop() ? 'with-backdrop' : null,
  ]));

  private _onCancel(event: Event): void {
    event.preventDefault();
  }

  public open(): void {
    this.dialog.showModal();
  }

  public close(): void {
    this.dialog.close();
  }
}
