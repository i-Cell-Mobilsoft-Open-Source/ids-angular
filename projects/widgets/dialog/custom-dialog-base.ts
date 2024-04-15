import { AfterViewInit, Directive, OnDestroy, viewChild } from '@angular/core';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { IdsDialogComponent } from './ids-dialog.component';

@Directive({ standalone: true })
export abstract class IdsCustomDialogBase<ResultType = unknown> implements AfterViewInit, OnDestroy {
  public dialogResult = new Subject<ResultType | undefined>();

  protected dialog = viewChild.required(IdsDialogComponent);

  private closeSub?: Subscription;

  ngAfterViewInit(): void {
    this.dialog().open();
    this.closeSub = fromEvent(this.dialog().dialog, 'close').subscribe(() => this.setDialogResult());
  }

  ngOnDestroy(): void {
    this.closeSub?.unsubscribe();
  }

  close(payload?: ResultType): void {
    this.closeSub?.unsubscribe();
    this.dialog().close();
    this.setDialogResult(payload);
  }

  private setDialogResult(payload?: ResultType): void {
    this.dialogResult.next(payload);
    this.dialogResult.complete();
  }
}
