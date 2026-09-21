import { Component, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSnackbarService } from '@i-cell/ids-angular/snackbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-multiple-example',
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-multiple-example.component.html',
})
export class SnackbarMultipleExampleComponent {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _translate = inject(TranslateService);

  protected _openMultiple(): void {
    this._snackbarService.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.MULTIPLE.CONTENT.FIRST_MESSAGE'),
      variant: 'info',
      allowDismiss: true,
    });
    this._snackbarService.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.MULTIPLE.CONTENT.SECOND_MESSAGE'),
      variant: 'success',
      allowDismiss: true,
    });
    this._snackbarService.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.MULTIPLE.CONTENT.THIRD_MESSAGE'),
      variant: 'warning',
      allowDismiss: true,
    });
  }
}
