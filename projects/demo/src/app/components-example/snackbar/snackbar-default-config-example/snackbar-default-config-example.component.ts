import { Component, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IDS_SNACKBAR_DEFAULT_CONFIG,
  IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY,
  IdsSnackbarDefaultConfig,
  IdsSnackbarService,
} from '@i-cell/ids-angular/snackbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-default-config-example',
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-default-config-example.component.html',
})
export class SnackbarDefaultConfigExampleComponent {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _translate = inject(TranslateService);

  protected readonly _defaultConfig: Required<IdsSnackbarDefaultConfig> = {
    ...IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY(),
    ...inject(IDS_SNACKBAR_DEFAULT_CONFIG, { optional: true }),
  };

  protected _open(): void {
    this._snackbarService.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.DEFAULT_CONFIG.CONTENT.MESSAGE'),
      allowDismiss: true,
    });
  }
}
