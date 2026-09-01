import { IdsBreadcrumbListDirective } from './breadcrumb-list.directive';

import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent, IdsIconButtonVariantType } from '@i-cell/ids-angular/icon-button';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel';

@Component({
  selector: 'li[idsBreadcrumbTruncation]',
  imports: [
    IdsBreadcrumbListDirective,
    IdsIconButtonComponent,
    IdsIconComponent,
    CdkOverlayOrigin,
    IdsOverlayPanelComponent,
    NgClass,
  ],
  template: `
    <!-- ids-icon-button should have the same size and variant as the parent  -->
    <button
      #truncationMenuTrigger="cdkOverlayOrigin"
      type="button"
      idsIconButton
      appearance="standard"
      cdkOverlayOrigin
      [size]="size()"
      [variant]="variant()"
      (click)="_toggle()"
    >
      <ids-icon aria-hidden="true" alt="" fontIcon="more-horiz" />
    </button>
    <ids-overlay-panel
      [origin]="truncationMenuTrigger"
      [open]="isPanelOpen()"
      [panelClasses]="_overlayPanelClasses()"
      (openChange)="_handlePanelOpenChange($event)"
    >
      <ol idsBreadcrumbList [ngClass]="overlayClass()">
        <ng-content />
      </ol>
    </ids-overlay-panel>
  `,
})
export class IdsBreadcrumbTruncationComponent {
  public overlayClass = input<string>('');
  public panelClass = input([], { transform: (value: string) => value.split(' ') });

  public size = input.required<IdsSizeType>();
  public variant = input.required<IdsIconButtonVariantType>();
  public isPanelOpen = signal<boolean>(false);

  protected _overlayPanelClasses = computed(() => [
    ...this.panelClass(),
    'ids-breadcrumb-overlay-panel',
  ].join(' '));

  protected _toggle(): void {
    this.isPanelOpen() ? this._close() : this._open();
  }

  protected _open(): void {
    if (!this.isPanelOpen()) {
      this.isPanelOpen.set(true);
    }
  }

  protected _close(): void {
    if (this.isPanelOpen()) {
      this.isPanelOpen.set(false);
    }
  }

  protected _handlePanelOpenChange(open: boolean): void {
    if (!open) {
      this._close();
    }
  }
}
