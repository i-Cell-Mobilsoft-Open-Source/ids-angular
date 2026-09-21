import { Component, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSnackbarService } from '@i-cell/ids-angular/snackbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-basic-example',
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-basic-example.component.html',
})
export class SnackbarBasicExampleComponent {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _translate = inject(TranslateService);

  protected _open(): void {
    this._snackbarService.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.BASIC.CONTENT.MESSAGE'),
      allowDismiss: true,
    });
  }
}
