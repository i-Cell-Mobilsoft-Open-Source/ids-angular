import { IdsOverlayScrollLock, IdsOverlayScrollLockService } from './overlay-scroll-lock.service';

import { OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';

export class IdsNestedBlockScrollStrategy implements ScrollStrategy {
  private _overlayRef?: OverlayRef;
  private _scrollLockTargets: HTMLElement[] = [];
  private _scrollLock?: IdsOverlayScrollLock;
  private _enabled = false;

  constructor(
    private readonly _blockScrollStrategy: ScrollStrategy,
    private readonly _scrollLockService: IdsOverlayScrollLockService,
  ) {}

  public attach(overlayRef: OverlayRef): void {
    this._overlayRef = overlayRef;
    this._blockScrollStrategy.attach(overlayRef);
  }

  public enable(): void {
    this._enabled = true;
    this._blockScrollStrategy.enable();
    this._lockMarkedElements();
  }

  public disable(): void {
    this._enabled = false;
    this._unlockElements();
    this._blockScrollStrategy.disable();
  }

  public refresh(): void {
    if (!this._enabled) {
      return;
    }

    this._unlockElements();
    this._lockMarkedElements();
  }

  public setScrollLockTargets(scrollLockTargets: HTMLElement[]): void {
    this._scrollLockTargets = scrollLockTargets;

    if (this._enabled) {
      this.refresh();
    }
  }

  public detach(): void {
    this.disable();
    this._blockScrollStrategy.detach?.();
    this._overlayRef = undefined;
  }

  private _lockMarkedElements(): void {
    if (!this._overlayRef) {
      return;
    }

    this._scrollLock = this._scrollLockService.lockMarkedTargets(this._scrollLockTargets);
  }

  private _unlockElements(): void {
    this._scrollLock?.unlock();
    this._scrollLock = undefined;
  }
}
