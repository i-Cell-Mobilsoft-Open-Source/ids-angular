import { IdsDialogComponent } from './ids-dialog.component';

import { AfterViewInit, Directive, OnDestroy, viewChild } from '@angular/core';
import { Subject, Subscription, fromEvent } from 'rxjs';

@Directive({ standalone: true })
export abstract class IdsCustomDialogBase<ResultType = unknown> implements AfterViewInit, OnDestroy {
  public dialogResult = new Subject<ResultType | undefined>();

  protected _dialog = viewChild.required(IdsDialogComponent);

  private _closeSub?: Subscription;

  public ngAfterViewInit(): void {
    this._dialog().open();
    this._closeSub = fromEvent(this._dialog().dialog, 'close').subscribe(() => {
      this._setDialogResult();
    });
  }

  public ngOnDestroy(): void {
    this._closeSub?.unsubscribe();
  }

  public close(payload?: ResultType): void {
    this._closeSub?.unsubscribe();
    this._dialog().close();
    this._setDialogResult(payload);
  }

  private _setDialogResult(payload?: ResultType): void {
    this.dialogResult.next(payload);
    this.dialogResult.complete();
  }
}
