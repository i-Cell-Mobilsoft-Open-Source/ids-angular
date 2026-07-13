import { DialogRef } from '@angular/cdk/dialog';
import { inject } from '@angular/core';

export abstract class IdsCustomDialogBase<R = unknown> {
  protected readonly _dialogRef = inject<DialogRef<R | undefined>>(DialogRef, { optional: true });

  public close(result?: R): void {
    this._dialogRef?.close(result);
  }
}
