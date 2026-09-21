import { hasModifierKey } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';
import { filter, merge, Observable, Subject, take } from 'rxjs';

export type IdsOverlayCloseEvent = MouseEvent | KeyboardEvent | void;
export type IdsOverlaySizeConfig = {
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
};

export class IdsOverlayRef<TComponent = unknown> {
  private readonly _closed = new Subject<IdsOverlayCloseEvent>();
  private _componentRef?: ComponentRef<TComponent>;
  private _isClosed = false;

  public readonly closed = this._closed.asObservable();
  public get componentRef(): ComponentRef<TComponent> | undefined {
    return this._componentRef;
  }

  constructor(
    private readonly _overlayRef: OverlayRef,
    private readonly _closeCallback: () => void = () => {},
  ) {
    this._subscribeToCloseEvents();
  }

  public attachComponent(componentPortal: ComponentPortal<TComponent>): ComponentRef<TComponent> {
    this._componentRef = this._overlayRef.attach(componentPortal);

    return this._componentRef;
  }

  public close(event?: IdsOverlayCloseEvent): void {
    if (this._isClosed) {
      return;
    }

    this._isClosed = true;
    this._closeCallback();

    if (this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }

    this._overlayRef.dispose();
    this._closed.next(event);
    this._closed.complete();
  }

  public keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }

  public updatePosition(): void {
    this._overlayRef.updatePosition();
  }

  public updateSize(sizeConfig: IdsOverlaySizeConfig): void {
    this._overlayRef.updateSize(sizeConfig);
  }

  private _subscribeToCloseEvents(): void {
    this._getCloseEvents()
      .pipe(take(1))
      .subscribe((event) => this.close(event));
  }

  private _getCloseEvents(): Observable<IdsOverlayCloseEvent> {
    return merge(
      this._overlayRef.backdropClick(),
      this._overlayRef.detachments(),
      this._overlayRef.keydownEvents().pipe(filter((event) => event.code === 'Escape' && !hasModifierKey(event))),
    );
  }
}
