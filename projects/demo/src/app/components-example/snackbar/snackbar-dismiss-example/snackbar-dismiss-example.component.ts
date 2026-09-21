import { Component, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSnackbarService } from '@i-cell/ids-angular/snackbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-dismiss-example',
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-dismiss-example.component.html',
})
export class SnackbarDismissExampleComponent {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _translate = inject(TranslateService);

  protected _openWithIconClose(): void {
    this._snackbarService.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.DISMISS.CONTENT.ICON_MESSAGE'),
      variant: 'info',
      allowDismiss: true,
    });
  }

  protected _openWithLabelClose(): void {
    this._snackbarService.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.DISMISS.CONTENT.LABEL_MESSAGE'),
      variant: 'info',
      allowDismiss: true,
      closeButtonLabel: this._translate.instant('EXAMPLES.SNACKBAR.DISMISS.CONTENT.CLOSE'),
    });
  }
}
