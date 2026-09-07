import { DIALOG_EXAMPLE_MESSAGE_TOKEN } from './dialog-injection-token.tokens';

import { Component, computed, inject, viewChild } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsCustomDialogBase, IdsDialogComponent } from '@i-cell/ids-angular/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-injection-token-dynamic-dialog',
  imports: [
    IdsButtonComponent,
    IdsDialogComponent,
    TranslateModule,
  ],
  templateUrl: './dialog-injection-token-dynamic-dialog.component.html',
})
export class DialogInjectionTokenDynamicDialogComponent extends IdsCustomDialogBase {
  protected readonly _message = inject(DIALOG_EXAMPLE_MESSAGE_TOKEN);

  private readonly _idsDialog = viewChild(IdsDialogComponent);

  public override size = computed<IdsSizeType | undefined>(() => this._idsDialog()?.size());
}
