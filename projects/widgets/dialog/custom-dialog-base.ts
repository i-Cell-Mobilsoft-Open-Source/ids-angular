import { IDS_DIALOG_DEFAULT_CONFIG } from './dialog-defaults';

import { DialogRef } from '@angular/cdk/dialog';
import { inject, computed } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';

export abstract class IdsCustomDialogBase<R = unknown> {
  protected readonly _dialogRef = inject<DialogRef<R | undefined>>(DialogRef, { optional: true });
  public readonly size = computed<IdsSizeType | undefined>(() => this._defaultSize.size);
  private readonly _defaultSize = inject(IDS_DIALOG_DEFAULT_CONFIG);

  public close(result?: R): void {
    this._dialogRef?.close(result);
  }
}
