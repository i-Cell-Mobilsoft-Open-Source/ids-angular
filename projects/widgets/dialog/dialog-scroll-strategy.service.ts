import { Overlay, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IdsDialogScrollStrategyService {
  private readonly _document = inject(DOCUMENT);
  private readonly _blockScrollStrategy = inject(Overlay).scrollStrategies.block();
  private _lockCount = 0;
  private _usesBlockScrollStrategy = false;

  public create(): ScrollStrategy {
    return new IdsDialogScrollStrategy(this);
  }

  public lock(): void {
    if (this._lockCount++ > 0) {
      return;
    }

    this._usesBlockScrollStrategy = !this._isDocumentScrollAlreadyBlocked();

    if (this._usesBlockScrollStrategy) {
      this._blockScrollStrategy.enable();
    }
  }

  public unlock(): void {
    if (this._lockCount === 0 || --this._lockCount > 0) {
      return;
    }

    if (this._usesBlockScrollStrategy) {
      this._blockScrollStrategy.disable();
    }

    this._usesBlockScrollStrategy = false;
  }

  private _isDocumentScrollAlreadyBlocked(): boolean {
    const bodyStyles = getComputedStyle(this._document.body);
    const htmlStyles = getComputedStyle(this._document.documentElement);

    return (
      this._isOverflowBlocked(bodyStyles.overflowX)
      && this._isOverflowBlocked(bodyStyles.overflowY)
    ) || (
      this._isOverflowBlocked(htmlStyles.overflowX)
      && this._isOverflowBlocked(htmlStyles.overflowY)
    );
  }

  private _isOverflowBlocked(overflow: string): boolean {
    return overflow === 'hidden' || overflow === 'clip';
  }
}

class IdsDialogScrollStrategy implements ScrollStrategy {
  private _enabled = false;

  constructor(private readonly _scrollLock: IdsDialogScrollStrategyService) {}

  public attach(overlayRef: OverlayRef): void {
    void overlayRef;
  }

  public enable(): void {
    if (this._enabled) {
      return;
    }

    this._enabled = true;
    this._scrollLock.lock();
  }

  public disable(): void {
    if (!this._enabled) {
      return;
    }

    this._enabled = false;
    this._scrollLock.unlock();
  }
}
