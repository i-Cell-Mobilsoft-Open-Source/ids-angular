import { Component, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSnackbarService } from '@i-cell/ids-angular/snackbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-actions-example',
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-actions-example.component.html',
})
export class SnackbarActionsExampleComponent {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _translate = inject(TranslateService);

  protected _open(): void {
    this._snackbarService.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.ACTIONS.CONTENT.MESSAGE'),
      variant: 'error',
      allowDismiss: true,
      closeButtonLabel: this._translate.instant('EXAMPLES.SNACKBAR.ACTIONS.CONTENT.CLOSE'),
      actions: [
        {
          label: this._translate.instant('EXAMPLES.SNACKBAR.ACTIONS.CONTENT.ACTION'),
          action: (): void => console.info('Snackbar action clicked'),
        },
      ],
    });
  }
}
