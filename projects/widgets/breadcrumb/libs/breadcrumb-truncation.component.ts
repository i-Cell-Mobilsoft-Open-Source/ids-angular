import { IdsBreadcrumbListDirective } from './breadcrumb-list.directive';

import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent, IdsIconButtonVariantType } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'li[idsBreadcrumbTruncation]',
  imports: [
    IdsBreadcrumbListDirective,
    IdsIconButtonComponent,
    IdsIconComponent,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    CdkTrapFocus,
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
    <ng-template
      cdkConnectedOverlay
      cdkConnectedOverlayLockPosition
      [cdkConnectedOverlayOrigin]="truncationMenuTrigger"
      [cdkConnectedOverlayOpen]="isPanelOpen()"
      [cdkConnectedOverlayPush]="true"
      [cdkConnectedOverlayPanelClass]="panelClass()"
      (overlayOutsideClick)="_close()"
      (detach)="_close()"
    >
      <ol idsBreadcrumbList cdkTrapFocus cdkTrapFocusAutoCapture="true" [ngClass]="overlayClass()">
        <ng-content />
      </ol>
    </ng-template>
  `,
})
export class IdsBreadcrumbTruncationComponent {
  public overlayClass = input<string>('');
  public panelClass = input([], { transform: (value: string) => value.split(' ') });

  public size = input.required<IdsSizeType>();
  public variant = input.required<IdsIconButtonVariantType>();
  public isPanelOpen = signal<boolean>(false);

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
}
