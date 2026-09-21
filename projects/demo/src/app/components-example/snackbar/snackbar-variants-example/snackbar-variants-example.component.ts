import { Component, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSnackbarService, IdsSnackbarVariantType } from '@i-cell/ids-angular/snackbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-variants-example',
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-variants-example.component.html',
})
export class SnackbarVariantsExampleComponent {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _translate = inject(TranslateService);

  protected _open(variant: IdsSnackbarVariantType, messageKey: string): void {
    this._snackbarService.add({
      message: this._translate.instant(messageKey),
      variant,
      allowDismiss: true,
    });
  }
}
