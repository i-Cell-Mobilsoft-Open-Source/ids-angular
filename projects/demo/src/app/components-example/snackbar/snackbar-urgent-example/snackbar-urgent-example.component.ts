import { Component, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSnackbarService } from '@i-cell/ids-angular/snackbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-urgent-example',
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-urgent-example.component.html',
})
export class SnackbarUrgentExampleComponent {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _translate = inject(TranslateService);

  protected _open(): void {
    this._snackbarService.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.URGENT.CONTENT.MESSAGE'),
      variant: 'error',
      urgent: true,
      allowDismiss: true,
    });
  }
}
